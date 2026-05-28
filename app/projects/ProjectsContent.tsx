"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const pastProjects = [
  {
    index: "01",
    name: "The Residences",
    suburb: "Thirroul, NSW",
    type: "Luxury Townhouses",
    units: 12,
    status: "Sold Out",
    year: "2023",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&h=1000&fit=crop&q=85",
    stats: [
      { label: "Dwellings", value: "12" },
      { label: "Total Value", value: "$14.4M" },
      { label: "Days to Sell", value: "42" },
    ],
  },
  {
    index: "02",
    name: "Pacific Views",
    suburb: "Wollongong, NSW",
    type: "Residential Apartments",
    units: 24,
    status: "Sold Out",
    year: "2024",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1800&h=1000&fit=crop&q=85",
    stats: [
      { label: "Dwellings", value: "24" },
      { label: "Total Value", value: "$28.8M" },
      { label: "Days to Sell", value: "28" },
    ],
  },
];

export default function ProjectsContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative" style={{ height: "100svh", minHeight: "600px" }}>
        <video autoPlay muted loop playsInline className="absolute inset-0 object-cover" style={{ width: "100%", height: "100%" }}>
          <source src="/project.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.75) 100%)" }} />
        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-6 sm:px-10 max-w-screen-2xl mx-auto left-0 right-0">
          <HeroText />
        </div>
      </section>

      {/* ── Intro line ── */}
      <section style={{ backgroundColor: "#0a0a0a", padding: "56px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <FadeUp>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 2.5vw, 2rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.3, maxWidth: "52ch" }}>
              End-to-end project marketing for Illawarra&apos;s most ambitious developers.
            </p>
          </FadeUp>
          <FadeUp delay={100}>
            <div className="flex gap-10 flex-shrink-0">
              {[
                { value: "50+", label: "Projects" },
                { value: "$380M+", label: "In Sales" },
                { value: "20yrs", label: "Experience" },
              ].map((s) => (
                <div key={s.label}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "5px" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Projects portfolio ── */}
      <section style={{ backgroundColor: "#0a0a0a" }}>
        {/* Section header */}
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 py-16" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between">
            <FadeUp>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Selected Projects
              </p>
            </FadeUp>
            <FadeUp delay={80}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {pastProjects.length} Projects
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Project cards */}
        {pastProjects.map((project, i) => (
          <ProjectCard key={project.index} project={project} index={i} />
        ))}
      </section>

      {/* ── Capabilities ── */}
      <section style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "96px 0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-20">
            <FadeUp>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "24px" }}>
                What We Do
              </p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 4rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
                Full-Service<br />Project Marketing
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <div className="flex flex-col mt-8 lg:mt-14">
                {[
                  { title: "Project Marketing",     desc: "Brand, photography, digital campaigns and launch events." },
                  { title: "Off-the-Plan Sales",    desc: "From registration through contract to settlement." },
                  { title: "Site Identification",   desc: "Off-market sites before public listing." },
                  { title: "Pricing Strategy",      desc: "Product mix, price points and release sequencing." },
                  { title: "Buyer Database",        desc: "Pre-qualified owner-occupiers and investors, ready now." },
                  { title: "Settlement Support",    desc: "Contract management through to final handover." },
                ].map((item, idx) => (
                  <FadeUp key={item.title} delay={idx * 50}>
                    <div className="flex items-start justify-between gap-6 py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                      <div className="flex items-start gap-5">
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em", marginTop: "3px", flexShrink: 0 }}>
                          0{idx + 1}
                        </span>
                        <div>
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#ffffff", fontWeight: 500, marginBottom: "3px" }}>{item.title}</p>
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ backgroundColor: "#111111", padding: "96px 0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <FadeUp className="mb-16">
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "20px" }}>
              Our Process
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
              Six Steps to Sell-Out
            </h2>
          </FadeUp>
          <div className="grid grid-cols-2 lg:grid-cols-3">
            {[
              { n: "01", title: "Consultation",  desc: "Obligation-free. Confidential. No commitment required." },
              { n: "02", title: "Strategy",      desc: "Market research, product mix and pricing advice." },
              { n: "03", title: "Campaign",      desc: "Brand, photography, renders and digital assets." },
              { n: "04", title: "Pre-Launch",    desc: "VIP previews and database outreach before public release." },
              { n: "05", title: "Launch",        desc: "Multi-channel campaign driving qualified enquiry." },
              { n: "06", title: "Settlement",    desc: "Contract management and buyer support to completion." },
            ].map((step, i) => (
              <FadeUp key={step.n} delay={i * 70}>
                <div style={{ padding: "36px 28px", borderTop: "1px solid rgba(255,255,255,0.07)", borderLeft: i % 2 !== 0 ? "1px solid rgba(255,255,255,0.07)" : "none", height: "100%" }}
                  className={i >= 4 ? "" : ""}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 300, color: "#5BC2E7", letterSpacing: "-0.05em", lineHeight: 1, opacity: 0.25, marginBottom: "24px" }}>{step.n}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#ffffff", fontWeight: 500, marginBottom: "8px" }}>{step.title}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "96px 0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <FadeUp>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 6rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.95 }}>
                Ready to<br />Launch?
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.85, maxWidth: "42ch", marginBottom: "36px" }}>
                Site in planning, project ready to launch, or looking for your next acquisition — all enquiries are strictly confidential.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact?type=developer" className="inline-block px-8 py-4 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-80" style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}>
                  Talk to Our Projects Team
                </Link>
                <a href="tel:0242960047" className="inline-block px-8 py-4 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-60" style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-sans)" }}>
                  02 4296 0047
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Individual project card ── */
function ProjectCard({ project, index }: { project: typeof pastProjects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useReveal(0.05);

  return (
    <div
      ref={ref}
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ height: "70vh", minHeight: "500px", cursor: "default" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={project.image}
          alt={project.name}
          className="absolute inset-0 object-cover"
          style={{
            width: "100%",
            height: "100%",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)" }} />

        {/* Status + year top right */}
        <div className="absolute top-8 right-8 flex items-center gap-3">
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {project.year}
          </span>
          <span style={{ backgroundColor: "#5BC2E7", padding: "4px 12px", fontFamily: "var(--font-sans)", fontSize: "9px", color: "#ffffff", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>
            {project.status}
          </span>
        </div>

        {/* Index top left */}
        <div className="absolute top-8 left-8">
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "rgba(255,255,255,0.3)", fontWeight: 300, letterSpacing: "0.04em" }}>
            {project.index}
          </span>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-10">
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>
            {project.suburb} — {project.type}
          </p>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 5rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.95 }}>
            {project.name}
          </h3>
        </div>
      </div>

      {/* Stats bar below image */}
      <div className="flex flex-wrap" style={{ backgroundColor: "#111111", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        {project.stats.map((s, si) => (
          <div key={s.label} style={{ padding: "28px 40px", borderRight: si < project.stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none", flex: "1 1 auto" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "6px" }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Hero text ── */
function HeroText() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 150); return () => clearTimeout(t); }, []);
  return (
    <>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "20px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s" }}>
        Project Marketing — Illawarra
      </p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 9vw, 9rem)", lineHeight: 0.9, letterSpacing: "-0.05em", color: "#ffffff", fontWeight: 300, maxWidth: "12ch", marginBottom: "32px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.8s ease 0.25s, transform 0.8s ease 0.25s" }}>
        Built for<br />Developers
      </h1>
      <div className="flex flex-wrap gap-4" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease 0.55s, transform 0.6s ease 0.55s" }}>
        <Link href="/contact?type=developer" className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-widest uppercase transition-opacity hover:opacity-80" style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}>
          Start a Conversation
        </Link>
        <a href="tel:0242960047" className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-widest uppercase transition-opacity hover:opacity-60" style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-sans)" }}>
          02 4296 0047
        </a>
      </div>
    </>
  );
}
