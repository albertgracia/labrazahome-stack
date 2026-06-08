import type {
  SommelierProvider,
  ChatInput,
  SommelierProviderResponse,
} from "./sommelier-provider";
import type {
  ProviderHealth,
  ProviderMetadata,
} from "../schemas/sommelier.schemas";

export class MockSommelierProvider implements SommelierProvider {
  async chat(input: ChatInput): Promise<SommelierProviderResponse> {
    // TODO(STACK-2026-BACKEND-SOMMELIER-MOCK-PROVIDER-01): implement mock responses
    return {
      answer: `[Mock] Esta es una respuesta simulada para: "${input.message.slice(0, 50)}..."`,
      intent: "general",
      recommendations: [],
      pairings: [],
      confidence: 0.5,
      model: "mock-v1",
      warnings: [
        {
          type: "mock_data",
          message: "Usando respuestas simuladas. Las respuestas no son reales.",
        },
      ],
      sources: [],
    };
  }

  async health(): Promise<ProviderHealth> {
    return {
      status: "ok",
      provider: "mock",
      model: "mock-v1",
      timestamp: new Date().toISOString(),
    };
  }

  metadata(): ProviderMetadata {
    return {
      name: "mock",
      version: "1.0.0",
      available: true,
      model: "mock-v1",
      description: "Mock provider for development and testing",
    };
  }
}
