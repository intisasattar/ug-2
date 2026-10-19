import type { CaseStudy } from "@/content/caseStudies";
import styles from "./CaseStudyCard.module.css";

/** Renders an approved, anonymised case study. Never pass unapproved data. */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  if (study.approvalStatus !== "approved") return null;
  const rows: [string, string | undefined][] = [
    ["Sales context", study.salesContext],
    ["Starting situation", study.baseline],
    ["UG Global scope", study.scope],
    ["Intervention", study.intervention],
    ["Measurement window", study.measurementWindow],
  ];
  return (
    <article className={styles.card}>
      <header className={styles.head}>
        <p className={styles.sector}>{study.sector}</p>
        <h3>{study.clientDescriptor}</h3>
      </header>
      <dl className={styles.rows}>
        {rows.map(([k, v]) => (
          <div key={k} className={styles.row}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <div className={styles.outcome}>
        <p className={styles.outcomeLabel}>Measured outcome</p>
        <p className={styles.outcomeText}>{study.measuredOutcome}</p>
      </div>
      {study.attributionCaveats && <p className={styles.caveat}>{study.attributionCaveats}</p>}
      <p className={styles.caveat}>Client identity withheld by agreement.</p>
    </article>
  );
}
