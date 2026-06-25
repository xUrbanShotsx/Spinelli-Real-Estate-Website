import { NextResponse } from "next/server";

export async function GET() {
  const BASE = "https://api.agentboxcrm.com.au";

  const headers = {
    "X-Client-ID": process.env.AGENTBOX_CLIENT_ID!,
    "X-API-Key": process.env.AGENTBOX_API_KEY!,
    Accept: "application/json",
  };

  try {
    // Test 1: fetch with filter[type]=Business, no status filter
    const url1 = `${BASE}/listings?version=2&include=mainImage&filter[type]=Business&limit=50`;
    const res1 = await fetch(url1, { headers, cache: "no-store" });
    const data1 = await res1.json();

    // Test 2: fetch ALL listings (no type filter) to see what types exist
    const url2 = `${BASE}/listings?version=2&include=mainImage&limit=20`;
    const res2 = await fetch(url2, { headers, cache: "no-store" });
    const data2 = await res2.json();

    return NextResponse.json({
      businessQuery: {
        status: res1.status,
        ok: res1.ok,
        totalItems: data1?.response?.items,
        listingCount: data1?.response?.listings?.length ?? 0,
        listings: (data1?.response?.listings ?? []).map((l: Record<string, unknown>) => ({
          id: l.id,
          type: l.type,
          status: l.status,
          marketingStatus: l.marketingStatus,
          headline: l.mainHeadline,
        })),
        rawResponse: data1?.response ? Object.keys(data1.response) : data1,
      },
      allListingsSample: {
        status: res2.status,
        totalItems: data2?.response?.items,
        types: [...new Set((data2?.response?.listings ?? []).map((l: Record<string, unknown>) => l.type))],
        statuses: [...new Set((data2?.response?.listings ?? []).map((l: Record<string, unknown>) => l.status))],
      },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
