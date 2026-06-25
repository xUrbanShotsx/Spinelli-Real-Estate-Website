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
      <section style={{ backgroundColor: "#ffffff", padding: "80px 0" }}>
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <span className="label-tag">What We Deliver</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "48px" }}>
              Development Expertise
            </h2>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Duplex",                  image: "/duplex.jpg" },
              { label: "Townhouse",               image: "/townhouse.jpg" },
              { label: "Multi-Level Residential", image: "/apartment.jpg" },
              { label: "Commercial",              image: "/commercial.jpg" },
            ].map((item, i) => (
              <FadeUp key={item.label} delay={i * 80}>
                <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.42)" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "9px", color: "#5BC2E7", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "14px" }}>0{i + 1}</p>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 1.5vw, 1.4rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.02em", textAlign: "center", lineHeight: 1.2 }}>{item.label}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marketing ── */}
      <MarketingSection />

      {/* ── CTA ── */}
      <DeveloperCTA />
    </>
  );
}

const MARKETING_ITEMS = [
  {
    title: "Project Landing Pages",
    desc: "Every development gets a custom-built landing page — designed to capture buyer interest, showcase the project and convert registrations from day one. We build, host and manage it end-to-end.",
    image: "/landing.jpg",
  },
  {
    title: "Paid Digital Marketing",
    desc: "In-house Meta, Google and YouTube campaigns targeted at qualified Illawarra buyers. We run the ads, optimise weekly and report on every lead — no agency middleman, no mark-up.",
    image: "/socialmarketing.jpg",
  },
  {
    title: "Buyer Funnel & CRM",
    desc: "Buyers are funnelled from ad to landing page to our CRM, where they're nurtured through automated sequences and followed up by our project sales team before launch day.",
    image: "/crm.jpg",
  },
  {
    title: "Photography & Creative",
    desc: "Architectural photography, drone, renders, floorplan graphics and all print collateral produced in-house. One consistent visual identity from hoarding to handover.",
    image: "/renderr.jpg",
  },
];

function MarketingSection() {
  const [active, setActive] = useState(0);
  return (
    <section style={{ backgroundColor: "#ffffff" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: "560px" }}>
        {/* Left — text + accordion */}
        <div style={{ padding: "60px clamp(24px, 5vw, 80px)" }}>
          <FadeUp>
            <span className="label-tag">How We Sell</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "40px" }}>
              In-House<br />Marketing
            </h2>
          </FadeUp>
          <div>
            {MARKETING_ITEMS.map((item, i) => (
              <div
                key={item.title}
                onClick={() => setActive(i)}
                style={{ borderTop: "1px solid #E8E5DF", cursor: "pointer" }}
              >
                <div style={{ padding: "22px 0", display: "flex", gap: "20px", alignItems: "flex-start" }}>
                  <span style={{
                    fontFamily: "var(--font-sans)", fontSize: "10px",
                    color: active === i ? "#5BC2E7" : "rgba(91,194,231,0.4)",
                    letterSpacing: "0.12em", minWidth: "28px", marginTop: "3px",
                    transition: "color 0.2s ease",
                  }}>0{i + 1}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontFamily: "var(--font-display)", fontSize: "1.1rem",
                      color: active === i ? "#0D3348" : "#7a7265",
                      fontWeight: 300, letterSpacing: "-0.02em",
                      marginBottom: active === i ? "10px" : "0",
                      transition: "color 0.2s ease, margin 0.3s ease",
                    }}>{item.title}</p>
                    <div style={{
                      maxHeight: active === i ? "120px" : "0",
                      opacity: active === i ? 1 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.4s ease, opacity 0.3s ease",
                    }}>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.75 }}>{item.desc}</p>
                    </div>
                  </div>
                  <span style={{
                    fontFamily: "var(--font-sans)", fontSize: "18px", color: "#5BC2E7",
                    lineHeight: 1, marginTop: "2px", display: "inline-block",
                    transform: active === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}>+</span>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #E8E5DF" }} />
          </div>
        </div>

        {/* Right — swapping image (hidden on mobile) */}
        <div className="hidden lg:block" style={{ position: "relative", overflow: "hidden", minHeight: "400px" }}>
          {MARKETING_ITEMS.map((item, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.image}
              src={item.image}
              alt={item.title}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover",
                opacity: active === i ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function DeveloperCTA() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/developer-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontSize: "13px",
    color: "#0D3348",
    backgroundColor: "#F8F9FA",
    border: "1px solid #E8E5DF",
    padding: "13px 16px",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
  };

  return (
    <section style={{ backgroundColor: "#ffffff", borderTop: "1px solid #E8E5DF" }}>
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 text-center" style={{ padding: "64px clamp(24px, 5vw, 80px)" }}>
        <FadeUp>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem, 2vw, 1.6rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "28px", maxWidth: "680px", margin: "0 auto 28px" }}>
            Bring your development to life and market it the way it deserves. From the first render to the final settlement, we handle everything in-house — so your project is positioned perfectly, reaches the right buyers, and sells the way it should.
          </p>

          {!open && status !== "success" && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => setOpen(true)}
                style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ffffff", backgroundColor: "#5BC2E7", padding: "14px 32px", border: "none", cursor: "pointer" }}
              >
                Get In Touch
              </button>
            </div>
          )}

          {/* Inline form */}
          <div style={{
            maxHeight: open && status !== "success" ? "600px" : "0",
            overflow: "hidden",
            transition: "max-height 0.5s ease",
          }}>
            <form onSubmit={handleSubmit} style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "0", maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "12px", marginBottom: "12px" }}>
                <input
                  required
                  placeholder="First name"
                  value={form.firstName}
                  onChange={e => set("firstName", e.target.value)}
                  style={inputStyle}
                />
                <input
                  required
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={e => set("lastName", e.target.value)}
                  style={inputStyle}
                />
                <input
                  required
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={e => set("email", e.target.value)}
                  style={inputStyle}
                />
                <input
                  placeholder="Phone (optional)"
                  value={form.phone}
                  onChange={e => set("phone", e.target.value)}
                  style={inputStyle}
                />
              </div>
              <textarea
                required
                placeholder="Tell us about your development — location, type, timeline…"
                value={form.message}
                onChange={e => set("message", e.target.value)}
                rows={4}
                style={{ ...inputStyle, resize: "vertical", marginBottom: "16px" }}
              />
              <div style={{ display: "flex", gap: "12px", alignItems: "center", justifyContent: "center" }}>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ffffff", backgroundColor: "#5BC2E7", padding: "14px 32px", border: "none", cursor: status === "submitting" ? "wait" : "pointer", opacity: status === "submitting" ? 0.6 : 1 }}
                >
                  {status === "submitting" ? "Sending…" : "Send Enquiry"}
                </button>
                <button
                  type="button"
                  onClick={() => { setOpen(false); setStatus("idle"); }}
                  style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7a7265", background: "none", border: "none", cursor: "pointer", padding: "14px 0" }}
                >
                  Cancel
                </button>
                {status === "error" && (
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#c0392b" }}>
                    Something went wrong — please try again.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Success state */}
          {status === "success" && (
            <div style={{ marginTop: "8px", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "8px" }}>
                Thanks — we&apos;ll be in touch shortly.
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265" }}>
                One of our projects team will reach out within one business day.
              </p>
            </div>
          )}
        </FadeUp>
      </div>
    </section>
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
