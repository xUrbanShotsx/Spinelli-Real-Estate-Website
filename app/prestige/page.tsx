import type { Metadata } from "next";
import PrestigeContent from "./PrestigeContent";

export const metadata: Metadata = {
  title: "Prestige Properties Wollongong & Illawarra | Spinelli Real Estate",
  description:
    "Exceptional homes, estates and luxury properties across the Illawarra. Spinelli Real Estate — the region's prestige property specialists.",
  keywords: [
    "prestige properties Wollongong", "luxury homes Illawarra", "high end real estate Wollongong",
    "luxury property Kiama", "prestige homes Shellharbour", "exclusive properties Illawarra",
  ],
  alternates: { canonical: "https://www.spinellirealestate.com.au/prestige" },
  openGraph: {
    title: "Prestige Properties | Wollongong & Illawarra",
    description: "Exceptional homes and estates across the Illawarra. Spinelli Real Estate.",
    url: "https://www.spinellirealestate.com.au/prestige",
  },
};

export default function PrestigePage() {
  return <PrestigeContent />;
}
