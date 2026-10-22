"use client";

import { ArrowDownToLine, Bell, Laptop, Monitor, TerminalSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Badge } from "@/components/site/Badge";
import { ButtonLink } from "@/components/site/Button";
import { usePlatform } from "@/components/site/DownloadButton";
import { PLATFORM_ORDER, RELEASES, type DesktopPlatform } from "@/lib/releases";
import styles from "./Platforms.module.css";

const GLYPH: Record<DesktopPlatform, ReactNode> = {
  mac: <Laptop />,
  windows: <Monitor />,
  linux: <TerminalSquare />,
};

export function Platforms() {
  const t = useTranslations("download");
  const mine = usePlatform();
  const order = [...PLATFORM_ORDER].sort((a, b) => Number(b === mine) - Number(a === mine));

  return (
    <ul className={styles.list}>
      {order.map((p) => {
        const release = RELEASES[p];
        return (
          <li key={p} id={p} className={`${styles.row} ${p === mine ? styles.mine : ""}`}>
            <span className={styles.glyph} aria-hidden="true">
              {GLYPH[p]}
            </span>
            <div className={styles.main}>
              <div className={styles.nameLine}>
                <span className={styles.name}>{t(`platforms.${p}.name`)}</span>
                <span className={styles.detail}>{t(`platforms.${p}.detail`)}</span>
                {release.status === "soon" ? <Badge status="in-development" /> : null}
                {p === mine ? <span className={styles.yours}>{t("yours")}</span> : null}
              </div>
              <p className={styles.note}>{t(`platforms.${p}.note`)}</p>
            </div>
            <div className={styles.action}>
              {release.status === "available" && release.url ? (
                <ButtonLink href={release.url} variant={p === mine ? "primary" : "secondary"} icon={<ArrowDownToLine />}>
                  {t("download")}
                </ButtonLink>
              ) : (
                <ButtonLink href={`/sign-in?next=${encodeURIComponent("/account")}&notify=${p}`} variant={p === mine ? "primary" : "secondary"} icon={<Bell />}>
                  {t("notify")}
                </ButtonLink>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
