"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { prefix: "$", end: 1.45, suffix: "M", decimals: 2, label: "Median house price" },
  { prefix: "", end: 1.3, suffix: "%", decimals: 1, label: "12 month growth" },
  { prefix: "", end: 61, suffix: " days", decimals: 0, label: "Median days on market" },
  { prefix: "", end: 144, suffix: "", decimals: 0, label: "Sales (house & unit)" },
];

function useCountUp(end: number, decimals: number, triggered: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(parseFloat((eased * end).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [triggered, end, decimals, duration]);
  return val;
}

function Stat({ prefix, end, suffix, decimals, label, triggered, delay }: typeof STATS[0] & { triggered: boolean; delay: number }) {
  const val = useCountUp(end, decimals, triggered);
  return (
    <div
      style={{
        padding: "40px 32px",
        borderBottom: "1px solid #E8E5DF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "40px",
        opacity: triggered ? 1 : 0,
        transform: triggered ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      <div style={{ width: "28px", height: "28px", backgroundColor: "#5BC2E7", borderRadius: "2px" }} />
      <div>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 300, letterSpacing: "-0.03em", margin: "0 0 12px" }}>
          {prefix}{val.toFixed(decimals)}{suffix}
        </p>
        <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "#a2b0aa", margin: 0, fontFamily: "var(--font-sans)" }}>
          {label}
        </p>
      </div>
    </div>
  );
}

export default function ShellCoveStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid #E8E5DF" }}
    >
      {STATS.map((s, i) => (
        <div key={s.label} style={{ borderRight: i < 3 ? "1px solid #E8E5DF" : "none" }}>
          <Stat {...s} triggered={triggered} delay={i * 120} />
        </div>
      ))}
    </div>
  );
}
