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
  heroVideo?: string;
  tag?: string;
  mapLat?: number;
  mapLng?: number;
  enquireUrl?: string;
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
    image: "/32 Larkins Lane/2.jpg",
    gallery: [
      "/32 Larkins Lane/2.jpg",
      "/32 Larkins Lane/3.jpg",
      "/32 Larkins Lane/4.jpg",
      "/32 Larkins Lane/5.jpg",
      "/32 Larkins Lane/6.jpg",
      "/32 Larkins Lane/7.jpg",
      "/32 Larkins Lane/8.jpg",
    ],
    description: "Set within one of the area's most exclusive and tightly held estates, this outstanding acreage residence presents a rare opportunity to secure a quality-built home on just over one hectare of land.",
    longDescription: "Set within one of the area's most exclusive and tightly held estates, this outstanding acreage residence presents a rare opportunity to secure a quality-built home on just over one hectare of land — a scale and setting seldom offered to the market.\n\nDesigned with longevity, space and liveability at its core, the home is defined by soaring high ceilings, generous proportions and a well-considered layout that enhances light, openness and everyday comfort. The build quality is immediately evident, delivering a solid and enduring residence that balances refined living with practical family functionality.",
    additionalInfo: "— Exceptional quality-built residence set on 1.24 hectares of land.\n— Located within a tightly held estate where properties are rarely offered to the market.\n— Soaring high ceilings throughout, creating an enhanced sense of space and light.\n— Thoughtfully designed floorplan prioritising comfort, longevity and everyday living.\n— Double garage, additional carport and a generous driveway, providing ample off-street parking.\n— Expansive landholding offering flexibility, privacy and future lifestyle potential.\n— Solid, well-considered construction reflecting a home built to endure.\n— Strategically positioned with excellent access north to Wollongong and south along the coast.\n— Rare combination of acreage scale and central Illawarra connectivity.\n— A long-term lifestyle residence of scale, quality and enduring appeal.",
    heroVideo: "/32 Larkins Lane/hero.mp4",
    tag: "For Sale",
    mapLat: -34.5426,
    mapLng: 150.7799,
    enquireUrl: "https://www.spinellirealestate.com.au/property/1P1984/enquire",
  },
];
