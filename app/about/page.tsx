import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Spinelli Real Estate",
  description:
    "Spinelli Real Estate — a boutique Illawarra agency built on two decades of local knowledge, genuine care and exceptional results.",
};

const values = [
  { n: "01", title: "Integrity", body: "Honest advice, always in your best interest — even when it's not what you want to hear." },
  { n: "02", title: "Excellence", body: "The highest standard in everything — marketing, communication and results." },
  { n: "03", title: "Community", body: "Proud Illawarra locals who invest in the people and places that make this region great." },
  { n: "04", title: "Results", body: "Our clients judge us on outcomes. We're consistently proud of what we deliver." },
];

const milestones = [
  { year: "2004", event: "Spinelli Real Estate founded in Wollongong" },
  { year: "2008", event: "Expanded into commercial property & business sales" },
  { year: "2013", event: "Launched dedicated property management division" },
  { year: "2018", event: "Entered project marketing for Illawarra developers" },
  { year: "2024", event: "20 years — over 2,000 successful transactions" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex items-end" style={{ minHeight: "90vh" }}>
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&h=1200&fit=crop&q=85"
          alt="Spinelli Real Estate"
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.05) 100%)" }}
        />
        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pb-20">
          <span className="label-tag-light block mb-5">Our Story</span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              color: "#ffffff",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              marginBottom: "1.5rem",
              maxWidth: "14ch",
            }}
          >
            Built on Trust.<br />Driven by Results.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.75,
              maxWidth: "44ch",
            }}
          >
            A boutique Illawarra agency with over two decades of local knowledge, genuine care and a relentless commitment to exceptional outcomes.
          </p>
        </div>
      </section>

      {/* ── Opening statement ── */}
      <section style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-28">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-20 items-center">
            <div>
              <span className="label-tag">Who We Are</span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.4rem)",
                  color: "#000000",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  marginBottom: "2rem",
                }}
              >
                Two Decades of<br />Illawarra Real Estate
              </h2>
              <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "2rem" }} />
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  color: "#7a7265",
                  lineHeight: 1.85,
                  maxWidth: "46ch",
                  marginBottom: "1.5rem",
                }}
              >
                Spinelli Real Estate was founded on a simple belief — that clients deserve more than a transaction. They deserve a trusted adviser who truly knows the local market, cares about their outcome and works tirelessly to achieve it.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  color: "#7a7265",
                  lineHeight: 1.85,
                  maxWidth: "46ch",
                }}
              >
                From Helensburgh to Nowra, we&apos;ve helped thousands of families buy, sell, rent and invest — with the same commitment to premium service and premium results every time.
              </p>
            </div>

            {/* Image */}
            <div className="relative" style={{ height: "560px" }}>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85"
                alt="Spinelli Real Estate"
                className="absolute inset-0 object-cover"
                style={{ width: "100%", height: "100%" }}
              />
              {/* Stats overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 grid grid-cols-3"
                style={{ backgroundColor: "rgba(13,51,72,0.92)" }}
              >
                {[
                  { v: "20+", l: "Years" },
                  { v: "2,000+", l: "Transactions" },
                  { v: "5★", l: "Satisfaction" },
                ].map((s, i) => (
                  <div
                    key={s.l}
                    className="py-6 text-center"
                    style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none" }}
                  >
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1 }}>
                      {s.v}
                    </p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "6px" }}>
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ backgroundColor: "#FBF9F3" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-28">
          <div className="grid lg:grid-cols-[380px_1fr] gap-20 items-start">
            <div>
              <span className="label-tag">Our Values</span>
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
                What We<br />Stand For
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-0">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className="py-10 pr-10"
                  style={{
                    borderTop: "1px solid #E8E5DF",
                    paddingLeft: i % 2 === 1 ? "2.5rem" : "0",
                    borderLeft: i % 2 === 1 ? "1px solid #E8E5DF" : "none",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2.8rem",
                      fontWeight: 300,
                      color: "#5BC2E7",
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      opacity: 0.4,
                      marginBottom: "1.2rem",
                    }}
                  >
                    {v.n}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.3rem",
                      color: "#000000",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {v.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.75 }}>
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ backgroundColor: "#0D3348" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-28">
          <div className="grid lg:grid-cols-[380px_1fr] gap-20 items-start">
            <div>
              <span className="label-tag-light">Our Journey</span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  color: "#ffffff",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                Two Decades<br />of Growth
              </h2>
            </div>
            <div className="flex flex-col">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className="flex gap-8 items-start"
                  style={{ paddingBottom: i < milestones.length - 1 ? "2.5rem" : "0" }}
                >
                  {/* Year */}
                  <div style={{ flexShrink: 0, width: "60px" }}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#5BC2E7", fontWeight: 300, letterSpacing: "-0.02em" }}>
                      {m.year}
                    </p>
                  </div>
                  {/* Line */}
                  <div className="flex flex-col items-center" style={{ flexShrink: 0 }}>
                    <div style={{ width: "6px", height: "6px", backgroundColor: "#5BC2E7", borderRadius: "50%", marginTop: "6px" }} />
                    {i < milestones.length - 1 && (
                      <div style={{ width: "1px", flex: 1, backgroundColor: "rgba(91,194,231,0.2)", marginTop: "8px", minHeight: "32px" }} />
                    )}
                  </div>
                  {/* Event */}
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, paddingTop: "2px" }}>
                    {m.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-bleed image ── */}
      <div style={{ height: "480px", position: "relative", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1800&h=700&fit=crop&q=85"
          alt="Illawarra home"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%)" }} />
        <div className="absolute inset-0 flex flex-col justify-center" style={{ paddingLeft: "clamp(2rem, 8vw, 8rem)" }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
              color: "#ffffff",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              maxWidth: "18ch",
              marginBottom: "2rem",
            }}
          >
            We treat every property as if it were our own.
          </p>
          <Link
            href="/contact"
            className="inline-block self-start px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
            style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
          >
            Work With Us
          </Link>
        </div>
      </div>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="label-tag">Get Started</span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  color: "#000000",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                Ready to Work<br />Together?
              </h2>
            </div>
            <div>
              <p className="mb-8" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.75, maxWidth: "42ch" }}>
                Whether you&apos;re buying, selling or investing — our team is ready to deliver the result you deserve. Let&apos;s start the conversation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
                >
                  Get in Touch
                </Link>
                <a
                  href="tel:0242960047"
                  className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-70"
                  style={{ border: "1px solid #DAD7CE", color: "#58503c", fontFamily: "var(--font-sans)" }}
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
