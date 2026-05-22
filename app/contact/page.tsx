import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Spinelli Real Estate",
  description:
    "Contact Spinelli Real Estate — Illawarra's trusted property experts. Call, email or use our enquiry form for any property need.",
};

const team = [
  { name: "Paul Spinelli", role: "Principal", phone: "0412 345 678", email: "paul@spinellirealestate.com.au", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
  { name: "Adam Spinelli", role: "Sales Agent", phone: "0423 456 789", email: "adam@spinellirealestate.com.au", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
];

export default function ContactPage() {
  return (
    <>
      {/* ── Main ── */}
      <section style={{ backgroundColor: "#ffffff", paddingTop: "120px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">

          {/* Page header */}
          <div className="mb-16">
            <span className="label-tag">Get in Touch</span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                color: "#000000",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
              }}
            >
              Let&apos;s Start the<br />Conversation
            </h1>
          </div>

          {/* Two-column */}
          <div className="grid lg:grid-cols-[1fr_400px] gap-20 pb-24">

            {/* Left — Form */}
            <ContactForm />

            {/* Right — Info */}
            <div className="flex flex-col gap-12">

              {/* Direct contact */}
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#a2b0aa", marginBottom: "20px" }}>
                  Direct Contact
                </p>
                <div className="space-y-6">
                  <div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>Phone</p>
                    <a
                      href="tel:0242960047"
                      style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.02em" }}
                      className="transition-opacity hover:opacity-60"
                    >
                      02 4296 0047
                    </a>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>Email</p>
                    <a
                      href="mailto:info@spinellirealestate.com.au"
                      style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000" }}
                      className="transition-opacity hover:opacity-60"
                    >
                      info@spinellirealestate.com.au
                    </a>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>Hours</p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#58503c", lineHeight: 1.8 }}>
                      Mon – Fri &nbsp;&nbsp;8:30am – 5:30pm<br />
                      Saturday &nbsp;9:00am – 4:00pm
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ height: "1px", backgroundColor: "#E8E5DF" }} />

              {/* Team */}
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#a2b0aa", marginBottom: "20px" }}>
                  Our Team
                </p>
                <div className="space-y-8">
                  {team.map((m) => (
                    <div key={m.name} className="flex items-center gap-5">
                      <img
                        src={m.image}
                        alt={m.name}
                        style={{ width: "60px", height: "60px", objectFit: "cover", objectPosition: "top", flexShrink: 0 }}
                      />
                      <div>
                        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#000000", fontWeight: 400, letterSpacing: "-0.01em", marginBottom: "2px" }}>
                          {m.name}
                        </p>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", marginBottom: "6px" }}>
                          {m.role}
                        </p>
                        <a
                          href={`tel:${m.phone.replace(/\s/g, "")}`}
                          style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#5BC2E7" }}
                          className="hover:opacity-70 transition-opacity block"
                        >
                          {m.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ height: "1px", backgroundColor: "#E8E5DF" }} />

              {/* Trust signals */}
              <div className="flex flex-col gap-3">
                {[
                  "No-obligation, confidential conversations",
                  "Response within one business day",
                  "20+ years Illawarra expertise",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <svg viewBox="0 0 16 16" fill="none" style={{ width: "14px", height: "14px", flexShrink: 0 }}>
                      <circle cx="8" cy="8" r="7.5" stroke="#5BC2E7" strokeWidth="1" />
                      <path d="M5 8.5l2 2 4-4" stroke="#5BC2E7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#7a7265" }}>{item}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Full-width image banner ── */}
      <div style={{ height: "400px", position: "relative", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&h=600&fit=crop&q=85"
          alt="Illawarra coastline"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%" }}
        />
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.3)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              color: "#ffffff",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              textAlign: "center",
            }}
          >
            Serving the Illawarra for Over 20 Years
          </p>
        </div>
      </div>
    </>
  );
}
