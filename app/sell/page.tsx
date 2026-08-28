import type { Metadata } from "next";
import SellContent from "./SellContent";

export const metadata: Metadata = {
  title: "Sell Your Property in Wollongong & Illawarra | Spinelli Real Estate",
  description:
    "Sell your home in Wollongong, Kiama, Shellharbour or across the Illawarra with Spinelli Real Estate. Premium marketing, expert negotiation, local knowledge — outstanding results every time.",
  keywords: [
    "sell property Wollongong", "sell my home Illawarra", "real estate agent Wollongong",
    "property appraisal Illawarra", "sell house Kiama", "sell house Shellharbour",
    "best real estate agent Wollongong", "Illawarra property sales",
  ],
  alternates: { canonical: "https://www.spinellirealestate.com.au/sell" },
  openGraph: {
    title: "Sell With Spinelli Real Estate | Wollongong & Illawarra",
    description: "Get the best price for your Illawarra property. Premium marketing and expert agents.",
    url: "https://www.spinellirealestate.com.au/sell",
  },
};

export default function SellPage() {
  return <SellContent />;
}
