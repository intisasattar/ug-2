import type { ReactNode } from "react";
import { PageHero } from "./PageHero";

export function LegalPage({ eyebrow, lines, children }: { eyebrow: string; lines: string[]; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} lines={lines} />
      <section className="section bg-porcelain">
        <div className="container-narrow prose" style={{ display: "grid", gap: "var(--space-5)" }}>
          {children}
        </div>
      </section>
    </>
  );
}
