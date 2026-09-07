/**
 * NSW Transfer Duty (Stamp Duty) Calculator
 * Deterministic application logic — the AI model never calculates duty itself.
 * Rates sourced from Revenue NSW, effective 2026/2027 financial year.
 * Update CHAT_CONFIG.stampDuty when Revenue NSW publishes new rates.
 */
import { CHAT_CONFIG } from "./chat-config";

export interface DutyInput {
  purchasePrice: number;
  isVacantLand?: boolean;
  isFirstHomeBuyer?: boolean;
  /** Whether FHB eligibility questions have been asked and answered positively */
  fhbEligibilityConfirmed?: boolean;
}

export interface DutyResult {
  purchasePrice: number;
  standardDuty: number;
  fhbDuty: number | null;
  fhbSaving: number | null;
  isPremium: boolean;
  isEligibleForFhbScheme: boolean;
  disclaimer: string;
  ratesDate: string;
}

/** Calculate standard NSW transfer duty for a given property value */
export function calculateStandardDuty(price: number): number {
  const { generalBands, premiumThreshold, premiumBase, premiumRate } = CHAT_CONFIG.stampDuty;

  if (price <= 0) return 0;

  // Premium residential
  if (price > premiumThreshold) {
    return premiumBase + ((price - premiumThreshold) / 100) * premiumRate;
  }

  // Find the applicable band (last band whose threshold <= price)
  let duty = 0;
  for (let i = generalBands.length - 1; i >= 0; i--) {
    const [threshold, base, rate] = generalBands[i];
    if (price > threshold) {
      duty = base + ((price - threshold) / 100) * rate;
      break;
    }
  }

  return Math.round(duty);
}

/** Calculate FHB concessional duty for eligible purchases between $800k–$1m residential */
function calculateFHBConcessionDuty(price: number, isVacantLand: boolean): number | null {
  const {
    fhbExemptBelow,
    fhbConcessionBelow,
    fhbVacantLandExemptBelow,
    fhbVacantLandConcessionBelow,
  } = CHAT_CONFIG.stampDuty;

  if (isVacantLand) {
    if (price <= fhbVacantLandExemptBelow) return 0;
    if (price < fhbVacantLandConcessionBelow) {
      const fullDuty = calculateStandardDuty(price);
      // Concessional: proportional reduction
      return Math.round(fullDuty * (price - fhbVacantLandExemptBelow) / (fhbVacantLandConcessionBelow - fhbVacantLandExemptBelow));
    }
    return null;
  }

  // Residential
  if (price <= fhbExemptBelow) return 0;
  if (price < fhbConcessionBelow) {
    const fullDuty = calculateStandardDuty(price);
    return Math.round(fullDuty * (price - fhbExemptBelow) / (fhbConcessionBelow - fhbExemptBelow));
  }
  return null; // No concession above threshold
}

export function calculateDuty(input: DutyInput): DutyResult {
  const { purchasePrice, isVacantLand = false, isFirstHomeBuyer = false, fhbEligibilityConfirmed = false } = input;
  const { premiumThreshold, fhbConcessionBelow, fhbVacantLandConcessionBelow, lastUpdated } = CHAT_CONFIG.stampDuty;

  const standardDuty = calculateStandardDuty(purchasePrice);
  const isPremium = purchasePrice > premiumThreshold;

  const fhbThreshold = isVacantLand ? fhbVacantLandConcessionBelow : fhbConcessionBelow;
  const isEligibleForFhbScheme = isFirstHomeBuyer && purchasePrice < fhbThreshold;

  let fhbDuty: number | null = null;
  let fhbSaving: number | null = null;

  if (isFirstHomeBuyer && fhbEligibilityConfirmed && isEligibleForFhbScheme) {
    fhbDuty = calculateFHBConcessionDuty(purchasePrice, isVacantLand);
    if (fhbDuty !== null) {
      fhbSaving = standardDuty - fhbDuty;
    }
  }

  return {
    purchasePrice,
    standardDuty,
    fhbDuty,
    fhbSaving,
    isPremium,
    isEligibleForFhbScheme,
    disclaimer: "This is an estimate only and does not constitute legal or financial advice. Duty rates are subject to change. Always confirm your liability with Revenue NSW and your solicitor or conveyancer.",
    ratesDate: lastUpdated,
  };
}

/** Format a number as Australian currency */
export function formatAUD(n: number): string {
  return "$" + new Intl.NumberFormat("en-AU", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
}

/** Calculate basic deposit amounts */
export function calculateDeposit(purchasePrice: number): { p5: number; p10: number; p20: number } {
  return {
    p5: Math.round(purchasePrice * 0.05),
    p10: Math.round(purchasePrice * 0.10),
    p20: Math.round(purchasePrice * 0.20),
  };
}

export interface RentalYieldResult {
  purchasePrice: number;
  weeklyRent: number;
  annualRent: number;
  grossYieldPct: number;
  /** Rough net yield after ~25% allowance for rates, insurance, management, maintenance */
  netYieldPct: number;
  cashflowWeekly: number; // rough cash flow after mortgage (at 6.5%, 30yr, 80% LVR)
}

/** Calculate gross and rough net rental yield */
export function calculateRentalYield(purchasePrice: number, weeklyRent: number): RentalYieldResult {
  const annualRent = weeklyRent * 52;
  const grossYieldPct = (annualRent / purchasePrice) * 100;
  // Approximate: 25% of gross rent for expenses (rates, insurance, management ~8.8%, maintenance)
  const netYieldPct = grossYieldPct * 0.75;
  // Rough cash flow: annual rent minus mortgage payments (80% LVR, 6.5%, 30yr)
  const loanAmount = purchasePrice * 0.8;
  const r = 0.065 / 52;
  const n = 30 * 52;
  const weeklyMortgage = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const cashflowWeekly = weeklyRent - weeklyMortgage;
  return {
    purchasePrice,
    weeklyRent,
    annualRent,
    grossYieldPct: Math.round(grossYieldPct * 100) / 100,
    netYieldPct: Math.round(netYieldPct * 100) / 100,
    cashflowWeekly: Math.round(cashflowWeekly),
  };
}

/** Calculate indicative monthly/fortnightly/weekly repayments */
export function calculateRepayment(input: {
  loanAmount: number;
  annualRate: number; // e.g. 6.5 for 6.5%
  termYears: number;
  frequency: "monthly" | "fortnightly" | "weekly";
}): number {
  const { loanAmount, annualRate, termYears, frequency } = input;
  const periodsPerYear = frequency === "monthly" ? 12 : frequency === "fortnightly" ? 26 : 52;
  const r = annualRate / 100 / periodsPerYear;
  const n = termYears * periodsPerYear;
  if (r === 0) return Math.round(loanAmount / n);
  const repayment = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(repayment);
}
