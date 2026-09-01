"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { prestigeListings } from "./data";

const NAV_H = 110;

function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function PrestigeContent() {
  const [current, setCurrent] = useState(1);
  const stackRef = useRef<HTMLDivElement>(null);
  const hasListings = prestigeListings.length > 0;

  useEffect(() => {
    if (!hasListings) return;
    const handleScroll = () => {
      if (!stackRef.current) return;
      const stackTop = stackRef.current.offsetTop;
      const cardH = window.innerHeight;
      const scrolled = window.scrollY - stackTop;
      const idx = Math.floor(scrolled / cardH) + 1;
      setCurrent(Math.min(Math.max(1, idx), prestigeListings.length));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasListings]);

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ height: "100svh", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ flex: 1 }} />
        <div style={{ textAlign: "center", padding: "0 clamp(24px, 8vw, 120px)", maxWidth: "780px" }}>
          <HeroText />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "32px" }}>
          <div style={{ width: "1px", flex: 1, backgroundColor: "rgba(13,51,72,0.15)" }} />
        </div>
      </section>

      {hasListings ? (
        <>
          {/* ── Scroll counter ── */}
          <div style={{ position: "fixed", left: "clamp(20px, 3vw, 48px)", top: `${NAV_H + 32}px`, zIndex: 500, pointerEvents: "none" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.85rem, 1.2vw, 1.1rem)", color: "rgba(255,255,255,0.5)", fontWeight: 300, letterSpacing: "-0.01em" }}>
              <span style={{ color: "#ffffff" }}>{String(current).padStart(2, "0")}</span>
              {" / "}
              {String(prestigeListings.length).padStart(2, "0")}
            </span>
          </div>

          {/* ── Sticky stack ── */}
          <div ref={stackRef} style={{ height: `calc(100vh * ${prestigeListings.length})` }}>
            {prestigeListings.map((listing, i) => (
              <div
                key={listing.id}
                style={{
                  position: "sticky",
                  top: 0,
                  height: "100vh",
                  zIndex: i + 1,
                  backgroundColor: "#ffffff",
                  padding: `${NAV_H}px clamp(10px, 1.5vw, 18px) clamp(10px, 1.5vw, 18px)`,
                  boxSizing: "border-box",
                }}
              >
                <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={listing.image}
                    alt={listing.name}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.42)" }} />

                  {/* Centred content */}
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 clamp(24px, 8vw, 120px)" }}>
                    {listing.tag && (
                      <span style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "9px",
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#ffffff",
                        backgroundColor: "#5BC2E7",
                        padding: "5px 16px",
                        marginBottom: "28px",
                        display: "inline-block",
                      }}>
                        {listing.tag}
                      </span>
                    )}

                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.6rem, 7vw, 7.5rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.92, marginBottom: "20px" }}>
                      {listing.name}
                    </h2>

                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(10px, 1.2vw, 12px)", color: "rgba(255,255,255,0.5)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "12px" }}>
                      {listing.suburb}
                    </p>

                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(10px, 1.1vw, 11px)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
                      {listing.address}
                    </p>

                    <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 1.8vw, 1.5rem)", color: "rgba(255,255,255,0.85)", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "12px" }}>
                      {listing.price}
                    </p>

                    {/* Bed / Bath / Car */}
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(10px, 1.1vw, 11px)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "36px" }}>
                      {listing.beds} BED · {listing.baths} BATH · {listing.cars} CAR
                    </p>

                    <Link
                      href={`/property/${listing.id}`}
                      style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0D3348", backgroundColor: "#ffffff", padding: "13px 28px", textDecoration: "none" }}
                    >
                      View Property
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* ── Coming Soon (no listings yet) ── */
        <section
          style={{
            minHeight: "100vh",
            backgroundColor: "#0D3348",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: `${NAV_H}px clamp(24px, 8vw, 120px) clamp(60px, 8vw, 120px)`,
            textAlign: "center",
          }}
        >
          <FadeUp>
            <span style={{
              fontFamily: "var(--font-sans)",
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#5BC2E7",
              display: "block",
              marginBottom: "40px",
            }}>
              Prestige Collection
            </span>

            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 8rem)",
              color: "#ffffff",
              fontWeight: 300,
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              marginBottom: "40px",
            }}>
              Something<br />Exceptional<br />Is Coming.
            </h2>

            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(12px, 1.4vw, 14px)",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.85,
              maxWidth: "48ch",
              margin: "0 auto 52px",
            }}>
              Our prestige collection is being curated now. Register below to be the first to access exclusive listings before they reach the open market.
            </p>

            <RegisterForm />
          </FadeUp>
        </section>
      )}
    </>
  );
}

function HeroText() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 150); return () => clearTimeout(t); }, []);
  return (
    <p style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)",
      color: "#0D3348",
      fontWeight: 300,
      lineHeight: 1.55,
      letterSpacing: "-0.01em",
      textAlign: "center",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
    }}>
      An exclusive collection of the Illawarra&apos;s finest homes — curated for those who demand the exceptional.
    </p>
  );
}

function RegisterForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", budget: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: "Prestige Property Registration" }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "#5BC2E7", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "8px" }}>
          You&apos;re registered.
        </p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
          We&apos;ll be in touch as soon as something exceptional becomes available.
        </p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontSize: "13px",
    color: "#ffffff",
    backgroundColor: "transparent",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "13px 16px",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "12px" }}>
        <input required placeholder="First name" value={form.firstName} onChange={e => set("firstName", e.target.value)} style={inputStyle} />
        <input required placeholder="Last name" value={form.lastName} onChange={e => set("lastName", e.target.value)} style={inputStyle} />
        <input required type="email" placeholder="Email address" value={form.email} onChange={e => set("email", e.target.value)} style={inputStyle} />
        <input placeholder="Phone (optional)" value={form.phone} onChange={e => set("phone", e.target.value)} style={inputStyle} />
      </div>
      <input placeholder="Budget (optional, e.g. $2M+)" value={form.budget} onChange={e => set("budget", e.target.value)} style={inputStyle} />
      <button
        type="submit"
        disabled={status === "submitting"}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#0D3348",
          backgroundColor: "#ffffff",
          padding: "15px 32px",
          border: "none",
          cursor: status === "submitting" ? "wait" : "pointer",
          opacity: status === "submitting" ? 0.6 : 1,
          marginTop: "4px",
        }}
      >
        {status === "submitting" ? "Registering…" : "Register for Early Access"}
      </button>
      {status === "error" && (
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#e74c3c", textAlign: "center" }}>
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}
