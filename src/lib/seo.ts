import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

/** The address of `path` in `locale`: Portuguese has no prefix, the others do. */
export function localizedPath(locale: Locale, path: string): string {
  if (locale === routing.defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Canonical address plus one hreflang entry per language, Portuguese as x-default. */
export function alternatesFor(locale: Locale, path: string): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = localizedPath(l, path);
  languages["x-default"] = localizedPath(routing.defaultLocale, path);
  return { canonical: localizedPath(locale, path), languages };
}
