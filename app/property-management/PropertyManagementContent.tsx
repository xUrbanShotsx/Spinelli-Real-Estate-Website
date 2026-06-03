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

/* ── Data ─────────────────────────────────────────────── */
const stats = [
  { target: 350, suffix: "+", label: "Properties Managed" },
  { target: 97,  suffix: "%", label: "Tenancy Rate" },
  { target: 8,   suffix: "d", label: "Avg. Days to Lease" },
  { target: 12,  suffix: "+", label: "Years Experience" },
];

const residentialServices = [
  { icon: "user",    title: "Rigorous Tenant Selection",      desc: "We don't just fill your property — we find the right tenant. Every applicant undergoes thorough credit checks, employment verification, rental history and personal reference checks before we recommend them to you." },
  { icon: "dollar",  title: "Rent Collection & Arrears",       desc: "Automated rent collection with zero-tolerance arrears management. Owners receive real-time updates and we act immediately at first sign of delay — protecting your cash flow at all times." },
  { icon: "eye",     title: "Routine Inspections",             desc: "Regular entry condition, routine and exit inspections with detailed written reports and photographs. You'll always know the condition of your property and we flag issues before they become costly." },
  { icon: "wrench",  title: "Maintenance Coordination",        desc: "Our network of vetted, licensed and insured tradespeople respond promptly to all maintenance requests. We get competitive quotes, oversee the work and keep you informed every step of the way." },
  { icon: "doc",     title: "Lease & Rent Review Management",  desc: "We proactively review rents against current market conditions and handle all lease renewals, rent increases and documentation — ensuring your property keeps pace with the Illawarra market." },
  { icon: "chart",   title: "Transparent Financial Reporting", desc: "Monthly owner statements, annual tax summaries and a full breakdown of income and expenditure. Everything you need for your accountant, in one clear, easy-to-read report." },
];

const commercialServices = [
  { icon: "doc",     title: "Lease Administration",         desc: "Full management of all lease terms, critical dates, rent reviews, options, make-good provisions and lease renewals — so nothing slips through the cracks." },
  { icon: "dollar",  title: "Outgoings & Reconciliations",  desc: "Accurate budgeting, monthly outgoings collection and year-end reconciliations managed to the letter of the lease — protecting you from disputes and maximising recovery." },
  { icon: "user",    title: "Tenant Retention",             desc: "We build strong tenant relationships to retain high-quality, long-term occupants. A vacant commercial property costs far more than proactive tenant management." },
  { icon: "wrench",  title: "Proactive Maintenance",        desc: "Planned preventative maintenance schedules to protect your asset value, minimise emergency repairs and meet all landlord obligations." },
  { icon: "shield",  title: "Statutory Compliance",         desc: "OHS, fire safety, lift servicing, essential services and all statutory requirements managed — so your asset stays compliant and your liability stays minimal." },
  { icon: "chart",   title: "Detailed Financial Reporting", desc: "Monthly income and expenditure reports with budget-versus-actual variance analysis — giving you a complete picture of your commercial asset's performance." },
];

const process = [
  { title: "Free Appraisal",    desc: "We assess your property, provide a current market rental appraisal and outline exactly how we'll maximise your return — no obligation, no pressure." },
  { title: "Onboarding",        desc: "We handle every detail of the handover — keys, condition reports, tenant communication and all paperwork. Stress-free from day one." },
  { title: "Tenant Marketing",  desc: "Professional photography, premium listings on realestate.com.au and Domain, plus targeted local marketing to find the right tenant fast." },
  { title: "Ongoing Management",desc: "From rent collection and inspections to maintenance and reporting — we manage every aspect of your property so you don't have to." },
];

const whyUs = [
  { icon: "team",    title: "A Team Behind You",        desc: "Every member of our team knows your property and goals — you're always looked after, no matter who picks up the phone." },
  { icon: "pin",     title: "Local Market Experts",     desc: "12+ years in the Illawarra. We know the suburbs, the rental demand and what drives premium returns in this market." },
  { icon: "bolt",    title: "Proactive, Not Reactive",  desc: "Early rent reviews, routine inspections and preventative maintenance mean small issues never become expensive ones." },
  { icon: "clock",   title: "24/7 Emergency Line",      desc: "Tenants can reach our emergency maintenance line around the clock. You'll never lose sleep over a burst pipe at 2am." },
  { icon: "wrench",  title: "Vetted Trades Network",    desc: "Licensed, insured tradespeople. Competitive quotes. Quality work. We oversee everything so you don't have to." },
  { icon: "scales",  title: "End-to-End Legal Support", desc: "Lease preparation, rent reviews, NCAT representation — our team handles every compliance obligation." },
];

/* ── Icons ────────────────────────────────────────────── */
function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const s = { width: size, height: size };
  switch (name) {
    case "user":   return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={s}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>;
    case "dollar": return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={s}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
    case "eye":    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={s}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>;
    case "wrench": return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={s}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;
    case "doc":    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={s}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>;
    case "chart":  return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={s}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>;
    case "shield": return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={s}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>;
    case "team":   return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={s}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;
    case "pin":    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={s}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;
    case "bolt":   return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={s}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>;
    case "clock":  return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={s}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
    case "scales": return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={s}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>;
    default:       return null;
  }
}

/* ── Main component ───────────────────────────────────── */
export default function PropertyManagementContent() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = activeTab === "residential" ? residentialServices : commercialServices;

  return (
    <>
      {/* ── Opening ── */}
      <section style={{ backgroundColor: "#5BC2E7", paddingTop: "140px", paddingBottom: "80px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-end">
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", display: "block", marginBottom: "20px" }}>
                Property Management
              </span>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 7vw, 6rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 0.95 }}>
                Your Investment.<br />Our Priority.
              </h1>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.9)", lineHeight: 1.85, marginBottom: "32px" }}>
                For over 12 years, Spinelli Real Estate has been the Illawarra's most trusted property management team. We protect your investment, secure great tenants and maximise your returns.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact?type=property-management"
                  className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#ffffff", color: "#0D3348", fontFamily: "var(--font-sans)" }}>
                  Get a Free Appraisal
                </Link>
                <a href="tel:0242960047"
                  className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-70"
                  style={{ border: "1px solid rgba(255,255,255,0.5)", color: "#ffffff", fontFamily: "var(--font-sans)" }}>
                  02 4296 0047
                </a>
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

      {/* ── Interactive Services ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "96px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">

          {/* Heading + tab switcher */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="label-tag">Our Services</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                What We Manage
              </h2>
            </div>
            <div className="flex" style={{ border: "1px solid #E8E5DF", overflow: "hidden" }}>
              {(["residential", "commercial"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setExpandedService(null); }}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    textTransform: "capitalize",
                    padding: "10px 24px",
                    backgroundColor: activeTab === tab ? "#0D3348" : "#ffffff",
                    color: activeTab === tab ? "#ffffff" : "#7a7265",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontWeight: activeTab === tab ? 500 : 400,
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion service cards */}
          <div className="grid sm:grid-cols-2 gap-3">
            {services.map((s, i) => {
              const isOpen = expandedService === i;
              return (
                <button
                  key={s.title}
                  onClick={() => setExpandedService(isOpen ? null : i)}
                  className="text-left w-full transition-all"
                  style={{
                    border: isOpen ? "1px solid #0D3348" : "1px solid #E8E5DF",
                    backgroundColor: isOpen ? "#0D3348" : "#ffffff",
                    padding: "24px 28px",
                    cursor: "pointer",
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div style={{ color: isOpen ? "#5BC2E7" : "#5BC2E7", flexShrink: 0, marginTop: "1px" }}>
                        <Icon name={s.icon} size={20} />
                      </div>
                      <div>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: isOpen ? "#ffffff" : "#000000", marginBottom: isOpen ? "10px" : "0", transition: "color 0.2s" }}>
                          {s.title}
                        </p>
                        {isOpen && (
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
                            {s.desc}
                          </p>
                        )}
                      </div>
                    </div>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                      style={{ width: "16px", height: "16px", flexShrink: 0, color: isOpen ? "rgba(255,255,255,0.5)" : "#a2b0aa", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s ease", marginTop: "2px" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Interactive Process ── */}
      <section style={{ backgroundColor: "#F8FAFC", padding: "96px 0", borderTop: "1px solid #E8E5DF" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="mb-14">
            <span className="label-tag">How It Works</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              Getting Started is Simple
            </h2>
          </div>

          {/* Step selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {process.map((p, i) => (
              <button
                key={p.title}
                onClick={() => setActiveStep(i)}
                className="text-left transition-all"
                style={{
                  padding: "20px 20px",
                  border: activeStep === i ? "1px solid #5BC2E7" : "1px solid #E8E5DF",
                  backgroundColor: activeStep === i ? "#5BC2E7" : "#ffffff",
                  cursor: "pointer",
                }}
              >
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 300, color: activeStep === i ? "rgba(255,255,255,0.4)" : "#E8E5DF", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "10px" }}>0{i + 1}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: activeStep === i ? "#ffffff" : "#000000", letterSpacing: "0.02em" }}>{p.title}</p>
              </button>
            ))}
          </div>

          {/* Active step detail */}
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #E8E5DF", padding: "36px 40px" }}>
            <div className="flex items-start gap-6">
              <p style={{ fontFamily: "var(--font-display)", fontSize: "3.5rem", fontWeight: 300, color: "#5BC2E7", letterSpacing: "-0.05em", lineHeight: 1, opacity: 0.25, flexShrink: 0 }}>
                0{activeStep + 1}
              </p>
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 700, color: "#000000", marginBottom: "10px", letterSpacing: "0.01em" }}>
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

      {/* ── Why Spinelli — hover cards ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "96px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="mb-14">
            <span className="label-tag">Why Choose Us</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              The Illawarra's Most Trusted<br />Property Managers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyUs.map((item, i) => {
              const hovered = hoveredCard === i;
              return (
                <div
                  key={item.title}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    padding: "32px 28px",
                    border: hovered ? "1px solid #5BC2E7" : "1px solid #E8E5DF",
                    backgroundColor: hovered ? "#5BC2E7" : "#ffffff",
                    transition: "all 0.2s ease",
                    cursor: "default",
                  }}
                >
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

      {/* ── Trust strip ── */}
      <section style={{ backgroundColor: "#F8FAFC", borderTop: "1px solid #E8E5DF", borderBottom: "1px solid #E8E5DF", padding: "64px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              { icon: "doc",    title: "No Lock-In Contracts",     desc: "We earn your business every day. Our management agreements are straightforward — if we're not delivering, you're free to leave." },
              { icon: "shield", title: "Fully Licensed & Insured",  desc: "Spinelli Real Estate holds all required NSW real estate licences. Your property and data are in fully compliant, professional hands." },
              { icon: "chart",  title: "Transparent Fee Structure", desc: "No hidden charges. Our fee schedule is clear, competitive and explained in full before we manage a single property for you." },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-4">
                <div style={{ color: "#5BC2E7" }}><Icon name={item.icon} size={22} /></div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 700, color: "#000000" }}>{item.title}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "#5BC2E7", padding: "96px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", display: "block", marginBottom: "20px" }}>
                Get Started Today
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.0 }}>
                Ready for the<br />Next Steps?
              </h2>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.9)", lineHeight: 1.85, maxWidth: "44ch", marginBottom: "36px" }}>
                Whether you have one investment property or an entire portfolio — our team will provide a free, no-obligation appraisal and show you exactly how we'll grow and protect your investment.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact?type=property-management"
                  className="inline-block px-8 py-4 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#ffffff", color: "#0D3348", fontFamily: "var(--font-sans)" }}>
                  Get a Free PM Appraisal
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
