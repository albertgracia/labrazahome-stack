import type {
  SommelierProvider,
  ChatInput,
} from "../providers/sommelier-provider";
import type {
  SommelierChatRequest,
  SommelierChatResponse,
  SommelierWarning,
} from "../schemas/sommelier.schemas";
import { CatalogContextService } from "./catalog-context.service";
import { GuardrailsService } from "./guardrails.service";
import { normalizeProviderResponse } from "../utils/response-normalizer";
import { createTraceId } from "../utils/trace";

export class SommelierService {
  private catalogContextService: CatalogContextService;
  private guardrailsService: GuardrailsService;

  constructor(private provider: SommelierProvider) {
    this.catalogContextService = new CatalogContextService();
    this.guardrailsService = new GuardrailsService();
  }

  async chat(request: SommelierChatRequest): Promise<SommelierChatResponse> {
    const traceId = createTraceId();

    // Pre-guardrails
    const preWarnings: SommelierWarning[] =
      this.guardrailsService.validateInput(request);

    // Build catalog context
    const catalogContext = this.catalogContextService.buildContext(
      request.message,
      request.profile,
      request.selectedProductSlug,
    );

    // Build chat input for provider
    const input: ChatInput = {
      message: request.message,
      profile: request.profile,
      conversationContext: request.conversationContext,
      catalogContext,
      traceId,
    };

    // Call provider
    const startTime = Date.now();
    const providerResponse = await this.provider.chat(input);
    const latencyMs = Date.now() - startTime;

    // Post-guardrails
    const postWarnings =
      this.guardrailsService.validateOutput(providerResponse);

    // Normalize response
    return normalizeProviderResponse({
      providerResponse,
      provider: providerResponse.model ? "mock" : "mock",
      model: providerResponse.model,
      traceId,
      latencyMs,
      warnings: [...preWarnings, ...postWarnings, ...providerResponse.warnings],
      profile: request.profile,
    });
  }

  async health() {
    return this.provider.health();
  }

  metadata() {
    return this.provider.metadata();
  }
}
