// === ProductMaster — Source of Truth Contract ===
// packages/shared/src/product-master.ts
//
// Diseñado según:
//   docs/architecture/catalog-source-of-truth.md
//   docs/architecture/platform-data-contracts.md
//
// Fase actual: STACK-2026-CATALOG-PRODUCTMASTER-SCAFFOLD-01
// Siguiente:  STACK-2026-CATALOG-PRODUCTMASTER-ADAPTER-01

// ──────────────────────────────────────
// Categorías
// ──────────────────────────────────────

export type ProductMasterCategory =
  | "vinos"
  | "aceites"
  | "mieles"
  | "gourmet"
  | "packs";

// ──────────────────────────────────────
// Estados de producto
// ──────────────────────────────────────

export type ProductMasterStatus =
  | "concept"
  | "design"
  | "prototype"
  | "future"
  | "published_mock"
  | "archived_mock";

// ──────────────────────────────────────
// Lifecycle editorial
// ──────────────────────────────────────

export type ProductLifecycleState =
  | "draft"
  | "editorial_review"
  | "ai_generated"
  | "human_review"
  | "catalog_ready"
  | "sommelier_ready"
  | "b2b_ready"
  | "published_mock"
  | "marketplace_future";

export interface ProductLifecycleTransition {
  from: ProductLifecycleState;
  to: ProductLifecycleState;
  triggeredBy: string;
  timestamp: string;
  notes: string | null;
}

export interface ProductLifecycleBlock {
  reason: string;
  blockedBy: string;
  createdAt: string;
  resolvedAt: string | null;
}

export interface ProductLifecycle {
  productSlug: string;
  currentState: ProductLifecycleState;
  history: ProductLifecycleTransition[];
  suggestedNext: ProductLifecycleState[];
  owner: "editor" | "ai" | "sommelier" | "b2b_manager" | "system" | null;
  blocks: ProductLifecycleBlock[];
  createdAt: string;
  updatedAt: string;
  estimatedNextAt: string | null;
}

// ──────────────────────────────────────
// Ratings
// ──────────────────────────────────────

export type ProductMasterRatingSource =
  | "Parker"
  | "Peñín"
  | "Decanter"
  | "Proensa"
  | "Otro";

export interface ProductMasterRating {
  source: ProductMasterRatingSource;
  score: number;
  maxScore: number;
  year?: number;
  note?: string;
  isMock?: boolean;
}

// ──────────────────────────────────────
// Conocimiento / Enriquecimiento
// ──────────────────────────────────────

export interface ProductMasterKnowledge {
  // Transversal
  tastingNotes?: string[];
  aromaProfile?: string[];

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
  culinaryUses?: string[];
  idealFor?: string[];

  // Mieles
  floralOrigin?: string;
  intensity?: string;
  texture?: string;
  sweetness?: string;
  recommendedUses?: string[];

  // Packs
  targetAudience?: string;
  occasion?: string;
  premiumLevel?: string;
  includes?: string[];
  recommendedFor?: string[];
}

// ──────────────────────────────────────
// SEO
// ──────────────────────────────────────

export interface ProductMasterSeo {
  title: string;
  metaDescription: string;
  canonical: string;
}

// ──────────────────────────────────────
// Readiness
// ──────────────────────────────────────

export interface EditorialReadiness {
  productSlug: string;
  hasName: boolean;
  hasShortDescription: boolean;
  hasLongDescription: boolean;
  hasStorytelling: boolean;
  hasTastingNotes: boolean;
  hasPairings: boolean;
  hasImage: boolean;
  completeness: number;
}

export interface SommelierReadiness {
  productSlug: string;
  hasTastingNotes: boolean;
  hasAromaProfile: boolean;
  hasPairings: boolean;
  hasSpecs: boolean;
  hasProducerContext: boolean;
  canRecommend: boolean;
}

export interface B2BReadiness {
  productSlug: string;
  hasTechnicalSheet: boolean;
  hasProfessionalUse: boolean;
  hasCommercialArgument: boolean;
  hasDocument: boolean;
  hasMoq: boolean;
  isReady: boolean;
}

export interface DocumentReadiness {
  productSlug: string;
  documentsAvailable: number;
  documentsByType: Record<string, boolean>;
  totalProfiles: number;
  isComplete: boolean;
}

export interface ProductMasterReadiness {
  editorial: EditorialReadiness;
  sommelier: SommelierReadiness;
  b2b: B2BReadiness;
  document: DocumentReadiness;
}

// ──────────────────────────────────────
// Categoría (metadata)
// ──────────────────────────────────────

export interface ProductMasterCategoryInfo {
  slug: ProductMasterCategory;
  name: string;
  icon: string;
  description: string;
  heroGradient: string;
}

// ──────────────────────────────────────
// ProductMaster — Contrato principal
// ──────────────────────────────────────

export interface ProductMaster {
  // Identidad
  id: string;
  slug: string;
  category: ProductMasterCategory;
  name: string;
  producer: string;
  region?: string;

  // Contenido editorial
  shortDescription: string;
  longDescription?: string;
  story?: string;

  // Clasificación
  status: ProductMasterStatus;
  tags: string[];
  highlights: string[];
  featured?: boolean;

  // Ficha técnica
  specs: Record<string, string>;

  // Maridajes
  pairings: string[];

  // Imagen
  imageGradient?: string;

  // Bloques enrichidos
  ratings?: ProductMasterRating[];
  knowledge?: ProductMasterKnowledge;
  seo?: ProductMasterSeo;
  readiness?: ProductMasterReadiness;
  lifecycle?: ProductLifecycle;
}

// ──────────────────────────────────────
// Mapa de relación con ProductPremium actual
// ──────────────────────────────────────
//
// ProductPremium (apps/web/src/types/catalog.ts)
//   ↓
// ProductMaster (packages/shared/src/product-master.ts)
//
// Diferencias principales:
// - ProductMaster usa `id` (string) además de `slug`
// - ProductMaster usa `ProductMasterStatus` con más estados
// - ProductMaster tiene `region?` opcional
// - ProductMaster tiene `seo?`, `readiness?`, `lifecycle?` como bloques
// - ProductMaster usa arrays tipados para `ratings`
// - ProductMaster.readiness es un objeto anidado, no flags sueltos
