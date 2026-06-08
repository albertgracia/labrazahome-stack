import type { ProductPremium } from "../../types/catalog";
import { getProductBySlug, getProductsByCategory } from "../catalog/index";

// --- MOCK DATA ENGINE REFINEMENT ---

/**
 * Simula la obtención de un producto por slug del catálogo.
 */
export function getMockProductContext(
  slug: string,
): ProductPremium | undefined {
  return getProductBySlug(slug);
}

/**
 * Genera una respuesta mock basada en reglas simples y el contexto disponible, simulando la lógica de IA.
 * @param query La pregunta del usuario.
 * @param context El producto o conjunto de productos relevantes (opcional).
 * @returns Un objeto que simula la estructura de respuesta final.
 */
export function generateMockResponse(
  query: string,
  context?: ProductPremium,
): {
  answer: string;
  intent:
    | "pairing"
    | "recommendation"
    | "comparison"
    | "product_explanation"
    | "general";
  recommendedProducts: Array<{
    slug: string;
    name: string;
    category: string;
    reason: string;
    confidence: number;
  }>;
  pairings: Array<{ product: string; pairing: string; reason: string }>;
  confidence: number;
  warnings: Array<{
    type: "mock_data" | "no_data" | "low_confidence" | "lab_mode";
    message: string;
  }>;
  nextQuestions: string[];
} {
  const isMock = true; // Siempre es mock en esta fase

  let answer = "";
  let intent:
    | "pairing"
    | "recommendation"
    | "comparison"
    | "product_explanation"
    | "general" = "general";
  let recommendedProducts: Array<{
    slug: string;
    name: string;
    category: string;
    reason: string;
    confidence: number;
  }> = [];
  let pairings: Array<{ product: string; pairing: string; reason: string }> =
    [];
  let warnings: Array<{
    type: "mock_data" | "no_data" | "low_confidence" | "lab_mode";
    message: string;
  }> = [
    {
      type: "mock_data",
      message:
        "⚠️ ADVERTENCIA DE LABORATORIO: Esta respuesta es simulada y utiliza datos mock. No representa precios, stock o disponibilidad real.",
    },
  ];

  const lowerQuery = query.toLowerCase();

  // --- Lógica de Reglas Simples (Mock Engine) ---

  if (
    lowerQuery.includes("vino") &&
    (lowerQuery.includes("rioja") || lowerQuery.includes("parker"))
  ) {
    intent = "recommendation";
    const contextProduct = getMockProductContext("reserva-del-alto-ebro");
    answer = `Basado en tu interés por vinos de Rioja o puntuaciones Parker, te recomiendo el ${contextProduct?.name || "Reserva del Alto Ebro"}. Es un clásico que combina la estructura de la Rioja Alta con notas complejas de crianza.`;
    recommendedProducts.push({
      slug: "reserva-del-alto-ebro",
      name: contextProduct?.name || "Reserva del Alto Ebro",
      category: "vinos",
      reason:
        "Por su perfil clásico y balanceado, ideal para cualquier ocasión.",
      confidence: 0.95,
    });
  } else if (lowerQuery.includes("aceite") && lowerQuery.includes("aove")) {
    intent = "recommendation";
    const contextProduct = getMockProductContext("coupage-de-sierra");
    answer = `Para un Aove de alta calidad, te recomiendo el ${contextProduct?.name || "Coupage de Sierra"}. Su perfil frutado y su baja acidez lo hacen perfecto para ensaladas o pescados.`;
    recommendedProducts.push({
      slug: "coupage-de-sierra",
      name: contextProduct?.name || "Coupage de Sierra",
      category: "aceites",
      reason:
        "Su frescura y notas herbáceas son ideales para la cocina diaria.",
      confidence: 0.9,
    });
  } else if (lowerQuery.includes("regalo") || lowerQuery.includes("pack")) {
    intent = "recommendation";
    const contextProduct = getMockProductContext("pack-mesa-premium");
    answer = `Para un regalo gastronómico, el ${contextProduct?.name || "Pack Mesa Premium"} es la elección perfecta. Ofrece una experiencia completa y visualmente atractiva para cualquier ocasión especial.`;
    recommendedProducts.push({
      slug: "pack-mesa-premium",
      name: contextProduct?.name || "Pack Mesa Premium",
      category: "packs",
      reason: "Es un set curado que garantiza impacto visual y variedad.",
      confidence: 0.9,
    });
  } else if (lowerQuery.includes("dulce") || lowerQuery.includes("almendra")) {
    intent = "recommendation";
    const contextProduct = getMockProductContext("crema-de-almendra-premium");
    answer = `Si buscas algo dulce y con notas de almendra, te recomiendo la ${contextProduct?.name || "Crema de Almendra Premium"}. Es un complemento ideal para postres o quesos suaves.`;
    recommendedProducts.push({
      slug: "crema-de-almendra-premium",
      name: contextProduct?.name || "Crema de Almendra Premium",
      category: "gourmet",
      reason: "Su perfil dulce y cremoso es perfecto como finalizador.",
      confidence: 0.85,
    });
  } else {
    intent = "general";
    answer = `Entendido. Para darte una recomendación precisa, por favor especifica la ocasión o el tipo de producto (ej: "¿Qué vino para chuletón?" o "¿Aceite para ensalada?").`;
  }

  // --- Lógica de Maridaje Mock ---
  if (lowerQuery.includes("chuletón") || lowerQuery.includes("carne")) {
    pairings.push({
      product: "Reserva del Alto Ebro",
      pairing: "Carnes rojas a la parrilla",
      reason:
        "El tanino y la complejidad se equilibran perfectamente con el hierro de la carne.",
    });
  } else if (
    lowerQuery.includes("ensalada") ||
    lowerQuery.includes("pescado")
  ) {
    pairings.push({
      product: "Coupage de Sierra",
      pairing: "Ensaladas o pescados blancos",
      reason: "Su frescura y notas herbáceas cortan la grasa del pescado.",
    });
  }

  return {
    answer: answer,
    intent: intent,
    recommendedProducts: recommendedProducts,
    pairings: pairings,
    confidence: 0.95, // Alta confianza en el mock
    warnings: warnings,
    nextQuestions: [
      "¿Qué tipo de comida tienes?",
      "¿Buscas un vino para ocasión especial?",
      "¿Quieres comparar dos productos?",
    ],
  };
}
