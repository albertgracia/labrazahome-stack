# Audit Report: STACK-2026-CATALOG-SOURCE-OF-TRUTH-01

## Resultado

**PASS**

## Objetivo

Definir un único Source of Truth para productos y catálogo consumible por todos los módulos del ecosistema.

---

## Fase 1 — Inventario de Fuentes

### Tipos de producto encontrados (14 definiciones únicas)

| #   | Tipo                      | Archivo                                                          | Línea | Campos                                                                                                                                                                    |
| --- | ------------------------- | ---------------------------------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `ProductPremium`          | `apps/web/src/types/catalog.ts`                                  | 61    | slug, category, name, producer, region, shortDescription, longDescription, status, tags, highlights, specs, pairing, story, imageGradient, featured, ratings?, knowledge? |
| 2   | `B2BSelectionItem`        | `apps/web/src/types/b2b.ts`                                      | 1     | productSlug, productName, productCategory, quantity, useCase, addedAt                                                                                                     |
| 3   | `B2BSelectionItem` (dual) | `apps/web/src/data/b2b/mockDashboard.ts`                         | 27    | productName, productSlug, quantity, use, status                                                                                                                           |
| 4   | `B2BProduct`              | `apps/web/src/data/b2b/mockDashboard.ts`                         | 17    | slug, name, category, image, professionalUse, moq, status                                                                                                                 |
| 5   | `B2BDocumentMock`         | `apps/web/src/types/b2b.ts`                                      | 55    | id, title, type, category, profile, status, productSlug, productName, description, professionalUse, mockContent                                                           |
| 6   | `ContentReviewProduct`    | `apps/web/src/types/admin.ts`                                    | 74    | slug, name, category, editorialStatus, completeness, hasImage, hasSeo, hasStorytelling, isB2BReady, isSommelierReady, storytelling, tastingNotes, pairings, rating        |
| 7   | `CatalogReviewItem`       | `apps/web/src/types/admin.ts`                                    | 8     | name, category, status, statusColor, actions                                                                                                                              |
| 8   | `MockProduct`             | `apps/api/src/modules/sommelier/data/catalog.mock.ts`            | 1     | id, slug, category, name, producer, region, shortDescription, specs, ratings, pairings, tags, status                                                                      |
| 9   | `CatalogProduct`          | `apps/web/src/components/b2b/B2BSelectionManager.tsx`            | 19    | slug, name, category, image, professionalUse, moq                                                                                                                         |
| 10  | `ProductContext`          | `apps/web/src/types/sommelier.ts`                                | 3     | slug, name, category, producer                                                                                                                                            |
| 11  | `Recommendation`          | `apps/web/src/types/sommelier.ts`                                | 10    | slug, name, category, reason, confidence                                                                                                                                  |
| 12  | `BatchProductInput`       | `apps/api/src/modules/sommelier/batch/backoffice-batch.types.ts` | 1     | slug, name, category, producer, shortDescription, pairings, tags                                                                                                          |
| 13  | `CatalogContextItem`      | `apps/api/src/modules/sommelier/schemas/sommelier.schemas.ts`    | 158   | slug, name, category, producer, shortDescription, specs, pairings, tags, status                                                                                           |
| 14  | `Product`                 | `apps/web/src/components/landing/EcosystemGrid.astro`            | 5     | icon, title, description, status                                                                                                                                          |

### Arrays de datos de producto encontrados (73 entradas totales)

| Archivo                             | Array                   | Tipo                       | Items |
| ----------------------------------- | ----------------------- | -------------------------- | ----- |
| `data/catalog/products.ts`          | `products`              | `ProductPremium[]`         | 11    |
| `data/b2b/mockDashboard.ts`         | `recommendedProducts`   | `B2BProduct[]`             | 6     |
| `data/b2b/mockDashboard.ts`         | `currentSelection`      | `B2BSelectionItem[]`       | 4     |
| `data/b2b/documentCenter.ts`        | `productDocuments`      | `B2BDocumentMock[]`        | 9     |
| `data/b2b/documentCenter.ts`        | `featuredDocuments`     | `B2BDocumentMock[]`        | 5     |
| `data/admin/contentManager.ts`      | `contentReviewProducts` | `ContentReviewProduct[]`   | 6     |
| `data/admin/adminDashboard.ts`      | `catalogReviewItems`    | `CatalogReviewItem[]`      | 6     |
| `data/admin/aiAssistantMock.ts`     | `aiGeneratedSamples`    | `AdminAIGeneratedSample[]` | 2     |
| `data/admin/sommelierGovernance.ts` | `blockedProducts`       | `BlockedProductItem[]`     | 2     |
| `api/.../data/catalog.mock.ts`      | `mockCatalog`           | `MockProduct[]`            | 10    |
| `data/catalog/categories.ts`        | `categories`            | `CategoryInfo[]`           | 5     |
| `pages/index.astro`                 | (inline)                | —                          | 5     |

---

## Fase 2 — Mapa de Consumo

| Módulo               | Ruta                  | Fuente actual                       | Tipo de dato               | Duplica catálogo? |
| -------------------- | --------------------- | ----------------------------------- | -------------------------- | :---------------: |
| Catálogo Premium     | `/catalogo`           | `data/catalog/products.ts`          | `ProductPremium[]`         |         —         |
| Sommelier (web)      | `/sommelier`          | `data/catalog/products.ts`          | `ProductPremium`           |        NO         |
| Sommelier (API)      | API interna           | `api/.../data/catalog.mock.ts`      | `MockProduct[]`            |        SÍ         |
| B2B Dashboard        | `/b2b`                | `data/b2b/mockDashboard.ts`         | `B2BProduct[]`             |        SÍ         |
| B2B Workspace        | `/b2b/workspace`      | `data/b2b/workspaceMock.ts`         | `WorkspaceSelection`       |        SÍ         |
| Document Center      | `/b2b/documentos`     | `data/b2b/documentCenter.ts`        | `B2BDocumentMock[]`        |        SÍ         |
| Backoffice Admin     | `/admin`              | `data/admin/adminDashboard.ts`      | `CatalogReviewItem[]`      |        SÍ         |
| Content Manager      | `/admin/contenido`    | `data/admin/contentManager.ts`      | `ContentReviewProduct[]`   |        SÍ         |
| AI Assistant         | en `/admin/contenido` | `data/admin/aiAssistantMock.ts`     | `AdminAIGeneratedSample[]` |        SÍ         |
| Sommelier Governance | `/admin/sommelier`    | `data/admin/sommelierGovernance.ts` | `BlockedProductItem[]`     |        SÍ         |

---

## Fase 3 — Duplicaciones Detectadas

### 3.1 Dual `B2BSelectionItem`

- `types/b2b.ts:1`: usa `useCase`, `addedAt`
- `data/b2b/mockDashboard.ts:27`: usa `use`, `status`
- **Impacto**: inconsistencias al compartir selección entre módulos.

### 3.2 Catálogo API vs Web

- Web: 11 productos (slug, category, name, producer, region, etc.)
- API: 10 productos con 5 slugs que NO existen en web (`miel-de-milflores`, `aove-cosecha-temprana`, `aove-ecologico`, `foie-gras-de-pato`, `pack-ibericos`)
- **Impacto**: Sommelier API recomienda productos que no existen en el frontend.

### 3.3 Productos B2B duplicados

- 6 productos en `recommendedProducts` con slugs que existen en catálogo pero con datos diferentes
- **Impacto**: doble mantenimiento, riesgo de desincronización.

### 3.4 Admin data desacoplada

- `contentReviewProducts`, `catalogReviewItems`, `blockedProducts` tienen datos inline sin importar del catálogo
- **Impacto**: inconsistencias entre admin y catálogo.

### 3.5 Categorías y estados duplicados

- `ProductCategory` definido en `types/catalog.ts` pero usado como string en B2B y admin
- `ProductStatus` definido pero cada módulo añade sus propios estados adicionales
- **Impacto**: no hay enumerado compartido.

---

## Fase 4 — Propuesta `ProductMaster`

### Ubicación

`packages/shared/src/product-master.ts`

### Campos definidos (20 campos + 3 bloques opcionales)

| Bloque                | Campos                                                                                        |
| --------------------- | --------------------------------------------------------------------------------------------- |
| Identidad             | slug, name, producer, category, region                                                        |
| Contenido             | shortDescription, longDescription, story                                                      |
| Clasificación         | tags[], highlights[], status, featured                                                        |
| Ficha técnica         | specs: Record<string, string>                                                                 |
| Maridajes             | pairings[]                                                                                    |
| Imagen                | imageGradient                                                                                 |
| Enriquecimiento (opt) | ratings?, knowledge?                                                                          |
| SEO (opt)             | seo.title, seo.metaDescription, seo.canonical                                                 |
| Readiness (opt)       | readiness.hasSEO, readiness.hasStorytelling, readiness.isB2BReady, readiness.isSommelierReady |

Ver documento completo en `docs/architecture/catalog-source-of-truth.md`.

---

## Fase 5 — Plan de Migración

| Fase | Nombre                                      | Depende de | Descripción                                    |
| ---- | ------------------------------------------- | ---------- | ---------------------------------------------- |
| 1    | `STACK-2026-PLATFORM-DATA-CONTRACTS-01`     | —          | Crear `ProductMaster` en `packages/shared/`    |
| 2    | `STACK-2026-CATALOG-SOURCE-OF-TRUTH-01`     | Fase 1     | Migrar catálogo premium a `ProductMaster`      |
| 3    | `STACK-2026-SOMMELIER-DATA-INTEGRATION-01`  | Fase 2     | Migrar Sommelier (web + API)                   |
| 4    | `STACK-2026-B2B-TYPES-CONSOLIDATION-01`     | Fase 2     | Migrar B2B, unificar `B2BSelectionItem`        |
| 5    | `STACK-2026-BACKOFFICE-DATA-INTEGRATION-01` | Fase 4     | Migrar Backoffice (admin, content, governance) |

---

## Validaciones

```
pnpm format    — PASS (todas las rutas formateadas)
pnpm typecheck — PASS (sin errores)
pnpm build     — PASS (28 páginas)
pnpm check     — PASS
```

---

## Resumen de Incidencias

| ID     | Descripción                                      | Severidad | Módulo          |
| ------ | ------------------------------------------------ | --------- | --------------- |
| SOT-01 | Dual `B2BSelectionItem` (tipos inconsistentes)   | MAJOR     | B2B             |
| SOT-02 | Catálogo API con productos que no existen en web | MAJOR     | API Sommelier   |
| SOT-03 | Admin data no importa catálogo real              | MAJOR     | Backoffice      |
| SOT-04 | B2B data duplica productos manualmente           | MAJOR     | B2B             |
| SOT-05 | Workspace no consume `quoteFlow` selection       | MAJOR     | Workspace       |
| SOT-06 | Document Center no consume Content Manager       | MAJOR     | Document Center |
| SOT-07 | AI Assistant mock no alimenta Content Manager    | MINOR     | AI Assistant    |
| SOT-08 | Sommelier Governance no consume logs reales      | MINOR     | Governance      |
| SOT-09 | Sin source-of-truth compartido B2B/Admin         | MAJOR     | Plataforma      |
| SOT-10 | Sin lifecycle común de producto                  | MAJOR     | Plataforma      |
| SOT-11 | Sin contratos de datos transversales             | MAJOR     | Plataforma      |

---

## Git

```
HEAD inicial: b978208
HEAD final:   (sin cambios de código)
```

```
git diff --stat
 docs/architecture/catalog-source-of-truth.md    | 160 +++++++++++++++++++++++
 docs/audits/STACK-2026-CATALOG-SOURCE-OF-TRUTH-01.md | 120 ++++++++++++++++++
 2 files changed, 280 insertions(+)
```

```
git commit -m "docs: define catalog source of truth architecture"
git push origin main
```

---

## Siguiente fase recomendada

**STACK-2026-PLATFORM-DATA-CONTRACTS-01**

Implementar `ProductMaster` en `packages/shared/` y establecer contratos de datos transversales entre todos los módulos.
