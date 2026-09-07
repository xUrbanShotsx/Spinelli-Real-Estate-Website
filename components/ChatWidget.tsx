"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
interface PropertyCard {
  id: string;
  address: string;
  suburb: string;
  price: string;
  beds?: number;
  baths?: number;
  cars?: number;
  landSize?: string;
  image: string;
  tag?: string;
  openHome?: string;
  url: string;
  type: string;
  category?: string;
}

interface CalcRow {
  label: string;
  value: string;
  highlight?: boolean;
}

interface CalcData {
  title?: string;
  purchasePrice?: number;
  standardDuty?: number;
  fhbDuty?: number | null;
  fhbSaving?: number | null;
  disclaimer?: string;
  ratesDate?: string;
  rows?: CalcRow[];
}

interface Inspection {
  date: string;
  start: string;
  end: string;
}

interface AgentInfo {
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
  profileUrl: string;
}

interface SuburbStatsData {
  suburb: string;
  postcode: string;
  medianHousePrice: number | null;
  medianUnitPrice: number | null;
  medianWeeklyRent: number | null;
  avgDaysOnMarket: number | null;
  soldLast12Months: number | null;
  formattedHousePrice: string;
  formattedUnitPrice: string;
  source: string;
  sourceUrl: string;
  asOf: string;
}

interface ChatComponent {
  type: "property_cards" | "calculator_result" | "inspection_times" | "quick_replies" | "suburb_stats" | "agent_cards";
  properties?: PropertyCard[];
  inspections?: Inspection[];
  agents?: AgentInfo[];
  data?: CalcData | SuburbStatsData;
  items?: string[];
}

interface Message {
  role: "user" | "assistant";
  content: string;
  components?: ChatComponent[];
}

// ─── Constants ────────────────────────────────────────────────────────────────
const BLUE = "#5BC2E7";
const BLUE_DARK = "#3aafd6";

const QUICK_ACTIONS = [
  { label: "Buy a Property",          msg: "I'm looking to buy a property in the Illawarra." },
  { label: "Sell My Property",        msg: "I'd like to sell my property and get an appraisal." },
  { label: "Rent a Property",         msg: "I'm looking for a rental property." },
  { label: "Property Management",     msg: "I'm interested in property management services." },
  { label: "Stamp Duty Calculator",   msg: "Can you help me calculate stamp duty?" },
  { label: "Request an Appraisal",    msg: "I'd like a free property appraisal." },
  { label: "Commercial Property",     msg: "I'm looking for commercial property." },
  { label: "New Projects",            msg: "Tell me about upcoming projects and developments." },
];

// ─── Page context helpers ─────────────────────────────────────────────────────
function getPageContext(pathname: string) {
  // Detect property ID from URL
  const propertyMatch = pathname.match(/^\/property\/([^/]+)/);
  const prestigeMatch = pathname.match(/^\/prestige\/([^/]+)/);
  const propertyId = propertyMatch?.[1] ?? prestigeMatch?.[1] ?? undefined;

  // Map path prefix to page type
  let pageType = "general";
  if (pathname === "/") pageType = "home";
  else if (propertyMatch) pageType = "property";
  else if (pathname.startsWith("/prestige")) pageType = "prestige";
  else if (pathname.startsWith("/buy")) pageType = "buy";
  else if (pathname.startsWith("/rent")) pageType = "rent";
  else if (pathname.startsWith("/sold")) pageType = "sold";
  else if (pathname.startsWith("/commercial")) pageType = "commercial";
  else if (pathname.startsWith("/sell")) pageType = "sell";
  else if (pathname.startsWith("/appraisal")) pageType = "appraisal";
  else if (pathname.startsWith("/projects")) pageType = "projects";
  else if (pathname.startsWith("/property-management")) pageType = "property-management";

  const intros: Record<string, string> = {
    "/property":             "Have a question about this property? I can help with inspections, buying costs, or arranging a viewing.",
    "/prestige":             "Interested in this prestige listing? I can help with details, inspections, or a private viewing.",
    "/sell":                 "Thinking of selling? I can arrange a complimentary property appraisal.",
    "/property-management":  "Own an investment property? I can answer questions about management or arrange a rental appraisal.",
    "/projects":             "Interested in a development? I can help with availability and pricing.",
    "/rent":                 "Looking for a rental? Tell me what you need and I'll check what's available.",
    "/commercial":           "Looking for commercial property? Tell me what you need and I'll check our listings.",
    "/buy":                  "Looking to buy? Tell me your suburb, budget, and bedrooms and I'll check our listings.",
    "/appraisal":            "Ready to get a property appraisal? I can collect your details and have the team reach out.",
  };

  let welcomeText = "Hi! How can I help with your property journey today?";
  for (const prefix of Object.keys(intros)) {
    if (pathname.startsWith(prefix)) {
      welcomeText = intros[prefix];
      break;
    }
  }

  return {
    url: typeof window !== "undefined" ? window.location.href : `https://www.spinellirealestate.com.au${pathname}`,
    title: typeof document !== "undefined" ? document.title : "",
    pageType,
    propertyId,
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function PropertyCards({ properties }: { properties: PropertyCard[] }) {
  if (!properties.length) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "6px" }}>
      {properties.map(p => (
        <a
          key={p.id}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "flex", gap: "10px", backgroundColor: "#ffffff", border: "1px solid #e4f4fb", borderRadius: "10px", overflow: "hidden", textDecoration: "none", color: "inherit", transition: "box-shadow 0.15s" }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(91,194,231,0.18)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
        >
          {/* Thumbnail */}
          <div style={{ position: "relative", width: "80px", minWidth: "80px", height: "72px", backgroundColor: "#e4f4fb", flexShrink: 0 }}>
            {p.image ? (
              <Image src={p.image} alt={p.address} fill style={{ objectFit: "cover" }} sizes="80px" />
            ) : (
              <div style={{ width: "100%", height: "100%", backgroundColor: "#d0ecf7" }} />
            )}
            {p.tag && (
              <span style={{ position: "absolute", top: "4px", left: "4px", backgroundColor: BLUE, color: "#fff", fontSize: "9px", fontWeight: 700, padding: "2px 5px", borderRadius: "3px", letterSpacing: "0.04em" }}>
                {p.tag}
              </span>
            )}
          </div>
          {/* Info */}
          <div style={{ padding: "8px 10px 8px 2px", flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "11.5px", fontWeight: 700, color: "#1a2d3d", margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.address}</p>
            <p style={{ fontSize: "10.5px", color: "#5a7a8a", margin: "0 0 4px" }}>{p.suburb}</p>
            <p style={{ fontSize: "12px", fontWeight: 700, color: BLUE, margin: "0 0 4px" }}>{p.price}</p>
            <div style={{ display: "flex", gap: "8px", fontSize: "10.5px", color: "#7a9aaa" }}>
              {p.beds != null && <span>🛏 {p.beds}</span>}
              {p.baths != null && <span>🚿 {p.baths}</span>}
              {p.cars != null && <span>🚗 {p.cars}</span>}
            </div>
            {p.openHome && <p style={{ fontSize: "9.5px", color: "#e68c3a", fontWeight: 600, margin: "3px 0 0", letterSpacing: "0.03em" }}>Open: {p.openHome}</p>}
          </div>
        </a>
      ))}
    </div>
  );
}

function CalculatorResult({ data }: { data: CalcData }) {
  return (
    <div style={{ backgroundColor: "#ffffff", border: "1px solid #e4f4fb", borderRadius: "10px", overflow: "hidden", marginTop: "6px" }}>
      {data.title && (
        <div style={{ backgroundColor: "#f0f9fd", borderBottom: "1px solid #e4f4fb", padding: "8px 12px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#1a2d3d", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>{data.title}</p>
        </div>
      )}
      <div style={{ padding: "10px 12px" }}>
        {data.rows ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {data.rows.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontSize: "11.5px", color: "#5a7a8a", padding: "3px 0" }}>{row.label}</td>
                  <td style={{ fontSize: row.highlight ? "13px" : "11.5px", fontWeight: row.highlight ? 700 : 400, color: row.highlight ? BLUE : "#1a2d3d", padding: "3px 0", textAlign: "right" }}>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            {data.standardDuty != null && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "11.5px", color: "#5a7a8a" }}>Standard duty</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#1a2d3d" }}>${data.standardDuty.toLocaleString("en-AU")}</span>
              </div>
            )}
            {data.fhbDuty != null && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", padding: "6px 8px", backgroundColor: "#f0f9fd", borderRadius: "6px" }}>
                <span style={{ fontSize: "11.5px", color: "#1a7a3a", fontWeight: 600 }}>FHB duty</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#1a7a3a" }}>${data.fhbDuty.toLocaleString("en-AU")}</span>
              </div>
            )}
            {data.fhbSaving != null && data.fhbSaving > 0 && (
              <p style={{ fontSize: "11px", color: "#1a7a3a", margin: "4px 0 0", fontWeight: 600 }}>
                You save ${data.fhbSaving.toLocaleString("en-AU")} as a first home buyer!
              </p>
            )}
          </>
        )}
        {data.disclaimer && (
          <p style={{ fontSize: "9.5px", color: "#94b8c6", margin: "8px 0 0", lineHeight: 1.5 }}>{data.disclaimer}</p>
        )}
      </div>
    </div>
  );
}

function InspectionTimes({ inspections }: { inspections: Inspection[] }) {
  return (
    <div style={{ backgroundColor: "#ffffff", border: "1px solid #e4f4fb", borderRadius: "10px", overflow: "hidden", marginTop: "6px" }}>
      <div style={{ backgroundColor: "#f0f9fd", borderBottom: "1px solid #e4f4fb", padding: "8px 12px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#1a2d3d", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>Open Homes</p>
      </div>
      <div style={{ padding: "8px 12px", display: "flex", flexDirection: "column", gap: "6px" }}>
        {inspections.map((ins, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
            <span style={{ color: "#1a2d3d", fontWeight: 500 }}>{ins.date}</span>
            <span style={{ color: BLUE, fontWeight: 600 }}>{ins.start} – {ins.end}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentCards({ agents }: { agents: AgentInfo[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "6px" }}>
      {agents.map(a => (
        <div key={a.email} style={{ display: "flex", gap: "12px", alignItems: "center", backgroundColor: "#ffffff", border: "1px solid #e4f4fb", borderRadius: "10px", padding: "10px 12px" }}>
          <div style={{ position: "relative", width: "46px", height: "46px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, backgroundColor: "#d0ecf7" }}>
            <Image src={a.image} alt={a.name} fill style={{ objectFit: "cover" }} sizes="46px" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "12.5px", fontWeight: 700, color: "#1a2d3d", margin: "0 0 1px" }}>{a.name}</p>
            <p style={{ fontSize: "10.5px", color: "#5a7a8a", margin: "0 0 6px" }}>{a.role}</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <a href={`tel:${a.phone.replace(/\s/g, "")}`} style={{ fontSize: "11px", color: BLUE, fontWeight: 600, textDecoration: "none" }}>
                📞 {a.phone}
              </a>
              <a href={`mailto:${a.email}`} style={{ fontSize: "11px", color: "#5a7a8a", textDecoration: "none" }}>
                ✉ {a.email}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SuburbStatsCard({ data }: { data: SuburbStatsData }) {
  const rows = [
    { label: "Median house price", value: data.formattedHousePrice },
    data.medianUnitPrice ? { label: "Median unit price", value: data.formattedUnitPrice } : null,
    data.medianWeeklyRent ? { label: "Median weekly rent", value: `$${data.medianWeeklyRent}/wk` } : null,
    data.avgDaysOnMarket ? { label: "Avg days on market", value: `${data.avgDaysOnMarket} days` } : null,
    data.soldLast12Months ? { label: "Sold (last 12 months)", value: `${data.soldLast12Months} properties` } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div style={{ backgroundColor: "#ffffff", border: "1px solid #e4f4fb", borderRadius: "10px", overflow: "hidden", marginTop: "6px" }}>
      <div style={{ backgroundColor: "#f0f9fd", borderBottom: "1px solid #e4f4fb", padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#1a2d3d", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>
          {data.suburb} Market Stats
        </p>
        <span style={{ fontSize: "9.5px", color: "#94b8c6" }}>{data.asOf}</span>
      </div>
      <div style={{ padding: "10px 12px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td style={{ fontSize: "11.5px", color: "#5a7a8a", padding: "3px 0" }}>{row.label}</td>
                <td style={{ fontSize: "12px", fontWeight: 600, color: "#1a2d3d", padding: "3px 0", textAlign: "right" }}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: "9.5px", color: "#94b8c6", margin: "8px 0 0", lineHeight: 1.5 }}>
          Source: <a href={data.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#94b8c6" }}>{data.source}</a> · Data is indicative only.
        </p>
      </div>
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: isUser ? "flex-end" : "flex-start", gap: "6px" }}>
      <div style={{
        maxWidth: "86%",
        padding: "9px 13px",
        backgroundColor: isUser ? BLUE : "#ffffff",
        color: isUser ? "#ffffff" : "#1a2d3d",
        fontSize: "13px",
        lineHeight: 1.6,
        letterSpacing: "0.01em",
        boxShadow: isUser ? "none" : "0 1px 4px rgba(91,194,231,0.12)",
        border: isUser ? "none" : "1px solid #e4f4fb",
        borderRadius: isUser ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}>
        {msg.content}
      </div>
      {msg.components?.map((comp, i) => {
        if (comp.type === "property_cards" && comp.properties?.length) {
          return <div key={i} style={{ maxWidth: "96%", width: "100%" }}><PropertyCards properties={comp.properties} /></div>;
        }
        if (comp.type === "calculator_result" && comp.data) {
          return <div key={i} style={{ maxWidth: "96%", width: "100%" }}><CalculatorResult data={comp.data as CalcData} /></div>;
        }
        if (comp.type === "inspection_times" && comp.inspections?.length) {
          return <div key={i} style={{ maxWidth: "96%", width: "100%" }}><InspectionTimes inspections={comp.inspections} /></div>;
        }
        if (comp.type === "agent_cards" && comp.agents?.length) {
          return <div key={i} style={{ maxWidth: "96%", width: "100%" }}><AgentCards agents={comp.agents as AgentInfo[]} /></div>;
        }
        if (comp.type === "suburb_stats" && comp.data) {
          return <div key={i} style={{ maxWidth: "96%", width: "100%" }}><SuburbStatsCard data={comp.data as SuburbStatsData} /></div>;
        }
        return null;
      })}
    </div>
  );
}

// ─── Main Widget ──────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // scrolledPastHero tracks whether the hero is out of view.
  // Deriving visibility as (isHome && !scrolledPastHero) means the
  // correct value is computed in the same render that isHome changes —
  // no one-frame flash when navigating to/from the home page.
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const hidden = isHome && !scrolledPastHero;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    function onResize() { setIsMobile(window.innerWidth < 640); }
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Hero hide logic — only wires up scroll listener on home page
  useEffect(() => {
    if (!isHome) {
      setScrolledPastHero(false); // reset for next visit to home
      return;
    }
    function onScroll() { setScrolledPastHero(window.scrollY >= window.innerHeight); }
    onScroll(); // check immediately on mount / navigation
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (open) setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 60);
  }, [messages, open]);

  // Focus input on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  // Init welcome message when chat opens
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: getWelcome(pathname) }]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function getWelcome(path: string): string {
    const intros: [string, string][] = [
      ["/property",            "Have a question about this property? I can help with inspections, buying costs, or arranging a viewing."],
      ["/prestige",            "Interested in this prestige listing? I can help with property details, inspections, or a private viewing."],
      ["/sell",                "Thinking of selling? I can help arrange a complimentary property appraisal."],
      ["/property-management", "Own an investment property? I can answer questions about property management or a rental appraisal."],
      ["/projects",            "Interested in a development? I can help with availability and pricing."],
      ["/rent",                "Looking for a rental? Tell me what you need and I'll check what's available."],
      ["/commercial",          "Looking for commercial property? Tell me what you need and I'll check our listings."],
      ["/buy",                 "Looking to buy? Tell me your suburb, budget, and bedrooms and I'll check our listings."],
      ["/appraisal",           "Ready to get a property appraisal? I'll collect your details and have the team reach out."],
    ];
    for (const [prefix, intro] of intros) {
      if (path.startsWith(prefix)) return intro;
    }
    return "Hi! I'm Spinelli AI, your property concierge. How can I help with your property journey today?";
  }

  const send = useCallback(async (text?: string) => {
    const txt = (text ?? input).trim();
    if (!txt || loading) return;
    setInput("");
    setShowQuickActions(false);

    const userMsg: Message = { role: "user", content: txt };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const ctx = getPageContext(pathname);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(m => ({ role: m.role, content: m.content })),
          pageContext: ctx,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMessages([...next, {
        role: "assistant",
        content: data.reply ?? "I'm unable to respond right now. Please call our office on (02) 4296 0047.",
        components: data.components ?? [],
      }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Sorry, something went wrong. Please try again or contact our office on (02) 4296 0047." }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, pathname]);

  if (hidden) return null;

  const sendActive = !loading && input.trim().length > 0;

  // Mobile: full screen; desktop: popup
  const panelStyle: React.CSSProperties = isMobile
    ? { position: "fixed", inset: 0, zIndex: 9998, display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }
    : {
        position: "fixed",
        bottom: "100px",
        right: "clamp(16px, 3vw, 32px)",
        width: "clamp(300px, 90vw, 376px)",
        height: "clamp(460px, 65vh, 580px)",
        backgroundColor: "#ffffff",
        boxShadow: "0 12px 56px rgba(0,0,0,0.15), 0 2px 12px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        zIndex: 9998,
        border: "1px solid #e4f4fb",
        borderRadius: "20px",
        overflow: "hidden",
      };

  return (
    <>
      {open && (
        <div style={panelStyle}>
          {/* Header */}
          <div style={{ backgroundColor: BLUE, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "34px", height: "34px", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" fill="#ffffff" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#ffffff", letterSpacing: "0.05em", textTransform: "uppercase", lineHeight: 1.2, margin: 0 }}>Spinelli AI</p>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.80)", letterSpacing: "0.03em", lineHeight: 1.4, margin: 0 }}>Your 24/7 Property Concierge</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: "20px", lineHeight: 1, padding: "4px", display: "flex" }}
            >✕</button>
          </div>

          {/* Messages area */}
          <div
            style={{ flex: 1, overflowY: "auto", padding: "16px 12px 8px", display: "flex", flexDirection: "column", gap: "10px", scrollbarWidth: "none", backgroundColor: "#f8fcfe" }}
            className="[&::-webkit-scrollbar]:hidden"
          >
            {messages.map((m, i) => <MessageBubble key={i} msg={m} />)}

            {/* Quick actions — only shown before user sends first message */}
            {showQuickActions && messages.length <= 1 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginTop: "4px" }}>
                {QUICK_ACTIONS.map(a => (
                  <button
                    key={a.label}
                    onClick={() => send(a.msg)}
                    style={{
                      backgroundColor: "#ffffff",
                      border: `1.5px solid ${BLUE}`,
                      borderRadius: "8px",
                      padding: "7px 8px",
                      fontSize: "10.5px",
                      fontWeight: 600,
                      color: "#1a2d3d",
                      cursor: "pointer",
                      textAlign: "left",
                      lineHeight: 1.35,
                      transition: "background-color 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#f0f9fd"; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ padding: "9px 13px", backgroundColor: "#ffffff", border: "1px solid #e4f4fb", borderRadius: "12px 12px 12px 2px", display: "flex", gap: "4px", alignItems: "center" }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{ width: "6px", height: "6px", backgroundColor: BLUE, borderRadius: "50%", display: "inline-block", animation: `chatbounce 1.2s ease ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "10px 12px 6px", borderTop: "1px solid #e4f4fb", display: "flex", gap: "8px", flexShrink: 0, backgroundColor: "#ffffff" }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Ask anything about property…"
              disabled={loading}
              style={{
                flex: 1,
                fontSize: "13px",
                color: "#1a2d3d",
                backgroundColor: "#f0f9fd",
                border: "1px solid #d0ecf7",
                outline: "none",
                padding: "9px 12px",
                letterSpacing: "0.01em",
                borderRadius: "6px",
              }}
            />
            <button
              onClick={() => send()}
              disabled={!sendActive}
              aria-label="Send"
              style={{
                backgroundColor: sendActive ? BLUE : "#d0ecf7",
                border: "none",
                cursor: sendActive ? "pointer" : "default",
                padding: "0 13px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s",
                flexShrink: 0,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M2 21L23 12 2 3v7l15 2-15 2v7z" fill={sendActive ? "#ffffff" : "#8acfe6"} />
              </svg>
            </button>
          </div>

          {/* Disclaimer */}
          <div style={{ padding: "5px 14px 10px", backgroundColor: "#ffffff" }}>
            <p style={{ fontSize: "9.5px", color: "#94b8c6", textAlign: "center", lineHeight: 1.5, letterSpacing: "0.02em", margin: 0 }}>
              AI responses are for general guidance only — consult a licensed agent for specific advice.
            </p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close chat" : "Open Spinelli AI chat"}
        style={{
          position: "fixed",
          bottom: "clamp(20px, 3vw, 32px)",
          right: "clamp(16px, 3vw, 32px)",
          width: "54px",
          height: "54px",
          backgroundColor: BLUE,
          border: "none",
          cursor: "pointer",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(91,194,231,0.45)",
          borderRadius: "50%",
          transition: "background-color 0.2s, transform 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = BLUE_DARK; e.currentTarget.style.transform = "scale(1.07)"; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = BLUE; e.currentTarget.style.transform = "scale(1)"; }}
      >
        {open ? (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" fill="#ffffff" />
            <circle cx="8.5" cy="10" r="1.1" fill={BLUE} />
            <circle cx="12" cy="10" r="1.1" fill={BLUE} />
            <circle cx="15.5" cy="10" r="1.1" fill={BLUE} />
          </svg>
        )}
      </button>

      <style>{`
        @keyframes chatbounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
