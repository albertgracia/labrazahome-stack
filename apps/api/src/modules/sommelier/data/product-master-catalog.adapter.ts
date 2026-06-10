export interface MockProduct {
  id: string;
  slug: string;
  category: string;
  name: string;
  producer: string;
  region: string;
  shortDescription: string;
  specs: Record<string, string>;
  ratings: Array<{ source: string; score: number; maxScore: number }>;
  pairings: string[];
  tags: string[];
  status: string;
}

export const BACKEND_SOMMELIER_PRODUCTMASTER_COMPATIBLE_SLUGS = [
  "reserva-del-alto-ebro",
  "garnacha-de-altura",
  "blanco-de-viura-seleccion",
  "coupage-de-sierra",
  "arbequina-temprana",
  "miel-de-brezo-atlantico",
  "miel-de-romero-clara",
  "conserva-artesana-seleccion",
  "crema-de-almendra-premium",
  "pack-descubrimiento-rioja",
  "pack-mesa-premium",
] as const;

export const backendMockCatalog: MockProduct[] = [
  {
    id: "prod-001",
    slug: "reserva-del-alto-ebro",
    category: "vinos",
    name: "Reserva del Alto Ebro",
    producer: "Bodegas Labraza Heritage",
    region: "Rioja Alta",
    shortDescription:
      "Un reserva clásico de la Rioja Alta con 24 meses en barrica de roble americano. Potente y equilibrado.",
    specs: {
      variety: "Tempranillo 90%, Graciano 10%",
      vintage: "2020",
      aging: "24 meses barrica roble americano",
      alcohol: "14.5%",
      temperature: "16-18°C",
    },
    ratings: [
      { source: "Parker", score: 92, maxScore: 100 },
      { source: "Peñín", score: 90, maxScore: 100 },
    ],
    pairings: [
      "Carnes rojas a la parrilla",
      "Quesos curados",
      "Cordero asado",
      "Setas salteadas",
    ],
    tags: ["Tempranillo", "Crianza", "Rioja Alta", "Tinto"],
    status: "prototype",
  },
  {
    id: "prod-002",
    slug: "garnacha-de-altura",
    category: "vinos",
    name: "Garnacha de Altura",
    producer: "Bodegas Labraza Heritage",
    region: "Rioja Oriental",
    shortDescription:
      "Una garnacha fresca y mineral de viñedos de montaña. Expresiva y elegante.",
    specs: {
      variety: "Garnacha 100%",
      vintage: "2021",
      aging: "14 meses barrica roble francés",
      alcohol: "14%",
      temperature: "14-16°C",
    },
    ratings: [
      { source: "Parker", score: 91, maxScore: 100 },
      { source: "Peñín", score: 89, maxScore: 100 },
    ],
    pairings: [
      "Carnes blancas",
      "Pasta con setas",
      "Quesos de cabra",
      "Verduras asadas",
    ],
    tags: ["Garnacha", "Rioja Oriental", "Montaña", "Tinto"],
    status: "prototype",
  },
  {
    id: "prod-003",
    slug: "blanco-de-viura-seleccion",
    category: "vinos",
    name: "Blanco de Viura Selección",
    producer: "Bodegas Labraza Heritage",
    region: "Rioja Baja",
    shortDescription:
      "Un blanco fermentado en barrica que expresa todo el potencial de la variedad Viura.",
    specs: {
      variety: "Viura 100%",
      vintage: "2023",
      aging: "8 meses sobre lías en barrica",
      alcohol: "13.5%",
      temperature: "10-12°C",
    },
    ratings: [{ source: "Peñín", score: 90, maxScore: 100 }],
    pairings: [
      "Pescados azules",
      "Mariscos",
      "Arroces de pescado",
      "Quesos de cabra",
    ],
    tags: ["Viura", "Barrica", "Rioja", "Blanco premium"],
    status: "prototype",
  },
  {
    id: "prod-004",
    slug: "coupage-de-sierra",
    category: "aceites",
    name: "Coupage de Sierra",
    producer: "Almazara Labraza",
    region: "Sierra de Labraza",
    shortDescription:
      "AOVE coupage de arbequina y picual de montaña. Equilibrado y versátil.",
    specs: {
      variety: "Arbequina 60%, Picual 40%",
      harvest: "2025",
      acidity: "0.2°",
      format: "500ml",
      packaging: "Botella de vidrio oscuro",
    },
    ratings: [{ source: "Guía EVOO", score: 92, maxScore: 100 }],
    pairings: [
      "Ensaladas",
      "Verduras a la parrilla",
      "Pescados blancos",
      "Pan con tomate",
    ],
    tags: ["AOVE", "Coupage", "Arbequina", "Picual"],
    status: "prototype",
  },
  {
    id: "prod-005",
    slug: "arbequina-temprana",
    category: "aceites",
    name: "Arbequina Temprana",
    producer: "Almazara del Valle",
    region: "Rioja Baja",
    shortDescription:
      "AOVE de cosecha temprana con perfil frutado y ligeramente picante.",
    specs: {
      variety: "Arbequina 100%",
      harvest: "2025",
      acidity: "0.12°",
      format: "500ml",
      certification: "DOP Rioja",
    },
    ratings: [{ source: "Guía EVOO", score: 94, maxScore: 100 }],
    pairings: [
      "Ensaladas",
      "Pescados blancos",
      "Verduras a la plancha",
      "Pan artesano",
    ],
    tags: ["Arbequina", "Cosecha temprana", "AOVE", "Frutado"],
    status: "prototype",
  },
  {
    id: "prod-006",
    slug: "miel-de-brezo-atlantico",
    category: "mieles",
    name: "Miel de Brezo Atlántico",
    producer: "Apícola Labraza",
    region: "Cordillera Cantábrica",
    shortDescription:
      "Miel oscura de brezo con intensidad y carácter montañés.",
    specs: {
      variety: "Brezo monofloral",
      harvest: "2025",
      color: "Ámbar oscuro",
      texture: "Densa, cremosa",
      format: "250g",
    },
    ratings: [],
    pairings: ["Quesos azules", "Chocolate amargo", "Tés negros", "Caza"],
    tags: ["Brezo", "Montaña", "Intensa", "Artesanal"],
    status: "prototype",
  },
  {
    id: "prod-007",
    slug: "miel-de-romero-clara",
    category: "mieles",
    name: "Miel de Romero Clara",
    producer: "Apícola Labraza",
    region: "Sierra de Labraza",
    shortDescription:
      "Miel monofloral de romero, clara y suave. Recolectada en primavera en colmenares de alta montaña.",
    specs: {
      variety: "Romero monofloral",
      harvest: "Primavera 2025",
      color: "Ámbar claro",
      texture: "Líquida y cremosa",
      format: "500g",
    },
    ratings: [{ source: "Great Taste", score: 2, maxScore: 3 }],
    pairings: [
      "Tés e infusiones",
      "Quesos frescos",
      "Yogur natural",
      "Fruta fresca",
    ],
    tags: ["Romero", "Miel", "Primavera", "Sierra"],
    status: "prototype",
  },
  {
    id: "prod-008",
    slug: "conserva-artesana-seleccion",
    category: "gourmet",
    name: "Conserva Artesana Selección",
    producer: "Conservas del Norte",
    region: "País Vasco",
    shortDescription:
      "Selección de conservas artesanas de anchoa, bonito y verduras del norte.",
    specs: {
      varieties: "Anchoa, Bonito, Pimientos, Alcachofas",
      format: "4 unidades",
      conservation: "Temperatura ambiente",
      allergens: "Pescado",
    },
    ratings: [],
    pairings: [
      "Vino blanco seco",
      "Pan de cristal",
      "Tomate triturado",
      "Olivas",
    ],
    tags: ["Conservas", "Artesano", "Cantábrico", "Selección"],
    status: "concept",
  },
  {
    id: "prod-009",
    slug: "crema-de-almendra-premium",
    category: "gourmet",
    name: "Crema de Almendra Premium",
    producer: "Torrefactos Artesanos",
    region: "Aragón",
    shortDescription:
      "Crema untable de almendra ecológica con cacao y aceite de oliva virgen extra.",
    specs: {
      ingredients: "Almendra ecológica 60%, cacao 20%, AOVE 15%",
      format: "200g",
      allergens: "Frutos secos",
      certification: "Ecológico UE",
    },
    ratings: [],
    pairings: ["Pan tostado", "Fruta fresca", "Helado de vainilla", "Crepes"],
    tags: ["Almendra", "Ecológico", "Untable", "Premium"],
    status: "concept",
  },
  {
    id: "prod-010",
    slug: "pack-descubrimiento-rioja",
    category: "packs",
    name: "Pack Descubrimiento Rioja",
    producer: "LabrazaHome Selección",
    region: "Rioja",
    shortDescription:
      "Tres vinos esenciales para descubrir la diversidad de la D.O.Ca Rioja.",
    specs: {
      includes: "3 botellas (75cl)",
      types: "Joven, Crianza, Reserva",
      presentation: "Caja regalo",
      guide: "Guía de cata ilustrada",
    },
    ratings: [],
    pairings: [
      "Aperitivos variados",
      "Carnes",
      "Quesos",
      "Postres de chocolate",
    ],
    tags: ["Pack", "Rioja", "Descubrimiento", "Cata"],
    status: "design",
  },
  {
    id: "prod-011",
    slug: "pack-mesa-premium",
    category: "packs",
    name: "Pack Mesa Premium",
    producer: "Labraza Heritage",
    region: "Rioja",
    shortDescription:
      "Selección especial para mesa elegante: vino + AOVE + miel artesanal.",
    specs: {
      includes: "1 botella vino + 1 AOVE + 1 miel",
      presentation: "Caja de madera premium",
      weight: "3.5kg",
    },
    ratings: [],
    pairings: ["Celebraciones", "Regalos corporativos", "Cenas especiales"],
    tags: ["Pack", "Premium", "Regalo", "Selección"],
    status: "prototype",
  },
];
