# STACK-2026-ECOSYSTEM-VERCEL-SMOKE-01 — Vercel Ecosystem Smoke Test

**Date:** 2026-06-08
**URL:** https://labrazahome-stack.vercel.app
**Expected HEAD:** `eb3107b`
**Deploy confirmed:** Content matches latest code (B2B v2 placeholder, Admin v2 placeholder, roadmaps updated)

## Routes Verified (11/11)

| Route                                    | Status  | Notes                                                             |
| ---------------------------------------- | ------- | ----------------------------------------------------------------- |
| `/`                                      | ✅ PASS | Landing loads, ecosystem visible, roadmap with correct states     |
| `/catalogo/`                             | ✅ PASS | Categories, products, mock banner                                 |
| `/catalogo/vinos/reserva-del-alto-ebro/` | ✅ PASS | Product detail, ratings (Parker 92), mock banner                  |
| `/sommelier/`                            | ✅ PASS | Chat loads, quick prompts, laboratorio badge                      |
| `/b2b/`                                  | ✅ PASS | Hero, KPIs, profiles, modules, flows, ecosystem, roadmap, warning |
| `/admin/`                                | ✅ PASS | KPIs, modules, workflows, RBAC, integrations, roadmap             |
| `/docs/`                                 | ✅ PASS | Documentation page loads, dev guide visible                       |
| `/about/`                                | ✅ PASS | About page loads                                                  |
| `/robots.txt`                            | ✅ PASS | Points to correct sitemap                                         |
| `/sitemap-index.xml`                     | ✅ PASS | Points to sitemap-0.xml                                           |
| `/sitemap-0.xml`                         | ✅ PASS | 23 URLs indexed, all correct                                      |

## Module Results

### Landing — ✅ PASS

- LabrazaHome Labs branding present
- 5 ecosystem products listed with correct statuses:
  - Rioja Marketplace: "Plataforma base"
  - Sommelier AI v2: "Completado"
  - Catálogo Premium v2: "Completado"
  - Portal B2B v2: "Arquitectura completa"
  - Backoffice Admin v2: "Arquitectura completa"
- Roadmap section shows all 9 phases with correct states
- Technology stack section present
- Footer with navigation and copyright

### Catálogo Premium v2 — ✅ PASS

- `/catalogo/` loads with all 5 categories
- Category filter buttons work (Todos, Vinos, Aceites, Mieles, Gourmet, Packs)
- 11 products visible with descriptions and tags
- Product detail page loads correctly with:
  - Ratings (Parker 92/100, Peñín/Decanter present)
  - Technical specs (variety, vintage, aging, alcohol)
  - Pairing suggestions
  - History section
  - Mock banner clearly displayed
  - "Prototipo" badge
- Navigation works between catalog and product detail

### Sommelier AI v2 — ✅ PASS

- Chat interface loads with initial greeting
- Quick prompt buttons visible (vino, maridaje, regalo, miel, aceite)
- Mode selector visible (Cliente Privado/B2B/Proveedor)
- Laboratorio badge present
- "Explorar Catálogo Premium" link present
- Input field visible at bottom

### Portal B2B v2 — ✅ PASS

- 8 sections all rendering correctly:
  - Hero with badges + CTA buttons
  - KPI strip (6 MetricCards)
  - 7 profile cards with priority + status
  - 12 module cards with relation tags
  - 3 workflow timelines
  - 4 integration cards
  - 5-point roadmap timeline
  - Amber laboratory warning box
- No real login, no real data visible
- Matches admin visual quality

### Backoffice Admin v2 — ✅ PASS

- 7 sections all rendering correctly:
  - Hero with badges
  - KPI strip (6 MetricCards with trends)
  - 10 module cards with status badges
  - 3 colored workflow timelines
  - 8 RBAC profile cards
  - 4 integration cards
  - 4-point roadmap timeline
- KPIs show mock values (128 products, 24 B2B accounts, etc.)
- No real admin functionality

### SEO — ✅ PASS

- `robots.txt` correctly points to `https://labrazahome-stack.vercel.app/sitemap-index.xml`
- `sitemap-index.xml` accessible and valid
- `sitemap-0.xml` contains all 23 URLs with correct paths
- No localhost references in sitemaps
- Canonical URLs appear correct in page metadata

## Issues Detected

| Issue                  | Severity | Description                                                                                                                                          |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/roadmap` returns 404 | LOW      | Roadmap is embedded in landing page and documented in `docs/roadmap.md`, but has no standalone route. Expected — navigation uses anchor `/#roadmap`. |

No CRITICAL, HIGH, or MEDIUM issues found.

## Local Build Validation

- `pnpm --filter web build` — ✅ 24 pages built successfully
- `pnpm check` — not executed (build already passed)

## Recommendation

**PASS** — All routes are operational, all modules render correctly, no regressions detected. The ecosystem is consistent across landing, catalog, sommelier, B2B, and admin. The single LOW issue (missing standalone /roadmap route) is by design — the roadmap is embedded in the landing page.

## Next Steps

- STACK-2026-SOMMELIER-PROFILE-MEMORY-01
