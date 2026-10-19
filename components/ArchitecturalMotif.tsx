import styles from "./ArchitecturalMotif.module.css";

/**
 * Restrained architectural line drawing: a perspective façade grid that draws
 * itself on load. Purely decorative. Replace with approved photography when available.
 */
export function ArchitecturalMotif({ className = "", variant = "facade" }: { className?: string; variant?: "facade" | "arch" }) {
  if (variant === "arch") {
    return (
      <svg className={`${styles.motif} ${className}`} viewBox="0 0 400 520" fill="none" aria-hidden="true" focusable="false">
        <g className={styles.lines} stroke="currentColor" strokeWidth="1">
          <path d="M40 520V200a160 160 0 0 1 320 0v320" />
          <path d="M80 520V210a120 120 0 0 1 240 0v310" />
          <path d="M120 520V220a80 80 0 0 1 160 0v300" />
          <path d="M200 40v480" />
          <path d="M40 360h320M40 440h320" />
        </g>
      </svg>
    );
  }
  const verticals = Array.from({ length: 9 }, (_, i) => i);
  const horizontals = Array.from({ length: 12 }, (_, i) => i);
  return (
    <svg className={`${styles.motif} ${className}`} viewBox="0 0 560 640" fill="none" aria-hidden="true" focusable="false">
      <g className={styles.lines} stroke="currentColor" strokeWidth="1">
        {/* Tower outline in two-point perspective */}
        <path d="M120 640V96L300 24l180 72v544" />
        <path d="M300 24v616" />
        {verticals.map((i) => (
          <path key={`vl${i}`} d={`M${120 + i * 20} ${96 - i * 8}V640`} style={{ ["--d" as string]: i }} />
        ))}
        {verticals.map((i) => (
          <path key={`vr${i}`} d={`M${300 + (i + 1) * 20} ${24 + (i + 1) * 8}V640`} style={{ ["--d" as string]: i + 4 }} />
        ))}
        {horizontals.map((i) => {
          const y = 140 + i * 42;
          return <path key={`h${i}`} d={`M120 ${y}L300 ${y - 52 + i * 1.5}L480 ${y}`} style={{ ["--d" as string]: i + 2 }} />;
        })}
      </g>
      <path className={styles.accent} d="M300 24v616" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
