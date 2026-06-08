import type {
  SommelierProviderType,
  SommelierIntent,
  SommelierRecommendation,
  SommelierPairing,
  SommelierWarning,
  SommelierSource,
  ProviderHealth,
  ProviderMetadata,
  CatalogContextItem,
  ConversationContext,
  SommelierProfile,
} from "../schemas/sommelier.schemas";

export interface ChatInput {
  message: string;
  profile: SommelierProfile;
  conversationContext: ConversationContext;
  catalogContext: CatalogContextItem[];
  traceId: string;
}

export interface SommelierProviderResponse {
  answer: string;
  intent: SommelierIntent;
  recommendations: SommelierRecommendation[];
  pairings: SommelierPairing[];
  confidence: number;
  model?: string;
  warnings: SommelierWarning[];
  sources: SommelierSource[];
}

export interface SommelierProvider {
  chat(input: ChatInput): Promise<SommelierProviderResponse>;
  health(): Promise<ProviderHealth>;
  metadata(): ProviderMetadata;
}

export interface ProviderConfig {
  baseUrl?: string;
  timeoutMs?: number;
  retryCount?: number;
  model?: string;
}
