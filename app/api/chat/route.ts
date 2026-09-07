import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const last = messages?.[messages.length - 1]?.content ?? "";

  // When OpenAI is connected, replace this block with an actual API call
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant for Spinelli Real Estate, a boutique agency in the Illawarra region of NSW, Australia. You help buyers, sellers, renters and landlords with questions about properties, the buying/selling process, suburb information (Wollongong, Kiama, Shellharbour, Dapto, Thirroul and surrounds), and our services including residential sales, property management, commercial real estate, business sales, and project marketing. Keep answers concise and friendly. If asked something outside real estate, redirect politely. Always suggest the user contact the office or book an appraisal for specific property advice.",
            },
            ...messages,
          ],
          max_tokens: 400,
          temperature: 0.7,
        }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;
      if (reply) return NextResponse.json({ reply });
    } catch {
      // fall through to placeholder
    }
  }

  // Placeholder responses until OpenAI is connected
  const lower = last.toLowerCase();
  let reply =
    "Thanks for your message! Our team will get back to you shortly. For immediate assistance, please call our office or visit our Contact page.";

  if (lower.includes("buy") || lower.includes("for sale") || lower.includes("purchase")) {
    reply = "We have a great range of properties for sale across Wollongong, Kiama, Shellharbour and the Illawarra. Head to our Buy page to browse current listings, or our team can help match you with the right property — just send us an enquiry!";
  } else if (lower.includes("rent") || lower.includes("lease") || lower.includes("tenant")) {
    reply = "We manage rental properties across the Illawarra. Check our Rent page for current availability. To apply or enquire about a specific property, use the enquiry form on the listing.";
  } else if (lower.includes("sell") || lower.includes("appraisal") || lower.includes("value") || lower.includes("worth")) {
    reply = "Thinking of selling? We offer free, no-obligation property appraisals. Book one on our Appraisal page and one of our agents will be in touch to give you an accurate market assessment.";
  } else if (lower.includes("commercial")) {
    reply = "We have a dedicated commercial division covering office, retail, industrial and investment properties across the Illawarra. Visit our Commercial page or contact us directly to discuss your requirements.";
  } else if (lower.includes("project") || lower.includes("off the plan") || lower.includes("development")) {
    reply = "We specialise in project marketing for new residential developments across the Illawarra. Head to our Projects page to explore current off-the-plan opportunities.";
  } else if (lower.includes("prestige") || lower.includes("luxury") || lower.includes("acreage")) {
    reply = "Our Prestige Collection features exceptional homes and acreage estates rarely offered to the open market. Visit our Prestige page to view current listings.";
  } else if (lower.includes("contact") || lower.includes("phone") || lower.includes("call") || lower.includes("office")) {
    reply = "You can reach us via our Contact page, or call the office directly. We're available Monday–Friday 8:30am–5:30pm and Saturday 9am–4pm.";
  }

  return NextResponse.json({ reply });
}
