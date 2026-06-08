# AI-LAB Provider — Arquitectura de Conexión para Sommelier AI v2

## Visión

Conectar Sommelier AI v2 con AI-LAB como proveedor gobernado de inteligencia artificial, proporcionando enrutamiento inteligente, observabilidad, trazabilidad y potencialmente herramientas MCP. AI-LAB es el destino final de la progresión: Mock → LM Studio → AI-LAB.

## No Alcance (en esta fase)

- Conexión real a AI-LAB Gateway o Router
- Llamadas HTTP a AI-LAB
- Configuración de MCP tools
- Tokens o secretos reales
- Endpoints Fastify implementados
- Integración con LM Studio
- Integración con Rioja Marketplace
- Persistencia de conversaciones
- Rate limiting real
- Modificaciones en AI-LAB

## Arquitectura General

```
Frontend Sommelier (Vercel)
        │
        ▼
Fastify Sommelier API (apps/api)
        │
        ▼
SommelierProvider Interface
        │
        ├── MockProvider (siempre disponible)
        ├── LMStudioProvider (local/lab, simple)
        └── AILabProvider (local/lab, gobernado) ◄── ESTA FASE
                │
                ▼
        AI-LAB Gateway / Router
                │
        ┌───────┼───────┐
        ▼       ▼       ▼
    Modelos  Tools    Memoria
    locales  MCP     semántica
```

### Principio de Conexión

```
✅ Correcto:
Navegador → Fastify (Vercel/lab) → AILabProvider → AI-LAB Gateway → Router → Modelo

❌ Incorrecto:
Navegador (Vercel) → AI-LAB directo (sin frontera Fastify)
```

Fastify actúa como frontera de seguridad, validación y adaptación entre el frontend y AI-LAB.

## Diagrama de Flujo

```
Usuario escribe mensaje
        │
        ▼
┌──────────────────────────────────────┐
│ 1. Frontend envía POST               │
│    /api/v1/sommelier/chat            │
│    { message, profile, context }     │
└──────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────┐
│ 2. Fastify recibe y valida           │
│    - Sanitiza input                  │
│    - Limita longitud                 │
│    - Extrae perfil                   │
│    - Prepara contexto                │
└──────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────┐
│ 3. Provider Router                   │
│    SOMMELIER_PROVIDER=ailab          │
│    → AILabProvider.chat()            │
│    Si cae → MockProvider.chat()      │
└──────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────┐
│ 4. Catalog Context Builder           │
│    - Clasifica query                 │
│    - Selecciona candidates (3-5)     │
│    - Construye compact context       │
│    - Añade source references         │
└──────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────┐
│ 5. Prompt Builder                    │
│    - System prompt base              │
│    - Perfil prompt                   │
│    - Contexto catálogo compacto      │
│    - Historial conversación          │
│    - Guardrails                      │
└──────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────┐
│ 6. AILabProvider.chat()              │
│    POST {AILAB_BASE_URL}/chat        │
│    o llama a Router                  │
│    - Timeout: AILAB_TIMEOUT_MS       │
│    - Retry: 1 intento                │
│    - Tracing: traceId                │
└──────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────┐
│ 7. AI-LAB Gateway / Router           │
│    - Selecciona modelo               │
│    - Inyecta herramientas MCP        │
│    - Ejecuta grounding               │
│    - Devuelve respuesta estructurada │
└──────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────┐
│ 8. Response Parser                   │
│    - Extrae JSON                     │
│    - Valida con Zod                  │
│    - Aplica guardrails post-hoc      │
│    - Mide confianza                  │
└──────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────┐
│ 9. Observabilidad                    │
│    - traceId                         │
│    - provider, model                 │
│    - latencyMs                       │
│    - confidence                      │
│    - fallbackUsed                    │
│    - warnings                        │
└──────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────┐
│ 10. Response Builder                 │
│     - answer string                  │
│     - recommendations[]              │
│     - pairings[]                     │
│     - confidence                     │
│     - provider metadata              │
│     - routing info                   │
│     - traceId                        │
└──────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────┐
│ 11. Frontend renderiza               │
│     ChatMessage + RecommendationCard │
└──────────────────────────────────────┘
```

## Diferencia LM Studio vs AI-LAB

| Aspecto            | LM Studio                    | AI-LAB                                            |
| ------------------ | ---------------------------- | ------------------------------------------------- |
| **Perfil**         | Provider local simple        | Provider gobernado                                |
| **Routing**        | No — llama al modelo cargado | Sí — Router selecciona modelo según query         |
| **Modelos**        | 1 modelo a la vez            | Múltiples modelos, routing automático             |
| **Trazabilidad**   | No por defecto               | Trazabilidad completa (traceId, latencia, modelo) |
| **Observabilidad** | Mínima (logs locales)        | Dashboard, métricas, alertas                      |
| **Herramientas**   | No                           | MCP tools read-only (futuro)                      |
| **Memoria**        | No                           | Memoria semántica futura                          |
| **Grounding**      | No                           | Sí — fuentes verificables                         |
| **Gobierno**       | Ninguno                      | Guardrails centralizados, políticas               |
| **Velocidad**      | Rápida (local)               | Variable (depende del routing)                    |
| **Complejidad**    | Baja                         | Media-alta                                        |
| **Ideal para**     | Desarrollo rápido, testing   | Producción gobernada, equipo                      |

Ambos providers comparten la misma interfaz `SommelierProvider`. La diferencia está en las capacidades internas y la gobernanza.

## Provider Interface (compartida)

```typescript
interface SommelierProvider {
  chat(input: ChatInput): Promise<SommelierProviderResponse>;
  health(): Promise<ProviderHealth>;
  metadata(): ProviderMetadata;
}

interface ChatInput {
  message: string;
  profile: Profile;
  conversationContext: ConversationContext;
  catalogContext: ProductPremium[];
}

interface SommelierProviderResponse {
  answer: string;
  intent: IntentType;
  recommendations: Recommendation[];
  pairings: Pairing[];
  confidence: number;
  provider: ProviderType;
  model: string;
  routing?: RoutingMetadata;
  warnings: Warning[];
  sources: Source[];
  traceId?: string;
}

interface ProviderHealth {
  status: "ok" | "degraded" | "down";
  provider: ProviderType;
  model?: string;
  latencyMs?: number;
  error?: string;
  timestamp: string;
  ailab?: {
    gatewayStatus: string;
    routerStatus: string;
    modelsAvailable: string[];
  };
}

interface ProviderMetadata {
  name: string;
  version: string;
  models: string[];
  capabilities: string[];
  isLocal: boolean;
  hasMCP: boolean;
  hasTracing: boolean;
  hasSemanticMemory: boolean;
}

interface RoutingMetadata {
  route: string;
  modelSelected: string;
  toolsUsed: string[];
  groundingSources: string[];
  confidence: number;
}

type ProviderType = "mock" | "lmstudio" | "ailab";
type IntentType =
  | "pairing"
  | "recommendation"
  | "comparison"
  | "product_explanation"
  | "general";
```

## AILabSommelierProvider

### Responsabilidades

1. **Comunicación con AI-LAB** — Envía requests al Gateway/Router de AI-LAB siguiendo su formato
2. **Timeouts y retries** — Timeout configurable (`AILAB_TIMEOUT_MS`), 1 reintento automático
3. **Fallback** — Si AI-LAB no responde o responde inválido, usa MockProvider automáticamente
4. **Tracing** — Propaga `traceId` generado por Fastify a AI-LAB y lo devuelve en la respuesta
5. **Context injection** — Inyecta contexto de catálogo y perfil en el prompt
6. **Response validation** — Valida JSON de respuesta con Zod
7. **Guardrails post-hoc** — Verifica que la respuesta no infrinja reglas

### Estrategia de Llamada

```
AILabProvider.chat(input):
  1. Preparar contexto de catálogo (compacto, 3-5 productos)
  2. Construir prompt con system prompt + perfil + contexto + mensaje
  3. Generar traceId
  4. Llamar a AI-LAB: POST {baseURL}/chat/completions
     Headers: { Authorization, X-Trace-Id, Content-Type }
     Body: {
       model: config.model,
       messages: [...prompt],
       temperature: 0.7,
       max_tokens: 2048,
       response_format: { type: "json_object" }
     }
  5. Si timeout o error → log + fallback a MockProvider
  6. Si respuesta inválida (no JSON, no pasa Zod) → log + fallback
  7. Si respuesta válida → parsear, validar guardrails, devolver
```

## Endpoints Futuros

### POST /api/v1/sommelier/chat

**Request:**

```json
{
  "message": "Quiero un vino para una cena con carne roja",
  "profile": "private",
  "conversationContext": {
    "category": null,
    "step": 0,
    "collected": {},
    "completed": false
  },
  "catalogContext": [
    {
      "slug": "reserva-del-alto-ebro",
      "name": "Reserva del Alto Ebro",
      "category": "vinos",
      "selected": true
    }
  ]
}
```

**Response:**

```json
{
  "answer": "Te recomiendo el Reserva del Alto Ebro...",
  "intent": "pairing",
  "recommendations": [
    {
      "slug": "reserva-del-alto-ebro",
      "name": "Reserva del Alto Ebro",
      "category": "vinos",
      "reason": "Perfecto para carnes rojas y platos contundentes.",
      "confidence": 0.92
    }
  ],
  "pairings": [
    {
      "product": "Reserva del Alto Ebro",
      "pairing": "Carnes rojas a la parrilla",
      "reason": "La estructura y cuerpo armoniza perfectamente..."
    }
  ],
  "confidence": 0.92,
  "provider": "ailab",
  "model": "ailab-router/auto",
  "routing": {
    "route": "sommelier-pairing",
    "modelSelected": "mistral-local",
    "toolsUsed": ["sommelier_catalog_search"],
    "groundingSources": ["catalog:reserva-del-alto-ebro"],
    "confidence": 0.92
  },
  "sources": [
    {
      "type": "product",
      "id": "reserva-del-alto-ebro",
      "name": "Reserva del Alto Ebro"
    }
  ],
  "warnings": [
    {
      "type": "lab_mode",
      "message": "Respuesta generada por IA en modo laboratorio."
    }
  ],
  "traceId": "tr-abc123def456"
}
```

### GET /api/v1/sommelier/health

**Response:**

```json
{
  "status": "ok",
  "provider": "ailab",
  "model": "ailab-router/auto",
  "latencyMs": 3200,
  "timestamp": "2026-06-08T12:00:00Z",
  "ailab": {
    "gatewayStatus": "healthy",
    "routerStatus": "healthy",
    "modelsAvailable": ["mistral-local", "qwen-local", "llama-local"]
  }
}
```

## Variables Futuras

```
# Provider selection
SOMMELIER_PROVIDER=mock|lmstudio|ailab

# AI-LAB
AILAB_BASE_URL=http://127.0.0.1:8008/v1
AILAB_MODEL=ailab-router/auto
AILAB_TIMEOUT_MS=45000
AILAB_TRACE_ENABLED=true
AILAB_RETRY_COUNT=1
```

Documentar en `.env.example`. No usar valores secretos en esta fase.

## Catalog Context Strategy

AI-LAB recibirá contexto construido en el provider, no el catálogo completo.

**Proceso:**

1. **Query Classification** (local) — Determinar categoría (vinos, aceites, mieles, gourmet, packs, general)
2. **Candidate Selection** (local) — Máximo 5 productos candidatos según:
   - Coincidencia de categoría
   - Tags relevantes
   - Maridajes compatibles
   - Perfil del usuario
3. **Compact Context** — Para cada candidato:
   ```json
   {
     "slug": "reserva-del-alto-ebro",
     "name": "Reserva del Alto Ebro",
     "category": "vinos",
     "producer": "Bodegas Labraza Heritage",
     "shortDescription": "Un reserva clásico...",
     "specs": { "variety": "Tempranillo 90%", "vintage": "2020" },
     "pairings": ["Carnes rojas", "Quesos curados"],
     "ratings": [
       { "source": "Parker", "score": 92, "maxScore": 100, "isMock": true }
     ],
     "status": "prototype"
   }
   ```
4. **Source References** — Cada producto incluye su slug como referencia trazable
5. **Prompt Assembly** — System prompt + perfil + contexto compacto + mensaje

## MCP Futuro (Read-Only)

Posibles herramientas MCP para integrar en el futuro, sin implementar:

| Tool                       | Descripción                                    | Read-Only |
| -------------------------- | ---------------------------------------------- | --------- |
| `sommelier_catalog_search` | Buscar productos por texto, categoría o tags   | ✅        |
| `sommelier_product_detail` | Obtener ficha completa de un producto por slug | ✅        |
| `sommelier_pairing_rules`  | Consultar reglas de maridaje del catálogo      | ✅        |
| `sommelier_b2b_rules`      | Consultar reglas de negocio B2B                | ✅        |
| `sommelier_audit_trace`    | Consultar trazabilidad de una recomendación    | ✅        |

**Regla:** MCP siempre read-only en esta fase. No acciones mutables (crear, editar, borrar).

### Integración MCP con Sommelier

```
AI-LAB Router recibe consulta
        │
        ▼
¿Necesita datos del catálogo?
   ├── No → Responde directamente
   │
   └── Sí → Llama a MCP tool (read-only)
             │
             ├── sommelier_catalog_search(query)
             ├── sommelier_product_detail(slug)
             └── sommelier_pairing_rules(category)
             │
             ▼
        Resultado se inyecta en contexto
             │
             ▼
        Modelo genera respuesta con datos reales del catálogo
```

## Guardrails

| Regla                                | Aplicación                   | Consecuencia          |
| ------------------------------------ | ---------------------------- | --------------------- |
| No inventar stock                    | Validación post-hoc          | Warning en respuesta  |
| No inventar precios                  | Validación post-hoc          | Warning en respuesta  |
| No inventar disponibilidad           | Validación post-hoc          | Warning en respuesta  |
| No inventar puntuaciones             | Validación post-hoc + prompt | Warning + corrección  |
| No afirmar integración Rioja         | Prompt + guardrail post-hoc  | Warning en respuesta  |
| Distinguir laboratorio vs producción | Prompt + metadata            | Badge en UI           |
| Responder en español                 | Prompt + validación          | —                     |
| Tono premium                         | Prompt por perfil            | —                     |
| Mostrar warnings si falta contexto   | Validación post-hoc          | Warnings en respuesta |
| No exponer prompts internos          | Server-side only             | —                     |
| No exponer datos sensibles           | Server-side only, no log     | —                     |
| No registrar datos personales        | Política de logging          | —                     |

### Implementación de Guardrails

```
1. Prompt guardrails → System prompt con reglas explícitas
2. Pre-guardrails → Antes de enviar a AI-LAB (sanitización)
3. Post-guardrails → Después de recibir respuesta (validación Zod + reglas)
4. UI guardrails → Badges y warnings visibles al usuario
```

## Observabilidad

### Metadatos por Request

```typescript
interface ObservabilityMetadata {
  traceId: string;
  provider: ProviderType;
  model: string;
  latencyMs: number;
  confidence: number;
  sourcesUsed: string[];
  fallbackUsed: boolean;
  warnings: Warning[];
  profile: Profile;
  intent: IntentType;
  tokensIn?: number;
  tokensOut?: number;
  timestamp: string;
}
```

### Logging

```
✅ Loggear:
- traceId, provider, model
- latencyMs, confidence
- profile, intent
- fallbackUsed, warnings count
- tokensIn, tokensOut (agregado)

❌ NO loggear:
- Mensajes completos del usuario
- Respuestas completas
- Datos personales
- Tokens de autenticación
- Configuración interna
```

### Dashboard Futuro

```
Sommelier AI — Observabilidad
┌─────────────────────────────────────────────────────┐
│  Requests totales    │  Fallos       │  Latencia p95 │
│  1,234               │  12 (0.97%)   │  4.2s         │
├─────────────────────────────────────────────────────┤
│  Provider: AI-LAB    │  Modelo: router/auto         │
│  Fallbacks: 3        │  Trace: tr-abc123            │
└─────────────────────────────────────────────────────┘
```

## Fallback

Si AI-LAB falla (timeout, error de red, respuesta inválida, health check fallido):

```
┌──────────────────────────────────┐
│ AILabProvider.chat()             │
│   ├── ¿AI-LAB disponible?        │
│   │   ├── Sí → Enviar request    │
│   │   │        ├── Éxito → OK    │
│   │   │        └── Falla → ↓     │
│   │   └── No  → ↓                │
│   ▼                              │
│ Usar MockProvider                │
│   ├── Respuesta simulada         │
│   ├── Warning: modo simulado     │
│   └── No romper UI               │
└──────────────────────────────────┘
```

### UI Fallback

1. Mostrar respuesta de MockProvider sin interrupción visual
2. Añadir warning: "Usando respuestas simuladas. AI-LAB no está disponible."
3. No mostrar errores técnicos (stack traces, códigos HTTP)
4. Mantener el chat completamente funcional
5. Opcional: botón "Reintentar con AI-LAB"

## Backend Fastify API Integration

El AI-LAB Provider será consumido exclusivamente a través de la Backend Sommelier API (Fastify). El frontend nunca llama a AI-LAB directamente.

**Flujo:**
```
Frontend → POST /api/v1/sommelier/chat → Fastify → AILabProvider → AI-LAB Gateway
```

Fastify es responsable de: validación Zod, construcción de contexto de catálogo, guardrails pre/post, routing de proveedor, timeouts, fallback automático a MockProvider y trazabilidad completa.

Arquitectura completa del backend en [`docs/architecture/backend-sommelier-api.md`](./backend-sommelier-api.md).

## Seguridad

| Riesgo                       | Mitigación                                                           |
| ---------------------------- | -------------------------------------------------------------------- |
| AI-LAB expuesto públicamente | Fastify como frontera única. AI-LAB solo en LAN/lab.                 |
| Token泄露                    | Tokens solo server-side. No en frontend ni logs.                     |
| Prompt injection             | Sanitización de input. Límite 2000 chars. Output validation con Zod. |
| MCP mutable                  | MCP solo read-only en esta fase.                                     |
| Datos sensibles en logs      | Política de logging: no mensajes completos.                          |
| Rate limiting                | Futuro: middleware Fastify.                                          |
| Respuesta inválida           | Zod validation + fallback a MockProvider.                            |
| Model drift                  | Prompts versionados. System prompt fijo por release.                 |

## Roadmap

| Fase | Descripción                              | Dependencias                     |
| ---- | ---------------------------------------- | -------------------------------- |
| 1    | Arquitectura AI-LAB Provider (esta fase) | —                                |
| 2    | Provider interface consolidada           | SommelierProvider definido       |
| 3    | AILabProvider implementación             | AI-LAB Gateway/Router disponible |
| 4    | Prompt system + catalog context builder  | Fase 2 + Fase 3                  |
| 5    | Guardrails post-hoc + Zod validation     | Fase 3                           |
| 6    | Observabilidad + tracing                 | Fase 3 + AI-LAB tracing          |
| 7    | MCP tools read-only                      | AI-LAB MCP disponible            |
| 8    | Health check + dashboard                 | Fase 3 + AI-LAB metrics          |
| 9    | Fallback integrado + UI warnings         | Fase 3                           |
| 10   | Producción controlada                    | Runbook + validación             |
