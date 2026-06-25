import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const BASE = "https://api.agentboxcrm.com.au";

function abHeaders() {
  return {
    "X-Client-ID": process.env.AGENTBOX_CLIENT_ID!,
    "X-API-Key": process.env.AGENTBOX_API_KEY!,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

async function submitDeveloperEnquiry(payload: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}) {
  const body = {
    enquiry: {
      comment: `[Developer Enquiry] ${payload.message}`,
      source: "Website",
      attachedContact: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phone: payload.phone,
        // Tag the contact as a Developer in AgentBox
        contactClasses: [{ name: "Developer" }],
        actions: {
          attachListingAgents: false,
          addDefaultContactClasses: false,
          addDefaultSubscriptions: false,
          addDefaultRequirements: false,
        },
      },
    },
  };

  const res = await fetch(`${BASE}/enquiries?version=2`, {
    method: "POST",
    headers: abHeaders(),
    body: JSON.stringify(body),
  });

  return res.ok;
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Submit to AgentBox tagged as Developer
    try {
      await submitDeveloperEnquiry({ firstName, lastName, email, phone, message });
    } catch (err) {
      console.error("AgentBox developer enquiry error:", err);
    }

    // Email the team
    await resend.emails.send({
      from: "Spinelli Real Estate <noreply@spinellirealestate.com.au>",
      to: ["adam@spinellire.com"],
      replyTo: email,
      subject: `Developer Enquiry — ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #000000;">
          <div style="background-color: #0D3348; padding: 24px 32px;">
            <h1 style="color: #ffffff; font-size: 20px; font-weight: 400; margin: 0;">
              Developer Enquiry
            </h1>
            <p style="color: #5BC2E7; font-size: 11px; letter-spacing: 0.1em; margin: 6px 0 0; text-transform: uppercase;">
              Projects Page — tagged as Developer in AgentBox
            </p>
          </div>

          <div style="padding: 32px; border: 1px solid #E8E5DF; border-top: none;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
              <tr>
                <td style="padding: 8px 0; color: #7a7265; font-size: 13px; width: 140px;">Name</td>
                <td style="padding: 8px 0; color: #000000; font-size: 13px; font-weight: 600;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #7a7265; font-size: 13px;">Email</td>
                <td style="padding: 8px 0; font-size: 13px;">
                  <a href="mailto:${email}" style="color: #5BC2E7;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; color: #7a7265; font-size: 13px;">Phone</td>
                <td style="padding: 8px 0; font-size: 13px;">
                  <a href="tel:${phone}" style="color: #5BC2E7;">${phone}</a>
                </td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 0; color: #7a7265; font-size: 13px;">Type</td>
                <td style="padding: 8px 0;">
                  <span style="background-color: #0D3348; color: #5BC2E7; font-size: 11px; padding: 3px 10px; letter-spacing: 0.1em;">DEVELOPER</span>
                </td>
              </tr>
            </table>

            <h2 style="font-size: 15px; font-weight: 600; margin: 0 0 12px 0;">Message</h2>
            <div style="padding: 16px; background: #F8F9FA; border-left: 3px solid #5BC2E7; font-size: 13px; line-height: 1.75;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>

          <div style="padding: 20px 32px; background: #F8F9FA; border: 1px solid #E8E5DF; border-top: none;">
            <p style="font-size: 11px; color: #a2b0aa; margin: 0;">
              Submitted via spinellirealestate.com.au/projects — reply directly to contact ${firstName}.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Developer enquiry error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
