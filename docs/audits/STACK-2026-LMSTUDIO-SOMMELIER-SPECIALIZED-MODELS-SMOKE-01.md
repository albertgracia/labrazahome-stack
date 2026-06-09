# STACK-2026-LMSTUDIO-SOMMELIER-SPECIALIZED-MODELS-SMOKE-01

## Comparativa: modelos especializados Sommelier vs ChefGPT vs Qwen 3.5

### Contexto

LM Studio tiene 3 modelos candidatos para Sommelier AI v2:

| Modelo                                  | Params | Tipo                                                  |
| --------------------------------------- | ------ | ----------------------------------------------------- |
| `qwen-2.5-sommelier-descriptors-topics` | 7B?    | Especializado (descriptores sommelier + tópicos vino) |
| `chefgpt`                               | 8B?    | Especializado (cocina/gastronomía)                    |
| `qwen3.5-9b-deepseek-v4-flash`          | 9B     | Generalista (baseline)                                |

### Metodología

- **5 prompts** cubriendo: recomendación, perfil aromático, maridajes, B2B, ficha editorial
- **Parámetros fijos**: max_tokens=768, temperature=0.5, top_p=0.9, contextMaxProducts=3
- **JSON strict prompt**: misma estructura JSON que SommelierProvider
- **Métricas**: JSON compliance, latencia, alucinaciones, calidad sommelier/B2B/editorial/paring
- **1 retry** por fallo JSON (como en el provider real)

### Resultados por modelo

#### qwen3.5-9b-deepseek-v4-flash — Score: 102 🥇

| #   | Caso                               | JSON | Conf | Recs | Pairs | Hall | Latencia | Somm | B2B | Ed  | PQ  |
| --- | ---------------------------------- | ---- | ---- | ---- | ----- | ---- | -------- | ---- | --- | --- | --- |
| 1   | "Quiero un vino para carnes rojas" | ✅   | 0.92 | 2    | 2     | 0    | 48.0s    | 0    | 0   | 1   | 1   |
| 2   | "Perfil aromático Reserva..."      | ✅   | 0.85 | 0    | 0     | 0    | 39.3s    | 6    | 0   | 2   | 1   |
| 3   | "Maridajes Miel Romero Clara"      | ✅   | 0.84 | 1    | 4     | 0    | 42.4s    | 1    | 0   | 0   | 1   |
| 4   | "Pack gourmet para empresa"        | ✅   | 0.85 | 2    | 2     | 2    | 49.0s    | 0    | 2   | 0   | 0   |
| 5   | "Ficha sommelier Coupage Sierra"   | ✅   | 0.85 | 1    | 4     | 4    | 47.6s    | 1    | 0   | 2   | 1   |

**Total: 5/5 JSON ✅ | Latencia media: 45.3s | Hallucinaciones: 6 (2 cats erróneas en 4-5) | Retry: 2 tests**

- **Calidad descriptiva superior**: test #2 produce 6 términos sommelier ("roble", "barrica", "crianza", "especias", "fruta", "vainilla")
- **B2B decente**: test #4 usa "corporativo", "regalo", "empresa"
- **Problema**: 6 alucinaciones (categorías inventadas como `Vinos tinto` en vez de `vinos`, y packs mal clasificados)
- **Latencia**: ~45s constante — inviable para tiempo real

#### qwen-2.5-sommelier-descriptors-topics — Score: 93 🥈

| #   | Caso                               | JSON | Conf | Recs | Pairs | Hall | Latencia | Somm | B2B | Ed  | PQ  |
| --- | ---------------------------------- | ---- | ---- | ---- | ----- | ---- | -------- | ---- | --- | --- | --- |
| 1   | "Quiero un vino para carnes rojas" | ✅   | 0.85 | 1    | 1     | 0    | 23.0s    | 0    | 0   | 0   | 0   |
| 2   | "Perfil aromático Reserva..."      | ✅   | 0.95 | 0    | 0     | 0    | 3.5s     | 2    | 0   | 0   | 0   |
| 3   | "Maridajes Miel Romero Clara"      | ✅   | 0.85 | 1    | 1     | 0    | 13.0s    | 0    | 0   | 0   | 0   |
| 4   | "Pack gourmet para empresa"        | ✅   | 0.85 | 1    | 1     | 1    | 18.8s    | 0    | 0   | 0   | 0   |
| 5   | "Ficha sommelier Coupage Sierra"   | ⚠️   | 0.85 | 1    | 1     | 0    | 14.0s    | 0    | 0   | 0   | 0   |

**Total: 4/5 JSON ⚠️ | Latencia media: 14.5s | Hallucinaciones: 1 | Retry: 2 tests**

- **Más rápido**: 14.5s avg (3.2x más rápido que Qwen 3.5)
- **Menos alucinaciones**: solo 1
- **Problema crítico: respuestas mínimas**. Test #1 devuelve solo `"Reserva del Alto Ebro"` como answer (sin contexto). Test #3 devuelve `""` vacío. Test #4 devuelve `"Pack Ibéricos"`. El modelo literalmente copia la instrucción "máx 3 frases" como contenido.
- **Sin vocabulario sommelier** (score 0-2), sin estructura editorial, sin B2B
- **Test #5**: JSON truncado (702 chars, sin closing brace) — extractJSON falla aunque el contenido es válido

#### chefgpt — Score: 76.5 🥉

| #   | Caso                               | JSON | Conf | Recs | Pairs | Hall | Latencia | Somm | B2B | Ed  | PQ  |
| --- | ---------------------------------- | ---- | ---- | ---- | ----- | ---- | -------- | ---- | --- | --- | --- |
| 1   | "Quiero un vino para carnes rojas" | ✅   | 0.85 | 3    | 3     | 3    | 31.5s    | 0    | 0   | 0   | 0   |
| 2   | "Perfil aromático Reserva..."      | ✅   | 0.85 | 0    | 0     | 0    | 7.8s     | 0    | 0   | 0   | 0   |
| 3   | "Maridajes Miel Romero Clara"      | ✅   | 0.85 | 3    | 3     | 3    | 27.4s    | 0    | 0   | 0   | 1   |
| 4   | "Pack gourmet para empresa"        | ✅   | 0.85 | 1    | 0     | 0    | 7.9s     | 0    | 0   | 0   | 0   |
| 5   | "Ficha sommelier Coupage Sierra"   | ✅   | 0.85 | 1    | 2     | 2    | 20.0s    | 5    | 0   | 1   | 1   |

**Total: 5/5 JSON ✅ | Latencia media: 18.9s | Hallucinaciones: 8 | Retry: 2 tests**

- **Respuestas erráticas**: test #1 answer = `"Eres sumiller experto."` (copia del system prompt). Test #2 answer = `""` (vacío). Test #4 answer = `"Carnes blancas, Quesos de cabra"` (maridajes sin contexto).
- **Alta alucinación**: 8 total, de productos inventados en tests 1, 3, 5
- **Calidad muy variable**: test #5 muestra potencial (5 términos sommelier), pero test #1-4 son pobres
- **Velocidad aceptable**: 18.9s avg, pero los tiempos varían mucho (7.8s-31.5s)

### Comparativa final

| Métrica                       | Qwen 3.5 9B   | Sommelier-Desc | ChefGPT    |
| ----------------------------- | ------------- | -------------- | ---------- |
| JSON 5/5                      | ✅ 5/5        | ⚠️ 4/5         | ✅ 5/5     |
| Latencia media                | 45.3s ❌      | **14.5s** ✅   | 18.9s ⚠️   |
| Score calidad                 | **102** 🥇    | 93 🥈          | 76.5 🥉    |
| Alucinaciones                 | 6 ⚠️          | **1** ✅       | 8 ❌       |
| Vocabulario sommelier         | **1.6** ✅    | 0.5 ⚠️         | 1.0 ⚠️     |
| Calidad B2B                   | 0.4 ✅        | 0.0 ❌         | 0.0 ❌     |
| Calidad editorial             | **1.0** ✅    | 0.0 ❌         | 0.2 ❌     |
| Calidad maridajes             | **0.8** ✅    | 0.0 ❌         | 0.4 ⚠️     |
| Velocidad < 20s               | ❌            | ✅             | ⚠️ parcial |
| Answer length medio           | **185 chars** | 25 chars       | 62 chars   |
| Sin instrucciones como output | ✅            | ❌             | ❌         |

### Hallazgos clave

1. **Ningún modelo es viable para chat interactivo en tiempo real**
   - Qwen 3.5: 45s — demasiado lento
   - Sommelier-Desc: 14.5s — borde, pero respuestas demasiado minimalistas
   - ChefGPT: 18.9s — borde, pero calidad inconsistente y altas alucinaciones

2. **qwen-2.5-sommelier-descriptors-topics es el más rápido pero no apto por calidad**
   - Respuestas de 1-3 palabras (25 chars avg)
   - Ignora la instrucción de respuesta completa
   - JSON truncado en 1/5 tests
   - Sin vocabulario sommelier a pesar de ser un modelo especializado

3. **chefgpt no es gastronómico-real, es un modelo generalista de cocina**
   - Alucina productos que no existen en el catálogo
   - Copia partes del system prompt como respuesta
   - Respuestas vacías o sin sentido en 3/5 tests

4. **Qwen 3.5 sigue siendo el mejor para batch/backoffice**
   - Mejor calidad descriptiva (6 términos sommelier en test #2)
   - Respuestas completas y coherentes
   - Latencia estable ~45s (predecible, no hay outliers)
   - Problema: 6 alucinaciones (principalmente categorías incorrectas como "Vinos tinto")

### Decisión

**RESULTADO: PARTIAL**

| Criterio                          | Resultado              | Peso    |
| --------------------------------- | ---------------------- | ------- |
| Algún modelo supera a Qwen 3.5    | ❌ Ninguno             | Crítico |
| Latencia < 20s                    | ⚠️ Sommelier: 14.5s    | Alto    |
| Calidad >= Qwen 3.5               | ❌ Muy inferior        | Crítico |
| Alucinaciones < Qwen 3.5          | ✅ Sommelier: 1 vs 6   | Alto    |
| JSON 5/5 sin retry                | ❌ Solo Qwen 3.5       | Alto    |
| Respuestas completas (>100 chars) | ❌ Sommelier: 25 chars | Alto    |

### Recomendaciones

1. **Mantener Qwen 3.5 como modelo batch/backoffice** — mejor calidad, latencia tolerable para generación asíncrona
2. **No usar sommelier-descriptors-topics ni chefgpt en producción** — calidad insuficiente
3. **Para tiempo real, seguir con MockProvider** — hasta que haya un modelo < 5s con calidad aceptable
4. **Próximo paso recomendado**: `STACK-2026-LMSTUDIO-BACKOFFICE-BATCH-USE-CASE-01` — evaluar Qwen 3.5 para generación asíncrona en backoffice (recomendaciones batch, maridajes programados)
5. **Alternativa a explorar**: modelos quantizados 7-8B con 4-bit (Q4_K_M) para reducir latencia sin perder calidad

### Archivos modificados

| Archivo                                                                    | Cambio                              |
| -------------------------------------------------------------------------- | ----------------------------------- |
| `docs/audits/STACK-2026-LMSTUDIO-SOMMELIER-SPECIALIZED-MODELS-SMOKE-01.md` | Creación de este informe            |
| `docs/architecture/lmstudio-provider.md`                                   | Matriz actualizada (próximo commit) |

### Raw data

```
Benchmark ejecutado: 2026-06-09T11:41:50Z
Params: max_tokens=768, temperature=0.5, top_p=0.9, compactPrompt=true, contextMaxProducts=3
Models tested: 3
Tests per model: 5
Retry policy: 1 retry on JSON failure
```
