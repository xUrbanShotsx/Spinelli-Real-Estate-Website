import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT, CHAT_CONFIG } from "@/lib/chat-config";
import { searchProperties, getPropertyById, getPropertyInspections, OFFICE_INFO } from "@/lib/property-search";
import { calculateDuty, calculateDeposit, calculateRepayment, calculateRentalYield, formatAUD } from "@/lib/stamp-duty";
import { submitLead, type LeadData, type LeadType, type LeadScore } from "@/lib/lead-service";
import { getSuburbStats, formatPrice } from "@/lib/suburb-stats";
import { lookupAgent } from "@/lib/agents";

// ─── Rate limiting (in-memory, per serverless instance) ───────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW = 60_000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// Periodically clean up old entries to avoid memory growth
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, val] of rateLimitMap) {
      if (now > val.resetAt) rateLimitMap.delete(key);
    }
  }, 120_000);
}

// ─── OpenAI tool definitions ──────────────────────────────────────────────────
const TOOLS = [
  {
    type: "function",
    function: {
      name: "search_properties",
      description: "Search Spinelli Real Estate's live property listings. Use this whenever someone asks about properties for sale, rent, commercial, or recently sold.",
      parameters: {
        type: "object",
        properties: {
          listingType: { type: "string", enum: ["sale", "rent", "commercial-sale", "commercial-lease", "business", "sold"], description: "Type of listing to search" },
          suburb: { type: "string", description: "Suburb name to filter by (e.g. Shell Cove, Warilla, Wollongong)" },
          minPrice: { type: "number", description: "Minimum price in AUD" },
          maxPrice: { type: "number", description: "Maximum price in AUD" },
          minBedrooms: { type: "number", description: "Minimum number of bedrooms" },
          minBathrooms: { type: "number", description: "Minimum number of bathrooms" },
          keywords: { type: "string", description: "Keywords to match in description (e.g. granny flat, pool, acreage)" },
          propertyCategory: { type: "string", description: "Property category (House, Apartment, Townhouse, Land, etc.)" },
          limit: { type: "number", description: "Max results to return (default 5, max 10)" },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_property",
      description: "Get detailed information about a specific property by its ID.",
      parameters: {
        type: "object",
        properties: {
          propertyId: { type: "string", description: "The property/listing ID" },
        },
        required: ["propertyId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_property_inspections",
      description: "Get upcoming inspection/open home times for a specific property.",
      parameters: {
        type: "object",
        properties: {
          propertyId: { type: "string", description: "The property/listing ID" },
        },
        required: ["propertyId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "calculate_stamp_duty",
      description: "Calculate NSW transfer duty (stamp duty) deterministically for a property purchase. Always use this tool — never calculate stamp duty yourself.",
      parameters: {
        type: "object",
        properties: {
          purchasePrice: { type: "number", description: "Purchase price in AUD" },
          isFirstHomeBuyer: { type: "boolean", description: "Is the buyer a first home buyer?" },
          fhbEligibilityConfirmed: { type: "boolean", description: "Has the buyer confirmed FHB eligibility criteria?" },
          isVacantLand: { type: "boolean", description: "Is this vacant land?" },
        },
        required: ["purchasePrice"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "calculate_deposit",
      description: "Show 5%, 10%, and 20% deposit amounts for a given purchase price.",
      parameters: {
        type: "object",
        properties: {
          purchasePrice: { type: "number", description: "Purchase price in AUD" },
        },
        required: ["purchasePrice"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "calculate_repayment",
      description: "Calculate indicative loan repayments. Use default rate of 6.5% if user hasn't specified.",
      parameters: {
        type: "object",
        properties: {
          loanAmount: { type: "number", description: "Loan amount in AUD" },
          annualRate: { type: "number", description: "Annual interest rate as a percentage (e.g. 6.5)" },
          termYears: { type: "number", description: "Loan term in years (default 30)" },
          frequency: { type: "string", enum: ["monthly", "fortnightly", "weekly"], description: "Repayment frequency" },
        },
        required: ["loanAmount"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "submit_lead",
      description: "Submit a lead to the Spinelli team. Use when a user provides their contact details for an enquiry, appraisal, callback, inspection, or registration.",
      parameters: {
        type: "object",
        properties: {
          type: { type: "string", enum: ["BUYER", "SELLER_APPRAISAL", "PROPERTY_ENQUIRY", "PROPERTY_MANAGEMENT", "RENTAL_ENQUIRY", "COMMERCIAL_ENQUIRY", "PROJECT_ENQUIRY", "INSPECTION_REQUEST", "AGENT_CALLBACK", "GENERAL"] },
          score: { type: "string", enum: ["HOT", "WARM", "NURTURE"], description: "HOT = buying/selling within 3 months or specific property enquiry. WARM = 3-6 months. NURTURE = researching or longer." },
          name: { type: "string" },
          email: { type: "string" },
          phone: { type: "string" },
          message: { type: "string", description: "Summary of their enquiry and any details collected" },
          propertyId: { type: "string" },
          propertyAddress: { type: "string" },
          suburb: { type: "string" },
          budget: { type: "string" },
          timeline: { type: "string" },
          conversationSummary: { type: "string", description: "2-3 sentence AI-generated summary of the conversation" },
        },
        required: ["type", "score", "name", "message"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_office_info",
      description: "Return Spinelli Real Estate office contact information, hours, and website page links.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "calculate_rental_yield",
      description: "Calculate gross and net rental yield for an investment property. Use when someone asks about yield, rental return, investment potential, or cash flow.",
      parameters: {
        type: "object",
        properties: {
          purchasePrice: { type: "number", description: "Purchase price of the property in AUD" },
          weeklyRent: { type: "number", description: "Expected weekly rent in AUD" },
        },
        required: ["purchasePrice", "weeklyRent"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_suburb_stats",
      description: "Get live suburb market stats: median house price, median unit price, average days on market, and number of properties sold in the past 12 months. Use when someone asks about a suburb's market, property values, or how long homes take to sell.",
      parameters: {
        type: "object",
        properties: {
          suburb: { type: "string", description: "Suburb name (e.g. Shell Cove, Warilla, Kiama)" },
        },
        required: ["suburb"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_agent",
      description: "Get the Spinelli agent best suited for an enquiry, or find a specific agent by name. Use when someone asks 'who handles X', 'who's the agent for Y suburb', 'can I speak to someone about property management', or mentions an agent's name.",
      parameters: {
        type: "object",
        properties: {
          enquiryType: { type: "string", enum: ["sales", "buy", "sell", "rent", "property-management", "commercial", "general"], description: "Type of enquiry" },
          nameQuery: { type: "string", description: "Agent name to search for (partial match)" },
        },
        required: [],
      },
    },
  },
];

// ─── Execute a tool call ───────────────────────────────────────────────────────
async function executeTool(name: string, args: Record<string, unknown>, pageContext?: PageContext): Promise<{ result: unknown; component?: ChatComponent }> {
  switch (name) {
    case "search_properties": {
      const res = await searchProperties({
        listingType: args.listingType as "sale" | "rent" | "sold" | "commercial-sale" | "commercial-lease" | "business" | undefined,
        suburb: args.suburb as string | undefined,
        minPrice: args.minPrice as number | undefined,
        maxPrice: args.maxPrice as number | undefined,
        minBedrooms: args.minBedrooms as number | undefined,
        minBathrooms: args.minBathrooms as number | undefined,
        keywords: args.keywords as string | undefined,
        propertyCategory: args.propertyCategory as string | undefined,
        limit: args.limit as number | undefined,
      });
      return {
        result: { message: res.message, total: res.total, count: res.properties.length },
        component: res.properties.length > 0 ? { type: "property_cards", properties: res.properties } : undefined,
      };
    }

    case "get_property": {
      const id = String(args.propertyId ?? pageContext?.propertyId ?? "");
      const prop = await getPropertyById(id);
      return { result: prop ?? { error: "Property not found" } };
    }

    case "get_property_inspections": {
      const id = String(args.propertyId ?? pageContext?.propertyId ?? "");
      const inspections = await getPropertyInspections(id);
      return {
        result: { inspections, hasInspections: inspections.length > 0 },
        component: inspections.length > 0 ? { type: "inspection_times", inspections } : undefined,
      };
    }

    case "calculate_stamp_duty": {
      const result = calculateDuty({
        purchasePrice: Number(args.purchasePrice),
        isFirstHomeBuyer: Boolean(args.isFirstHomeBuyer),
        fhbEligibilityConfirmed: Boolean(args.fhbEligibilityConfirmed),
        isVacantLand: Boolean(args.isVacantLand),
      });
      const comp: ChatComponent = {
        type: "calculator_result",
        data: {
          title: "NSW Transfer Duty Estimate",
          purchasePrice: args.purchasePrice as number,
          standardDuty: result.standardDuty,
          fhbDuty: result.fhbDuty,
          fhbSaving: result.fhbSaving,
          disclaimer: result.disclaimer,
          ratesDate: result.ratesDate,
        },
      };
      return { result: { standardDuty: result.standardDuty, fhbDuty: result.fhbDuty, fhbSaving: result.fhbSaving, formatted: formatAUD(result.standardDuty) }, component: comp };
    }

    case "calculate_deposit": {
      const price = Number(args.purchasePrice);
      const dep = calculateDeposit(price);
      const comp: ChatComponent = {
        type: "calculator_result",
        data: {
          title: `Deposit Guide — ${formatAUD(price)}`,
          rows: [
            { label: "5% deposit", value: formatAUD(dep.p5) },
            { label: "10% deposit", value: formatAUD(dep.p10) },
            { label: "20% deposit (no LMI)", value: formatAUD(dep.p20) },
          ],
          disclaimer: "Lender requirements vary. LMI may apply below 20%. Confirm with your lender.",
        },
      };
      return { result: dep, component: comp };
    }

    case "calculate_repayment": {
      const loan = Number(args.loanAmount);
      const rate = Number(args.annualRate ?? 6.5);
      const term = Number(args.termYears ?? 30);
      const freq = (args.frequency as "monthly" | "fortnightly" | "weekly") ?? "monthly";
      const repayment = calculateRepayment({ loanAmount: loan, annualRate: rate, termYears: term, frequency: freq });
      const comp: ChatComponent = {
        type: "calculator_result",
        data: {
          title: "Indicative Loan Repayment",
          rows: [
            { label: "Loan amount", value: formatAUD(loan) },
            { label: "Interest rate", value: `${rate}% p.a.` },
            { label: "Loan term", value: `${term} years` },
            { label: `${freq.charAt(0).toUpperCase() + freq.slice(1)} repayment`, value: formatAUD(repayment), highlight: true },
          ],
          disclaimer: "This is informational only and is not credit advice. Rates vary by lender and borrower profile.",
        },
      };
      return { result: { repayment, formatted: formatAUD(repayment), frequency: freq }, component: comp };
    }

    case "submit_lead": {
      const lead: LeadData = {
        type: (args.type as LeadType) ?? "GENERAL",
        score: (args.score as LeadScore) ?? "NURTURE",
        name: String(args.name ?? ""),
        email: args.email ? String(args.email) : undefined,
        phone: args.phone ? String(args.phone) : undefined,
        message: String(args.message ?? ""),
        propertyId: args.propertyId ? String(args.propertyId) : pageContext?.propertyId,
        propertyAddress: args.propertyAddress ? String(args.propertyAddress) : pageContext?.propertyAddress,
        suburb: args.suburb ? String(args.suburb) : undefined,
        budget: args.budget ? String(args.budget) : undefined,
        timeline: args.timeline ? String(args.timeline) : undefined,
        conversationSummary: args.conversationSummary ? String(args.conversationSummary) : undefined,
        pageUrl: pageContext?.url,
        source: "Spinelli AI Website Concierge",
      };
      const res = await submitLead(lead);
      return { result: { success: res.success, method: res.method } };
    }

    case "get_office_info":
      return { result: OFFICE_INFO };

    case "calculate_rental_yield": {
      const price = Number(args.purchasePrice);
      const rent = Number(args.weeklyRent);
      const r = calculateRentalYield(price, rent);
      const comp: ChatComponent = {
        type: "calculator_result",
        data: {
          title: "Rental Yield Estimate",
          rows: [
            { label: "Purchase price", value: formatAUD(r.purchasePrice) },
            { label: "Weekly rent", value: formatAUD(r.weeklyRent) },
            { label: "Annual rent", value: formatAUD(r.annualRent) },
            { label: "Gross yield", value: `${r.grossYieldPct}% p.a.`, highlight: true },
            { label: "Net yield (est.)", value: `${r.netYieldPct}% p.a.` },
            { label: "Weekly cash flow (80% LVR @ 6.5%)", value: `${r.cashflowWeekly >= 0 ? "+" : ""}${formatAUD(r.cashflowWeekly)}` },
          ],
          disclaimer: "Net yield assumes ~25% of gross rent for expenses. Cash flow is indicative at 80% LVR, 6.5% p.a., 30-year term. Not financial advice — confirm with your accountant and lender.",
        },
      };
      return { result: r, component: comp };
    }

    case "get_suburb_stats": {
      const suburb = String(args.suburb ?? "");
      const stats = await getSuburbStats(suburb);
      if (!stats) {
        return { result: { error: `No suburb stats found for ${suburb}. It may not be in our coverage area.` } };
      }
      const comp: ChatComponent = {
        type: "suburb_stats",
        data: {
          suburb: stats.suburb,
          postcode: stats.postcode,
          medianHousePrice: stats.medianHousePrice,
          medianUnitPrice: stats.medianUnitPrice,
          medianWeeklyRent: stats.medianWeeklyRent,
          avgDaysOnMarket: stats.avgDaysOnMarket,
          soldLast12Months: stats.soldLast12Months,
          source: stats.source,
          sourceUrl: stats.sourceUrl,
          asOf: stats.asOf,
          formattedHousePrice: formatPrice(stats.medianHousePrice),
          formattedUnitPrice: formatPrice(stats.medianUnitPrice),
        },
      };
      return { result: stats, component: comp };
    }

    case "get_agent": {
      const agents = lookupAgent({
        enquiryType: args.enquiryType as "sales" | "buy" | "sell" | "rent" | "property-management" | "commercial" | "general" | undefined,
        nameQuery: args.nameQuery as string | undefined,
      });
      if (!agents.length) {
        return { result: { agents: [], message: "No agents found matching that query." } };
      }
      const comp: ChatComponent = {
        type: "agent_cards",
        agents,
      };
      return { result: { agents: agents.map(a => ({ name: a.name, role: a.role, phone: a.phone })) }, component: comp };
    }

    default:
      return { result: { error: `Unknown tool: ${name}` } };
  }
}

// ─── Types ─────────────────────────────────────────────────────────────────────
interface PageContext {
  url?: string;
  title?: string;
  pageType?: string;
  propertyId?: string;
  propertyAddress?: string;
  suburb?: string;
}

interface ChatComponent {
  type: "property_cards" | "calculator_result" | "inspection_times" | "quick_replies" | "suburb_stats" | "agent_cards";
  properties?: unknown[];
  inspections?: unknown[];
  agents?: unknown[];
  data?: Record<string, unknown>;
  items?: string[];
}

// ─── Main handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 });
  }

  // Request size limit
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > 32_000) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  let body: { messages?: unknown[]; pageContext?: PageContext; sessionId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { messages = [], pageContext } = body;

  // Validate messages
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "No messages provided" }, { status: 400 });
  }
  if (messages.length > 80) {
    return NextResponse.json({ error: "Conversation too long" }, { status: 400 });
  }

  // Sanitise messages — allow only role/content
  const sanitised = messages
    .filter((m): m is { role: string; content: string } => typeof m === "object" && m !== null && "role" in m && "content" in m)
    .filter(m => ["user", "assistant"].includes(m.role))
    .map(m => ({ role: m.role, content: String(m.content).slice(0, 4000) }));

  // Inject page context into the first system message
  let pageCtxNote = "";
  if (pageContext?.url) {
    pageCtxNote = `\n\nPAGE CONTEXT: The visitor is currently on: ${pageContext.url}`;
    if (pageContext.pageType) pageCtxNote += ` (${pageContext.pageType} page)`;
    if (pageContext.propertyId) pageCtxNote += `\nProperty ID: ${pageContext.propertyId}`;
    if (pageContext.propertyAddress) pageCtxNote += `\nProperty: ${pageContext.propertyAddress}`;
    if (pageContext.suburb) pageCtxNote += `\nSuburb: ${pageContext.suburb}`;
  }

  const systemContent = SYSTEM_PROMPT + pageCtxNote;

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ reply: "The AI assistant is not configured yet. Please contact Spinelli Real Estate directly on (02) 4296 0047 or visit our Contact page.", components: [] });
  }

  const components: ChatComponent[] = [];

  try {
    // First AI call
    const aiMessages: unknown[] = [{ role: "system", content: systemContent }, ...sanitised];

    let response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({ model: CHAT_CONFIG.model, messages: aiMessages, tools: TOOLS, tool_choice: "auto", max_tokens: 600, temperature: 0.65 }),
      signal: AbortSignal.timeout(25_000),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("OpenAI error:", response.status, err);
      throw new Error(`OpenAI ${response.status}`);
    }

    let data = await response.json();
    let choice = data.choices?.[0];

    // Agentic tool calling loop (max 3 rounds to prevent infinite loops)
    for (let round = 0; round < 3 && choice?.finish_reason === "tool_calls"; round++) {
      const toolCalls = choice.message.tool_calls ?? [];
      const toolResults: unknown[] = [];

      for (const call of toolCalls) {
        let args: Record<string, unknown> = {};
        try { args = JSON.parse(call.function.arguments ?? "{}"); } catch { /* use empty */ }

        const { result, component } = await executeTool(call.function.name, args, pageContext);
        if (component) components.push(component);

        toolResults.push({
          role: "tool",
          tool_call_id: call.id,
          content: JSON.stringify(result),
        });
      }

      // Continue with tool results
      aiMessages.push(choice.message, ...toolResults);
      response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        body: JSON.stringify({ model: CHAT_CONFIG.model, messages: aiMessages, tools: TOOLS, tool_choice: "auto", max_tokens: 600, temperature: 0.65 }),
        signal: AbortSignal.timeout(25_000),
      });

      if (!response.ok) throw new Error(`OpenAI ${response.status}`);
      data = await response.json();
      choice = data.choices?.[0];
    }

    const reply = choice?.message?.content ?? "I'm having trouble responding right now. Please try again or contact our office directly.";

    // Structured log — visible in Vercel dashboard under project → Logs
    // Search for "spinelli-ai" to filter these entries
    const userMessage = sanitised[sanitised.length - 1]?.content ?? "";
    console.log(JSON.stringify({
      event: "spinelli-ai:chat",
      ts: new Date().toISOString(),
      page: pageContext?.pageType ?? "unknown",
      url: pageContext?.url ?? "",
      propertyId: pageContext?.propertyId ?? null,
      userMessage,
      aiReply: reply.slice(0, 300), // truncate long replies
      toolsUsed: components.map(c => c.type),
      messageCount: sanitised.length,
    }));

    return NextResponse.json({ reply, components });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Spinelli AI chat error:", msg);
    return NextResponse.json({
      reply: "I'm having trouble right now. You can call us on (02) 4296 0047 or use our Contact page and we'll get back to you shortly.",
      components: [],
    });
  }
}
