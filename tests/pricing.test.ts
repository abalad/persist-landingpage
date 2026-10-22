import { describe, expect, it } from "vitest";
import { PLANS, planById } from "../src/lib/plans";
import { formatPrice } from "../src/lib/pricing";

const nbsp = " ";

describe("formatPrice", () => {
  it("writes dollars the Brazilian way in pt-BR", () => {
    expect(formatPrice("pt-BR", 990)).toBe(`US$${nbsp}9,90`);
  });

  it("writes dollars the American way in en", () => {
    expect(formatPrice("en", 990)).toBe("$9.90");
  });

  it("writes dollars the Latin American way in es", () => {
    expect(formatPrice("es", 1990)).toBe(`US$${nbsp}19,90`);
  });

  it("keeps whole prices with cents", () => {
    expect(formatPrice("en", 0)).toBe("$0.00");
  });
});

describe("plans", () => {
  it("prices Pro at 9.90 a month and Team at 19.90 per user", () => {
    expect(planById("pro")).toMatchObject({ priceCents: 990, billing: "month" });
    expect(planById("team")).toMatchObject({ priceCents: 1990, billing: "user-month" });
  });

  it("keeps Free free and Enterprise by contact", () => {
    expect(planById("free").priceCents).toBe(0);
    expect(planById("enterprise").priceCents).toBeNull();
  });

  it("lists the plans from smallest to largest", () => {
    expect(PLANS.map((p) => p.id)).toEqual(["free", "pro", "team", "enterprise"]);
  });

  it("marks every Team and Enterprise extra as not yet available", () => {
    for (const id of ["team", "enterprise"] as const) {
      expect(planById(id).features.every((f) => f.status !== "available")).toBe(true);
    }
  });
});
