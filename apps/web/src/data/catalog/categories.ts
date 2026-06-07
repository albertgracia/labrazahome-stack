import type { CategoryInfo } from "../../types/catalog";

export const categories: CategoryInfo[] = [
  {
    slug: "vinos",
    name: "Vinos",
    icon: "🍷",
    description:
      "Tintos, blancos y rosados de la D.O.Ca Rioja y otras denominaciones premium. Cada botella cuenta una historia de tierra, clima y tradición.",
    heroGradient:
      "from-red-950/20 via-primary/5 to-transparent dark:from-red-950/30 dark:via-primary/10",
  },
  {
    slug: "aceites",
    name: "Aceites",
    icon: "🫒",
    description:
      "AOVE selectos con denominación de origen y perfiles sensoriales únicos. De la aceituna a la mesa, el oro líquido del Mediterráneo.",
    heroGradient:
      "from-emerald-950/20 via-primary/5 to-transparent dark:from-emerald-950/30 dark:via-primary/10",
  },
  {
    slug: "mieles",
    name: "Mieles",
    icon: "🍯",
    description:
      "Mieles monoflorales y multiflorales de productores artesanales. Dulzura natural con la pureza del origen.",
    heroGradient:
      "from-amber-950/20 via-primary/5 to-transparent dark:from-amber-950/30 dark:via-primary/10",
  },
  {
    slug: "gourmet",
    name: "Gourmet",
    icon: "🧀",
    description:
      "Conservas, foies, trufas y productos de alta gastronomía seleccionados por su excelencia y origen.",
    heroGradient:
      "from-orange-950/20 via-primary/5 to-transparent dark:from-orange-950/30 dark:via-primary/10",
  },
  {
    slug: "packs",
    name: "Packs",
    icon: "🎁",
    description:
      "Selecciones, experiencias y cestas premium para regalo y degustación. El mejor escaparate del ecosistema LabrazaHome.",
    heroGradient:
      "from-primary/10 via-primary/5 to-transparent dark:from-primary/20",
  },
];
