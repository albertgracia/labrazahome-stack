# STACK-2026-SOMMELIER-GOVERNANCE-PRODUCTMASTER-CONSUMER-01

## Goal

Migrate product references in Sommelier Governance mock data (`blockedProducts`) to derive names from ProductMaster.

## Design Decisions

- **Blocked products use `productSlug` seeds** — `blockedProductSeeds` array defines slugs + reasons; `getBlockedProducts()` resolves name via `getProductMasterBySlug()`.
- **`BlockedProductItem` gains optional `productSlug`** — added to the type in `types/admin.ts` for traceability.
- **`recentInteractions` left unchanged** — all product references in interaction queries (Garnacha de Altura, Coupage de Sierra, Arbequina Temprana, Pack Mesa Premium) match real ProductMaster slugs.
- **No UI changes** — component `SommelierBlockedProducts.astro` reads `.name` and `.reason` as before; `productSlug` is unused in rendering.

## Files Changed

- **Modified**: `apps/web/src/types/admin.ts` — added `productSlug?: string` to `BlockedProductItem`
- **Modified**: `apps/web/src/data/admin/sommelierGovernance.ts` — import `getProductMasterBySlug`, replace `blockedProducts` constant with `getBlockedProducts()` function
- **Modified**: `apps/web/src/pages/admin/sommelier.astro` — import `getBlockedProducts` instead of `blockedProducts`, call in frontmatter

## ProductMaster Fields Consumed

- `ProductMaster.name` → `blockedProducts[].name`
- Lookup key: `ProductMaster.slug` → `blockedProducts[].productSlug`

## Slugs Used

| seed.productSlug            | ProductMaster.name        | Resolved OK |
| --------------------------- | ------------------------- | ----------- |
| `pack-mesa-premium`         | Pack Mesa Premium         | ✅          |
| `crema-de-almendra-premium` | Crema de Almendra Premium | ✅          |

## Validations

| Command                       | Result   |
| ----------------------------- | -------- |
| `pnpm format`                 | ✅       |
| `pnpm --filter web typecheck` | ✅       |
| `pnpm --filter web build`     | ✅ (28p) |
| `pnpm check`                  | ✅       |

## UI Changed

No. `SommelierBlockedProducts.astro` unchanged; renders `.name` and `.reason` as before.
