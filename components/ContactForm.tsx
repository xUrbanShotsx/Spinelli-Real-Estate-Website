"use client";
import { useState } from "react";

const enquiryTypes = ["Buying", "Selling", "Rentals", "Property Management", "Other"];

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderBottom: "1px solid #ffffff",
  padding: "5px 0",
  fontFamily: "var(--font-sans)",
  fontSize: "12px",
  letterSpacing: "0.12em",
  fontWeight: 600,
  color: "#ffffff",
  backgroundColor: "transparent",
  outline: "none",
};

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [activeType, setActiveType] = useState("Buying");

  if (submitted) {
    return (
      <div className="py-10">
        <div style={{ width: "32px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "20px" }} />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.03em", marginBottom: "12px" }}>
          Message Received
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75 }}>
          Thank you for reaching out. One of our team will be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-9">
      <div className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="FIRST NAME" required style={inputStyle} className="placeholder:text-white" />
        <input type="text" placeholder="LAST NAME" required style={inputStyle} className="placeholder:text-white" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input type="email" placeholder="EMAIL ADDRESS" required style={inputStyle} className="placeholder:text-white" />
        <input type="tel" placeholder="PHONE NUMBER" style={inputStyle} className="placeholder:text-white" />
      </div>

      {/* Enquiry Type */}
      <div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.12em", fontWeight: 600, color: "#ffffff", textTransform: "uppercase", marginBottom: "8px" }}>
          Enquiry Type
        </p>
        <div className="flex flex-wrap gap-1.5">
          {enquiryTypes.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveType(t)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                letterSpacing: "0.08em",
                fontWeight: 600,
                padding: "5px 12px",
                border: activeType === t ? "1px solid #ffffff" : "1px solid #ffffff",
                backgroundColor: activeType === t ? "#ffffff" : "transparent",
                color: activeType === t ? "#0D3348" : "#ffffff",
                transition: "all 0.15s ease",
                cursor: "pointer",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <textarea
        rows={4}
        placeholder="MESSAGE"
        className="placeholder:text-white"
        style={{
          ...inputStyle,
          resize: "none",
          borderBottom: "none",
          border: "1px solid #ffffff",
          padding: "10px 12px",
        }}
      />

      <div className="flex items-center gap-5 pt-1">
        <button
          type="submit"
          className="inline-block px-7 py-3 text-[12px] tracking-wide transition-opacity hover:opacity-85"
          style={{ backgroundColor: "#ffffff", color: "#0D3348", fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.1em" }}
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
}
