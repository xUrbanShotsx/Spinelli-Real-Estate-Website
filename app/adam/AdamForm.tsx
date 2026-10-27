"use client";
import { useState, type FormEvent } from "react";

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
  textTransform: "uppercase" as const,
  letterSpacing: "0.12em",
  color: "#a2b0aa",
  marginBottom: "8px",
  fontFamily: "var(--font-sans)",
};

const errStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#dc2626",
  marginTop: "6px",
  fontFamily: "var(--font-sans)",
};

export default function AdamForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [appraisalType, setAppraisalType] = useState<string[]>([]);

  function toggleType(val: string) {
    setAppraisalType(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const fields = {
      fullName: (form.get("fullName") as string)?.trim(),
      address: (form.get("address") as string)?.trim(),
      email: (form.get("email") as string)?.trim(),
      phone: (form.get("phone") as string)?.trim(),
      appraisalType: appraisalType.join(", ") || "Not specified",
    };

    const next: Record<string, string> = {};
    if (!fields.fullName) next.fullName = "Required";
    if (!fields.address) next.address = "Required";
    if (!fields.email || !/\S+@\S+\.\S+/.test(fields.email)) next.email = "Valid email required";
    if (!fields.phone) next.phone = "Required";

    if (Object.keys(next).length) { setErrors(next); return; }

    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/adam-appraisal", {
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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "32px 0", textAlign: "center" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#5BC2E7" strokeWidth={1.5} style={{ width: "48px", height: "48px" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 300, letterSpacing: "-0.03em", margin: 0, color: "#0D3348" }}>
          Thank you
        </h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#7a7265", maxWidth: "32ch", lineHeight: 1.7, margin: 0 }}>
          We will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .adam-form { display: flex; flex-direction: column; gap: 20px; }
        @media (max-width: 600px) { .adam-form { gap: 14px; } }
      `}</style>
      <form onSubmit={handleSubmit} noValidate className="adam-form">
      <div>
        <label style={labelStyle}>Full name</label>
        <input name="fullName" autoComplete="name" style={inputStyle} />
        {errors.fullName && <p style={errStyle}>{errors.fullName}</p>}
      </div>
      <div>
        <label style={labelStyle}>Property address</label>
        <input name="address" autoComplete="street-address" style={inputStyle} />
        {errors.address && <p style={errStyle}>{errors.address}</p>}
      </div>
      <div>
        <label style={labelStyle}>Email</label>
        <input name="email" type="email" autoComplete="email" style={inputStyle} />
        {errors.email && <p style={errStyle}>{errors.email}</p>}
      </div>
      <div>
        <label style={labelStyle}>Phone</label>
        <input name="phone" type="tel" autoComplete="tel" style={inputStyle} />
        {errors.phone && <p style={errStyle}>{errors.phone}</p>}
      </div>

      {/* Appraisal type */}
      <div>
        <p style={{ ...labelStyle, marginBottom: "12px" }}>Appraisal preference</p>
        <div style={{ display: "flex", gap: "12px" }}>
          {["In person", "Online"].map(opt => {
            const active = appraisalType.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleType(opt)}
                style={{
                  flex: 1,
                  padding: "12px",
                  border: active ? "2px solid #5BC2E7" : "1px solid #E8E5DF",
                  borderRadius: "8px",
                  backgroundColor: active ? "#EEF9FD" : "#F9F8F6",
                  color: active ? "#0D3348" : "#7a7265",
                  fontSize: "13px",
                  fontWeight: active ? 500 : 400,
                  fontFamily: "var(--font-sans)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.15s",
                }}
              >
                <span style={{
                  width: "16px", height: "16px",
                  border: active ? "2px solid #5BC2E7" : "1.5px solid #c8c4bc",
                  borderRadius: "4px",
                  backgroundColor: active ? "#5BC2E7" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {active && (
                    <svg viewBox="0 0 12 12" fill="none" style={{ width: "8px", height: "8px" }}>
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {errors.form && <p style={errStyle}>{errors.form}</p>}
      <button
        type="submit"
        disabled={submitting}
        style={{
          backgroundColor: "#5BC2E7",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "16px",
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontFamily: "var(--font-sans)",
          cursor: submitting ? "not-allowed" : "pointer",
          opacity: submitting ? 0.7 : 1,
          marginTop: "8px",
          width: "100%",
        }}
      >
        {submitting ? "Sending…" : "Get my home value"}
      </button>
    </form>
    </>
  );
}
