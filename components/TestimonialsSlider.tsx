"use client";
import { useState, useEffect, useCallback } from "react";

const reviews = [
  {
    text: "Selling with Spinelli was the best decision we made. Adam's knowledge of the local market was exceptional — we had multiple offers within the first week and achieved a price well above what we expected. Couldn't be happier.",
    name: "Sarah & James M.",
    detail: "Sellers · Shellharbour",
  },
  {
    text: "Paul managed our entire sale from appraisal to settlement without a single hiccup. He was honest about pricing from day one, his marketing was exceptional and he negotiated hard on our behalf. We'd recommend Spinelli to anyone.",
    name: "David T.",
    detail: "Seller · Wollongong",
  },
  {
    text: "After years with other agencies, switching to Spinelli for our investment property was a revelation. Our property was leased within a week, at a rent higher than we'd ever achieved before. The team is professional, responsive and genuinely cares.",
    name: "Priya & Raj K.",
    detail: "Landlords · Kiama",
  },
  {
    text: "As first home buyers, we were nervous about the whole process. Jye walked us through every step, was available whenever we had questions and never made us feel rushed. We found our perfect home and we couldn't be more grateful.",
    name: "Emma L.",
    detail: "Buyer · Thirroul",
  },
  {
    text: "Zoe has managed our rental portfolio for three years now and she is absolutely outstanding. Proactive, thorough and always one step ahead. Our properties are consistently tenanted and we've never had a late payment. Truly excellent service.",
    name: "Michael F.",
    detail: "Landlord · Gerringong",
  },
];

export default function TestimonialsSlider() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((index: number) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setActive(index);
      setFading(false);
    }, 350);
  }, [fading]);

  // Auto-advance every 6s
  useEffect(() => {
    const timer = setTimeout(() => {
      goTo(active === reviews.length - 1 ? 0 : active + 1);
    }, 6000);
    return () => clearTimeout(timer);
  }, [active, goTo]);

  const t = reviews[active];

  return (
    <section style={{ backgroundColor: "#ffffff", padding: "100px 0", borderTop: "1px solid #E8E5DF" }}>
      <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-20" style={{ textAlign: "center" }}>

        {/* Stars */}
        <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "40px" }}>
          {[...Array(5)].map((_, i) => (
            <svg key={i} viewBox="0 0 16 16" fill="#5BC2E7" style={{ width: "16px", height: "16px" }}>
              <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.5l-3.52 1.85.67-3.93L2.3 5.64l3.94-.57L8 1.5z" />
            </svg>
          ))}
        </div>

        {/* Review */}
        <div
          style={{
            opacity: fading ? 0 : 1,
            transition: "opacity 0.35s ease",
            marginBottom: "40px",
          }}
        >
          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
              color: "#000000",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              lineHeight: 1.5,
              marginBottom: "32px",
            }}
          >
            &ldquo;{t.text}&rdquo;
          </blockquote>

          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#000000", marginBottom: "4px" }}>
            {t.name}
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.06em" }}>
            {t.detail}
          </p>
        </div>

        {/* Dot navigation */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Review ${i + 1}`}
              style={{
                width: i === active ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: i === active ? "#5BC2E7" : "#E8E5DF",
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
  );
}
