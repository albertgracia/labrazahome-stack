# STACK-2026-BACKOFFICE-V2-PLACEHOLDER-01 — Backoffice Admin v2 Placeholder

## Summary
Replaced the basic `/admin` list-based placeholder with a comprehensive visual dashboard matching the Stripe/Linear/Vercel style, based on the architecture defined in `docs/architecture/backoffice-v2.md`.

## Changes
- **`apps/web/src/pages/admin/index.astro`**: Complete redesign with 7 sections:
  1. **Hero** — badges (Laboratorio, Arquitectura completada, Implementación pendiente), title, subtitle
  2. **KPI strip** — 6 MetricCard components (Productos, B2B, Presupuestos, Revisiones, Publicaciones, Integraciones) with mock values and trend indicators
  3. **Módulos** — 10/20 module cards with icon, description, status badge (Arquitectura/Planificado/Futuro) using Card component
  4. **Flujos operativos** — 3 workflow timelines (Producto, B2B, Sommelier) with step numbers and dot/line indicators
  5. **Perfiles internos** — 8 RBAC profiles (Super Admin to Auditor) with access level badges
  6. **Integraciones** — 4 integration cards (Catálogo, Sommelier, B2B, Rioja Marketplace) with active/future status
  7. **Roadmap** — 4-point progress timeline (Arquitectura → Placeholder → Implementación → Producción)

## Design Decisions
- Used existing UI components: `MetricCard`, `Card`, `Badge`, `Section`, `Container`
- Color-coded workflow dots (indigo/emerald/amber) using lookup objects to avoid Tailwind JIT dynamic class issues
- Profile levels use semantic colors (purple/indigo/amber/zinc) matching access level hierarchy
- Module status badges use distinct color schemes (indigo=architecture, amber=planned, zinc=future)
- All data is mock with laboratorio badges — no real data, no API calls

## Validations
- `pnpm format` — ✅ all files pass
- `pnpm --filter web typecheck` — ✅ no errors
- `pnpm --filter web build` — ✅ 24 pages built, admin/index.html included
- `pnpm check` — ✅ lint + typecheck + build all pass
