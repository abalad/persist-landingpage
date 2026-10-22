import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/** "Persist" as the product name: the word without the y (Persistence, persisted and code paths are lowercase). */
const OLD_NAME = /\bPersist(?![a-z])/;

function files(dir: string, ext: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path, ext) : path.endsWith(ext) ? [path] : [];
  });
}

function offenders(paths: string[]): string[] {
  return paths.flatMap((p) =>
    readFileSync(p, "utf8")
      .split("\n")
      .map((line, i) => [line, i + 1] as const)
      .filter(([line]) => OLD_NAME.test(line))
      .map(([line, n]) => `${p}:${n}: ${line.trim().slice(0, 80)}`),
  );
}

describe("the Persisty name", () => {
  it("is the only product name in the messages", () => {
    expect(offenders(files("messages", ".json"))).toEqual([]);
  });

  it("is the only product name in docs, changelog and legal pages", () => {
    expect(offenders(files("content", ".md"))).toEqual([]);
  });

  it("is the only product name in the site's code", () => {
    expect(offenders([...files("src", ".tsx"), ...files("src", ".ts")])).toEqual([]);
  });
});

describe("the brand kit", () => {
  it("ships the symbol, the logo and the app icon", () => {
    for (const f of ["persisty-symbol.svg", "persisty-symbol-on-light.svg", "persisty-logo.svg", "persisty-logo-on-light.svg", "persisty-app-icon.png", "persisty-favicon.svg"]) {
      expect(existsSync(join("public/brand", f)), f).toBe(true);
    }
  });

  it("uses lime as the accent", () => {
    expect(readFileSync("src/styles/tokens.css", "utf8")).toMatch(/--color-accent:\s*#C6F24E/i);
  });
});
