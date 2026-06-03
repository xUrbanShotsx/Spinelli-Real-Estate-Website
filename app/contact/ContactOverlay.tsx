"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ContactForm from "@/components/ContactForm";

interface Props {
  propertyAddress?: string;
  propertyPrice?: string;
  propertyImage?: string;
}

export default function ContactOverlay({ propertyAddress, propertyPrice, propertyImage }: Props) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

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
      <div className="fixed left-6 sm:left-12 lg:left-20" style={{ top: "10px", zIndex: 201, display: "flex", alignItems: "center" }}>
        <img
          src="/logo.png"
          alt="Spinelli Real Estate"
          style={{
            height: "85px",
            width: "auto",
            maxWidth: "none",
            objectFit: "contain",
            filter: "brightness(0) saturate(100%) invert(73%) sepia(40%) saturate(692%) hue-rotate(161deg) brightness(98%)",
          }}
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
                color: "#5BC2E7",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              Let&apos;s Start the Conversation
            </h1>
          </div>

          {/* Property card — shown when coming from a listing */}
          {propertyAddress && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              backgroundColor: "#F8FAFC",
              border: "1px solid #E8E5DF",
              padding: "12px 14px",
              marginBottom: "36px",
            }}>
              {propertyImage && (
                <img
                  src={propertyImage}
                  alt=""
                  style={{ width: "64px", height: "48px", objectFit: "cover", flexShrink: 0 }}
                />
              )}
              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#5BC2E7", marginBottom: "4px" }}>
                  Enquiring About
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#000000", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {propertyAddress}
                </p>
                {propertyPrice && (
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#7a7265", marginTop: "2px" }}>
                    {propertyPrice}
                  </p>
                )}
              </div>
            </div>
          )}

          <ContactForm propertyAddress={propertyAddress} />
        </div>
      </div>
    </div>
  );
}
