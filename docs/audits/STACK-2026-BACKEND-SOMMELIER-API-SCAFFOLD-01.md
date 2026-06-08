# Audit: STACK-2026-BACKEND-SOMMELIER-API-SCAFFOLD-01

## Objetivo

Crear el scaffold inicial del módulo backend Sommelier dentro de `apps/api`, siguiendo la arquitectura documentada en `docs/architecture/backend-sommelier-api.md`.

## Files Created

| File                                                                 | Purpose                     |
| -------------------------------------------------------------------- | --------------------------- |
| `apps/api/src/modules/sommelier/index.ts`                            | Barrel exports              |
| `apps/api/src/modules/sommelier/routes/sommelier.routes.ts`          | 4 endpoints stub            |
| `apps/api/src/modules/sommelier/schemas/sommelier.schemas.ts`        | Zod schemas + types         |
| `apps/api/src/modules/sommelier/services/sommelier.service.ts`       | Orchestration stub          |
| `apps/api/src/modules/sommelier/services/catalog-context.service.ts` | Context builder (TODOs)     |
| `apps/api/src/modules/sommelier/services/guardrails.service.ts`      | Pre/post validation (TODOs) |
| `apps/api/src/modules/sommelier/providers/sommelier-provider.ts`     | Provider interface          |
| `apps/api/src/modules/sommelier/providers/mock.provider.ts`          | MockProvider (placeholder)  |
| `apps/api/src/modules/sommelier/providers/lmstudio.provider.ts`      | LMStudioProvider (stub)     |
| `apps/api/src/modules/sommelier/providers/ailab.provider.ts`         | AILabProvider (stub)        |
| `apps/api/src/modules/sommelier/utils/trace.ts`                      | createTraceId()             |
| `apps/api/src/modules/sommelier/utils/errors.ts`                     | SommelierError + codes      |
| `apps/api/src/modules/sommelier/utils/response-normalizer.ts`        | normalizeProviderResponse() |

## Files Modified

| File                                         | Change                                   |
| -------------------------------------------- | ---------------------------------------- |
| `apps/api/src/server.ts`                     | Added import + registerSommelierRoutes() |
| `apps/api/package.json`                      | Added zod dependency                     |
| `docs/architecture/backend-sommelier-api.md` | Added Scaffold Status section            |

## Routes Stub Created

| Method | Path                         | Status                                  |
| ------ | ---------------------------- | --------------------------------------- |
| GET    | /api/v1/sommelier/health     | Implemented — returns provider health   |
| GET    | /api/v1/sommelier/providers  | Implemented — lists available providers |
| GET    | /api/v1/sommelier/guardrails | Implemented — lists active guardrails   |
| GET    | /api/v1/sommelier            | Implemented — service discovery         |
| POST   | /api/v1/sommelier/chat       | Stub — returns 501 NOT_IMPLEMENTED      |

## Providers Stub Created

| Provider                  | Status     | Behavior                      |
| ------------------------- | ---------- | ----------------------------- |
| MockSommelierProvider     | Functional | Returns placeholder responses |
| LMStudioSommelierProvider | Stub       | Throws "not implemented"      |
| AILabSommelierProvider    | Stub       | Throws "not implemented"      |

## Schemas Created

All Zod schemas from the architecture doc: SommelierProfileEnum, SommelierProviderEnum, SommelierIntentEnum, SommelierWarningTypeEnum, SommelierSourceTypeEnum, ConversationContextSchema, ClientContextSchema, SommelierChatRequestSchema, SommelierRecommendationSchema, SommelierPairingSchema, SommelierWarningSchema, SommelierSourceSchema, SommelierMetadataSchema, SommelierChatResponseSchema, ProviderHealthSchema, ProviderMetadataSchema, CatalogContextItemSchema.

## Integration

- server.ts: ✅ Routes registered after `/api/v1/status`
- No global side effects
- Existing endpoints (`/healthz`, `/api/v1/status`) untouched

## Validaciones

- `pnpm --filter api typecheck` — pendiente
- `pnpm --filter api build` — pendiente
- `pnpm format` — pendiente

## Riesgos

- Bajo: MockProvider devuelve respuestas placeholder que pueden confundir en desarrollo
- Bajo: Guardrails service tiene TODOs — no hay validación real todavía
- Bajo: SommelierService normaliza provider como "mock" siempre (falta lógica de detección)

## Próximas Fases

- STACK-2026-BACKEND-SOMMELIER-MOCK-PROVIDER-01 — MockProvider con respuestas reales del mock engine frontend
- STACK-2026-CATALOG-CONTEXT-SERVICE-01 — CatalogContextService con candidate selection real
- STACK-2026-GUARDRAILS-SERVICE-01 — GuardrailsService completo
