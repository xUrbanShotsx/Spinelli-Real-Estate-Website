import type { MetadataRoute } from "next";
import { suburbs } from "@/lib/data";
import { projects } from "@/app/projects/data";
import { prestigeListings } from "@/app/prestige/data";

const BASE = "https://www.spinellirealestate.com.au";

const now = new Date();

function url(path: string, priority = 0.7, changefreq: MetadataRoute.Sitemap[0]["changeFrequency"] = "weekly"): MetadataRoute.Sitemap[0] {
  return { url: `${BASE}${path}`, lastModified: now, changeFrequency: changefreq, priority };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const suburbSlugs = suburbs.map((s) => s.slug);

  return [
    // ── Core pages ────────────────────────────────────────────
    url("/", 1.0, "daily"),
    url("/buy", 0.95, "hourly"),
    url("/prestige", 0.9, "weekly"),
    url("/rent", 0.95, "hourly"),
    url("/sell", 0.9, "weekly"),
    url("/sold", 0.85, "daily"),
    url("/commercial", 0.85, "weekly"),
    url("/commercial/buy", 0.85, "daily"),
    url("/commercial/lease", 0.85, "daily"),
    url("/business", 0.8, "daily"),
    url("/property-management", 0.85, "weekly"),
    url("/projects", 0.85, "weekly"),
    url("/appraisal", 0.9, "monthly"),

    // ── About ─────────────────────────────────────────────────
    url("/about", 0.7, "monthly"),
    url("/team", 0.7, "monthly"),
    url("/contact", 0.8, "monthly"),
    url("/careers", 0.5, "monthly"),

    // ── Guides ────────────────────────────────────────────────
    url("/buying-guide", 0.8, "monthly"),
    url("/selling-guide", 0.8, "monthly"),
    url("/investing-guide", 0.8, "monthly"),

    // ── Suburbs hub ───────────────────────────────────────────
    url("/suburbs", 0.8, "monthly"),

    // ── Suburb detail pages ───────────────────────────────────
    ...suburbSlugs.map((s) => url(`/suburbs/${s}`, 0.75, "monthly")),

    // ── Buy by suburb ─────────────────────────────────────────
    ...suburbSlugs.map((s) => url(`/buy/${s}`, 0.8, "daily")),

    // ── Rent by suburb ────────────────────────────────────────
    ...suburbSlugs.map((s) => url(`/rent/${s}`, 0.8, "daily")),

    // ── Sell by suburb ────────────────────────────────────────
    ...suburbSlugs.map((s) => url(`/sell/${s}`, 0.75, "weekly")),

    // ── Projects ──────────────────────────────────────────────
    ...projects.map((p) => url(`/projects/${p.id}`, 0.8, "monthly")),

    // ── Prestige ──────────────────────────────────────────────
    ...prestigeListings.map((p) => url(`/prestige/${p.id}`, 0.85, "weekly")),
  ];
}
