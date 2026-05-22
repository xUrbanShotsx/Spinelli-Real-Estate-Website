import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Property Management | Residential & Commercial",
  description:
    "Professional property management for residential and commercial properties across the Illawarra. Maximise your rental return with Spinelli Real Estate.",
};

const residential = [
  { n: "01", title: "Tenant Selection", desc: "Rigorous screening including credit checks, employment verification and reference checks." },
  { n: "02", title: "Rent Collection", desc: "Reliable collection with automated arrears management and transparent reporting." },
  { n: "03", title: "Regular Inspections", desc: "Routine inspections with detailed reports, photographs and condition tracking." },
  { n: "04", title: "Maintenance", desc: "Prompt coordination of repairs through our vetted trades network." },
  { n: "05", title: "Lease Management", desc: "Renewals, rent reviews and full legal compliance handled on your behalf." },
  { n: "06", title: "Financial Reporting", desc: "Monthly statements, annual tax summaries and complete financial reporting." },
];

const commercial = [
  { n: "01", title: "Tenant Relations", desc: "Professional management to maintain long-term, high-quality tenancies." },
  { n: "02", title: "Outgoings Management", desc: "Comprehensive outgoings, reconciliations and budget management." },
  { n: "03", title: "Lease Administration", desc: "Full management of lease terms, renewals, rent reviews and options." },
  { n: "04", title: "Building Maintenance", desc: "Proactive programs to protect asset value and tenant satisfaction." },
  { n: "05", title: "Compliance", desc: "OHS, fire safety, lift compliance and all statutory obligations managed." },
  { n: "06", title: "Financial Reporting", desc: "Detailed monthly income and expenditure reports with variance analysis." },
];

const stats = [
  { v: "350+", l: "Properties Managed" },
  { v: "97%", l: "Tenancy Rate" },
  { v: "8 Days", l: "Avg. Days to Lease" },
  { v: "20+", l: "Years Experience" },
];

export default function PropertyManagementPage() {
  return (
    <>
      <PageHero
        badge="Property Management"
        title="Expert Property Management"
        subtitle="Protecting your investment and maximising your return — with transparent communication and exceptional care."
      />

      <section className="py-10" style={{ backgroundColor: "#5BC2E7" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.l}>
              <p className="text-3xl font-bold text-white" style={{  }}>{s.v}</p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Residential PM */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <div className="section-kicker justify-center">
              <span className="kicker-text">Residential</span>
            </div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#5BC2E7" }}>Residential Property Management</h2>
            <p className="text-sm max-w-xl mx-auto" style={{ color: "#7a7265" }}>From single apartments to entire portfolios — managed with professionalism and genuine care.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {residential.map((s) => (
              <div key={s.n} className="p-7 bg-white rounded-2xl border" style={{ borderColor: "#dad7ce" }}>
                <p className="text-xs font-bold tracking-[0.15em] uppercase mb-4" style={{ color: "#5BC2E7" }}>{s.n}</p>
                <h3 className="font-bold text-base mb-2" style={{ color: "#5BC2E7" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7a7265" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial PM */}
      <section className="py-20" style={{ backgroundColor: "#fbf9f3" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <div className="section-kicker justify-center">
              <span className="kicker-text">Commercial</span>
            </div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#5BC2E7" }}>Commercial Property Management</h2>
            <p className="text-sm max-w-xl mx-auto" style={{ color: "#7a7265" }}>Comprehensive management for retail, office and industrial assets across the Illawarra.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercial.map((s) => (
              <div key={s.n} className="p-7 bg-white rounded-2xl border" style={{ borderColor: "#dad7ce" }}>
                <p className="text-xs font-bold tracking-[0.15em] uppercase mb-4" style={{ color: "#5BC2E7" }}>{s.n}</p>
                <h3 className="font-bold text-base mb-2" style={{ color: "#5BC2E7" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7a7265" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <img src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800&q=80" alt="Property management" className="rounded-2xl object-cover w-full" style={{ height: "420px" }} />
            <div>
              <div className="section-kicker">
                <span className="kicker-text">Why Spinelli PM</span>
              </div>
              <h2 className="text-3xl font-bold mb-5" style={{ color: "#5BC2E7" }}>Peace of Mind, Every Day</h2>
              <p className="text-base leading-relaxed mb-7" style={{ color: "#7a7265", maxWidth: "44ch" }}>
                We treat your investment property as if it were our own — proactive, communicative and always acting in your best financial interest.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Dedicated property manager — one point of contact",
                  "24/7 emergency maintenance line",
                  "Proactive rent reviews to stay ahead of the market",
                  "Vetted, insured tradespeople for all maintenance",
                  "End-to-end NCAT representation if required",
                ].map((pt) => (
                  <div key={pt} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "#ede9df" }}>
                      <svg className="w-3 h-3" style={{ color: "#2da8d0" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm" style={{ color: "#58503c" }}>{pt}</p>
                  </div>
                ))}
              </div>
              <Link href="/contact?type=property-management" style={{ backgroundColor: "#5BC2E7", color: "#ffffff" }} className="inline-block px-6 py-3 rounded font-semibold text-sm hover:bg-[#3aafdb] transition-colors">
                Get a Free PM Appraisal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
