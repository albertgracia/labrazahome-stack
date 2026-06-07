# STACK-2026-VERCEL-OUTPUT-DIR-FIX-01

**Phase:** Vercel Output Directory Fix  
**Date:** 2026-06-07  
**From:** 4e067d0 (github remote initialization)

---

## Objective

Fix the first Vercel deploy error:

```
No Output Directory named dist found after the Build completed
```

## Error Analysis

### Real error

Build completes successfully but Vercel cannot locate `dist` output directory.

### Warning descartado

Prisma warning durante `pnpm install` no es relevante — el build pasa correctamente
y el output se genera. El error es de configuración de Vercel, no del build.

### Causa probable

El `vercel.json` en la raíz especificaba `outputDirectory: "apps/web/dist"`.
Con Root Directory configurado como `apps/web` en la UI de Vercel:

- Vercel ignora el `vercel.json` de la raíz (fuera del Root Directory)
- El output directory por defecto `dist` (relativo a `apps/web/`) no se encuentra
  porque el build se ejecuta correctamente pero Vercel no sabe dónde buscar

## Changes Applied

### 1. `vercel.json` (root)

**Before:**

```json
{
  "buildCommand": "pnpm --filter web build",
  "installCommand": "pnpm install",
  "framework": "astro",
  "outputDirectory": "apps/web/dist"
}
```

**After:**

```json
{
  "framework": "astro"
}
```

Configuración mínima que delega en el preset Astro y no interfiere con el
Root Directory configurado en la UI de Vercel.

### 2. `docs/deployment-vercel.md`

- Opción B (`vercel.json` como config principal) eliminada
- Root Directory = `apps/web` ahora es la única opción documentada
- Añadida sección de "Fix aplicado" explicando el error y la solución
- Checklist actualizada

## Final Recommended Configuration

| Parameter                  | Value               |
| -------------------------- | ------------------- |
| Root Directory (Vercel UI) | `apps/web`          |
| Build Command (default)    | `pnpm build`        |
| Install Command (default)  | `pnpm install`      |
| Output Directory (default) | `dist`              |
| Framework                  | Astro (auto-detect) |

## Validations

| Check      | Command                   | Result                   |
| ---------- | ------------------------- | ------------------------ |
| Lint       | `pnpm lint`               | PASS                     |
| Typecheck  | `pnpm typecheck`          | PASS                     |
| Build      | `pnpm --filter web build` | PASS (4 pages + sitemap) |
| Full check | `pnpm check`              | PASS                     |

## Next Steps

Verify the fix works with a new Vercel deploy.
