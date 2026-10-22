import { describe, expect, it } from "vitest";
import { readdirSync } from "node:fs";
import { loadMessages, NAMESPACES } from "../src/i18n/messages";
import { routing } from "../src/i18n/routing";

type Tree = { [key: string]: string | Tree | Tree[] | string[] };

function leaves(tree: unknown, prefix = ""): Map<string, unknown> {
  const out = new Map<string, unknown>();
  if (tree !== null && typeof tree === "object") {
    for (const [key, value] of Object.entries(tree as Tree)) {
      const path = prefix ? `${prefix}.${key}` : key;
      if (value !== null && typeof value === "object") {
        for (const [p, v] of leaves(value, path)) out.set(p, v);
      } else {
        out.set(path, value);
      }
    }
  }
  return out;
}

const catalogs = Object.fromEntries(await Promise.all(routing.locales.map(async (l) => [l, await loadMessages(l)] as const)));
const reference = leaves(catalogs["pt-BR"]);

describe("message catalogs", () => {
  it("loads every namespace file that exists on disk", () => {
    for (const locale of routing.locales) {
      const files = readdirSync(`messages/${locale}`).map((f) => f.replace(/\.json$/, ""));
      expect([...files].sort()).toEqual([...NAMESPACES].sort());
    }
  });

  for (const [locale, catalog] of Object.entries(catalogs)) {
    const own = leaves(catalog);

    it(`${locale} has every key pt-BR has, and no extra ones`, () => {
      expect([...own.keys()].sort()).toEqual([...reference.keys()].sort());
    });

    it(`${locale} has no empty strings`, () => {
      const empty = [...own].filter(([, v]) => typeof v === "string" && v.trim() === "").map(([k]) => k);
      expect(empty).toEqual([]);
    });
  }
});
