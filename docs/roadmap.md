# LabrazaHome Labs — Roadmap

## Estado actual: Junio 2026

## Matriz de estado

```
FASE 1 — FUNDACIÓN
  ✅ Base técnica (monorepo, Astro 6, Fastify 5, Prisma 6, PostgreSQL 17)
  ✅ Landing LabrazaHome Labs
  ✅ Design System

FASE 2 — PRODUCTOS CORE
  ✅ Catálogo Premium v2 (11 productos, 5 categorías, fichas, ratings, knowledge)
  ✅ Sommelier AI v2
      ✅ Arquitectura
      ✅ UI conversacional premium
      ✅ Mock engine con 6 intents
      ✅ Base de conocimiento enriquecida
      ✅ Flujos conversacionales guiados (vino, aceite, miel, regalo)

FASE 3 — CAPA PROFESIONAL
  🟢 Portal B2B v2
      ✅ Arquitectura completa
      ✅ 7 perfiles definidos
      ✅ 14 módulos diseñados
      ✅ 17 rutas planificadas
      ✅ Placeholder informativo
      ⏳ Implementación pendiente
  🟢 Backoffice Admin v2
      ✅ Arquitectura completa
      ✅ 8 perfiles definidos
      ✅ 20 módulos diseñados
      ✅ 36 rutas planificadas
      ✅ Placeholder informativo
      ⏳ Implementación pendiente

FASE 4 — IA REAL
  ⏳ Integración LM Studio (modelos locales)
  ⏳ Integración AI-LAB Gateway
  ⏳ Evaluación y validación de respuestas reales

FASE 5 — INTEGRACIÓN PRODUCCIÓN
  ⏳ Integración controlada con Rioja Marketplace
  ⏳ Read-only inicial
  ⏳ Runbook de integración
  ⏳ Validación visual y de datos
```

## Leyenda

| Símbolo | Significado                                       |
| ------- | ------------------------------------------------- |
| ✅      | Completado                                        |
| 🟢      | Arquitectura completada, pendiente implementación |
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

1. Completar implementación de Portal B2B v2 (dashboard + catálogo profesional)
2. Completar implementación de Backoffice Admin v2 (gestión de catálogo)
3. Integración de IA real con LM Studio / AI-LAB
4. Integración controlada con Rioja Marketplace

## Próximos hitos

| Hito                                | Fase | Dependencia              |
| ----------------------------------- | ---- | ------------------------ |
| Placeholder B2B + Admin funcionales | F3   | —                        |
| Dashboard B2B con datos mock        | F3   | Placeholder B2B          |
| CRUD productos en Backoffice        | F3   | Placeholder Admin        |
| IA real en Sommelier                | F4   | LM Studio / AI-LAB       |
| Integración Rioja Marketplace       | F5   | F3 completo, IA validada |
