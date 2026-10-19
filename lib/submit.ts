import "server-only";

export type ForwardResult = { ok: true } | { ok: false; reason: "not_configured" | "delivery_failed" };

/**
 * Forward a validated submission to a configured webhook.
 * The URL and secret are read server-side only and never exposed to the browser.
 */
export async function forwardToWebhook(
  url: string | undefined,
  secret: string | undefined,
  body: BodyInit,
  contentType?: string,
): Promise<ForwardResult> {
  if (!url) return { ok: false, reason: "not_configured" };
  try {
    const headers: Record<string, string> = {};
    if (contentType) headers["Content-Type"] = contentType;
    if (secret) headers["X-Webhook-Secret"] = secret;
    const res = await fetch(url, {
      method: "POST",
      headers,
      body,
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`[forms] webhook responded ${res.status}`);
      return { ok: false, reason: "delivery_failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[forms] webhook delivery error", err instanceof Error ? err.message : err);
    return { ok: false, reason: "delivery_failed" };
  }
}
