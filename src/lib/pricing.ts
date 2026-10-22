import type { Locale } from "@/i18n/routing";

/** Spanish readers here are mostly in Latin America, so es follows Argentina's US$ 19,90. */
const NUMBER_LOCALE: Record<Locale, string> = { "pt-BR": "pt-BR", en: "en-US", es: "es-AR" };

export function formatPrice(locale: Locale, cents: number): string {
  return new Intl.NumberFormat(NUMBER_LOCALE[locale], { style: "currency", currency: "USD" }).format(cents / 100);
}
