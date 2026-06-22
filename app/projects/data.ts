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
  timeline: ProjectTimeline[];
}

export const projects: Project[] = [
  {
    id: "elevation-77",
    name: "Elevation 77",
    suburb: "Shellharbour City Centre",
    address: "77 Shellharbour Road, Shellharbour City Centre NSW",
    category: "Multi-Level Residential",
    units: "77 Apartments · 7 Commercial",
    status: "Sold Out",
    image: "/Elevation.jpg",
    gallery: ["/Elevation.jpg", "/Shellharbour.jpg", "/Rooftop.jpg", "/Wollongong.jpg", "/droneshot.jpg"],
    description: "A landmark mixed-use tower delivering 77 architecturally designed apartments and 7 ground-floor commercial tenancies in the heart of Shellharbour City Centre. Every residence features premium finishes, generous balconies and secure parking.",
    timeline: [
      { label: "Site Acquired", date: "Mar 2019", done: true },
      { label: "DA Approved", date: "Nov 2019", done: true },
      { label: "Construction Commenced", date: "Apr 2020", done: true },
      { label: "Sold Out", date: "Sep 2020", done: true },
      { label: "Practical Completion", date: "Dec 2022", done: true },
    ],
  },
  {
    id: "bluewater",
    name: "Bluewater",
    suburb: "Kiama",
    address: "14 Manning Street, Kiama NSW",
    category: "Multi-Level Residential",
    units: "23 Apartments",
    status: "Sold Out",
    image: "/bluewater.jpg",
    gallery: ["/bluewater.jpg", "/Kiama.jpg", "/Gerringong.jpg", "/Austinmer.jpg"],
    description: "A boutique coastal apartment building capturing panoramic ocean and harbour views across Kiama's iconic blowhole headland. 23 residences designed for the discerning coastal buyer.",
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
    name: "The Outlook",
    suburb: "Kiama",
    address: "32 Bong Bong Street, Kiama NSW",
    category: "Multi-Level Residential",
    units: "18 Apartments",
    status: "Sold Out",
    image: "/Kiama.jpg",
    gallery: ["/Kiama.jpg", "/bluewater.jpg", "/Gerringong.jpg", "/Austinmer.jpg"],
    description: "Luxury apartment living with elevated escarpment and ocean vistas, designed by award-winning architects for the discerning buyer seeking the best of Kiama living.",
    timeline: [
      { label: "Site Acquired", date: "Jan 2020", done: true },
      { label: "DA Approved", date: "Sep 2020", done: true },
      { label: "Construction Commenced", date: "Feb 2021", done: true },
      { label: "Sold Out", date: "Jul 2021", done: true },
      { label: "Practical Completion", date: "Mar 2023", done: true },
    ],
  },
  {
    id: "shellharbour-rise",
    name: "Shellharbour Rise",
    suburb: "Shellharbour",
    address: "8 Addison Street, Shellharbour NSW",
    category: "Townhouse",
    units: "8 Townhomes",
    status: "Sold Out",
    image: "/Shellharbour.jpg",
    gallery: ["/Shellharbour.jpg", "/Elevation.jpg", "/Rooftop.jpg", "/Wollongong.jpg"],
    description: "Eight architecturally crafted townhomes in a private, landscaped setting steps from Shellharbour Village and the lake. Each home features 3 bedrooms, private courtyard and double garage.",
    timeline: [
      { label: "Site Acquired", date: "Aug 2020", done: true },
      { label: "DA Approved", date: "Mar 2021", done: true },
      { label: "Construction Commenced", date: "Aug 2021", done: true },
      { label: "Sold Out", date: "Oct 2021", done: true },
      { label: "Practical Completion", date: "Jun 2023", done: true },
    ],
  },
  {
    id: "grove-albion-park",
    name: "The Grove",
    suburb: "Albion Park",
    address: "14 Tongarra Road, Albion Park NSW",
    category: "Townhouse",
    units: "6 Townhomes",
    status: "Now Selling",
    image: "/Gerringong.jpg",
    gallery: ["/Gerringong.jpg", "/Jamberoo.jpg", "/Figtree.jpg", "/Dapto.jpg"],
    description: "Six premium townhomes in a private landscaped enclave, each with 3 bedrooms, private courtyard and double garage. The Grove offers a rare opportunity to secure a brand new home in one of the Illawarra's most sought-after growth corridors.",
    timeline: [
      { label: "Site Acquired", date: "May 2023", done: true },
      { label: "DA Approved", date: "Nov 2023", done: true },
      { label: "Construction Commenced", date: "Mar 2024", done: true },
      { label: "Now Selling", date: "Jun 2024", done: true },
      { label: "Practical Completion", date: "Q2 2026", done: false },
    ],
  },
  {
    id: "coastal-terrace",
    name: "Coastal Terrace Collection",
    suburb: "Thirroul",
    address: "7 Railway Parade, Thirroul NSW",
    category: "Duplex",
    units: "4 Homes",
    status: "Now Selling",
    image: "/Austinmer.jpg",
    gallery: ["/Austinmer.jpg", "/Kiama.jpg", "/bluewater.jpg", "/Gerringong.jpg"],
    description: "Four premium duplex-style terrace homes steps from Thirroul Beach and village. Designed for the coastal lifestyle — light-filled, spacious and built to last with high ceilings, custom joinery and ocean glimpses.",
    timeline: [
      { label: "Site Acquired", date: "Sep 2023", done: true },
      { label: "DA Approved", date: "Feb 2024", done: true },
      { label: "Construction Commenced", date: "Jun 2024", done: true },
      { label: "Now Selling", date: "Aug 2024", done: true },
      { label: "Practical Completion", date: "Q1 2026", done: false },
    ],
  },
  {
    id: "harbourside-quarter",
    name: "Harbourside Quarter",
    suburb: "Wollongong",
    address: "45 Harbour Street, Wollongong NSW",
    category: "Commercial",
    units: "Mixed Use · 32 Apartments",
    status: "Coming Soon",
    image: "/Wollongong.jpg",
    gallery: ["/Wollongong.jpg", "/droneshot.jpg", "/Rooftop.jpg", "/Shellharbour.jpg"],
    description: "A landmark mixed-use development in the heart of Wollongong's CBD, featuring 32 residential apartments above ground-floor retail and commercial space. Harbourside Quarter will define the next chapter of Wollongong's waterfront precinct.",
    timeline: [
      { label: "Site Acquired", date: "Jan 2024", done: true },
      { label: "DA Lodged", date: "Aug 2024", done: true },
      { label: "DA Approval", date: "Q2 2025", done: false },
      { label: "Construction Commencement", date: "Q4 2025", done: false },
      { label: "Practical Completion", date: "Q2 2027", done: false },
    ],
  },
  {
    id: "gerringong-heights",
    name: "Gerringong Heights",
    suburb: "Gerringong",
    address: "Fern Street, Gerringong NSW",
    category: "Duplex",
    units: "18 Homes",
    status: "Now Selling",
    image: "/Gerringong.jpg",
    gallery: ["/Gerringong.jpg", "/Kiama.jpg", "/Jamberoo.jpg", "/bluewater.jpg"],
    description: "Prestige duplex homes on Gerringong's elevated hillside with sweeping coast and escarpment views. 18 architecturally designed homes on generous allotments — a rare opportunity in one of the Illawarra's most coveted villages.",
    timeline: [
      { label: "Site Acquired", date: "Mar 2023", done: true },
      { label: "DA Approved", date: "Oct 2023", done: true },
      { label: "Construction Commenced", date: "Feb 2024", done: true },
      { label: "Now Selling", date: "Apr 2024", done: true },
      { label: "Practical Completion", date: "Q3 2026", done: false },
    ],
  },
];
