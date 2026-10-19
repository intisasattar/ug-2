"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Form.module.css";

export function SuccessPanel({ title, children }: { title: string; children: ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div className={styles.success} role="status">
      <span className={styles.successMark} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3 9.5l4 4 8-9" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </span>
      <h3 ref={ref} tabIndex={-1}>
        {title}
      </h3>
      {children}
    </div>
  );
}
