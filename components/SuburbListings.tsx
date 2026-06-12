"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { Suburb } from "@/lib/types";


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
      <div
        style={{
          position: "relative",
          aspectRatio: "3/2",
          backgroundColor: "#ffffff",
          border: "1px solid #5BC2E7",
          overflow: "hidden",
          opacity: blurred ? 0.45 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Watermark suburb name */}
        <p
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-10px",
            right: "-12px",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 8vw, 6rem)",
            fontWeight: 300,
            color: "rgba(91,194,231,0.08)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            whiteSpace: "nowrap",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {suburb.name}
        </p>

        {/* Blue accent bar top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", backgroundColor: "#5BC2E7" }} />

        {/* Arrow on hover */}
        <div style={{ position: "absolute", top: "20px", right: "20px", opacity: 0, transition: "opacity 0.2s ease" }} className="group-hover:opacity-100">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5BC2E7" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>

        {/* Bottom content */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px" }}>
          {/* Stats row */}
          <div className="flex items-end justify-between mb-3">
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>Median Price</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.02em" }}>{suburb.medianHouse}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>Annual Growth</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "#5BC2E7", fontWeight: 300, letterSpacing: "-0.02em" }}>{suburb.annualGrowth}</p>
            </div>
          </div>

        </div>

        {/* Suburb name + DOM — blue bar */}
        <div className="flex items-center justify-between" style={{ backgroundColor: "#5BC2E7", padding: "14px 20px" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            {suburb.name}
          </h3>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "9px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "2px" }}>Avg DOM</p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#ffffff", fontWeight: 500 }}>{suburb.daysOnMarket}d</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function SuburbListings({ suburbs }: { suburbs: Suburb[] }) {
  const [search, setSearch] = useState("");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const filtered = suburbs.filter((s) =>
    !search || s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section style={{ backgroundColor: "#ffffff", paddingTop: "120px", paddingBottom: "60px" }}>

      {/* Header + search */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 pb-8 mb-8"
          style={{ borderBottom: "1px solid #E8E5DF" }}>
          <div>
            <span className="label-tag">Suburb Guides</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Explore the Illawarra
            </h2>
          </div>

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
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-5 sm:px-8"
          style={{ gap: "40px" }}>
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
            Try a different name or{" "}
            <button onClick={() => setSearch("")} style={{ color: "#5BC2E7", textDecoration: "underline" }}>clear search</button>.
          </p>
        </div>
      )}
    </section>
  );
}
