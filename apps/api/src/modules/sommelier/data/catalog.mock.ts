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

export const mockCatalog: MockProduct[] = [
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
    slug: "coupage-de-sierra",
    category: "vinos",
    name: "Coupage de Sierra",
    producer: "Bodegas Labraza Heritage",
    region: "Rioja Alavesa",
    shortDescription:
      "Un coupage equilibrado de Tempranillo, Mazuelo y Graciano de viñedos de sierra.",
    specs: {
      variety: "Tempranillo 70%, Mazuelo 20%, Graciano 10%",
      vintage: "2019",
      aging: "20 meses barrica mixta",
      alcohol: "14%",
      temperature: "16-18°C",
    },
    ratings: [
      { source: "Parker", score: 90, maxScore: 100 },
      { source: "Peñín", score: 88, maxScore: 100 },
    ],
    pairings: ["Carnes rojas", "Caza", "Guisos de montaña", "Quesos curados"],
    tags: ["Coupage", "Rioja Alavesa", "Sierra", "Tinto"],
    status: "prototype",
  },
  {
    id: "prod-004",
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
    id: "prod-005",
    slug: "miel-de-milflores",
    category: "mieles",
    name: "Miel de Milflores",
    producer: "Apícola Labraza",
    region: "Valle de Labraza",
    shortDescription:
      "Miel multifloral de pradera de montaña. Compleja y con carácter.",
    specs: {
      variety: "Multifloral",
      harvest: "Verano 2025",
      color: "Ámbar oscuro",
      texture: "Cristalizada fina",
      format: "500g",
    },
    ratings: [],
    pairings: [
      "Pan tostado",
      "Quesos curados",
      "Carnes asadas",
      "Frutos secos",
    ],
    tags: ["Milflores", "Miel", "Verano", "Montaña"],
    status: "prototype",
  },
  {
    id: "prod-006",
    slug: "aove-cosecha-temprana",
    category: "aceites",
    name: "AOVE Cosecha Temprana",
    producer: "Almazara Labraza",
    region: "Rioja Baja",
    shortDescription:
      "Aceite de oliva virgen extra de cosecha temprana. Frutado intenso con notas de hierba fresca y alcachofa.",
    specs: {
      variety: "Picual 70%, Arbequina 30%",
      harvest: "Octubre 2025",
      acidity: "0.12°",
      format: "500ml",
      packaging: "Botella de vidrio oscuro",
    },
    ratings: [{ source: "Guía EVOO", score: 94, maxScore: 100 }],
    pairings: [
      "Pan tostado",
      "Ensaladas",
      "Pescados blancos",
      "Verduras a la plancha",
    ],
    tags: ["AOVE", "Cosecha Temprana", "Picual", "Rioja"],
    status: "prototype",
  },
  {
    id: "prod-007",
    slug: "aove-ecologico",
    category: "aceites",
    name: "AOVE Ecológico",
    producer: "Almazara Labraza",
    region: "Sierra de Labraza",
    shortDescription:
      "AOVE ecológico de aceituna Arbequina. Suave, dulce y almendrado. Certificado ecológico.",
    specs: {
      variety: "Arbequina 100%",
      harvest: "Noviembre 2025",
      acidity: "0.10°",
      format: "500ml",
      certification: "EU Organic",
    },
    ratings: [],
    pairings: [
      "Pan con tomate",
      "Pescados azules",
      "Carpaccios",
      "Quesos suaves",
    ],
    tags: ["Ecológico", "Arbequina", "AOVE", "Sierra"],
    status: "prototype",
  },
  {
    id: "prod-008",
    slug: "pack-mesa-premium",
    category: "packs",
    name: "Pack Mesa Premium",
    producer: "Labraza Heritage",
    region: "Rioja",
    shortDescription:
      "Selección especial para mesa elegante: Reserva del Alto Ebro + AOVE Cosecha Temprana + Miel de Romero Clara.",
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
  {
    id: "prod-009",
    slug: "foie-gras-de-pato",
    category: "gourmet",
    name: "Foie Gras de Pato",
    producer: "Labraza Gastronomía",
    region: "Rioja",
    shortDescription:
      "Foie gras de pato entero con denominación de origen. Textura sedosa y sabor equilibrado.",
    specs: {
      origin: "Pato criado en libertad",
      format: "180g",
      aging: "Curación 72h",
    },
    ratings: [],
    pairings: [
      "Reserva del Alto Ebro",
      "Coupage de Sierra",
      "Pan de higo",
      "Mermelada de cebolla",
    ],
    tags: ["Foie", "Gourmet", "Pato", "Labraza"],
    status: "prototype",
  },
  {
    id: "prod-010",
    slug: "pack-ibéricos",
    category: "packs",
    name: "Pack Ibéricos",
    producer: "Labraza Heritage",
    region: "Rioja",
    shortDescription:
      "Selección de embutidos ibéricos con Garnacha de Altura. Perfecto para compartir.",
    specs: {
      includes: "1 botella Garnacha de Altura + selección ibéricos",
      presentation: "Cesta de mimbre",
      weight: "2.8kg",
    },
    ratings: [],
    pairings: ["Carnes blancas", "Quesos de cabra", "Verduras asadas"],
    tags: ["Pack", "Ibéricos", "Cesta", "Regalo"],
    status: "prototype",
  },
];
