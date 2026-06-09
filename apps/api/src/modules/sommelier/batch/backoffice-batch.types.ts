export interface BatchProductInput {
  slug: string;
  name: string;
  category: string;
  producer: string;
  shortDescription: string;
  pairings: string[];
  tags: string[];
}

export interface BackofficeBatchOutput {
  productSlug: string;
  storytelling: string;
  sensoryNotes: string[];
  pairings: { product: string; pairing: string; reason: string }[];
  b2bArgument: string;
  seoTitle: string;
  metaDescription: string;
  editorialTags: string[];
  confidence: number;
  warnings: { type: string; message: string }[];
}

export interface BatchEvaluation {
  productSlug: string;
  productName: string;
  latencyMs: number;
  jsonValid: boolean;
  rawContent: string | null;
  output: BackofficeBatchOutput | null;
  qualityScore: number;
  factualScore: number;
  b2bScore: number;
  seoScore: number;
  warnings: string[];
  hallucinations: string[];
  retryUsed: boolean;
}

export interface BatchSummary {
  model: string;
  params: Record<string, unknown>;
  productsTested: number;
  date: string;
  evaluations: BatchEvaluation[];
  avgLatencyMs: number;
  avgQualityScore: number;
  avgFactualScore: number;
  avgB2BScore: number;
  avgSeoScore: number;
  totalHallucinations: number;
  jsonValidCount: number;
  result: "PASS" | "PARTIAL" | "FAIL";
}
