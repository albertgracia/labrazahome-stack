export type ProductCategory =
  | "vinos"
  | "aceites"
  | "mieles"
  | "gourmet"
  | "packs";

export type ProductStatus = "concept" | "design" | "prototype" | "future";

export type WineRatingSource =
  | "Parker"
  | "Peñín"
  | "Decanter"
  | "Proensa"
  | "Otro";

export interface WineRating {
  source: WineRatingSource;
  score: number;
  maxScore: 100;
  year?: number;
  note?: string;
  isMock?: boolean;
}

export interface ProductPremium {
  id: string;
  slug: string;
  category: ProductCategory;
  name: string;
  producer: string;
  region: string;
  shortDescription: string;
  longDescription: string;
  status: ProductStatus;
  tags: string[];
  highlights: string[];
  specs: Record<string, string>;
  pairing: string[];
  story: string;
  imageGradient: string;
  featured: boolean;
  ratings?: WineRating[];
}

export interface CategoryInfo {
  slug: ProductCategory;
  name: string;
  icon: string;
  description: string;
  heroGradient: string;
}
