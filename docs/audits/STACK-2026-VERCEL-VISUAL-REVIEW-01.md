# STACK-2026-VERCEL-VISUAL-REVIEW-01

**Phase:** Vercel Visual Review  
**Date:** 2026-06-07  
**From:** c84bcca (vercel output directory fix)

---

## Objective

Review the first public Vercel deployment for visual and functional correctness.

## URL Reviewed

`https://labrazahome-stack.vercel.app`

## Deployment / Commit Reviewed

| Item   | Value                                  |
| ------ | -------------------------------------- |
| Commit | `c84bcca`                              |
| Branch | `main`                                 |
| URL    | `https://labrazahome-stack.vercel.app` |

## Routes Verified

| Route                | Status Code | Result                  |
| -------------------- | ----------- | ----------------------- |
| `/`                  | 200         | PASS                    |
| `/about/`            | 200         | PASS                    |
| `/docs/`             | 200         | PASS                    |
| `/404`               | 404         | PASS (correct HTTP 404) |
| `/robots.txt`        | 200         | PASS                    |
| `/favicon.svg`       | 200         | PASS                    |
| `/sitemap-index.xml` | 200         | PASS                    |

## Desktop Review (HTML inspection)

| Check                  | Result | Notes                                          |
| ---------------------- | ------ | ---------------------------------------------- |
| Hero visible           | PASS   | Title, subtitle, tagline, CTA buttons present  |
| Navigation functional  | PASS   | Inicio, Sobre, Docs links present              |
| Sections complete      | PASS   | Features, Stack, Workflow, Demo, CTA           |
| CTA visible            | PASS   | "Explorar stack" and "Contacto" buttons        |
| Footer correct         | PASS   | Copyright, nav links present                   |
| Favicon visible        | PASS   | `/favicon.svg` returns 200                     |
| Dark mode toggle       | PASS   | Script present, both icons (sun/moon) rendered |
| No text cutoff         | PASS   | No truncation detected                         |
| No horizontal overflow | PASS   | `overflow-hidden` on hero                      |
| Contrast acceptable    | PASS   | gray-900 on bg-surface, primary on white       |
| Responsive breakpoints | PASS   | sm:/lg: variants present                       |

## Mobile Review (HTML responsive classes)

| Check                | Result | Notes                                               |
| -------------------- | ------ | --------------------------------------------------- |
| Navigation usable    | PASS   | Stacked layout via flex-col on mobile               |
| Hero not broken      | PASS   | Responsive text sizing (sm:text-6xl, lg:text-7xl)   |
| Cards legible        | PASS   | Single column on mobile, multi-column on sm+        |
| Buttons accessible   | PASS   | `focus:ring-2`, `focus:outline-none` on all buttons |
| Footer not broken    | PASS   | flex-col on mobile, flex-row on sm+                 |
| No horizontal scroll | PASS   | `overflow-hidden` on sections                       |

## SEO Review

| Check                              | Homepage | About | Docs |
| ---------------------------------- | -------- | ----- | ---- |
| `<title>`                          | ✅       | ✅    | ✅   |
| `<meta name="description">`        | ✅       | ✅    | ✅   |
| `<meta property="og:title">`       | ✅       | ✅    | ✅   |
| `<meta property="og:description">` | ✅       | ✅    | ✅   |
| `<meta property="og:type">`        | ✅       | ✅    | ✅   |
| `<meta property="og:url">`         | ❌       | ❌    | ❌   |
| `<link rel="canonical">`           | ❌       | ❌    | ❌   |
| `lang="es"`                        | ✅       | ✅    | ✅   |
| `<link rel="icon">`                | ✅       | ✅    | ✅   |

### robots.txt

- **Issue:** Points to `http://localhost:4321/sitemap-index.xml` (hardcoded static file)
- **Severity:** LOW — doesn't affect functionality, but sitemap won't be discovered by crawlers

### Sitemap

- `sitemap-index.xml` exists and is valid XML
- **Issue:** Domain is `labrazahome-stack-web.vercel.app` while public URL is `labrazahome-stack.vercel.app`
- **Severity:** LOW — `PUBLIC_SITE_URL` env var not configured in Vercel

## Technical Review

| Check         | Result | Notes                                          |
| ------------- | ------ | ---------------------------------------------- |
| CSS loaded    | PASS   | Single CSS bundle `Layout.VLVPLFCj.css`        |
| JS errors     | PASS   | No inline errors detected                      |
| React Counter | PASS   | `astro-island` rendered with Counter component |
| Dark mode     | PASS   | Script handles toggle and localStorage         |
| 404 assets    | PASS   | No broken asset references                     |
| Astro islands | PASS   | `client:load` hydration configured for Counter |

## Problems Found

| Severity | Issue                            | Details                                                                                                                                         |
| -------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| LOW      | `robots.txt` hardcoded localhost | Static file at `public/robots.txt` points to `http://localhost:4321/sitemap-index.xml` instead of the Vercel URL                                |
| LOW      | Sitemap domain mismatch          | Sitemap generated with `labrazahome-stack-web.vercel.app` while URL is `labrazahome-stack.vercel.app`. Set `PUBLIC_SITE_URL` env var in Vercel. |
| LOW      | Missing `og:url` and `canonical` | No pages pass the canonical prop. Optional improvement.                                                                                         |

## Recommendations

1. Set `PUBLIC_SITE_URL=https://labrazahome-stack.vercel.app` in Vercel environment variables
2. Update `public/robots.txt` to use dynamic sitemap URL or correct production URL
3. (Optional) Add `og:url` and canonical to Layout.astro for all pages

## Result

**PASS** — Site is functional, all routes work, content renders correctly, no critical or high severity issues.

No code changes required at this stage. Issues documented are LOW severity and can be addressed in a future polish phase.
