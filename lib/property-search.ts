/**
 * Server-side property search tools for Spinelli AI.
 * Wraps AgentBox API — AI never directly calls AgentBox.
 * All functions run server-side only.
 */
import {
  fetchListings,
  fetchListing,
  mapListing,
  type ABListing,
} from "./agentbox";
import type { Property } from "./types";

export interface SearchParams {
  listingType?: "sale" | "rent" | "commercial-sale" | "commercial-lease" | "business" | "sold";
  suburb?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  minParking?: number;
  propertyCategory?: string; // "House" | "Apartment" | "Townhouse" | "Land" etc
  keywords?: string;
  limit?: number;
}

export interface SearchResult {
  properties: PropertyCard[];
  total: number;
  message: string;
}

/** Lightweight card for chat display */
export interface PropertyCard {
  id: string;
  address: string;
  suburb: string;
  price: string;
  beds?: number;
  baths?: number;
  cars?: number;
  landSize?: string;
  image: string;
  tag?: string;
  openHome?: string;
  url: string;
  type: string;
  category?: string;
}

function toCard(p: Property, ab?: ABListing): PropertyCard {
  return {
    id: p.id,
    address: p.address,
    suburb: p.suburb,
    price: p.price,
    beds: p.beds,
    baths: p.baths,
    cars: p.cars,
    landSize: p.landSize,
    image: p.image,
    tag: p.tag,
    openHome: p.openHome,
    url: `/property/${p.id}`,
    type: p.type,
    category: ab?.property?.category,
  };
}

function typeToFilters(listingType: SearchParams["listingType"] = "sale"): Record<string, string> {
  switch (listingType) {
    case "rent":            return { "filter[type]": "Lease",    "filter[status]": "Available", "filter[propertyType]": "Residential" };
    case "commercial-sale": return { "filter[type]": "Sale",     "filter[status]": "Available", "filter[propertyType]": "Commercial" };
    case "commercial-lease":return { "filter[type]": "Lease",    "filter[status]": "Available", "filter[propertyType]": "Commercial" };
    case "business":        return { "filter[type]": "Sale",     "filter[status]": "Available", "filter[propertyType]": "Business" };
    case "sold":            return { "filter[type]": "Sale",     "filter[status]": "Settled" };
    default:                return { "filter[type]": "Sale",     "filter[status]": "Available", "filter[propertyType]": "Residential" };
  }
}

export async function searchProperties(params: SearchParams): Promise<SearchResult> {
  const limit = Math.min(params.limit ?? 6, 20);
  const filters: Record<string, string> = {
    ...typeToFilters(params.listingType),
    "sort[listedDate]": "desc",
    limit: "50",
    page: "1",
  };

  if (params.suburb) {
    filters["filter[suburb]"] = params.suburb;
  }
  if (params.minBedrooms) {
    filters["filter[bedrooms][min]"] = String(params.minBedrooms);
  }
  if (params.minBathrooms) {
    filters["filter[bathrooms][min]"] = String(params.minBathrooms);
  }

  let listings: ABListing[] = [];
  try {
    const data = await fetchListings(filters, 60);
    listings = data.listings ?? [];
  } catch {
    return { properties: [], total: 0, message: "Unable to retrieve listings at this time." };
  }

  // Client-side price filtering (AgentBox doesn't always support price ranges cleanly)
  if (params.minPrice || params.maxPrice) {
    listings = listings.filter(l => {
      const raw = l.displayPrice ?? "";
      const num = extractPrice(raw);
      if (!num) return true; // "Contact Agent" — include
      if (params.minPrice && num < params.minPrice) return false;
      if (params.maxPrice && num > params.maxPrice) return false;
      return true;
    });
  }

  // Keyword filter
  if (params.keywords) {
    const kw = params.keywords.toLowerCase();
    listings = listings.filter(l => {
      const text = [l.mainHeadline, l.description, l.mainDescription, l.property.category, l.property.address?.suburb].join(" ").toLowerCase();
      return text.includes(kw);
    });
  }

  // Category filter
  if (params.propertyCategory) {
    const cat = params.propertyCategory.toLowerCase();
    listings = listings.filter(l => (l.property.category ?? "").toLowerCase().includes(cat));
  }

  const sliced = listings.slice(0, limit);
  const cards = sliced.map(l => toCard(mapListing(l), l));

  const total = listings.length;
  const typeLabel = params.listingType === "rent" ? "rentals" : params.listingType === "sold" ? "sold properties" : "listings";
  const suburbLabel = params.suburb ? ` in ${params.suburb}` : "";
  const message = total === 0
    ? `I couldn't find any ${typeLabel}${suburbLabel} matching those criteria right now.`
    : `I found ${total} ${typeLabel}${suburbLabel}. Here are the top results:`;

  return { properties: cards, total, message };
}

export async function getPropertyById(id: string): Promise<PropertyCard | null> {
  try {
    const listing = await fetchListing(id, 60);
    const p = mapListing(listing);
    return toCard(p, listing);
  } catch {
    return null;
  }
}

/** Extract a numeric price from display strings like "$1,200,000", "$650 per week" */
function extractPrice(display: string): number | null {
  const cleaned = display.replace(/[^0-9]/g, "");
  const n = parseInt(cleaned, 10);
  return isNaN(n) || n === 0 ? null : n;
}

/** Get inspections for a property */
export async function getPropertyInspections(id: string): Promise<{ date: string; start: string; end: string }[]> {
  try {
    const listing = await fetchListing(id, 60);
    const dates = listing.inspectionDates ?? [];
    return dates.map(d => ({
      date: new Date(d.startDate).toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" }),
      start: new Date(d.startDate).toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" }),
      end: new Date(d.endDate).toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" }),
    }));
  } catch {
    return [];
  }
}

export const OFFICE_INFO = {
  name: "Spinelli Real Estate",
  phone: "(02) 4296 0047",
  email: "info@spinellirealestate.com.au",
  address: "Wollongong, NSW 2500",
  hours: "Mon–Fri 8:30am–5:30pm · Sat 9am–4pm",
  website: "https://www.spinellirealestate.com.au",
  team: "/team",
  contact: "/contact",
  appraisal: "/appraisal",
  buy: "/buy",
  rent: "/rent",
  sell: "/sell",
  commercial: "/commercial",
  projects: "/projects",
  propertyManagement: "/property-management",
  prestige: "/prestige",
};
