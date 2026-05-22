"use client";
import { useState } from "react";

const enquiryTypes = [
  "Free Property Appraisal",
  "Buyer Enquiry",
  "Rental Enquiry",
  "Commercial Property",
  "Business Sales",
  "Property Management",
  "Project / Off the Plan",
  "General Enquiry",
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "10px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#a2b0aa",
          display: "block",
          marginBottom: "8px",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderBottom: "1px solid #E8E5DF",
  padding: "10px 0",
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  color: "#000000",
  backgroundColor: "transparent",
  outline: "none",
};

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [activeType, setActiveType] = useState("Free Property Appraisal");

  if (submitted) {
    return (
      <div className="py-20">
        <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "24px" }} />
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.2rem",
            color: "#000000",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            marginBottom: "16px",
          }}
        >
          Message Received
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.75, maxWidth: "40ch" }}>
          Thank you for reaching out. One of our team will be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-8">
      <div className="grid sm:grid-cols-2 gap-8">
        <Field label="First Name">
          <input type="text" placeholder="Jane" required style={inputStyle} />
        </Field>
        <Field label="Last Name">
          <input type="text" placeholder="Smith" required style={inputStyle} />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        <Field label="Email Address">
          <input type="email" placeholder="jane@example.com" required style={inputStyle} />
        </Field>
        <Field label="Phone Number">
          <input type="tel" placeholder="04xx xxx xxx" style={inputStyle} />
        </Field>
      </div>

      <Field label="Enquiry Type">
        <div className="flex flex-wrap gap-2 pt-2">
          {enquiryTypes.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveType(t)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                letterSpacing: "0.06em",
                padding: "6px 14px",
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
      </Field>

      <Field label="Suburb of Interest">
        <input type="text" placeholder="e.g. Kiama, Wollongong…" style={inputStyle} />
      </Field>

      <Field label="Message">
        <textarea
          rows={4}
          placeholder="Tell us how we can help…"
          style={{ ...inputStyle, resize: "none" }}
        />
      </Field>

      <div className="flex items-center gap-6 pt-2">
        <button
          type="submit"
          className="inline-block px-8 py-4 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
          style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
        >
          Send Enquiry
        </button>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", lineHeight: 1.6 }}>
          We respond within<br />one business day
        </p>
      </div>
    </form>
  );
}
