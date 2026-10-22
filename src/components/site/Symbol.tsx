import styles from "./Symbol.module.css";

/**
 * The Orbita symbol: a p whose bowl is an open orbit, and the lime dot that
 * travels it. `spin` turns the orbit slowly; reduced motion keeps it still.
 */
export function Symbol({ size = 28, spin = false, title }: { size?: number; spin?: boolean; title?: string }) {
  return (
    <svg className={styles.symbol} viewBox="8 10 48 50" width={size} height={size} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <rect x="13" y="19" width="9" height="36" rx="4.5" fill="currentColor" />
      <g className={spin ? styles.spin : undefined}>
        <circle cx="33.5" cy="31" r="12" fill="none" stroke="currentColor" strokeWidth="9" strokeDasharray="58.4 17" transform="rotate(-1 33.5 31)" />
        <circle cx="42.4" cy="22.9" r="5.2" fill="var(--color-accent)" />
      </g>
    </svg>
  );
}
