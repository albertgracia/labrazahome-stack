# Informe de Auditoría — STACK-2026-SOMMELIER-CHAT-INTERNAL-SCROLL-FIX-01

**Fecha:** 2026-06-08
**Objetivo:** Corregir el scroll del chat Sommelier AI v2 para que la conversación scrollee dentro del panel y no desplace toda la página.

---

## Problema Detectado

Al enviar varias preguntas, el contenido de la conversación crecía sin límite y provocaba scroll en toda la página. Hero, quick prompts y footer se desplazaban fuera de vista.

## Causa Raíz

1. El contenedor principal del chat (`SommelierChat.tsx`) usaba `min-h-[520px] md:min-h-[640px]` sin altura fija (`h-*`), permitiendo que creciera con el contenido.
2. El scroll se realizaba mediante `messagesEndRef.current.scrollIntoView()`, que puede desplazar el documento completo en lugar del contenedor interno.
3. No había `shrink-0` en header ni form, permitiendo que se comprimieran.
4. El contenedor de mensajes carecía de `overscroll-contain`.
5. No se usaba ref al contenedor de mensajes para scroll controlado.

## Solución Técnica

| Archivo | Cambio |
|---------|--------|
| `SommelierChat.tsx` | Contenedor principal: `flex h-[min(640px,calc(100vh-220px))] min-h-[480px] overflow-hidden` |
| `SommelierChat.tsx` | Header: `shrink-0` añadido |
| `SommelierChat.tsx` | Contenedor mensajes: ref `messagesContainerRef`, `overflow-y-auto overscroll-contain` |
| `SommelierChat.tsx` | Scroll: reemplazado `scrollIntoView` por `el.scrollTop = el.scrollHeight` |
| `SommelierChat.tsx` | Form: `shrink-0` añadido |
| `SommelierChat.tsx` | Eliminado `messagesEndRef` (ya no necesario) |

## Validaciones

| Comando | Resultado |
|---------|-----------|
| `pnpm format` | ✅ PASS |
| `pnpm --filter web typecheck` | ✅ PASS |
| `pnpm --filter web build` | ✅ PASS (22 páginas) |

## Smoke Local

- Enviar 10 mensajes: el chat scrollea internamente sin mover la página
- Hero y quick prompts permanecen visibles/estables
- Footer de página no aparece por crecimiento del chat
- Input siempre visible al fondo del panel
- Cards de recomendación visibles dentro del scroll interno
- Selector de perfil fuera del área scrolleable
- Funciona en viewports: 320px, 768px, 1440px

## Resultado

**PASS** — El scroll está contenido dentro del panel del chat.
