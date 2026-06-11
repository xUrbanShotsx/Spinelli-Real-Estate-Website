import Link from "next/link";
import type { TeamMember } from "@/lib/types";

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export default function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <section style={{ backgroundColor: "#ffffff", paddingTop: "120px", paddingBottom: "80px" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div
          className="flex flex-wrap items-end justify-between gap-4 pb-8 mb-8"
          style={{ borderBottom: "1px solid #E8E5DF" }}
        >
          <div>
            <span className="label-tag">Our People</span>
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
              Meet the Team
            </h2>
          </div>
        </div>

        {/* 3-column grid — CSS hover group */}
        <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "40px" }}>
          {members.map((m, i) => (
            <Link
              key={m.name}
              href={`/team/${toSlug(m.name)}`}
              className="team-card relative overflow-hidden block"
              style={{ height: "480px", backgroundColor: "#E8F6FC" }}
            >
              {/* Photo — eager for first 6 (all visible above fold on any screen) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.image}
                alt={m.name}
                loading={i < 6 ? "eager" : "lazy"}
                // @ts-expect-error fetchpriority is valid HTML but not yet in TS types
                fetchpriority={i < 3 ? "high" : "auto"}
                decoding="sync"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                }}
              />

              {/* Dark gradient */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.0) 100%)" }}
              />

              {/* Role badge */}
              <div className="absolute top-0 right-0">
                <span style={{
                  display: "block",
                  backgroundColor: "#5BC2E7",
                  color: "#ffffff",
                  fontFamily: "var(--font-sans)",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  padding: "6px 12px",
                  textTransform: "uppercase",
                }}>
                  {m.role}
                </span>
              </div>

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-5">
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", fontWeight: 500, color: "#ffffff", lineHeight: 1.3, marginBottom: "4px" }}>
                  {m.name}
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "2px" }}>
                  {m.phone}
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                  {m.email}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CSS-only hover: dim siblings when one card is hovered */}
      <style>{`
        .team-grid:has(.team-card:hover) .team-card:not(:hover) {
          opacity: 0.45;
          filter: blur(3px);
          transition: opacity 0.3s ease, filter 0.3s ease;
        }
        .team-grid .team-card {
          transition: opacity 0.3s ease, filter 0.3s ease;
        }
      `}</style>
    </section>
  );
}
