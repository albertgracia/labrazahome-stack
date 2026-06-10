# STACK-2026-CATALOG-PRODUCTMASTER-VALIDATION-01

## Objetivo

Validar formalmente que el adaptador `ProductPremium → ProductMaster` convierte sin pérdida crítica de información.

## Checks ejecutados (12)

| #   | Check                  | Método                                                   | Resultado  |
| --- | ---------------------- | -------------------------------------------------------- | ---------- |
| 1   | Count parity           | `products.length === masters.length`                     | ✅ 11 = 11 |
| 2   | Slug parity            | Todos los slugs Premium existen en Master                | ✅         |
| 3   | Category parity        | Categoría se conserva por producto                       | ✅         |
| 4   | Featured parity        | featured se conserva                                     | ✅         |
| 5   | Ratings parity         | ratings se conservan (source, score, maxScore)           | ✅         |
| 6   | Knowledge parity       | knowledge se conserva                                    | ✅         |
| 7   | Pairings parity        | pairing → pairings sin mutación                          | ✅         |
| 8   | Specs parity           | keys y values de specs se conservan                      | ✅         |
| 9   | Tags/highlights parity | arrays se conservan                                      | ✅         |
| 10  | Lookup parity          | `getProductMasterBySlug` vs `getProductBySlug`           | ✅         |
| 11  | Category lookup parity | `getProductMastersByCategory` vs `getProductsByCategory` | ✅         |
| 12  | Featured lookup parity | `getFeaturedProductMasters` vs `getFeaturedProducts`     | ✅         |

## Resultados

| Métrica           | Valor  |
| ----------------- | ------ |
| Productos Premium | 11     |
| Productos Master  | 11     |
| Fallos            | 0      |
| Warnings          | 0      |
| `passed`          | `true` |

## Cobertura por categoría

| Categoría | Premium | Master |
| --------- | ------- | ------ |
| vinos     | 3       | 3      |
| aceites   | 2       | 2      |
| mieles    | 2       | 2      |
| gourmet   | 2       | 2      |
| packs     | 2       | 2      |

## Cobertura de campos

| Campo     | Productos con dato (Prem.) | Productos con dato (Master) | Pérdidas |
| --------- | -------------------------- | --------------------------- | -------- |
| ratings   | 5                          | 5                           | 0        |
| knowledge | 11                         | 11                          | 0        |
| pairings  | 11                         | 11                          | 0        |
| featured  | 5                          | 5                           | 0        |

## Archivos tocados

| Archivo                                                | Acción                                                               |
| ------------------------------------------------------ | -------------------------------------------------------------------- |
| `apps/web/src/data/catalog/productMasterValidation.ts` | ✅ **Nuevo** — función `validateProductMasterParity()` con 12 checks |
| `docs/architecture/catalog-source-of-truth.md`         | ✅ Editado — añadida validación completada                           |

## Archivos NO modificados

- `apps/web/src/data/catalog/products.ts` — sin cambios
- `apps/web/src/data/catalog/productMasterAdapter.ts` — sin cambios
- `apps/web/src/pages/catalogo/*` — sin cambios
- `apps/web/src/data/sommelier/*` — sin cambios
- `apps/web/src/data/b2b/*` — sin cambios
- `apps/web/src/data/admin/*` — sin cambios
- `packages/shared/src/product-master.ts` — sin cambios

## Validaciones

| Comando                       | Resultado                                    |
| ----------------------------- | -------------------------------------------- |
| `pnpm format`                 | ✅ All matched files use Prettier code style |
| `pnpm --filter web typecheck` | ✅ 0 errors                                  |
| `pnpm --filter web build`     | ✅ 28 pages built                            |
| `pnpm check`                  | ✅                                           |

## Decisión

Adapter validado: `PASS`. El catálogo actual puede representarse como `ProductMaster` sin pérdida crítica. Migración de consumidores posible.

## Siguiente fase recomendada

`STACK-2026-CATALOG-PRODUCTMASTER-CONSUMER-MIGRATION-01`: migrar consumidores del catálogo (páginas, componentes) a `ProductMaster` empezando por los que menos riesgo tengan.
