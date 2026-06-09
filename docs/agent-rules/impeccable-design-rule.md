# Impeccable Design Rule

Regla operativa para agentes que generan o modifican código frontend en Stack-2026. Esta regla se aplica automáticamente en toda tarea de diseño, maquetación, refactorización o auditoría visual.

## Activación

Aplicar esta regla cuando la tarea involucre:

- Crear o modificar un componente UI
- Diseñar o rediseñar una página o sección
- Añadir animaciones o transiciones
- Cambiar colores, tipografía o espaciado
- Revisar calidad visual de una interfaz existente
- Implementar un nuevo módulo frontend

## Reglas vinculantes

### 1. Antes de escribir código

1. Leer `docs/design-system.md` — entender tokens, componentes y convenciones
2. Leer `docs/design/impeccable-design-gate.md` — conocer prohibiciones absolutas y estándares
3. Identificar qué módulo aplica (Landing, Catálogo, Sommelier, B2B, Admin) y revisar su checklist específico

### 2. Durante la implementación

**Color y contraste:**

- Todo texto cuerpo debe tener contraste ≥4.5:1 sobre su fondo
- Gris sobre fondo coloreado está prohibido (usar tonalidad del propio tono)
- Acento (primary índigo) solo para CTAs, selección actual e indicadores de estado

**Tipografía:**

- Inter para toda la UI de producto (sin display fonts en botones, labels o datos)
- Línea de texto en prosa: máximo 75 caracteres
- `text-wrap: balance` en h1-h3; `text-wrap: pretty` en párrafos
- Sin all-caps en cuerpo; permitido solo en labels cortas y badges

**Layout:**

- Sin cards anidados
- Sin `border-left`/`border-right` >1px como acento decorativo
- Sin gradient text decorativo
- Sin glassmorphism decorativo
- Sin modales como primera opción (agotar inline primero)
- Sin numbered section markers (01/02/03) por defecto
- Máximo 1 section eyebrow (all-caps tracking) por página

**Motion:**

- Duración 150-250ms para transiciones de producto
- Easing: ease-out-quart/quint/expo. Sin bounce o elastic
- Animar solo transform y opacity (no layout properties)
- Toda animación debe tener alternativa `prefers-reduced-motion: reduce`
- Stagger legítimo en listas, pero cada sección con su propio reveal

**Interacción:**

- Todo componente interactivo debe tener: default, hover, focus, active, disabled
- Skeleton states para carga (no spinners)
- Empty states informativos (no "nothing here")
- Touch targets ≥44×44px en móvil
- Focus indicators visibles en toda interacción por teclado

**Copy:**

- Sin em dashes (usar coma, punto, dos puntos)
- Sin marketing buzzwords
- Botones: verbo + objeto
- Enlaces: significado autónomo

### 3. Flujo de aprobación

Antes de dar por terminada una tarea visual:

```
1. CORRER pnpm --filter web typecheck
2. CORRER pnpm --filter web build
3. REVISAR checklist del módulo en docs/design/impeccable-design-gate.md
4. VERIFICAR que ninguna prohibición absoluta está presente
5. VERIFICAR contraste de color en modo oscuro y claro
6. VERIFICAR responsive en móvil (320px+)
7. VERIFICAR reduced-motion
```

### 4. Penalizaciones

Si el código generado contiene cualquiera de las siguientes, debe reescribirse:

| Infracción                | Acción                                  |
| ------------------------- | --------------------------------------- |
| Gradient text decorativo  | Reemplazar por color sólido             |
| Glassmorphism decorativo  | Eliminar backdrop-filter/blur           |
| border-left accent stripe | Usar borde completo o nada              |
| section eyebrow repetido  | Mantener máximo 1 por página            |
| numbered section markers  | Eliminar a menos que sea secuencia real |
| Card anidado              | Reestructurar layout                    |
| Modal como primera opción | Cambiar a inline/slide                  |

## Referencias cruzadas

| Archivo                                                | Propósito                             |
| ------------------------------------------------------ | ------------------------------------- |
| `docs/design-system.md`                                | Tokens, componentes, convenciones CSS |
| `docs/design/impeccable-design-gate.md`                | Checkists por módulo + prohibiciones  |
| `docs/architecture/labrazahome-premium-ui-language.md` | Lenguaje de motion y animaciones      |
| `apps/web/src/design-system/`                          | Tokens TypeScript                     |
