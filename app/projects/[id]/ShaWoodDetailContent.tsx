"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import type { ComponentProps } from "react";

type ProjectMapProps = ComponentProps<typeof import("../../../components/ProjectMap").default>;
const ProjectMap = dynamic<ProjectMapProps>(() => import("../../../components/ProjectMap"), { ssr: false });

import type { Project } from "../data";

/* ─── Intersection reveal ─────────────────────────────────── */
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

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── Gallery images ────────────────────────────────────────── */
// gallery[0] = hero, gallery[1] = second image, [2..] = rest
// Shawood has 10 images: 2.png – 11.png

export default function ShaWoodDetailContent({ project }: { project: Project }) {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const imgs = project.gallery; // 10 images

  const CREAM = "#F7F3EE";
  const DARK  = "#181412";
  const BODY  = "#2D2420";

  /* ── CAROUSEL ─────────────────────────────────────────── */
  const galleryImgs = imgs.slice(2); // imgs 2-9 (8 images for carousel)
  const count = galleryImgs.length;
  const loopedImgs = [...galleryImgs, ...galleryImgs, ...galleryImgs];
  const startIndex = count + Math.floor(count / 2);
  const [activeIndex, setActiveIndex] = useState(Math.floor(count / 2));
  const carouselRef = useRef<HTMLDivElement>(null);

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
      {/* ══ 1. HERO ══════════════════════════════════════════════ */}
      <section style={{ position: "relative", height: "100svh", overflow: "hidden", backgroundColor: DARK }}>
        <Image
          src={imgs[0] ?? project.image}
          alt={project.name}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
        />
        {/* gradient vignette */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }} />

        {/* hero text — bottom left */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(32px,5vw,72px)" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                {project.suburb}
              </span>
              <span style={{ width: "1px", height: "14px", backgroundColor: "rgba(255,255,255,0.3)" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                {project.status}
              </span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem,8vw,9rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.045em", lineHeight: 0.88, margin: 0 }}>
              {project.name}
            </h1>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(11px,1.1vw,14px)", color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", marginTop: "20px" }}>
              {project.address}
            </p>
          </Reveal>
        </div>

        {/* scroll hint */}
        <div style={{ position: "absolute", bottom: "clamp(32px,5vw,72px)", right: "clamp(32px,5vw,72px)" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Scroll</span>
        </div>
      </section>

      {/* ══ 2. INTRO ═════════════════════════════════════════════ */}
      <section style={{ backgroundColor: CREAM, padding: "clamp(72px,8vw,120px) clamp(24px,8vw,120px)" }}>
        <Reveal>
          <div style={{ maxWidth: "820px" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "32px" }}>
              Shawood by Sekisui House — Cascadia, Calderwood Valley
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem,2.8vw,2.6rem)", color: BODY, fontWeight: 300, lineHeight: 1.4, letterSpacing: "-0.02em" }}>
              In beautifully crafted homes and a meticulously masterplanned community, Shawood brings together the best of Australian living with the precision and innovation of Japanese design.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div style={{ marginTop: "48px", display: "flex", gap: "40px", flexWrap: "wrap", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "6px" }}>Land from</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem,2vw,1.8rem)", color: BODY, fontWeight: 300, letterSpacing: "-0.02em" }}>$657,000</p>
            </div>
            <div style={{ width: "1px", height: "40px", backgroundColor: "rgba(0,0,0,0.15)" }} />
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "6px" }}>Completed Homes from</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem,2vw,1.8rem)", color: BODY, fontWeight: 300, letterSpacing: "-0.02em" }}>$1,335,000</p>
            </div>
            <div style={{ width: "1px", height: "40px", backgroundColor: "rgba(0,0,0,0.15)" }} />
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "6px" }}>Status</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem,2vw,1.8rem)", color: BODY, fontWeight: 300, letterSpacing: "-0.02em" }}>Now Selling</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══ 3. FULL-BLEED IMAGE ══════════════════════════════════ */}
      <div
        style={{ height: "clamp(320px,65vw,750px)", position: "relative", overflow: "hidden", cursor: "zoom-in" }}
        onClick={() => setLightboxImg(imgs[1] ?? project.image)}
      >
        <Image src={imgs[1] ?? project.image} alt={`${project.name} aerial`} fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "center" }} />
      </div>

      {/* ══ 4. TWO-COL: TEXT + IMAGE ═════════════════════════════ */}
      <section style={{ backgroundColor: "#ffffff" }} className="grid grid-cols-1 md:grid-cols-2">
        {/* Text left */}
        <div style={{ padding: "clamp(60px,8vw,120px) clamp(32px,6vw,80px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "24px" }}>The Development</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,4.5vw,5rem)", color: DARK, fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.0, marginBottom: "32px" }}>
              Designed<br />for life.
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(13px,1.1vw,15px)", color: "rgba(0,0,0,0.6)", lineHeight: 1.9, letterSpacing: "0.01em", maxWidth: "420px", marginBottom: "40px" }}>
              Cascadia is Calderwood Valley&rsquo;s newest master-planned community and one of the Illawarra&rsquo;s most anticipated addresses. Elevated above the valley floor, the first release of generous lots sits against the backdrop of Johnsons Spur, with views stretching from the escarpment all the way to the ocean shore.
            </p>
            <Link
              href="/contact?project=shawood-cascadia"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: DARK, textDecoration: "none" }}
            >
              Register Interest
              <svg width="28" height="1" viewBox="0 0 28 1" overflow="visible"><line x1="0" y1="0.5" x2="28" y2="0.5" stroke={DARK} strokeWidth="1" /></svg>
            </Link>
          </Reveal>
        </div>
        {/* Image right */}
        <div style={{ position: "relative", minHeight: "clamp(300px,55vw,600px)", overflow: "hidden", cursor: "zoom-in" }} onClick={() => setLightboxImg(imgs[2] ?? project.image)}>
          <Image src={imgs[2] ?? project.image} alt={`${project.name} home`} fill sizes="50vw" style={{ objectFit: "cover", objectPosition: "center" }} />
        </div>
      </section>

      {/* ══ 5. YOUTUBE VIDEO ══════════════════════════════════════ */}
      <section style={{ backgroundColor: "#0d0c0b", padding: "clamp(60px,7vw,100px) 0" }}>
        <Reveal>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px,4vw,64px)" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "24px" }}>
              Shawood — The Experience
            </p>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "2px" }}>
              <iframe
                src="https://www.youtube.com/embed/U8fZS_2BClk?rel=0&modestbranding=1"
                title="Shawood by Sekisui House — Cascadia Calderwood"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══ 6. IMAGE REVERSED: IMAGE LEFT + TEXT RIGHT ═══════════ */}
      <section style={{ backgroundColor: CREAM }} className="grid grid-cols-1 md:grid-cols-2">
        {/* Image left */}
        <div style={{ position: "relative", minHeight: "clamp(300px,55vw,600px)", overflow: "hidden", cursor: "zoom-in", order: 0 }} className="md:order-first" onClick={() => setLightboxImg(imgs[3] ?? project.image)}>
          <Image src={imgs[3] ?? project.image} alt={`${project.name} streetscape`} fill sizes="50vw" style={{ objectFit: "cover", objectPosition: "center" }} />
        </div>
        {/* Text right */}
        <div style={{ padding: "clamp(60px,8vw,120px) clamp(32px,6vw,80px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "24px" }}>Quality Built-In</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,4.5vw,5rem)", color: DARK, fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.0, marginBottom: "32px" }}>
              Built by<br />the best.
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(13px,1.1vw,15px)", color: "rgba(0,0,0,0.6)", lineHeight: 1.9, letterSpacing: "0.01em", maxWidth: "420px", marginBottom: "40px" }}>
              Shawood homes are built by Sekisui House — one of Australia&rsquo;s most respected residential builders and the holder of a 4 Gold Star iCIRT rating, the industry&rsquo;s highest benchmark for trustworthiness and build quality. Each home is individually crafted, architecturally designed and finished to a standard that reflects decades of Japanese innovation.
            </p>
            <Link
              href="https://www.sekisuihouse.com.au/shawood/home/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: DARK, textDecoration: "none" }}
            >
              About Shawood
              <svg width="28" height="1" viewBox="0 0 28 1" overflow="visible"><line x1="0" y1="0.5" x2="28" y2="0.5" stroke={DARK} strokeWidth="1" /></svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══ 7. TWO-IMAGE GRID ════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "0" }}>
        <div style={{ position: "relative", height: "clamp(280px,45vw,520px)", overflow: "hidden", cursor: "zoom-in" }} onClick={() => setLightboxImg(imgs[4] ?? project.image)}>
          <Image src={imgs[4] ?? project.image} alt={`${project.name} lot`} fill sizes="50vw" style={{ objectFit: "cover", objectPosition: "center" }} />
        </div>
        <div style={{ position: "relative", height: "clamp(280px,45vw,520px)", overflow: "hidden", cursor: "zoom-in" }} onClick={() => setLightboxImg(imgs[5] ?? project.image)}>
          <Image src={imgs[5] ?? project.image} alt={`${project.name} aerial`} fill sizes="50vw" style={{ objectFit: "cover", objectPosition: "center" }} />
        </div>
      </div>

      {/* ══ 8. FULL-BLEED IMAGE ══════════════════════════════════ */}
      <div style={{ position: "relative", height: "clamp(320px,65vw,750px)", overflow: "hidden", cursor: "zoom-in" }} onClick={() => setLightboxImg(imgs[6] ?? project.image)}>
        <Image src={imgs[6] ?? project.image} alt={`${project.name} community`} fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center" }} />
      </div>

      {/* ══ 9. THREE-IMAGE STRIP ═════════════════════════════════ */}
      <div className="grid grid-cols-3" style={{ gap: "0" }}>
        {[imgs[7], imgs[8], imgs[9]].filter(Boolean).map((img, i) => (
          <div key={i} style={{ position: "relative", height: "clamp(160px,28vw,380px)", overflow: "hidden", cursor: "zoom-in" }} onClick={() => setLightboxImg(img!)}>
            <Image src={img!} alt={`${project.name} detail ${i + 1}`} fill sizes="33vw" style={{ objectFit: "cover", objectPosition: "center" }} />
          </div>
        ))}
      </div>

      {/* ══ 10. GALLERY CAROUSEL ═════════════════════════════════ */}
      <section style={{ backgroundColor: "#ffffff", padding: "clamp(60px,6vw,100px) 0" }}>
        <Reveal>
          <div style={{ padding: "0 clamp(24px,4vw,64px)", marginBottom: "32px" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)" }}>Gallery</p>
          </div>
        </Reveal>
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
              style={{ flex: "0 0 clamp(280px,76vw,76vw)", scrollSnapAlign: "center", position: "relative", height: "clamp(220px,55vw,65vh)", overflow: "hidden", cursor: "zoom-in" }}
              onClick={() => setLightboxImg(img)}
            >
              <Image src={img} alt={`${project.name} gallery ${(i % count) + 1}`} fill sizes="76vw" style={{ objectFit: "cover", objectPosition: "center" }} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "28px", marginTop: "24px" }}>
          <button onClick={() => scrollCarousel("left")} aria-label="Previous" style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", color: DARK, fontFamily: "var(--font-sans)", fontSize: "20px", opacity: 0.4, transition: "opacity 0.2s" }} onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.4")}>‹</button>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: DARK, letterSpacing: "0.14em", opacity: 0.4, minWidth: "40px", textAlign: "center" }}>{activeIndex + 1} / {count}</span>
          <button onClick={() => scrollCarousel("right")} aria-label="Next" style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", color: DARK, fontFamily: "var(--font-sans)", fontSize: "20px", opacity: 0.4, transition: "opacity 0.2s" }} onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.4")}>›</button>
        </div>
      </section>

      {/* ══ 11. LOCATION ═════════════════════════════════════════ */}
      <section style={{ backgroundColor: CREAM, padding: "clamp(60px,7vw,100px) 0" }}>
        <Reveal>
          <div style={{ padding: "0 clamp(24px,4vw,64px)", marginBottom: "40px" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "12px" }}>Where we are</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,4.5rem)", color: DARK, fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.0 }}>Calderwood<br />Valley, NSW.</h2>
          </div>
        </Reveal>
        {project.mapLat && project.mapLng && (
          <div style={{ height: "420px", overflow: "hidden" }}>
            <ProjectMap lat={project.mapLat} lng={project.mapLng} zoom={14} />
          </div>
        )}
        <div style={{ padding: "40px clamp(24px,4vw,64px) 0" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(13px,1.1vw,15px)", color: "rgba(0,0,0,0.55)", lineHeight: 1.9, maxWidth: "560px" }}>
              Cascadia is situated in Calderwood Valley — 10 minutes from Shellharbour City Centre, 15 minutes to Kiama, and 90 minutes to Sydney CBD. Schools, parks, and a future town centre are all part of the master-plan.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ 12. TIMELINE ═════════════════════════════════════════ */}
      {project.timeline && project.timeline.length > 0 && (
        <section style={{ backgroundColor: "#ffffff", padding: "clamp(60px,7vw,100px) clamp(24px,4vw,64px)" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "48px" }}>Project Milestones</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {project.timeline.map((item, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 1px 1fr", gap: "0 24px", alignItems: "start", paddingBottom: "0" }}>
                  {/* date */}
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(0,0,0,0.4)", letterSpacing: "0.1em", paddingTop: "2px", textAlign: "right" }}>{item.date}</p>
                  {/* timeline line + dot */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: item.done ? DARK : "rgba(0,0,0,0.2)", marginTop: "4px", flexShrink: 0 }} />
                    {i < project.timeline.length - 1 && (
                      <div style={{ width: "1px", height: "48px", backgroundColor: "rgba(0,0,0,0.1)", marginTop: "4px" }} />
                    )}
                  </div>
                  {/* label */}
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(13px,1.1vw,15px)", color: item.done ? BODY : "rgba(0,0,0,0.4)", letterSpacing: "0.01em", paddingBottom: "48px" }}>{item.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* ══ 13. DETAILS / ADDITIONAL INFO ════════════════════════ */}
      {project.additionalInfo && (
        <section style={{ backgroundColor: CREAM, padding: "clamp(72px,8vw,120px) clamp(24px,8vw,120px)" }}>
          <Reveal>
            <div style={{ maxWidth: "680px" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "24px" }}>Working with Spinelli Real Estate</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem,2.2vw,2rem)", color: BODY, fontWeight: 300, lineHeight: 1.5, letterSpacing: "-0.02em" }}>
                {project.additionalInfo}
              </p>
            </div>
          </Reveal>
        </section>
      )}

      {/* ══ 14. ENQUIRY CTA ══════════════════════════════════════ */}
      <section style={{ backgroundColor: DARK, padding: "clamp(80px,10vw,140px) clamp(24px,8vw,120px)" }}>
        <Reveal>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "32px" }}>Enquire Today</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem,6vw,7rem)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.045em", lineHeight: 0.9, marginBottom: "48px", maxWidth: "700px" }}>
            Secure your place<br />at Cascadia.
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
            <Link
              href={`/contact?project=${project.id}`}
              style={{ display: "inline-flex", alignItems: "center", gap: "14px", fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ffffff", textDecoration: "none", paddingBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.3)" }}
            >
              Make an Enquiry
              <svg width="28" height="1" viewBox="0 0 28 1" overflow="visible"><line x1="0" y1="0.5" x2="28" y2="0.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1" /></svg>
            </Link>
            <Link
              href="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "14px", fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textDecoration: "none", paddingBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.15)" }}
            >
              Register Interest
              <svg width="28" height="1" viewBox="0 0 28 1" overflow="visible"><line x1="0" y1="0.5" x2="28" y2="0.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" /></svg>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ══ LIGHTBOX ══════════════════════════════════════════════ */}
      {lightboxImg && (
        <div onClick={() => setLightboxImg(null)} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.97)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", cursor: "zoom-out" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightboxImg} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} onClick={e => e.stopPropagation()} />
          <button onClick={() => setLightboxImg(null)} style={{ position: "absolute", top: "24px", right: "24px", background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "22px", cursor: "pointer" }}>✕</button>
        </div>
      )}
    </>
  );
}
