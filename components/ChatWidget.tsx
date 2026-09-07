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

  // On home page: hide widget while hero video is visible
  useEffect(() => {
    if (!isHome) { setHidden(false); return; }
    function onScroll() {
      setHidden(window.scrollY < window.innerHeight * 0.85);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Scroll to latest message
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Focus input when opening
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
      setMessages([...next, { role: "assistant", content: data.reply ?? "I'm unable to respond right now. Please call our office or send us an enquiry and we'll get back to you shortly." }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Sorry, something went wrong. Please try again or contact our office directly." }]);
    } finally {
      setLoading(false);
    }
  }

  if (hidden) return null;

  return (
    <>
      {/* ── Chat panel ── */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "88px",
            right: "clamp(16px, 3vw, 32px)",
            width: "clamp(300px, 90vw, 380px)",
            height: "clamp(420px, 60vh, 560px)",
            backgroundColor: "#ffffff",
            boxShadow: "0 8px 48px rgba(0,0,0,0.18)",
            display: "flex",
            flexDirection: "column",
            zIndex: 9998,
            border: "1px solid #E8E5DF",
          }}
        >
          {/* Header */}
          <div style={{ backgroundColor: "#0a172d", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "32px", height: "32px", backgroundColor: "#5BC2E7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z" fill="#ffffff" /></svg>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: "#ffffff", letterSpacing: "0.06em", textTransform: "uppercase" }}>Spinelli Assistant</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}>Online · AI Powered</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: "18px", lineHeight: 1, padding: "4px" }} aria-label="Close chat">✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: "12px", scrollbarWidth: "none" }} className="[&::-webkit-scrollbar]:hidden">
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "10px 14px",
                    backgroundColor: m.role === "user" ? "#0a172d" : "#F4F2EE",
                    color: m.role === "user" ? "#ffffff" : "#0a172d",
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    letterSpacing: "0.01em",
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ padding: "10px 14px", backgroundColor: "#F4F2EE", display: "flex", gap: "4px", alignItems: "center" }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{ width: "6px", height: "6px", backgroundColor: "#a2b0aa", borderRadius: "50%", display: "inline-block", animation: `bounce 1.2s ease ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid #E8E5DF", display: "flex", gap: "8px", flexShrink: 0 }}>
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
                color: "#0a172d",
                backgroundColor: "#F4F2EE",
                border: "none",
                outline: "none",
                padding: "10px 12px",
                letterSpacing: "0.01em",
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              aria-label="Send"
              style={{
                backgroundColor: loading || !input.trim() ? "#E8E5DF" : "#0a172d",
                border: "none",
                cursor: loading || !input.trim() ? "default" : "pointer",
                padding: "0 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M2 21L23 12 2 3v7l15 2-15 2v7z" fill={loading || !input.trim() ? "#a2b0aa" : "#ffffff"} /></svg>
            </button>
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
          width: "56px",
          height: "56px",
          backgroundColor: "#0a172d",
          border: "none",
          cursor: "pointer",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 24px rgba(0,0,0,0.22)",
          transition: "background-color 0.2s, transform 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1a2d4d")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#0a172d")}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" /></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="8.5" cy="10" r="1" fill="#ffffff" /><circle cx="12" cy="10" r="1" fill="#ffffff" /><circle cx="15.5" cy="10" r="1" fill="#ffffff" /></svg>
        )}
      </button>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
