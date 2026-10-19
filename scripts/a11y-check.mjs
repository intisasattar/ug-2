import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const pw = require("/opt/node22/lib/node_modules/playwright");
const base = process.argv[2];
const browser = await pw.chromium.launch();
// Reduced motion: everything visible immediately
let ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
let page = await ctx.newPage();
await page.goto(base + "/", { waitUntil: "load" });
await page.waitForTimeout(300);
const hidden = await page.evaluate(() => [...document.querySelectorAll("[data-reveal],[data-stagger] > *")].filter((e) => getComputedStyle(e).opacity === "0").length);
console.log("reduced-motion: js-motion class =", await page.evaluate(() => document.documentElement.classList.contains("js-motion")), "hidden elements =", hidden);
await ctx.close();
// Mobile menu keyboard
ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
page = await ctx.newPage();
await page.goto(base + "/", { waitUntil: "load" });
await page.keyboard.press("Tab");
console.log("first tab:", await page.evaluate(() => document.activeElement?.textContent));
await page.click("button[aria-controls='mobile-menu']");
await page.waitForTimeout(500);
console.log("menu expanded:", await page.getAttribute("button[aria-controls='mobile-menu']", "aria-expanded"), "focus:", await page.evaluate(() => document.activeElement?.textContent));
await page.screenshot({ path: "qa-output/menu-390.png" });
await page.keyboard.press("Escape");
await page.waitForTimeout(300);
console.log("after Esc expanded:", await page.getAttribute("button[aria-controls='mobile-menu']", "aria-expanded"), "focus on toggle:", await page.evaluate(() => document.activeElement?.getAttribute("aria-controls")));
// Accordion keyboard
await page.goto(base + "/services", { waitUntil: "load" });
const btn = page.locator("button[aria-expanded]").filter({ hasText: "pricing" });
await btn.focus(); await page.keyboard.press("Enter");
console.log("accordion pricing expanded:", await btn.getAttribute("aria-expanded"));
// Internal links
const links = new Set();
for (const p of ["/", "/services", "/how-we-work", "/results", "/about", "/careers", "/contact", "/privacy", "/cookies"]) {
  await page.goto(base + p, { waitUntil: "load" });
  (await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")))).forEach((h) => links.add(h.split("#")[0] || "/"));
}
for (const l of links) { const r = await page.request.get(base + l); if (r.status() !== 200) console.log("BROKEN", l, r.status()); }
console.log("checked internal links:", [...links].join(" "));
// Placeholder scan
for (const p of ["/", "/services", "/how-we-work", "/results", "/about", "/careers", "/contact"]) {
  const html = await (await page.request.get(base + p)).text();
  const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
  const m = text.match(/\[[^\]]{0,40}\]/g);
  if (m) console.log("PLACEHOLDER?", p, m.slice(0, 3));
}
await browser.close();
