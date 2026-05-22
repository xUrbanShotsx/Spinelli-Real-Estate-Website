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
    const t1 = setTimeout(() => setPhase("zoom"), 1100);  // pause, then zoom
    const t2 = setTimeout(() => setPhase("done"), 4000);  // unmount after animation
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
        transition: zooming ? "opacity 1.2s ease 1.2s" : "none",
        pointerEvents: "none",
      }}
    >
      {/* The S logo punches a transparent hole in the blue overlay via destination-out */}
      <img
        src="/logo-s.png"
        alt=""
        aria-hidden="true"
        style={{
          width: "320px",
          height: "auto",
          display: "block",
          transformOrigin: "center center",
          mixBlendMode: "destination-out" as React.CSSProperties["mixBlendMode"],
          transform: zooming ? "scale(20)" : "scale(1)",
          transition: zooming
            ? "transform 2s cubic-bezier(0.25, 0.1, 0.25, 1)"
            : "none",
        }}
      />
    </div>
  );
}
