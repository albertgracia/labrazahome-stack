import type {
  SommelierProvider,
  ChatInput,
  SommelierProviderResponse,
} from "./sommelier-provider";
import type {
  ProviderHealth,
  ProviderMetadata,
  SommelierIntent,
  SommelierRecommendation,
  SommelierPairing,
  SommelierSource,
  SommelierWarning,
} from "../schemas/sommelier.schemas";
import { mockCatalog, type MockProduct } from "../data/catalog.mock";

interface MatchResult {
  intent: SommelierIntent;
  matchedProducts: MockProduct[];
  confidence: number;
  answer: string;
  pairings: SommelierPairing[];
}

function normalizeMessage(msg: string): string {
  return msg
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const INTENT_PATTERNS: Array<{
  keywords: string[];
  category: string;
  intent: SommelierIntent;
}> = [
  {
    keywords: [
      "carne",
      "chuleton",
      "cordero",
      "ternera",
      "cerdo",
      "caza",
      "guiso",
      "parrillada",
    ],
    category: "vinos",
    intent: "pairing",
  },
  {
    keywords: ["queso", "quesos", "tabla de quesos"],
    category: "vinos",
    intent: "pairing",
  },
  {
    keywords: ["aceite", "aove", "oliva", "arbequina", "picual", "ensalada"],
    category: "aceites",
    intent: "recommendation",
  },
  {
    keywords: [
      "miel",
      "romero",
      "milflores",
      "desayuno",
      "infusion",
      "te",
      "tostada",
    ],
    category: "mieles",
    intent: "recommendation",
  },
  {
    keywords: [
      "regalo",
      "pack",
      "cesta",
      "detalle",
      "obsequio",
      "celebrar",
      "cumpleanos",
    ],
    category: "packs",
    intent: "recommendation",
  },
  {
    keywords: ["gourmet", "foie", "delicatessen", "especial"],
    category: "gourmet",
    intent: "recommendation",
  },
  {
    keywords: [
      "tinto",
      "reserva",
      "crianza",
      "tempranillo",
      "garnacha",
      "vino",
    ],
    category: "vinos",
    intent: "recommendation",
  },
];

function detectIntent(message: string): MatchResult {
  const normalized = normalizeMessage(message);

  for (const pattern of INTENT_PATTERNS) {
    if (pattern.keywords.some((k) => normalized.includes(k))) {
      const candidates = mockCatalog.filter(
        (p) => p.category === pattern.category,
      );
      if (candidates.length > 0) {
        const recommended = candidates.slice(0, 3);
        const recommendations: SommelierRecommendation[] = recommended.map(
          (p) => ({
            slug: p.slug,
            name: p.name,
            category: p.category,
            reason: generateRecommendationReason(p, pattern.intent),
            confidence: pattern.intent === "pairing" ? 0.92 : 0.88,
          }),
        );

        const pairings: SommelierPairing[] = generatePairings(recommended);

        return {
          intent: pattern.intent,
          matchedProducts: recommended,
          confidence: pattern.intent === "pairing" ? 0.92 : 0.88,
          answer: generateAnswer(recommended, pattern.intent, message),
          pairings,
        };
      }
    }
  }

  return {
    intent: "general",
    matchedProducts: [],
    confidence: 0.55,
    answer:
      "Soy el sumiller digital de Labraza. ¿Te gustaría explorar nuestros vinos, aceites, mieles o packs especiales? Cuéntame qué ocasión tienes y te recomendaré algo perfecto.",
    pairings: [],
  };
}

function generateRecommendationReason(
  product: MockProduct,
  intent: SommelierIntent,
): string {
  if (intent === "pairing") {
    return `Excelente maridaje con sus ${product.pairings.slice(0, 2).join(" o ")}`;
  }
  if (product.category === "aceites") {
    return `${product.shortDescription.slice(0, 60)}...`;
  }
  if (product.category === "mieles") {
    return `${product.shortDescription.slice(0, 60)}...`;
  }
  return `Recomendado por ${product.ratings.length > 0 ? `su puntuación de ${product.ratings[0].score}/${product.ratings[0].maxScore}` : "su calidad excepcional"}`;
}

function generatePairings(products: MockProduct[]): SommelierPairing[] {
  const result: SommelierPairing[] = [];
  for (const product of products) {
    for (const pairing of product.pairings.slice(0, 2)) {
      result.push({
        product: product.name,
        pairing,
        reason: `El carácter de ${product.name} realza los sabores de ${pairing.toLowerCase()}`,
      });
    }
  }
  return result.slice(0, 6);
}

function generateAnswer(
  products: MockProduct[],
  intent: SommelierIntent,
  message: string,
): string {
  if (products.length === 0) {
    return "No he encontrado productos que se ajusten exactamente a tu consulta. Permíteme sugerirte algunas opciones de nuestra selección.";
  }

  const names = products.map((p) => p.name);
  const last = names.pop();

  if (intent === "pairing") {
    return `He encontrado excelentes opciones de maridaje para tu consulta. Te recomiendo ${names.length > 0 ? names.join(", ") + " y " + last : last}. Estos productos de Labraza Heritage son ideales para acompañar platos con el perfil que buscas.`;
  }

  if (intent === "recommendation") {
    return `Basado en tu interés, te sugiero ${names.length > 0 ? names.join(", ") + " y " + last : last}. ${products[0].shortDescription}`;
  }

  return `Para tu consulta, te recomiendo explorar ${names.length > 0 ? names.join(", ") + " y " + last : last}.`;
}

function buildSources(products: MockProduct[]): SommelierSource[] {
  return products.map((p) => ({
    type: "product" as const,
    id: p.slug,
    name: p.name,
  }));
}

export class MockSommelierProvider implements SommelierProvider {
  async chat(input: ChatInput): Promise<SommelierProviderResponse> {
    const warnings: SommelierWarning[] = [
      {
        type: "mock_data",
        message: "Respuesta generada en modo laboratorio con datos simulados.",
      },
    ];

    const match = detectIntent(input.message);
    const allWarnings = [
      ...warnings,
      ...(match.matchedProducts.length === 0
        ? [
            {
              type: "no_data" as const,
              message:
                "No se encontraron productos específicos para esta consulta.",
            },
          ]
        : []),
    ];

    return {
      answer: match.answer,
      intent: match.intent,
      recommendations: match.matchedProducts.map((p) => ({
        slug: p.slug,
        name: p.name,
        category: p.category,
        reason: generateRecommendationReason(p, match.intent),
        confidence: match.confidence,
      })),
      pairings: match.pairings,
      confidence: match.confidence,
      model: "mock-v1",
      warnings: allWarnings,
      sources: buildSources(match.matchedProducts),
    };
  }

  async health(): Promise<ProviderHealth> {
    return {
      status: "ok",
      provider: "mock",
      model: "mock-v1",
      timestamp: new Date().toISOString(),
    };
  }

  metadata(): ProviderMetadata {
    return {
      name: "mock",
      version: "1.0.0",
      available: true,
      model: "mock-v1",
      description:
        "Mock provider with catalog-aware responses for development and testing",
    };
  }
}
