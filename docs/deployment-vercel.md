# Vercel Deployment Guide — Stack 2026

> **Estado:** Preview desplegado (con fix output directory).
> **Última actualización:** 2026-06-07

## Objetivo

Este documento describe la configuración recomendada para desplegar Stack 2026 en Vercel.

## Configuración en Vercel

| Parámetro            | Valor                                       |
| -------------------- | ------------------------------------------- |
| **Root Directory**   | `apps/web`                                  |
| **Build Command**    | `pnpm build` (por defecto del package.json) |
| **Install Command**  | `pnpm install` (por defecto)                |
| **Output Directory** | `dist` (por defecto de Astro)               |
| **Framework Preset** | Astro (auto-detectado)                      |

> **Importante:** Con Root Directory = `apps/web`, la salida del build es `dist` (relativo a `apps/web`). NO usar `apps/web/dist`.

## Fix aplicado (STACK-2026-VERCEL-OUTPUT-DIR-FIX-01)

### Error original

```
No Output Directory named dist found after the Build completed
```

### Causa

El `vercel.json` en la raíz especificaba `outputDirectory: "apps/web/dist"`. Con Root Directory = `apps/web`, Vercel no lee el `vercel.json` de la raíz, por lo que el output directory se resuelve incorrectamente.

### Solución

- `vercel.json` reducido a `{ "framework": "astro" }` — mínimo, compatible con cualquier Root Directory
- Documentación actualizada para recomendar exclusivamente Root Directory = `apps/web`
- El output directory por defecto de Astro (`dist`) es correcto

## Variables de entorno necesarias

| Variable          | Descripción                              | Ejemplo                                |
| ----------------- | ---------------------------------------- | -------------------------------------- |
| `PUBLIC_SITE_URL` | URL base del sitio (sitemap y canonical) | `https://labrazahome-stack.vercel.app` |

### Comportamiento de PUBLIC_SITE_URL

- Si se define, `astro.config.mjs` la usará como `site` para sitemap y canonical.
- Si **no** se define, el fallback es `https://labrazahome-stack.vercel.app`.
- En local, definir `PUBLIC_SITE_URL=http://localhost:4321` en `.env` para sitemap local.
- En Vercel preview, establecer `PUBLIC_SITE_URL` a la URL de preview automática.
- En producción, establecer `PUBLIC_SITE_URL` al dominio definitivo.

## Cómo crear el proyecto en Vercel

1. Ir a [vercel.com/new](https://vercel.com/new)
2. Importar el repositorio de GitHub
3. Configurar:
   - **Root Directory:** `apps/web`
   - **Framework Preset:** Astro (auto-detectado)
4. Añadir variables de entorno (`PUBLIC_SITE_URL`)
5. Hacer clic en **Deploy**

## Limitaciones actuales

- `apps/api` (Fastify) no está incluido. Para producción se requiere un despliegue separado.
- La base de datos (PostgreSQL + Prisma) no está desplegada. El frontend es completamente estático por ahora.
- El dominio actual es `labrazahome-stack.vercel.app`. Configurar dominio real cuando corresponda.
- No hay redirects, headers de seguridad, ni reglas de rewrites configuradas aún.

## Qué NO desplegar todavía

- No desplegar `apps/api` — requiere configuración serverless o servidor separado.
- No conectar base de datos en producción.
- No configurar dominios personalizados.
- No añadir analytics o monitoreo.

## Checklist previa al primer preview

- [x] Repositorio subido a GitHub
- [x] `pnpm check` pasa localmente
- [ ] Variables de entorno configuradas en Vercel
- [x] Root directory configurado (`apps/web`)
- [ ] `PUBLIC_SITE_URL` apunta a la URL del preview
- [ ] Verificar que el build pasa en Vercel
- [ ] Verificar rutas: `/`, `/about/`, `/docs/`, `/404.html`
- [ ] Verificar sitemap en `/sitemap-index.xml`
- [ ] Verificar favicon en `/favicon.svg`
- [ ] Verificar robots.txt en `/robots.txt`
