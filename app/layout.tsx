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
  title: {
    default: "Spinelli Real Estate | Illawarra's Premier Agency",
    template: "%s | Spinelli Real Estate",
  },
  description:
    "Spinelli Real Estate — Illawarra's trusted agency for residential sales, commercial property, business sales, property management, and off-the-plan project sales. Serving Wollongong, Kiama, Shellharbour and surrounds.",
  keywords: [
    "real estate Illawarra",
    "property for sale Wollongong",
    "Kiama real estate",
    "Shellharbour property",
    "property management Illawarra",
    "off the plan Wollongong",
    "commercial real estate Illawarra",
    "Spinelli Real Estate",
  ],
  authors: [{ name: "Spinelli Real Estate" }],
  creator: "Spinelli Real Estate",
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Spinelli Real Estate",
  },
  robots: {
    index: true,
    follow: true,
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Spinelli Real Estate",
              "url": "https://spinellirealestate.com.au",
              "telephone": "02 4296 0047",
              "email": "info@spinellirealestate.com.au",
              "address": { "@type": "PostalAddress", "addressLocality": "Wollongong", "addressRegion": "NSW", "addressCountry": "AU" },
              "areaServed": "Illawarra",
              "description": "Spinelli Real Estate — Illawarra's trusted boutique agency for residential sales, commercial property, project marketing and property management.",
              "openingHoursSpecification": [
                { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:30", "closes": "17:30" },
                { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "16:00" }
              ]
            })
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
