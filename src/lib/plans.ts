import type { Availability } from "@/components/site/Badge";

export type PlanId = "free" | "pro" | "team" | "enterprise";

export interface PlanFeature {
  /** Key under `plans.features` in the messages. */
  id: string;
  status: Availability;
}

export interface Plan {
  id: PlanId;
  /** `null` means the price is agreed by contact. */
  priceCents: number | null;
  billing: "free" | "month" | "user-month" | "contact";
  /** Features this plan adds on top of the previous one. */
  features: PlanFeature[];
}

const available = (id: string): PlanFeature => ({ id, status: "available" });
const inDevelopment = (id: string): PlanFeature => ({ id, status: "in-development" });
const planned = (id: string): PlanFeature => ({ id, status: "planned" });

export const PLANS: Plan[] = [
  {
    id: "free",
    priceCents: 0,
    billing: "free",
    features: [
      available("projects"),
      available("persistentSessions"),
      available("recovery"),
      available("agentStates"),
      available("editorGit"),
      available("usage"),
      available("networkLog"),
      available("noAccount"),
    ],
  },
  {
    id: "pro",
    priceCents: 990,
    billing: "month",
    features: [
      available("accountRotation"),
      available("requestQueue"),
      available("restorePoints"),
      available("verifyOnFinish"),
      available("worktrees"),
      available("offlineLicense"),
      planned("growth"),
    ],
  },
  {
    id: "team",
    priceCents: 1990,
    billing: "user-month",
    features: [inDevelopment("teamBilling"), planned("teamBoard"), planned("finops"), planned("policies")],
  },
  {
    id: "enterprise",
    priceCents: null,
    billing: "contact",
    features: [planned("sso"), planned("modelGateway"), planned("selfHost"), planned("sourceReview")],
  },
];

export function planById(id: PlanId): Plan {
  const plan = PLANS.find((p) => p.id === id);
  if (!plan) throw new Error(`unknown plan ${id}`);
  return plan;
}
