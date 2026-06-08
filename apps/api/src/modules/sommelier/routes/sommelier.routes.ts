import type { FastifyInstance } from "fastify";
import { MockSommelierProvider } from "../providers/mock.provider";
import { SommelierService } from "../services/sommelier.service";
import { SommelierChatRequestSchema } from "../schemas/sommelier.schemas";
import { SommelierError, SommelierErrorCode } from "../utils/errors";

export async function registerSommelierRoutes(app: FastifyInstance) {
  const mockProvider = new MockSommelierProvider();
  const sommelierService = new SommelierService(mockProvider);

  app.get("/api/v1/sommelier/health", async () => {
    const health = await sommelierService.health();
    return health;
  });

  app.get("/api/v1/sommelier/providers", async () => {
    const metadata = sommelierService.metadata();
    return {
      providers: [
        metadata,
        {
          name: "lmstudio",
          version: "1.0.0",
          available: false,
          description: "LM Studio provider for local LLM inference",
        },
        {
          name: "ailab",
          version: "1.0.0",
          available: false,
          description: "AI-LAB provider for governed LLM inference",
        },
      ],
      active: "mock",
    };
  });

  app.get("/api/v1/sommelier/guardrails", async () => {
    return {
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
          name: "lab_production_distinction",
          enabled: true,
          description: "Distinguish lab vs production",
        },
      ],
      active: true,
      provider: "mock",
    };
  });

  app.get("/api/v1/sommelier", async () => {
    return {
      service: "sommelier",
      version: "1.0.0",
      status: "mock_active",
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
          path: "/api/v1/sommelier/chat",
          status: "implemented",
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
