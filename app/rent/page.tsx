import type { Metadata } from "next";
import RentalListings from "@/components/RentalListings";
import Link from "next/link";
import { fetchForLease, mapListing } from "@/lib/agentbox";
import { residentialRentProperties } from "@/lib/data";

export const metadata: Metadata = {
  title: "Rental Properties Wollongong & Illawarra | Spinelli Real Estate",
  description:
    "Find houses, apartments and townhouses for rent in Wollongong, Kiama, Shellharbour and across the Illawarra. Managed by Spinelli Real Estate — Illawarra's trusted property managers.",
  keywords: ["rental properties Wollongong", "houses for rent Illawarra", "property for rent Kiama", "Wollongong rentals", "Shellharbour rentals", "Illawarra property management"],
  alternates: { canonical: "https://www.spinellirealestate.com.au/rent" },
  openGraph: { title: "Rental Properties | Illawarra", description: "Houses, apartments and townhouses for rent in Wollongong, Kiama and Shellharbour.", url: "https://www.spinellirealestate.com.au/rent" },
};

export const revalidate = 3600;

export default async function RentPage() {
  let properties: typeof residentialRentProperties = [];
  try {
    const data = await fetchForLease(1, 50);
    if (data.listings?.length) {
      properties = data.listings
        .filter(l =>
          l.property.type === "Residential" &&
          !["Leased", "Withdrawn", "Sold"].includes(l.status)
        )
        .sort((a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime())
        .map(mapListing);
    }
  } catch (e) {
    console.error("AgentBox fetch failed:", e);
  }

  return (
    <>
      <RentalListings properties={properties} />

      {/* ── CTA ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D3348" }}>
        <img
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&h=500&fit=crop&q=60"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%", opacity: 0.08 }}
        />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="label-tag-light">Property Owners</span>
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
                Own an Investment<br />Property?
              </h2>
            </div>
            <div>
              <p className="mb-8" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "42ch" }}>
                Let Spinelli manage your investment and maximise your rental return. Transparent reporting, genuine care and expert local knowledge.
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
