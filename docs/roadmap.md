# LabrazaHome Labs — Roadmap

## Estado actual: Junio 2026

## Matriz de estado

```
FASE 1 — FUNDACIÓN
  ✅ Base técnica (monorepo, Astro 6, Fastify 5, Prisma 6, PostgreSQL 17)
  ✅ Landing LabrazaHome Labs
  ✅ Design System

FASE 2 — CATÁLOGO PREMIUM v2
  ✅ Catálogo Premium v2 (11 productos, 5 categorías, fichas, ratings, knowledge)

FASE 3 — SOMMELIER AI v2
  ✅ Sommelier AI v2
      ✅ UI conversacional premium
      ✅ Mock engine con 6 intents
      ✅ Base de conocimiento enriquecida
      ✅ Flujos conversacionales guiados (vino, aceite, miel, regalo)

FASE 4 — PORTAL B2B v2
  🟢 Professional Platform Mock
      ✅ Arquitectura completa
      ✅ Dashboard profesional mock (3 columnas, KPIs, perfiles, actividad)
      ✅ Flujo de selección interactivo (catálogo, cantidades, uso)
      ✅ Flujo de presupuesto mock (vista previa modal)
      ✅ Customer Workspace mock (perfiles, selecciones, presupuestos, docs, sommelier, timeline)
      ✅ Document Center mock (fichas, catálogos, argumentarios, maridajes, filtros, detalle)
      ✅ Persistencia local (localStorage)
      ✅ Componentes reutilizables (Hero, KpiStrip, ProfileSelector, etc.)
      ✅ Navegación funcional /b2b/, /b2b/workspace, /b2b/documentos
      ✅ Vercel smoke PASS (Dashboard, Quote Flow, Workspace, Document Center)

FASE 5 — BACKOFFICE ADMIN v2
  🟡 Placeholder avanzado
      ✅ Arquitectura completa
      ✅ 8 perfiles definidos
      ✅ 20 módulos diseñados
      ✅ 36 rutas planificadas
      ✅ Placeholder informativo
      ⏳ Implementación pendiente

FASE 6 — IA REAL
  🟡 LM Studio preparado
      ✅ Proveedor LM Studio implementado
      ✅ Parser JSON robusto (fences + balanced brackets)
      ⏳ Modelo fiable ≥7B params pendiente
      ⏳ Integración AI-LAB Gateway
      ⏳ Evaluación y validación de respuestas reales

FASE 7 — INTEGRACIÓN PRODUCCIÓN
  ⏳ Integración controlada con Rioja Marketplace
  ⏳ Read-only inicial
  ⏳ Runbook de integración
  ⏳ Validación visual y de datos
```

## Leyenda

| Símbolo | Significado                                       |
| ------- | ------------------------------------------------- |
| ✅      | Completado                                        |
| 🟢      | Funcional con datos mock                          |
| 🟡      | Arquitectura completada, implementación pendiente |
| ⏳      | Planificado, no iniciado                          |

## Dependencias

```
Catálogo Premium v2 ─────────────────────────────────┐
       │                                              │
       ├── Sommelier AI v2 (consume productos)        │
       │       │                                      │
       │       └── Sommelier IA Real (futuro)         │
       │                                              │
       ├── Portal B2B v2 (consume productos + MOQ) ───┤
       │       │                                      │
       │       └── Backoffice Admin v2 (gestiona) ────┤
       │                                              │
       └── Rioja Marketplace (origen datos reales)    │
                                                      │
Backoffice Admin v2 ──────────────────────────────────┘
       │
       ├── Gestiona Catálogo Premium
       ├── Gestiona Portal B2B (cuentas, condiciones)
       ├── Gobierna Sommelier AI (prompts, supervisión)
       └── Prepara integración con Rioja Marketplace
```

## Prioridades

1. Completar Dashboard B2B con datos mock (✅ completado)
2. Completar flujo de selección y presupuesto B2B (✅ completado)
3. Customer Workspace + Document Center mock (✅ completado)
4. Implementar Backoffice Admin v2 (CRUD productos)
5. Evaluar modelos ≥7B params para IA real en Sommelier
6. Integración controlada con Rioja Marketplace

## Próximos hitos

| Hito                                 | Fase | Dependencia            |
| ------------------------------------ | ---- | ---------------------- |
| Dashboard B2B con datos mock         | F4   | ✅ Completado          |
| Flujo de selección y presupuesto     | F4   | ✅ Completado          |
| Customer Workspace + Document Center | F4   | ✅ Completado          |
| Vercel smoke B2B completo            | F4   | ✅ Completado          |
| CRUD productos en Backoffice         | F5   | Placeholder Admin      |
| IA real en Sommelier                 | F6   | LM Studio ≥7B / AI-LAB |
| Integración Rioja Marketplace        | F7   | F4+F5+F6 completo      |
