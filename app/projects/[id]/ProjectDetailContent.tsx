"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Project } from "../data";

function useReveal(threshold = 0.06) {
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
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms` }}>
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

  const galleryImgs = project.gallery.length > 1 ? project.gallery.slice(1, 4) : [project.image, project.image, project.image];

  return (
    <>
      {/* ── HERO: full-bleed cinematic ── */}
      <section style={{ position: "relative", height: "100svh", overflow: "hidden", backgroundColor: "#0D3348" }}>
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.gallery[0] ?? project.image}
          alt={project.name}
          onLoad={() => setHeroLoaded(true)}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            opacity: heroLoaded ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        />

        {/* Gradient overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.35) 100%)" }} />

        {/* Top bar: back link */}
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10" style={{ position: "absolute", top: 0, left: 0, right: 0, paddingTop: "108px" }}>
          <Link
            href="/projects"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All Projects
          </Link>
        </div>

        {/* Bottom: project name + meta */}
        <div
          className="max-w-screen-2xl mx-auto px-6 sm:px-10"
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, paddingBottom: "56px" }}
        >
          {/* Status + suburb */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <span style={{
              fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "4px 12px",
              backgroundColor: project.status === "Now Selling" ? "#5BC2E7" : project.status === "Coming Soon" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.1)",
              color: "#ffffff",
              border: project.status === "Now Selling" ? "none" : "1px solid rgba(255,255,255,0.3)",
            }}>
              {project.status}
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              {project.suburb}
            </span>
          </div>

          {/* Project name — large editorial */}
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 9vw, 9rem)",
            color: "#ffffff",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            maxWidth: "14ch",
          }}>
            {project.name}
          </h1>
        </div>

        {/* Scroll cue */}
        <div style={{ position: "absolute", bottom: "56px", right: "clamp(24px, 2.8vw, 40px)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em", textTransform: "uppercase", writingMode: "vertical-rl" }}>Scroll</span>
          <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)" }} />
        </div>
      </section>

      {/* ── FACTS STRIP ── */}
      <section style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #E8E5DF" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {[
              { label: "Location", value: project.suburb },
              { label: "Address",  value: project.address },
              { label: "Type",     value: project.category },
              { label: "Scale",    value: project.units },
            ].map((item, i) => (
              <div
                key={item.label}
                style={{
                  padding: "32px 0",
                  paddingRight: "24px",
                  borderLeft: i > 0 ? "1px solid #E8E5DF" : "none",
                  paddingLeft: i > 0 ? "24px" : "0",
                }}
              >
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "9px", color: "#a2b0aa", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "8px" }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.95rem, 1.4vw, 1.2rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT: description left + tall image right ── */}
      <section style={{ backgroundColor: "#ffffff", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "clamp(48px, 7vw, 100px)", alignItems: "start" }}>

            {/* Left: description + CTA */}
            <FadeUp>
              <span className="label-tag">About the Project</span>

              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                color: "#0D3348",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                marginBottom: "36px",
              }}>
                {project.description}
              </p>

              {project.longDescription && (
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#7a7265", lineHeight: 1.95, marginBottom: "48px" }}>
                  {project.longDescription}
                </p>
              )}

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link
                  href={`/contact?project=${project.id}`}
                  style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", backgroundColor: "#5BC2E7", color: "#ffffff", padding: "15px 32px", textDecoration: "none" }}
                >
                  Make an Enquiry
                </Link>
                {project.status !== "Sold Out" && (
                  <Link
                    href="/contact"
                    style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0D3348", border: "1px solid rgba(13,51,72,0.2)", padding: "15px 32px", textDecoration: "none" }}
                  >
                    Register Interest
                  </Link>
                )}
              </div>
            </FadeUp>

            {/* Right: tall image */}
            <FadeUp delay={120}>
              <div
                style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", cursor: "zoom-in" }}
                onClick={() => setLightboxImg(project.gallery[1] ?? project.gallery[0] ?? project.image)}
                className="group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.gallery[1] ?? project.gallery[0] ?? project.image}
                  alt={project.name}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.8s ease" }}
                  className="group-hover:scale-[1.03]"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── GALLERY: 3 images, editorial tight grid ── */}
      <section style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 pb-24">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3px" }}>
            {(project.gallery.slice(2, 5).length >= 3
              ? project.gallery.slice(2, 5)
              : [project.gallery[0] ?? project.image, project.gallery[1] ?? project.image, project.image]
            ).map((img, i) => (
              <FadeUp key={i} delay={i * 60}>
                <div
                  style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", cursor: "zoom-in" }}
                  onClick={() => setLightboxImg(img)}
                  className="group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${project.name} ${i + 1}`}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.8s ease" }}
                    className="group-hover:scale-[1.04]"
                  />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECT TEAM ── */}
      <section style={{ backgroundColor: "#FBF9F3", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "56px", borderBottom: "1px solid #E8E5DF", paddingBottom: "24px" }}>
              <span className="label-tag" style={{ marginBottom: 0 }}>Project Team</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.5rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.03em" }}>
                Speak with our agents
              </span>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)" }}>
            {AGENTS.map((agent, i) => (
              <FadeUp key={agent.name} delay={i * 100}>
                <div style={{ backgroundColor: "#ffffff", display: "grid", gridTemplateColumns: "120px 1fr", overflow: "hidden" }}>
                  {/* Photo */}
                  <div style={{ position: "relative", aspectRatio: "1/1.2", overflow: "hidden", alignSelf: "stretch" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={agent.image}
                      alt={agent.name}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "4px" }}>
                      {agent.name}
                    </h3>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "9px", color: "#5BC2E7", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "24px" }}>
                      {agent.role}
                    </p>
                    <div style={{ borderTop: "1px solid #E8E5DF", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <a
                        href={`tel:${agent.phone.replace(/\s/g, "")}`}
                        style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#0D3348", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ color: "#5BC2E7", flexShrink: 0 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        {agent.phone}
                      </a>
                      <a
                        href={`mailto:${agent.email}`}
                        style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#0D3348", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ color: "#5BC2E7", flexShrink: 0 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        {agent.email}
                      </a>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENQUIRY CTA ── */}
      <section style={{ backgroundColor: "#0D3348", paddingTop: "120px", paddingBottom: "120px" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px, 7vw, 100px)", alignItems: "end" }}>
              <div>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", color: "#5BC2E7", letterSpacing: "0.18em", textTransform: "uppercase", display: "block", marginBottom: "24px" }}>
                  {project.status === "Sold Out" ? "This Project" : "Register Your Interest"}
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 6vw, 6rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.92 }}>
                  {project.status === "Sold Out" ? "Sold Out" : <>Enquire<br />Today</>}
                </h2>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.85, marginBottom: "40px" }}>
                  {project.status === "Sold Out"
                    ? `${project.name} is fully sold. Contact our team to learn about upcoming projects in the Illawarra region.`
                    : "Get in touch with our projects team for pricing, floor plans, availability and to register for VIP access."}
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link
                    href={`/contact?project=${project.id}`}
                    style={{ display: "inline-block", fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", backgroundColor: "#5BC2E7", color: "#ffffff", padding: "16px 36px", textDecoration: "none" }}
                  >
                    {project.status === "Sold Out" ? "Contact Us" : "Make an Enquiry"}
                  </Link>
                  <a
                    href="tel:0242960047"
                    style={{ display: "inline-block", fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.2)", padding: "16px 36px", textDecoration: "none" }}
                  >
                    02 4296 0047
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.94)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", cursor: "zoom-out" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightboxImg} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} onClick={(e) => e.stopPropagation()} />
          <button onClick={() => setLightboxImg(null)} style={{ position: "absolute", top: "24px", right: "24px", background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "24px", cursor: "pointer", lineHeight: 1 }}>✕</button>
        </div>
      )}
    </>
  );
}
