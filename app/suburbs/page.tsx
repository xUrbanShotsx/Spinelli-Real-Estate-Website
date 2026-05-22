import type { Metadata } from "next";
import Link from "next/link";
import SuburbListings from "@/components/SuburbListings";
import { suburbs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Illawarra Suburb Guides | Property Market Data",
  description:
    "Explore every Illawarra suburb — median prices, annual growth, days on market, schools, lifestyle highlights and more.",
};

export default function SuburbsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex items-end" style={{ minHeight: "80vh" }}>
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&h=1000&fit=crop&q=85"
          alt="Illawarra coastline"
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.0) 100%)" }}
        />

        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pb-20">
          <span className="label-tag-light block mb-5">Suburb Guides</span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
              color: "#ffffff",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              marginBottom: "1.5rem",
            }}
          >
            Explore the<br />Illawarra
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
              maxWidth: "44ch",
              marginBottom: "2.5rem",
            }}
          >
            Live market data, lifestyle insights and local knowledge for every key suburb across the Illawarra.
          </p>

          {/* Inline stats */}
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {[
              { v: `${suburbs.length}`, l: "Suburbs Covered" },
              { v: "$1.18M", l: "Illawarra Median" },
              { v: "+8.2%", l: "Annual Growth" },
              { v: "28d", l: "Avg Days on Market" },
            ].map((s) => (
              <div key={s.l}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {s.v}
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "4px" }}>
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Listings ── */}
      <SuburbListings suburbs={suburbs} />

      {/* ── CTA ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D3348" }}>
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&h=500&fit=crop&q=60"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%", opacity: 0.08 }}
        />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="label-tag-light">Free Appraisal</span>
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
                What&apos;s Your<br />Property Worth?
              </h2>
            </div>
            <div>
              <p className="mb-8" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "42ch" }}>
                Get a confidential, obligation-free appraisal from our local market experts and find out exactly what your property could achieve today.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact?type=appraisal"
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
