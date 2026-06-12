"use client";
import { useState } from "react";

const values = [
  { num: "01", title: "Integrity", body: "Honest advice, always in your best interest — even when it's not what you want to hear. Our reputation is built on trust, and we protect it with every interaction." },
  { num: "02", title: "Excellence", body: "From the quality of our marketing to the depth of our market knowledge, we hold ourselves to the highest standard in everything we do." },
  { num: "03", title: "Community", body: "We're proud Illawarra locals who reinvest in the communities we serve and genuinely care about the people who call this coast home." },
  { num: "04", title: "Results", body: "Our clients judge us on outcomes — and we're consistently proud of what we deliver. Every transaction is an opportunity to prove our worth." },
];

export default function AboutValues() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ borderBottom: "1px solid #E8E5DF", paddingBottom: "32px", marginBottom: "32px" }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#5BC2E7", display: "block", marginBottom: "10px" }}>
          Our Values
        </span>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          What We Stand For
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
        {values.map((v, i) => {
          const isActive = active === v.num;
          const isDimmed = active !== null && !isActive;
          return (
            <div
              key={v.num}
              onMouseEnter={() => setActive(v.num)}
              onMouseLeave={() => setActive(null)}
              style={{
                padding: "28px 32px 28px 0",
                borderBottom: i < 2 ? "1px solid #E8E5DF" : "none",
                borderRight: i % 2 === 0 ? "1px solid #E8E5DF" : "none",
                paddingLeft: i % 2 === 1 ? "32px" : "0",
                cursor: "default",
                transition: "all 0.3s ease",
                opacity: isDimmed ? 0.35 : 1,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: isActive ? "3rem" : "2rem",
                    color: "#5BC2E7",
                    fontWeight: 300,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    flexShrink: 0,
                    paddingTop: "2px",
                    transition: "font-size 0.3s ease",
                  }}
                >
                  {v.num}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: isActive ? "1.4rem" : "1.15rem",
                      color: "#000000",
                      fontWeight: 300,
                      letterSpacing: "-0.02em",
                      marginBottom: "8px",
                      transition: "font-size 0.3s ease",
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      color: "#7a7265",
                      lineHeight: 1.8,
                      maxHeight: isActive ? "120px" : "60px",
                      overflow: "hidden",
                      transition: "max-height 0.4s ease",
                    }}
                  >
                    {v.body}
                  </p>
                  <div
                    style={{
                      width: isActive ? "32px" : "0px",
                      height: "1px",
                      backgroundColor: "#5BC2E7",
                      marginTop: "12px",
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
