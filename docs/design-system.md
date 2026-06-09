# Design System — LabrazaHome Labs

> **Referencia obligatoria**: `docs/design/impeccable-design-gate.md` — compuerta de calidad visual con reglas vinculantes de color, tipografía, layout, motion, interacción y copy. Todo código frontend debe pasar por esta compuerta antes de darse por terminado.
>
> **Regla operativa para agentes**: `docs/agent-rules/impeccable-design-rule.md`

## Filosofía

Premium, tecnológico, elegante. Inspirado en Vercel, Linear, Stripe y Raycast, pero adaptado a la identidad de LabrazaHome Labs.

- Oscuro por defecto (el tema claro es el alternativo)
- Tipografía limpia con Inter
- Espaciado generoso
- Color primario: índigo (#6366F1)
- Bordes sutiles, sombras suaves

---

## Tokens

Los tokens se definen en dos lugares:

1. **CSS** — `src/styles/global.css` → `@theme` (Tailwind v4), fuente de verdad para el renderizado
2. **TypeScript** — `src/design-system/` → archivos de documentación/referencia para componentes

### Colores

| Token              | Light     | Dark      | Uso                                       |
| ------------------ | --------- | --------- | ----------------------------------------- |
| `primary`          | `#6366f1` | `#6366f1` | Acciones principales, enlaces             |
| `primary-dark`     | `#4f46e5` | `#4f46e5` | Hover de primary                          |
| `primary-light`    | `#a5b4fc` | `#a5b4fc` | Variantes claras, gradientes              |
| `surface`          | `#fafafa` | `#09090b` | Fondo de página                           |
| `surface-elevated` | `#ffffff` | `#27272a` | Superficies elevadas (modales, dropdowns) |
| `card`             | `#ffffff` | `#18181b` | Fondos de tarjetas                        |
| `border`           | `#e4e4e7` | `#27272a` | Bordes de componentes                     |
| `text`             | `#18181b` | `#fafafa` | Texto principal (usar zinc-900/zinc-100)  |
| `muted`            | `#71717a` | `#a1a1aa` | Texto secundario                          |
| `success`          | `#22c55e` | `#4ade80` | Estados positivos                         |
| `warning`          | `#f59e0b` | `#fbbf24` | Estados de advertencia                    |
| `danger`           | `#ef4444` | `#f87171` | Estados de error                          |

### Tipografía

| Estilo     | Clase                   | Tamaño         | Peso            |
| ---------- | ----------------------- | -------------- | --------------- |
| Display    | `text-6xl` – `text-8xl` | 3.75rem – 6rem | Extrabold (800) |
| Heading 1  | `text-4xl sm:text-5xl`  | 2.25rem – 3rem | Bold (700)      |
| Heading 2  | `text-2xl`              | 1.5rem         | Bold (700)      |
| Heading 3  | `text-lg font-semibold` | 1.125rem       | Semibold (600)  |
| Body       | `text-base`             | 1rem           | Normal (400)    |
| Body large | `text-lg`               | 1.125rem       | Normal (400)    |
| Small      | `text-sm`               | 0.875rem       | Normal (400)    |
| Caption    | `text-xs`               | 0.75rem        | Medium (500)    |

- Font family base: `Inter` (sans-serif)
- Font family mono: `JetBrains Mono` (definido como token, pendiente de carga)
- Letter spacing para etiquetas: `tracking-[0.2em]`

### Spacing

Usar la escala de Tailwind v4 (p-{n}) basada en rem:

`0.25` | `0.5` | `0.75` | `1` | `1.5` | `2` | `2.5` | `3` | `3.5` | `4` | `5` | `6` | `7` | `8` | `9` | `10` | `11` | `12` | `14` | `16` | `20` | `24` | `28` | `32` | `36` | `40` | `44` | `48` | `52` | `56` | `60` | `64` | `72` | `80` | `96`

Convención:

- Secciones: `py-20` (`sm:py-28`, `lg:py-32`)
- Tarjetas: `p-6` o `p-8`
- Gap entre elementos: `gap-4`, `gap-6`, `gap-8`
- Stack vertical: `space-y-3`, `space-y-4`, `space-y-6`

### Radio

| Clase          | Valor   | Uso                    |
| -------------- | ------- | ---------------------- |
| `rounded-lg`   | 0.5rem  | Botones, inputs        |
| `rounded-xl`   | 0.75rem | Tarjetas, contenedores |
| `rounded-full` | 9999px  | Badges                 |

### Sombras

| Clase                         | Uso               |
| ----------------------------- | ----------------- |
| `shadow-sm`                   | Tarjetas elevadas |
| `shadow-lg`                   | Hover de tarjetas |
| `shadow-lg shadow-primary/25` | Botón primary     |

---

## Componentes UI

### `Button.astro`

```astro
<Button variant="primary" size="lg" href="/ruta">Texto</Button>
<Button variant="secondary" size="md">Acción</Button>
<Button variant="ghost" size="sm">Cancelar</Button>
```

| Prop      | Valores                         | Default                                |
| --------- | ------------------------------- | -------------------------------------- |
| `variant` | `primary`, `secondary`, `ghost` | `primary`                              |
| `size`    | `sm`, `md`, `lg`                | `md`                                   |
| `href`    | string                          | — (renderiza `<button>` si no se pasa) |

### `Card.astro`

```astro
<Card>
  <h3>Título</h3>
  <p>Contenido</p>
</Card>
<Card variant="elevated">...</Card>
<Card variant="highlight">...</Card>
```

| Prop      | Valores                            | Default   |
| --------- | ---------------------------------- | --------- |
| `variant` | `default`, `elevated`, `highlight` | `default` |

### `Section.astro`

```astro
<Section id="seccion">
  <Container>...</Container>
</Section>
<Section background="muted">...</Section>
```

| Prop         | Valores            | Default   |
| ------------ | ------------------ | --------- |
| `id`         | string             | —         |
| `background` | `default`, `muted` | `default` |

### `Container.astro`

```astro
<Container>...</Container>
<Container width="narrow">...</Container>
```

| Prop    | Valores                                     | Default   |
| ------- | ------------------------------------------- | --------- |
| `width` | `default` (max-w-6xl), `narrow` (max-w-3xl) | `default` |

### `Badge.astro`

```astro
<Badge>Plataforma base</Badge>
<Badge variant="warning">En desarrollo</Badge>
<Badge variant="success">Completado</Badge>
```

| Prop      | Valores                         | Default   |
| --------- | ------------------------------- | --------- |
| `variant` | `default`, `success`, `warning` | `default` |

### `MetricCard.astro`

```astro
<MetricCard label="Usuarios" value="1,234" icon="👥">
  <span slot="trend">+12% este mes</span>
</MetricCard>
```

| Prop    | Valores                 | Default   |
| ------- | ----------------------- | --------- |
| `label` | string                  | requerido |
| `value` | string                  | requerido |
| `icon`  | string                  | —         |
| `trend` | `up`, `down`, `neutral` | —         |

---

## Utilities CSS

Definidas en `global.css` como `@utility`:

| Utility             | Efecto                                                         |
| ------------------- | -------------------------------------------------------------- |
| `section-padding`   | `px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32`                 |
| `container-default` | `mx-auto max-w-6xl`                                            |
| `container-narrow`  | `mx-auto max-w-3xl`                                            |
| `gradient-text`     | Gradiente primary → primary-light → primary con `bg-clip-text` |
| `text-balance`      | `text-wrap: balance` (distribución uniforme del texto)         |

---

## Convenciones

### Clases de color preferidas

En lugar de usar colores fijos, usar los tokens de Tailwind + custom:

```html
<!-- Correcto -->
<div
  class="bg-card text-muted border-border dark:bg-card-dark dark:border-border-dark"
>
  <!-- Incorrecto -->
  <div
    class="bg-white text-gray-500 border-gray-200 dark:bg-gray-900 dark:border-gray-700"
  ></div>
</div>
```

### Modo oscuro

Usar siempre `dark:` variant. El modo oscuro es el predeterminado conceptualmente,
pero técnicamente se controla con la clase `.dark` en `<html>`.

### Tipografía

- Títulos de sección: `text-4xl font-bold tracking-tight sm:text-5xl`
- Subtítulos de sección: `text-lg text-muted dark:text-muted-dark`
- Texto de tarjetas: `text-sm leading-relaxed text-muted dark:text-muted-dark`
- Etiquetas de sección: `text-sm font-medium uppercase tracking-[0.2em] text-primary`
