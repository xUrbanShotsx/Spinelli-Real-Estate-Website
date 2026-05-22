interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  image?: string;
}

export default function PageHero({ badge, title, subtitle, dark = false, image }: PageHeroProps) {
  if (image) {
    return (
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "#5BC2E7" }}>
        <div className="absolute inset-0">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(13,51,72,0.78)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          {badge && <span className="label-tag-light">{badge}</span>}
          <h1
            className="text-white mb-4 max-w-3xl mx-auto"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="text-[15px] md:text-base max-w-xl mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)" }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section style={{ backgroundColor: "#5BC2E7" }} className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {badge && <span className="label-tag-light">{badge}</span>}
        <h1
          className="text-white mb-4 max-w-3xl mx-auto"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-[15px] md:text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
