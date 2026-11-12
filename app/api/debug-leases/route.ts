import { NextResponse } from "next/server";
import { fetchForLease } from "@/lib/agentbox";

export async function GET() {
  try {
    const data = await fetchForLease(1, 50);
    const listings = data.listings ?? [];
    return NextResponse.json({
      total: listings.length,
      pagination: { items: data.items, current: data.current, last: data.last },
      all: listings.map(l => ({
        id: l.id,
        status: l.status,
        marketingStatus: l.marketingStatus,
        type: l.type,
        propertyType: l.property.type,
        category: l.property.category,
        address: `${l.property.address.streetAddress}, ${l.property.address.suburb}`,
        listedDate: l.listedDate,
      })),
    });
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
