# STACK-2026-CATALOGO-PREMIUM-V2-ARCHITECTURE-01 — Catálogo Premium v2 Architecture

- **Date:** 2026-06-07
- **Status:** Completed
- **Auditor:** AI-assisted

## Objective

Design the functional, visual and technical architecture for the future Catálogo Premium v2 of LabrazaHome Labs.

## Initial State

- HEAD: `25343ef feat(web): upgrade labrazahome labs landing to premium v2`
- Git: clean, synced with origin/main

## Files Reviewed

| File                             | Notes                                                                       |
| -------------------------------- | --------------------------------------------------------------------------- |
| `apps/web/src/pages/index.astro` | Current landing structure, design system usage patterns                     |
| `apps/web/src/components/ui/`    | Existing UI components: Button, Card, Section, Container, Badge, MetricCard |
| `apps/web/src/design-system/`    | Token files: colors, spacing, radius, typography, shadows                   |
| `docs/design-system.md`          | Full design system documentation                                            |
| `docs/architecture.md`           | Existing high-level architecture doc                                        |
| `README.md`                      | Project overview                                                            |

## Decisions Made

1. **Product types**: 5 initial families — Vino, Aceite, Miel, Gourmet, Pack
2. **Route structure**: `/catalogo/[categoria]/[slug]` with static generation in Astro
3. **Components**: 10 future components under `src/components/catalog/`
4. **Data model**: Conceptual interface `ProductoPremium` with type-specific fields
5. **Design**: Editorial premium style based on LabrazaHome DS, Apple product page inspiration
6. **Sommelier AI**: Catálogo is the data source; Sommelier AI consumes and enriches via future API
7. **B2B**: Same data, commercial layer added later
8. **Backoffice**: CRUD + editorial workflow + SEO management
9. **Rioja Marketplace**: Separate system; integration requires runbook, tests, controlled deployment
10. **Modelo no definitivo**: Current doc defines conceptual model; actual Prisma schema will be designed in implementation phase

## Documentation Created

| File                                       | Description                                                                                                                                  |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/architecture/catalogo-premium-v2.md` | Full architecture doc: vision, objectives, scope, product types, conceptual model, routes, components, UX, SEO, integrations, risks, roadmap |

## Placeholder Page Created

| File                                      | Description                                                                                                              |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `apps/web/src/pages/catalogo/index.astro` | Minimal placeholder page listing the 5 product categories using existing UI components (Section, Container, Card, Badge) |

The placeholder page:

- Uses existing Design System tokens and components
- Shows "Catálogo Premium v2" with status "En diseño"
- Lists 5 conceptual cards (Vinos, Aceites, Mieles, Gourmet, Packs)
- Links to documentation
- Passes `pnpm check` without errors
- Does not add new dependencies

## Validation

- `pnpm --filter web typecheck`: ✅ Passed
- `pnpm --filter web build`: ✅ Passed (4 + 1 = 5 pages built)
- `pnpm check`: ✅ Passed

## Risks / Pending

- Conceptual model is not final; actual Prisma schema requires separate design phase
- Images/asset management not yet planned
- Integration with Rioja Marketplace must remain gated by runbook requirement
- Visual alignment with Apple-style product pages may require new CSS utilities or components
- Sommelier AI integration API not yet designed

## Commit

```
25343ef... -> (new commit)
git add .
git commit -m "docs: design catalogo premium v2 architecture"
git push origin main
```

## Next Phase Recommended

`STACK-2026-CATALOGO-PREMIUM-V2-PLACEHOLDER-01`
