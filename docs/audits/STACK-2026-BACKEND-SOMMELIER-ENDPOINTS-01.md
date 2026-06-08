# Audit: STACK-2026-BACKEND-SOMMELIER-ENDPOINTS-01

## Objetivo

Refinar y completar los endpoints auxiliares del módulo backend Sommelier para dejar el contrato API listo antes de conectar el frontend.

## Files Modified

| File                                                                 | Change                                                               |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `apps/api/src/modules/sommelier/routes/sommelier.routes.ts`          | Refined health, providers, guardrails; added POST /catalog-context   |
| `apps/api/src/modules/sommelier/services/catalog-context.service.ts` | Implemented buildContext() with intent detection + maxProducts limit |
| `apps/api/src/modules/sommelier/services/guardrails.service.ts`      | Added getInfo() with limits, forbidden claims, disclaimers           |
| `apps/api/src/modules/sommelier/services/sommelier.service.ts`       | Passes maxProducts=5 to buildContext                                 |
| `apps/api/src/modules/sommelier/schemas/sommelier.schemas.ts`        | Added CatalogContextRequestSchema + CatalogContextResponseSchema     |

## Endpoint Contracts

### GET /api/v1/sommelier/health

```json
{
  "status": "ok",
  "provider": "mock",
  "model": "mock-v1",
  "providersAvailable": [
    { "name": "mock", "available": true },
    { "name": "lmstudio", "available": false },
    { "name": "ailab", "available": false }
  ],
  "version": "1.0.0",
  "timestamp": "..."
}
```

### GET /api/v1/sommelier/providers

```json
{
  "activeProvider": "mock",
  "fallbackProvider": "mock",
  "availableProviders": [
    { "name": "mock", "capabilities": ["catalog-aware responses", "intent detection", ...] },
    { "name": "lmstudio", "capabilities": ["local LLM", "prompt-based", ...] },
    { "name": "ailab", "capabilities": ["model routing", "MCP tools", ...] }
  ],
  "config": { "provider": "mock", "timeoutMs": 30000, "retryCount": 1 }
}
```

### GET /api/v1/sommelier/guardrails

```json
{
  "active": true,
  "labMode": true,
  "noPersonalDataLogging": true,
  "limits": {
    "maxMessageLength": 2000,
    "maxCatalogProducts": 5,
    "allowedProfiles": ["private", "b2b", "producer", "admin"]
  },
  "forbiddenClaims": ["stock", "prices", "availability", "real commercial terms", "unverified ratings"],
  "disclaimers": ["Respuestas generadas en modo laboratorio...", ...],
  "rules": [...]
}
```

### POST /api/v1/sommelier/catalog-context

**Request:** `{ message, profile, maxProducts? }`
**Response:** `{ intent, candidates[], sources[], warnings[] }`

### POST /api/v1/sommelier/chat

- 400 con field errors para: mensaje vacío, mensaje > 2000 chars, profile inválido
- 200 con response completa y traceId siempre presente

## Smoke API Results

| Endpoint                                        | Test                         | Status |
| ----------------------------------------------- | ---------------------------- | ------ |
| GET /healthz                                    | existing endpoint            | PASS   |
| GET /api/v1/status                              | existing endpoint            | PASS   |
| GET /api/v1/sommelier/health                    | enhanced metadata            | PASS   |
| GET /api/v1/sommelier/providers                 | capabilities + config        | PASS   |
| GET /api/v1/sommelier/guardrails                | limits + disclaimers         | PASS   |
| POST /api/v1/sommelier/catalog-context (vino)   | pairing, 3 candidates        | PASS   |
| POST /api/v1/sommelier/catalog-context (aceite) | recommendation, 2 candidates | PASS   |
| POST /api/v1/sommelier/catalog-context (regalo) | recommendation, 2 candidates | PASS   |
| POST /api/v1/sommelier/chat (empty)             | 400                          | PASS   |
| POST /api/v1/sommelier/chat (too long)          | 400                          | PASS   |
| POST /api/v1/sommelier/chat (invalid profile)   | 400                          | PASS   |

## Validaciones

- `pnpm --filter api typecheck` — PASS
- `pnpm --filter api build` — PASS
- `pnpm format` — PASS

## Limitaciones

- Catalog-context usa el mismo catálogo mock que MockProvider (sin datos externos)
- Sin autenticación ni rate limiting
- Sin perfilado b2b/producer/admin real (solo estructura)
- Guardrails informativos, no bloqueantes (warnings, no rejections)

## Próximos Pasos

- STACK-2026-FRONTEND-SOMMELIER-API-CLIENT-01 — Conectar frontend a estos endpoints
