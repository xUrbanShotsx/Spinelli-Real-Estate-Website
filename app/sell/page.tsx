import type { Metadata } from "next";
import SellContent from "./SellContent";

export const metadata: Metadata = {
  title: "Sell With Us | Spinelli Real Estate",
  description:
    "Sell your Illawarra property with Spinelli Real Estate. Premium marketing, expert negotiation and local knowledge — consistently delivering outstanding results.",
};

export default function SellPage() {
  return <SellContent />;
}
