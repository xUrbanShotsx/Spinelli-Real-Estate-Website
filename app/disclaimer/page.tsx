import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Spinelli Real Estate",
  description:
    "Disclaimer for Spinelli Real Estate — important information regarding property information, financial advice, website content and liability.",
};

const sections = [
  {
    title: "1. General",
    content: `Spinelli Real Estate ("we", "us", "our") operates this website and provides real estate services across the Illawarra region of New South Wales, Australia. By accessing this website or engaging our services, you agree to the terms set out in this Disclaimer.

This Disclaimer should be read in conjunction with our Privacy Policy, which is available at spinellirealestate.com.au/privacy.

We reserve the right to amend this Disclaimer at any time. The current version will always be published on this page. Last updated: June 2025.`,
  },
  {
    title: "2. Property Information & Pricing",
    content: `All property information published on this website — including but not limited to prices, property descriptions, dimensions, floor plans, photographs, rental yields, land sizes and features — is provided in good faith and believed to be accurate at the time of publication. However, we make no representation or warranty, express or implied, as to the accuracy, completeness or currency of any property information.

Property prices, market conditions and availability can change rapidly. Any pricing information displayed should be treated as indicative only. Prospective buyers, tenants and investors should conduct their own independent due diligence, including obtaining independent legal, financial and building inspection advice, before entering into any property transaction.

We accept no liability for any loss or damage suffered as a result of reliance on any property information published on this website or communicated by our agents, whether arising from inaccuracy, omission or otherwise.`,
  },
  {
    title: "3. No Financial or Investment Advice",
    content: `Nothing on this website or communicated by Spinelli Real Estate or its agents constitutes financial, investment, taxation or legal advice. Any information relating to property values, rental yields, capital growth, market trends or investment potential is general in nature and does not take into account your personal financial situation, objectives or needs.

Before making any property investment decision, you should seek independent advice from a licensed financial adviser, accountant or solicitor who can assess your individual circumstances.

Spinelli Real Estate is a licensed real estate agency. We are not licensed to provide financial product advice under the Corporations Act 2001 (Cth) or the National Consumer Credit Protection Act 2009 (Cth).`,
  },
  {
    title: "4. Appraisals & Market Estimates",
    content: `Property appraisals, price guides, estimated rental returns and comparative market analyses provided by Spinelli Real Estate are professional opinions based on available market data at the time of preparation. They are not formal valuations and should not be relied upon as such.

Appraisals do not guarantee the price at which a property will sell or rent. Actual sale or rental results may differ materially from any estimate provided. Spinelli Real Estate accepts no liability for any reliance placed on an appraisal, price guide or market estimate.

For a formal valuation, you should engage a licensed property valuer registered with the Australian Property Institute (API).`,
  },
  {
    title: "5. Website Content Accuracy",
    content: `While we take reasonable care to ensure the information published on this website is accurate and up to date, we do not warrant that the website is free from errors, omissions or inaccuracies. Content on this website — including suburb profiles, market data, statistics and agent information — may change without notice.

We do not accept responsibility for any loss, damage or inconvenience caused as a result of reliance on information contained on this website, including any third-party content or external links.

Any suburb guides, market reports or statistical data published on this website are provided for general informational purposes only and should not be relied upon as professional advice.`,
  },
  {
    title: "6. Photographs, Floor Plans & Virtual Tours",
    content: `Photographs, floor plans, virtual tours, renders and other visual materials displayed on this website are provided for illustrative purposes only. They may not accurately represent the current condition, dimensions, layout or finishes of a property.

For off-the-plan and development projects, renders and floor plans are indicative only. The final product may differ from illustrations shown due to construction variances, design changes or developer decisions. Prospective purchasers should refer to the Contract for Sale for the definitive specification.

We accept no liability arising from any discrepancy between visual materials displayed and the actual property.`,
  },
  {
    title: "7. Third-Party Websites & Links",
    content: `This website may contain links to third-party websites including property portals, government agencies, financial institutions and other service providers. These links are provided for convenience only. We do not endorse, control or take responsibility for the content, accuracy or practices of any third-party website.

Accessing any third-party website via a link on our website is entirely at your own risk. We recommend you review the privacy policy and terms of use of any third-party website you visit.`,
  },
  {
    title: "8. Limitation of Liability",
    content: `To the maximum extent permitted by law, Spinelli Real Estate and its directors, agents, employees and contractors exclude all liability for any loss or damage (including direct, indirect, special, consequential or incidental loss or damage) arising from:

— Use of or reliance on information contained on this website
— Any property transaction entered into in reliance on information provided by us
— Any error, omission or inaccuracy in property listings or descriptions
— Interruption, suspension or unavailability of this website
— Unauthorised access to or use of our systems or data
— Any act or omission of a third party

Where liability cannot be excluded under applicable law (including the Australian Consumer Law), our liability is limited to the maximum extent permitted by law.

Nothing in this Disclaimer excludes, restricts or modifies any right or remedy, or any guarantee, warranty or other term or condition, implied or imposed by any legislation which cannot lawfully be excluded or limited.`,
  },
  {
    title: "9. Professional Advice Recommendation",
    content: `We strongly encourage all parties involved in property transactions — whether buying, selling, leasing or investing — to obtain independent professional advice from qualified practitioners before making any decision, including:

— Legal advice from a licensed solicitor or conveyancer
— Financial advice from an Australian Financial Services (AFS) licence holder
— Tax advice from a registered tax agent or accountant
— Building and pest inspections from a licensed inspector
— Formal property valuation from a registered property valuer

Spinelli Real Estate and its agents are not qualified to provide advice in any of these areas and will not be liable for any decision made without appropriate professional guidance.`,
  },
  {
    title: "10. Complaints & Contact",
    content: `If you have any concerns about information published on this website or about the conduct of our agents, please contact us directly:

Spinelli Real Estate
Phone: 02 4296 0047
Email: info@spinellirealestate.com.au
Website: spinellirealestate.com.au

Complaints relating to the conduct of a licensed real estate agent in NSW may also be directed to:

NSW Fair Trading
Phone: 13 32 20
Website: www.fairtrading.nsw.gov.au

Real Estate Institute of NSW (REINSW)
Phone: 02 9264 2343
Website: www.reinsw.com.au`,
  },
];

export default function DisclaimerPage() {
  return (
    <>
      {/* ── Header ── */}
      <section style={{ backgroundColor: "#5BC2E7", paddingTop: "140px", paddingBottom: "80px" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              display: "block",
              marginBottom: "20px",
            }}
          >
            Legal
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "#ffffff",
              fontWeight: 300,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              marginBottom: "24px",
            }}
          >
            Disclaimer
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.75,
              maxWidth: "52ch",
            }}
          >
            Important information regarding property listings, pricing, financial matters, website content and the limitations of liability for Spinelli Real Estate.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 0 120px" }}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
          <div className="max-w-3xl">
            {sections.map((section, i) => (
              <div
                key={section.title}
                style={{
                  paddingTop: i === 0 ? "0" : "48px",
                  marginTop: i === 0 ? "0" : "48px",
                  borderTop: i === 0 ? "none" : "1px solid #E8E5DF",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.4rem",
                    color: "#000000",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    marginBottom: "20px",
                  }}
                >
                  {section.title}
                </h2>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    color: "#4a4540",
                    lineHeight: 1.85,
                    whiteSpace: "pre-line",
                  }}
                >
                  {section.content}
                </div>
              </div>
            ))}

            {/* Last updated note */}
            <div
              style={{
                marginTop: "64px",
                paddingTop: "32px",
                borderTop: "1px solid #E8E5DF",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  color: "#a2b0aa",
                  letterSpacing: "0.04em",
                }}
              >
                This Disclaimer was last reviewed and updated in June 2025. Spinelli Real Estate reserves the right to update this Disclaimer at any time. The current version is always available at spinellirealestate.com.au/disclaimer.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
