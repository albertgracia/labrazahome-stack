import type {
  ContentKpi,
  ContentPipelineStage,
  ContentReviewProduct,
  EditorialChecklistItem,
  SeoPreview,
  ReadinessItem,
} from "../../types/admin";
import { getProductMasterBySlug } from "../catalog/index";

export const contentKpis: ContentKpi[] = [
  {
    label: "Productos revisados",
    value: "42",
    icon: "✅",
    description: "En catálogo premium",
  },
  {
    label: "Pendientes contenido",
    value: "7",
    icon: "📝",
    description: "Faltan campos editoriales",
  },
  {
    label: "Fichas incompletas",
    value: "5",
    icon: "⚠️",
    description: "Requieren revisión",
  },
  {
    label: "Sin imagen principal",
    value: "3",
    icon: "🖼️",
    description: "Imagen hero pendiente",
  },
  {
    label: "SEO pendiente",
    value: "6",
    icon: "🔍",
    description: "Optimización requerida",
  },
  {
    label: "Listos para B2B",
    value: "18",
    icon: "🏢",
    description: "Completos y validados",
  },
];

export const contentPipeline: ContentPipelineStage[] = [
  {
    stage: "Draft",
    count: 3,
    color: "bg-zinc-400",
    products: [
      "Crema de Almendra Premium",
      "Conserva Artesana Selección",
      "Blanco de Viura Selección",
    ],
  },
  {
    stage: "En revisión",
    count: 4,
    color: "bg-amber-500",
    products: [
      "Coupage de Sierra",
      "Miel de Romero Clara",
      "Pack Descubrimiento Rioja",
      "Arbequina Temprana",
    ],
  },
  {
    stage: "Necesita media",
    count: 2,
    color: "bg-red-500",
    products: ["Coupage de Sierra", "Crema de Almendra Premium"],
  },
  {
    stage: "SEO pendiente",
    count: 6,
    color: "bg-indigo-500",
    products: [
      "Miel de Romero Clara",
      "Pack Mesa Premium",
      "Garnacha de Altura",
      "Miel de Brezo Atlántico",
      "Conserva Artesana Selección",
      "Pack Descubrimiento Rioja",
    ],
  },
  {
    stage: "Listo B2B",
    count: 5,
    color: "bg-emerald-500",
    products: [
      "Reserva del Alto Ebro",
      "Garnacha de Altura",
      "Arbequina Temprana",
      "Miel de Brezo Atlántico",
      "Blanco de Viura Selección",
    ],
  },
  {
    stage: "Publicado mock",
    count: 11,
    color: "bg-emerald-500",
    products: ["Todos los productos del catálogo premium mock"],
  },
];

type ContentReviewSeed = Omit<ContentReviewProduct, "name" | "category">;

function capitalizeCategory(cat: string): string {
  return cat.charAt(0).toUpperCase() + cat.slice(1);
}

const contentReviewSeeds: ContentReviewSeed[] = [
  {
    slug: "reserva-del-alto-ebro",
    editorialStatus: "Listo B2B",
    completeness: 95,
    hasImage: true,
    hasSeo: true,
    hasStorytelling: true,
    isB2BReady: true,
    isSommelierReady: true,
    storytelling:
      "De la finca familiar en la Rioja Alavesa, nace este tinto de crianza que captura la esencia de la garnacha y el tempranillo en laderas de altura. Una historia de tradición, paciencia y respeto por la tierra.",
    tastingNotes:
      "Vista: Rojo cereza con ribete granate. Nariz: Frutos rojos maduros, especias dulces y un fondo de vainilla. Boca: Taninos sedosos, paso elegante, final largo y afrutado.",
    pairings:
      "Carnes rojas a la brasa, cordero asado, quesos curados, caza menor.",
    rating: "4.9",
  },
  {
    slug: "garnacha-de-altura",
    editorialStatus: "SEO pendiente",
    completeness: 80,
    hasImage: true,
    hasSeo: false,
    hasStorytelling: true,
    isB2BReady: true,
    isSommelierReady: true,
    storytelling:
      "Una garnacha ecológica cultivada en parcelas de altura extrema. La altitud y la orientación norte proporcionan una acidez natural que equilibra la potencia varietal.",
    tastingNotes:
      "Vista: Rojo picota intenso. Nariz: Fruta negra, hierbas mediterráneas, pizarra. Boca: Fresca, mineral, con un paso vibrante y persistente.",
    pairings: "Carnes blancas, aves de corral, arroces de montaña, setas.",
    rating: "4.7",
  },
  {
    slug: "coupage-de-sierra",
    editorialStatus: "Necesita media",
    completeness: 60,
    hasImage: false,
    hasSeo: false,
    hasStorytelling: true,
    isB2BReady: false,
    isSommelierReady: false,
    storytelling:
      "Un AOVE de montaña que combina arbequina y picual en proporción secreta. La altitud y el clima continental aportan una personalidad única.",
    tastingNotes:
      "Verde hierba, alcachofa, almendra fresca. En boca es equilibrado, ligeramente picante, con un final a tomate verde y plátano.",
    pairings:
      "Ensaladas, verduras a la parrilla, pescados blancos, pan con tomate.",
    rating: "4.5",
  },
  {
    slug: "miel-de-romero-clara",
    editorialStatus: "SEO pendiente",
    completeness: 70,
    hasImage: true,
    hasSeo: false,
    hasStorytelling: true,
    isB2BReady: false,
    isSommelierReady: true,
    storytelling:
      "Producida por abejas que liban en los campos de romero silvestre de la Sierra de Cantabria. Una miel suave, clara y aromática que evoca los paisajes mediterráneos de interior.",
    tastingNotes:
      "Color ámbar claro. Aroma floral intenso con notas de romero y tomillo. Dulzor equilibrado, textura cremosa.",
    pairings: "Desayunos, infusiones, quesos frescos, yogur natural.",
    rating: "4.6",
  },
  {
    slug: "pack-mesa-premium",
    editorialStatus: "SEO pendiente",
    completeness: 65,
    hasImage: false,
    hasSeo: false,
    hasStorytelling: false,
    isB2BReady: true,
    isSommelierReady: false,
    storytelling:
      "Una selección cuidada de nuestros productos estrella para crear la experiencia gastronómica perfecta. Ideal para regalo corporativo o celebraciones especiales.",
    tastingNotes: "No aplica (pack multimarroducto).",
    pairings:
      "Maridaje completo: vino tinto + aceite premium + miel artesanal.",
    rating: "4.8",
  },
  {
    slug: "crema-de-almendra-premium",
    editorialStatus: "Draft",
    completeness: 40,
    hasImage: false,
    hasSeo: false,
    hasStorytelling: false,
    isB2BReady: false,
    isSommelierReady: false,
    storytelling: "pendiente de redacción",
    tastingNotes: "pendiente de redacción",
    pairings: "pendiente de redacción",
    rating: "4.3",
  },
];

export function getContentReviewProducts(): ContentReviewProduct[] {
  return contentReviewSeeds.map((seed) => {
    const pm = getProductMasterBySlug(seed.slug);
    return {
      ...seed,
      name: pm?.name ?? seed.slug,
      category: pm?.category ? capitalizeCategory(pm.category) : "General",
    };
  });
}

export const editorialChecklistData: EditorialChecklistItem[] = [
  { field: "Nombre producto", done: true },
  { field: "Descripción corta", done: true },
  { field: "Historia editorial", done: false },
  { field: "Notas de cata / uso", done: false },
  { field: "Maridajes", done: false },
  { field: "Ratings si aplica", done: true },
  { field: "Imagen principal", done: false },
  { field: "SEO title", done: false },
  { field: "Meta description", done: false },
  { field: "Tags", done: false },
  { field: "B2B notes", done: false },
  { field: "Sommelier context", done: false },
];

export const getSeoPreview = (productName: string): SeoPreview => ({
  title: `${productName} — Catálogo Premium | LabrazaHome`,
  metaDescription: `Descubre ${productName.toLowerCase()}, un producto premium del catálogo LabrazaHome. Ficha técnica, notas de cata y maridajes recomendados.`,
  slug: `/catalogo/${productName.toLowerCase().replace(/\s+/g, "-")}`,
  canonical: `https://labrazahome.com/catalogo/${productName.toLowerCase().replace(/\s+/g, "-")}`,
  status: "Pendiente de optimización",
});

export const getSommelierReadiness = (
  product: ContentReviewProduct,
): ReadinessItem[] => [
  {
    label: "Tiene maridajes",
    ready:
      product.pairings !== "pendiente de redacción" &&
      product.pairings !== "No aplica (pack multimarroducto).",
    note:
      product.pairings !== "pendiente de redacción"
        ? "Completos"
        : "Pendientes",
  },
  {
    label: "Tiene notas sensoriales",
    ready: product.tastingNotes !== "pendiente de redacción",
    note:
      product.tastingNotes !== "pendiente de redacción"
        ? "Redactadas"
        : "Pendientes",
  },
  {
    label: "Tiene perfil aromático",
    ready: product.tastingNotes !== "pendiente de redacción",
    note:
      product.tastingNotes !== "pendiente de redacción"
        ? "Disponible"
        : "No disponible",
  },
  {
    label: "Tiene contexto B2B",
    ready: product.isB2BReady,
    note: product.isB2BReady ? "Capa profesional lista" : "Pendiente",
  },
  {
    label: "Puede recomendarse",
    ready: product.isSommelierReady,
    note: product.isSommelierReady ? "Recomendable" : "Requiere revisión",
  },
];

export const getB2BReadiness = (
  product: ContentReviewProduct,
): ReadinessItem[] => [
  {
    label: "Ficha técnica",
    ready: product.completeness >= 60,
    note: product.completeness >= 60 ? "Completa" : "Incompleta",
  },
  {
    label: "Uso profesional",
    ready: product.isB2BReady,
    note: product.isB2BReady ? "Definido" : "Pendiente",
  },
  {
    label: "Argumento comercial",
    ready: product.hasStorytelling,
    note: product.hasStorytelling ? "Redactado" : "Pendiente",
  },
  {
    label: "Documento mock",
    ready: product.isB2BReady,
    note: product.isB2BReady ? "Asociado" : "No asociado",
  },
  {
    label: "Estado B2B",
    ready: product.isB2BReady,
    note: product.isB2BReady ? "Listo" : "No listo",
  },
];
