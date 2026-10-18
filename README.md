# Credexus

Marketing and recruitment site for **Credexus**. Credexus connects software engineers in Latin America, Asia, Europe and Canada with remote AI training and evaluation work. It is free for candidates.

- **Framework:** React Router v7 (framework mode, the successor to Remix), with SSR on Vite
- **UI:** Tailwind CSS v4, shadcn/ui primitives (Radix), Magic UI components, Framer Motion
- **Email:** [Resend](https://resend.com). Form submissions, including the CV attachment, are emailed to your inbox
- **Hosting:** Vercel. Import the GitHub repo and set the production branch to `main`.

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

## Animations

The motion system follows the Avenna template. Every tween uses 0.6s with `cubic-bezier(.44,0,.56,1)` and scroll-linked springs use damping 60 / stiffness 500. The tokens live in `app/lib/motion.ts`.

| Effect                                                                               | Where                                       | Component                             |
| ------------------------------------------------------------------------------------ | ------------------------------------------- | ------------------------------------- |
| Smooth scrolling (Lenis)                                                             | Site-wide; off for reduced-motion and touch | `components/motion/smooth-scroll.tsx` |
| Pinned hero zoom: the card zooms 1→2.4 while the text lifts and fades                | Home hero                                   | `components/sections/hero.tsx`        |
| Scroll reveal: fade + 30px rise; grids stagger 0.1s; icons go from blurred to sharp  | All sections                                | `components/magicui/blur-fade.tsx`    |
| Numbered tabs with a cross-fade, blur-to-sharp copy and a spring indicator           | Home, "The work"                            | `components/sections/work-tabs.tsx`   |
| Character-by-character reveal scrubbed by scroll                                     | Home, "Why we exist"                        | `components/motion/scrub-text.tsx`    |
| Heading zooms from 1.8 to 1 on scroll                                                | Home, Regions                               | `components/motion/scroll-zoom.tsx`   |
| 3D tilt on hover (tilts away from the cursor)                                        | Match card, region cards                    | `components/motion/tilt.tsx`          |
| Light sweep when a card comes into view                                              | Match card, region cards                    | `components/motion/shine.tsx`         |
| Underwater light rays plus drifting particles (a port of Avenna's Light Rays shader) | Top of every page, CTA band                 | `components/motion/light-rays.tsx`    |
| FAQ height animation and spring icon                                                 | Accordion                                   | `components/ui/accordion.tsx`         |
| Spring hover on buttons                                                              | Buttons                                     | `components/ui/button.tsx`            |

Reduced-motion users get static content: Lenis is off, transforms are disabled through `MotionConfig`, text appears fully, and the light rays render a single frame.

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

## Git workflow (automated pipeline)

Commits follow [Conventional Commits](https://www.conventionalcommits.org). Husky + commitlint check them when you commit, and the pipeline checks them again.

`feat` · `fix` · `docs` · `test` · `refactor` · `perf` · `style` · `build` · `ci` · `chore` · `revert`

**Make one branch per change.** Branch off the latest `dev`, commit, push. The pipeline handles the rest:

```bash
git checkout dev && git pull
git checkout -b feat/hero-copy        # or fix/<topic>
git commit -m "feat(home): sharpen hero copy"
git push -u origin feat/hero-copy
```

| Step             | What `.github/workflows/pipeline.yml` does                                                          |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| 1. Feature PR    | Opens a PR **feat/fix → dev**, or reuses one you opened yourself                                    |
| 2. Checks        | Commitlint, Prettier, ESLint, typecheck, production build                                           |
| 3. Review        | Posts a Claude review (`gh pr review`) and a **CI report** comment (results and bundle size)        |
| 4. Merge         | If every check passed, merges with a **merge commit** (never squash) and deletes the feature branch |
| 5. Release PR    | Opens or updates a PR **dev → main** and runs the same checks, review and report on it              |
| 6. Merge to main | Merges with a merge commit (turn this off by setting the variable `AUTO_MERGE_TO_MAIN=false`)       |

If a check fails, the PR stays open with the report comment. Push a fix to the same branch and the pipeline runs again. Pushing to `dev` directly (or merging into it by hand) starts at step 5.

### GitHub configuration

| Where                                               | Setting                                                      | Value                                                                                                                |
| --------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Settings → Actions → General → Workflow permissions | **Read and write permissions**                               | Required: the pipeline pushes merges                                                                                 |
| Same page                                           | **Allow GitHub Actions to create and approve pull requests** | Required: the pipeline opens the PRs                                                                                 |
| Settings → General → Pull Requests                  | Merge button                                                 | Keep "Allow merge commits". Turn off squash and rebase merging.                                                      |
| Vercel                                              | Import this GitHub repo                                  | Production branch `main`. Set `RESEND_API_KEY`, `LEADS_TO_EMAIL`, `LEADS_FROM_EMAIL`, and `VITE_SITE_URL` in the Vercel project environment. |
| Actions secret                                      | `ANTHROPIC_API_KEY` **or** `CLAUDE_CODE_OAUTH_TOKEN`         | Turns on Claude review comments. For the second option, run `claude setup-token` (uses a Claude Pro/Max plan).       |
| Actions variable (optional)                         | `AUTO_MERGE_TO_MAIN`                                         | Set to `false` to stop at an open, reviewed dev → main PR.                                                           |

Don't add branch protection that requires approving reviews: the pipeline merges with the built-in `GITHUB_TOKEN`, which can't approve its own PRs.

Import the GitHub repo in Vercel, set the production branch to `main`, and set `RESEND_API_KEY`, `LEADS_TO_EMAIL`, `LEADS_FROM_EMAIL`, and `VITE_SITE_URL` in the Vercel project environment. Vercel deploys `main` on each push.

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
