import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import styles from "@/components/docs/docs.module.css";
import { PageHeader } from "@/components/site/PageHeader";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { DOC_GROUPS, listDocs } from "@/lib/content";
import { alternatesFor } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/docs">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "docs.meta" });
  return { title: t("title"), description: t("description"), alternates: alternatesFor(locale as Locale, "/docs") };
}

export default function DocsIndex({ params }: PageProps<"/[locale]/docs">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("docs");
  const docs = listDocs(locale as Locale);
  return (
    <>
      <PageHeader title={t("title")} body={t("body")} />
      <div className={`container ${styles.indexGroups}`}>
        {DOC_GROUPS.map((g) => (
          <section key={g} className={styles.indexGroup} aria-labelledby={`group-${g}`}>
            <h2 id={`group-${g}`}>{t(`groups.${g}`)}</h2>
            <ul>
              {docs
                .filter((d) => d.group === g)
                .map((d) => (
                  <li key={d.slug}>
                    <Link href={`/docs/${d.slug}`}>
                      <strong>{d.title}</strong>
                      <span>{d.description}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
