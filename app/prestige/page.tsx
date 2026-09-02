import type { Metadata } from "next";
import PrestigeContent from "./PrestigeContent";

export const metadata: Metadata = {
  title: "Prestige Properties Wollongong & Illawarra | Spinelli Real Estate",
  description:
    "Exceptional homes, acreage estates and luxury properties across the Illawarra. Browse Spinelli Real Estate's exclusive prestige collection — quality homes rarely offered to the open market.",
  keywords: [
    "prestige properties Wollongong",
    "luxury homes Illawarra",
    "high end real estate Wollongong",
    "luxury property Kiama",
    "prestige homes Shellharbour",
    "exclusive properties Illawarra",
    "acreage homes Illawarra",
    "luxury real estate Dapto",
    "prestige homes Yallah",
    "luxury property Wollongong NSW",
    "exclusive estate Illawarra",
    "high value property Wollongong",
    "multi million dollar homes Wollongong",
    "prestige acreage for sale Illawarra",
    "Spinelli prestige real estate",
  ],
  alternates: { canonical: "https://www.spinellirealestate.com.au/prestige" },
  openGraph: {
    title: "Prestige Properties | Wollongong & Illawarra | Spinelli Real Estate",
    description:
      "Exceptional homes, acreage estates and luxury properties across the Illawarra. Exclusively marketed by Spinelli Real Estate.",
    url: "https://www.spinellirealestate.com.au/prestige",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prestige Properties | Spinelli Real Estate",
    description: "Exceptional homes and acreage estates across the Illawarra.",
  },
};

export default function PrestigePage() {
  return <PrestigeContent />;
}
