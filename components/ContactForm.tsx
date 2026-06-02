"use client";
import { useState } from "react";

const enquiryTypes = ["Buying", "Selling", "Rentals", "Property Management", "Other"];

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderBottom: "1px solid #E8E5DF",
  padding: "7px 0",
  fontFamily: "var(--font-sans)",
  fontSize: "11px",
  letterSpacing: "0.1em",
  color: "#000000",
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
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", marginBottom: "12px" }}>
          Message Received
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.75 }}>
          Thank you for reaching out. One of our team will be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-5">
        <input type="text" placeholder="FIRST NAME" required style={inputStyle} />
        <input type="text" placeholder="LAST NAME" required style={inputStyle} />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <input type="email" placeholder="EMAIL ADDRESS" required style={inputStyle} />
        <input type="tel" placeholder="PHONE NUMBER" style={inputStyle} />
      </div>

      {/* Enquiry Type */}
      <div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.1em", color: "#a2b0aa", textTransform: "uppercase", marginBottom: "8px" }}>
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
                letterSpacing: "0.05em",
                padding: "5px 12px",
                border: activeType === t ? "1px solid #000000" : "1px solid #DAD7CE",
                backgroundColor: activeType === t ? "#000000" : "transparent",
                color: activeType === t ? "#ffffff" : "#7a7265",
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
        style={{
          ...inputStyle,
          resize: "none",
          borderBottom: "none",
          border: "1px solid #E8E5DF",
          padding: "10px 12px",
          letterSpacing: "0.1em",
        }}
      />

      <div className="flex items-center gap-5 pt-1">
        <button
          type="submit"
          className="inline-block px-7 py-3 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85"
          style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
        >
          Send Enquiry
        </button>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", lineHeight: 1.5 }}>
          We respond within<br />one business day
        </p>
      </div>
    </form>
  );
}
