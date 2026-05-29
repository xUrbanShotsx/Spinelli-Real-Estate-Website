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

const projects = [
  {
    index: "01",
    name: "Elevation 77",
    suburb: "Shellharbour City Centre",
    type: "Apartments & Commercial",
    units: "77 Apartments\n7 Commercial",
    status: "Sold Out",
    current: false,
    image: "/Elevation.jpg",
  },
  {
    index: "02",
    name: "Bluewater",
    suburb: "Kiama",
    type: "Residential Apartments",
    units: "24 Apartments",
    status: "Sold Out",
    current: false,
    image: "/bluewater.jpg",
  },
  {
    index: "03",
    name: "The Outlook",
    suburb: "Kiama",
    type: "Luxury Apartments",
    units: "18 Apartments",
    status: "Sold Out",
    current: false,
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=1100&fit=crop&q=85",
  },
  {
    index: "04",
    name: "Shellharbour Rise",
    suburb: "Shellharbour",
    type: "Townhouses",
    units: "8 Homes",
    status: "Sold Out",
    current: false,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&h=1100&fit=crop&q=85",
  },
];

export default function ProjectsContent() {
  return (
    <>
      {/* ── Hero video ── */}
      <section className="relative" style={{ height: "100svh", minHeight: "600px" }}>
        <video autoPlay muted loop playsInline className="absolute inset-0 object-cover" style={{ width: "100%", height: "100%" }}>
          <source src="/project.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.65) 100%)" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 7vw, 7rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.05, textAlign: "center" }}>
            Where Projects Perform
          </h1>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-sans)" }}>
            Scroll
          </span>
          <svg className="w-4 h-4" style={{ color: "rgba(255,255,255,0.45)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Page intro ── */}
      <section style={{ backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "60px" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-end pb-16">
            <FadeUp>
              <span className="label-tag">Project Sales</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 4.5rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.0 }}>
                Delivering Results<br />For Developers
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#7a7265", lineHeight: 1.85, maxWidth: "48ch" }}>
                Spinelli brings unrivalled local knowledge, a pre-qualified buyer database and a proven sales process to every project — from boutique townhouses to landmark apartment towers across the Illawarra.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Project grid ── */}
      <section style={{ backgroundColor: "#ffffff", paddingBottom: "100px" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">

          {/* Filter / count row */}
          <div className="flex items-center justify-between py-6 mb-8" style={{ borderBottom: "1px solid #E8E5DF" }}>
            <FadeUp>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                All Projects ({projects.length})
              </p>
            </FadeUp>
          </div>

          {/* 2-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {projects.map((project, i) => (
              <ProjectCard key={project.index} project={project} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities strip ── */}
      <section style={{ backgroundColor: "#FBF9F3", padding: "80px 0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-3 gap-0">
            {[
              { title: "Project Marketing",   desc: "Full campaign management — brand, digital, photography, launch events and display suites." },
              { title: "Off-the-Plan Sales",  desc: "From VIP preview through to exchange and settlement, managed by our senior agents." },
              { title: "Site Identification", desc: "Access off-market Illawarra sites through our owner and agent network before public listing." },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 80}>
                <div style={{ padding: "40px 32px", borderLeft: i > 0 ? "1px solid #DAD7CE" : "none" }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#5BC2E7", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "16px" }}>0{i + 1}</p>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "12px" }}>{item.title}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.75 }}>{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Developer enquiry CTA ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "100px 0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <span className="label-tag">Work With Us</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 5rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: "32px" }}>
                Have a Project<br />In Mind?
              </h2>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact?type=developer" className="inline-block px-8 py-4 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-80" style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}>
                  Talk to Our Team
                </Link>
                <a href="tel:0242960047" className="inline-block px-8 py-4 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-60" style={{ border: "1px solid #DAD7CE", color: "#000000", fontFamily: "var(--font-sans)" }}>
                  02 4296 0047
                </a>
              </div>
            </FadeUp>
            <FadeUp delay={100}>
              <div className="flex flex-col gap-0">
                {[
                  { label: "Projects Delivered",     value: "50+" },
                  { label: "In Project Sales",        value: "$380M+" },
                  { label: "Average Sell-Out Time",   value: "6 Weeks" },
                  { label: "Years Illawarra Focus",   value: "20+" },
                ].map((s, i) => (
                  <div key={s.label} className="flex items-center justify-between py-5" style={{ borderTop: "1px solid #E8E5DF" }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265" }}>{s.label}</p>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.04em" }}>{s.value}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Project card ── */
function ProjectCard({ project, delay }: { project: typeof projects[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useReveal(0.05);

  return (
    <div
      ref={ref}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <img
          src={project.image}
          alt={project.name}
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
        />
        {/* Status badge */}
        <div className="absolute top-5 left-5">
          <span style={{
            fontFamily: "var(--font-sans)",
            fontSize: "9px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 600,
            padding: "5px 12px",
            backgroundColor: project.current ? "#5BC2E7" : "rgba(0,0,0,0.55)",
            color: "#ffffff",
          }}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Info below image */}
      <div className="pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>
              {project.suburb}
            </p>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              {project.name}
            </h3>
          </div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.06em", flexShrink: 0, marginTop: "2px", textAlign: "right", whiteSpace: "pre-line" }}>
            {project.units}
          </p>
        </div>
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
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "18px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s" }}>
        Spinelli Real Estate — Project Sales
      </p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 9vw, 9rem)", lineHeight: 0.9, letterSpacing: "-0.05em", color: "#ffffff", fontWeight: 300, maxWidth: "14ch", marginBottom: "32px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.8s ease 0.25s, transform 0.8s ease 0.25s" }}>
        Built for<br />Developers
      </h1>
      <div className="flex flex-wrap gap-4" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.55s" }}>
        <Link href="/contact?type=developer" className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-widest uppercase transition-opacity hover:opacity-80" style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}>
          Start a Conversation
        </Link>
        <a href="tel:0242960047" className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-widest uppercase transition-opacity hover:opacity-60" style={{ border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-sans)" }}>
          02 4296 0047
        </a>
      </div>
    </>
  );
}
