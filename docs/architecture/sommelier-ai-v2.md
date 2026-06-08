# Sommelier AI v2 — Arquitectura

> **Profile memory:** Memoria local de perfil implementada via `localStorage` (clave `labrazahome:sommelier-profile`). Guarda solo el tipo de perfil (`private`, `b2b`, `producer`, `admin`). No guarda datos personales ni conversaciones. Implementado en STACK-2026-SOMMELIER-PROFILE-MEMORY-01. La integración con backend solo se realizará cuando exista autenticación real.

## Visión

Sommelier AI v2 será el asistente inteligente conversacional del ecosistema LabrazaHome Labs. Consumirá los datos del Catálogo Premium v2 para ofrecer recomendaciones personalizadas, maridajes inteligentes y explicaciones de producto con profundidad editorial.

No es un chatbot genérico. Es un sumiller digital especializado en productos agroalimentarios premium (vinos, aceites, mieles, gourmet, packs) que conoce en detalle cada producto, su historia, sus maridajes y su contexto.

## Objetivos

- Recomendar vinos, aceites y productos gourmet según contexto del usuario
- Explicar fichas de producto con lenguaje adaptado al perfil del usuario
- Sugerir maridajes basados en el contenido editorial de cada producto
- Comparar productos dentro del catálogo
- Generar explicaciones comerciales para canal B2B
- Preparar el terreno para integración futura con modelos locales (LM Studio) y AI-LAB
- Diferenciar siempre entre datos mock/laboratorio y datos de producción

## No Alcance (en esta fase)

- Implementación de IA real
- Conexión con LM Studio, AI-LAB o cualquier modelo
- Endpoints reales de API
- Migraciones Prisma
- Uso de API keys
- Integración con Rioja Marketplace producción
- Chat funcional con respuestas reales
- Autenticación de usuarios
- Persistencia de conversaciones

## Perfiles de Conversación

### Cliente Privado

| Atributo    | Valor                                         |
| ----------- | --------------------------------------------- |
| Objetivo    | Descubrir productos, decidir compra, aprender |
| Tono        | Cercano, entusiasta, divulgativo              |
| Lenguaje    | Sencillo, sin tecnicismos (o explicándolos)   |
| Preferencia | Recomendaciones emocionales y por ocasión     |
| Ejemplo     | "Quiero un vino para una cena romántica"      |
| Adaptación  | Destacar historia, maridaje, experiencia      |

### Cliente B2B (Restaurante, tienda, distribuidor)

| Atributo    | Valor                                                |
| ----------- | ---------------------------------------------------- |
| Objetivo    | Seleccionar productos para su negocio                |
| Tono        | Profesional, directo, técnico                        |
| Lenguaje    | Técnico, con datos de ficha                          |
| Preferencia | Especificaciones, disponibilidad, precio, volumen    |
| Ejemplo     | "Necesito un aceite arbequina para mi restaurante"   |
| Adaptación  | Destalar ficha técnica, rendimiento, certificaciones |

### Proveedor / Bodega

| Atributo    | Valor                                          |
| ----------- | ---------------------------------------------- |
| Objetivo    | Posicionar sus productos, entender el catálogo |
| Tono        | Formal, colaborativo                           |
| Lenguaje    | Técnico pero accesible                         |
| Preferencia | Cómo aparece su producto, qué se dice de él    |
| Ejemplo     | "¿Cómo está descrito mi vino en el catálogo?"  |
| Adaptación  | Mostrar datos del producto, sugerir mejoras    |

### Admin Interno

| Atributo    | Valor                                          |
| ----------- | ---------------------------------------------- |
| Objetivo    | Probar, depurar, auditar el sistema            |
| Tono        | Neutro, informativo, preciso                   |
| Lenguaje    | Técnico, con trazabilidad                      |
| Preferencia | Saber fuentes usadas, nivel de confianza       |
| Ejemplo     | "¿Qué datos usaste para recomendar este vino?" |
| Adaptación  | Mostrar fuentes, confianza, modo laboratorio   |

## Casos de Uso

### Iniciales (fase placeholder)

| ID    | Caso de uso                       | Perfiles     | Descripción                                                               |
| ----- | --------------------------------- | ------------ | ------------------------------------------------------------------------- |
| CU-01 | Recomendar vino según comida      | Privado, B2B | El usuario describe una comida y el sistema recomienda vinos del catálogo |
| CU-02 | Recomendar producto según ocasión | Privado      | El usuario describe una ocasión (cena romántica, regalo, celebración)     |
| CU-03 | Explicar ficha de producto        | Todos        | El usuario pregunta sobre un producto específico del catálogo             |
| CU-04 | Sugerir maridaje                  | Privado, B2B | Recomendar alimentos que maridan con un producto                          |
| CU-05 | Comparar productos                | Privado, B2B | Contrastar dos o más productos del catálogo                               |
| CU-06 | Recomendar pack                   | Privado, B2B | Sugerir packs según necesidades                                           |
| CU-07 | Adaptar respuesta B2B             | B2B          | Explicación comercial para negocio                                        |
| CU-08 | Explicación backoffice            | Admin        | Generar descripción comercial para backoffice                             |
| CU-09 | Búsqueda semántica                | Todos        | Encontrar productos por descripción libre                                 |

### Futuros

| ID    | Caso de uso                  | Perfiles     | Descripción                                                  |
| ----- | ---------------------------- | ------------ | ------------------------------------------------------------ |
| CU-10 | Historial de recomendaciones | Todos        | Recordar preferencias y conversaciones previas               |
| CU-11 | FAQ inteligente              | Todos        | Responder preguntas frecuentes sobre productos               |
| CU-12 | Experiencia guiada           | Privado      | Cuestionario interactivo para encontrar el producto ideal    |
| CU-13 | Alertas de新产品             | Privado, B2B | Notificar cuando un producto nuevo coincide con preferencias |
| CU-14 | Análisis de tendencias       | B2B, Admin   | Identificar patrones de recomendación y demanda              |

## Fuentes de Conocimiento

### Iniciales (fase placeholder)

| Fuente              | Descripción                                                    | Estado          |
| ------------------- | -------------------------------------------------------------- | --------------- |
| Catálogo Premium v2 | Datos mock de productos (11 productos)                         | ✅ Creado       |
| Product specs       | Campos específicos por tipo (variedad, añada, acidez, etc.)    | ✅ En mock data |
| Product story       | Texto editorial de cada producto                               | ✅ En mock data |
| Pairings            | Sugerencias de maridaje por producto                           | ✅ En mock data |
| Tags                | Etiquetas de categorización                                    | ✅ En mock data |
| Categories          | 5 categorías del catálogo                                      | ✅ Creado       |
| Reglas de maridaje  | Base de conocimiento experto (vino tinto → carnes rojas, etc.) | 📝 Pendiente    |
| Guía de perfiles    | Descripción de cada perfil y sus reglas de adaptación          | 📝 Pendiente    |

### Futuras

| Fuente                      | Descripción                            | Estado                 |
| --------------------------- | -------------------------------------- | ---------------------- |
| PostgreSQL                  | Datos reales de productos desde Prisma | 🔮 Futuro              |
| Embeddings vectoriales      | Búsqueda semántica sobre productos     | 🔮 Futuro              |
| AI-LAB                      | Ruteo inteligente de consultas         | 🔮 Futuro              |
| LM Studio                   | Modelos locales (Mistral, Llama)       | 🔮 Futuro              |
| Rioja Marketplace API       | Datos de producción read-only          | 🔮 Futuro (controlado) |
| Historial de conversaciones | Preferencias de usuario                | 🔮 Futuro              |
| Feedback de recomendaciones | Mejora continua                        | 🔮 Futuro              |

## Relación con Catálogo Premium v2

```
Catálogo Premium v2         Sommelier AI v2
─────────────────           ────────────────
ProductPremium              →  Recomendar producto
  .name                     →  "Te recomiendo..."
  .shortDescription         →  Respuesta corta embedida
  .longDescription          →  Explicación detallada
  .story                    →  Contexto narrativo
  .specs                    →  Datos técnicos (según perfil)
  .pairing                  →  Sugerencias de maridaje
  .tags                     →  Categorización semántica
  .highlights               →  Argumentos de venta
  .category                 →  Filtro por tipo
  .region                   →  Recomendación por origen
  .producer                 →  Contexto de productor
```

El catálogo expone datos. Sommelier AI consume, interpreta y adapta al perfil del usuario.

**Principio**: Sommelier AI nunca debe inventar datos que no están en el catálogo. Si un producto no tiene campo `story`, no debe generar una historia ficticia.

## Flujo Conversacional (Conceptual)

```
Usuario: "Quiero un vino para una cena con carne roja"
                              │
                              ▼
    ┌─────────────────────────────────────────┐
    │  1. Clasificar intención                │
    │     "pairing" (maridaje + comida)       │
    └─────────────────────────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────┐
    │  2. Identificar perfil                  │
    │     → privado (si no se especifica)     │
    └─────────────────────────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────┐
    │  3. Consultar catálogo                  │
    │     → vinos con maridaje "carne roja"   │
    └─────────────────────────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────┐
    │  4. Filtrar y ordenar                   │
    │     → status != "concept"               │
    │     → featured primero                  │
    └─────────────────────────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────┐
    │  5. Generar respuesta (simulada)        │
    │     → Presentación del vino             │
    │     → Por qué va bien con carne roja    │
    │     → Notas del sumiller                │
    └─────────────────────────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────┐
    │  6. Construir JSON respuesta            │
    │     → answer, intent, products,         │
    │       pairings, confidence, warnings    │
    └─────────────────────────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────┐
    │  7. Renderizar UI                       │
    │     → ChatMessage + RecommendationCard  │
    └─────────────────────────────────────────┘
```

## Arquitectura Técnica Futura

### Frontend

```
apps/web/src/
├── pages/
│   └── sommelier/
│       ├── index.astro         → Chat page (React island)
│       ├── demo.astro          → Página demo
│       └── producto/[slug].astro → Contexto AI en ficha
│
├── components/
│   └── sommelier/
│       ├── SommelierHero.astro        → Hero de la página
│       ├── SommelierChat.tsx          → Chat React island principal
│       ├── ChatMessage.tsx            → Burbuja de mensaje
│       ├── RecommendationCard.astro   → Card de producto recomendado
│       ├── PairingSuggestion.astro    → Sugerencia visual de maridaje
│       ├── ProductContextPanel.astro  → Contexto de producto en chat
│       ├── SommelierModeSelector.tsx  → Selector de perfil
│       └── SommelierDisclaimer.astro  → Aviso de laboratorio
│
├── data/
│   └── sommelier/
│       └── prompts.ts           → Templates de prompt
│
└── types/
    └── sommelier.ts             → Tipos de chat y respuesta
```

#### Rutas Propuestas

| Ruta                         | Descripción                        | Estado                        |
| ---------------------------- | ---------------------------------- | ----------------------------- |
| `/sommelier`                 | Chat principal con asistente       | 📝 Pendiente                  |
| `/sommelier/demo`            | Demo sin chat, cards visuales      | 📝 Pendiente                  |
| `/sommelier/producto/[slug]` | Vista con contexto AI del producto | 🔮 Futuro (puede ser overlay) |

#### Componentes Futuros

| Componente                  | Tipo           | Propósito                                                   |
| --------------------------- | -------------- | ----------------------------------------------------------- |
| `SommelierHero.astro`       | Astro          | Hero con gradiente y descripción del asistente              |
| `SommelierChat.tsx`         | React (island) | Chat conversacional con estado, historial y recomendaciones |
| `ChatMessage.tsx`           | React          | Mensaje individual con avatar, texto y metadatos            |
| `RecommendationCard.astro`  | Astro          | Card de producto recomendado con imagen                     |
| `PairingSuggestion.astro`   | Astro          | Sugerencia visual de maridaje (grid de tags)                |
| `ProductContextPanel.astro` | Astro          | Panel lateral con ficha del producto en conversación        |
| `SommelierModeSelector.tsx` | React          | Selector de perfil (privado/B2B/proveedor/admin)            |
| `SommelierDisclaimer.astro` | Astro          | Aviso de modo laboratorio / datos mock                      |

### Backend (Futuro)

```
apps/api/
└── src/
    ├── routes/
    │   └── sommelier/
    │       ├── chat.ts              → POST /api/v1/sommelier/chat
    │       ├── recommendations.ts   → POST /api/v1/sommelier/recommendations
    │       └── product-context.ts   → GET /api/v1/sommelier/product-context/:slug
    │
    ├── services/
    │   └── sommelier/
    │       ├── engine.ts            → Lógica de recomendación
    │       ├── catalog-connector.ts → Consultas al catálogo
    │       ├── profile-adapter.ts   → Adaptación según perfil
    │       └── response-builder.ts  → Construcción de respuesta JSON
    │
    ├── ai/
    │   ├── provider.ts             → Abstracción de proveedor AI
    │   ├── adapters/
    │   │   ├── mock.ts             → Respuestas mock (fase actual)
    │   │   ├── lm-studio.ts        → Adapter LM Studio (futuro)
    │   │   └── ai-lab.ts           → Adapter AI-LAB (futuro)
    │   ├── prompts/
    │   │   ├── base.ts             → System prompt base
    │   │   ├── profiles.ts         → Prompts por perfil
    │   │   └── guardrails.ts       → Reglas de seguridad
    │   └── templates/
    │       └── index.ts            → Templates de respuesta
    │
    └── types/
        └── sommelier.ts           → Tipos compartidos
```

### AI Layer

```
┌─────────────────────────────────────────┐
│           AI Provider Abstraction        │
│  ┌──────────┐  ┌──────────┐  ┌──────┐   │
│  │   Mock   │  │ LM Studio│  │AI-LAB│   │
│  │ (ahora)  │  │ (futuro) │  │(fut.)│   │
│  └──────────┘  └──────────┘  └──────┘   │
└─────────────────────────────────────────┘
         │                │
         ▼                ▼
┌──────────────────┐  ┌──────────────────┐
│  Prompt Manager  │  │   Guardrails     │
│  - Templates     │  │  - No inventar   │
│  - Perfiles      │  │  - No precios    │
│  - Contexto      │  │  - Etiquetar lab │
└──────────────────┘  └──────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│         Structured Output Builder        │
│  → JSON validado con zod                │
│  → answer, intent, recommendations, etc │
└─────────────────────────────────────────┘
```

## Contrato de Prompts

### System Prompt Base (Conceptual)

```
Eres Sommelier AI, el asistente inteligente de LabrazaHome Labs.

PERSONALIDAD:
- Experto en vinos, aceites, mieles y productos gourmet premium
- Entusiasta pero riguroso
- Adaptas tu lenguaje al perfil del usuario

REGLAS ESTRICTAS:
1. NUNCA inventes datos que no estén en el catálogo
2. NUNCA afirmes disponibilidad, precio o stock real
3. Siempre etiqueta respuestas como "laboratorio" cuando corresponda
4. Si no tienes información, dilo explícitamente
5. Distingue siempre entre datos del catálogo y conocimiento general
6. No recomiendes productos con status "concept" o "design" como si fueran reales

FORMATO DE RESPUESTA:
- Usa el perfil del usuario para decidir tono y profundidad técnica
- Incluye contexto (historia, bodega) para perfiles privados
- Incluye datos técnicos (especificaciones) para perfiles B2B
- Siempre termina con una sugerencia de siguiente pregunta

FUENTES DISPONIBLES:
- Catálogo Premium v2 (productos con specs, historia, maridajes)
- Conocimiento general de gastronomía y maridaje
- NO tienes acceso a datos en tiempo real
```

### Tono por Perfil

| Perfil    | Tono                 | Extensión | Tecnicismos      |
| --------- | -------------------- | --------- | ---------------- |
| Privado   | Cercano, entusiasta  | Media     | Explicados       |
| B2B       | Profesional, directo | Alta      | Sin explicar     |
| Proveedor | Formal, colaborativo | Alta      | Precisos         |
| Admin     | Neutro, preciso      | Variable  | Con trazabilidad |

### Restricciones de Prompt

| Regla                      | Descripción                                                  |
| -------------------------- | ------------------------------------------------------------ |
| No inventar stock          | No decir "quedan 3 unidades" a menos que sea dato real       |
| No inventar precios        | No decir "cuesta 25€" a menos que sea dato real del catálogo |
| No inventar disponibilidad | No decir "disponible inmediatamente"                         |
| Etiquetar laboratorio      | Prefijar respuestas con indicador de modo laboratorio        |
| Fuentes                    | Indicar qué datos del catálogo se usaron                     |
| Confianza                  | Auto-evaluar confianza de la recomendación                   |

## Estructura de Respuesta JSON Futura

```typescript
interface SommelierResponse {
  /** Respuesta en lenguaje natural */
  answer: string;

  /** Intención detectada */
  intent:
    | "pairing"
    | "recommendation"
    | "comparison"
    | "product_explanation"
    | "general";

  /** Perfil detectado/usado */
  profile: "private" | "b2b" | "supplier" | "admin";

  /** Productos recomendados (opcional) */
  recommendedProducts: Array<{
    slug: string;
    name: string;
    category: string;
    reason: string;
    confidence: number; // 0-1
  }>;

  /** Maridajes sugeridos (opcional) */
  pairings: Array<{
    product: string;
    pairing: string;
    reason: string;
  }>;

  /** Nivel de confianza general (0-1) */
  confidence: number;

  /** Advertencias */
  warnings: Array<{
    type: "mock_data" | "no_data" | "low_confidence" | "lab_mode";
    message: string;
  }>;

  /** Preguntas de seguimiento sugeridas */
  nextQuestions: string[];

  /** Trazabilidad */
  sources: Array<{
    type: "product" | "category" | "general_knowledge";
    id?: string;
    name: string;
  }>;
}
```

**Nota**: No implementar hasta la fase de backend.

## Seguridad y Gobernanza

### Principios

1. **No inventar datos**: El sistema nunca debe generar información que no exista en el catálogo
2. **Transparencia**: Indicar siempre si la respuesta usa datos mock o conocimiento general
3. **Trazabilidad**: Registrar qué fuentes se usaron para cada recomendación
4. **Control de prompts**: Los prompts deben ser versionados y revisados
5. **Separación laboratorio/producción**: Distinción clara en UI y datos
6. **No exposición**: Nunca exponer configuración interna, API keys o datos sensibles

### Controles

| Control               | Descripción                                                 |
| --------------------- | ----------------------------------------------------------- |
| Validación de salida  | La respuesta JSON debe pasar validación con zod             |
| Límite de contexto    | No procesar más de 10 productos por consulta                |
| Detección de inventos | Comparar respuesta contra datos reales del catálogo         |
| Rate limiting         | Futuro: límite de consultas por IP/sesión                   |
| Auditoría             | Registrar todas las consultas y respuestas (futuro)         |
| Modo seguro           | Por defecto, perfil privado; cambios requieren confirmación |

### Advertencias en UI

Toda respuesta de Sommelier AI debe incluir al menos uno de estos indicadores:

- **Modo laboratorio**: "Este asistente está en fase de laboratorio. Los datos son simulados."
- **Datos mock**: "Los productos mostrados son datos de prueba."
- **Sin disponibilidad real**: "No podemos confirmar disponibilidad ni precio real."
- **Baja confianza**: cuando `confidence < 0.5`.

## Guardrails Específicos para Puntuaciones de Vino

Sommellier AI v2 debe seguir estas reglas estrictas al manejar puntuaciones críticas (Parker, Peñín, Decanter, etc.) del Catálogo Premium v2:

| Regla                                | Descripción                                                                                        |
| ------------------------------------ | -------------------------------------------------------------------------------------------------- |
| No mencionar si no existen           | Si `product.ratings` no existe o está vacío, no mencionar puntuaciones                             |
| No inventar fuentes                  | Nunca afirmar "Parker lo puntuó 95" si no está en los datos del catálogo                           |
| No mezclar con disponibilidad/precio | Las puntuaciones son datos de calidad, no de disponibilidad comercial                              |
| Indicar mock si aplica               | Si `rating.isMock === true`, incluir "Puntuación de laboratorio" en la respuesta                   |
| Solo vinos                           | Solo productos con `category === "vinos"` pueden tener ratings                                     |
| Citar fuente exacta                  | Si se menciona puntuación, citar la fuente exacta del catálogo (ej: "Según Parker (2025): 92/100") |
| No extrapolar                        | Una puntuación de una añada no implica la misma para otras añadas                                  |

### Ejemplo de Comportamiento Correcto

```
Usuario: "¿Qué puntuación tiene el Reserva del Alto Ebro?"

Respuesta correcta (con ratings en catálogo):
"El Reserva del Alto Ebro tiene una puntuación de 92/100 según Parker (2025).
Nota: Puntuación de laboratorio para validación de experiencia.
No representa un dato comercial real."

Respuesta correcta (sin ratings en catálogo):
"El Reserva del Alto Ebro no tiene puntuaciones críticas registradas en nuestro catálogo actual.
Puedo contarte sobre sus notas de cata, maridajes o historia si te interesa."

Respuesta INCORRECTA (inventar):
"El Reserva del Alto Ebro tiene 95 puntos Parker y 93 en Peñín."
```

## Integraciones

### Con Catálogo Premium v2

Relación directa de consumo. Sommelier AI lee el catálogo vía:

1. **Directo en frontend**: (fase placeholder) importando `getProductsByCategory()` etc.
2. **API futura**: `/api/v1/sommelier/catalog-context` (backend)

### Con B2B v2 (Futuro)

- Perfil B2B tendrá acceso a datos ampliados (precios, condiciones)
- Recomendaciones adaptadas a necesidades comerciales
- Explicaciones con lenguaje profesional

### Con Backoffice v2 (Futuro)

- Generación de descripciones comerciales
- Sugerencias de maridaje automáticas al crear producto
- Detección de productos sin historia o sin maridaje

### Con Rioja Marketplace (Futuro, Controlado)

- Consulta read-only de datos de producción
- Sincronización planificada con runbook
- Nunca conexión directa desde Sommelier AI a producción

## Riesgos

| Riesgo                              | Probabilidad | Impacto | Mitigación                                        |
| ----------------------------------- | ------------ | ------- | ------------------------------------------------- |
| Inventar datos de producto          | Media        | Alto    | Validación contra catálogo, guardrails            |
| Confusión laboratorio/producción    | Alta         | Alto    | Badges visibles, modo laboratorio siempre activo  |
| Recomendar productos no disponibles | Media        | Medio   | No afirmar disponibilidad, disclaimer             |
| Prompts inyectados                  | Baja         | Alto    | Sanitización de entrada, rate limiting            |
| Dependencia de modelos externos     | Media        | Medio   | Provider abstraction, mock siempre funcional      |
| Deriva de tono/perfil               | Baja         | Medio   | Prompts versionados, revisión periódica           |
| Exposición de datos internos        | Baja         | Alto    | Validación de respuesta, no exponer configuración |

## Roadmap

| Fase        | Hito                                    | Dependencias        |
| ----------- | --------------------------------------- | ------------------- |
| **Actual**  | Arquitectura y documentación            | —                   |
| **Fase 2**  | Placeholder visual (`/sommelier`)       | Catálogo Premium v2 |
| **Fase 3**  | Chat React island + estado local        | Design System       |
| **Fase 4**  | Mock responses (simuladas, sin IA)      | Fase 3              |
| **Fase 5**  | Provider abstraction + prompt system    | Fase 4              |
| **Fase 6**  | Backend endpoints Fastify               | API existente       |
| **Fase 7**  | Integración LM Studio (local)           | Fase 5 + LM Studio  |
| **Fase 8**  | Perfiles de usuario (privado/B2B/admin) | Fase 6              |
| **Fase 9**  | Integración AI-LAB                      | Fase 5 + AI-LAB     |
| **Fase 10** | Conexión controlada Rioja Marketplace   | Runbook aprobado    |
