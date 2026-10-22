import type { Intent } from "./auth";

/** The intent back as a query string, to survive the hop from sign-in to the account. */
export function intentQuery(intent: Intent): string {
  const q = new URLSearchParams();
  if (intent.notify) q.set("notify", intent.notify);
  if (intent.interest) q.set("interest", intent.interest);
  const s = q.toString();
  return s ? `?${s}` : "";
}
