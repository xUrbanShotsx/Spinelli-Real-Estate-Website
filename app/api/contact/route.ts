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

const TYPE_TO_CLASS: Record<string, string> = {
  Buying: "Prospective Buyer",
  Selling: "Prospective Vendor",
  Rentals: "Prospective Tenant",
  "Property Management": "Prospective Landlord",
};

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, enquiryType, message } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const contactClass = TYPE_TO_CLASS[enquiryType] ?? null;
    const comment = `[${enquiryType || "General"}] ${message || ""}`.trim();

    // Submit to CRM
    try {
      const crmBody: Record<string, unknown> = {
        enquiry: {
          comment,
          source: "Website",
          attachedContact: {
            firstName,
            lastName,
            email,
            phone,
            mobile: phone,
            ...(contactClass ? { contactClasses: [{ name: contactClass }] } : {}),
            actions: {
              attachListingAgents: false,
              addDefaultContactClasses: true,
              addDefaultSubscriptions: false,
              addDefaultRequirements: false,
            },
          },
        },
      };

      const crmRes = await fetch(`${BASE}/enquiries?version=${VERSION}`, {
        method: "POST",
        headers: agentboxHeaders(),
        body: JSON.stringify(crmBody),
      });

      if (!crmRes.ok) {
        const text = await crmRes.text();
        console.error("AgentBox contact error:", crmRes.status, text);
      } else {
        console.log("AgentBox contact created successfully");
      }
    } catch (crmErr) {
      console.error("AgentBox contact error:", crmErr);
    }

    // Send notification email
    const { error: emailError } = await resend.emails.send({
      from: "Spinelli Real Estate <onboarding@resend.dev>",
      to: ["adam@spinellire.com"],
      replyTo: email,
      subject: `New Enquiry — ${enquiryType} — ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #000000;">
          <div style="background-color: #5BC2E7; padding: 24px 32px;">
            <h1 style="color: #ffffff; font-size: 20px; font-weight: 400; margin: 0;">New Website Enquiry</h1>
          </div>
          <div style="padding: 32px; border: 1px solid #E8E5DF; border-top: none;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
              <tr><td style="padding: 8px 0; color: #7a7265; font-size: 13px; width: 140px;">Name</td><td style="padding: 8px 0; color: #000000; font-size: 13px; font-weight: 600;">${firstName} ${lastName}</td></tr>
              <tr><td style="padding: 8px 0; color: #7a7265; font-size: 13px;">Email</td><td style="padding: 8px 0; font-size: 13px;"><a href="mailto:${email}" style="color: #5BC2E7;">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; color: #7a7265; font-size: 13px;">Phone</td><td style="padding: 8px 0; font-size: 13px;"><a href="tel:${phone}" style="color: #5BC2E7;">${phone}</a></td></tr>` : ""}
              <tr><td style="padding: 8px 0; color: #7a7265; font-size: 13px;">Enquiry Type</td><td style="padding: 8px 0; font-size: 13px;"><span style="background-color: #5BC2E7; color: #ffffff; font-size: 11px; padding: 3px 10px;">${enquiryType}</span></td></tr>
            </table>
            ${message ? `
            <h2 style="font-size: 15px; font-weight: 600; margin: 0 0 12px 0;">Message</h2>
            <div style="padding: 16px; background: #F8F9FA; border-left: 3px solid #5BC2E7; font-size: 13px; color: #000000; line-height: 1.75;">
              ${message.replace(/\n/g, "<br>")}
            </div>` : ""}
          </div>
          <div style="padding: 20px 32px; background: #F8F9FA; border: 1px solid #E8E5DF; border-top: none;">
            <p style="font-size: 11px; color: #a2b0aa; margin: 0;">Submitted via spinellirealestate.com.au — reply directly to this email to contact ${firstName}.</p>
          </div>
        </div>
      `,
    });

    if (emailError) console.error("Resend contact error:", JSON.stringify(emailError));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
