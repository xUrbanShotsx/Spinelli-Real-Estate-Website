"use client";
import { useState, useEffect, useCallback } from "react";
import type { Testimonial } from "@/lib/types";

export default function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const go = useCallback(
    (next: number, dir: "left" | "right") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setActive(next);
        setAnimating(false);
      }, 320);
    },
    [animating]
  );

  const prev = () => go(active === 0 ? testimonials.length - 1 : active - 1, "left");
  const next = () => go(active === testimonials.length - 1 ? 0 : active + 1, "right");

  // Auto-advance every 6s
  useEffect(() => {
    const timer = setTimeout(() => {
      go(active === testimonials.length - 1 ? 0 : active + 1, "right");
    }, 6000);
    return () => clearTimeout(timer);
  }, [active, go, testimonials.length]);

  const t = testimonials[active];

  return (
    <section style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 py-20">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <span className="label-tag">Client Stories</span>
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
              What Our Clients Say
            </h2>
          </div>
          {/* Stars */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 16 16" fill="#5BC2E7" style={{ width: "14px", height: "14px" }}>
                  <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.5l-3.52 1.85.67-3.93L2.3 5.64l3.94-.57L8 1.5z" />
                </svg>
              ))}
            </div>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#a2b0aa" }}>5.0 · 120+ reviews</span>
          </div>
        </div>

        {/* Single review */}
        <div
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${direction === "right" ? "-24px" : "24px"})`
              : "translateX(0)",
            transition: "opacity 0.32s ease, transform 0.32s ease",
            marginBottom: "40px",
          }}
        >
          {/* Opening mark */}
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "6rem",
              color: "#5BC2E7",
              lineHeight: 0.7,
              marginBottom: "20px",
              opacity: 0.3,
            }}
          >
            &ldquo;
          </p>

          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.25rem, 2.2vw, 1.7rem)",
              color: "#000000",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              lineHeight: 1.5,
              marginBottom: "32px",
              maxWidth: "75ch",
            }}
          >
            {t.text}
          </blockquote>

          <div className="flex items-center gap-4">
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#EDE9DF",
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                color: "#58503c",
                fontWeight: 400,
              }}
            >
              {t.name.charAt(0)}
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000", fontWeight: 500 }}>
                {t.name}
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", marginTop: "1px" }}>
                {t.suburb} · {t.service}
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="flex items-center justify-center transition-opacity hover:opacity-60"
            style={{ width: "44px", height: "44px", border: "1px solid #DAD7CE", color: "#58503c", flexShrink: 0 }}
            aria-label="Previous review"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ width: "18px", height: "18px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="flex items-center justify-center transition-opacity hover:opacity-60"
            style={{ width: "44px", height: "44px", border: "1px solid #DAD7CE", color: "#58503c", flexShrink: 0 }}
            aria-label="Next review"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ width: "18px", height: "18px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#a2b0aa", marginLeft: "8px" }}>
            {active + 1} / {testimonials.length}
          </span>
        </div>

      </div>
    </section>
  );
}
