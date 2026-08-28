import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { suburbs } from "@/lib/data";
import { fetchAllListings, mapListing } from "@/lib/agentbox";
import PropertyCard from "@/components/PropertyCard";

export const revalidate = 300;

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
    title: `Properties for Rent in ${suburb.name} | Spinelli Real Estate`,
    description: `Find rental properties in ${suburb.name}. Median weekly rent ${suburb.medianRent}. Houses, apartments and townhouses — managed by Spinelli Real Estate.`,
    keywords: [`rental properties ${suburb.name}`, `houses for rent ${suburb.name}`, `${suburb.name} rentals`, `property management ${suburb.name}`, `apartments for rent ${suburb.name}`],
    alternates: { canonical: `https://www.spinellirealestate.com.au/rent/${slug}` },
    openGraph: { title: `Rental Properties in ${suburb.name}`, description: `Find rentals in ${suburb.name} — median ${suburb.medianRent}/wk. Spinelli Real Estate.`, url: `https://www.spinellirealestate.com.au/rent/${slug}` },
  };
}

export default async function RentSuburbPage({ params }: Props) {
  const { suburb: slug } = await params;
  const suburb = suburbs.find((s) => s.slug === slug);
  if (!suburb) notFound();

  let listings: ReturnType<typeof mapListing>[] = [];
  try {
    const all = await fetchAllListings({
      "filter[type]": "Lease",
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
              href="/rent"
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-60"
              style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: "12px", height: "12px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              All Rentals
            </Link>
          </div>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "16px" }}>
            Properties For Rent
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
            Properties for Rent<br />in {suburb.name}
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
              { v: suburb.medianRent, l: "Median Weekly Rent" },
              { v: suburb.medianUnit, l: "Median Unit Price" },
              { v: suburb.annualGrowth, l: "Annual Growth" },
              { v: suburb.distanceFromSydney, l: "From Sydney" },
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
            <span className="label-tag">Available Rentals</span>
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
                ? `${listings.length} ${listings.length === 1 ? "Property" : "Properties"} For Rent in ${suburb.name}`
                : `Rentals in ${suburb.name}`}
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
                No rentals currently available in {suburb.name}.
              </p>
              <Link
                href="/rent"
                className="inline-block mt-6 px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
              >
                View All Rentals
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
                  Rental Market
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "28px" }}>
                  {suburb.name}<br />Rental Data
                </h2>
                <div>
                  {[
                    { l: "Median Weekly Rent", v: suburb.medianRent },
                    { l: "Median House Price", v: suburb.medianHouse },
                    { l: "Median Unit Price", v: suburb.medianUnit },
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

      {/* ── Owner CTA ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D3348" }}>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "20px" }}>
                Property Owners
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
                Own a Property<br />in {suburb.name}?
              </h2>
            </div>
            <div>
              <p className="mb-8" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "42ch" }}>
                Let Spinelli manage your {suburb.name} investment and maximise your rental return. Transparent reporting, genuine care and expert local knowledge.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/property-management"
                  className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
                >
                  Property Management
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
