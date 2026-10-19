import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { CtaPanel } from "@/components/CtaPanel";
import { Eyebrow } from "@/components/Eyebrow";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import ed from "@/components/Editorial.module.css";
import { approvedCaseStudies } from "@/content/caseStudies";
import { pageMetadata, seo } from "@/content/seo";
import { routes } from "@/content/site";

export const metadata: Metadata = pageMetadata(seo.results);

const evidenceStandard = [
  { title: "Anonymised client descriptor", body: "Enough context to understand the business, without identifying the client." },
  { title: "Sales context and baseline", body: "The starting situation, supported by verifiable figures where they exist." },
  { title: "Defined UG Global scope", body: "Exactly which conversations, stages and follow-up activity we were responsible for." },
  { title: "Measurement window", body: "The period over which results were observed, stated plainly." },
  { title: "Measured outcome", body: "What changed, expressed in terms that can be substantiated." },
  { title: "Attribution caveats", body: "Other factors that may have influenced the result, acknowledged openly." },
];

export default function ResultsPage() {
  const hasStudies = approvedCaseStudies.length > 0;
  return (
    <>
      <PageHero
        eyebrow="Results / Case Studies"
        lines={["Results With", "Context."]}
        lede={
          <p>
            Sales performance should be assessed through evidence, context, scope and attribution. We believe a closing
            partnership should be judged on the quality of sales execution, the progression of qualified opportunities
            and commercially relevant outcomes that can be substantiated.
          </p>
        }
      />

      <section className="section bg-porcelain" aria-labelledby="standard-title">
        <div className="container">
          <SectionHeading
            id="standard-title"
            eyebrow="Our evidence standard"
            title="Performance Should Be Demonstrated, Not Merely Promised."
            align="split"
            intro={
              <p>
                Every case study we publish follows the same structure, so you can see what was done, over what period
                and with what result.
              </p>
            }
          />
          <ol className={`${ed.cards} ${ed.cards3}`} data-stagger="">
            {evidenceStandard.map((e, i) => (
              <li key={e.title} className={ed.card}>
                <p className={ed.cardKicker}>{String(i + 1).padStart(2, "0")}</p>
                <h3>{e.title}</h3>
                <p>{e.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="cases-title">
        <div className="container">
          {hasStudies ? (
            <>
              <SectionHeading id="cases-title" eyebrow="Anonymised case studies" title="Selected Engagements." />
              <div style={{ display: "grid", gap: "var(--space-6)" }} data-stagger="">
                {approvedCaseStudies.map((s) => (
                  <CaseStudyCard key={s.id} study={s} />
                ))}
              </div>
            </>
          ) : (
            <div className={ed.split}>
              <div>
                <Eyebrow>Anonymised case studies</Eyebrow>
                <h2 id="cases-title" data-reveal="">
                  Published Only Once Verified.
                </h2>
              </div>
              <div className={ed.bodyCopy} data-reveal="" style={{ ["--reveal-delay" as string]: 120 }}>
                <p>
                  Anonymised case studies are published here once the underlying facts, measurement periods, outcomes
                  and client permissions have been reviewed and approved. We do not publish illustrative stories,
                  invented figures or testimonials.
                </p>
                <p>
                  If you would like to discuss the kinds of sales challenges we work on, and how results would be
                  measured for your business, we would be glad to talk it through.
                </p>
                {process.env.NODE_ENV === "development" && (
                  <p className={ed.note}>
                    <span className={ed.noteLabel}>Development only</span>
                    No approved case studies found. Add entries with approvalStatus &quot;approved&quot; in
                    content/caseStudies.ts. This notice is not shown in production.
                  </p>
                )}
                <div className={ed.actions}>
                  <Button href={routes.howWeWork} variant="ghost">
                    How we measure and report
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaPanel
        tone="navy"
        title="Facing a Similar Sales Challenge?"
        body={<p>Let’s discuss your pipeline, where opportunities tend to stall and how progress would be measured.</p>}
        ctaLabel="Discuss Similar Opportunities"
      />
    </>
  );
}
