# LM Studio Provider — Arquitectura de Conexión para Sommelier AI v2

## Visión

Conectar Sommelier AI v2 con modelos locales ejecutados mediante LM Studio para obtener respuestas generadas por IA real, manteniendo el mock engine como fallback y preparando el terreno para AI-LAB como provider futuro.

## No Alcance (en esta fase)

- Conexión real a LM Studio
- Llamadas HTTP a `127.0.0.1:1234`
- Endpoints Fastify implementados
- Variables de entorno en producción
- Autenticación de usuarios
- Persistencia de conversaciones
- Rate limiting real
- Integración con AI-LAB

## Arquitectura General

```
Frontend (Vercel)
    │
    ▼
Fastify API (apps/api)
    │
    ├── POST /api/v1/sommelier/chat
    ├── GET  /api/v1/sommelier/health
    │
    ▼
Provider Interface (SommelierProvider)
    │
    ├── MockSommelierProvider (siempre disponible)
    ├── LMStudioSommelierProvider (local/lab)
    └── AILabSommelierProvider (futuro)
```

### Principio de Conexión

```
✅ Correcto:
Navegador → Fastify (Vercel/lab) → LM Studio Provider → LM Studio (127.0.0.1:1234)

❌ Incorrecto:
Navegador (Vercel) → LM Studio directo (bloqueado por CORS/red)
```

### Seguridad de Red

LM Studio solo se ejecuta en local/LAN. Vercel en producción NO puede alcanzar `127.0.0.1`. El provider debe:

1. Detectar si LM Studio está disponible (`health()`)
2. Si no está disponible, hacer fallback automático a mock
3. Si está disponible, usarlo solo si el entorno lo permite (VITE_SOMMELIER_PROVIDER entorno local)

## Diagrama de Flujo

```
Usuario escribe mensaje
        │
        ▼
┌─────────────────────────────┐
│  1. Frontend envía POST     │
│     /api/v1/sommelier/chat  │
│     { message, profile,     │
│       conversationContext }  │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  2. Fastify recibe request  │
│     - Valida input (Zod)    │
│     - Sanitiza mensaje      │
│     - Limita longitud       │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  3. Provider Router         │
│     Según SOMMELIER_PROVIDER │
│     - mock → MockProvider   │
│     - lmstudio → LmStudio   │
│     - ailab → AILabProvider │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  4. Catalog Context Builder │
│     - Clasifica query       │
│     - Selecciona candidates │
│     - Construye contexto    │
│     compacto                │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  5. Prompt Builder          │
│     - System prompt base    │
│     - Perfil prompt         │
│     - Contexto catálogo     │
│     - Historial reciente    │
│     - Guardrails            │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  6. LM Studio API call      │
│     POST /v1/chat/completions│
│     { model, messages,      │
│       temperature, maxTokens}│
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  7. Response Parser         │
│     - Extrae JSON           │
│     - Valida con Zod        │
│     - Aplica guardrails     │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  8. Response Builder        │
│     - answer string         │
│     - recommendations[]     │
│     - pairings[]            │
│     - confidence            │
│     - warnings[]            │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  9. Frontend renderiza      │
│     ChatMessage +           │
│     RecommendationCard      │
└─────────────────────────────┘
```

## Endpoints Futuros

### POST /api/v1/sommelier/chat

**Request:**

```json
{
  "message": "Quiero un vino para carne roja",
  "profile": "private",
  "conversationContext": {
    "category": null,
    "step": 0,
    "collected": {},
    "completed": false
  },
  "catalogContext": []
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
  "provider": "lmstudio",
  "warnings": [
    {
      "type": "lab_mode",
      "message": "Respuesta generada por IA local en modo laboratorio."
    }
  ],
  "sources": [
    {
      "type": "product",
      "id": "reserva-del-alto-ebro",
      "name": "Reserva del Alto Ebro"
    }
  ],
  "nextQuestions": [
    "¿Qué queso recomiendas con este vino?",
    "Cuéntame más sobre la bodega"
  ]
}
```

### GET /api/v1/sommelier/health

**Response:**

```json
{
  "status": "ok",
  "provider": "lmstudio",
  "model": "qwen/qwen3-coder-30b-a3b-instruct",
  "latencyMs": 2450,
  "timestamp": "2026-06-08T12:00:00Z"
}
```

## Provider Interface

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
  warnings: Warning[];
  sources: Source[];
}

interface ProviderHealth {
  status: "ok" | "degraded" | "down";
  provider: ProviderType;
  model?: string;
  latencyMs?: number;
  error?: string;
  timestamp: string;
}

interface ProviderMetadata {
  name: string;
  version: string;
  models: string[];
  capabilities: string[];
  isLocal: boolean;
}

type ProviderType = "mock" | "lmstudio" | "ailab";
type IntentType =
  | "pairing"
  | "recommendation"
  | "comparison"
  | "product_explanation"
  | "general";
```

## Provider Implementations

### MockSommelierProvider

- Siempre disponible
- Usa `generateMockResponse()` existente
- No requiere conexión
- Ideal para desarrollo offline y CI/CD

### LMStudioSommelierProvider

- Se conecta a `LMSTUDIO_BASE_URL/v1/chat/completions`
- Usa el modelo configurado en `LMSTUDIO_MODEL`
- Timeout configurable (por defecto 30s)
- Fallback automático a MockProvider si:
  - LM Studio no responde
  - Timeout excede
  - Respuesta inválida (no JSON)
  - Error de red
- Solo activo en entornos locales/lab

### AILabSommelierProvider (Futuro)

- Se conecta a AI-LAB Gateway
- Enrutamiento inteligente de consultas
- Modelos más potentes disponibles
- Integración con logging y monitoreo centralizado

## Variables de Entorno

```
# Provider selection
SOMMELIER_PROVIDER=mock|lmstudio|ailab

# LM Studio
LMSTUDIO_BASE_URL=http://127.0.0.1:1234/v1
LMSTUDIO_MODEL=qwen/qwen3-coder-30b-a3b-instruct

# Timeouts
SOMMELIER_TIMEOUT_MS=30000
SOMMELIER_MAX_TOKENS=2048

# Temperature
SOMMELIER_TEMPERATURE=0.7
```

Estas variables deben documentarse en `.env.example` pero NO añadirse como secretos reales hasta la fase de implementación.

## Prompt Design

### System Prompt Base

```
Eres Sommelier AI, el asistente inteligente de LabrazaHome Labs.
Especialista en vinos, aceites, mieles y productos gourmet premium del sector agroalimentario.

PERSONALIDAD:
- Experto riguroso con pasión por la gastronomía premium
- Adaptas tono y profundidad al perfil del usuario
- Respuestas en español con lenguaje natural y preciso

REGLAS ESTRICTAS (NUNCA incumplir):
1. No inventar stock, precios, disponibilidad ni puntuaciones
2. No inventar datos que no estén en el catálogo proporcionado
3. Indicar siempre "dato de laboratorio" si proviene del catálogo mock
4. Usar SOLO los productos del contexto proporcionado
5. Diferenciar entre datos del catálogo y conocimiento general
6. No recomendar productos con status "concept" o "design"
7. Responder SIEMPRE en español
8. Ser honesto sobre lo que no sabes

PERFIL ACTIVO: {profile}
- private: tono cercano, entusiasta, explicar tecnicismos
- b2b: tono profesional, directo, incluir datos técnicos
- producer: tono editorial, storytelling, posicionamiento
- admin: tono neutro, preciso, incluir trazabilidad

FORMATO DE RESPUESTA:
Debes responder ÚNICAMENTE con un JSON válido con esta estructura:
{
  "answer": "string — respuesta en lenguaje natural",
  "intent": "pairing|recommendation|comparison|product_explanation|general",
  "recommendations": [
    {
      "slug": "string",
      "name": "string",
      "category": "string",
      "reason": "string",
      "confidence": 0.0-1.0
    }
  ],
  "pairings": [
    {
      "product": "string",
      "pairing": "string",
      "reason": "string"
    }
  ],
  "confidence": 0.0-1.0,
  "warnings": [
    {
      "type": "mock_data|no_data|low_confidence|lab_mode",
      "message": "string"
    }
  ],
  "nextQuestions": ["string"],
  "sources": [
    {
      "type": "product|category|general_knowledge",
      "id": "string (opcional)",
      "name": "string"
    }
  ]
}
```

### Contexto de Catálogo (Ejemplo de Inyección)

```
CATÁLOGO DISPONIBLE:
- Producto: Reserva del Alto Ebro
  Categoría: vinos
  Productor: Bodegas Labraza Heritage
  Descripción: Un reserva clásico de la Rioja Alta con 24 meses en barrica...
  Variedad: Tempranillo 90%, Graciano 10%
  Añada: 2020
  Crianza: 24 meses barrica roble americano
  Alcohol: 14.5%
  Temperatura: 16-18°C
  Maridajes: Carnes rojas a la parrilla, Quesos curados, Cordero asado, Setas salteadas
  Puntuaciones: Parker 92/100 (2025) [Mock], Peñín 90/100 (2025) [Mock]
  Story: Las viñas que dan vida a este reserva fueron plantadas...
  Tags: Tempranillo, Crianza, Rioja Alta
  Status: prototype
```

## Catalog Context Strategy

Para evitar enviar el catálogo completo en cada petición, se debe implementar:

1. **Query Classification** — Determinar si la consulta es sobre vinos, aceites, mieles, gourmet, packs o general
2. **Candidate Selection** — Seleccionar máximo 3-5 productos candidatos según:
   - Coincidencia de categoría
   - Tags relevantes
   - Maridajes compatibles
   - Perfil del usuario
3. **Compact Context** — Construir contexto con solo los campos relevantes:
   - name, category, shortDescription
   - specs relevantes (variedad, añada para vinos; variedad de aceituna para aceites)
   - pairings (máximo 4)
   - ratings (si existen)
   - story (solo si es necesario para el perfil)
4. **Prompt Assembly** — Inyectar contexto compacto en el system prompt
5. **Structured Response** — Parsear y validar JSON de respuesta

## Seguridad

| Riesgo                          | Mitigación                                                                 |
| ------------------------------- | -------------------------------------------------------------------------- |
| LM Studio expuesto públicamente | El provider solo funciona en local/LAN. Vercel no puede alcanzar 127.0.0.1 |
| Prompt injection                | Sanitización de input del usuario. Límite de 2000 caracteres por mensaje   |
| Respuesta inválida              | Parser con validación Zod. Si falla, se usa MockProvider como fallback     |
| Timeout                         | Timeout configurable (30s default). Fallback automático                    |
| Datos sensibles en logs         | No loguear mensajes completos. Solo tipo de consulta y perfil              |
| Rate limiting                   | Futuro: límite por IP/sesión en Fastify middleware                         |
| Model drift                     | Prompts versionados y revisados. System prompt fijo por versión            |

## Fallback Behavior

```
LM Studio disponible?
    ├── Sí → Usar LM Studio Provider
    │         │
    │         ├── Respuesta válida ✓ → Devolver al frontend
    │         ├── Timeout / Error → Log warning → Fallback a Mock
    │         └── JSON inválido → Log error → Fallback a Mock
    │
    └── No → Usar Mock Provider siempre
              │
              └── Indicar en warnings: "Usando respuestas simuladas.
                   LM Studio no está disponible."
```

### UI Fallback

Cuando el provider falle, el frontend debe:

1. Mostrar respuesta del MockProvider sin interrupción visual
2. Añadir warning "Respuesta generada en modo simulado"
3. No mostrar errores técnicos al usuario
4. Mantener el chat funcional

## Logging / Tracing (Futuro)

```
{
  "timestamp": "2026-06-08T12:00:00Z",
  "requestId": "uuid",
  "provider": "lmstudio",
  "profile": "private",
  "intent": "pairing",
  "latencyMs": 2450,
  "confidence": 0.92,
  "model": "qwen/qwen3-coder-30b-a3b-instruct",
  "tokensIn": 850,
  "tokensOut": 320,
  "fallbackUsed": false,
  "warnings": []
}
```

No loguear:

- Mensajes completos del usuario
- Respuestas completas
- Datos personales

## Roadmap

| Fase | Descripción                                | Dependencias                 |
| ---- | ------------------------------------------ | ---------------------------- |
| 1    | Arquitectura y documentación (esta fase)   | —                            |
| 2    | Provider interface + MockProvider refactor | Sommelier AI v2 actual       |
| 3    | LM Studio Provider implementación          | Fase 2 + LM Studio instalado |
| 4    | Fastify endpoints + validación Zod         | Fase 3 + apps/api            |
| 5    | Prompt system + catalog context builder    | Fase 3                       |
| 6    | Fallback y health check                    | Fase 3                       |
| 7    | Guardrails + response validation           | Fase 3                       |
| 8    | Integración con Frontend Chat              | Fases 3-7                    |
| 9    | AI-LAB Provider                            | Fase 2 + AI-LAB disponible   |
