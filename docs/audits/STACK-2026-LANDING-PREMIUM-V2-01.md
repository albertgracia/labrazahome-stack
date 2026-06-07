# STACK-2026-LANDING-PREMIUM-V2-01 — Premium Landing V2

- **Date:** 2026-06-07
- **Status:** Completed
- **Auditor:** AI-assisted

## Objective

Transform the LabrazaHome Labs landing into a premium v2 with clearer messaging, better product focus, and enhanced visual hierarchy.

## Initial State

- HEAD: `9b46fae feat(web): create labrazahome labs design system`
- Git: clean, synced with origin/main
- Vercel: Ready

## Changes

### New Components Created (`src/components/landing/`)

| Component                   | Purpose                                                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `PremiumHero.astro`         | Hero with gradient title, extended subtitle, microcopy, 4 glassmorphism metric cards (5 módulos, 100% stack, AI-ready, V+G pipeline) |
| `EcosystemGrid.astro`       | Dynamic grid of product cards with status badges (base/development/design), Rioja Marketplace highlighted as first card              |
| `ArchitecturePreview.astro` | Visual tech stack in 5 cards with badge clusters (Frontend, Backend, Datos, Deploy, IA)                                              |
| `RoadmapTimeline.astro`     | Timeline component with 4 states (completed/in-progress/next/future), 8 phases from base to marketplace integration                  |
| `VisionSection.astro`       | Vision statement with 4 pillars: laboratorio primero, validación, integración controlada, foco premium                               |
| `FinalCTA.astro`            | Closing CTA with two buttons (Ver roadmap, Explorar tecnología)                                                                      |

### Modified Files

| File                       | Change                                                                                 |
| -------------------------- | -------------------------------------------------------------------------------------- |
| `src/pages/index.astro`    | Full rewrite: imports landing components, passes data arrays (products, roadmap items) |
| `src/layouts/Layout.astro` | Added "Roadmap" link to desktop nav, mobile nav, and footer                            |

### SEO Updated

- **Title:** `LabrazaHome Labs — Laboratorio digital agroalimentario premium`
- **Description:** `Laboratorio digital para construir Sommelier AI, Portal B2B, Catálogo Premium y nuevas experiencias para el ecosistema LabrazaHome.`
- Canonical: `/`
- Open Graph tags consistent with new metadata

### Copy (Spanish)

- **Hero subtitle:** _"Un laboratorio digital para construir la próxima generación de comercio, inteligencia artificial y operaciones para el sector agroalimentario premium."_
- **Hero microcopy:** _"Desde Rioja Marketplace hasta Sommelier AI, estamos diseñando una plataforma modular para conectar productores, distribuidores y clientes con experiencias digitales de alto nivel."_
- **Vision lead:** _"LabrazaHome Labs nace para probar, validar y madurar nuevas experiencias digitales antes de llevarlas al ecosistema real de LabrazaHome y Rioja Marketplace."_
- **CTA title:** _"El ecosistema LabrazaHome está en construcción."_

### Roadmap Phases

| Phase  | Items                                | Status             |
| ------ | ------------------------------------ | ------------------ |
| Fase 1 | Base técnica, Landing, Design System | Completado         |
| Fase 2 | Catálogo Premium v2, Sommelier AI v2 | En curso / Próximo |
| Fase 3 | Portal B2B v2, Backoffice Admin v2   | Futuro             |
| Fase 4 | Integración Rioja Marketplace        | Futuro             |

## Validation

- `pnpm check` (lint + typecheck + build): ✅ Passed
- `pnpm --filter web dev`: ✅ Server started at localhost:4321
- All 4 routes built: `/`, `/about/`, `/docs/`, `/404`

## Accessibility

- Ordered headings (h1 → h2 → h3)
- Navigation with `aria-label`
- Theme toggle with `aria-label`
- Mobile menu toggle with `aria-label`
- Sufficient contrast (zinc-900/zinc-100 on custom backgrounds)
- All interactive elements are `<a>` or `<button>` elements

## Responsive

- Desktop: full layout, 3-column cards, inline navigation
- Tablet: 2-column cards, stacked metrics
- Mobile: single column, hamburger menu, stacked CTAs
- No overflow or broken layout at common breakpoints

## Commit

```
9b46fae... -> (new commit)
git add .
git commit -m "feat(web): upgrade labrazahome labs landing to premium v2"
git push origin main
```

## Risks / Pending

- Metric cards show mock/lab indicators (5 módulos, 100% stack, etc.). If real metrics are needed later, this component must be updated.
- Roadmap timeline uses static data in `index.astro`. Future phases will need data-driven updates.
- External font (Inter) loaded via Google Fonts — no fallback critical issues.

## Next Phase Recommended

`STACK-2026-LANDING-PREMIUM-V2-VERCEL-SMOKE-01`
