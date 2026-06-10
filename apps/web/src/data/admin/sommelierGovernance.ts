import type {
  SommelierKpi,
  PromptTemplate,
  SommelierInteraction,
  ProviderStatusItem,
  WarningDistributionItem,
  BlockedProductItem,
  GuardrailsConfig,
} from "../../types/admin";
import { getProductMasterBySlug } from "../catalog/productMasterAdapter";

export const sommelierKpis: SommelierKpi[] = [
  {
    label: "Prompts activos",
    value: "4",
    icon: "📝",
    description: "Templates en uso activo",
  },
  {
    label: "Respuestas revisadas",
    value: "24",
    icon: "✅",
    description: "+6 esta semana",
  },
  {
    label: "Warnings",
    value: "3",
    icon: "⚠️",
    description: "2 tono, 1 catálogo",
  },
  {
    label: "Fallback rate",
    value: "4%",
    icon: "📊",
    description: "Bajo, aceptable",
  },
  {
    label: "Provider",
    value: "Mock",
    icon: "🧪",
    description: "LM Studio preparado",
  },
  {
    label: "Productos bloqueados",
    value: "2",
    icon: "🚫",
    description: "No recomendables",
  },
];

export const promptTemplates: PromptTemplate[] = [
  {
    key: "system_prompt",
    name: "System Prompt Principal",
    version: 3,
    status: "active",
    content:
      "Eres un sommelier experto del ecosistema LabrazaHome. Recomiendas productos del catálogo premium con precisión, contexto y pasión. Siempre indicas que es modo laboratorio.",
  },
  {
    key: "b2b_profile",
    name: "Perfil B2B",
    version: 2,
    status: "active",
    content:
      "Eres un asesor comercial experto en ventas B2B de productos gourmet. Hablas de volúmenes, condiciones, fichas técnicas y argumentos comerciales.",
  },
  {
    key: "private_profile",
    name: "Perfil Privado",
    version: 2,
    status: "draft",
    content:
      "Eres un guía de confianza para el cliente particular. Recomiendas productos para consumo doméstico, maridajes y regalos. Tono cercano pero riguroso.",
  },
  {
    key: "producer_profile",
    name: "Perfil Productor",
    version: 1,
    status: "draft",
    content:
      "Eres un interlocutor técnico para productores y bodegas. Hablas de variedades, procesos, certificaciones y fichas técnicas con precisión sectorial.",
  },
];

export const recentInteractions: SommelierInteraction[] = [
  {
    sessionId: "sess-001",
    query: "Recomiéndame un vino tinto para una cena de empresa",
    profile: "b2b",
    confidence: 0.92,
    userRating: "helpful",
    time: "Hace 1h",
  },
  {
    sessionId: "sess-002",
    query: "¿Qué aceite es mejor para cocinar?",
    profile: "private",
    confidence: 0.88,
    userRating: "helpful",
    time: "Hace 3h",
  },
  {
    sessionId: "sess-003",
    query: "Necesito un pack para regalo corporativo de 50 unidades",
    profile: "b2b",
    confidence: 0.65,
    userRating: "unhelpful",
    time: "Hace 5h",
  },
  {
    sessionId: "sess-004",
    query: "¿Tenéis miel ecológica certificada?",
    profile: "private",
    confidence: 0.95,
    userRating: null,
    time: "Hace 8h",
  },
  {
    sessionId: "sess-005",
    query: "Quiero conocer la ficha técnica de la Garnacha de Altura",
    profile: "producer",
    confidence: 0.91,
    userRating: "helpful",
    time: "Hace 12h",
  },
  {
    sessionId: "sess-006",
    query: "Comparativa entre Coupage de Sierra y Arbequina Temprana",
    profile: "b2b",
    confidence: 0.72,
    userRating: "flagged",
    time: "Hace 1d",
  },
  {
    sessionId: "sess-007",
    query: "¿Recomiendas el Pack Mesa Premium para regalo?",
    profile: "private",
    confidence: 0.78,
    userRating: "unhelpful",
    time: "Hace 1d",
  },
];

export const providerStatusItems: ProviderStatusItem[] = [
  {
    name: "Mock Provider",
    status: "Activo",
    statusColor: "emerald",
    description: "Provider por defecto, datos simulados",
  },
  {
    name: "LM Studio",
    status: "Parcial",
    statusColor: "amber",
    description: "Gemma 4B, JSON ok, catálogo alucina",
  },
  {
    name: "AI-LAB Gateway",
    status: "Arquitectura",
    statusColor: "indigo",
    description: "Provider diseñado, pendiente integración",
  },
];

export const warningDistribution: WarningDistributionItem[] = [
  { type: "Tono inadecuado", count: 2, color: "bg-amber-500" },
  { type: "Alucinación catálogo", count: 1, color: "bg-red-500" },
];

const blockedProductSeeds: Array<{
  productSlug: string;
  reason: string;
}> = [
  {
    productSlug: "pack-mesa-premium",
    reason:
      "Sin storytelling ni notas sensoriales. No recomendable hasta completar contenido editorial.",
  },
  {
    productSlug: "crema-de-almendra-premium",
    reason:
      "Ficha incompleta (40%). Pendiente de imagen, SEO y contenido editorial.",
  },
];

export function getBlockedProducts(): BlockedProductItem[] {
  return blockedProductSeeds.map((seed) => {
    const pm = getProductMasterBySlug(seed.productSlug);
    return {
      name: pm?.name ?? seed.productSlug,
      reason: seed.reason,
      productSlug: seed.productSlug,
    };
  });
}

export const guardrailsConfig: GuardrailsConfig[] = [
  {
    label: "Máx. mensaje",
    value: "2000 caracteres",
    icon: "📏",
  },
  {
    label: "Máx. productos",
    value: "5 por consulta",
    icon: "📦",
  },
  {
    label: "Perfiles permitidos",
    value: "private, b2b, producer, admin",
    icon: "👤",
  },
  {
    label: "Modo laboratorio",
    value: "Activo",
    icon: "🧪",
  },
  {
    label: "Logging datos personales",
    value: "Desactivado",
    icon: "🔒",
  },
  {
    label: "Disclaimer por defecto",
    value: "Respuestas simuladas",
    icon: "⚠️",
  },
];
