import { UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ButtonLink } from "@/components/site/Button";
import { DownloadButton } from "@/components/site/DownloadButton";
import styles from "./Closing.module.css";

export function Closing() {
  const t = useTranslations("home.closing");
  return (
    <section className={`container ${styles.closing}`} aria-labelledby="closing-title">
      <Image className={styles.icon} src="/app-icon.png" alt="" width={56} height={56} />
      <h2 id="closing-title" className={styles.title}>
        {t("title")}
      </h2>
      <p className={styles.body}>{t("body")}</p>
      <div className={styles.actions}>
        <DownloadButton />
        <ButtonLink href="/sign-in" size="lg" variant="secondary" icon={<UserRound />}>
          {t("account")}
        </ButtonLink>
      </div>
    </section>
  );
}
