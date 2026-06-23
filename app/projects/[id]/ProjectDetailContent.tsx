"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Project } from "../data";

function useReveal(threshold = 0.05) {
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

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const AGENTS = [
  { name: "Paul Spinelli", role: "Director — Project Sales", phone: "02 4296 0047", email: "paul@spinellire.com.au", image: "/Staff/paul-spinelli.png" },
  { name: "Adam Spinelli", role: "Director — Project Sales", phone: "02 4296 0047", email: "adam@spinellire.com.au", image: "/Staff/adam-spinelli.png" },
];

export default function ProjectDetailContent({ project }: { project: Project }) {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const heroImage = project.gallery[0] ?? project.image;
  const galleryImages = project.gallery.length >= 4
    ? project.gallery.slice(1, 5)
    : [project.image, project.image, project.image, project.image];

  return (
    <>
      {/* ── 1. CINEMATIC HERO ── */}
      <section style={{ position: "relative", height: "100svh", overflow: "hidden", backgroundColor: "#0a0a0a" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImage}
          alt={project.name}
          onLoad={() => setHeroLoaded(true)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: heroLoaded ? 0.75 : 0, transition: "opacity 1.4s ease" }}
        />
        {/* Bottom gradient */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.4) 100%)" }} />

        {/* Back link */}
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10" style={{ position: "absolute", top: 0, left: 0, right: 0, paddingTop: "112px" }}>
          <Link
            href="/projects"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Projects
          </Link>
        </div>

        {/* Project name — bottom left */}
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10" style={{ position: "absolute", bottom: 0, left: 0, right: 0, paddingBottom: "64px" }}>
          <div style={{ marginBottom: "18px", display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.2)", padding: "4px 12px" }}>
              {project.status}
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              {project.suburb}
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 10vw, 10rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.88, maxWidth: "16ch" }}>
            {project.name}
          </h1>
        </div>
      </section>

      {/* ── 2. EDITORIAL INTRO — description as massive display text ── */}
      <section style={{ backgroundColor: "#ffffff", paddingTop: "clamp(80px, 10vw, 140px)", paddingBottom: "clamp(80px, 10vw, 140px)" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <Reveal>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "48px" }}>
              {project.category} · {project.suburb}
            </p>
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4.5vw, 4.2rem)",
              color: "#0D3348",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              maxWidth: "24ch",
            }}>
              {project.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 3. KEY FACTS ── */}
      <section style={{ backgroundColor: "#0D3348" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { label: "Location", value: project.suburb },
              { label: "Address",  value: project.address },
              { label: "Type",     value: project.category },
              { label: "Scale",    value: project.units },
            ].map((item, i) => (
              <div key={item.label} style={{ padding: "36px 0", paddingRight: "20px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none", paddingLeft: i > 0 ? "20px" : 0 }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "9px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "10px" }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.9rem, 1.3vw, 1.15rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. IMAGE LEFT + COPY RIGHT ── */}
      <section style={{ backgroundColor: "#ffffff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr" }}>

          {/* Left: tall hero image, no padding — bleeds left */}
          <div
            style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", cursor: "zoom-in" }}
            onClick={() => setLightboxImg(heroImage)}
            className="group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImage} alt={project.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.9s ease" }} className="group-hover:scale-[1.03]" />
          </div>

          {/* Right: copy, padded to align with navbar */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(48px, 8vw, 120px) clamp(24px, 2.8vw, 40px) clamp(48px, 8vw, 120px) clamp(48px, 6vw, 80px)" }}>
            <Reveal>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "9px", color: "#5BC2E7", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "32px" }}>
                About the Development
              </p>
              {project.longDescription && (
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(14px, 1.2vw, 16px)", color: "#58503C", lineHeight: 1.95, marginBottom: "48px" }}>
                  {project.longDescription}
                </p>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Link
                  href={`/contact?project=${project.id}`}
                  style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", backgroundColor: "#0D3348", color: "#ffffff", padding: "16px 32px", textDecoration: "none", display: "inline-block", alignSelf: "flex-start" }}
                >
                  Make an Enquiry
                </Link>
                {project.status !== "Sold Out" && (
                  <Link
                    href="/contact"
                    style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#0D3348", border: "1px solid rgba(13,51,72,0.2)", padding: "16px 32px", textDecoration: "none", display: "inline-block", alignSelf: "flex-start" }}
                  >
                    Register Interest
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 5. GALLERY — 2 large + 2 below ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "3px 0 0" }}>
        {/* Top row: 2 images */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px", marginBottom: "3px" }}>
          {galleryImages.slice(0, 2).map((img, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", cursor: "zoom-in" }}
                onClick={() => setLightboxImg(img)}
                className="group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`${project.name} ${i + 2}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.9s ease" }} className="group-hover:scale-[1.04]" />
              </div>
            </Reveal>
          ))}
        </div>
        {/* Bottom row: 2 more images (or fallback) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px" }}>
          {galleryImages.slice(2, 4).map((img, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", cursor: "zoom-in" }}
                onClick={() => setLightboxImg(img)}
                className="group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`${project.name} ${i + 4}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.9s ease" }} className="group-hover:scale-[1.04]" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 6. PROJECT TEAM ── */}
      <section style={{ backgroundColor: "#FBF9F3", paddingTop: "clamp(80px, 10vw, 120px)", paddingBottom: "clamp(80px, 10vw, 120px)" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <Reveal>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "9px", color: "#a2b0aa", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "20px" }}>
              Project Team
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 4rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: "64px" }}>
              Speak with our<br />agents directly
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
            {AGENTS.map((agent, i) => (
              <Reveal key={agent.name} delay={i * 100}>
                <div style={{ backgroundColor: "#ffffff", display: "grid", gridTemplateColumns: "140px 1fr" }}>
                  {/* Photo */}
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={agent.image} alt={agent.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block", minHeight: "180px" }} />
                  </div>
                  {/* Info */}
                  <div style={{ padding: "36px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.03em", marginBottom: "6px" }}>
                        {agent.name}
                      </h3>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "9px", color: "#5BC2E7", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                        {agent.role}
                      </p>
                    </div>
                    <div style={{ borderTop: "1px solid #E8E5DF", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      <a href={`tel:${agent.phone.replace(/\s/g, "")}`} style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#0D3348", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5BC2E7" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                        {agent.phone}
                      </a>
                      <a href={`mailto:${agent.email}`} style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#0D3348", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5BC2E7" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                        {agent.email}
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. DARK CTA ── */}
      <section style={{ backgroundColor: "#0a0a0a", paddingTop: "clamp(100px, 12vw, 160px)", paddingBottom: "clamp(100px, 12vw, 160px)" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <Reveal>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "28px" }}>
              {project.status === "Sold Out" ? "This Project" : "Register Your Interest"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px, 8vw, 120px)", alignItems: "end" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 7vw, 7.5rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.88 }}>
                {project.status === "Sold Out" ? <>Sold<br />Out</> : <>Enquire<br />Today</>}
              </h2>
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.4)", lineHeight: 1.9, marginBottom: "40px" }}>
                  {project.status === "Sold Out"
                    ? `${project.name} is fully sold. Contact our team to learn about upcoming projects across the Illawarra.`
                    : "Contact our projects team for pricing, floor plans, availability and VIP access to future releases."}
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link
                    href={`/contact?project=${project.id}`}
                    style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", backgroundColor: "#5BC2E7", color: "#ffffff", padding: "16px 36px", textDecoration: "none", display: "inline-block" }}
                  >
                    {project.status === "Sold Out" ? "Contact Us" : "Make an Enquiry"}
                  </Link>
                  <a
                    href="tel:0242960047"
                    style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.15)", padding: "16px 36px", textDecoration: "none", display: "inline-block" }}
                  >
                    02 4296 0047
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxImg && (
        <div onClick={() => setLightboxImg(null)} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.96)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", cursor: "zoom-out" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightboxImg} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} onClick={(e) => e.stopPropagation()} />
          <button onClick={() => setLightboxImg(null)} style={{ position: "absolute", top: "24px", right: "24px", background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "22px", cursor: "pointer", lineHeight: 1 }}>✕</button>
        </div>
      )}
    </>
  );
}
