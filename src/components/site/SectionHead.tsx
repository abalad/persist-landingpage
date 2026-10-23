import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./SectionHead.module.css";

interface SectionHeadProps {
  id?: string;
  title: ReactNode;
  body?: ReactNode;
  meta?: ReactNode;
  link?: { href: string; label: string };
  /** Said on the right in place of, or after, the lead: a short list, say. */
  children?: ReactNode;
}

/** Title on the left; what it means and where to read more on the right. */
export function SectionHead({ id, title, body, meta, link, children }: SectionHeadProps) {
  return (
    <div className={styles.head}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      <div className={styles.side}>
        {meta ? <div className={styles.meta}>{meta}</div> : null}
        {body ? <p className={styles.body}>{body}</p> : null}
        {children}
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
