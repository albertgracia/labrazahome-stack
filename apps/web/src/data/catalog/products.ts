import type { ProductPremium } from "../../types/catalog";

export const products: ProductPremium[] = [
  {
    id: "reserva-del-alto-ebro",
    slug: "reserva-del-alto-ebro",
    category: "vinos",
    name: "Reserva del Alto Ebro",
    producer: "Bodegas Labraza Heritage",
    region: "Rioja Alta",
    shortDescription:
      "Un reserva clásico de la Rioja Alta con 24 meses en barrica de roble americano.",
    longDescription:
      "Este reserva nace de viñedos centenarios situados en las laderas del Alto Ebro. Una cuidada selección de Tempranillo con un toque de Graciano da como resultado un vino equilibrado, con cuerpo y una excelente capacidad de guarda. La crianza en barrica de roble americano aporta notas de vainilla y especias que se integran perfectamente con la fruta madura.",
    status: "prototype",
    tags: ["Tempranillo", "Crianza", "Rioja Alta", "Roble Americano"],
    highlights: [
      "24 meses en barrica",
      "Viñedos centenarios",
      "90+ puntos Parker",
      "Edición limitada",
    ],
    specs: {
      Variedad: "Tempranillo 90%, Graciano 10%",
      Añada: "2020",
      Crianza: "24 meses barrica roble americano",
      Alcohol: "14.5%",
      Temperatura: "16-18°C",
      Enología: "Tradicional con remontados diarios",
    },
    pairing: [
      "Carnes rojas a la parrilla",
      "Quesos curados",
      "Cordero asado",
      "Setas salteadas",
    ],
    story:
      "Las viñas que dan vida a este reserva fueron plantadas por la familia Labraza en 1921. Situadas a 600 metros de altitud en la Rioja Alta, los suelos arcillo-calcáreos y el microclima atlántico-mediterráneo crean las condiciones ideales para un Tempranillo de excepción. Cada botella representa más de un siglo de dedicación a la viticultura.",
    imageGradient: "from-purple-900/40 via-red-800/20 to-amber-900/40",
    featured: true,
    ratings: [
      {
        source: "Parker",
        score: 92,
        maxScore: 100,
        year: 2025,
        note: "Puntuación mock de laboratorio para validar UX.",
        isMock: true,
      },
    ],
  },
  {
    id: "blanco-de-viura-seleccion",
    slug: "blanco-de-viura-seleccion",
    category: "vinos",
    name: "Blanco de Viura Selección",
    producer: "Bodegas Labraza Heritage",
    region: "Rioja Baja",
    shortDescription:
      "Un blanco fermentado en barrica que expresa todo el potencial de la variedad Viura.",
    longDescription:
      "El Viura, variedad blanca emblemática de Rioja, alcanza su máxima expresión en este vino fermentado en barrica nueva de roble francés. Notas de fruta blanca madura, flores y un sutil fondo de ahumado se combinan en un vino complejo y gastronómico.",
    status: "prototype",
    tags: ["Viura", "Barrica", "Rioja", "Blanco premium"],
    highlights: [
      "Fermentado en barrica",
      "Roble francés",
      "Crianza sobre lías",
      "Maridaje gastronómico",
    ],
    specs: {
      Variedad: "Viura 100%",
      Añada: "2023",
      Crianza: "8 meses sobre lías en barrica",
      Alcohol: "13.5%",
      Temperatura: "10-12°C",
      Enología: "Fermentación en barrica nueva",
    },
    pairing: [
      "Pescados azules",
      "Mariscos",
      "Arroces de pescado",
      "Quesos de cabra",
    ],
    story:
      "La Viura es la variedad blanca tradicional de Rioja, pero durante décadas fue infravalorada. En Bodegas Labraza Heritage apostamos por recuperar su prestigio mediante una vinificación cuidadosa que respeta la fruta pero aporta complejidad gracias a la barrica.",
    imageGradient: "from-amber-800/30 via-yellow-600/20 to-stone-800/30",
    featured: true,
    ratings: [
      {
        source: "Peñín",
        score: 90,
        maxScore: 100,
        year: 2025,
        isMock: true,
      },
    ],
  },
  {
    id: "garnacha-de-altura",
    slug: "garnacha-de-altura",
    category: "vinos",
    name: "Garnacha de Altura",
    producer: "Viñedos del Moncalvillo",
    region: "Rioja Occidental",
    shortDescription:
      "Una Garnacha de parcela procedente de viñedos a 700 metros de altitud.",
    longDescription:
      "La Garnacha encuentra en las altitudes de la Rioja Occidental su hábitat perfecto. Este vino de parcela, con una producción mínima, refleja fielmente el carácter del terruño: suelos pobres, clima extremo y rendimientos bajos que concentran la calidad en cada racimo.",
    status: "concept",
    tags: ["Garnacha", "Parcela", "Altitud", "Rioja Occidental"],
    highlights: [
      "Viñedo a 700m",
      "Baja producción",
      "Crianza 14 meses",
      "Vino de parcela",
    ],
    specs: {
      Variedad: "Garnacha 100%",
      Añada: "2021",
      Crianza: "14 meses barrica roble francés",
      Alcohol: "15%",
      Temperatura: "16-18°C",
      Suelo: "Arcilloso-calcáreo",
    },
    pairing: ["Caza menor", "Estofados", "Setas", "Chocolate negro"],
    story:
      "A 700 metros de altitud, los inviernos son largos y los veranos cortos. La Garnacha madura lentamente, desarrollando una concentración y frescura únicas. Este vino es la expresión más pura de un terruño extremo y de una viticultura heroica.",
    imageGradient: "from-red-950/40 via-rose-900/20 to-slate-900/40",
    featured: false,
    ratings: [
      {
        source: "Decanter",
        score: 91,
        maxScore: 100,
        year: 2025,
        isMock: true,
      },
    ],
  },
  {
    id: "arbequina-temprana",
    slug: "arbequina-temprana",
    category: "aceites",
    name: "Arbequina Temprana",
    producer: "Almazara del Valle",
    region: "Rioja Baja",
    shortDescription:
      "AOVE de cosecha temprana con perfil frutado y ligeramente picante.",
    longDescription:
      "Elaborado con aceitunas Arbequina recolectadas en verde, este aceite de cosecha temprana ofrece un perfil sensorial vibrante: hierba recién cortada, tomate verde y almendra fresca. Su baja acidez y su equilibrio lo convierten en un aliado perfecto para la alta cocina.",
    status: "prototype",
    tags: ["Arbequina", "Cosecha temprana", "AOVE", "Frutado"],
    highlights: [
      "Cosecha temprana",
      "Acidez 0.12°",
      "Extracción en frío",
      "Envasado en origen",
    ],
    specs: {
      Variedad: "Arbequina 100%",
      Cosecha: "2025",
      Acidez: "0.12°",
      Extracción: "Mecánica en frío",
      Formato: "500ml",
      Certificación: "DOP Rioja",
    },
    pairing: [
      "Ensaladas",
      "Pescados blancos",
      "Verduras a la plancha",
      "Pan artesano",
    ],
    story:
      "Nuestro olivar más temprano se recolecta a finales de septiembre, cuando la aceituna aún está verde. Este momento exacto de la cosecha define el perfil fresco y vibrante del aceite. La extracción se realiza en menos de 4 horas desde la recolección.",
    imageGradient: "from-emerald-800/30 via-green-700/20 to-yellow-800/30",
    featured: true,
  },
  {
    id: "coupage-de-sierra",
    slug: "coupage-de-sierra",
    category: "aceites",
    name: "Coupage de Sierra",
    producer: "Almazara del Valle",
    region: "Sierra de Cazorla",
    shortDescription:
      "Un blend de arbequina y picual con carácter de alta montaña.",
    longDescription:
      "La combinación de arbequina (suavidad) y picual (estructura) da como resultado un aceite equilibrado y complejo. Los olivares de montaña, con suelos pobres y clima continental, aportan una personalidad única a este coupage.",
    status: "design",
    tags: ["Coupage", "Sierra", "Picual", "Arbequina"],
    highlights: [
      "Blend exclusivo",
      "Olivares de montaña",
      "Premio Almazas 2024",
      "Edición limitada",
    ],
    specs: {
      Variedades: "Arbequina 60%, Picual 40%",
      Cosecha: "2025",
      Acidez: "0.14°",
      Extracción: "Mecánica en frío",
      Formato: "500ml",
      Zona: "Sierra de Cazorla",
    },
    pairing: [
      "Carnes blancas",
      "Verduras asadas",
      "Legumbres",
      "Quesos curados",
    ],
    story:
      "En las estribaciones de la Sierra de Cazorla, nuestros olivares crecen a 800 metros de altitud. El frío del invierno y el sol del verano extremeño concentran los aromas y la personalidad de cada variedad. Este coupage nace de la búsqueda del equilibrio perfecto.",
    imageGradient: "from-lime-900/30 via-green-800/20 to-amber-900/30",
    featured: false,
  },
  {
    id: "miel-de-brezo-atlantico",
    slug: "miel-de-brezo-atlantico",
    category: "mieles",
    name: "Miel de Brezo Atlántico",
    producer: "Apícola Labraza",
    region: "Cordillera Cantábrica",
    shortDescription:
      "Miel oscura de brezo con intensidad y carácter montañés.",
    longDescription:
      "Procedente de los brezales atlánticos de la Cordillera Cantábrica, esta miel de color ámbar oscuro tiene un sabor intenso y ligeramente amargo. Su textura densa y sus aromas a madera, resina y flores silvestres la hacen única.",
    status: "prototype",
    tags: ["Brezo", "Montaña", "Intensa", "Artesanal"],
    highlights: [
      "Recolección silvestre",
      "Sin procesar",
      "Rica en minerales",
      "Producción limitada",
    ],
    specs: {
      "Origen Floral": "Brezo (Erica spp.)",
      Cosecha: "2025",
      Textura: "Densa, cremosa",
      Intensidad: "Intensa",
      Formato: "250g",
      Zona: "Cordillera Cantábrica",
    },
    pairing: ["Quesos azules", "Caza", "Chocolate amargo", "Tés negros"],
    story:
      "Las abejas que producen esta miel se alimentan en los brezales atlánticos, un ecosistema único donde el brezo florece en condiciones extremas. La miel resultante es oscura, mineral y compleja, reflejando la dureza y belleza del paisaje cantábrico.",
    imageGradient: "from-stone-900/40 via-amber-900/20 to-brown-900/40",
    featured: true,
  },
  {
    id: "miel-de-romero-clara",
    slug: "miel-de-romero-clara",
    category: "mieles",
    name: "Miel de Romero Clara",
    producer: "Apícola Labraza",
    region: "Valle del Ebro",
    shortDescription:
      "Miel clara y suave de romero con notas florales y cítricas.",
    longDescription:
      "De color ámbar claro y textura líquida, esta miel de romero captura la esencia de los campos del Valle del Ebro. Su sabor suave y dulce con matices cítricos la convierte en la miel más versátil y apreciada.",
    status: "design",
    tags: ["Romero", "Suave", "Valle del Ebro", "Floral"],
    highlights: [
      "Cosecha primaveral",
      "Textura líquida",
      "Versátil",
      "Ideal para té",
    ],
    specs: {
      "Origen Floral": "Romero (Rosmarinus officinalis)",
      Cosecha: "2025",
      Textura: "Líquida",
      Intensidad: "Suave",
      Formato: "250g",
      Zona: "Valle del Ebro",
    },
    pairing: ["Tés", "Infusiones", "Quesos frescos", "Yogur natural"],
    story:
      "Los campos de romero del Valle del Ebro florecen en primavera, cubriendo las laderas de un manto azul violáceo. Las abejas trabajan incansablemente en esta corta ventana de floración para producir una miel clara, dulce y aromática.",
    imageGradient: "from-amber-700/30 via-yellow-500/20 to-stone-700/30",
    featured: false,
  },
  {
    id: "conserva-artesana-seleccion",
    slug: "conserva-artesana-seleccion",
    category: "gourmet",
    name: "Conserva Artesana Selección",
    producer: "Conservas del Norte",
    region: "País Vasco",
    shortDescription:
      "Selección de conservas artesanas de anchoa, bonito y verduras del norte.",
    longDescription:
      "Una cuidada selección de conservas artesanas elaboradas con los mejores productos del mar Cantábrico y las huertas del norte. Anchoas en aceite de oliva, bonito del norte en escabeche, pimientos asados y alcachofas confitadas. Cada lata es un tesoro gastronómico.",
    status: "concept",
    tags: ["Conservas", "Artesano", "Cantábrico", "Selección"],
    highlights: [
      "Elaboración artesanal",
      "Producto del Cantábrico",
      "Sin aditivos",
      "Pack 4 unidades",
    ],
    specs: {
      Tipo: "Pack conservas selección",
      Contenido: "4 unidades",
      Variedades: "Anchoa, Bonito, Pimientos, Alcachofas",
      Conservación: "Temperatura ambiente",
      Caducidad: "2028",
      Alérgenos: "Pescado",
    },
    pairing: [
      "Vino blanco seco",
      "Pan de cristal",
      "Tomate triturado",
      "Olivas",
    ],
    story:
      "Seleccionamos cada conserva visitando personalmente las conserveras artesanas del Cantábrico. Buscamos productores que mantienen métodos tradicionales, respetan los tiempos de la naturaleza y utilizan solo ingredientes de primera calidad.",
    imageGradient: "from-orange-800/30 via-red-700/20 to-amber-800/30",
    featured: false,
  },
  {
    id: "crema-de-almendra-premium",
    slug: "crema-de-almendra-premium",
    category: "gourmet",
    name: "Crema de Almendra Premium",
    producer: "Torrefactos Artesanos",
    region: "Aragón",
    shortDescription:
      "Crema untable de almendra ecológica con cacao y aceite de oliva virgen extra.",
    longDescription:
      "Elaborada con almendras ecológicas de Aragón, cacao puro y nuestro AOVE arbequina. Sin aceite de palma, sin lactosa, sin gluten. Una crema untable premium que transforma cualquier desayuno o merienda en una experiencia gastronómica.",
    status: "concept",
    tags: ["Almendra", "Ecológico", "Untable", "Premium"],
    highlights: [
      "100% almendra ecológica",
      "Sin aceite de palma",
      "Sin lactosa",
      "AOVE incluido",
    ],
    specs: {
      Ingredientes:
        "Almendra ecológica 60%, cacao puro 20%, AOVE 15%, azúcar de caña 5%",
      Formato: "200g",
      Conservación: "Temperatura ambiente",
      Alérgenos: "Frutos secos",
      Certificación: "Ecológico UE",
      Caducidad: "2026",
    },
    pairing: ["Pan tostado", "Fruta fresca", "Helado de vainilla", "Crepes"],
    story:
      "Buscábamos una crema de almendra que no comprometiera la calidad por el precio. La solución fue sencilla: usar solo almendras ecológicas de Aragón, cacao puro y nuestro propio AOVE. El resultado es una crema que sabe a almendra de verdad.",
    imageGradient: "from-amber-900/30 via-yellow-800/20 to-brown-800/30",
    featured: false,
  },
  {
    id: "pack-descubrimiento-rioja",
    slug: "pack-descubrimiento-rioja",
    category: "packs",
    name: "Pack Descubrimiento Rioja",
    producer: "LabrazaHome Selección",
    region: "Rioja",
    shortDescription:
      "Tres vinos esenciales para descubrir la diversidad de la D.O.Ca Rioja.",
    longDescription:
      "Un pack pensado para quienes quieren explorar Rioja a través de tres estilos complementarios: un joven vibrante, un crianza equilibrado y un reserva con carácter. Incluye guía de cata y maridajes sugeridos.",
    status: "design",
    tags: ["Pack", "Rioja", "Descubrimiento", "Cata"],
    highlights: [
      "3 vinos seleccionados",
      "Guía de cata incluida",
      "Caja regalo premium",
      "Envío calculado",
    ],
    specs: {
      Contenido: "3 botellas (75cl)",
      Tipos: "Joven, Crianza, Reserva",
      Formato: "Caja regalo",
      Incluye: "Guía de cata ilustrada",
      Temperatura: "Según cada vino",
      Conservación: "Lugar fresco y oscuro",
    },
    pairing: [
      "Aperitivos variados",
      "Carnes",
      "Quesos",
      "Postres de chocolate",
    ],
    story:
      "Este pack nace de una idea sencilla: nadie debería sentirse abrumado al acercarse al vino de Rioja. Seleccionamos tres vinos que representan el alma de la denominación y los acompañamos de una guía escrita por nuestro equipo de sumilleres.",
    imageGradient: "from-red-900/30 via-amber-800/20 to-purple-900/30",
    featured: true,
  },
  {
    id: "pack-mesa-premium",
    slug: "pack-mesa-premium",
    category: "packs",
    name: "Pack Mesa Premium",
    producer: "LabrazaHome Selección",
    region: "España",
    shortDescription:
      "Vino, aceite y conservas para una experiencia gastronómica completa.",
    longDescription:
      "Todo lo necesario para una experiencia gastronómica premium: un reserva de Rioja, un AOVE de cosecha temprana y una selección de conservas artesanas. Ideal para regalo o para disfrutar en casa.",
    status: "concept",
    tags: ["Pack", "Gastronómico", "Completo", "Regalo"],
    highlights: [
      "Vino + Aceite + Conservas",
      "Estuche premium",
      "Para compartir",
      "Regalo ideal",
    ],
    specs: {
      Contenido: "1 botella vino + 1 AOVE 250ml + 3 conservas",
      Formato: "Estuche premium",
      Incluye: "Notas de cata y maridaje",
      Peso: "2.5 kg aprox.",
      Conservación: "Lugar fresco y oscuro",
      Tipo: "Gastronómico",
    },
    pairing: ["Comida completa", "Cena especial", "Regalo corporativo"],
    story:
      "El Pack Mesa Premium nace de la convicción de que la mejor gastronomía es la que se comparte. Hemos seleccionado cada producto para que armonicen entre sí y creen una experiencia completa de principio a fin.",
    imageGradient: "from-primary/30 via-amber-800/20 to-stone-900/30",
    featured: true,
  },
];

export function getProductsByCategory(category: string): ProductPremium[] {
  return products.filter((p) => p.category === category);
}

export function getProductBySlug(
  slug: string,
  category?: string,
): ProductPremium | undefined {
  return products.find(
    (p) => p.slug === slug && (!category || p.category === category),
  );
}

export function getFeaturedProducts(): ProductPremium[] {
  return products.filter((p) => p.featured);
}
