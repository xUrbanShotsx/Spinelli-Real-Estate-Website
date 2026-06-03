"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ContactForm from "@/components/ContactForm";

export default function ContactOverlay() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  // Fade in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape
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
        backgroundColor: "#0D3348",
        overflowY: "auto",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
    >
      {/* Logo */}
      <div style={{ position: "fixed", top: "24px", left: "28px", zIndex: 201, display: "flex", alignItems: "center" }}>
        <img
          src="/logo.png"
          alt="Spinelli Real Estate"
          style={{ height: "60px", width: "auto", maxWidth: "none", objectFit: "contain" }}
        />
      </div>

      {/* Close button */}
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
          color: "#ffffff",
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

      {/* Content — centred vertically */}
      <div
        className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20"
        style={{
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          paddingTop: "80px",
          paddingBottom: "60px",
        }}
      >
        <div className="w-full max-w-xl mx-auto">
            <div className="mb-6">
              <span style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#5BC2E7",
                display: "block",
                marginBottom: "10px",
              }}>Get in Touch</span>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  color: "#ffffff",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                Let&apos;s Start the Conversation
              </h1>
            </div>
            <ContactForm />
        </div>
      </div>
    </div>
  );
}
