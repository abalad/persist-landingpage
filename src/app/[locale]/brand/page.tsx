import { ArrowDownToLine } from "lucide-react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { Symbol } from "@/components/site/Symbol";
import type { Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo";
import styles from "./brand.module.css";

export async function generateMetadata({ params }: PageProps<"/[locale]/brand">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brand.meta" });
  return { title: t("title"), description: t("description"), alternates: alternatesFor(locale as Locale, "/brand") };
}

const FILES = [
  { kind: "logo", ground: "dark", base: "persisty-logo", png: true },
  { kind: "logo", ground: "light", base: "persisty-logo-on-light", png: true },
  { kind: "mark", ground: "dark", base: "persisty-symbol", png: true },
  { kind: "mark", ground: "light", base: "persisty-symbol-on-light", png: true },
  { kind: "logo", ground: "white", base: "persisty-logo-white", png: false },
  { kind: "logo", ground: "black", base: "persisty-logo-black", png: false },
  { kind: "icon", ground: "dark", base: "persisty-app-icon", png: true },
] as const;

const SWATCHES = [
  { key: "lime", hex: "#C6F24E" },
  { key: "limeLight", hex: "#6E9A00" },
  { key: "paper", hex: "#F4F2EE" },
  { key: "ink", hex: "#111318" },
  { key: "graphite", hex: "#1A1D24" },
] as const;

const GROUND: Record<string, string> = { dark: "#111318", light: "#F6F5F2", white: "#2F64F0", black: "#E9EAEE" };

export default function BrandPage({ params }: PageProps<"/[locale]/brand">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("brand");

  return (
    <>
      <PageHeader title={t("title")} body={t("body")} />

      <section className={`container ${styles.symbolSection}`} aria-labelledby="b-symbol">
        <div className={styles.symbolStage}>
          <Symbol size={180} spin title="Persisty" />
        </div>
        <div className={styles.symbolText}>
          <h2 id="b-symbol" className={styles.h2}>
            {t("symbol.title")}
          </h2>
          <p>{t("symbol.body")}</p>
        </div>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="b-files">
        <h2 id="b-files" className={styles.h2}>
          {t("files.title")}
        </h2>
        <ul className={styles.files}>
          {FILES.map((f) => (
            <li key={f.base} className={styles.file}>
              <div className={styles.preview} style={{ background: GROUND[f.ground] }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/brand/${f.base}.svg`} alt="" className={f.kind === "logo" ? styles.previewLogo : styles.previewMark} />
              </div>
              <div className={styles.fileMeta}>
                <span className={styles.fileName}>
                  {t(`files.${f.kind}`)} · {t(`files.${f.ground}`)}
                </span>
                <span className={styles.links}>
                  <a href={`/brand/${f.base}.svg`} download>
                    <ArrowDownToLine aria-hidden="true" />
                    {t("files.svg")}
                  </a>
                  {f.png ? (
                    <a href={`/brand/${f.base}.png`} download>
                      <ArrowDownToLine aria-hidden="true" />
                      {t("files.png")}
                    </a>
                  ) : null}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="b-colors">
        <h2 id="b-colors" className={styles.h2}>
          {t("colors.title")}
        </h2>
        <ul className={styles.swatches}>
          {SWATCHES.map((s) => (
            <li key={s.key}>
              <span className={styles.chip} style={{ background: s.hex }} />
              <strong>{t(`colors.${s.key}`)}</strong>
              <code>{s.hex}</code>
              <span>{t(`colors.${s.key}Hint`)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={`container ${styles.section} ${styles.rules}`} aria-label={t("rules.title")}>
        <div>
          <h2 className={styles.h2}>{t("rules.title")}</h2>
          <ul>
            {(t.raw("rules.items") as string[]).map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={styles.h2}>{t("donts.title")}</h2>
          <ul>
            {(t.raw("donts.items") as string[]).map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
