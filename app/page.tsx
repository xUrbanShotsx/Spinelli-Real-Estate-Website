import Link from "next/link";
import type { Metadata } from "next";
import PropertyCard from "@/components/PropertyCard";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import MarketStats from "@/components/MarketStats";
import { residentialSaleProperties, testimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Spinelli Real Estate | Illawarra's Premier Agency",
  description:
    "Spinelli Real Estate — premium residential sales, commercial, project sales and property management across the Illawarra. Wollongong, Kiama, Shellharbour and surrounds.",
};

const featuredSale = residentialSaleProperties.filter((p) => p.featured).slice(0, 3);

const services = [
  {
    title: "Sales",
    href: "/buy",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=85",
  },
  {
    title: "Commercial",
    href: "/commercial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=85",
  },
  {
    title: "Business",
    href: "/business",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=85",
  },
  {
    title: "Property Management",
    href: "/property-management",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&q=85",
  },
  {
    title: "Projects",
    href: "/projects",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop&q=85",
  },
  {
    title: "Suburb Guides",
    href: "/suburbs",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=85",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex flex-col justify-center overflow-hidden" style={{ minHeight: "100vh", backgroundColor: "#5BC2E7" }}>
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.20) 50%, rgba(0,0,0,0.55) 100%)" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full" />

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-sans)" }}>
            Scroll
          </span>
          <svg className="w-4 h-4" style={{ color: "rgba(255,255,255,0.45)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Featured Listings ── */}
      <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="label-tag">For Sale</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>Featured Properties</h2>
            </div>
            <Link href="/buy" className="text-sm font-medium flex items-center gap-1 transition-opacity hover:opacity-60 hidden sm:flex" style={{ color: "#5BC2E7" }}>
              View All
              <svg className="w-3.5 h-3.5" style={{ color: "#5BC2E7" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="property-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredSale.map((p) => (
              <PropertyCard key={p.id} property={p} overlay />
            ))}
          </div>
        </div>
      </section>

      {/* ── Market at a Glance ── */}
      <section style={{ backgroundColor: "#ffffff" }}>
        {/* Header row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <div>
              <span className="label-tag">Illawarra Market</span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  color: "#000000",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                Market at a Glance
              </h2>
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.75, maxWidth: "44ch" }}>
              The Illawarra property market continues to outperform national averages — driven by lifestyle demand, infrastructure investment and a growing professional population relocating from Sydney.
            </p>
          </div>
        </div>

        {/* 4 headline stats — animated on scroll */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MarketStats />
        </div>


      </section>

      {/* ── Services ── */}
      <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="label-tag">What We Do</span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  color: "#000000",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                Everything Under<br />One Roof
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-60 flex-shrink-0"
              style={{ color: "#5BC2E7", fontFamily: "var(--font-sans)" }}
            >
              Get in Touch
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* 6-card image grid — 3 col × 2 row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group relative overflow-hidden flex items-center justify-center"
                style={{ height: "320px" }}
              >
                {/* Background image */}
                <img
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ width: "100%", height: "100%" }}
                />
                {/* Dark shader */}
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: "rgba(0,0,0,0.52)" }}
                />

                {/* Centred content */}
                <div className="relative flex flex-col items-center gap-4 text-center px-6">
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      color: "#ffffff",
                      fontWeight: 300,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                    }}
                  >
                    {s.title}
                  </h3>
                  <span
                    className="inline-flex items-center gap-1.5 text-[12px] font-medium transition-all group-hover:gap-2.5"
                    style={{ color: "#5BC2E7", fontFamily: "var(--font-sans)" }}
                  >
                    Learn more
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: "12px", height: "12px" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ── Testimonials ── */}
      <TestimonialsSlider testimonials={testimonials} />

      {/* ── CTA ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "540px" }}>
        {/* Full-bleed background image */}
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&h=900&fit=crop&q=85"
          alt="Ready to make your move"
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%" }}
        />
        {/* Dark gradient — heavier on left for text legibility */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.1) 100%)" }}
        />
        {/* Bottom fade into footer */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "220px", background: "linear-gradient(to bottom, transparent 0%, #ffffff 100%)", pointerEvents: "none" }}
        />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24 flex flex-col justify-center h-full" style={{ minHeight: "540px" }}>
          <div className="max-w-xl">
            <span className="label-tag-light mb-6 block">Make Your Move</span>

            <h2
              className="mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: "#ffffff",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
              }}
            >
              Ready to Make<br />Your Move?
            </h2>

            <p
              className="mb-10"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.75,
                maxWidth: "40ch",
              }}
            >
              Buying, selling, renting or investing — our team delivers the result you deserve. Let&apos;s start the conversation today.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <Link
                href="/contact?type=appraisal"
                className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
              >
                Get a Free Appraisal
              </Link>
              <Link
                href="/contact"
                className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-70"
                style={{ border: "1px solid rgba(255,255,255,0.35)", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-sans)" }}
              >
                Contact Our Team
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                "20+ years local expertise",
                "No obligation appraisals",
                "5★ vendor satisfaction",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg viewBox="0 0 16 16" fill="none" style={{ width: "14px", height: "14px", flexShrink: 0 }}>
                    <circle cx="8" cy="8" r="7.5" stroke="#5BC2E7" strokeWidth="1" />
                    <path d="M5 8.5l2 2 4-4" stroke="#5BC2E7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
