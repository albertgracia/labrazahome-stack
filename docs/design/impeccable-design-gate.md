# Impeccable Design Gate

> Compuerta de calidad visual para Stack-2026. Adaptación de las reglas de Impeccable (skills-diseño) al contexto de LabrazaHome Labs: producto App/UI con registros de Catálogo, Sommelier AI, Portal B2B y Backoffice Admin.

## Registro de producto

Stack-2026 es un **ecosistema de producto digital** (app UI + dashboards + landing). El diseño SIRVE al producto: cada píxel debe tener un propósito funcional. Las reglas de Impeccable aplicadas aquí corresponden al registro `product` (no `brand`).

## Reglas obligatorias

### Color

- **Contraste mínimo**: texto cuerpo ≥4.5:1 sobre su fondo; texto grande (≥18px o bold ≥14px) ≥3:1. Placeholder text también necesita 4.5:1.
- **Gris sobre color**: prohibido. Usar una tonalidad más oscura del mismo tono del fondo, o transparencia del color de texto.
- **60-30-10**: 60% fondo neutro (dark), 30% superficies secundarias, 10% acento (primary índigo).
- **Vocabulario semántico**: hover, focus, active, disabled, selected, loading, error, warning, success, info. Estandarizar todos.
- **Acento**: solo para acciones primarias, selección actual e indicadores de estado. Nunca decorativo.

### Tipografía

- **Longitud de línea**: 65–75 caracteres para texto en prosa (chunks narrativos). Datos y UI compacta pueden ser más densos; tablas hasta 120ch+.
- **Escala**: ratio ≥1.25 entre pasos de heading. Jerarquía mediante escala + peso.
- **Familias**: máximo 3 (display + cuerpo + mono opcional). Una sola familia bien ajustada suele ganar a tres compitiendo.
- **All-caps**: solo para labels cortas (≤4 palabras), section eyebrows (1 por sección como máximo) y badges. Prohibido en texto cuerpo.
- **Clamp(): max ≤6rem (~96px)** en display headings. Por encima, la página grita, no diseña.
- **Letter-spacing floor**: ≥ -0.04em en display headings.
- **`text-wrap: balance`** en h1–h3. **`text-wrap: pretty`** en prosa larga.
- **Escala fija rem**, no fluida para UI de producto. Las cabeceras clamp no sirven en dashboards.

### Layout

- **Variar espaciado para ritmo**. No usar el mismo gap en todas partes.
- **Sin cards anidados**. Si hay un card dentro de otro card, algo está mal.
- **Flexbox para 1D, Grid para 2D**. No usar Grid por defecto cuando `flex-wrap` es más simple.
- **Grid responsivo sin breakpoints**: `repeat(auto-fit, minmax(280px, 1fr))`.
- **Escala z-index semántica**: dropdown → sticky → modal-backdrop → modal → toast → tooltip. Nunca valores arbitrarios como 999.
- **No CSS `overflow: hidden/auto` + `position: absolute` dropdowns**. Usar `<dialog>` nativo, `popover` API, o portal.
- **Cards son la respuesta perezosa**. Usarlos solo cuando son la mejor affordance.
- **Comportamiento responsivo estructural** (colapsar sidebar, tabla responsiva, columnas por breakpoint). No tipografía fluida.

### Motion

- **Intencional, no decorativo**. Cada animación tiene un propósito funcional (revelar, enfatizar, guiar).
- **No animar propiedades de layout** (width, height, top, left). Solo transform y opacity.
- **Easing**: ease-out-quart / quint / expo. No bounce, no elastic.
- **Duración producto UI**: 150–250ms en la mayoría de transiciones. Usuarios en flujo no deben esperar coreografía.
- **Reduced motion**: toda animación necesita alternativa con `@media (prefers-reduced-motion: reduce)`.
- **Stagger legítimo** en listas. Pero cada sección debe tener su propio reveal, no el mismo para todas.
- **Materiales premium**: blur, backdrop-filter, clip-path, mask, shadow/glow cuando mejoran el efecto y se mantienen suaves.

### Interacción

- **Estados completos** en todo componente interactivo: default, hover, focus, active, disabled, loading, error. No enviar con la mitad.
- **Skeleton states** para carga, no spinners en medio del contenido.
- **Empty states** que enseñan la interfaz, no "nothing here."
- **Affordance consistente** en toda la superficie: mismo shape de botón, mismo vocabulario de form controls, mismo estilo de iconos.

### Copy

- **Cada palabra gana su lugar**. Sin encabezados repetidos, sin intros que repiten el título.
- **Sin em dashes**. Usar comas, dos puntos, punto y coma, punto, paréntesis. Tampoco `--`.
- **Sin marketing buzzwords**: streamline / empower / supercharge / leverage / unleash / transform / seamless / world-class / enterprise-grade / next-generation / cutting-edge / game-changer / mission-critical.
- **Botones**: verbo + objeto. "Guardar cambios" gana a "OK". "Eliminar proyecto" gana a "Sí".
- **Enlaces**: significado autónomo. "Ver planes de precios" gana a "Haz clic aquí".

## Prohibiciones absolutas (match-and-refuse)

| Prohibición                                                                | Alternativa                                                    |
| -------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `border-left`/`border-right` >1px como acento decorativo                   | Bordes completos, tintes de fondo, iconos/números, o nada      |
| Gradient text (`background-clip: text` + gradient)                         | Color sólido único. Énfasis mediante peso o tamaño             |
| Glassmorphism como defecto (blur+glass decorativo)                         | Raro y con propósito, o nada                                   |
| Hero-metric template (número grande + label pequeño)                       | Narrativa, no métricas decorativas                             |
| Parrilla de cards idénticos (icono + heading + texto repetido)             | Variar estructura, usar listas, grids heterogéneos             |
| Section eyebrow (all-caps tracking) en CADA sección                        | Máximo 1 eyebrow por página como voz de marca, no gramática AI |
| Section markers numéricos (01/02/03) como scaffolding                      | Solo si la sección es una secuencia real (proceso de 3 pasos)  |
| Texto que desborda su contenedor                                           | Testear heading copy en cada breakpoint                        |
| Motion decorativo que no transmite estado                                  | Motion solo para feedback, loading, reveal                     |
| Vocabulario de componentes inconsistente                                   | Mismo botón = mismo estilo en toda la app                      |
| Display fonts en labels UI, botones, datos                                 | Inter (sans) en toda la UI de producto                         |
| Reinventar affordances estándar (scrollbars raros, form controls extraños) | Componentes nativos o con estándar accesible                   |
| Color pesado o saturación completa en estados inactivos                    | Estados inactivos: muted, opacidad reducida                    |
| Modal como primera opción                                                  | Agotar inline / progresivo / slide antes que modal             |

## Checklist por módulo

### Landing (apps/web/src/pages/index.astro + components/landing/)

- [ ] Sin gradient text decorativo
- [ ] Sin glassmorphism decorativo
- [ ] `text-wrap: balance` en h1-h3
- [ ] Heading clamp max ≤6rem
- [ ] Eyebrow máximo 1 en toda la página
- [ ] Sin numbered section markers (01/02/03)
- [ ] Longitud de línea ≤75ch en párrafos
- [ ] Animaciones con reduced-motion alternative
- [ ] Easing expo (no bounce/elastic)
- [ ] Sin em dashes en copy
- [ ] Botones: verbo + objeto
- [ ] Estados hover/focus visibles en CTAs
- [ ] Touch targets ≥44×44px en móvil
- [ ] Contraste texto cuerpo ≥4.5:1

### Catálogo Premium v2 (apps/web/src/pages/catalogo/ + components/catalogo/)

- [ ] Sin gradient text en precios o títulos
- [ ] Cards de producto con estructura variada (no todas idénticas)
- [ ] Stagger reveal en grid (no el mismo timing para todos)
- [ ] Imágenes con lazy loading
- [ ] Alt text descriptivo en imágenes
- [ ] Estados hover/focus en cards
- [ ] Line length en descripciones ≤75ch
- [ ] `text-wrap: pretty` en prosa
- [ ] Sin glassmorphism decorativo
- [ ] Touch targets en enlaces y botones
- [ ] Reduced-motion alternative en animaciones

### Sommelier AI v2 (apps/web/src/pages/sommelier/ + components/sommelier/)

- [ ] Estados completos en input de chat (default, focus, disabled, loading)
- [ ] Skeleton states para carga de recomendaciones
- [ ] Empty state cuando no hay mensajes
- [ ] Error state con mensaje claro y acción de recuperación
- [ ] Motion 150-250ms en transiciones de mensajes
- [ ] Easing expo (no bounce)
- [ ] Reduced-motion alternative
- [ ] Iconos con label (no icon-only)
- [ ] Keyboard navigation en selector de modo/perfil
- [ ] Focus indicators visibles
- [ ] Sin buzzwords en copy de recomendaciones
- [ ] Sin em dashes

### Portal B2B v2 (apps/web/src/pages/b2b/ + components/b2b/)

- [ ] Sin gradient text en métricas o precios
- [ ] Estados completos en botones (hover, focus, active, disabled)
- [ ] Loading state en selección (localStorage async)
- [ ] Empty state en selección vacía
- [ ] Error state en fallo de localStorage
- [ ] Touch targets ≥44×44px en quantity steppers y botones
- [ ] Contraste en texto de KPIs y métricas ≥4.5:1
- [ ] Sin modal como primera opción (usar inline/preview)
- [ ] Sin motions decorativos que retrasen operación
- [ ] Reduced-motion para animaciones de preview
- [ ] Keyboard navigation en catálogo y selección
- [ ] Focus indicators en todos los interactive elements

### Backoffice Admin v2 (apps/web/src/pages/admin/ + components/admin/)

- [ ] Sin glassmorphism decorativo
- [ ] Sin motions decorativos
- [ ] Estados completos en todos los form controls y botones
- [ ] Skeleton states para carga de datos
- [ ] Empty states para tablas sin datos
- [ ] Error states para fallos de carga
- [ ] Touch targets ≥44×44px
- [ ] Contraste ≥4.5:1 en tablas y métricas
- [ ] Keyboard navigation en tablas (tab, arrow keys)
- [ ] Focus indicators
- [ ] Reduced-motion

## Referencias

- Fuente original: `E:\opencode\skills-diseño\.opencode\skills\impeccable\SKILL.md`
- Register product: `reference/product.md`
- Design system Stack-2026: `docs/design-system.md`
- Premium UI language: `docs/architecture/labrazahome-premium-ui-language.md`
- Agent rule: `docs/agent-rules/impeccable-design-rule.md`
