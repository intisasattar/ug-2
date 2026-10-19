import { NextResponse } from "next/server";
import { businessEnquirySchema, toFieldErrors } from "@/lib/validation";
import { forwardToWebhook } from "@/lib/submit";

/**
 * Business enquiries → business-development pipeline ONLY (BUSINESS_WEBHOOK_URL).
 * Candidate applications are handled by a separate route and destination.
 */
export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (typeof data.company_url === "string" && data.company_url.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = businessEnquirySchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation", fields: toFieldErrors(parsed.error) }, { status: 422 });
  }

  const payload = {
    type: "business_enquiry",
    pipeline: "business-development",
    submittedAt: new Date().toISOString(),
    ...parsed.data,
  };

  const result = await forwardToWebhook(
    process.env.BUSINESS_WEBHOOK_URL,
    process.env.BUSINESS_WEBHOOK_SECRET,
    JSON.stringify(payload),
    "application/json",
  );

  if (!result.ok) {
    const status = result.reason === "not_configured" ? 503 : 502;
    return NextResponse.json({ ok: false, error: result.reason }, { status });
  }
  return NextResponse.json({ ok: true });
}
