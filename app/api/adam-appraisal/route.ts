import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { fullName, address, email, phone, appraisalType } = await req.json();

    if (!fullName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Spinelli Real Estate <onboarding@resend.dev>",
      to: ["adam@spinellire.com"],
      replyTo: email,
      subject: `Appraisal Request — ${address || "No address provided"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #000000;">
          <div style="background-color: #0D3348; padding: 24px 32px;">
            <h1 style="color: #ffffff; font-size: 20px; font-weight: 400; margin: 0;">New Appraisal Request</h1>
          </div>
          <div style="padding: 32px; border: 1px solid #E8E5DF; border-top: none;">
            <h2 style="font-size: 16px; font-weight: 600; margin: 0 0 12px 0;">Property</h2>
            <p style="font-size: 15px; margin: 0 0 32px; padding: 14px 16px; background: #F8F9FA; border-left: 3px solid #5BC2E7;">
              ${address || "Not provided"}
            </p>
            <h2 style="font-size: 16px; font-weight: 600; margin: 0 0 16px 0;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
              <tr><td style="padding: 8px 0; color: #7a7265; font-size: 13px; width: 140px;">Name</td><td style="padding: 8px 0; font-size: 13px;">${fullName}</td></tr>
              <tr><td style="padding: 8px 0; color: #7a7265; font-size: 13px;">Email</td><td style="padding: 8px 0; font-size: 13px;"><a href="mailto:${email}" style="color: #5BC2E7;">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; color: #7a7265; font-size: 13px;">Phone</td><td style="padding: 8px 0; font-size: 13px;"><a href="tel:${phone}" style="color: #5BC2E7;">${phone}</a></td></tr>` : ""}
              ${appraisalType ? `<tr><td style="padding: 8px 0; color: #7a7265; font-size: 13px;">Preference</td><td style="padding: 8px 0; font-size: 13px;">${appraisalType}</td></tr>` : ""}
            </table>
          </div>
          <div style="padding: 20px 32px; background: #F8F9FA; border: 1px solid #E8E5DF; border-top: none;">
            <p style="font-size: 11px; color: #a2b0aa; margin: 0;">Submitted via spinellirealestate.com.au/adam</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Adam appraisal error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
