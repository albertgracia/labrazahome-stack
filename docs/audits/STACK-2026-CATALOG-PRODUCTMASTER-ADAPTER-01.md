# STACK-2026-CATALOG-PRODUCTMASTER-ADAPTER-01

## Objetivo

Crear un adaptador seguro entre `ProductPremium` (catálogo actual) y `ProductMaster` (contrato compartido en `packages/shared/`), sin cambiar consumidores, UI, rutas, datos, ni tocar B2B/Admin/Sommelier/backend.

## Archivos creados

| Archivo                                             | Acción                                                       |
| --------------------------------------------------- | ------------------------------------------------------------ |
| `apps/web/src/data/catalog/productMasterAdapter.ts` | ✅ **Nuevo** — adaptador completo con 7 funciones exportadas |

## Funciones exportadas

| Función                                                         | Descripción                                 |
| --------------------------------------------------------------- | ------------------------------------------- |
| `toProductMaster(product: ProductPremium): ProductMaster`       | Convierte un producto individual            |
| `toProductMasters(products: ProductPremium[]): ProductMaster[]` | Convierte un array completo                 |
| `getProductMasterBySlug(slug, category?)`                       | Busca por slug y convierte                  |
| `getProductMastersByCategory(category)`                         | Filtra por categoría y convierte            |
| `getFeaturedProductMasters()`                                   | Obtiene productos destacados y convierte    |
| `validateProductMaster(product: ProductMaster): string[]`       | Valida campos requeridos, devuelve warnings |
| `convertAndValidateAll(): { converted, warnings }`              | Convierte y valida todo el catálogo         |

## Mapeo ProductPremium → ProductMaster

| ProductPremium     | ProductMaster      | Notas                                  |
| ------------------ | ------------------ | -------------------------------------- |
| `id`               | `id`               | directo                                |
| `slug`             | `slug`             | directo                                |
| `category`         | `category`         | cast a `ProductMasterCategory`         |
| `name`             | `name`             | directo                                |
| `producer`         | `producer`         | directo                                |
| `region`           | `region?`          | directo                                |
| `shortDescription` | `shortDescription` | directo                                |
| `longDescription`  | `longDescription?` | directo                                |
| `story`            | `story?`           | directo                                |
| `status`           | `status`           | cast a `ProductMasterStatus`           |
| `tags`             | `tags`             | directo                                |
| `highlights`       | `highlights`       | directo                                |
| `specs`            | `specs`            | directo                                |
| `pairing`          | `pairings`         | renombrado                             |
| `imageGradient`    | `imageGradient?`   | directo                                |
| `featured`         | `featured?`        | directo                                |
| `ratings`          | `ratings?`         | fuente tipada a `ProductMasterRating`  |
| `knowledge`        | `knowledge?`       | cast a `ProductMasterKnowledge`        |
| _(nuevo)_          | `seo`              | `undefined` (no disponible en Premium) |
| _(nuevo)_          | `readiness`        | computado desde datos existentes       |
| _(nuevo)_          | `lifecycle`        | computado desde `status`               |

## Status mapping

| ProductPremium.status | ProductMaster.status | ProductLifecycle.currentState |
| --------------------- | -------------------- | ----------------------------- |
| `concept`             | `concept`            | `draft`                       |
| `design`              | `design`             | `editorial_review`            |
| `prototype`           | `prototype`          | `catalog_ready`               |
| `future`              | `future`             | `marketplace_future`          |

## Resultados de validación

Ejecutando `convertAndValidateAll()` sobre los 11 productos del catálogo:

| Slug    | Warnings                                                                          |
| ------- | --------------------------------------------------------------------------------- |
| _todos_ | 0 warnings (todos tienen slug, name, category, shortDescription, pairings y tags) |

## Archivos NO modificados

- `apps/web/src/data/catalog/products.ts` — sin cambios
- `apps/web/src/pages/catalogo/*` — sin cambios
- `apps/web/src/data/sommelier/*` — sin cambios
- `apps/web/src/data/b2b/*` — sin cambios
- `apps/web/src/data/admin/*` — sin cambios
- `apps/web/src/types/catalog.ts` — sin cambios
- `packages/shared/src/product-master.ts` — sin cambios

## Validaciones

| Comando                          | Resultado                                    |
| -------------------------------- | -------------------------------------------- |
| `pnpm format`                    | ✅ All matched files use Prettier code style |
| `pnpm --filter shared typecheck` | ✅ 0 errors                                  |
| `pnpm --filter web typecheck`    | ✅ 0 errors                                  |
| `pnpm --filter web build`        | ✅ 28 pages built                            |
| `pnpm check`                     | ✅                                           |

## Siguiente fase recomendada

`STACK-2026-CATALOG-PRODUCTMASTER-VALIDATION-01`: validar que el adaptador se usa desde los consumidores del catálogo sin regresiones.
