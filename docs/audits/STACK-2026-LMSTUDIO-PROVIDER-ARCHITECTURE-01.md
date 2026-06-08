# STACK-2026-LMSTUDIO-PROVIDER-ARCHITECTURE-01 — LM Studio Provider Architecture

**Date:** 2026-06-08
**Type:** Architecture-only (no implementation)

## Objective

Design the architecture for connecting Sommelier AI v2 with LM Studio in a future phase. Provider progression: mock → LM Studio → AI-LAB.

## Decisions

- **Provider abstraction** — `SommelierProvider` interface with `chat()`, `health()`, `metadata()` methods
- **LM Studio only in local/LAN** — Vercel production cannot connect to `127.0.0.1`; provider must detect availability and fallback
- **Fallback always available** — MockProvider is always the safety net; LM Studio failures degrade gracefully
- **Prompt injection** — Catalog context built by query classification + candidate selection, not by sending entire catalog
- **Structured output** — LM Studio must respond with valid JSON parsed via Zod; invalid responses trigger fallback
- **No personal data in logs** — Only query type, profile, latency logged; never message content
- **Variables documented only** — `SOMMELIER_PROVIDER`, `LMSTUDIO_BASE_URL`, `LMSTUDIO_MODEL`, `SOMMELIER_TIMEOUT_MS` added to `.env.example` as documentation

## Files Created/Modified

- **`docs/architecture/lmstudio-provider.md`** (new) — Full architecture: vision, flow diagram, endpoints, provider interface, prompt design, catalog context strategy, security, fallback, roadmap
- **`docs/architecture/sommelier-ai-v2.md`** (modified) — Added Provider Progression section, reference to lmstudio-provider.md
- **`.env.example`** (modified) — Added 4 documented variables (no secrets)

## Provider Interface Summary

```typescript
interface SommelierProvider {
  chat(input: ChatInput): Promise<SommelierProviderResponse>;
  health(): Promise<ProviderHealth>;
  metadata(): ProviderMetadata;
}
```

## Endpoints Designed

- `POST /api/v1/sommelier/chat` — Main chat endpoint with full request/response spec
- `GET /api/v1/sommelier/health` — Health check with provider info

## Variables Documented

| Variable               | Default                    | Purpose            |
| ---------------------- | -------------------------- | ------------------ |
| `SOMMELIER_PROVIDER`   | `mock`                     | Provider selection |
| `LMSTUDIO_BASE_URL`    | `http://127.0.0.1:1234/v1` | LM Studio API base |
| `LMSTUDIO_MODEL`       | —                          | Model identifier   |
| `SOMMELIER_TIMEOUT_MS` | `30000`                    | Request timeout    |

## Validations

- `pnpm format` — ✅ all files pass
- `pnpm --filter web typecheck` — ✅ no errors (no code changed)
- `pnpm --filter web build` — ✅ 24 pages built
- `pnpm check` — ✅ lint + typecheck + build all pass

## Risks

| Risk                       | Mitigation                                                   |
| -------------------------- | ------------------------------------------------------------ |
| LM Studio exposed publicly | Architecture enforces local/LAN only                         |
| Provider lock-in           | `SommelierProvider` interface allows swapping                |
| Prompt injection           | Input sanitization, length limits, guardrails                |
| Model hallucination        | Catalog context restricts data; guardrails prevent inventing |
| Fallback not tested        | MockProvider always functional; health() check before use    |

## Next Steps

- STACK-2026-AILAB-PROVIDER-ARCHITECTURE-01
