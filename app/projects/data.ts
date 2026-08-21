export type ProjectCategory = "Duplex" | "Townhouse" | "Multi-Level Residential" | "Commercial";

export interface ProjectTimeline {
  label: string;
  date: string;
  done: boolean;
}

export interface Project {
  id: string;
  name: string;
  suburb: string;
  address: string;
  category: ProjectCategory;
  units: string;
  status: "Now Selling" | "Coming Soon" | "Sold Out";
  image: string;
  gallery: string[];
  description: string;
  longDescription?: string;
  additionalInfo?: string;
  mapQuery?: string;
  mapLat?: number;
  mapLng?: number;
  timeline: ProjectTimeline[];
}

export const projects: Project[] = [
  {
    id: "elevation-77",
    name: "Elevation 77",
    suburb: "Shellharbour City Centre",
    address: "77 Shellharbour Road, Shellharbour City Centre NSW",
    category: "Multi-Level Residential",
    units: "8 Apartments Available",
    status: "Now Selling",
    image: "/Elevation.jpg",
    gallery: ["/Elevation.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg", "/6.jpg"],
    description: "A landmark mixed-use tower in the heart of Shellharbour City Centre — now with 8 remaining apartments available. Every residence features premium finishes, generous balconies and secure parking.",
    mapQuery: "18 College Avenue, Shellharbour City Centre NSW 2529",
    mapLat: -34.5649,
    mapLng: 150.8367,
    longDescription: "Life at Elevation 77 is defined by the moments between. Morning coffee from the café below, evenings on your balcony as the sun drops behind the escarpment, weekends spent walking to the lake or the village without once touching your car. This is urban living on the Illawarra coast — unhurried, elevated, and entirely your own. Each residence has been designed to bring the outside in, with generous glazing, north-facing aspects and premium finishes that make every room feel like a considered choice. The rooftop terrace becomes a natural extension of your home — a space to entertain, to unwind, or simply to take in the kind of view that reminds you why you chose this life.",
    additionalInfo: "The 8 remaining apartments at Elevation 77 offer a rare opportunity to secure a residence in one of the Illawarra's most recognised mixed-use developments. Each apartment is move-in ready with completed construction and practical completion achieved in December 2022. Secure basement parking, lift access, and ground-floor retail tenancies complete the offering. Owner-occupier and investor purchasers are welcome. Strata levies, building specifications, and floor plans are available upon request — contact our projects team for a private inspection.",
    timeline: [
      { label: "DA Approved", date: "Nov 2019", done: true },
      { label: "Construction Commenced", date: "Apr 2020", done: true },
      { label: "Practical Completion", date: "Dec 2022", done: true },
      { label: "Now Selling", date: "2026", done: true },
      { label: "Settlement", date: "TBC", done: false },
    ],
  },
  {
    id: "bluewater",
    name: "Bluewater",
    suburb: "Kiama",
    address: "9 Bong Bong Street, Kiama NSW",
    mapQuery: "9 Bong Bong Street, Kiama NSW 2533",
    mapLat: -34.6739,
    mapLng: 150.8561,
    category: "Multi-Level Residential",
    units: "23 Apartments",
    status: "Sold Out",
    image: "/bluewater.jpg",
    gallery: ["/bluewater.jpg", "/BlueWaterImg/11.jpg", "/BlueWaterImg/7.jpg", "/BlueWaterImg/8.jpg", "/BlueWaterImg/9.jpg", "/BlueWaterImg/10.jpg"],
    description: "A boutique coastal apartment building capturing panoramic ocean and harbour views across Kiama's iconic blowhole headland. 23 residences designed for the discerning coastal buyer.",
    longDescription: "Kiama is a town that gets under your skin. The sound of the blowhole on a still morning. The smell of salt in the air as you walk to the farmers market. The way the light sits on the harbour at dusk — golden, unhurried, entirely its own. Bluewater was designed for those who have found this place and decided they never want to leave. Each residence opens to the ocean through full-width glazing and north-facing terraces, so that the sea is never a backdrop — it is the view you wake up to, the one you come home to. This is coastal life lived without compromise.",
    timeline: [
      { label: "Site Acquired", date: "Jun 2019", done: true },
      { label: "DA Approved", date: "Feb 2020", done: true },
      { label: "Construction Commenced", date: "Aug 2020", done: true },
      { label: "Sold Out", date: "Mar 2021", done: true },
      { label: "Practical Completion", date: "Nov 2022", done: true },
    ],
  },
  {
    id: "the-outlook",
    name: "Greenacre",
    suburb: "Wollongong",
    address: "16a Greenacre Road, Wollongong NSW",
    mapQuery: "16a Greenacre Road, Wollongong NSW 2500",
    mapLat: -34.4205,
    mapLng: 150.8798,
    category: "Duplex",
    units: "Duplex",
    status: "Sold Out",
    image: "/12.jpg",
    gallery: ["/12.jpg", "/13.jpg", "/14.jpg", "/15.jpg", "/16.jpg", "/17.jpg"],
    description: "Luxury apartment living with elevated escarpment and ocean vistas, designed by award-winning architects for the discerning buyer seeking the best of Kiama living.",
    longDescription: "Wollongong is a city that has quietly become one of the most compelling places to live on the east coast. The ocean is minutes away. The escarpment rises behind you. The food scene has arrived, the arts precinct is alive, and the train to Sydney means you can have it all without sacrificing any of it. Greenacre places you at the heart of this — on a tree-lined street where the pace slows and the city noise fades, but everything you need is still within reach. This is Wollongong living at its most considered: space, light, and a neighbourhood that actually feels like one.",
    timeline: [
      { label: "Site Acquired", date: "Jan 2020", done: true },
      { label: "DA Approved", date: "Sep 2020", done: true },
      { label: "Construction Commenced", date: "Feb 2021", done: true },
      { label: "Sold Out", date: "Jul 2021", done: true },
      { label: "Practical Completion", date: "Mar 2023", done: true },
    ],
  },
];
