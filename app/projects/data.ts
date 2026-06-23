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
    gallery: ["/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg", "/6.jpg"],
    description: "A landmark mixed-use tower delivering 77 architecturally designed apartments and 7 ground-floor commercial tenancies in the heart of Shellharbour City Centre. Every residence features premium finishes, generous balconies and secure parking.",
    longDescription: "Elevation 77 set a new standard for inner-city living on the Illawarra coast. Developed in partnership with a leading Sydney-based architectural firm, the building's distinctive facade draws on the natural textures of the sandstone escarpment, creating a silhouette that defines the Shellharbour skyline. Residents enjoy access to a rooftop terrace, secure basement parking, and a ground-floor retail and café precinct that activated the street within months of opening. The project sold out in under eight weeks through Spinelli's pre-qualified buyer database, with 60% of buyers sourced from outside the Illawarra — a testament to the region's growing appeal for owner-occupiers and investors alike.",
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
    longDescription: "Bluewater was conceived as a response to the scarcity of premium coastal product in Kiama — a tightly held market where genuine sea-view apartments rarely come to market. Each of the 23 residences was individually oriented to maximise ocean outlook, with full-width glazing, north-facing terraces and bespoke stone joinery throughout. The building's low-rise scale was deliberately chosen to respect the existing streetscape while delivering the kind of luxury finish typically reserved for Sydney's eastern suburbs. All 23 homes were sold off-the-plan in a single launch weekend, with a waitlist of over 60 registered buyers.",
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
    longDescription: "The Outlook occupies one of Kiama's most coveted ridge-top positions, with sweeping views from the escarpment to the Pacific. The building's tiered form steps down the hillside, ensuring every apartment captures an uninterrupted outlook without compromising its neighbour. Interiors feature hand-selected European oak flooring, integrated Miele appliances and custom stone benchtops throughout. Spinelli managed the off-the-plan sales campaign from inception, securing presales that enabled construction financing within six weeks of public launch — an outcome made possible by more than a decade of relationships with the region's high-net-worth buyer pool.",
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
    longDescription: "Shellharbour Rise brought a new level of architectural quality to the townhome segment — a product type that the Illawarra market had historically underserved. Each of the eight homes was designed with open-plan living across two levels, a chef's kitchen with stone island, and a private north-facing courtyard large enough for genuine outdoor living. The landscaping was curated by a specialist studio to create a sense of established permanence from day one. Spinelli's project team managed every step from site identification through to settlement, with the development achieving a 100% sell-out result prior to slab pour.",
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
    longDescription: "Albion Park is one of the Illawarra's fastest-growing residential corridors, with infrastructure investment, strong rental yields and excellent access to Shellharbour CBD and the M1 making it an increasingly compelling choice for owner-occupiers and investors alike. The Grove capitalises on this positioning with six townhomes that deliver genuine scale — wide frontages, double garages and courtyards that feel more like garden homes than typical townhouse product. Internal finishes were selected by an award-winning Sydney interior designer, with the palette drawing on the natural tones of the surrounding farmland. Enquire now to secure your preferred home.",
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
    longDescription: "Thirroul is one of the Illawarra's most sought-after addresses — a village that retains the character of old coastal NSW while attracting a growing community of professionals, creatives and families relocating from Sydney. Coastal Terrace Collection sits at the centre of this village life, walking distance to the beach, the train station, and the cafes and restaurants of Lawrence Hargrave Drive. Each of the four homes features 3.2m ceilings, engineered oak floors, a stone island kitchen and a private rooftop terrace with ocean glimpses. With only four homes available and strong demand from Sydney buyers, this is a rare opportunity to secure a brand new home in a suburb that rarely offers new-build product.",
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
    longDescription: "Wollongong's CBD is undergoing its most significant transformation in a generation — driven by the University of Wollongong's expanding city campus, major government infrastructure commitments and a wave of private investment along the harbour foreshore. Harbourside Quarter is positioned at the epicentre of this renewal, on a flagship Harbour Street address that offers unobstructed water views from upper-level residences. The project's mixed-use ground plane will introduce a curated retail and dining offering that activates the street year-round. Spinelli is managing the full pre-sales and marketing campaign ahead of DA approval, with VIP registrations now open for buyers seeking priority access.",
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
    longDescription: "Gerringong has long been one of the Illawarra's best-kept secrets — a clifftop village with a tight-knit community, award-winning restaurants and some of the most spectacular coastal views on the NSW South Coast. Gerringong Heights unlocks a rarely available elevated ridge position, with homes positioned to capture 180-degree panoramas across the Pacific and back towards the escarpment. Each of the 18 duplex homes sits on a generous individually titled allotment with private landscaping, double garage and a covered outdoor entertaining area designed for year-round use. With construction well underway and homes now selling, this is one of the last opportunities to build in Gerringong at this scale.",
    timeline: [
      { label: "Site Acquired", date: "Mar 2023", done: true },
      { label: "DA Approved", date: "Oct 2023", done: true },
      { label: "Construction Commenced", date: "Feb 2024", done: true },
      { label: "Now Selling", date: "Apr 2024", done: true },
      { label: "Practical Completion", date: "Q3 2026", done: false },
    ],
  },
];
