import type { SubmitStatus } from "./useSubmission";
import styles from "./Form.module.css";

/** Live region announcing honest delivery outcomes. */
export function FormStatus({ status, audience }: { status: SubmitStatus; audience: "business" | "candidate" }) {
  const what = audience === "business" ? "enquiry" : "profile";
  return (
    <div aria-live="polite" role="status">
      {status === "submitting" && <p className="visually-hidden">Sending your {what}…</p>}
      {status === "not_configured" && (
        <div className={`${styles.status} ${styles.statusWarn}`}>
          <p className={styles.statusTitle}>Online submissions are not yet connected.</p>
          <p>
            Your {what} has <strong>not</strong> been sent. The secure delivery destination for this form is still being
            configured. Please try again later.
          </p>
        </div>
      )}
      {status === "failed" && (
        <div className={`${styles.status} ${styles.statusError}`}>
          <p className={styles.statusTitle}>We could not send your {what}.</p>
          <p>Nothing has been submitted. Please check your connection and try again in a moment.</p>
        </div>
      )}
    </div>
  );
}
