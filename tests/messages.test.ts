import { describe, expect, it } from "vitest";
import en from "../messages/en.json";
import es from "../messages/es.json";
import ptBR from "../messages/pt-BR.json";

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

const catalogs = { "pt-BR": ptBR, en, es };
const reference = leaves(ptBR);

describe("message catalogs", () => {
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
