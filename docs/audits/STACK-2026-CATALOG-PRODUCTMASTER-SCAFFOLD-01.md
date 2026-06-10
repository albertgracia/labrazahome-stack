# STACK-2026-CATALOG-PRODUCTMASTER-SCAFFOLD-01

## Objetivo

Scaffold real de `ProductMaster` en `packages/shared/` usando el diseño validado en las fases anteriores de Source of Truth y Data Contracts.

## Archivos tocados

| Archivo                                        | Acción                                                                          |
| ---------------------------------------------- | ------------------------------------------------------------------------------- |
| `packages/shared/src/product-master.ts`        | ✅ **Nuevo** — contrato `ProductMaster` completo con todos los tipos auxiliares |
| `packages/shared/src/index.ts`                 | ✅ Editado — exporta todos los nuevos tipos de `product-master`                 |
| `docs/architecture/catalog-source-of-truth.md` | ✅ Editado — añadida sección de implementación con estado                       |
| `docs/architecture/platform-data-contracts.md` | ✅ Editado — añadida fila de `ProductMaster` a la tabla de contratos            |

## Contenido de `product-master.ts`

- `ProductMasterCategory` — unión de categorías (`vinos`, `aceites`, `mieles`, `gourmet`, `packs`)
- `ProductMasterStatus` — 6 estados (`concept`, `design`, `prototype`, `future`, `published_mock`, `archived_mock`)
- `ProductLifecycleState` — 9 estados del lifecycle editorial
- `ProductLifecycleTransition`, `ProductLifecycleBlock`, `ProductLifecycle` — workflow contract
- `ProductMasterRatingSource`, `ProductMasterRating` — ratings con soporte mock
- `ProductMasterKnowledge` — enriquecimiento transversal y por categoría
- `ProductMasterSeo` — metadatos SEO
- `EditorialReadiness`, `SommelierReadiness`, `B2BReadiness`, `DocumentReadiness`, `ProductMasterReadiness` — readiness contracts
- `ProductMasterCategoryInfo` — metadata de categoría
- `ProductMaster` — contrato principal con 19 propiedades

## Validaciones

| Comando                                 | Resultado                                    |
| --------------------------------------- | -------------------------------------------- |
| `pnpm format`                           | ✅ All matched files use Prettier code style |
| `pnpm check` (lint + typecheck + build) | ✅ 28 pages built, 0 errors                  |

## Siguiente paso

`STACK-2026-CATALOG-PRODUCTMASTER-ADAPTER-01`: crear adapter que conecte `ProductPremium` → `ProductMaster` y empezar a consumir el contrato compartido desde el catálogo sin romper UI existente.
