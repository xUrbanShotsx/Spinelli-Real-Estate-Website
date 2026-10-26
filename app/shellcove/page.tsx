import type { Metadata } from "next";
import ShellCoveForm from "./ShellCoveForm";
import ShellCoveStats from "./ShellCoveStats";

export const metadata: Metadata = {
  title: "Shell Cove Market Insights | Spinelli Real Estate",
  description: "Shell Cove market snapshot from Spinelli — median house price $1.45M, 61 days on market. Book a free 10 minute market appraisal.",
  robots: { index: false, follow: false },
};

const AGENTS = [
  { name: "Mark Spinelli", role: "Director", phone: "0401 385 662", tel: "0401385662" },
  { name: "Aaron Hofman", role: "Sales Associate", phone: "0439 555 880", tel: "0439555880" },
];

export default function ShellCovePage() {
  return (
    <main style={{ overflow: "hidden", backgroundColor: "#ffffff", fontFamily: "var(--font-sans)" }}>

      {/* ── Hero ── */}
      <section style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#ffffff", textAlign: "center" }}>
        <img
          src="/shellcove/hero.jpg"
          alt="Shell Cove marina"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 65%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,51,72,0.45) 0%, rgba(13,51,72,0.20) 40%, rgba(13,51,72,0.35) 70%, rgba(13,51,72,0.65) 100%)" }} />

        <div style={{ position: "relative", zIndex: 10, padding: "0 40px" }}>
          <p style={{ fontSize: "12px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.85, margin: "0 0 24px", color: "#ffffff" }}>
            Your local property experts
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, lineHeight: 0.95, letterSpacing: "-0.03em", margin: "0 0 20px", color: "#ffffff" }}>
            <span style={{ display: "block", fontSize: "clamp(4rem, 12vw, 10rem)" }}>Shell Cove</span>
          </h1>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 4vw, 3rem)", fontWeight: 300, color: "#ffffff", margin: "0 0 48px", letterSpacing: "-0.02em" }}>
            Market insights
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            <a
              href="#appraisal"
              style={{ backgroundColor: "#5BC2E7", color: "#fff", padding: "14px 32px", fontSize: "13px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}
            >
              Get a Free Appraisal
            </a>
            <a
              href="#snapshot"
              style={{ border: "1px solid rgba(255,255,255,0.5)", color: "#fff", padding: "14px 32px", fontSize: "13px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}
            >
              View the market
            </a>
          </div>
        </div>

        <a href="#snapshot" style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", zIndex: 10, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} style={{ width: "28px", height: "28px" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </section>

      {/* ── Market snapshot ── */}
      <section id="snapshot" style={{ padding: "96px 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gap: "32px", gridTemplateColumns: "1fr 1.4fr", alignItems: "end", marginBottom: "64px" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "#a2b0aa", margin: "0 0 16px" }}>
                Shell Cove · Market snapshot
              </p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0 }}>
                Your Shell Cove<br />
                <span style={{ color: "#5BC2E7" }}>market snapshot</span>
              </h2>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#7a7265", maxWidth: "42ch", margin: 0, justifySelf: "end" }}>
              A quick look at how the Shell Cove market is performing right now, from your local property experts at Spinelli.
            </p>
          </div>

          <ShellCoveStats />
        </div>
      </section>

      {/* ── Thinking of selling ── */}
      <section style={{ backgroundColor: "#FBF9F3", padding: "96px 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px", display: "grid", gap: "56px", gridTemplateColumns: "1fr 1fr", alignItems: "end" }}>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "#a2b0aa", margin: "0 0 16px" }}>
              Thinking of selling?
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 0 24px" }}>
              Get the local insights from the Spinelli team.
            </h2>
            <p style={{ fontSize: "15px", color: "#7a7265", margin: "0 0 32px", lineHeight: 1.7 }}>
              Book a no obligation <strong style={{ color: "#000", fontWeight: 500 }}>10 minute market appraisal</strong>.
            </p>
            <a
              href="#appraisal"
              style={{ display: "inline-block", border: "1px solid #000", color: "#000", padding: "14px 28px", fontSize: "13px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}
            >
              Book your appraisal
            </a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "#E8E5DF" }}>
            {AGENTS.map(a => (
              <div key={a.name} style={{ backgroundColor: "#ffffff", padding: "32px" }}>
                <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "#a2b0aa", margin: "0 0 8px" }}>{a.role}</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 300, letterSpacing: "-0.02em", margin: "0 0 24px" }}>{a.name}</p>
                <a href={`tel:${a.tel}`} style={{ fontSize: "15px", fontWeight: 500, color: "#000", textDecoration: "none" }}>{a.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Appraisal form ── */}
      <section id="appraisal" style={{ padding: "96px 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px", display: "grid", gap: "56px", gridTemplateColumns: "1fr 1.3fr", alignItems: "start" }}>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "#a2b0aa", margin: "0 0 16px" }}>
              No obligation · 10 minutes
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 0 24px" }}>
              Book your free<br />market appraisal
            </h2>
            <p style={{ fontSize: "15px", color: "#7a7265", lineHeight: 1.75, maxWidth: "38ch", margin: 0 }}>
              Leave your details and the Spinelli team will be in touch to find out what your Shell Cove property could be worth.
            </p>
          </div>
          <div style={{ border: "1px solid #E8E5DF", padding: "40px" }}>
            <ShellCoveForm />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid #E8E5DF", padding: "40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
        <img src="/logo.png" alt="Spinelli Real Estate" style={{ height: "22px", width: "auto" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", textAlign: "right", fontSize: "13px", color: "#7a7265" }}>
          <a href="tel:0242960047" style={{ color: "#7a7265", textDecoration: "none" }}>02 4296 0047</a>
          <a href="https://www.spinellirealestate.com.au" target="_blank" rel="noreferrer" style={{ color: "#7a7265", textDecoration: "none" }}>spinellirealestate.com.au</a>
        </div>
      </footer>
    </main>
  );
}
