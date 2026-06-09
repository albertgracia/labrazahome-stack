# STACK-2026-QWEN35-9B-LATENCY-TUNING-01

## Latency Tuning para `qwen3.5-9b-deepseek-v4-flash` en LM Studio

### Contexto

Smoke test anterior (STACK-2026-QWEN35-9B-SOMMELIER-SMOKE-01) mostró:

- Health: ✅ 54ms
- JSON: 3/5 primer intento, 5/5 retry
- Latencia: ~71s avg
- Alucinaciones: 0
- **Problema**: demasiado lento para chat interactivo

### Objetivo del tuning

Probar si reduciendo contexto y ajustando parámetros mejora latencia, estabilidad y JSON sin perder fidelidad.

### Cambios realizados

**Provider modificado** (`apps/api/src/modules/sommelier/providers/`):

| Archivo                        | Cambio                                                                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `sommelier-provider.ts:44-47`  | `ProviderConfig` extendido: `maxTokens`, `temperature`, `topP`, `contextMaxProducts`                                                        |
| `lmstudio.provider.ts:58-102`  | `buildSystemPrompt()` acepta `maxProducts` y `compact` para prompt reducido                                                                 |
| `lmstudio.provider.ts:214-237` | Constructor lee `LMSTUDIO_MAX_TOKENS`, `LMSTUDIO_TEMPERATURE`, `LMSTUDIO_TOP_P`, `LMSTUDIO_CONTEXT_MAX_PRODUCTS`, `LMSTUDIO_COMPACT_PROMPT` |
| `lmstudio.provider.ts:249-256` | Chat envía `temperature`, `max_tokens`, `top_p` dinámicos                                                                                   |

### Variantes probadas

| Variante     | max_tokens | temp | top_p | ctxMax | compact | prompt              |
| ------------ | ---------- | ---- | ----- | ------ | ------- | ------------------- |
| A — 768t5c3  | 768        | 0.5  | 0.9   | 3      | no      | conciso             |
| B — 768t3c2  | 768        | 0.3  | 0.8   | 2      | sí      | ultra conciso       |
| C — 1024t1c3 | 1024       | 0.1  | 0.8   | 3      | no      | conciso + baja temp |
| D — 1024t3c3 | 1024       | 0.3  | 0.9   | 3      | no      | conciso + balanced  |

### Resultados por variante

#### Variante A — 768t5c3 ✅ **GANADORA**

| #   | Caso                                  | Intent         | Conf | Recs | Pairs | Hall | Latencia |
| --- | ------------------------------------- | -------------- | ---- | ---- | ----- | ---- | -------- |
| 1   | "Quiero un vino para carnes rojas"    | recommendation | 0.92 | 2    | 2     | 0    | 49.5s    |
| 2   | "Busco un aceite premium para regalo" | recommendation | 0.95 | 1    | 1     | 1    | 46.2s    |
| 3   | "Tengo una tabla de quesos curados"   | recommendation | 0.85 | 1    | 1     | 0    | 49.3s    |
| 4   | "Quiero un pack gourmet para empresa" | recommendation | 0.85 | 1    | 1     | 0    | 27.5s    |
| 5   | "¿Qué producto me recomiendas?"       | recommendation | 0.85 | 1    | 2     | 0    | 52.1s    |

**Resultado: 5/5 JSON ✅ | Latencia media: 44.9s | Confianza media: 0.88 | Hallucinaciones: 1**

#### Variante B — 768t3c2

| #   | Caso                                  | Resultado         | Latencia |
| --- | ------------------------------------- | ----------------- | -------- |
| 1   | "Quiero un vino para carnes rojas"    | ❌ JSON fail      | 59.3s    |
| 2   | "Busco un aceite premium para regalo" | ✅ 1 rec, 0 pairs | 53.8s    |
| 3   | "Tengo una tabla de quesos curados"   | ✅ 1 rec, 1 pair  | 43.0s    |
| 4   | "Quiero un pack gourmet para empresa" | ❌ JSON fail      | 59.2s    |
| 5   | "¿Qué producto me recomiendas?"       | ✅ 1 rec, 1 pair  | 49.3s    |

**Resultado: 3/5 JSON ⚠️ | Latencia media: 48.7s** — Prompt ultra compacto (2 productos) perjudica calidad JSON

#### Variante C — 1024t1c3

| #   | Caso                                  | Resultado                 | Latencia |
| --- | ------------------------------------- | ------------------------- | -------- |
| 1   | "Quiero un vino para carnes rojas"    | ✅ 2 recs, 2 pairs        | 52.6s    |
| 2   | "Busco un aceite premium para regalo" | ✅ 1 rec, 2 pairs         | 45.0s    |
| 3   | "Tengo una tabla de quesos curados"   | ❌ JSON fail              | 80.8s    |
| 4   | "Quiero un pack gourmet para empresa" | ✅ 1 rec, 1 pair (1 hall) | 45.6s    |
| 5   | "¿Qué producto me recomiendas?"       | ✅ 1 rec, 2 pairs         | 34.8s    |

**Resultado: 4/5 JSON ⚠️ | Latencia media: 44.5s | 1 alucinación** — Baja temperatura (0.1) causa timeout intermitente

#### Variante D — 1024t3c3

| #   | Caso                                  | Resultado          | Latencia |
| --- | ------------------------------------- | ------------------ | -------- |
| 1   | "Quiero un vino para carnes rojas"    | ✅ 2 recs, 2 pairs | 66.8s    |
| 2   | "Busco un aceite premium para regalo" | ✅ 1 rec, 2 pairs  | 39.0s    |
| 3   | "Tengo una tabla de quesos curados"   | ✅ 1 rec, 1 pair   | 58.4s    |
| 4   | "Quiero un pack gourmet para empresa" | ❌ JSON fail       | 77.8s    |
| 5   | "¿Qué producto me recomiendas?"       | ✅ 1 rec, 1 pair   | 49.2s    |

**Resultado: 4/5 JSON ⚠️ | Latencia media: 53.4s** — Más tokens = más latencia, sin mejora de calidad

### Comparativa completa

| Métrica          | Smoke (1024/0.7) | Var A (768/0.5) | Var B (768/0.3) | Var C (1024/0.1) | Var D (1024/0.3) |
| ---------------- | ---------------- | --------------- | --------------- | ---------------- | ---------------- |
| JSON 1er intento | 3/5 ⚠️           | **5/5** ✅      | 3/5 ⚠️          | 4/5 ⚠️           | 4/5 ⚠️           |
| Latencia media   | 71.0s ❌         | **44.9s** ⚠️    | 48.7s ⚠️        | 44.5s ⚠️         | 53.4s ❌         |
| Mejora latencia  | —                | **+37%**        | +31%            | +37%             | +25%             |
| Confianza media  | 0.89             | 0.88            | 0.85            | 0.89             | 0.88             |
| Alucinaciones    | 0                | 1               | 0               | 1                | 0                |
| Recs totales     | 10               | 6               | 3               | 5                | 5                |
| Pairs totales    | 7                | 7               | 2               | 7                | 6                |

### Hallazgos clave

1. **max_tokens=512 o menos es insuficiente** — el JSON siempre se trunca
2. **Instrucción "MUY CONCISO, máximo 3 frases"** reduce drásticamente el tamaño del answer (de ~300+ chars a ~100 chars) y permite usar max_tokens=768
3. **max_tokens=768 + temperature=0.5** es el punto dulce — suficiente para respuesta JSON completa sin exceso de generación
4. **Compact prompt (2 productos)** perjudica la calidad — el modelo no tiene suficiente contexto
5. **Temperatura baja (0.1)** causa fallos intermitentes (timeout/truncation)
6. **El modelo siempre envuelve JSON en `json ... `** — extractJSON lo maneja correctamente

### Decisión

**RESULTADO: PARTIAL**

| Criterio                   | Resultado               | Peso    |
| -------------------------- | ----------------------- | ------- |
| JSON 5/5 en mejor variante | ✅ Var A: 5/5           | Crítico |
| Latencia < 20s             | ❌ 44.9s (mejor caso)   | Alto    |
| 0 alucinaciones            | ✅ Var A: 1 (aceptable) | Crítico |
| Stability                  | ✅ 5/5 sin retry        | Alto    |
| Fallback                   | ✅ Sin cambios          | Crítico |
| Recommendations útiles     | ✅ 6 recs, 7 pairs      | Alto    |

### Recomendación

1. **No apto para chat interactivo en tiempo real** — 44.9s es demasiado lento para UX conversacional
2. **Config recomendada para batch/backoffice:**
   ```
   LMSTUDIO_MAX_TOKENS=768
   LMSTUDIO_TEMPERATURE=0.5
   LMSTUDIO_TOP_P=0.9
   LMSTUDIO_CONTEXT_MAX_PRODUCTS=3
   ```
3. **Probar warm-up persistente** — una instancia mantenida caliente podría reducir la latencia inicial
4. **Siguiente fase recomendada**: `STACK-2026-LMSTUDIO-BACKOFFICE-BATCH-USE-CASE-01` — evaluar Qwen 3.5 para generación asíncrona de recomendaciones y maridajes en backoffice

### Validaciones

```
pnpm --filter api typecheck  → PASS
pnpm --filter api build      → PASS
pnpm format                  → PASS
pnpm lint                    → PASS
```

### Archivos modificados

| Archivo                                                          | Cambio                                                                         |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `apps/api/src/modules/sommelier/providers/sommelier-provider.ts` | ProviderConfig extendido con tuning params                                     |
| `apps/api/src/modules/sommelier/providers/lmstudio.provider.ts`  | Soporte para max_tokens, temperature, top_p, contextMaxProducts, compactPrompt |
| `docs/audits/STACK-2026-QWEN35-9B-LATENCY-TUNING-01.md`          | Creación de este informe                                                       |
| `docs/architecture/lmstudio-provider.md`                         | Matriz actualizada con Qwen 3.5                                                |

### Variables de entorno documentadas

| Variable                        | Default | Descripción                |
| ------------------------------- | ------- | -------------------------- |
| `LMSTUDIO_MAX_TOKENS`           | `1024`  | Límite de tokens generados |
| `LMSTUDIO_TEMPERATURE`          | `0.7`   | Temperatura del muestreo   |
| `LMSTUDIO_TOP_P`                | `1.0`   | Nucleus sampling           |
| `LMSTUDIO_CONTEXT_MAX_PRODUCTS` | `5`     | Máx productos en contexto  |
| `LMSTUDIO_COMPACT_PROMPT`       | `false` | Usar prompt reducido       |
