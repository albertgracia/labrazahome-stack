# STACK-2026-B2B-DOCUMENT-CENTER-MOCK-01

## Objetivo

Crear el Centro de Documentos B2B Mock dentro del Portal B2B v2. Simular un área profesional donde el cliente B2B pueda consultar fichas técnicas, catálogos, argumentarios, maridajes y documentos de producto.

## Ruta creada

`/b2b/documentos`

## Datos mock

`apps/web/src/data/b2b/documentCenter.ts`

- `documentCategories`: 6 tipos de documento (Ficha técnica, Catálogo, Argumentario, Maridaje, Certificación, Pack)
- `documentProfiles`: 5 perfiles (Restaurante, Tienda gourmet, Hotel, Distribuidor, Empresa)
- `documentStatuses`: 3 estados (Disponible, En preparación, Futuro)
- `documentStats`: 6 KPIs métricos
- `featuredDocuments`: 5 documentos destacados
- `productDocuments`: 9 documentos agrupados por producto (Vinos 3, Aceites 2, Mieles 2, Packs 2)

## Componentes creados

`apps/web/src/components/b2b/documents/`

| Componente                 | Tipo  | Descripción                                    |
| -------------------------- | ----- | ---------------------------------------------- |
| `DocumentCenterHero.astro` | Astro | Hero con título, subtítulo y badges            |
| `DocumentStats.astro`      | Astro | KPI strip con 6 métricas                       |
| `DocumentFilters.tsx`      | React | Filtros por categoría, perfil y estado         |
| `FeaturedDocuments.tsx`    | React | Grid de tarjetas con filtros + expand inline   |
| `DocumentDetailView.tsx`   | React | Panel de detalle expandible inline             |
| `ProductDocuments.astro`   | Astro | Documentos agrupados por categoría de producto |
| `DocumentLabNotice.astro`  | Astro | Aviso de laboratorio                           |

## Tipos añadidos

`apps/web/src/types/b2b.ts`

- `B2BDocumentType`: unión de tipos de documento
- `B2BDocumentStatus`: unión de estados
- `B2BDocumentProfile`: unión de perfiles
- `B2BDocumentMock`: interfaz completa de documento (id, title, type, category, profile, status, productSlug, productName, description, professionalUse, mockContent)

## Funcionalidades

- **Filtros interactivos**: 3 grupos de filtros (categoría, perfil, estado) con botones de selección y limpiador
- **Documentos destacados**: 5 tarjetas con tipo, estado, perfiles y 2 CTAs (Ver detalle, Descargar mock)
- **Detalle expandible**: al hacer clic en "Ver detalle" se expande inline (no modal, siguiendo Impeccable Gate) con contenido simulado, producto relacionado, perfiles y aviso mock
- **Documentos por producto**: 9 documentos agrupados en 4 categorías (Vinos, Aceites, Mieles, Packs)
- **Navegación**: enlaces a Workspace B2B y Sommelier B2B desde la página
- **Aviso laboratorio**: visible en todas las secciones

## Responsive

- Desktop: grid 3 columnas (filtros 1/4, docs 3/4)
- Tablet: filtros colapsan a ancho completo
- Mobile: 1 columna, sin overflow

## Impeccable Gate review

- Sin gradient text decorativo
- Sin glassmorphism decorativo
- Sin modal como primera opción (detalle inline expandible)
- Estados hover/focus en botones de filtro y CTAs
- Sin em dashes
- Sin buzzwords
- Touch targets ≥44×44px en botones de filtro y CTAs
- Contraste texto cuerpo ≥4.5:1
- Animaciones con reduced-motion alternative
- Escala tipográfica fija (rem)
- `text-wrap: balance` en headings

## Limitaciones

- Filtros solo actúan sobre los 5 documentos destacados (no sobre la sección de productos)
- Descarga mock sin archivo real (no-op)
- Sin búsqueda textual (solo filtros por categoría/perfil/estado)
- Sin persistencia de filtros (se pierden al recargar)
- Sin paginación (datos mock < 20 items)

## Validaciones

- `pnpm format`: OK
- `pnpm --filter web typecheck`: OK
- `pnpm --filter web build`: OK (25 páginas, incluye `/b2b/documentos/index.html`)
- `pnpm check`: OK

## Commits

- `8137936` HEAD inicial
- `[commit]` feat(web): create b2b document center mock

## Próximos pasos

- STACK-2026-B2B-DOCUMENT-CENTER-VERCEL-SMOKE-01: validación en Vercel
