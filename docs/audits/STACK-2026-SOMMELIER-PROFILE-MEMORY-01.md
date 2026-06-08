# STACK-2026-SOMMELIER-PROFILE-MEMORY-01 — Sommelier Local Profile Memory

## Objective

Add local profile memory to Sommelier AI v2 so the experience adapts to user type during the session and across visits — all frontend-only, no backend.

## Changes

- **`apps/web/src/data/sommelier/profiles.ts`** (new) — `SommelierProfileConfig` interface defining 4 profiles with tone, quick prompts, disclaimer, and response prefix
- **`apps/web/src/types/sommelier.ts`** — Profile type updated: `"private" | "b2b" | "producer" | "admin"` (renamed `supplier` → `producer`, added `admin`)
- **`apps/web/src/components/sommelier/SommelierModeSelector.tsx`** — Now shows all 4 profiles, accepts `isSaved` and `onClear` props, shows reset button
- **`apps/web/src/components/sommelier/SommelierChat.tsx`** — Loads profile from `localStorage` on mount, saves on change, passes profile to `processConversation`, shows memory indicator bar, renders dynamic quick prompts from current profile config
- **`apps/web/src/data/sommelier/mockResponses.ts`** — Accepts optional `profile` parameter, applies `applyProfilePrefix` to all answers for tone adaptation
- **`apps/web/src/data/sommelier/flows.ts`** — Passes `profile` through to `generateMockResponse` in all paths (direct, flow completion)

## localStorage

- **Key:** `labrazahome:sommelier-profile`
- **Data saved:** Only `profileType` (string: `"private"`, `"b2b"`, `"producer"`, or `"admin"`)
- **Data NOT saved:** No name, email, conversations, personal data, or sensitive preferences

## Profile Behavior

| Profile            | Tone                     | Response Prefix                                  | Quick Prompts                                                                                |
| ------------------ | ------------------------ | ------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Cliente Privado    | Cercano, gastronómico    | _(none)_                                         | Vino para cena, Regalo premium, Miel para desayuno, Aceite para cocina diaria                |
| Profesional B2B    | Comercial, operativo     | "Desde una perspectiva profesional, "            | Vino para carta, Pack para hotel, Aceites tienda, Menú degustación                           |
| Proveedor / bodega | Editorial, ficha técnica | "Como ficha editorial, destacaría que "          | Cómo presentar este vino, Qué argumentos destacar, Mejorar ficha, Maridajes comunicar        |
| Admin interno      | Supervisión, auditoría   | "Para revisión interna, conviene comprobar que " | Revisar ficha incompleta, Validar recomendación, Detectar sin maridaje, Revisar puntuaciones |

## Validations

- `pnpm format` — ✅ all files pass
- `pnpm --filter web typecheck` — ✅ no errors
- `pnpm --filter web build` — ✅ 24 pages built
- `pnpm check` — ✅ lint + typecheck + build all pass

## Limitations

- Pure frontend — cleared on browser data wipe
- No auth — anyone can change profile
- Tone adaptation is prefix-only; full response rewrites would require AI integration
- Quick prompts are suggestions, not enforced — user can type anything

## Next Steps

- STACK-2026-LMSTUDIO-PROVIDER-ARCHITECTURE-01
