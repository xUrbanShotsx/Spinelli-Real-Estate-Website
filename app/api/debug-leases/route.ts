import { NextResponse } from "next/server";
import { fetchForLease } from "@/lib/agentbox";

export async function GET() {
  try {
    const data = await fetchForLease(1, 50);
    const listings = data.listings ?? [];
    return NextResponse.json({
      total: listings.length,
      statuses: [...new Set(listings.map(l => l.status))],
      propertyTypes: [...new Set(listings.map(l => l.property.type))],
      sample: listings.slice(0, 3).map(l => ({
        id: l.id,
        status: l.status,
        type: l.type,
        propertyType: l.property.type,
        address: l.property.address.streetAddress,
        suburb: l.property.address.suburb,
      })),
    });
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
