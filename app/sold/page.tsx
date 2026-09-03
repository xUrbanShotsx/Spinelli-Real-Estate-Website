import type { Metadata } from "next";
import SoldListings from "@/components/SoldListings";
import Link from "next/link";
import { fetchAllListings, mapListing } from "@/lib/agentbox";
import type { Property } from "@/lib/types";

export const metadata: Metadata = {
  title: "Recently Sold Properties Wollongong & Illawarra | Spinelli Real Estate",
  description:
    "See what properties are selling for across the Illawarra. Browse recently sold homes in Wollongong, Kiama, Shellharbour and surrounds — real results from Spinelli Real Estate.",
  keywords: [
    "sold properties Wollongong", "recent sales Illawarra", "house sold Kiama",
    "property sold prices Wollongong", "Illawarra sold results", "sold homes Shellharbour",
  ],
  alternates: { canonical: "https://www.spinellirealestate.com.au/sold" },
  openGraph: {
    title: "Recently Sold Properties | Wollongong & Illawarra",
    description: "See what Illawarra homes are achieving. Real results from Spinelli Real Estate.",
    url: "https://www.spinellirealestate.com.au/sold",
  },
};

export const revalidate = 60;

export default async function SoldPage() {
  let properties: Property[] = [];
  try {
    const [settled, sold, unconditional] = await Promise.all([
      fetchAllListings({ "filter[type]": "Sale", "filter[status]": "Settled", "sort[listedDate]": "desc" }),
      fetchAllListings({ "filter[type]": "Sale", "filter[status]": "Sold", "sort[listedDate]": "desc" }),
      fetchAllListings({ "filter[type]": "Sale", "filter[status]": "Unconditional", "sort[listedDate]": "desc" }),
    ]);
    const combined = [...settled, ...sold, ...unconditional];
    // Deduplicate by id and sort most recent first
    const seen = new Set<string>();
    const unique = combined.filter(l => { if (seen.has(l.id)) return false; seen.add(l.id); return true; });
    unique.sort((a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime());
    if (unique.length) properties = unique.map(mapListing);
  } catch (e) {
    console.error("AgentBox sold fetch failed:", e);
  }

  return (
    <>
      <SoldListings properties={properties} />

      {/* ── CTA ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D3348" }}>
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&h=500&fit=crop&q=60"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%", opacity: 0.1 }}
        />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="label-tag-light">Sell With Spinelli</span>
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
                Ready to Achieve<br />Your Best Result?
              </h2>
            </div>
            <div>
              <p className="mb-8" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "42ch" }}>
                Contact us for a confidential, no-obligation appraisal. We&apos;ll show you exactly what your property could achieve in today&apos;s market.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/appraisal"
                  className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
                >
                  Book a Free Appraisal
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
