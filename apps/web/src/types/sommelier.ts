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

export interface ConversationContext {
  category: string | null;
  step: number;
  totalSteps: number;
  collected: Record<string, string>;
  completed: boolean;
}

export type FlowResultType = "question" | "recommendation" | "fallback";

export interface ConversationResult {
  type: FlowResultType;
  answer: string;
  recommendations?: Recommendation[];
  pairings?: Pairing[];
  step?: number;
  totalSteps?: number;
  confidence: number;
}
