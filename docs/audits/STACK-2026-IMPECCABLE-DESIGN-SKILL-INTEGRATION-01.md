# STACK-2026-IMPECCABLE-DESIGN-SKILL-INTEGRATION-01

## Objetivo

Integrar skills-diseño / Impeccable como regla operativa de diseño para Stack-2026 sin copiar código indiscriminadamente.

## Archivos revisados de skills-diseño

| Archivo                                            | Contenido                                                                                                               | Relevancia para Stack-2026                           |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `SKILL.md`                                         | Reglas generales de diseño: color, tipografía, layout, motion, interacción, copy, prohibiciones absolutas, AI slop test | Alta — base de todas las reglas                      |
| `reference/product.md`                             | Register product: app UI, dashboards, tools. Tipografía escala fija, estados semánticos, motion 150-250ms               | Alta — Stack-2026 es producto                        |
| `reference/critique.md`                            | Framework de crítica UX: heurísticas Nielsen, carga cognitiva, personas, severidad P0-P3                                | Alta — metodología de revisión                       |
| `reference/audit.md`                               | Auditoría técnica: a11y, perf, theming, responsive, anti-patterns                                                       | Alta — checklists por dimensión                      |
| `reference/polish.md`                              | Checklist de polish final: alineación, espaciado, estados, edge cases                                                   | Alta — lista de verificación pre-ship                |
| `DESIGN.md`                                        | Principios visuales: claridad, jerarquía, contraste, responsive                                                         | Media — principios ya reflejados en design-system.md |
| `reference/layout.md`                              | Reglas de layout detalladas                                                                                             | Media — integradas en gate                           |
| `reference/typeset.md`                             | Reglas de tipografía detalladas                                                                                         | Media — integradas en gate                           |
| `reference/animate.md`                             | Reglas de motion detalladas                                                                                             | Media — integradas en gate                           |
| `reference/colorize.md`                            | Reglas de color detalladas                                                                                              | Media — integradas en gate                           |
| `reference/brand.md`                               | Register brand (landing, marketing)                                                                                     | Baja — Stack-2026 es producto, no brand              |
| `scripts/context.mjs`, `palette.mjs`, `detect.mjs` | Scripts de setup y detector automatizado                                                                                | Baja — no se copian, solo metodología                |

## Reglas adoptadas

| Categoría     | Regla                                                                      | Fuente                |
| ------------- | -------------------------------------------------------------------------- | --------------------- |
| Color         | Contraste ≥4.5:1 texto cuerpo, ≥3:1 texto grande                           | SKILL.md              |
| Color         | Gris sobre fondo coloreado prohibido                                       | SKILL.md              |
| Color         | 60-30-10: fondo neutro 60%, secundario 30%, acento 10%                     | SKILL.md              |
| Color         | Acento solo para CTAs, selección, estados                                  | product.md            |
| Tipografía    | Line length 65-75ch prosa                                                  | SKILL.md              |
| Tipografía    | Ratio escala ≥1.25                                                         | SKILL.md              |
| Tipografía    | ≤3 familias. Inter para toda UI de producto                                | SKILL.md + product.md |
| Tipografía    | All-caps solo labels ≤4 palabras, eyebrows (1 por sección), badges         | SKILL.md              |
| Tipografía    | Clamp max 6rem, letter-spacing floor -0.04em                               | SKILL.md              |
| Tipografía    | Escala fija rem para UI de producto (no fluida)                            | product.md            |
| Layout        | Sin cards anidados                                                         | SKILL.md              |
| Layout        | Flexbox 1D / Grid 2D                                                       | SKILL.md              |
| Layout        | Grid responsivo `repeat(auto-fit, minmax(280px, 1fr))`                     | SKILL.md              |
| Layout        | Z-index semántico, no 999                                                  | SKILL.md              |
| Layout        | Sin overflow:hidden + absolute dropdowns                                   | SKILL.md              |
| Motion        | 150-250ms producto UI                                                      | product.md            |
| Motion        | Easing expo, no bounce/elastic                                             | SKILL.md              |
| Motion        | Solo transform + opacity                                                   | SKILL.md              |
| Motion        | Reduced-motion obligatorio                                                 | SKILL.md              |
| Motion        | Stagger legítimo en listas                                                 | SKILL.md              |
| Interacción   | Estados completos: default, hover, focus, active, disabled, loading, error | product.md            |
| Interacción   | Skeleton states, no spinners                                               | product.md            |
| Interacción   | Empty states informativos                                                  | product.md            |
| Interacción   | Touch targets ≥44×44px                                                     | SKILL.md              |
| Copy          | Sin em dashes                                                              | SKILL.md              |
| Copy          | Sin marketing buzzwords                                                    | SKILL.md              |
| Copy          | Botones: verbo + objeto                                                    | SKILL.md              |
| Copy          | Enlaces: significado autónomo                                              | SKILL.md              |
| Prohibiciones | Sin gradient text decorativo                                               | SKILL.md              |
| Prohibiciones | Sin glassmorphism decorativo                                               | SKILL.md              |
| Prohibiciones | Sin border-left/right accent stripes                                       | SKILL.md              |
| Prohibiciones | Sin hero-metric template                                                   | SKILL.md              |
| Prohibiciones | Sin parrilla de cards idénticos                                            | SKILL.md              |
| Prohibiciones | Sin section eyebrow en cada sección                                        | SKILL.md              |
| Prohibiciones | Sin numbered section markers (01/02/03)                                    | SKILL.md              |
| Prohibiciones | Sin texto desbordado                                                       | SKILL.md              |
| Prohibiciones | Sin motion decorativo                                                      | product.md            |
| Prohibiciones | Sin display fonts en labels/botones                                        | product.md            |
| Prohibiciones | Sin reinventar affordances estándar                                        | product.md            |
| Prohibiciones | Sin modal como primera opción                                              | product.md            |

## Reglas descartadas

| Regla                                                                | Razón                                                                                                                                                                                                               |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OKLCH requirement estricto                                           | Stack-2026 usa Tailwind v4 con colores OKLCH por defecto (el estándar Tailwind ya usa OKLCH). No requiere validación adicional                                                                                      |
| Cream/sand/beige body bg anti-pattern                                | Stack-2026 es dark-first, no aplica (fondo #09090b en oscuro, #fafafa en claro)                                                                                                                                     |
| Gradient-text ban absoluto                                           | Adoptado como prohibición en gate, pero `gradient-text` utility existe en design-system.md. Se marca como prohibido en UI de producto (solo permitido si es explícitamente solicitado como efecto hero excepcional) |
| Brand register rules (display fonts para landing, tipografía fluida) | Stack-2026 register es producto, no brand                                                                                                                                                                           |
| Palette script (`palette.mjs`)                                       | Stack-2026 ya tiene paleta definida (indigo primary). No necesita generación de paleta                                                                                                                              |
| Detector script (`detect.mjs`)                                       | Herramienta de auditoría automatizada, no una regla de diseño. Pendiente de evaluar si se integra en CI                                                                                                             |
| Pin/Unpin commands                                                   | Mecanismo de shortcuts de Impeccable, no aplica a Stack-2026                                                                                                                                                        |

## Documentos creados

| Archivo                                      | Propósito                                                                                                                                          |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/design/impeccable-design-gate.md`      | Compuerta de calidad visual con reglas vinculantes, prohibiciones absolutas y checklist por módulo (Landing, Catálogo, Sommelier, B2B, Admin)      |
| `docs/agent-rules/impeccable-design-rule.md` | Regla operativa para agentes: activación, reglas vinculantes durante implementación, flujo de aprobación pre-ship, penalizaciones por infracciones |

## Documentos modificados

| Archivo                 | Cambio                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------- |
| `docs/design-system.md` | Añadida referencia obligatoria al gate y a la regla de agente al inicio del documento |

## Validaciones

| Comando                       | Resultado |
| ----------------------------- | --------- |
| `pnpm format`                 | PASS      |
| `pnpm --filter web typecheck` | PASS      |
| `pnpm --filter web build`     | PASS      |
| `pnpm check`                  | PASS      |

## Git

```
HEAD inicial: d9e4fed
HEAD final:   <pending>
Commit:       docs: integrate impeccable design gate
Push:         origin main
Resultado:    PASS
```
