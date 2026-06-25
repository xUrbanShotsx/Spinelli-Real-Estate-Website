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
    const { firstName, lastName, email, phone, address, message } = body;

    if (!firstName || !lastName || !email || !address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create contact in AgentBox tagged as Prospective Vendor
    const commentLines = ["=== FREE APPRAISAL REQUEST ===", "", `Property: ${address}`];
    if (message) commentLines.push("", "Additional details:", message);

    try {
      const crmRes = await fetch(`${BASE}/enquiries?version=${VERSION}`, {
        method: "POST",
        headers: agentboxHeaders(),
        body: JSON.stringify({
          enquiry: {
            comment: commentLines.join("\n"),
            source: "Website",
            attachedContact: {
              firstName,
              lastName,
              email,
              phone,
              mobile: phone,
              contactClasses: [{ name: "Prospective Vendor" }],
              actions: {
                attachListingAgents: false,
                addDefaultContactClasses: true,
                addDefaultSubscriptions: false,
                addDefaultRequirements: false,
              },
            },
          },
        }),
      });
      if (!crmRes.ok) {
        const text = await crmRes.text();
        console.error("AgentBox appraisal error:", crmRes.status, text);
      } else {
        console.log("AgentBox appraisal contact created successfully");
      }
    } catch (crmErr) {
      console.error("AgentBox appraisal error:", crmErr);
    }

    // Send notification email
    const { data, error } = await resend.emails.send({
      from: "Spinelli Real Estate <onboarding@resend.dev>",
      to: ["adam@spinellire.com"],
      replyTo: email,
      subject: `Free Appraisal Request — ${address}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #000000;">
          <div style="background-color: #5BC2E7; padding: 24px 32px;">
            <h1 style="color: #ffffff; font-size: 20px; font-weight: 400; margin: 0;">
              New Free Appraisal Request
            </h1>
          </div>
          <div style="padding: 32px; border: 1px solid #E8E5DF; border-top: none;">
            <h2 style="font-size: 16px; font-weight: 600; margin: 0 0 20px 0; color: #000000;">Property</h2>
            <p style="font-size: 15px; color: #000000; margin: 0 0 32px 0; padding: 14px 16px; background: #F8F9FA; border-left: 3px solid #5BC2E7;">
              ${address}
            </p>
            <h2 style="font-size: 16px; font-weight: 600; margin: 0 0 16px 0; color: #000000;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
              <tr>
                <td style="padding: 8px 0; color: #7a7265; font-size: 13px; width: 120px;">Name</td>
                <td style="padding: 8px 0; color: #000000; font-size: 13px;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #7a7265; font-size: 13px;">Email</td>
                <td style="padding: 8px 0; font-size: 13px;"><a href="mailto:${email}" style="color: #5BC2E7;">${email}</a></td>
              </tr>
              ${phone ? `<tr><td style="padding: 8px 0; color: #7a7265; font-size: 13px;">Phone</td><td style="padding: 8px 0; font-size: 13px;"><a href="tel:${phone}" style="color: #5BC2E7;">${phone}</a></td></tr>` : ""}
            </table>
            ${message ? `
            <h2 style="font-size: 16px; font-weight: 600; margin: 0 0 12px 0; color: #000000;">Additional Details</h2>
            <p style="font-size: 13px; color: #000000; line-height: 1.7; margin: 0; padding: 14px 16px; background: #F8F9FA;">
              ${message.replace(/\n/g, "<br>")}
            </p>` : ""}
          </div>
          <div style="padding: 20px 32px; background: #F8F9FA; border: 1px solid #E8E5DF; border-top: none;">
            <p style="font-size: 11px; color: #a2b0aa; margin: 0;">
              Submitted via spinellirealestate.com.au — reply directly to this email to contact ${firstName}.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend appraisal error:", JSON.stringify(error));
    } else {
      console.log("Resend appraisal sent, id:", data?.id);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Appraisal API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
