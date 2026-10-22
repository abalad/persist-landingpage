"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import styles from "./LocaleSwitcher.module.css";

/** Each language in its own name, so anyone can find theirs. */
const NAMES: Record<Locale, { name: string; short: string }> = {
  "pt-BR": { name: "Português", short: "PT" },
  en: { name: "English", short: "EN" },
  es: { name: "Español", short: "ES" },
};

export function LocaleSwitcher({ placement = "down" }: { placement?: "down" | "up" }) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={styles.root} ref={root}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={t("language")}
        onClick={() => setOpen((v) => !v)}
      >
        <Globe aria-hidden="true" />
        {NAMES[locale].short}
        <ChevronDown className={styles.chevron} aria-hidden="true" />
      </button>
      {open ? (
        <ul className={`${styles.menu} ${placement === "up" ? styles.up : ""}`}>
          {routing.locales.map((l) => (
            <li key={l}>
              <Link
                className={styles.option}
                href={pathname}
                locale={l}
                hrefLang={l}
                lang={l}
                aria-current={l === locale ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                {NAMES[l].name}
                {l === locale ? <Check aria-hidden="true" /> : null}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
