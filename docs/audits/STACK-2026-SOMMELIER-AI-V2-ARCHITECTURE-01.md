# STACK-2026-SOMMELIER-AI-V2-ARCHITECTURE-01: Arquitectura Sommelier AI v2

**Status:** ✅ Completed  
**Date:** 2026-06-07  
**Branch:** main  
**HEAD initial:** e923d41  
**HEAD final:** pending commit

---

## Objective

Design the functional, visual, and technical architecture for Sommelier AI v2 within LabrazaHome Labs, as consumer of the Catálogo Premium v2.

---

## Initial State

| Check                  | Result                                          |
| ---------------------- | ----------------------------------------------- |
| `git status`           | clean                                           |
| `git log --oneline -5` | e923d41 — dac812c — 25343ef — 9b46fae — 7513ce5 |
| `origin/main` synced   | ✅                                              |

## Files Reviewed

| File                                       | Purpose                                             |
| ------------------------------------------ | --------------------------------------------------- |
| `docs/architecture/catalogo-premium-v2.md` | Catalog architecture (Sommelier AI section)         |
| `apps/web/src/types/catalog.ts`            | Product type definitions                            |
| `apps/web/src/data/catalog/products.ts`    | 11 mock products with specs, story, pairing         |
| `apps/web/src/pages/catalogo/`             | 3 page routes (index, [categoria], [slug])          |
| `apps/web/src/components/catalog/`         | 9 catalog components                                |
| `apps/web/src/design-system/`              | Colors, spacing, radius, typography, shadows tokens |
| `docs/design-system.md`                    | Design system documentation                         |
| `apps/web/src/layouts/Layout.astro`        | Navigation patterns                                 |

---

## Documentation Created

| File                                   | Content                                                                                                                                                                                                   |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/architecture/sommelier-ai-v2.md` | Full architecture: vision, objectives, profiles, use cases, knowledge sources, catalog relationship, conversation flow, tech architecture, prompts, JSON contract, security, integrations, risks, roadmap |

---

## Placeholder Created

✅ Yes — `apps/web/src/pages/sommelier/index.astro`

Content:

- Badge "En diseño"
- Title and description
- 3 cards: Maridaje Inteligente, Recomendación Personalizada, Explicación de Producto
- "¿Cómo funciona?" section with 4-step explanation
- Mode laboratory disclaimer with link to Catálogo Premium v2

Navigation updated: "Sommelier AI" link added after "Catálogo" in desktop nav, mobile nav, and footer.

---

## Routes Created

| Route        | Description                                                    |
| ------------ | -------------------------------------------------------------- |
| `/sommelier` | Placeholder page — architecture announcement + 3 feature cards |

---

## Key Decisions

| Decision                                                    | Rationale                                           |
| ----------------------------------------------------------- | --------------------------------------------------- |
| Sommelier AI is catalog consumer, not independent system    | Avoids duplicate data, leverages existing work      |
| 4 conversation profiles (private, B2B, supplier, admin)     | Covers all expected users without over-engineering  |
| Provider abstraction from day 1 (mock → LM Studio → AI-LAB) | Enables incremental AI integration without rewrites |
| JSON response contract defined upfront                      | Ensures frontend and backend agree on interface     |
| Prompt contract documented but not implemented              | Separates architecture from implementation          |
| Strict guardrails: never invent stock/price/availability    | Prevents hallucinations from day 0                  |
| `/sommelier` as Astro page + React island (future)          | Astro for shell, React for interactive chat state   |
| `SommelierModeSelector.tsx` as React island                 | Profile switching needs client-side interactivity   |

---

## Validations

| Check                         | Result     |
| ----------------------------- | ---------- |
| `pnpm --filter web typecheck` | ⏳ Pending |
| `pnpm --filter web build`     | ⏳ Pending |
| `pnpm check`                  | ⏳ Pending |

---

## Risks / Pending

| Item                                                | Notes                                         |
| --------------------------------------------------- | --------------------------------------------- |
| Placeholder page exists but chat island is future   | Fase 3 will implement React island            |
| No real AI models connected                         | Deliberate — architecture first               |
| No backend endpoints                                | Deliberate — architecture first               |
| Prompts documented but not in code                  | Will be added when chat island is implemented |
| Guardrails should be code-reviewed before v1 launch | Prompts can introduce bias or security issues |

---

## Next Phase Recommended

**STACK-2026-SOMMELIER-AI-V2-PLACEHOLDER-01**
