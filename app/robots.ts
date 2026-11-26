import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "Claude-Web", disallow: "/" },
      { userAgent: "Google-Extended", disallow: "/" },
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
