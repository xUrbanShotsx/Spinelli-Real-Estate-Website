"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const NAV_H = 110;

function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function PrestigeContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ height: "100svh", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ flex: 1 }} />

        <div style={{ textAlign: "center", padding: "0 clamp(24px, 8vw, 120px)", maxWidth: "780px" }}>
          <HeroText />
        </div>


        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "32px" }}>
          <div style={{ width: "1px", flex: 1, backgroundColor: "rgba(13,51,72,0.15)" }} />
        </div>
      </section>

      {/* ── Coming Soon ── */}
      <section
        style={{
          minHeight: "100vh",
          backgroundColor: "#0D3348",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: `${NAV_H}px clamp(24px, 8vw, 120px) clamp(60px, 8vw, 120px)`,
          textAlign: "center",
        }}
      >
        <FadeUp>
          <span style={{
            fontFamily: "var(--font-sans)",
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#5BC2E7",
            display: "block",
            marginBottom: "40px",
          }}>
            Prestige Collection
          </span>

          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 8vw, 8rem)",
            color: "#ffffff",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            marginBottom: "40px",
          }}>
            Something<br />Exceptional<br />Is Coming.
          </h2>

          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(12px, 1.4vw, 14px)",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.85,
            maxWidth: "48ch",
            margin: "0 auto 52px",
          }}>
            Our prestige collection is being curated now. Register below to be the first to access exclusive listings before they reach the open market.
          </p>

          <RegisterForm />
        </FadeUp>
      </section>

      {/* ── What to expect ── */}
      <section style={{ backgroundColor: "#ffffff", borderTop: "1px solid #E8E5DF" }}>
        <div className="max-w-screen-xl mx-auto" style={{ padding: "clamp(60px, 8vw, 120px) clamp(24px, 5vw, 80px)" }}>
          <FadeUp>
            <div style={{ borderBottom: "1px solid #E8E5DF", paddingBottom: "40px", marginBottom: "60px" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "16px" }}>
                What to Expect
              </span>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#0D3348",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                maxWidth: "18ch",
              }}>
                Properties That Define a Standard.
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "clamp(32px, 4vw, 64px)" }}>
            {[
              {
                num: "01",
                heading: "Curated Selection",
                body: "Only the finest homes make the cut — architecturally significant residences, waterfront estates, and landmark properties across the Illawarra.",
              },
              {
                num: "02",
                heading: "Off-Market Access",
                body: "Registered buyers receive exclusive access to prestige listings before they are publicly advertised, giving you a decisive first-mover advantage.",
              },
              {
                num: "03",
                heading: "White-Glove Service",
                body: "Dedicated agent, private inspections, and discreet representation from initial inquiry through to settlement.",
              },
            ].map((item, i) => (
              <FadeUp key={item.num} delay={i * 100}>
                <div style={{ borderTop: "1px solid #E8E5DF", paddingTop: "32px" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 4vw, 3.5rem)", color: "#E8E5DF", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1, display: "block", marginBottom: "24px" }}>
                    {item.num}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 2vw, 1.7rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "16px" }}>
                    {item.heading}
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.85 }}>
                    {item.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enquiry CTA ── */}
      <section style={{ backgroundColor: "#FBF9F3", borderTop: "1px solid #E8E5DF" }}>
        <div className="max-w-screen-xl mx-auto" style={{ padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)" }}>
          <FadeUp>
            <div className="grid lg:grid-cols-2" style={{ gap: "60px", alignItems: "center" }}>
              <div>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "16px" }}>
                  Selling a Prestige Property?
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "24px" }}>
                  Your home deserves<br />exceptional representation.
                </h2>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.85, maxWidth: "46ch", marginBottom: "36px" }}>
                  Spinelli's prestige team brings bespoke marketing, an established network of high-net-worth buyers, and a track record of achieving premium results across the Illawarra.
                </p>
                <Link
                  href="/appraisal"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#ffffff",
                    backgroundColor: "#5BC2E7",
                    padding: "14px 32px",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  Request an Appraisal
                </Link>
              </div>
              <div style={{ borderLeft: "1px solid #E8E5DF", paddingLeft: "clamp(32px, 4vw, 60px)" }}>
                {[
                  { v: "350+", l: "Properties Managed" },
                  { v: "12+", l: "Years in the Illawarra" },
                  { v: "97%", l: "Tenancy Rate" },
                  { v: "$0", l: "Appraisal Cost" },
                ].map((s) => (
                  <div key={s.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 0", borderBottom: "1px solid #E8E5DF" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265" }}>{s.l}</span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.03em" }}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

function HeroText() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 150); return () => clearTimeout(t); }, []);
  return (
    <p style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)",
      color: "#0D3348",
      fontWeight: 300,
      lineHeight: 1.55,
      letterSpacing: "-0.01em",
      textAlign: "center",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
    }}>
      An exclusive collection of the Illawarra&apos;s finest homes — curated for those who demand the exceptional.
    </p>
  );
}

function RegisterForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", budget: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: "Prestige Property Registration" }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "#5BC2E7", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "8px" }}>
          You&apos;re registered.
        </p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
          We&apos;ll be in touch as soon as something exceptional becomes available.
        </p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontSize: "13px",
    color: "#ffffff",
    backgroundColor: "transparent",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "13px 16px",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "12px" }}>
        <input required placeholder="First name" value={form.firstName} onChange={e => set("firstName", e.target.value)} style={inputStyle} />
        <input required placeholder="Last name" value={form.lastName} onChange={e => set("lastName", e.target.value)} style={inputStyle} />
        <input required type="email" placeholder="Email address" value={form.email} onChange={e => set("email", e.target.value)} style={inputStyle} />
        <input placeholder="Phone (optional)" value={form.phone} onChange={e => set("phone", e.target.value)} style={inputStyle} />
      </div>
      <input placeholder="Budget (optional, e.g. $2M+)" value={form.budget} onChange={e => set("budget", e.target.value)} style={inputStyle} />
      <button
        type="submit"
        disabled={status === "submitting"}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#0D3348",
          backgroundColor: "#ffffff",
          padding: "15px 32px",
          border: "none",
          cursor: status === "submitting" ? "wait" : "pointer",
          opacity: status === "submitting" ? 0.6 : 1,
          marginTop: "4px",
        }}
      >
        {status === "submitting" ? "Registering…" : "Register for Early Access"}
      </button>
      {status === "error" && (
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#e74c3c", textAlign: "center" }}>
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}
