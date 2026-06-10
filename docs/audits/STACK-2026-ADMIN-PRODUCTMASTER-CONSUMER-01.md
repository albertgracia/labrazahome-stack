# STACK-2026-ADMIN-PRODUCTMASTER-CONSUMER-01

## Objetivo

Migrar la identidad de producto en Admin Dashboard (`catalogReviewItems`) y Content Manager (`contentReviewProducts`) para que derive de `ProductMaster`.

## Archivos modificados

| Archivo                                                    | Cambio                                                                     |
| ---------------------------------------------------------- | -------------------------------------------------------------------------- |
| `apps/web/src/data/admin/adminDashboard.ts`                | Import `getProductMasterBySlug`; seeds con `productSlug`; `getCatalogReviewItems()` |
| `apps/web/src/data/admin/contentManager.ts`                | Import `getProductMasterBySlug`; seeds sin `name`/`category`; `getContentReviewProducts()` |
| `apps/web/src/pages/admin/index.astro`                     | Importa `getCatalogReviewItems` y llama en frontmatter                     |
| `apps/web/src/pages/admin/contenido.astro`                 | Importa `getContentReviewProducts` y llama en frontmatter                  |

## Estrategia

### AdminDashboard
1. Tipo interno `CatalogReviewSeed` con `productSlug` + metadata admin mock
2. `getCatalogReviewItems()`: resuelve `name`/`category` desde `ProductMaster`; categoría capitalizada
3. Fallback: slug como nombre, "General" como categoría

### ContentManager
1. `ContentReviewSeed = Omit<ContentReviewProduct, 'name' | 'category'>`
2. Seeds mantienen `slug` como lookup key
3. `getContentReviewProducts()`: resuelve `name`/`category` desde `ProductMaster`

## Resultado

### catalogReviewItems
| Campo      | Antes              | Ahora                                     |
| ---------- | ------------------ | ----------------------------------------- |
| `name`     | Hardcodeado        | `pm?.name ?? productSlug`                 |
| `category` | Hardcodeado        | `capitalize(pm?.category)` / "General"    |
| `status`   | Hardcodeado        | Seed (sin cambios)                        |
| `statusColor` | Hardcodeado     | Seed (sin cambios)                        |
| `actions`  | Hardcodeado        | Seed (sin cambios)                        |

### contentReviewProducts
| Campo              | Antes       | Ahora                                     |
| ------------------ | ----------- | ----------------------------------------- |
| `slug`             | Hardcodeado | Seed (sin cambios, es el lookup key)      |
| `name`             | Hardcodeado | `pm?.name ?? seed.slug`                   |
| `category`         | Hardcodeado | `capitalize(pm?.category)` / "General"    |
| `editorialStatus`  | Hardcodeado | Seed (sin cambios)                        |
| `completeness`     | Hardcodeado | Seed (sin cambios)                        |
| `hasImage`/`hasSeo`/`hasStorytelling`/`isB2BReady`/`isSommelierReady` | Hardcodeado | Seed (sin cambios) |

## Slugs resueltos

Todos los slugs existen en el catálogo: `reserva-del-alto-ebro`, `coupage-de-sierra`, `pack-mesa-premium`, `miel-de-romero-clara`, `garnacha-de-altura`, `crema-de-almendra-premium`.

## No migrado (intencionalmente)

- `contentPipeline` — sin cambio (nombres display en pipeline UI)
- `sommelierGovernance.ts` — sin cambio
- `aiAssistantMock.ts` — sin cambio
- `adminAlerts` — sin cambio
- `adminRecentActivity` — sin cambio
- `adminKpis` — sin cambio
- `adminRoadmapData` — sin cambio
- Componentes React/Astro — sin cambio
- Tipos (`admin.ts`) — sin cambio
- `/admin/sommelier` — sin cambio

## Validaciones

| Comando                  | Resultado |
| ------------------------ | --------- |
| `pnpm format`            | ✅        |
| `pnpm --filter web typecheck` | ✅   |
| `pnpm --filter web build`     | ✅ (28p) |
| `pnpm check`             | ✅        |

## Smoke local

| Ruta                 | Resultado |
| -------------------- | --------- |
| `/admin`             | ✅        |
| `/admin/contenido`   | ✅        |
| `/admin/sommelier`   | ✅        |
| `/catalogo`          | ✅        |
| `/sommelier`         | ✅        |
| `/b2b`               | ✅        |
| `/b2b/workspace`     | ✅        |
| `/b2b/documentos`    | ✅        |

## Commit

```
f298c72..<hash> refactor(web): migrate admin product identity to product master
```
