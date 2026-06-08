# STACK-2026-B2B-V2-PLACEHOLDER-ENHANCEMENT-01 — Portal B2B v2 Placeholder Enhancement

## Objective
Elevate `/b2b` to match the visual quality of the new `/admin` page, transforming it into a professional-looking placeholder for the future Portal B2B v2.

## Changes
- **`apps/web/src/pages/b2b/index.astro`**: Complete redesign with 8 sections:
  1. **Hero** — badges (Laboratorio, Arquitectura completada, Implementación pendiente), title, subtitle, 2 mock CTA buttons
  2. **KPI strip** — 6 MetricCard components (Perfiles, Módulos, Rutas, Modelos, Integraciones, Estado) with mock values
  3. **Perfiles B2B** — 7 profile cards (Restaurante, Tienda, Distribuidor, Hotel, Empresa, Bodega, Admin) with icon, needs, priority color, status badge
  4. **Módulos profesionales** — 12 module cards (Dashboard to Contacto) with icon, description, status badge, relation tag
  5. **Flujos B2B** — 3 workflow timelines (Exploración, Sommelier profesional, Operativa recurrente) with primary-colored dot/line
  6. **Relación con ecosistema** — 4 integration cards (Catálogo, Sommelier, Backoffice, Rioja Marketplace) with active/future status
  7. **Roadmap B2B** — 5-point timeline (Arquitectura ✅ → Placeholder 🟡 → Dashboard real ⏳ → Integración Backoffice ⏳ → Integración RM ⏳)
  8. **Aviso laboratorio** — amber warning box confirming mock/simulation status

## Design Decisions
- Used existing UI components: `MetricCard`, `Card`, `Badge`, `Button`, `Section`, `Container`
- Color system: priority levels (Crítica=purple, Alta=indigo, Media=amber, Baja=zinc), status badges (definido=emerald, futuro=zinc), module states (architecture=indigo, planned=amber, future=zinc)
- Profile cards show status + priority to convey RBAC maturity
- Module cards include relation tag (e.g., "Catálogo + Admin") to clarify ecosystem position
- Workflow timelines use primary indigo color (vs colored per-flow in /admin) for visual distinction
- All data is mock with laboratorio badges — no real data, no API calls

## Validations
- `pnpm format` — ✅ all files pass
- `pnpm --filter web typecheck` — ✅ no errors
- `pnpm --filter web build` — ✅ 24 pages built, b2b/index.html included
- `pnpm check` — ✅ lint + typecheck + build all pass

## Limitations
- All UI is static mock — no login, no data, no API
- Buttons have no href — visual-only CTAs
- Roadmap shows only milestones, no implementation dates
- Integration cards describe conceptual relationships, not real connections

## Next Steps
- STACK-2026-ECOSYSTEM-VERCEL-SMOKE-01
