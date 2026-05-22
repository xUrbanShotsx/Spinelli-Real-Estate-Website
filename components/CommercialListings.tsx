"use client";
import { useState, useRef, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/lib/types";

const LISTING_TYPES = ["All", "For Sale", "For Lease"];
const PROPERTY_TYPES = ["All Types", "Retail", "Industrial", "Office", "Medical", "Development"];

function Dropdown({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const isActive = value !== options[0];
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-4 py-2 text-[12px] tracking-wide transition-all"
        style={{ fontFamily: "var(--font-sans)", backgroundColor: isActive ? "#000000" : "transparent", color: isActive ? "#ffffff" : "#7a7265", border: isActive ? "1px solid #000000" : "1px solid #DAD7CE", letterSpacing: "0.04em", whiteSpace: "nowrap" }}
      >
        {isActive ? value : label}
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: "10px", height: "10px", flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 min-w-full" style={{ backgroundColor: "#ffffff", border: "1px solid #DAD7CE", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
          {options.map((opt) => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false); }} className="block w-full text-left px-4 py-2.5 text-[12px] transition-colors hover:bg-[#FBF9F3]" style={{ fontFamily: "var(--font-sans)", color: opt === value ? "#000000" : "#7a7265", fontWeight: opt === value ? 500 : 400, letterSpacing: "0.02em", borderBottom: "1px solid #F0EDE7" }}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommercialListings({ properties }: { properties: Property[] }) {
  const [listingType, setListingType] = useState("All");
  const [propType, setPropType] = useState("All Types");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = properties.filter((p) => {
    if (listingType === "For Sale" && p.type !== "commercial-sale") return false;
    if (listingType === "For Lease" && p.type !== "commercial-lease") return false;
    if (propType !== "All Types") {
      const titleMatch = p.title.toLowerCase().includes(propType.toLowerCase());
      const descMatch = p.description?.toLowerCase().includes(propType.toLowerCase());
      if (!titleMatch && !descMatch) return false;
    }
    return true;
  });

  const hasFilters = listingType !== "All" || propType !== "All Types";
  const clearAll = () => { setListingType("All"); setPropType("All Types"); };

  return (
    <section style={{ backgroundColor: "#ffffff", paddingTop: "60px", paddingBottom: "60px" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 pb-8 mb-8" style={{ borderBottom: "1px solid #E8E5DF" }}>
          <div>
            <span className="label-tag">Current Listings</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Commercial Property
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Dropdown label="Listing Type" value={listingType} options={LISTING_TYPES} onChange={setListingType} />
            <Dropdown label="Property Type" value={propType} options={PROPERTY_TYPES} onChange={setPropType} />
            {hasFilters && (
              <button onClick={clearAll} className="flex items-center gap-1.5 px-3 py-2 text-[11px] tracking-wide transition-opacity hover:opacity-60" style={{ fontFamily: "var(--font-sans)", color: "#a2b0aa", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: "10px", height: "10px" }}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                Clear
              </button>
            )}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="property-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "40px" }}>
            {filtered.map((p) => (
              <div key={p.id} onMouseEnter={() => setHoveredId(p.id)} onMouseLeave={() => setHoveredId(null)}>
                <PropertyCard property={p} compact blurred={!!hoveredId && hoveredId !== p.id} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "10px" }}>No properties match your search</p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#a2b0aa" }}>
              Try adjusting your filters or <button onClick={clearAll} style={{ color: "#5BC2E7", textDecoration: "underline" }}>clear all</button>.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
