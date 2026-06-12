import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { suburbs } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

const suburbImages: Record<string, string> = {
  "wollongong":               "/Wollongong.jpg",
  "kiama":                    "/Kiama.jpg",
  "shellharbour":             "/Shellharbour.jpg",
  "gerringong":               "/Gerringong.jpg",
  "austinmer":                "/Austinmer.jpg",
  "dapto":                    "/Dapto.jpg",
  "figtree":                  "/Figtree.jpg",
  "jamberoo":                 "/Jamberoo.jpg",
  "berry":                    "/Berry.webp",
  "nowra":                    "/Nowra.jpg",
  "lake-illawarra":           "/lake-illawarra.jpg",
  "thirroul":                 "/Elevation.jpg",
  "corrimal":                 "/Rooftop.jpg",
  "fairy-meadow":             "/bluewater.jpg",
  "helensburgh":              "/droneshot.jpg",
  "barrack-heights":          "/Shellharbour.jpg",
  "barrack-point":            "/bluewater.jpg",
  "shell-cove":               "/Shellharbour.jpg",
  "shellharbour-city-centre": "/Shellharbour.jpg",
  "warilla":                  "/Elevation.jpg",
  "windang":                  "/bluewater.jpg",
  "calderwood":               "/Elevation.jpg",
  "tullimbar":                "/Elevation.jpg",
  "yellow-rock-ridge":        "/Rooftop.jpg",
  "blackbutt":                "/Rooftop.jpg",
  "dunmore":                  "/Jamberoo.jpg",
  "croom":                    "/Jamberoo.jpg",
};
const fallbackImage = "/suburb.jpg";

export async function generateStaticParams() {
  return suburbs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const suburb = suburbs.find((s) => s.slug === slug);
  if (!suburb) return {};
  return {
    title: `${suburb.name} Property Guide | Spinelli Real Estate`,
    description: `${suburb.name} suburb guide — median house ${suburb.medianHouse}, annual growth ${suburb.annualGrowth}. ${suburb.description}`,
  };
}

export default async function SuburbPage({ params }: Props) {
  const { slug } = await params;
  const suburb = suburbs.find((s) => s.slug === slug);
  if (!suburb) notFound();

  const nearby = suburbs.filter((s) => s.slug !== suburb.slug).slice(0, 4);
  const heroImage = suburbImages[suburb.slug] ?? fallbackImage;


  return (
    <>
      {/* ── Hero ── */}
      <section className="relative" style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>

        {/* Back link — top left, aligned with navbar menu button */}
        <div className="absolute px-6 sm:px-10" style={{ top: "120px", left: 0 }}>
          <Link
            href="/suburbs"
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-60"
            style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: "12px", height: "12px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Suburbs
          </Link>
        </div>

        {/* Suburb name — centred */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "20px" }}>
            Suburb Guide · {suburb.lga}
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              color: "#000000",
              fontWeight: 300,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
            }}
          >
            {suburb.name}
          </h1>
        </div>

        {/* Description + buttons — bottom centred */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 lg:px-20 flex flex-col items-center text-center" style={{ paddingBottom: "80px" }}>
          <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "28px" }} />
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#7a7265", lineHeight: 1.9, maxWidth: "54ch", marginBottom: "36px" }}>
            {suburb.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/appraisal"
              className="inline-block px-8 py-4 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Free Appraisal
            </Link>
            <Link
              href={`/contact?suburb=${suburb.slug}`}
              className="inline-block px-8 py-4 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-70"
              style={{ color: "#000000", fontFamily: "var(--font-sans)", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Make an Enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* ── Key stats bar ── */}
      <section style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { v: suburb.medianHouse, l: "Median House" },
              { v: suburb.annualGrowth, l: "Annual Growth" },
              { v: `${suburb.daysOnMarket}d`, l: "Avg Days on Market" },
              { v: suburb.distanceFromSydney, l: "From Sydney" },
            ].map((s) => (
              <div key={s.l} className="py-8 px-6">
                <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "8px" }}>
                  {s.v}
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── About + Market data ── */}
      <section style={{ backgroundColor: "#ffffff", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-20">

            {/* About */}
            <div>
              <div style={{ borderTop: "1px solid #E8E5DF", paddingTop: "40px" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "12px" }}>
                  About
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "28px" }}>
                  Life in<br />{suburb.name}
                </h2>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.9 }}>
                  {suburb.longDescription}
                </p>
              </div>
            </div>

            {/* Market data */}
            <div>
              <div style={{ borderTop: "1px solid #E8E5DF", paddingTop: "40px" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "12px" }}>
                  Market Data
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "28px" }}>
                  Property<br />Snapshot
                </h2>
                <div>
                  {[
                    { l: "Median House Price",   v: suburb.medianHouse },
                    { l: "Median Unit Price",    v: suburb.medianUnit },
                    { l: "Median Weekly Rent",   v: suburb.medianRent },
                    { l: "Annual Capital Growth",v: suburb.annualGrowth },
                    { l: "Avg. Days on Market",  v: `${suburb.daysOnMarket} days` },
                    { l: "Population",           v: suburb.population },
                    { l: "Distance from Sydney", v: suburb.distanceFromSydney },
                  ].map((item) => (
                    <div key={item.l} className="flex items-center justify-between py-3.5" style={{ borderBottom: "1px solid #E8E5DF" }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265" }}>{item.l}</span>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.02em" }}>{item.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section style={{ backgroundColor: "#FBF9F3", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div style={{ borderTop: "1px solid #E8E5DF", paddingTop: "40px" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "12px" }}>
              Highlights
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "48px" }}>
              What Makes {suburb.name} Special
            </h2>
            <div className="grid md:grid-cols-2 gap-x-20">
              {suburb.highlights.map((h, i) => (
                <div key={h} className="flex items-start gap-5 py-4" style={{ borderBottom: "1px solid #E8E5DF" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", color: "#5BC2E7", fontWeight: 300, opacity: 0.7, flexShrink: 0, width: "28px", marginTop: "1px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "13.5px", color: "#58503c", lineHeight: 1.6 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Schools & Amenities ── */}
      <section style={{ backgroundColor: "#ffffff", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-20">

            {/* Schools */}
            <div>
              <div style={{ borderTop: "1px solid #E8E5DF", paddingTop: "40px" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "12px" }}>
                  Education
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "32px" }}>
                  Schools &amp;<br />Education
                </h2>
                <div>
                  {suburb.schools.map((s) => (
                    <div key={s} className="flex items-center gap-4 py-3.5" style={{ borderBottom: "1px solid #E8E5DF" }}>
                      <div style={{ width: "6px", height: "6px", backgroundColor: "#5BC2E7", borderRadius: "50%", flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "13.5px", color: "#58503c" }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <div style={{ borderTop: "1px solid #E8E5DF", paddingTop: "40px" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "12px" }}>
                  Lifestyle
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "32px" }}>
                  Local<br />Amenities
                </h2>
                <div>
                  {suburb.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-4 py-3.5" style={{ borderBottom: "1px solid #E8E5DF" }}>
                      <div style={{ width: "6px", height: "6px", backgroundColor: "#5BC2E7", borderRadius: "50%", flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "13.5px", color: "#58503c" }}>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Nearby suburbs ── */}
      <section style={{ backgroundColor: "#FBF9F3", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div style={{ borderTop: "1px solid #E8E5DF", paddingTop: "40px" }}>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "12px" }}>
                  Explore More
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                  Other Suburbs
                </h2>
              </div>
              <Link href="/suburbs" style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#5BC2E7", letterSpacing: "0.04em" }} className="transition-opacity hover:opacity-60 hidden sm:block">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {nearby.map((s) => {
                const img = suburbImages[s.slug] ?? fallbackImage;
                return (
                  <Link key={s.slug} href={`/suburbs/${s.slug}`} className="group block">
                    <div className="overflow-hidden" style={{ aspectRatio: "4/3", border: "1px solid #E8E5DF" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={s.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "#0D3348", padding: "100px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "20px" }}>
                Interested in {suburb.name}?
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.0 }}>
                Let&apos;s Talk<br />{suburb.name} Property
              </h2>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.85, maxWidth: "44ch", marginBottom: "36px" }}>
                Whether you&apos;re buying, selling or investing in {suburb.name} — our local specialists are ready to help you achieve the best possible outcome.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/appraisal"
                  className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  Free Appraisal
                </Link>
                <Link
                  href={`/contact?suburb=${suburb.slug}`}
                  className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-70"
                  style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", textTransform: "uppercase" }}
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
