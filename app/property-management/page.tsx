import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Property Management | Spinelli Real Estate",
  description:
    "Professional property management for residential and commercial properties across the Illawarra. Maximise your rental return with Spinelli Real Estate.",
};

const residential = [
  { n: "01", title: "Tenant Selection",    desc: "Rigorous screening — credit checks, employment verification and thorough reference checks." },
  { n: "02", title: "Rent Collection",     desc: "Reliable collection with automated arrears management and transparent owner reporting." },
  { n: "03", title: "Regular Inspections", desc: "Routine inspections with detailed reports, photographs and condition tracking." },
  { n: "04", title: "Maintenance",         desc: "Prompt coordination of repairs through our trusted, vetted trades network." },
  { n: "05", title: "Lease Management",    desc: "Renewals, rent reviews and full legal compliance — handled on your behalf." },
  { n: "06", title: "Financial Reporting", desc: "Monthly statements, annual tax summaries and complete financial transparency." },
];

const commercial = [
  { n: "01", title: "Tenant Relations",      desc: "Professional management focused on retaining long-term, high-quality tenancies." },
  { n: "02", title: "Outgoings Management",  desc: "Comprehensive outgoings reconciliations and budget management." },
  { n: "03", title: "Lease Administration",  desc: "Full management of lease terms, renewals, rent reviews and options." },
  { n: "04", title: "Building Maintenance",  desc: "Proactive maintenance programs to protect asset value and tenant satisfaction." },
  { n: "05", title: "Compliance",            desc: "OHS, fire safety, lift compliance and all statutory obligations managed." },
  { n: "06", title: "Financial Reporting",   desc: "Detailed monthly income and expenditure reports with variance analysis." },
];

const stats = [
  { v: "350+",   l: "Properties Managed" },
  { v: "97%",    l: "Tenancy Rate" },
  { v: "8 Days", l: "Avg. Days to Lease" },
  { v: "20+",    l: "Years Experience" },
];

export default function PropertyManagementPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex items-end" style={{ minHeight: "100svh" }}>
        <img
          src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=1800&h=1200&fit=crop&q=85"
          alt="Property Management Illawarra"
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.05) 100%)" }}
        />
        <div className="relative w-full max-w-screen-2xl mx-auto px-6 sm:px-10 pb-20">
          <span className="label-tag-light block mb-5">Property Management</span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              color: "#ffffff",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              marginBottom: "1.5rem",
            }}
          >
            Your Investment.<br />Our Priority.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.75,
              maxWidth: "44ch",
            }}
          >
            Protecting your investment and maximising your return — with transparent communication and genuine care across the Illawarra.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-sans)" }}>Scroll</span>
          <svg className="w-4 h-4" style={{ color: "rgba(255,255,255,0.45)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section style={{ backgroundColor: "#0D3348", padding: "56px 0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {stats.map((s, i) => (
              <div key={s.l} style={{ padding: "0 40px", borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.1)" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.v}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "8px" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Residential PM ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "96px 0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <div className="pb-12 mb-12" style={{ borderBottom: "1px solid #E8E5DF" }}>
            <span className="label-tag">Residential</span>
            <div className="grid lg:grid-cols-2 gap-8 items-end">
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                Residential Property<br />Management
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.8, maxWidth: "46ch" }}>
                From single apartments to entire portfolios — managed with professionalism, transparency and genuine care for your investment.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {residential.map((s, i) => (
              <div key={s.n} style={{ padding: "32px 28px", borderLeft: i % 3 !== 0 ? "1px solid #E8E5DF" : "none", borderTop: i >= 3 ? "1px solid #E8E5DF" : "none" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 300, color: "#5BC2E7", letterSpacing: "-0.04em", lineHeight: 1, opacity: 0.35, marginBottom: "20px" }}>{s.n}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000", fontWeight: 600, marginBottom: "8px" }}>{s.title}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commercial PM ── */}
      <section style={{ backgroundColor: "#FBF9F3", padding: "96px 0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <div className="pb-12 mb-12" style={{ borderBottom: "1px solid #DAD7CE" }}>
            <span className="label-tag">Commercial</span>
            <div className="grid lg:grid-cols-2 gap-8 items-end">
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                Commercial Property<br />Management
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.8, maxWidth: "46ch" }}>
                Comprehensive management for retail, office and industrial assets — protecting your asset value across the Illawarra.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {commercial.map((s, i) => (
              <div key={s.n} style={{ padding: "32px 28px", borderLeft: i % 3 !== 0 ? "1px solid #DAD7CE" : "none", borderTop: i >= 3 ? "1px solid #DAD7CE" : "none" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 300, color: "#5BC2E7", letterSpacing: "-0.04em", lineHeight: 1, opacity: 0.35, marginBottom: "20px" }}>{s.n}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000", fontWeight: 600, marginBottom: "8px" }}>{s.title}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Spinelli ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "96px 0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Image */}
            <div className="relative overflow-hidden" style={{ height: "560px" }}>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&h=900&fit=crop&q=85"
                alt="Why Spinelli Property Management"
                className="absolute inset-0 object-cover"
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            {/* Text */}
            <div>
              <span className="label-tag">Why Spinelli</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "24px" }}>
                Peace of Mind,<br />Every Day
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.85, maxWidth: "44ch", marginBottom: "40px" }}>
                We treat your investment property as if it were our own — proactive, communicative and always acting in your best financial interest.
              </p>

              <div className="flex flex-col gap-0">
                {[
                  "Dedicated property manager — one point of contact",
                  "24/7 emergency maintenance line",
                  "Proactive rent reviews to stay ahead of the market",
                  "Vetted, insured tradespeople for all maintenance",
                  "End-to-end NCAT representation if required",
                ].map((pt, i) => (
                  <div key={pt} className="flex items-start gap-4 py-4" style={{ borderTop: "1px solid #E8E5DF" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#5BC2E7", flexShrink: 0, marginTop: "6px" }} />
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000", lineHeight: 1.65 }}>{pt}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact?type=property-management"
                  className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
                >
                  Get a Free PM Appraisal
                </Link>
                <a
                  href="tel:0242960047"
                  className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-70"
                  style={{ border: "1px solid #DAD7CE", color: "#000000", fontFamily: "var(--font-sans)" }}
                >
                  02 4296 0047
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D3348", minHeight: "420px" }}>
        <div className="relative max-w-screen-2xl mx-auto px-6 sm:px-10 py-24 flex flex-col justify-center" style={{ minHeight: "420px" }}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="label-tag-light">Get Started</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 5rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.0 }}>
                Ready to Hand<br />It Over?
              </h2>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.85, maxWidth: "42ch", marginBottom: "36px" }}>
                Whether you have one property or a large portfolio — our team is ready to take the stress off your hands and maximise your returns.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact?type=property-management"
                  className="inline-block px-8 py-4 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
                >
                  Get a Free PM Appraisal
                </Link>
                <a
                  href="tel:0242960047"
                  className="inline-block px-8 py-4 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-70"
                  style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-sans)" }}
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
