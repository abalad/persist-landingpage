import { Faq, type FaqItem } from "@/components/site/Faq";
import styles from "./FaqSection.module.css";
import feature from "./Feature.module.css";

export function FaqSection({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <section className={feature.section} aria-labelledby="faq-title">
      <div className={`container ${styles.grid}`}>
        <h2 id="faq-title" className={styles.title}>
          {title}
        </h2>
        <Faq items={items} />
      </div>
    </section>
  );
}
