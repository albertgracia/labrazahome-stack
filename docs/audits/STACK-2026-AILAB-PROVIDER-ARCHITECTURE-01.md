# STACK-2026-AILAB-PROVIDER-ARCHITECTURE-01 — AI-LAB Provider Architecture

**Date:** 2026-06-08
**Type:** Architecture-only (no implementation)

## Objective

Design the architecture for connecting Sommelier AI v2 with AI-LAB as the governed provider, completing the provider progression: Mock → LM Studio → AI-LAB.

## Decisions

- **AI-LAB is the governed provider** — Unlike LM Studio (simple local), AI-LAB adds routing, tracing, MCP tools, grounding, and observability
- **Fastify as security frontier** — Frontend never calls AI-LAB directly; Fastify validates, sanitizes, and adapts
- **Shared provider interface** — `SommelierProvider` interface is identical for all 3 providers; swapping is config-driven
- **Catalog context strategy** — Never send full catalog; query classification → candidate selection (max 5) → compact context
- **Guardrails at 3 levels** — Prompt (prevention), validation (Zod post-hoc), UI (badges/warnings)
- **MCP read-only first** — Tools like `sommelier_catalog_search`, `sommelier_product_detail` are read-only; no mutable actions
- **Observability metadata** — traceId, provider, model, latencyMs, confidence, fallbackUsed, sources
- **No personal data in logs** — Full messages and responses excluded; only aggregated metrics

## Files Created/Modified

- **`docs/architecture/ailab-provider.md`** (new) — Full architecture: vision, flow diagram, endpoints, provider interface, catalog context strategy, MCP future, guardrails, observability, fallback, security, roadmap
- **`docs/architecture/sommelier-ai-v2.md`** (modified) — Added AI-LAB reference in Provider Progression, AI Layer, and Roadmap
- **`docs/architecture/lmstudio-provider.md`** (modified) — Added comparison note linking to AI-LAB architecture
- **`.env.example`** (modified) — Added 4 AI-LAB documented variables
- **`docs/audits/STACK-2026-AILAB-PROVIDER-ARCHITECTURE-01.md`** (new) — This audit doc

## Variables Documented

| Variable              | Default                    | Purpose                 |
| --------------------- | -------------------------- | ----------------------- |
| `AILAB_BASE_URL`      | `http://127.0.0.1:8008/v1` | AI-LAB API base         |
| `AILAB_MODEL`         | `ailab-router/auto`        | Model/routing selection |
| `AILAB_TIMEOUT_MS`    | `45000`                    | Request timeout         |
| `AILAB_TRACE_ENABLED` | `true`                     | Tracing toggle          |

## LM Studio vs AI-LAB Summary

| Aspect     | LM Studio             | AI-LAB                                 |
| ---------- | --------------------- | -------------------------------------- |
| Profile    | Simple local provider | Governed provider                      |
| Routing    | No                    | Yes — Router selects model per query   |
| Tracing    | No by default         | Full tracing (traceId, latency, model) |
| Tools      | No                    | MCP tools read-only (future)           |
| Memory     | No                    | Semantic memory (future)               |
| Grounding  | No                    | Yes — verifiable sources               |
| Governance | None                  | Centralized guardrails, policies       |

## Validations

- `pnpm format` — ✅ all files pass
- `pnpm --filter web typecheck` — ✅ no errors (no code changed)
- `pnpm --filter web build` — ✅ 24 pages built
- `pnpm check` — ✅ lint + typecheck + build all pass

## Risks

| Risk                   | Mitigation                                                       |
| ---------------------- | ---------------------------------------------------------------- |
| AI-LAB coupling        | Shared `SommelierProvider` interface; provider can be swapped    |
| MCP mutable by mistake | Policy: read-only first; validation in Fastify layer             |
| Tracing overhead       | Configurable via `AILAB_TRACE_ENABLED`                           |
| Fallback not tested    | MockProvider always available; health() check before AI-LAB call |
| Prompt injection       | 3-level guardrails: prompt, Zod validation, UI warnings          |

## Next Steps

- STACK-2026-BACKEND-SOMMELIER-API-ARCHITECTURE-01
