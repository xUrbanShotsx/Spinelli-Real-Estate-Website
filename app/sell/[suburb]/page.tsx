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
    title: `Sell Your Property in ${suburb.name} | Spinelli Real Estate`,
    description: `Thinking of selling in ${suburb.name}? Median house price ${suburb.medianHouse}, ${suburb.annualGrowth} annual growth. Get a free appraisal from Spinelli Real Estate — Illawarra's local experts.`,
  };
}

export default async function SellSuburbPage({ params }: Props) {
  const { suburb: slug } = await params;
  const suburb = suburbs.find((s) => s.slug === slug);
  if (!suburb) notFound();

  // Fetch recent sold results for this suburb
  let recentSold: ReturnType<typeof mapListing>[] = [];
  try {
    const [settled, sold, unconditional] = await Promise.all([
      fetchAllListings({ "filter[type]": "Sale", "filter[status]": "Settled", "filter[suburb]": suburb.name, "sort[listedDate]": "desc" }),
      fetchAllListings({ "filter[type]": "Sale", "filter[status]": "Sold", "filter[suburb]": suburb.name, "sort[listedDate]": "desc" }),
      fetchAllListings({ "filter[type]": "Sale", "filter[status]": "Unconditional", "filter[suburb]": suburb.name, "sort[listedDate]": "desc" }),
    ]);
    recentSold = [...settled, ...sold, ...unconditional]
      .filter((l) => l.property.type === "Residential")
      .sort((a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime())
      .slice(0, 6)
      .map(mapListing);
  } catch {
    // no sold results — still render the page for SEO
  }

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ backgroundColor: "#0D3348", paddingTop: "160px", paddingBottom: "100px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="mb-6">
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-60"
              style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: "12px", height: "12px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Selling
            </Link>
          </div>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "16px" }}>
            Sell With Spinelli
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "#ffffff",
              fontWeight: 300,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              marginBottom: "24px",
            }}
          >
            Selling in<br />{suburb.name}
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.85, maxWidth: "52ch", marginBottom: "40px" }}>
            With a median house price of {suburb.medianHouse} and {suburb.annualGrowth} annual growth, {suburb.name} is one of the Illawarra&apos;s most sought-after markets. Our local specialists will help you achieve the best possible result.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/appraisal"
              className="inline-block px-8 py-4 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Free Appraisal
            </Link>
            <a
              href="tel:0242960047"
              className="inline-block px-8 py-4 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-70"
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-sans)", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              02 4296 0047
            </a>
          </div>
        </div>
      </section>

      {/* ── Key stats ── */}
      <section style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { v: suburb.medianHouse, l: "Median House Price" },
              { v: suburb.annualGrowth, l: "Annual Growth" },
              { v: `${suburb.daysOnMarket}d`, l: "Avg Days on Market" },
              { v: suburb.medianUnit, l: "Median Unit Price" },
            ].map((s) => (
              <div key={s.l} className="py-10 px-6" style={{ borderRight: "1px solid #E8E5DF", borderBottom: "1px solid #E8E5DF" }}>
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

      {/* ── Why Spinelli ── */}
      <section style={{ backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div style={{ borderTop: "1px solid #E8E5DF", paddingTop: "40px", marginBottom: "60px" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "12px" }}>
              Why Choose Us
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: "20ch" }}>
              Selling {suburb.name} Property with Spinelli
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                num: "01",
                title: "Local Expertise",
                body: `We know ${suburb.name} better than anyone. From street-by-street trends to buyer psychology, our agents use genuine local knowledge to price and position your property perfectly.`,
              },
              {
                num: "02",
                title: "Premium Marketing",
                body: "Professional photography, compelling copywriting, targeted digital campaigns and prime real estate portal placement — your property deserves to be seen by the right buyers.",
              },
              {
                num: "03",
                title: "Results That Speak",
                body: "Our track record in the Illawarra speaks for itself. We consistently achieve above-market results through careful negotiation and deep buyer networks built over years in the region.",
              },
            ].map((item) => (
              <div key={item.num} style={{ borderTop: "1px solid #E8E5DF", paddingTop: "32px" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", color: "#5BC2E7", fontWeight: 300, opacity: 0.7, display: "block", marginBottom: "16px" }}>
                  {item.num}
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "16px" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13.5px", color: "#7a7265", lineHeight: 1.85 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Sold Results ── */}
      {recentSold.length > 0 && (
        <section style={{ backgroundColor: "#FBF9F3", paddingTop: "80px", paddingBottom: "80px" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
            <div className="pb-8 mb-10" style={{ borderBottom: "1px solid #E8E5DF" }}>
              <span className="label-tag">Sold Results</span>
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
                Recent Sales in {suburb.name}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "40px" }}>
              {recentSold.map((p) => (
                <PropertyCard key={p.id} property={p} compact />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/sold"
                className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                style={{ border: "1px solid #0D3348", color: "#0D3348", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", textTransform: "uppercase" }}
              >
                View All Sold Results
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Appraisal CTA ── */}
      <section style={{ backgroundColor: "#FBF9F3", paddingTop: recentSold.length > 0 ? "0" : "80px", paddingBottom: "80px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center py-16 px-10 sm:px-16" style={{ backgroundColor: "#0D3348" }}>
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "20px" }}>
                Free Appraisal
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.0 }}>
                What&apos;s Your {suburb.name}<br />Property Worth?
              </h2>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.85, maxWidth: "44ch", marginBottom: "36px" }}>
                Find out the current market value of your {suburb.name} property with a free, no-obligation appraisal from our local specialists.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/appraisal"
                  className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  Book Free Appraisal
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
