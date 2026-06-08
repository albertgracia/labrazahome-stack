# Informe de Auditoría — STACK-2026-SOMMELIER-MOCK-ENGINE-02

**Fecha:** 2026-06-08
**Objetivo:** Transformar el Sommelier AI v2 de un chat visual a un motor mock inteligente basado en datos reales del catálogo Premium v2.

---

## Intenciones Soportadas

| Caso                 | Patrón de búsqueda                                      | Producto recomendado                                       | Confianza |
| -------------------- | ------------------------------------------------------- | ---------------------------------------------------------- | --------- |
| 1 — Vino para carnes | "vino" + "carne"/"chuletón"/"cordero"/"ternera"/"cerdo" | Reserva del Alto Ebro o Garnacha de Altura (aleatorio)     | 92%       |
| 2 — Quesos           | "queso"/"quesos"                                        | Vino del catálogo con maridaje para queso                  | 88%       |
| 3 — Aceite           | "aceite"/"aove"                                         | Arbequina Temprana o Coupage de Sierra (aleatorio)         | 90%       |
| 4 — Miel             | "miel"/"mieles"                                         | Miel de Brezo Atlántico o Miel de Romero Clara (aleatorio) | 90%       |
| 5 — Regalo           | "regalo"/"pack"/"caja"                                  | Pack Descubrimiento Rioja o Pack Mesa Premium (aleatorio)  | 95%       |
| 6 — Desconocido      | Cualquier otra cosa                                     | Fallback con lista de categorías                           | 30%       |

## Reglas Implementadas

- Detección por palabras clave (keyword matching)
- Selección aleatoria entre productos relevantes para dar variedad
- Datos extraídos del catálogo real (`apps/web/src/data/catalog/products.ts`)
- Ratings Parker/Peñín/Decanter incluidos cuando existen
- Especificaciones del producto (variedad, acidez, crianza) incluidas en la respuesta
- Maridajes extraídos del campo `pairing` del producto

## Productos Utilizados

| Slug                        | Categoría | Uso                          |
| --------------------------- | --------- | ---------------------------- |
| `reserva-del-alto-ebro`     | vinos     | Carnes rojas                 |
| `garnacha-de-altura`        | vinos     | Carnes rojas                 |
| `blanco-de-viura-seleccion` | vinos     | Quesos (a través de pairing) |
| `arbequina-temprana`        | aceites   | Aceite                       |
| `coupage-de-sierra`         | aceites   | Aceite                       |
| `miel-de-brezo-atlantico`   | mieles    | Miel                         |
| `miel-de-romero-clara`      | mieles    | Miel                         |
| `pack-descubrimiento-rioja` | packs     | Regalo                       |
| `pack-mesa-premium`         | packs     | Regalo                       |

## Archivos Modificados

| Archivo                                               | Cambio                                                                                                         |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `apps/web/src/types/sommelier.ts`                     | Añadidos tipos `Recommendation`, `Pairing`, extendido `ChatMessage` con campos opcionales                      |
| `apps/web/src/data/sommelier/mockResponses.ts`        | Rewrite completo: 6 casos de intención, datos reales del catálogo, selección aleatoria, respuesta estructurada |
| `apps/web/src/data/sommelier/context.ts`              | Eliminada dependencia de `getMockProductContext`, usa `getProductBySlug` directamente                          |
| `apps/web/src/components/sommelier/SommelierChat.tsx` | Integración de `generateMockResponse`, renderizado de `RecommendationCard` y `PairingSuggestion` por mensaje   |

## Limitaciones

- Detección por palabras clave (no NLP). Frases complejas pueden caer en fallback.
- Selección aleatoria entre productos de la misma categoría; no hay personalización real.
- Las respuestas son simuladas (isMock: true). No hay conexión a IA.
- Los ratings mostrados son mock (isMock: true).
- No se genera ficha de producto completa en la card (solo nombre, categoría, razón, confianza).
- El fallback muestra categorías pero no permite navegación directa.

## Validaciones

| Comando                       | Resultado            |
| ----------------------------- | -------------------- |
| `pnpm format`                 | ✅ PASS              |
| `pnpm --filter web typecheck` | ✅ PASS              |
| `pnpm --filter web build`     | ✅ PASS (22 páginas) |

## Siguiente Fase Recomendada

No hay fase siguiente definida. El Sommelier AI v2 alcanza el estado MVP completo:

- UI Premium ✅
- Mock Engine Inteligente ✅
- Integración con catálogo ✅
- Recomendaciones y maridajes visuales ✅

Próximo paso posible: STACK-2026-SOMMELIER-CATALOG-SYNC-01 (sincronización automática entre datos del catálogo y motor mock).
