# STACK-2026-SOMMELIER-CONVERSATION-FLOWS-01

## Status: Done

## Goal
Transform the Sommelier AI from isolated Q&A to guided conversational flows with multi-step discovery.

## Problem
The chat was: `question → answer → end`. No continuity, no discovery, no profiling.

## Solution

### ConversationContext (local memory, no persistence)
```
category: string | null       // vinos | aceites | mieles | packs
step: number                  // current step (1-based)
totalSteps: number            // total steps for this flow
collected: Record<string, string>  // answers collected per field
completed: boolean            // flow finished
```

### Flow Definitions (4 flows)

| Flow | Steps | Fields collected | Final recommendation via |
|---|---|---|---|
| **Vino** | 3 | occasion, foodType, preference | Mock engine with synthetic query |
| **Aceite** | 2 | culinaryUse, intensity | Mock engine with synthetic query |
| **Miel** | 2 | destination, intensity | Mock engine with synthetic query |
| **Regalo** | 2 | recipient, budget | Mock engine with synthetic query |

### Detection Logic
- Vague category mentions (e.g. `"quiero un vino"`, `"aceite"`, `"miel por favor"`) → start flow
- Detailed queries (e.g. `"vino tinto para carnes rojas"`) → direct answer via existing mock engine (confidence >= 0.5)
- Fallback (no flow match, low confidence) → generic fallback response

### UI Changes
- Step indicator bar below header: shows category label, "Paso X de Y", and animated dot progress (indigo for completed, grey for pending)
- Typing indicator text changed from `"Analizando tu consulta..."` to `"Pensando..."`
- Typing delay reduced from 1500ms to 1200ms for smoother feel

### Response Phrasing
- First question prefix: `"Para ayudarte mejor, ..."`
- Middle question: direct (no prefix)
- Last question: `"Una última pregunta: ..."`
- Final recommendation: `"Perfecto, ya tengo suficiente información. Aquí va mi recomendación:\n\n..."`

### Synthetic Query Building
Each flow constructs a synthetic query from collected fields and delegates to `generateMockResponse`:
- vino: `vino para {foodType}`
- aceite: `aceite de oliva {intensity}`
- miel: `miel {destination}`
- packs: `pack regalo {recipient}`

### Files Changed
```
M apps/web/src/types/sommelier.ts        + ConversationContext, ConversationResult, FlowResultType
A apps/web/src/data/sommelier/flows.ts   + processConversation, detectCategory, flow definitions
M apps/web/src/components/sommelier/SommelierChat.tsx  + flow state, step indicator, natural phrasing
A docs/audits/STACK-2026-SOMMELIER-CONVERSATION-FLOWS-01.md
```

### Conversation Examples

**Flow Vino:**
```
User:  "Quiero un vino"
Asst:  "Para ayudarte mejor, ¿es para una ocasión especial o para consumo diario?"  [Paso 1 de 3]
User:  "Cena con amigos"
Asst:  "¿Habrá carnes, pescado o menú variado?"  [Paso 2 de 3]
User:  "Carnes rojas"
Asst:  "Una última pregunta: ¿Prefieres tinto, blanco o te dejas recomendar?"  [Paso 3 de 3]
User:  "Tinto"
Asst:  "Perfecto, ya tengo suficiente información. Aquí va mi recomendación:\n\nTe recomiendo Reserva del Alto Ebro..."  [✅ completa]
```

**Flow Aceite:**
```
User:  "Aceite"
Asst:  "Para ayudarte mejor, ¿para qué uso culinario lo necesitas?..."  [Paso 1 de 2]
User:  "Aliños"
Asst:  "Una última pregunta: ¿Prefieres un aceite suave y afrutado o uno más intenso?"  [Paso 2 de 2]
User:  "Suave"
Asst:  "Perfecto... Te recomiendo Arbequina Temprana..."  [✅ completa]
```

**Flow Miel:**
```
User:  "Miel"
Asst:  "Para ayudarte mejor, ¿cómo piensas consumirla?..."  [Paso 1 de 2]
User:  "Desayuno"
Asst:  "Una última pregunta: ¿Prefieres una miel suave y dulce o una más intensa?"  [Paso 2 de 2]
User:  "Suave"
Asst:  "Perfecto... Te recomiendo Miel de Romero Clara..."  [✅ completa]
```

**Flow Regalo:**
```
User:  "Un regalo"
Asst:  "Para ayudarte mejor, ¿para quién es el regalo?"  [Paso 1 de 2]
User:  "Para mis padres"
Asst:  "Una última pregunta: ¿Qué presupuesto tienes en mente?"  [Paso 2 de 2]
User:  "Premium"
Asst:  "Perfecto... Te recomiendo Pack Mesa Premium..."  [✅ completa]
```

### Direct Answer (no flow) Example:
```
User:  "Vino tinto para chuletón"
Asst:  "Te recomiendo Garnacha de Altura..."  [directa, confianza 0.92]
```

### Limitations
- Flow questions are static (no variation)
- No extraction of pre-supplied info (if user says "vino tinto para carne" it goes direct; but "quiero un vino tinto" also triggers flow and asks occasion — could skip in future)
- Synthetic queries are simplified (only 1-2 fields passed to mock engine)
- No multi-turn resets — user must send new message after completion to start fresh
- No undo/back in flow

## Verification
- `pnpm format` — all files pass
- `pnpm --filter web typecheck` — passes
- `pnpm --filter web build` — 22 pages, 2.18s
- `pnpm check` — lint + typecheck + build, all green

## Commit
```
feat(web): add sommelier conversation flows
```
