import type { Metadata } from "next";
import ContactOverlay from "./ContactOverlay";

export const metadata: Metadata = {
  title: "Contact Us | Spinelli Real Estate",
  description:
    "Contact Spinelli Real Estate — Illawarra's trusted property experts. Call, email or use our enquiry form for any property need.",
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
