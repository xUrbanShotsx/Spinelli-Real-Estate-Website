"use client";
import { useState, type FormEvent } from "react";

const INTEREST_OPTIONS = [
  { value: "subdivide", label: "Subdivide my land" },
  { value: "knockdown_rebuild", label: "Knockdown & rebuild" },
  { value: "duplex", label: "Build a duplex" },
  { value: "townhouse", label: "Townhouse development" },
  { value: "just_looking", label: "Exploring my options" },
];

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  height: "52px",
  border: "1px solid #E8E5DF",
  borderRadius: "8px",
  background: "#F9F8F6",
  padding: "0 16px",
  fontSize: "15px",
  fontFamily: "var(--font-sans)",
  color: "#000",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "#a2b0aa",
  marginBottom: "6px",
  fontFamily: "var(--font-sans)",
};

const errStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#dc2626",
  marginTop: "6px",
  fontFamily: "var(--font-sans)",
};

export default function DevelopForm() {
  const [interest, setInterest] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const fields = {
      firstName: (form.get("firstName") as string)?.trim(),
      lastName: (form.get("lastName") as string)?.trim(),
      address: (form.get("address") as string)?.trim(),
      phone: (form.get("phone") as string)?.trim(),
      email: (form.get("email") as string)?.trim(),
      interest,
    };

    const next: Record<string, string> = {};
    if (!fields.firstName) next.firstName = "Required";
    if (!fields.lastName) next.lastName = "Required";
    if (!fields.address) next.address = "Required";
    if (!fields.phone) next.phone = "Required";
    if (!fields.email || !/\S+@\S+\.\S+/.test(fields.email)) next.email = "Valid email required";
    if (!fields.interest) next.interest = "Please select an option";

    if (Object.keys(next).length) { setErrors(next); return; }

    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/develop-appraisal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setErrors({ form: "Something went wrong. Please call us on 02 4296 0047." });
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "64px 0", textAlign: "center" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#5BC2E7" strokeWidth={1.5} style={{ width: "48px", height: "48px" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 300, letterSpacing: "-0.03em", margin: 0 }}>Thank you</h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#7a7265", maxWidth: "36ch", lineHeight: 1.7 }}>
          Your request has been received. A member of the Spinelli team will be in touch to discuss your development opportunity.
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .dev-form-fields { display: grid; gap: 20px; grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) { .dev-form-fields { grid-template-columns: 1fr; gap: 14px; } }
      `}</style>
      <form onSubmit={handleSubmit} noValidate className="dev-form-fields">
        <div>
          <label style={labelStyle}>First name</label>
          <input name="firstName" autoComplete="given-name" style={inputStyle} />
          {errors.firstName && <p style={errStyle}>{errors.firstName}</p>}
        </div>
        <div>
          <label style={labelStyle}>Last name</label>
          <input name="lastName" autoComplete="family-name" style={inputStyle} />
          {errors.lastName && <p style={errStyle}>{errors.lastName}</p>}
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>Property address</label>
          <input name="address" autoComplete="street-address" style={inputStyle} />
          {errors.address && <p style={errStyle}>{errors.address}</p>}
        </div>
        <div>
          <label style={labelStyle}>Phone</label>
          <input name="phone" type="tel" autoComplete="tel" style={inputStyle} />
          {errors.phone && <p style={errStyle}>{errors.phone}</p>}
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input name="email" type="email" autoComplete="email" style={inputStyle} />
          {errors.email && <p style={errStyle}>{errors.email}</p>}
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>I&apos;m interested in</label>
          <select
            value={interest}
            onChange={e => setInterest(e.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="">Select an option</option>
            {INTEREST_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {errors.interest && <p style={errStyle}>{errors.interest}</p>}
        </div>
        {errors.form && (
          <div style={{ gridColumn: "1 / -1" }}>
            <p style={errStyle}>{errors.form}</p>
          </div>
        )}
        <div style={{ gridColumn: "1 / -1" }}>
          <button
            type="submit"
            disabled={submitting}
            style={{
              backgroundColor: "#5BC2E7",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "16px",
              width: "100%",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "var(--font-sans)",
              cursor: submitting ? "not-allowed" : "pointer",
              opacity: submitting ? 0.7 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {submitting ? "Sending…" : "Unlock my property's potential"}
          </button>
        </div>
      </form>
    </>
  );
}
