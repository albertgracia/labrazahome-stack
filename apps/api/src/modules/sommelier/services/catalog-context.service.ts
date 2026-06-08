import type {
  CatalogContextItem,
  SommelierProfile,
} from "../schemas/sommelier.schemas";
import { mockCatalog } from "../data/catalog.mock";

const INTENT_PATTERNS: Array<{
  keywords: string[];
  category: string;
  intent: string;
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
  { keywords: ["queso", "quesos"], category: "vinos", intent: "pairing" },
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

function normalizeMessage(msg: string): string {
  return msg
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export class CatalogContextService {
  buildContext(
    message: string,
    _profile: SommelierProfile,
    selectedSlug?: string,
    maxProducts: number = 5,
  ): CatalogContextItem[] {
    if (selectedSlug) {
      const product = mockCatalog.find((p) => p.slug === selectedSlug);
      if (product) return [this.toCompactItem(product)];
    }

    const normalized = normalizeMessage(message);

    for (const pattern of INTENT_PATTERNS) {
      if (pattern.keywords.some((k) => normalized.includes(k))) {
        const candidates = mockCatalog
          .filter((p) => p.category === pattern.category)
          .slice(0, maxProducts);
        return candidates.map(this.toCompactItem);
      }
    }

    return mockCatalog.slice(0, maxProducts).map(this.toCompactItem);
  }

  detectIntent(message: string): string {
    const normalized = normalizeMessage(message);
    for (const pattern of INTENT_PATTERNS) {
      if (pattern.keywords.some((k) => normalized.includes(k))) {
        return pattern.intent;
      }
    }
    return "general";
  }

  private toCompactItem(
    product: (typeof mockCatalog)[number],
  ): CatalogContextItem {
    return {
      slug: product.slug,
      name: product.name,
      category: product.category,
      producer: product.producer,
      shortDescription: product.shortDescription,
      specs: product.specs,
      pairings: product.pairings,
      tags: product.tags,
      status: product.status,
    };
  }
}
