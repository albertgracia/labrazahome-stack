# STACK-2026-VERCEL-PREVIEW-READINESS-01

**Phase:** Vercel Preview Readiness  
**Date:** 2026-06-07  
**From:** 7e18b72 (seo and content foundation)

---

## Objective

Prepare the project for a future Vercel preview deployment without deploying yet.

## Initial State

| Check            | Value     |
| ---------------- | --------- |
| HEAD             | `7e18b72` |
| git status       | clean     |
| Astro version    | 6.4.4     |
| React version    | 19        |
| Tailwind version | 4.3.0     |
| pnpm check       | PASS      |

## Configuration Audit

### Detected: Root

| File                  | Key Finding                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------------- |
| `package.json`        | Scripts use `pnpm --filter` pattern. `build` runs `pnpm -r build`. No Vercel-specific config. |
| `pnpm-workspace.yaml` | Workspaces: `apps/*`, `packages/*`. AllowBuilds for prisma, esbuild, sharp.                   |
| `.gitignore`          | `.env`, `.env.local`, `.env.*.local` ignored. `dist/` ignored. Correct.                       |
| `.env.example`        | Contains `DATABASE_URL`, `API_PORT`, `WEB_PORT`. Missing `PUBLIC_SITE_URL`.                   |
| `.env`                | Only `DATABASE_URL`. Used locally.                                                            |

### Detected: apps/web

| File               | Key Finding                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| `package.json`     | `build: astro build`, `typecheck: tsc --noEmit`. Deps: astro, react, sitemap, tailwind.                    |
| `astro.config.mjs` | `site: "https://stack-2026.vercel.app"` (hardcoded). `output: "static"`. Has react + sitemap integrations. |
| `tsconfig.json`    | Extends `../../tsconfig.base.json`. jsx: react-jsx. types: astro/client.                                   |
| `src/pages/`       | 4 routes: `/`, `/about/`, `/docs/`, `/404`.                                                                |

### Vercel Readiness Gaps

| Gap                                  | Impact                                | Action                                       |
| ------------------------------------ | ------------------------------------- | -------------------------------------------- |
| No `vercel.json`                     | Sin configuración para monorepo       | Crear `vercel.json` con build/install/output |
| `site` hardcoded                     | Sitemap con URL incorrecta en preview | Usar `process.env.PUBLIC_SITE_URL`           |
| `.env.example` sin `PUBLIC_SITE_URL` | Documentación incompleta              | Añadir entrada al ejemplo                    |
| No hay guía de deploy                | Despliegue manual propenso a error    | Crear `docs/deployment-vercel.md`            |

## Changes Applied

### 1. `vercel.json` (root)

Created with recommended monorepo configuration:

```json
{
  "buildCommand": "pnpm --filter web build",
  "installCommand": "pnpm install",
  "framework": "astro",
  "outputDirectory": "apps/web/dist"
}
```

### 2. `apps/web/astro.config.mjs`

`site` changed from hardcoded to dynamic:

```js
const site = process.env.PUBLIC_SITE_URL || "https://stack-2026.vercel.app";
```

This allows the sitemap and canonical URLs to adapt to Vercel preview URLs.

### 3. `.env.example`

Added `PUBLIC_SITE_URL="http://localhost:4321"` for local development.

### 4. `docs/deployment-vercel.md`

Created with:

- Objetivo
- Configuración recomendada (Opción A: Root Directory = `apps/web`, Opción B: `vercel.json`)
- Variables de entorno necesarias
- Comportamiento de `PUBLIC_SITE_URL`
- Cómo crear el proyecto en Vercel
- Limitaciones actuales
- Checklist previa al primer preview

## Vercel Recommended Configuration

```json
{
  "buildCommand": "pnpm --filter web build",
  "installCommand": "pnpm install",
  "framework": "astro",
  "outputDirectory": "apps/web/dist"
}
```

**Alternative (cleaner):** Root Directory = `apps/web` in Vercel UI, then:

- Build Command: `pnpm build` (default from apps/web/package.json)
- Output Directory: `dist` (default)

## Environment Variables Required

| Variable          | Purpose                                     | Local                   | Vercel Preview     | Production        |
| ----------------- | ------------------------------------------- | ----------------------- | ------------------ | ----------------- |
| `PUBLIC_SITE_URL` | Override Astro `site` for sitemap/canonical | `http://localhost:4321` | Vercel preview URL | Production domain |

## Validations Executed

| Check      | Command          | Result                   |
| ---------- | ---------------- | ------------------------ |
| Install    | `pnpm install`   | PASS                     |
| Lint       | `pnpm lint`      | PASS                     |
| Typecheck  | `pnpm typecheck` | PASS                     |
| Build      | `pnpm build`     | PASS (4 pages + sitemap) |
| Full check | `pnpm check`     | PASS                     |

## Risks / Pending

- `apps/api` (Fastify) no está considerado para este despliegue. El frontend es 100% estático.
- Base de datos no desplegada. No afecta al frontend estático.
- Dominio `stack-2026.vercel.app` es placeholder. Cambiar antes de producción.
- Sin redirects, headers de seguridad, rewrites ni reglas de edge functions.
- Sin analytics, monitoreo ni logging de producción.
- El `vercel.json` asume root directory = raíz del repo. Si se usa Root Directory = `apps/web` en UI, el `vercel.json` no es necesario y puede ignorarse.

## Next Steps

1. Subir repositorio a GitHub (fase: `STACK-2026-GITHUB-REMOTE-INIT-01`)
2. Conectar repositorio en Vercel
3. Configurar variables de entorno en Vercel
4. Ejecutar primer preview deploy
5. Verificar rutas, sitemap, assets estáticos
6. Preparar `apps/api` para despliegue serverless (fase futura)
