"use client";

import type { ReactNode } from "react";
import type { PlanId } from "@/lib/plans";
import { subscribe } from "@/lib/site";
import { buttonClass, type ButtonVariant } from "./Button";

/** Wired to `subscribe`, which does nothing until billing exists. */
export function SubscribeButton({ plan, variant = "primary", children }: { plan: PlanId; variant?: ButtonVariant; children: ReactNode }) {
  return (
    <button type="button" className={buttonClass(variant, "md")} onClick={() => subscribe(plan)}>
      {children}
    </button>
  );
}
