import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { team, soldProperties, residentialRentProperties } from "@/lib/data";
import type { Property } from "@/lib/types";

export function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function generateStaticParams() {
  return team.map((m) => ({ slug: toSlug(m.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const member = team.find((m) => toSlug(m.name) === slug);
  if (!member) return {};
  return {
    title: `${member.name} | Spinelli Real Estate`,
    description: `${member.name} — ${member.role} at Spinelli Real Estate.`,
  };
}

function tagColour(_tag: string | undefined, _type: string): string {
  return "#5BC2E7";
}

function tagLabel(tag: string | undefined, type: string): string {
  if (tag === "Sold") return "Sold";
  if (type === "residential-rent") return "Leased";
  return tag ?? "";
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = team.find((m) => toSlug(m.name) === slug);
  if (!member) notFound();

  // Gather this agent's sold sales + managed rentals
  const agentProperties: Property[] = [
    ...soldProperties.filter((p) => p.agent === member.name),
    ...residentialRentProperties.filter((p) => p.agent === member.name),
  ];

  return (
    <>
      {/* ── Profile ── */}
      <section style={{ backgroundColor: "#ffffff", paddingTop: "120px", paddingBottom: "0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          {/* Back link */}
          <Link
            href="/team"
            className="inline-flex items-center gap-2 mb-12 transition-opacity hover:opacity-60"
            style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: "12px", height: "12px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Meet the Team
          </Link>

          <div className="grid lg:grid-cols-[480px_1fr] gap-16 items-start">

            {/* Photo */}
            <div className="relative overflow-hidden" style={{ height: "580px", backgroundColor: "#E8F6FC" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.image}
                alt={member.name}
                loading="eager"
                decoding="sync"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
              />
              {/* Shader */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.0) 100%)" }}
              />
              {/* Role badge */}
              <div className="absolute top-0 right-0">
                <span style={{ display: "block", backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", padding: "6px 12px", textTransform: "uppercase" }}>
                  {member.role}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="py-4">
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "12px" }}>
                {member.role}
              </span>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  color: "#000000",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.0,
                  marginBottom: "32px",
                }}
              >
                {member.name}
              </h1>

              {/* Divider */}
              <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "28px" }} />

              {/* Bio */}
              {member.bio ? (
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#7a7265", lineHeight: 1.9, maxWidth: "52ch", marginBottom: "40px" }}>
                  {member.bio}
                </p>
              ) : (
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#7a7265", lineHeight: 1.9, maxWidth: "52ch", marginBottom: "40px" }}>
                  {member.name} is a valued member of the Spinelli Real Estate team, bringing dedication and expertise to every client interaction across the Illawarra.
                </p>
              )}

              {/* Contact details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "40px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#a2b0aa", width: "60px" }}>Phone</span>
                  <a href={`tel:${member.phone.replace(/\s/g, "")}`} style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#000000", fontWeight: 500 }} className="transition-opacity hover:opacity-60">
                    {member.phone}
                  </a>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#a2b0aa", width: "60px" }}>Email</span>
                  <a href={`mailto:${member.email}`} style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#000000", fontWeight: 500 }} className="transition-opacity hover:opacity-60">
                    {member.email}
                  </a>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${member.phone.replace(/\s/g, "")}`}
                  className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
                >
                  Call {member.name.split(" ")[0]}
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-70"
                  style={{ border: "1px solid #E8E5DF", color: "#000000", fontFamily: "var(--font-sans)" }}
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Properties ── */}
      {agentProperties.length > 0 && (
        <section style={{ backgroundColor: "#ffffff", padding: "80px 0" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
            <div style={{ borderTop: "1px solid #E8E5DF", paddingTop: "60px" }}>
              <div className="flex items-end justify-between gap-4 mb-10">
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em" }}>
                  Recent Results
                </h2>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.08em" }}>
                  {agentProperties.length} {agentProperties.length === 1 ? "property" : "properties"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {agentProperties.map((p) => (
                  <div key={p.id} className="group">
                    {/* Image */}
                    <div
                      className="relative overflow-hidden group-hover:scale-105 transition-transform duration-500"
                      style={{
                        height: "240px",
                        backgroundImage: `url(${p.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundColor: "#E8F6FC",
                      }}
                    >
                      {/* Tag badge */}
                      <div className="absolute top-0 left-0">
                        <span style={{
                          display: "block",
                          backgroundColor: tagColour(p.tag, p.type),
                          color: "#ffffff",
                          fontFamily: "var(--font-sans)",
                          fontSize: "9px",
                          fontWeight: 600,
                          letterSpacing: "0.14em",
                          padding: "5px 10px",
                          textTransform: "uppercase",
                        }}>
                          {tagLabel(p.tag, p.type)}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div style={{ paddingTop: "16px" }}>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#000000", marginBottom: "2px" }}>
                        {p.address}
                      </p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px" }}>
                        {p.suburb}
                      </p>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "8px" }}>
                        {p.price}
                      </p>
                      {/* Beds / baths / cars */}
                      <div style={{ display: "flex", gap: "14px" }}>
                        {p.beds !== undefined && (
                          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#7a7265" }}>{p.beds} Bed</span>
                        )}
                        {p.baths !== undefined && (
                          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#7a7265" }}>{p.baths} Bath</span>
                        )}
                        {p.cars !== undefined && (
                          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#7a7265" }}>{p.cars} Car</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
