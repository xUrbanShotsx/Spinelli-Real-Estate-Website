"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Property } from "@/lib/types";

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderBottom: "1px solid #000000",
  padding: "8px 0",
  fontFamily: "var(--font-sans)",
  fontSize: "12px",
  letterSpacing: "0.08em",
  color: "#000000",
  backgroundColor: "transparent",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "10px",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "#a2b0aa",
  display: "block",
  marginBottom: "6px",
};

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            letterSpacing: "0.08em",
            padding: "8px 18px",
            border: "1px solid",
            borderColor: value === opt.value ? "#000000" : "#E8E5DF",
            backgroundColor: value === opt.value ? "#000000" : "transparent",
            color: value === opt.value ? "#ffffff" : "#7a7265",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function OfferPage({ property }: { property: Property }) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [secondPurchaser, setSecondPurchaser] = useState("no");
  const [finance, setFinance] = useState("");
  const [inspection, setInspection] = useState("");
  const [purpose, setPurpose] = useState("");
  const [solicitor, setSolicitor] = useState("");

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
      <div className="fixed left-6 sm:left-12 lg:left-20" style={{ top: "10px", zIndex: 201 }}>
        <img
          src="/logo.png"
          alt="Spinelli Real Estate"
          style={{
            height: "85px",
            width: "auto",
            objectFit: "contain",
            filter: "brightness(0) saturate(100%) invert(73%) sepia(40%) saturate(692%) hue-rotate(161deg) brightness(98%)",
          }}
        />
      </div>

      {/* Close */}
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
        style={{ paddingTop: "120px", paddingBottom: "80px" }}
      >
        {submitted ? (
          <div style={{ maxWidth: "520px", margin: "0 auto", paddingTop: "40px" }}>
            <div style={{ width: "32px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "20px" }} />
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.03em", marginBottom: "12px" }}>
              Offer Submitted
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265", lineHeight: 1.75 }}>
              Thank you for submitting your offer. Our team will review the details and be in touch with you shortly.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-start">

            {/* Form */}
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", display: "block", marginBottom: "10px" }}>
                Make an Offer
              </span>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#5BC2E7", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "40px" }}>
                Submit Your Offer
              </h1>

              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-10">

                {/* ── Buyer Details ── */}
                <div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#000000", fontWeight: 600, marginBottom: "24px", paddingBottom: "10px", borderBottom: "1px solid #E8E5DF" }}>
                    Buyer Details
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label style={labelStyle}>First Name *</label>
                      <input type="text" required placeholder="John" style={inputStyle} className="placeholder:text-black/25" />
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name *</label>
                      <input type="text" required placeholder="Smith" style={inputStyle} className="placeholder:text-black/25" />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address *</label>
                      <input type="email" required placeholder="john@example.com" style={inputStyle} className="placeholder:text-black/25" />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number *</label>
                      <input type="tel" required placeholder="04XX XXX XXX" style={inputStyle} className="placeholder:text-black/25" />
                    </div>
                    <div className="sm:col-span-2">
                      <label style={labelStyle}>Buyer&apos;s Contact Address</label>
                      <input type="text" placeholder="123 Example Street, Suburb NSW 2000" style={inputStyle} className="placeholder:text-black/25" />
                    </div>
                  </div>
                </div>

                {/* ── Second Purchaser ── */}
                <div>
                  <label style={{ ...labelStyle, marginBottom: "12px" }}>Would you like to add a second purchaser?</label>
                  <RadioGroup
                    name="secondPurchaser"
                    options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]}
                    value={secondPurchaser}
                    onChange={setSecondPurchaser}
                  />
                  {secondPurchaser === "yes" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                      <div>
                        <label style={labelStyle}>Second Purchaser First Name</label>
                        <input type="text" placeholder="Jane" style={inputStyle} className="placeholder:text-black/25" />
                      </div>
                      <div>
                        <label style={labelStyle}>Second Purchaser Last Name</label>
                        <input type="text" placeholder="Smith" style={inputStyle} className="placeholder:text-black/25" />
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Offer Price ── */}
                <div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#000000", fontWeight: 600, marginBottom: "24px", paddingBottom: "10px", borderBottom: "1px solid #E8E5DF" }}>
                    Offer Price
                  </p>
                  <div>
                    <label style={labelStyle}>Offer Price *</label>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000", fontWeight: 500 }}>$</span>
                      <input
                        type="text"
                        required
                        placeholder="0"
                        style={{ ...inputStyle, flex: 1 }}
                        className="placeholder:text-black/25"
                      />
                    </div>
                  </div>
                </div>

                {/* ── Deposit ── */}
                <div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#000000", fontWeight: 600, marginBottom: "24px", paddingBottom: "10px", borderBottom: "1px solid #E8E5DF" }}>
                    Deposit
                  </p>
                  <div>
                    <label style={labelStyle}>Deposit Amount *</label>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000", fontWeight: 500 }}>$</span>
                      <input
                        type="text"
                        required
                        placeholder="0"
                        style={{ ...inputStyle, flex: 1 }}
                        className="placeholder:text-black/25"
                      />
                    </div>
                  </div>
                </div>

                {/* ── Conditions ── */}
                <div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#000000", fontWeight: 600, marginBottom: "24px", paddingBottom: "10px", borderBottom: "1px solid #E8E5DF" }}>
                    Conditions
                  </p>
                  <div className="space-y-8">
                    <div>
                      <label style={{ ...labelStyle, marginBottom: "12px" }}>Subject to finance approval?</label>
                      <RadioGroup
                        name="finance"
                        options={[{ label: "Yes", value: "yes" }, { label: "No (Cash Contract)", value: "no" }]}
                        value={finance}
                        onChange={setFinance}
                      />
                    </div>
                    <div>
                      <label style={{ ...labelStyle, marginBottom: "12px" }}>Subject to a satisfactory building and pest inspection report?</label>
                      <RadioGroup
                        name="inspection"
                        options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]}
                        value={inspection}
                        onChange={setInspection}
                      />
                    </div>
                  </div>
                </div>

                {/* ── Purpose ── */}
                <div>
                  <label style={{ ...labelStyle, marginBottom: "12px" }}>Purpose of buying?</label>
                  <RadioGroup
                    name="purpose"
                    options={[
                      { label: "I am buying to live here", value: "owner-occupier" },
                      { label: "I am buying to invest", value: "investor" },
                    ]}
                    value={purpose}
                    onChange={setPurpose}
                  />
                </div>

                {/* ── Solicitor ── */}
                <div>
                  <label style={{ ...labelStyle, marginBottom: "12px" }}>Do you have a solicitor?</label>
                  <RadioGroup
                    name="solicitor"
                    options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]}
                    value={solicitor}
                    onChange={setSolicitor}
                  />
                  {solicitor === "yes" && (
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div>
                        <label style={labelStyle}>Solicitor Name</label>
                        <input type="text" placeholder="Firm or solicitor name" style={inputStyle} className="placeholder:text-black/25" />
                      </div>
                      <div>
                        <label style={labelStyle}>Solicitor Phone</label>
                        <input type="tel" placeholder="02 XXXX XXXX" style={inputStyle} className="placeholder:text-black/25" />
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Comments ── */}
                <div>
                  <label style={{ ...labelStyle, marginBottom: "12px" }}>Do you have further comments or conditions?</label>
                  <textarea
                    rows={5}
                    placeholder="YOUR MESSAGE"
                    className="placeholder:text-black/25"
                    style={{
                      ...inputStyle,
                      resize: "none",
                      borderBottom: "none",
                      border: "1px solid #000000",
                      padding: "10px 12px",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-block px-8 py-3.5 text-[12px] tracking-widest uppercase transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.1em" }}
                >
                  Submit Offer
                </button>
              </form>
            </div>

            {/* Property Card */}
            <div className="lg:sticky lg:top-32">
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#a2b0aa", marginBottom: "16px" }}>
                Property
              </p>
              <div style={{ border: "1px solid #E8E5DF", overflow: "hidden" }}>
                {/* Image */}
                <div className="relative" style={{ height: "220px", backgroundColor: "#E8F6FC" }}>
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    sizes="420px"
                    className="object-cover object-top"
                  />
                  {property.tag && (
                    <div className="absolute top-0 left-0">
                      <span style={{ display: "block", backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 600, letterSpacing: "0.14em", padding: "5px 10px", textTransform: "uppercase" }}>
                        {property.tag}
                      </span>
                    </div>
                  )}
                </div>
                {/* Details */}
                <div style={{ padding: "20px" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "4px" }}>
                    {property.address}
                  </p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>
                    {property.suburb}
                  </p>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "#5BC2E7", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "14px" }}>
                    {property.price}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", paddingTop: "14px", borderTop: "1px solid #E8E5DF" }}>
                    {property.beds !== undefined && (
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#7a7265" }}>{property.beds} Bed</span>
                    )}
                    {property.baths !== undefined && (
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#7a7265" }}>{property.baths} Bath</span>
                    )}
                    {property.cars !== undefined && (
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#7a7265" }}>{property.cars} Car</span>
                    )}
                    {property.landSize && (
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#7a7265" }}>{property.landSize}</span>
                    )}
                  </div>
                </div>
              </div>
              <Link
                href={`/property/${property.id}`}
                className="block mt-3 transition-opacity hover:opacity-60"
                style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "center" }}
              >
                ← Back to listing
              </Link>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
