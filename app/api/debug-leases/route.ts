import { NextResponse } from "next/server";
import { fetchAllListings } from "@/lib/agentbox";

export async function GET() {
  try {
    const all = await fetchAllListings({
      "filter[type]": "Lease",
      "sort[listedDate]": "desc",
    }, 0);

    const available = all.filter(
      l => l.property.type === "Residential" && !["Leased", "Withdrawn", "Sold"].includes(l.status)
    );

    return NextResponse.json({
      totalFetched: all.length,
      availableCount: available.length,
      allStatuses: [...new Set(all.map(l => l.status))],
      available: available.map(l => ({
        id: l.id,
        status: l.status,
        marketingStatus: l.marketingStatus,
        address: `${l.property.address.streetAddress}, ${l.property.address.suburb}`,
        listedDate: l.listedDate,
      })),
    });
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
