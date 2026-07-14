import { notFound } from "next/navigation";
import {
  residentialSaleProperties,
  residentialRentProperties,
  commercialProperties,
  businessListings,
} from "@/lib/data";
import { fetchListing, mapListing } from "@/lib/agentbox";
import { getOpenHome } from "@/lib/open-homes";
import PropertyDetailClient from "./PropertyDetailClient";
import type { Property } from "@/lib/types";

const staticProperties = [
  ...residentialSaleProperties,
  ...residentialRentProperties,
  ...commercialProperties,
  ...businessListings,
];

// AgentBox IDs look like "12P1164" — alphanumeric with no dashes
function isAgentBoxId(id: string) {
  return /^[0-9]+[A-Z][0-9]+$/.test(id);
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let property: Property | undefined = staticProperties.find((p) => p.id === id);

  if (!property && isAgentBoxId(id)) {
    try {
      const listing = await fetchListing(id);
      property = mapListing(listing);
    } catch {}
  }

  if (!property) return {};
  return {
    title: `${property.address}, ${property.suburb} | Spinelli Real Estate`,
    description: property.description,
  };
}

// Static params for the pre-existing static listings; AgentBox ones are dynamic
export function generateStaticParams() {
  return staticProperties.map((p) => ({ id: p.id }));
}

export const dynamicParams = true; // allow AgentBox IDs beyond static params

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 1. Try static data first
  let property: Property | undefined = staticProperties.find((p) => p.id === id);

  // 2. Try AgentBox for IDs that look like AgentBox format
  if (!property && isAgentBoxId(id)) {
    try {
      const listing = await fetchListing(id);
      property = mapListing(listing);
    } catch {}
  }

  if (!property) notFound();

  // Overlay open home time from manual config (AgentBox API doesn't expose OFI times)
  const openHome = getOpenHome(id);
  if (openHome) property = { ...property, openHome };

  return <PropertyDetailClient property={property} />;
}
