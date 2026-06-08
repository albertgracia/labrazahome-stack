import type {
  CatalogContextItem,
  SommelierProfile,
} from "../schemas/sommelier.schemas";

export class CatalogContextService {
  buildContext(
    _message: string,
    _profile: SommelierProfile,
    _selectedSlug?: string,
  ): CatalogContextItem[] {
    // TODO(STACK-2026-CATALOG-CONTEXT-SERVICE-01): implement candidate selection (max 5)
    // 1. Classify intent from message
    // 2. Find candidate products from catalog
    // 3. Filter by selected slug if provided
    // 4. Limit to 5 products
    // 5. Build compact context items
    return [];
  }
}
