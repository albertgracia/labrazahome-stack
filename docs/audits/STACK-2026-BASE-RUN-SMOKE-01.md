# Stack 2026 - Base Smoke Validation

## Fecha

2026-06-07

## Objetivo

Validar en local que la base recién creada arranca correctamente antes de añadir AstroWind, Vercel o nuevas capas.

## Comandos ejecutados

| Paso | Comando                       | Resultado                                                     |
| ---- | ----------------------------- | ------------------------------------------------------------- |
| 1    | `git status`                  | clean                                                         |
| 2    | `pnpm db:up`                  | Container started                                             |
| 3    | `pnpm db:generate`            | Prisma Client v6.19.3 generated                               |
| 4    | `pnpm db:migrate`             | Already in sync, no pending migrations                        |
| 5    | API smoke test (Node inline)  | `GET /healthz` → 200, `GET /api/v1/status` → 200              |
| 6    | Frontend build + preview test | `GET /` → 200, Tailwind CSS compilado, React Counter incluido |
| 7    | Concurrent API + Frontend     | Ambos servidores respondiendo simultáneamente                 |
| 8    | `pnpm db:down`                | Container stopped and removed                                 |
| 9    | `pnpm check`                  | PASS (lint + typecheck + build)                               |

## Endpoints probados

### API

```
GET http://localhost:8080/healthz
→ 200 {"status":"OK","timestamp":"..."}

GET http://localhost:8080/api/v1/status
→ 200 {"service":"stack-2026-api","status":"running","version":"1.0.0","timestamp":"..."}
```

### Frontend

```
GET http://localhost:4321/
→ 200 HTML con:
  - Título: "Stack 2026 — Home"
  - Tailwind CSS v4.3.0 compilado (10.8 KB)
  - Componente React Counter incluido
  - Layout con navegación y footer
```

## Resultados

### DB validada

Sí — PostgreSQL 17 en Docker, Prisma genera y migra correctamente.

### API validada

Sí — Fastify 5 responde en puerto 8080 con ambos endpoints.

### Frontend validado

Sí — Astro 5 genera página estática con Tailwind CSS v4 y React 19.

### pnpm dev conjunto validado

Sí — Ambos servidores conviven (web en 4321, api en 8080).

## Problemas encontrados

| Problema                                                                   | Solución                                                                                                                 |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `Invoke-WebRequest` de PowerShell falla al conectar con servidores Node.js | Usar `fetch()` nativo de Node.js o `curl.exe` para pruebas HTTP                                                          |
| `Start-Job` de PowerShell no maneja bien procesos hijo largos              | Usar scripts Node inline con `child_process` para pruebas programáticas                                                  |
| CSS no se compilaba en build de Astro                                      | Cambiar `<link>` por `import` de Astro en Layout (`import '../styles/global.css'`) para activar pipeline de Vite+PostCSS |

## Correcciones aplicadas durante el smoke test

- `apps/web/src/layouts/Layout.astro`: cambiado `<link rel="stylesheet">` por `import '../styles/global.css'` de Astro para activar PostCSS pipeline
- `apps/web/src/components/Counter.tsx`: validado que usa `className` (no `class`) para React JSX

## Resultado final

PASS - La base del proyecto Stack 2026 arranca correctamente en local.

- DB: PostgreSQL 17 + Prisma 6 ✅
- API: Fastify 5 + TypeScript ✅
- Frontend: Astro 5 + React 19 + Tailwind CSS v4 ✅
- Concurrencia: web + api simultáneos ✅

## HEAD inicial

`3e29054 fix: complete stack 2026 scaffold validation`

## HEAD final

`3e29054 fix: complete stack 2026 scaffold validation` (misma base, sin cambios estructurales)

## Próximos pasos recomendados

STACK-2026-ASTROWIND-EVALUATION-01
