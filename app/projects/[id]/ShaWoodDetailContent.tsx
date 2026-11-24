"use client";
import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import type { ComponentProps } from "react";

type ProjectMapProps = ComponentProps<typeof import("../../../components/ProjectMap").default>;
const ProjectMap = dynamic<ProjectMapProps>(() => import("../../../components/ProjectMap"), { ssr: false });

import type { Project } from "../data";

/* ─── Reveal on scroll ────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, vis } = useReveal();
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── CTA arrow link ──────────────────────────────────────── */
function CtaLink({ href, children, color = "#383838", external = false }: { href: string; children: React.ReactNode; color?: string; external?: boolean }) {
  const extra = external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};
  return (
    <Link href={href} {...extra} style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase" as const, color, textDecoration: "none" }}>
      {children} <span style={{ fontSize: "14px", lineHeight: 1 }}>→</span>
    </Link>
  );
}

export default function ShaWoodDetailContent({ project }: { project: Project }) {
  const [showVideo, setShowVideo] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  /* ── gallery ──────────────────────────────────────────── */
  // Use all 10 images in carousel; individual sections use unique indexes
  const galleryImgs = project.gallery; // all 10
  const count = galleryImgs.length;
  const looped = [...galleryImgs, ...galleryImgs, ...galleryImgs];
  const startIdx = count + Math.floor(count / 2);
  const [activeIdx, setActiveIdx] = useState(Math.floor(count / 2));
  const carRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = carRef.current;
    if (!el) return;
    const slot = el.clientWidth * 0.76 + 28;
    el.scrollLeft = startIdx * slot;
  }, [startIdx]);

  function onCarScroll() {
    const el = carRef.current;
    if (!el) return;
    const slot = el.clientWidth * 0.76 + 28;
    const oneSet = count * slot;
    if (el.scrollLeft < oneSet * 0.75) el.scrollLeft += oneSet;
    else if (el.scrollLeft >= oneSet * 2.25) el.scrollLeft -= oneSet;
    const idx = Math.round(el.scrollLeft / slot) % count;
    setActiveIdx(idx < 0 ? idx + count : idx);
  }
  function scrollCar(dir: "l" | "r") {
    const el = carRef.current;
    if (!el) return;
    const slot = el.clientWidth * 0.76 + 28;
    el.scrollBy({ left: dir === "r" ? slot : -slot, behavior: "smooth" });
  }

  const g = project.gallery;
  const img = (n: number) => g[n] ?? g[0] ?? project.image;

  /* palette from sekisuihouse.com.au */
  const CREAM = "#F8F4F2";
  const DARK  = "#383838";
  const WARM  = "#3A1311";
  const TERRA = "#886C67";
  const SAGE  = "#D2D5C9";

  const H: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.6rem, 3.2vw, 2.8rem)",
    fontWeight: 300,
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
    margin: 0,
  };
  const P: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontSize: "clamp(0.875rem, 1.3vw, 1rem)",
    fontWeight: 300,
    lineHeight: 1.75,
    letterSpacing: "0.01em",
    margin: 0,
  };
  const PAD = "clamp(28px,5vw,78px)";

  return (
    <>
      {/* ══ 1 · HERO — ~700px, NOT full-viewport (matches Sekisui) */}
      <div style={{ position: "relative", width: "100%", height: "min(700px, 92vh)", minHeight: "460px", overflow: "hidden", backgroundColor: "#16120e" }}>
        <Image src={img(0)} alt={project.name} fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 35%" }} />
        {/* vignette */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.0) 60%)" }} />

        {/* play button */}
        <button
          onClick={() => setShowVideo(true)}
          aria-label="Play video"
          style={{ position: "absolute", bottom: `calc(${PAD} + 8px)`, left: PAD, width: "52px", height: "52px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.55)", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2 }}
        >
          <svg width="13" height="15" viewBox="0 0 13 15" fill="none"><path d="M1.5 1.5l10 6-10 6V1.5z" fill="white" /></svg>
        </button>

        {/* title */}
        <div style={{ position: "absolute", bottom: PAD, left: `calc(${PAD} + 68px)`, zIndex: 2 }}>
          <h1 style={{ ...H, color: "#ffffff", fontSize: "clamp(1.6rem,3.2vw,2.8rem)" }}>
            Cascadia, perfected
          </h1>
        </div>
      </div>

      {/* ══ 2 · INTRO TEXT (cream) — matches Sekisui body text style */}
      <section style={{ backgroundColor: CREAM, padding: `${PAD} ${PAD}` }}>
        <Reveal>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem,1.6vw,1.35rem)", fontWeight: 300, lineHeight: 1.65, color: DARK, maxWidth: "760px", margin: 0 }}>
            In beautifully crafted homes and a meticulously masterplanned community, Shawood at Cascadia brings together the best of Australian living with the precision and innovation of Japanese design. Calderwood Valley&rsquo;s most anticipated address is now selling.
          </p>
        </Reveal>
      </section>

      {/* ══ 3 · FULL-BLEED IMAGE ═════════════════════════════ */}
      <div style={{ lineHeight: 0, position: "relative", height: "clamp(300px,55vw,680px)", overflow: "hidden", cursor: "zoom-in" }} onClick={() => setLightboxImg(img(1))}>
        <Image src={img(1)} alt={`${project.name} aerial`} fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center" }} />
      </div>

      {/* ══ 4 · "DESIGNED FOR LIFE" (terracotta) ════════════ */}
      <section style={{ backgroundColor: TERRA, padding: `${PAD} ${PAD}` }}>
        <Reveal>
          <div style={{ maxWidth: "560px" }}>
            <h2 style={{ ...H, color: CREAM, marginBottom: "24px" }}>Designed for life.</h2>
            <p style={{ ...P, color: CREAM, opacity: 0.85, marginBottom: "28px" }}>
              SHAWOOD quality is undeniable. Seen and felt in the light, open architecture of each home — through scenic streets and shared spaces, every element is composed around how you live. Elevated lots with escarpment-to-ocean views, surrounded by parks, reserves and tree-lined walks.
            </p>
            <CtaLink href="https://www.sekisuihouse.com.au/shawood/the-shawood-difference/" color={CREAM} external>Discover the difference</CtaLink>
          </div>
        </Reveal>
      </section>

      {/* ══ 5 · TWO IMAGES (flush, terracotta bg) ═══════════ */}
      <div style={{ lineHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, backgroundColor: TERRA }}>
        {[img(2), img(3)].map((src, i) => (
          <div key={i} style={{ position: "relative", height: "clamp(200px,32vw,480px)", overflow: "hidden", cursor: "zoom-in" }} onClick={() => setLightboxImg(src)}>
            <Image src={src} alt={`${project.name} ${i + 1}`} fill sizes="50vw" style={{ objectFit: "cover", objectPosition: "center" }} />
          </div>
        ))}
      </div>

      {/* ══ 6 · TWO-COL CARDS (cream) ═══════════════════════ */}
      <section style={{ backgroundColor: CREAM, padding: `${PAD} ${PAD}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(28px,4vw,56px)" }}>
          {/* Now Selling */}
          <Reveal>
            <div>
              <div style={{ lineHeight: 0, position: "relative", height: "clamp(220px,28vw,400px)", overflow: "hidden", cursor: "zoom-in", marginBottom: "24px" }} onClick={() => setLightboxImg(img(4))}>
                <Image src={img(4)} alt={`${project.name} lot`} fill sizes="45vw" style={{ objectFit: "cover", objectPosition: "center" }} />
              </div>
              <h3 style={{ ...H, color: WARM, fontSize: "clamp(1.3rem,2.4vw,2rem)", marginBottom: "12px" }}>Now Selling.</h3>
              <p style={{ ...P, color: WARM, opacity: 0.8, marginBottom: "20px" }}>
                Land from $657,000. Completed Homes from $1,335,000. Lots from 439–926 sqm — first release now open.
              </p>
              <CtaLink href={`/contact?project=${project.id}`} color={DARK}>Enquire now</CtaLink>
            </div>
          </Reveal>
          {/* Where we are */}
          <Reveal delay={80}>
            <div>
              <div style={{ lineHeight: 0, position: "relative", height: "clamp(220px,28vw,400px)", overflow: "hidden", cursor: "zoom-in", marginBottom: "24px" }} onClick={() => setLightboxImg(img(5))}>
                <Image src={img(5)} alt={`${project.name} location`} fill sizes="45vw" style={{ objectFit: "cover", objectPosition: "center" }} />
              </div>
              <h3 style={{ ...H, color: WARM, fontSize: "clamp(1.3rem,2.4vw,2rem)", marginBottom: "12px" }}>Where we are.</h3>
              <p style={{ ...P, color: WARM, opacity: 0.8, marginBottom: "20px" }}>
                Calderwood Valley, Shellharbour — 10 minutes from the beach, 90 minutes from Sydney. Schools, parks and a future town centre all within walking distance.
              </p>
              <CtaLink href="https://www.sekisuihouse.com.au/shawood/our-locations/calderwood/home/" color={DARK} external>Explore the location</CtaLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 7 · FULL-BLEED IMAGE ═════════════════════════════ */}
      <div style={{ lineHeight: 0, position: "relative", height: "clamp(300px,55vw,680px)", overflow: "hidden", cursor: "zoom-in" }} onClick={() => setLightboxImg(img(6))}>
        <Image src={img(6)} alt={`${project.name} community`} fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center" }} />
      </div>

      {/* ══ 8 · "ABOUT US" STYLE — text left + image right (sage) */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 0, backgroundColor: SAGE }}>
        <div style={{ padding: `${PAD} ${PAD}`, display: "flex", flexDirection: "column", justifyContent: "center", gap: "20px" }}>
          <Reveal>
            <h2 style={{ ...H, color: WARM, marginBottom: "16px" }}>Built to last.</h2>
            <p style={{ ...P, color: WARM, opacity: 0.85, marginBottom: "24px" }}>
              For more than a decade, SHAWOOD homes have set new standards in design, sustainability and construction across Australia. With a 4 Gold Star iCIRT rating — the industry&rsquo;s highest benchmark for trustworthiness — every home is individually crafted and finished to reflect decades of Japanese innovation.
            </p>
            <CtaLink href="https://www.sekisuihouse.com.au/shawood/home/" color={DARK} external>More about SHAWOOD</CtaLink>
          </Reveal>
        </div>
        <div style={{ lineHeight: 0, position: "relative", minHeight: "clamp(300px,45vw,580px)", overflow: "hidden", cursor: "zoom-in" }} onClick={() => setLightboxImg(img(7))}>
          <Image src={img(7)} alt={`${project.name} aerial view`} fill sizes="50vw" style={{ objectFit: "cover", objectPosition: "center" }} />
        </div>
      </section>

      {/* ══ 9 · GALLERY CAROUSEL (cream) — all 10 images ════ */}
      <section style={{ backgroundColor: CREAM, paddingTop: PAD, paddingBottom: PAD }}>
        <Reveal>
          <div style={{ padding: `0 ${PAD}`, marginBottom: "20px" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(56,56,56,0.45)" }}>Gallery</p>
          </div>
        </Reveal>
        <div
          ref={carRef}
          style={{ display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", gap: "20px", paddingLeft: "calc(50% - 38vw)", paddingRight: "calc(50% - 38vw)", scrollbarWidth: "none" }}
          className="[&::-webkit-scrollbar]:hidden"
          onScroll={onCarScroll}
        >
          {looped.map((src, i) => (
            <div key={i} style={{ lineHeight: 0, flex: "0 0 clamp(260px,76vw,76vw)", scrollSnapAlign: "center", position: "relative", height: "clamp(200px,50vw,60vh)", overflow: "hidden", cursor: "zoom-in" }} onClick={() => setLightboxImg(src)}>
              <Image src={src} alt={`${project.name} ${(i % count) + 1}`} fill sizes="76vw" style={{ objectFit: "cover", objectPosition: "center" }} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", marginTop: "16px" }}>
          <button onClick={() => scrollCar("l")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "18px", color: DARK, opacity: 0.4, padding: "8px", transition: "opacity 0.2s" }} onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.4")}>‹</button>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: DARK, letterSpacing: "0.1em", opacity: 0.4, minWidth: "36px", textAlign: "center" }}>{activeIdx + 1} / {count}</span>
          <button onClick={() => scrollCar("r")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "18px", color: DARK, opacity: 0.4, padding: "8px", transition: "opacity 0.2s" }} onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.4")}>›</button>
        </div>
      </section>

      {/* ══ 10 · TIMELINE (cream) ════════════════════════════ */}
      {project.timeline && project.timeline.length > 0 && (
        <section style={{ backgroundColor: CREAM, padding: `${PAD} ${PAD}`, borderTop: `1px solid rgba(56,56,56,0.08)` }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(56,56,56,0.45)", marginBottom: "40px" }}>
              Project milestones
            </p>
            {project.timeline.map((item, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "clamp(70px,10vw,120px) 1px 1fr", gap: "0 20px", alignItems: "start" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(56,56,56,0.4)", letterSpacing: "0.06em", paddingTop: "2px", textAlign: "right" }}>{item.date}</p>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: item.done ? DARK : "rgba(56,56,56,0.2)", marginTop: "3px", flexShrink: 0 }} />
                  {i < project.timeline.length - 1 && <div style={{ width: "1px", flex: 1, minHeight: "40px", backgroundColor: "rgba(56,56,56,0.1)", marginTop: "4px" }} />}
                </div>
                <p style={{ ...P, color: item.done ? DARK : "rgba(56,56,56,0.4)", paddingBottom: "40px" }}>{item.label}</p>
              </div>
            ))}
          </Reveal>
        </section>
      )}

      {/* ══ 11 · MAP (cream) ════════════════════════════════ */}
      {project.mapLat && project.mapLng && (
        <section style={{ backgroundColor: CREAM, borderTop: `1px solid rgba(56,56,56,0.08)` }}>
          <div style={{ padding: `${PAD} ${PAD}`, paddingBottom: "20px" }}>
            <Reveal>
              <h2 style={{ ...H, color: WARM, marginBottom: "8px" }}>Where we are.</h2>
              <p style={{ ...P, color: "rgba(58,19,17,0.5)" }}>{project.address}</p>
            </Reveal>
          </div>
          <div style={{ lineHeight: 0, height: "420px" }}>
            <ProjectMap lat={project.mapLat} lng={project.mapLng} zoom={14} />
          </div>
        </section>
      )}

      {/* ══ 12 · ENQUIRY (dark) ════════════════════════════ */}
      <section style={{ backgroundColor: DARK, padding: `${PAD} ${PAD}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(28px,4vw,56px)", alignItems: "start" }}>
          <Reveal>
            <div>
              <h2 style={{ ...H, color: "#fff", marginBottom: "20px" }}>Register your interest.</h2>
              {project.additionalInfo && (
                <p style={{ ...P, color: "rgba(255,255,255,0.55)", marginBottom: "32px" }}>{project.additionalInfo}</p>
              )}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <CtaLink href={`/contact?project=${project.id}`} color="#fff">Make an Enquiry</CtaLink>
              <CtaLink href="/contact" color="rgba(255,255,255,0.45)">Register Interest</CtaLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ VIDEO MODAL ════════════════════════════════════ */}
      {showVideo && (
        <div onClick={() => setShowVideo(false)} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.95)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "1100px", paddingBottom: "56.25%", height: 0 }} onClick={e => e.stopPropagation()}>
            <iframe
              src="https://www.youtube.com/embed/U8fZS_2BClk?autoplay=1&rel=0&modestbranding=1"
              title="Shawood by Sekisui House — Cascadia Calderwood"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            />
          </div>
          <button onClick={() => setShowVideo(false)} style={{ position: "absolute", top: "24px", right: "24px", background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "24px", cursor: "pointer", lineHeight: 1 }}>✕</button>
        </div>
      )}

      {/* ══ LIGHTBOX ══════════════════════════════════════ */}
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
