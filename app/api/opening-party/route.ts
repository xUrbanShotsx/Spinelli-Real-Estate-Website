import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json();
    const { firstName, lastName, mobile } = body;

    if (!firstName || !lastName || !mobile) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Spinelli Real Estate <onboarding@resend.dev>",
      to: ["adam@spinellire.com"],
      subject: `Opening Party RSVP — ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #000000;">
          <div style="background-color: #5BC2E7; padding: 24px 32px;">
            <h1 style="color: #ffffff; font-size: 20px; font-weight: 400; margin: 0;">Opening Party RSVP</h1>
            <p style="color: rgba(255,255,255,0.8); font-size: 13px; margin: 6px 0 0;">14 August 2026 · 10AM – 5PM</p>
          </div>
          <div style="padding: 32px; border: 1px solid #E8E5DF; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #7a7265; font-size: 13px; width: 140px; border-bottom: 1px solid #E8E5DF;">First Name</td>
                <td style="padding: 10px 0; color: #000000; font-size: 13px; font-weight: 600; border-bottom: 1px solid #E8E5DF;">${firstName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #7a7265; font-size: 13px; border-bottom: 1px solid #E8E5DF;">Last Name</td>
                <td style="padding: 10px 0; color: #000000; font-size: 13px; font-weight: 600; border-bottom: 1px solid #E8E5DF;">${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #7a7265; font-size: 13px;">Mobile</td>
                <td style="padding: 10px 0; font-size: 13px;">
                  <a href="tel:${mobile}" style="color: #5BC2E7; font-weight: 600;">${mobile}</a>
                </td>
              </tr>
            </table>
          </div>
          <div style="padding: 20px 32px; background: #F8F9FA; border: 1px solid #E8E5DF; border-top: none;">
            <p style="font-size: 11px; color: #a2b0aa; margin: 0;">Submitted via the Spinelli Opening Party RSVP page.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend opening party error:", JSON.stringify(error));
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Opening party API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
