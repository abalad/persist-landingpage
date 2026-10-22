import { useTranslations } from "next-intl";
import Image from "next/image";
import { SectionHead } from "@/components/site/SectionHead";
import styles from "./Studio.module.css";

/** Each card's still: the desktop app's mascot, rendered from the app's own 3D studio. */
const ART = ["project", "desk", "wave", "tests"] as const;

/** Four things the app does, each shown by its mascot at work. */
export function Studio() {
  const t = useTranslations("home.studio");
  const items = t.raw("items") as { title: string; body: string }[];
  return (
    <section className={styles.section} aria-labelledby="studio">
      <div className="container">
        <SectionHead id="studio" title={t("title")} body={t("body")} />
        <ul className={styles.grid}>
          {items.map((item, i) => (
            <li key={item.title} className={styles.card}>
              <Image className={styles.art} src={`/art/${ART[i]}.webp`} alt="" width={640} height={400} sizes="(max-width: 820px) 90vw, 320px" />
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
