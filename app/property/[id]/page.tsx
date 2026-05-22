import { notFound } from "next/navigation";
import { residentialSaleProperties } from "@/lib/data";
import PropertyDetailClient from "./PropertyDetailClient";

const allProperties = [...residentialSaleProperties];

export function generateStaticParams() {
  return allProperties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = allProperties.find((p) => p.id === id);
  if (!property) return {};
  return {
    title: `${property.address}, ${property.suburb} | Spinelli Real Estate`,
    description: property.description,
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = allProperties.find((p) => p.id === id);
  if (!property) notFound();

  return <PropertyDetailClient property={property} />;
}
