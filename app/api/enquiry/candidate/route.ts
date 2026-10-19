import { NextResponse } from "next/server";
import { CV_MAX_BYTES, CV_TYPES, candidateApplicationSchema, formDataToObject, toFieldErrors } from "@/lib/validation";
import { forwardToWebhook } from "@/lib/submit";

/**
 * Candidate applications → recruitment pipeline ONLY (RECRUITMENT_WEBHOOK_URL).
 * Never routed to the client lead pipeline.
 */
export async function POST(request: Request) {
  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  const honeypot = fd.get("company_url");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const cv = fd.get("cv");
  const file = cv instanceof File && cv.size > 0 ? cv : null;
  if (file) {
    if (file.size > CV_MAX_BYTES) {
      return NextResponse.json({ ok: false, error: "validation", fields: { cv: "Please attach a file smaller than 5 MB." } }, { status: 422 });
    }
    if (!CV_TYPES.includes(file.type)) {
      return NextResponse.json({ ok: false, error: "validation", fields: { cv: "Please attach a PDF or Word document." } }, { status: 422 });
    }
  }

  const raw = { ...formDataToObject(fd), hasCv: Boolean(file) };
  const parsed = candidateApplicationSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation", fields: toFieldErrors(parsed.error) }, { status: 422 });
  }

  const out = new FormData();
  out.set("type", "candidate_application");
  out.set("pipeline", "recruitment");
  out.set("submittedAt", new Date().toISOString());
  out.set("application", JSON.stringify(parsed.data));
  if (file) out.set("cv", file, file.name);

  const result = await forwardToWebhook(process.env.RECRUITMENT_WEBHOOK_URL, process.env.RECRUITMENT_WEBHOOK_SECRET, out);

  if (!result.ok) {
    const status = result.reason === "not_configured" ? 503 : 502;
    return NextResponse.json({ ok: false, error: result.reason }, { status });
  }
  return NextResponse.json({ ok: true });
}
