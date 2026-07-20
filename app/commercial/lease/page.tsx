import type { Metadata } from "next";
import CommercialListings from "@/components/CommercialListings";
import Link from "next/link";
import { fetchCommercialLease, mapListing } from "@/lib/agentbox";
import { commercialProperties } from "@/lib/data";
import type { Property } from "@/lib/types";

export const metadata: Metadata = {
  title: "Commercial Property For Lease | Spinelli Real Estate",
  description:
    "Commercial property for lease across the Illawarra — retail, office, industrial and specialty spaces. Spinelli Real Estate.",
};

export const revalidate = 300;

export default async function CommercialLeasePage() {
  let properties: Property[] = commercialProperties.filter(p => p.type === "commercial-lease");
  try {
    const data = await fetchCommercialLease();
    const live = (data.listings ?? [])
      .filter(l => l.property.type === "Commercial")
      .sort((a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime())
      .map(mapListing);
    if (live.length) properties = live;
  } catch (e) {
    console.error("AgentBox commercial lease fetch failed:", e);
  }

  return (
    <>
      <CommercialListings properties={properties} heading="Commercial For Lease" />

      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D3348" }}>
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&h=500&fit=crop&q=60"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%", opacity: 0.1 }}
        />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="label-tag-light">Commercial Leasing</span>
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
                Let&apos;s Talk<br />Commercial Leasing
              </h2>
            </div>
            <div>
              <p className="mb-8" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "42ch" }}>
                Whether you&apos;re looking for office, retail or industrial space in the Illawarra, our commercial team will find the right fit for your business.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact?type=commercial"
                  className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
                >
                  Make an Enquiry
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
