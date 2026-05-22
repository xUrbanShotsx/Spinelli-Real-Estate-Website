"use client";
import React, { useEffect, useState } from "react";

export default function SplashScreen() {
  const [phase, setPhase] = useState<"hidden" | "show" | "zoom" | "done">("hidden");

  useEffect(() => {
    // Only show once per browser session
    if (sessionStorage.getItem("spinelli_splash")) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("spinelli_splash", "1");

    setPhase("show");
    const t1 = setTimeout(() => setPhase("zoom"), 1000);  // pause, then zoom
    const t2 = setTimeout(() => setPhase("done"), 2200);  // unmount after animation
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "hidden" || phase === "done") return null;

  const zooming = phase === "zoom";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 300,
        backgroundColor: "#5BC2E7",
        isolation: "isolate",
        opacity: zooming ? 0 : 1,
        transition: zooming ? "opacity 0.75s ease 0.35s" : "none",
        pointerEvents: "none",
      }}
    >
      {/* The S punches a transparent hole in the blue overlay via destination-out */}
      <span
        style={{
          fontFamily: '"Helvetica Now", "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: "220px",
          fontWeight: 900,
          color: "#ffffff",
          lineHeight: 1,
          letterSpacing: "-0.06em",
          display: "block",
          mixBlendMode: "destination-out" as React.CSSProperties["mixBlendMode"],
          transform: zooming ? "scale(22)" : "scale(1)",
          transition: zooming
            ? "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)"
            : "none",
          userSelect: "none",
        }}
      >
        S
      </span>
    </div>
  );
}
