# STACK-2026-CATALOG-PRODUCTMASTER-CATEGORY-CONSUMER-01

## Objetivo

Migrar la página de categoría del catálogo (`/catalogo/[categoria].astro`) para consumir `ProductMaster` mediante `getProductMastersByCategory()` y `ProductCardMaster`.

## Cambios realizados

| Archivo                                         | Acción                                                                                                           |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `apps/web/src/pages/catalogo/[categoria].astro` | ✅ Editado — `ProductCardPremium` → `ProductCardMaster`, `getProductsByCategory` → `getProductMastersByCategory` |

## Cambios concretos

```
- import ProductCardPremium from '../../components/catalog/ProductCardPremium.astro';
- import { getProductsByCategory } from '../../data/catalog';
+ import ProductCardMaster from '../../components/catalog/ProductCardMaster.astro';
+ import { getProductMastersByCategory } from '../../data/catalog';

- const products = getProductsByCategory(category.slug);
+ const products = getProductMastersByCategory(category.slug);

- {products.map(p => <ProductCardPremium product={p} />)}
+ {products.map(p => <ProductCardMaster product={p} />)}
```

## Rutas validadas

| Ruta                                               | Estado                    |
| -------------------------------------------------- | ------------------------- |
| `/catalogo/vinos/index.html`                       | ✅ generado               |
| `/catalogo/aceites/index.html`                     | ✅ generado               |
| `/catalogo/mieles/index.html`                      | ✅ generado               |
| `/catalogo/gourmet/index.html`                     | ✅ generado               |
| `/catalogo/packs/index.html`                       | ✅ generado               |
| `/catalogo/vinos/reserva-del-alto-ebro/index.html` | ✅ intacto                |
| Total                                              | 28 páginas (mismo número) |

## Archivos NO modificados

- `apps/web/src/data/catalog/products.ts` — sin cambios
- `apps/web/src/types/catalog.ts` — sin cambios
- `apps/web/src/components/catalog/ProductCardPremium.astro` — sin cambios
- `packages/shared/src/product-master.ts` — sin cambios
- B2B, Admin, Sommelier, backend — sin cambios

## Validaciones

| Comando                       | Resultado                                               |
| ----------------------------- | ------------------------------------------------------- |
| `pnpm format`                 | ✅                                                      |
| `pnpm --filter web typecheck` | ✅ 0 errors                                             |
| `pnpm --filter web build`     | ✅ 28 pages built (5 categorías + 11 productos + resto) |
| `pnpm check`                  | ✅                                                      |

## Decisión

`PASS`. Página de categoría migrada exitosamente a `ProductMaster`. Visualmente idéntica. Detalles de producto intactos. Sin regresiones.

## Siguiente fase recomendada

`STACK-2026-CATALOG-PRODUCTMASTER-DETAIL-CONSUMER-01`: migrar la página de detalle de producto a `ProductMaster`.
