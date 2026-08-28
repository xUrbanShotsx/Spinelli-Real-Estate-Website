import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.spinellirealestate.com.au"),
  title: {
    default: "Spinelli Real Estate | Illawarra's Premier Agency",
    template: "%s | Spinelli Real Estate",
  },
  description:
    "Spinelli Real Estate — Illawarra's trusted agency for residential sales, commercial property, business sales, property management, and off-the-plan project sales. Serving Wollongong, Kiama, Shellharbour and surrounds.",
  keywords: [
    "real estate Illawarra",
    "real estate agent Wollongong",
    "real estate agent Kiama",
    "real estate agent Shellharbour",
    "property for sale Wollongong",
    "houses for sale Wollongong",
    "Kiama real estate",
    "Shellharbour property",
    "property management Illawarra",
    "property management Wollongong",
    "property management Kiama",
    "off the plan Wollongong",
    "commercial real estate Illawarra",
    "commercial property Wollongong",
    "Spinelli Real Estate",
    "best real estate agent Illawarra",
    "sell my home Wollongong",
    "free appraisal Illawarra",
    "investment property Illawarra",
    "rental properties Wollongong",
  ],
  authors: [{ name: "Spinelli Real Estate" }],
  creator: "Spinelli Real Estate",
  alternates: {
    canonical: "https://www.spinellirealestate.com.au",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://www.spinellirealestate.com.au",
    siteName: "Spinelli Real Estate",
    title: "Spinelli Real Estate | Illawarra's Premier Agency",
    description: "Illawarra's trusted boutique real estate agency — residential sales, rentals, commercial property, project marketing and property management across Wollongong, Kiama and Shellharbour.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Spinelli Real Estate" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spinelli Real Estate | Illawarra's Premier Agency",
    description: "Premium residential, commercial and project sales across the Illawarra. Wollongong, Kiama, Shellharbour.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "RealEstateAgent",
                "@id": "https://www.spinellirealestate.com.au/#organization",
                "name": "Spinelli Real Estate",
                "alternateName": "Spinelli RE",
                "url": "https://www.spinellirealestate.com.au",
                "logo": "https://www.spinellirealestate.com.au/logo.png",
                "image": "https://www.spinellirealestate.com.au/logo.png",
                "telephone": "+61242960047",
                "email": "info@spinellirealestate.com.au",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Wollongong",
                  "addressLocality": "Wollongong",
                  "addressRegion": "NSW",
                  "postalCode": "2500",
                  "addressCountry": "AU"
                },
                "geo": { "@type": "GeoCoordinates", "latitude": -34.4248, "longitude": 150.8931 },
                "areaServed": [
                  { "@type": "City", "name": "Wollongong" },
                  { "@type": "City", "name": "Kiama" },
                  { "@type": "City", "name": "Shellharbour" },
                  { "@type": "AdministrativeArea", "name": "Illawarra" },
                  { "@type": "AdministrativeArea", "name": "South Coast NSW" }
                ],
                "description": "Spinelli Real Estate is the Illawarra's premier boutique agency — residential sales, rentals, commercial property, business sales, project marketing and property management across Wollongong, Kiama and Shellharbour.",
                "priceRange": "$$",
                "openingHoursSpecification": [
                  { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:30", "closes": "17:30" },
                  { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "16:00" }
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Real Estate Services",
                  "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Residential Property Sales" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Property Management" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Real Estate" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Sales" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Off-the-Plan Project Marketing" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Free Property Appraisal" } }
                  ]
                },
                "sameAs": [
                  "https://www.facebook.com/spinellirealestate",
                  "https://www.instagram.com/spinellirealestate"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://www.spinellirealestate.com.au/#website",
                "url": "https://www.spinellirealestate.com.au",
                "name": "Spinelli Real Estate",
                "publisher": { "@id": "https://www.spinellirealestate.com.au/#organization" },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.spinellirealestate.com.au/buy?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            ])
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
