# Audit: STACK-2026-BACKEND-SOMMELIER-MOCK-PROVIDER-01

## Objetivo

Implementar el MockSommelierProvider backend para que `POST /api/v1/sommelier/chat` responda con datos reales del catálogo mock, equivalente al motor mock actual del frontend.

## Files Created

| File                                                  | Purpose                               |
| ----------------------------------------------------- | ------------------------------------- |
| `apps/api/src/modules/sommelier/data/catalog.mock.ts` | 10 products backend-only mock catalog |

## Files Modified

| File                                                            | Change                                                     |
| --------------------------------------------------------------- | ---------------------------------------------------------- |
| `apps/api/src/modules/sommelier/providers/mock.provider.ts`     | Full intent detection + catalog-aware responses            |
| `apps/api/src/modules/sommelier/services/sommelier.service.ts`  | Provider call with try/catch fallback                      |
| `apps/api/src/modules/sommelier/services/guardrails.service.ts` | Price/stock claims detection + lab distinction             |
| `apps/api/src/modules/sommelier/routes/sommelier.routes.ts`     | POST /chat functional with Zod validation + error handling |
| `apps/api/src/modules/sommelier/utils/response-normalizer.ts`   | Added `fallbackUsed` parameter                             |
| `apps/api/src/modules/sommelier/index.ts`                       | Added `mockCatalog` + `MockProduct` exports                |
| `docs/architecture/backend-sommelier-api.md`                    | Added MockProvider Status section                          |

## POST /chat Functional

| Test Case              | Intent         | Products                              | Status                    |
| ---------------------- | -------------- | ------------------------------------- | ------------------------- |
| vino para carnes rojas | pairing        | Reserva, Garnacha, Coupage            | PASS                      |
| aceite premium         | recommendation | AOVE Cosecha Temprana, AOVE Ecológico | PASS                      |
| miel para desayuno     | recommendation | Miel Romero Clara, Miel Milflores     | PASS                      |
| regalo gastronómico    | recommendation | Pack Mesa Premium, Pack Ibéricos      | PASS                      |
| qué tiempo hace hoy    | general        | none (fallback)                       | PASS                      |
| mensaje vacío          | —              | —                                     | 400 validation error PASS |

## Intents Soportados

- `pairing` — vinos para carnes, quesos (confidence 0.92)
- `recommendation` — aceites, mieles, packs, gourmet, vinos general (confidence 0.88)
- `general` — fallback para consultas no clasificables (confidence 0.55)

## Guardrails Implementados

- Mensaje vacío → 400 error controlado
- Mensaje > 2000 caracteres → warning
- Price claims en output → warning
- Stock claims en output → warning
- Lab/production distinction → warning "modo laboratorio"
- Sanitización básica

## Smoke API

```
GET  /healthz                 → {"status":"OK"}                          PASS
GET  /api/v1/status           → {"service":"stack-2026-api"}             PASS
GET  /api/v1/sommelier/health → {"status":"ok","provider":"mock"}        PASS
GET  /api/v1/sommelier/providers → {providers: [mock, lmstudio, ailab]} PASS
POST /api/v1/sommelier/chat   → respuesta con recommendations/pairings   PASS
POST /api/v1/sommelier/chat (empty) → 400 INVALID_REQUEST                PASS
```

## Validaciones

- `pnpm --filter api typecheck` — PASS
- `pnpm --filter api build` — (pending final run)
- `pnpm format` — (pending final run)

## Limitaciones

- Detección de intención por keywords simple (sin NLP)
- Catalog context service no implementado (candidate selection directo en mock provider)
- Sin soporte para profiles b2b/producer/admin (todos tratan como private)
- Sin conexión a LM Studio o AI-LAB
- Sin persistencia de conversaciones

## Próximos Pasos

- STACK-2026-BACKEND-SOMMELIER-ENDPOINTS-01 — Endpoints adicionales y refinamiento
- STACK-2026-CATALOG-CONTEXT-SERVICE-01 — CatalogContextService real
- STACK-2026-GUARDRAILS-SERVICE-01 — Guardrails completos
