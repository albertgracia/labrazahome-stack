export type B2BSelectionStatus =
  | "draft"
  | "ready_for_quote"
  | "quote_prepared_mock"
  | "archived_mock";

export type B2BSelectionSource =
  | "dashboard_mock"
  | "quote_flow"
  | "workspace_mock";

export interface B2BSelectionItem {
  productSlug: string;
  productName: string;
  productCategory: string;
  quantity: number;
  useCase: B2BUseCase;
  addedAt: string;
  status?: B2BSelectionStatus;
  source?: B2BSelectionSource;
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

// --- Document Center types ---

export type B2BDocumentType =
  | "Ficha técnica"
  | "Catálogo"
  | "Argumentario"
  | "Maridaje"
  | "Certificación"
  | "Pack";

export type B2BDocumentStatus = "Disponible" | "En preparación" | "Futuro";

export type B2BDocumentProfile =
  | "Restaurante"
  | "Tienda gourmet"
  | "Hotel"
  | "Distribuidor"
  | "Empresa";

export interface B2BDocumentMock {
  id: string;
  title: string;
  type: B2BDocumentType;
  category: string;
  profile: B2BDocumentProfile[];
  status: B2BDocumentStatus;
  productSlug: string | null;
  productName: string | null;
  description: string;
  professionalUse: string;
  mockContent: string;
}
