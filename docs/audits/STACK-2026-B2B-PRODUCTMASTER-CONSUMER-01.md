# STACK-2026-B2B-PRODUCTMASTER-CONSUMER-01

## Objetivo
Migrar los productos recomendados del B2B Dashboard para consumir `ProductMaster` como fuente base, en vez de datos locales hardcodeados.

## Scope
- ✅ B2B Dashboard `recommendedProducts` → `getB2BRecommendedProducts()`
- ❌ NO se tocó Workspace, Document Center, Admin, Backend, Prisma, Vercel, LM Studio, AI-LAB
- ❌ NO se tocó `currentSelection` ni quote flow
- ❌ NO se tocó `ProductPremium`, `products.ts`, `ProductCardPremium`
- ❌ NO se cambió UI visual

## Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `apps/web/src/data/b2b/mockDashboard.ts` | Añadido `getProductMasterBySlug` import; reemplazado `recommendedProducts` constante → `getB2BRecommendedProducts()` función |
| `apps/web/src/pages/b2b/index.astro` | Cambiado import de `recommendedProducts` → `getB2BRecommendedProducts` + llamada a función |

## Archivos revisados sin cambios

| Archivo | Resultado |
|---------|-----------|
| `B2BSelectionManager.tsx` | ✅ Props inline (`CatalogProduct`) — sin cambios |
| `B2BProductCard.astro` | ✅ Sin referencias desde páginas (legacy) |
| `types/b2b.ts` | ✅ Sin referencias a `ProductPremium` |
| `b2b/workspaceMock.ts` | ✅ Sin cambios |
| `b2b/documentCenter.ts` | ✅ Sin cambios |
| `b2b/quoteFlow.ts` | ✅ Sin cambios |

## Estrategia

`getB2BRecommendedProducts()` mantiene los campos mock B2B (`professionalUse`, `moq`, `image`) como lookup local por slug, y deriva los campos base del producto (`slug`, `name`, `category`) desde `ProductMaster` mediante `getProductMasterBySlug()`.

```
ProductMaster.getProductMasterBySlug(slug)
  ├── slug     → B2BProduct.slug
  ├── name     → B2BProduct.name
  ├── category → B2BProduct.category
  + lookup local → professionalUse, moq, image, status
```

## Campos base desde ProductMaster

| Campo | Fuente |
|-------|--------|
| `slug` | `productMaster.slug` |
| `name` | `productMaster.name` |
| `category` | `productMaster.category` |

## Campos B2B mock

| Campo | Valor |
|-------|-------|
| `professionalUse` | Mapeado por slug (lookup local) |
| `moq` | Mapeado por slug (lookup local) |
| `image` | Mapeado por slug (lookup local) |
| `status` | Siempre "En catálogo" |

## Validaciones

| Comando | Resultado |
|---------|-----------|
| `pnpm format` | ✅ |
| `pnpm --filter web typecheck` | ✅ 0 errors |
| `pnpm --filter web build` | ✅ 28 pages |
| `pnpm check` | ✅ lint + typecheck + build (5 packages) |

## Smoke local

| Ruta | Estado |
|------|--------|
| `/b2b` | ✅ |
| `/b2b/workspace` | ✅ |
| `/b2b/documentos` | ✅ |
| `/sommelier` | ✅ |
| `/catalogo` | ✅ |
| `/catalogo/vinos/reserva-del-alto-ebro` | ✅ |
| `/admin` | ✅ |
| Total 28 pages | ✅ |

## UI cambiada
No. La UI del B2B Dashboard es idéntica. `B2BSelectionManager` recibe `CatalogProduct[]` con los mismos campos.

## localStorage afectado
No. La selección sigue gestionándose por `quoteFlow.ts` (imports sin cambios).

## Datos B2B aún mock
- KPIs, perfiles, documentos, actividad, Sommelier hints: sin cambios
- `currentSelection` en `mockDashboard.ts`: sin cambios
- Workspace, Document Center: sin cambios

## Decisión
`PASS`. B2B Dashboard recommended products ahora derivan de `ProductMaster`. Sin regresiones.

## Siguiente fase recomendada
`STACK-2026-B2B-WORKSPACE-PRODUCTMASTER-CONSUMER-01`
