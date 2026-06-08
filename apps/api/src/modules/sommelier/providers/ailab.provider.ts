import type {
  SommelierProvider,
  ChatInput,
  SommelierProviderResponse,
  ProviderConfig,
} from "./sommelier-provider";
import type {
  ProviderHealth,
  ProviderMetadata,
} from "../schemas/sommelier.schemas";

export class AILabSommelierProvider implements SommelierProvider {
  constructor(private config: ProviderConfig = {}) {
    // TODO(STACK-2026-AILAB-PROVIDER-IMPLEMENTATION-01): implement AI-LAB provider
  }

  async chat(_input: ChatInput): Promise<SommelierProviderResponse> {
    throw new Error("AILabSommelierProvider not implemented yet");
  }

  async health(): Promise<ProviderHealth> {
    return {
      status: "degraded",
      provider: "ailab",
      model: this.config.model ?? "unknown",
      error: "Provider not implemented",
      timestamp: new Date().toISOString(),
    };
  }

  metadata(): ProviderMetadata {
    return {
      name: "ailab",
      version: "1.0.0",
      available: false,
      model: this.config.model,
      description: "AI-LAB provider for governed LLM inference",
    };
  }
}
