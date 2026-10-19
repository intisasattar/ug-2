"use client";

import { useId, useState } from "react";
import type { Faq } from "@/content/faqs";
import styles from "./Accordion.module.css";

/** Accessible disclosure accordion (WAI-ARIA pattern; native buttons, one panel per item). */
export function Accordion({ items, headingLevel = 3 }: { items: Faq[]; headingLevel?: 2 | 3 | 4 }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const H = `h${headingLevel}` as "h2" | "h3" | "h4";

  return (
    <div className={styles.accordion} data-stagger="">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-b${i}`;
        const panelId = `${baseId}-p${i}`;
        return (
          <div key={item.question} className={`${styles.item} ${isOpen ? styles.open : ""}`}>
            <H className={styles.heading}>
              <button
                id={btnId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className={styles.num} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.q}>{item.question}</span>
                <span className={styles.icon} aria-hidden="true" />
              </button>
            </H>
            <div id={panelId} role="region" aria-labelledby={btnId} className={styles.panel} hidden={!isOpen}>
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
