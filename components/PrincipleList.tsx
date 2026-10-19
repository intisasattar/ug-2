import styles from "./Editorial.module.css";

export function PrincipleList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className={styles.principles} data-stagger="">
      {items.map((p, i) => (
        <li key={p.title} className={styles.principle}>
          <span className={styles.principleNum} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3>{p.title}</h3>
          <p>{p.body}</p>
        </li>
      ))}
    </ol>
  );
}
