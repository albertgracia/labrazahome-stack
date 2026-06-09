# STACK-2026-BACKOFFICE-AI-ASSISTANT-MOCK-01

## Mock de AI Editorial Assistant en Backoffice Content Manager

### Contexto

Tras validar Qwen 3.5 9B como motor de generación batch (STACK-2026-LMSTUDIO-BACKOFFICE-BATCH-USE-CASE-01), esta fase implementa el panel mock de AI Editorial Assistant en `/admin/contenido`.

### Objetivo

- Reflejar el uso validado de Qwen 3.5 para generación editorial batch
- No conectar LM Studio real desde frontend
- Mostrar capacidades, estadísticas y resultados de generación
- Enfatizar revisión humana y naturaleza mock

### Archivos creados

| Archivo                                                               | Descripción                                                                                                               |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `apps/web/src/types/admin.ts`                                         | Tipos añadidos: `AdminAIBatchStats`, `AdminAICapability`, `AdminAIGeneratedSample`, `AdminAIReviewStep`, `AdminAIWarning` |
| `apps/web/src/data/admin/aiAssistantMock.ts`                          | Datos mock: stats, capacidades, muestras generadas, workflow, warnings                                                    |
| `apps/web/src/components/admin/content/AIEditorialAssistant.astro`    | Componente principal del panel AI Assistant                                                                               |
| `apps/web/src/components/admin/content/AIGeneratedSampleViewer.astro` | Visor de muestras con tabs para cambiar producto                                                                          |
| `docs/audits/STACK-2026-BACKOFFICE-AI-ASSISTANT-MOCK-01.md`           | Este informe                                                                                                              |

### Archivos modificados

| Archivo                                    | Cambio                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------ |
| `apps/web/src/pages/admin/contenido.astro` | Nueva sección "AI Editorial Assistant" con import y renderizado del componente |
| `docs/architecture/backoffice-v2.md`       | Fase 6 actualizada con AI Batch Assistant                                      |
| `docs/architecture/lmstudio-provider.md`   | Nota sobre razonamiento interno DeepSeek v4                                    |

### Panel AI Assistant — Secciones

1. **Cabecera**: Título, modelo, modo (Batch/Async), estado (Mock), badges (Revisión humana requerida, No activado en producción)
2. **Model info**: Tarjeta con modelo, modo, revisión humana, estado producción
3. **Batch stats**: 8 KPIs: productos, campos, JSON válido, timeouts, alucinaciones, calidad, B2B, SEO
4. **Capacidades**: 7 tarjetas (storytelling, notas sensoriales, maridajes, B2B, SEO, meta, tags)
5. **Resultados generados**: Visor con tabs para seleccionar producto (Reserva del Alto Ebro / Coupage de Sierra), muestra los 7 campos generados
6. **Workflow de revisión**: 4 pasos (Generación → Revisión → Aprobación → Publicación)
7. **Badges de revisión**: Needs Review, Approved Mock, Rejected Mock
8. **Warnings**: Panel con avisos informativos (mock, no tiempo real, no LM Studio desde Vercel)

### Contenido mock

- **Estadísticas batch**: 4 productos, 28 campos, 26/28 JSON válido, 2 timeouts, 0 alucinaciones, calidad 8.5
- **Muestras generadas**: Storytelling realista, notas sensoriales, maridajes, argumentario B2B, SEO title, meta description, tags editoriales para Reserva del Alto Ebro y Coupage de Sierra
- **Workflow**: 4 pasos con estado actual = "Revisión editorial"

### Validaciones

```
pnpm --filter web typecheck → PASS
pnpm --filter web build     → PASS (28 páginas)
pnpm format                 → PASS
```

### Smoke local

- `/admin/contenido` — ✅ Panel AI visible con todas las secciones
- `/admin` — ✅ Dashboard intacto
- `/sommelier` — ✅ Sin cambios
- `/b2b` — ✅ Sin cambios
- No hay llamadas LM Studio desde frontend
- Copy claro de que es mock
- Sin datos reales
- Sin promesas de producción

### Decisión

**RESULTADO: PASS**

| Criterio                            | Resultado                                             |
| ----------------------------------- | ----------------------------------------------------- |
| Panel integrado en /admin/contenido | ✅ Sí, nueva sección                                  |
| Tipos añadidos                      | ✅ 5 nuevas interfaces                                |
| Datos mock creados                  | ✅ aiAssistantMock.ts                                 |
| Componentes creados                 | ✅ 2 (AIEditorialAssistant + AIGeneratedSampleViewer) |
| Sin llamadas LM Studio              | ✅ Solo datos mock                                    |
| Sin modificar backend               | ✅ Solo frontend                                      |
| Revisión humana indicada            | ✅ Badges + workflow                                  |
| Avisos de mock visibles             | ✅ Panel de warnings                                  |
| Build exitoso                       | ✅ 28 páginas                                         |
| Sin MAJOR de diseño                 | ✅ Revisado contra impeccable design gate             |
| Roadmap actualizado                 | ✅ Fase 6 en backoffice-v2.md                         |

### HEAD inicial

`b4e604c`

### HEAD final

_(tras commit)_

### Siguiente fase recomendada

`STACK-2026-BACKOFFICE-AI-ASSISTANT-VERCEL-SMOKE-01`
