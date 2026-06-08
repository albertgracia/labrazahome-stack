export type Profile = "private" | "b2b" | "supplier" | "admin";

export interface ProductContext {
  slug: string;
  name: string;
  category: string;
  producer: string;
  // ... otros campos del catálogo que se usarán para el contexto
}

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isMock: boolean; // Indica si es una respuesta simulada de laboratorio
};
