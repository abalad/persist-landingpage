import { describe, expect, it } from "vitest";
import { alternatesFor, localizedPath } from "../src/lib/seo";

describe("localizedPath", () => {
  it("leaves Portuguese without a prefix", () => {
    expect(localizedPath("pt-BR", "/pricing")).toBe("/pricing");
    expect(localizedPath("pt-BR", "/")).toBe("/");
  });

  it("prefixes English and Spanish", () => {
    expect(localizedPath("en", "/pricing")).toBe("/en/pricing");
    expect(localizedPath("es", "/docs/agents")).toBe("/es/docs/agents");
  });

  it("drops the trailing slash of the home page", () => {
    expect(localizedPath("en", "/")).toBe("/en");
  });
});

describe("alternatesFor", () => {
  it("points each language at its own address and Portuguese as the default", () => {
    expect(alternatesFor("en", "/pricing")).toEqual({
      canonical: "/en/pricing",
      languages: { "pt-BR": "/pricing", en: "/en/pricing", es: "/es/pricing", "x-default": "/pricing" },
    });
  });
});
