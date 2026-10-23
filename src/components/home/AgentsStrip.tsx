import { Bot, Sparkles, TerminalSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import styles from "./AgentsStrip.module.css";

const ICONS = [
  <Sparkles key="c" style={{ color: "var(--color-accent)" }} />,
  <Bot key="x" style={{ color: "var(--site-muted)" }} />,
  <TerminalSquare key="t" style={{ color: "var(--site-muted)" }} />,
];

/** The window's caption: what runs inside it. The heading is there for screen readers only. */
export function AgentsStrip() {
  const t = useTranslations("home.agents");
  const items = t.raw("items") as { name: string; detail: string }[];
  return (
    <section className={`container ${styles.strip}`} aria-labelledby="agents-title">
      <h2 id="agents-title" className="visually-hidden">
        {t("title")}
      </h2>
      <ul className={styles.list}>
        {items.map((item, i) => (
          <li key={item.name} className={styles.item}>
            <span className={styles.icon} aria-hidden="true">
              {ICONS[i]}
            </span>
            <span className={styles.name}>{item.name}</span>
            <span className={styles.detail}>{item.detail}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
