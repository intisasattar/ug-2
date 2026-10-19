import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import styles from "./SectionHeading.module.css";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  as?: "h1" | "h2";
  align?: "start" | "split";
  id?: string;
};

/** Editorial section heading. `split` places intro copy beside the title on wide screens. */
export function SectionHeading({ eyebrow, title, intro, as: Tag = "h2", align = "start", id }: Props) {
  return (
    <header className={`${styles.head} ${align === "split" ? styles.split : ""}`}>
      <div className={styles.titleCol}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Tag id={id} className={styles.title} data-reveal="">
          {title}
        </Tag>
      </div>
      {intro && (
        <div className={styles.intro} data-reveal="" style={{ ["--reveal-delay" as string]: 120 }}>
          {intro}
        </div>
      )}
    </header>
  );
}
