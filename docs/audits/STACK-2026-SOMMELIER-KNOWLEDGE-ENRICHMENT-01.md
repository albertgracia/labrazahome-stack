# STACK-2026-SOMMELIER-KNOWLEDGE-ENRICHMENT-01

## Status: Done

## Goal

Enrich the Sommelier mock engine with structured product knowledge so responses feel informed, editorial, and credible.

## Changes

### `types/catalog.ts`

- Added `ProductKnowledge` interface with optional fields per category:
  - **Vinos:** `variety`, `crianza`, `altitude`, `servingTemperature`, `agingPotential`, `body`, `finish`, `tastingNotes`, `aromaProfile`
  - **Aceites:** `oliveVariety`, `bitterness`, `pungency`, `culinaryUses`, `idealFor`
  - **Mieles:** `floralOrigin`, `intensity`, `texture`, `sweetness`, `recommendedUses`
  - **Packs:** `targetAudience`, `occasion`, `premiumLevel`, `includes`, `recommendedFor`
- Added optional `knowledge?: ProductKnowledge` to `ProductPremium`

### `data/catalog/products.ts`

All 11 products enriched:

| Product               | Key knowledge added                                                                                |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| Reserva del Alto Ebro | Tempranillo, Crianza 18m, 650m alt, 16-18°C, 10y, bold/medium finish, cherry/vanilla/tobacco notes |
| Garnacha de Altura    | Garnacha, 6m, 800m alt, 14-16°C, 5y, medium/medium finish, strawberry/raspberry/herbs              |
| Blanco de Viura       | Viura, 4m, 550m alt, 8-10°C, 2y, light/crisp, citrus/floral/green apple                            |
| Arbequina Temprana    | Arbequina, suave, almendras verdes, ensaladas/pescados, pan/crudos                                 |
| Coupage de Sierra     | Picual+Arbequina+Hojiblanca, medio, hoja/tomate, guisos/asados/repostería                          |
| Miel de Brezo         | Brezo, alta, cremosa, baja, tumbaconas/salsas/bizcochos                                            |
| Miel de Romero        | Romero, baja, líquida, alta, infusiones/yogur/bizcochos                                            |
| Conserva Artesana     | Variedad mixta, aperitivos/ensaladas/tostas, picoteo/emergencias                                   |
| Crema de Almendra     | Almendra Marcona, untuosa, tostas/naranja/chocolate, postres/desayunos/snacks                      |
| Pack Descubrimiento   | Principiantes/curiosos, iniciación, medio, 3 botellas, cata/aprender/regalar                       |
| Pack Mesa Premium     | Familias/anfitriones, cena, premium, 2 botellas+aceite+crema, celebración/detalle                  |

### `data/sommelier/mockResponses.ts`

- Added `buildWineKnowledge()`, `buildOilKnowledge()`, `buildHoneyKnowledge()`, `buildPackKnowledge()` helper functions
- Each enriches the generated `answer` with tasting notes, service temperature, aroma profile, body/finish, culinary uses, and pairing rationale depending on product type
- All existing intents (vino+carne 92%, queso 88%, aceite 90%, miel 90%, regalo 95%, fallback 30%) preserved
- Pairing reason strings now reference product name and specific knowledge fields

## Verification

- `pnpm --filter web typecheck` passes
- `pnpm --filter web build` passes (22 pages, 2.10s)
- `pnpm format` applied

## Files Changed

```
M apps/web/src/types/catalog.ts
M apps/web/src/data/catalog/products.ts
M apps/web/src/data/sommelier/mockResponses.ts
A docs/audits/STACK-2026-SOMMELIER-KNOWLEDGE-ENRICHMENT-01.md
```
