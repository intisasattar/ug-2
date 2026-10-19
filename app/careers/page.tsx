import type { Metadata } from "next";
import { Accordion } from "@/components/Accordion";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { PageHero } from "@/components/PageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { SectionHeading } from "@/components/SectionHeading";
import ed from "@/components/Editorial.module.css";
import { careersFaqs } from "@/content/faqs";
import { pageMetadata, seo } from "@/content/seo";
import { routes } from "@/content/site";
import { publishedVacancies } from "@/content/vacancies";
import styles from "./careers.module.css";

export const metadata: Metadata = pageMetadata(seo.careers);

const categories = [
  { title: "Early-career candidates", body: "Sound communication fundamentals, coachability, discipline, and readiness to be assessed." },
  { title: "Developing closers", body: "Experience with discovery, follow-up, and objection handling; evidence of improvement and professionalism." },
  { title: "Experienced closers", body: "Proven B2B sales capability, ownership of opportunities, and credible performance evidence." },
  {
    title: "Independent contractors",
    body: "Relevant closing capability, reliable availability, and the ability to operate within agreed client and compliance standards.",
  },
];

const values = [
  "Clear and confident professional spoken and written English, with additional languages potentially useful depending on client needs.",
  "Curiosity, active listening, structured discovery, and ethical objection handling.",
  "Professional B2B communication and responsible brand representation.",
  "Reliable follow-up habits, sound CRM discipline, and accurate notes.",
  "Accountability, constructive response to feedback, and respect for clients and colleagues.",
];

const recruitmentSteps = [
  { title: "Application", body: "Complete your profile, experience, location, availability, and preferred opportunity arrangement." },
  { title: "Screening", body: "We assess relevance to current requirements and your understanding of B2B conversations." },
  {
    title: "Skills review",
    body: "Depending on the role, this may involve structured questions, a permitted anonymised example, or a mock sales conversation.",
  },
  { title: "Discussion and fit", body: "Review opportunity terms, expected performance standards, and engagement requirements." },
  { title: "Offer and onboarding", body: "If selected, receive the applicable written terms and onboarding instructions." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="UG Global / Sales Careers"
        lines={["Your Ability to Close", "Should Open Doors."]}
        lede={
          <p>
            Join a sales-focused organisation serving agencies and service businesses across international markets. We
            welcome people who want to build or advance a career in B2B sales closing through professional
            communication, thoughtful discovery and accountable execution.
          </p>
        }
        actions={
          <>
            <Button href="#opportunities" onDark size="lg" track="candidate_job_view" trackAudience="candidate">
              Explore Current Opportunities
            </Button>
            <Button href={routes.candidateEnquiry} variant="secondary" onDark size="lg" arrow={false}>
              Submit Your Profile
            </Button>
          </>
        }
      />

      <section className="section bg-porcelain" aria-labelledby="who-title">
        <div className="container">
          <SectionHeading
            id="who-title"
            eyebrow="Who should apply?"
            title="Potential Matters. Proven Capability Matters Too."
            align="split"
            intro={
              <p>
                UG Global considers applicants from different stages of their sales careers. Some opportunities may suit
                professionals developing their closing skills; others may require demonstrable B2B experience, strong
                results and the ability to manage complex conversations independently.
              </p>
            }
          />
          <ul className={`${ed.cards} ${ed.cards4}`} data-stagger="">
            {categories.map((c, i) => (
              <li key={c.title} className={ed.card}>
                <p className={ed.cardKicker}>{String(i + 1).padStart(2, "0")}</p>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </li>
            ))}
          </ul>
          <p className={ed.small} data-reveal="">
            Applicants are assessed against the requirements of each specific opportunity. Not every candidate will be
            eligible for every role.
          </p>
        </div>
      </section>

      <section className="section bg-navy grain on-dark" aria-labelledby="structure-title">
        <div className="container">
          <SectionHeading
            id="structure-title"
            eyebrow="How opportunities are structured"
            title="Different Opportunities. One Standard of Professionalism."
          />
          <div className={styles.structures} data-stagger="">
            <div className={styles.structure}>
              <p className={ed.cardKicker}>Employment opportunities</p>
              <h3>Salaried: base salary + commission</h3>
              <p>
                Where offered, salaried positions combine a base salary and commission under the specific role’s terms.
                Compensation, eligibility, working hours, employment benefits and local employment arrangements are
                confirmed for each vacancy.
              </p>
            </div>
            <div className={styles.structure}>
              <p className={ed.cardKicker}>Freelance / contractor opportunities</p>
              <h3>Independent engagements</h3>
              <p>
                Where offered, independent engagements may provide project- or client-specific closing work under an
                agreed contract. Fee or commission arrangements, payment terms, independence, tax responsibilities and
                assignment requirements are described before acceptance.
              </p>
            </div>
          </div>
          <p className={ed.note} data-reveal="">
            <span className={ed.noteLabel}>Please note</span>
            These are distinct contractual arrangements, and availability varies by role and location. Not every
            arrangement is available in every country, and no particular working pattern or level of income is
            guaranteed.
          </p>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="values-title">
        <div className="container">
          <div className={ed.split}>
            <div className={ed.sticky}>
              <Eyebrow>What we value</Eyebrow>
              <h2 id="values-title" data-reveal="">
                The Qualities Behind Exceptional Sales Conversations.
              </h2>
            </div>
            <ol className={styles.values} data-stagger="">
              {values.map((v, i) => (
                <li key={v}>
                  <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <p>{v}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section bg-porcelain" aria-labelledby="process-title">
        <div className="container">
          <div className={ed.split}>
            <div className={ed.sticky}>
              <SectionHeading
                id="process-title"
                eyebrow="Recruitment process"
                title="Show Us How You Think, Communicate and Sell."
                intro={
                  <p>
                    A typical process is outlined here. Stages may vary by role, and we do not guarantee a fixed
                    response time or a particular outcome.
                  </p>
                }
              />
            </div>
            <ProcessSteps steps={recruitmentSteps} layout="vertical" />
          </div>
        </div>
      </section>

      <section id="opportunities" className="section bg-mist" aria-labelledby="opportunities-title">
        <div className="container">
          <SectionHeading id="opportunities-title" eyebrow="Current opportunities" title="Open Roles." />
          {publishedVacancies.length > 0 ? (
            <ul className={`${ed.cards} ${ed.cards3}`} data-stagger="">
              {publishedVacancies.map((v) => (
                <li key={v.id} className={ed.card}>
                  <p className={ed.cardKicker}>{v.arrangement}</p>
                  <h3>{v.title}</h3>
                  <p>{v.summary}</p>
                  <p className={ed.small}>{v.locationEligibility}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.empty} data-reveal="">
              <p className={styles.emptyTitle}>There are no vacancies listed at the moment.</p>
              <p>
                You are welcome to submit your profile. We review profiles against current and upcoming requirements and
                will contact you if a relevant opportunity arises.
              </p>
              <div className={ed.actions}>
                <Button href={routes.candidateEnquiry} variant="secondary" track="careers_cta_click" trackAudience="candidate">
                  Submit Your Profile
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="careers-faq-title">
        <div className="container">
          <div className={ed.split}>
            <div className={ed.sticky}>
              <Eyebrow>Careers FAQ</Eyebrow>
              <h2 id="careers-faq-title" data-reveal="">
                Questions From Candidates.
              </h2>
            </div>
            <Accordion items={careersFaqs} />
          </div>
        </div>
      </section>

      <section className="section bg-ink grain on-dark" aria-labelledby="careers-cta-title">
        <div className="container">
          <Eyebrow>Next step</Eyebrow>
          <h2 id="careers-cta-title" className={styles.ctaTitle} data-reveal="">
            Ready to Show Us How You Sell?
          </h2>
          <div className={ed.actions} data-reveal="" style={{ ["--reveal-delay" as string]: 120 }}>
            <Button href="#opportunities" onDark size="lg">
              Explore Current Opportunities
            </Button>
            <Button href={routes.candidateEnquiry} variant="secondary" onDark size="lg" arrow={false}>
              Submit Your Profile
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
