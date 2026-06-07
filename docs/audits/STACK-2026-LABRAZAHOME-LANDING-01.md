# STACK-2026-LABRAZAHOME-LANDING-01 — LabrazaHome Labs Corporate Landing

- **Date:** 2026-06-07
- **Status:** Completed
- **Auditor:** AI-assisted

## Objective

Transform the generic "Stack 2026" landing into the official corporate landing for **LabrazaHome Labs** — the digital innovation laboratory for the premium agri-food sector.

## Changes Made

### Design Tokens (`apps/web/src/styles/global.css`)

- Added premium color palette: `primary-light`, `card`/`card-dark`, `muted`/`muted-dark`, `border`/`border-dark`
- Added `container-narrow` utility for constrained text sections
- Added `gradient-text` utility for the hero title gradient effect
- Set Inter as the default font family
- Surface colors refined to `#fafafa` / `#09090b` for cleaner aesthetic

### Layout (`apps/web/src/layouts/Layout.astro`)

- Branding changed from "Stack 2026" to **LabrazaHome Labs** with colored logo
- Navigation updated: Inicio, Ecosistema, Tecnología, Visión, Contacto (all scroll-linked)
- Added Inter font via Google Fonts with preconnect
- Added responsive mobile hamburger menu with toggle
- Header changed to fixed position with backdrop blur
- Footer updated with LabrazaHome Labs branding and vision statement
- All color references updated to use `zinc`/`muted`/`border` tokens

### Landing Page (`apps/web/src/pages/index.astro`)

Complete rewrite with 6 sections:

| Section    | ID            | Content                                                                                                                                           |
| ---------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero       | —             | "LabrazaHome Labs" with gradient text, subtitle, two CTAs ("Explorar ecosistema" → #ecosistema, "Conocer la visión" → #vision)                    |
| Ecosistema | `#ecosistema` | 5 product cards: Rioja Marketplace (base), Sommelier AI v2 (en desarrollo), Portal B2B v2, Backoffice Admin v2, Catálogo Premium v2               |
| Tecnología | `#tecnologia` | 4-column grid: Frontend (Astro/React/TS), Backend (Fastify/Prisma), Infraestructura (PostgreSQL/GitHub/Vercel), IA (AI-LAB/LM Studio/open source) |
| Visión     | `#vision`     | Vision statement with 4 pillars: Productores, Distribuidores, Profesionales, Clientes finales                                                     |
| Roadmap    | `#roadmap`    | 8 cards: 4 completed (✓, green) + 4 upcoming (◯, neutral)                                                                                         |
| CTA Final  | `#contacto`   | "El futuro de LabrazaHome ya está en construcción" with "Seguir evolución" button                                                                 |

### Supporting Pages

- **about.astro**: Rewritten with LabrazaHome Labs branding, vision, and tech stack
- **docs/index.astro**: Updated branding, color tokens, and terminology
- **404.astro**: Updated branding, cleaner error page with 404 section label

### Removed

- Deleted unused components: `Hero.astro`, `FeatureGrid.astro`, `TechStack.astro`, `Steps.astro`, `CTA.astro`
- The `Counter.tsx` React component was kept (no harm, still in the tree)

### SEO

All pages updated:

- Title: `LabrazaHome Labs — ...`
- Description: references to "innovación digital agroalimentaria"
- Canonical paths preserved on all pages

## Files Modified

| File                                        | Action                                            |
| ------------------------------------------- | ------------------------------------------------- |
| `apps/web/src/styles/global.css`            | Modified — premium tokens, utilities, Inter font  |
| `apps/web/src/layouts/Layout.astro`         | Modified — full rewrite with LabrazaHome branding |
| `apps/web/src/pages/index.astro`            | Modified — full rewrite with 6 sections           |
| `apps/web/src/pages/about.astro`            | Modified — LabrazaHome Labs content               |
| `apps/web/src/pages/docs/index.astro`       | Modified — updated branding and tokens            |
| `apps/web/src/pages/404.astro`              | Modified — updated branding                       |
| `apps/web/src/components/Hero.astro`        | Deleted                                           |
| `apps/web/src/components/FeatureGrid.astro` | Deleted                                           |
| `apps/web/src/components/TechStack.astro`   | Deleted                                           |
| `apps/web/src/components/Steps.astro`       | Deleted                                           |
| `apps/web/src/components/CTA.astro`         | Deleted                                           |

## Validation

- `pnpm check` (lint + typecheck + build): ✅ Passed
- All 4 routes built successfully (`/`, `/about/`, `/docs/`, `/404`)
- Sitemap generated correctly

## Commit

```
HEAD: bbdec4f (pre-landing)
Final: (new commit after audit + push)
```

## Result

**RESULTADO: PASS**

- HEAD inicial: `bbdec4f fix(web): polish seo urls for vercel deployment`
- HEAD final: `(to be committed)`
- Componentes creados: Ninguno (todo inline en index.astro)
- Rutas modificadas: `Layout.astro`, `index.astro`, `about.astro`, `docs/index.astro`, `404.astro`
- Componentes eliminados: `Hero.astro`, `FeatureGrid.astro`, `TechStack.astro`, `Steps.astro`, `CTA.astro`
- Validaciones: `pnpm check` ✅
- URL Vercel a revisar: `https://labrazahome-stack.vercel.app`

## Next Phase Recommended

**STACK-2026-DESIGN-SYSTEM-01** — Create reusable UI components (Section, Card, Badge, Button) to consolidate patterns used in this landing.
