"use client";
import { useState } from "react";
import type { TeamMember } from "@/lib/types";

function TeamCard({ member, blurred }: { member: TeamMember; blurred: boolean }) {
  return (
    <div className="group">
      {/* Image — fixed aspect ratio so all cards identical height */}
      <div className="overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          style={{
            filter: blurred ? "blur(4px)" : "none",
            opacity: blurred ? 0.45 : 1,
            transition: "filter 0.3s ease, opacity 0.3s ease",
          }}
        />
      </div>

      {/* Text below */}
      <div className="pt-4">
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.2rem",
            color: "#000000",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "3px",
          }}
        >
          {member.name}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            color: "#5BC2E7",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          {member.role}
        </p>
        <div className="flex flex-col gap-1">
          <a
            href={`tel:${member.phone.replace(/\s/g, "")}`}
            style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#7a7265" }}
            className="transition-opacity hover:opacity-60"
          >
            {member.phone}
          </a>
          <a
            href={`mailto:${member.email}`}
            style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#7a7265" }}
            className="transition-opacity hover:opacity-60"
          >
            {member.email}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function TeamGrid({ members }: { members: TeamMember[] }) {
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  return (
    <section style={{ backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" }}>
      <div style={{ paddingLeft: "40px", paddingRight: "40px" }}>

        {/* Header */}
        <div className="pb-8 mb-8" style={{ borderBottom: "1px solid #E8E5DF" }}>
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
            The Spinelli Team
          </h2>
        </div>

        {/* 4-column grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
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
