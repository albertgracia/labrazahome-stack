export type Profile = "private" | "b2b" | "supplier" | "admin";

export interface ProductContext {
  slug: string;
  name: string;
  category: string;
  producer: string;
}

export interface Recommendation {
  slug: string;
  name: string;
  category: string;
  reason: string;
  confidence: number;
}

export interface Pairing {
  product: string;
  pairing: string;
  reason: string;
}

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isMock: boolean;
  recommendations?: Recommendation[];
  pairings?: Pairing[];
};
