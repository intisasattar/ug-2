import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { CtaPanel } from "@/components/CtaPanel";
import { Eyebrow } from "@/components/Eyebrow";
import { PageHero } from "@/components/PageHero";
import { PrincipleList } from "@/components/PrincipleList";
import { ProcessSteps } from "@/components/ProcessSteps";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceGrid } from "@/components/ServiceGrid";
import { WordReveal } from "@/components/WordReveal";
import ed from "@/components/Editorial.module.css";
import { audienceCategories, boundaryNote, principles, processSteps, services } from "@/content/copy";
import { pageMetadata, seo } from "@/content/seo";
import { consultationHref, consultationIsExternal, routes } from "@/content/site";
import styles from "./home.module.css";

export const metadata: Metadata = pageMetadata(seo.home);

export default function HomePage() {
  return (
    <>
      {/* 1–2. Hero */}
      <PageHero
        size="home"
        eyebrow="Specialist B2B Sales Closing | UK & International"
        lines={["You Generate the", "Opportunities.", "We Help Close", "the Business."]}
        lede={
          <>
            <p>
              UG Global partners with agencies and service businesses to turn qualified B2B enquiries into commercial
              conversations, clear decisions and new client relationships. Through professional sales closing and
              disciplined follow-up, we help you make more of the opportunities already in your pipeline.
            </p>
            <p className={styles.supporting}>Your reputation matters. So does every opportunity.</p>
          </>
        }
        actions={
          <>
            <Button
              href={consultationHref}
              external={consultationIsExternal}
              onDark
              size="lg"
              track="client_consultation_cta_click"
              trackAudience="client"
            >
              Book a Sales Consultation
            </Button>
            <Button href={routes.howWeWork} variant="secondary" onDark size="lg" arrow={false}>
              See How We Work
            </Button>
          </>
        }
      />

      {/* 3. Problem / opportunity */}
      <section className="section bg-porcelain" aria-labelledby="opportunity-title">
        <div className="container">
          <div className={ed.split}>
            <div>
              <Eyebrow>The opportunity</Eyebrow>
              <h2 id="opportunity-title" data-reveal="">
                Your Next Client May Already Be in Your Pipeline.
              </h2>
            </div>
            <div className={ed.bodyCopy} data-reveal="" style={{ ["--reveal-delay" as string]: 120 }}>
              <p>
                Generating qualified interest takes time, money and effort. Converting that interest requires thoughtful
                discovery, relevant objection handling and consistent follow-up. A delayed response, unresolved concern
                or missed next step can allow a promising B2B opportunity to lose momentum.
              </p>
              <p>
                UG Global supports the conversations between initial interest and commercial commitment, helping your
                business pursue existing demand with greater focus, consistency and accountability.
              </p>
            </div>
          </div>
          <figure className={ed.pullquote}>
            <span className={ed.quoteMark} aria-hidden="true">
              “
            </span>
            <blockquote>
              <WordReveal text="Before investing more to generate demand, consider what your existing opportunities could be worth." />
            </blockquote>
            <span className={ed.accentBar} data-reveal="rule" aria-hidden="true" />
          </figure>
        </div>
      </section>

      {/* 4. Services */}
      <section className="section bg-white" aria-labelledby="services-title">
        <div className="container">
          <SectionHeading
            id="services-title"
            eyebrow="Services"
            title="Specialist Closing. Purposeful Follow-Up. One Commercial Focus."
            align="split"
            intro={<p>Four connected disciplines, focused on the stage between qualified interest and commercial commitment.</p>}
          />
          <ServiceGrid items={services} />
          <div className={styles.servicesFoot}>
            <p className={styles.boundary} data-reveal="">
              <span className={ed.noteLabel}>Service boundary</span>
              {boundaryNote}
            </p>
            <Button href={routes.services} variant="ghost">
              Explore Sales Closing Services
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Who we work with */}
      <section className="section bg-mist" aria-labelledby="audience-title">
        <div className="container">
          <div className={`${ed.split} ${ed.splitReverse}`}>
            <div>
              <Eyebrow>Who we work with</Eyebrow>
              <h2 id="audience-title" data-reveal="">
                Built for Agencies and Service Businesses Selling to Other Businesses.
              </h2>
            </div>
            <div data-reveal="" style={{ ["--reveal-delay" as string]: 120 }}>
              <p className={ed.bodyCopy}>
                Whether your organisation sells ongoing services, specialist projects or tailored B2B solutions, the
                quality of your sales conversations affects both conversion and customer confidence. We work with
                businesses that have an established offer, qualified prospective clients and a clear need for
                professional sales execution.
              </p>
              <ul className={ed.tags} aria-label="Types of business we work with" data-stagger="">
                {audienceCategories.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className={ed.small}>Examples of the kinds of businesses we work with.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. How we work */}
      <section className="section bg-navy grain on-dark" aria-labelledby="process-title">
        <span className={ed.ghostNum} data-parallax="70" aria-hidden="true">
          04
        </span>
        <div className={`container ${ed.relative}`}>
          <SectionHeading
            id="process-title"
            eyebrow="How we work"
            title="A Structured Partnership, Not a Generic Sales Script."
          />
          <ProcessSteps steps={processSteps} />
          <div className={ed.actions} data-reveal="">
            <Button href={consultationHref} external={consultationIsExternal} onDark track="client_consultation_cta_click" trackAudience="client">
              Discuss Your Sales Pipeline
            </Button>
            <Button href={routes.howWeWork} variant="ghost" onDark>
              The full process
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Why UG Global */}
      <section className="section bg-porcelain" aria-labelledby="why-title">
        <div className="container">
          <div className={ed.split}>
            <div className={ed.sticky}>
              <Eyebrow>Why UG Global</Eyebrow>
              <h2 id="why-title" data-reveal="">
                Professional Representation. Commercial Discipline.
              </h2>
            </div>
            <PrincipleList items={principles} />
          </div>
        </div>
      </section>

      {/* 8. Results */}
      <section className={`section bg-ink grain on-dark ${styles.results}`} aria-labelledby="results-title">
        <div className="container">
          <div className={styles.resultsGrid}>
            <div>
              <Eyebrow>Results</Eyebrow>
              <h2 id="results-title" data-reveal="">
                Performance Should Be Demonstrated, Not Merely Promised.
              </h2>
            </div>
            <div data-reveal="" style={{ ["--reveal-delay" as string]: 120 }}>
              <p className={styles.resultsCopy}>
                We believe a closing partnership should be assessed against evidence: the quality of sales execution,
                progression of qualified opportunities and commercially relevant outcomes. Explore anonymised examples of
                sales challenges, the approach taken and the results that can be substantiated.
              </p>
              <ul className={styles.evidence} aria-label="How results are presented">
                <li>Verified baseline</li>
                <li>Defined scope</li>
                <li>Measurement period</li>
                <li>Attribution in context</li>
              </ul>
              <div className={ed.actions}>
                <Button href={routes.results} variant="secondary" onDark>
                  Explore Case Studies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. About and standards */}
      <section className="section bg-porcelain" aria-labelledby="standards-title">
        <div className="container-narrow">
          <Eyebrow>Our standards</Eyebrow>
          <h2 id="standards-title" className={styles.standardsTitle} data-reveal="">
            The People Behind the Conversations Matter.
          </h2>
          <p className={styles.standardsCopy} data-reveal="" style={{ ["--reveal-delay" as string]: 120 }}>
            Every sales conversation can influence how a prospective client perceives your business. We believe careful
            preparation, honest communication and professional judgement are essential to effective closing. Our team is
            expected to learn the proposition it represents, respect the buyer and pursue a clear next step.
          </p>
          <div data-reveal="" style={{ ["--reveal-delay" as string]: 200 }}>
            <Button href={routes.about} variant="ghost">
              About UG Global
            </Button>
          </div>
        </div>
      </section>

      {/* 10. Careers: visible, secondary */}
      <section className={`section-tight bg-white ${styles.careers}`} aria-labelledby="careers-title">
        <div className="container">
          <div className={styles.careersInner}>
            <div>
              <Eyebrow>Careers at UG Global</Eyebrow>
              <h2 id="careers-title" className={styles.careersTitle} data-reveal="">
                Exceptional Sales Conversations Start with the Right People.
              </h2>
            </div>
            <div className={styles.careersBody} data-reveal="" style={{ ["--reveal-delay" as string]: 120 }}>
              <p>
                We are interested in ambitious sales professionals who care about preparation, trust and performance.
                From emerging talent to experienced B2B closers, UG Global welcomes applicants ready to demonstrate their
                communication skills, commercial judgement and commitment to growth.
              </p>
              <p className="muted">
                Opportunities may include salaried positions with base pay and commission or independent
                freelance/contractor engagements, depending on the opening, candidate profile and location.
              </p>
              <div className={styles.careersCta}>
                <Button href={routes.careers} variant="secondary" track="careers_cta_click" trackAudience="candidate">
                  Explore Sales Careers
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Final consultation CTA */}
      <CtaPanel
        tone="navy"
        title="Make More of the Opportunities You Already Have."
        body={
          <p>
            If qualified prospects are entering your pipeline, the next question is how effectively those opportunities
            are progressing. Let’s explore your current approach and whether dedicated closing and follow-up support is
            the right commercial fit.
          </p>
        }
        microcopy="An initial discussion to understand your business and explore the appropriate scope."
      />
    </>
  );
}
