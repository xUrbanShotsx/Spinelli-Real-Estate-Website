import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sell Your Property | Spinelli Real Estate",
  description:
    "Sell your Illawarra property with Spinelli Real Estate. Premium marketing, proven results and local expertise to achieve the best price for your home.",
};

const sellingSteps = [
  {
    n: "01",
    title: "Free Appraisal",
    desc: "We assess your property against current market conditions and set a strategic price guide — with zero obligation.",
  },
  {
    n: "02",
    title: "Marketing Launch",
    desc: "Premium photography, drone footage, targeted digital campaigns and open homes drive maximum buyer exposure.",
  },
  {
    n: "03",
    title: "Expert Negotiation",
    desc: "We qualify every buyer, create competition and negotiate hard to achieve the strongest possible result for you.",
  },
  {
    n: "04",
    title: "Smooth Settlement",
    desc: "We guide you through contracts and legal steps, ensuring a stress-free settlement from exchange to handover.",
  },
];

const marketing = [
  {
    title: "Professional Photography",
    desc: "High-resolution stills and golden-hour shoots that present your home at its absolute best.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Drone & Video Tours",
    desc: "Aerial footage and cinematic walkthroughs that elevate your listing and capture serious buyers.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.89L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Digital Floor Plans",
    desc: "Accurate, beautifully rendered floor plans that help buyers visualise the space before they arrive.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: "Portal Feature Listings",
    desc: "Premier placement on realestate.com.au and domain.com.au to ensure maximum reach among active buyers.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
  },
  {
    title: "Social Media Campaigns",
    desc: "Targeted Facebook and Instagram campaigns reaching qualified buyers in your exact demographic and location.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    title: "Print & Signage",
    desc: "Premium brochures, hoarding signage and letterbox campaigns that capture every buyer — online and off.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    ),
  },
];

export default function SellPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative" style={{ height: "100svh", minHeight: "600px" }}>
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&h=1200&fit=crop&q=85"
          alt="Luxury home for sale"
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%" }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.1) 100%)" }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto left-0 right-0">
          <p
            className="label-tag-light mb-4"
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.18em" }}
          >
            Sell With Spinelli
          </p>
          <h1
            className="font-light mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            Achieve a<br />Premium Result
          </h1>
          <p
            className="mb-10"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              maxWidth: "42ch",
              lineHeight: 1.65,
            }}
          >
            Proven marketing systems, expert negotiation and deep local knowledge — consistently delivering outstanding outcomes for Illawarra vendors.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact?type=appraisal"
              className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
            >
              Book a Free Appraisal
            </Link>
            <Link
              href="#process"
              className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-70"
              style={{
                backgroundColor: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.4)",
                fontFamily: "var(--font-sans)",
              }}
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section style={{ backgroundColor: "#0D3348" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              {
                stat: "20+",
                upper: "Years in the",
                lower: "Illawarra",
                icon: (
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2} style={{ width: "18px", height: "18px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                stat: "94%",
                upper: "List-to-Sale",
                lower: "Ratio",
                icon: (
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2} style={{ width: "18px", height: "18px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
              {
                stat: "$0",
                upper: "Hidden Fees or",
                lower: "Surprises",
                icon: (
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2} style={{ width: "18px", height: "18px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                stat: "5★",
                upper: "Average",
                lower: "Vendor Rating",
                icon: (
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2} style={{ width: "18px", height: "18px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="py-12 px-8 flex flex-col items-center text-center gap-3"
                style={{ borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)" }}
              >
                {/* Icon */}
                <div style={{ color: "rgba(91,194,231,0.55)", marginBottom: "4px" }}>
                  {item.icon}
                </div>
                {/* Stat number */}
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "3.2rem",
                    fontWeight: 300,
                    letterSpacing: "-0.04em",
                    color: "#ffffff",
                    lineHeight: 1,
                  }}
                >
                  {item.stat}
                </p>
                {/* Two-line label */}
                <div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
                    {item.upper}
                  </p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
                    {item.lower}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Selling Process ── */}
      <section id="process" className="py-24" style={{ backgroundColor: "#FBF9F3" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          {/* Header */}
          <div className="mb-16">
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
              How We Sell<br />Your Property
            </h2>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {sellingSteps.map((step, i) => (
              <div
                key={step.n}
                className="py-10 pr-10"
                style={{
                  borderLeft: "1px solid #DAD7CE",
                  paddingLeft: "2rem",
                }}
              >
                <p
                  className="mb-6"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "3.5rem",
                    fontWeight: 300,
                    color: "#5BC2E7",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    opacity: 0.6,
                  }}
                >
                  {step.n}
                </p>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.35rem",
                    color: "#000000",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    color: "#7a7265",
                    lineHeight: 1.7,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Spinelli — editorial split ── */}
      <section className="py-0" style={{ backgroundColor: "#ffffff" }}>
        <div className="grid lg:grid-cols-2">
          {/* Image */}
          <div className="relative" style={{ minHeight: "560px" }}>
            <img
              src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&h=800&fit=crop&q=85"
              alt="Spinelli Real Estate — local expertise"
              className="absolute inset-0 object-cover"
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          {/* Text */}
          <div
            className="flex flex-col justify-center px-12 py-20 lg:px-20"
            style={{ backgroundColor: "#ffffff" }}
          >
            <span className="label-tag">Why Spinelli</span>
            <h2
              className="mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "#000000",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Maximise Your<br />Sale Price
            </h2>
            <p
              className="mb-10"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                color: "#7a7265",
                lineHeight: 1.75,
                maxWidth: "44ch",
              }}
            >
              Selling your home is one of the most significant financial decisions you&apos;ll ever make. We combine decades of Illawarra market knowledge with sophisticated, tailored marketing and skilled negotiation — ensuring every vendor achieves their best possible result.
            </p>

            <div className="space-y-5 mb-10">
              {[
                "20+ years of deep Illawarra market expertise",
                "Proven track record of above-market results",
                "Bespoke marketing campaigns for every property",
                "Transparent, honest communication at every stage",
              ].map((pt) => (
                <div key={pt} className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 mt-0.5"
                    style={{ width: "20px", height: "20px" }}
                  >
                    <svg viewBox="0 0 20 20" fill="none" style={{ width: "100%", height: "100%" }}>
                      <circle cx="10" cy="10" r="9.5" stroke="#5BC2E7" strokeWidth="1" />
                      <path d="M6 10.5l2.5 2.5 5-5" stroke="#5BC2E7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13.5px",
                      color: "#58503c",
                      lineHeight: 1.6,
                    }}
                  >
                    {pt}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/contact?type=appraisal"
              className="inline-block self-start px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
            >
              Request a Free Appraisal
            </Link>
          </div>
        </div>
      </section>

      {/* ── Premium Marketing ── */}
      <section className="py-24" style={{ backgroundColor: "#FBF9F3" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-10 mb-16 items-end">
            <div>
              <span className="label-tag">Marketing</span>
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
                A Campaign Built<br />Around Your Home
              </h2>
            </div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                color: "#7a7265",
                lineHeight: 1.75,
                maxWidth: "44ch",
              }}
            >
              Every Spinelli listing receives a comprehensive, bespoke marketing campaign designed to create maximum buyer competition and achieve the best possible price.
            </p>
          </div>

          {/* 3-col grid of marketing items */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#DAD7CE" }}>
            {marketing.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-4 p-9"
                style={{ backgroundColor: "#FBF9F3" }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "1px solid #DAD7CE",
                    color: "#5BC2E7",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3
                    className="mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.2rem",
                      color: "#000000",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      color: "#7a7265",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial pull-quote ── */}
      <section className="py-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center">
          <div
            className="mx-auto mb-8"
            style={{ width: "32px", height: "1px", backgroundColor: "#5BC2E7" }}
          />
          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
              color: "#000000",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              lineHeight: 1.3,
            }}
          >
            &ldquo;Spinelli achieved $85,000 above our reserve. Their marketing was exceptional and the communication throughout made a stressful process remarkably smooth.&rdquo;
          </blockquote>
          <p
            className="mt-8"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#a2b0aa",
            }}
          >
            Sarah &amp; James M. — Sold in Wollongong, 2024
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D3348" }}>
        {/* Subtle texture image */}
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&h=600&fit=crop&q=60"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%", opacity: 0.12 }}
        />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24">
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
              <p
                className="mb-8"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.75,
                  maxWidth: "42ch",
                }}
              >
                Contact us for a confidential, no-obligation appraisal. We&apos;ll walk you through current market conditions and exactly what your property could achieve.
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
                  style={{
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "rgba(255,255,255,0.8)",
                    fontFamily: "var(--font-sans)",
                  }}
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
