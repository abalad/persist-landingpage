import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { FaqSection } from "@/components/home/FaqSection";
import { CompareTable } from "@/components/pricing/CompareTable";
import { PlanCards } from "@/components/pricing/PlanCards";
import type { FaqItem } from "@/components/site/Faq";
import { PageHeader } from "@/components/site/PageHeader";
import type { Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo";
import styles from "./pricing.module.css";

export async function generateMetadata({ params }: PageProps<"/[locale]/pricing">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing.meta" });
  return { title: t("title"), description: t("description"), alternates: alternatesFor(locale as Locale, "/pricing") };
}

export default function PricingPage({ params }: PageProps<"/[locale]/pricing">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("pricing");
  return (
    <>
      <PageHeader title={t("title")} body={t("body")} center />
      <section className={`container ${styles.plans}`} aria-label={t("title")}>
        <PlanCards withFeatures />
      </section>
      <section className={`container ${styles.compare}`} aria-labelledby="compare-title">
        <h2 id="compare-title" className={styles.h2}>
          {t("compare.title")}
        </h2>
        <CompareTable />
      </section>
      <FaqSection title={t("faq.title")} items={t.raw("faq.items") as FaqItem[]} />
    </>
  );
}
