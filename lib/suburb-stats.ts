/**
 * Suburb market stats scraper.
 * Fetches median price, days on market, and sales volume from Domain.com.au
 * suburb profile pages by parsing the embedded __NEXT_DATA__ JSON.
 * Results are cached in-memory for 24 hours.
 */

// Illawarra & South Coast suburb → postcode mapping
const POSTCODES: Record<string, string> = {
  "wollongong": "2500",
  "north wollongong": "2500",
  "west wollongong": "2500",
  "port kembla": "2505",
  "warrawong": "2502",
  "coniston": "2500",
  "gwynneville": "2500",
  "keiraville": "2500",
  "mount keira": "2500",
  "mount saint thomas": "2500",
  "mount kembla": "2526",
  "fairy meadow": "2519",
  "balgownie": "2519",
  "towradgi": "2518",
  "corrimal": "2518",
  "tarrawanna": "2518",
  "bellambi": "2518",
  "collegians": "2519",
  "mount ousley": "2519",
  "mount pleasant": "2519",
  "bulli": "2516",
  "woonona": "2517",
  "russell vale": "2517",
  "thirroul": "2515",
  "coalcliff": "2508",
  "austinmer": "2515",
  "coledale": "2515",
  "clifton": "2515",
  "scarborough": "2515",
  "wombarra": "2515",
  "stanwell park": "2508",
  "helensburgh": "2508",
  "dapto": "2530",
  "horsley": "2530",
  "kanahooka": "2530",
  "koonawarra": "2530",
  "cleveland": "2530",
  "yallah": "2530",
  "marshall mount": "2530",
  "unanderra": "2526",
  "mount kembla": "2526",
  "lake heights": "2502",
  "primbee": "2502",
  "shellharbour": "2529",
  "shell cove": "2529",
  "flinders": "2529",
  "oak flats": "2529",
  "dunmore": "2529",
  "warilla": "2528",
  "lake illawarra": "2528",
  "barrack heights": "2528",
  "barrack point": "2528",
  "mount warrigal": "2528",
  "windang": "2528",
  "albion park": "2527",
  "albion park rail": "2527",
  "calderwood": "2527",
  "kiama": "2533",
  "kiama heights": "2533",
  "kiama downs": "2533",
  "minnamurra": "2533",
  "jamberoo": "2533",
  "gerringong": "2534",
  "gerroa": "2534",
  "rose valley": "2534",
  "berry": "2535",
  "nowra": "2541",
  "north nowra": "2541",
  "bomaderry": "2541",
  "worrigee": "2540",
  "culburra beach": "2540",
};

export interface SuburbStats {
  suburb: string;
  postcode: string;
  medianHousePrice: number | null;
  medianUnitPrice: number | null;
  medianWeeklyRent: number | null;
  avgDaysOnMarket: number | null;
  soldLast12Months: number | null;
  source: string;
  sourceUrl: string;
  asOf: string;
}

// In-memory cache with 24-hour TTL
const cache = new Map<string, { data: SuburbStats; expiresAt: number }>();

/** Deep-search an object for a key, returning the first numeric value found */
function deepFind(obj: unknown, ...keys: string[]): number | null {
  if (!obj || typeof obj !== "object") return null;
  for (const key of keys) {
    const v = (obj as Record<string, unknown>)[key];
    if (typeof v === "number" && v > 0) return v;
    if (typeof v === "string") {
      const n = parseFloat(v.replace(/[^0-9.]/g, ""));
      if (!isNaN(n) && n > 0) return n;
    }
  }
  // Recurse into child objects
  for (const child of Object.values(obj as Record<string, unknown>)) {
    if (child && typeof child === "object" && !Array.isArray(child)) {
      const found = deepFind(child, ...keys);
      if (found !== null) return found;
    }
  }
  return null;
}

/** Extract suburb stats from Domain's __NEXT_DATA__ blob */
function parseNextData(data: unknown, suburb: string, postcode: string, url: string): SuburbStats | null {
  // Domain structures stats under several possible paths — try them all
  const props = (data as Record<string, unknown>)?.props as Record<string, unknown> | undefined;
  const pageProps = props?.pageProps as Record<string, unknown> | undefined;
  if (!pageProps) return null;

  // Traverse all top-level pageProps values looking for suburb stats
  const candidates: Record<string, unknown>[] = [pageProps];
  for (const v of Object.values(pageProps)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      candidates.push(v as Record<string, unknown>);
      for (const vv of Object.values(v as Record<string, unknown>)) {
        if (vv && typeof vv === "object" && !Array.isArray(vv)) {
          candidates.push(vv as Record<string, unknown>);
        }
      }
    }
  }

  const medianHousePrice = candidates.reduce<number | null>((acc, c) => {
    if (acc !== null) return acc;
    return deepFind(c?.house ?? c, "medianSalePrice", "medianPrice", "medianListingPrice");
  }, null);

  const medianUnitPrice = candidates.reduce<number | null>((acc, c) => {
    if (acc !== null) return acc;
    return deepFind(c?.unit ?? c?.apartment, "medianSalePrice", "medianPrice");
  }, null);

  const medianWeeklyRent = candidates.reduce<number | null>((acc, c) => {
    if (acc !== null) return acc;
    return deepFind(c?.house ?? c, "medianRentListingPrice", "medianWeeklyRent", "medianRent");
  }, null);

  const avgDaysOnMarket = candidates.reduce<number | null>((acc, c) => {
    if (acc !== null) return acc;
    return deepFind(c?.house ?? c, "daysOnMarket", "medianDaysOnMarket", "averageDaysOnMarket");
  }, null);

  const soldLast12Months = candidates.reduce<number | null>((acc, c) => {
    if (acc !== null) return acc;
    return deepFind(c?.house ?? c, "numberSold", "salesVolume", "soldCount", "propertiesSold");
  }, null);

  // If we found nothing useful, return null
  if (!medianHousePrice && !avgDaysOnMarket && !soldLast12Months) return null;

  return {
    suburb,
    postcode,
    medianHousePrice,
    medianUnitPrice,
    medianWeeklyRent,
    avgDaysOnMarket: avgDaysOnMarket ? Math.round(avgDaysOnMarket) : null,
    soldLast12Months: soldLast12Months ? Math.round(soldLast12Months) : null,
    source: "Domain.com.au",
    sourceUrl: url,
    asOf: new Date().toLocaleDateString("en-AU"),
  };
}

async function fetchStats(suburbKey: string): Promise<SuburbStats | null> {
  const normalised = suburbKey.toLowerCase().trim();
  const postcode = POSTCODES[normalised];
  if (!postcode) return null;

  const slug = normalised.replace(/\s+/g, "-");
  const url = `https://www.domain.com.au/suburb-profile/${slug}-nsw-${postcode}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-AU,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
      },
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!res.ok) return null;
    const html = await res.text();

    // Extract __NEXT_DATA__ JSON blob
    const match = html.match(/<script[^>]*id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
    if (!match?.[1]) return null;

    const nextData = JSON.parse(match[1]);
    return parseNextData(nextData, suburbKey, postcode, url);
  } catch {
    return null;
  }
}

/** Get suburb stats with 24-hour in-memory cache */
export async function getSuburbStats(suburb: string): Promise<SuburbStats | null> {
  const key = suburb.toLowerCase().trim();
  const now = Date.now();

  const cached = cache.get(key);
  if (cached && now < cached.expiresAt) return cached.data;

  const data = await fetchStats(key);
  if (data) {
    cache.set(key, { data, expiresAt: now + 24 * 60 * 60 * 1000 });
  }
  return data;
}

export function formatPrice(n: number | null): string {
  if (!n) return "N/A";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}m`;
  return `$${Math.round(n / 1000)}k`;
}
