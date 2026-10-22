import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPage, legalMetadata } from "@/components/site/LegalPage";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: PageProps<"/[locale]/security">): Promise<Metadata> {
  const { locale } = await params;
  return legalMetadata(locale as Locale, "security");
}

export default async function Page({ params }: PageProps<"/[locale]/security">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage locale={locale as Locale} slug="security" />;
}
