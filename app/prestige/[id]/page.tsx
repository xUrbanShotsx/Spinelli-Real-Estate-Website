import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prestigeListings } from "../data";
import PrestigeDetailContent from "./PrestigeDetailContent";

export async function generateStaticParams() {
  return prestigeListings.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const listing = prestigeListings.find((p) => p.id === id);
  if (!listing) return {};
  return {
    title: `${listing.name}, ${listing.suburb} | Prestige | Spinelli Real Estate`,
    description: listing.description,
    alternates: { canonical: `https://www.spinellirealestate.com.au/prestige/${id}` },
  };
}

export default async function PrestigeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = prestigeListings.find((p) => p.id === id);
  if (!listing) notFound();
  return <PrestigeDetailContent listing={listing} />;
}
