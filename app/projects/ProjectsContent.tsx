"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

type ProjectCategory = "All" | "Duplex" | "Townhouse" | "Multi-Level Residential" | "Commercial";

const CATEGORIES: ProjectCategory[] = ["All", "Duplex", "Townhouse", "Multi-Level Residential", "Commercial"];

const projects = [
  {
    id: "elevation-77",
    name: "Elevation 77",
    suburb: "Shellharbour City Centre",
    category: "Multi-Level Residential" as ProjectCategory,
    units: "77 Apartments · 7 Commercial",
    status: "Sold Out",
    image: "/Elevation.jpg",
  },
  {
    id: "bluewater",
    name: "Bluewater",
    suburb: "Kiama",
    category: "Multi-Level Residential" as ProjectCategory,
    units: "23 Apartments",
    status: "Sold Out",
    image: "/bluewater.jpg",
  },
  {
    id: "the-outlook",
    name: "The Outlook",
    suburb: "Kiama",
    category: "Multi-Level Residential" as ProjectCategory,
    units: "18 Apartments",
    status: "Sold Out",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=1100&fit=crop&q=85",
  },
  {
    id: "shellharbour-rise",
    name: "Shellharbour Rise",
    suburb: "Shellharbour",
    category: "Townhouse" as ProjectCategory,
    units: "8 Townhomes",
    status: "Sold Out",
    image: "/Shellharbour.jpg",
  },
  {
    id: "grove-albion-park",
    name: "The Grove",
    suburb: "Albion Park",
    category: "Townhouse" as ProjectCategory,
    units: "6 Townhomes",
    status: "Now Selling",
    image: "/Gerringong.jpg",
  },
  {
    id: "coastal-terrace",
    name: "Coastal Terrace Collection",
    suburb: "Thirroul",
    category: "Duplex" as ProjectCategory,
    units: "4 Homes",
    status: "Now Selling",
    image: "/Kiama.jpg",
  },
  {
    id: "harbourside-quarter",
    name: "Harbourside Quarter",
    suburb: "Wollongong",
    category: "Commercial" as ProjectCategory,
    units: "Mixed Use · 32 Apartments",
    status: "Coming Soon",
    image: "/Wollongong.jpg",
  },
  {
    id: "gerringong-heights",
    name: "Gerringong Heights",
    suburb: "Gerringong",
    category: "Duplex" as ProjectCategory,
    units: "18 Homes",
    status: "Now Selling",
    image: "/Gerringong.jpg",
  },
];

const statusColor: Record<string, { bg: string; text: string }> = {
  "Now Selling": { bg: "#5BC2E7", text: "#ffffff" },
  "Coming Soon": { bg: "#0D3348", text: "#ffffff" },
  "Sold Out":    { bg: "rgba(255,255,255,0.18)", text: "#ffffff" },
};

export default function ProjectsContent() {
  const [active, setActive] = useState<ProjectCategory>("All");
  const sectionRef = useRef<HTMLDivElement>(null);

  const filtered = active === "All" ? projects : projects.filter(p => p.category === active);

  function handleFilter(cat: ProjectCategory) {
    setActive(cat);
    // scroll to top of project section when filter changes
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ minHeight: "100svh", backgroundColor: "#FBF9F3", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "140px 40px 100px", width: "100%" }}>
          <HeroText />
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", color: "rgba(13,51,72,0.4)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Scroll
          </span>
          <svg width="1" height="36" viewBox="0 0 1 36"><line x1="0.5" y1="0" x2="0.5" y2="36" stroke="rgba(13,51,72,0.2)" strokeWidth="1"/></svg>
        </div>
      </section>

      {/* ── Filter bar (sticky) ── */}
      <div ref={sectionRef} style={{ position: "sticky", top: 0, zIndex: 40, backgroundColor: "#ffffff", borderBottom: "1px solid #E8E5DF" }}>
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
          <div className="flex flex-wrap items-center gap-2 py-4">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "7px 18px",
                  border: active === cat ? "1px solid #0D3348" : "1px solid #DAD7CE",
                  backgroundColor: active === cat ? "#0D3348" : "transparent",
                  color: active === cat ? "#ffffff" : "#7a7265",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {cat}
              </button>
            ))}
            <span style={{ marginLeft: "auto", fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {filtered.length} Project{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* ── Full-screen sticky scroll cards ── */}
      <div style={{ backgroundColor: "#ffffff" }}>
        {filtered.map((project, i) => (
          <div key={project.id} style={{ height: "100svh" }}>
            <div style={{ position: "sticky", top: 0, height: "100svh", backgroundColor: "#ffffff", padding: "clamp(12px, 2vw, 24px)", boxSizing: "border-box", display: "flex" }}>

              {/* Framed image area */}
              <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.name}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                />
                {/* Overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 40%, rgba(0,0,0,0.68) 100%)" }} />

                {/* Counter top-right */}
                <div style={{ position: "absolute", top: "28px", right: "32px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 2vw, 1.4rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.02em", opacity: 0.9 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>
                    / {String(filtered.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Dot navigation — right side */}
                <div style={{ position: "absolute", right: "32px", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {filtered.map((_, j) => (
                    <div
                      key={j}
                      style={{
                        width: j === i ? "24px" : "6px",
                        height: "6px",
                        borderRadius: "3px",
                        backgroundColor: j === i ? "#5BC2E7" : "rgba(255,255,255,0.3)",
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </div>

                {/* Bottom content */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(28px, 4vw, 52px) clamp(24px, 4vw, 52px) clamp(32px, 5vw, 60px)" }}>
                  <div style={{ maxWidth: "900px" }}>
                    {/* Status + category row */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px", flexWrap: "wrap" }}>
                      <span style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "9px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        padding: "5px 14px",
                        backgroundColor: statusColor[project.status]?.bg ?? "rgba(255,255,255,0.18)",
                        color: statusColor[project.status]?.text ?? "#ffffff",
                      }}>
                        {project.status}
                      </span>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
                        {project.category}
                      </span>
                    </div>

                    {/* Suburb */}
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(11px, 1.5vw, 13px)", color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>
                      {project.suburb}
                    </p>

                    {/* Project name */}
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 8vw, 7rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.9, marginBottom: "24px" }}>
                      {project.name}
                    </h2>

                    {/* Units */}
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(12px, 1.5vw, 14px)", color: "rgba(255,255,255,0.6)", letterSpacing: "0.06em" }}>
                      {project.units}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Development types ── */}
      <section style={{ backgroundColor: "#FBF9F3", padding: "80px 0" }}>
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <span className="label-tag">What We Deliver</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "48px" }}>
              Development Expertise
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              { label: "Duplex",                  desc: "Side-by-side and attached dual occupancy developments across the Illawarra, from concept to sell-out." },
              { label: "Townhouse",               desc: "Boutique townhouse communities of 4–20 homes with full sales, marketing and VIP buyer access." },
              { label: "Multi-Level Residential", desc: "Apartment towers and mid-rise residential — off-the-plan sales campaigns, presales and settlement management." },
              { label: "Commercial",              desc: "Commercial and mixed-use developments, from ground-floor retail to standalone office and retail buildings." },
            ].map((item, i) => (
              <FadeUp key={item.label} delay={i * 80}>
                <div style={{ padding: "36px 28px", borderLeft: i > 0 ? "1px solid #DAD7CE" : "none" }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#5BC2E7", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "16px" }}>0{i + 1}</p>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "12px" }}>{item.label}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.75 }}>{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process + stats ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 0" }}>
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <span className="label-tag">Our Process</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "40px" }}>
                From Site to<br />Sell-Out
              </h2>
              <div className="flex flex-col gap-0">
                {[
                  { title: "Site Identification",   desc: "Access off-market Illawarra sites through our owner and developer network before public listing." },
                  { title: "Project Marketing",     desc: "Full campaign management — brand, digital, photography, launch events and display suites." },
                  { title: "Off-the-Plan Sales",    desc: "VIP previews through to exchange and settlement, managed by our senior project agents." },
                  { title: "Business & Commercial", desc: "Commercial tenant placement, business sales and mixed-use leasing across the Illawarra." },
                ].map((step, i) => (
                  <div key={step.title} style={{ padding: "24px 0", borderTop: "1px solid #E8E5DF", display: "flex", gap: "20px", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#5BC2E7", letterSpacing: "0.12em", minWidth: "28px", marginTop: "3px" }}>0{i + 1}</span>
                    <div>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "6px" }}>{step.title}</p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.7 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={100}>
              <div className="flex flex-col gap-0 lg:pt-16">
                {[
                  { label: "Projects Delivered",   value: "50+" },
                  { label: "In Project Sales",      value: "$380M+" },
                  { label: "Average Sell-Out Time", value: "6 Weeks" },
                  { label: "Years Illawarra Focus", value: "12+" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-6" style={{ borderTop: "1px solid #E8E5DF" }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265" }}>{s.label}</p>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.04em" }}>{s.value}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "#0D3348", padding: "100px 0" }}>
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 text-center">
          <FadeUp>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#5BC2E7", letterSpacing: "0.16em", textTransform: "uppercase", display: "block", marginBottom: "20px" }}>
              Work With Us
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 5.5rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: "40px" }}>
              Have a Project<br />In Mind?
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: "44ch", margin: "0 auto 40px" }}>
              Talk to our projects team about your development — whether it&apos;s a duplex in Dapto or a multi-level tower in Wollongong CBD.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-block px-8 py-4 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-80" style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}>
                Talk to Our Team
              </Link>
              <a href="tel:0242960047" className="inline-block px-8 py-4 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-60" style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-sans)" }}>
                02 4296 0047
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

function HeroText() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 150); return () => clearTimeout(t); }, []);
  return (
    <>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#5BC2E7", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "24px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s" }}>
        Spinelli Real Estate — Projects
      </p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 9vw, 9rem)", lineHeight: 0.9, letterSpacing: "-0.05em", color: "#0D3348", fontWeight: 300, maxWidth: "14ch", marginBottom: "32px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.8s ease 0.25s, transform 0.8s ease 0.25s" }}>
        Developments<br />&amp; Projects
      </h1>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(14px, 1.6vw, 16px)", color: "rgba(88,80,60,0.75)", lineHeight: 1.85, maxWidth: "52ch", marginBottom: "40px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s" }}>
        From boutique duplexes to landmark multi-level towers and commercial developments — Spinelli brings unrivalled Illawarra market knowledge and a pre-qualified buyer database to every project.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.65s" }}>
        <Link href="/contact" className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-widest uppercase transition-opacity hover:opacity-80" style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}>
          Discuss a Project
        </Link>
        <a href="tel:0242960047" className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-widest uppercase transition-opacity hover:opacity-60" style={{ border: "1px solid rgba(13,51,72,0.2)", color: "#0D3348", fontFamily: "var(--font-sans)" }}>
          02 4296 0047
        </a>
      </div>
    </>
  );
}
