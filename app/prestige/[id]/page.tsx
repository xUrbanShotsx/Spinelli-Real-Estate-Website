import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { prestigeListings } from "../data";
import PrestigeDetailContent from "./PrestigeDetailContent";

export async function generateStaticParams() {
  return prestigeListings.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const listing = prestigeListings.find((p) => p.id === id);
  if (!listing) return {};
  const canonical = `https://www.spinellirealestate.com.au/prestige/${id}`;
  return {
    title: `${listing.name}, ${listing.suburb} | Prestige Property | Spinelli Real Estate`,
    description: `${listing.description} ${listing.beds} bed, ${listing.baths} bath${listing.landSize ? `, ${listing.landSize} land` : ""}. Price guide ${listing.price}. Exclusively marketed by Spinelli Real Estate.`,
    keywords: [
      `${listing.name} for sale`,
      `${listing.suburb} prestige property`,
      `${listing.suburb} luxury home`,
      `${listing.suburb} acreage for sale`,
      `prestige property ${listing.suburb} NSW`,
      `luxury homes ${listing.suburb}`,
      `Illawarra prestige real estate`,
      `Spinelli Real Estate prestige`,
      listing.address,
    ],
    alternates: { canonical },
    openGraph: {
      title: `${listing.name}, ${listing.suburb} | Prestige | Spinelli Real Estate`,
      description: `${listing.description} ${listing.beds} bed · ${listing.baths} bath · ${listing.cars} car${listing.landSize ? ` · ${listing.landSize}` : ""}. Price guide ${listing.price}.`,
      url: canonical,
      type: "website",
      images: [{ url: `https://www.spinellirealestate.com.au${listing.image}`, width: 1800, height: 1200, alt: listing.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${listing.name}, ${listing.suburb} | Spinelli Real Estate`,
      description: `${listing.price} · ${listing.beds} bed · ${listing.baths} bath${listing.landSize ? ` · ${listing.landSize}` : ""}`,
    },
  };
}

export default async function PrestigeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = prestigeListings.find((p) => p.id === id);
  if (!listing) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: listing.name,
    description: listing.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.address.split(",")[0].trim(),
      addressLocality: listing.suburb,
      addressRegion: "NSW",
      postalCode: "2530",
      addressCountry: "AU",
    },
    numberOfRooms: listing.beds,
    numberOfBathroomsTotal: listing.baths,
    numberOfParkingSpaces: listing.cars,
    url: `https://www.spinellirealestate.com.au/prestige/${id}`,
    image: listing.gallery.map((img) => `https://www.spinellirealestate.com.au${img}`),
    ...(listing.mapLat && listing.mapLng
      ? { geo: { "@type": "GeoCoordinates", latitude: listing.mapLat, longitude: listing.mapLng } }
      : {}),
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: "AUD",
      availability: "https://schema.org/InStock",
    },
    broker: {
      "@type": "RealEstateAgent",
      name: "Spinelli Real Estate",
      url: "https://www.spinellirealestate.com.au",
      telephone: "+61242291111",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Wollongong",
        addressRegion: "NSW",
        addressCountry: "AU",
      },
    },
  };

  return (
    <>
      <Script id={`jsonld-prestige-${id}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PrestigeDetailContent listing={listing} />
    </>
  );
}
