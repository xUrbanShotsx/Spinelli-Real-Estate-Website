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
    description: "Set within one of the area's most exclusive and tightly held estates, this outstanding acreage residence presents a rare opportunity to secure a quality-built home on just over one hectare of land.",
    longDescription: "Set within one of the area's most exclusive and tightly held estates, this outstanding acreage residence presents a rare opportunity to secure a quality-built home on just over one hectare of land — a scale and setting seldom offered to the market.\n\nDesigned with longevity, space and liveability at its core, the home is defined by soaring high ceilings, generous proportions and a well-considered layout that enhances light, openness and everyday comfort. The build quality is immediately evident, delivering a solid and enduring residence that balances refined living with practical family functionality.",
    additionalInfo: "— Exceptional quality-built residence set on 1.24 hectares of land.\n— Located within a tightly held estate where properties are rarely offered to the market.\n— Soaring high ceilings throughout, creating an enhanced sense of space and light.\n— Thoughtfully designed floorplan prioritising comfort, longevity and everyday living.\n— Double garage, additional carport and a generous driveway, providing ample off-street parking.\n— Expansive landholding offering flexibility, privacy and future lifestyle potential.\n— Solid, well-considered construction reflecting a home built to endure.\n— Strategically positioned with excellent access north to Wollongong and south along the coast.\n— Rare combination of acreage scale and central Illawarra connectivity.\n— A long-term lifestyle residence of scale, quality and enduring appeal.",
    tag: "For Sale",
    mapLat: -34.5502,
    mapLng: 150.8268,
  },
];
