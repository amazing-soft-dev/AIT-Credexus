# Credexus

Marketing and recruitment site for **Credexus**. Credexus connects software engineers in Latin America, Asia, Europe and Canada with remote AI training and evaluation work. It is free for candidates.

- **Framework:** React Router v7 (framework mode, the successor to Remix), with SSR on Vite
- **UI:** Tailwind CSS v4, shadcn/ui primitives (Radix), Magic UI components, Framer Motion
- **Email:** [Resend](https://resend.com). Form submissions, including the CV attachment, are emailed to your inbox
- **Hosting:** Vercel, deployed by GitHub Actions on merge to `main`

---

## Getting started

```bash
nvm use            # Node 22 (see .nvmrc)
npm install
cp .env.example .env
npm run dev        # http://localhost:5173
```

When `RESEND_API_KEY` is not set, local form submissions are **printed to the terminal** and not emailed, so you can test forms without an account.

| Script                            | What it does                     |
| --------------------------------- | -------------------------------- |
| `npm run dev`                     | Dev server with HMR              |
| `npm run build`                   | Production build (Vercel output) |
| `npm run typecheck`               | Route typegen + `tsc`            |
| `npm run lint` / `npm run format` | ESLint / Prettier                |

## Environment variables

Set these in Vercel under **Project → Settings → Environment Variables**:

| Name                      | Required | Description                                                                                                                         |
| ------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_SITE_URL`           | ✅       | Public origin, e.g. `https://credexus.com`. Used for canonical URLs, sitemap and OG tags (read at build time).                      |
| `RESEND_API_KEY`          | ✅ prod  | Resend API key. The free tier allows 3,000 emails/month and 100/day.                                                                |
| `LEADS_TO_EMAIL`          | ✅ prod  | Inbox that receives applications and inquiries. Separate several addresses with commas.                                             |
| `LEADS_FROM_EMAIL`        | ✅ prod  | Verified sender, e.g. `Credexus <noreply@credexus.com>`. You must [verify your domain](https://resend.com/domains) in Resend first. |
| `SEND_CONFIRMATION_EMAIL` | optional | `true` sends applicants a "we received your application" email. Each one counts against the Resend quota.                           |

## Project structure

```
app/
  root.tsx                 Document shell, header/footer, error boundary
  entry.server.tsx         SSR entry; inlines CSS for fast first paint
  routes.ts                Route table
  routes/                  Pages + resource routes (api.*, sitemap, robots)
  components/
    ui/                    shadcn/ui primitives (button, input, accordion…)
    magicui/               Magic UI components (marquee, border-beam, blur-fade…)
    sections/              Page sections (hero, steps, job card…)
    forms.tsx              Application / partner / contact forms
  data/                    ← All editable content lives here
  lib/                     SEO helpers, validation, email
public/                    Fonts, images, icons, OG image
```

### Pages

| Route                                                               | Page                                                                        |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `/`                                                                 | Home                                                                        |
| `/for-engineers`                                                    | Candidate landing page and application form (`#apply`)                      |
| `/for-partners`                                                     | Partner landing page and inquiry form (`#inquire`)                          |
| `/how-it-works`, `/about`, `/faq`, `/contact`, `/privacy`, `/terms` | Static pages                                                                |
| `/platforms`, `/platforms/:platformSlug`                            | Platform directory and per-platform SEO pages                               |
| `/jobs`, `/jobs/:jobId`                                             | Job board (filter with `?region=` and `?q=`) and job detail with apply form |
| `/latam`, `/asia`, `/europe`, `/canada`                             | Regional landing pages                                                      |
| `/sitemap.xml`, `/robots.txt`                                       | Generated from the data files                                               |

## Editing content

All copy that changes often lives in `app/data/`:

- **`jobs.ts`**: job listings. ⚠️ The included roles are **examples** (`sample: true`). Sample roles show an "Example role" badge, are marked `noindex`, and are left out of the sitemap and `JobPosting` structured data. Replace them with real openings, or delete `sample: true`, before launch.
- **`platforms.ts`**: the platforms list. **Logos:** add `public/platforms/<slug>.svg` and set `logo: true` on that platform. Until then a monogram tile is shown. Only use a platform's logo if you are allowed to.
- **`regions.ts`**: copy for each regional page, plus the country codes used for the region suggestion.
- **`content.ts`**: FAQs, process steps, benefits and **testimonials**. The testimonials section stays hidden in production until you add real, consented quotes. In dev it shows dashed placeholders.
- **`site.ts`**: company emails, social links, navigation.

## Forms and email

- The forms post to `/api/apply`, `/api/partner` and `/api/contact`. Inputs are validated with Zod on the server (`app/lib/leads.ts`).
- The applicant's CV (PDF/DOC/DOCX, **max 4 MB**) is attached to the notification email. The 4 MB cap keeps requests under Vercel's 4.5 MB request-body limit.
- Spam protection uses a honeypot field and a minimum fill time. If spam becomes a problem, add Cloudflare Turnstile.
- Without JavaScript, forms still submit. The page redirects back with `?sent=` or `?form_error=`.

## GEO targeting

Content is **not** swapped by IP, because that would hurt SEO and caching. Instead:

1. Each region has its own indexable page: `/latam`, `/asia`, `/europe`, `/canada`.
2. After the page loads, `/api/geo` reads Vercel's `x-vercel-ip-country` header. If the visitor's country maps to a region, a small "Based in X? See roles for you" prompt appears.

Pages stay CDN-cacheable (`s-maxage=3600, stale-while-revalidate`).

## SEO

- Every route sets its own title, description, canonical URL, OpenGraph and Twitter tags (`app/lib/seo.ts`).
- Structured data includes Organization, WebSite, BreadcrumbList, FAQPage, HowTo, ItemList and JobPosting (real jobs only).
- `robots.txt` blocks indexing on Vercel preview deployments.

## Git workflow

Commits follow [Conventional Commits](https://www.conventionalcommits.org). Husky + commitlint enforce this on commit, and CI enforces it on PRs.

`feat` · `fix` · `docs` · `test` · `refactor` · `perf` · `style` · `build` · `ci` · `chore` · `revert`

1. Branch off `dev`: `feat/<topic>` or `fix/<topic>`.
2. Open a PR **feature → dev**. CI runs format, lint, typecheck and build. The optional AI reviewer leaves comments. Merge **without squashing** to keep the history.
3. Open a PR **dev → main**, then review and merge.
4. Merging into `main` triggers **Deploy to Vercel (production)**.

### GitHub configuration

| Where             | Name                                 | Value                                                                             |
| ----------------- | ------------------------------------ | --------------------------------------------------------------------------------- |
| Actions secret    | `VERCEL_TOKEN`                       | Create one at vercel.com/account/tokens                                           |
| Actions secret    | `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` | From `.vercel/project.json` after running `npx vercel link`                       |
| Actions secret    | `ANTHROPIC_API_KEY`                  | _Optional_, for automated PR review comments                                      |
| Actions variable  | `ENABLE_AI_REVIEW`                   | `true` turns on the PR review workflow                                            |
| Branch protection | `main`, `dev`                        | Require PRs and the **CI** check. Allow merge commits and disable squash merging. |

`vercel.json` turns off Vercel's own Git auto-deploys for `main`, so production deploys only come from GitHub Actions. PR preview deployments still work.

## Pre-launch checklist

- [ ] Replace the example jobs in `app/data/jobs.ts`
- [ ] Confirm what you are allowed to say about each platform (names, logos, wording)
- [ ] Add real testimonials (or keep the section hidden)
- [ ] Have `/privacy` and `/terms` reviewed by a lawyer
- [ ] Check response-time promises in the copy ("within a few business days", "one business day")
- [ ] Verify your sending domain in Resend and set all environment variables
- [ ] Update the emails and social links in `app/data/site.ts`
- [ ] Submit `https://<domain>/sitemap.xml` in Google Search Console
- [ ] Run PageSpeed Insights against the production URL
