export interface WorkspaceProfile {
  id: string;
  name: string;
  icon: string;
  description: string;
  typicalUse: string;
  active: boolean;
}

export interface WorkspaceSelection {
  id: string;
  products: Array<{ name: string; quantity: string }>;
  createdAt: string;
  useCase: string;
  status: "borrador" | "listo para presupuesto";
}

export interface WorkspaceQuote {
  id: string;
  reference: string;
  status: "En preparación" | "Simulado" | "Pendiente revisión";
  productCount: number;
  totalUnits: string;
  createdAt: string;
}

export interface WorkspaceDoc {
  title: string;
  icon: string;
  description: string;
  available: boolean;
}

export interface WorkspaceTimelineItem {
  action: string;
  detail: string;
  time: string;
  icon: string;
}

export interface WorkspaceSommelierRecommendation {
  title: string;
  description: string;
  type: string;
}

export const workspaceProfile: WorkspaceProfile = {
  id: "restaurante",
  name: "Restaurante",
  icon: "🍽️",
  description: "Vinos para carta, maridajes por menú",
  typicalUse: "12-24 botellas por referencia",
  active: true,
};

export const workspaceProfiles: WorkspaceProfile[] = [
  {
    id: "restaurante",
    name: "Restaurante",
    icon: "🍽️",
    description: "Vinos para carta, maridajes por menú",
    typicalUse: "12-24 botellas por referencia",
    active: true,
  },
  {
    id: "tienda",
    name: "Tienda gourmet",
    icon: "🏪",
    description: "Mix de productos premium para venta directa",
    typicalUse: "6-12 unidades por referencia",
    active: false,
  },
  {
    id: "hotel",
    name: "Hotel / hospitality",
    icon: "🏨",
    description: "Minibar, recepción, eventos, restaurante interno",
    typicalUse: "Según ocupación estacional",
    active: false,
  },
  {
    id: "distribuidor",
    name: "Distribuidor",
    icon: "🚚",
    description: "Grandes volúmenes, planificación logística",
    typicalUse: "Palets / cajas completas",
    active: false,
  },
  {
    id: "empresa",
    name: "Empresa",
    icon: "🎁",
    description: "Regalos corporativos, packs personalizados",
    typicalUse: "50-500 unidades por campaña",
    active: false,
  },
];

export const workspaceSelections: WorkspaceSelection[] = [
  {
    id: "sel-001",
    products: [
      { name: "Reserva del Alto Ebro", quantity: "12 uds" },
      { name: "Coupage de Sierra", quantity: "6 uds" },
    ],
    createdAt: "2026-06-08",
    useCase: "Carta restaurante",
    status: "listo para presupuesto",
  },
  {
    id: "sel-002",
    products: [
      { name: "Miel de Romero Clara", quantity: "24 uds" },
      { name: "Pack Mesa Premium", quantity: "10 packs" },
      { name: "Crema de Almendra Premium", quantity: "6 uds" },
    ],
    createdAt: "2026-06-05",
    useCase: "Tienda gourmet",
    status: "borrador",
  },
];

export const workspaceQuotes: WorkspaceQuote[] = [
  {
    id: "qt-001",
    reference: "#B2B-001",
    status: "En preparación",
    productCount: 2,
    totalUnits: "18 unidades",
    createdAt: "2026-06-08",
  },
  {
    id: "qt-002",
    reference: "#B2B-002",
    status: "Simulado",
    productCount: 4,
    totalUnits: "52 unidades",
    createdAt: "2026-06-04",
  },
  {
    id: "qt-003",
    reference: "#B2B-003",
    status: "Pendiente revisión",
    productCount: 3,
    totalUnits: "36 unidades",
    createdAt: "2026-05-28",
  },
];

export const workspaceDocuments: WorkspaceDoc[] = [
  {
    title: "Ficha técnica",
    icon: "📄",
    description: "Datos del producto, especificaciones y certificaciones",
    available: true,
  },
  {
    title: "Catálogo profesional",
    icon: "📕",
    description: "Catálogo descargable con condiciones B2B",
    available: true,
  },
  {
    title: "Argumentario comercial",
    icon: "📝",
    description: "Guía de venta para equipos comerciales",
    available: true,
  },
  {
    title: "Maridajes recomendados",
    icon: "🍷",
    description: "Tabla de maridajes por perfil profesional",
    available: true,
  },
];

export const workspaceTimeline: WorkspaceTimelineItem[] = [
  {
    action: "Selección creada",
    detail: "Nueva selección para carta de restaurante",
    time: "Hace 2h",
    icon: "📋",
  },
  {
    action: "Producto añadido",
    detail: "Reserva del Alto Ebro añadido a selección activa",
    time: "Hace 2h",
    icon: "🍷",
  },
  {
    action: "Presupuesto preparado",
    detail: "Presupuesto #B2B-001 creado desde selección activa",
    time: "Hace 1d",
    icon: "📄",
  },
  {
    action: "Documento descargado",
    detail: "Ficha técnica de Coupage de Sierra",
    time: "Hace 2d",
    icon: "📑",
  },
  {
    action: "Sommelier consultado",
    detail: "Recomendación para carta de vinos ecológicos",
    time: "Hace 3d",
    icon: "🍷",
  },
];

export const workspaceSommelierRecommendations: WorkspaceSommelierRecommendation[] =
  [
    {
      title: "Completar carta con un blanco",
      description:
        "Tu selección actual tiene dos tintos. Añade un blanco con crianza para cubrir todos los menús del restaurante.",
      type: "upselling",
    },
    {
      title: "Pack maridaje vino + aceite",
      description:
        "Los clientes que pidieron Reserva del Alto Ebro también compraron Coupage de Sierra. Ofrécelos como pack maridaje.",
      type: "cross-selling",
    },
    {
      title: "Surtido para tienda gourmet",
      description:
        "Para tu perfil de tienda: combina 2 vinos + 1 aceite + 1 miel + 1 conserva para crear una gama inicial equilibrada.",
      type: "surtido",
    },
  ];
