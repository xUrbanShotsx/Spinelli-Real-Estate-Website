import type { Metadata } from "next";
import PropertyManagementContent from "./PropertyManagementContent";

export const metadata: Metadata = {
  title: "Property Management | Spinelli Real Estate",
  description:
    "Illawarra's leading property management team. 12+ years experience, 350+ properties managed, 97% tenancy rate. Let Spinelli Real Estate protect and grow your investment.",
};

export default function PropertyManagementPage() {
  return <PropertyManagementContent />;
}
