import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { DOC_GROUPS, type DocMeta } from "@/lib/content";
import { MobileDocsNav } from "./MobileDocsNav";
import styles from "./docs.module.css";

export function DocsNav({ docs, current }: { docs: DocMeta[]; current: string }) {
  const t = useTranslations("docs");
  return (
    <>
      <nav className={styles.side} aria-label={t("nav")}>
        {DOC_GROUPS.map((g) => (
          <div key={g}>
            <p className={styles.groupLabel}>{t(`groups.${g}`)}</p>
            <ul>
              {docs
                .filter((d) => d.group === g)
                .map((d) => (
                  <li key={d.slug}>
                    <Link href={`/docs/${d.slug}`} aria-current={d.slug === current ? "page" : undefined}>
                      {d.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className={styles.mobileNav}>
        <MobileDocsNav label={t("nav")} current={current} options={DOC_GROUPS.map((g) => ({ label: t(`groups.${g}`), docs: docs.filter((d) => d.group === g).map((d) => ({ slug: d.slug, title: d.title })) }))} />
      </div>
    </>
  );
}
