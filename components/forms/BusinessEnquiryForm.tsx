"use client";

import Link from "next/link";
import { useCallback } from "react";
import { track } from "@/lib/analytics";
import * as o from "@/lib/options";
import { businessEnquirySchema, formDataToObject } from "@/lib/validation";
import { routes } from "@/content/site";
import { ChoiceGroup, ConsentCheckbox, ErrorSummary, FormIdContext, Honeypot, SelectField, TextField, TextareaField } from "./Fields";
import { FormStatus } from "./FormStatus";
import { SuccessPanel } from "./SuccessPanel";
import { useSubmission } from "./useSubmission";
import styles from "./Form.module.css";

const PREFIX = "biz-";

const labels: Record<string, string> = {
  businessName: "Business name",
  contactName: "Contact name",
  email: "Business email",
  market: "Market / time zone",
  website: "Business website",
  industry: "Industry / service",
  monthlyVolume: "Monthly qualified B2B enquiries",
  dealSize: "Typical contract or deal size",
  salesProcess: "Existing sales process",
  supportTypes: "Type of support required",
  context: "Additional context",
  privacy: "Privacy notice",
};

export function BusinessEnquiryForm() {
  const toPayload = useCallback((form: HTMLFormElement) => {
    const raw = formDataToObject(new FormData(form), ["supportTypes"]);
    return { raw, body: JSON.stringify(raw), json: true };
  }, []);

  const { errors, status, summaryRef, onSubmit, markStarted, revalidate } = useSubmission({
    schema: businessEnquirySchema,
    endpoint: "/api/enquiry/business",
    toPayload,
    onStart: () => track("client_form_start", "client"),
    onSuccess: () => track("client_form_complete", "client"),
  });

  if (status === "success") {
    return (
      <SuccessPanel title="Thank you. Your enquiry has been received.">
        <p>
          Your business enquiry has been delivered to the UG Global business-development team. We will review the details
          you have shared and respond using the email address you provided.
        </p>
      </SuccessPanel>
    );
  }

  const submitting = status === "submitting";

  return (
    <FormIdContext.Provider value={PREFIX}>
      <form
        className={styles.form}
        noValidate
        onSubmit={onSubmit}
        onFocusCapture={markStarted}
        onChange={(e) => revalidate(e.currentTarget)}
        aria-describedby={`${PREFIX}required-note`}
      >
        <p id={`${PREFIX}required-note`} className={styles.hint}>
          Fields marked * are required.
        </p>
        <ErrorSummary errors={errors} labels={labels} summaryRef={summaryRef} idPrefix={PREFIX} />
        <Honeypot id={`${PREFIX}company_url`} />

        <div className={styles.grid}>
          <TextField name="businessName" label="Business name" required autoComplete="organization" error={errors.businessName} />
          <TextField name="contactName" label="Contact name" required autoComplete="name" error={errors.contactName} />
          <TextField name="email" label="Business email" type="email" inputMode="email" required autoComplete="email" error={errors.email} />
          <TextField name="website" label="Business website" type="url" inputMode="url" autoComplete="url" error={errors.website} />
          <SelectField name="market" label="Primary market / time zone" options={o.markets} required error={errors.market} />
          <SelectField name="industry" label="Industry / service" options={o.industries} required error={errors.industry} />
          <SelectField
            name="monthlyVolume"
            label="Approximate monthly qualified B2B enquiries"
            options={o.enquiryVolumes}
            required
            error={errors.monthlyVolume}
          />
          <SelectField
            name="dealSize"
            label="Typical contract or deal size"
            hint="In your main trading currency."
            options={o.dealSizes}
            required
            error={errors.dealSize}
          />
          <SelectField
            name="salesProcess"
            label="Existing sales process"
            options={o.salesProcesses}
            required
            error={errors.salesProcess}
            className={styles.full}
          />
          <ChoiceGroup
            type="checkbox"
            name="supportTypes"
            label="Type of support required"
            hint="Select all that apply."
            options={o.supportTypes}
            required
            error={errors.supportTypes}
            className={styles.full}
          />
          <TextareaField
            name="context"
            label="Additional context"
            hint="Anything that would help us understand your pipeline, offer or objectives. Please do not include sensitive personal data."
            rows={5}
            maxLength={2000}
            error={errors.context}
            className={styles.full}
          />
        </div>

        <ConsentCheckbox name="privacy" error={errors.privacy}>
          I have read the{" "}
          <Link href={routes.privacy} target="_blank">
            privacy notice<span className="visually-hidden"> (opens in a new tab)</span>
          </Link>{" "}
          and understand how UG Global will use the details in this business enquiry.
        </ConsentCheckbox>

        <FormStatus status={status} audience="business" />

        <div className={styles.actions}>
          <button type="submit" className={styles.submit} disabled={submitting} aria-disabled={submitting}>
            {submitting ? (
              <>
                <span className={styles.spinner} aria-hidden="true" /> Sending…
              </>
            ) : (
              "Submit Business Enquiry"
            )}
          </button>
          <p className={styles.note}>An initial discussion to understand your business and explore the appropriate scope.</p>
        </div>
      </form>
    </FormIdContext.Provider>
  );
}
