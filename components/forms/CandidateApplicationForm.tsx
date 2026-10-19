"use client";

import Link from "next/link";
import { useCallback, useState, type ChangeEvent } from "react";
import { track } from "@/lib/analytics";
import * as o from "@/lib/options";
import { CV_MAX_BYTES, CV_TYPES, candidateApplicationSchema, formDataToObject } from "@/lib/validation";
import { routes } from "@/content/site";
import { ChoiceGroup, ConsentCheckbox, ErrorSummary, FormIdContext, Honeypot, SelectField, TextField, TextareaField } from "./Fields";
import { FormStatus } from "./FormStatus";
import { SuccessPanel } from "./SuccessPanel";
import { useSubmission } from "./useSubmission";
import styles from "./Form.module.css";

const PREFIX = "cand-";

const labels: Record<string, string> = {
  fullName: "Full name",
  email: "Email address",
  country: "Country of residence",
  timeZone: "Time zone",
  phone: "Phone number",
  linkedin: "LinkedIn profile or CV",
  cv: "CV",
  experienceLevel: "Career stage",
  salesBackground: "Sales background and experience",
  salesMix: "B2B / B2C experience",
  arrangement: "Preferred arrangement",
  languages: "Spoken languages",
  availability: "Availability",
  dealExperience: "Typical deal size",
  salesCycle: "Typical sales cycle",
  crm: "CRM experience",
  objectionAnswer: "Objection-handling answer",
  assessmentPreference: "Skills demonstration preference",
  sampleAuthorised: "Sample authorisation",
  privacy: "Candidate privacy notice",
};

export function CandidateApplicationForm() {
  const [prefersSample, setPrefersSample] = useState(false);
  const [cvError, setCvError] = useState<string | undefined>();

  const toPayload = useCallback((form: HTMLFormElement) => {
    const fd = new FormData(form);
    const cv = fd.get("cv");
    const hasCv = cv instanceof File && cv.size > 0;
    const raw = { ...formDataToObject(fd), hasCv };
    if (!hasCv) fd.delete("cv");
    return { raw, body: fd, json: false };
  }, []);

  const { errors, status, summaryRef, onSubmit, markStarted, revalidate } = useSubmission({
    schema: candidateApplicationSchema,
    endpoint: "/api/enquiry/candidate",
    toPayload,
    onStart: () => track("candidate_application_start", "candidate"),
    onSuccess: () => track("candidate_application_submit", "candidate"),
  });

  if (status === "success") {
    return (
      <SuccessPanel title="Thank you. Your profile has been received.">
        <p>
          Your application has been delivered to the UG Global recruitment team. If your profile is relevant to a current
          or upcoming opportunity, we will contact you using the email address you provided. Stages and timings vary by
          role.
        </p>
      </SuccessPanel>
    );
  }

  const submitting = status === "submitting";
  const allErrors = cvError ? { ...errors, cv: cvError } : errors;

  const onCvChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return setCvError(undefined);
    if (file.size > CV_MAX_BYTES) return setCvError("Please attach a file smaller than 5 MB.");
    if (!CV_TYPES.includes(file.type)) return setCvError("Please attach a PDF or Word document.");
    setCvError(undefined);
  };

  return (
    <FormIdContext.Provider value={PREFIX}>
      <form
        className={styles.form}
        noValidate
        onSubmit={(e) => {
          if (cvError) {
            e.preventDefault();
            requestAnimationFrame(() => summaryRef.current?.focus());
            return;
          }
          onSubmit(e);
        }}
        onFocusCapture={markStarted}
        onChange={(e) => revalidate(e.currentTarget)}
        aria-describedby={`${PREFIX}required-note`}
      >
        <p id={`${PREFIX}required-note`} className={styles.hint}>
          Fields marked * are required.
        </p>
        <ErrorSummary errors={allErrors} labels={labels} summaryRef={summaryRef} idPrefix={PREFIX} />
        <Honeypot id={`${PREFIX}company_url`} />

        <div className={styles.grid}>
          <TextField name="fullName" label="Full name" required autoComplete="name" error={errors.fullName} />
          <TextField name="email" label="Email address" type="email" inputMode="email" required autoComplete="email" error={errors.email} />
          <TextField name="country" label="Country of residence" required autoComplete="country-name" error={errors.country} />
          <SelectField name="timeZone" label="Time zone" options={o.timeZones} required error={errors.timeZone} />
          <TextField name="phone" label="Phone number" type="tel" inputMode="tel" autoComplete="tel" error={errors.phone} />
          <TextField
            name="linkedin"
            label="LinkedIn profile"
            type="url"
            inputMode="url"
            hint="Add a LinkedIn profile, attach a CV, or both."
            error={errors.linkedin}
          />
          <div className={`${styles.field} ${styles.full} ${cvError ? styles.invalid : ""}`}>
            <label htmlFor={`${PREFIX}cv`} className={styles.label}>
              CV <span className={styles.optional}>(PDF or Word, up to 5 MB)</span>
            </label>
            <input
              id={`${PREFIX}cv`}
              name="cv"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className={`${styles.input} ${styles.file}`}
              aria-invalid={cvError ? true : undefined}
              aria-describedby={cvError ? `${PREFIX}cv-error` : undefined}
              onChange={onCvChange}
            />
            {cvError && (
              <p id={`${PREFIX}cv-error`} className={styles.error}>
                <span className={styles.errorIcon} aria-hidden="true">
                  !
                </span>
                {cvError}
              </p>
            )}
          </div>
        </div>

        <div className={styles.group}>
          <p className={styles.groupTitle}>Experience</p>
          <div className={styles.grid}>
            <SelectField name="experienceLevel" label="Which best describes you?" options={o.experienceLevels} required error={errors.experienceLevel} />
            <SelectField name="salesMix" label="B2B / B2C sales experience" options={o.salesMixes} required error={errors.salesMix} />
            <SelectField name="dealExperience" label="Typical deal size you have handled" options={o.dealExperience} required error={errors.dealExperience} />
            <SelectField name="salesCycle" label="Typical sales cycle you have worked with" options={o.salesCycles} required error={errors.salesCycle} />
            <TextareaField
              name="salesBackground"
              label="Sales background and experience"
              hint="Roles, tenure, the kinds of offers you have sold and how you sold them."
              rows={5}
              maxLength={2000}
              required
              error={errors.salesBackground}
              className={styles.full}
            />
            <TextField name="crm" label="CRM experience" hint="For example, HubSpot, Salesforce, Pipedrive." error={errors.crm} className={styles.full} />
          </div>
        </div>

        <div className={styles.group}>
          <p className={styles.groupTitle}>Arrangement and availability</p>
          <div className={styles.grid}>
            <SelectField
              name="arrangement"
              label="Preferred opportunity arrangement"
              hint="Arrangements vary by role and location."
              options={o.arrangements}
              required
              error={errors.arrangement}
            />
            <SelectField name="availability" label="Availability" options={o.availabilities} required error={errors.availability} />
            <TextField
              name="languages"
              label="Spoken languages"
              hint="Please include your level, e.g. English (fluent), French (professional)."
              required
              error={errors.languages}
              className={styles.full}
            />
          </div>
        </div>

        <div className={styles.group}>
          <p className={styles.groupTitle}>How you sell</p>
          <TextareaField
            name="objectionAnswer"
            label="A prospect says: “It sounds good, but now isn’t the right time.” How would you respond?"
            hint="A brief written answer of a few sentences is enough. Please do not include details of real prospects."
            rows={6}
            maxLength={1500}
            required
            error={errors.objectionAnswer}
          />
          <ChoiceGroup
            type="radio"
            name="assessmentPreference"
            label="If shortlisted, how would you prefer to demonstrate your skills?"
            hint="A simulated role-play is our standard approach. Please do not send recordings of real sales calls."
            options={o.assessmentPreferences}
            defaultValue="Simulated role-play"
            required
            error={errors.assessmentPreference}
            onChange={(v) => setPrefersSample(v === "Authorised, anonymised sample")}
          />
          {prefersSample && (
            <ConsentCheckbox name="sampleAuthorised" error={errors.sampleAuthorised}>
              I confirm that any sample I share later will be fully anonymised, will not contain third-party personal
              information, and that I have the right and any required permission to share it. I will only share it if
              UG Global requests it.
            </ConsentCheckbox>
          )}
        </div>

        <ConsentCheckbox name="privacy" error={errors.privacy}>
          I have read the{" "}
          <Link href={routes.privacy} target="_blank">
            candidate privacy notice<span className="visually-hidden"> (opens in a new tab)</span>
          </Link>{" "}
          and understand how UG Global will use the details in my application.
        </ConsentCheckbox>

        <FormStatus status={status} audience="candidate" />

        <div className={styles.actions}>
          <button type="submit" className={`${styles.submit} ${styles.submitSecondary}`} disabled={submitting} aria-disabled={submitting}>
            {submitting ? (
              <>
                <span className={styles.spinner} aria-hidden="true" /> Sending…
              </>
            ) : (
              "Submit Your Profile"
            )}
          </button>
          <p className={styles.note}>Submitting a profile does not guarantee an interview or offer. Stages vary by role.</p>
        </div>
      </form>
    </FormIdContext.Provider>
  );
}
