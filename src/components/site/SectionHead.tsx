import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./SectionHead.module.css";

interface SectionHeadProps {
  id?: string;
  title: ReactNode;
  body: ReactNode;
  meta?: ReactNode;
  link?: { href: string; label: string };
}

/** Title on the left; what it means and where to read more on the right. */
export function SectionHead({ id, title, body, meta, link }: SectionHeadProps) {
  return (
    <div className={styles.head}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      <div className={styles.side}>
        {meta ? <div className={styles.meta}>{meta}</div> : null}
        <p className={styles.body}>{body}</p>
        {link ? (
          <Link className={styles.link} href={link.href}>
            {link.label}
            <ArrowRight aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
