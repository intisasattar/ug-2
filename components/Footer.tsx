import Link from "next/link";
import { company, consultationHref, consultationIsExternal, mainNav, routes } from "@/content/site";
import { Wordmark } from "./Wordmark";
import { Button } from "./Button";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  const hasContact = company.email || company.phone || company.address;
  return (
    <footer className={`bg-ink grain on-dark ${styles.footer}`}>
      <div className="container">
        <div className={styles.top}>
          <p className={styles.signature} data-reveal="">
            {company.signature}
          </p>
          <Button
            href={consultationHref}
            external={consultationIsExternal}
            onDark
            variant="ghost"
            track="client_consultation_cta_click"
            trackAudience="client"
          >
            Book a Sales Consultation
          </Button>
        </div>

        <hr className="rule" data-reveal="rule" />

        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link href="/" aria-label="UG Global home" className={styles.brandLink}>
              <Wordmark tone="light" />
            </Link>
            <p className={styles.desc}>{company.description}</p>
          </div>

          <nav aria-label="Footer" className={styles.col}>
            <h2 className={styles.colTitle}>Explore</h2>
            <ul>
              {mainNav
                .filter((n) => n.href !== routes.careers)
                .map((n) => (
                  <li key={n.href}>
                    <Link href={n.href}>{n.label}</Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <h2 className={styles.colTitle}>Sales careers</h2>
            <p className={styles.small}>For sales professionals interested in joining UG Global.</p>
            <ul>
              <li>
                <Link href={routes.careers} data-track="careers_cta_click" data-track-audience="candidate">
                  Explore Sales Careers
                </Link>
              </li>
              <li>
                <Link href={routes.candidateEnquiry}>Submit Your Profile</Link>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <h2 className={styles.colTitle}>Contact</h2>
            {hasContact ? (
              <ul>
                {company.email && (
                  <li>
                    <a href={`mailto:${company.email}`}>{company.email}</a>
                  </li>
                )}
                {company.phone && (
                  <li>
                    <a href={`tel:${company.phone.replace(/\s+/g, "")}`}>{company.phone}</a>
                  </li>
                )}
                {company.address && <li className={styles.small}>{company.address}</li>}
              </ul>
            ) : (
              <ul>
                <li>
                  <Link href={routes.businessEnquiry}>Business enquiries</Link>
                </li>
                <li>
                  <Link href={routes.candidateEnquiry}>Candidate enquiries</Link>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className={styles.legal}>
          <p>
            © {year} {company.legalName ?? company.name}
            {company.registrationNumber ? ` · Registered no. ${company.registrationNumber}` : ""}
          </p>
          <ul>
            <li>
              <Link href={routes.privacy}>Privacy</Link>
            </li>
            <li>
              <Link href={routes.cookies}>Cookies</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
