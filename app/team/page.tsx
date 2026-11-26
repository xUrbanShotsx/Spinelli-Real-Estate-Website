import type { Metadata } from "next";
import Link from "next/link";
import TeamGrid from "@/components/TeamGrid";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Real Estate Agents Shellharbour & Wollongong | Spinelli Real Estate",
  description:
    "Meet the Spinelli Real Estate team — Paul Spinelli and Adam Spinelli are experienced, local property professionals serving Shellharbour, Wollongong, Kiama and the Illawarra.",
  alternates: { canonical: "https://www.spinellirealestate.com.au/team" },
  keywords: ["best real estate agent Shellharbour", "real estate agent Wollongong", "Paul Spinelli", "Adam Spinelli", "Spinelli Real Estate agents"],
};

export default function TeamPage() {
  return (
    <>
      {/* ── Team grid ── */}
      <TeamGrid members={team} />

      {/* ── CTA ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D3348" }}>
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&h=500&fit=crop&q=60"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%", opacity: 0.08 }}
        />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="label-tag-light">Work With Us</span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  color: "#ffffff",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                Ready to Get<br />Started?
              </h2>
            </div>
            <div>
              <p className="mb-8" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "42ch" }}>
                Our team is ready to help you buy, sell, rent or invest across the Illawarra. Get in touch today for an obligation-free conversation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#5BC2E7", color: "#ffffff", fontFamily: "var(--font-sans)" }}
                >
                  Get in Touch
                </Link>
                <a
                  href="tel:0242960047"
                  className="inline-block px-7 py-3.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-70"
                  style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-sans)" }}
                >
                  02 4296 0047
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
