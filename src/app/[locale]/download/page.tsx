import { UserRound } from "lucide-react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Platforms } from "@/components/download/Platforms";
import { ButtonLink } from "@/components/site/Button";
import { PageHeader } from "@/components/site/PageHeader";
import type { Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo";
import styles from "./download.module.css";

export async function generateMetadata({ params }: PageProps<"/[locale]/download">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "download.meta" });
  return { title: t("title"), description: t("description"), alternates: alternatesFor(locale as Locale, "/download") };
}

export default function DownloadPage({ params }: PageProps<"/[locale]/download">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("download");
  const needs = t.raw("needs.items") as { title: string; body: string }[];
  return (
    <>
      <PageHeader title={t("title")} body={t("body")} />
      <section className="container" aria-label={t("title")}>
        <Platforms />
      </section>
      <section className={`container ${styles.needs}`} aria-labelledby="needs-title">
        <h2 id="needs-title" className={styles.h2}>
          {t("needs.title")}
        </h2>
        <ul className={styles.needList}>
          {needs.map((n) => (
            <li key={n.title}>
              <h3>{n.title}</h3>
              <p>{n.body}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className={`container ${styles.account}`} aria-labelledby="notify-title">
        <h2 id="notify-title" className={styles.h2}>
          {t("account.title")}
        </h2>
        <p>{t("account.body")}</p>
        <ButtonLink href={`/sign-in?next=${encodeURIComponent("/account")}&notify=any`} size="lg" icon={<UserRound />}>
          {t("account.cta")}
        </ButtonLink>
      </section>
    </>
  );
}
