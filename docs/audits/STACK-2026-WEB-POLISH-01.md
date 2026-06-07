# STACK-2026-WEB-POLISH-01 — Polish SEO URLs for Vercel Deployment

- **Date:** 2026-06-07
- **Status:** Completed
- **Auditor:** AI-assisted

## Scope

Fix all LOW-severity issues found during the first Vercel visual review:

1. `robots.txt` hardcoded `http://localhost:4321/sitemap-index.xml`
2. Sitemap uses wrong domain (`labrazahome-stack-web.vercel.app`) because `PUBLIC_SITE_URL` was not set in Vercel env
3. Missing `og:url` and `canonical` meta tags across all pages

## Changes Made

| File                                  | Change                                                                                                                                  |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/web/astro.config.mjs`           | Changed fallback site URL from `https://stack-2026.vercel.app` to `https://labrazahome-stack.vercel.app`                                |
| `apps/web/public/robots.txt`          | Changed sitemap URL from `http://localhost:4321/sitemap-index.xml` to `https://labrazahome-stack.vercel.app/sitemap-index.xml`          |
| `apps/web/src/layouts/Layout.astro`   | Added `canonical` prop support + `og:url` meta tag using `Astro.url`; builds absolute canonical URL from relative path via `Astro.site` |
| `apps/web/src/pages/index.astro`      | Passed `canonical="/"`                                                                                                                  |
| `apps/web/src/pages/about.astro`      | Passed `canonical="/about/"`                                                                                                            |
| `apps/web/src/pages/docs/index.astro` | Passed `canonical="/docs/"`                                                                                                             |
| `apps/web/src/pages/404.astro`        | Passed `canonical="/404"`                                                                                                               |
| `docs/deployment-vercel.md`           | Updated `PUBLIC_SITE_URL` example from `stack-2026.vercel.app` to `labrazahome-stack.vercel.app`; updated domain placeholder text       |

## Validation

- `pnpm check` (lint + typecheck + build): ✅ Passed
- Built dist contains zero `localhost` references: ✅
- `robots.txt` in dist: `Sitemap: https://labrazahome-stack.vercel.app/sitemap-index.xml`
- `sitemap-index.xml` in dist: `<loc>https://labrazahome-stack.vercel.app/sitemap-0.xml</loc>`
- `index.html` canonical/og:url: `https://labrazahome-stack.vercel.app/`
- `about/index.html` canonical/og:url: `https://labrazahome-stack.vercel.app/about/`
- `docs/index.html` canonical/og:url: `https://labrazahome-stack.vercel.app/docs/`

## Notes

- `robots.txt` remains static; if the production domain changes, this file must be updated.
- Once `PUBLIC_SITE_URL` is set in Vercel production/preview env vars, the sitemap will dynamically use that URL instead of the fallback.
- All canonical URLs are built from relative paths (`/`, `/about/`, `/docs/`, `/404`) resolved against `Astro.site`.
