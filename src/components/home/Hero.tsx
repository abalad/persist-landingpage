import { UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { HeroApp } from "@/components/mockups/HeroApp";
import { ButtonLink } from "@/components/site/Button";
import { DownloadButton } from "@/components/site/DownloadButton";
import styles from "./Hero.module.css";

export function Hero() {
  const t = useTranslations("home.hero");
  return (
    <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
      <Image className={styles.icon} src="/app-icon.png" alt="" width={72} height={72} priority />
      <h1 id="hero-title" className={styles.title}>
        {t("title")}
      </h1>
      <p className={styles.body}>{t("body")}</p>
      <div className={styles.actions}>
        <DownloadButton />
        <ButtonLink href="/sign-in" size="lg" variant="secondary" icon={<UserRound />}>
          {t("account")}
        </ButtonLink>
      </div>
      <p className={styles.note}>{t("note")}</p>
      <div className={styles.window}>
        <HeroApp />
      </div>
    </section>
  );
}
