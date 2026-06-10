import type { ProductPremium, ProductCategory } from "../../types/catalog";
import type {
  ProductMaster,
  ProductMasterCategory,
  ProductMasterStatus,
  ProductMasterRating,
  ProductLifecycleState,
} from "../../../../../packages/shared/src/product-master";
import {
  products,
  getProductBySlug,
  getProductsByCategory,
  getFeaturedProducts,
} from "./products";

// ──────────────────────────────────────
// Internal helpers
// ──────────────────────────────────────

function toStatus(product: ProductPremium): ProductMasterStatus {
  return product.status as ProductMasterStatus;
}

function toCategory(product: ProductPremium): ProductMasterCategory {
  return product.category as ProductMasterCategory;
}

function toRatings(product: ProductPremium): ProductMasterRating[] | undefined {
  if (!product.ratings || product.ratings.length === 0) return undefined;
  return product.ratings.map((r) => ({
    source: r.source as ProductMasterRating["source"],
    score: r.score,
    maxScore: r.maxScore as number,
    year: r.year,
    note: r.note,
    isMock: r.isMock,
  }));
}

function toLifecycle(product: ProductPremium): ProductMaster["lifecycle"] {
  const stateMap: Record<string, ProductLifecycleState> = {
    concept: "draft",
    design: "editorial_review",
    prototype: "catalog_ready",
    future: "marketplace_future",
  };
  return {
    productSlug: product.slug,
    currentState: stateMap[product.status] ?? "draft",
    history: [],
    suggestedNext: [],
    owner: "system",
    blocks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    estimatedNextAt: null,
  };
}

function toReadiness(product: ProductPremium): ProductMaster["readiness"] {
  const hasTastingNotes =
    product.knowledge?.tastingNotes != null &&
    product.knowledge.tastingNotes.length > 0;
  const hasAromaProfile =
    product.knowledge?.aromaProfile != null &&
    product.knowledge.aromaProfile.length > 0;

  return {
    editorial: {
      productSlug: product.slug,
      hasName: !!product.name,
      hasShortDescription: !!product.shortDescription,
      hasLongDescription: !!product.longDescription,
      hasStorytelling: !!product.story,
      hasTastingNotes,
      hasPairings: product.pairing.length > 0,
      hasImage: !!product.imageGradient,
      completeness: 0,
    },
    sommelier: {
      productSlug: product.slug,
      hasTastingNotes,
      hasAromaProfile,
      hasPairings: product.pairing.length > 0,
      hasSpecs: Object.keys(product.specs).length > 0,
      hasProducerContext: !!product.story,
      canRecommend:
        hasTastingNotes && hasAromaProfile && product.pairing.length > 0,
    },
    b2b: {
      productSlug: product.slug,
      hasTechnicalSheet: false,
      hasProfessionalUse: false,
      hasCommercialArgument: false,
      hasDocument: false,
      hasMoq: false,
      isReady: false,
    },
    document: {
      productSlug: product.slug,
      documentsAvailable: 0,
      documentsByType: {},
      totalProfiles: 0,
      isComplete: false,
    },
  };
}

// ──────────────────────────────────────
// Public API
// ──────────────────────────────────────

export function toProductMaster(product: ProductPremium): ProductMaster {
  return {
    id: product.id,
    slug: product.slug,
    category: toCategory(product),
    name: product.name,
    producer: product.producer,
    region: product.region,
    shortDescription: product.shortDescription,
    longDescription: product.longDescription,
    story: product.story,
    status: toStatus(product),
    tags: product.tags,
    highlights: product.highlights,
    featured: product.featured,
    specs: product.specs,
    pairings: product.pairing,
    imageGradient: product.imageGradient,
    ratings: toRatings(product),
    knowledge: product.knowledge as ProductMaster["knowledge"],
    seo: undefined,
    readiness: toReadiness(product),
    lifecycle: toLifecycle(product),
  };
}

export function toProductMasters(items: ProductPremium[]): ProductMaster[] {
  return items.map(toProductMaster);
}

export function getProductMasterBySlug(
  slug: string,
  category?: ProductCategory,
): ProductMaster | undefined {
  const product = getProductBySlug(slug, category);
  return product ? toProductMaster(product) : undefined;
}

export function getProductMastersByCategory(
  category: ProductCategory,
): ProductMaster[] {
  return toProductMasters(getProductsByCategory(category));
}

export function getFeaturedProductMasters(): ProductMaster[] {
  return toProductMasters(getFeaturedProducts());
}

// ──────────────────────────────────────
// Validation
// ──────────────────────────────────────

export function validateProductMaster(product: ProductMaster): string[] {
  const warnings: string[] = [];

  if (!product.slug) warnings.push("Missing slug");
  if (!product.name) warnings.push("Missing name");
  if (!product.category) warnings.push("Missing category");
  if (!product.shortDescription) warnings.push("Missing shortDescription");
  if (!product.pairings || product.pairings.length === 0)
    warnings.push("Missing pairings");
  if (!product.tags || product.tags.length === 0) warnings.push("Missing tags");

  return warnings;
}

// ──────────────────────────────────────
// Convenience: convert & validate all
// ──────────────────────────────────────

export function convertAndValidateAll(): {
  converted: ProductMaster[];
  warnings: Array<{ slug: string; warnings: string[] }>;
} {
  const converted = toProductMasters(products);
  const warnings = converted.map((p) => ({
    slug: p.slug,
    warnings: validateProductMaster(p),
  }));
  return { converted, warnings };
}
