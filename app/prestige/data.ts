export interface PrestigeListing {
  id: string;          // AgentBox listing id — used for /property/[id] link
  name: string;        // Property headline name
  suburb: string;
  address: string;
  price: string;       // Display price e.g. "$4,500,000" or "Contact Agent"
  beds: number;
  baths: number;
  cars: number;
  image: string;       // Hero image URL
  tag?: string;        // Optional badge e.g. "For Sale" | "Off Market"
}

export const prestigeListings: PrestigeListing[] = [
  // Add listings here — each card links to /property/[id]
];
