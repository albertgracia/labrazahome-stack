# STACK-2026-SOMMELIER-PRODUCTMASTER-CONSUMER-01

## Objetivo
Migrar el motor mock del Sommelier AI v2 para consumir `ProductMaster` como fuente de producto, en vez de depender directamente de `ProductPremium`.

## Scope
- ✅ Sommelier frontend mock (`mockResponses.ts`, `context.ts`)
- ✅ Componentes Sommelier (`ProductContextPanel`, `SommelierChat`)
- ❌ NO se tocó B2B, Admin, Backend, Prisma, Vercel, LM Studio, AI-LAB
- ❌ NO se tocó `products.ts`, `ProductPremium`, `ProductCardPremium`
- ❌ NO se cambió UI visual ni comportamiento conversacional

## Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `apps/web/src/data/sommelier/mockResponses.ts` | `ProductPremium` → `ProductMaster`; `getProductBySlug` → `getProductMasterBySlug`; `getProductsByCategory` → `getProductMastersByCategory`; `product.pairing` → `product.pairings` |
| `apps/web/src/data/sommelier/context.ts` | `ProductPremium` → `ProductMaster`; `getProductBySlug` → `getProductMasterBySlug` |
| `apps/web/src/components/sommelier/ProductContextPanel.tsx` | `ProductPremium` → `ProductMaster` en prop |
| `apps/web/src/components/sommelier/SommelierChat.tsx` | `initialProduct?: ProductPremium` → `ProductMaster` |

## Archivos revisados sin cambios

| Archivo | Resultado |
|---------|-----------|
| `apps/web/src/data/sommelier/flows.ts` | ✅ Sin referencias a `ProductPremium` — no requiere cambios |
| `apps/web/src/types/sommelier.ts` | ✅ Sin referencias a `ProductPremium` — no requiere cambios |
| `apps/web/src/components/sommelier/RecommendationCard.tsx` | ✅ Props inline — sin cambios |
| `apps/web/src/components/sommelier/PairingSuggestion.tsx` | ✅ Props inline — sin cambios |

## Mapeo de campos

| Campo en mock | ProductPremium | ProductMaster | Compatible |
|--------------|----------------|---------------|------------|
| `ratings` | `WineRating[]` | `ProductMasterRating[]` | ✅ (mismos campos) |
| `knowledge` | `ProductKnowledge` | `ProductMasterKnowledge` | ✅ (idéntico) |
| `pairing`/`pairings` | `pairing: string[]` | `pairings: string[]` | ✅ (renombrado) |
| `name` / `slug` / `category` / `producer` | mismos | mismos | ✅ |
| `shortDescription` | `string` | `string` | ✅ |

## Casos mock validados (constructivamente)

| Caso | Query | Flujo |
|------|-------|-------|
| 1. Vino para carnes rojas | `"Quiero un vino para carnes rojas"` | `getProductMasterBySlug` → `buildWineKnowledge` |
| 2. Quesos | `"Tengo una tabla de quesos curados"` | `getProductMastersByCategory("vinos")` → filtro `.pairings` |
| 3. Aceite premium | `"Busco un aceite premium"` | `getProductMastersByCategory("aceites")` → `buildOilKnowledge` |
| 4. Miel para infusiones | `"Quiero miel para infusiones"` | `getProductMastersByCategory("mieles")` → `buildHoneyKnowledge` |
| 5. Pack gourmet | `"Necesito un pack gourmet para empresa"` | `getProductMastersByCategory("packs")` → `buildPackKnowledge` |

## Validaciones

| Comando | Resultado |
|---------|-----------|
| `pnpm format` | ✅ |
| `pnpm --filter web typecheck` | ✅ 0 errors |
| `pnpm --filter web build` | ✅ 28 pages |
| `pnpm check` | ✅ lint + typecheck + build (5 packages) |

## Smoke local

| Ruta | Estado |
|------|--------|
| `/sommelier` | ✅ |
| `/catalogo` | ✅ |
| `/catalogo/vinos/reserva-del-alto-ebro` | ✅ |
| `/b2b` | ✅ |
| `/admin` | ✅ |
| Total 28 pages | ✅ |

## Estado del legacy

| Legacy | Estado |
|--------|--------|
| `ProductPremium` en `types/catalog.ts` | Conservado (necesario para B2B, Admin) |
| `products.ts` | Conservado (fuente legacy para adapter) |
| `ProductCardPremium.astro` | Conservado (legacy, sin referencias) |

## Decisión
`PASS`. Migración del Sommelier mock a `ProductMaster` completada. Sin cambios visuales. Sin regresiones. Respuestas enriquecidas preservadas.

## Siguiente fase recomendada
`STACK-2026-B2B-PRODUCTMASTER-CONSUMER-01`
