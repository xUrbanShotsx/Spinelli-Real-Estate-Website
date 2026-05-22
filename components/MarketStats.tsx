"use client";
import { useEffect, useRef, useState } from "react";

interface Stat {
  prefix: string;
  value: number;
  decimals: number;
  suffix: string;
  label: string;
  note: string;
  trend: string;
}

const stats: Stat[] = [
  { prefix: "$", value: 1.18, decimals: 2, suffix: "M", label: "Median House Price",  note: "Illawarra Region · 2025",     trend: "+8.2% YoY"            },
  { prefix: "+", value: 8.2,  decimals: 1, suffix: "%", label: "Annual Growth",        note: "12-month rolling average",   trend: "vs +5.1% nationally"  },
  { prefix: "",  value: 28,   decimals: 0, suffix: "d", label: "Days on Market",       note: "Median time to sell",        trend: "↓ 6 days year-on-year" },
  { prefix: "",  value: 71,   decimals: 0, suffix: "%", label: "Clearance Rate",       note: "Auction results · 2025",     trend: "Above long-run avg"    },
];

function useCountUp(target: number, decimals: number, active: boolean, duration = 1400) {
  const [current, setCurrent] = useState(0);
  const raf = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    startTime.current = null;

    const step = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) {
        raf.current = requestAnimationFrame(step);
      } else {
        setCurrent(target);
      }
    };

    raf.current = requestAnimationFrame(step);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [active, target, decimals, duration]);

  return current;
}

function AnimatedStat({ stat, active, index }: { stat: Stat; active: boolean; index: number }) {
  // stagger each stat by 100ms per column
  const [delayed, setDelayed] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setDelayed(true), index * 110);
    return () => clearTimeout(t);
  }, [active, index]);

  const count = useCountUp(stat.value, stat.decimals, delayed, 1300);
  const display = `${stat.prefix}${count.toFixed(stat.decimals)}${stat.suffix}`;

  return (
    <div
      className="py-10 px-8"
      style={{
        borderLeft: "none",
        opacity: delayed ? 1 : 0,
        transform: delayed ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <p
        className="mb-2"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
          color: "#000000",
          fontWeight: 300,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {display}
      </p>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#58503c", marginBottom: "6px", fontWeight: 500 }}>
        {stat.label}
      </p>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#5BC2E7" }}>
        {stat.trend}
      </span>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: "6px" }}>
        {stat.note}
      </p>
    </div>
  );
}

export default function MarketStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <AnimatedStat key={s.label} stat={s} active={active} index={i} />
      ))}
    </div>
  );
}
