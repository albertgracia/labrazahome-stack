# STACK-2026-LMSTUDIO-PROVIDER-IMPLEMENTATION-01

## Implementación Real de LMStudioSommelierProvider en Fastify

### Configuración

| Variable               | Valor                                  |
| ---------------------- | -------------------------------------- |
| `SOMMELIER_PROVIDER`   | `lmstudio` (activo) / `mock` (default) |
| `LMSTUDIO_BASE_URL`    | `http://192.168.1.250:1234/v1`         |
| `LMSTUDIO_MODEL`       | `llama-3.2-1b-instruct`                |
| `SOMMELIER_TIMEOUT_MS` | `30000`                                |

### Archivos Modificados

| Archivo                                                         | Cambio                                                                                                       |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `apps/api/src/modules/sommelier/providers/lmstudio.provider.ts` | Implementación completa: fetch nativo, OpenAI-compatible, prompt system, JSON parsing, health check, timeout |
| `apps/api/src/modules/sommelier/services/sommelier.service.ts`  | Añadido: fallback provider (primario → mock → emergencia), provider name dinámico                            |
| `apps/api/src/modules/sommelier/routes/sommelier.routes.ts`     | Añadido: provider selector (`createSommelierService()`), endpoints dinámicos según env var                   |
| `.env.example`                                                  | Actualizado: `LMSTUDIO_BASE_URL=http://192.168.1.250:1234/v1`, `LMSTUDIO_MODEL=llama-3.2-1b-instruct`        |
| `docs/architecture/lmstudio-provider.md`                        | Actualizado: no alcance, roadmap con estados ✅, env vars reales                                             |
| `docs/architecture/backend-sommelier-api.md`                    | Actualizado: no alcance, roadmap, scaffold status, LM Studio provider real                                   |

### Arquitectura del Provider

```
LMStudioSommelierProvider
├── constructor()
│   ├── baseUrl: env.LMSTUDIO_BASE_URL || "http://192.168.1.250:1234/v1"
│   ├── model: env.LMSTUDIO_MODEL || "llama-3.2-1b-instruct"
│   └── timeoutMs: env.SOMMELIER_TIMEOUT_MS || 30000
│
├── chat(input: ChatInput)
│   ├── buildSystemPrompt(catalogContext)
│   │   → Español, tono premium, solo catálogo proporcionado
│   │   → No precios/stock/disponibilidad/puntuaciones
│   │   → JSON structure instruction
│   ├── buildUserPrompt(input)
│   │   → Perfil + ConversationContext + Mensaje usuario
│   ├── POST {baseUrl}/chat/completions
│   │   → model, messages (system+user), temperature 0.7, max_tokens 1024
│   │   → AbortController timeout
│   ├── extractJSON(content)
│   │   → Regex find JSON block → JSON.parse
│   ├── mapToProviderResponse(parsed, modelName)
│   │   → Validación de intent, confidence clamp, arrays seguros
│   └── Fallback: si no hay JSON → raw content como answer
│
├── health()
│   ├── GET {baseUrl}/models
│   │   → 200 → "ok"
│   │   → !200 → "degraded" + error
│   │   → catch → "down" + error
│   └── Timeout 5s
│
└── metadata()
    → name: "lmstudio", available: true, model: {model}
```

### Provider Selector (routes)

```typescript
createSommelierService():
  mock → new SommelierService(MockProvider, "mock")
  lmstudio → new SommelierService(LMStudioProvider, "lmstudio", MockProvider, "mock")
```

### Cadena de Fallback

```
LMStudioProvider.chat()
  ├── Éxito → devuelve respuesta
  ├── Error → MockProvider.chat()
  │     ├── Éxito → fallbackUsed=true, provider="mock"
  │     └── Error → respuesta de emergencia hardcoded
  └── JSON inválido → raw content como answer, warning low_confidence
```

### Prompt System

**System prompt** (español, premium):

- Usa SOLO el catálogo proporcionado (máx 5 productos)
- No inventar precios, stock, disponibilidad, puntuaciones
- Si algo no está en catálogo, indicar y sugerir lo más cercano
- Modo laboratorio si falta contexto
- Slug exacto del catálogo en recomendaciones
- JSON structure exacta en la respuesta

**User prompt**:

```
Perfil: {profile}
Contexto de conversación: {conversationContext}
Mensaje del usuario: {message}
```

### Smoke Tests (ejecutados localmente)

Todos los tests realizados con `LMSTUDIO_BASE_URL=http://192.168.1.250:1234/v1`, `LMSTUDIO_MODEL=llama-3.2-1b-instruct`.

#### GET /api/v1/sommelier/health (LMStudioSommelierProvider.health())

```json
{
  "status": "ok",
  "provider": "lmstudio",
  "model": "llama-3.2-1b-instruct",
  "latencyMs": 22,
  "timestamp": "2026-06-08T23:31:43.268Z"
}
```

#### POST /api/v1/sommelier/chat — "Quiero un vino para carnes rojas" (LMStudioSommelierProvider.chat())

**Resultado real:**

```json
{
  "intent": "general",
  "confidence": 0.4,
  "answer": " El catálogo que proporcioné anteriormente no tiene vinos para carnes rojas.\n\n**Respuesta**\nQuerido usuario, te recomiendo el Reserva del Alto Ebro (vinos): Un reserva clásico de la Rioja Alta con 24...",
  "recommendations": [],
  "pairings": [],
  "warnings": [
    {
      "type": "low_confidence",
      "message": "No se pudo estructurar la respuesta del modelo. Se muestra en bruto."
    }
  ],
  "model": "llama-3.2-1b-instruct"
}
```

**Análisis de calidad:**

- El modelo `llama-3.2-1b-instruct` (1B parámetros) **no genera JSON válido** siguiendo el contrato
- Responde en texto plano con formato markdown (**Respuesta**)
- El parser `extractJSON()` falla y se activa el fallback a raw content
- Warning `low_confidence` correctamente emitido
- No hay recomendaciones estructuradas ni maridajes

#### Fallback Test — LM Studio URL inválida (`http://127.0.0.1:9999/v1`)

```text
Expected error: LMStudioProvider: fetch failed
```

El error se propaga correctamente. En `SommelierService.chat()` el catch lo captura y hace fallback a `MockSommelierProvider`, marcando `fallbackUsed: true`.

### Limitaciones

| Limitación          | Descripción                                                                        |
| ------------------- | ---------------------------------------------------------------------------------- |
| Modelo pequeño      | `llama-3.2-1b-instruct` puede generar respuestas imprecisas en consultas complejas |
| Sin streaming       | Respuesta completa, no streaming                                                   |
| Sin visión          | moondream2 no implementado aún                                                     |
| Sin rate limiting   | No hay control de peticiones por IP/sesión                                         |
| Sin auth            | No hay autenticación de usuarios                                                   |
| Sin persistencia    | Las conversaciones no se guardan                                                   |
| Dependencia de red  | Requiere acceso al host `192.168.1.250:1234` desde el servidor Fastify             |
| JSON parsing frágil | Modelos pequeños pueden no generar JSON válido siempre (fallback a raw content)    |

### Seguridad

| Riesgo             | Mitigación                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------- |
| LM Studio expuesto | Solo accesible vía Fastify como proxy. Frontend nunca llama directo.                        |
| Vercel → LM Studio | Imposible: Vercel no puede alcanzar `192.168.1.250`. `SOMMELIER_PROVIDER=mock` por defecto. |
| Prompt injection   | Sanitización Zod (máx 2000 chars). System prompt fijo.                                      |
| Timeouts           | AbortController con 30s timeout. Fallback automático a mock.                                |
| Datos sensibles    | No se loguean mensajes completos. Solo tipo de consulta y perfil.                           |
| JSON inválido      | Fallback a raw content + warning `low_confidence`.                                          |

### Clasificación Final

**RESULTADO: PARTIAL**

| Criterio              | Estado     | Detalle                                                          |
| --------------------- | ---------- | ---------------------------------------------------------------- |
| Compilación/Typecheck | ✅ PASS    | `pnpm --filter api typecheck` + `pnpm --filter api build`        |
| Lint/Format           | ✅ PASS    | `pnpm check`                                                     |
| Health endpoint       | ✅ PASS    | Status "ok", latency 22ms                                        |
| Chat endpoint         | ⚠️ PARTIAL | Modelo responde pero **no genera JSON válido** (1B params)       |
| Fallback chain        | ✅ PASS    | LM Studio down → MockProvider activado correctamente             |
| Calidad respuesta IA  | ❌ FAIL    | `llama-3.2-1b-instruct` demasiado pequeño para structured output |

### Decisión

- **MockProvider sigue siendo default** (`SOMMELIER_PROVIDER=mock` en `.env.example`)
- **LM Studio provider implementado y funcional** para health + chat (con limitación conocida)
- **No activar LM Studio en producción** hasta probar modelo instruct más capaz (≥7B params)
- Recomendado: probar `llama-3.1-8b-instruct`, `qwen2.5-7b-instruct`, o similar antes de `SOMMELIER_PROVIDER=lmstudio`

### Recomendaciones

1. Mantener `SOMMELIER_PROVIDER=mock` como default en `.env.example`
2. LM Studio solo para desarrollo local con modelo más capaz
3. Implementar validación de salida con retry o esquema más simple si se usa modelo pequeño
4. Documentar que `llama-3.2-1b-instruct` no cumple contrato de JSON estructurado

### Commits Relacionados

```
STACK-2026-LMSTUDIO-PROVIDER-IMPLEMENTATION-01
```
