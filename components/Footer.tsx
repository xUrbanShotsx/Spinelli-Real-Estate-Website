"use client";
import Link from "next/link";

const links = [
  { label: "Buy", href: "/buy" },
  { label: "Sell", href: "/sell" },
  { label: "Rent", href: "/rent" },
  { label: "Commercial", href: "/commercial" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-10">

        {/* Main row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

          {/* Logo */}
          <img
            src="/logo.png"
            alt="Spinelli Real Estate"
            style={{
              height: "80px",
              width: "auto",
              filter: "brightness(0) saturate(100%) invert(73%) sepia(40%) saturate(692%) hue-rotate(161deg) brightness(98%)",
            }}
          />

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors"
                style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#000000")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#7a7265")}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-1">
            <a
              href="tel:0242960047"
              className="transition-colors"
              style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#7a7265")}
            >
              02 4296 0047
            </a>
            <a
              href="mailto:info@spinellirealestate.com.au"
              className="transition-colors"
              style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#7a7265" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#7a7265")}
            >
              info@spinellirealestate.com.au
            </a>

            {/* Social icons */}
            <div className="flex gap-3 mt-2">
              <a
                href="https://www.instagram.com/spinellirealestate"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-opacity hover:opacity-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7a7265" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="#7a7265" stroke="none"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/spinellirealestate"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-opacity hover:opacity-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7a7265" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/spinelli-real-estate"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-opacity hover:opacity-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7a7265" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.02em" }}>
            © {new Date().getFullYear()} Spinelli Real Estate. Licensed Real Estate Agent NSW.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa" }}>Privacy Policy</Link>
            <Link href="/disclaimer" style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#a2b0aa" }}>Disclaimer</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
