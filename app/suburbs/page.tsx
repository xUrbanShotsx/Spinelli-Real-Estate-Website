import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SuburbCard from "@/components/SuburbCard";
import { suburbs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Illawarra Suburb Guides | Property Market Data",
  description:
    "Explore every Illawarra suburb — median prices, annual growth, days on market, schools, lifestyle highlights and more.",
};

const veryHigh = suburbs.filter((s) => s.demandLevel === "Very High");
const high = suburbs.filter((s) => s.demandLevel === "High");
const moderate = suburbs.filter((s) => s.demandLevel === "Moderate");

export default function SuburbsPage() {
  return (
    <>
      <PageHero
        badge="Illawarra Suburb Guides"
        title="Explore the Illawarra"
        subtitle="Comprehensive suburb profiles with market data, lifestyle insights and local knowledge for every key Illawarra suburb."
      />

      {/* Overview stats */}
      <section style={{ backgroundColor: "#fbf9f3", borderBottom: "1px solid #dad7ce" }} className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: "15", l: "Suburbs Covered" },
            { v: "$1.05M", l: "Illawarra Median House" },
            { v: "+7.2%", l: "Avg. Annual Growth" },
            { v: "22 Days", l: "Avg. Days on Market" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-2xl font-bold" style={{ color: "#5BC2E7",  }}>{s.v}</p>
              <p className="text-xs mt-1" style={{ color: "#7a7265" }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Very High */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end gap-4 mb-10">
            <div>
              <span className="inline-block px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded text-white mb-3" style={{ backgroundColor: "#5BC2E7" }}>
                Very High Demand
              </span>
              <h2 className="text-3xl font-bold" style={{ color: "#5BC2E7" }}>Premium Coastal Markets</h2>
              <p className="text-sm mt-1.5" style={{ color: "#7a7265" }}>The most sought-after suburbs — fast-moving, tightly-held and high-growth.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {veryHigh.map((s) => <SuburbCard key={s.slug} suburb={s} />)}
          </div>
        </div>
      </section>

      {/* High */}
      <section className="py-20" style={{ backgroundColor: "#fbf9f3" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <span className="inline-block px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded mb-3" style={{ backgroundColor: "#5BC2E7", color: "#5BC2E7" }}>
              High Demand
            </span>
            <h2 className="text-3xl font-bold" style={{ color: "#5BC2E7" }}>Strong Growth Suburbs</h2>
            <p className="text-sm mt-1.5" style={{ color: "#7a7265" }}>Well-established, popular suburbs delivering consistent capital growth and strong rental yields.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {high.map((s) => <SuburbCard key={s.slug} suburb={s} />)}
          </div>
        </div>
      </section>

      {/* Moderate */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <span className="inline-block px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded mb-3" style={{ backgroundColor: "#58503c", color: "#ffffff" }}>
              Moderate Demand
            </span>
            <h2 className="text-3xl font-bold" style={{ color: "#5BC2E7" }}>Emerging & Lifestyle Markets</h2>
            <p className="text-sm mt-1.5" style={{ color: "#7a7265" }}>Excellent value and lifestyle options with great long-term growth potential.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {moderate.map((s) => <SuburbCard key={s.slug} suburb={s} />)}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#5BC2E7" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">What&apos;s Your Property Worth?</h2>
          <p className="text-sm mb-7" style={{ color: "rgba(255,255,255,0.55)" }}>Get a free, no-obligation appraisal from our local market experts.</p>
          <a href="/contact?type=appraisal" className="inline-block px-7 py-3 rounded font-semibold text-sm hover:opacity-90 transition-opacity" style={{ backgroundColor: "#5BC2E7", color: "#5BC2E7" }}>
            Request a Free Appraisal
          </a>
        </div>
      </section>
    </>
  );
}
