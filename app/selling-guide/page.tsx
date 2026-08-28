import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Illawarra Property Selling Guide | Spinelli Real Estate",
  description:
    "How to get the best price when selling your home in Wollongong, Kiama or the Illawarra. Expert selling advice from Spinelli Real Estate — pricing, marketing, negotiation and settlement.",
  keywords: [
    "how to sell property Wollongong", "selling a house Illawarra", "property selling guide Wollongong",
    "sell house Kiama tips", "property marketing Illawarra", "auction vs private sale Wollongong",
    "best time to sell property Illawarra",
  ],
  alternates: { canonical: "https://www.spinellirealestate.com.au/selling-guide" },
  openGraph: {
    title: "Selling a Property in the Illawarra | Spinelli Guide",
    description: "Get the best price for your home. Pricing, marketing, and negotiation tips from the experts.",
    url: "https://www.spinellirealestate.com.au/selling-guide",
  },
};

const steps = [
  {
    num: "01",
    title: "Get a Free Appraisal",
    body: "The first step is understanding what your property is worth in today's market. Our agents will provide an honest, detailed appraisal based on recent comparable sales, current demand and the unique features of your home — with no obligation.",
  },
  {
    num: "02",
    title: "Choose Your Agent & Strategy",
    body: "Selecting the right agent is just as important as setting the right price. Look for someone with a proven track record in your area, a clear marketing plan and strong negotiation skills. We'll walk you through our approach and tailor a strategy to your property.",
  },
  {
    num: "03",
    title: "Prepare Your Property",
    body: "First impressions count. Simple improvements — decluttering, a fresh coat of paint, garden tidy-up or minor repairs — can significantly increase buyer appeal and your final sale price. We'll advise on what's worth doing and what's not.",
  },
  {
    num: "04",
    title: "Professional Marketing",
    body: "Every Spinelli listing is backed by professional photography, drone aerials, compelling copywriting and prominent digital and print marketing. We put your property in front of the right buyers — locally and from further afield.",
  },
  {
    num: "05",
    title: "Inspections & Negotiation",
    body: "We manage all open homes and private inspections, keeping you updated after every interaction. When offers come in, our experienced negotiators work hard to achieve the strongest possible result — whether that's through private treaty or auction.",
  },
  {
    num: "06",
    title: "Exchange, Settlement & Beyond",
    body: "Once contracts are exchanged and your deposit secured, we guide you through to a smooth settlement. Even after the keys are handed over, we're here if you need advice on your next move.",
  },
];

export default function SellingGuidePage() {
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
              Your Complete<br />Selling Guide
            </h1>
            <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "28px" }} />
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#7a7265", lineHeight: 1.9, maxWidth: "54ch", marginBottom: "40px" }}>
              Selling your home is a significant decision — and the process, when done right, should be rewarding. With the right agent, the right preparation and the right marketing, you can achieve a result that exceeds your expectations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/appraisal"
                className="inline-block px-8 py-4 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                Book a Free Appraisal
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
              The Selling Process
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
