import { ArrowDown, Gift, ShieldCheck, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/site/Button";
import { DownloadButton } from "@/components/site/DownloadButton";
import { HeroStudio } from "./HeroStudio";
import styles from "./Hero.module.css";

const FACT_ICONS = [ShieldCheck, Gift];

/** The statement and its actions beside the studio, with the two facts as its base. */
export function Hero() {
  const t = useTranslations("home.hero");
  const facts = t.raw("facts") as { title: string; body: string }[];
  return (
    <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
      <div className={styles.split}>
        <div className={styles.head}>
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
          <a className={styles.crashLink} href="#recovery">
            {t("crashLink")}
            <ArrowDown aria-hidden="true" />
          </a>
        </div>
        <div className={styles.stage}>
          <HeroStudio />
        </div>
        <ul className={styles.facts}>
          {facts.map((fact, i) => {
            const Icon = FACT_ICONS[i] ?? ShieldCheck;
            return (
              <li key={fact.title} className={styles.fact}>
                <Icon aria-hidden="true" />
                <span>
                  <strong>{fact.title}</strong>
                  {fact.body}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
