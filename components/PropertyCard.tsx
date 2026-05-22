import Link from "next/link";
import type { Property } from "@/lib/types";

export default function PropertyCard({
  property,
  compact,
  blurred,
  overlay,
}: {
  property: Property;
  compact?: boolean;
  blurred?: boolean;
  overlay?: boolean;
}) {
  // Build stats string like "3 BED — 2 BATH — 2 CAR"
  const stats: string[] = [];
  if (property.beds !== undefined) stats.push(`${property.beds} BED`);
  if (property.baths !== undefined) stats.push(`${property.baths} BATH`);
  if (property.cars !== undefined) stats.push(`${property.cars} CAR`);

  // Shorten open home to "OPEN SAT 24 MAY" format
  const openHomeShort = property.openHome
    ? "OPEN " + property.openHome.replace(/,.*$/, "").toUpperCase()
    : null;

  /* ── Overlay style (homepage) ── */
  if (overlay) {
    return (
      <Link
        href={`/property/${property.id}`}
        className="property-card group block relative overflow-hidden"
        style={{ height: compact ? "340px" : "520px" }}
      >
        <img
          src={property.image}
          alt={property.title}
          className="absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ width: "100%", height: "100%" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.0) 100%)" }}
        />
        {property.openHome && (
          <div className="absolute top-4 left-4">
            <span
              className="px-2.5 py-1 text-[11px] font-medium tracking-wide"
              style={{ backgroundColor: "#5BC2E7", color: "#ffffff" }}
            >
              Open {property.openHome}
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-5">
          <p className="text-white text-[15px] font-medium leading-snug mb-3" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>
            {property.address}
          </p>
          <div className="flex items-center gap-4">
            {property.beds !== undefined && (
              <span className="flex items-center gap-1.5 text-[13px] text-white/90">
                <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9-4 9 4" />
                </svg>
                {property.beds}
              </span>
            )}
            {property.baths !== undefined && (
              <span className="flex items-center gap-1.5 text-[13px] text-white/90">
                <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M4 12V8a2 2 0 012-2h12a2 2 0 012 2v4M4 12v4a2 2 0 002 2h12a2 2 0 002-2v-4" />
                </svg>
                {property.baths}
              </span>
            )}
            {property.cars !== undefined && (
              <span className="flex items-center gap-1.5 text-[13px] text-white/90">
                <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H4a1 1 0 01-1-1v-5l2-5h14l2 5v5a1 1 0 01-1 1h-4" />
                </svg>
                {property.cars}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  /* ── Below style (listings page) ── */
  return (
    <Link
      href={`/property/${property.id}`}
      className="property-card group block"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ height: compact ? "260px" : "340px" }}
      >
        <img
          src={property.image}
          alt={property.title}
          className="absolute inset-0 object-cover"
          style={{
            width: "100%",
            height: "100%",
            filter: blurred ? "blur(4px)" : "none",
            opacity: blurred ? 0.5 : 1,
            transition: "filter 0.3s ease, opacity 0.3s ease",
          }}
        />

        {/* Open Home badge */}
        {openHomeShort && (
          <div className="absolute top-0 left-0">
            <span
              style={{
                display: "block",
                backgroundColor: "#0D3348",
                color: "#ffffff",
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                padding: "6px 12px",
              }}
            >
              {openHomeShort}
            </span>
          </div>
        )}

        {/* Tag badge (top-right) */}
        {property.tag && (
          <div className="absolute top-0 right-0">
            <span
              style={{
                display: "block",
                backgroundColor: "#5BC2E7",
                color: "#ffffff",
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                padding: "6px 12px",
              }}
            >
              {property.tag.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Text below image */}
      <div style={{ paddingTop: "12px", paddingBottom: "4px" }}>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            color: "#000000",
            fontWeight: 400,
            lineHeight: 1.35,
            marginBottom: "6px",
          }}
        >
          {property.address}
          {property.suburb ? `, ${property.suburb} NSW` : ""}
        </p>

        {stats.length > 0 && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              color: "#a2b0aa",
              letterSpacing: "0.1em",
              fontWeight: 400,
            }}
          >
            {stats.join(" — ")}
          </p>
        )}

        {property.price && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              color: "#58503c",
              fontWeight: 500,
              marginTop: "6px",
            }}
          >
            {property.price}
          </p>
        )}
      </div>
    </Link>
  );
}
