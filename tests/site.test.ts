import { describe, expect, it } from "vitest";
import { contactHref, subscribe } from "../src/lib/site";

describe("contactHref", () => {
  it("opens an e-mail about Enterprise when an address is configured", () => {
    expect(contactHref("enterprise", "vendas@persist.example")).toBe("mailto:vendas@persist.example?subject=Persisty%20Enterprise");
  });

  it("opens a general e-mail when an address is configured", () => {
    expect(contactHref("contact", "vendas@persist.example")).toBe("mailto:vendas@persist.example?subject=Persisty");
  });

  it("without an address, sends Enterprise interest through the account", () => {
    expect(contactHref("enterprise", "")).toBe("/sign-in?next=%2Faccount&interest=enterprise");
  });

  it("without an address, offers no general contact", () => {
    expect(contactHref("contact", undefined)).toBeNull();
  });
});

describe("subscribe", () => {
  it("does nothing yet: billing arrives with Stripe", () => {
    expect(subscribe("pro")).toBeUndefined();
  });
});
