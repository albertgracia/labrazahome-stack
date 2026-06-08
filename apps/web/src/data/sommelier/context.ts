import { ProductPremium } from "../../types/catalog";
import { getMockProductContext, generateMockResponse } from "./mockResponses";

/**
 * Genera un objeto de contexto para el componente lateral del chat.
 */
export function getSommelierContext(slug: string): {
  product: ProductPremium | undefined;
  contextSlug: string;
} {
  const product = getMockProductContext(slug);
  return { product, contextSlug: slug };
}
