import type {
  B2BSelectionItem,
  B2BUseCase,
  B2BSelectionSummary,
} from "../../types/b2b";
import { SELECTION_STORAGE_KEY } from "../../types/b2b";

export function loadSelection(): B2BSelectionItem[] {
  try {
    const raw = localStorage.getItem(SELECTION_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item: unknown): item is B2BSelectionItem =>
        typeof item === "object" &&
        item !== null &&
        "productSlug" in item &&
        "productName" in item &&
        "quantity" in item,
    );
  } catch {
    return [];
  }
}

export function saveSelection(items: B2BSelectionItem[]): void {
  try {
    localStorage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function addToSelection(
  slug: string,
  name: string,
  category: string,
  existing: B2BSelectionItem[],
): B2BSelectionItem[] {
  const found = existing.find((i) => i.productSlug === slug);
  if (found) {
    return existing.map((i) =>
      i.productSlug === slug
        ? { ...i, quantity: i.quantity + 1, addedAt: new Date().toISOString() }
        : i,
    );
  }
  return [
    ...existing,
    {
      productSlug: slug,
      productName: name,
      productCategory: category,
      quantity: 12,
      useCase: "" as B2BUseCase,
      addedAt: new Date().toISOString(),
    },
  ];
}

export function removeFromSelection(
  slug: string,
  existing: B2BSelectionItem[],
): B2BSelectionItem[] {
  return existing.filter((i) => i.productSlug !== slug);
}

export function updateQuantity(
  slug: string,
  quantity: number,
  existing: B2BSelectionItem[],
): B2BSelectionItem[] {
  if (quantity < 1) return removeFromSelection(slug, existing);
  return existing.map((i) => (i.productSlug === slug ? { ...i, quantity } : i));
}

export function updateUseCase(
  slug: string,
  useCase: B2BUseCase,
  existing: B2BSelectionItem[],
): B2BSelectionItem[] {
  return existing.map((i) => (i.productSlug === slug ? { ...i, useCase } : i));
}

export function clearSelection(): void {
  try {
    localStorage.removeItem(SELECTION_STORAGE_KEY);
  } catch {}
}

export function computeSummary(items: B2BSelectionItem[]): B2BSelectionSummary {
  const totalUnits = items.reduce((sum, i) => sum + i.quantity, 0);
  const categories = [...new Set(items.map((i) => i.productCategory))];
  const timestamps = items
    .map((i) => i.addedAt)
    .filter(Boolean)
    .sort();
  const lastUpdated =
    timestamps.length > 0 ? timestamps[timestamps.length - 1] : null;
  return {
    items,
    totalUnits,
    productCount: items.length,
    categories,
    lastUpdated,
  };
}
