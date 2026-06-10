import type { B2BSelectionItem, B2BUseCase } from "../../types/b2b";

export interface B2BKpi {
  label: string;
  value: string;
  icon: string;
  description: string;
}

export interface B2BProfessionalProfile {
  id: string;
  name: string;
  icon: string;
  description: string;
  typicalUse: string;
  priority: string;
}

export interface B2BProduct {
  slug: string;
  name: string;
  category: string;
  image: string;
  professionalUse: string;
  moq: string;
  status: string;
}

export interface B2BQuoteSummary {
  selectedProducts: number;
  totalUnits: string;
  conditions: string;
  status: string;
}

export interface B2BDocument {
  title: string;
  icon: string;
  description: string;
  status: string;
}

export interface B2BActivity {
  action: string;
  detail: string;
  time: string;
  icon: string;
}

export const b2bKpis: B2BKpi[] = [
  {
    label: "Productos profesionales",
    value: "128",
    icon: "📦",
    description: "Catálogo completo con capa B2B",
  },
  {
    label: "Selecciones activas",
    value: "6",
    icon: "📋",
    description: "Listas guardadas por clientes mock",
  },
  {
    label: "Presupuestos simulados",
    value: "12",
    icon: "📄",
    description: "Solicitudes de presupuesto de prueba",
  },
  {
    label: "Recompras previstas",
    value: "4",
    icon: "🔄",
    description: "Pedidos recurrentes planificados",
  },
  {
    label: "Fichas descargables",
    value: "38",
    icon: "📑",
    description: "Documentos técnicos disponibles",
  },
  {
    label: "Sommelier B2B",
    value: "Activo Mock",
    icon: "🍷",
    description: "Recomendaciones profesionales simuladas",
  },
];

export const professionalProfiles: B2BProfessionalProfile[] = [
  {
    id: "restaurante",
    name: "Restaurante",
    icon: "🍽️",
    description: "Vinos para carta, maridajes por menú",
    typicalUse: "12-24 botellas por referencia",
    priority: "Alta",
  },
  {
    id: "tienda",
    name: "Tienda gourmet",
    icon: "🏪",
    description: "Mix de productos premium para venta directa",
    typicalUse: "6-12 unidades por referencia",
    priority: "Alta",
  },
  {
    id: "distribuidor",
    name: "Distribuidor",
    icon: "🚚",
    description: "Grandes volúmenes, planificación logística",
    typicalUse: "Palets / cajas completas",
    priority: "Alta",
  },
  {
    id: "hotel",
    name: "Hotel / hospitality",
    icon: "🏨",
    description: "Minibar, recepción, eventos, restaurante interno",
    typicalUse: "Según ocupación estacional",
    priority: "Media",
  },
  {
    id: "empresa",
    name: "Empresa",
    icon: "🎁",
    description: "Regalos corporativos, packs personalizados",
    typicalUse: "50-500 unidades por campaña",
    priority: "Media",
  },
];

export const recommendedProducts: B2BProduct[] = [
  {
    slug: "reserva-del-alto-ebro",
    name: "Reserva del Alto Ebro",
    category: "vinos",
    image: "🍷",
    professionalUse: "Carta de tintos premium",
    moq: "12 uds",
    status: "En catálogo",
  },
  {
    slug: "coupage-de-sierra",
    name: "Coupage de Sierra",
    category: "aceites",
    image: "",
    professionalUse: "AOVE para cocina profesional",
    moq: "6 uds",
    status: "En catálogo",
  },
  {
    slug: "miel-de-romero-clara",
    name: "Miel de Romero Clara",
    category: "mieles",
    image: "🍯",
    professionalUse: "Desayuno buffet / tienda gourmet",
    moq: "12 uds",
    status: "En catálogo",
  },
  {
    slug: "pack-mesa-premium",
    name: "Pack Mesa Premium",
    category: "packs",
    image: "🎁",
    professionalUse: "Regalo corporativo / cliente",
    moq: "10 packs",
    status: "En catálogo",
  },
  {
    slug: "garnacha-de-altura",
    name: "Garnacha de Altura",
    category: "vinos",
    image: "🍷",
    professionalUse: "Carta de vinos ecológicos",
    moq: "12 uds",
    status: "En catálogo",
  },
  {
    slug: "crema-de-almendra-premium",
    name: "Crema de Almendra Premium",
    category: "gourmet",
    image: "",
    professionalUse: "Repostería profesional / degustación",
    moq: "6 uds",
    status: "En catálogo",
  },
];

export const currentSelection: B2BSelectionItem[] = [
  {
    productName: "Reserva del Alto Ebro",
    productSlug: "reserva-del-alto-ebro",
    productCategory: "vinos",
    quantity: 12,
    useCase: "Carta restaurante" as B2BUseCase,
    addedAt: "2026-06-10T10:00:00.000Z",
    status: "ready_for_quote",
    source: "dashboard_mock",
  },
  {
    productName: "Coupage de Sierra",
    productSlug: "coupage-de-sierra",
    productCategory: "aceites",
    quantity: 6,
    useCase: "" as B2BUseCase,
    addedAt: "2026-06-10T09:30:00.000Z",
    status: "ready_for_quote",
    source: "dashboard_mock",
  },
  {
    productName: "Miel de Romero Clara",
    productSlug: "miel-de-romero-clara",
    productCategory: "mieles",
    quantity: 24,
    useCase: "" as B2BUseCase,
    addedAt: "2026-06-09T14:00:00.000Z",
    status: "draft",
    source: "dashboard_mock",
  },
  {
    productName: "Pack Mesa Premium",
    productSlug: "pack-mesa-premium",
    productCategory: "packs",
    quantity: 10,
    useCase: "Regalo corporativo" as B2BUseCase,
    addedAt: "2026-06-08T11:00:00.000Z",
    status: "ready_for_quote",
    source: "dashboard_mock",
  },
];

export const quoteSummary: B2BQuoteSummary = {
  selectedProducts: 4,
  totalUnits: "52 unidades",
  conditions: "Pendiente de revisión",
  status: "Preparar solicitud",
};

export const documents: B2BDocument[] = [
  {
    title: "Ficha técnica",
    icon: "📄",
    description: "Datos del producto, especificaciones y certificaciones",
    status: "Mock",
  },
  {
    title: "Catálogo PDF",
    icon: "📕",
    description: "Catálogo profesional descargable con condiciones B2B",
    status: "Futuro",
  },
  {
    title: "Argumentario venta",
    icon: "📝",
    description: "Guía comercial para equipos de venta y camareros",
    status: "Mock",
  },
  {
    title: "Maridajes recomendados",
    icon: "🍷",
    description: "Tabla de maridajes profesionales por perfil",
    status: "Mock",
  },
];

export const recentActivity: B2BActivity[] = [
  {
    action: "Selección actualizada",
    detail: "Añadido Pack Mesa Premium (10 uds)",
    time: "Hace 2h",
    icon: "📋",
  },
  {
    action: "Presupuesto simulado",
    detail: "Solicitud de condiciones para Restaurante",
    time: "Hace 1d",
    icon: "📄",
  },
  {
    action: "Producto consultado",
    detail: "Ficha de Reserva del Alto Ebro (vista 12 veces)",
    time: "Hace 2d",
    icon: "👁️",
  },
  {
    action: "Sommelier consultado",
    detail: "Recomendación para carta de restaurante",
    time: "Hace 3d",
    icon: "🍷",
  },
];

export const sommelierHints: Array<{
  title: string;
  description: string;
  cta: string;
}> = [
  {
    title: "Para carta de restaurante",
    description:
      "Selecciona tintos con crianza y un blanco de guarda para cubrir toda la carta por menús.",
    cta: "Ver recomendación",
  },
  {
    title: "Para tienda gourmet",
    description:
      "Combina aceites premium, mieles monovarietales y conservas selectas para crear una gama equilibrada.",
    cta: "Ver recomendación",
  },
  {
    title: "Para regalo corporativo",
    description:
      "Los packs personalizados con vino + aceite + miel tienen alta rotación en campañas de empresa.",
    cta: "Ver recomendación",
  },
];
