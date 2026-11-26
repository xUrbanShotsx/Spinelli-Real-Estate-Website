import type { Metadata } from "next";
import AppraisalPage from "./AppraisalPage";

export const metadata: Metadata = {
  title: "Free Property Appraisal Shellharbour & Wollongong | Spinelli Real Estate",
  description:
    "Get a free, no-obligation property appraisal from Spinelli Real Estate. Serving Shellharbour, Wollongong, Kiama and the Illawarra. Sales and rental appraisals available.",
  alternates: { canonical: "https://www.spinellirealestate.com.au/appraisal" },
  keywords: ["free property appraisal Shellharbour", "free appraisal Wollongong", "rental appraisal Illawarra", "property valuation Shellharbour", "how much is my house worth Shellharbour"],
};

export default function AppraisalRoute() {
  return <AppraisalPage />;
}
