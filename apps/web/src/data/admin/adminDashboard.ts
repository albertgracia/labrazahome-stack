import type {
  AdminKpi,
  CatalogReviewItem,
  B2BPipelineItem,
  SommelierGovernanceMetric,
  IntegrationStatusItem,
  AdminAlert,
  AdminActivityItem,
  AdminRoadmapItem,
} from "../../types/admin";

export const adminKpis: AdminKpi[] = [
  {
    label: "Productos publicados",
    value: "42",
    icon: "📦",
    description: "En catálogo premium",
  },
  {
    label: "Pendientes revisión",
    value: "7",
    icon: "📝",
    description: "Productos en cola",
  },
  {
    label: "Cuentas B2B simuladas",
    value: "24",
    icon: "🏢",
    description: "Perfiles profesionales mock",
  },
  {
    label: "Presupuestos mock",
    value: "12",
    icon: "📋",
    description: "Solicitudes simuladas",
  },
  {
    label: "Alertas Sommelier",
    value: "3",
    icon: "🍷",
    description: "Revisiones pendientes",
  },
  {
    label: "Integraciones futuras",
    value: "4",
    icon: "🔗",
    description: "Plataformas planificadas",
  },
];

export const catalogReviewItems: CatalogReviewItem[] = [
  {
    name: "Reserva del Alto Ebro",
    category: "Vinos",
    status: "Publicado",
    statusColor: "emerald",
    actions: ["Revisar ficha", "Validar contenido"],
  },
  {
    name: "Coupage de Sierra",
    category: "Aceites",
    status: "Pendiente revisión",
    statusColor: "amber",
    actions: ["Revisar ficha", "Completar media"],
  },
  {
    name: "Pack Mesa Premium",
    category: "Packs",
    status: "Falta imagen",
    statusColor: "red",
    actions: ["Completar media", "Validar contenido"],
  },
  {
    name: "Miel de Romero Clara",
    category: "Mieles",
    status: "Ficha incompleta",
    statusColor: "amber",
    actions: ["Revisar ficha", "Completar media"],
  },
  {
    name: "Garnacha de Altura",
    category: "Vinos",
    status: "Listo para B2B",
    statusColor: "emerald",
    actions: ["Validar contenido"],
  },
  {
    name: "Crema de Almendra Premium",
    category: "Gourmet",
    status: "Pendiente revisión",
    statusColor: "amber",
    actions: ["Revisar ficha", "Completar media"],
  },
];

export const b2bPipelineItems: B2BPipelineItem[] = [
  {
    label: "Solicitudes de presupuesto",
    value: "5",
    detail: "3 borradores, 2 listos para revisión",
    status: "Pendiente comercial",
    statusColor: "amber",
  },
  {
    label: "Selecciones activas",
    value: "6",
    detail: "4 restaurante, 1 tienda, 1 hotel",
    status: "Activas",
    statusColor: "emerald",
  },
  {
    label: "Documentos pendientes",
    value: "8",
    detail: "4 fichas, 2 catálogos, 2 argumentarios",
    status: "En preparación",
    statusColor: "amber",
  },
  {
    label: "Workspace activity",
    value: "12",
    detail: "Eventos en últimos 7 días",
    status: "Simulado",
    statusColor: "indigo",
  },
];

export const sommelierGovernanceMetrics: SommelierGovernanceMetric[] = [
  {
    label: "Respuestas revisadas",
    value: "24",
    icon: "✅",
    trend: "+6 esta semana",
  },
  { label: "Warnings", value: "3", icon: "⚠️", trend: "2 tono, 1 catálogo" },
  { label: "Fallback rate", value: "4%", icon: "📊", trend: "Bajo, aceptable" },
  {
    label: "Provider",
    value: "Mock",
    icon: "🧪",
    trend: "LM Studio preparado",
  },
];

export const integrationStatusItems: IntegrationStatusItem[] = [
  {
    name: "Catálogo Premium v2",
    icon: "📦",
    status: "Activo mock",
    statusColor: "emerald",
    description: "Mock data sincronizado con frontend",
  },
  {
    name: "Portal B2B v2",
    icon: "🏢",
    status: "Activo mock",
    statusColor: "emerald",
    description: "4 rutas funcionales con datos simulados",
  },
  {
    name: "Sommelier API",
    icon: "🍷",
    status: "Arquitectura",
    statusColor: "indigo",
    description: "Backend API scaffold creado, no conectado",
  },
  {
    name: "LM Studio",
    icon: "🧪",
    status: "Parcial",
    statusColor: "amber",
    description: "Provider implementado, modelo <7B no fiable",
  },
  {
    name: "AI-LAB Gateway",
    icon: "🤖",
    status: "Arquitectura",
    statusColor: "indigo",
    description: "Provider diseñado, pendiente integración",
  },
  {
    name: "Rioja Marketplace",
    icon: "🏠",
    status: "Futuro",
    statusColor: "zinc",
    description: "Integración post-lanzamiento",
  },
];

export const adminAlerts: AdminAlert[] = [
  {
    title: "Producto sin imagen principal",
    description:
      "Coupage de Sierra y Crema de Almendra no tienen imagen hero asignada",
    severity: "Media",
    severityColor: "amber",
  },
  {
    title: "Rating crítico pendiente verificación",
    description:
      "Reserva del Alto Ebro tiene rating 4.9 sin verificar este mes",
    severity: "Baja",
    severityColor: "emerald",
  },
  {
    title: "Documento comercial simulado",
    description: "Ficha técnica de Pack Mesa Premium usa contenido placeholder",
    severity: "Info",
    severityColor: "indigo",
  },
  {
    title: "LM Studio modelo no recomendado",
    description: "llama-3.2-1b-instruct no produce JSON fiable para producción",
    severity: "Media",
    severityColor: "amber",
  },
  {
    title: "Rioja integration bloqueada",
    description: "Runbook de integración futura pendiente de aprobación",
    severity: "Baja",
    severityColor: "emerald",
  },
];

export const adminRecentActivity: AdminActivityItem[] = [
  {
    action: "B2B Workspace validado",
    detail: "Vercel smoke PASS en /b2b/workspace",
    time: "Hace 2h",
    icon: "✅",
  },
  {
    action: "Document Center validado",
    detail: "Vercel smoke PASS en /b2b/documentos",
    time: "Hace 4h",
    icon: "✅",
  },
  {
    action: "Sommelier API scaffold",
    detail: "Backend endpoints y mock provider creados",
    time: "Hace 2d",
    icon: "🔧",
  },
  {
    action: "LM Studio parser hardened",
    detail: "extractJSON multi-estrategia implementado",
    time: "Hace 3d",
    icon: "🛠️",
  },
  {
    action: "Impeccable Gate integrado",
    detail: "41 reglas + 11 prohibiciones en design gate",
    time: "Hace 5d",
    icon: "🎯",
  },
  {
    action: "Dashboard B2B",
    detail: "3 columnas, 6 KPIs, 5 perfiles mock",
    time: "Hace 7d",
    icon: "📊",
  },
];

export const adminRoadmapData: AdminRoadmapItem[] = [
  { phase: "Arquitectura", status: "completed" },
  { phase: "Placeholder", status: "completed" },
  { phase: "Real Dashboard Mock", status: "active" },
  { phase: "Content Manager", status: "pending" },
  { phase: "Sommelier Governance", status: "pending" },
  { phase: "Marketplace Integration", status: "pending" },
];
