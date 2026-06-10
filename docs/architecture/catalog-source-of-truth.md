# Catalog Source of Truth

## ProductMaster at a Glance

```typescript
// Defined in: packages/shared/src/product-master.ts
interface ProductMaster {
  slug: string;
  name: string;
  category: "vinos" | "aceites" | "mieles" | "gourmet" | "packs";
  shortDescription: string;
  specs: ProductMasterSpecs;
  pairings: string[];
  tags: string[];
  status: ProductMasterStatus;
  producer: string;
  knowledge: ProductMasterKnowledge;
  ratings: ProductMasterRating[];
}
```

## Consumers

### Web: Catalog Pages

- `apps/web/src/pages/catalogo/index.astro` — `getFeaturedProductMasters()`
- `apps/web/src/pages/catalogo/[categoria].astro` — `getProductMastersByCategory()`
- `apps/web/src/pages/catalogo/[categoria]/[slug].astro` — `getProductMasterBySlug()`
- `apps/web/src/components/catalog/ProductCardMaster.astro` — card component consuming `ProductMaster`

### Web: Sommelier AI

- `apps/web/src/data/sommelier/mockResponses.ts` — mock engine on ProductMaster
- `apps/web/src/data/sommelier/context.ts` — context builder on ProductMaster
- `apps/web/src/components/sommelier/SommelierChat.tsx` — ProductMaster props
- `apps/web/src/components/sommelier/ProductContextPanel.tsx` — ProductMaster props

### Web: B2B Portal

- B2B dashboard recommended products (`mockDashboard.ts`)
- B2B workspace selections (`workspaceMock.ts`)
- B2B document center (`documentCenter.ts`)

### Web: Admin Dashboard

- Admin catalog review items (`adminDashboard.ts`)
- Admin content manager products (`contentManager.ts`)

### Web: Admin — Sommelier Governance

- `apps/web/src/data/admin/sommelierGovernance.ts` — `getBlockedProducts()` derives blocked product names from ProductMaster by slug

### Backend: Sommelier API

- `apps/api/src/modules/sommelier/data/product-master-catalog.adapter.ts` — self-contained adapter with 11 products aligned to ProductMaster slugs and categories
- `apps/api/src/modules/sommelier/data/catalog.mock.ts` — thin re-export from adapter

## Adapters & Migration

### Web Adapter

`apps/web/src/data/catalog/productMasterAdapter.ts` maps `ProductPremium[]` → `ProductMaster[]` (7 exported functions). Validation at `productMasterValidation.ts` confirms full parity (12 checks, 0 failures).

### Backend Adapter

`apps/api/src/modules/sommelier/data/product-master-catalog.adapter.ts` defines `MockProduct` interface and 11 hardcoded products. No `ProductPremium` dependency. All slugs match ProductMaster.

### Legacy

`ProductPremium`, `products.ts`, `types/catalog.ts`, `ProductCardPremium.astro` remain untouched as adapter source.
