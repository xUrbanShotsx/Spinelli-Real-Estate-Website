"use client";
import { useState, useRef, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/lib/types";

const SUBURBS = ["All Suburbs", "Wollongong", "Kiama", "Thirroul", "Shellharbour", "Gerringong", "Austinmer"];

const PRICE_RANGES = [
  { label: "Any Price",       min: 0,         max: Infinity },
  { label: "Under $800K",     min: 0,         max: 800000   },
  { label: "$800K – $1M",     min: 800000,    max: 1000000  },
  { label: "$1M – $1.25M",    min: 1000000,   max: 1250000  },
  { label: "$1.25M – $1.5M",  min: 1250000,   max: 1500000  },
  { label: "$1.5M – $2M",     min: 1500000,   max: 2000000  },
  { label: "$2M+",            min: 2000000,   max: Infinity },
];

const BED_OPTIONS = ["Any Beds", "1+", "2+", "3+", "4+", "5+"];

/** Strip non-numeric chars and return a number, or null if unparseable */
function parsePrice(raw: string): number | null {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  const n = parseFloat(cleaned);
  return isNaN(n) ? null : n;
}

function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = value !== options[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-4 py-2 text-[12px] tracking-wide transition-all"
        style={{
          fontFamily: "var(--font-sans)",
          backgroundColor: isActive ? "#000000" : "transparent",
          color: isActive ? "#ffffff" : "#7a7265",
          border: isActive ? "1px solid #000000" : "1px solid #DAD7CE",
          letterSpacing: "0.04em",
          whiteSpace: "nowrap",
        }}
      >
        {isActive ? value : label}
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          style={{
            width: "10px",
            height: "10px",
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1 z-50 min-w-full"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #DAD7CE",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className="block w-full text-left px-4 py-2.5 text-[12px] transition-colors hover:bg-[#FBF9F3]"
              style={{
                fontFamily: "var(--font-sans)",
                color: opt === value ? "#000000" : "#7a7265",
                fontWeight: opt === value ? 500 : 400,
                letterSpacing: "0.02em",
                borderBottom: "1px solid #F0EDE7",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ResidentialListings({ properties }: { properties: Property[] }) {
  const [suburb, setSuburb] = useState("All Suburbs");
  const [priceLabel, setPriceLabel] = useState("Any Price");
  const [beds, setBeds] = useState("Any Beds");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const priceRange = PRICE_RANGES.find((r) => r.label === priceLabel) ?? PRICE_RANGES[0];
  const minBeds = beds === "Any Beds" ? 0 : parseInt(beds);

  const filtered = properties.filter((p) => {
    // Suburb
    if (suburb !== "All Suburbs" && p.suburb !== suburb) return false;

    // Beds
    if (minBeds > 0 && (p.beds === undefined || p.beds < minBeds)) return false;

    // Price
    const num = parsePrice(p.price);
    if (num !== null) {
      if (num < priceRange.min || num > priceRange.max) return false;
    }

    return true;
  });

  const hasFilters = suburb !== "All Suburbs" || priceLabel !== "Any Price" || beds !== "Any Beds";

  const clearAll = () => {
    setSuburb("All Suburbs");
    setPriceLabel("Any Price");
    setBeds("Any Beds");
  };

  return (
    <section style={{ backgroundColor: "#ffffff", paddingTop: "60px", paddingBottom: "60px" }}>

      {/* Header + filters — same horizontal padding as the grid */}
      <div style={{ paddingLeft: "40px", paddingRight: "40px", maxWidth: "100%" }}>
        <div
          className="flex flex-wrap items-end justify-between gap-4 pb-8 mb-8"
          style={{ borderBottom: "1px solid #E8E5DF" }}
        >
          {/* Title — left */}
          <div>
            <span className="label-tag">Current Listings</span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                color: "#000000",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Homes For Sale
            </h2>
          </div>

          {/* Filters — right, aligned to bottom of title */}
          <div className="flex flex-wrap items-center gap-2">
            <Dropdown label="Suburb"      value={suburb}      options={SUBURBS}                          onChange={setSuburb}      />
            <Dropdown label="Price Range" value={priceLabel}  options={PRICE_RANGES.map((r) => r.label)} onChange={setPriceLabel}  />
            <Dropdown label="Bedrooms"    value={beds}        options={BED_OPTIONS}                      onChange={setBeds}        />

            {hasFilters && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 px-3 py-2 text-[11px] tracking-wide transition-opacity hover:opacity-60"
                style={{ fontFamily: "var(--font-sans)", color: "#a2b0aa", letterSpacing: "0.06em", textTransform: "uppercase" }}
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: "10px", height: "10px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Full-width grid */}
      {filtered.length > 0 ? (
        <div
          className="property-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "40px", paddingLeft: "40px", paddingRight: "40px" }}
        >
          {filtered.map((p) => (
            <div
              key={p.id}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <PropertyCard
                property={p}
                compact
                blurred={!!hoveredId && hoveredId !== p.id}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center max-w-7xl mx-auto px-6">
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "10px" }}>
            No properties match your search
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#a2b0aa", marginBottom: "20px" }}>
            Try adjusting your filters or{" "}
            <button onClick={clearAll} style={{ color: "#5BC2E7", textDecoration: "underline" }}>clear all</button>{" "}
            to see all listings.
          </p>
        </div>
      )}
    </section>
  );
}
