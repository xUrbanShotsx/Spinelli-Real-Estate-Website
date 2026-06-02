import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Spinelli Real Estate",
  description:
    "Contact Spinelli Real Estate — Illawarra's trusted property experts. Call, email or use our enquiry form for any property need.",
};

export default function ContactPage() {
  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        paddingTop: "68px",
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-10">
        <div className="grid lg:grid-cols-[1fr_320px] gap-14 items-start">

          {/* Left — Form */}
          <div>
            <div className="mb-6">
              <span className="label-tag">Get in Touch</span>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  color: "#000000",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                Let&apos;s Start the Conversation
              </h1>
            </div>
            <ContactForm />
          </div>

          {/* Right — Info */}
          <div className="flex flex-col gap-6 lg:pt-16">

            {/* Phone */}
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>Phone</p>
              <a
                href="tel:0242960047"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "#000000", fontWeight: 300, letterSpacing: "-0.02em" }}
                className="transition-opacity hover:opacity-60"
              >
                02 4296 0047
              </a>
            </div>

            {/* Email */}
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>Email</p>
              <a
                href="mailto:info@spinellirealestate.com.au"
                style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#000000" }}
                className="transition-opacity hover:opacity-60"
              >
                info@spinellirealestate.com.au
              </a>
            </div>

            {/* Hours */}
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#a2b0aa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>Hours</p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#58503c", lineHeight: 1.75 }}>
                Mon – Fri &nbsp;&nbsp;8:30am – 5:30pm<br />
                Saturday &nbsp;9:00am – 4:00pm
              </p>
            </div>

            <div style={{ height: "1px", backgroundColor: "#E8E5DF" }} />

            {/* Trust signals */}
            <div className="flex flex-col gap-2.5">
              {[
                "No-obligation conversations",
                "Reply within one business day",
                "20+ years Illawarra expertise",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <svg viewBox="0 0 16 16" fill="none" style={{ width: "13px", height: "13px", flexShrink: 0 }}>
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
  );
}
