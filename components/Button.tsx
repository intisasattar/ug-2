import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./Arrow";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Use light styling for dark backgrounds. */
  onDark?: boolean;
  external?: boolean;
  arrow?: boolean;
  size?: "md" | "lg";
  /** Analytics event name; handled by the global click listener in SiteEffects. */
  track?: string;
  trackAudience?: "client" | "candidate";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  onDark = false,
  external = false,
  arrow = true,
  size = "md",
  track,
  trackAudience,
  className = "",
}: Props) {
  const cls = [styles.btn, styles[variant], onDark ? styles.onDark : "", size === "lg" ? styles.lg : "", className]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {arrow && <Arrow className={styles.arrow} />}
    </>
  );
  const data = track ? { "data-track": track, "data-track-audience": trackAudience } : {};

  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...data}>
        {content}
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...data}>
      {content}
    </Link>
  );
}
