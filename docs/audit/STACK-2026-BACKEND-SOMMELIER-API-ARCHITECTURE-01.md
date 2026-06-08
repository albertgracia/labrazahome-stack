# Audit: STACK-2026-BACKEND-SOMMELIER-API-ARCHITECTURE-01

## Summary

Diseñada la arquitectura completa del backend API (Fastify) para Sommelier AI v2. Documentación pura — sin implementación, sin endpoints reales, sin conexión a proveedores.

## Files Created

- `docs/architecture/backend-sommelier-api.md` — Documento principal de arquitectura

## Files Modified

- `docs/architecture/sommelier-ai-v2.md` — Añadida sección "Backend API Architecture" + referencias
- `docs/architecture/lmstudio-provider.md` — Añadida sección "Fastify API Integration"
- `docs/architecture/ailab-provider.md` — Añadida sección "Backend Fastify API Integration"

## Architecture Coverage

| Component                                 | Estado                     |
| ----------------------------------------- | -------------------------- |
| Endpoints (POST /chat, GET /health, etc.) | Definidos                  |
| Zod schemas (request, response, health)   | Definidos                  |
| Provider interface + selector             | Definido                   |
| Catalog context service                   | Definido (sin implementar) |
| Guardrails service (pre + post)           | Definido (sin implementar) |
| Error handling (códigos, fallback)        | Definido                   |
| Observabilidad (metadata, logging policy) | Definida                   |
| Seguridad (riesgos y mitigaciones)        | Definida                   |
| Migration path from frontend mock         | Definido                   |
| B2B/Admin integration notes               | Definido                   |
| Roadmap (14 fases)                        | Definido                   |

## Provider Trilogy Complete

Los 3 documentos de provider ahora forman una trilogía coherente:

| Document                   | Focus        | Provider                          |
| -------------------------- | ------------ | --------------------------------- |
| `lmstudio-provider.md`     | Local simple | LM Studio                         |
| `ailab-provider.md`        | Governed     | AI-LAB                            |
| `backend-sommelier-api.md` | API frontier | Todos (Mock → LM Studio → AI-LAB) |

## Key Design Decisions

1. **Fastify como frontera única** — El frontend nunca llama a proveedores directamente
2. **Fallback automático** — Cualquier fallo de provider → MockProvider con warning
3. **Contexto compacto** — Máximo 5 productos en contexto, no el catálogo completo
4. **Provider select por env var** — No aceptar proveedor del cliente por seguridad
5. **Misma estructura de respuesta** — Compatible con frontend mock actual para migración gradual
6. **Policy estricta de logging** — Solo metadatos, nunca mensajes completos

## No Cambios

- No se tocó `apps/api`
- No se tocó `apps/web`
- No se tocó catálogo Premium v2
- No se tocó LM Studio
- No se tocó AI-LAB
- No se crearon endpoints reales

## Dependencias para Fase Siguiente (STACK-2026-BACKEND-SOMMELIER-API-SCAFFOLD-01)

- Estructura `apps/api/src/modules/sommelier/` debe existir
- Rutas `sommelier.routes.ts`, schemas `sommelier.schemas.ts`, providers, services, utils
