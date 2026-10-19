/**
 * Minimal, consent-friendly event helper.
 *
 * No third-party analytics is loaded by this site. Events are only pushed if a
 * `window.dataLayer` has been provided by an approved, consented tag manager.
 * Client-acquisition and recruitment events are namespaced separately so
 * candidate applications are never counted as client conversions.
 */
export type Audience = "client" | "candidate";

export type ClientEvent =
  | "client_consultation_cta_click"
  | "client_form_start"
  | "client_form_complete"
  | "client_booking_confirmed";

export type CandidateEvent =
  | "careers_cta_click"
  | "candidate_job_view"
  | "candidate_application_start"
  | "candidate_application_submit";

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function track(event: ClientEvent | CandidateEvent, audience: Audience, detail: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  if (!Array.isArray(w.dataLayer)) return;
  w.dataLayer.push({ event, audience, ...detail });
}
