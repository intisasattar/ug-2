import type { ReactNode } from "react";
import styles from "./ProcessSteps.module.css";

export type Step = { title: string; body: ReactNode; detail?: ReactNode };

/** Numbered process timeline. A progress line fills on scroll and each step lights as it is reached. */
export function ProcessSteps({ steps, layout = "horizontal" }: { steps: Step[]; layout?: "horizontal" | "vertical" }) {
  return (
    <ol className={`${styles.steps} ${layout === "vertical" ? styles.vertical : ""}`} data-progress="">
      <span className={styles.track} aria-hidden="true">
        <span className={styles.fill} />
      </span>
      {steps.map((s, i) => (
        <li key={s.title} className={styles.step} data-step="">
          <span className={styles.marker} aria-hidden="true">
            <span className={styles.dot} />
          </span>
          <span className={styles.num}>
            <span className="visually-hidden">Stage </span>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={styles.title}>{s.title}</h3>
          <div className={styles.body}>{s.body}</div>
          {s.detail && <div className={styles.detail}>{s.detail}</div>}
        </li>
      ))}
    </ol>
  );
}
