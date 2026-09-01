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
  {
    id: "1P0000",               // ← replace with the AgentBox listing ID
    name: "32 Larkins Lane",
    suburb: "Yallah",
    address: "32 Larkins Lane, Yallah NSW 2530",
    price: "Contact Agent",
    beds: 4,
    baths: 2,
    cars: 2,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1800&h=1200&fit=crop&q=80",
    tag: "For Sale",
  },
];
