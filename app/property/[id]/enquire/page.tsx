import { notFound } from "next/navigation";
import {
  residentialSaleProperties,
  soldProperties,
  residentialRentProperties,
  commercialProperties,
  businessListings,
} from "@/lib/data";
import { fetchListing, mapListing } from "@/lib/agentbox";
import EnquiryPage from "./EnquiryPage";
import type { Property } from "@/lib/types";

const staticProperties = [
  ...residentialSaleProperties,
  ...soldProperties,
  ...residentialRentProperties,
  ...commercialProperties,
  ...businessListings,
];

function isAgentBoxId(id: string) {
  return /^[0-9]+[A-Z][0-9]+$/.test(id);
}

export const dynamicParams = true;

export function generateStaticParams() {
  return staticProperties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let property: Property | undefined = staticProperties.find((p) => p.id === id);
  if (!property && isAgentBoxId(id)) {
    try { property = mapListing(await fetchListing(id)); } catch {}
  }
  if (!property) return {};
  return {
    title: `Enquire — ${property.address}, ${property.suburb} | Spinelli Real Estate`,
  };
}

export default async function PropertyEnquirePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let property: Property | undefined = staticProperties.find((p) => p.id === id);
  if (!property && isAgentBoxId(id)) {
    try { property = mapListing(await fetchListing(id)); } catch {}
  }
  if (!property) notFound();
  return <EnquiryPage property={property} />;
}
