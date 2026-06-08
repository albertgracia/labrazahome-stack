import { ProductPremium } from "../../types/catalog";
import { getProductBySlug } from "../catalog/index";

export function getSommelierContext(slug: string): {
  product: ProductPremium | undefined;
  contextSlug: string;
} {
  const product = getProductBySlug(slug);
  return { product, contextSlug: slug };
}
