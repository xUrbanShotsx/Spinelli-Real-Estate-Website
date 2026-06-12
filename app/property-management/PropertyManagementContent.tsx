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
  { num: "01", title: "Rigorous Tenant Selection",     desc: "We don't just fill your property — we find the right tenant. Every applicant undergoes thorough credit checks, employment verification, rental history and personal reference checks before we recommend them to you." },
  { num: "02", title: "Rent Collection & Arrears",     desc: "Automated rent collection with zero-tolerance arrears management. Owners receive real-time updates and we act immediately at first sign of delay — protecting your cash flow at all times." },
  { num: "03", title: "Routine Inspections",           desc: "Regular entry condition, routine and exit inspections with detailed written reports and photographs. You'll always know the condition of your property and we flag issues before they become costly." },
  { num: "04", title: "Maintenance Coordination",      desc: "Our network of vetted, licensed and insured tradespeople respond promptly to all maintenance requests. We get competitive quotes, oversee the work and keep you informed every step of the way." },
  { num: "05", title: "Lease & Rent Review",           desc: "We proactively review rents against current market conditions and handle all lease renewals, rent increases and documentation — ensuring your property keeps pace with the Illawarra market." },
  { num: "06", title: "Transparent Financial Reports", desc: "Monthly owner statements, annual tax summaries and a full breakdown of income and expenditure. Everything you need for your accountant, in one clear, easy-to-read report." },
];

const commercialServices = [
  { num: "01", title: "Lease Administration",       desc: "Full management of all lease terms, critical dates, rent reviews, options, make-good provisions and lease renewals — so nothing slips through the cracks." },
  { num: "02", title: "Outgoings & Reconciliations", desc: "Accurate budgeting, monthly outgoings collection and year-end reconciliations managed to the letter of the lease — protecting you from disputes and maximising recovery." },
  { num: "03", title: "Tenant Retention",           desc: "We build strong tenant relationships to retain high-quality, long-term occupants. A vacant commercial property costs far more than proactive tenant management." },
  { num: "04", title: "Proactive Maintenance",      desc: "Planned preventative maintenance schedules to protect your asset value, minimise emergency repairs and meet all landlord obligations." },
  { num: "05", title: "Statutory Compliance",       desc: "OHS, fire safety, lift servicing, essential services and all statutory requirements managed — so your asset stays compliant and your liability stays minimal." },
  { num: "06", title: "Detailed Financial Reports", desc: "Monthly income and expenditure reports with budget-versus-actual variance analysis — giving you a complete picture of your commercial asset's performance." },
];

const process = [
  { num: "01", title: "Free Appraisal",     desc: "We assess your property, provide a current market rental appraisal and outline exactly how we'll maximise your return — no obligation, no pressure." },
  { num: "02", title: "Onboarding",         desc: "We handle every detail of the handover — keys, condition reports, tenant communication and all paperwork. Stress-free from day one." },
  { num: "03", title: "Tenant Marketing",   desc: "Professional photography, premium listings on realestate.com.au and Domain, plus targeted local marketing to find the right tenant fast." },
  { num: "04", title: "Ongoing Management", desc: "From rent collection and inspections to maintenance and reporting — we manage every aspect of your property so you don't have to." },
];

const whyUs = [
  { title: "A Team Behind You",       desc: "Every member of our team knows your property and goals — you're always looked after, no matter who picks up the phone." },
  { title: "Local Market Experts",    desc: "12+ years in the Illawarra. We know the suburbs, the rental demand and what drives premium returns in this market." },
  { title: "Proactive, Not Reactive", desc: "Early rent reviews, routine inspections and preventative maintenance mean small issues never become expensive ones." },
  { title: "24/7 Emergency Line",     desc: "Tenants can reach our emergency maintenance line around the clock. You'll never lose sleep over a burst pipe at 2am." },
  { title: "Vetted Trades Network",   desc: "Licensed, insured tradespeople. Competitive quotes. Quality work. We oversee everything so you don't have to." },
  { title: "No Lock-In Contracts",    desc: "We earn your business every day. Our management agreements are straightforward — if we're not delivering, you're free to leave." },
];

/* ── Main component ───────────────────────────────────── */
export default function PropertyManagementContent() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredWhy, setHoveredWhy] = useState<number | null>(null);

  const services = activeTab === "residential" ? residentialServices : commercialServices;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex items-end" style={{ minHeight: "100vh" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/PropertyManage.JPG"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,51,72,0.95) 0%, rgba(13,51,72,0.6) 50%, rgba(0,0,0,0.15) 100%)" }} />
        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pb-20">
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "20px" }}>
            Property Management
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              color: "#ffffff",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              marginBottom: "28px",
              maxWidth: "16ch",
            }}
          >
            Your Investment.<br />Our Priority.
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.65)", lineHeight: 1.85, maxWidth: "48ch", marginBottom: "36px" }}>
            For over 12 years, Spinelli Real Estate has been the Illawarra&apos;s most trusted property management team. We protect your investment, secure great tenants and maximise your returns.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/appraisal"
              className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              Get a Free Appraisal
            </Link>
            <a
              href="tel:0242960047"
              className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-70"
              style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#ffffff", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              02 4296 0047
            </a>
          </div>
        </div>
      </section>


      {/* ── Services ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "100px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">

          {/* Header + tab switcher */}
          <div
            className="flex flex-wrap items-end justify-between gap-6 pb-10 mb-2"
            style={{ borderBottom: "1px solid #E8E5DF" }}
          >
            <div>
              <span className="label-tag">Our Services</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                What We Manage
              </h2>
            </div>
            <div style={{ display: "flex", border: "1px solid #E8E5DF", overflow: "hidden" }}>
              {(["residential", "commercial"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setExpandedService(null); }}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "capitalize",
                    padding: "10px 24px",
                    backgroundColor: activeTab === tab ? "#000000" : "#ffffff",
                    color: activeTab === tab ? "#ffffff" : "#7a7265",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Services as editorial rows */}
          <div>
            {services.map((s, i) => {
              const isOpen = expandedService === i;
              return (
                <button
                  key={s.num}
                  onClick={() => setExpandedService(isOpen ? null : i)}
                  className="w-full text-left"
                  style={{
                    borderBottom: "1px solid #E8E5DF",
                    padding: "0",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  <div
                    className="grid md:grid-cols-[80px_1fr_auto] gap-6 md:gap-12 items-center py-6"
                    style={{ transition: "opacity 0.2s" }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                        color: "#5BC2E7",
                        fontWeight: 300,
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                        opacity: isOpen ? 1 : 0.4,
                        transition: "opacity 0.2s",
                      }}
                    >
                      {s.num}
                    </span>
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                          color: "#000000",
                          fontWeight: 300,
                          letterSpacing: "-0.02em",
                          marginBottom: isOpen ? "10px" : "0",
                          transition: "margin 0.3s",
                        }}
                      >
                        {s.title}
                      </h3>
                      <div
                        style={{
                          maxHeight: isOpen ? "120px" : "0",
                          overflow: "hidden",
                          transition: "max-height 0.4s ease",
                        }}
                      >
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.85 }}>
                          {s.desc}
                        </p>
                      </div>
                    </div>
                    <svg
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                      style={{
                        width: "18px", height: "18px", flexShrink: 0, color: "#a2b0aa",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.25s ease",
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Full-bleed pull quote ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D3348", padding: "80px 0" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&h=500&fit=crop&q=60"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.07 }}
        />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "32px" }} />
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
              color: "#ffffff",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              maxWidth: "34ch",
              marginBottom: "32px",
            }}
          >
            A well-managed property is the difference between a stress-free investment and a costly headache.
          </p>
          <Link
            href="/appraisal"
            className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
            style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            Book a Free Appraisal
          </Link>
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "100px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div
            className="flex flex-wrap items-end justify-between gap-4 pb-10 mb-2"
            style={{ borderBottom: "1px solid #E8E5DF" }}
          >
            <div>
              <span className="label-tag">How It Works</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                Getting Started is Simple
              </h2>
            </div>
          </div>

          {/* Step buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 mb-8">
            {process.map((p, i) => (
              <button
                key={p.num}
                onClick={() => setActiveStep(i)}
                style={{
                  padding: "24px 20px",
                  textAlign: "left",
                  border: activeStep === i ? "1px solid #5BC2E7" : "1px solid #E8E5DF",
                  backgroundColor: activeStep === i ? "#5BC2E7" : "#ffffff",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.8rem",
                    fontWeight: 300,
                    color: activeStep === i ? "rgba(255,255,255,0.35)" : "#E8E5DF",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    marginBottom: "12px",
                  }}
                >
                  {p.num}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: activeStep === i ? "#ffffff" : "#000000",
                    letterSpacing: "0.02em",
                    transition: "color 0.2s",
                  }}
                >
                  {p.title}
                </p>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #E8E5DF", padding: "40px 44px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "28px" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "4rem",
                  fontWeight: 300,
                  color: "#5BC2E7",
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  opacity: 0.2,
                  flexShrink: 0,
                }}
              >
                {process[activeStep].num}
              </span>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "12px" }}>
                  {process[activeStep].title}
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.85, maxWidth: "60ch" }}>
                  {process[activeStep].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Spinelli ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "100px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div
            className="flex flex-wrap items-end justify-between gap-4 pb-10 mb-12"
            style={{ borderBottom: "1px solid #E8E5DF" }}
          >
            <div>
              <span className="label-tag">Why Choose Us</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                The Illawarra&apos;s Most Trusted<br />Property Managers
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {whyUs.map((item, i) => {
              const isHovered = hoveredWhy === i;
              const isDimmed = hoveredWhy !== null && !isHovered;
              return (
                <div
                  key={item.title}
                  onMouseEnter={() => setHoveredWhy(i)}
                  onMouseLeave={() => setHoveredWhy(null)}
                  style={{
                    padding: "36px 32px",
                    borderBottom: i < 3 ? "1px solid #E8E5DF" : "none",
                    borderRight: i % 3 !== 2 ? "1px solid #E8E5DF" : "none",
                    transition: "all 0.25s ease",
                    opacity: isDimmed ? 0.3 : 1,
                    backgroundColor: isHovered ? "#5BC2E7" : "#ffffff",
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "2px",
                      backgroundColor: isHovered ? "#ffffff" : "#5BC2E7",
                      marginBottom: "20px",
                      transition: "all 0.25s ease",
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.15rem",
                      color: isHovered ? "#ffffff" : "#000000",
                      fontWeight: 300,
                      letterSpacing: "-0.02em",
                      marginBottom: "10px",
                      transition: "color 0.25s",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      color: isHovered ? "rgba(255,255,255,0.85)" : "#7a7265",
                      lineHeight: 1.8,
                      transition: "color 0.25s",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "#0D3348", padding: "100px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "20px" }}>
                Get Started Today
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                  color: "#ffffff",
                  fontWeight: 300,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.0,
                }}
              >
                Ready for the<br />Next Steps?
              </h2>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.85, maxWidth: "44ch", marginBottom: "36px" }}>
                Whether you have one investment property or an entire portfolio — our team will provide a free, no-obligation appraisal and show you exactly how we&apos;ll grow and protect your investment.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/appraisal"
                  className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  Get a Free PM Appraisal
                </Link>
                <a
                  href="tel:0242960047"
                  className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-70"
                  style={{ border: "1px solid rgba(255,255,255,0.25)", color: "#ffffff", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
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
