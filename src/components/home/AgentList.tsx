import { useTranslations } from "next-intl";
import { AgentGlyph, type AgentKind } from "@/components/mockups/parts";
import styles from "./AgentList.module.css";

const KINDS: AgentKind[] = ["claude", "codex", "shell"];

/** What runs inside it, with the glyph each one wears in the window below. */
export function AgentList() {
  const t = useTranslations("home.agents");
  const items = t.raw("items") as { name: string; detail: string }[];
  return (
    <ul className={styles.list}>
      {items.map((item, i) => (
        <li key={item.name} className={styles.item}>
          <AgentGlyph kind={KINDS[i] ?? "shell"} />
          <span className={styles.name}>{item.name}</span>
          <span className={styles.detail}>{item.detail}</span>
        </li>
      ))}
    </ul>
  );
}
