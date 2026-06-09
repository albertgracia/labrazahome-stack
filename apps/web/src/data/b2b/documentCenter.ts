import type {
  B2BDocumentMock,
  B2BDocumentType,
  B2BDocumentStatus,
  B2BDocumentProfile,
} from "../../types/b2b";

export interface DocumentStat {
  label: string;
  value: string;
  icon: string;
  description: string;
}

export const documentCategories: B2BDocumentType[] = [
  "Ficha técnica",
  "Catálogo",
  "Argumentario",
  "Maridaje",
  "Certificación",
  "Pack",
];

export const documentProfiles: B2BDocumentProfile[] = [
  "Restaurante",
  "Tienda gourmet",
  "Hotel",
  "Distribuidor",
  "Empresa",
];

export const documentStatuses: B2BDocumentStatus[] = [
  "Disponible",
  "En preparación",
  "Futuro",
];

export const documentStats: DocumentStat[] = [
  {
    label: "Fichas técnicas",
    value: "18",
    icon: "📄",
    description: "Documentos técnicos de producto",
  },
  {
    label: "Argumentarios",
    value: "7",
    icon: "📝",
    description: "Guías comerciales por perfil",
  },
  {
    label: "Guías de maridaje",
    value: "9",
    icon: "🍷",
    description: "Recomendaciones profesionales",
  },
  {
    label: "Catálogos",
    value: "3",
    icon: "📕",
    description: "Catálogos descargables",
  },
  {
    label: "Documentos pendientes",
    value: "4",
    icon: "⏳",
    description: "En preparación o futuros",
  },
  {
    label: "Perfiles compatibles",
    value: "5",
    icon: "👥",
    description: "Perfiles profesionales cubiertos",
  },
];

export const featuredDocuments: B2BDocumentMock[] = [
  {
    id: "doc-feat-001",
    title: "Ficha técnica — Reserva del Alto Ebro",
    type: "Ficha técnica",
    category: "Fichas técnicas",
    profile: ["Restaurante", "Distribuidor", "Empresa"],
    status: "Disponible",
    productSlug: "reserva-del-alto-ebro",
    productName: "Reserva del Alto Ebro",
    description:
      "Ficha técnica completa con especificaciones, notas de cata, maridaje recomendado y condiciones de conservación.",
    professionalUse:
      "Selección de tintos para carta de restaurante y pedidos por volumen.",
    mockContent:
      "Variedad: Tempranillo 100%. Crianza: 24 meses en barrica de roble francés. Graduación: 14.5% Vol. Temperatura de servicio: 16-18°C. Nota de cata: Vista rojo cereza profundo con ribete granate. Nariz: frutos rojos maduros, especias y torrefactos. Boca: taninos sedosos, paso amplio, final largo y persistente. Maridaje: carnes rojas asadas, quesos curados, caza mayor. Certificaciones: D.O.Ca. Rioja, Agricultura ecológica.",
  },
  {
    id: "doc-feat-002",
    title: "Catálogo profesional LabrazaHome",
    type: "Catálogo",
    category: "Catálogos",
    profile: [
      "Restaurante",
      "Tienda gourmet",
      "Hotel",
      "Distribuidor",
      "Empresa",
    ],
    status: "Disponible",
    productSlug: null,
    productName: null,
    description:
      "Catálogo comercial completo con todos los productos, condiciones B2B, perfiles profesionales y casos de uso.",
    professionalUse: "Presentación comercial para clientes B2B y prospección.",
    mockContent:
      "Edición 2026. Contenido: 128 productos organizados en 5 categorías (Vinos, Aceites, Mieles, Gourmet, Packs). Incluye tabla de condiciones B2B por perfil profesional, MOQ por producto, plazos de entrega estimados y política de devoluciones. Formato: PDF interactivo con enlaces a fichas detalladas. Peso estimado: 12 MB.",
  },
  {
    id: "doc-feat-003",
    title: "Argumentario Carta Restaurante",
    type: "Argumentario",
    category: "Argumentarios",
    profile: ["Restaurante"],
    status: "Disponible",
    productSlug: null,
    productName: null,
    description:
      "Argumentario comercial para equipos de sala: cómo presentar cada vino, maridajes sugeridos y preguntas frecuentes.",
    professionalUse: "Formación de camareros y sommeliers para venta en sala.",
    mockContent:
      "Módulo 1: Conocimiento de producto. Módulo 2: Técnicas de venta sugerida. Módulo 3: Preguntas frecuentes y objeciones. Módulo 4: Maridajes por tipo de menú. Incluye fichas rápidas por referencia con puntos clave de venta, perfil del cliente ideal y maridaje recomendado.",
  },
  {
    id: "doc-feat-004",
    title: "Guía Maridajes Premium",
    type: "Maridaje",
    category: "Maridajes",
    profile: ["Restaurante", "Hotel", "Tienda gourmet"],
    status: "Disponible",
    productSlug: null,
    productName: null,
    description:
      "Guía completa de maridajes profesionales: vinos, aceites, mieles y conservas para menús de alta cocina.",
    professionalUse:
      "Diseño de carta y menú maridaje para restaurantes y hoteles.",
    mockContent:
      "Sección 1: Maridajes clásicos (vino tinto + carne roja, vino blanco + pescado). Sección 2: Maridajes de autor (aceite arbequina + helado, miel de brezo + queso azul). Sección 3: Menús maridaje completos (3 tiempos + postre). Sección 4: Tabla rápida por producto y perfil de cliente.",
  },
  {
    id: "doc-feat-005",
    title: "Pack Mesa Premium — Ficha comercial",
    type: "Pack",
    category: "Packs",
    profile: ["Empresa", "Tienda gourmet"],
    status: "Disponible",
    productSlug: "pack-mesa-premium",
    productName: "Pack Mesa Premium",
    description:
      "Ficha comercial del pack estrella: composición, presentación, casos de uso y opciones de personalización.",
    professionalUse:
      "Regalo corporativo, cesta de empresa y venta directa en tienda gourmet.",
    mockContent:
      "Composición: 1 botella Reserva del Alto Ebro (75cl) + 1 botella Coupage de Sierra AOVE (50cl) + 1 tarro Miel de Romero Clara (250g). Presentación: caja de madera premium con asa y grabado. Personalización: etiqueta con logotipo del cliente, dedicatoria opcional. MOQ: 10 packs. Plazo estimado: 7-10 días laborables.",
  },
];

export const productDocuments: B2BDocumentMock[] = [
  // Vinos
  {
    id: "doc-prod-001",
    title: "Ficha técnica — Reserva del Alto Ebro",
    type: "Ficha técnica",
    category: "Vinos",
    profile: ["Restaurante", "Distribuidor"],
    status: "Disponible",
    productSlug: "reserva-del-alto-ebro",
    productName: "Reserva del Alto Ebro",
    description:
      "Especificaciones técnicas, cata y maridaje del tinto premium.",
    professionalUse: "Selección y compra profesional.",
    mockContent:
      "D.O.Ca. Rioja. Tempranillo 100%. Crianza 24 meses. 14.5% Vol. Botella 75cl.",
  },
  {
    id: "doc-prod-002",
    title: "Ficha técnica — Garnacha de Altura",
    type: "Ficha técnica",
    category: "Vinos",
    profile: ["Restaurante", "Tienda gourmet"],
    status: "Disponible",
    productSlug: "garnacha-de-altura",
    productName: "Garnacha de Altura",
    description: "Ficha del vino ecológico de garnacha de altura.",
    professionalUse: "Carta de vinos ecológicos.",
    mockContent:
      "D.O.P. Calatayud. Garnacha 100%. Viñedo a 800m. Crianza 14 meses. 14% Vol. Certificación ecológica.",
  },
  {
    id: "doc-prod-003",
    title: "Ficha técnica — Blanco de Viura Selección",
    type: "Ficha técnica",
    category: "Vinos",
    profile: ["Restaurante", "Hotel"],
    status: "Disponible",
    productSlug: "blanco-de-viura-seleccion",
    productName: "Blanco de Viura Selección",
    description: "Ficha del blanco con crianza para carta profesional.",
    professionalUse: "Carta de blancos con cuerpo.",
    mockContent:
      "D.O.Ca. Rioja. Viura 100%. Fermentación en barrica. 5 meses de crianza. 13% Vol. Servir a 8-10°C.",
  },
  // Aceites
  {
    id: "doc-prod-004",
    title: "Ficha técnica — Arbequina Temprana",
    type: "Ficha técnica",
    category: "Aceites",
    profile: ["Restaurante", "Tienda gourmet"],
    status: "Disponible",
    productSlug: "arbequina-temprana",
    productName: "Arbequina Temprana",
    description: "AOVE arbequina de cosecha temprana.",
    professionalUse: "Aceite de acabado para cocina profesional.",
    mockContent:
      "D.O.P. Siurana. Variedad Arbequina 100%. Cosecha temprana (septiembre). Acidez <0.2%. Envase 50cl vidrio oscuro.",
  },
  {
    id: "doc-prod-005",
    title: "Ficha técnica — Coupage de Sierra",
    type: "Ficha técnica",
    category: "Aceites",
    profile: ["Restaurante", "Distribuidor"],
    status: "Disponible",
    productSlug: "coupage-de-sierra",
    productName: "Coupage de Sierra",
    description: "AOVE coupage de sierra para uso profesional versátil.",
    professionalUse: "Aceite multiuso para cocina y mesa.",
    mockContent:
      "Coupage Arbequina + Picual + Hojiblanca. Acidez <0.3%. Cosecha 2025. Envase 50cl y 5L bag-in-box.",
  },
  // Mieles
  {
    id: "doc-prod-006",
    title: "Ficha técnica — Miel de Brezo Atlántico",
    type: "Ficha técnica",
    category: "Mieles",
    profile: ["Tienda gourmet", "Restaurante"],
    status: "Disponible",
    productSlug: "miel-de-brezo-atlantico",
    productName: "Miel de Brezo Atlántico",
    description: "Miel monovarietal de brezo atlántico.",
    professionalUse: "Degustación, maridaje con queso, venta gourmet.",
    mockContent:
      "Origen: Galicia. Variedad: Brezo (Erica spp.). Color: ámbar oscuro. Sabor: intenso, ligeramente amargo. Formato 250g tarro cristal.",
  },
  {
    id: "doc-prod-007",
    title: "Ficha técnica — Miel de Romero Clara",
    type: "Ficha técnica",
    category: "Mieles",
    profile: ["Hotel", "Tienda gourmet"],
    status: "Disponible",
    productSlug: "miel-de-romero-clara",
    productName: "Miel de Romero Clara",
    description: "Miel de romero suave, ideal para desayuno buffet.",
    professionalUse: "Buffet desayuno, venta gourmet, regalo.",
    mockContent:
      "Origen: Levante. Variedad: Romero (Rosmarinus officinalis). Color: ámbar claro. Sabor: suave y dulce. Formato 250g y 500g.",
  },
  // Packs
  {
    id: "doc-prod-008",
    title: "Ficha comercial — Pack Descubrimiento Rioja",
    type: "Pack",
    category: "Packs",
    profile: ["Empresa", "Tienda gourmet"],
    status: "Disponible",
    productSlug: "pack-descubrimiento-rioja",
    productName: "Pack Descubrimiento Rioja",
    description:
      "Pack de iniciación a la D.O.Ca. Rioja con tres vinos emblemáticos.",
    professionalUse: "Regalo corporativo y cata profesional.",
    mockContent:
      "Composición: 1 Crianza + 1 Reserva + 1 Blanco fermentado en barrica. Presentación: caja de cartón premium con interior moldeado. MOQ: 6 packs.",
  },
  {
    id: "doc-prod-009",
    title: "Ficha comercial — Pack Mesa Premium",
    type: "Pack",
    category: "Packs",
    profile: ["Empresa", "Restaurante"],
    status: "Disponible",
    productSlug: "pack-mesa-premium",
    productName: "Pack Mesa Premium",
    description: "Pack gourmet completo para regalo corporativo de alta gama.",
    professionalUse: "Regalo de empresa y cesta navideña.",
    mockContent:
      "Composición: Vino tinto + AOVE + Miel. Presentación: caja madera con asa. MOQ: 10 packs. Personalización disponible.",
  },
];
