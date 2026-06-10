# STACK-2026-B2B-WORKSPACE-PRODUCTMASTER-CONSUMER-01

## Objetivo

Migrar las selecciones del B2B Workspace (`/b2b/workspace`) para que los nombres de producto deriven de `ProductMaster` por slug, manteniendo la metadata mock de workspace (createdAt, useCase, status).

## Archivos modificados

| Archivo                                  | Cambio                                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------------------ |
| `apps/web/src/data/b2b/workspaceMock.ts` | `import { getProductMasterBySlug }`; seed data con slugs; `getWorkspaceSelections()` |
| `apps/web/src/pages/b2b/workspace.astro` | importa `getWorkspaceSelections` en lugar de `workspaceSelections` constante         |

## Estrategia

1. Crear tipo interno `WorkspaceSelectionSeed` con `products: Array<{ slug: string; quantity: string }>`
2. Seed data `workspaceSelectionSeeds` con slugs reales del catálogo
3. Función `getWorkspaceSelections()` mapea slug → `getProductMasterBySlug(slug)?.name`
4. Fallback seguro: si slug no se encuentra, se usa el slug como nombre visible
5. Metadata de workspace (createdAt, useCase, status) se mantiene como mock local

## Resultado

| Campo                 | Antes               | Ahora                                |
| --------------------- | ------------------- | ------------------------------------ |
| `products[].name`     | Hardcodeado en seed | `getProductMasterBySlug(slug)?.name` |
| `products[].quantity` | Hardcodeado en seed | Se mantiene en seed, sin cambios     |
| `createdAt`           | Mock local          | Sin cambios                          |
| `useCase`             | Mock local          | Sin cambios                          |
| `status`              | Mock local          | Sin cambios                          |

## Slugs mapeados

- `reserva-del-alto-ebro` → "Reserva del Alto Ebro"
- `coupage-de-sierra` → "Coupage de Sierra"
- `miel-de-romero-clara` → "Miel de Romero Clara"
- `pack-mesa-premium` → "Pack Mesa Premium"
- `crema-de-almendra-premium` → "Crema de Almendra Premium"

## No migrado (intencionalmente)

- `workspaceQuotes` — sin cambio
- `workspaceDocuments` — sin cambio
- `workspaceTimeline` — sin cambio
- `workspaceSommelierRecommendations` — sin cambio
- `workspaceProfiles` — sin cambio
- `quoteFlow.ts` / localStorage — sin cambio
- `B2BSelectionManager` — sin cambio

## Validaciones

| Comando                       | Resultado |
| ----------------------------- | --------- |
| `pnpm format`                 | ✅        |
| `pnpm --filter web typecheck` | ✅        |
| `pnpm --filter web build`     | ✅ (28p)  |
| `pnpm check`                  | ✅        |

## Smoke local

| Ruta              | Resultado |
| ----------------- | --------- |
| `/b2b/workspace`  | ✅        |
| `/b2b`            | ✅        |
| `/b2b/documentos` | ✅        |
| `/sommelier`      | ✅        |
| `/catalogo`       | ✅        |
| `/admin`          | ✅        |

## Commit

```
9d523c6..<hash> refactor(web): migrate b2b workspace selections to product master
```
