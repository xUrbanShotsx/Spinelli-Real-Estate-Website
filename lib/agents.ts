/**
 * Agent lookup for Spinelli AI.
 * Maps enquiry types and suburbs to the right team member.
 * Update when team changes — source of truth is lib/data.ts `team` array.
 */
import { team } from "./data";
import type { TeamMember } from "./types";

export type AgentRole = "sales" | "property-management" | "accounts" | "general";

export interface AgentCard {
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
  profileUrl: string;
  bio?: string;
}

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

function memberToCard(m: TeamMember): AgentCard {
  return {
    name: m.name,
    role: m.role,
    phone: m.phone,
    email: m.email,
    image: m.image,
    profileUrl: `/team/${toSlug(m.name)}`,
    bio: m.bio,
  };
}

// Map each team member name → role category
const ROLE_MAP: Record<string, AgentRole> = {
  "Paul Spinelli":  "sales",
  "Adam Spinelli":  "sales",
  "Jye Sanjurjo":   "sales",
  "Zoe Porritt":    "property-management",
  "Samantha Foy":   "property-management",
  "Lilly Ashton":   "property-management",
  "Tahlia Spinelli":"property-management",
  "Kellie Spinelli":"accounts",
  "Vicki Taddeo":   "accounts",
};

/** Return the agents best suited for a given enquiry type */
export function getAgentsForRole(role: AgentRole): AgentCard[] {
  return team
    .filter(m => ROLE_MAP[m.name] === role)
    .map(memberToCard);
}

/** Find agent(s) by name fragment (case-insensitive) */
export function findAgentByName(query: string): AgentCard[] {
  const q = query.toLowerCase();
  return team
    .filter(m => m.name.toLowerCase().includes(q))
    .map(memberToCard);
}

/**
 * Main lookup used by the AI tool.
 * Returns up to 2 relevant agents based on the enquiry type.
 */
export function lookupAgent(params: {
  enquiryType?: "sales" | "buy" | "sell" | "rent" | "property-management" | "commercial" | "general";
  nameQuery?: string;
}): AgentCard[] {
  const { enquiryType, nameQuery } = params;

  if (nameQuery) {
    const found = findAgentByName(nameQuery);
    if (found.length) return found.slice(0, 2);
  }

  if (!enquiryType || enquiryType === "general") {
    return getAgentsForRole("sales").slice(0, 2);
  }

  if (enquiryType === "property-management" || enquiryType === "rent") {
    return getAgentsForRole("property-management").slice(0, 2);
  }

  // sales / buy / sell / commercial
  return getAgentsForRole("sales").slice(0, 2);
}
