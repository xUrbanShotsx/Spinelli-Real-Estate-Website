/**
 * Lead capture service for Spinelli AI.
 * Submits to AgentBox CRM and sends email notification via Resend.
 * Falls back to email-only if CRM is unavailable — leads are never lost.
 */
import { Resend } from "resend";
import { CHAT_CONFIG } from "./chat-config";

export type LeadType =
  | "BUYER"
  | "SELLER_APPRAISAL"
  | "PROPERTY_ENQUIRY"
  | "PROPERTY_MANAGEMENT"
  | "RENTAL_ENQUIRY"
  | "COMMERCIAL_ENQUIRY"
  | "PROJECT_ENQUIRY"
  | "DEVELOPER"
  | "INSPECTION_REQUEST"
  | "GENERAL"
  | "AGENT_CALLBACK";

export type LeadScore = "HOT" | "WARM" | "NURTURE";

export interface LeadData {
  type: LeadType;
  score: LeadScore;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  propertyId?: string;
  propertyAddress?: string;
  suburb?: string;
  budget?: string;
  timeline?: string;
  conversationSummary?: string;
  pageUrl?: string;
  source: string;
}

const BASE = "https://api.agentboxcrm.com.au";

function agentboxHeaders() {
  return {
    "X-Client-ID": process.env.AGENTBOX_CLIENT_ID!,
    "X-API-Key": process.env.AGENTBOX_API_KEY!,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

const LEAD_TYPE_TO_CLASS: Record<LeadType, string> = {
  BUYER: "Prospective Buyer",
  SELLER_APPRAISAL: "Prospective Vendor",
  PROPERTY_ENQUIRY: "Prospective Buyer",
  PROPERTY_MANAGEMENT: "Prospective Landlord",
  RENTAL_ENQUIRY: "Prospective Tenant",
  COMMERCIAL_ENQUIRY: "Prospective Buyer",
  PROJECT_ENQUIRY: "Prospective Buyer",
  DEVELOPER: "Prospective Vendor",
  INSPECTION_REQUEST: "Prospective Buyer",
  GENERAL: "General Enquiry",
  AGENT_CALLBACK: "General Enquiry",
};

export async function submitLead(lead: LeadData): Promise<{ success: boolean; method: string }> {
  const { name, email, phone, message, conversationSummary, type, score, propertyAddress, pageUrl } = lead;
  const [firstName, ...lastParts] = name.trim().split(" ");
  const lastName = lastParts.join(" ") || ".";

  const fullComment = [
    `[Spinelli AI · ${type} · ${score}]`,
    propertyAddress ? `Property: ${propertyAddress}` : "",
    pageUrl ? `Page: ${pageUrl}` : "",
    message,
    conversationSummary ? `\nConversation summary: ${conversationSummary}` : "",
    "\nSource: Spinelli AI Website Concierge",
  ].filter(Boolean).join("\n");

  let crmSuccess = false;

  // 1. Try AgentBox CRM
  if (process.env.AGENTBOX_CLIENT_ID && process.env.AGENTBOX_API_KEY) {
    try {
      const contactClass = LEAD_TYPE_TO_CLASS[type] ?? "General Enquiry";
      const crmBody = {
        enquiry: {
          comment: fullComment,
          source: "Website",
          ...(lead.propertyId ? { listing: { id: lead.propertyId } } : {}),
          attachedContact: {
            firstName,
            lastName,
            email: email || "",
            phone: phone || "",
            mobile: phone || "",
            contactClasses: [{ name: contactClass }],
            actions: {
              attachListingAgents: !!lead.propertyId,
              addDefaultContactClasses: true,
              addDefaultSubscriptions: false,
              addDefaultRequirements: false,
            },
          },
        },
      };
      const crmRes = await fetch(`${BASE}/enquiries?version=2`, {
        method: "POST",
        headers: agentboxHeaders(),
        body: JSON.stringify(crmBody),
      });
      crmSuccess = crmRes.ok;
      if (!crmRes.ok) {
        console.error("Spinelli AI — AgentBox lead error:", crmRes.status, await crmRes.text());
      }
    } catch (err) {
      console.error("Spinelli AI — AgentBox lead exception:", err);
    }
  }

  // 2. Always send email notification
  let emailSuccess = false;
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const scoreColour = score === "HOT" ? "#e74c3c" : score === "WARM" ? "#f39c12" : "#27ae60";
    const { error } = await resend.emails.send({
      from: "Spinelli AI <onboarding@resend.dev>",
      to: [CHAT_CONFIG.office.leadEmail],
      replyTo: email || CHAT_CONFIG.office.email,
      subject: `${score} Lead — ${type.replace(/_/g, " ")} — ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#000">
          <div style="background:#5BC2E7;padding:20px 28px;display:flex;align-items:center;gap:12px">
            <h1 style="color:#fff;font-size:18px;font-weight:400;margin:0">Spinelli AI · New Lead</h1>
            <span style="background:${scoreColour};color:#fff;font-size:11px;font-weight:700;padding:3px 10px;border-radius:2px;margin-left:auto">${score}</span>
          </div>
          <div style="padding:24px 28px;border:1px solid #E8E5DF;border-top:none">
            <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
              <tr><td style="padding:7px 0;color:#7a7265;font-size:12px;width:140px">Lead Type</td><td style="padding:7px 0;font-size:13px;font-weight:600">${type.replace(/_/g, " ")}</td></tr>
              <tr><td style="padding:7px 0;color:#7a7265;font-size:12px">Name</td><td style="padding:7px 0;font-size:13px">${name}</td></tr>
              ${email ? `<tr><td style="padding:7px 0;color:#7a7265;font-size:12px">Email</td><td style="padding:7px 0;font-size:13px"><a href="mailto:${email}" style="color:#5BC2E7">${email}</a></td></tr>` : ""}
              ${phone ? `<tr><td style="padding:7px 0;color:#7a7265;font-size:12px">Phone</td><td style="padding:7px 0;font-size:13px"><a href="tel:${phone}" style="color:#5BC2E7">${phone}</a></td></tr>` : ""}
              ${propertyAddress ? `<tr><td style="padding:7px 0;color:#7a7265;font-size:12px">Property</td><td style="padding:7px 0;font-size:13px">${propertyAddress}</td></tr>` : ""}
              ${lead.budget ? `<tr><td style="padding:7px 0;color:#7a7265;font-size:12px">Budget</td><td style="padding:7px 0;font-size:13px">${lead.budget}</td></tr>` : ""}
              ${lead.timeline ? `<tr><td style="padding:7px 0;color:#7a7265;font-size:12px">Timeline</td><td style="padding:7px 0;font-size:13px">${lead.timeline}</td></tr>` : ""}
              ${pageUrl ? `<tr><td style="padding:7px 0;color:#7a7265;font-size:12px">Page</td><td style="padding:7px 0;font-size:13px"><a href="${pageUrl}" style="color:#5BC2E7">${pageUrl}</a></td></tr>` : ""}
            </table>
            ${conversationSummary ? `<div style="padding:14px 16px;background:#f0f9fd;border-left:3px solid #5BC2E7;font-size:13px;line-height:1.7;margin-bottom:16px"><strong>AI Summary</strong><br>${conversationSummary}</div>` : ""}
            <div style="padding:14px 16px;background:#f8f8f8;font-size:13px;line-height:1.7;white-space:pre-wrap">${message.replace(/</g,"&lt;")}</div>
          </div>
          <div style="padding:14px 28px;background:#f8f8f8;border:1px solid #E8E5DF;border-top:none">
            <p style="font-size:10px;color:#a2b0aa;margin:0">Spinelli AI Website Concierge · CRM submitted: ${crmSuccess ? "✓" : "✗ (email fallback)"}</p>
          </div>
        </div>`,
    });
    emailSuccess = !error;
    if (error) console.error("Spinelli AI — Resend lead error:", error);
  }

  return { success: crmSuccess || emailSuccess, method: crmSuccess ? "crm+email" : emailSuccess ? "email" : "failed" };
}
