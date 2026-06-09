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
