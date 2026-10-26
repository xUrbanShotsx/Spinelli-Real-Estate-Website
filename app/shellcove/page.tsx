import type { Metadata } from "next";
import ShellCoveForm from "./ShellCoveForm";
import ShellCoveStats from "./ShellCoveStats";

export const metadata: Metadata = {
  title: "Shell Cove Market Insights | Spinelli Real Estate",
  description: "Shell Cove market snapshot from Spinelli — median house price $1.45M, 61 days on market. Book a free 10 minute market appraisal.",
  robots: { index: false, follow: false },
};

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
            <a href="#appraisal" style={{ backgroundColor: "#5BC2E7", color: "#fff", padding: "14px 32px", fontSize: "13px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}>
              Get a Free Appraisal
            </a>
            <a href="#snapshot" style={{ border: "1px solid rgba(255,255,255,0.5)", color: "#fff", padding: "14px 32px", fontSize: "13px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}>
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
                Your Shell Cove<br /><span style={{ color: "#5BC2E7" }}>market snapshot</span>
              </h2>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#7a7265", maxWidth: "42ch", margin: 0, justifySelf: "end" }}>
              A quick look at how the Shell Cove market is performing right now, from your local property experts at Spinelli.
            </p>
          </div>
          <ShellCoveStats />
        </div>
      </section>

      {/* ── Thinking of selling — full page ── */}
      <section style={{ minHeight: "100svh", backgroundColor: "#ffffff", display: "flex", alignItems: "center", borderTop: "1px solid #E8E5DF" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 40px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

          {/* Left — copy */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "#5BC2E7", margin: "0 0 20px" }}>
              Thinking of selling?
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.8rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 0 28px", color: "#0D3348" }}>
              Find out what your<br />Shell Cove home<br />is worth today.
            </h2>
            <p style={{ fontSize: "15px", color: "#7a7265", lineHeight: 1.8, margin: "0 0 40px", maxWidth: "40ch" }}>
              The Shell Cove market is moving. Get a no-obligation, 10-minute appraisal from the agents who know this suburb best.
            </p>

            {/* Value props */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px" }}>
              {[
                "Free — no cost, no commitment",
                "10 minutes by phone or in person",
                "Accurate local pricing, not algorithms",
                "Confidential — your details stay private",
              ].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "20px", height: "20px", backgroundColor: "#5BC2E7", borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg viewBox="0 0 20 20" fill="none" style={{ width: "11px", height: "11px" }}>
                      <path d="M4 10.5l3.5 3.5 8-8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p style={{ fontSize: "14px", color: "#000", margin: 0, fontWeight: 400 }}>{item}</p>
                </div>
              ))}
            </div>

            <a
              href="#appraisal"
              style={{ display: "inline-block", backgroundColor: "#0D3348", color: "#fff", padding: "16px 36px", fontSize: "13px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}
            >
              Book my free appraisal
            </a>
          </div>

          {/* Right — agent cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>

            {/* Mark */}
            <div style={{ backgroundColor: "#0D3348", padding: "36px 40px", display: "flex", flexDirection: "column", gap: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ width: "52px", height: "52px", backgroundColor: "#5BC2E7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 300, color: "#fff", letterSpacing: "-0.02em" }}>MS</span>
                </div>
                <div>
                  <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.4)", margin: "0 0 4px" }}>Director</p>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 300, letterSpacing: "-0.02em", color: "#fff", margin: 0 }}>Mark Spinelli</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <a href="tel:0401385662" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", backgroundColor: "#5BC2E7", padding: "10px 20px" }}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={1.5} style={{ width: "14px", height: "14px", flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "#fff", letterSpacing: "0.04em" }}>0401 385 662</span>
                </a>
                <a href="mailto:mark@spinellire.com" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)", padding: "10px 20px" }}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.6)" strokeWidth={1.5} style={{ width: "14px", height: "14px", flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span style={{ fontSize: "13px", fontWeight: 400, color: "rgba(255,255,255,0.6)", letterSpacing: "0.04em" }}>Email</span>
                </a>
              </div>
            </div>

            {/* Aaron */}
            <div style={{ backgroundColor: "#F8F6F1", padding: "36px 40px", display: "flex", flexDirection: "column", gap: "28px", border: "1px solid #E8E5DF" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ width: "52px", height: "52px", backgroundColor: "#0D3348", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 300, color: "#fff", letterSpacing: "-0.02em" }}>AH</span>
                </div>
                <div>
                  <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "#a2b0aa", margin: "0 0 4px" }}>Sales Associate</p>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 300, letterSpacing: "-0.02em", color: "#0D3348", margin: 0 }}>Aaron Hofman</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <a href="tel:0439555880" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", backgroundColor: "#0D3348", padding: "10px 20px" }}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={1.5} style={{ width: "14px", height: "14px", flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "#fff", letterSpacing: "0.04em" }}>0439 555 880</span>
                </a>
                <a href="mailto:aaron@spinellire.com" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", border: "1px solid #E8E5DF", padding: "10px 20px" }}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="#7a7265" strokeWidth={1.5} style={{ width: "14px", height: "14px", flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span style={{ fontSize: "13px", fontWeight: 400, color: "#7a7265", letterSpacing: "0.04em" }}>Email</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Appraisal form — full page ── */}
      <section id="appraisal" style={{ minHeight: "100svh", backgroundColor: "#ffffff", display: "flex", alignItems: "center", borderTop: "1px solid #E8E5DF" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 40px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "80px", alignItems: "start" }}>

          {/* Left — trust column */}
          <div style={{ position: "sticky", top: "140px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "#5BC2E7", margin: "0 0 20px" }}>
              No obligation · 10 minutes
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3.2rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 0 24px", color: "#0D3348" }}>
              Book your free<br />market appraisal
            </h2>
            <p style={{ fontSize: "15px", color: "#7a7265", lineHeight: 1.8, margin: "0 0 40px", maxWidth: "36ch" }}>
              Fill in your details and a member of the Spinelli team will reach out within one business day to arrange a time.
            </p>

            {/* Stats strip */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0", border: "1px solid #E8E5DF", marginBottom: "36px" }}>
              {[
                { num: "$1.45M", desc: "Median house price in Shell Cove" },
                { num: "61 days", desc: "Average days on market" },
                { num: "10 min", desc: "All it takes for a free appraisal" },
              ].map((item, i) => (
                <div key={item.num} style={{ padding: "18px 20px", borderBottom: i < 2 ? "1px solid #E8E5DF" : "none", display: "flex", gap: "16px", alignItems: "center" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 300, letterSpacing: "-0.02em", color: "#5BC2E7", margin: 0, minWidth: "80px" }}>{item.num}</p>
                  <p style={{ fontSize: "13px", color: "#7a7265", margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Agent mini */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center", padding: "16px", backgroundColor: "#F8F6F1" }}>
              <div style={{ width: "44px", height: "44px", backgroundColor: "#0D3348", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 300, color: "#fff" }}>MS</span>
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 500, margin: "0 0 2px", color: "#000" }}>Mark Spinelli</p>
                <p style={{ fontSize: "12px", color: "#7a7265", margin: 0 }}>Will personally review your request</p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #E8E5DF", padding: "48px" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 300, letterSpacing: "-0.03em", margin: "0 0 8px", color: "#0D3348" }}>
              Request your appraisal
            </h3>
            <p style={{ fontSize: "13px", color: "#a2b0aa", margin: "0 0 36px" }}>
              Takes less than 2 minutes. No commitment required.
            </p>
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
