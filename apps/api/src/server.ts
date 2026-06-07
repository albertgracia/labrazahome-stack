import Fastify from "fastify";
import cors from "@fastify/cors";

const server = Fastify({ logger: true });

await server.register(cors, {
  origin: ["http://localhost:4321"],
});

server.get("/healthz", async () => {
  return { status: "OK", timestamp: new Date().toISOString() };
});

server.get("/api/v1/status", async () => {
  return {
    service: "stack-2026-api",
    status: "running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  };
});

const start = async () => {
  try {
    await server.listen({ port: 8080, host: "0.0.0.0" });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
