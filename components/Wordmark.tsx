import styles from "./Wordmark.module.css";

/** Text wordmark used until an approved logo is supplied. */
export function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className={`${styles.mark} ${tone === "light" ? styles.light : ""}`} aria-hidden="true">
      <span className={styles.ug}>UG</span>
      <span className={styles.bar} />
      <span className={styles.global}>Global</span>
    </span>
  );
}
