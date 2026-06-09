# STACK-2026-BACKOFFICE-SOMMELIER-GOVERNANCE-MOCK-01

## Objetivo

Crear panel de supervisión y governance mock del Sommelier AI en `/admin/sommelier`.

## Implementación

### Archivos creados

| Archivo                                                         | Tipo               | Propósito                                                                                                                                                     |
| --------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/types/admin.ts`                                            | Types (+33 líneas) | 7 interfaces Sommelier: SommelierKpi, PromptTemplate, SommelierInteraction, ProviderStatusItem, WarningDistributionItem, BlockedProductItem, GuardrailsConfig |
| `src/data/admin/sommelierGovernance.ts`                         | Data (134 líneas)  | 6 KPIs, 4 prompt templates, 7 interacciones, 3 proveedores, 2 warnings, 2 productos bloqueados, 6 guardrails                                                  |
| `src/components/admin/sommelier/SommelierHero.astro`            | Componente         | Hero banner con badges                                                                                                                                        |
| `src/components/admin/sommelier/SommelierKpiStrip.astro`        | Componente         | Grid de 6 KPIs                                                                                                                                                |
| `src/components/admin/sommelier/SommelierPromptTemplates.astro` | Componente         | 4 templates con key, nombre, versión, estado, contenido, acciones (editar/duplicar/archivar)                                                                  |
| `src/components/admin/sommelier/SommelierInteractions.astro`    | Componente         | Timeline de 7 consultas con perfil, confianza, valoración                                                                                                     |
| `src/components/admin/sommelier/SommelierProviderStatus.astro`  | Componente         | 3 proveedores con badge de estado                                                                                                                             |
| `src/components/admin/sommelier/SommelierWarnings.astro`        | Componente         | Distribución de warnings con barras de progreso                                                                                                               |
| `src/components/admin/sommelier/SommelierBlockedProducts.astro` | Componente         | 2 productos bloqueados con razón                                                                                                                              |
| `src/components/admin/sommelier/SommelierGuardrails.astro`      | Componente         | 6 configuraciones en grid 2 columnas                                                                                                                          |
| `src/components/admin/sommelier/SommelierQuickActions.astro`    | Componente         | 5 botones de acción rápida                                                                                                                                    |
| `src/components/admin/sommelier/SommelierLabNotice.astro`       | Componente         | Aviso de modo laboratorio                                                                                                                                     |
| `src/pages/admin/sommelier.astro`                               | Página             | Layout completo 3/2/1 columnas                                                                                                                                |

### Archivos modificados

| Archivo                              | Cambio                                                                               |
| ------------------------------------ | ------------------------------------------------------------------------------------ |
| `src/types/admin.ts`                 | Añadidas 7 interfaces Sommelier Governance                                           |
| `src/pages/admin/index.astro`        | Añadido enlace "🍷 Sommelier Governance" en herramientas                             |
| `src/data/admin/adminDashboard.ts`   | Roadmap: "Sommelier Governance Mock" → status active                                 |
| `docs/architecture/backoffice-v2.md` | Fase 5 actualizada a "Sommelier Governance Mock (completada)", Fases 6-8 renumeradas |

## Resultados

| Verificación        | Estado                                       |
| ------------------- | -------------------------------------------- |
| `npm run typecheck` | PASS                                         |
| `npm run format`    | PASS                                         |
| `npm run lint`      | PASS                                         |
| `npm run build`     | PASS (28 páginas, nueva: `/admin/sommelier`) |

## Detalles técnicos

- **Layout**: 3 secciones con grid 2/1 + 2/1 en LG, single column en móvil
- **Interactividad**: 0 React components — todo Astro estático (consistente con dashboard principal)
- **Mock data autocontenida**: No depende de otras fuentes de datos
- **Consistencia**: Sigue patrón de AdminDashboardHero, ContentManagerHero, AdminKpiStrip, AdminAlerts, AdminRecentActivity
- **Roadmap alineado**: Fase 5 renumerada en architecture doc

## Riesgos

- Ninguno. Es una página mock que no afecta al resto del ecosistema.
