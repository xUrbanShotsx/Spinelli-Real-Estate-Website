import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { suburbs } from "@/lib/data";
import { fetchAllListings, mapListing } from "@/lib/agentbox";
import PropertyCard from "@/components/PropertyCard";

export const revalidate = 3600;

interface Props {
  params: Promise<{ suburb: string }>;
}

export async function generateStaticParams() {
  return suburbs.map((s) => ({ suburb: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { suburb: slug } = await params;
  const suburb = suburbs.find((s) => s.slug === slug);
  if (!suburb) return {};
  return {
    title: `Houses for Sale in ${suburb.name} | Spinelli Real Estate`,
    description: `Browse properties for sale in ${suburb.name}. Median house price ${suburb.medianHouse}, ${suburb.annualGrowth} annual growth. Expert local agents — Spinelli Real Estate.`,
    keywords: [`houses for sale ${suburb.name}`, `property for sale ${suburb.name}`, `${suburb.name} real estate`, `buy property ${suburb.name}`, `${suburb.name} homes for sale`],
    alternates: { canonical: `https://www.spinellirealestate.com.au/buy/${slug}` },
    openGraph: { title: `Houses for Sale in ${suburb.name}`, description: `Properties for sale in ${suburb.name} — median ${suburb.medianHouse}. Spinelli Real Estate.`, url: `https://www.spinellirealestate.com.au/buy/${slug}` },
  };
}

export default async function BuySuburbPage({ params }: Props) {
  const { suburb: slug } = await params;
  const suburb = suburbs.find((s) => s.slug === slug);
  if (!suburb) notFound();

  let listings: ReturnType<typeof mapListing>[] = [];
  try {
    const all = await fetchAllListings({
      "filter[type]": "Sale",
      "filter[status]": "Available",
      "filter[suburb]": suburb.name,
      "sort[listedDate]": "desc",
    });
    listings = all
      .filter((l) => l.property.type === "Residential")
      .map(mapListing);
  } catch {
    // no listings available — still render the page for SEO
  }

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ backgroundColor: "#ffffff", paddingTop: "160px", paddingBottom: "80px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="mb-6">
            <Link
              href="/buy"
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-60"
              style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: "12px", height: "12px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              All Properties
            </Link>
          </div>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "16px" }}>
            Properties For Sale
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "#000000",
              fontWeight: 300,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              marginBottom: "24px",
            }}
          >
            Houses for Sale<br />in {suburb.name}
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.85, maxWidth: "52ch" }}>
            {suburb.description}
          </p>
        </div>
      </section>

      {/* ── Key stats ── */}
      <section style={{ backgroundColor: "#FBF9F3" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { v: suburb.medianHouse, l: "Median House" },
              { v: suburb.annualGrowth, l: "Annual Growth" },
              { v: `${suburb.daysOnMarket}d`, l: "Avg Days on Market" },
              { v: suburb.medianUnit, l: "Median Unit" },
            ].map((s) => (
              <div key={s.l} className="py-8 px-6" style={{ borderRight: "1px solid #E8E5DF" }}>
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

      {/* ── Listings ── */}
      <section style={{ backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="pb-8 mb-10" style={{ borderBottom: "1px solid #E8E5DF" }}>
            <span className="label-tag">Current Listings</span>
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
              {listings.length > 0
                ? `${listings.length} ${listings.length === 1 ? "Property" : "Properties"} For Sale in ${suburb.name}`
                : `Properties For Sale in ${suburb.name}`}
            </h2>
          </div>

          {listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "40px" }}>
              {listings.map((p) => (
                <PropertyCard key={p.id} property={p} compact />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#a2b0aa" }}>
                No listings currently available in {suburb.name}.
              </p>
              <Link
                href="/buy"
                className="inline-block mt-6 px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
              >
                View All Properties
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── About the suburb ── */}
      <section style={{ backgroundColor: "#FBF9F3", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <div style={{ borderTop: "1px solid #E8E5DF", paddingTop: "40px" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "12px" }}>
                  About {suburb.name}
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "28px" }}>
                  Life in<br />{suburb.name}
                </h2>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.9 }}>
                  {suburb.longDescription}
                </p>
                <Link
                  href={`/suburbs/${suburb.slug}`}
                  className="inline-flex items-center gap-2 mt-8 transition-opacity hover:opacity-60"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#5BC2E7", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  Full Suburb Guide
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: "12px", height: "12px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <div style={{ borderTop: "1px solid #E8E5DF", paddingTop: "40px" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "12px" }}>
                  Market Snapshot
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "28px" }}>
                  {suburb.name}<br />Property Data
                </h2>
                <div>
                  {[
                    { l: "Median House Price", v: suburb.medianHouse },
                    { l: "Median Unit Price", v: suburb.medianUnit },
                    { l: "Median Weekly Rent", v: suburb.medianRent },
                    { l: "Annual Capital Growth", v: suburb.annualGrowth },
                    { l: "Avg. Days on Market", v: `${suburb.daysOnMarket} days` },
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

      {/* ── CTA ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D3348" }}>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "20px" }}>
                Buying in {suburb.name}?
              </span>
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
                Looking for<br />Something Specific?
              </h2>
            </div>
            <div>
              <p className="mb-8" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "42ch" }}>
                Register your wish list and we&apos;ll match you with properties the moment they come to market — including off-market opportunities in {suburb.name} not advertised publicly.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact?type=buyer-enquiry"
                  className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
                >
                  Register Your Interest
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
