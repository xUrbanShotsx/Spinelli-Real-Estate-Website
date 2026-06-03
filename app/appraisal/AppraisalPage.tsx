"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderBottom: "1px solid #000000",
  padding: "5px 0",
  fontFamily: "var(--font-sans)",
  fontSize: "12px",
  letterSpacing: "0.12em",
  fontWeight: 600,
  color: "#000000",
  backgroundColor: "transparent",
  outline: "none",
};

export default function AppraisalPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") router.back(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        backgroundColor: "#ffffff",
        overflowY: "auto",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
    >
      {/* Logo */}
      <div
        className="fixed left-6 sm:left-12 lg:left-20"
        style={{ top: "10px", zIndex: 201 }}
      >
        <img
          src="/logo.png"
          alt="Spinelli Real Estate"
          style={{
            height: "85px",
            width: "auto",
            objectFit: "contain",
            filter: "brightness(0) saturate(100%) invert(73%) sepia(40%) saturate(692%) hue-rotate(161deg) brightness(98%)",
          }}
        />
      </div>

      {/* Close */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 transition-opacity hover:opacity-50"
        style={{
          position: "fixed",
          top: "24px",
          right: "28px",
          zIndex: 201,
          fontFamily: "var(--font-sans)",
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#000000",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
        }}
        aria-label="Close"
      >
        <span>Close</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Content */}
      <div
        className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20"
        style={{ minHeight: "100svh", display: "flex", alignItems: "center", paddingTop: "80px", paddingBottom: "60px" }}
      >
        <div className="w-full max-w-xl mx-auto">
          <div className="mb-8">
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "10px" }}>
              Free Appraisal
            </span>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#5BC2E7", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              Let&apos;s Start the Conversation
            </h1>
          </div>

          {submitted ? (
            <div className="py-10">
              <div style={{ width: "32px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "20px" }} />
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", marginBottom: "12px" }}>
                Message Received
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.75 }}>
                Thank you for reaching out. One of our team will be in touch within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-9">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="FIRST NAME" required style={inputStyle} className="placeholder:text-black/40" />
                <input type="text" placeholder="LAST NAME" required style={inputStyle} className="placeholder:text-black/40" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input type="email" placeholder="EMAIL ADDRESS" required style={inputStyle} className="placeholder:text-black/40" />
                <input type="tel" placeholder="PHONE NUMBER" style={inputStyle} className="placeholder:text-black/40" />
              </div>

              {/* Property Address */}
              <input
                type="text"
                placeholder="PROPERTY ADDRESS"
                required
                style={inputStyle}
                className="placeholder:text-black/40"
              />

              <textarea
                rows={4}
                placeholder="ADD DETAILS ABOUT YOUR HOME"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="placeholder:text-black/40"
                style={{
                  ...inputStyle,
                  resize: "none",
                  borderBottom: "none",
                  border: "1px solid #000000",
                  padding: "10px 12px",
                }}
              />

              <button
                type="submit"
                className="inline-block px-7 py-3 text-[12px] tracking-wide transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.1em" }}
              >
                SUBMIT
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
