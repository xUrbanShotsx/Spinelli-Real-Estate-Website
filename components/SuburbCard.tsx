import Link from "next/link";
import type { Suburb } from "@/lib/types";

const demandColors: Record<string, { label: string; bg: string; text: string }> = {
  "Very High": { label: "Very High Demand", bg: "#5BC2E7", text: "#FBF9F3" },
  High: { label: "High Demand", bg: "#3aafdb", text: "#FBF9F3" },
  Moderate: { label: "Moderate Demand", bg: "#3aafdb", text: "rgba(251,249,243,0.9)" },
};

export default function SuburbCard({ suburb }: { suburb: Suburb }) {
  const dc = demandColors[suburb.demandLevel] ?? demandColors["Very High"];
  return (
    <Link href={`/suburbs/${suburb.slug}`} className="group block">
      <div className="overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 h-full flex flex-col" style={{ borderColor: "#DAD7CE", backgroundColor: "#FBF9F3" }}>
        <div className="relative overflow-hidden" style={{ height: "190px" }}>
          <img src={suburb.image} alt={suburb.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,51,72,0.75) 35%, transparent 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl text-white" style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>{suburb.name}</h3>
            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium tracking-wide" style={{ backgroundColor: dc.bg, color: dc.text }}>
              {dc.label}
            </span>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-3 flex-1">
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "#7a7265" }}>{suburb.description}</p>
          <div className="grid grid-cols-3 gap-2 pt-3 border-t" style={{ borderColor: "#e8e5df" }}>
            {[
              { v: suburb.medianHouse, l: "Median" },
              { v: suburb.annualGrowth, l: "Growth" },
              { v: `${suburb.daysOnMarket}d`, l: "DOM" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-sm font-bold" style={{ color: "#5BC2E7" }}>{s.v}</p>
                <p className="text-[10px] font-medium tracking-wide uppercase mt-0.5" style={{ color: "#7a7265" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
