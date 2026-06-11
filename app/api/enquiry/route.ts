import { NextRequest, NextResponse } from "next/server";
import { submitEnquiry } from "@/lib/agentbox";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, message, listingId } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const success = await submitEnquiry({ firstName, lastName, email, phone, message, listingId });

    if (!success) {
      return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Enquiry submission error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
