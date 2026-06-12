import type { Metadata } from "next";
import Link from "next/link";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us | Spinelli Real Estate",
  description:
    "Spinelli Real Estate — a boutique Illawarra agency built on local knowledge, genuine care and exceptional results.",
};

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

const previewTeam = team.slice(0, 4);

const values = [
  { num: "01", title: "Integrity", body: "Honest advice, always in your best interest — even when it's not what you want to hear. Our reputation is built on trust, and we protect it with every interaction." },
  { num: "02", title: "Excellence", body: "From the quality of our marketing to the depth of our market knowledge, we hold ourselves to the highest standard in everything we do." },
  { num: "03", title: "Community", body: "We're proud Illawarra locals who reinvest in the communities we serve and genuinely care about the people who call this coast home." },
  { num: "04", title: "Results", body: "Our clients judge us on outcomes — and we're consistently proud of what we deliver. Every transaction is an opportunity to prove our worth." },
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        .about-panel {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
        }
        .about-scroll-container {
          position: relative;
        }
        .about-panel img.bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .about-panel .overlay {
          position: absolute;
          inset: 0;
        }
        .about-panel .content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      `}</style>

      {/* ─── Sticky scroll wrapper ─── */}
      <div style={{ position: "relative" }}>

        {/* ── Panel 1: Hero ── */}
        <div style={{ height: "100vh" }}>
          <div className="about-panel" style={{ zIndex: 1 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="bg"
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&h=1200&fit=crop&q=85"
              alt=""
              loading="eager"
            />
            <div className="overlay" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 100%)" }} />
            <div className="content max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "24px" }}>
                Our Story
              </span>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 8vw, 8rem)",
                  color: "#ffffff",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.0,
                  marginBottom: "32px",
                  maxWidth: "14ch",
                }}
              >
                Built on Trust.<br />Driven by Results.
              </h1>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: "44ch" }}>
                A boutique Illawarra agency with over a decade of local knowledge, genuine care and a relentless commitment to exceptional outcomes.
              </p>
              {/* Scroll indicator */}
              <div style={{ position: "absolute", bottom: "48px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Scroll</span>
                <div style={{ width: "1px", height: "48px", backgroundColor: "rgba(255,255,255,0.25)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Panel 2: Who We Are ── */}
        <div style={{ height: "100vh" }}>
          <div className="about-panel" style={{ zIndex: 2 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="bg"
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1800&h=1200&fit=crop&q=85"
              alt=""
            />
            <div className="overlay" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.05) 100%)" }} />
            <div className="content max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
              <div style={{ maxWidth: "52ch" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "20px" }}>
                  Who We Are
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                    color: "#ffffff",
                    fontWeight: 300,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    marginBottom: "28px",
                  }}
                >
                  A Family Agency<br />Built for the Illawarra
                </h2>
                <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "28px" }} />
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.9, marginBottom: "16px" }}>
                  Spinelli Real Estate was founded on a simple belief — that clients deserve more than a transaction. They deserve a trusted adviser who truly knows the local market, genuinely cares about their outcome and works tirelessly to achieve it.
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.9 }}>
                  As a locally owned, family-run business, every client works directly with our senior agents — backed by 50+ years of combined experience and an unmatched Illawarra network.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Panel 3: Stats ── */}
        <div style={{ height: "100vh" }}>
          <div className="about-panel" style={{ zIndex: 3, backgroundColor: "#0D3348" }}>
            <div className="overlay" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(91,194,231,0.08) 0%, transparent 70%)" }} />
            <div className="content max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
                {[
                  { value: "50+", label: "Years Combined Experience" },
                  { value: "2,000+", label: "Successful Transactions" },
                  { value: "94%", label: "List-to-Sale Ratio" },
                  { value: "5★", label: "Client Satisfaction" },
                ].map((s) => (
                  <div key={s.label} style={{ borderTop: "1px solid rgba(91,194,231,0.3)", paddingTop: "28px" }}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "12px" }}>
                      {s.value}
                    </p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1.5 }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "80px" }}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    color: "rgba(255,255,255,0.2)",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.3,
                    maxWidth: "40ch",
                  }}
                >
                  &ldquo;We treat every property as if it were our own — because we know what it means to you.&rdquo;
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#5BC2E7", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: "20px" }}>
                  Paul Spinelli — Managing Director
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Panel 4: Our Home ── */}
        <div style={{ height: "100vh" }}>
          <div className="about-panel" style={{ zIndex: 4 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="bg"
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1800&h=1200&fit=crop&q=85"
              alt=""
            />
            <div className="overlay" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%)" }} />
            <div className="content max-w-7xl mx-auto px-6 sm:px-12 lg:px-20" style={{ justifyContent: "flex-end", paddingBottom: "80px" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "16px" }}>
                Our Home
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                  color: "#ffffff",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  marginBottom: "20px",
                  maxWidth: "20ch",
                }}
              >
                A Brand New Base in Shellharbour City Centre
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: "48ch", marginBottom: "32px" }}>
                Our brand new office at 16 College Avenue sits at the heart of one of the Illawarra&apos;s fastest-growing precincts — purpose-built for the way we work and designed to reflect the quality of our brand.
              </p>
              <a
                href="https://maps.google.com/?q=16+College+Avenue+Shellharbour+City+Centre+NSW"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", textTransform: "uppercase" }}
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>

        {/* ── Panel 5: Our Community ── */}
        <div style={{ height: "100vh" }}>
          <div className="about-panel" style={{ zIndex: 5 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="bg"
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1800&h=1200&fit=crop&q=85"
              alt=""
            />
            <div className="overlay" style={{ background: "linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.05) 100%)" }} />
            <div className="content max-w-7xl mx-auto px-6 sm:px-12 lg:px-20" style={{ alignItems: "flex-end" }}>
              <div style={{ maxWidth: "50ch" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "20px" }}>
                  Our Community
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                    color: "#ffffff",
                    fontWeight: 300,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    marginBottom: "28px",
                  }}
                >
                  Giving Back to the<br />Community We Serve
                </h2>
                <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "28px" }} />
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.9, marginBottom: "16px" }}>
                  Being part of the Illawarra isn&apos;t just where we do business — it&apos;s where we live, raise our families and put down roots.
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.9, marginBottom: "28px" }}>
                  We are proud supporters of{" "}
                  <a
                    href="https://www.destinyrescue.org.au/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#5BC2E7", textDecoration: "underline", fontWeight: 500 }}
                  >
                    Destiny Rescue
                  </a>
                  {" "}— an organisation doing extraordinary work to rescue children from trafficking and exploitation around the world.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Panel 6: Values ── */}
        <div style={{ height: "100vh" }}>
          <div className="about-panel" style={{ zIndex: 6, backgroundColor: "#ffffff" }}>
            <div className="content max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
              <div style={{ width: "100%" }}>
                <div style={{ borderBottom: "1px solid #E8E5DF", paddingBottom: "40px", marginBottom: "40px" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "12px" }}>
                    Our Values
                  </span>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                    What We Stand For
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
                  {values.map((v) => (
                    <div key={v.num} style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "#5BC2E7", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1, opacity: 0.5, flexShrink: 0, paddingTop: "2px" }}>
                        {v.num}
                      </span>
                      <div>
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "8px" }}>
                          {v.title}
                        </h3>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.8 }}>
                          {v.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Panel 7: Team ── */}
        <div style={{ height: "100vh" }}>
          <div className="about-panel" style={{ zIndex: 7, backgroundColor: "#0D3348" }}>
            <div className="content max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
              <div style={{ width: "100%" }}>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "40px" }}>
                  <div>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "10px" }}>
                      Our People
                    </span>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                      The People Behind Spinelli
                    </h2>
                  </div>
                  <Link
                    href="/team"
                    className="inline-flex items-center gap-2 transition-opacity hover:opacity-60"
                    style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#5BC2E7", letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    View Full Team
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: "12px", height: "12px" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {previewTeam.map((m) => (
                    <Link key={m.name} href={`/team/${toSlug(m.name)}`} className="group block">
                      <div
                        className="relative overflow-hidden"
                        style={{ height: "280px", backgroundImage: `url(${m.image})`, backgroundSize: "cover", backgroundPosition: "top center", backgroundColor: "#1a4a65" }}
                      >
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.0) 55%)" }} />
                        <div className="absolute top-0 right-0">
                          <span style={{ display: "block", backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 500, letterSpacing: "0.12em", padding: "5px 10px", textTransform: "uppercase" }}>
                            {m.role}
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 px-4 py-4">
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500, color: "#ffffff", marginBottom: "2px" }}>{m.name}</p>
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{m.role}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Panel 8: CTA ── */}
        <div style={{ height: "100vh" }}>
          <div className="about-panel" style={{ zIndex: 8, backgroundColor: "#5BC2E7" }}>
            <div className="overlay" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.08) 0%, transparent 65%)" }} />
            <div className="content max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
              <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
                <div>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", display: "block", marginBottom: "20px" }}>
                    Get Started
                  </span>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2.5rem, 5vw, 5rem)",
                      color: "#ffffff",
                      fontWeight: 300,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.0,
                    }}
                  >
                    Ready to Work<br />Together?
                  </h2>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: 1.85, maxWidth: "44ch", marginBottom: "40px" }}>
                    Whether you&apos;re buying, selling or investing — our team is ready to deliver the result you deserve. Let&apos;s start the conversation.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className="inline-block px-8 py-4 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "#ffffff", color: "#5BC2E7", fontFamily: "var(--font-sans)", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Get in Touch
                    </Link>
                    <a
                      href="tel:0242960047"
                      className="inline-block px-8 py-4 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-70"
                      style={{ border: "1px solid rgba(255,255,255,0.4)", color: "#ffffff", fontFamily: "var(--font-sans)", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      02 4296 0047
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
