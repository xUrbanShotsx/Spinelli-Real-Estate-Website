import type { Metadata } from "next";
import AdamForm from "./AdamForm";

export const metadata: Metadata = {
  title: "Free Property Appraisal | Spinelli Real Estate",
  description: "Book your free, no-obligation property appraisal with Adam from Spinelli Real Estate.",
  robots: { index: false, follow: false },
};

export default function AdamPage() {
  return (
    <main style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "var(--font-sans)", overflow: "hidden" }}>

      {/* Background image */}
      <img
        src="/droneshot.jpg"
        alt=""
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: 0 }}
      />
      {/* Overlay */}
      <div style={{ position: "fixed", inset: 0, background: "rgba(13,51,72,0.45)", zIndex: 1 }} />

      {/* Card */}
      <div style={{
        position: "relative",
        zIndex: 2,
        backgroundColor: "#ffffff",
        borderRadius: "24px",
        padding: "48px",
        width: "100%",
        maxWidth: "480px",
        boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
      }}>
        {/* Logo */}
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <img src="/logo.png" alt="Spinelli Real Estate" style={{ height: "20px", width: "auto" }} />
        </div>

        <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "#5BC2E7", margin: "0 0 12px", textAlign: "center" }}>
          No obligation · Free
        </p>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
          fontWeight: 300,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: "#0D3348",
          margin: "0 0 32px",
          textAlign: "center",
        }}>
          Learn your home&apos;s new value
        </h1>

        <AdamForm />
      </div>
    </main>
  );
}
