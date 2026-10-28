"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  height: "52px",
  border: "1px solid #E8E5DF",
  borderRadius: "8px",
  background: "#F9F8F6",
  padding: "0 16px",
  fontSize: "15px",
  fontFamily: "var(--font-sans)",
  color: "#000",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  fontWeight: 500,
  textTransform: "uppercase" as const,
  letterSpacing: "0.12em",
  color: "#a2b0aa",
  marginBottom: "8px",
  fontFamily: "var(--font-sans)",
};

export default function AppraisalPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") router.back(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  return (
    <>
      <style>{`
        .appraisal-card {
          position: relative;
          z-index: 2;
          background: #fff;
          border-radius: 24px;
          padding: 48px;
          width: 100%;
          max-width: 520px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.18);
          max-height: 90svh;
          overflow-y: auto;
        }
        .appraisal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 600px) {
          .appraisal-card { padding: 28px 24px; border-radius: 18px; max-height: 85svh; }
          .appraisal-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>

        {/* Video background */}
        <video
          autoPlay muted loop playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        >
          <source src="/hero-spinelli.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "rgba(13,51,72,0.5)", zIndex: 1 }} />

        {/* Close button */}
        <button
          onClick={() => router.back()}
          style={{
            position: "absolute", top: "24px", right: "24px", zIndex: 10,
            background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "50%", width: "40px", height: "40px",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#fff",
          }}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Card */}
        <div className="appraisal-card">
          <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "#5BC2E7", margin: "0 0 12px", textAlign: "center" }}>
            No obligation · Free
          </p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#0D3348",
            margin: "0 0 28px",
            textAlign: "center",
          }}>
            Let&apos;s Start the Conversation
          </h1>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#5BC2E7" strokeWidth={1.5} style={{ width: "48px", height: "48px", margin: "0 auto 16px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 300, letterSpacing: "-0.03em", color: "#0D3348", margin: "0 0 8px" }}>
                Thank you
              </h2>
              <p style={{ fontSize: "14px", color: "#7a7265", lineHeight: 1.7, margin: 0 }}>
                We will be in touch within one business day.
              </p>
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                try {
                  await fetch("/api/appraisal", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ firstName, lastName, email, phone, address, message }),
                  });
                } catch {}
                setLoading(false);
                setSubmitted(true);
              }}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div className="appraisal-grid">
                <div>
                  <label style={labelStyle}>First name</label>
                  <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Last name</label>
                  <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div className="appraisal-grid">
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Property address</label>
                <input type="text" required value={address} onChange={e => setAddress(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Details about your home</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  style={{ ...inputStyle, height: "auto", padding: "12px 16px", resize: "none" }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: "#5BC2E7",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "16px",
                  width: "100%",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-sans)",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  marginTop: "4px",
                }}
              >
                {loading ? "Sending…" : "Get my free appraisal"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
