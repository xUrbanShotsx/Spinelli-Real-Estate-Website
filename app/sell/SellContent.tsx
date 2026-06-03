"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ── Animated counter ─────────────────────────────────── */
function AnimatedStat({ target, suffix, duration = 1800 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const timer = setInterval(() => {
          const progress = Math.min((Date.now() - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress >= 1) { setCount(target); clearInterval(timer); }
        }, 16);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Icons ────────────────────────────────────────────── */
function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const s = { width: size, height: size };
  switch (name) {
    case "pin":      return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={s}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;
    case "camera":   return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={s}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;
    case "chart":    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={s}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>;
    case "eye":      return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={s}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>;
    case "handshake":return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={s}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;
    case "star":     return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={s}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>;
    case "doc":      return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={s}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>;
    default:         return null;
  }
}

/* ── Data ─────────────────────────────────────────────── */
const stats = [
  { target: 12,  suffix: "+", label: "Years in the Illawarra" },
  { target: 94,  suffix: "%", label: "List-to-Sale Ratio" },
  { target: 28,  suffix: "d", label: "Avg. Days on Market" },
  { target: 5,   suffix: "★", label: "Vendor Satisfaction" },
];

const process = [
  { title: "Free Appraisal",    desc: "We assess your property against live market conditions and provide an honest, strategic price guide — no obligation, no pressure. We'll tell you exactly what your home is worth and how to maximise it." },
  { title: "Tailored Campaign", desc: "Premium photography, drone footage, feature listings on realestate.com.au and Domain, plus a bespoke digital marketing strategy built specifically around your home and target buyer." },
  { title: "Expert Negotiation",desc: "We create genuine buyer competition, qualify every enquiry and negotiate hard on your behalf. Our track record speaks for itself — consistently above-reserve results across the Illawarra." },
  { title: "Smooth Settlement", desc: "From exchange to handover, we coordinate with your solicitor, the buyer's agent and all parties to make sure settlement is stress-free and on time." },
];

const whyUs = [
  { icon: "pin",       title: "12+ Years Local Knowledge",   desc: "Deep Illawarra expertise across every suburb, price point and property type. We know this market better than anyone." },
  { icon: "camera",    title: "Premium Marketing",           desc: "Professional photography, drone footage, feature listings and targeted digital campaigns — every property deserves to look its best." },
  { icon: "chart",     title: "Proven Results",              desc: "Consistent above-reserve outcomes, short days-on-market and a 94% list-to-sale ratio — our numbers back up our promises." },
  { icon: "eye",       title: "Full Transparency",           desc: "Honest advice, clear communication and no hidden fees — at every stage. You'll always know exactly where things stand." },
  { icon: "handshake", title: "Expert Negotiation",          desc: "We create competition, qualify every buyer and negotiate hard to achieve the strongest possible price for your home." },
  { icon: "doc",       title: "Stress-Free Process",         desc: "From appraisal to settlement, we handle every detail and keep you informed — so you can focus on your next chapter." },
];

/* ── Main component ───────────────────────────────────── */
export default function SellContent() {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <>
      {/* ── Opening ── */}
      <section style={{ backgroundColor: "#5BC2E7", paddingTop: "140px", paddingBottom: "80px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-end">
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", display: "block", marginBottom: "20px" }}>
                Sell With Spinelli
              </span>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 7vw, 6rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 0.95 }}>
                Achieve More<br />For Your Home
              </h1>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.9)", lineHeight: 1.85, marginBottom: "32px" }}>
                Selling your home is one of the biggest decisions you'll make. We bring local expertise, premium marketing and relentless negotiation to make sure you get the result you deserve.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact?type=appraisal"
                  className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#ffffff", color: "#0D3348", fontFamily: "var(--font-sans)" }}>
                  Book a Free Appraisal
                </Link>
                <Link href="/sold"
                  className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-70"
                  style={{ border: "1px solid rgba(255,255,255,0.5)", color: "#ffffff", fontFamily: "var(--font-sans)" }}>
                  View Recent Results
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Animated Stats ── */}
      <section style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #E8E5DF" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className="py-12 px-6 flex flex-col gap-2" style={{ borderLeft: i > 0 ? "1px solid #E8E5DF" : "none" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1 }}>
                  <AnimatedStat target={s.target} suffix={s.suffix} />
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive Process ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "96px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="mb-14">
            <span className="label-tag">The Process</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              How We Sell<br />Your Home
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {process.map((p, i) => (
              <button key={p.title} onClick={() => setActiveStep(i)} className="text-left transition-all"
                style={{ padding: "20px", border: activeStep === i ? "1px solid #5BC2E7" : "1px solid #E8E5DF", backgroundColor: activeStep === i ? "#5BC2E7" : "#ffffff", cursor: "pointer" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 300, color: activeStep === i ? "rgba(255,255,255,0.4)" : "#E8E5DF", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "10px" }}>0{i + 1}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: activeStep === i ? "#ffffff" : "#000000", letterSpacing: "0.02em" }}>{p.title}</p>
              </button>
            ))}
          </div>

          <div style={{ backgroundColor: "#ffffff", border: "1px solid #E8E5DF", padding: "36px 40px" }}>
            <div className="flex items-start gap-6">
              <p style={{ fontFamily: "var(--font-display)", fontSize: "3.5rem", fontWeight: 300, color: "#5BC2E7", letterSpacing: "-0.05em", lineHeight: 1, opacity: 0.25, flexShrink: 0 }}>
                0{activeStep + 1}
              </p>
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 700, color: "#000000", marginBottom: "10px" }}>
                  {process[activeStep].title}
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.85, maxWidth: "60ch" }}>
                  {process[activeStep].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Spinelli hover cards ── */}
      <section style={{ backgroundColor: "#F8FAFC", borderTop: "1px solid #E8E5DF", padding: "96px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="mb-14">
            <span className="label-tag">Why Spinelli</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              The Spinelli<br />Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyUs.map((item, i) => {
              const hovered = hoveredCard === i;
              return (
                <div key={item.title}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ padding: "32px 28px", border: hovered ? "1px solid #5BC2E7" : "1px solid #E8E5DF", backgroundColor: hovered ? "#5BC2E7" : "#ffffff", transition: "all 0.2s ease", cursor: "default" }}>
                  <div style={{ color: hovered ? "#ffffff" : "#5BC2E7", marginBottom: "16px", transition: "color 0.2s" }}>
                    <Icon name={item.icon} size={24} />
                  </div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 700, color: hovered ? "#ffffff" : "#000000", marginBottom: "10px", transition: "color 0.2s" }}>
                    {item.title}
                  </p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: hovered ? "rgba(255,255,255,0.85)" : "#7a7265", lineHeight: 1.8, transition: "color 0.2s" }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Marketing showcase ── */}
      <section style={{ backgroundColor: "#ffffff", borderTop: "1px solid #E8E5DF", padding: "96px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="mb-14">
            <span className="label-tag">Our Marketing</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              Presented to<br />Impress Buyers
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.85, maxWidth: "56ch", marginTop: "20px" }}>
              First impressions are everything. We invest in professional photography, interior styling shots and drone aerial footage to make your property stand out — online and at inspection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Frame 1 — Front shot */}
            <div>
              <div style={{ position: "relative", aspectRatio: "4/3", backgroundColor: "#F0EDE8", overflow: "hidden" }}>
                {/* Replace src below with your front exterior photo */}
                <img
                  src="/marketing-front.jpg"
                  alt="Property front shot"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                {/* Placeholder shown when no image is present */}
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="#C8C3BA" strokeWidth={1} style={{ width: 40, height: 40 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#C8C3BA", letterSpacing: "0.1em", textTransform: "uppercase" }}>Front Shot</p>
                </div>
              </div>
              <div style={{ paddingTop: "14px" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 700, color: "#000000", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "4px" }}>Exterior Photography</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#7a7265", lineHeight: 1.7 }}>Professional front-of-property shots that create an immediate, lasting first impression online and in print.</p>
              </div>
            </div>

            {/* Frame 2 — Internal */}
            <div>
              <div style={{ position: "relative", aspectRatio: "4/3", backgroundColor: "#F0EDE8", overflow: "hidden" }}>
                {/* Replace src below with your interior photo */}
                <img
                  src="/marketing-interior.jpg"
                  alt="Property interior"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="#C8C3BA" strokeWidth={1} style={{ width: 40, height: 40 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#C8C3BA", letterSpacing: "0.1em", textTransform: "uppercase" }}>Internal Shot</p>
                </div>
              </div>
              <div style={{ paddingTop: "14px" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 700, color: "#000000", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "4px" }}>Interior Photography</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#7a7265", lineHeight: 1.7 }}>Wide-angle, naturally lit interior shots that showcase space, flow and lifestyle — making buyers picture themselves at home.</p>
              </div>
            </div>

            {/* Frame 3 — Drone */}
            <div>
              <div style={{ position: "relative", aspectRatio: "4/3", backgroundColor: "#F0EDE8", overflow: "hidden" }}>
                {/* Replace src below with your drone photo */}
                <img
                  src="/marketing-drone.jpg"
                  alt="Drone aerial shot"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="#C8C3BA" strokeWidth={1} style={{ width: 40, height: 40 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#C8C3BA", letterSpacing: "0.1em", textTransform: "uppercase" }}>Drone Shot</p>
                </div>
              </div>
              <div style={{ paddingTop: "14px" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 700, color: "#000000", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "4px" }}>Drone Aerial Footage</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#7a7265", lineHeight: 1.7 }}>Aerial perspectives reveal land size, surroundings and proximity to beaches, parks and lifestyle amenities no ground shot can capture.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "96px 0", borderTop: "1px solid #E8E5DF" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ fontFamily: "var(--font-display)", fontSize: "5rem", color: "#5BC2E7", lineHeight: 0.7, opacity: 0.3, marginBottom: "1.5rem" }}>&ldquo;</p>
          <blockquote style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1.4, marginBottom: "2rem" }}>
            From our first conversation to the final closing, Adam was professional, knowledgeable, and always one step ahead.
          </blockquote>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Nathan F — Seller
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "#5BC2E7", padding: "96px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", display: "block", marginBottom: "20px" }}>
                Start Today
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.0 }}>
                Ready to Sell<br />Your Home?
              </h2>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.9)", lineHeight: 1.85, maxWidth: "44ch", marginBottom: "36px" }}>
                Book a confidential, obligation-free appraisal and find out exactly what your property could achieve in today's market.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact?type=appraisal"
                  className="inline-block px-8 py-4 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#ffffff", color: "#0D3348", fontFamily: "var(--font-sans)" }}>
                  Book a Free Appraisal
                </Link>
                <a href="tel:0242960047"
                  className="inline-block px-8 py-4 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-70"
                  style={{ border: "1px solid rgba(255,255,255,0.5)", color: "#ffffff", fontFamily: "var(--font-sans)" }}>
                  02 4296 0047
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
