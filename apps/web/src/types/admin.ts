export interface AdminKpi {
  label: string;
  value: string;
  icon: string;
  description: string;
}

export interface CatalogReviewItem {
  name: string;
  category: string;
  status: string;
  statusColor: string;
  actions: string[];
}

export interface B2BPipelineItem {
  label: string;
  value: string;
  detail: string;
  status: string;
  statusColor: string;
}

export interface SommelierGovernanceMetric {
  label: string;
  value: string;
  icon: string;
  trend: string;
}

export interface IntegrationStatusItem {
  name: string;
  icon: string;
  status: string;
  statusColor: string;
  description: string;
}

export interface AdminAlert {
  title: string;
  description: string;
  severity: string;
  severityColor: string;
}

export interface AdminActivityItem {
  action: string;
  detail: string;
  time: string;
  icon: string;
}

export interface AdminRoadmapItem {
  phase: string;
  status: "completed" | "active" | "pending";
}

// --- Content Manager types ---

export interface ContentKpi {
  label: string;
  value: string;
  icon: string;
  description: string;
}

export interface ContentPipelineStage {
  stage: string;
  count: number;
  color: string;
  products: string[];
}

export interface ContentReviewProduct {
  slug: string;
  name: string;
  category: string;
  editorialStatus: string;
  completeness: number;
  hasImage: boolean;
  hasSeo: boolean;
  hasStorytelling: boolean;
  isB2BReady: boolean;
  isSommelierReady: boolean;
  storytelling: string;
  tastingNotes: string;
  pairings: string;
  rating: string;
}

export interface EditorialChecklistItem {
  field: string;
  done: boolean;
}

export interface SeoPreview {
  title: string;
  metaDescription: string;
  slug: string;
  canonical: string;
  status: string;
}

export interface ReadinessItem {
  label: string;
  ready: boolean;
  note: string;
}

// --- Sommelier Governance types ---

export interface SommelierKpi {
  label: string;
  value: string;
  icon: string;
  description: string;
}

export interface PromptTemplate {
  key: string;
  name: string;
  version: number;
  status: "active" | "draft" | "archived";
  content: string;
}

export interface SommelierInteraction {
  sessionId: string;
  query: string;
  profile: string;
  confidence: number;
  userRating: "helpful" | "unhelpful" | "flagged" | null;
  time: string;
}

export interface ProviderStatusItem {
  name: string;
  status: string;
  statusColor: string;
  description: string;
}

export interface WarningDistributionItem {
  type: string;
  count: number;
  color: string;
}

export interface BlockedProductItem {
  name: string;
  reason: string;
  productSlug?: string;
}

export interface GuardrailsConfig {
  label: string;
  value: string;
  icon: string;
}

// --- AI Assistant types ---

export interface AdminAIBatchStats {
  productsProcessed: number;
  fieldsGenerated: number;
  jsonValid: number;
  timeouts: number;
  hallucinations: number;
  avgQuality: number;
  avgB2B: number;
  avgSEO: number;
}

export interface AdminAICapability {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface AdminAIGeneratedField {
  label: string;
  value: string;
}

export interface AdminAIGeneratedSample {
  productSlug: string;
  productName: string;
  productCategory: string;
  fields: AdminAIGeneratedField[];
}

export interface AdminAIReviewStep {
  step: string;
  status: "done" | "current" | "pending";
}

export interface AdminAIWarning {
  type: "info" | "warning" | "critical";
  message: string;
}
