import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { suburbs } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return suburbs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const suburb = suburbs.find((s) => s.slug === slug);
  if (!suburb) return {};
  return {
    title: `${suburb.name} Property Market | Spinelli Real Estate`,
    description: `${suburb.name} suburb guide — median house ${suburb.medianHouse}, annual growth ${suburb.annualGrowth}. ${suburb.description}`,
  };
}

export default async function SuburbPage({ params }: Props) {
  const { slug } = await params;
  const suburb = suburbs.find((s) => s.slug === slug);
  if (!suburb) notFound();

  const nearby = suburbs.filter((s) => s.slug !== suburb.slug).slice(0, 4);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex items-end" style={{ minHeight: "100svh" }}>
        <img
          src={suburb.image}
          alt={suburb.name}
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.05) 100%)" }}
        />

        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pb-20">
          {/* Back link */}
          <Link
            href="/suburbs"
            className="inline-flex items-center gap-2 mb-8 transition-opacity hover:opacity-60"
            style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: "12px", height: "12px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Suburbs
          </Link>

          <span
            className="block mb-4"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#5BC2E7",
            }}
          >
            {suburb.demandLevel} Demand · {suburb.lga}
          </span>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              color: "#ffffff",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              marginBottom: "2rem",
            }}
          >
            {suburb.name}
          </h1>

          {/* Inline key stats */}
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {[
              { v: suburb.medianHouse, l: "Median House" },
              { v: suburb.annualGrowth, l: "Annual Growth" },
              { v: `${suburb.daysOnMarket}d`, l: "Days on Market" },
              { v: suburb.distanceFromSydney, l: "From Sydney" },
            ].map((s) => (
              <div key={s.l}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {s.v}
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "5px" }}>
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section style={{ backgroundColor: "#0D3348" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-white/10">
            {[
              { l: "Median House", v: suburb.medianHouse },
              { l: "Median Unit", v: suburb.medianUnit },
              { l: "Median Rent", v: suburb.medianRent },
              { l: "Annual Growth", v: suburb.annualGrowth },
              { l: "Days on Market", v: `${suburb.daysOnMarket}d` },
            ].map((s) => (
              <div key={s.l} className="py-10 px-6 flex flex-col gap-2">
                <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {s.v}
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-28">
          <div className="grid lg:grid-cols-[380px_1fr] gap-20 items-start">
            <div>
              <span className="label-tag">About</span>
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
                Life in<br />{suburb.name}
              </h2>
            </div>
            <div>
              <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "2rem" }} />
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  color: "#7a7265",
                  lineHeight: 1.9,
                  maxWidth: "60ch",
                }}
              >
                {suburb.longDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Highlights + Market data ── */}
      <section style={{ backgroundColor: "#FBF9F3" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-28">
          <div className="grid lg:grid-cols-2 gap-20">

            {/* Highlights */}
            <div>
              <span className="label-tag">Highlights</span>
              <h2
                className="mb-10"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  color: "#000000",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                What Makes<br />{suburb.name} Special
              </h2>
              <div className="flex flex-col gap-0">
                {suburb.highlights.map((h, i) => (
                  <div
                    key={h}
                    className="flex items-center gap-5 py-4"
                    style={{ borderBottom: "1px solid #E8E5DF" }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1rem",
                        color: "#5BC2E7",
                        fontWeight: 300,
                        opacity: 0.6,
                        flexShrink: 0,
                        width: "28px",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "13.5px", color: "#58503c", lineHeight: 1.5 }}>
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Market data */}
            <div>
              <span className="label-tag">Market Data</span>
              <h2
                className="mb-10"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  color: "#000000",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                Property<br />Snapshot
              </h2>
              <div className="flex flex-col gap-0">
                {[
                  { l: "Median House Price", v: suburb.medianHouse },
                  { l: "Median Unit Price", v: suburb.medianUnit },
                  { l: "Median Weekly Rent", v: suburb.medianRent },
                  { l: "Annual Capital Growth", v: suburb.annualGrowth },
                  { l: "Avg. Days on Market", v: `${suburb.daysOnMarket} days` },
                  { l: "Population", v: suburb.population },
                  { l: "Distance from Sydney", v: suburb.distanceFromSydney },
                ].map((item) => (
                  <div
                    key={item.l}
                    className="flex items-center justify-between py-4"
                    style={{ borderBottom: "1px solid #E8E5DF" }}
                  >
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265" }}>
                      {item.l}
                    </span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.02em" }}>
                      {item.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Schools & Amenities ── */}
      <section style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-28">
          <div className="grid lg:grid-cols-2 gap-20">

            {/* Schools */}
            <div>
              <span className="label-tag">Education</span>
              <h2
                className="mb-10"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  color: "#000000",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                Schools &amp;<br />Education
              </h2>
              <div className="flex flex-col gap-0">
                {suburb.schools.map((s) => (
                  <div key={s} className="flex items-center gap-4 py-4" style={{ borderBottom: "1px solid #E8E5DF" }}>
                    <div style={{ width: "6px", height: "6px", backgroundColor: "#5BC2E7", borderRadius: "50%", flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "13.5px", color: "#58503c" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <span className="label-tag">Lifestyle</span>
              <h2
                className="mb-10"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  color: "#000000",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                Local<br />Amenities
              </h2>
              <div className="flex flex-col gap-0">
                {suburb.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-4 py-4" style={{ borderBottom: "1px solid #E8E5DF" }}>
                    <div style={{ width: "6px", height: "6px", backgroundColor: "#5BC2E7", borderRadius: "50%", flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "13.5px", color: "#58503c" }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Nearby suburbs ── */}
      <section style={{ backgroundColor: "#FBF9F3" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="label-tag">Explore More</span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  color: "#000000",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                Other Suburbs
              </h2>
            </div>
            <Link
              href="/suburbs"
              style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#5BC2E7" }}
              className="transition-opacity hover:opacity-60 hidden sm:block"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {nearby.map((s) => (
              <Link key={s.slug} href={`/suburbs/${s.slug}`} className="group block">
                <div className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="pt-3">
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "2px" }}>
                    {s.name}
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#5BC2E7" }}>
                    {s.medianHouse} median
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D3348" }}>
        <img
          src={suburb.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%", opacity: 0.1 }}
        />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="label-tag-light">Interested in {suburb.name}?</span>
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
                Let&apos;s Talk<br />{suburb.name} Property
              </h2>
            </div>
            <div>
              <p className="mb-8" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "42ch" }}>
                Whether you&apos;re buying, selling or investing in {suburb.name} — our local specialists are ready to help you achieve the best possible outcome.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/contact?type=appraisal&suburb=${suburb.slug}`}
                  className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
                >
                  Free Appraisal
                </Link>
                <Link
                  href={`/contact?suburb=${suburb.slug}`}
                  className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-70"
                  style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-sans)" }}
                >
                  Make an Enquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
