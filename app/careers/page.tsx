import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers | Spinelli Real Estate",
  description:
    "Join the Spinelli Real Estate team. We're looking for passionate, driven property professionals to grow with us across the Illawarra.",
};

const perks = [
  {
    title: "Supportive Culture",
    body: "Work alongside a tight-knit, family-run team that genuinely invests in your growth and wellbeing.",
  },
  {
    title: "Strong Brand & Reputation",
    body: "Represent one of the Illawarra's most trusted real estate agencies with a 12+ year track record.",
  },
  {
    title: "Uncapped Earning Potential",
    body: "Competitive commission structures and incentives that reward your results — not just your hours.",
  },
  {
    title: "Training & Mentorship",
    body: "Learn from experienced directors who are hands-on, accessible and committed to your career.",
  },
  {
    title: "Premium Marketing Tools",
    body: "Access to professional photography, videography, drone aerials and cutting-edge digital marketing.",
  },
  {
    title: "Flexible & Modern",
    body: "A forward-thinking workplace that embraces new technology and adapts to how you work best.",
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

      {/* ── Why Spinelli ── */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div style={{ borderTop: "1px solid #E8E5DF", paddingTop: "60px" }}>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#5BC2E7",
                display: "block",
                marginBottom: "12px",
              }}
            >
              Why Join Us
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                color: "#000000",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                marginBottom: "48px",
              }}
            >
              What Sets Us Apart
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {perks.map((perk) => (
                <div key={perk.title} style={{ borderTop: "2px solid #5BC2E7", paddingTop: "20px" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#000000",
                      letterSpacing: "0.04em",
                      marginBottom: "10px",
                    }}
                  >
                    {perk.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      color: "#7a7265",
                      lineHeight: 1.8,
                    }}
                  >
                    {perk.body}
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
