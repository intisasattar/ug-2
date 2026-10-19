// Usage: node scripts/form-test.mjs <baseUrl> <expect: not_configured|success>
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const pw = require("/opt/node22/lib/node_modules/playwright");
const [base, expect] = process.argv.slice(2);
const browser = await pw.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const log = (...a) => console.log(...a);

await page.goto(base + "/contact", { waitUntil: "load" });

// 1. Business: empty submit shows errors, focus on summary
await page.click("text=Submit Business Enquiry");
await page.waitForTimeout(300);
const errCount = await page.locator("#business [aria-invalid='true']").count();
const focused = await page.evaluate(() => document.activeElement?.getAttribute("aria-labelledby"));
log("business invalid fields:", errCount, "summary focused:", focused);

// 2. Fill business validly
await page.fill("#biz-businessName", "Test Agency Ltd");
await page.fill("#biz-contactName", "Alex Test");
await page.fill("#biz-email", "not-an-email");
await page.selectOption("#biz-market", "United Kingdom");
await page.selectOption("#biz-industry", "Marketing agency");
await page.selectOption("#biz-monthlyVolume", "10–25 per month");
await page.selectOption("#biz-dealSize", "2,500–10,000");
await page.selectOption("#biz-salesProcess", "In-house sales team");
await page.check("#biz-supportTypes-2", { force: true });
await page.check("#biz-privacy", { force: true });
await page.click("text=Submit Business Enquiry");
await page.waitForTimeout(300);
log("email error:", await page.locator("#biz-email-error").textContent());
await page.fill("#biz-email", "alex@example.com");
await page.click("text=Submit Business Enquiry");
await page.waitForTimeout(1500);
log("business status:", (await page.locator("#business").innerText()).match(/not yet connected|has been received|could not send/i)?.[0]);

// 3. Candidate
await page.fill("#cand-fullName", "Sam Candidate");
await page.fill("#cand-email", "sam@example.com");
await page.fill("#cand-country", "Canada");
await page.selectOption("#cand-timeZone", "US / Canada Eastern");
await page.fill("#cand-linkedin", "linkedin.com/in/sam");
await page.selectOption("#cand-experienceLevel", "Developing closer");
await page.selectOption("#cand-salesMix", "Mostly B2B");
await page.selectOption("#cand-dealExperience", "2,500–10,000");
await page.selectOption("#cand-salesCycle", "Up to 2 weeks");
await page.fill("#cand-salesBackground", "Two years in SaaS sales development and closing.");
await page.selectOption("#cand-arrangement", "Open to either");
await page.selectOption("#cand-availability", "Full-time");
await page.fill("#cand-languages", "English (fluent)");
await page.fill("#cand-objectionAnswer", "I would acknowledge the timing concern, ask what would need to change for the timing to be right, and agree a specific follow-up.");
await page.check("#cand-assessmentPreference-1", { force: true });
await page.check("#cand-privacy", { force: true });
await page.click("button:has-text('Submit Your Profile')");
await page.waitForTimeout(400);
log("sample authorisation required error:", await page.locator("#cand-sampleAuthorised-error").count());
await page.check("#cand-sampleAuthorised", { force: true });
await page.click("button:has-text('Submit Your Profile')");
await page.waitForTimeout(1500);
log("candidate status:", (await page.locator("#candidate").innerText()).match(/not yet connected|has been received|could not send/i)?.[0]);
await browser.close();
