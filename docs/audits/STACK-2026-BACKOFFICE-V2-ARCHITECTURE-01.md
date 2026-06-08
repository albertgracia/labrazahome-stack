# STACK-2026-BACKOFFICE-V2-ARCHITECTURE-01

## Status: Done

## Goal

Design the functional, visual and technical architecture of the future Backoffice Admin v2 for LabrazaHome Labs. Architecture and documentation phase only — no implementation.

## Initial State

- HEAD: `a492157`
- LabrazaHome Labs ecosystem with Landing, Catálogo Premium v2, Sommelier AI v2 with conversation flows, Portal B2B v2 architecture documented
- Vercel + GitHub configured
- No backoffice admin or architecture yet

## Files Reviewed

- `docs/architecture/sommelier-ai-v2.md` — reference architecture doc format
- `docs/architecture/portal-b2b-v2.md` — sibling architecture for integration design
- `apps/web/src/layouts/Layout.astro` — navigation for placeholder link

## Documentation Created

### `docs/architecture/backoffice-v2.md`

Comprehensive architecture document covering:

| Section                        | Content                                                                                                                                                                                                                                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Visión                         | Centro operativo interno del ecosistema LabrazaHome Labs                                                                                                                                                                                                                                                                 |
| Objetivos                      | 9 objetivos clave                                                                                                                                                                                                                                                                                                        |
| No Alcance                     | 10 limitaciones de fase                                                                                                                                                                                                                                                                                                  |
| Perfiles Internos              | 8 perfiles detallados con responsabilidades, permisos, módulos y riesgos                                                                                                                                                                                                                                                 |
| Módulos                        | 20 módulos con descripción funcional detallada                                                                                                                                                                                                                                                                           |
| Rutas                          | 36 rutas diseñadas                                                                                                                                                                                                                                                                                                       |
| Modelo Conceptual              | 17 modelos (AdminUser, AdminRole, AdminPermission, AuditLog, EditorialProduct, CatalogWorkflow, ProductMedia, ProducerProfile, B2BAccountAdminView, QuoteAdminView, CommercialCondition, MOQRuleAdminView, DocumentTemplate, SommelierPromptTemplate, SommelierReviewLog, IntegrationJob, IntegrationRun, SystemSetting) |
| UX                             | Principios, inspiración, patrón de UI, paleta                                                                                                                                                                                                                                                                            |
| Dashboard Ejecutivo            | 10 KPIs definidos                                                                                                                                                                                                                                                                                                        |
| Flujos Principales             | 12 flujos documentados paso a paso                                                                                                                                                                                                                                                                                       |
| Relación con Catálogo Premium  | Flujo de datos, principios, estados                                                                                                                                                                                                                                                                                      |
| Relación con Portal B2B        | Dependencias operativas                                                                                                                                                                                                                                                                                                  |
| Relación con Sommelier AI v2   | 6 áreas de control (prompts, perfiles, supervisión, bloqueo, testing, métricas)                                                                                                                                                                                                                                          |
| Relación con Rioja Marketplace | Integración futura con runbook                                                                                                                                                                                                                                                                                           |
| Seguridad                      | RBAC, mínimo privilegio, estados de publicación, gobernanza                                                                                                                                                                                                                                                              |
| Roadmap                        | 6 fases                                                                                                                                                                                                                                                                                                                  |

Key sections:

- **8 perfiles internos**: Super Admin, Admin Comercial, Gestor de Catálogo, Gestor B2B, Gestor de Contenido, Operador Soporte, AI/Sommelier Operator, Auditor
- **20 módulos**: desde Dashboard Ejecutivo hasta Roles y Permisos
- **36 rutas**: desde `/admin` hasta `/admin/roles`
- **17 modelos conceptuales**: todos documentados sin schema Prisma
- **12 flujos principales**: crear producto, revisar, aprobar, subir imágenes, crear cuenta B2B, revisar presupuesto, configurar MOQ, publicar documento, supervisar Sommelier, export a Marketplace, revisar audit log

### `apps/web/src/pages/admin/index.astro` (optional)

Placeholder page if created.

## Key Decisions

1. **Backoffice como centro operativo**: todas las operaciones del ecosistema (catálogo, B2B, Sommelier, integraciones) se gestionan desde aquí
2. **Workflow de publicación**: los productos pasan por draft → pending_review → published — nunca se eliminan, solo archivan
3. **RBAC granular**: 8 roles predefinidos con permisos por módulo y acción, configurables desde el panel
4. **Audit trail obligatorio**: toda acción queda registrada — quién, qué, cuándo, desde dónde
5. **Sin Prisma todavía**: 17 modelos conceptuales documentados pero sin migraciones
6. **Separación estricta lab/producción**: el backoffice opera siempre con datos mock
7. **Sommelier governance**: el backoffice permite editar prompts, supervisar respuestas y bloquear productos — control completo del asistente

## Risks / Pending

| Risk                                                                  | Mitigation                                                                               |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Complejidad de 20 módulos — riesgo de sobreingeniería                 | Roadmap prioriza módulos core (catálogo, B2B) primero; Sommelier e integraciones después |
| RBAC demasiado granular puede ser complejo de mantener                | Roles predefinidos cubren 90% de casos; roles personalizados son extensión               |
| Workflow de aprobación puede ralentizar operaciones                   | Configurable por tipo de producto; productos urgentes con flujo express                  |
| Integración con Rioja Marketplace requiere runbook detallado          | Fase específica con validación visual, sin DB compartida                                 |
| El placeholder /admin con KPIs mock puede crear expectativas irreales | Etiquetado claro "laboratorio", isMock flags                                             |

## Verification

- `pnpm format` — all files pass
- `pnpm --filter web typecheck` — passes
- `pnpm --filter web build` — passes
- `pnpm check` — passes

## Commit

```
docs: design backoffice v2 architecture
```

## Next Phase Recommended

STACK-2026-BACKOFFICE-V2-PLACEHOLDER-01
