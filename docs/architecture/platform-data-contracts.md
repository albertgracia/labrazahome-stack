# Platform Data Contracts — Arquitectura de Contratos Transversales

## Objetivo

Definir los contratos de datos transversales que toda la plataforma compartirá, estableciendo un lenguaje común entre módulos, eliminando duplicaciones y permitiendo un lifecycle de producto gobernado.

---

## FASE 1 — Inventario de Contratos Actuales

### 1.1 Product / ProductPremium

| Propiedad            | Fuente      | Archivo                                                            | Consumidores                      |
| -------------------- | ----------- | ------------------------------------------------------------------ | --------------------------------- |
| `ProductPremium`     | Web types   | `apps/web/src/types/catalog.ts:61`                                 | Catálogo Premium, Sommelier (web) |
| `MockProduct`        | API types   | `apps/api/src/modules/sommelier/data/catalog.mock.ts:1`            | Sommelier API (mock provider)     |
| `B2BProduct`         | Web data    | `apps/web/src/data/b2b/mockDashboard.ts:17`                        | B2B Dashboard                     |
| `CatalogContextItem` | API schemas | `apps/api/src/modules/sommelier/schemas/sommelier.schemas.ts:158`  | Sommelier API (catalog context)   |
| `BatchProductInput`  | API batch   | `apps/api/src/modules/sommelier/batch/backoffice-batch.types.ts:1` | Backoffice batch                  |
| `CatalogProduct`     | Component   | `apps/web/src/components/b2b/B2BSelectionManager.tsx:19`           | B2B Selection Manager             |
| `ProductContext`     | Web types   | `apps/web/src/types/sommelier.ts:3`                                | Sommelier web                     |
| `Product` (landing)  | Component   | `apps/web/src/components/landing/EcosystemGrid.astro:5`            | Landing page                      |

**Inconsistencias**: Cada tipo tiene su propio conjunto de campos. No hay `slug` como clave compartida universal. `BatchProductInput` omite `region`, `longDescription`, `highlights`. `B2BProduct` añade `professionalUse`, `moq`, `image` que no existen en `ProductPremium`.

### 1.2 SelectionItem

| Propiedad                 | Fuente    | Archivo                                     | Consumidores                        |
| ------------------------- | --------- | ------------------------------------------- | ----------------------------------- |
| `B2BSelectionItem` (real) | Web types | `apps/web/src/types/b2b.ts:1`               | quoteFlow.ts, B2B Selection Manager |
| `B2BSelectionItem` (dual) | Web data  | `apps/web/src/data/b2b/mockDashboard.ts:27` | B2B Dashboard (mock)                |
| `WorkspaceSelection`      | Web data  | `apps/web/src/data/b2b/workspaceMock.ts:10` | B2B Workspace (mock)                |

**Inconsistencias**: Dual `B2BSelectionItem` — el tipo real usa `useCase`, `addedAt`, `productCategory`; el duplicado usa `use`, `status`. `WorkspaceSelection` usa `products: {name, quantity}[]` sin slugs ni categorías.

### 1.3 Quote

| Propiedad         | Fuente   | Archivo                                     | Consumidores  |
| ----------------- | -------- | ------------------------------------------- | ------------- |
| `B2BQuoteSummary` | Web data | `apps/web/src/data/b2b/mockDashboard.ts:35` | B2B Dashboard |
| `WorkspaceQuote`  | Web data | `apps/web/src/data/b2b/workspaceMock.ts:18` | B2B Workspace |

**Inconsistencias**: No hay un tipo `QuoteItem` compartido. Cada módulo define el suyo.

### 1.4 Document

| Propiedad         | Fuente    | Archivo                                     | Consumidores    |
| ----------------- | --------- | ------------------------------------------- | --------------- |
| `B2BDocumentMock` | Web types | `apps/web/src/types/b2b.ts:55`              | Document Center |
| `WorkspaceDoc`    | Web data  | `apps/web/src/data/b2b/workspaceMock.ts:27` | B2B Workspace   |
| `B2BDocument`     | Web data  | `apps/web/src/data/b2b/mockDashboard.ts:42` | B2B Dashboard   |

**Inconsistencias**: `B2BDocumentMock` tiene `productSlug` (nullable), `productName` (nullable), `profile[]`, `mockContent`. `WorkspaceDoc` solo tiene `title`, `icon`, `description`, `available`. `B2BDocument` solo tiene `title`, `icon`, `description`, `status`.

### 1.5 ContentItem

| Propiedad              | Fuente    | Archivo                          | Consumidores    |
| ---------------------- | --------- | -------------------------------- | --------------- |
| `ContentReviewProduct` | Web types | `apps/web/src/types/admin.ts:74` | Content Manager |
| `ContentPipelineStage` | Web types | `apps/web/src/types/admin.ts:67` | Content Manager |

**Inconsistencias**: `ContentReviewProduct` tiene campos booleanos de readiness (`hasImage`, `hasSeo`, `hasStorytelling`, `isB2BReady`, `isSommelierReady`) y campos editoriales inline (`storytelling`, `tastingNotes`, `pairings`, `rating`). No hay separación entre datos de producto y metadatos editoriales.

### 1.6 SommelierResponse

| Propiedad                 | Fuente      | Archivo                                                           | Consumidores          |
| ------------------------- | ----------- | ----------------------------------------------------------------- | --------------------- |
| `SommelierChatResponse`   | API schemas | `apps/api/src/modules/sommelier/schemas/sommelier.schemas.ts:112` | Sommelier API         |
| `ChatMessage`             | Web types   | `apps/web/src/types/sommelier.ts:24`                              | Sommelier web chat    |
| `Recommendation`          | Web types   | `apps/web/src/types/sommelier.ts:10`                              | Sommelier web         |
| `SommelierRecommendation` | API schemas | `apps/api/src/modules/sommelier/schemas/sommelier.schemas.ts:67`  | Sommelier API         |
| `MockResult`              | Web data    | `apps/web/src/data/sommelier/mockResponses.ts:86`                 | Sommelier mock engine |

**Inconsistencias**: Los tipos web (`Recommendation`, `ChatMessage`) son independientes de los tipos API (`SommelierRecommendation`, `SommelierChatResponse`). No hay contrato compartido entre frontend y backend.

### 1.7 AdminReview

| Propiedad                | Fuente    | Archivo                           | Consumidores         |
| ------------------------ | --------- | --------------------------------- | -------------------- |
| `CatalogReviewItem`      | Web types | `apps/web/src/types/admin.ts:8`   | Admin Dashboard      |
| `AdminAIBatchStats`      | Web types | `apps/web/src/types/admin.ts:162` | AI Assistant         |
| `AdminAIGeneratedSample` | Web types | `apps/web/src/types/admin.ts:185` | AI Assistant         |
| `BlockedProductItem`     | Web types | `apps/web/src/types/admin.ts:149` | Sommelier Governance |

### 1.8 EditorialState

Actualmente definido como strings dispersas:

| Valor actual                                             | Dónde se usa     | Archivo                            |
| -------------------------------------------------------- | ---------------- | ---------------------------------- |
| `"Draft"`                                                | Content Pipeline | `data/admin/contentManager.ts:51`  |
| `"En revisión"`                                          | Content Pipeline | `data/admin/contentManager.ts:61`  |
| `"Necesita media"`                                       | Content Pipeline | `data/admin/contentManager.ts:72`  |
| `"SEO pendiente"`                                        | Content Pipeline | `data/admin/contentManager.ts:78`  |
| `"Listo B2B"`                                            | Content Pipeline | `data/admin/contentManager.ts:91`  |
| `"Publicado mock"`                                       | Content Pipeline | `data/admin/contentManager.ts:103` |
| `"concept"`, `"design"`, `"prototype"`, `"future"`       | ProductStatus    | `types/catalog.ts:8`               |
| `"Disponible"`, `"En preparación"`, `"Futuro"`           | Document Status  | `types/b2b.ts:46`                  |
| `"borrador"`, `"listo para presupuesto"`                 | Workspace        | `data/b2b/workspaceMock.ts:15`     |
| `"En preparación"`, `"Simulado"`, `"Pendiente revisión"` | Quote Status     | `data/b2b/workspaceMock.ts:21`     |
| `"done"`, `"current"`, `"pending"`                       | AI Review Step   | `types/admin.ts:194`               |

**No existe un lifecycle unificado.** Cada módulo tiene sus propios estados y transiciones.

---

## FASE 2 — Contratos Transversales (Diseño)

### 2.1 ProductMaster

Definido en `docs/architecture/catalog-source-of-truth.md`. Diseño completo en `packages/shared/src/product-master.ts`.

### 2.2 ContentItem

```typescript
// packages/shared/src/content-item.ts

export type EditorialState =
  | "draft"
  | "editorial_review"
  | "ai_generated"
  | "human_review"
  | "catalog_ready"
  | "sommelier_ready"
  | "b2b_ready"
  | "published_mock"
  | "marketplace_future";

export interface ContentItem {
  // Referencia al ProductMaster
  productSlug: string;

  // Estado editorial actual
  editorialState: EditorialState;
  completeness: number; // 0-100

  // Campos editoriales generados
  storytelling: string | null;
  tastingNotes: string | null;
  pairings: string | null;
  aromaProfile: string[] | null;

  // Metadatos
  hasImage: boolean;
  hasSEO: boolean;
  lastModified: string | null;
  lastModifiedBy: "ai" | "editor" | null;

  // AI metadata (cuando se genera por AI Assistant)
  aiGenerated: boolean;
  aiModel: string | null;
  aiConfidence: number | null; // 0-10

  // Rating editorial
  rating: string | null;
}
```

### 2.3 QuoteItem

```typescript
// packages/shared/src/quote-item.ts

export type B2BUseCase =
  | "Carta restaurante"
  | "Tienda gourmet"
  | "Hotel"
  | "Regalo corporativo"
  | "Evento";

export type QuoteStatus =
  | "borrador"
  | "listo_para_presupuesto"
  | "en_preparacion"
  | "simulado"
  | "pendiente_revision"
  | "aprobado";

export interface QuoteItem {
  id: string;

  // Line items
  products: QuoteProductLine[];

  // Metadatos de la solicitud
  useCase: B2BUseCase;
  status: QuoteStatus;
  profileId: string | null;
  createdAt: string;
  lastUpdated: string | null;

  // Sumarizados (cacheados)
  totalUnits: number;
  productCount: number;
  categories: string[];
}

export interface QuoteProductLine {
  productSlug: string;
  quantity: number;
  notes: string | null;
  addedAt: string;
}
```

### 2.4 DocumentItem

```typescript
// packages/shared/src/document-item.ts

export type DocumentType =
  | "ficha_tecnica"
  | "catalogo"
  | "argumentario"
  | "maridaje"
  | "certificacion"
  | "pack";

export type DocumentStatus = "disponible" | "en_preparacion" | "futuro";

export type DocumentProfile =
  | "restaurante"
  | "tienda_gourmet"
  | "hotel"
  | "distribuidor"
  | "empresa";

export interface DocumentItem {
  id: string;
  title: string;
  type: DocumentType;
  productSlug: string | null; // null = documento general
  status: DocumentStatus;
  profiles: DocumentProfile[];

  // Contenido
  description: string;
  professionalUse: string;

  // Origen
  sourceModule: "content_manager" | "ai_assistant" | "manual" | null;

  // Metadatos
  createdAt: string;
  updatedAt: string | null;
}
```

### 2.5 SommelierKnowledge

```typescript
// packages/shared/src/sommelier-knowledge.ts

export type SommelierProfile = "private" | "b2b" | "producer" | "admin";

export interface SommelierKnowledge {
  // Producto al que pertenece este conocimiento
  productSlug: string;
  productName: string;
  category: string;

  // Conocimiento enriquecido
  description: string;
  tastingNotes: string[];
  aromaProfile: string[];
  pairings: SommelierPairing[];
  specs: Record<string, string>;
  tags: string[];

  // Metadatos
  confidence: number;
  source: "mock" | "lmstudio" | "ailab";
  lastUpdated: string;
  warnings: string[];
}

export interface SommelierPairing {
  product: string;
  pairing: string;
  reason: string;
}
```

### 2.6 ReviewItem

```typescript
// packages/shared/src/review-item.ts

export type ReviewAction = "approve" | "reject" | "request_changes" | "skip";

export interface ReviewItem {
  id: string;
  productSlug: string;

  // Qué se está revisando
  reviewType: "editorial" | "sommelier" | "b2b" | "seo";

  // Estado
  status: "pending" | "in_review" | "approved" | "rejected";
  reviewer: string | null;
  action: ReviewAction | null;
  comments: string | null;

  // Métricas de revisión
  completeness: number;
  issues: string[];

  // Timestamps
  createdAt: string;
  reviewedAt: string | null;
}
```

---

## FASE 3 — Editorial Lifecycle

### Estados del Lifecycle

```
draft ──────────→ editorial_review ──→ ai_generated ──→ human_review ──→ catalog_ready
                     │                                                      │
                     ↓                                                      │
                (feedback loop) ←──────────────────────────────────────────────┘
                                                                              │
                                                     ┌────────────────────────┘
                                                     ↓
                                             ┌───────────────┐
                                             │  sommelier_ready │──→ published_mock ──→ marketplace_future
                                             └───────────────┘
                                                     │
                                                     ↓
                                              b2b_ready ──→ published_mock
```

### Significado

| Estado               | Significado                                                   | Consumidores                           |
| -------------------- | ------------------------------------------------------------- | -------------------------------------- |
| `draft`              | Producto creado, sin contenido editorial                      | Content Manager, AI Assistant          |
| `editorial_review`   | En proceso de revisión editorial humana                       | Content Manager                        |
| `ai_generated`       | Contenido generado por AI Assistant, pendiente de revisión    | AI Assistant, Content Manager          |
| `human_review`       | Editor humano revisando contenido AI                          | Content Manager                        |
| `catalog_ready`      | Contenido editorial completo, visible en catálogo             | Catálogo Premium                       |
| `sommelier_ready`    | Producto con datos suficientes para recomendaciones Sommelier | Sommelier AI, Sommelier Governance     |
| `b2b_ready`          | Producto listo para canal B2B (fichas, argumentarios)         | Portal B2B, Workspace, Document Center |
| `published_mock`     | Publicado en entorno mock/pre-producción                      | Todos los módulos                      |
| `marketplace_future` | Planificado para marketplace real (futuro)                    | Roadmap, Admin                         |

### Transiciones válidas

| Desde              | Hasta                | Gatillo                                |
| ------------------ | -------------------- | -------------------------------------- |
| `draft`            | `editorial_review`   | Editor asigna revisión                 |
| `editorial_review` | `ai_generated`       | AI Assistant genera batch              |
| `editorial_review` | `draft`              | Se solicita más información            |
| `ai_generated`     | `human_review`       | Batch completado                       |
| `human_review`     | `catalog_ready`      | Editor aprueba                         |
| `human_review`     | `editorial_review`   | Editor solicita cambios                |
| `catalog_ready`    | `sommelier_ready`    | Datos mínimos para Sommelier presentes |
| `catalog_ready`    | `b2b_ready`          | Capa B2B completada                    |
| `catalog_ready`    | `editorial_review`   | Se detectan issues                     |
| `sommelier_ready`  | `published_mock`     | Producto completo y validado           |
| `b2b_ready`        | `published_mock`     | Producto completo y validado           |
| `published_mock`   | `marketplace_future` | Transición a marketplace real          |

---

## FASE 4 — Readiness Contracts

### 4.1 EditorialReadiness

```typescript
export interface EditorialReadiness {
  productSlug: string;
  hasName: boolean;
  hasShortDescription: boolean;
  hasLongDescription: boolean;
  hasStorytelling: boolean;
  hasTastingNotes: boolean;
  hasPairings: boolean;
  hasImage: boolean;
  completeness: number; // 0-100 calculado de los anteriores
}
```

### 4.2 SommelierReadiness

```typescript
export interface SommelierReadiness {
  productSlug: string;
  hasTastingNotes: boolean;
  hasAromaProfile: boolean;
  hasPairings: boolean;
  hasSpecs: boolean;
  hasProducerContext: boolean;
  canRecommend: boolean;
}
```

### 4.3 B2BReadiness

```typescript
export interface B2BReadiness {
  productSlug: string;
  hasTechnicalSheet: boolean;
  hasProfessionalUse: boolean;
  hasCommercialArgument: boolean;
  hasDocument: boolean;
  hasMoq: boolean;
  isReady: boolean;
}
```

### 4.4 DocumentReadiness

```typescript
export interface DocumentReadiness {
  productSlug: string;
  documentsAvailable: number;
  documentsByType: Record<string, boolean>;
  totalProfiles: number;
  isComplete: boolean;
}
```

---

## FASE 5 — Workflow Contract: ProductLifecycle

```typescript
export interface ProductLifecycle {
  // Identidad
  productSlug: string;

  // Estado actual
  currentState: EditorialState;

  // Historial de estados
  history: LifecycleTransition[];

  // Próximos pasos sugeridos
  suggestedNext: EditorialState[];

  // Owner actual
  owner: "editor" | "ai" | "sommelier" | "b2b_manager" | "system" | null;

  // Bloqueos
  blocks: LifecycleBlock[];

  // Timestamps
  createdAt: string;
  updatedAt: string;
  estimatedNextAt: string | null;
}

export interface LifecycleTransition {
  from: EditorialState;
  to: EditorialState;
  triggeredBy: string;
  timestamp: string;
  notes: string | null;
}

export interface LifecycleBlock {
  reason: string;
  blockedBy: string;
  createdAt: string;
  resolvedAt: string | null;
}
```

---

## FASE 6 — Dependency Map

```
┌─────────────────────────────────────────────────────────┐
│                    ProductMaster                         │
│           (packages/shared/src/product-master.ts)        │
└────────────────────────┬────────────────────────────────┘
                         │
                         1
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    ContentItem                           │
│           (estado editorial + campos generados)          │
└────────┬───────────────┬────────────────┬───────────────┘
         │               │                │
         ▼               ▼                ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────────┐
│ AI Assistant │ │   Sommelier  │ │   Content Manager │
│ (escribe)    │ │  Knowledge   │ │   (lee/escribe)   │
└──────────────┘ │  (consume)   │ └──────────────────┘
                 └──────┬───────┘
                        │
                        ▼
               ┌──────────────────┐
               │     Catalog      │
               │  (ProductMaster  │
               │   + ContentItem) │
               └────────┬─────────┘
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
┌──────────────────┐        ┌──────────────────┐
│   Sommelier AI   │        │   Portal B2B     │
│  (consume + IA)  │        │ (consume + quote)│
└──────────────────┘        └────────┬─────────┘
                                     │
                                     ▼
                            ┌──────────────────┐
                            │  B2B Workspace   │
                            │ (QuoteItem +     │
                            │  ProductLifecycle│
                            └────────┬─────────┘
                                     │
                                     ▼
                            ┌──────────────────┐
                            │  Document Center │
                            │  (DocumentItem)  │
                            └──────────────────┘
```

### Dependencias directas

| Contrato             | Depende de                   | Riesgo                                 |
| -------------------- | ---------------------------- | -------------------------------------- |
| `ContentItem`        | `ProductMaster.slug`         | Bajo — solo referencia por slug        |
| `SommelierKnowledge` | `ProductMaster.slug`         | Bajo — solo referencia por slug        |
| `QuoteItem`          | `ProductMaster.slug`         | Bajo — solo referencia por slug        |
| `DocumentItem`       | `ProductMaster.slug`         | Bajo — solo referencia por slug        |
| `ReviewItem`         | `ContentItem.productSlug`    | Medio — depende de ContentItem         |
| `ProductLifecycle`   | `ContentItem.editorialState` | Medio — estado debe estar sincronizado |

### Riesgos identificados

1. **Desincronización de estados**: Si `ContentItem.editorialState` y `ProductLifecycle.currentState` no se actualizan atómicamente, pueden divergir.
2. **Slug huérfano**: Si un `ProductMaster` se elimina, los `ContentItem`, `QuoteItem`, `DocumentItem` que lo referencian quedan huérfanos.
3. **Doble escritura AI Assistant → Content Manager**: El AI Assistant escribe en `ContentItem` pero el Content Manager también. Sin un contrato de ownership claro, puede haber conflictos.
4. **Transiciones inválidas**: Sin validación de lifecycle, un producto puede saltar de `draft` a `published_mock` sin pasar por revisión.
5. **Quote desacoplada de catálogo**: `QuoteProductLine.productSlug` debe validarse contra `ProductMaster.slug` existente.

### Estrategia de mitigación

- Todos los contratos referencian `ProductMaster.slug` como clave foránea (no datos embebidos)
- `ProductLifecycle` es el único source of truth para el estado del producto
- `ContentItem.editorialState` se deriva de `ProductLifecycle.currentState` (no al revés)
- Validación en tiempo de compilación mediante tipos compartidos en `packages/shared/`
- Validación en tiempo de ejecución mediante Zod schemas en API

---

## Ubicación propuesta de los contratos

```
packages/shared/src/
├── index.ts                    # Re-exporta todos los contratos
├── product-master.ts           # ProductMaster, ProductCategory, ProductStatus
├── content-item.ts             # ContentItem, EditorialState
├── quote-item.ts               # QuoteItem, QuoteProductLine, B2BUseCase, QuoteStatus
├── document-item.ts            # DocumentItem, DocumentType, DocumentStatus, DocumentProfile
├── sommelier-knowledge.ts      # SommelierKnowledge, SommelierPairing
├── review-item.ts              # ReviewItem, ReviewAction
├── readiness.ts                # EditorialReadiness, SommelierReadiness, B2BReadiness, DocumentReadiness
└── lifecycle.ts                # ProductLifecycle, LifecycleTransition, LifecycleBlock
```

---

## Consolidaciones ejecutadas

| Contrato                         | Fase                                           | Archivo                                             | Estado                                                                                                |
| -------------------------------- | ---------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `B2BSelectionItem`               | `STACK-2026-B2B-TYPES-CONSOLIDATION-01`        | `types/b2b.ts`                                      | ✅ Consolidado — campo `status?` y `source?` añadidos, interfaz local de `mockDashboard.ts` eliminada |
| `ProductMaster`                  | `STACK-2026-CATALOG-PRODUCTMASTER-SCAFFOLD-01` | `packages/shared/src/product-master.ts`             | ✅ Scaffold creado — todos los tipos compartidos exportados desde `packages/shared`                   |
| `ProductMaster → ProductPremium` | `STACK-2026-CATALOG-PRODUCTMASTER-ADAPTER-01`  | `apps/web/src/data/catalog/productMasterAdapter.ts` | ✅ Adapter creado — mapeo completo con readiness/lifecycle computados y validación                    |

## Criterios de éxito

- [ ] Todos los módulos importan `ProductMaster` desde `packages/shared/`
- [ ] `B2BSelectionItem` unificado en `QuoteItem`
- [ ] `EditorialState` compartido por Content Manager y AI Assistant
- [ ] `ContentItem` separa datos de producto de metadatos editoriales
- [ ] `ProductLifecycle` es el único source of truth de estado
- [ ] `SommelierKnowledge` unifica web y API
- [ ] `DocumentItem` reemplaza `B2BDocumentMock`, `WorkspaceDoc`, `B2BDocument`
- [ ] Readiness contracts eliminados como interfaces inline en `ContentReviewProduct`
- [ ] Build pasa sin errores tras cada migración
