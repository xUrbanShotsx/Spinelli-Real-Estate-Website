import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sell With Us | Spinelli Real Estate",
  description:
    "Sell your Illawarra property with Spinelli Real Estate. Premium marketing, expert negotiation and local knowledge — consistently delivering outstanding results.",
};

const steps = [
  { n: "01", title: "Free Appraisal", body: "We assess your property against live market conditions and provide an honest, strategic price guide." },
  { n: "02", title: "Tailored Campaign", body: "Premium photography, targeted digital reach and a bespoke marketing strategy built around your home." },
  { n: "03", title: "Expert Negotiation", body: "We create competition, qualify every buyer and negotiate hard to achieve your strongest possible result." },
  { n: "04", title: "Smooth Settlement", body: "We guide you through every step from exchange to handover — stress free." },
];

const pillars = [
  { title: "20+ Years Local Knowledge", body: "Deep Illawarra expertise across every suburb, price point and property type." },
  { title: "Premium Marketing", body: "Professional photography, drone footage, feature listings and targeted digital campaigns." },
  { title: "Proven Results", body: "Consistent above-reserve outcomes, short days-on-market and 94% list-to-sale ratio." },
  { title: "Full Transparency", body: "Honest advice, clear communication and no hidden fees — at every stage." },
];

export default function SellPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex items-end" style={{ minHeight: "100svh" }}>
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&h=1200&fit=crop&q=85"
          alt=""
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.0) 100%)" }}
        />
        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pb-20">
          <span className="label-tag-light block mb-5">Sell With Spinelli</span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              color: "#ffffff",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              marginBottom: "2rem",
            }}
          >
            Achieve More<br />For Your Home
          </h1>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact?type=appraisal"
              className="inline-block px-8 py-4 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
            >
              Book a Free Appraisal
            </Link>
            <Link
              href="/sold"
              className="inline-block px-8 py-4 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-70"
              style={{ border: "1px solid rgba(255,255,255,0.35)", color: "#ffffff", fontFamily: "var(--font-sans)" }}
            >
              View Recent Results
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ backgroundColor: "#0D3348" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { stat: "20+", label: "Years in the Illawarra" },
              { stat: "94%", label: "List-to-sale ratio" },
              { stat: "28d",  label: "Average days on market" },
              { stat: "5★",  label: "Vendor satisfaction" },
            ].map((s) => (
              <div key={s.stat} className="py-14 px-8 flex flex-col gap-2">
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                    color: "#ffffff",
                    fontWeight: 300,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {s.stat}
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-28" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="mb-20">
            <span className="label-tag">The Process</span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                color: "#000000",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              How We Sell<br />Your Home
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-0">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="pr-10 py-2"
                style={{ borderLeft: "1px solid #E8E5DF", paddingLeft: "2rem" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "3rem",
                    fontWeight: 300,
                    color: "#5BC2E7",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    opacity: 0.5,
                    marginBottom: "1.5rem",
                  }}
                >
                  {s.n}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.25rem",
                    color: "#000000",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    marginBottom: "0.75rem",
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.7 }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Split image + pillars ── */}
      <section style={{ backgroundColor: "#FBF9F3" }}>
        <div className="grid lg:grid-cols-2">
          {/* Image */}
          <div className="relative" style={{ minHeight: "600px" }}>
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&h=900&fit=crop&q=85"
              alt=""
              className="absolute inset-0 object-cover"
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          {/* Pillars */}
          <div className="px-12 py-20 lg:px-20 flex flex-col justify-center">
            <span className="label-tag">Why Spinelli</span>
            <h2
              className="mb-14"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "#000000",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              The Spinelli<br />Difference
            </h2>
            <div className="space-y-10">
              {pillars.map((p) => (
                <div key={p.title} className="flex gap-5">
                  <div
                    className="flex-shrink-0 mt-1"
                    style={{ width: "2px", backgroundColor: "#5BC2E7", alignSelf: "stretch", minHeight: "40px", borderRadius: "2px" }}
                  />
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.15rem",
                        color: "#000000",
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                        marginBottom: "6px",
                      }}
                    >
                      {p.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.7 }}>
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pull quote ── */}
      <section className="py-28" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "5rem",
              color: "#5BC2E7",
              lineHeight: 0.7,
              opacity: 0.3,
              marginBottom: "1.5rem",
            }}
          >
            &ldquo;
          </p>
          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
              color: "#000000",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              lineHeight: 1.4,
              marginBottom: "2rem",
            }}
          >
            Spinelli achieved $85,000 above our reserve. Their marketing was exceptional and the whole process was remarkably smooth.
          </blockquote>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Sarah &amp; James M. — Sold in Wollongong
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D3348" }}>
        <img
          src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1400&h=500&fit=crop&q=60"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%", opacity: 0.1 }}
        />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="label-tag-light">Start Today</span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  color: "#ffffff",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                Ready to Sell<br />Your Home?
              </h2>
            </div>
            <div>
              <p className="mb-8" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "42ch" }}>
                Book a confidential, obligation-free appraisal and find out exactly what your property could achieve in today&apos;s market.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact?type=appraisal"
                  className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
                >
                  Book a Free Appraisal
                </Link>
                <a
                  href="tel:0242960047"
                  className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-70"
                  style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-sans)" }}
                >
                  02 4296 0047
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
