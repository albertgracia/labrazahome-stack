# Audit Report: STACK-2026-B2B-TYPES-CONSOLIDATION-01

## Resultado

**PASS**

## Objetivo

Eliminar el primer duplicado concreto de tipos B2B detectado por las auditorías: el dual `B2BSelectionItem` inconsistente.

---

## Duplicado Original

| Ubicación                                   | Interface                    | Campos                                                                                                |
| ------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| `apps/web/src/types/b2b.ts:1`               | `B2BSelectionItem` (oficial) | `productSlug`, `productName`, `productCategory`, `quantity: number`, `useCase: B2BUseCase`, `addedAt` |
| `apps/web/src/data/b2b/mockDashboard.ts:27` | `B2BSelectionItem` (local)   | `productName`, `productSlug`, `quantity: string`, `use: string`, `status: string`                     |

**Inconsistencias**: `quantity` como string vs number. `use` vs `useCase`. `status` sin equivalente en el tipo oficial. Falta `productCategory` y `addedAt` en el local.

---

## Tipo Consolidado

**Archivo**: `apps/web/src/types/b2b.ts`
**Interface**: `B2BSelectionItem`

### Campos añadidos (opcionales)

```typescript
export type B2BSelectionStatus =
  | "draft"
  | "ready_for_quote"
  | "quote_prepared_mock"
  | "archived_mock";

export type B2BSelectionSource =
  | "dashboard_mock"
  | "quote_flow"
  | "workspace_mock";

export interface B2BSelectionItem {
  productSlug: string;
  productName: string;
  productCategory: string;
  quantity: number;
  useCase: B2BUseCase;
  addedAt: string;
  status?: B2BSelectionStatus; // ← nuevo opcional
  source?: B2BSelectionSource; // ← nuevo opcional
}
```

### Principios de diseño

- `quantity`: siempre `number` para permitir operaciones matemáticas en Quote Flow
- `status` y `source`: opcionales para no romper consumidores existentes
- `useCase`: mantiene `B2BUseCase` como tipo estricto con empty string como opción válida
- Todos los campos existentes son retrocompatibles

---

## Archivos Modificados

### 1. `apps/web/src/types/b2b.ts`

- Añadidos tipos `B2BSelectionStatus` y `B2BSelectionSource`
- Añadidos campos `status?` y `source?` a `B2BSelectionItem`
- Sin cambios en `B2BUseCase`, `B2BSelectionSummary`, `SELECTION_STORAGE_KEY`

### 2. `apps/web/src/data/b2b/mockDashboard.ts`

- **Eliminada** interfaz local `B2BSelectionItem` (líneas 27-33)
- Añadido `import type { B2BSelectionItem, B2BUseCase } from "../../types/b2b"`
- `currentSelection` adaptado:
  - `quantity`: string → number (`"12 botellas"` → `12`)
  - `use` → `useCase` (mapeado a `B2BUseCase`)
  - Añadido `productCategory` (extraído del contexto)
  - Añadido `addedAt` (timestamp ISO)
  - `status` migrado a `B2BSelectionStatus` (`"En selección"` → `"ready_for_quote"`)
  - Añadido `source: "dashboard_mock"`

### 3. `apps/web/src/components/b2b/B2BSelectionTable.astro`

- Import cambiado: `../../data/b2b/mockDashboard` → `../../types/b2b`
- `item.use` → `item.useCase` (con fallback `|| "—"`)
- `item.quantity` → `item.quantity + " uds"` (número con unidad)
- `item.status` → `item.status ?? "draft"` (fallback seguro)
- `statusColor` actualizado a valores del nuevo `B2BSelectionStatus`

---

## Interfaces Locales Eliminadas

| Archivo                                  | Interface          | Líneas eliminadas |
| ---------------------------------------- | ------------------ | ----------------- |
| `apps/web/src/data/b2b/mockDashboard.ts` | `B2BSelectionItem` | 27-33 (7 líneas)  |

---

## Pendientes Restantes

| Pendiente                                      | Archivo                                                      | Motivo                                                                                                               |
| ---------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| B2B Workspace data consolidation               | `apps/web/src/data/b2b/workspaceMock.ts`                     | Riesgo mayor, interfaz `WorkspaceSelection` tiene estructura diferente (no usa slugs). Se abordará en fase separada. |
| B2BSelectionManager usa `CatalogProduct` local | `apps/web/src/components/b2b/B2BSelectionManager.tsx`        | Interfaz inline que duplica campos de `B2BProduct`. No bloqueante.                                                   |
| B2BQuoteSummary y WorkspaceQuote sin unificar  | `apps/web/src/data/b2b/mockDashboard.ts`, `workspaceMock.ts` | Pendiente para `QuoteItem` contract.                                                                                 |

---

## Validaciones

```
pnpm format    — PASS
pnpm typecheck — PASS (sin errores)
pnpm build     — PASS (28 páginas)
pnpm check     — PASS
```

## Smoke Local

```
/b2b             — PASS (B2B dashboard compila correctamente)
/b2b/workspace   — PASS (sin cambios, sigue funcionando)
/b2b/documentos  — PASS (sin cambios)
Quote Flow       — PASS (B2BSelectionManager sigue usando types/b2b correctamente)
localStorage     — PASS (labrazahome:b2b-selection key sin cambios)
```

---

## Git

```
HEAD inicial: b83f922
HEAD final:   (pendiente commit)
```

```
git diff --stat
 apps/web/src/components/b2b/B2BSelectionTable.astro | 16 ++++++++--------
 apps/web/src/data/b2b/mockDashboard.ts               | 44 ++++++++++++++++++++++++++++----------------------
 apps/web/src/types/b2b.ts                             | 20 +++++++++++++++++++-
 3 files changed, 49 insertions(+), 31 deletions(-)
```

```
git commit -m "refactor(web): consolidate b2b selection item type"
git push origin main
```

---

## Siguiente fase recomendada

**STACK-2026-CATALOG-PRODUCTMASTER-SCAFFOLD-01**

Crear `ProductMaster` en `packages/shared/` como primer paso hacia la migración real del catálogo.
