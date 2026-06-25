import { NextRequest, NextResponse } from "next/server";

const BASE = "https://api.agentboxcrm.com.au";
const VERSION = "2";

function headers() {
  return {
    "X-Client-ID": process.env.AGENTBOX_CLIENT_ID!,
    "X-API-Key": process.env.AGENTBOX_API_KEY!,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      buyerAddress,
      secondFirstName,
      secondLastName,
      offerPrice,
      deposit,
      finance,
      inspection,
      purpose,
      solicitorName,
      solicitorPhone,
      comments,
      listingId,
    } = body;

    if (!firstName || !lastName || !email || !phone || !offerPrice || !listingId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Build structured comment containing all offer details
    const lines: string[] = ["=== OFFER SUBMITTED VIA WEBSITE ===", ""];
    lines.push(`Offer Price: $${offerPrice}`);
    lines.push(`Deposit: $${deposit || "Not specified"}`);
    lines.push("");
    lines.push("CONDITIONS:");
    lines.push(`• Subject to finance: ${finance === "yes" ? "Yes" : finance === "no" ? "No (Cash Contract)" : "Not specified"}`);
    lines.push(`• Subject to building & pest inspection: ${inspection === "yes" ? "Yes" : inspection === "no" ? "No" : "Not specified"}`);
    lines.push("");
    lines.push(`Purchase purpose: ${purpose === "owner-occupier" ? "Owner Occupier" : purpose === "investor" ? "Investor" : "Not specified"}`);
    if (buyerAddress) lines.push(`Buyer address: ${buyerAddress}`);
    if (secondFirstName || secondLastName) {
      lines.push(`Second purchaser: ${[secondFirstName, secondLastName].filter(Boolean).join(" ")}`);
    }
    if (solicitorName) {
      lines.push(`Solicitor: ${solicitorName}${solicitorPhone ? ` — ${solicitorPhone}` : ""}`);
    }
    if (comments) {
      lines.push("");
      lines.push("FURTHER COMMENTS:");
      lines.push(comments);
    }

    const enquiryBody = {
      enquiry: {
        comment: lines.join("\n"),
        feedback: offerPrice,  // offer price in AgentBox Feedback field
        source: "Website",
        attachedListing: { id: String(listingId) },
        attachedContact: {
          firstName,
          lastName,
          email,
          phone,
          ...(buyerAddress ? { address: { streetAddress: buyerAddress } } : {}),
          contactClasses: [{ name: "Prospective Buyer" }],
          actions: {
            attachListingAgents: true,
            addDefaultContactClasses: true,
            addDefaultSubscriptions: false,
            addDefaultRequirements: false,
          },
        },
      },
    };

    const res = await fetch(`${BASE}/enquiries?version=${VERSION}`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(enquiryBody),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("AgentBox offer submission failed:", res.status, text);
      return NextResponse.json({ error: "Failed to submit offer" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Offer submission error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
