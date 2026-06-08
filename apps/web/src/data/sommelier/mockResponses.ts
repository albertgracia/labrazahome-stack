import type { ProductPremium } from "../../types/catalog";
import { getProductBySlug, getProductsByCategory } from "../catalog/index";

const WINE_RED_MEAT_SLUGS = ["reserva-del-alto-ebro", "garnacha-de-altura"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatRating(product: ProductPremium): string {
  if (!product.ratings || product.ratings.length === 0) return "";
  const r = product.ratings[0];
  return `${r.source} ${r.score}/${r.maxScore}`;
}

interface MockResult {
  answer: string;
  recommendations: Array<{
    slug: string;
    name: string;
    category: string;
    reason: string;
    confidence: number;
  }>;
  pairings: Array<{ product: string; pairing: string; reason: string }>;
  confidence: number;
}

function resultForProduct(
  product: ProductPremium,
  reason: string,
  confidence: number,
): MockResult {
  const pairingEntry =
    product.pairing.length > 0
      ? {
          product: product.name,
          pairing: product.pairing.slice(0, 3).join(", "),
          reason: "Recomendación basada en el perfil del producto.",
        }
      : undefined;

  return {
    answer: "",
    recommendations: [
      {
        slug: product.slug,
        name: product.name,
        category: product.category,
        reason,
        confidence,
      },
    ],
    pairings: pairingEntry ? [pairingEntry] : [],
    confidence,
  };
}

function fallback(): MockResult {
  const categories = [
    { name: "vinos", icon: "🍷", label: "vinos" },
    { name: "aceites", icon: "🫒", label: "aceites de oliva" },
    { name: "mieles", icon: "🍯", label: "mieles artesanales" },
    { name: "gourmet", icon: "🧀", label: "productos gourmet" },
    { name: "packs", icon: "🎁", label: "packs regalo" },
  ];

  return {
    answer: `No encuentro una recomendación exacta en el catálogo actual para esa consulta. Aquí tienes las categorías que puedes explorar:\n\n${categories.map((c) => `${c.icon} ${c.label}`).join("\n")}\n\n¿Te gustaría que te recomiende algo de alguna de ellas?`,
    recommendations: [],
    pairings: [],
    confidence: 0.3,
  };
}

export function generateMockResponse(query: string): MockResult {
  const lower = query.toLowerCase().trim();

  // --- CASE 1: Red meat wine ---
  if (
    (lower.includes("vino") &&
      (lower.includes("carne") ||
        lower.includes("chuletón") ||
        lower.includes("cordero") ||
        lower.includes("ternera") ||
        lower.includes("cerdo"))) ||
    lower.includes("vino para carnes") ||
    lower.includes("vino tinto para")
  ) {
    const slug = pick(WINE_RED_MEAT_SLUGS);
    const product = getProductBySlug(slug);
    if (!product) return fallback();
    const rating = formatRating(product);
    const answer = `Te recomiendo ${product.name}. ${product.shortDescription}${rating ? `\n\nPuntuación: ${rating}` : ""}\n\nSus notas de ${product.specs["Variedad"] || "tanninos equilibrados"} y su crianza de ${product.specs["Crianza"] || "larga barrica"} lo hacen ideal para carnes rojas.`;
    return {
      answer,
      recommendations: [
        {
          slug: product.slug,
          name: product.name,
          category: product.category,
          reason: "Perfecto para carnes rojas y platos contundentes.",
          confidence: 0.92,
        },
      ],
      pairings: product.pairing.slice(0, 3).map((p) => ({
        product: product.name,
        pairing: p,
        reason: `La estructura de ${product.name} armoniza con este plato.`,
      })),
      confidence: 0.92,
    };
  }

  // --- CASE 2: Cheese ---
  if (lower.includes("queso") || lower.includes("quesos")) {
    const products = getProductsByCategory("vinos").filter((p) =>
      p.pairing.some((pa) => pa.toLowerCase().includes("queso")),
    );
    if (products.length === 0) return fallback();
    const product = pick(products);
    const rating = formatRating(product);
    const answer = `Para acompañar quesos, te sugiero ${product.name}.${rating ? `\n\nPuntuación: ${rating}` : ""}\n\n${product.shortDescription}`;
    return {
      answer,
      recommendations: [
        {
          slug: product.slug,
          name: product.name,
          category: product.category,
          reason: "Marida excepcionalmente con quesos curados y semicurados.",
          confidence: 0.88,
        },
      ],
      pairings: product.pairing
        .filter((p) => p.toLowerCase().includes("queso"))
        .map((p) => ({
          product: product.name,
          pairing: p,
          reason: `${product.name} complementa los sabores intensos del queso.`,
        })),
      confidence: 0.88,
    };
  }

  // --- CASE 3: Olive oil ---
  if (lower.includes("aceite") || lower.includes("aove")) {
    const products = getProductsByCategory("aceites");
    if (products.length === 0) return fallback();
    const product = pick(products);
    const answer = `Te recomiendo ${product.name} de ${product.producer}. ${product.shortDescription}\n\nAcidez: ${product.specs["Acidez"] || "muy baja"} · Variedad: ${product.specs["Variedad"] || product.specs["Variedades"] || "selección premium"}`;
    return resultForProduct(product, "Ideal para cocina diaria y aliños.", 0.9);
  }

  // --- CASE 4: Honey ---
  if (lower.includes("miel") || lower.includes("mieles")) {
    const products = getProductsByCategory("mieles");
    if (products.length === 0) return fallback();
    const product = pick(products);
    const answer = `Para los amantes de la miel, recomiendo ${product.name}. ${product.shortDescription}\n\nIntensidad: ${product.specs["Intensidad"] || "media"} · Textura: ${product.specs["Textura"] || "cremosa"}`;
    return resultForProduct(
      product,
      "Perfecta para desayunos, postres o maridajes.",
      0.9,
    );
  }

  // --- CASE 5: Gift / packs ---
  if (
    lower.includes("regalo") ||
    lower.includes("pack") ||
    lower.includes("caja")
  ) {
    const products = getProductsByCategory("packs");
    if (products.length === 0) return fallback();
    const product = pick(products);
    const answer = `Para un regalo especial, ${product.name} es la elección perfecta. ${product.shortDescription}\n\nContenido: ${product.specs["Contenido"] || "selección premium"} · Formato: ${product.specs["Formato"] || "estuche"}`;
    return resultForProduct(
      product,
      "Un regalo gastronómico completo y elegante.",
      0.95,
    );
  }

  // --- CASE 6: Unknown ---
  return fallback();
}
