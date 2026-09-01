"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import type { ComponentProps } from "react";
type ProjectMapProps = ComponentProps<typeof import("../../../components/ProjectMap").default>;
const ProjectMap = dynamic<ProjectMapProps>(() => import("../../../components/ProjectMap"), { ssr: false });
import type { PrestigeListing } from "../data";

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

function TextBlock({ heading, children, headingSize = "2.6rem" }: {
  heading: React.ReactNode;
  children: React.ReactNode;
  headingSize?: string;
}) {
  return (
    <div style={{ backgroundColor: "#ffffff", padding: "80px 0" }}>
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-[4fr_6fr_2fr]" style={{ gap: "0 30px", alignItems: "start" }}>
            <div className="mb-8 md:mb-0">
              <p style={{ fontFamily: "var(--font-display)", fontSize: headingSize, color: "#0a172d", fontWeight: 300, lineHeight: 1.15, letterSpacing: "-0.03em" }}>
                {heading}
              </p>
            </div>
            <div>{children}</div>
            <div className="hidden md:block" />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default function PrestigeDetailContent({ listing }: { listing: PrestigeListing }) {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const heroImg = listing.gallery[0] ?? listing.image;
  const wideImg = listing.gallery[1] ?? listing.image;
  const galleryImgs = listing.gallery.length > 2 ? listing.gallery.slice(2) : listing.gallery;
  const count = galleryImgs.length;
  const loopedImgs = count > 0 ? [...galleryImgs, ...galleryImgs, ...galleryImgs] : [];
  const startIndex = count + Math.floor(count / 2);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || count === 0) return;
    const cardSlot = el.clientWidth * 0.76 + 28;
    el.scrollLeft = startIndex * cardSlot;
  }, [startIndex, count]);

  function handleScroll() {
    const el = carouselRef.current;
    if (!el || count === 0) return;
    const cardSlot = el.clientWidth * 0.76 + 28;
    const oneSet = count * cardSlot;
    if (el.scrollLeft < oneSet * 0.75) el.scrollLeft += oneSet;
    else if (el.scrollLeft >= oneSet * 2.25) el.scrollLeft -= oneSet;
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
      {/* ── HERO ── */}
      <section style={{ height: "100svh", display: "grid", gridTemplateRows: "2fr 1fr" }}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image src={heroImg} alt={listing.name} fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.42)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              {listing.tag && (
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ffffff", backgroundColor: "#5BC2E7", padding: "4px 12px" }}>
                  {listing.tag}
                </span>
              )}
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                {listing.suburb}
              </span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 7vw, 8rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.9 }}>
              {listing.name}
            </h1>
          </div>
        </div>

        {/* Bottom panel — white stats bar */}
        <div style={{ backgroundColor: "#ffffff", height: "100%", display: "flex", alignItems: "center", padding: "0 clamp(24px, 4vw, 64px)", borderTop: "1px solid #E8E5DF", overflowX: "auto" }}>
          <div style={{ display: "flex", alignItems: "stretch", width: "100%", gap: 0 }}>
            {[
              { v: listing.price, l: "Price Guide" },
              { v: `${listing.beds}`, l: "Bed" },
              { v: `${listing.baths}`, l: "Bath" },
              { v: `${listing.cars}`, l: "Car" },
              ...(listing.landSize ? [{ v: listing.landSize, l: "Land" }] : []),
            ].map((s, i, arr) => (
              <div
                key={s.l}
                style={{
                  flex: i === 0 ? "2 0 auto" : "1 0 auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingLeft: i === 0 ? 0 : "clamp(20px, 3vw, 48px)",
                  paddingRight: i === arr.length - 1 ? 0 : "clamp(20px, 3vw, 48px)",
                  borderLeft: i === 0 ? "none" : "1px solid #E8E5DF",
                }}
              >
                <p style={{ fontFamily: "var(--font-display)", fontSize: i === 0 ? "clamp(1rem, 1.6vw, 1.5rem)" : "clamp(1.4rem, 2.4vw, 2.4rem)", color: "#0a172d", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "6px", whiteSpace: "nowrap" }}>
                  {s.v}
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "9px", color: "#a2b0aa", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH IMAGE ── */}
      <div
        style={{ height: "clamp(300px, 55vw, 600px)", backgroundImage: `url(${wideImg})`, backgroundSize: "cover", backgroundPosition: "50% 50%", cursor: "zoom-in" }}
        onClick={() => setLightboxImg(wideImg)}
      />

      {/* ── DESCRIPTION ── */}
      {listing.longDescription && (
        <TextBlock heading={<>The<br />Property.</>}>
          {listing.longDescription.split("\n\n").map((para, i) => (
            <p key={i} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.2vw, 2rem)", color: "#0a172d", fontWeight: 300, lineHeight: 1.45, letterSpacing: "-0.02em", marginBottom: i < listing.longDescription!.split("\n\n").length - 1 ? "1.4em" : 0 }}>
              {para}
            </p>
          ))}
        </TextBlock>
      )}

      {/* ── GALLERY ── */}
      {loopedImgs.length > 0 && (
        <div style={{ overflow: "hidden", backgroundColor: "#ffffff", paddingTop: "60px", paddingBottom: "60px" }}>
          <div
            ref={carouselRef}
            style={{ display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", gap: "28px", paddingLeft: "calc(50% - 38vw)", paddingRight: "calc(50% - 38vw)", scrollbarWidth: "none" }}
            className="[&::-webkit-scrollbar]:hidden"
            onScroll={handleScroll}
          >
            {loopedImgs.map((img, i) => (
              <div key={i} style={{ flex: "0 0 clamp(280px, 76vw, 76vw)", scrollSnapAlign: "center", position: "relative", height: "clamp(220px, 60vw, 72vh)", overflow: "hidden", borderRadius: "2px" }}>
                <Image src={img} alt={`${listing.name} ${(i % count) + 1}`} fill sizes="76vw" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "28px", marginTop: "24px" }}>
            <button onClick={() => scrollCarousel("left")} aria-label="Previous" style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", color: "#0a172d", fontSize: "20px", opacity: 0.4, transition: "opacity 0.2s" }} onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.4")}>‹</button>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#0a172d", letterSpacing: "0.14em", opacity: 0.4, minWidth: "40px", textAlign: "center" }}>{activeIndex + 1} / {count}</span>
            <button onClick={() => scrollCarousel("right")} aria-label="Next" style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", color: "#0a172d", fontSize: "20px", opacity: 0.4, transition: "opacity 0.2s" }} onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.4")}>›</button>
          </div>
        </div>
      )}

      {/* ── MAP ── */}
      {listing.mapLat && listing.mapLng && (
        <div style={{ backgroundColor: "#ffffff" }}>
          <ProjectMap lat={listing.mapLat} lng={listing.mapLng} zoom={16} />
        </div>
      )}

      {/* ── ADDITIONAL INFO ── */}
      {listing.additionalInfo && (
        <TextBlock heading={<>The<br />Details.</>} headingSize="clamp(2rem, 3.5vw, 3.2rem)">
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#5BC2E7", marginBottom: "24px" }}>
            Highlights
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {listing.additionalInfo.split("\n").filter(Boolean).map((line, i) => (
              <p key={i} style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(12px, 1.2vw, 14px)", color: "#0a172d", fontWeight: 400, lineHeight: 1.7, letterSpacing: "0.01em", paddingBottom: "14px", borderBottom: "1px solid #E8E5DF" }}>
                {line}
              </p>
            ))}
          </div>
        </TextBlock>
      )}

      {/* ── ENQUIRE ── */}
      <TextBlock heading={<>Enquire<br />today.</>} headingSize="clamp(2rem, 3.5vw, 3.2rem)">
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem, 1.8vw, 1.7rem)", color: "#0a172d", fontWeight: 300, lineHeight: 1.5, letterSpacing: "-0.02em", marginBottom: "40px" }}>
          Contact our prestige team for a private inspection, detailed information pack, or to make an offer.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Link href={`/contact?property=${listing.id}`} style={{ display: "inline-flex", alignItems: "center", gap: "12px", fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#0a172d", letterSpacing: "-0.01em", textDecoration: "none", alignSelf: "flex-start" }}>
            Make an Enquiry
            <svg width="20" height="1" viewBox="0 0 20 1" style={{ overflow: "visible" }}><line x1="0" y1="0.5" x2="20" y2="0.5" stroke="#0a172d" strokeWidth="1" /></svg>
          </Link>
          <Link href="/appraisal" style={{ display: "inline-flex", alignItems: "center", gap: "12px", fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#0a172d", letterSpacing: "-0.01em", textDecoration: "none", alignSelf: "flex-start" }}>
            Book a Private Inspection
            <svg width="20" height="1" viewBox="0 0 20 1" style={{ overflow: "visible" }}><line x1="0" y1="0.5" x2="20" y2="0.5" stroke="#0a172d" strokeWidth="1" /></svg>
          </Link>
        </div>
      </TextBlock>

      {/* ── LIGHTBOX ── */}
      {lightboxImg && (
        <div onClick={() => setLightboxImg(null)} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.96)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", cursor: "zoom-out" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightboxImg} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} onClick={e => e.stopPropagation()} />
          <button onClick={() => setLightboxImg(null)} style={{ position: "absolute", top: "24px", right: "24px", background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "22px", cursor: "pointer" }}>✕</button>
        </div>
      )}
    </>
  );
}
