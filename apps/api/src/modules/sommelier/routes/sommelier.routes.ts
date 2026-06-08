import type { FastifyInstance } from "fastify";
import { MockSommelierProvider } from "../providers/mock.provider";
import { LMStudioSommelierProvider } from "../providers/lmstudio.provider";
import { SommelierService } from "../services/sommelier.service";
import { CatalogContextService } from "../services/catalog-context.service";
import { GuardrailsService } from "../services/guardrails.service";
import {
  SommelierChatRequestSchema,
  CatalogContextRequestSchema,
} from "../schemas/sommelier.schemas";
import { SommelierError } from "../utils/errors";

function createSommelierService(): SommelierService {
  const mockProvider = new MockSommelierProvider();
  const providerMode = process.env.SOMMELIER_PROVIDER || "mock";

  if (providerMode === "lmstudio") {
    const lmstudioProvider = new LMStudioSommelierProvider();
    return new SommelierService(
      lmstudioProvider,
      "lmstudio",
      mockProvider,
      "mock",
    );
  }

  return new SommelierService(mockProvider, "mock");
}

export async function registerSommelierRoutes(app: FastifyInstance) {
  const sommelierService = createSommelierService();
  const catalogContextService = new CatalogContextService();
  const guardrailsService = new GuardrailsService();

  app.get("/api/v1/sommelier/health", async () => {
    const health = await sommelierService.health();
    const providerMode = process.env.SOMMELIER_PROVIDER || "mock";
    return {
      status: health.status,
      provider: health.provider,
      model: health.model,
      activeProvider: providerMode,
      providersAvailable: [
        { name: "mock", available: true },
        { name: "lmstudio", available: providerMode === "lmstudio" },
        { name: "ailab", available: false },
      ],
      version: "1.0.0",
      timestamp: health.timestamp,
      health: health,
    };
  });

  app.get("/api/v1/sommelier/providers", async () => {
    const metadata = sommelierService.metadata();
    const providerMode = process.env.SOMMELIER_PROVIDER || "mock";
    const lmstudioMetadata =
      providerMode === "lmstudio"
        ? metadata
        : {
            name: "lmstudio",
            version: "1.0.0",
            available: false,
            description: "LM Studio provider for local LLM inference",
          };

    return {
      activeProvider: providerMode,
      fallbackProvider: providerMode === "lmstudio" ? "mock" : "mock",
      availableProviders: [
        {
          name: "mock",
          version: "1.0.0",
          available: true,
          description: "Mock provider for development and fallback",
          capabilities: [
            "catalog-aware responses",
            "intent detection",
            "recommendations",
            "pairings",
          ],
        },
        {
          ...lmstudioMetadata,
          capabilities:
            providerMode === "lmstudio"
              ? ["local LLM", "prompt-based", "context-aware", "generative AI"]
              : ["local LLM", "prompt-based", "context-aware"],
        },
        {
          name: "ailab",
          version: "1.0.0",
          available: false,
          description: "AI-LAB provider for governed LLM inference",
          capabilities: ["model routing", "MCP tools", "guardrails"],
        },
      ],
      config: {
        provider: providerMode,
        timeoutMs: parseInt(process.env.SOMMELIER_TIMEOUT_MS ?? "30000", 10),
        lmstudioBaseUrl:
          process.env.LMSTUDIO_BASE_URL || "http://192.168.1.250:1234/v1",
        lmstudioModel: process.env.LMSTUDIO_MODEL || "llama-3.2-1b-instruct",
      },
    };
  });

  app.get("/api/v1/sommelier/guardrails", async () => {
    const info = guardrailsService.getInfo();
    return {
      active: true,
      provider: process.env.SOMMELIER_PROVIDER || "mock",
      labMode: info.labMode,
      noPersonalDataLogging: info.noPersonalDataLogging,
      limits: {
        maxMessageLength: info.maxMessageLength,
        maxCatalogProducts: info.maxCatalogProducts,
        allowedProfiles: info.allowedProfiles,
      },
      forbiddenClaims: info.forbiddenClaims,
      disclaimers: info.disclaimers,
      rules: [
        {
          name: "max_message_length",
          enabled: true,
          description: "Max 2000 characters per message",
        },
        {
          name: "empty_message",
          enabled: true,
          description: "Reject empty messages",
        },
        {
          name: "input_sanitization",
          enabled: true,
          description: "Strip HTML/scripts from input",
        },
        {
          name: "no_price_claims",
          enabled: true,
          description: "Prevent fictional price claims",
        },
        {
          name: "no_stock_claims",
          enabled: true,
          description: "Prevent fictional stock claims",
        },
        {
          name: "no_availability_claims",
          enabled: true,
          description: "Prevent fictional availability claims",
        },
        {
          name: "no_commercial_terms",
          enabled: true,
          description: "Prevent fictional commercial terms",
        },
        {
          name: "no_unverified_ratings",
          enabled: true,
          description: "Prevent unverified rating claims",
        },
        {
          name: "lab_production_distinction",
          enabled: true,
          description: "Distinguish lab vs production",
        },
      ],
    };
  });

  app.get("/api/v1/sommelier", async () => {
    const providerMode = process.env.SOMMELIER_PROVIDER || "mock";
    return {
      service: "sommelier",
      version: "1.0.0",
      status: `${providerMode}_active`,
      endpoints: [
        {
          method: "GET",
          path: "/api/v1/sommelier/health",
          status: "implemented",
        },
        {
          method: "GET",
          path: "/api/v1/sommelier/providers",
          status: "implemented",
        },
        {
          method: "GET",
          path: "/api/v1/sommelier/guardrails",
          status: "implemented",
        },
        {
          method: "POST",
          path: "/api/v1/sommelier/catalog-context",
          status: "implemented",
        },
        {
          method: "POST",
          path: "/api/v1/sommelier/chat",
          status: "implemented",
        },
      ],
    };
  });

  app.post("/api/v1/sommelier/catalog-context", async (request, reply) => {
    const parsed = CatalogContextRequestSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.status(400).send({
        error: "INVALID_REQUEST",
        message: "El cuerpo de la solicitud no es válido.",
        statusCode: 400,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { message, maxProducts } = parsed.data;
    const intent = catalogContextService.detectIntent(message);
    const candidates = catalogContextService.buildContext(
      message,
      parsed.data.profile,
      undefined,
      maxProducts,
    );

    return {
      intent,
      candidates,
      sources: candidates.map((c) => ({
        type: "product" as const,
        id: c.slug,
        name: c.name,
      })),
      warnings: [
        {
          type: "mock_data" as const,
          message: "Contexto generado en modo laboratorio con datos simulados.",
        },
      ],
    };
  });

  app.post("/api/v1/sommelier/chat", async (request, reply) => {
    const parsed = SommelierChatRequestSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.status(400).send({
        error: "INVALID_REQUEST",
        message: "El cuerpo de la solicitud no es válido.",
        statusCode: 400,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    try {
      const response = await sommelierService.chat(parsed.data);
      return reply.status(200).send(response);
    } catch (err) {
      if (err instanceof SommelierError) {
        return reply.status(err.statusCode).send({
          error: err.code,
          message: err.message,
          statusCode: err.statusCode,
        });
      }
      return reply.status(500).send({
        error: "INTERNAL_ERROR",
        message: "Error interno del servidor al procesar la solicitud.",
        statusCode: 500,
      });
    }
  });
}
