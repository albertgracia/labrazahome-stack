# Vercel Deployment Guide — Stack 2026

> **Estado:** Preparación para preview. Aún no desplegado.
> **Última actualización:** 2026-06-07

## Objetivo

Este documento describe la configuración recomendada para desplegar Stack 2026 en Vercel. Cubre tanto el preview como el despliegue a producción futuro.

## Configuración recomendada en Vercel

### Opción A (recomendada) — Root directory en UI

| Parámetro            | Valor                                                 |
| -------------------- | ----------------------------------------------------- |
| **Root Directory**   | `apps/web`                                            |
| **Build Command**    | `pnpm build` (se hereda del package.json de apps/web) |
| **Install Command**  | `pnpm install` (por defecto)                          |
| **Output Directory** | `dist` (por defecto de Astro)                         |
| **Framework Preset** | Astro (auto-detectado)                                |

### Opción B — `vercel.json` en raíz del repositorio

El archivo `vercel.json` en la raíz del proyecto contiene esta configuración:

```json
{
  "buildCommand": "pnpm --filter web build",
  "installCommand": "pnpm install",
  "framework": "astro",
  "outputDirectory": "apps/web/dist"
}
```

Esta configuración permite que el Root Directory sea la raíz del repositorio.

> **Recomendación:** Usar Opción A (Root Directory = `apps/web` en UI de Vercel) por ser más simple. El `vercel.json` existe como referencia y fallback.

## Variables de entorno necesarias

| Variable          | Descripción                                     | Ejemplo                         |
| ----------------- | ----------------------------------------------- | ------------------------------- |
| `PUBLIC_SITE_URL` | URL base del sitio (afecta sitemap y canonical) | `https://stack-2026.vercel.app` |

### Comportamiento de PUBLIC_SITE_URL

- Si se define, `astro.config.mjs` la usará como `site` para sitemap y canonical.
- Si **no** se define, el fallback es `https://stack-2026.vercel.app`.
- En local, definir `PUBLIC_SITE_URL=http://localhost:4321` en `.env` para sitemap local.
- En Vercel preview, establecer `PUBLIC_SITE_URL` a la URL de preview automática de Vercel.
- En producción, establecer `PUBLIC_SITE_URL` al dominio definitivo.

## Cómo crear el proyecto en Vercel

Sigue estos pasos cuando estés listo para el preview:

1. Ir a [vercel.com/new](https://vercel.com/new)
2. Importar el repositorio de GitHub
3. Configurar:
   - **Root Directory:** `apps/web` (Opción A) o dejar en `/` si se usa `vercel.json`
   - **Build Command:** se auto-detecta desde la configuración
   - **Output Directory:** se auto-detecta
4. Añadir variables de entorno (`PUBLIC_SITE_URL`)
5. Hacer clic en **Deploy**

## Limitaciones actuales

- `apps/api` (Fastify) no está incluido en esta configuración. Para producción se requiere un despliegue separado o re-evaluar serverless functions.
- La base de datos (PostgreSQL + Prisma) no está desplegada. El frontend es completamente estático por ahora.
- El dominio `stack-2026.vercel.app` es un placeholder. Configurar dominio real cuando corresponda.
- No hay redirects, headers de seguridad, ni reglas de rewrites configuradas aún.

## Qué NO desplegar todavía

- No desplegar `apps/api` — requiere configuración serverless o servidor separado.
- No conectar base de datos en producción.
- No configurar dominios personalizados.
- No añadir analytics o monitoreo.

## Checklist previa al primer preview

- [ ] Repositorio subido a GitHub
- [ ] `pnpm check` pasa localmente
- [ ] Variables de entorno configuradas en Vercel
- [ ] Root directory configurado (`apps/web`)
- [ ] `PUBLIC_SITE_URL` apunta a la URL del preview
- [ ] Verificar que el build pasa en Vercel
- [ ] Verificar rutas: `/`, `/about/`, `/docs/`, `/404.html`
- [ ] Verificar sitemap en `/sitemap-index.xml`
- [ ] Verificar favicon en `/favicon.svg`
- [ ] Verificar robots.txt en `/robots.txt`
