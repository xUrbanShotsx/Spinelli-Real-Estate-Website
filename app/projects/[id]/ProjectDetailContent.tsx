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
      {/* ── Hero ── */}
      <section style={{ position: "relative", height: "100svh", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.name}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.7) 100%)" }} />

        {/* Back link */}
        <Link
          href="/projects"
          style={{ position: "absolute", top: "120px", left: "clamp(24px, 4vw, 48px)", display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" /></svg>
          All Projects
        </Link>

        {/* Bottom content */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(32px, 5vw, 60px)" }}>
          <span style={{
            fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em",
            textTransform: "uppercase", padding: "5px 14px", display: "inline-block", marginBottom: "20px",
            backgroundColor: statusColor[project.status] ?? "rgba(0,0,0,0.45)", color: "#ffffff",
          }}>
            {project.status}
          </span>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "12px" }}>
            {project.suburb}
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 8vw, 7rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.92, marginBottom: "16px" }}>
            {project.name}
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {project.units} · {project.category}
          </p>
        </div>
      </section>

      {/* ── Description ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 0" }}>
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <span className="label-tag">About the Project</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
                {project.name}
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#7a7265", lineHeight: 1.85 }}>
                {project.description}
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(88,80,60,0.6)", marginTop: "16px" }}>
                {project.address}
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section style={{ backgroundColor: "#FBF9F3", padding: "80px 0" }}>
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <span className="label-tag">Gallery</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "40px" }}>
              Project Images
            </h2>
          </FadeUp>

          {/* Gallery grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "12px" }}>
            {project.gallery.map((img, i) => (
              <FadeUp
                key={i}
                delay={i * 60}
                className={i === 0 ? "col-span-12 sm:col-span-8" : i === 1 ? "col-span-12 sm:col-span-4" : "col-span-12 sm:col-span-4"}
              >
                <div
                  onClick={() => setLightboxImg(img)}
                  style={{ position: "relative", aspectRatio: i === 0 ? "16/9" : "4/3", overflow: "hidden", cursor: "pointer" }}
                  className="group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${project.name} ${i + 1}`}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.6s ease" }}
                    className="group-hover:scale-105"
                  />
                  <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0)", transition: "background-color 0.3s ease" }} className="group-hover:bg-black/10" />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 0" }}>
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <span className="label-tag">Project Timeline</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "56px" }}>
              Milestones
            </h2>
          </FadeUp>

          <div style={{ position: "relative" }}>
            {/* Track line */}
            <div style={{ position: "absolute", left: 0, top: "10px", bottom: "10px", width: "1px", backgroundColor: "#E8E5DF" }} className="hidden sm:block" />

            <div className="flex flex-col gap-0">
              {project.timeline.map((step, i) => (
                <FadeUp key={i} delay={i * 80}>
                  <div style={{ display: "flex", gap: "clamp(20px, 4vw, 48px)", alignItems: "flex-start", padding: "20px 0", borderBottom: "1px solid #F0EDE7" }}>
                    {/* Dot */}
                    <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }} className="hidden sm:flex">
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: step.done ? "#5BC2E7" : "#E8E5DF", border: `2px solid ${step.done ? "#5BC2E7" : "#DAD7CE"}`, marginLeft: "-4px" }} />
                    </div>

                    {/* Date */}
                    <div style={{ minWidth: "clamp(80px, 12vw, 120px)", flexShrink: 0 }}>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: step.done ? "#5BC2E7" : "#a2b0aa", letterSpacing: "0.06em", fontWeight: 500 }}>
                        {step.date}
                      </p>
                    </div>

                    {/* Label */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: step.done ? "#0D3348" : "#a2b0aa", fontWeight: 300, letterSpacing: "-0.02em" }}>
                        {step.label}
                      </p>
                      {step.done && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5BC2E7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Enquiry ── */}
      <section style={{ backgroundColor: "#0D3348", padding: "100px 0" }}>
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 text-center">
          <FadeUp>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#5BC2E7", letterSpacing: "0.16em", textTransform: "uppercase", display: "block", marginBottom: "20px" }}>
              {project.status === "Sold Out" ? "This Project" : "Register Your Interest"}
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: "24px" }}>
              {project.status === "Sold Out" ? "Sold Out" : "Enquire About\nThis Project"}
            </h2>
            {project.status !== "Sold Out" && (
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: "40ch", margin: "0 auto 40px" }}>
                Get in touch with our projects team for pricing, floor plans and availability.
              </p>
            )}
            {project.status === "Sold Out" && (
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: "40ch", margin: "0 auto 40px" }}>
                {project.name} is fully sold. Contact us to hear about upcoming projects.
              </p>
            )}
            <Link
              href={`/contact?project=${project.id}`}
              style={{ display: "inline-block", fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", backgroundColor: "#5BC2E7", color: "#ffffff", padding: "16px 40px", textDecoration: "none" }}
            >
              {project.status === "Sold Out" ? "Contact Us" : "Make an Enquiry"}
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── Contact Agents ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 0" }}>
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <span className="label-tag">Project Agents</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "48px" }}>
              Speak to Our Team
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-8" style={{ maxWidth: "720px" }}>
            {[
              { name: "Paul Spinelli", role: "Director — Project Sales", phone: "0402 000 000", email: "paul@spinellire.com.au", image: "/Staff/paul-spinelli.png" },
              { name: "Adam Spinelli", role: "Director — Project Sales", phone: "0402 000 001", email: "adam@spinellire.com.au", image: "/Staff/adam-spinelli.png" },
            ].map((agent, i) => (
              <FadeUp key={agent.name} delay={i * 100}>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Photo */}
                  <div style={{ aspectRatio: "3/4", overflow: "hidden", maxHeight: "320px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={agent.image}
                      alt={agent.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                    />
                  </div>

                  {/* Info */}
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "4px" }}>
                      {agent.name}
                    </h3>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#5BC2E7", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
                      {agent.role}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <a href={`tel:${agent.phone.replace(/\s/g, "")}`} style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#0D3348", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                        {agent.phone}
                      </a>
                      <a href={`mailto:${agent.email}`} style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#0D3348", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
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

      {/* ── Lightbox ── */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.92)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", cursor: "zoom-out" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightboxImg}
            alt=""
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightboxImg(null)}
            style={{ position: "absolute", top: "24px", right: "24px", background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: "28px", cursor: "pointer", lineHeight: 1 }}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
