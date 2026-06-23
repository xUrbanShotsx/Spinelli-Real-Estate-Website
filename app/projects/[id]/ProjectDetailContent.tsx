"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "../data";

/* ─── Intersection reveal ─────────────────────────────────── */
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
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── Text block: Boston's 4-6-2 grid ─────────────────────── */
function TextBlock({ heading, children, headingSize = "2.6rem" }: {
  heading: React.ReactNode;
  children: React.ReactNode;
  headingSize?: string;
}) {
  return (
    <div style={{ marginTop: "0", marginBottom: "0", backgroundColor: "#ffffff", padding: "80px 0" }}>
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
        <Reveal>
          {/* 4 – 6 – 2 column grid, exact Boston layout */}
          <div style={{ display: "grid", gridTemplateColumns: "4fr 6fr 2fr", gap: "0 30px", alignItems: "start" }}>
            {/* Left col (4/12) – heading */}
            <div style={{ paddingRight: "42px" }}>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: headingSize,
                color: "#0a172d",
                fontWeight: 300,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
              }}>
                {heading}
              </p>
            </div>
            {/* Centre col (6/12) – body */}
            <div style={{ paddingRight: "30px" }}>
              {children}
            </div>
            {/* Right col (2/12) – intentional whitespace */}
            <div />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ─── Constants ────────────────────────────────────────────── */
const AGENTS = [
  { name: "Paul Spinelli", role: "Director — Project Sales", phone: "02 4296 0047", email: "paul@spinellire.com.au", image: "/Staff/paul-spinelli.png" },
  { name: "Adam Spinelli", role: "Director — Project Sales", phone: "02 4296 0047", email: "adam@spinellire.com.au", image: "/Staff/adam-spinelli.png" },
];

/* ─── Component ─────────────────────────────────────────────── */
export default function ProjectDetailContent({ project }: { project: Project }) {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(Math.floor(4 / 2));
  const carouselRef = useRef<HTMLDivElement>(null);

  const heroImg   = project.gallery[0] ?? project.image;
  const wideImg   = project.gallery[1] ?? project.image;
  const galleryImgs = [
    project.gallery[2] ?? project.image,
    project.gallery[3] ?? project.image,
    project.gallery[4] ?? project.gallery[0] ?? project.image,
    project.gallery[1] ?? project.image,
  ];

  // Triple the images for seamless looping
  const count = galleryImgs.length;
  const loopedImgs = [...galleryImgs, ...galleryImgs, ...galleryImgs];
  const startIndex = count + Math.floor(count / 2); // start on middle image of middle set

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const cardSlot = el.clientWidth * 0.76 + 28;
    el.scrollLeft = startIndex * cardSlot;
  }, [startIndex]);

  function handleScroll() {
    const el = carouselRef.current;
    if (!el) return;
    const cardSlot = el.clientWidth * 0.76 + 28;
    const oneSet = count * cardSlot;
    if (el.scrollLeft < oneSet * 0.75) {
      el.scrollLeft += oneSet;
    } else if (el.scrollLeft >= oneSet * 2.25) {
      el.scrollLeft -= oneSet;
    }
    const idx = Math.round(el.scrollLeft / cardSlot) % count;
    setActiveIndex(idx < 0 ? idx + count : idx);
  }

  function scrollCarousel(dir: "left" | "right") {
    const el = carouselRef.current;
    if (!el) return;
    const cardSlot = el.clientWidth * 0.76 + 28;
    el.scrollBy({ left: dir === "right" ? cardSlot : -cardSlot, behavior: "smooth" });
  }

  return (
    <>
      {/* ── HERO: split top/bottom — image extends into navbar ── */}
      <section style={{ height: "100svh", display: "grid", gridTemplateRows: "2fr 1fr" }}>

        {/* Top 2/3: image with dark shader + centred project name */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src={heroImg}
            alt={project.name}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* Dark shader */}
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.45)" }} />

          {/* Project name — centred over image */}
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.25)", padding: "4px 12px" }}>
                {project.status}
              </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                {project.suburb}
              </span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 7vw, 8rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.9 }}>
              {project.name}
            </h1>
          </div>
        </div>

        {/* Bottom 1/3: brief description */}
        <div style={{ backgroundColor: "#ffffff", display: "flex", alignItems: "center", padding: "clamp(20px, 2.5vw, 36px) clamp(32px, 4vw, 64px)", overflow: "hidden" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(11px, 1vw, 13px)", color: "rgba(0,0,0,0.6)", lineHeight: 1.9, maxWidth: "72ch", letterSpacing: "0.01em" }}>
            {project.description}
          </p>
        </div>
      </section>

      {/* ── FULL-WIDTH PARALLAX IMAGE ────────────────────────── */}
      <div
        style={{
          height: "600px",
          backgroundImage: `url(${wideImg})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          cursor: "zoom-in",
        }}
        onClick={() => setLightboxImg(wideImg)}
      />

      {/* ── TEXT BLOCK 2: long description ──────────────────── */}
      {project.longDescription && (
        <TextBlock heading={<>The<br />Development.</>}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.2vw, 2rem)", color: "#0a172d", fontWeight: 300, lineHeight: 1.45, letterSpacing: "-0.02em" }}>
            {project.longDescription}
          </p>
        </TextBlock>
      )}

      {/* ── GALLERY: peek carousel ───────────────────────────── */}
      <div style={{ marginBottom: "80px", overflow: "hidden", backgroundColor: "#ffffff", paddingTop: "60px", paddingBottom: "60px" }}>
        <div
          ref={carouselRef}
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            gap: "28px",
            paddingLeft: "calc(50% - 38vw)",
            paddingRight: "calc(50% - 38vw)",
            scrollbarWidth: "none",
          }}
          className="[&::-webkit-scrollbar]:hidden"
          onScroll={handleScroll}
        >
          {loopedImgs.map((img, i) => (
            <div
              key={i}
              style={{
                flex: "0 0 76vw",
                scrollSnapAlign: "center",
                position: "relative",
                height: "72vh",
                overflow: "hidden",
                borderRadius: "2px",
              }}
            >
              <Image
                src={img}
                alt={`${project.name} gallery ${(i % count) + 1}`}
                fill
                priority
                sizes="76vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          ))}
        </div>

        {/* Arrows + counter */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "28px", marginTop: "24px" }}>
          <button
            onClick={() => scrollCarousel("left")}
            aria-label="Previous image"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", color: "#0a172d", fontFamily: "var(--font-sans)", fontSize: "20px", lineHeight: 1, opacity: 0.4, transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.4")}
          >
            ‹
          </button>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#0a172d", letterSpacing: "0.14em", opacity: 0.4, minWidth: "40px", textAlign: "center" }}>
            {activeIndex + 1} / {count}
          </span>
          <button
            onClick={() => scrollCarousel("right")}
            aria-label="Next image"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", color: "#0a172d", fontFamily: "var(--font-sans)", fontSize: "20px", lineHeight: 1, opacity: 0.4, transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.4")}
          >
            ›
          </button>
        </div>
      </div>

      {/* ── TEXT BLOCK 3: enquiry ───────────────────────────── */}
      <TextBlock heading={<>{project.status === "Sold Out" ? <>This project<br />is sold out.</> : <>Enquire<br />today.</>}</>} headingSize="clamp(2rem, 3.5vw, 3.2rem)">
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem, 1.8vw, 1.7rem)", color: "#0a172d", fontWeight: 300, lineHeight: 1.5, letterSpacing: "-0.02em", marginBottom: "40px" }}>
          {project.status === "Sold Out"
            ? `${project.name} is fully sold. Get in touch to hear about upcoming Spinelli developments.`
            : "Get in touch with our projects team for pricing, floor plans, availability and to register for VIP access."}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Link
            href={`/contact?project=${project.id}`}
            style={{ display: "inline-flex", alignItems: "center", gap: "12px", fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#0a172d", letterSpacing: "-0.01em", textDecoration: "none", position: "relative", alignSelf: "flex-start" }}
            className="boston-link"
          >
            {project.status === "Sold Out" ? "Contact Us" : "Make an Enquiry"}
            <svg width="20" height="1" viewBox="0 0 20 1" style={{ overflow: "visible" }}><line x1="0" y1="0.5" x2="20" y2="0.5" stroke="#0a172d" strokeWidth="1" /></svg>
          </Link>
          {project.status !== "Sold Out" && (
            <Link
              href="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "12px", fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#0a172d", letterSpacing: "-0.01em", textDecoration: "none", alignSelf: "flex-start" }}
            >
              Register Interest
              <svg width="20" height="1" viewBox="0 0 20 1" style={{ overflow: "visible" }}><line x1="0" y1="0.5" x2="20" y2="0.5" stroke="#0a172d" strokeWidth="1" /></svg>
            </Link>
          )}
        </div>
      </TextBlock>


      {/* ── LIGHTBOX ─────────────────────────────────────────── */}
      {lightboxImg && (
        <div onClick={() => setLightboxImg(null)} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.96)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", cursor: "zoom-out" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightboxImg} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} onClick={(e) => e.stopPropagation()} />
          <button onClick={() => setLightboxImg(null)} style={{ position: "absolute", top: "24px", right: "24px", background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "22px", cursor: "pointer" }}>✕</button>
        </div>
      )}
    </>
  );
}
