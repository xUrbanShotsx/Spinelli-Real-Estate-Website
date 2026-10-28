"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { prefix: "", value: 35, suffix: "%", decimals: 0, label: "More than standard market value achieved when selling to a developer in NSW" },
  { prefix: "", value: 94, suffix: "%", decimals: 0, label: "Of NSW developer purchases settled above the original asking price" },
  { prefix: "", value: 68, suffix: "%", decimals: 0, label: "Of NSW homeowners who explored development potential sold for more" },
  { prefix: "$", value: 280000, suffix: "+", decimals: 0, label: "Average premium NSW homeowners receive over standard sale price" },
  { prefix: "", value: 18, suffix: "%", decimals: 0, label: "Rise in developer demand for residential land in NSW last 12 months" },
  { prefix: "", value: 72, suffix: "%", decimals: 0, label: "Of NSW homeowners unaware their property has development potential" },
];

function formatNumber(val: number, decimals: number, prefix: string, suffix: string) {
  if (prefix === "$") {
    return "$" + Math.round(val).toLocaleString("en-AU") + suffix;
  }
  return prefix + val.toFixed(decimals) + suffix;
}

function StatItem({ prefix, value, suffix, decimals, label, triggered, delay }: typeof STATS[0] & { triggered: boolean; delay: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(parseFloat((eased * value).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => requestAnimationFrame(tick), delay);
    return () => clearTimeout(timer);
  }, [triggered, value, decimals, delay]);

  return (
    <div style={{
      padding: "40px 24px",
      textAlign: "center",
      opacity: triggered ? 1 : 0,
      transform: triggered ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      <p style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
        fontWeight: 300,
        letterSpacing: "-0.03em",
        color: "#5BC2E7",
        margin: "0 0 10px",
        lineHeight: 1,
      }}>
        {formatNumber(current, decimals, prefix, suffix)}
      </p>
      <p style={{ fontSize: "13px", color: "#7a7265", margin: 0, lineHeight: 1.5 }}>
        {label}
      </p>
    </div>
  );
}

export default function DevelopMarketStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }} className="dev-market-stats">
      {STATS.map((s, i) => (
        <StatItem key={s.label} {...s} triggered={triggered} delay={i * 100} />
      ))}
    </div>
  );
}
