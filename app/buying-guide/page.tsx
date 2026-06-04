import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Buying Guide | Spinelli Real Estate",
  description:
    "Everything you need to know about buying property in the Illawarra. Step-by-step guidance from the Spinelli Real Estate team.",
};

const steps = [
  {
    num: "01",
    title: "Get Your Finances in Order",
    body: "Before you start searching, speak with a mortgage broker or lender to understand your borrowing capacity. Getting pre-approval puts you in a strong position when you find the right property and shows vendors you're a serious buyer.",
  },
  {
    num: "02",
    title: "Define What You're Looking For",
    body: "Make a list of your must-haves and nice-to-haves — number of bedrooms, location, proximity to schools or transport, block size. Knowing your priorities helps you move quickly when the right property comes up.",
  },
  {
    num: "03",
    title: "Research the Market",
    body: "Spend time understanding the suburbs you're interested in. Look at recent sales, median prices and days on market. Our suburb profiles are a great starting point — they'll give you a clear picture of where your money goes furthest.",
  },
  {
    num: "04",
    title: "Attend Inspections",
    body: "Visit as many properties as you can — even ones that aren't quite right. You'll quickly develop an eye for value and build confidence in your decision-making. Ask questions at every open home and don't be afraid to go back for a second look.",
  },
  {
    num: "05",
    title: "Conduct Due Diligence",
    body: "Before making an offer, arrange a building and pest inspection and review the contract of sale with a solicitor or conveyancer. Understanding exactly what you're buying protects you from costly surprises down the track.",
  },
  {
    num: "06",
    title: "Make an Offer or Bid at Auction",
    body: "When you're ready to move, your agent will guide you through the offer process or auction day. Exchange of contracts and a deposit (typically 10%) locks in the purchase, with settlement usually 42 days later.",
  },
];

export default function BuyingGuidePage() {
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
              Your Complete<br />Buying Guide
            </h1>
            <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "28px" }} />
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#7a7265", lineHeight: 1.9, maxWidth: "54ch", marginBottom: "40px" }}>
              Buying property is one of the biggest financial decisions you&apos;ll ever make. Whether it&apos;s your first home, an upgrade or an investment, understanding the process gives you confidence — and puts you in the best position to secure the right property at the right price.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/buy"
                className="inline-block px-8 py-4 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                Browse Properties
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
              The Buying Process
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
