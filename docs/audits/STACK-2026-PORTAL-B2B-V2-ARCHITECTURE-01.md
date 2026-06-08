# STACK-2026-PORTAL-B2B-V2-ARCHITECTURE-01

## Status: Done

## Goal

Design the functional, visual and technical architecture of the future Portal B2B v2 for LabrazaHome Labs. Architecture and documentation phase only — no implementation.

## Initial State

- HEAD: `d303307`
- LabrazaHome Labs ecosystem with Landing, Catálogo Premium v2, Sommelier AI v2 with conversation flows, Design System
- Vercel + GitHub configured
- No B2B portal or architecture yet

## Files Reviewed

- `docs/architecture/sommelier-ai-v2.md` — reference format for architecture docs
- `apps/web/src/layouts/Layout.astro` — navigation structure for placeholder link
- `apps/web/src/pages/index.astro` — landing page with product cards (Portal B2B already listed as "design")
- `apps/web/src/pages/about.astro` — reference for placeholder page pattern

## Documentation Created

### `docs/architecture/portal-b2b-v2.md`

Comprehensive architecture document covering:

| Section                          | Content                                                                                                                                                          |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Visión                           | Portal profesional para el canal B2B, capa sobre Catálogo Premium                                                                                                |
| Objetivos                        | 8 objetivos clave                                                                                                                                                |
| No Alcance                       | 10 limitaciones de fase                                                                                                                                          |
| Perfiles B2B                     | 7 perfiles detallados (restaurante, tienda, distribuidor, hotel, empresa, bodega, admin)                                                                         |
| Módulos                          | 14 módulos con descripción funcional                                                                                                                             |
| Rutas                            | 17 rutas diseñadas                                                                                                                                               |
| Modelo Conceptual                | 9 modelos (B2BAccount, B2BProfile, B2BPriceTier, B2BQuoteRequest, B2BQuoteLine, B2BFavorite, B2BRecurringOrder, B2BMOQRule, B2BDocument, B2BCommercialCondition) |
| UX                               | Principios, dashboard, catálogo profesional, ficha B2B, CTAs, paleta                                                                                             |
| Relación con Catálogo Premium    | Flujo de datos, principios de no duplicación                                                                                                                     |
| Relación con Sommelier AI v2     | Modo B2B, ejemplo de restaurante                                                                                                                                 |
| Relación con Backoffice Admin v2 | Dependencias, flujo de aprobación                                                                                                                                |
| Relación con Rioja Marketplace   | Reglas de integración, canales, separación de datos                                                                                                              |
| Seguridad                        | Roles, permisos, reglas, protección de datos                                                                                                                     |
| Roadmap                          | 6 fases                                                                                                                                                          |

### `docs/audits/STACK-2026-PORTAL-B2B-V2-ARCHITECTURE-01.md`

This file.

### `apps/web/src/pages/b2b/index.astro` (optional)

Placeholder page if it doesn't break the build.

## Key Decisions

1. **B2B es una capa, no un duplicado**: el Portal B2B referencia productos del Catálogo Premium v2 por slug sin duplicar datos editoriales
2. **Sommelier modo B2B**: extensión del Sommelier existente con tono profesional, recomendaciones para carta, upsell y argumentario — no un producto separado
3. **Sin Prisma todavía**: los modelos conceptuales se documentan pero no se implementan, para mantener la fase libre de migraciones
4. **Rioja Marketplace intocable**: toda integración futura debe ser read-only inicial, con runbook, validación visual y rollback
5. **Perfiles con peso comercial**: el diseño prioriza restaurantes y distribuidores como primeros adoptantes, con bodegas/proveedores en fase posterior
6. **Seguridad por defecto**: condiciones comerciales y precios nunca se exponen sin autenticación, incluso en mock

## Risks / Pending

| Risk                                                  | Mitigation                                                                     |
| ----------------------------------------------------- | ------------------------------------------------------------------------------ |
| Complejidad de integración con Rioja Marketplace      | Fase específica con runbook, read-only inicial, sin DB compartida              |
| Datos mock confundidos con reales en demos            | Etiquetado claro "laboratorio", isMock flags, condiciones simuladas            |
| Deriva de requisitos entre perfiles B2B               | Perfiles bien documentados con necesidades y prioridades claras                |
| Solapamiento con funcionalidades del catálogo público | Definición clara de qué es capa B2B vs catálogo base                           |
| El placeholder /b2b pueda romper navegación           | Ruta añadida con verificación de build, navegación actualizada en Layout.astro |

## Verification

- Wireframes: none (fase arquitectura)
- `pnpm format` — all files pass
- `pnpm --filter web typecheck` — passes
- `pnpm --filter web build` — passes
- `pnpm check` — passes

## Commit

```
docs: design portal b2b v2 architecture
```

## Next Phase Recommended

STACK-2026-BACKOFFICE-V2-ARCHITECTURE-01
