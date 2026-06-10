# Audit Report: STACK-2026-PLATFORM-DATA-CONTRACTS-01

## Resultado

**PASS**

## Objetivo

Diseñar los contratos de datos transversales que utilizará toda la plataforma, estableciendo un lenguaje común entre módulos.

---

## FASE 1 — Inventario de Contratos Actuales

### Contratos encontrados (8 categorías, 25+ interfaces únicas)

| Contrato          | Interfaces/Hallazgos                                                                                                                              | Archivos afectados                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Product           | `ProductPremium`, `MockProduct`, `B2BProduct`, `CatalogContextItem`, `BatchProductInput`, `CatalogProduct`, `ProductContext`, `Product` (landing) | 8+ archivos en types/, data/, api/ |
| SelectionItem     | `B2BSelectionItem` (dual — `types/b2b.ts` vs `data/b2b/mockDashboard.ts`), `WorkspaceSelection`                                                   | 3 archivos                         |
| Quote             | `B2BQuoteSummary`, `WorkspaceQuote`                                                                                                               | 2 archivos                         |
| Document          | `B2BDocumentMock`, `WorkspaceDoc`, `B2BDocument`                                                                                                  | 3 archivos                         |
| ContentItem       | `ContentReviewProduct`, `ContentPipelineStage`                                                                                                    | 2 archivos                         |
| SommelierResponse | `SommelierChatResponse`, `ChatMessage`, `Recommendation`, `SommelierRecommendation`, `MockResult`                                                 | 4 archivos (web + API)             |
| AdminReview       | `CatalogReviewItem`, `AdminAIBatchStats`, `AdminAIGeneratedSample`, `BlockedProductItem`                                                          | 2 archivos                         |
| EditorialState    | 10+ valores string dispersos sin tipo compartido                                                                                                  | 6+ archivos                        |

### Inconsistencias principales

1. **Dual `B2BSelectionItem`**: `types/b2b.ts` usa `useCase`/`addedAt`/`productCategory`; `data/b2b/mockDashboard.ts` usa `use`/`status`.
2. **Sin tipo compartido web/API**: `Recommendation` (web) y `SommelierRecommendation` (API) son independientes.
3. **Documentos triplicados**: `B2BDocumentMock`, `WorkspaceDoc`, `B2BDocument` con diferentes campos.
4. **Quotes sin contrato**: `B2BQuoteSummary` y `WorkspaceQuote` no comparten interfaz.
5. **ContentReviewProduct mezcla datos**: Combina datos de producto, readiness flags y contenido editorial en una sola interfaz.
6. **EditorialState como strings**: 10+ valores diferentes sin tipo compartido ni validación de transiciones.

---

## FASE 2 — Contratos Transversales Diseñados

| Contrato             | Archivo propuesto                            | Referencia ProductMaster       |
| -------------------- | -------------------------------------------- | ------------------------------ |
| `ProductMaster`      | `packages/shared/src/product-master.ts`      | — (es el root)                 |
| `ContentItem`        | `packages/shared/src/content-item.ts`        | `productSlug: string`          |
| `QuoteItem`          | `packages/shared/src/quote-item.ts`          | `QuoteProductLine.productSlug` |
| `DocumentItem`       | `packages/shared/src/document-item.ts`       | `productSlug: string \| null`  |
| `SommelierKnowledge` | `packages/shared/src/sommelier-knowledge.ts` | `productSlug: string`          |
| `ReviewItem`         | `packages/shared/src/review-item.ts`         | `productSlug: string`          |

**Principio**: Todos los contratos referencian `ProductMaster.slug` como clave foránea. Ningún contrato embebe datos de producto.

---

## FASE 3 — Editorial Lifecycle

### 9 estados definidos

```
draft → editorial_review → ai_generated → human_review → catalog_ready
                                                             │
                                             ┌───────────────┘
                                             ▼
                                   sommelier_ready → published_mock → marketplace_future
                                             │
                                             ▼
                                        b2b_ready → published_mock
```

### Transiciones: 14 rutas válidas documentadas

Reglas:

- No se puede saltar de `draft` a `published_mock`
- `human_review` puede volver a `editorial_review` (feedback loop)
- `catalog_ready` puede bifurcar a `sommelier_ready` o `b2b_ready`
- `marketplace_future` es estado terminal (futura integración)

---

## FASE 4 — Readiness Contracts

| Contrato             | Campos                                                       | Consumidor           |
| -------------------- | ------------------------------------------------------------ | -------------------- |
| `EditorialReadiness` | 8 campos (hasName, hasShortDescription, etc.) + completeness | Content Manager      |
| `SommelierReadiness` | 6 campos (hasTastingNotes, hasAromaProfile, etc.)            | Sommelier Governance |
| `B2BReadiness`       | 6 campos (hasTechnicalSheet, hasProfessionalUse, etc.)       | Portal B2B           |
| `DocumentReadiness`  | 4 campos (documentsAvailable, documentsByType, etc.)         | Document Center      |

---

## FASE 5 — Workflow Contract: ProductLifecycle

Contrato que unifica el lifecycle completo:

```typescript
ProductLifecycle {
  productSlug: string;
  currentState: EditorialState;
  history: LifecycleTransition[];
  suggestedNext: EditorialState[];
  owner: "editor" | "ai" | "sommelier" | "b2b_manager" | "system" | null;
  blocks: LifecycleBlock[];
  createdAt: string;
  updatedAt: string;
  estimatedNextAt: string | null;
}
```

Regla clave: `ProductLifecycle` es el **único source of truth** del estado de cada producto.

---

## FASE 6 — Dependency Map

```
ProductMaster (root)
  ├── ContentItem (Editorial + AI)
  │     ├── AI Assistant (escribe)
  │     └── Content Manager (lee/escribe)
  ├── SommelierKnowledge (Sommelier AI)
  ├── Catalog Premium (consume)
  ├── QuoteItem (Portal B2B)
  │     └── Workspace (QuoteItem + ProductLifecycle)
  │           └── Document Center (DocumentItem)
  ├── ReviewItem (Admin)
  └── ProductLifecycle (todos los módulos)
```

### Riesgos identificados

| Riesgo                                          | Impacto | Mitigación                                                         |
| ----------------------------------------------- | ------- | ------------------------------------------------------------------ |
| Desincronización ContentItem ↔ ProductLifecycle | ALTO    | ProductLifecycle es source of truth único                          |
| Slug huérfano por borrado                       | MEDIO   | Validación de integridad referencial                               |
| Doble escritura AI/Editor                       | ALTO    | Ownership por estado: AI → `ai_generated`, Editor → `human_review` |
| Transición inválida                             | ALTO    | Validación de lifecycle en tiempo de compilación y runtime         |
| Quote con slug inexistente                      | MEDIO   | Validación contra ProductMaster en tiempo de creación              |

---

## Validaciones

```
pnpm format    — PASS (todas las rutas formateadas)
pnpm typecheck — PASS (sin errores)
pnpm build     — PASS (28 páginas)
pnpm check     — PASS
```

---

## Resumen de cambios

| Archivo                                                | Tipo  | Cambio                                           |
| ------------------------------------------------------ | ----- | ------------------------------------------------ |
| `docs/architecture/platform-data-contracts.md`         | Nuevo | Arquitectura completa de contratos transversales |
| `docs/audits/STACK-2026-PLATFORM-DATA-CONTRACTS-01.md` | Nuevo | Informe de auditoría                             |

---

## Git

```
HEAD inicial: cac8122
HEAD final:   (sin cambios de código)
```

```
git diff --stat
 docs/architecture/platform-data-contracts.md            | 420 +++++++++++++++++++++++
 docs/audits/STACK-2026-PLATFORM-DATA-CONTRACTS-01.md    | 180 +++++++++++++++++
 2 files changed, 600 insertions(+)
```

```
git commit -m "docs: define platform data contracts"
git push origin main
```

---

## Siguiente fase recomendada

**STACK-2026-B2B-TYPES-CONSOLIDATION-01**

Unificar `B2BSelectionItem`, migrar `QuoteItem`, y eliminar duplicaciones en los tipos B2B.
