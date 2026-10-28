import type { Metadata } from "next";
import ShellCoveForm from "./ShellCoveForm";

export const metadata: Metadata = {
  title: "Shell Cove Free Appraisal | Spinelli Real Estate",
  description: "Book your free Shell Cove property appraisal with Spinelli Real Estate.",
  robots: { index: false, follow: false },
};

const STATS = [
  { value: "$1,450,000", label: "Median house price" },
  { value: "1.3%", label: "12 month growth rate" },
  { value: "61 days", label: "Average days on market" },
  { value: "144", label: "Sales in Shell Cove last 12 months" },
  { value: "$6,300,000", label: "Most expensive house sold" },
  { value: "$3,300,000", label: "Most expensive unit sold" },
];

export default function ShellCovePage() {
  return (
    <>
      <style>{`
        .sc-card {
          position: relative;
          z-index: 2;
          background: #fff;
          border-radius: 24px;
          padding: 48px;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.18);
        }
        .sc-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }
        .sc-stat {
          padding: 40px 36px;
          border-right: 1px solid #E8E5DF;
          border-bottom: 1px solid #E8E5DF;
        }
        .sc-stat:nth-child(3n) { border-right: none; }
        .sc-stat:nth-child(4), .sc-stat:nth-child(5), .sc-stat:nth-child(6) { border-bottom: none; }
        @media (max-width: 768px) {
          .sc-card { padding: 28px 24px; border-radius: 18px; }
          .sc-card h1 { font-size: 1.5rem !important; margin-bottom: 20px !important; }
          header.fixed, footer { display: none !important; }
          button[aria-label*="chat"], button[aria-label*="Chat"] { display: none !important; }
          .sc-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .sc-stat { padding: 28px 20px; border-right: 1px solid #E8E5DF; border-bottom: 1px solid #E8E5DF; }
          .sc-stat:nth-child(3n) { border-right: 1px solid #E8E5DF; }
          .sc-stat:nth-child(2n) { border-right: none; }
          .sc-stat:nth-child(5), .sc-stat:nth-child(6) { border-bottom: none; }
          .sc-stat:nth-child(4) { border-bottom: 1px solid #E8E5DF; }
        }
      `}</style>

      <main style={{ fontFamily: "var(--font-sans)" }}>

        {/* ── Hero + card ── */}
        <section style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", padding: "140px 20px 60px" }}>
          <img
            src="/shellcove/hero.jpg"
            alt=""
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 65%", zIndex: 0 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(13,51,72,0.45)", zIndex: 1 }} />

          <div className="sc-card">
            <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "#5BC2E7", margin: "0 0 12px", textAlign: "center" }}>
              Shell Cove · No obligation · Free
            </p>
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#0D3348",
              margin: "0 0 28px",
              textAlign: "center",
            }}>
              Learn your home&apos;s new value
            </h1>
            <ShellCoveForm />
          </div>
        </section>

        {/* ── Stats ── */}
        <section style={{ backgroundColor: "#ffffff", borderTop: "1px solid #E8E5DF" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 40px 0" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "#a2b0aa", margin: "0 0 16px" }}>
              Shell Cove · Market snapshot
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#0D3348", margin: "0 0 48px" }}>
              Shell Cove by the numbers
            </h2>
          </div>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px 80px" }}>
            <div className="sc-stats-grid" style={{ borderTop: "1px solid #E8E5DF", borderLeft: "1px solid #E8E5DF" }}>
              {STATS.map(stat => (
                <div key={stat.label} className="sc-stat">
                  <p style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                    fontWeight: 300,
                    letterSpacing: "-0.03em",
                    color: "#5BC2E7",
                    margin: "0 0 12px",
                    lineHeight: 1,
                  }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: "13px", color: "#7a7265", margin: 0, lineHeight: 1.5, fontWeight: 400 }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
