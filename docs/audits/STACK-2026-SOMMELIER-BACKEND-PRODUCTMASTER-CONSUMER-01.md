# STACK-2026-SOMMELIER-BACKEND-PRODUCTMASTER-CONSUMER-01

## Goal

Migrate backend Sommelier API (`apps/api`) catalog mock data from its legacy `catalog.mock.ts` to be aligned with `ProductMaster` slugs, categories, and metadata.

## Design Decisions

- **Self-contained adapter** — `apps/api/src/modules/sommelier/data/product-master-catalog.adapter.ts` defines its own `MockProduct` interface and 11 products rather than importing from `apps/web` or `packages/shared`, avoiding cross-app dependency.
- **`catalog.mock.ts` becomes a thin re-exporter** — only exports from the adapter, preserving the existing `mockCatalog` import path for all consumers (`mock.provider.ts`, `catalog-context.service.ts`, etc.).
- **Non-existent slugs removed** — `miel-de-milflores`, `aove-cosecha-temprana`, `aove-ecologico`, `foie-gras-de-pato`, `pack-ibéricos` are not in `ProductMaster` and were removed.
- **`coupage-de-sierra` corrected** — category changed from `vinos` to `aceites`, specs/producer/region updated to reflect its oil identity.
- **New products added** — `blanco-de-viura-seleccion`, `arbequina-temprana`, `miel-de-brezo-atlantico`, `conserva-artesana-seleccion`, `crema-de-almendra-premium`, `pack-descubrimiento-rioja` added to match ProductMaster.

## Files Changed

- **Created**: `apps/api/src/modules/sommelier/data/product-master-catalog.adapter.ts`
- **Rewritten**: `apps/api/src/modules/sommelier/data/catalog.mock.ts`

## Verification

```
pnpm format        ✓
pnpm --filter api typecheck  ✓ (0 errors)
pnpm --filter api build      ✓
pnpm check          ✓ (0 errors, 0 warnings, 28 pages)
```

### API Endpoint Smoke Tests

| Endpoint                                 | Status | Notes                                                                      |
| ---------------------------------------- | ------ | -------------------------------------------------------------------------- |
| `GET /api/v1/status`                     | ✅ 200 | `{"service":"stack-2026-api","status":"running"}`                          |
| `GET /api/v1/sommelier/health`           | ✅ 200 | `{"status":"ok","provider":"mock"}`                                        |
| `GET /api/v1/sommelier/providers`        | ✅ 200 | All 3 providers listed                                                     |
| `POST /api/v1/sommelier/catalog-context` | ✅ 200 | Returns 5 ProductMaster-aligned products; `coupage-de-sierra` in `aceites` |
