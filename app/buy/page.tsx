import type { Metadata } from "next";
import ResidentialListings from "@/components/ResidentialListings";
import Link from "next/link";
import { fetchForSale, mapListing } from "@/lib/agentbox";
import { residentialSaleProperties } from "@/lib/data";

export const metadata: Metadata = {
  title: "Properties For Sale in Wollongong & Illawarra | Spinelli Real Estate",
  description:
    "Browse houses, apartments and land for sale across Wollongong, Kiama, Shellharbour, Thirroul and the Illawarra. Real results from Spinelli Real Estate — the Illawarra's premier agency.",
  keywords: ["houses for sale Wollongong", "property for sale Illawarra", "real estate Wollongong", "homes for sale Kiama", "property for sale Shellharbour", "Illawarra real estate listings"],
  alternates: { canonical: "https://www.spinellirealestate.com.au/buy" },
  openGraph: { title: "Properties For Sale | Illawarra", description: "Houses, apartments and land for sale in Wollongong, Kiama and Shellharbour.", url: "https://www.spinellirealestate.com.au/buy" },
};

export const revalidate = 60; // refresh every 5 minutes

export default async function BuyPage() {
  let properties: typeof residentialSaleProperties = [];
  try {
    const data = await fetchForSale(1, 100);
    if (data.listings?.length) {
      properties = data.listings
        .filter(l => ["Residential", "Land"].includes(l.property.type))
        .sort((a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime())
        .map(mapListing);
    }
  } catch (e) {
    console.error("AgentBox fetch failed:", e);
  }

  return (
    <>
      {/* ── Listings ── */}
      <ResidentialListings properties={properties} />


      {/* ── Buyer registration CTA ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D3348" }}>
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&h=500&fit=crop&q=60"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%", opacity: 0.1 }}
        />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="label-tag-light">Off-Market Access</span>
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
              <p
                className="mb-8"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.75,
                  maxWidth: "42ch",
                }}
              >
                Register your wish list and we&apos;ll match you with properties the moment they come to market — including off-market opportunities not advertised publicly.
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
                  style={{
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "rgba(255,255,255,0.8)",
                    fontFamily: "var(--font-sans)",
                  }}
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
