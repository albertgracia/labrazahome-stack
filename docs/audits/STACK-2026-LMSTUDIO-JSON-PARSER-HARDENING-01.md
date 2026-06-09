# STACK-2026-LMSTUDIO-JSON-PARSER-HARDENING-01

## Endurecimiento del Parser JSON para LMStudioSommelierProvider

### Problema Detectado

Modelos como `google/gemma-4-e4b` y otros devuelven JSON estructurado **envuelto en markdown fences**:

````markdown
```json
{
  "answer": "...",
  "intent": "recommendation",
  ...
}
```
````

````

El parser anterior (`extractJSON`) solo buscaba el primer `{...}` con regex simple, fallando al no encontrar el objeto completo debido a los fences.

### Solución Implementada

**Archivo:** `apps/api/src/modules/sommelier/providers/lmstudio.provider.ts`

```typescript
function extractJSON(text: string): LLMResponseStructure | null {
  const trimmed = text.trim();

  // 1. JSON puro (sin fences)
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    try {
      return JSON.parse(trimmed) as LLMResponseStructure;
    } catch {
    }
  }

  // 2. Markdown fences: ```json ... ``` o ``` ... ```
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenceMatch) {
    const inner = fenceMatch[1].trim();
    try {
      return JSON.parse(inner) as LLMResponseStructure;
    } catch {
    }
  }

  // 3. Primer objeto JSON balanceado en texto libre
  let depth = 0;
  let start = -1;
  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if (ch === "{") {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === "}") {
      if (depth > 0) {
        depth--;
        if (depth === 0 && start !== -1) {
          const candidate = trimmed.slice(start, i + 1);
          try {
            return JSON.parse(candidate) as LLMResponseStructure;
          } catch {
            start = -1;
          }
        }
      }
    }
  }

  return null;
}
````

### Formatos Soportados

| Formato                  | Ejemplo                | Soportado              |
| ------------------------ | ---------------------- | ---------------------- |
| JSON puro                | `{"answer":"..."}`     | ✅                     |
| Fence `json`             | `json {...}`           | ✅                     |
| Fence genérico           | `{...}`                | ✅                     |
| Texto + JSON             | `Aquí está: {...} fin` | ✅                     |
| JSON con saltos de línea | multilinea             | ✅                     |
| Array raíz               | `[{...}]`              | ❌ (preferimos objeto) |

### Smoke Tests con Gemma (`google/gemma-4-e4b`)

Config: `LMSTUDIO_BASE_URL=http://192.168.1.250:1234/v1`, `timeout=120000ms`

| Caso                     | JSON Válido | Intent         | Confidence | Recs | Pairs | Warnings        |
| ------------------------ | ----------- | -------------- | ---------- | ---- | ----- | --------------- |
| "vino para carnes rojas" | ✅          | recommendation | 0.97       | 2    | 2     | —               |
| "aceite premium"         | ✅          | general        | 0.90       | 1    | 0     | not_available\* |
| "regalo gastronómico"    | ✅          | general        | 0.75       | 0    | 0     | mock_data       |
| "quesos curados"         | ✅          | recommendation | 0.95       | 2    | 2     | —               |

\* **Alucinación conocida:** Modelo dice "no aceites" pero catálogo tiene 2 aceites (arbequina-temprana, coupege-de-sierra). Warning `not_available` emitido por el modelo, no por el parser.

### Calidad

**Mejoras vs fase anterior:**

- 4/4 casos producen JSON parseable (antes 0/4)
- Intent correcto en 3/4 casos (antes todos `general`)
- Confidence alta (0.75-0.97) vs 0.4
- Recomendaciones y maridajes estructurados presentes

**Limitaciones persistentes (no corregibles por parser):**

- Modelo alucina estado del catálogo (aceites)
- Confidence no refleja realidad factual
- Timeout en casos complejos (>120s en "quesos" antes, ahora OK)

### Fallback Behavior

```bash
LMSTUDIO_BASE_URL=http://127.0.0.1:9999/v1
→ Expected error: LMStudioProvider: fetch failed
→ SommelierService catch → MockProvider → fallbackUsed: true
```

Fallback chain **funciona correctamente**.

### Decisión

**RESULTADO: PASS**

- Parser hardened ✅
- Formatos soportados ✅ (puro, fences json, fences genérico, texto libre)
- Gemma JSON válido ✅ (4/4 casos)
- Calidad estructural ✅ (intent, recs, pairs, confidence)
- Fallback ✅
- Validaciones ✅ (typecheck, build, format, lint)
- **Default sigue siendo `mock`** — no se activó LM Studio en producción

**Limitación conocida:** Parser no corrige alucinaciones del modelo (ej. "no aceites" cuando sí hay). Eso requiere modelo mejor o RAG real, no parche de parser.

### Archivos Modificados

- `apps/api/src/modules/sommelier/providers/lmstudio.provider.ts` — `extractJSON` endurecido
- `docs/architecture/lmstudio-provider.md` — matriz actualizada + nota parser
- `docs/audits/STACK-2026-LMSTUDIO-JSON-PARSER-HARDENING-01.md` — este documento
