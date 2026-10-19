import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { PageHero } from "@/components/PageHero";
import { Arrow } from "@/components/Arrow";
import { BusinessEnquiryForm } from "@/components/forms/BusinessEnquiryForm";
import { CandidateApplicationForm } from "@/components/forms/CandidateApplicationForm";
import { pageMetadata, seo } from "@/content/seo";
import { consultationIsExternal, consultationHref, routes } from "@/content/site";
import styles from "./contact.module.css";

export const metadata: Metadata = pageMetadata(seo.contact);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        lines={["Let’s Talk About Your", "Sales Opportunities."]}
        lede={<p>Two separate routes, so every enquiry reaches the right team. Please choose the one that describes you.</p>}
      />

      <section className={`bg-porcelain ${styles.routes}`} aria-label="Choose an enquiry route">
        <div className={`container ${styles.routeGrid}`} data-stagger="">
          <a href="#business" className={`${styles.route} ${styles.routePrimary}`} data-track="client_consultation_cta_click" data-track-audience="client">
            <span className={styles.routeKicker}>Route A · Businesses</span>
            <span className={styles.routeTitle}>I’m a Business Looking for Sales Closing Support.</span>
            <span className={styles.routeGo}>
              Business enquiry <Arrow />
            </span>
          </a>
          <a href="#candidate" className={styles.route} data-track="careers_cta_click" data-track-audience="candidate">
            <span className={styles.routeKicker}>Route B · Sales professionals</span>
            <span className={styles.routeTitle}>I’m a Sales Professional Interested in Joining.</span>
            <span className={styles.routeGo}>
              Candidate profile <Arrow />
            </span>
          </a>
        </div>
      </section>

      <section id="business" className={`section bg-porcelain ${styles.formSection}`} aria-labelledby="business-title">
        <div className={`container ${styles.formLayout}`}>
          <div className={styles.formIntro}>
            <Eyebrow>Route A · Business enquiry</Eyebrow>
            <h2 id="business-title" data-reveal="">
              I’m a Business Looking for Sales Closing Support.
            </h2>
            <p className={styles.introCopy} data-reveal="">
              This form is for agencies and service businesses seeking help with qualified B2B opportunities, sales
              closing and pipeline follow-up. Your enquiry is sent only to our business-development team.
            </p>
            {consultationIsExternal && (
              <p className={styles.introCopy}>
                Prefer to choose a time directly?{" "}
                <a href={consultationHref} target="_blank" rel="noopener noreferrer" className="text-link">
                  Book a sales consultation<span className="visually-hidden"> (opens in a new tab)</span>
                </a>
                .
              </p>
            )}
            <ul className={styles.expect} aria-label="What to expect">
              <li>An initial discussion to understand your business</li>
              <li>An exploration of the appropriate scope</li>
              <li>A tailored proposal, where there is a fit</li>
            </ul>
          </div>
          <div className={styles.formCard}>
            <BusinessEnquiryForm />
          </div>
        </div>
      </section>

      <section id="candidate" className={`section bg-mist ${styles.formSection}`} aria-labelledby="candidate-title">
        <div className={`container ${styles.formLayout}`}>
          <div className={styles.formIntro}>
            <Eyebrow>Route B · Candidate profile</Eyebrow>
            <h2 id="candidate-title" className={styles.secondaryTitle} data-reveal="">
              I’m a Sales Professional Interested in Joining.
            </h2>
            <p className={styles.introCopy} data-reveal="">
              This route is for candidates interested in current opportunities or submitting a professional profile.
              Applications are sent only to our recruitment team and are kept separate from business enquiries.
            </p>
            <p className={styles.introCopy}>
              Learn more about <a href={routes.careers} className="text-link">sales careers at UG Global</a>.
            </p>
          </div>
          <div className={styles.formCard}>
            <CandidateApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
