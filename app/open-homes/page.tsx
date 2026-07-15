import type { Metadata } from "next";
import Link from "next/link";
import { fetchAllListings, mapListing } from "@/lib/agentbox";

export const metadata: Metadata = {
  title: "Open Homes | Spinelli Real Estate",
  description: "Upcoming open home inspection times for properties across the Illawarra — Wollongong, Shellharbour, Kiama and surrounds.",
};

export const revalidate = 300;

export default async function OpenHomesPage() {
  let listings: ReturnType<typeof mapListing>[] = [];

  try {
    const all = await fetchAllListings({
      "filter[type]": "Sale",
      "filter[status]": "Available",
      "sort[listedDate]": "desc",
    });
    listings = all
      .filter((l) => {
        // only keep listings with a future inspection date
        const dates = l.inspectionDates ?? [];
        return dates.some((d) => new Date(d.startDate).getTime() > Date.now());
      })
      .map(mapListing)
      .filter((p) => !!p.openHome)
      .sort((a, b) => {
        // sort by open home time string (they start with "Sat DD Mon, HH:MM")
        return (a.openHome ?? "").localeCompare(b.openHome ?? "");
      });
  } catch {
    // render empty state on error
  }

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ backgroundColor: "#ffffff", paddingTop: "160px", paddingBottom: "80px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "16px" }}>
            Upcoming Inspections
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
            Open Homes
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.85, maxWidth: "48ch" }}>
            Browse our upcoming open for inspection times across the Illawarra. Click any property to view full details and photos.
          </p>
        </div>
      </section>

      {/* ── Listings ── */}
      <section style={{ backgroundColor: "#ffffff", paddingBottom: "100px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">

          {listings.length === 0 ? (
            <div className="py-24 text-center">
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#a2b0aa" }}>
                No open homes currently scheduled. Check back soon.
              </p>
              <Link
                href="/buy"
                className="inline-block mt-6 px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
              >
                Browse All Properties
              </Link>
            </div>
          ) : (
            <div style={{ borderTop: "1px solid #E8E5DF" }}>
              {listings.map((p) => (
                <Link
                  key={p.id}
                  href={`/property/${p.id}`}
                  className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 py-7 transition-opacity hover:opacity-75"
                  style={{ borderBottom: "1px solid #E8E5DF", textDecoration: "none" }}
                >
                  {/* Thumbnail */}
                  <div className="overflow-hidden flex-shrink-0" style={{ width: "120px", height: "80px" }}>
                    <img
                      src={p.image}
                      alt={p.address}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
                      {p.suburb}
                    </p>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "4px" }}>
                      {p.address}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-1">
                      {p.beds !== undefined && (
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#7a7265" }}>{p.beds} bed</span>
                      )}
                      {p.baths !== undefined && (
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#7a7265" }}>{p.baths} bath</span>
                      )}
                      {p.cars !== undefined && (
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#7a7265" }}>{p.cars} car</span>
                      )}
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.01em" }}>
                        {p.price}
                      </span>
                    </div>
                  </div>

                  {/* Open home time */}
                  <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3" style={{ backgroundColor: "#F0F9FD", border: "1px solid #5BC2E7" }}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="#5BC2E7" strokeWidth={1.5} style={{ width: "16px", height: "16px", flexShrink: 0 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#5BC2E7", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}>Open Home</p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#0D3348", fontWeight: 500, marginTop: "2px", whiteSpace: "nowrap" }}>{p.openHome}</p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <svg fill="none" viewBox="0 0 24 24" stroke="#a2b0aa" strokeWidth={1.5} style={{ width: "18px", height: "18px", flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D3348" }}>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "20px" }}>
                Can&apos;t Make It?
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
                Book a Private<br />Inspection
              </h2>
            </div>
            <div>
              <p className="mb-8" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "42ch" }}>
                Can&apos;t make an open home? Contact us to arrange a private inspection at a time that suits you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
                >
                  Contact Us
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
