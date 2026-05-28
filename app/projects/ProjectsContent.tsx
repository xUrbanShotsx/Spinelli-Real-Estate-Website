"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useReveal(threshold = 0.12) {
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
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const pastProjects = [
  {
    index: "01",
    name: "The Residences",
    suburb: "Thirroul",
    type: "Luxury Townhouses",
    units: "12 Homes",
    result: "Sold out in 6 weeks",
    value: "$14.4M",
    desc: "A boutique collection of architect-designed townhouses positioned above the Thirroul escarpment. Spinelli managed full project marketing, VIP previews and contract management through to settlement.",
    stats: [
      { label: "Total Value", value: "$14.4M" },
      { label: "Time to Sell-Out", value: "6 Wks" },
      { label: "Contracts Above Reserve", value: "100%" },
    ],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=900&fit=crop&q=85",
  },
  {
    index: "02",
    name: "Pacific Views",
    suburb: "Wollongong",
    type: "Residential Apartments",
    units: "24 Apartments",
    result: "Sold out in 4 weeks",
    value: "$28.8M",
    desc: "A landmark waterfront apartment development in the heart of Wollongong's CBD. From database launch to full sell-out, Spinelli delivered an exceptional result for the developer with zero unsold stock at completion.",
    stats: [
      { label: "Total Value", value: "$28.8M" },
      { label: "Time to Sell-Out", value: "4 Wks" },
      { label: "Pre-Launch Sales", value: "60%" },
    ],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=900&fit=crop&q=85",
  },
];

const services = [
  { n: "01", title: "Project Marketing",    desc: "Brand, photography, digital campaigns and launch events." },
  { n: "02", title: "Off-the-Plan Sales",   desc: "From registration through contract to settlement." },
  { n: "03", title: "Site Identification",  desc: "Off-market sites presented before public listing." },
  { n: "04", title: "Pricing Strategy",     desc: "Product mix, price points and release order." },
  { n: "05", title: "Buyer Database",       desc: "Pre-qualified owner-occupiers and investors, ready now." },
  { n: "06", title: "Display Suites",       desc: "Staffed, managed and open seven days." },
  { n: "07", title: "Settlement Support",   desc: "Protecting contracts through to final handover." },
  { n: "08", title: "Developer Advisory",   desc: "Feasibility input before a dollar is committed." },
];

const process = [
  { n: "01", title: "Consultation",  desc: "Obligation-free. Confidential. No commitment required." },
  { n: "02", title: "Strategy",      desc: "Market research, product mix and pricing advice." },
  { n: "03", title: "Campaign",      desc: "Brand, photography, renders and digital assets." },
  { n: "04", title: "Pre-Launch",    desc: "VIP previews and database outreach before public release." },
  { n: "05", title: "Launch",        desc: "Multi-channel campaign driving qualified enquiry." },
  { n: "06", title: "Settlement",    desc: "Contract management and buyer support to completion." },
];

export default function ProjectsContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative" style={{ height: "100svh", minHeight: "600px" }}>
        <video autoPlay muted loop playsInline className="absolute inset-0 object-cover" style={{ width: "100%", height: "100%" }}>
          <source src="/project.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.70) 100%)" }} />
        <div className="absolute inset-0 flex flex-col justify-end pb-24 px-6 sm:px-12 lg:px-20 max-w-screen-2xl mx-auto left-0 right-0">
          <HeroText />
        </div>
      </section>

      {/* ── Editorial intro ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 0 0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-end pb-20" style={{ borderBottom: "1px solid #E8E5DF" }}>
            <FadeUp>
              <span className="label-tag">Project Marketing</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 4.5rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.0 }}>
                Illawarra's Most<br />Trusted Developer<br />Partner
              </h2>
            </FadeUp>
            <FadeUp delay={120}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#7a7265", lineHeight: 1.85, maxWidth: "48ch", marginBottom: "40px" }}>
                From boutique townhouse developments to landmark apartment towers — Spinelli delivers sell-outs, not just campaigns. Our undivided Illawarra focus means your project gets the attention it deserves, every time.
              </p>
              <div className="flex gap-12 flex-wrap">
                {[
                  { value: "50+", label: "Projects delivered" },
                  { value: "$380M+", label: "In project sales" },
                  { value: "6 wk", label: "Avg time to sell-out" },
                ].map((s) => (
                  <div key={s.label}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.value}</p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "6px" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Past Projects ── */}
      <section style={{ backgroundColor: "#ffffff", paddingBottom: "0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 pt-20 pb-6">
          <FadeUp>
            <span className="label-tag">Track Record</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Past Projects
            </h2>
          </FadeUp>
        </div>

        {pastProjects.map((project, i) => (
          <FadeUp key={project.index}>
            <div
              className={`grid lg:grid-cols-2 ${i % 2 === 1 ? "" : ""}`}
              style={{ borderTop: "1px solid #E8E5DF" }}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden ${i % 2 === 1 ? "lg:order-last" : ""}`}
                style={{ minHeight: "520px" }}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="absolute inset-0 object-cover transition-transform duration-700 hover:scale-[1.03]"
                  style={{ width: "100%", height: "100%" }}
                />
                {/* Project index label */}
                <div className="absolute top-8 left-8">
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "5rem", fontWeight: 300, color: "rgba(255,255,255,0.15)", letterSpacing: "-0.06em", lineHeight: 1 }}>
                    {project.index}
                  </span>
                </div>
                {/* Sold out badge */}
                <div className="absolute bottom-8 right-8">
                  <div style={{ backgroundColor: "#5BC2E7", padding: "8px 18px" }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#ffffff", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}>
                      {project.result}
                    </p>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div
                className="flex flex-col justify-center px-10 lg:px-16 py-16"
                style={{ backgroundColor: i % 2 === 1 ? "#FBF9F3" : "#ffffff" }}
              >
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#5BC2E7", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "16px" }}>
                  {project.suburb} — {project.type}
                </p>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 4vw, 3.6rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.0, marginBottom: "24px" }}>
                  {project.name}
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.85, maxWidth: "46ch", marginBottom: "40px" }}>
                  {project.desc}
                </p>

                {/* Stats row */}
                <div className="flex gap-0 flex-wrap" style={{ borderTop: "1px solid #E8E5DF" }}>
                  {project.stats.map((s, si) => (
                    <div key={s.label} style={{ padding: "20px 28px 20px 0", paddingLeft: si > 0 ? "28px" : "0", borderLeft: si > 0 ? "1px solid #E8E5DF" : "none" }}>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.value}</p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "5px" }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </section>

      {/* ── Full-bleed quote ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "400px", backgroundColor: "#0D3348" }}>
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&h=600&fit=crop&q=60"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%", opacity: 0.1 }}
        />
        <div className="relative max-w-screen-2xl mx-auto px-6 sm:px-10 py-24 flex items-center" style={{ minHeight: "400px" }}>
          <FadeUp>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3.5vw, 3rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.3, maxWidth: "28ch", marginBottom: "24px" }}>
              "Spinelli delivered a complete sell-out of our 12-townhouse Thirroul project in under six weeks — before the display suite even opened."
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Private Developer — Thirroul, NSW
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <FadeUp className="mb-16">
            <span className="label-tag">What We Offer</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Full-Service<br />Project Marketing
            </h2>
          </FadeUp>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {services.map((s, i) => (
              <FadeUp key={s.n} delay={i * 60}>
                <div style={{ padding: "28px 24px", borderLeft: "1px solid #E8E5DF", borderTop: i >= 4 ? "1px solid #E8E5DF" : "none", height: "100%" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 300, color: "#5BC2E7", letterSpacing: "-0.04em", lineHeight: 1, opacity: 0.4, marginBottom: "16px" }}>{s.n}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000", fontWeight: 500, marginBottom: "6px" }}>{s.title}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#7a7265", lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-24" style={{ backgroundColor: "#FBF9F3" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <FadeUp className="mb-16">
            <span className="label-tag">How We Work</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Six Steps to<br />Sell-Out
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {process.map((step, i) => (
              <FadeUp key={step.n} delay={i * 80}>
                <div style={{ padding: "36px 32px", borderTop: "1px solid #DAD7CE", borderLeft: i % 3 !== 0 ? "1px solid #DAD7CE" : "none", height: "100%" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "3.5rem", fontWeight: 300, color: "#5BC2E7", letterSpacing: "-0.05em", lineHeight: 1, opacity: 0.3, marginBottom: "24px" }}>{step.n}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000", fontWeight: 600, marginBottom: "8px", letterSpacing: "0.02em" }}>{step.title}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Spinelli ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "96px 0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeUp>
              <span className="label-tag">Why Spinelli</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "32px" }}>
                The Illawarra<br />Advantage
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.85, maxWidth: "44ch" }}>
                While others operate across multiple markets, we go deep in one. Twenty years of relationships, buyer data and local knowledge means your project reaches the right buyers first — and sells faster.
              </p>
            </FadeUp>
            <FadeUp delay={120}>
              <div className="flex flex-col gap-0">
                {[
                  { title: "Illawarra-Only Focus",    desc: "Undivided attention in one market — not split across the state." },
                  { title: "Pre-Qualified Database",  desc: "Thousands of active buyers ready to move right now." },
                  { title: "Senior Agent on Every Deal", desc: "No juniors. Your project gets experienced hands." },
                  { title: "Transparent Reporting",   desc: "Weekly data — enquiry, traffic, conversion. No surprises." },
                ].map((item, i) => (
                  <div key={item.title} className="flex items-start gap-6 py-6" style={{ borderTop: "1px solid #E8E5DF" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "#5BC2E7", opacity: 0.5, fontWeight: 300, flexShrink: 0, marginTop: "2px" }}>0{i + 1}</span>
                    <div>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#000000", fontWeight: 600, marginBottom: "4px" }}>{item.title}</p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.65 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D3348", minHeight: "420px" }}>
        <div className="relative max-w-screen-2xl mx-auto px-6 sm:px-10 py-24 flex flex-col justify-center" style={{ minHeight: "420px" }}>
          <FadeUp>
            <span className="label-tag-light">Developer Enquiry</span>
            <h2 className="mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 5rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.0 }}>
              Ready to Launch<br />Your Project?
            </h2>
            <p className="mb-10" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: "44ch" }}>
              Site in planning, project ready to launch, or looking for your next acquisition — all enquiries are strictly confidential.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact?type=developer" className="inline-block px-8 py-4 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85" style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}>
                Talk to Our Projects Team
              </Link>
              <a href="tel:0242960047" className="inline-block px-8 py-4 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-70" style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-sans)" }}>
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
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);
  return (
    <>
      <p className="label-tag-light mb-5" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s" }}>
        Project Marketing
      </p>
      <h1 className="mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 8vw, 8rem)", lineHeight: 0.92, letterSpacing: "-0.04em", color: "#ffffff", fontWeight: 300, maxWidth: "14ch", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s" }}>
        Built for<br />Developers
      </h1>
      <p style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)", fontSize: "14px", maxWidth: "40ch", lineHeight: 1.75, marginBottom: "36px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s" }}>
        End-to-end project marketing, off-the-plan sales and site identification — from feasibility through to final settlement.
      </p>
      <div className="flex flex-wrap gap-4" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s" }}>
        <Link href="/contact?type=developer" className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85" style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}>
          Talk to Our Team
        </Link>
        <a href="tel:0242960047" className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-70" style={{ border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-sans)" }}>
          02 4296 0047
        </a>
      </div>
    </>
  );
}
