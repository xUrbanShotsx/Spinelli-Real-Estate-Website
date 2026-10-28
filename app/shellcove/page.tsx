import type { Metadata } from "next";
import ShellCoveForm from "./ShellCoveForm";
import ShellCoveMarketStats from "./ShellCoveMarketStats";

export const metadata: Metadata = {
  title: "Shell Cove Free Appraisal | Spinelli Real Estate",
  description: "Book your free Shell Cove property appraisal with Spinelli Real Estate.",
  robots: { index: false, follow: false },
};

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
        .sc-hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 140px 20px 60px;
        }
        .sc-market-stats {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 768px) {
          .sc-card { padding: 28px 24px; border-radius: 18px; }
          .sc-card h1 { font-size: 1.5rem !important; margin-bottom: 20px !important; }
          .sc-hero { padding: 20px; align-items: center; }
          header.fixed, footer { display: none !important; }
          button[aria-label*="chat"], button[aria-label*="Chat"] { display: none !important; }
          .sc-market-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <main style={{ fontFamily: "var(--font-sans)" }}>

        {/* ── Hero + card ── */}
        <section className="sc-hero">
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
        <section style={{ backgroundColor: "#ffffff", borderTop: "1px solid #E8E5DF", padding: "80px 20px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "#a2b0aa", margin: "0 0 14px" }}>
              Shell Cove · Market snapshot
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#0D3348", margin: "0 0 56px" }}>
              Shell Cove by the numbers
            </h2>
            <ShellCoveMarketStats />
          </div>
        </section>

      </main>
    </>
  );
}
