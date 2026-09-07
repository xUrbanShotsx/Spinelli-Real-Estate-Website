"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  role: "assistant",
  content: "Hi! I'm the Spinelli Real Estate assistant. I can help you find properties, answer questions about buying or renting in the Illawarra, or connect you with our team. How can I help?",
};

const BLUE = "#5BC2E7";
const BLUE_DARK = "#3aafd6";

export default function ChatWidget() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [hidden, setHidden] = useState(isHome);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isHome) { setHidden(false); return; }
    function onScroll() { setHidden(window.scrollY < window.innerHeight * 0.85); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply ?? "I'm unable to respond right now. Please call our office or send us an enquiry." }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Sorry, something went wrong. Please try again or contact our office directly." }]);
    } finally {
      setLoading(false);
    }
  }

  if (hidden) return null;

  const sendActive = !loading && input.trim().length > 0;

  return (
    <>
      {/* ── Chat panel ── */}
      {open && (
        <div style={{
          position: "fixed",
          bottom: "84px",
          right: "clamp(16px, 3vw, 32px)",
          width: "clamp(300px, 90vw, 370px)",
          height: "clamp(440px, 62vh, 560px)",
          backgroundColor: "#ffffff",
          boxShadow: "0 12px 56px rgba(0,0,0,0.15), 0 2px 12px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          zIndex: 9998,
          border: "1px solid #e4f4fb",
          borderRadius: "20px",
          overflow: "hidden",
        }}>

          {/* Header */}
          <div style={{ backgroundColor: BLUE, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "34px", height: "34px", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" fill="#ffffff" />
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: "#ffffff", letterSpacing: "0.05em", textTransform: "uppercase", lineHeight: 1.2 }}>Spinelli Assistant</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.75)", letterSpacing: "0.03em", lineHeight: 1.4 }}>AI Powered · Here to help</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: "20px", lineHeight: 1, padding: "4px", display: "flex" }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "18px 14px 8px", display: "flex", flexDirection: "column", gap: "10px", scrollbarWidth: "none", backgroundColor: "#f8fcfe" }} className="[&::-webkit-scrollbar]:hidden">
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "84%",
                  padding: "9px 13px",
                  backgroundColor: m.role === "user" ? BLUE : "#ffffff",
                  color: m.role === "user" ? "#ffffff" : "#1a2d3d",
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  letterSpacing: "0.01em",
                  boxShadow: m.role === "user" ? "none" : "0 1px 4px rgba(91,194,231,0.12)",
                  border: m.role === "user" ? "none" : "1px solid #e4f4fb",
                  borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                }}>
                  {m.content}
                </div>
              </div>
            ))}
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

          {/* Input row */}
          <div style={{ padding: "10px 12px 6px", borderTop: "1px solid #e4f4fb", display: "flex", gap: "8px", flexShrink: 0, backgroundColor: "#ffffff" }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Ask anything…"
              disabled={loading}
              style={{
                flex: 1,
                fontFamily: "var(--font-sans)",
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
              onClick={send}
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
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M2 21L23 12 2 3v7l15 2-15 2v7z" fill={sendActive ? "#ffffff" : "#8acfe6"} /></svg>
            </button>
          </div>

          {/* Disclaimer */}
          <div style={{ padding: "6px 14px 10px", backgroundColor: "#ffffff" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "9.5px", color: "#94b8c6", textAlign: "center", lineHeight: 1.5, letterSpacing: "0.02em" }}>
              AI responses are for general guidance only — consult a licensed agent for specific advice.
            </p>
          </div>
        </div>
      )}

      {/* ── Toggle button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
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
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" /></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" fill="#ffffff" /><circle cx="8.5" cy="10" r="1.1" fill={BLUE} /><circle cx="12" cy="10" r="1.1" fill={BLUE} /><circle cx="15.5" cy="10" r="1.1" fill={BLUE} /></svg>
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
