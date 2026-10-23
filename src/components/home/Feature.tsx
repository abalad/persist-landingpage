import type { ReactNode } from "react";
import { SectionHead } from "@/components/site/SectionHead";
import styles from "./Feature.module.css";

interface FeatureProps {
  id: string;
  title: string;
  body?: string;
  /** On the right of the title, after the body. */
  aside?: ReactNode;
  meta?: ReactNode;
  link?: { href: string; label: string };
  narrow?: boolean;
  children?: ReactNode;
}

/** One claim, then the app proving it. */
export function Feature({ id, title, body, aside, meta, link, narrow, children }: FeatureProps) {
  return (
    <section className={styles.section} aria-labelledby={id}>
      <div className="container">
        <SectionHead id={id} title={title} body={body} meta={meta} link={link}>
          {aside}
        </SectionHead>
        {children ? <div className={`${styles.visual} ${narrow ? styles.narrow : ""}`}>{children}</div> : null}
      </div>
    </section>
  );
}
