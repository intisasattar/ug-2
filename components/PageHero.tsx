import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { MaskHeadline } from "./MaskHeadline";
import { ArchitecturalMotif } from "./ArchitecturalMotif";
import styles from "./PageHero.module.css";

type Props = {
  eyebrow: string;
  /** Headline split into display lines (rendered as a single H1). */
  lines: string[];
  lede?: ReactNode;
  actions?: ReactNode;
  tone?: "ink" | "navy";
  motif?: "facade" | "arch";
  size?: "home" | "page";
  aside?: ReactNode;
};

export function PageHero({ eyebrow, lines, lede, actions, tone = "ink", motif = "facade", size = "page", aside }: Props) {
  return (
    <section
      className={`${tone === "ink" ? "bg-ink" : "bg-navy"} grain on-dark ${styles.hero} ${size === "home" ? styles.home : ""}`}
      aria-labelledby="page-title"
    >
      <div className={styles.motif} data-parallax="60" aria-hidden="true">
        <ArchitecturalMotif variant={motif} />
      </div>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <MaskHeadline id="page-title" lines={lines} className={styles.title} delay={80} />
          <span className={styles.rule} data-reveal="rule" style={{ ["--reveal-delay" as string]: 500 }} aria-hidden="true" />
          {lede && (
            <div className={styles.lede} data-reveal="" style={{ ["--reveal-delay" as string]: 520 }}>
              {lede}
            </div>
          )}
          {actions && (
            <div className={styles.actions} data-reveal="" style={{ ["--reveal-delay" as string]: 660 }}>
              {actions}
            </div>
          )}
        </div>
        {aside && (
          <div className={styles.aside} data-reveal="" style={{ ["--reveal-delay" as string]: 760 }}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}
