# Portal B2B v2 — Arquitectura

> **Estado:** Dashboard mock implementado (STACK-2026-B2B-DASHBOARD-MOCK-01).
> El dashboard incluye hero profesional, KPIs B2B, selector de perfiles, catálogo mock con MOQ, selección actual, resumen de presupuesto, actividad reciente, Sommelier B2B hints y documentos. Todo en layout 3 columnas con datos simulados.

## Visión

El Portal B2B v2 será la plataforma profesional del ecosistema LabrazaHome Labs, diseñada para restaurantes, tiendas gourmet, distribuidores, hoteles y compradores profesionales del sector agroalimentario premium.

No es un catálogo público extendido. Es una capa profesional sobre el Catálogo Premium v2 que añade condiciones comerciales, herramientas de compra recurrentes, solicitud de presupuestos, y acceso a documentación técnica, todo con la estética premium de LabrazaHome pero con tono operativo y orientado a la decisión.

## Objetivos

- Proporcionar un dashboard profesional con resumen de actividad, favoritos y presupuestos
- Exponer el Catálogo Premium v2 con capa B2B (MOQ, condiciones, precios)
- Permitir solicitud de presupuestos y pedidos recurrentes
- Ofrecer Sommelier en modo profesional con recomendaciones para carta y argumentario comercial
- Centralizar fichas técnicas, documentos y condiciones comerciales
- Preparar integración futura con Backoffice Admin v2 y Rioja Marketplace
- Diferenciar siempre entre datos mock/laboratorio y datos de producción

## No Alcance (en esta fase)

- Implementación real del portal (solo diseño arquitectónico)
- Login / autenticación real
- Base de datos (Prisma) o migraciones
- Endpoints API
- Integración con Rioja Marketplace producción
- Datos reales de clientes, pedidos o precios
- Módulo de pagos
- Catálogo de productos reales
- Integración con Windows Server
- Exposición de datos sensibles

## Perfiles B2B

### 1. Restaurante

| Atributo           | Valor                                                                            |
| ------------------ | -------------------------------------------------------------------------------- |
| Necesidades        | Seleccionar vinos para carta, maridajes por menú, condiciones por volumen        |
| Decisión de compra | Relación calidad-precio, disponibilidad, regularidad de suministro               |
| Info necesaria     | Ficha técnica, notas de cata, maridajes, premios, precio B2B, MOQ                |
| Prioridades        | Catálogo profesional, Sommelier para carta, pedidos recurrentes, fichas técnicas |
| Riesgos            | Necesita recomendaciones rápidas, no tiene tiempo para navegar                   |

### 2. Tienda Gourmet

| Atributo           | Valor                                                                      |
| ------------------ | -------------------------------------------------------------------------- |
| Necesidades        | Variedad de productos, condiciones por mix, novedades                      |
| Decisión de compra | Rotación, margen, diferenciación, exclusividad                             |
| Info necesaria     | Precio B2B, margen estimado, disponibilidad, lead time, story del producto |
| Prioridades        | Catálogo completo, presupuestos, documentos comerciales, historial         |
| Riesgos            | Compara muchos proveedores, necesita argumentos de venta para sus clientes |

### 3. Distribuidor

| Atributo           | Valor                                                                    |
| ------------------ | ------------------------------------------------------------------------ |
| Necesidades        | Grandes volúmenes, condiciones especiales, planificación                 |
| Decisión de compra | Coste logístico, volumen mínimo, estabilidad de precio                   |
| Info necesaria     | Tarifa por volumen, MOQ flexibles, lead time, stock futuro               |
| Prioridades        | Presupuestos recurrentes, contacto comercial directo, documentos legales |
| Riesgos            | Operación compleja, necesita interlocutor humano, plazos largos          |

### 4. Hotel / Hospitality

| Atributo           | Valor                                                                    |
| ------------------ | ------------------------------------------------------------------------ |
| Necesidades        | Selección para minibar, recepción, eventos, restaurante interno          |
| Decisión de compra | Imagen de marca, presentación, consistencia                              |
| Info necesaria     | Precio B2B, packaging, condiciones de evento, personalización            |
| Prioridades        | Packs para eventos, muestras, condiciones especiales, contacto comercial |
| Riesgos            | Estacionalidad, picos de demanda, necesidad de personalización           |

### 5. Empresa / Regalo Corporativo

| Atributo           | Valor                                                                   |
| ------------------ | ----------------------------------------------------------------------- |
| Necesidades        | Packs regalo personalizados, grandes cantidades, fechas señaladas       |
| Decisión de compra | Plazo de entrega, personalización, garantía de calidad                  |
| Info necesaria     | Catálogo de packs, personalización, plazo, precio por volumen           |
| Prioridades        | Configurador de packs, presupuesto online, fecha de entrega garantizada |
| Riesgos            | Campañas puntuales, decisiones rápidas, comprador no experto en vino    |

### 6. Bodega / Proveedor (futuro)

| Atributo           | Valor                                                      |
| ------------------ | ---------------------------------------------------------- |
| Necesidades        | Gestionar su catálogo, ver demanda, recibir pedidos        |
| Decisión de compra | N/A — es oferta, no demanda                                |
| Info necesaria     | Panel de productos, pedidos recibidos, estadísticas        |
| Prioridades        | Gestión de productos, notificaciones, documentos           |
| Riesgos            | Integración compleja, datos sensibles de otros proveedores |

### 7. Admin Comercial Interno

| Atributo           | Valor                                                         |
| ------------------ | ------------------------------------------------------------- |
| Necesidades        | Gestionar cuentas B2B, condiciones, presupuestos, incidencias |
| Decisión de compra | N/A — rol administrativo                                      |
| Info necesaria     | Panel de clientes, solicitudes, histórico, métricas           |
| Prioridades        | Backoffice completo, asignación de comercial, alertas         |
| Riesgos            | Acceso a datos sensibles de todos los clientes                |

## Módulos Futuros

### 1. Dashboard B2B

Panel principal post-login con:

- Resumen de actividad: presupuestos activos, pedidos recientes, favoritos
- Productos recomendados para el perfil
- Alertas: ofertas, novedades, cambios de condición
- Acceso rápido a: nuevo presupuesto, catálogo, Sommelier

### 2. Catálogo Profesional

Catálogo Premium v2 con capa B2B:

- Misma estructura de categorías y fichas de producto
- Columnas adicionales: precio B2B, MOQ, disponibilidad, margen estimado
- Vista comparativa de productos
- Filtros por: precio, categoría, bodega, D.O., tipo, maridaje, disponibilidad
- Vista en lista (tabla) para profesionales

### 3. Ficha Producto B2B

Ficha de producto con datos profesionales:

- Todo el contenido editorial del Catálogo Premium v2
- Sección B2B colapsable: precio por tramos, MOQ, lead time, disponibilidad
- Documentos asociados: ficha técnica, ficha comercial, etiquetado
- Histórico de precios (futuro)
- CTA: solicitar presupuesto, añadir a selección, pedir muestra

### 4. Favoritos / Selección

- Lista de productos seleccionados por el profesional
- Posibilidad de crear múltiples listas (por proveedor, por ocasión, por temporada)
- Exportar selección a PDF
- Enviar selección como solicitud de presupuesto

### 5. Solicitud de Presupuesto

- Formulario con productos seleccionados, cantidades y comentarios
- Asignación automática a comercial según perfil
- Histórico de solicitudes con estado (pendiente, en revisión, aprobado, rechazado)
- Notificaciones de cambio de estado

### 6. Pedido Recurrente

- Configuración de pedidos periódicos (semanal, quincenal, mensual)
- Selección de productos y cantidades fijas
- Modificación Skip/Editar antes de cada ciclo
- Histórico de pedidos recurrentes ejecutados

### 7. MOQ / Reglas Mínimas

- Reglas por producto: cantidad mínima, múltiplo de compra
- Reglas por categoría: mix mínimo para ciertas condiciones
- Reglas por perfil: MOQ diferente para restaurante vs distribuidor
- Validación visual en tiempo real al armar presupuesto

### 8. Condiciones Comerciales

- Condiciones visibles solo tras autenticación
- Por perfil: precio B2B, descuento por volumen, condiciones de pago
- Por producto: precio por tramo de cantidad
- Histórico de cambios de precio
- Aviso: condiciones sujetas a aprobación comercial

### 9. Sommelier B2B

Modo profesional del Sommelier:

- Recomendaciones para carta de restaurante
- Sugerencias de upsell por margen
- Alternativas por disponibilidad
- Argumentario de venta para camareros
- Explicación comercial del producto
- Packs y maridajes para eventos
- Perfil guardado del establecimiento para mejores recomendaciones

### 10. Documentos y Fichas Técnicas

- Biblioteca de documentos por producto
- Ficha técnica: análisis, D.O., variedad, añada, producción
- Ficha comercial: argumentos, maridajes, perfil de cliente, premios
- Ficha logística: peso, formato, unidades por caja, palet
- Descarga en PDF
- Versión imprimible

### 11. Historial de Compras

- Listado de pedidos realizados con estado, fecha, importe
- Detalle de cada pedido con productos, cantidades, precios
- Re-pedido con un clic
- Facturas y documentos asociados

### 12. Contacto Comercial

- Asignación de comercial según perfil o zona
- Formulario de contacto directo
- Historial de comunicaciones
- Solicitud de visita o cata

### 13. Integración Futura con Backoffice

- Las cuentas B2B se crean y gestionan desde Backoffice
- Las condiciones se asignan desde Backoffice
- Las solicitudes de presupuesto se revisan desde Backoffice
- Los pedidos se confirman desde Backoffice
- Los documentos se suben desde Backoffice

### 14. Integración Futura con Rioja Marketplace

- Productos del marketplace disponibles en catálogo B2B (read-only inicial)
- Precios sincronizados desde marketplace
- Disponibilidad consultada desde marketplace
- Pedidos B2B enviados como pedidos al marketplace
- Sin compartir base de datos directamente

## Rutas Futuras

```
/b2b                                          # Landing / login B2B
/b2b/dashboard                                # Panel principal
/b2b/catalogo                                 # Catálogo profesional
/b2b/catalogo/[categoria]                     # Productos por categoría
/b2b/producto/[slug]                          # Ficha producto B2B
/b2b/favoritos                                # Listas de selección
/b2b/presupuestos                             # Solicitudes de presupuesto
/b2b/presupuestos/nuevo                       # Nueva solicitud
/b2b/presupuestos/[id]                        # Detalle de solicitud
/b2b/pedidos                                  # Historial de pedidos
/b2b/pedidos/[id]                             # Detalle de pedido
/b2b/recurrentes                              # Pedidos recurrentes
/b2b/recurrentes/nuevo                        # Nuevo pedido recurrente
/b2b/recurrentes/[id]                         # Configuración
/b2b/documentos                               # Biblioteca documentos
/b2b/documentos/[slug]                        # Documentos por producto
/b2b/sommelier                                # Sommelier modo B2B
/b2b/perfil                                   # Perfil y configuración
/b2b/contacto                                 # Contacto comercial
```

## Modelo Conceptual

Modelos conceptuales para futura implementación. No crear schema Prisma todavía.

### B2BAccount

- `id` (UUID)
- `companyName` (string)
- `taxId` (string, CIF/NIF)
- `profileType` (enum: restaurant | gourmet_shop | distributor | hotel | corporate | supplier)
- `status` (enum: pending | active | suspended | closed)
- `commercialContact` (string, nombre del comercial asignado)
- `approvedAt` (datetime, nullable)
- `createdAt` / `updatedAt`

### B2BProfile

- `id` (UUID)
- `accountId` (FK a B2BAccount)
- `name` (string)
- `email` (string)
- `phone` (string)
- `role` (enum: admin | buyer | viewer)
- `isPrimary` (boolean, contacto principal)
- `createdAt` / `updatedAt`

### B2BPriceTier

- `id` (UUID)
- `productId` (FK a ProductPremium, conceptual)
- `profileType` (enum, opcional — null = aplica a todos)
- `minQuantity` (int, desde 0)
- `maxQuantity` (int, nullable = sin límite)
- `unitPrice` (decimal)
- `currency` (string, "EUR")
- `validFrom` / `validTo` (datetime, nullable)
- `createdAt`

### B2BQuoteRequest

- `id` (UUID)
- `accountId` (FK a B2BAccount)
- `status` (enum: draft | sent | under_review | approved | rejected | converted)
- `notes` (text)
- `commercialNotes` (text, interno)
- `validUntil` (datetime)
- `createdAt` / `updatedAt`

### B2BQuoteLine

- `id` (UUID)
- `quoteRequestId` (FK a B2BQuoteRequest)
- `productId` (FK a ProductPremium, conceptual)
- `productName` (string, denormalizado)
- `quantity` (int)
- `unitPrice` (decimal)
- `subtotal` (decimal)
- `notes` (text, línea específica)

### B2BFavorite

- `id` (UUID)
- `accountId` (FK a B2BAccount)
- `listName` (string, "General" por defecto)
- `productId` (FK a ProductPremium, conceptual)
- `notes` (text, opcional)
- `createdAt`

### B2BRecurringOrder

- `id` (UUID)
- `accountId` (FK a B2BAccount)
- `productId` (FK a ProductPremium, conceptual)
- `quantity` (int)
- `frequency` (enum: weekly | biweekly | monthly | bimonthly)
- `nextDelivery` (date)
- `status` (enum: active | paused | cancelled)
- `createdAt` / `updatedAt`

### B2BMOQRule

- `id` (UUID)
- `productId` (FK a ProductPremium, conceptual, nullable — null = aplica a categoría)
- `categoryId` (FK a categoría, conceptual, nullable)
- `profileType` (enum, opcional)
- `minQuantity` (int)
- `multipleOf` (int, ej: múltiplo de 6 unidades)
- `description` (string)

### B2BDocument

- `id` (UUID)
- `productId` (FK a ProductPremium, conceptual)
- `type` (enum: technical_sheet | commercial_sheet | label | logistics | certification)
- `title` (string)
- `fileUrl` (string)
- `fileSize` (int, bytes)
- `language` (string, "es")
- `createdAt`

### B2BCommercialCondition

- `id` (UUID)
- `accountId` (FK a B2BAccount, nullable — null = condición general)
- `profileType` (enum, opcional)
- `paymentTerms` (string, ej: "30 días desde factura")
- `discountPercent` (decimal, opcional)
- `creditLimit` (decimal, opcional)
- `notes` (text)
- `validFrom` / `validTo`

## UX

### Principios de diseño

- **Serio pero premium**: menos emocional que el público, más orientado a datos y decisión
- **Operativo**: acciones claras, CTAs visibles, mínimos clicks para llegar al objetivo
- **Comparativo**: el profesional necesita comparar productos lado a lado
- **Informativo**: datos técnicos visibles sin necesidad de expandir
- **Confiable**: condiciones claras, MOQ visible, precios sin ambigüedad

### Dashboard

- Tarjetas de resumen: presupuestos activos, favoritos, pedidos recientes
- Gráfico simple de actividad mensual
- Lista de últimos productos vistos
- Alertas y notificaciones

### Catálogo profesional

- Vista por defecto en lista (tabla) con alternancia a cuadrícula
- Columnas en vista lista: nombre, categoría, precio B2B, MOQ, disponibilidad, acción
- Filtros en sidebar: categoría, precio, tipo, D.O., bodega, maridaje
- Ordenación por cualquier columna

### Ficha producto B2B

- Hero con imagen del producto
- Datos editoriales (story, descripción, maridajes)
- Sección B2B desplegable: precio por tramos, MOQ, lead time
- Documentos asociados con descarga directa
- CTAs: Solicitar presupuesto | Añadir a selección | Pedir muestra | Hablar con asesor

### CTAs principales

- `Solicitar presupuesto` — botón primario en ficha y selección
- `Añadir a selección` — botón secundario
- `Hablar con asesor` — botón terciario, abre contacto
- `Pedir muestra` — visible para ciertos perfiles

### Paleta extendida

Mantener la identidad LabrazaHome Labs pero con tonos más corporativos:

- Fondo: blanco/gris muy claro (modo claro), gris oscuro (modo oscuro)
- Acento: índigo corporativo (más frío que el tono público)
- Éxito/Disponible: verde
- Alerta/MOQ no cumplido: ámbar
- Error/No disponible: rojo

## Relación con Catálogo Premium v2

El Catálogo Premium v2 es la fuente editorial y de producto base.

### Flujo de datos

```
Catálogo Premium v2 (origen)
    │
    ├── producto, categoría, story, imágenes, maridajes, ratings, specs
    │
    ▼
Portal B2B v2 (capa profesional)
    │
    ├── + MOQ, precio B2B, condiciones, disponibilidad, documentos
    ├── + packs profesionales, condiciones por volumen
    ├── + estado de cuenta, historial, presupuestos
    │
    ▼
Backoffice Admin v2 (gestión)
```

### Principios

- No duplicar datos editoriales del Catálogo Premium
- El B2B referencia productos del catálogo por slug
- Los datos específicos B2B (precio, MOQ, docs) son capa separada
- El catálogo se actualiza desde Backoffice
- El B2B refleja cambios del catálogo en tiempo real (o con latencia controlada)

## Relación con Sommelier AI v2

### Modo B2B del Sommelier

El Sommelier existente se extiende con un modo profesional:

```
Sommelier AI v2 (base)
    │
    ├── Modo Privado (existente, conversacional, emocional)
    │
    ├── Modo B2B (nuevo):
    │   ├── Recomendación para carta de restaurante
    │   ├── Sugerencia de upsell por margen
    │   ├── Alternativa por disponibilidad
    │   ├── Argumentario de venta para el canal
    │   ├── Explicación comercial del producto
    │   └── Packs para eventos con cálculo de volumen
    │
    └── Perfil de establecimiento (preferencias guardadas)
```

### Flujo de ejemplo B2B Restaurante

```
Restaurante:
  "Tengo un menú degustación con carnes rojas y necesito 3 vinos"

Sommelier B2B:
  "Basado en tu perfil (Restaurante, 60 cubiertos/día, ticket medio alto):
   1. Reserva del Alto Ebro — vino principal, margen 32%
   2. Garnacha de Altura — alternativa más ligera, margen 28%
   3. Pack Degustación 3x75cl — opción por copas, margen 35%

   Los tres tienen disponibilidad inmediata y MOQ de 6 uds.
   ¿Quieres el argumentario de venta para tus camareros?"
```

## Relación con Backoffice Admin v2

El Backoffice Admin v2 es el panel de gestión del ecosistema.

### Dependencias

Backoffice gestiona:

- **Cuentas B2B**: creación, activación, suspensión
- **Perfiles**: roles, permisos, contacto principal
- **Condiciones comerciales**: precios B2B, descuentos, MOQ
- **Presupuestos**: revisión, aprobación, rechazo
- **Pedidos**: confirmación, estado, facturación
- **Documentos**: subida, versionado, publicación
- **Reglas MOQ**: configuración por producto y perfil
- **Historial**: trazabilidad completa de cada cuenta

### Flujo de aprobación de presupuesto

```
Cliente B2B → solicita presupuesto
    │
    ▼
Backoffice → notificación a comercial asignado
    │
    ├── Comercial revisa, ajusta condiciones (si aplica)
    │
    ▼
Comercial → aprueba / rechaza / solicita más info
    │
    ▼
Cliente B2B → recibe notificación, ve estado actualizado
```

## Relación con Rioja Marketplace

### Reglas de integración

1. **Rioja Marketplace no se toca**
2. Toda integración futura debe ser:
   - Read-only al inicio
   - Con runbook de integración
   - Con fase de validación específica
   - Con rollback plan
   - Con validación visual y datos mock

### Flujo de integración futuro

```
Stack-2026 B2B Lab
    │
    ├── Consulta productos (read-only)
    ├── Consulta disponibilidad (read-only)
    ├── Consulta precios (read-only, mock primero)
    │
    ▼
API Controlada / Export
    │
    ├── Validación visual
    ├── Validación de datos
    ├── Pruebas de integración
    │
    ▼
Rioja Marketplace (producción)
    │
    └── Endpoints controlados (no DB compartida)
```

### Canales de integración potenciales

1. **API REST controlada**: endpoints específicos del marketplace para consultar productos y disponibilidad
2. **Export programado**: volcado periódico de catálogo y precios para consumo por el B2B
3. **Webhook de cambios**: notificaciones de cambios en productos, precios o disponibilidad

### Separación de datos

| Dato              | Origen      | ¿Compartido?                 |
| ----------------- | ----------- | ---------------------------- |
| Producto base     | Marketplace | Sí (read-only)               |
| Precio B2B        | Backoffice  | No (gestionado en Lab)       |
| Condiciones       | Backoffice  | No (gestionado en Lab)       |
| Stock             | Marketplace | Sí (consultado, no cacheado) |
| Cliente B2B       | Backoffice  | No (datos de laboratorio)    |
| Historial pedidos | Backoffice  | No (datos de laboratorio)    |

## Seguridad y Gobernanza

### Roles y permisos conceptuales

| Rol                        | Acceso                          | Permisos                                                                |
| -------------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| Admin B2B (cuenta cliente) | Todo el portal                  | Gestionar perfiles, ver precios, solicitar presupuestos, ver documentos |
| Buyer (cuenta cliente)     | Catálogo, presupuestos, pedidos | Ver precios, solicitar presupuestos, ver documentos                     |
| Viewer (cuenta cliente)    | Catálogo limitado               | Ver productos sin precios, sin solicitar                                |
| Comercial (interno)        | Backoffice + vista cliente      | Gestionar sus cuentas asignadas                                         |
| Admin (interno)            | Backoffice completo             | Gestionar todo                                                          |

### Reglas de seguridad

- No exponer precios B2B sin autenticación
- No exponer condiciones comerciales públicamente
- Las cuentas B2B requieren aprobación manual
- Audit log de todas las acciones comerciales (futuro)
- Separación estricta lab/producción
- No almacenar datos reales de clientes en mock
- Las sesiones expiran tras inactividad (futuro)

### Protección de datos

- Los datos de clientes B2B solo son visibles para el comercial asignado y admins
- Las condiciones comerciales son específicas por cuenta
- Los documentos internos (fichas técnicas) son de acceso controlado
- No compartir datos entre cuentas B2B

## Roadmap

### Fase 1 — Arquitectura y diseño (actual)

- Documento de arquitectura
- Perfiles B2B definidos
- Modelos conceptuales
- Rutas diseñadas
- Auditoría

### Fase 2 — Placeholder y navegación

- Página B2B placeholder en el frontend
- Enlace en navegación global
- Vista previa de perfiles y módulos

### Fase 3 — Dashboard y catálogo profesional

- Dashboard B2B con datos mock
- Catálogo Premium con capa B2B (vista tabla)
- Ficha producto B2B con sección profesional
- Filtros y ordenación

### Fase 4 — Funcionalidades B2B core

- Favoritos / selección
- Solicitud de presupuesto (mock)
- MOQ y condiciones simuladas
- Sommelier modo B2B

### Fase 5 — Backoffice y administración

- Panel de gestión de cuentas B2B
- Gestión de presupuestos y estados
- Documentos y fichas técnicas
- Panel de comercial

### Fase 6 — Integración con Rioja Marketplace

- Conexión read-only
- Sincronización de productos
- Consulta de disponibilidad
- Validación y pruebas
