import { notFound } from "next/navigation";
import {
  residentialSaleProperties,
  soldProperties,
  residentialRentProperties,
  commercialProperties,
  businessListings,
} from "@/lib/data";
import EnquiryPage from "./EnquiryPage";

const allProperties = [
  ...residentialSaleProperties,
  ...soldProperties,
  ...residentialRentProperties,
  ...commercialProperties,
  ...businessListings,
];

export function generateStaticParams() {
  return allProperties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = allProperties.find((p) => p.id === id);
  if (!property) return {};
  return {
    title: `Enquire — ${property.address}, ${property.suburb} | Spinelli Real Estate`,
  };
}

export default async function PropertyEnquirePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = allProperties.find((p) => p.id === id);
  if (!property) notFound();
  return <EnquiryPage property={property} />;
}
