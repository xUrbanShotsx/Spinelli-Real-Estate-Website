"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { Suburb } from "@/lib/types";

const DEMAND_OPTIONS = ["All Suburbs", "Very High", "High", "Moderate"];

function Dropdown({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
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
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          style={{ width: "10px", height: "10px", flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 min-w-full"
          style={{ backgroundColor: "#ffffff", border: "1px solid #DAD7CE", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
          {options.map((opt) => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false); }}
              className="block w-full text-left px-4 py-2.5 text-[12px] transition-colors hover:bg-[#FBF9F3]"
              style={{ fontFamily: "var(--font-sans)", color: opt === value ? "#000000" : "#7a7265", fontWeight: opt === value ? 500 : 400, letterSpacing: "0.02em", borderBottom: "1px solid #F0EDE7" }}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SuburbCard({ suburb, blurred }: { suburb: Suburb; blurred: boolean }) {
  return (
    <Link href={`/suburbs/${suburb.slug}`} className="block group">
      {/* Image */}
      <div className="overflow-hidden" style={{ position: "relative", height: "240px" }}>
        <img
          src={suburb.image}
          alt={suburb.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          style={{
            filter: blurred ? "blur(4px)" : "none",
            opacity: blurred ? 0.5 : 1,
            transition: "filter 0.3s ease, opacity 0.3s ease",
          }}
        />
        {/* Demand badge */}
        <div className="absolute top-3 left-3">
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              backgroundColor: "#5BC2E7",
              color: "#ffffff",
              padding: "3px 8px",
            }}
          >
            {suburb.demandLevel} Demand
          </span>
        </div>
      </div>

      {/* Text below */}
      <div className="pt-4 pb-2">
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.35rem",
            color: "#000000",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "10px",
          }}
        >
          {suburb.name}
        </h3>

        {/* Stats row */}
        <div className="flex items-center gap-5">
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000", fontWeight: 500 }}>
              {suburb.medianHouse}
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: "2px" }}>
              Median
            </p>
          </div>
          <div style={{ width: "1px", height: "28px", backgroundColor: "#E8E5DF" }} />
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#5BC2E7", fontWeight: 500 }}>
              {suburb.annualGrowth}
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: "2px" }}>
              Growth
            </p>
          </div>
          <div style={{ width: "1px", height: "28px", backgroundColor: "#E8E5DF" }} />
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000", fontWeight: 500 }}>
              {suburb.daysOnMarket}d
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: "2px" }}>
              Avg DOM
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function SuburbListings({ suburbs }: { suburbs: Suburb[] }) {
  const [demand, setDemand] = useState("All Suburbs");
  const [search, setSearch] = useState("");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const filtered = suburbs.filter((s) => {
    if (demand !== "All Suburbs" && s.demandLevel !== demand) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const hasFilters = demand !== "All Suburbs" || search !== "";
  const clearAll = () => { setDemand("All Suburbs"); setSearch(""); };

  return (
    <section style={{ backgroundColor: "#ffffff", paddingTop: "60px", paddingBottom: "60px" }}>

      {/* Header + filters */}
      <div style={{ paddingLeft: "40px", paddingRight: "40px" }}>
        <div className="flex flex-wrap items-end justify-between gap-4 pb-8 mb-8"
          style={{ borderBottom: "1px solid #E8E5DF" }}>
          <div>
            <span className="label-tag">Suburb Guides</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Explore the Illawarra
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search suburb..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 text-[12px] outline-none"
                style={{
                  fontFamily: "var(--font-sans)",
                  border: search ? "1px solid #000000" : "1px solid #DAD7CE",
                  backgroundColor: search ? "#000000" : "transparent",
                  color: search ? "#ffffff" : "#7a7265",
                  letterSpacing: "0.04em",
                  width: "160px",
                }}
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#ffffff" }}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: "10px", height: "10px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <Dropdown label="Demand Level" value={demand} options={DEMAND_OPTIONS} onChange={setDemand} />

            {hasFilters && (
              <button onClick={clearAll}
                className="flex items-center gap-1.5 px-3 py-2 text-[11px] tracking-wide transition-opacity hover:opacity-60"
                style={{ fontFamily: "var(--font-sans)", color: "#a2b0aa", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: "10px", height: "10px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "40px", paddingLeft: "40px", paddingRight: "40px" }}>
          {filtered.map((s) => (
            <div key={s.slug}
              onMouseEnter={() => setHoveredSlug(s.slug)}
              onMouseLeave={() => setHoveredSlug(null)}>
              <SuburbCard suburb={s} blurred={!!hoveredSlug && hoveredSlug !== s.slug} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "10px" }}>
            No suburbs match your search
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#a2b0aa" }}>
            Try adjusting your filters or{" "}
            <button onClick={clearAll} style={{ color: "#5BC2E7", textDecoration: "underline" }}>clear all</button>.
          </p>
        </div>
      )}
    </section>
  );
}
