# Stack 2026 - AstroWind Evaluation

## Fecha

2026-06-07

## Objetivo

Evaluar AstroWind sin integrarlo todavía en el proyecto principal, para decidir si conviene integrarlo, usarlo como referencia, o descartarlo.

## Estado inicial

- HEAD: `63a66b9`
- git status: clean

## Versión / Stack detectado en AstroWind

| Componente      | AstroWind         | apps/web (Stack 2026) |
| --------------- | ----------------- | --------------------- |
| Astro           | **6.4.2**         | 5.18.2                |
| Tailwind CSS    | **4.3.0**         | 4.3.0                 |
| React           | **No usa React**  | React 19              |
| Node requerido  | >=22.12.0         | >=22.0.0              |
| Package manager | npm               | pnpm                  |
| Tipo            | Template completo | Scaffold minimal      |
| Licencia        | MIT               | -                     |

## Estructura AstroWind

```
experiments/astrowind/src/
├── assets/styles/tailwind.css   # CSS-first Tailwind v4 config
├── components/
│   ├── blog/          # Blog: Grid, List, Pagination, Tags, SinglePost
│   ├── common/        # Analytics, Image, Metadata, ToggleTheme, SocialShare
│   ├── ui/            # Button, Form, Headline, WidgetWrapper, Timeline
│   └── widgets/       # Hero, Features, Pricing, FAQs, Footer, Header (22 widgets)
├── data/              # Blog posts (.md/.mdx)
├── layouts/           # Layout, PageLayout, LandingLayout, MarkdownLayout
├── pages/             # index, about, contact, pricing, blog, landing variants
├── utils/             # blog.ts, images.ts, permalinks.ts, frontmatter.ts
├── config.yaml        # Site configuration via YAML
├── content.config.ts  # Content Collections (Astro v6)
├── navigation.ts      # Navigation structure
└── types.d.ts         # TypeScript definitions
```

## Dependencias clave

### Producción

- `astro: ^6.4.2`
- `@astrojs/rss: ^4.0.18` — RSS feed
- `@astrojs/sitemap: ^3.7.3` — Sitemap automático
- `@fontsource-variable/inter: ^5.2.8` — Fuente Inter
- `astro-embed: ^0.13.0` — Embeddings (YouTube, Twitter, etc.)
- `astro-icon: ^1.1.5` — Sistema de iconos SVG
- `astro-seo: ^1.1.0` — SEO metadata
- `unpic: ^4.2.2` — Imágenes remotas optimizadas

### Desarrollo

- `@astrojs/mdx: ^6.0.1` — Soporte MDX
- `@astrojs/partytown: ^2.1.7` — Third-party scripts en worker
- `@tailwindcss/typography: ^0.5.19` — Tipografía prosa
- `@tailwindcss/vite: ^4.3.0` — Plugin Vite para Tailwind v4
- `astro-compress: ^2.4.1` — Compresión HTML/CSS/JS
- `tailwind-merge: ^3.6.0` — Merge condicional de clases
- `sharp: 0.34.5` — Optimización de imágenes
- `eslint: ^10.4.0` — ESLint v10 con plugin Astro
- `prettier: ^3.8.3` con `prettier-plugin-astro`

## Resultado build

**PASS** — 36 páginas generadas en 8.17 segundos.

```
- Home, About, Contact, Pricing, Services, Privacy, Terms
- 4 variantes de home (mobile-app, personal, saas, startup)
- 6 variantes de landing (click-through, lead-generation, pre-launch, product, sales, subscription)
- Blog con 4 artículos + tags + categorías
- RSS feed
- Sitemap
- 16 imágenes optimizadas (WebP con Sharp)
- CSS comprimido (562 bytes ahorrados)
- HTML comprimido (184 KB ahorrados)
```

## Compatibilidad con nuestra base

| Aspecto                   | Compatible      | Notas                                                                                                                |
| ------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------- |
| Astro 6 vs Astro 5        | Parcial         | AstroWind requiere Astro 6; apps/web usa Astro 5. Migración posible pero requiere cambios en Content Collections API |
| Tailwind v4 misma versión | Sí              | Ambos usan Tailwind 4.3.0 con CSS-first                                                                              |
| Sin React                 | Sí (no impacto) | AstroWind es pure-Astro; no hay conflictos con React                                                                 |
| npm vs pnpm               | Sí              | No hay conflicto de lockfiles al estar aislado                                                                       |
| TypeScript                | Sí              | Ambos usan TS 5.9                                                                                                    |
| PostCSS                   | Diferente       | AstroWind usa `@tailwindcss/vite`, apps/web usa `@tailwindcss/postcss` + PostCSS                                     |

## Riesgos

1. **Astro 6 vs Astro 5**: AstroWind requiere Astro 6. Migrar apps/web de Astro 5 a 6 implica cambios en Content Collections (`content/config.ts` → `src/content.config.ts`) y posiblemente en otras APIs.
2. **No React**: AstroWind no usa React. Si integramos, el componente `Counter.tsx` y futuros componentes React en apps/web seguirían funcionando (Astro soporta múltiples frameworks), pero toda la template de AstroWind está en Astro puro.
3. **Sobrecarga de dependencias**: AstroWind añade ~30 dependencias adicionales. Muchas son opcionales o reemplazan funcionalidad que podríamos implementar más ligeramente.
4. **Personalización**: AstroWind es una template de propósito general con estilos "genéricos". Adaptarla a la identidad visual del proyecto requerirá reemplazar colores, tipografías, layouts, etc.
5. **Configuración YAML**: AstroWind usa un sistema de configuración YAML cargado vía integración custom (`vendor/integration/`). Esto es una capa de abstracción propia que añade complejidad.

## Ventajas

1. **Acelera desarrollo**: 22 widgets + 4 layouts + 10 componentes de blog ya construidos y probados.
2. **SEO completo**: astro-seo + sitemap + RSS + Open Graph + metadata ya configurados.
3. **Rendimiento**: imágenes optimizadas, CSS/HTML comprimido, Partytown para scripts third-party.
4. **Blog completo**: sistema de blog con MDX, tags, categorías, paginación, RSS.
5. **Dark mode**: implementado con ToggleTheme y CSS variables.
6. **MUY activo**: 2.9k+ stars, actualizaciones frecuentes, community grande.
7. **Vercel-ready**: `vercel.json` incluido con cabeceras de caché.

## Inconvenientes

1. **React no usado**: No se alinea con la decisión de usar React en el frontend.
2. **Astro 6 vs 5**: Diferencia de versión mayor que requiere migración.
3. **Sobrecarga**: Muchos widgets y variantes que probablemente no usaremos (6 tipos de landing, 4 homes, etc.).
4. **Estilo genérico**: El diseño visual es genérico "startup". Habría que re-estilizar completamente.
5. **Capa YAML custom**: El sistema de configuración vía `vendor/integration` es propietario y añade complejidad.
6. **Dependencia de mantenimiento**: Al estar en beta (v1.0.0-beta.63), los cambios breaking son probables.
7. **No TypeScript estricto**: Usa `strictNullChecks` pero no `strict` completo.

## Recomendación final

**Opción B: Usar AstroWind solo como referencia visual y de funcionalidad.**

No integrar AstroWind en `apps/web` por las siguientes razones:

1. **React**: Nuestro stack decidido incluye React 19. AstroWind es pure-Astro. Integrarlo significaría mantener componentes en dos paradigmas (Astro puro + React) sin beneficio claro.

2. **Astro 5 vs 6**: apps/web está en Astro 5. Migrar a Astro 6 solo para adoptar una template no justifica el esfuerzo en esta fase.

3. **apps/web es un scaffold mínimo y controlado**: La estructura actual es deliberadamente pequeña para crecer según necesidades reales. AstroWind impone 22 widgets predefinidos que probablemente no necesitamos.

4. **Valor como referencia**: AstroWind es excelente como referencia de:
   - Buenas prácticas de Astro + Tailwind v4
   - Estructura de proyecto Astro completo
   - SEO, blog, RSS, sitemap
   - Manejo de imágenes y optimización
   - Dark mode
   - Integración Vercel

Se conserva `experiments/astrowind/` para consulta futura.

## Próximos pasos

- Continuar con el desarrollo de `apps/web` según la arquitectura definida
- Extraer patrones de AstroWind según sea necesario (SEO, imágenes, blog)
- Evaluar migración a Astro 6 cuando sea estable y justificado

## Archivos generados/modificados

- `experiments/astrowind/` — Clon de AstroWind para evaluación aislada
- `docs/audits/STACK-2026-ASTROWIND-EVALUATION-01.md` — Este informe
