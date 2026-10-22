import { Link } from "@/i18n/navigation";
import styles from "./Nav.module.css";
import { Symbol } from "./Symbol";

export function Logo({ label, spin = false }: { label: string; spin?: boolean }) {
  return (
    <Link href="/" className={styles.logo} aria-label={label}>
      <Symbol size={28} spin={spin} />
      <span className={styles.wordmark}>persisty</span>
    </Link>
  );
}
