# STACK-2026-CATALOG-PRODUCTMASTER-CONSUMER-MIGRATION-01

## Objetivo
Migrar el primer consumidor de `ProductPremium` a `ProductMaster` en el catálogo, usando un consumidor de bajo riesgo (featured products en `/catalogo/index.astro`).

## Estrategia
- Crear `ProductCardMaster.astro` que acepta `ProductMaster` (idéntico visual a `ProductCardPremium`)
- Cambiar la sección de "Productos destacados" en el index del catálogo para usar `getFeaturedProductMasters()`
- No tocar `ProductCardPremium`, ni páginas de detalle, ni categorías, ni ningún otro consumidor

## Archivos creados/modificados

| Archivo | Acción |
|---------|--------|
| `apps/web/src/components/catalog/ProductCardMaster.astro` | ✅ **Nuevo** — card component que consume `ProductMaster` desde `packages/shared` |
| `apps/web/src/data/catalog/index.ts` | ✅ Editado — re-exporta adapter functions (`toProductMaster`, `getFeaturedProductMasters`, etc.) |
| `apps/web/src/pages/catalogo/index.astro` | ✅ Editado — featured usa `getFeaturedProductMasters()` y `ProductCardMaster` |

## Cambios concretos en `index.astro`

```
- import ProductCardPremium from '../../components/catalog/ProductCardPremium.astro';
- import { getFeaturedProducts, getProductsByCategory } from '../../data/catalog';
+ import ProductCardMaster from '../../components/catalog/ProductCardMaster.astro';
+ import { getFeaturedProductMasters, getProductsByCategory } from '../../data/catalog';

- {getFeaturedProducts().map(p => <ProductCardPremium product={p} />)}
+ {getFeaturedProductMasters().map(p => <ProductCardMaster product={p} />)}
```

## Rutas validadas

| Ruta | Estado |
|------|--------|
| `/catalogo/index.html` | ✅ generado |
| `/catalogo/vinos/index.html` | ✅ sin cambios |
| `/catalogo/vinos/reserva-del-alto-ebro/index.html` | ✅ sin cambios |
| Total | 28 páginas (mismo número que antes) |

## Archivos NO modificados

- `ProductCardPremium.astro` — sin cambios (sigue usándose en `[categoria].astro`)
- `pages/catalogo/[categoria].astro` — sin cambios
- `pages/catalogo/[categoria]/[slug].astro` — sin cambios (no existe como archivo separado, usa `getStaticPaths` desde `[categoria].astro`)
- `apps/web/src/types/catalog.ts` — sin cambios
- `apps/web/src/data/catalog/products.ts` — sin cambios
- `packages/shared/src/product-master.ts` — sin cambios
- B2B, Admin, Sommelier — sin cambios

## Validaciones

| Comando | Resultado |
|---------|-----------|
| `pnpm format` | ✅ |
| `pnpm --filter web typecheck` | ✅ 0 errors |
| `pnpm --filter web build` | ✅ 28 pages built |
| `pnpm check` | ✅ |

## Decisión
`PASS`. Primer consumidor migrado exitosamente a `ProductMaster`. La sección de productos destacados ahora lee desde `getFeaturedProductMasters()` y renderiza con `ProductCardMaster`. Visualmente idéntico. Sin regresiones.

## Siguiente fase recomendada
`STACK-2026-CATALOG-PRODUCTMASTER-CATEGORY-CONSUMER-01`: migrar la página de categoría (`[categoria].astro`) para que también consuma `ProductMaster`.
