import { z } from "zod";

export const SommelierProfileEnum = z.enum([
  "private",
  "b2b",
  "producer",
  "admin",
]);
export type SommelierProfile = z.infer<typeof SommelierProfileEnum>;

export const SommelierProviderEnum = z.enum(["mock", "lmstudio", "ailab"]);
export type SommelierProviderType = z.infer<typeof SommelierProviderEnum>;

export const SommelierIntentEnum = z.enum([
  "pairing",
  "recommendation",
  "comparison",
  "product_explanation",
  "general",
]);
export type SommelierIntent = z.infer<typeof SommelierIntentEnum>;

export const SommelierWarningTypeEnum = z.enum([
  "mock_data",
  "no_data",
  "low_confidence",
  "lab_mode",
  "fallback",
  "guardrail",
]);
export type SommelierWarningType = z.infer<typeof SommelierWarningTypeEnum>;

export const SommelierSourceTypeEnum = z.enum([
  "product",
  "category",
  "general_knowledge",
]);
export type SommelierSourceType = z.infer<typeof SommelierSourceTypeEnum>;

export const ConversationContextSchema = z.object({
  category: z.string().nullable(),
  step: z.number().int().min(0),
  totalSteps: z.number().int().min(0),
  collected: z.record(z.string()),
  completed: z.boolean(),
});
export type ConversationContext = z.infer<typeof ConversationContextSchema>;

export const ClientContextSchema = z.object({
  selectedProductSlug: z.string().optional(),
  referrer: z.string().optional(),
  userAgent: z.string().optional(),
});
export type ClientContext = z.infer<typeof ClientContextSchema>;

export const SommelierChatRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  profile: SommelierProfileEnum,
  conversationContext: ConversationContextSchema,
  clientContext: ClientContextSchema.optional(),
  selectedProductSlug: z.string().optional(),
  provider: SommelierProviderEnum.optional(),
  locale: z.string().default("es-ES"),
});
export type SommelierChatRequest = z.infer<typeof SommelierChatRequestSchema>;

export const SommelierRecommendationSchema = z.object({
  slug: z.string(),
  name: z.string(),
  category: z.string(),
  reason: z.string(),
  confidence: z.number().min(0).max(1),
});
export type SommelierRecommendation = z.infer<
  typeof SommelierRecommendationSchema
>;

export const SommelierPairingSchema = z.object({
  product: z.string(),
  pairing: z.string(),
  reason: z.string(),
});
export type SommelierPairing = z.infer<typeof SommelierPairingSchema>;

export const SommelierWarningSchema = z.object({
  type: SommelierWarningTypeEnum,
  message: z.string(),
});
export type SommelierWarning = z.infer<typeof SommelierWarningSchema>;

export const SommelierSourceSchema = z.object({
  type: SommelierSourceTypeEnum,
  id: z.string().optional(),
  name: z.string(),
});
export type SommelierSource = z.infer<typeof SommelierSourceSchema>;

export const SommelierMetadataSchema = z.object({
  traceId: z.string(),
  provider: z.string(),
  model: z.string().optional(),
  latencyMs: z.number().min(0),
  fallbackUsed: z.boolean(),
  sourcesUsed: z.number().int().min(0),
  warningsCount: z.number().int().min(0),
  intent: z.string(),
  profile: z.string(),
  timestamp: z.string(),
});
export type SommelierMetadata = z.infer<typeof SommelierMetadataSchema>;

export const SommelierChatResponseSchema = z.object({
  answer: z.string(),
  intent: SommelierIntentEnum,
  recommendations: z.array(SommelierRecommendationSchema),
  pairings: z.array(SommelierPairingSchema),
  confidence: z.number().min(0).max(1),
  provider: SommelierProviderEnum,
  model: z.string().optional(),
  traceId: z.string(),
  warnings: z.array(SommelierWarningSchema),
  sources: z.array(SommelierSourceSchema),
  fallbackUsed: z.boolean(),
  metadata: SommelierMetadataSchema,
});
export type SommelierChatResponse = z.infer<typeof SommelierChatResponseSchema>;

export const ProviderHealthSchema = z.object({
  status: z.enum(["ok", "degraded", "down"]),
  provider: z.string(),
  model: z.string().optional(),
  latencyMs: z.number().min(0).optional(),
  error: z.string().optional(),
  timestamp: z.string(),
});
export type ProviderHealth = z.infer<typeof ProviderHealthSchema>;

export const ProviderMetadataSchema = z.object({
  name: z.string(),
  version: z.string().optional(),
  available: z.boolean(),
  model: z.string().optional(),
  description: z.string().optional(),
});
export type ProviderMetadata = z.infer<typeof ProviderMetadataSchema>;

export const CatalogContextItemSchema = z.object({
  slug: z.string(),
  name: z.string(),
  category: z.string(),
  producer: z.string(),
  shortDescription: z.string(),
  specs: z.record(z.string()),
  pairings: z.array(z.string()),
  tags: z.array(z.string()),
  status: z.string(),
});
export type CatalogContextItem = z.infer<typeof CatalogContextItemSchema>;
