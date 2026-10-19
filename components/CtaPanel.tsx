import type { ReactNode } from "react";
import { consultationHref, consultationIsExternal } from "@/content/site";
import { Button } from "./Button";
import { Eyebrow } from "./Eyebrow";
import { ArchitecturalMotif } from "./ArchitecturalMotif";
import styles from "./CtaPanel.module.css";

type Props = {
  eyebrow?: string;
  title: string;
  body?: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  microcopy?: string;
  tone?: "ink" | "navy";
};

/** Closing client-conversion panel. Defaults to the consultation destination. */
export function CtaPanel({
  eyebrow,
  title,
  body,
  ctaLabel = "Book a Sales Consultation",
  ctaHref,
  microcopy,
  tone = "navy",
}: Props) {
  const href = ctaHref ?? consultationHref;
  const external = !ctaHref && consultationIsExternal;
  return (
    <section className={`section ${tone === "ink" ? "bg-ink" : "bg-navy"} grain on-dark ${styles.panel}`} aria-labelledby="cta-title">
      <div className={styles.motif} data-parallax="50" aria-hidden="true">
        <ArchitecturalMotif variant="arch" />
      </div>
      <div className={`container ${styles.inner}`}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 id="cta-title" className={styles.title} data-reveal="">
          {title}
        </h2>
        {body && (
          <div className={styles.body} data-reveal="" style={{ ["--reveal-delay" as string]: 120 }}>
            {body}
          </div>
        )}
        <div className={styles.actions} data-reveal="" style={{ ["--reveal-delay" as string]: 220 }}>
          <Button href={href} external={external} onDark size="lg" track="client_consultation_cta_click" trackAudience="client">
            {ctaLabel}
          </Button>
          {microcopy && <p className={styles.micro}>{microcopy}</p>}
        </div>
      </div>
    </section>
  );
}
