import type { ReactNode } from "react";
import styles from "./Eyebrow.module.css";

export function Eyebrow({ children, as: Tag = "p", reveal = true }: { children: ReactNode; as?: "p" | "span"; reveal?: boolean }) {
  return (
    <Tag className={styles.eyebrow} {...(reveal ? { "data-reveal": "" } : {})}>
      <span className={styles.tick} aria-hidden="true" />
      {children}
    </Tag>
  );
}
