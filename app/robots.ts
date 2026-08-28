import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/opening-party", "/appraisal/confirmation"],
      },
    ],
    sitemap: "https://www.spinellirealestate.com.au/sitemap.xml",
    host: "https://www.spinellirealestate.com.au",
  };
}
