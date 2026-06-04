import { notFound } from "next/navigation";
import { residentialSaleProperties } from "@/lib/data";
import OfferPage from "./OfferPage";

export function generateStaticParams() {
  return residentialSaleProperties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = residentialSaleProperties.find((p) => p.id === id);
  if (!property) return {};
  return {
    title: `Make an Offer — ${property.address}, ${property.suburb} | Spinelli Real Estate`,
  };
}

export default async function OfferPageRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = residentialSaleProperties.find((p) => p.id === id);
  if (!property) notFound();
  return <OfferPage property={property} />;
}
