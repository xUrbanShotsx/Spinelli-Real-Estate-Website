/**
 * Manual open home times keyed by AgentBox listing ID.
 * Add or update entries here whenever you schedule an OFI in AgentBox.
 * Format: "1P0000": "Sat 26 Jul, 10:00–10:30am"
 */
const openHomes: Record<string, string> = {
  // Example: "1P0863": "Sat 26 Jul, 10:00–10:30am",
};

export function getOpenHome(listingId: string): string | undefined {
  return openHomes[listingId] || undefined;
}
