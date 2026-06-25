import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const BASE = "https://api.agentboxcrm.com.au";
const VERSION = "2";

function agentboxHeaders() {
  return {
    "X-Client-ID": process.env.AGENTBOX_CLIENT_ID!,
    "X-API-Key": process.env.AGENTBOX_API_KEY!,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
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
      propertyAddress,
      propertySuburb,
    } = body;

    if (!firstName || !lastName || !email || !phone || !offerPrice || !listingId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Build structured comment for CRM
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
        feedback: offerPrice,
        source: "Website",
        attachedListing: { id: String(listingId) },
        attachedContact: {
          firstName,
          lastName,
          email,
          phone,
          mobile: phone,
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

    // Submit to CRM (non-fatal)
    try {
      const crmRes = await fetch(`${BASE}/enquiries?version=${VERSION}`, {
        method: "POST",
        headers: agentboxHeaders(),
        body: JSON.stringify(enquiryBody),
      });
      if (!crmRes.ok) {
        const text = await crmRes.text();
        console.error("AgentBox offer submission failed:", crmRes.status, text);
      }
    } catch (crmErr) {
      console.error("AgentBox offer error:", crmErr);
    }

    // Send notification email
    const propertyLine = propertyAddress
      ? `${propertyAddress}${propertySuburb ? `, ${propertySuburb}` : ""}`
      : `Listing ID: ${listingId}`;

    const financeLabel = finance === "yes" ? "Yes" : finance === "no" ? "No (Cash Contract)" : "Not specified";
    const inspectionLabel = inspection === "yes" ? "Yes" : inspection === "no" ? "No" : "Not specified";
    const purposeLabel = purpose === "owner-occupier" ? "Owner Occupier" : purpose === "investor" ? "Investor" : "Not specified";

    const row = (label: string, value: string) =>
      `<tr><td style="padding:8px 0;color:#7a7265;font-size:13px;width:180px;">${label}</td><td style="padding:8px 0;font-size:13px;color:#000000;">${value}</td></tr>`;

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "Spinelli Real Estate <onboarding@resend.dev>",
      to: ["adam@spinellire.com"],
      replyTo: email,
      subject: `New Offer — ${propertyLine}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#000000;">
          <div style="background-color:#0D3348;padding:24px 32px;">
            <h1 style="color:#ffffff;font-size:20px;font-weight:400;margin:0;">New Offer Submitted</h1>
          </div>
          <div style="padding:32px;border:1px solid #E8E5DF;border-top:none;">

            <h2 style="font-size:16px;font-weight:600;margin:0 0 12px 0;">Property</h2>
            <p style="font-size:15px;color:#000000;margin:0 0 32px 0;padding:14px 16px;background:#F8F9FA;border-left:3px solid #0D3348;">
              ${propertyLine}
            </p>

            <h2 style="font-size:16px;font-weight:600;margin:0 0 16px 0;">Offer Details</h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
              ${row("Offer Price", `$${offerPrice}`)}
              ${row("Deposit", deposit ? `$${deposit}` : "Not specified")}
              ${row("Subject to Finance", financeLabel)}
              ${row("Building &amp; Pest", inspectionLabel)}
              ${row("Purchase Purpose", purposeLabel)}
            </table>

            <h2 style="font-size:16px;font-weight:600;margin:0 0 16px 0;">Buyer Details</h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
              ${row("Name", `${firstName} ${lastName}`)}
              <tr><td style="padding:8px 0;color:#7a7265;font-size:13px;width:180px;">Email</td><td style="padding:8px 0;font-size:13px;"><a href="mailto:${email}" style="color:#5BC2E7;">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#7a7265;font-size:13px;">Phone</td><td style="padding:8px 0;font-size:13px;"><a href="tel:${phone}" style="color:#5BC2E7;">${phone}</a></td></tr>
              ${buyerAddress ? row("Buyer Address", buyerAddress) : ""}
              ${(secondFirstName || secondLastName) ? row("Second Purchaser", [secondFirstName, secondLastName].filter(Boolean).join(" ")) : ""}
              ${solicitorName ? row("Solicitor", `${solicitorName}${solicitorPhone ? ` — ${solicitorPhone}` : ""}`) : ""}
            </table>

            ${comments ? `
            <h2 style="font-size:16px;font-weight:600;margin:0 0 12px 0;">Further Comments</h2>
            <p style="font-size:13px;color:#000000;line-height:1.7;margin:0;padding:14px 16px;background:#F8F9FA;">
              ${comments.replace(/\n/g, "<br>")}
            </p>` : ""}
          </div>
          <div style="padding:20px 32px;background:#F8F9FA;border:1px solid #E8E5DF;border-top:none;">
            <p style="font-size:11px;color:#a2b0aa;margin:0;">Submitted via spinellirealestate.com.au — reply directly to this email to contact ${firstName}.</p>
          </div>
        </div>
      `,
    });

    if (emailError) {
      console.error("Resend offer error:", JSON.stringify(emailError));
    } else {
      console.log("Resend offer sent, id:", emailData?.id);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Offer submission error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
