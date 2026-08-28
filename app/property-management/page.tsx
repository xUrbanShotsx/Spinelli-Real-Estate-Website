import type { Metadata } from "next";
import PropertyManagementContent from "./PropertyManagementContent";

export const metadata: Metadata = {
  title: "Property Management Wollongong & Illawarra | Spinelli Real Estate",
  description:
    "Illawarra's trusted property managers. 12+ years experience, 350+ properties managed, 97% tenancy rate. Maximise your rental return in Wollongong, Kiama and Shellharbour.",
  keywords: [
    "property management Wollongong", "property manager Illawarra", "rental property management Kiama",
    "investment property management Wollongong", "best property manager Illawarra",
    "landlord services Wollongong", "property management Shellharbour",
  ],
  alternates: { canonical: "https://www.spinellirealestate.com.au/property-management" },
  openGraph: {
    title: "Property Management | Wollongong & Illawarra",
    description: "Illawarra's leading property managers. 350+ properties, 97% tenancy rate.",
    url: "https://www.spinellirealestate.com.au/property-management",
  },
};

export default function PropertyManagementPage() {
  return <PropertyManagementContent />;
}
