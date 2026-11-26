import type { Metadata } from "next";
import ContactOverlay from "./ContactOverlay";

export const metadata: Metadata = {
  title: "Contact Spinelli Real Estate | Shellharbour & Wollongong",
  description:
    "Contact Spinelli Real Estate in Shellharbour and Wollongong. Call 02 4296 0047, email or use our enquiry form for sales, rentals, appraisals and property management.",
  alternates: { canonical: "https://www.spinellirealestate.com.au/contact" },
};

interface Props {
  searchParams: Promise<{ property?: string; price?: string; image?: string }>;
}

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <ContactOverlay
      propertyAddress={params.property}
      propertyPrice={params.price}
      propertyImage={params.image}
    />
  );
}
