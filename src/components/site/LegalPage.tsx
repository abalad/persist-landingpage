import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { getLegal, type LegalSlug } from "@/lib/content";
import { alternatesFor } from "@/lib/seo";
import styles from "./LegalPage.module.css";

async function load(locale: Locale, slug: LegalSlug) {
  const t = await getTranslations({ locale, namespace: "legal" });
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  const contact = email ? t("contactWith", { email }) : t("contactPending");
  return { page: await getLegal(locale, slug, contact), t };
}

export async function legalMetadata(locale: Locale, slug: LegalSlug): Promise<Metadata> {
  const { page } = await load(locale, slug);
  if (!page) return {};
  return { title: page.title, description: page.description, alternates: alternatesFor(locale, `/${slug}`) };
}

export async function LegalPage({ locale, slug }: { locale: Locale; slug: LegalSlug }) {
  const { page, t } = await load(locale, slug);
  if (!page) notFound();
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${page.updated}T00:00:00Z`));
  return (
    <div className={`container ${styles.page}`}>
      <h1 className={styles.title}>{page.title}</h1>
      <p className={styles.meta}>{t("updated", { date })}</p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />
    </div>
  );
}
