import type { FastifyInstance } from "fastify";
import { MockSommelierProvider } from "../providers/mock.provider";
import { SommelierService } from "../services/sommelier.service";

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
          name: "input_sanitization",
          enabled: true,
          description: "Strip HTML/scripts from input",
        },
        {
          name: "no_price_claims",
          enabled: false,
          description: "Prevent fictional price claims",
        },
        {
          name: "no_stock_claims",
          enabled: false,
          description: "Prevent fictional stock claims",
        },
        {
          name: "lab_production_distinction",
          enabled: false,
          description: "Distinguish lab vs production",
        },
        {
          name: "spanish_response",
          enabled: true,
          description: "Ensure response in Spanish",
        },
      ],
      active: true,
    };
  });

  app.get("/api/v1/sommelier", async () => {
    return {
      service: "sommelier",
      version: "1.0.0",
      status: "scaffold",
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
          status: "not_implemented",
        },
      ],
    };
  });

  app.post("/api/v1/sommelier/chat", async (_request, reply) => {
    return reply.status(501).send({
      error: "NOT_IMPLEMENTED",
      message: "POST /api/v1/sommelier/chat is not implemented yet",
      statusCode: 501,
    });
  });
}
