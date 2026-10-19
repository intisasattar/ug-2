// Usage: node scripts/shots.mjs <baseUrl> <outDir> [paths...]
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let pw;
try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const [base = "http://localhost:3000", out = "qa-output", ...paths] = process.argv.slice(2);
const pages = paths.length ? paths : ["/"];
const widths = (process.env.WIDTHS || "390,1440").split(",").map(Number);
const fs = await import("node:fs");
fs.mkdirSync(out, { recursive: true });
const browser = await pw.chromium.launch();
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 600 ? 844 : 900 }, reducedMotion: process.env.REDUCED ? "reduce" : "no-preference" });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: "load" });
    // scroll through to trigger reveals
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 500) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(120); }
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    const name = (p === "/" ? "home" : p.replace(/\//g, "_").replace(/^_/, "")) + `-${w}.png`;
    await page.screenshot({ path: `${out}/${name}`, fullPage: true });
    const info = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      h1: document.querySelectorAll("h1").length,
    }));
    console.log(w, p, JSON.stringify(info), errors.length ? "ERRORS: " + errors.join(" | ") : "");
    errors.length = 0;
  }
  await ctx.close();
}
await browser.close();
