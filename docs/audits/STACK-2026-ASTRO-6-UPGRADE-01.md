# Stack 2026 - Astro 6 Upgrade

## Fecha

2026-06-07

## Objetivo

Actualizar apps/web de Astro 5 a Astro 6 antes de iniciar el rediseño visual, manteniendo la base limpia y validada.

## Versiones

| Paquete                | Antes   | Después               |
| ---------------------- | ------- | --------------------- |
| `astro`                | 5.18.2  | **6.4.4**             |
| `@astrojs/react`       | 4.4.2   | **5.0.7**             |
| `react`                | ^19.0.0 | ^19.0.0 (sin cambios) |
| `tailwindcss`          | 4.3.0   | 4.3.0 (sin cambios)   |
| `@tailwindcss/postcss` | ^4.3.0  | ^4.3.0 (sin cambios)  |
| `typescript`           | 5.9.3   | 5.9.3 (sin cambios)   |

## Archivos modificados

| Archivo                 | Cambio                                                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/web/package.json` | `astro: ^5.0.0 → ^6.4.4`, `@astrojs/react: ^4.0.0 → ^5.0.7`. Eliminados `eslint`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser` (sin usar). |
| `pnpm-lock.yaml`        | Actualizado automáticamente                                                                                                                                   |

## Archivos no modificados

- `astro.config.mjs` — Sin cambios (config minimal compatible con Astro 6)
- `tsconfig.json` — Sin cambios (`astro/client` types compatibles)
- `src/layouts/Layout.astro` — Sin cambios
- `src/styles/global.css` — Sin cambios
- `postcss.config.mjs` — Sin cambios

## Incompatibilidades encontradas

Ninguna. La migración de Astro 5 → 6 fue directa:

- No usamos Content Collections (que cambió de API en Astro 6)
- No usamos `astro:assets` deprecado
- No usamos middlewares
- No usamos Server Islands
- No usamos `defineConfig` con propiedades deprecadas

El scaffold minimal de apps/web no tenía características afectadas por los breaking changes de Astro 6.

## Correcciones aplicadas

- Limpieza de dependencias ESLint no utilizadas en `apps/web/package.json`
- Formateo con Prettier tras actualizar package.json

## Validaciones ejecutadas

| Comando                                        | Resultado |
| ---------------------------------------------- | --------- |
| `pnpm install`                                 | ✅        |
| `pnpm --filter web exec astro --version`       | ✅ v6.4.4 |
| `pnpm --filter web typecheck`                  | ✅        |
| `pnpm --filter web build`                      | ✅        |
| `pnpm check` (lint + typecheck + build global) | ✅        |

## Smoke local

| Prueba                            | Resultado   |
| --------------------------------- | ----------- |
| `pnpm dev` arranca                | ✅          |
| `GET http://localhost:4321/`      | ✅ HTTP 200 |
| Heading "Stack 2026" presente     | ✅          |
| Componente React Counter presente | ✅          |
| Estilos Tailwind CSS aplicados    | ✅          |

## Riesgos / Pending

- `@astrojs/check` no está instalado (no se usaba antes). Si se necesita en el futuro, instalar con `pnpm --filter web add -D @astrojs/check`.
- La toolchain ESLint fue removida de apps/web (no había configuración). Si se necesita linting específico para Astro, considerar `eslint-plugin-astro`.
- Content Collections API de Astro 6 cambió. Si se implementan en el futuro, consultar la documentación de migración.

## Próximos pasos

`STACK-2026-WEB-LANDING-ASTROWIND-PATTERNS-01`
