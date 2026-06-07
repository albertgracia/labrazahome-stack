# Stack 2026 - Web Landing Redesign (AstroWind Patterns)

## Fecha

2026-06-07

## Objetivo

Rediseñar la landing inicial de apps/web usando AstroWind como referencia visual y de estructura, sin copiar el proyecto entero ni cambiar la arquitectura base.

## Decisión AstroWind

AstroWind se usó como referencia visual y de estructura (Opción B de la evaluación previa). Patrones concretos tomados como inspiración:

- Secciones bien aisladas en componentes individuales (Hero, Features, CTA)
- Layout con slot para contenido
- Dark mode via clase CSS + toggle button
- Estructura semántica con `<section>` e `id` para navegación

## Archivos modificados

| Archivo                    | Cambio                                                                                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/styles/global.css`    | Añadido `@theme` con colores primarios/surface, `@custom-variant dark`, `@utility` section-padding y container-default, smooth scroll                   |
| `src/layouts/Layout.astro` | SEO completo (title, description, og:title, og:description, og:type, lang=es), dark mode toggle con localStorage, backdrop-blur nav, footer actualizado |
| `src/pages/index.astro`    | Landing completa con 5 secciones: Hero, Características, Stack tecnológico, Flujo de desarrollo, Demo interactiva + CTA                                 |

## Componentes creados

| Componente                         | Descripción                                                                                   |
| ---------------------------------- | --------------------------------------------------------------------------------------------- |
| `src/components/Hero.astro`        | Hero con gradiente radial, tagline, título, subtítulo, CTA buttons (Explorar stack, Contacto) |
| `src/components/FeatureGrid.astro` | Grid 3-columnas de tarjetas con icono, título y descripción                                   |
| `src/components/TechStack.astro`   | Lista de tecnologías agrupadas por categoría (Frontend, Backend, Base de datos, Herramientas) |
| `src/components/Steps.astro`       | Timeline vertical con 5 pasos del flujo de desarrollo, línea conectora                        |
| `src/components/CTA.astro`         | Sección CTA con fondo primary, título, subtítulo y botón                                      |
| `src/components/Counter.tsx`       | Mantenido como demo React 19 (sin cambios)                                                    |

## Patrones tomados como inspiración (de AstroWind)

- Secciones con `section-padding` y `container-default` utilities
- Layout prop para title/description con Open Graph
- Dark mode con toggle + localStorage + prefers-color-scheme
- Hero con fondo gradiente y CTA buttons
- Feature grid con iconos decorativos
- Navegación con anchor links (#stack, #workflow, #contact)

## Patrones descartados (de AstroWind)

- `set:html` para contenido rich — preferido contenido tipado con Props
- Sistema de configuración YAML + integración custom — demasiado complejo para el alcance
- WidgetWrapper/Headline como abstracción extra — preferido componentes directos
- `astro-icon` + icon sets — preferido emojis simples para mantener cero dependencias nuevas
- `tailwind-merge` para class merging — no necesario con clases inline simples
- Animaciones intersect — se omite para mantener simplicidad inicial
- Imágenes externas (Unsplash) — no necesarias en landing técnica
- View Transitions — se omite por ahora

## Validaciones ejecutadas

| Comando                                        | Resultado |
| ---------------------------------------------- | --------- |
| `pnpm --filter web typecheck`                  | ✅        |
| `pnpm --filter web build`                      | ✅        |
| `pnpm check` (lint + typecheck + build global) | ✅        |

## Smoke local

| Prueba                                      | Resultado   |
| ------------------------------------------- | ----------- |
| `pnpm dev:web` arranca                      | ✅          |
| `GET http://localhost:4321/`                | ✅ HTTP 200 |
| Hero "Stack 2026" visible                   | ✅          |
| Sección "Características" (6 tarjetas)      | ✅          |
| Sección "Stack tecnológico" (9 tecnologías) | ✅          |
| Sección "Flujo de desarrollo" (5 pasos)     | ✅          |
| Sección "Demo interactiva" (Counter React)  | ✅          |
| CTA final con botón GitHub                  | ✅          |
| Dark mode toggle funcional                  | ✅          |
| Meta tags Open Graph                        | ✅          |
| Tamaño página                               | 64.6 KB     |

## Riesgos / Pending

- No hay animaciones ni transiciones — añadir cuando se requiera polish visual
- No hay página 404, about, contacto — crear en fase de contenido
- No hay favicon — añadir asset en fase de branding
- No hay fuente personalizada — usar system stack por ahora
- No hay página de blog — pendiente para fase de contenido
- No hay tests visuales — considerar añadir en fase de testing

## Próximos pasos

`STACK-2026-WEB-SEO-CONTENT-FOUNDATION-01`
