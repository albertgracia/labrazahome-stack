import type {
  SommelierChatResponse,
  SommelierWarning,
  SommelierProfile,
} from "../schemas/sommelier.schemas";
import type { SommelierProviderResponse } from "../providers/sommelier-provider";

interface NormalizeInput {
  providerResponse: SommelierProviderResponse;
  provider: string;
  model?: string;
  traceId: string;
  latencyMs: number;
  warnings: SommelierWarning[];
  profile: SommelierProfile;
}

export function normalizeProviderResponse(
  input: NormalizeInput,
): SommelierChatResponse {
  const {
    providerResponse,
    provider,
    model,
    traceId,
    latencyMs,
    warnings,
    profile,
  } = input;

  const sourcesUsed = providerResponse.sources.length;
  const warningsCount = warnings.length;

  return {
    answer: providerResponse.answer,
    intent: providerResponse.intent,
    recommendations: providerResponse.recommendations,
    pairings: providerResponse.pairings,
    confidence: providerResponse.confidence,
    provider: provider as SommelierChatResponse["provider"],
    model,
    traceId,
    warnings,
    sources: providerResponse.sources,
    fallbackUsed: false,
    metadata: {
      traceId,
      provider,
      model,
      latencyMs,
      fallbackUsed: false,
      sourcesUsed,
      warningsCount,
      intent: providerResponse.intent,
      profile,
      timestamp: new Date().toISOString(),
    },
  };
}
