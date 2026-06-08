# Audit: STACK-2026-FRONTEND-SOMMELIER-API-CLIENT-01

## Objetivo

Conectar el frontend Sommelier AI v2 al backend Fastify Sommelier API, manteniendo fallback local.

## Files Created

| File | Purpose |
|---|---|
| `apps/web/src/lib/sommelier/config.ts` | API mode config (env var, localStorage, label) |
| `apps/web/src/lib/sommelier/api-client.ts` | API client with chat/health/providers/guardrails/catalogContext |

## Files Modified

| File | Change |
|---|---|
| `apps/web/src/components/sommelier/SommelierChat.tsx` | Uses API client when `apiMode === "api"`, falls back to mock engine on failure or when `apiMode === "mock"` |

## Architecture

```
Frontend SommelierChat.tsx
        │
        ├── SOMMELIER_API_MODE === "api" ──► api-client.ts ──► Fastify API ──► MockProvider
        │                                                                         │
        │                                   ◄── traceId, recommendations, pairings
        │
        └── API fails or "mock" mode ──► processConversation() ──► mockResponses.ts
                                          (frontend mock engine, existing)
```

## API Client Methods

| Method | Endpoint | Request | Response |
|---|---|---|---|
| `chat()` | POST /api/v1/sommelier/chat | `{message, profile, conversationContext, locale}` | `ApiChatResponse` with traceId |
| `health()` | GET /api/v1/sommelier/health | — | provider health + available providers |
| `providers()` | GET /api/v1/sommelier/providers | — | active provider + capabilities |
| `guardrails()` | GET /api/v1/sommelier/guardrails | — | limits + disclaimers + rules |
| `catalogContext()` | POST /api/v1/sommelier/catalog-context | `{message, profile, maxProducts}` | intent + candidates + sources |

## Fallback Behavior

| Scenario | Behavior | Provider Label |
|---|---|---|
| API available (api mode) | Uses API response | "Mock API" |
| API unavailable (api mode) | Falls back to frontend mock engine | "Frontend Fallback" |
| Mock mode (apiMode=mock) | Uses frontend mock engine directly | "Simulador local" |

## Provider Label (UI)

A badge in the header shows the active data source: "Mock API", "Frontend Fallback", or "Simulador local" — visible only in lab mode.

## Smoke Test

- Both servers started (API on :8080, Web on :4321)
- `POST /api/v1/sommelier/chat` verified returning `traceId`, `intent: pairing`, 3 recommendations
- Web build successful (24 pages, 2.35s)

## Validaciones

- `pnpm --filter web typecheck` — PASS
- `pnpm --filter api typecheck` — PASS
- `pnpm --filter web build` — PASS
- `pnpm format` — PASS

## Limitaciones

- API calls are client-side only (static Astro output)
- No auth/rate limiting yet
- `PUBLIC_SOMMELIER_API_URL` env var needed for Vercel production
- Fallback uses setTimeout (1200ms delay) matching existing mock UX

## Próximos Pasos

- STACK-2026-LMSTUDIO-PROVIDER-IMPLEMENTATION-01 — Provider real
- Configurar `PUBLIC_SOMMELIER_API_URL` en Vercel para producción
