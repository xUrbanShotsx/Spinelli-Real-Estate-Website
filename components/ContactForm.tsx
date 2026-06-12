"use client";
import { useState } from "react";

const enquiryTypes = ["Buying", "Selling", "Rentals", "Property Management", "Other"];

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

export default function ContactForm({ propertyAddress }: { propertyAddress?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState("Buying");
  const defaultMessage = propertyAddress ? `I am enquiring about '${propertyAddress}'` : "";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(defaultMessage);

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
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email, phone, enquiryType: activeType, message }),
          });
        } catch {}
        setLoading(false);
        setSubmitted(true);
      }}
      className="space-y-9"
    >
      <div className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="FIRST NAME" required value={firstName} onChange={(e) => setFirstName(e.target.value)} style={inputStyle} className="placeholder:text-black/40" />
        <input type="text" placeholder="LAST NAME" required value={lastName} onChange={(e) => setLastName(e.target.value)} style={inputStyle} className="placeholder:text-black/40" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input type="email" placeholder="EMAIL ADDRESS" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} className="placeholder:text-black/40" />
        <input type="tel" placeholder="PHONE NUMBER" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} className="placeholder:text-black/40" />
      </div>

      {/* Enquiry Type */}
      <div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.12em", fontWeight: 600, color: "#000000", textTransform: "uppercase", marginBottom: "8px" }}>
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
                border: "1px solid #000000",
                backgroundColor: activeType === t ? "#000000" : "transparent",
                color: activeType === t ? "#ffffff" : "#000000",
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

      <div className="flex items-center gap-5 pt-1">
        <button
          type="submit"
          disabled={loading}
          className="inline-block px-7 py-3 text-[12px] tracking-wide transition-opacity hover:opacity-85"
          style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.1em" }}
        >
          {loading ? "SENDING..." : "SUBMIT"}
        </button>
      </div>
    </form>
  );
}
