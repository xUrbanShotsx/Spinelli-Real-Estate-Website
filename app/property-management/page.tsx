import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Property Management | Spinelli Real Estate",
  description:
    "Illawarra's leading property management team. 20+ years experience, 350+ properties managed, 97% tenancy rate. Let Spinelli Real Estate protect and grow your investment.",
};

const residentialServices = [
  { n: "01", title: "Rigorous Tenant Selection", desc: "We don't just fill your property — we find the right tenant. Every applicant undergoes thorough credit checks, employment verification, rental history and personal reference checks before we recommend them to you." },
  { n: "02", title: "Rent Collection & Arrears", desc: "Automated rent collection with zero-tolerance arrears management. Owners receive real-time updates and we act immediately at first sign of delay — protecting your cash flow at all times." },
  { n: "03", title: "Routine Inspections", desc: "Regular entry condition, routine and exit inspections with detailed written reports and photographs. You'll always know the condition of your property and we flag issues before they become costly." },
  { n: "04", title: "Maintenance Coordination", desc: "Our network of vetted, licensed and insured tradespeople respond promptly to all maintenance requests. We get competitive quotes, oversee the work and keep you informed every step of the way." },
  { n: "05", title: "Lease & Rent Review Management", desc: "We proactively review rents against current market conditions and handle all lease renewals, rent increases and documentation — ensuring your property keeps pace with the Illawarra market." },
  { n: "06", title: "Transparent Financial Reporting", desc: "Monthly owner statements, annual tax summaries and a full breakdown of income and expenditure. Everything you need for your accountant, in one clear, easy-to-read report." },
];

const commercialServices = [
  { n: "01", title: "Lease Administration", desc: "Full management of all lease terms, critical dates, rent reviews, options, make-good provisions and lease renewals — so nothing slips through the cracks." },
  { n: "02", title: "Outgoings & Reconciliations", desc: "Accurate budgeting, monthly outgoings collection and year-end reconciliations managed to the letter of the lease — protecting you from disputes and maximising recovery." },
  { n: "03", title: "Tenant Retention", desc: "We build strong tenant relationships to retain high-quality, long-term occupants. A vacant commercial property costs far more than proactive tenant management." },
  { n: "04", title: "Proactive Maintenance Programs", desc: "Planned preventative maintenance schedules to protect your asset value, minimise emergency repairs and meet all landlord obligations." },
  { n: "05", title: "Statutory Compliance", desc: "We manage all compliance obligations — OHS, fire safety, lift servicing, essential services and any statutory requirements — so your asset stays compliant and your liability stays minimal." },
  { n: "06", title: "Detailed Financial Reporting", desc: "Monthly income and expenditure reports with budget-versus-actual variance analysis — giving you a complete picture of your commercial asset's performance." },
];

const stats = [
  { v: "350+",   l: "Properties Managed" },
  { v: "97%",    l: "Tenancy Rate" },
  { v: "8 Days", l: "Average Days to Lease" },
  { v: "20+",    l: "Years Illawarra Experience" },
];

const whyUs = [
  {
    title: "A Team Working for You",
    desc: "When you work with Spinelli, you get the full strength of our property management team behind you. Every member knows your property, your tenants and your goals — so you're always looked after, no matter who picks up the phone.",
  },
  {
    title: "Local Market Expertise",
    desc: "We've been managing Illawarra properties for over 20 years. We know the suburbs, the rental demand, the seasonal trends and what drives premium returns in this market.",
  },
  {
    title: "Proactive — Not Reactive",
    desc: "We don't wait for things to go wrong. Proactive inspections, early rent reviews and preventative maintenance mean small issues never become expensive ones.",
  },
  {
    title: "24/7 Emergency Maintenance",
    desc: "Tenants have access to an emergency maintenance line around the clock. You'll never have to worry about a burst pipe or a faulty heater at 2am.",
  },
  {
    title: "Vetted Trades Network",
    desc: "All our tradespeople are licensed, insured and price-checked. We maintain long-term relationships built on quality, reliability and fair pricing.",
  },
  {
    title: "End-to-End Legal Support",
    desc: "From lease preparation through to NCAT representation — our team handles every legal and compliance obligation, protecting your investment at every stage.",
  },
];

const process = [
  { step: "01", title: "Free Appraisal", desc: "We assess your property, provide a current market rental appraisal and outline exactly how we'll maximise your return." },
  { step: "02", title: "Onboarding", desc: "We handle every detail of the handover — keys, condition reports, tenant communication and all paperwork. Stress-free from day one." },
  { step: "03", title: "Tenant Marketing", desc: "Professional photography, premium listings on realestate.com.au and Domain, plus targeted local marketing to find the right tenant fast." },
  { step: "04", title: "Ongoing Management", desc: "From rent collection and inspections to maintenance and reporting — we manage every aspect of your property so you don't have to." },
];

export default function PropertyManagementPage() {
  return (
    <>
      {/* ── Opening ── */}
      <section style={{ backgroundColor: "#5BC2E7", paddingTop: "140px", paddingBottom: "80px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-end">
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", display: "block", marginBottom: "20px" }}>
                Property Management
              </span>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 7vw, 6rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 0.95 }}>
                Your Investment.<br />Our Priority.
              </h1>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.85)", lineHeight: 1.85 }}>
                For over 20 years, Spinelli Real Estate has been the Illawarra's most trusted property management team. We protect your investment, secure great tenants and maximise your returns — while you get on with your life.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/contact?type=property-management"
                  className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#ffffff", color: "#0D3348", fontFamily: "var(--font-sans)" }}
                >
                  Get a Free Appraisal
                </Link>
                <a
                  href="tel:0242960047"
                  className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-70"
                  style={{ border: "1px solid rgba(255,255,255,0.5)", color: "#ffffff", fontFamily: "var(--font-sans)" }}
                >
                  02 4296 0047
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section style={{ backgroundColor: "#5BC2E7", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((s) => (
              <div key={s.l} className="py-10 px-6 flex flex-col gap-2">
                <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.v}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Spinelli ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "96px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-[380px_1fr] gap-20 items-start">
            <div className="lg:sticky lg:top-28">
              <span className="label-tag">Why Choose Us</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "24px" }}>
                The Illawarra's Most Trusted Property Managers
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.85 }}>
                We're not a franchise or a call centre. We're a local team with deep roots in this region, and we take personal responsibility for every property we manage.
              </p>
            </div>
            <div className="flex flex-col gap-0">
              {whyUs.map((item, i) => (
                <div key={item.title} className="flex gap-8 py-8" style={{ borderTop: i === 0 ? "none" : "1px solid #E8E5DF" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#5BC2E7", flexShrink: 0, marginTop: "7px" }} />
                  <div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#000000", fontWeight: 600, marginBottom: "8px" }}>{item.title}</p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "13.5px", color: "#7a7265", lineHeight: 1.8 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "96px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="mb-14">
            <span className="label-tag">Our Process</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              Getting Started is Simple
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {process.map((s, i) => (
              <div key={s.step} style={{ padding: "36px 32px", borderLeft: i === 0 ? "none" : "1px solid #DAD7CE", backgroundColor: "#ffffff" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 300, color: "#5BC2E7", letterSpacing: "-0.04em", opacity: 0.3, lineHeight: 1, marginBottom: "20px" }}>{s.step}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000", fontWeight: 600, marginBottom: "10px" }}>{s.title}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.75 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Residential PM ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "96px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="pb-12 mb-12" style={{ borderBottom: "1px solid #E8E5DF" }}>
            <span className="label-tag">Residential</span>
            <div className="grid lg:grid-cols-2 gap-8 items-end">
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                Residential Property<br />Management
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.8, maxWidth: "46ch" }}>
                From a single investment unit to a large residential portfolio — we bring the same level of dedication, transparency and expertise to every property we manage.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {residentialServices.map((s, i) => (
              <div key={s.n} style={{ padding: "36px 28px", borderLeft: i % 3 !== 0 ? "1px solid #E8E5DF" : "none", borderTop: i >= 3 ? "1px solid #E8E5DF" : "none" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 300, color: "#5BC2E7", letterSpacing: "-0.04em", lineHeight: 1, opacity: 0.3, marginBottom: "20px" }}>{s.n}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000", fontWeight: 600, marginBottom: "10px" }}>{s.title}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commercial PM ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "96px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="pb-12 mb-12" style={{ borderBottom: "1px solid #DAD7CE" }}>
            <span className="label-tag">Commercial</span>
            <div className="grid lg:grid-cols-2 gap-8 items-end">
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                Commercial Property<br />Management
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.8, maxWidth: "46ch" }}>
                Commercial property demands a higher level of expertise. Our team manages retail, office and industrial assets across the Illawarra with meticulous attention to compliance, tenant relations and asset value.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {commercialServices.map((s, i) => (
              <div key={s.n} style={{ padding: "36px 28px", borderLeft: i % 3 !== 0 ? "1px solid #DAD7CE" : "none", borderTop: i >= 3 ? "1px solid #DAD7CE" : "none" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 300, color: "#5BC2E7", letterSpacing: "-0.04em", lineHeight: 1, opacity: 0.3, marginBottom: "20px" }}>{s.n}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000", fontWeight: 600, marginBottom: "10px" }}>{s.title}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "72px 0", borderTop: "1px solid #E8E5DF", borderBottom: "1px solid #E8E5DF" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              { title: "No Lock-In Contracts", desc: "We earn your business every day. Our management agreements are straightforward — if we're not delivering, you're free to leave." },
              { title: "Fully Licensed & Insured", desc: "Spinelli Real Estate holds all required NSW real estate licences. Your property and your data are in fully compliant, professional hands." },
              { title: "Transparent Fee Structure", desc: "No hidden charges. Our fee schedule is clear, competitive and explained in full before we manage a single property for you." },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-3">
                <div style={{ width: "32px", height: "2px", backgroundColor: "#5BC2E7" }} />
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#000000", fontWeight: 600 }}>{item.title}</p>
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
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", display: "block", marginBottom: "20px" }}>
                Get Started Today
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.0 }}>
                Ready to Hand<br />It Over?
              </h2>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.85)", lineHeight: 1.85, maxWidth: "44ch", marginBottom: "36px" }}>
                Whether you have one investment property or an entire portfolio — our team will provide a free, no-obligation appraisal and show you exactly how we'll grow and protect your investment.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact?type=property-management"
                  className="inline-block px-8 py-4 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#ffffff", color: "#0D3348", fontFamily: "var(--font-sans)" }}
                >
                  Get a Free PM Appraisal
                </Link>
                <a
                  href="tel:0242960047"
                  className="inline-block px-8 py-4 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-70"
                  style={{ border: "1px solid rgba(255,255,255,0.5)", color: "#ffffff", fontFamily: "var(--font-sans)" }}
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
