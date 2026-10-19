"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import type { ZodType } from "zod";
import { toFieldErrors, type FieldErrors } from "@/lib/validation";

export type SubmitStatus = "idle" | "submitting" | "success" | "not_configured" | "failed";

/**
 * Shared client-side submission flow: validate → POST → honest status.
 * Success is only reported when the server confirms delivery to the webhook.
 */
export function useSubmission<T>({
  schema,
  endpoint,
  toPayload,
  onStart,
  onSuccess,
}: {
  schema: ZodType<T>;
  endpoint: string;
  /** Build the raw object for validation and the request body from the form. */
  toPayload: (form: HTMLFormElement) => { raw: Record<string, unknown>; body: BodyInit; json: boolean };
  onStart?: () => void;
  onSuccess?: () => void;
}) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const started = useRef(false);
  const attempted = useRef(false);
  const summaryRef = useRef<HTMLDivElement | null>(null);

  const markStarted = useCallback(() => {
    if (started.current) return;
    started.current = true;
    onStart?.();
  }, [onStart]);

  const revalidate = useCallback(
    (form: HTMLFormElement) => {
      if (!attempted.current) return;
      const { raw } = toPayload(form);
      const result = schema.safeParse(raw);
      setErrors(result.success ? {} : toFieldErrors(result.error));
    },
    [schema, toPayload],
  );

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      attempted.current = true;
      const { raw, body, json } = toPayload(form);
      const result = schema.safeParse(raw);
      if (!result.success) {
        setErrors(toFieldErrors(result.error));
        setStatus("idle");
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }
      setErrors({});
      setStatus("submitting");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: json ? { "Content-Type": "application/json" } : undefined,
          body,
        });
        const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: FieldErrors };
        if (res.ok && data.ok) {
          setStatus("success");
          onSuccess?.();
          return;
        }
        if (data.error === "validation" && data.fields) {
          setErrors(data.fields);
          setStatus("idle");
          requestAnimationFrame(() => summaryRef.current?.focus());
          return;
        }
        setStatus(data.error === "not_configured" ? "not_configured" : "failed");
      } catch {
        setStatus("failed");
      }
    },
    [endpoint, schema, toPayload, onSuccess],
  );

  return { errors, status, summaryRef, onSubmit, markStarted, revalidate };
}
