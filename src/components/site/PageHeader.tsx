import styles from "./PageHeader.module.css";

export function PageHeader({ title, body, center = false }: { title: string; body?: string; center?: boolean }) {
  return (
    <header className={`container ${styles.header} ${center ? styles.center : ""}`}>
      <h1 className={styles.title}>{title}</h1>
      {body ? <p className={styles.body}>{body}</p> : null}
    </header>
  );
}
