"use client";
import { useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/lib/types";

export default function ResidentialListings({ properties }: { properties: Property[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section style={{ backgroundColor: "#ffffff", paddingTop: "140px", paddingBottom: "60px" }}>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div
          className="pb-8 mb-8"
          style={{ borderBottom: "1px solid #E8E5DF" }}
        >
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
      </div>

      {/* Grid */}
      {properties.length > 0 ? (
        <div
          className="property-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-5 sm:px-8"
          style={{ gap: "40px" }}
        >
          {properties.map((p) => (
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
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.02em" }}>
            No properties currently listed.
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#a2b0aa", marginTop: "10px" }}>
            Check back soon or get in touch to hear about upcoming listings.
          </p>
        </div>
      )}
    </section>
  );
}
