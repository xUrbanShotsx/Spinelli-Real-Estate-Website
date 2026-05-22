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
