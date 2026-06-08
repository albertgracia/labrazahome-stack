import type { Profile } from "../../types/sommelier";

export interface SommelierProfileConfig {
  id: Profile;
  label: string;
  icon: string;
  description: string;
  quickPrompts: string[];
  disclaimer: string;
  responsePrefix: string;
}

export const SOMMELIER_PROFILES: Record<Profile, SommelierProfileConfig> = {
  private: {
    id: "private",
    label: "Cliente Privado",
    icon: "👤",
    description:
      "Experiencia de compra premium para consumo personal, regalos y maridajes domésticos.",
    quickPrompts: [
      "Vino para cena",
      "Regalo premium",
      "Miel para desayuno",
      "Aceite para cocina diaria",
    ],
    disclaimer: "Recomendaciones para el consumidor final.",
    responsePrefix: "",
  },
  b2b: {
    id: "b2b",
    label: "Profesional B2B",
    icon: "🏢",
    description:
      "Herramientas profesionales para restaurantes, distribuidores y tiendas gourmet.",
    quickPrompts: [
      "Vino para carta de restaurante",
      "Pack para hotel",
      "Aceites para tienda gourmet",
      "Recomendación para menú degustación",
    ],
    disclaimer: "Enfoque comercial y operativo para profesionales.",
    responsePrefix: "Desde una perspectiva profesional, ",
  },
  producer: {
    id: "producer",
    label: "Proveedor / bodega",
    icon: "🏭",
    description:
      "Fichas técnicas, posicionamiento editorial y storytelling de producto.",
    quickPrompts: [
      "Cómo presentar este vino",
      "Qué argumentos destacar",
      "Cómo mejorar ficha de producto",
      "Qué maridajes comunicar",
    ],
    disclaimer: "Enfoque editorial y de posicionamiento de producto.",
    responsePrefix: "Como ficha editorial, destacaría que ",
  },
  admin: {
    id: "admin",
    label: "Admin interno",
    icon: "🛡️",
    description:
      "Supervisión, auditoría y control de calidad del catálogo y las respuestas.",
    quickPrompts: [
      "Revisar ficha incompleta",
      "Validar recomendación",
      "Detectar productos sin maridaje",
      "Revisar puntuaciones mock",
    ],
    disclaimer: "Enfoque de supervisión y control interno.",
    responsePrefix: "Para revisión interna, conviene comprobar que ",
  },
};

export const PROFILE_STORAGE_KEY = "labrazahome:sommelier-profile";

export function applyProfilePrefix(answer: string, profile?: Profile): string {
  if (!profile) return answer;
  const prefix = SOMMELIER_PROFILES[profile].responsePrefix;
  if (!prefix) return answer;
  const lower = answer.charAt(0).toLowerCase() + answer.slice(1);
  return prefix + lower;
}
