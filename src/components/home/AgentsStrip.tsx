import { Bot, Sparkles, TerminalSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import styles from "./AgentsStrip.module.css";

const ICONS = [
  <Sparkles key="c" style={{ color: "var(--color-accent)" }} />,
  <Bot key="x" style={{ color: "var(--site-muted)" }} />,
  <TerminalSquare key="t" style={{ color: "var(--site-muted)" }} />,
];

export function AgentsStrip() {
  const t = useTranslations("home.agents");
  const items = t.raw("items") as { name: string; detail: string }[];
  return (
    <section className={`container ${styles.strip}`} aria-labelledby="agents-title">
      <h2 id="agents-title" className={styles.title}>
        {t("title")}
      </h2>
      <ul className={styles.list}>
        {items.map((item, i) => (
          <li key={item.name} className={styles.item}>
            <span className={styles.name}>
              <span aria-hidden="true">{ICONS[i]}</span>
              {item.name}
            </span>
            <span className={styles.detail}>{item.detail}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
