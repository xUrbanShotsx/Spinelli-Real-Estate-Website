"use client";
import { useState } from "react";
import Link from "next/link";
import type { Property, PropertyAmenity } from "@/lib/types";

const amenityIcon = (category: PropertyAmenity["category"]) => {
  switch (category) {
    case "school":
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4} style={{ width: "16px", height: "16px" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
    case "transport":
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4} style={{ width: "16px", height: "16px" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h.01M16 7h.01M8 17h.01M16 17h.01M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2zm0 6h16" />
        </svg>
      );
    case "beach":
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4} style={{ width: "16px", height: "16px" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21c0-4.4 3.6-8 8-8s8 3.6 8 8M3 10c0-3.3 2.7-6 6-6 1.2 0 2.3.4 3.2 1M14 7l5-3" />
        </svg>
      );
    case "café":
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4} style={{ width: "16px", height: "16px" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zm4-7v7m4-7v7" />
        </svg>
      );
    case "shops":
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4} style={{ width: "16px", height: "16px" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      );
    case "park":
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4} style={{ width: "16px", height: "16px" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        </svg>
      );
    case "hospital":
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4} style={{ width: "16px", height: "16px" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
  }
};

export default function PropertyDetailClient({ property }: { property: Property }) {
  const photos = property.photos ?? [property.image];
  const [activePhoto, setActivePhoto] = useState(0);
  const paragraphs = (property.longDescription ?? property.description).split("\n\n");

  return (
    <>
      {/* ── Hero image — full screen, edge to top ── */}
      <section className="relative" style={{ height: "100svh", minHeight: "560px" }}>
        <img
          src={photos[activePhoto]}
          alt={property.title}
          className="absolute inset-0 object-cover transition-opacity duration-500"
          style={{ width: "100%", height: "100%" }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.0) 100%)" }}
        />

        {/* Breadcrumb — sits just below the fixed navbar */}
        <div className="absolute left-0 right-0 z-10" style={{ top: "68px" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-4 flex items-center gap-2" style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
            <Link href="/buy" className="hover:text-white transition-colors">For Sale</Link>
            <span>/</span>
            <span>{property.suburb}</span>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>{property.address}</span>
          </div>
        </div>

        {/* Tag badge */}
        {property.tag && (
          <div className="absolute left-6 sm:left-12 lg:left-20" style={{ top: "calc(68px + 2.5rem)" }}>
            <span className="px-3 py-1.5 text-[11px] font-medium tracking-widest uppercase" style={{ backgroundColor: "#0D3348", color: "#ffffff", fontFamily: "var(--font-sans)" }}>
              {property.tag}
            </span>
          </div>
        )}

        {/* Open home badge */}
        {property.openHome && (
          <div className="absolute right-6 sm:right-12 lg:right-20" style={{ top: "calc(68px + 2.5rem)" }}>
            <span className="px-3 py-1.5 text-[11px] font-medium tracking-wide flex items-center gap-2" style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ width: "13px", height: "13px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Open {property.openHome}
            </span>
          </div>
        )}

        {/* Bottom content — address + price + stats */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 lg:px-20 pb-14 max-w-7xl mx-auto">
          <p className="mb-1" style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
            {property.suburb}
          </p>
          <h1
            className="mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              color: "#ffffff",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            {property.address}
          </h1>

          {/* Price + stats row */}
          <div className="flex flex-wrap items-center gap-6">
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.02em" }}>
              {property.price}
            </p>
            <div className="w-px h-5" style={{ backgroundColor: "rgba(255,255,255,0.25)" }} />
            {property.beds !== undefined && (
              <span className="flex items-center gap-1.5 text-white/80" style={{ fontFamily: "var(--font-sans)", fontSize: "13px" }}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3} style={{ width: "16px", height: "16px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9-4 9 4" />
                </svg>
                {property.beds} bed
              </span>
            )}
            {property.baths !== undefined && (
              <span className="flex items-center gap-1.5 text-white/80" style={{ fontFamily: "var(--font-sans)", fontSize: "13px" }}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3} style={{ width: "16px", height: "16px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M4 12V8a2 2 0 012-2h12a2 2 0 012 2v4M4 12v4a2 2 0 002 2h12a2 2 0 002-2v-4" />
                </svg>
                {property.baths} bath
              </span>
            )}
            {property.cars !== undefined && (
              <span className="flex items-center gap-1.5 text-white/80" style={{ fontFamily: "var(--font-sans)", fontSize: "13px" }}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3} style={{ width: "16px", height: "16px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H4a1 1 0 01-1-1v-5l2-5h14l2 5v5a1 1 0 01-1 1h-4" />
                </svg>
                {property.cars} car
              </span>
            )}
            {property.landSize && (
              <span className="flex items-center gap-1.5 text-white/80" style={{ fontFamily: "var(--font-sans)", fontSize: "13px" }}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3} style={{ width: "16px", height: "16px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                {property.landSize}
              </span>
            )}
          </div>
        </div>

        {/* Prev / Next arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={() => setActivePhoto((p) => (p === 0 ? photos.length - 1 : p - 1))}
              className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ width: "48px", height: "48px", backgroundColor: "rgba(0,0,0,0.35)", color: "#ffffff", backdropFilter: "blur(4px)" }}
              aria-label="Previous photo"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ width: "22px", height: "22px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActivePhoto((p) => (p === photos.length - 1 ? 0 : p + 1))}
              className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ width: "48px", height: "48px", backgroundColor: "rgba(0,0,0,0.35)", color: "#ffffff", backdropFilter: "blur(4px)" }}
              aria-label="Next photo"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ width: "22px", height: "22px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {/* Photo counter */}
            <div className="absolute bottom-20 right-6" style={{ pointerEvents: "none" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em" }}>
                {activePhoto + 1} / {photos.length}
              </span>
            </div>
          </>
        )}

        {/* Scroll hint */}
        <div className="absolute bottom-6 right-6 sm:right-12 lg:right-20 flex flex-col items-center gap-1.5 animate-bounce" style={{ color: "rgba(255,255,255,0.45)" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Scroll</span>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ width: "16px", height: "16px" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Property details + enquiry ── */}
      <section style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16">
          <div className="grid lg:grid-cols-[1fr_260px] gap-12 lg:gap-16">

            {/* Left — description / features / amenities */}
            <div>
              {/* Description */}
              <div className="mb-12">
                <span className="label-tag">About This Property</span>
                <div className="space-y-4 mt-2">
                  {paragraphs.map((para, i) => (
                    <p key={i} style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#58503c", lineHeight: 1.85 }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <div className="mb-12 pt-10" style={{ borderTop: "1px solid #E8E5DF" }}>
                  <span className="label-tag">Property Features</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {property.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-3">
                        <svg viewBox="0 0 20 20" fill="none" style={{ width: "18px", height: "18px", flexShrink: 0, marginTop: "2px" }}>
                          <circle cx="10" cy="10" r="9.5" stroke="#5BC2E7" strokeWidth="1" />
                          <path d="M6 10.5l2.5 2.5 5-5" stroke="#5BC2E7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "13.5px", color: "#58503c", lineHeight: 1.5 }}>{feat}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Nearby amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="pt-10" style={{ borderTop: "1px solid #E8E5DF" }}>
                  <span className="label-tag">Nearby Amenities</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {property.amenities.map((a) => (
                      <div key={a.name} className="flex items-center gap-4 py-3 px-4" style={{ border: "1px solid #E8E5DF", backgroundColor: "#FBF9F3" }}>
                        <div style={{ color: "#5BC2E7", flexShrink: 0 }}>{amenityIcon(a.category)}</div>
                        <div className="flex-1 min-w-0">
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</p>
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", marginTop: "1px", textTransform: "capitalize" }}>{a.category}</p>
                        </div>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#5BC2E7", fontWeight: 500, flexShrink: 0 }}>{a.distance}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right — sticky enquiry card */}
            <div>
              <div className="sticky top-24" style={{ border: "1px solid #E8E5DF", backgroundColor: "#FBF9F3" }}>
                {property.openHome && (
                  <div className="px-4 py-2.5 flex items-center gap-2" style={{ backgroundColor: "#5BC2E7" }}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ width: "13px", height: "13px", color: "#ffffff", flexShrink: 0 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#ffffff", fontWeight: 500 }}>{property.openHome}</p>
                  </div>
                )}

                <div className="p-4">
                  {property.agent && (
                    <div className="flex items-center gap-2.5 mb-4 pb-4" style={{ borderBottom: "1px solid #E8E5DF" }}>
                      <div className="flex items-center justify-center flex-shrink-0" style={{ width: "32px", height: "32px", backgroundColor: "#0D3348", color: "#5BC2E7" }}>
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3} style={{ width: "16px", height: "16px" }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#000000", fontWeight: 500 }}>{property.agent}</p>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa" }}>Spinelli Real Estate</p>
                      </div>
                    </div>
                  )}

                  <p className="mb-3" style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#a2b0aa" }}>
                    Enquire
                  </p>

                  <div className="space-y-2 mb-3">
                    <input type="text" placeholder="Name" className="w-full px-3 py-2 text-[12px] outline-none" style={{ border: "1px solid #DAD7CE", fontFamily: "var(--font-sans)", backgroundColor: "#ffffff", color: "#58503c" }} />
                    <input type="email" placeholder="Email" className="w-full px-3 py-2 text-[12px] outline-none" style={{ border: "1px solid #DAD7CE", fontFamily: "var(--font-sans)", backgroundColor: "#ffffff", color: "#58503c" }} />
                    <input type="tel" placeholder="Phone" className="w-full px-3 py-2 text-[12px] outline-none" style={{ border: "1px solid #DAD7CE", fontFamily: "var(--font-sans)", backgroundColor: "#ffffff", color: "#58503c" }} />
                    <textarea rows={2} placeholder="Message..." className="w-full px-3 py-2 text-[12px] outline-none resize-none" style={{ border: "1px solid #DAD7CE", fontFamily: "var(--font-sans)", backgroundColor: "#ffffff", color: "#58503c" }} />
                  </div>

                  <Link
                    href={`/contact?property=${property.id}&type=property-enquiry`}
                    className="block w-full text-center py-2.5 text-[12px] font-medium tracking-wide transition-opacity hover:opacity-85 mb-2"
                    style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
                  >
                    Send Enquiry
                  </Link>

                  {property.agentPhone && (
                    <a
                      href={`tel:${property.agentPhone.replace(/\s/g, "")}`}
                      className="flex items-center justify-center gap-1.5 w-full py-2.5 text-[12px] font-medium transition-opacity hover:opacity-70"
                      style={{ border: "1px solid #DAD7CE", color: "#58503c", fontFamily: "var(--font-sans)" }}
                    >
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ width: "13px", height: "13px" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {property.agentPhone}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Back to listings ── */}
      <section className="py-12" style={{ backgroundColor: "#FBF9F3", borderTop: "1px solid #E8E5DF" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <Link href="/buy" className="inline-flex items-center gap-2 text-[13px] transition-opacity hover:opacity-60" style={{ fontFamily: "var(--font-sans)", color: "#58503c" }}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ width: "16px", height: "16px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all listings
          </Link>
        </div>
      </section>
    </>
  );
}
