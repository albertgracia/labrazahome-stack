# Catalog Source of Truth — Arquitectura Propuesta

## Objetivo

Definir un único `ProductMaster` como fuente de verdad compartida para todos los módulos del ecosistema:

- Catálogo Premium (`/catalogo`)
- Sommelier AI (`/sommelier`, `/admin/sommelier`)
- Portal B2B (`/b2b`)
- B2B Workspace (`/b2b/workspace`)
- Document Center (`/b2b/documentos`)
- Backoffice Content Manager (`/admin/contenido`)
- AI Editorial Assistant (sección en `/admin/contenido`)
- Sommelier Governance (`/admin/sommelier`)

---

## Situación Actual

Actualmente existen **4 fuentes de datos de producto independientes**:

| Fuente           | Archivo                                               | Tipo                     | # Items |
| ---------------- | ----------------------------------------------------- | ------------------------ | ------- |
| Catálogo Premium | `apps/web/src/data/catalog/products.ts`               | `ProductPremium[]`       | 11      |
| B2B Dashboard    | `apps/web/src/data/b2b/mockDashboard.ts`              | `B2BProduct[]`           | 6       |
| Content Manager  | `apps/web/src/data/admin/contentManager.ts`           | `ContentReviewProduct[]` | 6       |
| API Sommelier    | `apps/api/src/modules/sommelier/data/catalog.mock.ts` | `MockProduct[]`          | 10      |

**Tipos duplicados**: 14+ definiciones de producto en 20+ archivos.

---

## ProductMaster — Propuesta de Diseño

### Ubicación

`packages/shared/src/product-master.ts` (implementado)

### Estructura

```typescript
// === Núcleo compartido (packages/shared) ===

export type ProductCategory =
  | "vinos"
  | "aceites"
  | "mieles"
  | "gourmet"
  | "packs";

export type ProductStatus =
  | "concept"
  | "design"
  | "prototype"
  | "future"
  | "published";

export interface ProductMaster {
  // Identidad
  slug: string;
  name: string;
  producer: string;
  category: ProductCategory;
  region: string;

  // Contenido editorial
  shortDescription: string;
  longDescription: string;
  story: string;

  // Clasificación
  tags: string[];
  highlights: string[];
  status: ProductStatus;
  featured: boolean;

  // Ficha técnica
  specs: Record<string, string>;

  // Maridajes
  pairings: string[];

  // Imagen
  imageGradient: string;

  // Datos enrichidos (opcionales, fase 2)
  ratings?: WineRating[];
  knowledge?: ProductKnowledge;

  // Metadatos de plataforma (fase 3)
  seo?: {
    title: string;
    metaDescription: string;
    canonical: string;
  };

  // Ready flags (fase 4)
  readiness?: {
    hasSEO: boolean;
    hasStorytelling: boolean;
    isB2BReady: boolean;
    isSommelierReady: boolean;
  };
}
```

### Tipos acompañantes

```typescript
export interface CategoryInfo {
  slug: ProductCategory;
  name: string;
  icon: string;
  description: string;
  heroGradient: string;
}

export interface WineRating {
  source: WineRatingSource;
  score: number;
  maxScore: number;
  year?: number;
  note?: string;
  isMock?: boolean;
}

export interface ProductKnowledge {
  // Vinos
  variety?: string;
  crianza?: string;
  altitude?: string;
  servingTemperature?: string;
  agingPotential?: string;
  body?: string;
  finish?: string;

  // Aceites
  oliveVariety?: string;
  bitterness?: string;
  pungency?: string;

  // Mieles
  floralOrigin?: string;
  intensity?: string;
  texture?: string;
  sweetness?: string;

  // Transversal
  aromaProfile?: string;
  tastingNotes?: string;
  culinaryUses?: string;
  idealFor?: string;
  occasion?: string;
  premiumLevel?: string;
}
```

---

## Contrato de Consumo (interfaces derivadas)

Cada módulo consumirá **solo los campos** que necesita, mediante interfaces derivadas que referencian `slug` como clave foránea:

| Módulo               | Interfaz             | Campos desde ProductMaster                                                        |
| -------------------- | -------------------- | --------------------------------------------------------------------------------- |
| Catálogo (cards)     | `CatalogCard`        | slug, name, category, producer, shortDescription, imageGradient, status, featured |
| Sommelier (contexto) | `SommelierProduct`   | slug, name, category, producer, shortDescription, specs, pairings, tags, status   |
| B2B Selection        | `B2BSelectionItem`   | productSlug, productName, productCategory, quantity*, useCase*, addedAt\*         |
| Document Center      | `B2BDocumentMock`    | productSlug, productName + metadata propia del documento                          |
| Content Manager      | `ContentProduct`     | slug, name, category + readiness (hasSEO, hasStorytelling, etc.)                  |
| AI Assistant         | `AIGenerationTarget` | slug, name, category (para generación de campos)                                  |

- Campos gestionados exclusivamente por el módulo consumidor.

---

## Mapa de Consumo Actual

| Módulo               | Ruta                  | Fuente actual                                        | Tipo de dato               | Duplicación                 |
| -------------------- | --------------------- | ---------------------------------------------------- | -------------------------- | --------------------------- |
| Catálogo Premium     | `/catalogo`           | `data/catalog/products.ts`                           | `ProductPremium[]`         | — (source primaria)         |
| Sommelier (web)      | `/sommelier`          | `data/catalog/products.ts` vía `getSommelierContext` | `ProductPremium`           | NO (consume catálogo)       |
| Sommelier (API)      | API interna           | `api/.../data/catalog.mock.ts`                       | `MockProduct[]`            | SÍ — duplica slugs          |
| B2B Dashboard        | `/b2b`                | `data/b2b/mockDashboard.ts`                          | `B2BProduct[]`             | SÍ — 6 productos duplicados |
| B2B Workspace        | `/b2b/workspace`      | `data/b2b/workspaceMock.ts`                          | `WorkspaceSelection`       | SÍ — nombres duplicados     |
| Document Center      | `/b2b/documentos`     | `data/b2b/documentCenter.ts`                         | `B2BDocumentMock[]`        | SÍ — productSlug duplicado  |
| Backoffice Admin     | `/admin`              | `data/admin/adminDashboard.ts`                       | `CatalogReviewItem[]`      | SÍ — nombres duplicados     |
| Content Manager      | `/admin/contenido`    | `data/admin/contentManager.ts`                       | `ContentReviewProduct[]`   | SÍ — 6 productos duplicados |
| AI Assistant         | en `/admin/contenido` | `data/admin/aiAssistantMock.ts`                      | `AdminAIGeneratedSample[]` | SÍ — slugs duplicados       |
| Sommelier Governance | `/admin/sommelier`    | `data/admin/sommelierGovernance.ts`                  | `BlockedProductItem[]`     | SÍ — nombres duplicados     |

---

## Duplicaciones Detectadas

### 1. Dual `B2BSelectionItem`

- `types/b2b.ts:1` — `productSlug`, `productName`, `productCategory`, `quantity`, `useCase`, `addedAt`
- `data/b2b/mockDashboard.ts:27` — `productName`, `productSlug`, `quantity`, `use`, `status`
- **Inconsistencia**: el tipo del dashboard usa `use` y `status`; el tipo real usa `useCase` y `addedAt`.

### 2. Admin data no importa catálogo real

`contentManager.ts` define `contentReviewProducts` con datos inline en lugar de importar `products` de `data/catalog`. Los slugs coinciden pero los datos están duplicados (completeness, editorialStatus, etc.).

### 3. B2B data duplica productos

`mockDashboard.ts` define `recommendedProducts: B2BProduct[]` con 6 entradas que tienen `slug`, `name`, `category` que existen en el catálogo, pero con campos adicionales (`professionalUse`, `moq`, `image`) que no están en `ProductPremium`.

### 4. Catálogo API duplicado

`api/src/modules/sommelier/data/catalog.mock.ts` define su propio `MockProduct` y array de 10 productos, que incluye productos que NO existen en el catálogo web (`miel-de-milflores`, `aove-cosecha-temprana`, `aove-ecologico`, `foie-gras-de-pato`, `pack-ibericos`).

### 5. Workspace no consume quoteFlow selection

`workspaceMock.ts` define `workspaceSelections` con estructura `{id, products: {name, quantity}[], createdAt, useCase, status}` en lugar de consumir `B2BSelectionItem[]` de `quoteFlow.ts`.

### 6. Document Center no consume Content Manager

`documentCenter.ts` define documentos con `productSlug` y `productName` hardcodeados, no generados por el Content Manager.

### 7. AI Assistant mock no alimenta Content Manager

`aiAssistantMock.ts` genera campos mock que no se integran con `contentReviewProducts`.

### 8. Sommelier Governance no consume logs reales

`sommelierGovernance.ts` define interacciones mock en lugar de consumir logs del backend Sommelier.

### 9. Sin source-of-truth compartido

No existe un archivo único del que todos los módulos importen datos de producto.

### 10. Sin lifecycle común

Cada módulo define su propio estado/status para los productos.

### 11. Sin contratos de datos transversales

No hay interfaces compartidas entre web y API ni entre módulos.

---

## Plan de Migración Propuesto

### Fase 1 — Crear `ProductMaster` en `packages/shared/`

- Definir `ProductMaster` interface
- Definir `CategoryInfo`, `WineRating`, `ProductKnowledge`
- Migrar `ProductCategory` y `ProductStatus` desde `types/catalog.ts`
- Publicar desde `packages/shared/src/index.ts`

### Fase 2 — Migrar Catálogo Premium

- Refactorizar `data/catalog/products.ts` para usar `ProductMaster`
- Migrar tipos de `types/catalog.ts` a `ProductMaster`
- Actualizar consumidores:
  - `ProductCardPremium.astro`
  - Páginas de catálogo (`[categoria].astro`, producto dinámico)
  - `getProductsByCategory`, `getProductBySlug`, `getFeaturedProducts`

### Fase 3 — Migrar Sommelier

- Web: actualizar `getSommelierContext()` y componentes para usar `ProductMaster`
- API: eliminar `MockProduct` y `catalog.mock.ts`, importar desde `ProductMaster`
- Actualizar `mock.provider.ts` para usar datos reales
- Actualizar `BatchProductInput` y `CatalogContextItem`

### Fase 4 — Migrar B2B

- Unificar `B2BSelectionItem` (eliminar versión duplicada en `mockDashboard.ts`)
- Refactorizar `recommendedProducts` para consumir `ProductMaster`
- Workspace: consumir `B2BSelectionItem[]` de `quoteFlow.ts`
- Document Center: referenciar `productSlug` contra `ProductMaster`

### Fase 5 — Migrar Backoffice

- Content Manager: `contentReviewProducts` debe consumir `ProductMaster`
- AI Assistant: `aiGeneratedSamples` debe referenciar `ProductMaster.slug`
- Sommelier Governance: `blockedProducts` debe referenciar `ProductMaster.slug`
- Admin Dashboard: `catalogReviewItems` debe referenciar `ProductMaster`

---

## Dependencias entre Fases

```
Fase 1 (ProductMaster)
  └── Fase 2 (Catálogo)
       ├── Fase 3 (Sommelier)
       └── Fase 4 (B2B)
            └── Fase 5 (Backoffice)
```

Cada fase puede ejecutarse de forma independiente **siempre que Fase 1 esté completa**.

---

## Implementación

| Fase                                                     | Archivo                                                | Estado                                                                                        |
| -------------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `STACK-2026-CATALOG-PRODUCTMASTER-SCAFFOLD-01`           | `packages/shared/src/product-master.ts`                | ✅ Scaffold creado — tipos compartidos exportados desde `packages/shared`                     |
| `STACK-2026-CATALOG-PRODUCTMASTER-ADAPTER-01`            | `apps/web/src/data/catalog/productMasterAdapter.ts`    | ✅ Adapter creado — `ProductPremium` → `ProductMaster` con validación                         |
| `STACK-2026-CATALOG-PRODUCTMASTER-VALIDATION-01`         | `apps/web/src/data/catalog/productMasterValidation.ts` | ✅ Validación formal completada — 12/12 checks pass, 0 fallos                                 |
| `STACK-2026-CATALOG-PRODUCTMASTER-CONSUMER-MIGRATION-01` | `apps/web/src/pages/catalogo/index.astro`              | ✅ Primer consumidor migrado — featured products usan `ProductMaster` vía `ProductCardMaster` |
| `STACK-2026-CATALOG-PRODUCTMASTER-CATEGORY-CONSUMER-01`  | `apps/web/src/pages/catalogo/[categoria].astro`        | ✅ Consumidor de categoría migrado — `getProductMastersByCategory` + `ProductCardMaster`      |
| `STACK-2026-CATALOG-PRODUCTMASTER-DETAIL-CONSUMER-01`    | `apps/web/src/pages/catalogo/[categoria]/[slug].astro` | ✅ Consumidor de detalle migrado — `getProductMasterBySlug` con cast en ratings               |
| `STACK-2026-CATALOG-PRODUCTMASTER-CATALOG-CLEANUP-01`    | `apps/web/src/data/catalog/index.ts`                   | ✅ Barrel cleanup — dead exports eliminados; `ProductCardPremium` documentado como legacy     |
| `STACK-2026-SOMMELIER-PRODUCTMASTER-CONSUMER-01`       | `apps/web/src/data/sommelier/mockResponses.ts` etc.    | ✅ Sommelier mock consumer migrado — `ProductPremium` → `ProductMaster` en mock + componentes |
| `STACK-2026-B2B-PRODUCTMASTER-CONSUMER-01`             | `apps/web/src/data/b2b/mockDashboard.ts`               | ✅ B2B recommended products derivan de `ProductMaster` vía `getB2BRecommendedProducts()`      |

## Criterios de Éxito

- [ ] Un único `ProductMaster` consumido por todos los módulos
- [ ] Cero arrays de producto duplicados en `data/`
- [ ] Todos los módulos referencian `slug` contra el mismo source
- [ ] `B2BSelectionItem` unificado en un solo tipo
- [ ] Workspace consume `quoteFlow selection`
- [ ] Document Center referencias productos por slug
- [ ] Admin data importa desde catálogo, no duplica
- [ ] API Sommelier usa mismos datos que web
- [ ] Build pasa sin errores tras cada fase
