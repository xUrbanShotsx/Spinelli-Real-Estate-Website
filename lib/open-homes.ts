/**
 * Manual open home times keyed by AgentBox listing ID.
 * Add or update entries here whenever you schedule an OFI in AgentBox.
 * Format: "1P0000": "Sat 26 Jul, 10:00–10:30am"
 */
const openHomes: Record<string, string> = {
  // Saturday 18 July
  "1P2114": "Sat 18 Jul, 10:00–10:30am",  // 6A Lyne Street, Oak Flats
  "1P2101": "Sat 18 Jul, 10:00–10:30am",  // 13 Jilba Place, Oak Flats
  "1P2062": "Sat 18 Jul, 10:00–10:30am",  // 48 Woodford Avenue, Warilla
  "1P2061": "Sat 18 Jul, 11:00–11:30am",  // 28 Stradbroke Avenue, Shell Cove
  "1P2086": "Sat 18 Jul, 11:00–11:30am",  // 78 Beatus Street, Unanderra
  "1P2102": "Sat 18 Jul, 11:30am–12:00pm", // 3 Leaney Avenue, Nowra
  "1P2065": "Sat 18 Jul, 11:45am–12:15pm", // 2/93 Harbour Boulevard, Shell Cove
  "1P2089": "Sat 18 Jul, 12:00–12:30pm",  // 9 Karrabah Avenue, Lake Heights
};

export function getOpenHome(listingId: string): string | undefined {
  return openHomes[listingId] || undefined;
}

export function getAllOpenHomes(): { id: string; time: string }[] {
  return Object.entries(openHomes).map(([id, time]) => ({ id, time }));
}
