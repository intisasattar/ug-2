/**
 * Case studies.
 *
 * Only entries with `approvalStatus: "approved"` are ever rendered publicly.
 * Do not add an entry until its facts, attribution, measurement window,
 * outcome, client permission and anonymisation checks have been approved.
 * Never base company claims on work an individual closer performed independently.
 */
export type CaseStudy = {
  id: string;
  /** e.g. "UK-based digital marketing agency". Must not identify the client. */
  clientDescriptor: string;
  sector: string;
  salesContext: string;
  /** Verified starting situation and baseline. */
  baseline: string;
  /** Defined UG Global scope. */
  scope: string;
  intervention: string;
  /** e.g. "January–March 2026". */
  measurementWindow: string;
  measuredOutcome: string;
  attributionCaveats?: string;
  approvalStatus: "draft" | "in-review" | "approved";
  /** Internal reference to the evidence and consent record. Not rendered. */
  approvalRecord?: string;
};

export const caseStudies: CaseStudy[] = [];

export const approvedCaseStudies = caseStudies.filter((c) => c.approvalStatus === "approved");
