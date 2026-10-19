import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { CtaPanel } from "@/components/CtaPanel";
import { Eyebrow } from "@/components/Eyebrow";
import { PageHero } from "@/components/PageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { SectionHeading } from "@/components/SectionHeading";
import ed from "@/components/Editorial.module.css";
import { pageMetadata, seo } from "@/content/seo";
import { consultationHref, consultationIsExternal, routes } from "@/content/site";

export const metadata: Metadata = pageMetadata(seo.howWeWork);

const stages = [
  {
    title: "Assess",
    body: "Discuss your offer, existing pipeline, ideal customer, current sales process and objectives.",
    detail: (
      <>
        <p>
          <strong>Purpose:</strong> to understand whether dedicated closing and follow-up support is the right
          commercial fit, and what a sensible scope would look like.
        </p>
        <p>
          <strong>Outcome:</strong> a shared view of the opportunity, the stages in scope and the measures that will
          matter, followed by a tailored proposal where appropriate.
        </p>
      </>
    ),
  },
  {
    title: "Immerse",
    body: "Learn your positioning, commercial terms, buyer concerns, communication standards and agreed systems.",
    detail: (
      <>
        <p>
          <strong>Purpose:</strong> to represent your business accurately. We study the proposition we will be
          representing before speaking to your prospects.
        </p>
        <p>
          <strong>Outcome:</strong> agreed messaging, approval boundaries, hand-off points and ways of recording
          activity, so conversations reflect your standards.
        </p>
      </>
    ),
  },
  {
    title: "Execute",
    body: "Manage assigned qualified conversations and agreed follow-up activity as an extension of your business.",
    detail: (
      <>
        <p>
          <strong>Purpose:</strong> to progress assigned opportunities with focus and consistency, from discovery
          through objection handling to a clear next step.
        </p>
        <p>
          <strong>Outcome:</strong> qualified opportunities that are actively pursued, with next steps recorded and
          follow-up maintained across the agreed stages.
        </p>
      </>
    ),
  },
  {
    title: "Review",
    body: "Track agreed indicators, report progress and refine the process based on observed sales outcomes.",
    detail: (
      <>
        <p>
          <strong>Purpose:</strong> to keep the partnership accountable and to learn from what the pipeline is
          showing.
        </p>
        <p>
          <strong>Outcome:</strong> reporting against the measures agreed at the outset, and practical refinements to
          messaging, follow-up or scope where the evidence supports them.
        </p>
      </>
    ),
  },
];

const standards = [
  {
    kicker: "Communication",
    title: "Professional, honest conversations",
    body: "Conversations are prepared, respectful and accurate. We do not make claims your business cannot support or apply artificial pressure.",
  },
  {
    kicker: "Representation",
    title: "Your brand, your standards",
    body: "We work within the positioning, tone and approval boundaries you set, and raise anything outside the agreed scope with your named contact.",
  },
  {
    kicker: "Responsibilities",
    title: "Clear ownership",
    body: "Each party’s responsibilities, hand-offs and decision rights are agreed before work begins, so buyers experience one coherent process.",
  },
  {
    kicker: "Reporting",
    title: "Agreed visibility",
    body: "Reporting expectations, measures and cadence are agreed at the outset, so you can see how opportunities are progressing.",
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        tone="navy"
        motif="arch"
        eyebrow="How We Work"
        lines={["A Clear Process", "From First Briefing to", "Commercial Outcome."]}
        lede={
          <p>
            A structured partnership, not a generic sales script. Four stages take us from understanding your business
            to accountable execution and review, each with a defined purpose and outcome.
          </p>
        }
        actions={
          <Button href={consultationHref} external={consultationIsExternal} onDark size="lg" track="client_consultation_cta_click" trackAudience="client">
            Book a Consultation
          </Button>
        }
      />

      <section className="section bg-porcelain" aria-labelledby="stages-title">
        <div className="container">
          <div className={ed.split}>
            <div className={ed.sticky}>
              <SectionHeading
                id="stages-title"
                eyebrow="The four stages"
                title="Assess. Immerse. Execute. Review."
                intro={<p>Specific timings, meeting rhythms and tools are agreed with each client during the consultation.</p>}
              />
            </div>
            <ProcessSteps steps={stages} layout="vertical" />
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="journey-title">
        <div className="container">
          <SectionHeading
            id="journey-title"
            eyebrow="Your journey with UG Global"
            title="From Initial Consultation to Agreed Execution."
            align="split"
            intro={<p>A simple sequence, so you always know what happens next.</p>}
          />
          <ol className={`${ed.cards} ${ed.cards4}`} data-stagger="">
            {[
              ["Consultation", "An initial discussion about your business, pipeline and objectives."],
              ["Proposal", "A tailored scope and commercial proposal, confirmed directly with you."],
              ["Onboarding", "Immersion in your offer, standards, systems and hand-off points."],
              ["Execution & review", "Agreed conversations and follow-up, reported against agreed measures."],
            ].map(([t, b], i) => (
              <li key={t} className={ed.card}>
                <p className={ed.cardKicker}>Step {String(i + 1).padStart(2, "0")}</p>
                <h3>{t}</h3>
                <p>{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-ink grain on-dark" aria-labelledby="standards-title">
        <div className="container">
          <SectionHeading
            id="standards-title"
            eyebrow="Working standards"
            title="How We Represent Your Business."
            align="split"
            intro={<p>The principles that shape every engagement, whatever the agreed scope.</p>}
          />
          <ul className={ed.cards} data-stagger="">
            {standards.map((s) => (
              <li key={s.title} className={ed.card}>
                <p className={ed.cardKicker}>{s.kicker}</p>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-porcelain" aria-labelledby="refine-title">
        <div className="container">
          <div className={ed.split}>
            <div>
              <Eyebrow>Process refinement</Eyebrow>
              <h2 id="refine-title" data-reveal="">
                Improvement Grounded in Evidence.
              </h2>
            </div>
            <div className={ed.bodyCopy} data-reveal="" style={{ ["--reveal-delay" as string]: 120 }}>
              <p>
                Sales conversations reveal useful information: recurring buyer concerns, points where momentum slows and
                messages that resonate. We use what we observe to suggest practical refinements to messaging, follow-up
                or scope.
              </p>
              <p>
                Changes are agreed with you, not made unilaterally, so the process remains aligned with your brand and
                commercial priorities.
              </p>
              <div className={ed.actions}>
                <Button href={routes.services} variant="ghost">
                  Explore our services
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaPanel
        tone="navy"
        title="Start With an Initial Consultation."
        body={<p>We will discuss your offer, your pipeline and whether a structured closing partnership is the right fit.</p>}
        ctaLabel="Book a Consultation"
        microcopy="An initial discussion to understand your business and explore the appropriate scope."
      />
    </>
  );
}
