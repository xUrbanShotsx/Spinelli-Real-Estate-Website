"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "./data";

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

const NAV_H = 90;

export default function ProjectsContent() {
  const [current, setCurrent] = useState(1);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!stackRef.current) return;
      const stackTop = stackRef.current.offsetTop;
      const cardH = window.innerHeight;
      const scrolled = window.scrollY - stackTop;
      const idx = Math.floor(scrolled / cardH) + 1;
      setCurrent(Math.min(Math.max(1, idx), projects.length));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ height: "100svh", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Top spacer — pushes text to vertical centre */}
        <div style={{ flex: 1 }} />

        {/* Centred brief */}
        <div style={{ textAlign: "center", padding: "0 clamp(24px, 8vw, 120px)", maxWidth: "780px" }}>
          <HeroText />
        </div>

        {/* Line from below text to bottom of hero */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "32px" }}>
          <div style={{ width: "1px", flex: 1, backgroundColor: "rgba(13,51,72,0.15)" }} />
        </div>
      </section>

      {/* ── Scroll counter (fixed, only visible in stack zone) ── */}
      <div style={{ position: "fixed", left: "clamp(20px, 3vw, 48px)", top: `${NAV_H + 32}px`, zIndex: 500, pointerEvents: "none" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.85rem, 1.2vw, 1.1rem)", color: "rgba(255,255,255,0.5)", fontWeight: 300, letterSpacing: "-0.01em" }}>
          <span style={{ color: "#ffffff" }}>{String(current).padStart(2, "0")}</span>
          {" / "}
          {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── Sticky stack ── */}
      <div
        ref={stackRef}
        style={{ height: `calc(100vh * ${projects.length})` }}
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              zIndex: i + 1,
              backgroundColor: "#ffffff",
              paddingTop: `${NAV_H}px`,
              padding: `${NAV_H}px clamp(10px, 1.5vw, 18px) clamp(10px, 1.5vw, 18px)`,
              boxSizing: "border-box",
            }}
          >
            {/* Framed image */}
            <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.name}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
              />
              {/* Gradient */}
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />

              {/* Centred content */}
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 clamp(24px, 8vw, 120px)" }}>
                {/* Status badge */}
                <span style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: project.status === "Now Selling" ? "#ffffff" : "rgba(255,255,255,0.5)",
                  border: `1px solid ${project.status === "Now Selling" ? "#5BC2E7" : "rgba(255,255,255,0.25)"}`,
                  backgroundColor: project.status === "Now Selling" ? "#5BC2E7" : "transparent",
                  padding: "5px 16px",
                  marginBottom: "28px",
                  display: "inline-block",
                }}>
                  {project.status}
                </span>

                {/* Project name */}
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.6rem, 7vw, 7.5rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.92, marginBottom: "20px" }}>
                  {project.name}
                </h2>

                {/* Suburb */}
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(10px, 1.2vw, 12px)", color: "rgba(255,255,255,0.5)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "12px" }}>
                  {project.suburb}
                </p>

                {/* Units + category */}
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(10px, 1.1vw, 11px)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "36px" }}>
                  {project.units} · {project.category}
                </p>

                {/* Actions */}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
                  {project.status !== "Sold Out" && (
                    <Link
                      href="/contact"
                      style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0D3348", backgroundColor: "#ffffff", padding: "13px 28px", textDecoration: "none" }}
                    >
                      Register Interest
                    </Link>
                  )}
                  <Link
                    href={`/projects/${project.id}`}
                    style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ffffff", backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.35)", padding: "13px 28px", textDecoration: "none" }}
                  >
                    View Project
                  </Link>
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
    <p style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)",
      color: "#0D3348",
      fontWeight: 300,
      lineHeight: 1.55,
      letterSpacing: "-0.01em",
      textAlign: "center",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
    }}>
      From boutique duplexes to landmark multi-level towers and commercial developments — Spinelli brings unrivalled Illawarra market knowledge and a pre-qualified buyer database to every project.
    </p>
  );
}
