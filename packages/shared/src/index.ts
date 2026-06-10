export type Role = "user" | "admin";

// ProductMaster — Source of Truth
export type {
  // Core
  ProductMaster,
  ProductMasterCategory,
  ProductMasterStatus,
  ProductMasterCategoryInfo,
  // Ratings
  ProductMasterRating,
  ProductMasterRatingSource,
  // Knowledge
  ProductMasterKnowledge,
  // SEO
  ProductMasterSeo,
  // Readiness
  ProductMasterReadiness,
  EditorialReadiness,
  SommelierReadiness,
  B2BReadiness,
  DocumentReadiness,
  // Lifecycle
  ProductLifecycle,
  ProductLifecycleState,
  ProductLifecycleTransition,
  ProductLifecycleBlock,
} from "./product-master";
