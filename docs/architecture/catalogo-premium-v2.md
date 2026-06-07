# Catálogo Premium v2 — Arquitectura

## Visión

El Catálogo Premium v2 será la experiencia editorial y visual de producto dentro del ecosistema LabrazaHome. Está concebido como un escaparate digital de alta gama para vinos, aceites, mieles, productos gourmet y packs seleccionados del sector agroalimentario premium.

No es un catálogo transaccional tradicional. Es una experiencia de descubrimiento que combina:

- Fichas de producto con profundidad editorial
- Imágenes, historia y contexto del productor
- Recomendaciones inteligentes impulsadas por Sommelier AI v2
- Integración futura con precios B2B y disponibilidad

## Objetivos

- Mostrar productos agroalimentarios premium con calidad editorial
- Servir como base visual para Sommelier AI v2 (recomendaciones, maridajes)
- Proveer fichas técnico-comerciales para Portal B2B v2
- Exponer datos estructurados para Backoffice Admin v2
- Preparar la integración controlada con Rioja Marketplace producción

## Alcance

| Incluye                          | No incluye                    |
| -------------------------------- | ----------------------------- |
| Fichas de producto premium       | Carrito de compra             |
| Categorías y filtros visuales    | Pasarela de pago              |
| SEO por producto (JSON-LD, OG)   | Gestión de stock              |
| Historias de producto y bodega   | Pedidos B2B                   |
| Maridajes y pairing visual       | Catálogo de Rioja Marketplace |
| Placeholders para integración AI | Autenticación de usuarios     |
| Documentación de integraciones   | Base de datos definitiva      |

## Tipos de Producto

### Vino

| Campo               | Tipo     | Ejemplo                                 |
| ------------------- | -------- | --------------------------------------- |
| nombre              | string   | "Crianza Selección 2020"                |
| bodega              | string   | "Bodegas Labraza"                       |
| denominacion        | string   | "D.O.Ca Rioja"                          |
| variedad            | string[] | ["Tempranillo", "Garnacha"]             |
| añada               | number   | 2020                                    |
| region              | string   | "Rioja Alta"                            |
| crianza             | string   | "Crianza, 12 meses barrica"             |
| notasCata           | string   | "Notas de frutos rojos..."              |
| maridaje            | string[] | ["Carnes rojas", "Quesos curados"]      |
| temperaturaServicio | string   | "16-18°C"                               |
| fichaTecnica        | url      | PDF con ficha técnica                   |
| alcohol             | number   | 14.5                                    |
| imágenes            | string[] | URLs de imágenes                        |
| historia            | string   | Texto editorial                         |
| etiquetas           | string[] | ["ecológico", "premium"]                |
| disponibilidad      | enum     | "disponible", "proximamente", "agotado" |

### Aceite

| Campo            | Tipo     | Ejemplo                            |
| ---------------- | -------- | ---------------------------------- |
| nombre           | string   | "AOVE Hojiblanca Selección"        |
| productor        | string   | "Almazara Labraza"                 |
| variedadAceituna | string   | "Hojiblanca"                       |
| cosecha          | number   | 2025                               |
| acidez           | number   | 0.15                               |
| notasSensoriales | string   | "Frutado intenso..."               |
| usoGastronomico  | string[] | ["Ensaladas", "Pescados", "Untar"] |
| origen           | string   | "Sierra de Cazorla"                |
| certificaciones  | string[] | ["DOP", "Ecológico"]               |
| imágenes         | string[] | URLs de imágenes                   |

### Miel

| Campo        | Tipo     | Ejemplo                     |
| ------------ | -------- | --------------------------- |
| nombre       | string   | "Miel de Azahar"            |
| origenFloral | string   | "Azahar"                    |
| productor    | string   | "Apícola Labraza"           |
| textura      | string   | "Líquida"                   |
| intensidad   | enum     | "suave", "media", "intensa" |
| notas        | string   | "Aromas florales..."        |
| maridaje     | string[] | ["Tés", "Quesos frescos"]   |
| zona         | string   | "Valle del Ebro"            |
| cosecha      | number   | 2025                        |

### Gourmet

| Campo     | Tipo     | Ejemplo                             |
| --------- | -------- | ----------------------------------- |
| nombre    | string   | "Pack Degustación Rioja"            |
| tipo      | string   | "conserva", "foie", "trufa", "otro" |
| productor | string   | nombre del productor                |
| origen    | string   | región                              |
| peso      | string   | "250g"                              |
| notas     | string   | descripción editorial               |
| imágenes  | string[] | URLs                                |

### Pack

| Campo          | Tipo     | Ejemplo                                      |
| -------------- | -------- | -------------------------------------------- |
| nombre         | string   | "Experiencia Enológico"                      |
| productos      | string[] | IDs de productos incluidos                   |
| tipo           | enum     | "cata", "regalo", "experiencia", "temporada" |
| descripcion    | string   | texto editorial del pack                     |
| imágenes       | string[] | URLs                                         |
| disponibilidad | enum     | "disponible", "proximamente", "agotado"      |

## Modelo Conceptual

```
ProductoPremium (interfaz base)
├── Vino
├── Aceite
├── Miel
├── Gourmet
└── Pack (compuesto de otros productos)

Cada producto tiene:
- metadata SEO (title, description, JSON-LD)
- contenido editorial (historia, notas)
- contenido visual (imágenes, galería)
- datos técnicos (específicos por tipo)
- etiquetas y categorización
- estado (disponible, próximamente, agotado)
```

## Rutas Futuras

```
/catalogo                          → Landing del catálogo (categorías + destacados)
/catalogo/vinos                    → Listado de vinos
/catalogo/aceites                  → Listado de aceites
/catalogo/mieles                   → Listado de mieles
/catalogo/gourmet                  → Listado de gourmet
/catalogo/packs                    → Listado de packs
/catalogo/[categoria]/[slug]       → Ficha de producto individual
```

Todas las rutas son estáticas en Astro (output: static). Los slugs se generan en build time.

No implementadas todavía — solo documentación.

## Componentes Futuros (src/components/catalog/)

| Componente                 | Propósito                                                               |
| -------------------------- | ----------------------------------------------------------------------- |
| `ProductCardPremium.astro` | Card de producto en listados con imagen, nombre, bodega, precio, badges |
| `ProductHero.astro`        | Cabecera de ficha con imagen principal, título, bodega, añada, CTA      |
| `ProductSpecs.astro`       | Tabla de especificaciones técnicas (tipo-dependiente)                   |
| `ProductStory.astro`       | Bloque editorial: historia del producto, bodega, origen                 |
| `ProductPairing.astro`     | Sugerencias de maridaje y pairing visual                                |
| `ProductGallery.astro`     | Galería de imágenes con lightbox                                        |
| `ProductFilters.astro`     | Filtros laterales/superiores para listados                              |
| `ProductCategoryNav.astro` | Navegación entre categorías del catálogo                                |
| `ProductTrustBadges.astro` | Badges de calidad: DOP, ecológico, premios                              |
| `ProductAIHints.astro`     | Placeholder visual para recomendaciones AI futuras                      |

## Experiencia Visual

Estilo: editorial, premium, tecnológico.

Basado en el Design System de LabrazaHome Labs con las siguientes adaptaciones:

- **Fichas de producto**: formato de una sola columna con scroll narrativo (Apple product page style)
- **Listados**: grid responsivo (2-4 columnas según viewport)
- **Tipografía**: títulos de producto en display, cuerpo en text-base con leading generoso
- **Imágenes**: gran formato, sin distorsión, object-fit cover
- **Espaciado**: generoso, con secciones claramente diferenciadas
- **Color**: fondos limpios, acentos con primary para datos destacados
- **Badges**: para DOP, ecológico, premios, disponibilidad

Referencias visuales:

- Apple product pages (narrativa visual)
- Vercel (limpieza y jerarquía)
- Revistas gastronómicas digitales (editorial feel)
- Marketplaces premium (FarFetch, Mr Porter)

## SEO

Estrategia SEO por producto:

```html
<title>Vino Crianza 2020 — Bodegas Labraza | Catálogo Premium</title>
<meta name="description" content="..." />
<meta property="og:type" content="product" />
<meta property="og:title" content="..." />
<meta property="og:image" content="..." />
<link rel="canonical" href="/catalogo/vinos/crianza-2020" />

<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "...",
    "brand": { "@type": "Brand", "name": "Bodegas Labraza" },
    "category": "Vino",
    ...
  }
</script>
```

- Slug basado en nombre + añada (ej: `crianza-seleccion-2020`)
- Categorías en URL para contexto
- JSON-LD para cada tipo de producto
- Sitemap generado con @astrojs/sitemap
- Imágenes con alt text descriptivo
 
## Puntuaciones Críticas para Vinos
 
El Catálogo Premium v2 incluye soporte opcional para puntuaciones de guías críticas (Parker, Peñín, Decanter, Proensa, etc.) exclusivamente para productos de categoría **vino**.
 
### Características
 
- **Opcional**: No todos los vinos deben tener puntuaciones
- **Solo vinos**: No se aplica a aceites, mieles, gourmet ni packs
- **Fuentes permitidas**: Parker, Peñín, Decanter, Proensa, Otro
- **Estructura**: fuente, puntuación, maxScore (100), año opcional, nota opcional, flag isMock
- **Mock data**: En laboratorio, todas las puntuaciones llevan `isMock: true` y se muestran con badge "Mock laboratorio"
 
### Guardrails
 
| Regla | Descripción |
|-------|-------------|
| Solo vinos | Categoría `vinos` exclusivamente |
| Opcional | `ratings` es array opcional en ProductPremium |
| No inventar | No generar puntuaciones que no existan en datos |
| Mock visible | Badge "Mock laboratorio" + texto disclaimer en UI |
| Producción | En producción, `isMock: false` y fuente verificada |
| Sommelier AI | No mencionar puntuaciones si no existen en el producto |
 
### Componente Visual
 
`ProductRatings.astro` — Card con grid de puntuaciones, badge mock si aplica, y texto de guardrail visible.
 
---
 
## Integración con Sommelier AI v2

El catálogo será la fuente de datos principal para Sommelier AI v2:

| Funcionalidad                  | Dependencia del catálogo                    |
| ------------------------------ | ------------------------------------------- |
| Recomendaciones personalizadas | Datos de producto (variedad, región, notas) |
| Maridajes automáticos          | Campos de maridaje, tipo de producto        |
| Perfiles de usuario            | Historial de productos vistos, preferencias |
| Búsqueda semántica             | Metadatos enriquecidos de cada producto     |
| FAQ inteligente                | Fichas técnicas, historias, notas de cata   |
| Experiencia guiada             | árbol de categorías + atributos             |

La integración será vía API interna (futura). El catálogo expone datos; Sommelier AI consume y enriquece.

## Integración con Portal B2B v2

El catálogo proporcionará al Portal B2B v2:

- Fichas de producto completas (técnicas y editoriales)
- Imágenes en alta resolución
- Documentación descargable (fichas PDF)
- Metadatos comerciales (precios B2B futuros, condiciones)
- Packs profesionales predefinidos

El Portal B2B consumirá los mismos datos del catálogo pero con capa de precios y disponibilidad añadida.

## Integración con Backoffice Admin v2

El Backoffice Admin v2 gestionará el catálogo a través de:

| Área             | Funcionalidad                         |
| ---------------- | ------------------------------------- |
| Productos        | CRUD de productos, duplicar, archivar |
| Categorías       | Gestión de árbol de categorías        |
| Fichas técnicas  | Editor de campos específicos por tipo |
| Imágenes         | Subida, ordenación, alt text          |
| Estado editorial | Borrador, revisión, publicado         |
| Estado comercial | Visible, oculto, agotado              |
| SEO              | Editor de metadatos por producto      |
| Publicación      | Programación de publicación           |

## Integración con Rioja Marketplace

**Importante:** Rioja Marketplace producción NO se toca.

La integración futura se define como:

```
Fase futura → Catálogo Premium v2 ↔ Rioja Marketplace
                                          ↓
                                  read-only API
                                  export/import controlado
                                  sincronización planificada
                                  runbook obligatorio
                                  nunca conexión directa
```

Principios:

- El catálogo v2 vive en el laboratorio (Stack-2026)
- Rioja Marketplace producción es un sistema separado
- Cualquier sincronización requiere runbook, pruebas y despliegue controlado
- El catálogo v2 puede funcionar de forma completamente independiente
- La integración es una fase futura específica (Fase 4 del roadmap)

## Riesgos

| Riesgo                                    | Mitigación                                  |
| ----------------------------------------- | ------------------------------------------- |
| Confusión con Rioja Marketplace           | Documentación clara, separación de dominios |
| Sobredimensionamiento del modelo de datos | Empezar con Vino, iterar                    |
| Dependencia de imágenes de terceros       | Plan de asset management propio             |
| Deriva visual del Design System           | Checklist de revisión antes de implementar  |
| Integración prematura con producción      | Runbook obligatorio, fases separadas        |

## Roadmap

| Fase        | Hito                                       |
| ----------- | ------------------------------------------ |
| Fase actual | Arquitectura y documentación               |
| Fase 2      | Placeholder + tipos base + rutas estáticas |
| Fase 3      | Componentes de catálogo (cards, fichas)    |
| Fase 4      | Datos semilla + SEO + sitemap              |
| Fase 5      | Integración con Sommelier AI               |
| Fase 6      | Integración con Backoffice                 |
| Fase 7      | Preparación integración Rioja Marketplace  |
