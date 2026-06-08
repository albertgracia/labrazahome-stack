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

export class LMStudioSommelierProvider implements SommelierProvider {
  constructor(private config: ProviderConfig = {}) {
    // TODO(STACK-2026-LMSTUDIO-PROVIDER-IMPLEMENTATION-01): implement LM Studio provider
  }

  async chat(_input: ChatInput): Promise<SommelierProviderResponse> {
    throw new Error("LMStudioSommelierProvider not implemented yet");
  }

  async health(): Promise<ProviderHealth> {
    return {
      status: "degraded",
      provider: "lmstudio",
      model: this.config.model ?? "unknown",
      error: "Provider not implemented",
      timestamp: new Date().toISOString(),
    };
  }

  metadata(): ProviderMetadata {
    return {
      name: "lmstudio",
      version: "1.0.0",
      available: false,
      model: this.config.model,
      description: "LM Studio provider for local LLM inference",
    };
  }
}
