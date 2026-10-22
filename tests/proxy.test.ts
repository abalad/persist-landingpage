import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import proxy from "../src/proxy";

function visit(path: string, headers: Record<string, string> = {}) {
  return proxy(new NextRequest(new URL(path, "https://persist.example"), { headers }));
}

describe("locale routing", () => {
  it("serves Portuguese at the root without a prefix", () => {
    const res = visit("/", { "accept-language": "pt-BR,pt;q=0.9" });
    expect(res.headers.get("location")).toBeNull();
  });

  it("sends a Spanish browser from Argentina to /es", () => {
    const res = visit("/", { "accept-language": "es-AR,es;q=0.9" });
    expect(new URL(res.headers.get("location")!).pathname).toBe("/es");
  });

  it("sends a British English browser to /en", () => {
    const res = visit("/pricing", { "accept-language": "en-GB,en;q=0.8" });
    expect(new URL(res.headers.get("location")!).pathname).toBe("/en/pricing");
  });

  it("lets a saved choice win over the browser language", () => {
    const res = visit("/", { "accept-language": "en-US", cookie: "NEXT_LOCALE=pt-BR" });
    expect(res.headers.get("location")).toBeNull();
  });

  it("falls back to Portuguese for a language the site does not have", () => {
    const res = visit("/", { "accept-language": "de-DE" });
    expect(res.headers.get("location")).toBeNull();
  });
});
