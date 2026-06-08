import type { ProductPremium } from "../../types/catalog";
import { getProductBySlug, getProductsByCategory } from "../catalog/index";

const WINE_RED_MEAT_SLUGS = ["reserva-del-alto-ebro", "garnacha-de-altura"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatAllRatings(product: ProductPremium): string {
  if (!product.ratings || product.ratings.length === 0) return "";
  return product.ratings
    .map((r) => `${r.source} ${r.score}/${r.maxScore}`)
    .join(" · ");
}

function buildWineKnowledge(product: ProductPremium): string {
  const k = product.knowledge;
  if (!k) return "";
  const parts: string[] = [];
  if (k.body) parts.push(`Cuerpo: ${k.body}`);
  if (k.finish) parts.push(`Final: ${k.finish}`);
  if (k.servingTemperature) parts.push(`Servir a ${k.servingTemperature}`);
  if (k.agingPotential) parts.push(`Potencial de guarda: ${k.agingPotential}`);
  if (k.aromaProfile && k.aromaProfile.length > 0) {
    parts.push(`Perfil aromático: ${k.aromaProfile.slice(0, 4).join(", ")}`);
  }
  if (k.tastingNotes && k.tastingNotes.length > 0) {
    parts.push(`Notas de cata: ${k.tastingNotes.slice(0, 3).join(" · ")}`);
  }
  return "\n\n" + parts.join("\n");
}

function buildOilKnowledge(product: ProductPremium): string {
  const k = product.knowledge;
  if (!k) return "";
  const parts: string[] = [];
  if (k.oliveVariety) parts.push(`Variedad: ${k.oliveVariety}`);
  if (k.intensity) parts.push(`Intensidad: ${k.intensity}`);
  if (k.bitterness) parts.push(`Amargor: ${k.bitterness}`);
  if (k.pungency) parts.push(`Picor: ${k.pungency}`);
  if (k.aromaProfile && k.aromaProfile.length > 0) {
    parts.push(`Aromas: ${k.aromaProfile.slice(0, 4).join(", ")}`);
  }
  if (k.culinaryUses && k.culinaryUses.length > 0) {
    parts.push(`Usos culinarios: ${k.culinaryUses.join(", ")}`);
  }
  return "\n\n" + parts.join("\n");
}

function buildHoneyKnowledge(product: ProductPremium): string {
  const k = product.knowledge;
  if (!k) return "";
  const parts: string[] = [];
  if (k.floralOrigin) parts.push(`Origen floral: ${k.floralOrigin}`);
  if (k.intensity) parts.push(`Intensidad: ${k.intensity}`);
  if (k.texture) parts.push(`Textura: ${k.texture}`);
  if (k.sweetness) parts.push(`Dulzor: ${k.sweetness}`);
  if (k.aromaProfile && k.aromaProfile.length > 0) {
    parts.push(`Aromas: ${k.aromaProfile.slice(0, 4).join(", ")}`);
  }
  if (k.recommendedUses && k.recommendedUses.length > 0) {
    parts.push(`Recomendado para: ${k.recommendedUses.slice(0, 3).join(", ")}`);
  }
  return "\n\n" + parts.join("\n");
}

function buildPackKnowledge(product: ProductPremium): string {
  const k = product.knowledge;
  if (!k) return "";
  const parts: string[] = [];
  if (k.targetAudience) parts.push(`Para: ${k.targetAudience}`);
  if (k.occasion) parts.push(`Ocasión: ${k.occasion}`);
  if (k.premiumLevel) parts.push(`Nivel: ${k.premiumLevel}`);
  if (k.includes && k.includes.length > 0) {
    parts.push(`Incluye: ${k.includes.join(", ")}`);
  }
  if (k.recommendedFor && k.recommendedFor.length > 0) {
    parts.push(`Recomendado para: ${k.recommendedFor.slice(0, 3).join(", ")}`);
  }
  return "\n\n" + parts.join("\n");
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
    const ratings = formatAllRatings(product);
    const knowledge = buildWineKnowledge(product);
    const answer = `Te recomiendo ${product.name}. ${product.shortDescription}${ratings ? `\n\nPuntuaciones: ${ratings}` : ""}${knowledge}\n\nSus taninos y estructura lo hacen ideal para carnes rojas, chuletones y cordero asado.`;
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
      pairings: product.pairing.slice(0, 4).map((p) => ({
        product: product.name,
        pairing: p,
        reason: `La estructura y cuerpo de ${product.name} armoniza perfectamente con ${p.toLowerCase()}.`,
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
    const ratings = formatAllRatings(product);
    const k = product.knowledge;
    let extra = "";
    if (k?.body)
      extra += `\n\nCuerpo: ${k.body} — ideal para la textura cremosa del queso.`;
    if (k?.finish)
      extra += `\nFinal: ${k.finish}, que limpia el paladar entre bocado y bocado.`;
    if (k?.servingTemperature)
      extra += `\nTemperatura de servicio: ${k.servingTemperature}.`;
    if (k?.aromaProfile && k.aromaProfile.length > 0) {
      extra += `\nPerfil aromático: ${k.aromaProfile.slice(0, 3).join(", ")}.`;
    }
    const answer = `Para acompañar quesos, te sugiero ${product.name}.${ratings ? `\n\nPuntuaciones: ${ratings}` : ""}${extra}\n\nSus notas y estructura están diseñadas para complementar la untuosidad y salinidad de los quesos curados.`;
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
          reason: `${product.name} complementa los sabores intensos del queso con su acidez y estructura.`,
        })),
      confidence: 0.88,
    };
  }

  // --- CASE 3: Olive oil ---
  if (lower.includes("aceite") || lower.includes("aove")) {
    const products = getProductsByCategory("aceites");
    if (products.length === 0) return fallback();
    const product = pick(products);
    const knowledge = buildOilKnowledge(product);
    const answer = `Te recomiendo ${product.name} de ${product.producer}. ${product.shortDescription}${knowledge}`;
    return {
      answer,
      recommendations: [
        {
          slug: product.slug,
          name: product.name,
          category: product.category,
          reason: "Ideal para cocina diaria y aliños.",
          confidence: 0.9,
        },
      ],
      pairings: product.pairing.slice(0, 3).map((p) => ({
        product: product.name,
        pairing: p,
        reason: `El perfil frutado de ${product.name} realza los sabores de ${p.toLowerCase()}.`,
      })),
      confidence: 0.9,
    };
  }

  // --- CASE 4: Honey ---
  if (lower.includes("miel") || lower.includes("mieles")) {
    const products = getProductsByCategory("mieles");
    if (products.length === 0) return fallback();
    const product = pick(products);
    const knowledge = buildHoneyKnowledge(product);
    const answer = `Para los amantes de la miel, recomiendo ${product.name}. ${product.shortDescription}${knowledge}`;
    return {
      answer,
      recommendations: [
        {
          slug: product.slug,
          name: product.name,
          category: product.category,
          reason: "Perfecta para desayunos, postres o maridajes.",
          confidence: 0.9,
        },
      ],
      pairings: product.pairing.slice(0, 3).map((p) => ({
        product: product.name,
        pairing: p,
        reason: `${product.name} aporta un contraste dulce que realza ${p.toLowerCase()}.`,
      })),
      confidence: 0.9,
    };
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
    const knowledge = buildPackKnowledge(product);
    const answer = `Para un regalo especial, ${product.name} es la elección perfecta. ${product.shortDescription}${knowledge}`;
    return {
      answer,
      recommendations: [
        {
          slug: product.slug,
          name: product.name,
          category: product.category,
          reason: "Un regalo gastronómico completo y elegante.",
          confidence: 0.95,
        },
      ],
      pairings: product.pairing.slice(0, 3).map((p) => ({
        product: product.name,
        pairing: p,
        reason: `${product.name} está diseñado para ${p.toLowerCase()}.`,
      })),
      confidence: 0.95,
    };
  }

  // --- CASE 6: Unknown ---
  return fallback();
}
