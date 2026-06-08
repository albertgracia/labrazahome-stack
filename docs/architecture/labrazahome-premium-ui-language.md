# LabrazaHome Premium UI Language

## Visión Visual

LabrazaHome Labs representa la fusión de tradición agroalimentaria premium (Rioja, aceites, mieles) con tecnología de vanguardia. La UI debe transmitir:

- **Elegancia sin fricción** — oscuro como canvas principal, con acentos índigo
- **Movimiento con propósito** — animaciones que guían, no decoran
- **Confianza artesanal** — bordes sutiles, tipografía limpia, espaciado generoso

Referencias estéticas: Vercel, Linear, Stripe, Raycast, adaptadas a un contexto vitivinícola/gourmet.

## Principios de Diseño

1. **Dark-first** — tema oscuro por defecto; claro como alternativa secundaria
2. **Motion con intención** — cada animación debe tener un propósito funcional (revelar, enfatizar, guiar)
3. **Jerarquía visual clara** — tipografía grande, contraste alto, espaciado generoso
4. **Personalidad editorial** — las transiciones deben sentirse como pasar páginas de una revista premium
5. **Consistencia sobre novedad** — un patrón de movimiento compartido entre Catálogo, Sommelier, Portal B2B y Backoffice

## Lenguaje de Motion

### Timing

- **Entrada/salida**: 300–500ms, cubic-bezier suave (ej. `cubic-bezier(0.16, 1, 0.3, 1)`)
- **Micro-interacciones** (hover, focus): 150–200ms, ease-out
- **Reveal en scroll**: 600–800ms, con offset de 20–40px

### Tipos de Movimiento

| Tipo       | Uso                             | Ejemplo               |
| ---------- | ------------------------------- | --------------------- |
| Fade-in up | Cards, secciones al scroll      | ProductCardPremium    |
| Stagger    | Listas, grids                   | EcosystemGrid         |
| Scale      | Hover en tarjetas               | ProductCardPremium    |
| Slide      | Paneles laterales, modales      | ProductContextPanel   |
| Morph      | Transiciones de iconos, estados | SommelierModeSelector |
| Particles  | Fondos decorativos (hero)       | PremiumHero           |

### Efectos Recomendados (de React Bits)

- **BlurText** — para títulos hero con entrada borrosa → nitidez
- **FadeContent** — revelar contenido en scroll
- **SplitText** — animación de caracteres/palabras en títulos
- **ShinyText** — brillo sutil en textos promocionales
- **DecryptedText** — efecto "hacking" para datos transformándose
- **GlitchText** — para errores o estados de carga mock

## Lenguaje para Catálogo Premium v2

### Identidad Visual

- Cards de producto con glassmorphism (bg-white/5 + backdrop-blur)
- Imágenes con borde redondeado (rounded-2xl)
- Ratings de vino con estilo medallón/marca de cata
- Grid responsivo 1→2→3→4 columnas

### Animaciones Candidatas

| Uso              | Componente React Bits | Prioridad |
| ---------------- | --------------------- | --------- |
| Hero categoría   | BlurText, FadeContent | Alta      |
| Hover en cards   | Scale, BorderTrail    | Alta      |
| Grid reveal      | Stagger + FadeContent | Alta      |
| Galería imágenes | Crossfade, Stack      | Media     |
| Filtros          | AnimatedGroup         | Baja      |

### No Usar

- Efectos 3D excesivos (Three.js no está en el stack)
- Partículas pesadas en listados
- Sonidos o video background

## Lenguaje para Sommelier AI v2

### Identidad Visual

- Chat oscuro con burbujas diferenciadas por rol (usuario: indigo, asistente: zinc oscuro)
- Selector de perfil con iconos y transiciones suaves
- Paneles laterales deslizantes
- Tipografía mono para datos técnicos (puntuaciones)

### Animaciones Candidatas

| Uso                      | Componente React Bits  | Prioridad |
| ------------------------ | ---------------------- | --------- |
| Mensaje entrada          | FadeContent + slide up | Alta      |
| Indicador escritura      | TypingAnimation        | Alta      |
| Transición perfil        | AnimatedGroup          | Media     |
| Recomendaciones stagger  | Stagger + FadeContent  | Alta      |
| Spotlight en sugerencias | SpotlightCard          | Media     |

### Experiencia Conversacional

- Tiempo de respuesta simulado: 800–1500ms (mock)
- Tipeo simulado carácter por carácter en respuestas cortas
- Scroll suave a nuevos mensajes (behavior: smooth)

## Lenguaje para Portal B2B v2

### Identidad Visual

- Dashboard con métricas, tablas, gráficos
- Navegación lateral colapsable
- Modales para pedidos, facturas, histórico
- Tablas con filas expandibles

### Animaciones Candidatas

| Uso            | Componente React Bits | Prioridad |
| -------------- | --------------------- | --------- |
| Navegación     | Dock (macOS-style)    | Media     |
| Tablas reveal  | StaggerRows           | Alta      |
| Métricas       | NumberTicker, CountUp | Alta      |
| Notificaciones | Toast                 | Media     |

### No Usar

- Efectos decorativos pesados (aurora, particles)
- Animaciones que retrasen la operación del usuario

## Lenguaje para Backoffice Admin v2

### Identidad Visual

- Eficiencia ante todo: claro, denso, funcional
- Tablas con ordenación, filtros, búsqueda
- Paneles de edición en modales o sidebars
- Gráficos de negocio

### Animaciones Candidatas

| Uso                  | Componente React Bits    | Prioridad |
| -------------------- | ------------------------ | --------- |
| Transiciones de ruta | Crossfade                | Media     |
| Notificaciones       | Toast                    | Alta      |
| Filtros búsqueda     | Debounce visual feedback | Alta      |

### No Usar

- Animaciones llamativas que distraigan
- Fondos animados
- Partículas o efectos 3D

## Componentes Candidatos (Fuente: React Bits, Haiku)

### Prioridad Alta — Usar Directo o Adaptar

| Componente              | Fuente         | Uso previsto                        |
| ----------------------- | -------------- | ----------------------------------- |
| BlurText                | React Bits     | Títulos hero (landing, catálogo)    |
| FadeContent             | React Bits     | Reveal en scroll (cards, secciones) |
| NumberTicker            | React Bits     | Métricas, contadores                |
| SplitText               | React Bits     | Títulos con efecto editorial        |
| TypingAnimation         | React Bits     | Chat Sommelier                      |
| ShinyText               | React Bits     | Textos promocionales, badges        |
| useDebounce             | Haiku          | Búsqueda en catálogo, filtros       |
| useClickOutside         | Haiku          | Modales, dropdowns                  |
| useIntersectionObserver | Haiku (nativo) | Scroll-triggered animations         |
| useMediaQuery           | Haiku          | Responsive breakpoints              |

### Prioridad Media — Adaptar

| Componente      | Fuente     | Uso previsto            |
| --------------- | ---------- | ----------------------- |
| GradientText    | React Bits | Títulos sección         |
| Crossfade       | React Bits | Transiciones galería    |
| AnimatedGroup   | React Bits | Stagger en listas       |
| Dock            | React Bits | Navegación B2B          |
| SpotlightCard   | React Bits | Sugerencias Sommelier   |
| BorderTrail     | React Bits | Hover en cards          |
| useLocalStorage | Haiku      | Preferencias de usuario |
| useHover        | Haiku      | Tooltips, previews      |
| useToggle       | Haiku      | Estados UI              |

### Prioridad Baja — Solo Inspiración

| Componente   | Fuente     | Observación                              |
| ------------ | ---------- | ---------------------------------------- |
| Aurora       | React Bits | Fondo hero (pesado, evaluar rendimiento) |
| Particles    | React Bits | Fondo hero (evaluar necesidad)           |
| Magnet       | React Bits | Efecto hover llamativo (no prioritario)  |
| PixelTrail   | React Bits | Cursor effect (decorativo)               |
| SplashCursor | React Bits | Cursor effect (decorativo)               |

## Dependencias Permitidas

| Paquete                          | Razón                                          | Evaluación                                |
| -------------------------------- | ---------------------------------------------- | ----------------------------------------- |
| `react-haiku`                    | Hooks ligeros (<7KB) sin dependencias externas | ✅ Permitido, licencia MIT                |
| Componentes React Bits por copia | Sin npm install, copy-paste shadcn             | ✅ Permitido, licencia MIT+Commons Clause |
| `framer-motion` (opcional)       | Si se requiere control avanzado de animaciones | ⚠️ Evaluar peso antes de incluir          |

## Dependencias a Evitar

| Paquete                       | Razón                                                     |
| ----------------------------- | --------------------------------------------------------- |
| Three.js / @react-three/fiber | Peso excesivo para UI (solo si componente 3D obligatorio) |
| GSAP                          | Solapamiento con React Bits y framer-motion               |
| Lottie                        | Preferir CSS/React puro                                   |
| animejs                       | No necesario, React Bits cubre animaciones                |

## Riesgos de Licencia

| Fuente      | Licencia             | Riesgo                                                                                                                                                                                                                                             |
| ----------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React Bits  | MIT + Commons Clause | ⚠️ Commons Clause restringe redistribución comercial del propio componente como producto. **Veredicto**: seguro para usar dentro de LabrazaHome como parte de una aplicación mayor. No redistribuir los componentes como biblioteca independiente. |
| Vue Bits    | MIT + Commons Clause | Mismo criterio que React Bits. Solo inspiración visual (Vue no compatible con stack React).                                                                                                                                                        |
| Svelte Bits | MIT + Commons Clause | Mismo criterio. Solo inspiración visual (Svelte no compatible).                                                                                                                                                                                    |
| Haiku       | MIT                  | ✅ Sin restricciones. Puede instalarse via npm sin riesgos.                                                                                                                                                                                        |

## Roadmap de Adopción

### Fase 1 — Evaluación (esta fase) ✅

- [x] Auditar fuentes de inspiración
- [x] Identificar componentes candidatos
- [x] Evaluar licencias y riesgos

### Fase 2 — Sommelier Chat Redesign

- [ ] Mejorar chat Sommelier con animaciones de mensajes (FadeContent + slide up)
- [ ] Añadir TypingAnimation simulada
- [ ] Stagger en recomendaciones
- [ ] Transiciones suaves en selector de perfil

### Fase 3 — Landing Hero + Secciones

- [ ] BlurText en título hero
- [ ] FadeContent en scroll sections
- [ ] ShinyText en badges
- [ ] NumberTicker en métricas

### Fase 4 — Catálogo Premium

- [ ] BlurText en hero de categoría
- [ ] Stagger reveal en grid de productos
- [ ] BorderTrail en hover de cards
- [ ] FadeContent en detalle de producto

### Fase 5 — Portal B2B

- [ ] Dock para navegación
- [ ] NumberTicker en métricas dashboard
- [ ] Crossfade en transiciones

### Fase 6 — Backoffice

- [ ] Animaciones funcionales (notificaciones, filtros)
- [ ] Debounce en búsqueda (useDebounce)

## Referencias

- Documentación React Bits: https://reactbits.dev/
- Documentación Haiku: https://reacthaiku.dev/
- Design System actual: docs/design-system.md
- Arquitectura Catálogo: docs/architecture/catalogo-premium-v2.md
- Arquitectura Sommelier: docs/architecture/sommelier-ai-v2.md
