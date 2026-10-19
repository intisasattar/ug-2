import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { CtaPanel } from "@/components/CtaPanel";
import { Eyebrow } from "@/components/Eyebrow";
import { PageHero } from "@/components/PageHero";
import { PrincipleList } from "@/components/PrincipleList";
import { SectionHeading } from "@/components/SectionHeading";
import { WordReveal } from "@/components/WordReveal";
import ed from "@/components/Editorial.module.css";
import { pageMetadata, seo } from "@/content/seo";
import { routes } from "@/content/site";

export const metadata: Metadata = pageMetadata(seo.about);

const values = [
  { title: "Preparation", body: "We learn the proposition we represent before we speak to a single prospect." },
  { title: "Thoughtful communication", body: "We listen first, ask purposeful questions and explain clearly." },
  { title: "Respect for the buyer", body: "Honest answers, no artificial urgency and no pressure tactics." },
  { title: "Accountability", body: "Agreed responsibilities, recorded next steps and transparent reporting." },
  { title: "Commercial discipline", body: "Every conversation works towards a clear, appropriate next step." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About UG Global"
        motif="arch"
        lines={["Sales Is Personal.", "Our Standards Are", "Professional."]}
        lede={
          <p>
            UG Global is a specialist B2B sales-closing company. We help agencies and service businesses make more of the
            qualified opportunities already in their pipeline through professional sales conversations, ethical closing
            and disciplined follow-up.
          </p>
        }
      />

      <section className="section bg-porcelain" aria-labelledby="mission-title">
        <div className="container">
          <div className={ed.split}>
            <div>
              <Eyebrow>Our mission</Eyebrow>
              <h2 id="mission-title" data-reveal="">
                Helping Good Businesses Convert the Interest They Have Earned.
              </h2>
            </div>
            <div className={ed.bodyCopy} data-reveal="" style={{ ["--reveal-delay" as string]: 120 }}>
              <p>
                Many agencies and service businesses invest heavily in creating qualified interest, then find that
                converting it competes with everything else they need to deliver. Our mission is to give those
                opportunities the focused, professional attention they deserve.
              </p>
              <p>
                We concentrate on one stage of the commercial process: the conversations between initial interest and a
                commercial decision. That specialist B2B focus shapes how we prepare, how we communicate and how we
                measure our work.
              </p>
            </div>
          </div>
          <figure className={ed.pullquote}>
            <span className={ed.quoteMark} aria-hidden="true">
              “
            </span>
            <blockquote>
              <WordReveal text="Every sales conversation can influence how a prospective client perceives your business." />
            </blockquote>
            <span className={ed.accentBar} data-reveal="rule" aria-hidden="true" />
          </figure>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="people-title">
        <div className="container">
          <div className={ed.split}>
            <div className={ed.sticky}>
              <Eyebrow>Our standards</Eyebrow>
              <h2 id="people-title" data-reveal="">
                The People Behind the Conversations Matter.
              </h2>
              <p className={ed.bodyCopy} style={{ marginTop: "var(--space-5)" }} data-reveal="">
                We believe careful preparation, honest communication and professional judgement are essential to
                effective closing. Our team is expected to learn the proposition it represents, respect the buyer and
                pursue a clear next step.
              </p>
            </div>
            <PrincipleList items={values} />
          </div>
        </div>
      </section>

      <section className="section bg-navy grain on-dark" aria-labelledby="ethics-title">
        <div className="container">
          <SectionHeading
            id="ethics-title"
            eyebrow="Ethical closing"
            title="Persuasive, Never Pressured."
            align="split"
            intro={
              <p>
                Sustainable client relationships take precedence over artificial urgency. The way a deal is won shapes
                the relationship that follows.
              </p>
            }
          />
          <div className={ed.detailGrid} style={{ background: "var(--border-dark)", borderColor: "var(--border-dark)" }} data-stagger="">
            {[
              ["Honest representation", "We describe your offer accurately and never promise what your business cannot deliver."],
              ["Genuine objection handling", "Concerns are answered with relevant information, not deflected or dismissed."],
              ["Respect for decisions", "Where a service is not the right fit, we say so. A clear “no” is a valid outcome."],
              ["Professional conduct", "Conversations reflect the standards and reputation our clients have built."],
            ].map(([t, b]) => (
              <div key={t} className={ed.detail} style={{ background: "var(--color-navy)" }}>
                <h3>{t}</h3>
                <p style={{ color: "var(--text-on-dark-muted)" }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight bg-porcelain" aria-labelledby="careers-link-title">
        <div className="container">
          <div className={ed.split}>
            <div>
              <Eyebrow>Join us</Eyebrow>
              <h2 id="careers-link-title" data-reveal="">
                Interested in Working With Us?
              </h2>
            </div>
            <div data-reveal="" style={{ ["--reveal-delay" as string]: 120 }}>
              <p className={ed.bodyCopy}>
                We welcome sales professionals who care about preparation, trust and performance.
              </p>
              <div className={ed.actions}>
                <Button href={routes.careers} variant="secondary" track="careers_cta_click" trackAudience="candidate">
                  Explore Sales Careers
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaPanel
        tone="ink"
        title="Speak With Our Team."
        body={<p>Tell us about your business and the qualified opportunities in your pipeline.</p>}
        ctaLabel="Speak With Our Team"
        microcopy="An initial discussion to understand your business and explore the appropriate scope."
      />
    </>
  );
}
