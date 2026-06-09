# STACK-2026-QWEN35-9B-SOMMELIER-SMOKE-01

## Validación de `qwen3.5-9b-deepseek-v4-flash` en LM Studio para Sommelier AI v2

### Configuración

| Variable               | Valor                                |
| ---------------------- | ------------------------------------ |
| `SOMMELIER_PROVIDER`   | `lmstudio` (test) / `mock` (default) |
| `LMSTUDIO_BASE_URL`    | `http://192.168.1.250:1234/v1`       |
| `LMSTUDIO_MODEL`       | `qwen3.5-9b-deepseek-v4-flash`        |
| `SOMMELIER_TIMEOUT_MS` | `120000`                             |

### Test 1 — Health

```
GET /v1/models → status: "ok", HTTP 200
Latency: 54ms
Model: qwen3.5-9b-deepseek-v4-flash
Model in list: YES
```

### Tests 2-6 — Chat (con system prompt completo + catálogo mock)

| # | Caso | Intent | Confidence | Recs | Pairs | JSON | Aluc | Latencia | Notas |
|---|------|--------|-----------|------|-------|------|------|----------|-------|
| 2 | "Quiero un vino para carnes rojas" | pairing | 0.85 | 2 | 2 | ✅ | 0 | 71.8s | Válido: Reserva del Alto Ebro, Coupage de Sierra. Slug usa nombre con espacios. |
| 3 | "Busco un aceite premium para regalo" | recommendation | 0.88 | 2 | 2 | ✅ | 0 | 72.4s | Válido: Pack Mesa Premium + AOVE Cosecha Temprana. |
| 4 | "Tengo una tabla de quesos curados" | pairing | 0.85 | 1 | 1 | ✅ | 0 | 71.0s | Válido: Reserva del Alto Ebro + Quesos curados. |
| 5 | "Quiero un pack gourmet para empresa" | recommendation | 0.93 | 2 | 2 | ✅ | 0 | 65.1s | Válido: Pack Mesa Premium, Pack Ibéricos. |
| 6 | "¿Qué producto me recomiendas?" | recommendation | 0.89 | 3 | 0 | ✅ | 0 | 77.5s | Válido: Reserva del Alto Ebro, Coupage de Sierra, Miel de Romero Clara. |

### Hallazgos Críticos

**1. Contenido vacío intermitente (⚠️ GRAVE)**
- 2/5 tests devolvieron contenido vacío en el primer intento
- En retry, ambos OK (intermitente, no sistemático)
- Posible causa: contención en LM Studio server o timeout parcial

**2. Latencia elevada (~71s promedio)**
- 71s vs Gemma ~15-30s vs Mock ~0.5s
- Inviable para uso en tiempo real sin optimización

**3. Formato de slug incorrecto**
- El modelo usa el nombre del producto como slug: `"Reserva del Alto Ebro"` en vez de `"reserva-del-alto-ebro"`
- `extractJSON()` parsea OK pero el contrato espera slugs normalizados
- El mock provider no valida slugs; en integración real rompería referencias

**4. Cero alucinaciones de catálogo** (✅ EXCELENTE)
- Ningún producto inventado en los 5 tests
- Usa consistentemente productos del catálogo mock
- Mejora significativa vs Gemma que alucinaba catálogo

**5. Sin precios, stock ni claims restringidos** (✅)
- Cumple reglas de guardrails en todas las respuestas

### Fallback Test

```
LMSTUDIO_BASE_URL=http://127.0.0.1:9999/v1
→ Expected error: fetch failed
→ Fallback trigger: OK
```

Fallback chain funciona correctamente.

### Comparativa de Modelos

| Métrica | Llama 1B | Gemma 4B | Qwen 3.5 9B |
|---------|----------|----------|--------------|
| Health | ✅ 22ms | ✅ 22ms | ✅ 54ms |
| JSON válido | ❌ FAIL | ❌ FAIL (fences) | ✅ PASS (3/5 1er intento, 5/5 retry) |
| Latencia chat | ~5s | ~15-30s | ~71s |
| Alucinaciones catálogo | Alta | Media (dice "no aceites") | **0** |
| Confidence promedio | 0.3 | 0.4-0.85 | **0.88** |
| Recomendaciones útiles | 0/4 | 1/4 | **10/10** |
| Maridajes | 0 | 0 | **7** |
| Calidad respuesta | Mala | Regular | **Buena** |
| Precios/stock en respuestas | Sí | No | No |
| Fallback | ✅ | ✅ | ✅ |

### Métricas Consolidadas

```
Health:          ✅ 54ms
JSON 1er intento: ⚠️ 3/5 (60%)
JSON con retry:   ✅ 5/5 (100%)
Alucinaciones:    ✅ 0 en 10 recomendaciones, 0 en 7 maridajes
Confianza avg:    ✅ 0.88
Latencia avg:     ⚠️ 71s (max 77s, min 65s)
Slug contrato:    ⚠️ Usa nombre con espacios en vez de slug
Fallback:         ✅ OK
Precios/stock:    ✅ 0 incidencias
```

### Decisión

**RESULTADO: PARTIAL**

| Criterio | Peso | Resultado |
|----------|------|-----------|
| JSON válido | Crítico | ✅ PASS (con retry) |
| Confidence > 0.8 | Alto | ✅ 0.88 avg |
| Recommendations > 0 | Alto | ✅ 2.0 avg |
| Pairings > 0 | Medio | ✅ 1.4 avg |
| Alucinaciones | Crítico | ✅ 0 |
| Latencia razonable | Alto | ❌ 71s — demasiado lento |
| Intermitencia | Crítico | ❌ 40% fail rate 1er intento |
| Slug formato | Medio | ⚠️ Nombre en vez de slug |

**No activar LM Studio en producción.**

### Recomendación

1. **Qwen 3.5 9B es el mejor modelo testado hasta ahora** en calidad de respuesta y fidelidad al catálogo
2. La latencia (~71s) y la intermitencia (40% fail rate) lo hacen **inviable para uso en tiempo real**
3. Posibles mejoras:
   - Probar `max_tokens: 512` para reducir latencia
   - Probar `temperature: 0.5` para más consistencia
   - Verificar si el modelo necesita warm-up (primera request más lenta)
   - Evaluar si LM Studio en esta máquina tiene recursos suficientes (9B params)
4. **Siguiente paso recomendado**: Probar `qwen2.5-7b-instruct` o `llama-3.1-8b-instruct` si están disponibles; si no, optimizar Qwen 3.5 (reducir system prompt, batch de warm-up)

### Archivos Modificados

| Archivo | Cambio |
|---------|--------|
| `docs/audits/STACK-2026-QWEN35-9B-SOMMELIER-SMOKE-01.md` | Creación de este informe |

### Scripts de Test

Los scripts de test utilizados quedan en `C:\Users\leobc\AppData\Local\Temp\opencode/` para referencia.
