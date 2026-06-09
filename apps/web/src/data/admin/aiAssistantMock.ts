import type {
  AdminAIBatchStats,
  AdminAICapability,
  AdminAIGeneratedSample,
  AdminAIReviewStep,
  AdminAIWarning,
} from "../../types/admin";

export const aiBatchStats: AdminAIBatchStats = {
  productsProcessed: 4,
  fieldsGenerated: 28,
  jsonValid: 26,
  timeouts: 2,
  hallucinations: 0,
  avgQuality: 8.5,
  avgB2B: 9.5,
  avgSEO: 10,
};

export const aiCapabilities: AdminAICapability[] = [
  {
    id: "storytelling",
    label: "Storytelling",
    description:
      "Texto editorial premium de 2-4 frases sobre el origen y carácter del producto.",
    icon: "📖",
  },
  {
    id: "sensory-notes",
    label: "Notas sensoriales",
    description:
      "Lista de notas de cata o descriptores sensoriales (vista, nariz, boca).",
    icon: "👃",
  },
  {
    id: "pairings",
    label: "Maridajes",
    description:
      "Sugerencias gastronómicas con razones detalladas de por qué funcionan.",
    icon: "🍽️",
  },
  {
    id: "b2b-argument",
    label: "Argumentario B2B",
    description:
      "Argumento comercial profesional para hostelería, tiendas y distribuidores.",
    icon: "🏢",
  },
  {
    id: "seo-title",
    label: "SEO title",
    description: "Título optimizado para buscadores (máximo 60 caracteres).",
    icon: "🔍",
  },
  {
    id: "meta-desc",
    label: "Meta description",
    description:
      "Descripción SEO para resultados de búsqueda (máximo 160 caracteres).",
    icon: "📝",
  },
  {
    id: "editorial-tags",
    label: "Tags editoriales",
    description:
      "Palabras clave editoriales para categorización y posicionamiento.",
    icon: "🏷️",
  },
];

export const aiGeneratedSamples: AdminAIGeneratedSample[] = [
  {
    productSlug: "reserva-del-alto-ebro",
    productName: "Reserva del Alto Ebro",
    productCategory: "Vinos",
    fields: [
      {
        label: "Storytelling",
        value:
          "En el corazón de la Rioja Alta, nace un reserva clásico que combina la fuerza de la tradición con la elegancia de 24 meses en barrica de roble americano. Un vino potente y equilibrado que habla de viñedos centenarios, vendimias seleccionadas y la paciencia del enólogo que sabe esperar el momento exacto.",
      },
      {
        label: "Notas sensoriales",
        value:
          "Color rojo cereza oscuro con ribete granate. Nariz compleja a frutos rojos maduros, especias dulces y vainilla. En boca es potente pero sedoso, con taninos redondos y un final largo y persistente.",
      },
      {
        label: "Maridajes",
        value:
          "Carnes rojas a la parrilla o asadas — la estructura del vino equilibra la grasa de la carne. Cordero asado con hierbas — los taninos se integran con la jugosidad de la carne. Quesos curados de oveja — la potencia del vino realza la intensidad del queso. Setas salteadas con tomillo — los matices terrosos se complementan.",
      },
      {
        label: "Argumentario B2B",
        value:
          "Reserva del Alto Ebro destaca por ofrecer una experiencia de maridaje versátil para la carta de cualquier restaurante. Su perfil clásico de Rioja Alta atrae tanto a conocedores como a comensales que buscan calidad contrastada. Ideal como vino por copas en segmento premium.",
      },
      {
        label: "SEO title",
        value: "Reserva del Alto Ebro - Rioja Alta Tinto Reserva",
      },
      {
        label: "Meta description",
        value:
          "Reserva del Alto Ebro: Rioja Alta con 24 meses en roble americano. Potente y equilibrado, ideal para carnes rojas y maridajes clásicos.",
      },
      {
        label: "Tags editoriales",
        value:
          "Rioja Alta, Reserva, Tempranillo, Crianza, Tinto, Vino premium, Maridaje carnes",
      },
    ],
  },
  {
    productSlug: "coupage-de-sierra",
    productName: "Coupage de Sierra",
    productCategory: "Vinos",
    fields: [
      {
        label: "Storytelling",
        value:
          "En los viñedos de sierra donde el aire es puro y la tierra guarda secretos ancestrales, este coupage equilibra Tempranillo, Mazuelo y Graciano en un abrazo de tradición y carácter. Cada variedad aporta su personalidad para crear un vino de montaña con alma.",
      },
      {
        label: "Notas sensoriales",
        value:
          "Color granate profundo con reflejos violáceos. Aromas complejos de frutos rojos maduros, especias suaves y un sutil fondo mineral. Sabor equilibrado, con acidez vibrante y taninos finos.",
      },
      {
        label: "Maridajes",
        value:
          "Carnes rojas a la parrilla — la acidez equilibrada del coupage realza el sabor de la carne. Caza salvaje como conejo o perdiz — los matices terrosos se complementan. Guisos de montaña — la estructura del vino soporta platos contundentes. Quesos curados de cabra — contraste entre la acidez y la cremosidad.",
      },
      {
        label: "Argumentario B2B",
        value:
          "Un coupage equilibrado que ofrece un perfil aromático complejo ideal para maridar con una amplia variedad de platos. Su versatilidad lo convierte en un imprescindible en cualquier carta de vinos por copas. Perfecto como vino de referencia para la clientela que busca calidad Rioja Alavesa.",
      },
      {
        label: "SEO title",
        value: "Coupage de Sierra - Rioja Alavesa Tinto Equilibrado",
      },
      {
        label: "Meta description",
        value:
          "Descubre Coupage de Sierra, un tinto equilibrado de Tempranillo, Mazuelo y Graciano de la Rioja Alavesa. Ideal para carnes, caza y guisos.",
      },
      {
        label: "Tags editoriales",
        value:
          "Coupage, Rioja Alavesa, Sierra, Tempranillo, Mazuelo, Graciano, Tinto",
      },
    ],
  },
];

export const aiReviewWorkflow: AdminAIReviewStep[] = [
  { step: "Generación IA batch", status: "done" },
  { step: "Revisión editorial", status: "current" },
  { step: "Aprobación", status: "pending" },
  { step: "Publicación mock", status: "pending" },
];

export const aiWarnings: AdminAIWarning[] = [
  {
    type: "info",
    message:
      "Este panel simula generación IA batch. No ejecuta LM Studio desde Vercel y no publica contenido real.",
  },
  {
    type: "warning",
    message:
      "Modelo Qwen 3.5 9B — 26/28 campos válidos, 2 timeouts, 0 alucinaciones. No apto para tiempo real.",
  },
  {
    type: "info",
    message:
      "Tiempo estimado de generación batch: ~5 min por producto (7 campos secuenciales).",
  },
];
