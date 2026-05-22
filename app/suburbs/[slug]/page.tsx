import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { suburbs } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return suburbs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const suburb = suburbs.find((s) => s.slug === slug);
  if (!suburb) return {};
  return {
    title: `${suburb.name} Real Estate | Suburb Guide & Market Data`,
    description: `${suburb.name} property market — median house ${suburb.medianHouse}, annual growth ${suburb.annualGrowth}. ${suburb.description} Spinelli Real Estate.`,
  };
}

const demandBadge: Record<string, { bg: string; text: string }> = {
  "Very High": { bg: "#5BC2E7", text: "#ffffff" },
  High: { bg: "#5BC2E7", text: "#5BC2E7" },
  Moderate: { bg: "#58503c", text: "#ffffff" },
};

export default async function SuburbPage({ params }: Props) {
  const { slug } = await params;
  const suburb = suburbs.find((s) => s.slug === slug);
  if (!suburb) notFound();

  const db = demandBadge[suburb.demandLevel] ?? demandBadge["Very High"];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ height: "52vh", minHeight: "380px" }}>
        <img src={suburb.image} alt={suburb.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,51,72,0.85) 30%, rgba(13,51,72,0.2) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 pb-10">
          <Link href="/suburbs" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-5 hover:opacity-70 transition-opacity" style={{ color: "rgba(255,255,255,0.55)" }}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Suburbs
          </Link>
          <div className="flex flex-wrap items-end gap-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white" style={{  }}>
              {suburb.name}
            </h1>
            <span className="px-3 py-1.5 rounded text-xs font-bold mb-1" style={{ backgroundColor: db.bg, color: db.text }}>
              {suburb.demandLevel} Demand
            </span>
          </div>
          <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.5)" }}>
            {suburb.lga} · {suburb.distanceFromSydney} from Sydney · Pop. {suburb.population}
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ backgroundColor: "#5BC2E7" }} className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {[
            { l: "Median House", v: suburb.medianHouse },
            { l: "Median Unit", v: suburb.medianUnit },
            { l: "Median Rent", v: suburb.medianRent },
            { l: "Annual Growth", v: suburb.annualGrowth },
            { l: "Days on Market", v: `${suburb.daysOnMarket}d` },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-bold text-white text-lg" style={{  }}>{s.v}</p>
              <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: "#5BC2E7" }}>About {suburb.name}</h2>
                <p className="text-base leading-relaxed" style={{ color: "#7a7265", maxWidth: "65ch" }}>{suburb.longDescription}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-5" style={{ color: "#5BC2E7" }}>Suburb Highlights</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {suburb.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "#ede9df" }}>
                        <svg className="w-3 h-3" style={{ color: "#2da8d0" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm" style={{ color: "#58503c" }}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4" style={{ color: "#5BC2E7" }}>Schools</h3>
                <div className="flex flex-wrap gap-2">
                  {suburb.schools.map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-full text-sm border" style={{ borderColor: "#dad7ce", color: "#58503c", backgroundColor: "#f5f3ed" }}>{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4" style={{ color: "#5BC2E7" }}>Local Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {suburb.amenities.map((a) => (
                    <span key={a} className="px-3 py-1.5 rounded-full text-sm border" style={{ borderColor: "#dad7ce", color: "#58503c", backgroundColor: "#f5f3ed" }}>{a}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Market data */}
              <div className="bg-white rounded-2xl border p-6" style={{ borderColor: "#dad7ce" }}>
                <h3 className="font-bold text-lg mb-5" style={{ color: "#5BC2E7",  }}>Market Snapshot</h3>
                <div className="space-y-0 divide-y" style={{ borderColor: "#e8e5df" }}>
                  {[
                    { l: "Median House Price", v: suburb.medianHouse },
                    { l: "Median Unit Price", v: suburb.medianUnit },
                    { l: "Median Rent", v: suburb.medianRent },
                    { l: "Annual Capital Growth", v: suburb.annualGrowth },
                    { l: "Avg. Days on Market", v: `${suburb.daysOnMarket} days` },
                    { l: "Population", v: suburb.population },
                    { l: "Distance from Sydney", v: suburb.distanceFromSydney },
                  ].map((item) => (
                    <div key={item.l} className="flex justify-between items-center py-3">
                      <span className="text-sm" style={{ color: "#7a7265" }}>{item.l}</span>
                      <span className="text-sm font-semibold" style={{ color: "#5BC2E7" }}>{item.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: "#5BC2E7" }}>
                <h3 className="font-bold text-base text-white mb-2">Interested in {suburb.name}?</h3>
                <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Speak with our local experts about buying, selling or renting here.
                </p>
                <Link href={`/contact?suburb=${suburb.slug}`} style={{ backgroundColor: "#5BC2E7", color: "#5BC2E7" }} className="block text-center py-2.5 rounded font-semibold text-sm hover:opacity-90 transition-opacity mb-2.5">
                  Make an Enquiry
                </Link>
                <Link href={`/contact?type=appraisal&suburb=${suburb.slug}`} className="block text-center py-2.5 rounded font-semibold text-sm transition-colors" style={{ color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  Free Appraisal
                </Link>
              </div>

              {/* Nearby */}
              <div className="rounded-2xl p-5 border" style={{ backgroundColor: "#fbf9f3", borderColor: "#dad7ce" }}>
                <h3 className="font-bold text-sm mb-4" style={{ color: "#5BC2E7" }}>Nearby Suburbs</h3>
                <div className="space-y-0 divide-y" style={{ borderColor: "#e8e5df" }}>
                  {suburbs.filter((s) => s.slug !== suburb.slug).slice(0, 5).map((s) => (
                    <Link key={s.slug} href={`/suburbs/${s.slug}`} className="flex justify-between items-center py-2.5 hover:opacity-70 transition-opacity">
                      <span className="text-sm font-medium" style={{ color: "#5BC2E7" }}>{s.name}</span>
                      <span className="text-xs" style={{ color: "#7a7265" }}>{s.medianHouse}</span>
                    </Link>
                  ))}
                </div>
                <Link href="/suburbs" className="text-xs font-semibold mt-3 block" style={{ color: "#2da8d0" }}>
                  View All Suburbs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
