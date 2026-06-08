# STACK-2026-LMSTUDIO-GEMMA-MODEL-SMOKE-01

## Validación de google/gemma-4-e4b en LM Studio para Sommelier AI v2

### Configuración

| Variable               | Valor                                |
| ---------------------- | ------------------------------------ |
| `SOMMELIER_PROVIDER`   | `lmstudio` (test) / `mock` (default) |
| `LMSTUDIO_BASE_URL`    | `http://192.168.1.250:1234/v1`       |
| `LMSTUDIO_MODEL`       | `google/gemma-4-e4b`                 |
| `SOMMELIER_TIMEOUT_MS` | `60000`                              |

### Resultados Health

```
GET /v1/models → status: "ok", latencyMs: 22
Model: google/gemma-4-e4b
```

### Casos Chat Testados

| Caso                                | Intent  | Confidence | Recs | Pairs | JSON Válido | Observaciones                                                     |
| ----------------------------------- | ------- | ---------- | ---- | ----- | ----------- | ----------------------------------------------------------------- |
| "Quiero un vino para carnes rojas"  | general | 0.4        | 0    | 0     | ❌          | Output: `\`\`\`json { ... } \`\`\`` — parser falla                |
| "Recomiendame un aceite premium"    | general | 0.85       | 1    | 0     | ⚠️          | Dice "no disponemos de aceites" (FALSO: catálogo tiene 2 aceites) |
| "Busco un regalo gastronomico"      | general | 0.4        | 0    | 0     | ❌          | Output: `\`\`\`json { ... } \`\`\`` — parser falla                |
| "Tengo una cena con quesos curados" | timeout | —          | —    | —     | —           | Timeout 120s                                                      |

### Análisis de Calidad

**Lo bueno:**

- El modelo **intenta generar JSON estructurado** (mejora vs llama-3.2-1b)
- Confidence 0.85 en caso aceite (aunque info incorrecta)
- Respuestas en español, tono adecuado

**Lo malo:**

- JSON envuelto en **markdown fences** `\`\`\`json ... \`\`\``→`extractJSON()` falla
- **Alucina estado del catálogo**: dice "no aceites" cuando hay 2 aceites en mockCatalog
- Confidence baja (0.4) en 3/4 casos
- Timeout en caso quesos (>120s)
- 0 recomendaciones útiles en 3/4 casos

### Fallback Test

```
LMSTUDIO_BASE_URL=http://127.0.0.1:9999/v1
→ Expected error: LMStudioProvider: fetch failed
→ En SommelierService: catch → MockProvider → fallbackUsed: true
```

Fallback chain **funciona correctamente**.

### Matriz de Modelos (actualizada)

| Modelo                  | Health | Latencia | JSON Válido               | Calidad Respuesta           | Recomendado          |
| ----------------------- | ------ | -------- | ------------------------- | --------------------------- | -------------------- |
| `llama-3.2-1b-instruct` | ✅ OK  | 22ms     | ❌ FAIL                   | Texto plano, sin estructura | ❌ No                |
| `google/gemma-4-e4b`    | ✅ OK  | 22ms     | ❌ FAIL (markdown fences) | Parcial, alucina catálogo   | ⚠️ Con ajuste parser |

### Decisión

**RESULTADO: PARTIAL**

- Health: PASS
- Fallback: PASS
- JSON estructurado: FAIL (parser no maneja markdown fences)
- Calidad respuesta: INSUFICIENTE (alucina catálogo, confidence baja, timeout)

**No activar LM Studio en producción.**

**Recomendación:**

1. Si se usa Gemma, ajustar `extractJSON()` para strippear `\`\`\`json`y`\`\`\``
2. Probar modelo ≥7B instruct puro (ej. `qwen2.5-7b-instruct`, `llama-3.1-8b-instruct`)
3. Mantener `SOMMELIER_PROVIDER=mock` como default

### Validaciones

```
pnpm --filter api typecheck  → PASS
pnpm --filter api build      → PASS
pnpm check                   → PASS
```

### Archivos Actualizados

- `docs/architecture/lmstudio-provider.md` (matriz modelos)
- `docs/audits/STACK-2026-LMSTUDIO-GEMMA-MODEL-SMOKE-01.md` (este)
