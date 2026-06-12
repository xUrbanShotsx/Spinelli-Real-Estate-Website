"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

/* ── Data ─────────────────────────────────────────────── */
const process = [
  { num: "01", title: "Free Appraisal",     desc: "We assess your property against live market conditions and provide an honest, strategic price guide — no obligation, no pressure. We'll tell you exactly what your home is worth and how to maximise it." },
  { num: "02", title: "Tailored Campaign",   desc: "Premium photography, drone footage, feature listings on realestate.com.au and Domain, plus a bespoke digital marketing strategy built specifically around your home and target buyer." },
  { num: "03", title: "Expert Negotiation", desc: "We create genuine buyer competition, qualify every enquiry and negotiate hard on your behalf. Our track record speaks for itself — consistently above-reserve results across the Illawarra." },
  { num: "04", title: "Smooth Settlement",  desc: "From exchange to handover, we coordinate with your solicitor, the buyer's agent and all parties to make sure settlement is stress-free and on time." },
];

const whyUs = [
  { title: "12+ Years Local Knowledge", desc: "Deep Illawarra expertise across every suburb, price point and property type. We know this market better than anyone." },
  { title: "Premium Marketing",         desc: "Professional photography, drone footage, feature listings and targeted digital campaigns — every property deserves to look its best." },
  { title: "Proven Results",            desc: "Consistent above-reserve outcomes, short days-on-market and a 94% list-to-sale ratio — our numbers back up our promises." },
  { title: "Full Transparency",         desc: "Honest advice, clear communication and no hidden fees — at every stage. You'll always know exactly where things stand." },
  { title: "Expert Negotiation",        desc: "We create competition, qualify every buyer and negotiate hard to achieve the strongest possible price for your home." },
  { title: "Stress-Free Process",       desc: "From appraisal to settlement, we handle every detail and keep you informed — so you can focus on your next chapter." },
];

const reviews = [
  { quote: "Adam sold our home in under two weeks for $60,000 above our reserve. The marketing was stunning and the communication throughout was excellent.", name: "Sarah M", location: "Wollongong" },
  { quote: "We were blown away by the results. Spinelli's negotiation skills are second to none — we achieved a price we didn't think was possible.", name: "James & Lisa T", location: "Kiama" },
  { quote: "From the first meeting to settlement, everything was seamless. Professional, honest and genuinely cared about getting us the best result.", name: "Michael R", location: "Shellharbour" },
  { quote: "The photography and marketing they produced for our home was incredible. Multiple offers on the first weekend, sold $45K above reserve.", name: "Emma D", location: "Wollongong" },
  { quote: "Spinelli have sold three properties for us now. We wouldn't go anywhere else. Exceptional agents who deliver exceptional results.", name: "David & Karen B", location: "Illawarra" },
];

/* ── Main component ───────────────────────────────────── */
export default function SellContent() {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredWhy, setHoveredWhy] = useState<number | null>(null);
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section className="flex items-end" style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pb-20 pt-40">
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "20px" }}>
            Sell With Spinelli
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              color: "#0D3348",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              marginBottom: "28px",
              maxWidth: "16ch",
            }}
          >
            Achieve More<br />For Your Home
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(88,80,60,0.8)", lineHeight: 1.85, maxWidth: "48ch", marginBottom: "36px" }}>
            Selling your home is one of the biggest decisions you&apos;ll make. We bring local expertise, premium marketing and relentless negotiation to make sure you get the result you deserve.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/appraisal"
              className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              Book a Free Appraisal
            </Link>
            <Link
              href="/sold"
              className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-70"
              style={{ border: "1px solid #DAD7CE", color: "#0D3348", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              View Recent Results
            </Link>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "100px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div
            className="flex flex-wrap items-end justify-between gap-4 pb-10 mb-2"
            style={{ borderBottom: "1px solid #E8E5DF" }}
          >
            <div>
              <span className="label-tag">The Process</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                How We Sell<br />Your Home
              </h2>
            </div>
          </div>

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
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 300, color: activeStep === i ? "rgba(255,255,255,0.35)" : "#E8E5DF", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "12px" }}>
                  {p.num}
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: activeStep === i ? "#ffffff" : "#000000", letterSpacing: "0.02em", transition: "color 0.2s" }}>
                  {p.title}
                </p>
              </button>
            ))}
          </div>

          <div style={{ backgroundColor: "#ffffff", border: "1px solid #E8E5DF", padding: "40px 44px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "28px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "4rem", fontWeight: 300, color: "#5BC2E7", letterSpacing: "-0.05em", lineHeight: 1, opacity: 0.2, flexShrink: 0 }}>
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
      <section style={{ backgroundColor: "#F8F9FA", padding: "100px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div
            className="flex flex-wrap items-end justify-between gap-4 pb-10 mb-12"
            style={{ borderBottom: "1px solid #E8E5DF" }}
          >
            <div>
              <span className="label-tag">Why Spinelli</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                The Spinelli<br />Difference
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
                  <div style={{ width: "32px", height: "2px", backgroundColor: isHovered ? "#ffffff" : "#5BC2E7", marginBottom: "20px", transition: "all 0.25s ease" }} />
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", color: isHovered ? "#ffffff" : "#000000", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "10px", transition: "color 0.25s" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: isHovered ? "rgba(255,255,255,0.85)" : "#7a7265", lineHeight: 1.8, transition: "color 0.25s" }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Marketing showcase ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "100px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div
            className="flex flex-wrap items-end justify-between gap-4 pb-10 mb-12"
            style={{ borderBottom: "1px solid #E8E5DF" }}
          >
            <div>
              <span className="label-tag">Our Marketing</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                Presented to<br />Impress Buyers
              </h2>
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.85, maxWidth: "44ch" }}>
              First impressions are everything. Professional photography, videography and drone aerials make your property stand out online and at inspection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div style={{ aspectRatio: "4/3", backgroundColor: "#E8F6FC", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Front shot.jpg" alt="Exterior photography" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
              </div>
              <div style={{ paddingTop: "20px", borderTop: "2px solid #5BC2E7", marginTop: "20px" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, color: "#000000", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Exterior Photography</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.8 }}>Professional front-of-property shots that create an immediate, lasting first impression online and in print.</p>
              </div>
            </div>
            <div>
              <div style={{ aspectRatio: "4/3", backgroundColor: "#E8F6FC", overflow: "hidden" }}>
                <video src="/hero.mp4" autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ paddingTop: "20px", borderTop: "2px solid #5BC2E7", marginTop: "20px" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, color: "#000000", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Videography</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.8 }}>Cinematic walk-through video showcasing space, flow and lifestyle — giving buyers a compelling feel before they step inside.</p>
              </div>
            </div>
            <div>
              <div style={{ aspectRatio: "4/3", backgroundColor: "#E8F6FC", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/droneshot.jpg" alt="Drone aerial photography" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
              </div>
              <div style={{ paddingTop: "20px", borderTop: "2px solid #5BC2E7", marginTop: "20px" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, color: "#000000", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Drone Aerial Photography</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.8 }}>Aerial perspectives reveal land size, surroundings and proximity to beaches, parks and lifestyle amenities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "100px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="flex flex-wrap items-end justify-between gap-4 pb-10 mb-12" style={{ borderBottom: "1px solid #E8E5DF" }}>
            <div>
              <span className="label-tag">Client Reviews</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                What Our Sellers<br />Are Saying
              </h2>
            </div>
          </div>

          {/* Review card */}
          <div style={{ minHeight: "220px", position: "relative" }}>
            {reviews.map((r, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: activeReview === i ? 1 : 0,
                  transition: "opacity 0.6s ease",
                  pointerEvents: activeReview === i ? "auto" : "none",
                }}
              >
                <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "32px" }} />
                <blockquote
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                    color: "#0D3348",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.35,
                    maxWidth: "52ch",
                    marginBottom: "28px",
                  }}
                >
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#5BC2E7", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  {r.name} — {r.location}
                </p>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex gap-3 mt-16">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveReview(i)}
                style={{
                  width: activeReview === i ? "32px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: activeReview === i ? "#5BC2E7" : "#DAD7CE",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Pull quote ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D3348", padding: "80px 0" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&h=500&fit=crop&q=60" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.07 }} />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "32px" }} />
          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
              color: "#ffffff",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              maxWidth: "34ch",
              marginBottom: "24px",
            }}
          >
            &ldquo;From our first conversation to the final closing, Adam was professional, knowledgeable, and always one step ahead.&rdquo;
          </blockquote>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#5BC2E7", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "36px" }}>
            Nathan F — Seller, Illawarra
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

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "#0D3348", padding: "100px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "20px" }}>
                Start Today
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
                Ready to Sell<br />Your Home?
              </h2>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.85, maxWidth: "44ch", marginBottom: "36px" }}>
                Book a confidential, obligation-free appraisal and find out exactly what your property could achieve in today&apos;s market.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/appraisal"
                  className="inline-block px-7 py-3.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  Book a Free Appraisal
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
