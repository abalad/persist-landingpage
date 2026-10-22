import type { PlanId } from "./plans";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ytmpopebhdtnucdznfsz.supabase.co";
/** Publishable by design: the desktop app ships the same key. Row-level security guards the data. */
export const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_O6TCB8NFNzTgx9Ma6TCnFQ_cE3-jDgR";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://persist-landingpage.vercel.app";

/**
 * Where "talk to us" leads. With no address configured yet, Enterprise
 * interest is recorded on the visitor's account instead, and there is no
 * general contact link at all.
 */
export function contactHref(topic: "enterprise" | "contact", email = process.env.NEXT_PUBLIC_CONTACT_EMAIL): string | null {
  const address = email?.trim();
  if (address) {
    const subject = topic === "enterprise" ? "Persist Enterprise" : "Persist";
    return `mailto:${address}?subject=${encodeURIComponent(subject)}`;
  }
  return topic === "enterprise" ? `/sign-in?next=${encodeURIComponent("/account")}&interest=enterprise` : null;
}

/** Billing is not wired yet (Stripe comes next); the button exists and does nothing, by decision. */
export function subscribe(plan: PlanId): void {
  void plan;
}
