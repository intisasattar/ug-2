# UG Global website

Marketing website for UG Global, a specialist B2B sales-closing and pipeline follow-up company.
Built with Next.js (App Router), TypeScript and plain CSS (design tokens + CSS Modules). No UI or animation libraries.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

| Command | Purpose |
|---|---|
| `npm run dev` | Local development |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` | ESLint (Next.js config) |
| `npm run typecheck` | TypeScript check |

QA helper scripts (use the pre-installed Playwright): `scripts/shots.mjs` (screenshots, overflow/H1/console checks),
`scripts/form-test.mjs` (form validation and delivery), `scripts/a11y-check.mjs` (reduced motion, menu, accordion,
internal links, placeholder scan), `scripts/mock-webhooks.mjs` (local webhook receivers).

## Environment variables

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public | Canonical origin for canonical URLs, sitemap and Open Graph. **Set before launch.** |
| `NEXT_PUBLIC_BOOKING_URL` | public | Optional scheduling page. If empty, consultation CTAs go to `/contact#business`. |
| `BUSINESS_WEBHOOK_URL` | server | Business enquiries are POSTed here as JSON. Business-development pipeline only. |
| `BUSINESS_WEBHOOK_SECRET` | server | Optional; sent as `X-Webhook-Secret`. |
| `RECRUITMENT_WEBHOOK_URL` | server | Candidate applications are POSTed here as `multipart/form-data` (`application` JSON field + optional `cv` file). Recruitment pipeline only. |
| `RECRUITMENT_WEBHOOK_SECRET` | server | Optional; sent as `X-Webhook-Secret`. |

Works with any webhook receiver (Zapier, Make, HubSpot workflows, a custom endpoint, etc.).

**Honest delivery:** if a webhook URL is not set, the form tells the visitor their details have *not* been sent
(HTTP 503 `not_configured`). If the webhook fails, it says so (HTTP 502). A success message is shown only after the
webhook returns 2xx. Both routes re-validate input server-side and include a honeypot field.

## Structure

```
app/                     Pages (/, /services, /how-we-work, /results, /about, /careers, /contact, /privacy, /cookies)
app/api/enquiry/*        Separate business and candidate submission handlers
app/globals.css          Design tokens (colours, type, spacing, radii, motion) and reveal-animation system
components/              Header, Footer, PageHero, ServiceGrid, ProcessSteps, Accordion, CtaPanel, CaseStudyCard, forms/…
content/                 Editable copy and data: site.ts, seo.ts, copy.ts, faqs.ts, caseStudies.ts, vacancies.ts
lib/                     Validation (zod), form options, webhook forwarder, analytics helper
```

### Content you can edit safely
- **Company details**: `content/site.ts` (`legalName`, `registrationNumber`, `address`, `email`, `phone`, `social`).
  `null` values are not rendered.
- **Case studies**: `content/caseStudies.ts`. Only entries with `approvalStatus: "approved"` are shown.
- **Vacancies**: `content/vacancies.ts`. Only `published: true` entries are shown; otherwise Careers shows a
  "submit your profile" state.
- **SEO titles/descriptions**: `content/seo.ts`.

## Design system
- Brand palette: all eight colours as `--color-*` tokens. Semantic tokens map them to text, surfaces, borders and buttons.
- Contrast: Slate `#747B87` on Porcelain is 3.8:1, so small text uses a derived `--color-slate-strong` (`#5B626E`,
  5.3:1). Cobalt on white/porcelain is ≥5.5:1. On dark surfaces links use Mineral Blue (8.6:1 on Ink).
- Typography: Playfair Display (headings) + Inter (body) via `next/font` (self-hosted, `display: swap`).
- Motion: masked headline reveal, staggered fade-ups, rule draws, word-by-word pull quotes, scroll-linked process
  timelines, gentle parallax and a hide-on-scroll header. Only `transform`/`opacity` are animated. Motion is fully
  disabled under `prefers-reduced-motion`, and content stays visible if JavaScript fails.
- Imagery: typographic and architectural line-art only. When approved photography is available, it can replace
  `ArchitecturalMotif` in `PageHero`/`CtaPanel` (use `next/image`).

## Analytics
No analytics or third-party scripts are loaded, and no cookies are set. `lib/analytics.ts` pushes events to
`window.dataLayer` only if an approved, consented tag manager provides one. Client events (`client_*`) and candidate
events (`careers_*`, `candidate_*`) are namespaced separately so applications never count as client conversions.
Add a consent mechanism before enabling any non-essential tracking.

## Outstanding approvals before launch
These items are intentionally **not** invented on the site:

- [ ] Corporate identity: legal name, registration number, address, contact email/phone (`content/site.ts`)
- [ ] Approved logo (currently a text wordmark in `components/Wordmark.tsx`)
- [ ] Founder: confirmed identity, title, biography, photo/video for the About page (not rendered until approved)
- [ ] Case studies: facts, baselines, measurement windows, outcomes, permissions, anonymisation
- [ ] Industry categories shown on the homepage (`content/copy.ts → audienceCategories`) are confirmed
- [ ] Current vacancies with confirmed arrangement, eligibility and compensation structure
- [ ] Full privacy notice (incl. recruitment data retention and cross-border transfers) to replace `/privacy`
- [ ] Cookie consent, if analytics or other non-essential technologies are added
- [ ] `BUSINESS_WEBHOOK_URL` / `RECRUITMENT_WEBHOOK_URL` destinations, tested end to end
- [ ] `NEXT_PUBLIC_BOOKING_URL`, if a scheduling tool is used
- [ ] Production domain in `NEXT_PUBLIC_SITE_URL`
- [ ] Any advertised consultation duration or "no obligation" wording (currently omitted)

## Deploying to Vercel
Import the repository in Vercel (framework preset: Next.js), add the environment variables above for Production and
Preview, and deploy. No other configuration is required.
