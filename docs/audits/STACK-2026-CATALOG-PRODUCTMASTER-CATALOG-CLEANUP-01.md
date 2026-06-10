# STACK-2026-CATALOG-PRODUCTMASTER-CATALOG-CLEANUP-01

## Objetivo

Limpiar dependencias muertas y restos legacy tras completar la migración visible del catálogo a `ProductMaster`.

## Scope

- ✅ Solo archivos de catálogo (`apps/web/src/pages/catalogo/`, `apps/web/src/data/catalog/`, `apps/web/src/components/catalog/`)
- ❌ NO se tocó `products.ts`
- ❌ NO se tocó `ProductPremium`
- ❌ NO se tocó Sommelier, B2B, Admin, Backend, Prisma, Vercel, LM Studio, AI-LAB

## Archivos auditados

| Archivo                                                | Resultado                                                            |
| ------------------------------------------------------ | -------------------------------------------------------------------- |
| `apps/web/src/pages/catalogo/index.astro`              | ✅ Todos los imports usados — sin cambios                            |
| `apps/web/src/pages/catalogo/[categoria].astro`        | ✅ Todos los imports usados — sin cambios                            |
| `apps/web/src/pages/catalogo/[categoria]/[slug].astro` | ✅ Todos los imports usados — sin cambios                            |
| `apps/web/src/components/catalog/` (11 files)          | `ProductCardPremium.astro` sin referencias; se documenta como legacy |
| `apps/web/src/data/catalog/index.ts`                   | ✅ 5 dead exports eliminados                                         |
| `apps/web/src/data/catalog/productMasterAdapter.ts`    | ✅ Todos los imports usados — sin cambios                            |
| `apps/web/src/data/catalog/productMasterValidation.ts` | ✅ Todos los imports usados — sin cambios                            |

## Barrel exports eliminados (`data/catalog/index.ts`)

| Export                  | Motivo                                                                           |
| ----------------------- | -------------------------------------------------------------------------------- |
| `getFeaturedProducts`   | Sin consumidor externo desde el barrel; solo usado internamente via `./products` |
| `toProductMaster`       | Sin consumidor externo desde el barrel; solo usado internamente                  |
| `toProductMasters`      | Sin consumidor externo desde el barrel; solo usado internamente                  |
| `validateProductMaster` | Sin consumidor externo desde el barrel; solo usado internamente                  |
| `convertAndValidateAll` | Sin consumidor externo desde el barrel; solo usado internamente                  |

## Legacy documentado

### `ProductCardPremium.astro`

- No es importado por ningún archivo del proyecto
- Se mantiene como referencia legacy
- No se borra: puede servir como template para migraciones futuras (Sommelier, B2B, Admin)

### `products.ts`

- NO se borró — fuente legacy activa para el adapter
- `products` array usado por `getStaticPaths` en `[slug].astro`
- `getProductBySlug` usado por Sommelier (`mockResponses.ts`, `context.ts`)
- `getProductsByCategory` usado por `index.astro` (category counts) y Sommelier

### `ProductPremium` (types/catalog.ts)

- NO se borró — necesario para adapter, validation, Sommelier

## Archivos modificados

| Archivo                                        | Cambio                                             |
| ---------------------------------------------- | -------------------------------------------------- |
| `apps/web/src/data/catalog/index.ts`           | Eliminados 5 exports muertos del barrel            |
| `docs/architecture/catalog-source-of-truth.md` | Añadida fila de cleanup en tabla de implementación |

## Validaciones

| Comando                       | Resultado                                |
| ----------------------------- | ---------------------------------------- |
| `pnpm format`                 | ✅                                       |
| `pnpm --filter web typecheck` | ✅ 0 errors                              |
| `pnpm --filter web build`     | ✅ 28 pages                              |
| `pnpm check`                  | ✅ lint + typecheck + build (5 packages) |

## Smoke local

| Ruta                                    | Estado |
| --------------------------------------- | ------ |
| `/catalogo`                             | ✅     |
| `/catalogo/vinos`                       | ✅     |
| `/catalogo/vinos/reserva-del-alto-ebro` | ✅     |
| `/sommelier`                            | ✅     |
| `/b2b`                                  | ✅     |
| `/admin`                                | ✅     |
| Resto (28 total)                        | ✅     |

## Decisión

`PASS`. No se detectaron regresiones en catálogo ni en otros módulos. `ProductPremium`, `products.ts`, `ProductCardPremium.astro` preservados como legacy.

## Siguiente fase recomendada

`STACK-2026-SOMMELIER-PRODUCTMASTER-CONSUMER-01`
