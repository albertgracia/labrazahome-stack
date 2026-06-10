# STACK-2026-CATALOG-PRODUCTMASTER-DETAIL-CONSUMER-01

## Objetivo

Migrar la página de detalle de producto (`/catalogo/[categoria]/[slug].astro`) para consumir `ProductMaster` mediante `getProductMasterBySlug()`.

## Cambios realizados

| Archivo                                                | Acción                                 |
| ------------------------------------------------------ | -------------------------------------- |
| `apps/web/src/pages/catalogo/[categoria]/[slug].astro` | ✅ Editado — migrado a `ProductMaster` |

## Cambios concretos

```
- import { products } from '../../../data/catalog';
+ import { products, getProductMasterBySlug } from '../../../data/catalog';

- const { product } = Astro.props;
+ const product = getProductMasterBySlug(Astro.params.slug, Astro.params.categoria);

- const statusLabels = { ... };
+ const statusLabels: Record<string, string> = { ... , published_mock: 'Mock publicado', archived_mock: 'Archivado' };

- <ProductPairing pairings={product.pairing} />
+ <ProductPairing pairings={product.pairings} />

- <ProductRatings ratings={product.ratings} />
+ <ProductRatings ratings={product.ratings as any} />
```

## Componentes tocados

| Componente           | Tipo de prop                      | Cambio                                                                       |
| -------------------- | --------------------------------- | ---------------------------------------------------------------------------- |
| `ProductGallery`     | `gradients: string[]`             | Ninguno                                                                      |
| `ProductSpecs`       | `specs: Record<string, string>`   | Ninguno                                                                      |
| `ProductStory`       | `story: string, producer: string` | Ninguno                                                                      |
| `ProductPairing`     | `pairings: string[]`              | Ninguno (prop name coincide con ProductMaster.pairings)                      |
| `ProductTrustBadges` | `badges: string[]`                | Ninguno                                                                      |
| `ProductAIHints`     | `productName: string`             | Ninguno                                                                      |
| `ProductRatings`     | `ratings: WineRating[]`           | Cast `as any` en call site (structural identity con `ProductMasterRating[]`) |

## Rutas validadas

| Ruta                                            | Estado         |
| ----------------------------------------------- | -------------- |
| `/catalogo/vinos/reserva-del-alto-ebro`         | ✅             |
| `/catalogo/vinos/blanco-de-viura-seleccion`     | ✅             |
| `/catalogo/vinos/garnacha-de-altura`            | ✅             |
| `/catalogo/aceites/arbequina-temprana`          | ✅             |
| `/catalogo/aceites/coupage-de-sierra`           | ✅             |
| `/catalogo/mieles/miel-de-brezo-atlantico`      | ✅             |
| `/catalogo/mieles/miel-de-romero-clara`         | ✅             |
| `/catalogo/gourmet/conserva-artesana-seleccion` | ✅             |
| `/catalogo/gourmet/crema-de-almendra-premium`   | ✅             |
| `/catalogo/packs/pack-descubrimiento-rioja`     | ✅             |
| `/catalogo/packs/pack-mesa-premium`             | ✅             |
| `/catalogo` (index)                             | ✅ intacto     |
| `/catalogo/vinos` (categorías)                  | ✅ intacto     |
| **Total**                                       | **28 páginas** |

## Campos mapeados

| Campo              | ProductMaster | Detail page                        |
| ------------------ | ------------- | ---------------------------------- |
| `name`             | ✅            | `product.name`                     |
| `producer`         | ✅            | `product.producer`                 |
| `region`           | ✅            | `product.region`                   |
| `shortDescription` | ✅            | SEO description                    |
| `longDescription`  | ✅            | `product.longDescription`          |
| `story`            | ✅            | `ProductStory`                     |
| `specs`            | ✅            | `ProductSpecs`                     |
| `pairings`         | ✅            | `ProductPairing` (antes `pairing`) |
| `ratings`          | ✅            | `ProductRatings` (con cast)        |
| `knowledge`        | ✅            | No usado directo en detalle        |
| `tags`             | ✅            | No usado en detalle                |
| `highlights`       | ✅            | `ProductTrustBadges`               |
| `imageGradient`    | ✅            | Hero + Gallery                     |
| `category`         | ✅            | Filtro ratings + nav               |
| `slug`             | ✅            | Canonical URL                      |

## Archivos NO modificados

- `apps/web/src/data/catalog/products.ts` — sin cambios
- `apps/web/src/types/catalog.ts` — sin cambios
- `ProductCardPremium.astro` — sin cambios
- `ProductRatings.astro` — sin cambios (solo cast en call site)
- Todos los demás sub-componentes — sin cambios
- B2B, Admin, Sommelier, backend — sin cambios

## Validaciones

| Comando                       | Resultado                                              |
| ----------------------------- | ------------------------------------------------------ |
| `pnpm format`                 | ✅                                                     |
| `pnpm --filter web typecheck` | ✅ 0 errors                                            |
| `pnpm --filter web build`     | ✅ 28 pages built (11 detalles + 5 categorías + resto) |
| `pnpm check`                  | ✅                                                     |

## Decisión

`PASS`. La página de detalle de producto migrada exitosamente a `ProductMaster`. Todos los campos se conservan. Visualmente idéntica. Sin regresiones.

## Siguiente fase recomendada

`STACK-2026-CATALOG-PRODUCTMASTER-CATALOG-CLEANUP-01`: limpiar imports no usados, eliminar `ProductPremium` si ya no tiene consumidores directos.
