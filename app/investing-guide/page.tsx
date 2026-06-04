import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Investing Guide | Spinelli Real Estate",
  description:
    "How to build a successful property portfolio in the Illawarra. Investment advice from the Spinelli Real Estate team.",
};

const steps = [
  {
    num: "01",
    title: "Define Your Investment Goals",
    body: "Are you chasing rental yield, capital growth, or both? Your answer shapes every decision that follows — the suburb you target, the property type you buy and the strategy you use. Being clear on your goals from the start saves time and money.",
  },
  {
    num: "02",
    title: "Understand Your Borrowing Capacity",
    body: "Investment lending works differently to owner-occupier lending. Speak with a broker who specialises in investment finance to understand your serviceability, deposit requirements and how to structure your loans to maximise portfolio growth over time.",
  },
  {
    num: "03",
    title: "Research High-Growth Suburbs",
    body: "The Illawarra continues to attract strong interest from Sydney buyers and investors alike. Look for areas with infrastructure investment, low vacancy rates, strong rental demand and long-term development potential. Our suburb profiles give you a data-driven starting point.",
  },
  {
    num: "04",
    title: "Choose the Right Property Type",
    body: "Houses typically deliver stronger capital growth while units can offer higher yields. Consider your target tenant — families, professionals, students — and match your property to their needs. A well-chosen property in the right location attracts quality long-term tenants.",
  },
  {
    num: "05",
    title: "Run the Numbers",
    body: "Calculate your expected rental return, factor in all holding costs (mortgage, rates, insurance, maintenance, property management fees) and stress-test the numbers against a vacancy period. A solid investment makes financial sense even in a worst-case scenario.",
  },
  {
    num: "06",
    title: "Engage a Property Manager",
    body: "A professional property manager protects your asset, keeps it tenanted and handles day-to-day management so you don't have to. Our property management team has a strong track record across the Illawarra and takes a proactive, hands-on approach to every portfolio.",
  },
];

export default function InvestingGuidePage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#ffffff", paddingTop: "140px", paddingBottom: "80px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="max-w-3xl">
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "16px" }}>
              Resources
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                color: "#000000",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                marginBottom: "28px",
              }}
            >
              Your Complete<br />Investing Guide
            </h1>
            <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "28px" }} />
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#7a7265", lineHeight: 1.9, maxWidth: "54ch", marginBottom: "40px" }}>
              Property remains one of Australia&apos;s most reliable paths to long-term wealth. The Illawarra — with its coastal lifestyle, growing population and proximity to Sydney — offers compelling opportunities for investors at every stage of their journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/buy"
                className="inline-block px-8 py-4 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                Browse Investment Properties
              </Link>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-70"
                style={{ border: "1px solid #E8E5DF", color: "#000000", fontFamily: "var(--font-sans)", letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                Speak to an Agent
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section style={{ backgroundColor: "#ffffff", paddingBottom: "100px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div style={{ borderTop: "1px solid #E8E5DF", paddingTop: "60px" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "10px" }}>
              Step by Step
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", marginBottom: "48px" }}>
              The Investment Process
            </h2>
            <div>
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  className="grid md:grid-cols-[80px_1fr_2fr] gap-6 md:gap-12 items-start py-10"
                  style={{ borderBottom: i < steps.length - 1 ? "1px solid #E8E5DF" : "none" }}
                >
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3vw, 2.8rem)", color: "#5BC2E7", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1, opacity: 0.5 }}>
                    {step.num}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem, 2vw, 1.5rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.2, paddingTop: "4px" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.85, paddingTop: "4px" }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
