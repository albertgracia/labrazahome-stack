# Audit: STACK-2026-SOMMELIER-API-MODE-VERCEL-SAFETY-01

## Objetivo

Validar y blindar el modo API del Sommelier para que en Vercel no intente llamar a Fastify local, localhost ni LM Studio LAN.

## Files Modified

| File | Cambio |
|---|---|
| `apps/web/src/lib/sommelier/config.ts` | Default `getApiMode()` cambiado de `"api"` a `"mock"` |
| `.env.example` | Añadidos `PUBLIC_SOMMELIER_API_MODE`, `PUBLIC_SOMMELIER_API_URL` con defaults seguros + comentarios LM Studio |
| `docs/architecture/backend-sommelier-api.md` | Añadida sección "Vercel Safety" |

## Files Reviewed (no changes needed)

| File | Veredicto |
|---|---|
| `apps/web/src/lib/sommelier/api-client.ts` | ✅ Safe — `request()` catcha errores de red, nunca expone URLs |
| `apps/web/src/components/sommelier/SommelierChat.tsx` | ✅ Safe — fallback silencioso, muestra "Frontend Fallback" sin error |
| `docs/architecture/lmstudio-provider.md` | ✅ Safe — documenta que frontend nunca llama LM Studio directo |

## Security Analysis

### Riesgo Detectado

`config.ts:13` — `return "api"` como default hacía que Vercel sin `PUBLIC_SOMMELIER_API_MODE` intentara llamar `http://localhost:8080`.

### Fix

Cambiado a `return "mock"`. Ahora:

```
Sin env vars ni localStorage  → mock (Vercel safe)
PUBLIC_SOMMELIER_API_MODE=api  → api (solo local/lab)
localStorage "api"             → api (override temporal)
```

### Comportamiento por Entorno

| Entorno | Mode | API Backend | Frontend Engine |
|---|---|---|---|
| Vercel producción | `mock` (default) | No intentado | Mock local |
| Local dev sin backend | `mock` (default) | No intentado | Mock local |
| Local dev con Fastify | `api` (env var) | `localhost:8080` | API backend |
| Lab (LM Studio futuro) | `api` (env var) | `192.168.1.x:8080` | API → LM Studio |

### Reglas de Seguridad

1. Frontend **nunca** llama a LM Studio (`192.168.1.250:1234`) directamente
2. LM Studio solo se accede vía Fastify backend (futuro `LMStudioSommelierProvider`)
3. `localhost:8080` solo se llama cuando `PUBLIC_SOMMELIER_API_MODE=api` está explícitamente seteado
4. Sin env var → modo mock seguro
5. Fallback silencioso → "Frontend Fallback" sin errores visibles

## Validaciones

- `pnpm --filter web typecheck` — PASS
- `pnpm --filter web build` — PASS (24 pages)
- `pnpm format` — PASS

## Próximos Pasos

- STACK-2026-LMSTUDIO-PROVIDER-IMPLEMENTATION-01 — Provider real LM Studio en backend
