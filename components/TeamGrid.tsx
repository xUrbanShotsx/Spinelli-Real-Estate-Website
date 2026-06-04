"use client";
import { useState } from "react";
import type { TeamMember } from "@/lib/types";

function TeamCard({ member, blurred }: { member: TeamMember; blurred: boolean }) {
  return (
    <div className="group block" style={{ backgroundColor: "#ffffff" }}>
      {/* Image — same fixed height as property cards */}
      <div className="relative overflow-hidden" style={{ height: "340px" }}>
        <img
          src={member.image}
          alt={member.name}
          className="absolute inset-0 object-cover object-top"
          style={{
            width: "100%",
            height: "100%",
            filter: blurred ? "blur(4px)" : "none",
            opacity: blurred ? 0.5 : 1,
            transition: "filter 0.3s ease, opacity 0.3s ease",
          }}
        />
        {/* Role badge — top right, matching tag badge style */}
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
              textTransform: "uppercase",
            }}
          >
            {member.role}
          </span>
        </div>
      </div>

      {/* Text below — matching property card text style */}
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
          {member.name}
        </p>
        <a
          href={`tel:${member.phone.replace(/\s/g, "")}`}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            color: "#a2b0aa",
            letterSpacing: "0.1em",
            display: "block",
          }}
          className="transition-opacity hover:opacity-60"
        >
          {member.phone}
        </a>
        <a
          href={`mailto:${member.email}`}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            color: "#58503c",
            fontWeight: 500,
            marginTop: "6px",
            display: "block",
          }}
          className="transition-opacity hover:opacity-60"
        >
          {member.email}
        </a>
      </div>
    </div>
  );
}

export default function TeamGrid({ members }: { members: TeamMember[] }) {
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  return (
    <section style={{ backgroundColor: "#ffffff", paddingTop: "120px", paddingBottom: "80px" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header — matching for sale page header */}
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

        {/* 3-column grid — matching for sale page */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "40px" }}
        >
          {members.map((m) => (
            <div
              key={m.name}
              onMouseEnter={() => setHoveredName(m.name)}
              onMouseLeave={() => setHoveredName(null)}
            >
              <TeamCard
                member={m}
                blurred={!!hoveredName && hoveredName !== m.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
