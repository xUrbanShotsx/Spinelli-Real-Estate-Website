import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers | Spinelli Real Estate",
  description:
    "Join the Spinelli Real Estate team. We're looking for passionate, driven property professionals to grow with us across the Illawarra.",
};

const perks = [
  {
    num: "01",
    title: "Supportive Culture",
    body: "Work alongside a tight-knit, family-run team that genuinely invests in your growth and wellbeing. Here, you're not a number — you're part of the family.",
  },
  {
    num: "02",
    title: "Strong Brand & Reputation",
    body: "Represent one of the Illawarra's most trusted agencies with a 12+ year track record. Our name opens doors — and makes closing deals easier.",
  },
  {
    num: "03",
    title: "Uncapped Earning Potential",
    body: "Competitive commission structures and incentives that reward your results, not just your hours. The harder you work, the more you earn — simple as that. With a brand new office in a prime location, you'll be working from a space that reflects the calibre of our brand.",
  },
  {
    num: "04",
    title: "Training & Mentorship",
    body: "Learn directly from experienced directors who are hands-on, accessible and genuinely invested in your career progression — from day one and beyond.",
  },
  {
    num: "05",
    title: "Premium Marketing Tools",
    body: "Every listing backed by professional photography, videography, drone aerials and a full digital marketing suite. Your properties will stand out.",
  },
  {
    num: "06",
    title: "Flexible & Forward-Thinking",
    body: "A modern workplace that embraces new technology, trusts your judgment and adapts to how you work best. We move with the times — and so will you.",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ backgroundColor: "#ffffff", paddingTop: "140px", paddingBottom: "80px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="max-w-3xl">
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#5BC2E7",
                display: "block",
                marginBottom: "16px",
              }}
            >
              Careers
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
              Grow Your Career<br />in the Illawarra
            </h1>
            <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "28px" }} />
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                color: "#7a7265",
                lineHeight: 1.9,
                maxWidth: "54ch",
                marginBottom: "40px",
              }}
            >
              At Spinelli Real Estate we believe in people first. Whether you&apos;re an experienced agent
              ready for your next challenge, a property manager looking for a team that truly supports you,
              or someone just starting out in the industry — we&apos;d love to hear from you.
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                color: "#7a7265",
                lineHeight: 1.9,
                maxWidth: "54ch",
                marginBottom: "48px",
              }}
            >
              As a locally owned and family-run agency, we operate differently. You&apos;ll work closely with
              the directors, have genuine autonomy over your work, and be backed by a brand that the
              Illawarra community knows and trusts. We&apos;re growing — and we want the right people to
              grow with us.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:paul@spinellire.com?subject=Career%20Enquiry%20%E2%80%94%20Spinelli%20Real%20Estate"
                className="inline-block px-8 py-4 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                style={{
                  backgroundColor: "#5BC2E7",
                  color: "#ffffff",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Apply Now
              </a>
              <Link
                href="/team"
                className="inline-block px-8 py-4 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-70"
                style={{
                  border: "1px solid #E8E5DF",
                  color: "#000000",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Meet the Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Sets Us Apart ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">

          {/* Section header */}
          <div
            className="flex flex-wrap items-end justify-between gap-4 pb-12 mb-12"
            style={{ borderBottom: "1px solid #E8E5DF" }}
          >
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "10px" }}>
                Why Join Us
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  color: "#000000",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                What Sets Us Apart
              </h2>
            </div>
          </div>

          {/* Perk rows */}
          <div>
            {perks.map((perk, i) => (
              <div
                key={perk.num}
                className="grid md:grid-cols-[80px_1fr_2fr] gap-6 md:gap-12 items-start py-10"
                style={{ borderBottom: i < perks.length - 1 ? "1px solid #E8E5DF" : "none" }}
              >
                {/* Number */}
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 3vw, 2.8rem)",
                    color: "#5BC2E7",
                    fontWeight: 300,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    opacity: 0.5,
                  }}
                >
                  {perk.num}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                    color: "#000000",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    paddingTop: "4px",
                  }}
                >
                  {perk.title}
                </h3>

                {/* Body */}
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    color: "#7a7265",
                    lineHeight: 1.85,
                    paddingTop: "4px",
                  }}
                >
                  {perk.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
