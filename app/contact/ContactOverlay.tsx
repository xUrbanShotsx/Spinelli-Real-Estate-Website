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
        backgroundColor: "#ffffff",
        overflowY: "auto",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
    >
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
        <div className="w-full grid lg:grid-cols-[1fr_300px] gap-14 items-start">

          {/* Left — title + form */}
          <div>
            <div className="mb-6">
              <span className="label-tag">Get in Touch</span>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  color: "#000000",
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

          {/* Right — contact details */}
          <div className="flex flex-col gap-6 lg:pt-16">

            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>Phone</p>
              <a
                href="tel:0242960047"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.02em" }}
                className="transition-opacity hover:opacity-60"
              >
                02 4296 0047
              </a>
            </div>

            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>Email</p>
              <a
                href="mailto:info@spinellirealestate.com.au"
                style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000" }}
                className="transition-opacity hover:opacity-60"
              >
                info@spinellirealestate.com.au
              </a>
            </div>

            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>Hours</p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#58503c", lineHeight: 1.75 }}>
                Mon – Fri &nbsp;&nbsp;8:30am – 5:30pm<br />
                Saturday &nbsp;9:00am – 4:00pm
              </p>
            </div>

            <div style={{ height: "1px", backgroundColor: "#E8E5DF" }} />

            <div className="flex flex-col gap-2.5">
              {[
                "No-obligation conversations",
                "Reply within one business day",
                "20+ years Illawarra expertise",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <svg viewBox="0 0 16 16" fill="none" style={{ width: "13px", height: "13px", flexShrink: 0 }}>
                    <circle cx="8" cy="8" r="7.5" stroke="#5BC2E7" strokeWidth="1" />
                    <path d="M5 8.5l2 2 4-4" stroke="#5BC2E7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#7a7265" }}>{item}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
