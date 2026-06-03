import type { Metadata } from "next";
import { Suspense } from "react";
import ContactOverlay from "./ContactOverlay";

export const metadata: Metadata = {
  title: "Contact Us | Spinelli Real Estate",
  description:
    "Contact Spinelli Real Estate — Illawarra's trusted property experts. Call, email or use our enquiry form for any property need.",
};

export default function ContactPage() {
  return (
    <Suspense>
      <ContactOverlay />
    </Suspense>
  );
}
