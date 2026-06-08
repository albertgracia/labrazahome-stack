# STACK-2026-ROADMAP-REALIGNMENT-01

## Status: Done

## Goal

Realign the public roadmap and documentation to reflect the REAL current project state. Audit, documentation, and status correction only — no new features.

## Initial State

- HEAD: `b16a3a7`

## Inconsistencies Detected

| Location                                      | What was wrong                                | Correct state                                        |
| --------------------------------------------- | --------------------------------------------- | ---------------------------------------------------- |
| `index.astro` — Sommelier AI product card     | `status: 'development'`                       | `status: 'completed'`                                |
| `index.astro` — Catálogo Premium product card | `status: 'development'`                       | `status: 'completed'`                                |
| `index.astro` — Portal B2B product card       | `status: 'design'`                            | `status: 'architecture'`                             |
| `index.astro` — Backoffice Admin product card | `status: 'design'`                            | `status: 'architecture'`                             |
| `index.astro` — Fase 2 Catálogo roadmap       | `status: 'in-progress'`                       | `status: 'completed'`                                |
| `index.astro` — Fase 2 Sommelier roadmap      | `status: 'next'`                              | `status: 'completed'`                                |
| `index.astro` — Fase 3 Portal B2B roadmap     | `status: 'future'`                            | `status: 'architecture'`                             |
| `index.astro` — Fase 3 Backoffice roadmap     | `status: 'future'`                            | `status: 'architecture'`                             |
| `index.astro` — Missing IA Real phase         | Not present                                   | Added as Fase 4 (next)                               |
| `EcosystemGrid.astro` — Missing status types  | No `completed` or `architecture`              | Added both                                           |
| `RoadmapTimeline.astro` — Missing status type | No `architecture`                             | Added                                                |
| `b2b/index.astro` — Badge text                | "Laboratorio · En diseño"                     | "Arquitectura completada · Implementación pendiente" |
| `b2b/index.astro` — Footer box                | "Portal en fase de diseño arquitectónico"     | "Arquitectura completada"                            |
| `admin/index.astro` — Badge text              | "Laboratorio · En diseño"                     | "Arquitectura completada · Implementación pendiente" |
| `admin/index.astro` — Footer box              | "Backoffice en fase de diseño arquitectónico" | "Arquitectura completada"                            |
| `sommelier/index.astro` — Badge text          | "Laboratorio UX"                              | "Conversacional · Recomendaciones · Maridajes"       |
| `docs/roadmap.md`                             | Missing entirely                              | Created with complete state matrix                   |
| `docs/architecture.md`                        | No reference to new products                  | OK (high-level)                                      |

## Corrections Applied

### Components

- `EcosystemGrid.astro` — Added `'completed'` and `'architecture'` to Product status type and statusConfig
- `RoadmapTimeline.astro` — Added `'architecture'` to status type and statusStyle

### Pages

- `index.astro` — Updated all 5 products status (Sommelier: completed, Catálogo: completed, B2B: architecture, Admin: architecture), updated all 9 roadmap items with correct states and descriptions, added Fase 4 (IA Real)
- `b2b/index.astro` — Badge from amber "En diseño" to emerald "Arquitectura completada", footer from "diseño arquitectónico" to "Arquitectura completada"
- `admin/index.astro` — Same badge and footer updates as B2B
- `sommelier/index.astro` — Badge from "Laboratorio UX" to "Conversacional · Recomendaciones · Maridajes"

### Documentation

- `docs/roadmap.md` — Created with full state matrix, legend, dependencies, priorities, and next milestones

### Files Changed

```
M apps/web/src/components/landing/EcosystemGrid.astro
M apps/web/src/components/landing/RoadmapTimeline.astro
M apps/web/src/pages/index.astro
M apps/web/src/pages/b2b/index.astro
M apps/web/src/pages/admin/index.astro
M apps/web/src/pages/sommelier/index.astro
A docs/roadmap.md
A docs/audits/STACK-2026-ROADMAP-REALIGNMENT-01.md
```

## Final State Matrix

```
FASE 1 — FUNDACIÓN: ✅ Base técnica ✅ Landing ✅ Design System
FASE 2 — CORE: ✅ Catálogo Premium v2 ✅ Sommelier AI v2
FASE 3 — PROFESIONAL: 🟢 Portal B2B v2 (arquitectura) 🟢 Backoffice Admin v2 (arquitectura)
FASE 4 — IA REAL: ⏳ LM Studio / AI-LAB
FASE 5 — PRODUCCIÓN: ⏳ Integración Rioja Marketplace
```

## Verification

- `pnpm format` — passes
- `pnpm --filter web typecheck` — passes
- `pnpm --filter web build` — 24 pages
- `pnpm check` — passes

## Commit

```
docs: realign roadmap with current project state
```

## Next Phase Recommended

STACK-2026-BACKOFFICE-V2-PLACEHOLDER-01
