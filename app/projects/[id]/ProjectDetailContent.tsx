"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Project } from "../data";

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

const statusColor: Record<string, string> = {
  "Now Selling": "#5BC2E7",
  "Coming Soon": "#0D3348",
  "Sold Out":    "rgba(0,0,0,0.45)",
};

export default function ProjectDetailContent({ project }: { project: Project }) {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <>
      {/* ── Section 1: Details left + first image right ── */}
      <section style={{ backgroundColor: "#ffffff", minHeight: "100svh", paddingTop: "90px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 w-full" style={{ padding: "40px clamp(24px, 5vw, 80px)" }}>

          {/* Back link */}
          <Link
            href="/projects"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(13,51,72,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", marginBottom: "48px" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All Projects
          </Link>

          {/* Two-column layout */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 80px)", alignItems: "center" }} className="grid-cols-1 lg:grid-cols-2">

            {/* Left: details */}
            <div>
              {/* Status */}
              <span style={{
                fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em",
                textTransform: "uppercase", padding: "5px 14px", display: "inline-block", marginBottom: "28px",
                backgroundColor: statusColor[project.status] ?? "rgba(0,0,0,0.45)", color: "#ffffff",
              }}>
                {project.status}
              </span>

              {/* Name */}
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 6vw, 6rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.92, marginBottom: "32px" }}>
                {project.name}
              </h1>

              {/* Divider */}
              <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "32px" }} />

              {/* Details list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  { label: "Location", value: project.suburb },
                  { label: "Address", value: project.address },
                  { label: "Type", value: project.category },
                  { label: "Scale", value: project.units },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid #F0EDE7", gap: "16px" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0 }}>
                      {item.label}
                    </span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#0D3348", textAlign: "right" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ marginTop: "36px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link
                  href={`/contact?project=${project.id}`}
                  style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", backgroundColor: "#5BC2E7", color: "#ffffff", padding: "14px 28px", textDecoration: "none" }}
                >
                  Make an Enquiry
                </Link>
                {project.status !== "Sold Out" && (
                  <Link
                    href="/contact"
                    style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0D3348", border: "1px solid rgba(13,51,72,0.2)", padding: "14px 28px", textDecoration: "none" }}
                  >
                    Register Interest
                  </Link>
                )}
              </div>
            </div>

            {/* Right: framed first image */}
            <div style={{ padding: "clamp(10px, 1.5vw, 20px)", backgroundColor: "#ffffff", boxShadow: "0 0 0 1px #E8E5DF" }}>
              <div
                style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", cursor: "zoom-in" }}
                onClick={() => setLightboxImg(project.gallery[0] ?? project.image)}
                className="group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.gallery[0] ?? project.image}
                  alt={project.name}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.6s ease" }}
                  className="group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: 3 images in a row ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "clamp(16px, 2vw, 24px)", paddingTop: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(8px, 1.5vw, 16px)" }}>
          {(project.gallery.slice(1, 4).length > 0 ? project.gallery.slice(1, 4) : [project.image, project.image, project.image]).map((img, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div
                style={{ padding: "clamp(8px, 1vw, 14px)", backgroundColor: "#ffffff", boxShadow: "0 0 0 1px #E8E5DF", cursor: "zoom-in" }}
                onClick={() => setLightboxImg(img)}
                className="group"
              >
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${project.name} ${i + 2}`}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.6s ease" }}
                    className="group-hover:scale-105"
                  />
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Section 3: Description left + Agents right ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 0" }}>
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 80px)", alignItems: "start" }} className="grid-cols-1 lg:grid-cols-2">

            {/* Left: description */}
            <FadeUp>
              <span className="label-tag">About the Project</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "24px" }}>
                {project.name}
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#7a7265", lineHeight: 1.9 }}>
                {project.description}
              </p>
            </FadeUp>

            {/* Right: agents */}
            <FadeUp delay={100}>
              <span className="label-tag">Project Agents</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                {[
                  { name: "Paul Spinelli", role: "Director — Project Sales", phone: "02 4296 0047", email: "paul@spinellire.com.au", image: "/Staff/paul-spinelli.png" },
                  { name: "Adam Spinelli", role: "Director — Project Sales", phone: "02 4296 0047", email: "adam@spinellire.com.au", image: "/Staff/adam-spinelli.png" },
                ].map((agent) => (
                  <div key={agent.name} style={{ display: "flex", gap: "20px", alignItems: "flex-start", padding: "24px", border: "1px solid #E8E5DF" }}>
                    {/* Photo */}
                    <div style={{ width: "72px", height: "88px", flexShrink: 0, overflow: "hidden" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={agent.image}
                        alt={agent.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                      />
                    </div>
                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "3px" }}>
                        {agent.name}
                      </h3>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#5BC2E7", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px" }}>
                        {agent.role}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <a href={`tel:${agent.phone.replace(/\s/g, "")}`} style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#58503C", textDecoration: "none" }}>
                          {agent.phone}
                        </a>
                        <a href={`mailto:${agent.email}`} style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#58503C", textDecoration: "none" }}>
                          {agent.email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ backgroundColor: "#FBF9F3", padding: "80px 0" }}>
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <span className="label-tag">Project Timeline</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "48px" }}>
              Milestones
            </h2>
          </FadeUp>
          <div className="flex flex-col gap-0">
            {project.timeline.map((step, i) => (
              <FadeUp key={i} delay={i * 60}>
                <div style={{ display: "flex", gap: "clamp(20px, 4vw, 48px)", alignItems: "center", padding: "18px 0", borderBottom: "1px solid #E8E5DF" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: step.done ? "#5BC2E7" : "#E8E5DF", border: `2px solid ${step.done ? "#5BC2E7" : "#DAD7CE"}`, flexShrink: 0 }} />
                  <div style={{ minWidth: "clamp(80px, 12vw, 120px)", flexShrink: 0 }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: step.done ? "#5BC2E7" : "#a2b0aa", letterSpacing: "0.06em", fontWeight: 500 }}>
                      {step.date}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 2vw, 1.3rem)", color: step.done ? "#0D3348" : "#a2b0aa", fontWeight: 300, letterSpacing: "-0.02em" }}>
                      {step.label}
                    </p>
                    {step.done && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5BC2E7" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enquiry CTA ── */}
      <section style={{ backgroundColor: "#0D3348", padding: "100px 0" }}>
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 text-center">
          <FadeUp>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#5BC2E7", letterSpacing: "0.16em", textTransform: "uppercase", display: "block", marginBottom: "20px" }}>
              {project.status === "Sold Out" ? "This Project" : "Register Your Interest"}
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: "24px" }}>
              {project.status === "Sold Out" ? "Sold Out" : "Enquire About\nThis Project"}
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: "40ch", margin: "0 auto 40px" }}>
              {project.status === "Sold Out"
                ? `${project.name} is fully sold. Contact us to hear about upcoming projects.`
                : "Get in touch with our projects team for pricing, floor plans and availability."}
            </p>
            <Link
              href={`/contact?project=${project.id}`}
              style={{ display: "inline-block", fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", backgroundColor: "#5BC2E7", color: "#ffffff", padding: "16px 40px", textDecoration: "none" }}
            >
              {project.status === "Sold Out" ? "Contact Us" : "Make an Enquiry"}
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.92)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", cursor: "zoom-out" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightboxImg} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} onClick={(e) => e.stopPropagation()} />
          <button onClick={() => setLightboxImg(null)} style={{ position: "absolute", top: "24px", right: "24px", background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: "28px", cursor: "pointer", lineHeight: 1 }}>✕</button>
        </div>
      )}
    </>
  );
}
