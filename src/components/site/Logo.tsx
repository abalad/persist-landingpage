import Image from "next/image";
import { Link } from "@/i18n/navigation";
import styles from "./Nav.module.css";

export function Logo({ label }: { label: string }) {
  return (
    <Link href="/" className={styles.logo} aria-label={label}>
      <Image src="/app-icon.png" alt="" width={26} height={26} priority />
      <span className={styles.wordmark}>Persist</span>
    </Link>
  );
}
