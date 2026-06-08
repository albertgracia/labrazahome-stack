# Informe de Auditoría — STACK-2026-ANIMATED-UI-INSPIRATION-AUDIT-01

**Fecha:** 2026-06-08
**Objetivo:** Auditar React Bits, Vue Bits, Svelte Bits y Haiku como fuentes de inspiración visual/interactiva para LabrazaHome Labs. NO implementar, NO instalar, solo auditoría y roadmap.

---

## Fuentes Revisadas

| Fuente      | URL                     | Versión/Stats                       | Stack               |
| ----------- | ----------------------- | ----------------------------------- | ------------------- |
| React Bits  | https://reactbits.dev/  | 130+ componentes, 40.6k⭐           | React 18+, Tailwind |
| Vue Bits    | https://vue-bits.dev/   | 90+ componentes, 4.1k⭐             | Vue 3, Nuxt         |
| Svelte Bits | https://sveltebits.xyz/ | ~20+ componentes listados, 190⭐    | Svelte 5            |
| Haiku       | https://reacthaiku.dev/ | 46 hooks + 9 utilities, 993⭐, <7KB | React 16.8+         |

## Licencias

| Fuente      | Licencia             | Evaluación                                                        |
| ----------- | -------------------- | ----------------------------------------------------------------- |
| React Bits  | MIT + Commons Clause | ⚠️ Seguro para uso interno en app. No redistribuir como librería. |
| Vue Bits    | MIT + Commons Clause | ⚠️ Solo inspiración (Vue no compatible).                          |
| Svelte Bits | MIT + Commons Clause | ⚠️ Solo inspiración (Svelte no compatible).                       |
| Haiku       | MIT                  | ✅ Sin restricciones. Instalable vía npm.                         |

## Candidatos Prioritarios (desde React Bits + Haiku)

### Prioridad Alta — Usar Directo o Adaptar

| Componente                  | Categoría       | Uso en LabrazaHome                            | Instalación       |
| --------------------------- | --------------- | --------------------------------------------- | ----------------- |
| **BlurText**                | Text Animations | Títulos hero landing, catálogo, sommelier     | shadcn add o copy |
| **FadeContent**             | Animations      | Reveal en scroll para cards, secciones        | shadcn add o copy |
| **NumberTicker**            | Animations      | Métricas, contadores (landing, B2B dashboard) | shadcn add o copy |
| **SplitText**               | Text Animations | Títulos editoriales, efectos de palabra       | shadcn add o copy |
| **TypingAnimation**         | Animations      | Chat Sommelier AI (efecto escritura)          | shadcn add o copy |
| **ShinyText**               | Text Animations | Textos promocionales, badges                  | shadcn add o copy |
| **SpotlightCard**           | Components      | Cards con spotlight en sugerencias            | shadcn add o copy |
| **BorderTrail**             | Animations      | Hover en cards de producto                    | shadcn add o copy |
| **useDebounce** (Haiku)     | Hook            | Búsqueda en catálogo, filtros                 | npm i react-haiku |
| **useClickOutside** (Haiku) | Hook            | Modales, dropdowns                            | npm i react-haiku |
| **useLocalStorage** (Haiku) | Hook            | Preferencias de usuario                       | npm i react-haiku |

### Prioridad Media — Adaptar

| Componente                      | Categoría       | Uso en LabrazaHome                                                       |
| ------------------------------- | --------------- | ------------------------------------------------------------------------ |
| GradientText                    | Text Animations | Títulos de sección                                                       |
| AnimatedGroup                   | Animations      | Stagger en listas y grids                                                |
| Dock                            | Components      | Navegación tipo macOS para Portal B2B                                    |
| Crossfade                       | Animations      | Transiciones de galería de imágenes                                      |
| DecryptedText                   | Text Animations | Efecto de datos transformándose (mock)                                   |
| useHover (Haiku)                | Hook            | Tooltips, previsualizaciones                                             |
| useMediaQuery (Haiku)           | Hook            | Breakpoints responsive programáticos                                     |
| useIntersectionObserver (Haiku) | Hook            | Scroll-triggered animations (alternativa a Intersection Observer nativo) |

### Prioridad Baja — Solo Inspiración

| Componente                | Razón                                            |
| ------------------------- | ------------------------------------------------ |
| Aurora                    | Fondo hero, peso elevado, evaluar necesidad real |
| Particles                 | Decorativo, no prioritario                       |
| Magnet                    | Efecto hover llamativo pero no funcional         |
| PixelTrail / SplashCursor | Efectos de cursor decorativos                    |

## Riesgos Detectados

### Riesgo Técnico

- React Bits usa shadcn CLI o copy-paste; requiere gestionar versiones manualmente si se actualiza un componente
- Los componentes vienen en 4 variantes (JS-CSS, JS-TW, TS-CSS, TS-TW); elegir siempre TS-TW para consistencia

### Riesgo de Licencia

- MIT + Commons Clause: el componente no puede redistribuirse como biblioteca independiente. LabrazaHome es una aplicación que **consume** estos componentes, no los redistribuye. **Veredicto seguro.**
- Commons Clause no afecta el uso dentro de aplicaciones comerciales internas o SaaS.

### Riesgo de Dependencia

- React Bits no es un npm package; los componentes se copian al proyecto. Sin riesgo de breaking changes automáticos.
- Haiku sí es npm package (react-haiku v2.4.1). Dependencia ligera (<7KB), pero monitorear actualizaciones.

### Riesgo de Compatibilidad

- Astro 6 + React 19: verificar compatibilidad de los hooks de Haiku (requiere React 16.8+). Sin problemas conocidos.
- Los componentes React Bits usan React puro; compatibles con islands de Astro.

## Decisión Recomendada

1. **React Bits** como fuente principal. Componentes copiados manualmente (TS-TW) para landing, catálogo y sommelier.
2. **Haiku** instalado vía npm para hooks utilitarios (useDebounce, useClickOutside, useLocalStorage).
3. **Vue Bits** y **Svelte Bits** como inspiración visual solamente. No portar código.
4. No introducir Three.js, GSAP, Lottie ni animejs.

## Siguientes Fases Recomendadas

1. **STACK-2026-SOMMELIER-PREMIUM-CHAT-REDESIGN-01** — Integrar BlurText, TypingAnimation, FadeContent en el chat Sommelier
2. **STACK-2026-LANDING-HERO-MOTION-01** — BlurText + NumberTicker en landing hero
3. **STACK-2026-CATALOGO-CARD-ANIMATIONS-01** — BorderTrail + FadeContent en cards de producto
4. **STACK-2026-HAIKU-HOOKS-INTEGRATION-01** — Instalar react-haiku y migrar hooks utilitarios

## Conclusiones

React Bits es la fuente de inspiración más valiosa para LabrazaHome Labs por:

- Compatibilidad directa con React 19 + Astro 6 (islands)
- Componentes copy-paste sin dependencias npm pesadas
- 130+ componentes que cubren todas las necesidades identificadas
- Licencia MIT + Commons Clause segura para uso en aplicación
- Integración con Design System existente (Tailwind 4, tema oscuro)

Haiku complementa con hooks utilitarios ligeros sin fricción de instalación.
