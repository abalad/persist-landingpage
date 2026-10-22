import styles from "./Faq.module.css";

export interface FaqItem {
  q: string;
  a: string;
}

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <details key={item.q} className={styles.item} name="faq">
          <summary className={styles.question}>
            {item.q}
            <span className={styles.mark} aria-hidden="true" />
          </summary>
          <p className={styles.answer}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
