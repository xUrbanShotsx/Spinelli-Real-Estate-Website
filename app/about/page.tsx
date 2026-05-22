import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us | Spinelli Real Estate",
  description:
    "Learn about Spinelli Real Estate — Illawarra's trusted boutique agency. Meet Paul and Adam Spinelli and discover our story, values and commitment.",
};

const values = [
  { title: "Integrity", desc: "Honest, transparent advice — always in our clients' best interests, even when it's not what they want to hear." },
  { title: "Excellence", desc: "We hold ourselves to the highest standard in everything — from marketing to communication to results." },
  { title: "Community", desc: "We're proud Illawarra locals who invest in the people and places that make this region great." },
  { title: "Results", desc: "Our clients judge us on outcomes — and we're consistently proud of what we deliver." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="Our Story"
        title="About Spinelli Real Estate"
        subtitle="A boutique Illawarra agency built on local knowledge, genuine care and a relentless drive to deliver exceptional results."
      />

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" alt="Spinelli Real Estate office" className="rounded-2xl object-cover w-full" style={{ height: "480px" }} />
            <div>
              <div className="section-kicker">
                <span className="kicker-text">Our Story</span>
              </div>
              <h2 className="text-3xl font-bold mb-5" style={{ color: "#5BC2E7" }}>Two Decades of Illawarra Real Estate</h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#7a7265" }}>
                <p style={{ maxWidth: "46ch" }}>
                  Spinelli Real Estate was founded on a simple belief: that clients deserve more than a transaction. They deserve a trusted adviser — someone who truly knows the local market, cares about their outcome and works tirelessly to achieve it.
                </p>
                <p style={{ maxWidth: "46ch" }}>
                  Over two decades, we&apos;ve built that reputation across the Illawarra — from Helensburgh to Nowra, helping thousands of families buy, sell, rent and invest with the same commitment to premium service and premium results.
                </p>
                <p style={{ maxWidth: "46ch" }}>
                  Today we offer a full suite of services: residential sales, commercial property, business sales, project marketing and property management. We&apos;re a family business, and we treat every client&apos;s property as if it were our own.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ backgroundColor: "#fbf9f3" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="section-kicker justify-center">
              <span className="kicker-text">What We Stand For</span>
            </div>
            <h2 className="text-3xl font-bold" style={{ color: "#5BC2E7" }}>Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={v.title} className="p-7 bg-white rounded-2xl border" style={{ borderColor: "#dad7ce" }}>
                <p className="text-xs font-bold tracking-[0.15em] uppercase mb-4" style={{ color: "#5BC2E7" }}>0{i + 1}</p>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#5BC2E7",  }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7a7265" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="section-kicker justify-center">
              <span className="kicker-text">The Team</span>
            </div>
            <h2 className="text-3xl font-bold" style={{ color: "#5BC2E7" }}>Meet Our People</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl overflow-hidden border" style={{ borderColor: "#dad7ce" }}>
                <div className="overflow-hidden" style={{ height: "280px" }}>
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-7">
                  <h3 className="font-bold text-xl mb-0.5" style={{ color: "#5BC2E7",  }}>{member.name}</h3>
                  <p className="text-sm font-semibold mb-4" style={{ color: "#2da8d0" }}>{member.role}</p>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#7a7265", maxWidth: "44ch" }}>{member.bio}</p>
                  <div className="space-y-2 pt-4 border-t" style={{ borderColor: "#e8e5df" }}>
                    <a href={`tel:${member.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 text-sm hover:opacity-70 transition-opacity" style={{ color: "#58503c" }}>
                      <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#2da8d0" }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      {member.phone}
                    </a>
                    <a href={`mailto:${member.email}`} className="flex items-center gap-2.5 text-sm hover:opacity-70 transition-opacity" style={{ color: "#58503c" }}>
                      <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#2da8d0" }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      {member.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#5BC2E7" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Work With Us</h2>
          <p className="text-sm mb-7" style={{ color: "rgba(255,255,255,0.55)" }}>Whether you&apos;re buying, selling or managing property — we&apos;d love to help you achieve your goals.</p>
          <Link href="/contact" className="inline-block px-7 py-3 rounded font-semibold text-sm hover:opacity-90 transition-opacity" style={{ backgroundColor: "#5BC2E7", color: "#5BC2E7" }}>
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
