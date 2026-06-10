import type { ProductMaster } from "../../../../../packages/shared/src/product-master";
import { getProductMasterBySlug } from "../catalog/index";

export function getSommelierContext(slug: string): {
  product: ProductMaster | undefined;
  contextSlug: string;
} {
  const product = getProductMasterBySlug(slug);
  return { product, contextSlug: slug };
}
