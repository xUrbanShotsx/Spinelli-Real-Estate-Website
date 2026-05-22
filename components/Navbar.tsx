"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Buy",
    dropdown: [
      { label: "Residential", href: "/buy", sub: "Browse residential listings" },
      { label: "Commercial", href: "/commercial", sub: "Office, retail & industrial" },
      { label: "Business", href: "/business", sub: "Buy or sell a business" },
    ],
  },
  {
    label: "Sell",
    dropdown: [
      { label: "Sell With Us", href: "/sell", sub: "Market-leading results" },
      { label: "Sold Properties", href: "/sell#sold", sub: "Our recent results" },
      { label: "Selling Guide", href: "/sell#guide", sub: "Everything you need to know" },
    ],
  },
  {
    label: "Rent",
    dropdown: [
      { label: "Residential", href: "/rent", sub: "Find your next rental" },
      { label: "Commercial", href: "/commercial#lease", sub: "Office & retail leasing" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Suburbs", href: "/suburbs" },
  {
    label: "About",
    dropdown: [
      { label: "About Us", href: "/about", sub: "Our story & values" },
      { label: "Meet the Team", href: "/about#team", sub: "The people behind Spinelli" },
      { label: "Contact Us", href: "/contact", sub: "Get in touch today" },
    ],
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Pages with no hero — navbar should use blue at the top
  const lightPages = ["/sell", "/buy", "/rent", "/commercial", "/business", "/suburbs", "/contact", "/about", "/property-management"];
  const isLightPage = lightPages.some((p) => pathname === p || pathname.startsWith(p + "/"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const solid = scrolled || menuOpen || isLightPage;

  const navBg = solid ? "#ffffff" : "transparent";
  const navBorder = solid ? "1px solid #DAD7CE" : "1px solid transparent";
  const iconColor = solid ? "#5BC2E7" : "#ffffff";

  return (
    <>
      {/* ── Top bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ backgroundColor: navBg, borderBottom: navBorder }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[68px] grid grid-cols-3 items-center">

          {/* Left — Menu button */}
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2.5 transition-opacity hover:opacity-60"
              style={{ color: iconColor, fontFamily: "var(--font-sans)" }}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                /* X icon */
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                /* Hamburger */
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
              <span className="hidden sm:inline text-[12px] font-medium tracking-[0.12em] uppercase" style={{ fontFamily: "var(--font-sans)" }}>
                {menuOpen ? "Close" : "Menu"}
              </span>
            </button>
          </div>

          {/* Centre — Logo */}
          <div className="flex justify-center">
            <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Spinelli Real Estate"
                className="transition-all duration-300"
                style={{
                  height: "80px",
                  width: "auto",
                  filter: solid ? "brightness(0) saturate(100%) invert(73%) sepia(40%) saturate(692%) hue-rotate(161deg) brightness(98%)" : "none",
                }}
              />
            </Link>
          </div>

          {/* Right — Contact */}
          <div className="flex items-center justify-end gap-4">
            <a
              href="tel:0242960047"
              className="hidden md:block text-[12px] transition-opacity hover:opacity-60"
              style={{ color: iconColor, fontFamily: "var(--font-sans)" }}
            >
              02 4296 0047
            </a>
            <Link
              href="/contact?type=appraisal"
              className="text-[12px] font-medium px-4 py-2 transition-all hover:opacity-85"
              style={{
                backgroundColor: solid ? "#5BC2E7" : "rgba(255,255,255,0.12)",
                color: "#ffffff",
                border: solid ? "none" : "1px solid rgba(255,255,255,0.3)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Free Appraisal
            </Link>
          </div>
        </div>
      </header>

      {/* ── Slide-in menu panel ── */}
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(13,51,72,0.35)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        onClick={() => setMenuOpen(false)}
      />

      {/* Sidebar drawer */}
      <div
        className="fixed top-0 left-0 h-full z-40 flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out"
        style={{
          width: "min(380px, 90vw)",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #DAD7CE",
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {/* Sidebar header spacer (aligns with nav bar height) */}
        <div className="h-[68px] flex-shrink-0 border-b" style={{ borderColor: "#DAD7CE" }} />

        {/* Nav items */}
        <nav className="flex-1 px-8 py-8">
          {navItems.map((item, idx) =>
            item.dropdown ? (
              <div key={item.label} style={{ borderBottom: "1px solid #E8E5DF" }}>
                <button
                  onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  className="flex items-center justify-between w-full py-4 text-left transition-opacity hover:opacity-60"
                >
                  <span
                    className="text-[22px] font-light tracking-tight"
                    style={{ color: "#000000", fontFamily: "var(--font-display)" }}
                  >
                    {item.label}
                  </span>
                  <svg
                    className="w-4 h-4 transition-transform duration-200 flex-shrink-0"
                    style={{
                      transform: expanded === item.label ? "rotate(45deg)" : "rotate(0deg)",
                      color: "#a2b0aa",
                    }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>

                {/* Sub-items */}
                <div
                  className="overflow-hidden transition-all duration-200"
                  style={{ maxHeight: expanded === item.label ? "300px" : "0" }}
                >
                  <div className="pb-3 pl-3 space-y-0">
                    {item.dropdown.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex flex-col py-2.5 transition-opacity hover:opacity-60"
                      >
                        <span style={{ color: "#000000", fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 300, letterSpacing: "-0.01em" }}>
                          {child.label}
                        </span>
                        <span style={{ color: "#a2b0aa", fontFamily: "var(--font-sans)", fontSize: "11px", marginTop: "2px", letterSpacing: "0.02em" }}>
                          {child.sub}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div key={item.href} style={{ borderBottom: "1px solid #E8E5DF" }}>
                <Link
                  href={item.href!}
                  onClick={() => setMenuOpen(false)}
                  className="block py-4 transition-opacity hover:opacity-60"
                >
                  <span
                    className="text-[22px] font-light tracking-tight"
                    style={{ color: "#000000", fontFamily: "var(--font-display)" }}
                  >
                    {item.label}
                  </span>
                </Link>
              </div>
            )
          )}
        </nav>

        {/* Sidebar footer */}
        <div className="px-8 py-8 border-t" style={{ borderColor: "#DAD7CE" }}>
          <p className="text-[11px] tracking-[0.14em] uppercase mb-4" style={{ color: "#a2b0aa", fontFamily: "var(--font-sans)" }}>
            Contact
          </p>
          <a
            href="tel:0242960047"
            className="block text-[14px] mb-1 transition-opacity hover:opacity-60"
            style={{ color: "#000000", fontFamily: "var(--font-sans)" }}
          >
            02 4296 0047
          </a>
          <a
            href="mailto:info@spinellirealestate.com.au"
            className="block text-[13px] mb-6 transition-opacity hover:opacity-60"
            style={{ color: "#7a7265", fontFamily: "var(--font-sans)" }}
          >
            info@spinellirealestate.com.au
          </a>
          <Link
            href="/contact?type=appraisal"
            onClick={() => setMenuOpen(false)}
            className="block text-center py-3 text-[13px] font-medium transition-opacity hover:opacity-85"
            style={{ backgroundColor: "#5BC2E7", color: "#FBF9F3", fontFamily: "var(--font-sans)" }}
          >
            Free Appraisal
          </Link>
        </div>
      </div>
    </>
  );
}
