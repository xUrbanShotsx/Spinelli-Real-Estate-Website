"use client";
import { useState } from "react";
import Link from "next/link";
import type { TeamMember } from "@/lib/types";

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

function TeamCard({ member, blurred, priority }: { member: TeamMember; blurred: boolean; priority: boolean }) {
  return (
    <Link
      href={`/team/${toSlug(member.name)}`}
      className="group relative overflow-hidden block"
      style={{ height: "480px", backgroundColor: "#E8F6FC" }}
    >
      {/* Image */}
      <img
        src={member.image}
        alt={member.name}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="absolute inset-0 object-cover object-top"
        style={{
          width: "100%",
          height: "100%",
          filter: blurred ? "blur(4px)" : "none",
          opacity: blurred ? 0.5 : 1,
          transition: "filter 0.3s ease, opacity 0.3s ease",
        }}
      />

      {/* Dark gradient shader */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.0) 100%)" }}
      />

      {/* Role badge — top right */}
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

      {/* Text — bottom left inside frame */}
      <div className="absolute bottom-0 left-0 right-0 px-5 py-5">
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", fontWeight: 500, color: "#ffffff", lineHeight: 1.3, marginBottom: "4px" }}>
          {member.name}
        </p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "2px" }}>
          {member.phone}
        </p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
          {member.email}
        </p>
      </div>
    </Link>
  );
}

export default function TeamGrid({ members }: { members: TeamMember[] }) {
  const [hoveredName, setHoveredName] = useState<string | null>(null);

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

        {/* 3-column grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "40px" }}
        >
          {members.map((m, i) => (
            <div
              key={m.name}
              onMouseEnter={() => setHoveredName(m.name)}
              onMouseLeave={() => setHoveredName(null)}
            >
              <TeamCard
                member={m}
                blurred={!!hoveredName && hoveredName !== m.name}
                priority={i < 3}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
