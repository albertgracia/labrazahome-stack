# STACK-2026-B2B-DASHBOARD-MOCK-01

## Primer Dashboard Mock del Portal B2B v2

### Objetivo

Convertir `/b2b` de placeholder informativo avanzado a **primer dashboard mock profesional** con KPIs, selecciones, catálogo profesional, perfil selector, actividad reciente, Sommelier hints y documentos simulados.

### Archivos Creados

| Archivo | Descripción |
|---|---|
| `apps/web/src/data/b2b/mockDashboard.ts` | Datos mock: KPIs, perfiles, productos, selección, presupuesto, documentos, actividad |
| `apps/web/src/components/b2b/B2BDashboardHero.astro` | Hero con badges laboratorio |
| `apps/web/src/components/b2b/B2BKpiStrip.astro` | 6 KPIs mock (128 productos, 6 selecciones, 12 presupuestos, etc.) |
| `apps/web/src/components/b2b/B2BProfileSelector.astro` | 5 perfiles profesionales (Restaurante, Tienda, Distribuidor, Hotel, Empresa) |
| `apps/web/src/components/b2b/B2BProductCard.astro` | 6 productos del catálogo con MOQ mock y CTA |
| `apps/web/src/components/b2b/B2BSelectionTable.astro` | Tabla de selección actual (4 items) |
| `apps/web/src/components/b2b/B2BQuoteSummary.astro` | Resumen de solicitud de presupuesto |
| `apps/web/src/components/b2b/B2BActivityFeed.astro` | Feed de actividad reciente (4 eventos) |
| `apps/web/src/components/b2b/B2BSommelierHints.astro` | 3 recomendaciones profesionales Sommelier |
| `apps/web/src/components/b2b/B2BDocumentCards.astro` | 4 documentos mock (ficha técnica, PDF futuro, argumentario, maridajes) |

### Archivos Modificados

| Archivo | Cambio |
|---|---|
| `apps/web/src/pages/b2b/index.astro` | Reescrito: de placeholder informativo a dashboard 3 columnas |

### Secciones del Dashboard

1. **Hero** — Título, subtítulo, badges (Mock dashboard, Sin datos reales, Lab mode)
2. **KPI Strip** — 6 métricas mock en grid responsivo
3. **Perfil profesional** — 5 perfiles con icono, descripción, uso típico
4. **Layout dashboard** (3 columnas):
   - **Izquierda (2/3):** Resumen cuenta mock, Actividad reciente, Catálogo profesional
   - **Derecha (1/3):** Selección actual, Solicitud presupuesto, Sommelier B2B, Documentos
5. **Aviso laboratorio** — Sin precios, stock ni condiciones reales

### KPIs Mock

| KPI | Valor | Descripción |
|---|---|---|
| Productos profesionales | 128 | Catálogo completo con capa B2B |
| Selecciones activas | 6 | Listas guardadas por clientes mock |
| Presupuestos simulados | 12 | Solicitudes de presupuesto de prueba |
| Recompras previstas | 4 | Pedidos recurrentes planificados |
| Fichas descargables | 38 | Documentos técnicos disponibles |
| Sommelier B2B | Activo Mock | Recomendaciones profesionales simuladas |

### Datos Mock

- `professionalProfiles`: 5 perfiles (Restaurante, Tienda, Distribuidor, Hotel, Empresa)
- `recommendedProducts`: 6 productos con MOQ y uso profesional
- `currentSelection`: 4 items (Reserva del Alto Ebro, Coupage de Sierra, Miel Romero, Pack Mesa)
- `quoteSummary`: 4 productos, 52 unidades, condiciones pendientes
- `documents`: 4 docs (ficha técnica, catálogo PDF futuro, argumentario, maridajes)
- `recentActivity`: 4 eventos de actividad
- `sommelierHints`: 3 recomendaciones (carta restaurante, tienda gourmet, regalo corporativo)

### Validaciones

```
pnpm --filter web typecheck  → PASS
pnpm --filter web build      → PASS
pnpm check                   → PASS (format, typecheck, build)
```

### Limitaciones

- Sin autenticación real
- Sin persistencia (sin login, sin base de datos)
- Sin precios, stock ni condiciones reales
- CTAs mock sin funcionalidad real
- Datos completamente simulados

### Próximos Pasos Recomendados

`STACK-2026-B2B-QUOTE-FLOW-MOCK-01` — Flujo de solicitud de presupuesto con selección persistente local.