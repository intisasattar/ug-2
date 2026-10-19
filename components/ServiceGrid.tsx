import styles from "./ServiceGrid.module.css";

export type ServiceItem = { title: string; body: string };

/** Four-part numbered service layout with one considered navy panel. */
export function ServiceGrid({ items, featured = 1 }: { items: ServiceItem[]; featured?: number }) {
  return (
    <ol className={styles.grid} data-stagger="">
      {items.map((s, i) => (
        <li key={s.title} className={`${styles.item} ${i === featured ? `${styles.featured} bg-navy on-dark` : ""}`}>
          <span className={styles.num} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={styles.title}>{s.title}</h3>
          <p className={styles.body}>{s.body}</p>
          <span className={styles.line} aria-hidden="true" />
        </li>
      ))}
    </ol>
  );
}
