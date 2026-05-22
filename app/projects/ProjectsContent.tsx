"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

/* ── Shared animation hook ── */
function useReveal(threshold = 0.15) {
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

/* ── Count-up hook ── */
function useCountUp(target: number, decimals: number, active: boolean, duration = 1400) {
  const [current, setCurrent] = useState(0);
  const raf = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);
  useEffect(() => {
    if (!active) return;
    startTime.current = null;
    const step = (ts: number) => {
      if (!startTime.current) startTime.current = ts;
      const progress = Math.min((ts - startTime.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) raf.current = requestAnimationFrame(step);
      else setCurrent(target);
    };
    raf.current = requestAnimationFrame(step);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [active, target, decimals, duration]);
  return current;
}

/* ── Fade-up wrapper ── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Stat counter ── */
function StatCounter({ prefix, value, decimals, suffix, label, index }: {
  prefix: string; value: number; decimals: number; suffix: string; label: string; index: number;
}) {
  const { ref, visible } = useReveal(0.3);
  const [delayed, setDelayed] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setDelayed(true), index * 120);
    return () => clearTimeout(t);
  }, [visible, index]);
  const count = useCountUp(value, decimals, delayed);
  return (
    <div
      ref={ref}
      style={{
        opacity: delayed ? 1 : 0,
        transform: delayed ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        borderLeft: index === 0 ? "none" : "1px solid rgba(255,255,255,0.12)",
        padding: "0 40px",
      }}
    >
      <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 4vw, 3.6rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
        {prefix}{count.toFixed(decimals)}{suffix}
      </p>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "8px" }}>
        {label}
      </p>
    </div>
  );
}

const services = [
  { n: "01", title: "Project Marketing",      desc: "Brand, photography, digital campaigns and launch events." },
  { n: "02", title: "Off-the-Plan Sales",     desc: "From registration through contract to settlement." },
  { n: "03", title: "Site Identification",    desc: "Off-market sites presented before public listing." },
  { n: "04", title: "Pricing Strategy",       desc: "Product mix, price points and release order." },
  { n: "05", title: "Buyer Database",         desc: "Pre-qualified owner-occupiers and investors, ready now." },
  { n: "06", title: "Display Suites",         desc: "Staffed, managed and open seven days." },
  { n: "07", title: "Settlement Support",     desc: "Protecting contracts through to final handover." },
  { n: "08", title: "Developer Advisory",     desc: "Feasibility input before a dollar is committed." },
];

const process = [
  { n: "01", title: "Consultation",   desc: "Obligation-free. Confidential. No commitment required." },
  { n: "02", title: "Strategy",       desc: "Market research, product mix and pricing advice." },
  { n: "03", title: "Campaign",       desc: "Brand, photography, renders and digital assets." },
  { n: "04", title: "Pre-Launch",     desc: "VIP previews and database outreach before public release." },
  { n: "05", title: "Launch",         desc: "Multi-channel campaign driving qualified enquiry." },
  { n: "06", title: "Settlement",     desc: "Contract management and buyer support to completion." },
];

const stats = [
  { prefix: "", value: 50,  decimals: 0, suffix: "+",  label: "Projects Delivered" },
  { prefix: "$", value: 380, decimals: 0, suffix: "M+", label: "In Project Sales"   },
  { prefix: "", value: 6,   decimals: 0, suffix: "wk", label: "Avg Time to Sell-Out" },
  { prefix: "", value: 20,  decimals: 0, suffix: "+",  label: "Years Local Expertise" },
];

export default function ProjectsContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative" style={{ height: "100svh", minHeight: "600px" }}>
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&h=1000&fit=crop&q=85"
          alt="Project marketing Illawarra"
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.05) 100%)" }} />

        {/* Animated hero text */}
        <div className="absolute inset-0 flex flex-col justify-end pb-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto left-0 right-0">
          <HeroText />
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ backgroundColor: "#0D3348", padding: "56px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="flex flex-wrap justify-between gap-y-10">
            {stats.map((s, i) => (
              <StatCounter key={s.label} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <FadeUp className="mb-16">
            <span className="label-tag">What We Offer</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Full-Service<br />Project Marketing
            </h2>
          </FadeUp>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {services.map((s, i) => (
              <FadeUp key={s.n} delay={i * 60}>
                <div
                  style={{
                    padding: "28px 24px",
                    borderLeft: "1px solid #E8E5DF",
                    borderTop: i >= 4 ? "1px solid #E8E5DF" : "none",
                    height: "100%",
                  }}
                >
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 300, color: "#5BC2E7", letterSpacing: "-0.04em", lineHeight: 1, opacity: 0.4, marginBottom: "16px" }}>
                    {s.n}
                  </p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000", fontWeight: 500, marginBottom: "6px" }}>
                    {s.title}
                  </p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#7a7265", lineHeight: 1.65 }}>
                    {s.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Site Finding — full-bleed split ── */}
      <section style={{ backgroundColor: "#FBF9F3" }}>
        <div className="grid lg:grid-cols-2">
          <div className="relative order-last lg:order-first" style={{ minHeight: "480px" }}>
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&h=800&fit=crop&q=85"
              alt="Site identification"
              className="absolute inset-0 object-cover"
              style={{ width: "100%", height: "100%" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)" }} />
            <FadeUp className="absolute bottom-8 left-8">
              <div style={{ backgroundColor: "#ffffff", padding: "20px 24px", maxWidth: "220px" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "4px" }}>
                  Off-Market
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Sites before public listing
                </p>
              </div>
            </FadeUp>
          </div>

          <div className="px-6 sm:px-12 lg:px-16 py-20 flex flex-col justify-center">
            <FadeUp>
              <span className="label-tag">Site Identification</span>
              <h2 className="mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                We Find the<br />Right Sites
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.8, maxWidth: "42ch", marginBottom: "32px" }}>
                Our owner and agent network gives developers access to sites before they hit the open market — reducing competition and improving acquisition economics.
              </p>
            </FadeUp>

            <div className="grid grid-cols-2 gap-0">
              {[
                "Rezoned Residential Land",
                "Amalgamation Opportunities",
                "Infill & Oversized Blocks",
                "DA-Approved Sites",
                "Commercial Conversions",
                "Growth Corridor Precincts",
              ].map((t, i) => (
                <FadeUp key={t} delay={i * 70}>
                  <div style={{ borderTop: "1px solid #DAD7CE", padding: "14px 0", paddingRight: "16px", borderLeft: i % 2 === 1 ? "1px solid #DAD7CE" : "none", paddingLeft: i % 2 === 1 ? "16px" : "0" }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#000000", fontWeight: 500 }}>{t}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <FadeUp className="mb-16">
            <span className="label-tag">How We Work</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Six Steps to<br />Sell-Out
            </h2>
          </FadeUp>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-0">
            {process.map((step, i) => (
              <FadeUp key={step.n} delay={i * 80}>
                <div style={{ padding: "32px 28px", borderLeft: "1px solid #E8E5DF", borderTop: i >= 2 ? "1px solid #E8E5DF" : i >= 3 ? "1px solid #E8E5DF" : "none", height: "100%" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: 300, color: "#5BC2E7", letterSpacing: "-0.04em", lineHeight: 1, opacity: 0.45, marginBottom: "20px" }}>
                    {step.n}
                  </p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000", fontWeight: 500, marginBottom: "6px" }}>
                    {step.title}
                  </p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#7a7265", lineHeight: 1.65 }}>
                    {step.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Developer quote ── */}
      <section style={{ backgroundColor: "#FBF9F3", padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.4, marginBottom: "20px" }}>
                "Spinelli delivered a complete sell-out of our 12-townhouse Thirroul project in under six weeks — before the display suite even opened."
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Private Developer — Thirroul
              </p>
            </FadeUp>

            <FadeUp delay={120}>
              <div className="flex flex-col gap-4">
                {[
                  { title: "Illawarra-Only Focus",   desc: "Undivided attention in one market." },
                  { title: "Pre-Qualified Database",  desc: "Thousands of active buyers, ready to move." },
                  { title: "Boutique Attention",      desc: "Senior agents on every enquiry and contract." },
                  { title: "Transparent Reporting",   desc: "Weekly data — no surprises, ever." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 py-4" style={{ borderTop: "1px solid #E8E5DF" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#5BC2E7", flexShrink: 0, marginTop: "5px" }} />
                    <div>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000", fontWeight: 500 }}>{item.title}</p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#7a7265" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D3348" }}>
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&h=500&fit=crop&q=60"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%", opacity: 0.07 }}
        />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <span className="label-tag-light">Developer Enquiry</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                Ready to Launch<br />Your Project?
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="mb-8" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: "42ch" }}>
                Site in planning, project ready to launch, or looking for your next acquisition — all enquiries are confidential.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact?type=developer" className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85" style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}>
                  Talk to Our Projects Team
                </Link>
                <a href="tel:0242960047" className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-70" style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-sans)" }}>
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

/* ── Hero text animates in on mount ── */
function HeroText() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <>
      <p
        className="label-tag-light mb-5"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s" }}
      >
        Project Marketing
      </p>
      <h1
        className="mb-6"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
          lineHeight: 0.92,
          letterSpacing: "-0.04em",
          color: "#ffffff",
          fontWeight: 300,
          maxWidth: "12ch",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s",
        }}
      >
        Built for<br />Developers
      </h1>
      <p
        style={{
          color: "rgba(255,255,255,0.55)",
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          maxWidth: "40ch",
          lineHeight: 1.75,
          marginBottom: "36px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s",
        }}
      >
        End-to-end project marketing, off-the-plan sales and site identification — from feasibility through to final settlement.
      </p>
      <div
        className="flex flex-wrap gap-4"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s" }}
      >
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
