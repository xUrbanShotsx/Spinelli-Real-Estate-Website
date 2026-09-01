export interface PrestigeListing {
  id: string;
  name: string;
  suburb: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  cars: number;
  landSize?: string;
  image: string;
  gallery: string[];
  description: string;
  longDescription?: string;
  additionalInfo?: string;
  tag?: string;
  mapLat?: number;
  mapLng?: number;
}

export const prestigeListings: PrestigeListing[] = [
  {
    id: "32-larkins-lane",
    name: "32 Larkins Lane",
    suburb: "Yallah",
    address: "32 Larkins Lane, Yallah NSW 2530",
    price: "$2,200,000 – $2,400,000",
    beds: 4,
    baths: 2,
    cars: 3,
    landSize: "1.24 ha",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1800&h=1200&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1800&h=1200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&h=1200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&h=1200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&h=1200&fit=crop&q=80",
    ],
    description: "A rare acreage opportunity in the heart of the Illawarra — 1.24 hectares of private land with a beautifully presented 4-bedroom home.",
    longDescription: "Set on 1.24 hectares of private land, 32 Larkins Lane offers an exceptionally rare lifestyle opportunity in the tightly-held Yallah corridor. The residence delivers four generous bedrooms, two bathrooms, and a triple garage — all surrounded by a serene rural setting just minutes from the conveniences of Wollongong.",
    tag: "For Sale",
    mapLat: -34.4900,
    mapLng: 150.8350,
  },
];
