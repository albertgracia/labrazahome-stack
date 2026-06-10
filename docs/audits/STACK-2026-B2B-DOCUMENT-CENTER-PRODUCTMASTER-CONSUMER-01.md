# STACK-2026-B2B-DOCUMENT-CENTER-PRODUCTMASTER-CONSUMER-01

## Objetivo

Migrar el B2B Document Center (`/b2b/documentos`) para que los documentos asociados a producto deriven `productName` desde `ProductMaster` por slug, manteniendo toda la metadata documental como mock local.

## Archivos modificados

| Archivo                                   | Cambio                                                                                                             |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `apps/web/src/data/b2b/documentCenter.ts` | Import `getProductMasterBySlug`; seed arrays sin `productName`; `getFeaturedDocuments()` + `getProductDocuments()` |
| `apps/web/src/pages/b2b/documentos.astro` | Importa `getFeaturedDocuments`/`getProductDocuments` y las llama en frontmatter                                    |

## Estrategia

1. Tipo interno `DocumentSeed = Omit<B2BDocumentMock, "productName">`
2. Seed arrays `featuredDocumentSeeds` y `productDocumentSeeds` con todos los campos excepto `productName`
3. Helper `resolveProductName(slug)`:
   - `slug === null` → `null`
   - `getProductMasterBySlug(slug)?.name` → nombre real
   - fallback → el propio slug como nombre visible
4. Funciones `getFeaturedDocuments()` y `getProductDocuments()` mapean seeds → `B2BDocumentMock[]` añadiendo `productName` resuelto

## Resultado

| Campo             | Antes                   | Ahora                                          |
| ----------------- | ----------------------- | ---------------------------------------------- |
| `productName`     | Hardcodeado en cada doc | `getProductMasterBySlug(slug)?.name ?? slug`   |
| `productSlug`     | Hardcodeado             | Sin cambios (seed)                             |
| `category`        | Hardcodeado             | Sin cambios (seed, necesario para UI grouping) |
| `title`           | Hardcodeado             | Sin cambios                                    |
| `description`     | Hardcodeado             | Sin cambios                                    |
| `professionalUse` | Hardcodeado             | Sin cambios                                    |
| `mockContent`     | Hardcodeado             | Sin cambios                                    |
| `status`          | Hardcodeado             | Sin cambios                                    |
| `profile`         | Hardcodeado             | Sin cambios                                    |
| `type`            | Hardcodeado             | Sin cambios                                    |

## Slugs resueltos en featuredDocuments

- `reserva-del-alto-ebro` → "Reserva del Alto Ebro" (doc-feat-001)
- `pack-mesa-premium` → "Pack Mesa Premium" (doc-feat-005)
- `null` → `null` (doc-feat-002, 003, 004 — documentos generales sin producto)

## Slugs resueltos en productDocuments

Todas las entries tienen `productSlug` fijo → nombre derivado de `ProductMaster`.

## No migrado (intencionalmente)

- `documentStats` — sin cambio
- `documentCategories` / `documentProfiles` / `documentStatuses` — sin cambio
- `B2BDocumentMock` type — sin cambio
- `FeaturedDocuments.tsx` — sin cambio
- `ProductDocuments.astro` — sin cambio
- `DocumentFilters.tsx` — sin cambio
- `DocumentDetailView.tsx` — sin cambio
- UI / rutas / filtros — sin cambio
- Descargas reales — no existen

## Validaciones

| Comando                       | Resultado |
| ----------------------------- | --------- |
| `pnpm format`                 | ✅        |
| `pnpm --filter web typecheck` | ✅        |
| `pnpm --filter web build`     | ✅ (28p)  |
| `pnpm check`                  | ✅        |

## Smoke local

| Ruta              | Resultado |
| ----------------- | --------- |
| `/b2b/documentos` | ✅        |
| `/b2b/workspace`  | ✅        |
| `/b2b`            | ✅        |
| `/sommelier`      | ✅        |
| `/catalogo`       | ✅        |
| `/admin`          | ✅        |

## Commit

```
a4f0c85..<hash> refactor(web): migrate b2b document center to product master
```
