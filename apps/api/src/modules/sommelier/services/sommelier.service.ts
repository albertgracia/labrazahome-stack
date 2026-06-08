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

    const preWarnings: SommelierWarning[] =
      this.guardrailsService.validateInput(request);

    const catalogContext = this.catalogContextService.buildContext(
      request.message,
      request.profile,
      request.selectedProductSlug,
    );

    const input: ChatInput = {
      message: request.message,
      profile: request.profile,
      conversationContext: request.conversationContext,
      catalogContext,
      traceId,
    };

    const startTime = Date.now();
    let fallbackUsed = false;
    let providerResponse;

    try {
      providerResponse = await this.provider.chat(input);
    } catch {
      providerResponse = {
        answer:
          "Lo siento, el servicio de recomendación no está disponible en este momento. Por favor, inténtalo de nuevo más tarde.",
        intent: "general" as const,
        recommendations: [],
        pairings: [],
        confidence: 0.3,
        model: undefined,
        warnings: [
          {
            type: "fallback" as const,
            message:
              "El proveedor de respuestas no está disponible. Usando respuesta de emergencia.",
          },
        ],
        sources: [],
      };
      fallbackUsed = true;
    }

    const latencyMs = Date.now() - startTime;

    const postWarnings =
      this.guardrailsService.validateOutput(providerResponse);

    return normalizeProviderResponse({
      providerResponse,
      provider: "mock",
      model: providerResponse.model ?? "mock-v1",
      traceId,
      latencyMs,
      warnings: [...preWarnings, ...postWarnings, ...providerResponse.warnings],
      profile: request.profile,
      fallbackUsed,
    });
  }

  async health() {
    return this.provider.health();
  }

  metadata() {
    return this.provider.metadata();
  }
}
