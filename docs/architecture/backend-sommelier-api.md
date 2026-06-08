# Backend Sommelier API — Arquitectura de API Fastify para Sommelier AI v2

## Visión

La Backend Sommelier API será la frontera segura entre el frontend de Sommelier AI v2 y los proveedores de IA (Mock → LM Studio → AI-LAB). Proporcionará validación, contexto de catálogo, guardrails, fallback y trazabilidad sin exponer los proveedores directamente al frontend.

```
Frontend Sommelier (Vercel)
        │
        ▼
  ┌────────────────────┐
  │  Fastify Sommelier │  ← Esta arquitectura
  │  API               │
  └────────────────────┘
        │
        ▼
  ┌────────────────────┐
  │  Provider Layer    │
  │  Mock / LM Studio  │
  │  / AI-LAB          │
  └────────────────────┘
```

## No Alcance (en esta fase)

- Conexión a AI-LAB
- Migraciones Prisma
- Tokens o secretos reales
- Autenticación de usuarios
- Persistencia de conversaciones
- Rate limiting real
- Logging real
- moondream2 (visión) en LM Studio

## Arquitectura General

```
apps/api/src/modules/sommelier/
│
├── routes/
│   └── sommelier.routes.ts        ← Definición de rutas Fastify
│
├── schemas/
│   └── sommelier.schemas.ts       ← Zod schemas de request/response
│
├── services/
│   ├── sommelier.service.ts       ← Orquestación principal
│   ├── catalog-context.service.ts ← Construcción de contexto de catálogo
│   └── guardrails.service.ts      ← Validación de reglas
│
├── providers/
│   ├── sommelier-provider.ts      ← Provider interface
│   ├── mock.provider.ts           ← MockProvider
│   ├── lmstudio.provider.ts       ← LMStudioProvider
│   └── ailab.provider.ts          ← AILabProvider
│
└── utils/
    ├── trace.ts                   ← traceId generation
    ├── errors.ts                  ← Error types
    └── response-normalizer.ts     ← Response formatter
```

### Flujo de Petición

```
POST /api/v1/sommelier/chat
        │
        ▼
┌────────────────────────────────────┐
│ 1. Route handler                   │
│    Extrae body, headers            │
│    Genera traceId                  │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 2. Zod validation                  │
│    SommelierChatRequestSchema      │
│    → Si inválido: 400 error        │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 3. Guardrails pre-check            │
│    - Longitud mensaje ≤ 2000       │
│    - Sanitización básica           │
│    → Si viola: warning + fallback  │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 4. Catalog Context Service         │
│    - Clasifica intención           │
│    - Selecciona candidatos (≤5)    │
│    - Construye contexto compacto   │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 5. Provider Selection              │
│    SOMMELIER_PROVIDER env          │
│    → mock | lmstudio | ailab       │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 6. Provider.chat(input)            │
│    - Timeout configurable          │
│    - 1 retry automático            │
│    → Si falla: MockProvider        │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 7. Response validation             │
│    Zod parse + guardrails post-hoc │
│    → Si inválido: fallback + warn  │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 8. Response normalizer             │
│    Añade traceId, metadata         │
│    Construye respuesta final       │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 9. Devolver respuesta JSON         │
│    200 OK                          │
│    SommelierChatResponse           │
└────────────────────────────────────┘
```

## Endpoints Futuros

### POST /api/v1/sommelier/chat

Endpoint principal del Sommelier AI. Recibe un mensaje del usuario y devuelve una respuesta estructurada con recomendaciones y maridajes.

### GET /api/v1/sommelier/health

Health check del módulo Sommelier y sus proveedores.

### GET /api/v1/sommelier/providers

Lista los proveedores disponibles y su estado actual.

### POST /api/v1/sommelier/catalog-context

Endpoint auxiliar para previsualizar el contexto de catálogo que se enviaría al provider. útil para depuración y auditoría.

### GET /api/v1/sommelier/guardrails

Lista las reglas de guardrails activas y su estado.

## Request / Response

### SommelierChatRequest

```typescript
interface SommelierChatRequest {
  /** Mensaje del usuario */
  message: string;
  /** Perfil activo del usuario */
  profile: "private" | "b2b" | "producer" | "admin";
  /** Contexto de la conversación actual */
  conversationContext: {
    category: string | null;
    step: number;
    totalSteps: number;
    collected: Record<string, string>;
    completed: boolean;
  };
  /** Contexto del cliente (opcional) */
  clientContext?: {
    selectedProductSlug?: string;
    referrer?: string;
    userAgent?: string;
  };
  /** Slug de producto seleccionado (opcional) */
  selectedProductSlug?: string;
  /** Provider override (opcional, para testing) */
  provider?: "mock" | "lmstudio" | "ailab";
  /** Locale (por defecto es-ES) */
  locale: string;
}
```

### SommelierChatResponse

```typescript
interface SommelierChatResponse {
  /** Respuesta en lenguaje natural */
  answer: string;
  /** Intención detectada */
  intent:
    | "pairing"
    | "recommendation"
    | "comparison"
    | "product_explanation"
    | "general";
  /** Productos recomendados */
  recommendations: Array<{
    slug: string;
    name: string;
    category: string;
    reason: string;
    confidence: number;
  }>;
  /** Maridajes sugeridos */
  pairings: Array<{
    product: string;
    pairing: string;
    reason: string;
  }>;
  /** Confianza general */
  confidence: number;
  /** Proveedor usado */
  provider: "mock" | "lmstudio" | "ailab";
  /** Modelo usado (cuando aplica) */
  model?: string;
  /** ID de trazabilidad */
  traceId: string;
  /** Advertencias */
  warnings: Array<{
    type:
      | "mock_data"
      | "no_data"
      | "low_confidence"
      | "lab_mode"
      | "fallback"
      | "guardrail";
    message: string;
  }>;
  /** Fuentes usadas */
  sources: Array<{
    type: "product" | "category" | "general_knowledge";
    id?: string;
    name: string;
  }>;
  /** Indica si se usó fallback */
  fallbackUsed: boolean;
  /** Metadatos adicionales */
  metadata: {
    traceId: string;
    provider: string;
    model?: string;
    latencyMs: number;
    fallbackUsed: boolean;
    sourcesUsed: number;
    warningsCount: number;
    intent: string;
    profile: string;
    timestamp: string;
  };
}
```

### ProviderHealth

```typescript
interface ProviderHealth {
  status: "ok" | "degraded" | "down";
  provider: string;
  model?: string;
  latencyMs?: number;
  error?: string;
  timestamp: string;
}
```

## Zod Schemas

```typescript
import { z } from "zod";

const ProfileEnum = z.enum(["private", "b2b", "producer", "admin"]);
const ProviderEnum = z.enum(["mock", "lmstudio", "ailab"]);
const IntentEnum = z.enum([
  "pairing",
  "recommendation",
  "comparison",
  "product_explanation",
  "general",
]);
const WarningTypeEnum = z.enum([
  "mock_data",
  "no_data",
  "low_confidence",
  "lab_mode",
  "fallback",
  "guardrail",
]);
const SourceTypeEnum = z.enum(["product", "category", "general_knowledge"]);

export const ConversationContextSchema = z.object({
  category: z.string().nullable(),
  step: z.number().int().min(0),
  totalSteps: z.number().int().min(0),
  collected: z.record(z.string()),
  completed: z.boolean(),
});

export const ClientContextSchema = z.object({
  selectedProductSlug: z.string().optional(),
  referrer: z.string().optional(),
  userAgent: z.string().optional(),
});

export const SommelierChatRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  profile: ProfileEnum,
  conversationContext: ConversationContextSchema,
  clientContext: ClientContextSchema.optional(),
  selectedProductSlug: z.string().optional(),
  provider: ProviderEnum.optional(),
  locale: z.string().default("es-ES"),
});

export const RecommendationSchema = z.object({
  slug: z.string(),
  name: z.string(),
  category: z.string(),
  reason: z.string(),
  confidence: z.number().min(0).max(1),
});

export const PairingSchema = z.object({
  product: z.string(),
  pairing: z.string(),
  reason: z.string(),
});

export const WarningSchema = z.object({
  type: WarningTypeEnum,
  message: z.string(),
});

export const SourceSchema = z.object({
  type: SourceTypeEnum,
  id: z.string().optional(),
  name: z.string(),
});

export const MetadataSchema = z.object({
  traceId: z.string(),
  provider: z.string(),
  model: z.string().optional(),
  latencyMs: z.number().min(0),
  fallbackUsed: z.boolean(),
  sourcesUsed: z.number().int().min(0),
  warningsCount: z.number().int().min(0),
  intent: z.string(),
  profile: z.string(),
  timestamp: z.string(),
});

export const SommelierChatResponseSchema = z.object({
  answer: z.string(),
  intent: IntentEnum,
  recommendations: z.array(RecommendationSchema),
  pairings: z.array(PairingSchema),
  confidence: z.number().min(0).max(1),
  provider: ProviderEnum,
  model: z.string().optional(),
  traceId: z.string(),
  warnings: z.array(WarningSchema),
  sources: z.array(SourceSchema),
  fallbackUsed: z.boolean(),
  metadata: MetadataSchema,
});

export const ProviderHealthSchema = z.object({
  status: z.enum(["ok", "degraded", "down"]),
  provider: z.string(),
  model: z.string().optional(),
  latencyMs: z.number().min(0).optional(),
  error: z.string().optional(),
  timestamp: z.string(),
});
```

## Provider Layer

### Provider Interface

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
  catalogContext: CatalogContextItem[];
  traceId: string;
}

interface SommelierProviderResponse {
  answer: string;
  intent: IntentType;
  recommendations: Recommendation[];
  pairings: Pairing[];
  confidence: number;
  model?: string;
  warnings: Warning[];
  sources: Source[];
}
```

### Provider Selector

```typescript
function getProvider(): SommelierProvider {
  const provider = process.env.SOMMELIER_PROVIDER || "mock";
  switch (provider) {
    case "lmstudio":
      return new LMStudioSommelierProvider(config);
    case "ailab":
      return new AILabSommelierProvider(config);
    case "mock":
    default:
      return new MockSommelierProvider();
  }
}
```

### Provider Fallback

```typescript
async function chatWithFallback(input: ChatInput): Promise<{
  response: SommelierProviderResponse;
  fallbackUsed: boolean;
}> {
  const provider = getProvider();
  if (provider instanceof MockSommelierProvider) {
    const response = await provider.chat(input);
    return { response, fallbackUsed: false };
  }

  try {
    const response = await withTimeout(provider.chat(input), getTimeoutMs());
    return { response, fallbackUsed: false };
  } catch (error) {
    console.warn(`Provider ${provider.constructor.name} failed:`, error);
    const mockProvider = new MockSommelierProvider();
    const response = await mockProvider.chat(input);
    response.warnings.push({
      type: "fallback",
      message: `El proveedor ${provider.constructor.name} no está disponible. Usando respuestas simuladas.`,
    });
    return { response, fallbackUsed: true };
  }
}
```

## Catalog Context Service

```typescript
interface CatalogContextItem {
  slug: string;
  name: string;
  category: string;
  producer: string;
  shortDescription: string;
  specs: Record<string, string>;
  pairings: string[];
  ratings: Array<{
    source: string;
    score: number;
    maxScore: number;
    isMock: boolean;
  }>;
  status: string;
  tags: string[];
}

class CatalogContextService {
  buildContext(
    message: string,
    profile: Profile,
    selectedSlug?: string,
  ): CatalogContextItem[] {
    // 1. Classify intent from message
    const intent = this.classifyIntent(message);

    // 2. Find candidate products based on intent
    let candidates = this.findCandidates(intent, message);

    // 3. Filter by selected slug if provided
    if (selectedSlug) {
      candidates = candidates.filter((c) => c.slug === selectedSlug);
      if (candidates.length === 0) {
        const product = getProductBySlug(selectedSlug);
        if (product) candidates = [product];
      }
    }

    // 4. Limit to 5 products
    candidates = candidates.slice(0, 5);

    // 5. Build compact context
    return candidates.map(this.toCompactItem);
  }

  private classifyIntent(message: string): string {
    // Classify based on keywords and patterns
    // Returns: "vinos" | "aceites" | "mieles" | "gourmet" | "packs" | "general"
  }

  private findCandidates(intent: string, message: string): ProductPremium[] {
    // Select from catalog based on intent + message keywords
  }

  private toCompactItem(product: ProductPremium): CatalogContextItem {
    // Transform full product to compact context item
  }
}
```

## Guardrails Service

### Pre-Guardrails (antes de enviar al provider)

```typescript
class GuardrailsService {
  preCheck(request: SommelierChatRequest): Warning[] {
    const warnings: Warning[] = [];

    // Longitud máxima
    if (request.message.length > 2000) {
      warnings.push({
        type: "guardrail",
        message: "El mensaje excede la longitud máxima permitida.",
      });
    }

    // Sanitización básica (eliminar HTML, scripts)
    request.message = this.sanitize(request.message);

    return warnings;
  }

  postCheck(response: SommelierProviderResponse): Warning[] {
    const warnings: Warning[] = [];

    // Verificar que no inventa stock/precios/disponibilidad
    if (this.containsPriceClaim(response.answer)) {
      warnings.push({
        type: "guardrail",
        message:
          "La respuesta fue corregida para eliminar referencias a precios no verificados.",
      });
    }

    // Verificar que diferencia lab/producción
    if (
      !response.answer.includes("laboratorio") &&
      !response.answer.includes("mock")
    ) {
      warnings.push({
        type: "lab_mode",
        message: "Respuesta generada en modo laboratorio.",
      });
    }

    return warnings;
  }

  private sanitize(input: string): string {
    return input.replace(/<[^>]*>/g, "").trim();
  }

  private containsPriceClaim(text: string): boolean {
    return /\d+[.,]?\d*\s*(€|EUR|euros)/i.test(text);
  }
}
```

## Error Handling

### Tipos de Error

```typescript
enum SommelierErrorCode {
  INVALID_REQUEST = "INVALID_REQUEST",
  PROVIDER_TIMEOUT = "PROVIDER_TIMEOUT",
  PROVIDER_UNAVAILABLE = "PROVIDER_UNAVAILABLE",
  INVALID_PROVIDER_RESPONSE = "INVALID_PROVIDER_RESPONSE",
  CATALOG_CONTEXT_EMPTY = "CATALOG_CONTEXT_EMPTY",
  GUARDRAIL_VIOLATION = "GUARDRAIL_VIOLATION",
  RATE_LIMITED = "RATE_LIMITED",
}

class SommelierError extends Error {
  constructor(
    public code: SommelierErrorCode,
    message: string,
    public statusCode: number = 500,
    public traceId?: string,
    public provider?: string,
  ) {
    super(message);
  }
}
```

### Comportamiento por Error

| Error                       | HTTP Status        | Comportamiento                                  |
| --------------------------- | ------------------ | ----------------------------------------------- |
| `INVALID_REQUEST`           | 400                | Devolver errores de validación Zod              |
| `PROVIDER_TIMEOUT`          | 200 (con fallback) | Usar MockProvider, añadir warning               |
| `PROVIDER_UNAVAILABLE`      | 200 (con fallback) | Usar MockProvider, añadir warning               |
| `INVALID_PROVIDER_RESPONSE` | 200 (con fallback) | Usar MockProvider, añadir warning               |
| `CATALOG_CONTEXT_EMPTY`     | 200                | Devolver respuesta genérica sin recomendaciones |
| `GUARDRAIL_VIOLATION`       | 200                | Incluir warning de corrección                   |
| `RATE_LIMITED`              | 429                | Devolver error con retry-after                  |

## Observabilidad

### Metadatos por Request

```typescript
interface SommelierMetadata {
  traceId: string;
  provider: string;
  model?: string;
  latencyMs: number;
  fallbackUsed: boolean;
  sourcesUsed: number;
  warningsCount: number;
  intent: string;
  profile: string;
  timestamp: string;
}
```

### Logging (Futuro)

```
✅ Loggear:
- traceId, provider, model
- latencyMs, confidence
- intent, profile
- fallbackUsed, warnings count
- HTTP status code

❌ NO loggear:
- Mensajes completos del usuario
- Respuestas completas
- Datos personales
- Tokens de autenticación
```

## Seguridad

| Riesgo                               | Mitigación                                                     |
| ------------------------------------ | -------------------------------------------------------------- |
| Frontend llama a proveedores directo | Fastify como única frontera. CORS restrictivo.                 |
| Token泄露                            | Tokens solo server-side. Nunca en frontend.                    |
| Prompt injection                     | Sanitización de input. Límite 2000 caracteres.                 |
| Proveedor no autorizado              | Provider select por env var. No aceptar proveedor del cliente. |
| Datos sensibles en logs              | Política estricta de logging. Solo metadatos.                  |
| Rate limiting                        | Futuro: middleware Fastify.                                    |
| CORS abusivo                         | CORS configurado solo para orígenes conocidos.                 |

## Relación con Frontend

### Migración desde Mock Engine Actual

```
Fase actual (frontend mock):
  SommelierChat.tsx
    → processConversation() ← frontend mock engine
    → generateMockResponse()
    → render

Fase futura (API backend):
  SommelierChat.tsx
    → POST /api/v1/sommelier/chat
    → recibe SommelierChatResponse
    → render (mismo formato)
    → si API falla → usar mock engine local como fallback visual
```

### Principios de Migración

1. **Mismo formato de datos** — La respuesta de la API usa la misma estructura que el mock actual
2. **Fallback visual** — Si la API no está disponible, el frontend debe seguir funcionando con el mock engine local
3. **Provider transparente** — El frontend no sabe qué provider se usó, solo recibe la respuesta
4. **Migración gradual** — El provider se cambia vía env var sin cambios en frontend

## Relación con B2B y Admin

### Portal B2B

- Usa `profile: "b2b"` para obtener respuestas comerciales
- El catalog context incluye datos ampliados (condiciones, MOQ)
- Las recomendaciones se orientan a necesidades profesionales

### Backoffice Admin

- Panel de supervisión del Sommelier:
  - Ver logs de consultas (traceId, perfil, proveedor, latencia)
  - Supervisar fallbacks y warnings
  - Configurar provider activo
  - Ver estadísticas de uso
  - Revisar prompts activos

## Roadmap de Implementación

| Fase | Descripción                                           | Dependencias  |
| ---- | ----------------------------------------------------- | ------------- |
| 1    | Arquitectura y documentación                          | ✅ Completado |
| 2    | Scaffold estructura `apps/api/src/modules/sommelier/` | ✅ Completado |
| 3    | Zod schemas + validación                              | ✅ Completado |
| 4    | Provider interface + MockProvider en API              | ✅ Completado |
| 5    | POST /api/v1/sommelier/chat endpoint                  | ✅ Completado |
| 6    | Catalog Context Service                               | ✅ Completado |
| 7    | Guardrails Service                                    | ✅ Completado |
| 8    | GET /api/v1/sommelier/health + providers              | ✅ Completado |
| 9    | Error handling + fallback                             | ✅ Completado |
| 10   | Frontend migración a API                              | ✅ Completado |
| 11   | LM Studio Provider en API (real)                      | ✅ Completado |
| 12   | AI-LAB Provider en API                                | ⏳ Pendiente  |
| 13   | Observabilidad + tracing                              | ⏳ Pendiente  |
| 14   | Rate limiting + CORS hardening                        | ⏳ Pendiente  |

## Scaffold Status (STACK-2026-BACKEND-SOMMELIER-API-SCAFFOLD-01)

### Estructura creada

```
apps/api/src/modules/sommelier/
├── index.ts                          ← Barrel exports
├── routes/
│   └── sommelier.routes.ts          ← 4 endpoints stub
├── schemas/
│   └── sommelier.schemas.ts         ← Todos los Zod schemas + types
├── services/
│   ├── sommelier.service.ts         ← Orquestación (stub)
│   ├── catalog-context.service.ts   ← Context builder (TODOs)
│   └── guardrails.service.ts        ← Pre/post validación (TODOs)
├── providers/
│   ├── sommelier-provider.ts        ← SommelierProvider interface
│   ├── mock.provider.ts             ← MockProvider (responde placeholders)
│   ├── lmstudio.provider.ts         ← LMStudioProvider (real, llama-3.2-1b-instruct)
│   └── ailab.provider.ts            ← AILabProvider (stub, no implementado)
└── utils/
    ├── trace.ts                     ← createTraceId()
    ├── errors.ts                    ← SommelierError + error codes
    └── response-normalizer.ts       ← normalizeProviderResponse()
```

### Integración en server.ts

- Rutas registradas seguras: `GET /api/v1/sommelier/health`, `/providers`, `/guardrails`
- `POST /api/v1/sommelier/chat` devuelve 501 NOT_IMPLEMENTED
- Sin impacto en endpoints existentes (`/healthz`, `/api/v1/status`)

### Implementado

- ✅ Zod schemas y tipos (request, response, health, metadata, catalog context)
- ✅ Provider interface con genéricos
- ✅ MockProvider con respuestas placeholder
- ✅ LMStudioProvider real (llama-3.2-1b-instruct, fetch nativo, timeout, fallback)
- ✅ AILabProvider stub pendiente
- ✅ SommelierService con fallback provider (primario → fallback → emergencia)
- ✅ CatalogContextService con candidate selection (máx 5)
- ✅ GuardrailsService con pre/post validación
- ✅ createTraceId() con formato som-{timestamp}-{seq}-{random}
- ✅ SommelierError con códigos de error
- ✅ normalizeProviderResponse()
- ✅ 6 endpoints seguros en Fastify
- ✅ Provider selector: SOMMELIER_PROVIDER=mock|lmstudio

### No implementado

- ❌ Llamadas a AI-LAB
- ❌ Conexión a Prisma
- ❌ Rate limiting
- ❌ Observabilidad real (tracing, logging)
- ❌ Tests automatizados
- ❌ moondream2 (visión) en LM Studio

## MockProvider Status (STACK-2026-BACKEND-SOMMELIER-MOCK-PROVIDER-01)

### Implementado

- ✅ `apps/api/src/modules/sommelier/data/catalog.mock.ts` — 10 productos backend (vinos, aceites, mieles, gourmet, packs)
- ✅ `MockSommelierProvider.chat()` con detección de intención por palabras clave
- ✅ `POST /api/v1/sommelier/chat` funcional (ya no 501)
- ✅ Respuestas en español con recomendaciones, maridajes y fuentes
- ✅ Guardrails: mensaje vacío, longitud máxima, price/stock claims, distinción lab/producción
- ✅ Validación Zod en route handler
- ✅ Error handling con SommelierError y códigos claros
- ✅ Fallback en SommelierService si provider.chat() lanza excepción

### Intents Soportados

| Intención        | Keywords                         | Categoría | Confianza |
| ---------------- | -------------------------------- | --------- | --------- |
| `pairing`        | carne, chuletón, cordero, queso  | vinos     | 0.92      |
| `recommendation` | aceite, aove, oliva              | aceites   | 0.88      |
| `recommendation` | miel, romero, desayuno, infusión | mieles    | 0.88      |
| `recommendation` | regalo, pack, cesta, detalle     | packs     | 0.88      |
| `recommendation` | gourmet, foie, delicatessen      | gourmet   | 0.88      |
| `recommendation` | tinto, reserva, crianza, vino    | vinos     | 0.88      |
| `general`        | fallback (ninguna keyword)       | —         | 0.55      |

### Endpoints State

| Method | Path                              | State                           |
| ------ | --------------------------------- | ------------------------------- |
| GET    | /api/v1/sommelier/health          | ✅ funcional                    |
| GET    | /api/v1/sommelier/providers       | ✅ funcional                    |
| GET    | /api/v1/sommelier/guardrails      | ✅ funcional                    |
| GET    | /api/v1/sommelier                 | ✅ funcional (discovery)        |
| POST   | /api/v1/sommelier/chat            | ✅ funcional (mock provider)    |
| POST   | /api/v1/sommelier/catalog-context | ✅ funcional (intent detection) |

## Frontend Connection

El frontend se conecta al backend API a través de `apps/web/src/lib/sommelier/api-client.ts`.

**Flujo:**

1. `SommelierChat.tsx` intenta llamar a API primero (`apiMode === "api"`)
2. Si API responde → usa respuesta backend con `traceId`, `intent`, `recommendations`, `pairings`
3. Si API falla → usa `processConversation()` (mock engine frontend) con badge "Frontend Fallback"
4. Si `apiMode === "mock"` (localStorage override) → siempre usa mock engine local

**Provider label** visible en header del chat: "Mock API" / "Frontend Fallback" / "Simulador local".

**Configuración:**

- `PUBLIC_SOMMELIER_API_MODE=api` o `=mock` (env var, default `mock` para Vercel)
- `PUBLIC_SOMMELIER_API_URL` para URL del backend (default `http://localhost:8080`)
- localStorage `SOMMELIER_API_MODE` para override temporal

### Vercel Safety

- **Default mode: `mock`** — Vercel nunca llama a `localhost:8080` a menos que se configure explícitamente
- `PUBLIC_SOMMELIER_API_MODE` debe setearse a `api` + `PUBLIC_SOMMELIER_API_URL` para entorno local/lab
- Si no hay env var ni localStorage, `getApiMode()` devuelve `"mock"` (safe default)
- LM Studio (`192.168.1.250:1234`) nunca es llamado desde frontend — solo vía Fastify backend
- Fallback silencioso: si API no responde, se usa mock engine local con badge "Frontend Fallback"
- Sin errores visibles al usuario cuando API no está disponible
