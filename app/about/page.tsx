import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us | Spinelli Real Estate",
  description:
    "Spinelli Real Estate — a boutique Illawarra agency built on local knowledge, genuine care and exceptional results.",
};

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

const values = [
  {
    num: "01",
    title: "Integrity",
    body: "We give honest advice — always in your best interest, even when it's not what you want to hear. Our reputation is built on trust, and we protect it with every interaction.",
  },
  {
    num: "02",
    title: "Excellence",
    body: "From the quality of our marketing to the depth of our market knowledge, we hold ourselves to the highest standard. Good enough is never good enough for us.",
  },
  {
    num: "03",
    title: "Community",
    body: "We're proud Illawarra locals who live and breathe this region. We reinvest in the communities we serve and genuinely care about the people who call this coast home.",
  },
  {
    num: "04",
    title: "Results",
    body: "Our clients judge us on outcomes — and we're consistently proud of what we deliver. Every sale, every lease, every transaction is an opportunity to prove our worth.",
  },
];

const stats = [
  { value: "50+", label: "Years Combined Experience" },
  { value: "2,000+", label: "Successful Transactions" },
  { value: "94%", label: "List-to-Sale Ratio" },
  { value: "5★", label: "Client Satisfaction" },
];

// First 4 team members for the preview strip
const previewTeam = team.slice(0, 4);

export default function AboutPage() {
  return (
    <>
      {/* ── Who We Are ── */}
      <section style={{ backgroundColor: "#ffffff", paddingTop: "140px", paddingBottom: "100px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <div className="relative overflow-hidden order-last lg:order-first" style={{ height: "580px", backgroundColor: "#E8F6FC" }}>
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85"
                alt="Spinelli Real Estate team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Blue accent strip */}
              <div
                className="absolute bottom-0 left-0"
                style={{ width: "4px", height: "100%", backgroundColor: "#5BC2E7", opacity: 0.6 }}
              />
            </div>

            {/* Text */}
            <div>
              <span className="label-tag">Who We Are</span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  color: "#000000",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  marginBottom: "28px",
                }}
              >
                A Family Agency<br />Built for the Illawarra
              </h2>
              <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "28px" }} />
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#7a7265", lineHeight: 1.9, marginBottom: "20px" }}>
                Spinelli Real Estate was founded on a simple belief — that clients deserve more than a transaction. They deserve a trusted adviser who truly knows the local market, genuinely cares about their outcome and works tirelessly to achieve it.
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#7a7265", lineHeight: 1.9, marginBottom: "20px" }}>
                As a locally owned, family-run business, we operate differently. Every client works directly with our senior agents — not a junior assistant — and benefits from the full weight of our experience, our network and our reputation.
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#7a7265", lineHeight: 1.9, marginBottom: "40px" }}>
                From Helensburgh to Nowra, we&apos;ve helped thousands of families buy, sell, rent and invest across the Illawarra — with the same commitment to premium service and premium results every single time.
              </p>
              {/* Stats row */}
              <div className="grid grid-cols-2 gap-6 mb-10" style={{ borderTop: "1px solid #E8E5DF", paddingTop: "32px" }}>
                {stats.map((s) => (
                  <div key={s.label}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1 }}>
                      {s.value}
                    </p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "6px" }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/team"
                  className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  Meet the Team
                </Link>
                <Link
                  href="/contact"
                  className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-70"
                  style={{ border: "1px solid #E8E5DF", color: "#000000", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Home ── */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "100px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Text */}
            <div>
              <span className="label-tag">Our Home</span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  color: "#000000",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  marginBottom: "28px",
                }}
              >
                A Brand New Base<br />in Shellharbour City Centre
              </h2>
              <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "28px" }} />
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#7a7265", lineHeight: 1.9, marginBottom: "20px" }}>
                We&apos;re proud to call Shellharbour City Centre home. Our brand new office sits at the heart of one of the Illawarra&apos;s fastest-growing precincts — purpose-built for the way we work and designed to reflect the quality of our brand.
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#7a7265", lineHeight: 1.9, marginBottom: "20px" }}>
                From this central location, we service the entire Illawarra region — from Helensburgh in the north to Nowra in the south — with the same local expertise and personal attention our clients have come to expect.
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#7a7265", lineHeight: 1.9, marginBottom: "40px" }}>
                Whether you want to pop in for a chat, attend a property consultation or simply get a feel for who we are — our doors are always open.
              </p>
              <a
                href="https://maps.google.com/?q=Shellharbour+City+Centre"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", textTransform: "uppercase" }}
              >
                Get Directions
              </a>
            </div>

            {/* Image */}
            <div className="relative overflow-hidden" style={{ height: "520px", backgroundColor: "#E8F6FC" }}>
              <Image
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=85"
                alt="Spinelli Real Estate Shellharbour City Centre office"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Location badge */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-5" style={{ backgroundColor: "rgba(13,51,72,0.88)" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", marginBottom: "4px" }}>Our Office</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 500, color: "#ffffff" }}>Shellharbour City Centre, NSW</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "100px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div
            className="flex flex-wrap items-end justify-between gap-4 pb-12 mb-4"
            style={{ borderBottom: "1px solid #E8E5DF" }}
          >
            <div>
              <span className="label-tag">Our Values</span>
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
                What We Stand For
              </h2>
            </div>
          </div>

          <div>
            {values.map((v, i) => (
              <div
                key={v.num}
                className="grid md:grid-cols-[80px_1fr_2fr] gap-6 md:gap-12 items-start py-10"
                style={{ borderBottom: i < values.length - 1 ? "1px solid #E8E5DF" : "none" }}
              >
                <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3vw, 2.8rem)", color: "#5BC2E7", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1, opacity: 0.45 }}>
                  {v.num}
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem, 2vw, 1.5rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.2, paddingTop: "4px" }}>
                  {v.title}
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.85, paddingTop: "4px" }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pull quote ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "100px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="max-w-4xl">
            <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "40px" }} />
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                color: "#000000",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                marginBottom: "40px",
              }}
            >
              &ldquo;We treat every property as if it were our own — because we know what it means to you.&rdquo;
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#5BC2E7", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Paul Spinelli — Managing Director
            </p>
          </div>
        </div>
      </section>

      {/* ── Team preview ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "100px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div
            className="flex flex-wrap items-end justify-between gap-4 pb-10 mb-10"
            style={{ borderBottom: "1px solid #E8E5DF" }}
          >
            <div>
              <span className="label-tag">Our People</span>
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {previewTeam.map((m) => (
              <Link key={m.name} href={`/team/${toSlug(m.name)}`} className="group block">
                <div className="relative overflow-hidden" style={{ height: "300px", backgroundColor: "#E8F6FC" }}>
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 55%)" }} />
                  <div className="absolute bottom-0 left-0 px-4 py-4">
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500, color: "#ffffff", marginBottom: "2px" }}>{m.name}</p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{m.role}</p>
                  </div>
                  {/* Blue role tag */}
                  <div className="absolute top-0 right-0">
                    <span style={{ display: "block", backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 500, letterSpacing: "0.12em", padding: "5px 10px", textTransform: "uppercase" }}>
                      {m.role}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "#5BC2E7", padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.4rem)",
                  color: "#ffffff",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                Ready to Work<br />Together?
              </h2>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.75, maxWidth: "42ch", marginBottom: "32px" }}>
                Whether you&apos;re buying, selling or investing — our team is ready to deliver the result you deserve. Let&apos;s start the conversation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#ffffff", color: "#5BC2E7", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  Get in Touch
                </Link>
                <a
                  href="tel:0242960047"
                  className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-70"
                  style={{ border: "1px solid rgba(255,255,255,0.4)", color: "#ffffff", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", textTransform: "uppercase" }}
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
