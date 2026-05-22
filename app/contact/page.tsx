import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us | Spinelli Real Estate",
  description:
    "Contact Spinelli Real Estate — Illawarra's trusted property experts. Call, email or use our enquiry form for any property need.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Get in Touch"
        title="Contact Our Team"
        subtitle="We'd love to hear from you. Reach out for a free appraisal, property enquiry or any question."
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border p-8" style={{ borderColor: "#dad7ce" }}>
                <h2 className="text-2xl font-bold mb-7" style={{ color: "#5BC2E7",  }}>
                  Send Us an Enquiry
                </h2>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: "#58503c" }}>First Name</label>
                      <input type="text" placeholder="Jane" className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors" style={{ borderColor: "#dad7ce", color: "#5BC2E7" }} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: "#58503c" }}>Last Name</label>
                      <input type="text" placeholder="Smith" className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors" style={{ borderColor: "#dad7ce", color: "#5BC2E7" }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: "#58503c" }}>Email Address</label>
                      <input type="email" placeholder="jane@example.com" className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors" style={{ borderColor: "#dad7ce", color: "#5BC2E7" }} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: "#58503c" }}>Phone Number</label>
                      <input type="tel" placeholder="04xx xxx xxx" className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors" style={{ borderColor: "#dad7ce", color: "#5BC2E7" }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: "#58503c" }}>Enquiry Type</label>
                    <select className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none bg-white" style={{ borderColor: "#dad7ce", color: "#5BC2E7" }}>
                      <option value="">Select an enquiry type...</option>
                      <option value="appraisal">Free Property Appraisal</option>
                      <option value="buyer-enquiry">Buyer Enquiry</option>
                      <option value="rental">Rental Enquiry</option>
                      <option value="commercial">Commercial Property</option>
                      <option value="business">Business Sales</option>
                      <option value="property-management">Property Management</option>
                      <option value="project">Project / Off the Plan</option>
                      <option value="developer">Developer Enquiry</option>
                      <option value="general">General Enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: "#58503c" }}>Suburb of Interest</label>
                    <input type="text" placeholder="e.g. Kiama, Wollongong, Shellharbour..." className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none" style={{ borderColor: "#dad7ce", color: "#5BC2E7" }} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: "#58503c" }}>Message</label>
                    <textarea rows={5} placeholder="Tell us how we can help you..." className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none resize-none" style={{ borderColor: "#dad7ce", color: "#5BC2E7" }} />
                  </div>
                  <button type="submit" style={{ backgroundColor: "#5BC2E7", color: "#ffffff" }} className="w-full py-3.5 rounded-lg font-semibold text-sm hover:bg-[#3aafdb] transition-colors">
                    Send Enquiry
                  </button>
                  <p className="text-xs text-center" style={{ color: "#7a7265" }}>
                    By submitting this form you agree to our Privacy Policy. We&apos;ll respond within 1 business day.
                  </p>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Office */}
              <div className="bg-white rounded-2xl border p-6" style={{ borderColor: "#dad7ce" }}>
                <h3 className="font-bold text-lg mb-5" style={{ color: "#5BC2E7",  }}>Office Details</h3>
                <div className="space-y-4">
                  {[
                    { icon: "phone", label: "Phone", value: "02 4296 0047", href: "tel:0242960047" },
                    { icon: "email", label: "Email", value: "info@spinellirealestate.com.au", href: "mailto:info@spinellirealestate.com.au" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#ede9df" }}>
                        {item.icon === "phone" ? (
                          <svg className="w-4 h-4" style={{ color: "#2da8d0" }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        ) : (
                          <svg className="w-4 h-4" style={{ color: "#2da8d0" }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        )}
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide font-semibold mb-0.5" style={{ color: "#7a7265" }}>{item.label}</p>
                        <a href={item.href} className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "#5BC2E7" }}>{item.value}</a>
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 border-t" style={{ borderColor: "#e8e5df" }}>
                    <p className="text-xs uppercase tracking-wide font-semibold mb-2" style={{ color: "#7a7265" }}>Office Hours</p>
                    <p className="text-sm" style={{ color: "#58503c" }}>Mon–Fri: 8:30am – 5:30pm</p>
                    <p className="text-sm" style={{ color: "#58503c" }}>Sat: 9:00am – 4:00pm</p>
                  </div>
                  <div className="pt-3 border-t" style={{ borderColor: "#e8e5df" }}>
                    <p className="text-xs uppercase tracking-wide font-semibold mb-1" style={{ color: "#7a7265" }}>Service Area</p>
                    <p className="text-sm" style={{ color: "#58503c" }}>Helensburgh to Nowra</p>
                  </div>
                </div>
              </div>

              {/* Team */}
              {team.map((member) => (
                <div key={member.name} className="bg-white rounded-2xl border p-5 flex gap-4" style={{ borderColor: "#dad7ce" }}>
                  <img src={member.image} alt={member.name} className="w-14 h-14 rounded-xl object-cover object-top flex-shrink-0" />
                  <div>
                    <p className="font-bold text-sm" style={{ color: "#5BC2E7" }}>{member.name}</p>
                    <p className="text-xs font-semibold mb-1.5" style={{ color: "#2da8d0" }}>{member.role}</p>
                    <a href={`tel:${member.phone.replace(/\s/g, "")}`} className="text-xs hover:opacity-70 transition-opacity block" style={{ color: "#7a7265" }}>{member.phone}</a>
                    <a href={`mailto:${member.email}`} className="text-xs hover:opacity-70 transition-opacity block" style={{ color: "#7a7265" }}>{member.email}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
