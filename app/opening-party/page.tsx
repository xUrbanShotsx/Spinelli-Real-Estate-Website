"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function OpeningPartyPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");

    try {
      const res = await fetch("/api/opening-party", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, mobile }),
      });

      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid #DAD7CE",
    backgroundColor: "#ffffff",
    color: "#0D3348",
    fontSize: "15px",
    fontFamily: "var(--font-sans)",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-sans)",
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#7a7265",
    marginBottom: "8px",
  };

  return (
    <div style={{
      height: "100vh",
      backgroundColor: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: "90px",
      boxSizing: "border-box",
      padding: "110px 24px 0",
    }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>

        {/* Event details */}
        <div style={{ marginBottom: "32px" }}>
          <span style={{
            fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "12px",
          }}>
            You&apos;re Invited
          </span>
          <h1 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)",
            color: "#0D3348", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "16px",
          }}>
            Opening Party
          </h1>
          <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "16px" }} />
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#0D3348", fontWeight: 500 }}>
              Thursday 14 August 2026
            </p>
            <span style={{ color: "#DAD7CE" }}>·</span>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265" }}>
              10:00 AM – 5:00 PM
            </p>
          </div>
        </div>

        {/* Form or success */}
        {formState === "success" ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{
              width: "44px", height: "44px", backgroundColor: "#5BC2E7",
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px",
            }}>
              <svg fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth={2} style={{ width: "20px", height: "20px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#0D3348",
              fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "10px",
            }}>
              See you there!
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#7a7265", lineHeight: 1.7 }}>
              Thanks {firstName}, we&apos;ve received your RSVP and look forward to seeing you on 14 August.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

            {/* First Name */}
            <div>
              <label style={labelStyle}>First Name</label>
              <input
                type="text" required value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your first name" style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#5BC2E7")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#DAD7CE")}
              />
            </div>

            {/* Last Name */}
            <div>
              <label style={labelStyle}>Last Name</label>
              <input
                type="text" required value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Your last name" style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#5BC2E7")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#DAD7CE")}
              />
            </div>

            {/* Mobile */}
            <div>
              <label style={labelStyle}>Mobile Number</label>
              <input
                type="tel" required value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="04XX XXX XXX" style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#5BC2E7")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#DAD7CE")}
              />
            </div>

            {formState === "error" && (
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#dc2626", margin: 0 }}>
                Something went wrong. Please try again or call us on 02 4296 0047.
              </p>
            )}

            <button
              type="submit"
              disabled={formState === "submitting"}
              style={{
                width: "100%", padding: "14px",
                backgroundColor: formState === "submitting" ? "#a2b0aa" : "#5BC2E7",
                color: "#ffffff", border: "none",
                fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600,
                letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: formState === "submitting" ? "not-allowed" : "pointer",
                transition: "opacity 0.2s", marginTop: "4px",
              }}
            >
              {formState === "submitting" ? "Sending…" : "RSVP Now"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
