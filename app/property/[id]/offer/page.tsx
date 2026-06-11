import { notFound } from "next/navigation";
import { residentialSaleProperties } from "@/lib/data";
import { fetchListing, mapListing } from "@/lib/agentbox";
import OfferPage from "./OfferPage";
import type { Property } from "@/lib/types";

function isAgentBoxId(id: string) {
  return /^[0-9]+[A-Z][0-9]+$/.test(id);
}

export const dynamicParams = true;

export function generateStaticParams() {
  return residentialSaleProperties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let property: Property | undefined = residentialSaleProperties.find((p) => p.id === id);
  if (!property && isAgentBoxId(id)) {
    try { property = mapListing(await fetchListing(id)); } catch {}
  }
  if (!property) return {};
  return {
    title: `Make an Offer — ${property.address}, ${property.suburb} | Spinelli Real Estate`,
  };
}

export default async function OfferPageRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let property: Property | undefined = residentialSaleProperties.find((p) => p.id === id);
  if (!property && isAgentBoxId(id)) {
    try { property = mapListing(await fetchListing(id)); } catch {}
  }
  if (!property) notFound();
  return <OfferPage property={property} />;
}
