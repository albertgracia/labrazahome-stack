export interface B2BSelectionItem {
  productSlug: string;
  productName: string;
  productCategory: string;
  quantity: number;
  useCase: B2BUseCase;
  addedAt: string;
}

export type B2BUseCase =
  | "Carta restaurante"
  | "Tienda gourmet"
  | "Hotel"
  | "Regalo corporativo"
  | "Evento"
  | "";

export const B2B_USE_CASES: B2BUseCase[] = [
  "Carta restaurante",
  "Tienda gourmet",
  "Hotel",
  "Regalo corporativo",
  "Evento",
];

export interface B2BSelectionSummary {
  items: B2BSelectionItem[];
  totalUnits: number;
  productCount: number;
  categories: string[];
  lastUpdated: string | null;
}

export const SELECTION_STORAGE_KEY = "labrazahome:b2b-selection";
