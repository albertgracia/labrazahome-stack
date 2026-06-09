# Backoffice Admin v2 — Arquitectura

## Visión

El Backoffice Admin v2 será el panel de gestión interna del ecosistema LabrazaHome Labs. El centro operativo desde el que se administrará el Catálogo Premium v2, el Portal B2B v2, el Sommelier AI v2 y las futuras integraciones con Rioja Marketplace.

No es un CRUD genérico. Es una herramienta interna profesional para administradores, comerciales, gestores de catálogo, operadores B2B y responsables de contenido que necesitan eficiencia, trazabilidad y control sobre todos los productos del laboratorio.

## Objetivos

- Proporcionar un dashboard ejecutivo con KPIs del ecosistema completo
- Gestionar productos del Catálogo Premium: creación, edición, revisión, publicación
- Gestionar cuentas B2B, condiciones comerciales, presupuestos y reglas MOQ
- Supervisar y configurar el Sommelier AI v2 (prompts, respuestas, tono)
- Administrar documentación comercial y fichas técnicas
- Controlar integraciones con sistemas externos (Rioja Marketplace)
- Mantener audit logs completos de todas las operaciones
- Gestionar roles, permisos y configuración del sistema
- Diferenciar siempre entre datos mock/laboratorio y datos de producción

## No Alcance (en esta fase)

- Implementación real del backoffice (solo diseño arquitectónico)
- Login / autenticación real
- Base de datos (Prisma) o migraciones
- Endpoints API
- Integración con Rioja Marketplace producción
- Datos reales de clientes, pedidos o precios
- Módulo de facturación
- Editor de contenido WYSIWYG real (solo mock)
- Dashboard con datos reales
- Notificaciones en tiempo real

## Perfiles Internos

### 1. Super Admin

| Atributo            | Valor                                                                       |
| ------------------- | --------------------------------------------------------------------------- |
| Responsabilidades   | Administrar el sistema completo, roles, configuración global, integraciones |
| Permisos            | Todos los módulos, todas las acciones                                       |
| Módulos visibles    | Todos                                                                       |
| Acciones permitidas | Crear/edit/delete en todos los módulos, gestionar admins, exportar datos    |
| Riesgos             | Acceso total — requiere 2FA futuro, audit trail obligatorio                 |

### 2. Admin Comercial

| Atributo            | Valor                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------- |
| Responsabilidades   | Gestionar cuentas B2B, condiciones, presupuestos, relación con distribuidores         |
| Permisos            | Módulos B2B + Dashboard + Analytics + Documentos                                      |
| Módulos visibles    | Dashboard, Cuentas B2B, Presupuestos, Condiciones, MOQ, Documentos, Analytics         |
| Acciones permitidas | Crear/edit cuentas, revisar presupuestos, asignar condiciones, ver audit de sus áreas |
| Riesgos             | Acceso a condiciones comerciales sensibles — requiere confidencialidad                |

### 3. Gestor de Catálogo

| Atributo            | Valor                                                                      |
| ------------------- | -------------------------------------------------------------------------- |
| Responsabilidades   | Mantener productos, categorías, fichas técnicas, precios públicos          |
| Permisos            | Catálogo completo + Media + Productores                                    |
| Módulos visibles    | Dashboard, Productos, Categorías, Productores, Fichas Técnicas, Media, SEO |
| Acciones permitidas | Crear/edit/delete productos, gestionar media, SEO, relaciones              |
| Riesgos             | Publicar información incorrecta — requiere workflow de revisión            |

### 4. Gestor B2B

| Atributo            | Valor                                                                    |
| ------------------- | ------------------------------------------------------------------------ |
| Responsabilidades   | Operativa diaria B2B: crear cuentas, configurar MOQ, preparar documentos |
| Permisos            | Módulos B2B operativos (sin condiciones ni precios)                      |
| Módulos visibles    | Dashboard, Cuentas B2B (solo datos básicos), MOQ, Documentos             |
| Acciones permitidas | Crear cuentas (pendiente aprobación), configurar MOQ, subir documentos   |
| Riesgos             | Puede crear expectativas incorrectas en clientes B2B                     |

### 5. Gestor de Contenido

| Atributo            | Valor                                                                               |
| ------------------- | ----------------------------------------------------------------------------------- |
| Responsabilidades   | Redactar storytelling, descripciones, notas de cata, maridajes, contenido editorial |
| Permisos            | Editorial + Media (solo subida)                                                     |
| Módulos visibles    | Dashboard, Editorial, Media                                                         |
| Acciones permitidas | Editar contenido editorial, subir imágenes, proponer cambios                        |
| Riesgos             | Contenido no verificado — requiere revisión antes de publicación                    |

### 6. Operador Soporte

| Atributo            | Valor                                                                             |
| ------------------- | --------------------------------------------------------------------------------- |
| Responsabilidades   | Atender consultas de clientes B2B, ver estado de presupuestos, contacto comercial |
| Permisos            | Módulos B2B read-only + contacto                                                  |
| Módulos visibles    | Dashboard, Cuentas B2B (read), Presupuestos (read), Contacto                      |
| Acciones permitidas | Ver datos, responder consultas, escalar a comercial                               |
| Riesgos             | Acceso a datos de cliente — requiere política de privacidad                       |

### 7. AI/Sommelier Operator

| Atributo            | Valor                                                                              |
| ------------------- | ---------------------------------------------------------------------------------- |
| Responsabilidades   | Supervisar respuestas del Sommelier, editar prompts, revisar logs, configurar tono |
| Permisos            | Módulo Sommelier completo                                                          |
| Módulos visibles    | Dashboard, Sommelier Prompts, Sommelier Supervisión, Logs                          |
| Acciones permitidas | Editar prompts, revisar respuestas, bloquear productos, configurar perfiles        |
| Riesgos             | Modificar prompts puede afectar calidad de respuestas — requiere testing           |

### 8. Auditor / Read-only

| Atributo            | Valor                                                           |
| ------------------- | --------------------------------------------------------------- |
| Responsabilidades   | Revisar operaciones, compliance, trazabilidad                   |
| Permisos            | Todos los módulos en modo lectura                               |
| Módulos visibles    | Todos (read-only), especialmente Audit Logs                     |
| Acciones permitidas | Ver, filtrar, exportar datos                                    |
| Riesgos             | Acceso a datos sensibles — requiere acuerdo de confidencialidad |

## Módulos Futuros

### 1. Dashboard Ejecutivo

Panel principal con KPIs del ecosistema:

- Productos: total, publicados, pendientes revisión, borradores
- B2B: cuentas activas, presupuestos pendientes, nuevas solicitudes
- Sommelier: interacciones totales, respuestas marcadas, prompts activos
- Media: productos sin imagen, imágenes pendientes de aprobar
- Últimos cambios: feed de actividad reciente
- Alertas: productos sin stock, condiciones expiradas, integraciones caídas

### 2. Gestión de Productos

CRUD completo de productos del Catálogo Premium:

- Lista con filtros: categoría, estado, bodega, D.O., tipo, fecha
- Vista detalle con tabs: info general, editorial, ficha técnica, media, SEO, B2B
- Estados: borrador, pendiente revisión, publicado, archivado
- Historial de cambios por producto
- Duplicar producto
- Previsualización como se ve en catálogo público

### 3. Gestión de Productores / Proveedores

- Lista de bodegas, productores, proveedores
- Datos: nombre, región, contacto, web, certificaciones
- Productos asociados a cada productor
- Historial de relación comercial

### 4. Gestión de Categorías

- Árbol de categorías del catálogo
- Ordenación, activación/desactivación
- SEO por categoría (title, description, slug)
- Imagen de categoría

### 5. Editorial / Storytelling

- Editor de contenido editorial por producto
- Campos: story, descripción larga, notas de cata, maridajes
- Versiones y previsualización
- Programación de publicación
- Atribución: quién escribió, quién aprobó

### 6. Fichas Técnicas

- Campos estructurados por tipo de producto
- Vino: variedad, D.O., añada, crianza, alcohol, acidez, etc.
- Aceite: variedad de aceituna, acidez, cosecha, envasado
- Miel: origen floral, cosecha, análisis
- PDF generado desde plantilla

### 7. SEO

- Por producto: title, meta description, keywords, slug, canonical
- Por categoría: title, description, slug
- Vista de SEO general con estado de optimización
- Sugerencias de mejora

### 8. Imágenes y Media

- Gestor de imágenes por producto
- Subida, recorte, ordenación
- Formatos: hero, galería, ficha técnica
- Estado: pendiente, aprobada, rechazada
- Optimización automática (futuro)

### 9. Cuentas B2B

- Lista de cuentas con estado, perfil, comercial asignado
- Detalle: datos empresa, perfiles de contacto, condiciones, historial
- Crear cuenta con flujo de aprobación
- Suspender/activar cuenta
- Asignar comercial

### 10. Solicitudes de Presupuesto

- Lista con filtros: estado, fecha, perfil, comercial
- Detalle: productos solicitados, cantidades, condiciones ofrecidas
- Acciones: aprobar, rechazar, solicitar más info, convertir en pedido
- Historial de comunicación con el cliente

### 11. Condiciones Comerciales

- Gestión de tramos de precio por producto y perfil
- Condiciones generales por perfil (restaurante, distribuidor, etc.)
- Condiciones especiales por cuenta
- Historial de cambios con quién y cuándo

### 12. MOQ / Reglas Mínimas

- Reglas por producto: cantidad mínima, múltiplo
- Reglas por categoría
- Reglas por perfil B2B
- Validación visual de reglas aplicadas

### 13. Documentos Comerciales

- Gestor de documentos por producto
- Tipos: ficha técnica, ficha comercial, etiqueta, certificación, logística
- Subida, versionado, publicación
- Asociación a perfiles B2B (qué perfil ve qué documentos)

### 14. Sommelier AI Governance

- Editor de prompts base del Sommelier
- Configuración de tono por perfil (privado, B2B, proveedor)
- Gestión de perfiles de conversación
- Bloqueo de productos no recomendables
- Testing de respuestas desde el panel

### 15. Prompts y Respuestas Supervisadas

- Log de interacciones del Sommelier
- Respuestas marcadas por usuarios (útil/no útil)
- Revisión manual de respuestas problemáticas
- Aprobación de nuevas recomendaciones comerciales
- Métricas de satisfacción por perfil

### 16. Analytics

- KPIs del ecosistema
- Productos más vistos en catálogo
- Productos más recomendados por Sommelier
- Solicitudes B2B por período
- Tasa de conversión de presupuesto a pedido (futuro)
- Tiempo medio de respuesta comercial

### 17. Integraciones

- Gestión de conexiones con sistemas externos
- Estado de integraciones: activa, pausada, error
- Logs de sincronización
- Reprocesar integraciones fallidas
- Configuración de endpoints (Rioja Marketplace)

### 18. Audit Logs

- Trazabilidad completa de todas las acciones
- Quién, qué, cuándo, desde dónde
- Filtros: usuario, acción, módulo, fecha
- Exportación de logs
- Retención configurable

### 19. Configuración

- Configuración global del sistema
- Parámetros: nombre del sitio, URLs, emails de contacto
- Configuración de integraciones
- Límites y umbrales

### 20. Roles y Permisos

- Gestión de roles (RBAC)
- Permisos granulares por módulo y acción (crear, leer, editar, eliminar)
- Asignación de roles a usuarios
- Heredación de permisos

## Rutas Futuras

```
/admin                                          # Login / landing backoffice
/admin/dashboard                                # Dashboard ejecutivo
/admin/catalogo                                 # Gestión de catálogo
/admin/catalogo/productos                       # Lista de productos
/admin/catalogo/productos/nuevo                 # Nuevo producto
/admin/catalogo/productos/[id]                  # Detalle/edición producto
/admin/catalogo/categorias                      # Gestión de categorías
/admin/catalogo/editorial                       # Contenido editorial
/admin/catalogo/editorial/[id]                  # Editar contenido
/admin/catalogo/seo                             # SEO global
/admin/media                                    # Gestor de imágenes
/admin/productores                              # Lista de productores
/admin/productores/[id]                         # Detalle productor
/admin/b2b/cuentas                              # Cuentas B2B
/admin/b2b/cuentas/[id]                         # Detalle cuenta B2B
/admin/b2b/cuentas/nueva                        # Nueva cuenta
/admin/b2b/presupuestos                         # Solicitudes de presupuesto
/admin/b2b/presupuestos/[id]                    # Detalle presupuesto
/admin/b2b/condiciones                          # Condiciones comerciales
/admin/b2b/moq                                  # Reglas MOQ
/admin/documentos                               # Documentos comerciales
/admin/sommelier                                # Governance Sommelier
/admin/sommelier/prompts                        # Editor de prompts
/admin/sommelier/supervision                    # Revisión de respuestas
/admin/sommelier/logs                           # Logs de interacción
/admin/analytics                                # KPIs y métricas
/admin/integraciones                            # Gestión de integraciones
/admin/integraciones/rioja-marketplace          # Integración específica
/admin/audit                                    # Audit logs
/admin/settings                                 # Configuración global
/admin/roles                                    # Gestión de roles
/admin/usuarios                                 # Gestión de usuarios
```

## Modelo Conceptual

Modelos conceptuales para futura implementación. No crear schema Prisma todavía.

### AdminUser

- `id` (UUID)
- `email` (string, unique)
- `name` (string)
- `roleId` (FK a AdminRole)
- `status` (enum: active | suspended | invited)
- `lastLoginAt` (datetime, nullable)
- `createdAt` / `updatedAt`

### AdminRole

- `id` (UUID)
- `name` (string, unique)
- `description` (string)
- `isSystem` (boolean, no se puede eliminar)
- `permissions` (relationship a AdminPermission)
- `createdAt`

### AdminPermission

- `id` (UUID)
- `roleId` (FK a AdminRole)
- `module` (string, ej: "catalog.products")
- `action` (enum: create | read | update | delete | approve)
- `createdAt`

### AuditLog

- `id` (UUID)
- `userId` (FK a AdminUser)
- `action` (string, ej: "product.created")
- `entityType` (string, ej: "ProductPremium")
- `entityId` (string, UUID del registro afectado)
- `payload` (JSON, cambios realizados)
- `ipAddress` (string)
- `createdAt`

### EditorialProduct (vista extendida de ProductPremium)

- `productId` (FK a ProductPremium, conceptual)
- `story` (text)
- `longDescription` (text)
- `tastingNotes` (text[] | JSON)
- `pairingsEditorial` (text[] | JSON)
- `winemakerNotes` (text, opcional)
- `status` (enum: draft | pending_review | published | archived)
- `publishedAt` (datetime, nullable)
- `createdBy` (FK a AdminUser)
- `reviewedBy` (FK a AdminUser, nullable)
- `version` (int)
- `createdAt` / `updatedAt`

### CatalogWorkflow

- `id` (UUID)
- `productId` (FK a ProductPremium, conceptual)
- `fromStatus` (enum)
- `toStatus` (enum)
- `changedBy` (FK a AdminUser)
- `notes` (text, opcional)
- `createdAt`

### ProductMedia

- `id` (UUID)
- `productId` (FK a ProductPremium, conceptual)
- `type` (enum: hero | gallery | technical | label)
- `url` (string)
- `altText` (string, opcional)
- `order` (int)
- `status` (enum: pending | approved | rejected)
- `fileSize` (int, bytes)
- `createdAt`

### ProducerProfile

- `id` (UUID)
- `name` (string)
- `region` (string)
- `country` (string)
- `contactName` (string, opcional)
- `contactEmail` (string, opcional)
- `website` (string, opcional)
- `certifications` (string[], opcional)
- `notes` (text, opcional)
- `createdAt` / `updatedAt`

### B2BAccountAdminView (vista desde backoffice)

- Hereda de B2BAccount
- `assignedCommercialId` (FK a AdminUser, nullable)
- `internalNotes` (text, opcional)
- `lastActivityAt` (datetime, nullable)
- `totalQuotes` (int)
- `totalOrders` (int, futuro)
- `creditStatus` (enum: ok | warning | blocked)

### QuoteAdminView (vista desde backoffice)

- Hereda de B2BQuoteRequest
- `assignedToId` (FK a AdminUser, nullable)
- `adminNotes` (text, opcional)
- `responseTime` (int, horas hasta primera respuesta)
- `escalatedAt` (datetime, nullable)

### CommercialCondition

- `id` (UUID)
- `accountId` (FK a B2BAccount, nullable — null = condición general)
- `profileType` (enum, opcional)
- `productId` (FK a ProductPremium, conceptual, nullable — null = aplica a todos)
- `paymentTerms` (string)
- `discountPercent` (decimal, opcional)
- `creditLimit` (decimal, opcional)
- `validFrom` / `validTo`
- `approvedById` (FK a AdminUser)
- `notes` (text, opcional)
- `createdAt` / `updatedAt`

### MOQRuleAdminView (extensión de MOQRule)

- `id` (UUID)
- `productId` (FK nullable)
- `categoryId` (FK nullable)
- `profileType` (enum, opcional)
- `minQuantity` (int)
- `multipleOf` (int)
- `strict` (boolean, si es obligatorio o sugerido)
- `description` (string)
- `createdById` (FK a AdminUser)
- `createdAt` / `updatedAt`

### DocumentTemplate

- `id` (UUID)
- `name` (string)
- `type` (enum: technical_sheet | commercial_sheet | label | certification | logistics)
- `productId` (FK a ProductPremium, conceptual, nullable)
- `fileUrl` (string)
- `fileSize` (int)
- `language` (string)
- `version` (int)
- `status` (enum: draft | published | deprecated)
- `createdAt` / `updatedAt`

### SommelierPromptTemplate

- `id` (UUID)
- `key` (string, unique, ej: "system_prompt", "b2b_profile")
- `name` (string)
- `content` (text)
- `version` (int)
- `status` (enum: active | draft | archived)
- `updatedById` (FK a AdminUser)
- `createdAt` / `updatedAt`

### SommelierReviewLog

- `id` (UUID)
- `sessionId` (string)
- `query` (text)
- `response` (text)
- `productSlugs` (string[], slugs recomendados)
- `confidence` (float)
- `profile` (string)
- `userRating` (enum: helpful | unhelpful | flagged, nullable)
- `reviewedById` (FK a AdminUser, nullable)
- `reviewedAt` (datetime, nullable)
- `reviewNotes` (text, opcional)
- `createdAt`

### IntegrationJob

- `id` (UUID)
- `name` (string)
- `type` (enum: rioja_marketplace_sync | rioja_marketplace_export)
- `status` (enum: pending | running | completed | failed | cancelled)
- `config` (JSON)
- `startedAt` (datetime, nullable)
- `completedAt` (datetime, nullable)
- `errorMessage` (text, nullable)
- `createdById` (FK a AdminUser)
- `createdAt`

### IntegrationRun

- `id` (UUID)
- `jobId` (FK a IntegrationJob)
- `status` (enum: running | completed | failed)
- `recordsProcessed` (int)
- `recordsFailed` (int)
- `log` (text, nullable)
- `startedAt` (datetime)
- `completedAt` (datetime, nullable)

### SystemSetting

- `id` (UUID)
- `key` (string, unique)
- `value` (JSON)
- `description` (string)
- `updatedById` (FK a AdminUser, nullable)
- `updatedAt`

## UX

### Principios de diseño

- **Serio y operativo**: el backoffice es una herramienta de trabajo, no una experiencia de marca
- **Denso pero legible**: maximizar información por pantalla sin sacrificar claridad
- **Orientado a productividad**: acciones comunes a 1-2 clicks, atajos de teclado (futuro)
- **Estados visibles**: cada entidad muestra su estado de forma clara (color, badge)
- **Consistente**: mismo patrón de UI en todos los módulos (listas, filtros, formularios)
- **Premium pero contenido**: la calidad visual de LabrazaHome se mantiene pero sin adornos innecesarios

### Inspiración (no copiar)

- Linear — lists, filtros, atajos
- Stripe Dashboard — claridad de datos, jerarquía visual
- Vercel Dashboard — navegación lateral, estados, deployments
- Shopify Admin — manejo de productos, variantes, media

### Patrón de UI por módulo

Cada módulo sigue el patrón:

1. **Header**: título + acciones principales (nuevo, filtrar, exportar)
2. **Lista**: tabla con columnas configurables, paginación, ordenación
3. **Sidebar de filtros**: categoría, estado, fecha, perfil
4. **Detalle**: layout de tabs para información agrupada
5. **Formularios**: single-column con validación inline

### Paleta

Misma base de LabrazaHome Labs pero con variantes operativas:

- Fondo: `#fafafa` (claro) / `#18181b` (oscuro)
- Sidebar: más oscuro que el fondo para jerarquía
- Tablas: striped rows para legibilidad
- Estados: verde (publicado/activo), ámbar (pendiente), rojo (error/bloqueado), gris (borrador)
- Acento: índigo (consistente con el ecosistema)

## Dashboard Ejecutivo

### KPIs futuros

| KPI                      | Descripción                        | Filtrable por           |
| ------------------------ | ---------------------------------- | ----------------------- |
| Productos en catálogo    | Total de productos creados         | Categoría, estado       |
| Productos publicados     | Visibles en Catálogo Premium       | Categoría               |
| Pendientes revisión      | Productos en estado pending_review | Categoría, perfil       |
| Cuentas B2B activas      | Cuentas con status active          | Perfil, comercial       |
| Presupuestos pendientes  | Solicitudes sin respuesta          | Perfil, comercial, días |
| Productos sin ficha      | Sin ficha técnica completa         | Categoría               |
| Productos sin imagen     | Sin imagen principal               | Categoría               |
| Incidencias Sommelier    | Respuestas marcadas como no útiles | Perfil, rango fecha     |
| Integraciones pendientes | Jobs de integración en error       | Tipo                    |
| Últimos cambios          | Feed de audit logs recientes       | Usuario, módulo         |

## Flujos Principales

### 1. Crear Producto

```
Admin → /admin/catalogo/productos/nuevo
  → Rellena info básica (nombre, categoría, productor, slug)
  → Guarda como borrador
  → Añade contenido editorial
  → Añade ficha técnica
  → Sube imágenes
  → Envía a revisión
  → Gestor de contenido revisa
  → Aprueba / solicita cambios
  → Publica
```

### 2. Revisar Producto

```
Gestor catálogo → /admin/catalogo/productos/[id]
  → Ve estado actual y cambios pendientes
  → Compara con versión publicada (si existe)
  → Edita / aprueba / rechaza
  → Añade notas de revisión
  → Cambia estado
```

### 3. Aprobar Publicación

```
Producto en pending_review
  → Admin comercial o gestor revisa
  → Verifica: editorial, ficha, media, SEO
  → Aprueba → estado published
  → Rechaza → estado draft + notas
  → Audit log: quién, cuándo, desde qué estado
```

### 4. Añadir Ficha Técnica

```
Admin → /admin/catalogo/productos/[id]/ficha
  → Formulario dinámico según tipo de producto
  → Vino: variedad, D.O., añada, crianza, alcohol, acidez, taninos
  → Aceite: variedad aceituna, acidez, cosecha, envasado
  → Miel: origen floral, cosecha, análisis
  → Guarda → asociado al producto
  → Visible en catálogo como "Ficha técnica"
```

### 5. Subir Imágenes

```
Admin → /admin/media
  → Sube archivo (drag & drop)
  → Asocia a producto
  → Selecciona tipo (hero, galería, ficha)
  → Ordena
  → Estado: pending (requiere aprobación si aplica)
  → Visible en catálogo tras aprobación
```

### 6. Crear Cuenta B2B

```
Admin comercial → /admin/b2b/cuentas/nueva
  → Rellena datos empresa
  → Selecciona perfil
  → Asigna comercial (opcional)
  → Configura condiciones iniciales
  → Crea → estado pending
  → Envía email de invitación (futuro)
  → Activa manualmente o tras verificación
```

### 7. Revisar Solicitud de Presupuesto

```
Admin comercial → /admin/b2b/presupuestos/[id]
  → Ve datos del cliente
  → Revisa productos solicitados
  → Aplica condiciones de la cuenta
  → Calcula total
  → Añade notas internas
  → Aprueba / rechaza / solicita más info
  → Cliente recibe notificación de cambio de estado
```

### 8. Configurar MOQ

```
Admin → /admin/b2b/moq
  → Selecciona producto o categoría
  → Define: cantidad mínima, múltiplo, estricto/sugerido
  → Asigna a perfil (todos o específico)
  → Guarda → regla activa inmediatamente
  → Validación en frontend B2B en tiempo real
```

### 9. Publicar Documento Comercial

```
Admin → /admin/documentos
  → Sube archivo PDF
  → Selecciona tipo (ficha técnica, comercial, etiqueta)
  → Asocia a producto(s)
  → Define visibilidad (perfiles B2B)
  → Publica → visible en portal B2B
```

### 10. Supervisar Respuesta Sommelier

```
AI Operator → /admin/sommelier/supervision
  → Lista de interacciones recientes
  → Filtra por: usuario marcó "no útil", baja confianza, perfil
  → Revisa respuesta generada
  → Marca como correcta / incorrecta
  → Añade corrección si aplica
  → Datos usados para mejorar prompts futuros
```

### 11. Preparar Export a Rioja Marketplace

```
Admin → /admin/integraciones/rioja-marketplace
  → Selecciona productos a exportar
  → Define campos a incluir
  → Vista previa del payload
  → Ejecuta job de integración
  → Monitorea estado
  → Revisa logs en caso de error
```

### 12. Revisar Audit Log

```
Admin → /admin/audit
  → Filtra por: usuario, acción, módulo, fecha
  → Ve detalle de cada acción
  → Exporta a CSV
  → Retención: 90 días (configurable)
```

## Relación con Catálogo Premium v2

El Backoffice es el origen operativo del Catálogo Premium.

### Flujo de datos

```
Backoffice Admin v2 (gestión)
    │
    ├── Crear/editar productos
    ├── Gestionar categorías
    ├── Editorial y storytelling
    ├── Fichas técnicas
    ├── Imágenes y media
    ├── SEO
    ├── Estados y workflow
    │
    ▼
Catálogo Premium v2 (presentación pública)
    │
    └── Productos publicados visibles en /catalogo
```

### Principios

- El catálogo público refleja SOLO productos con estado `published`
- El backoffice puede ver todos los estados (borrador, pendiente, publicado, archivado)
- Los cambios en backoffice se reflejan inmediatamente en el catálogo público (tras aprobación)
- No se pueden eliminar productos publicados — solo archivar
- Cada cambio queda registrado en audit log

### En esta fase

- Catálogo actual sigue siendo mock data
- No hay conexión real entre backoffice y catálogo
- El diseño arquitectónico prepara el terreno

## Relación con Portal B2B v2

El Backoffice gestiona toda la capa operativa del B2B.

### Flujo de datos

```
Backoffice Admin v2
    │
    ├── Cuentas B2B → creación, activación, condiciones
    ├── Presupuestos → revisión, aprobación, seguimiento
    ├── MOQ → configuración de reglas
    ├── Documentos → subida, versionado, publicación
    │
    ▼
Portal B2B v2 (experiencia profesional)
    │
    └── Clientes ven: condiciones aplicadas, estado presupuestos,
        documentos disponibles, MOQ validado en tiempo real
```

## Relación con Sommelier AI v2

El Backoffice permite gobernar el Sommelier.

### Áreas de control

1. **Prompts**: editar los templates que usa el Sommelier para generar respuestas
2. **Perfiles**: configurar el tono y comportamiento por perfil (privado, B2B, proveedor)
3. **Supervisión**: revisar interacciones reales, marcar respuestas, detectar problemas
4. **Bloqueo**: impedir que ciertos productos sean recomendados
5. **Testing**: probar respuestas desde el panel antes de desplegar cambios
6. **Métricas**: seguimiento de satisfacción por perfil y producto

### En esta fase

- Sommelier sigue siendo mock
- No hay conexión real entre backoffice y Sommelier
- El diseño arquitectónico prepara el control futuro

## Relación con Rioja Marketplace

### Reglas de integración (reiteradas)

1. **Rioja Marketplace no se toca**
2. Toda integración futura debe ser:
   - Read-only al inicio
   - Con runbook de integración
   - Con fase de validación específica
   - Con rollback plan
   - Con validación visual y datos mock

### Flujo de integración futuro

```
Backoffice Stack-2026
    │
    ├── Admin prepara export de productos
    ├── Selecciona campos y productos
    ├── Vista previa del payload
    │
    ▼
Staging / Lab Validation
    │
    ├── Validación visual
    ├── Validación de datos
    ├── Pruebas de integración
    │
    ▼
Export / API Controlada
    │
    ├── Endpoints del marketplace
    ├── No DB compartida
    │
    ▼
Rioja Marketplace (producción)
```

## Seguridad y Gobernanza

### RBAC (Role-Based Access Control)

| Rol              | Nivel | Acceso                                      |
| ---------------- | ----- | ------------------------------------------- |
| Super Admin      | Total | Sistema completo + integraciones + settings |
| Admin Comercial  | Alto  | Módulos B2B + Documentos + Analytics        |
| Gestor Catálogo  | Alto  | Catálogo + Media + Productores + SEO        |
| Gestor B2B       | Medio | Cuentas (básico) + MOQ + Documentos         |
| Gestor Contenido | Medio | Editorial + Media (subida)                  |
| Operador Soporte | Bajo  | B2B read-only + Contacto                    |
| AI Operator      | Alto  | Sommelier completo                          |
| Auditor          | Bajo  | Todos read-only                             |

### Principio de Mínimo Privilegio

- Cada rol tiene solo los permisos necesarios para su función
- Los permisos se asignan a roles, no a usuarios individuales
- Los roles son configurables desde el panel de administración
- Por defecto, ningún usuario tiene permisos de eliminación

### Estados de Publicación

| Estado           | Descripción            | Visible en catálogo |
| ---------------- | ---------------------- | ------------------- |
| `draft`          | En edición, no visible | No                  |
| `pending_review` | Enviado a revisión     | No                  |
| `published`      | Publicado y visible    | Sí                  |
| `archived`       | Retirado del catálogo  | No                  |

### Reglas de Gobernanza

- Todo cambio de estado requiere audit log
- La publicación requiere aprobación de un revisor distinto al creador
- Los productos solo pueden ser archivados, nunca eliminados
- Las condiciones comerciales requieren aprobación de admin comercial
- Los prompts del Sommelier requieren testing antes de activar
- Las integraciones con Rioja Marketplace requieren runbook aprobado
- Los audit logs son inmutables (solo append)
- La sesión de admin expira tras 30 min de inactividad (futuro)

## Roadmap

### Fase 1 — Arquitectura y diseño (actual)

- Documento de arquitectura
- Perfiles internos definidos
- Modelos conceptuales
- Rutas diseñadas
- Flujos principales documentados
- Auditoría

### Fase 2 — Placeholder y navegación

- Página Admin placeholder en el frontend
- Enlace en navegación global
- KPIs mock en dashboard

### Fase 3 — Real Dashboard Mock (completada)

- Dashboard operativo con 6 KPIs mock
- Revisión de catálogo con 6 productos y estados
- Pipeline B2B con 4 métricas
- Sommelier governance con 4 indicadores
- Estado de 6 integraciones del ecosistema
- 5 alertas no alarmistas
- Timeline de actividad reciente
- Roadmap interno del Backoffice
- 11 componentes Astro reutilizables
- Layout responsive 3/2/1 columnas

### Fase 3 — Gestión de catálogo

- CRUD de productos (mock)
- Estados y workflow
- Editorial / storytelling
- Fichas técnicas
- Media upload

### Fase 4 — Gestión B2B

- Cuentas B2B
- Presupuestos
- Condiciones comerciales
- MOQ

### Fase 5 — Sommelier governance + Documentos

- Editor de prompts
- Supervisión de respuestas
- Gestión documental

### Fase 6 — Integraciones + Analytics

- Dashboard ejecutivo con KPIs reales
- Integración con Rioja Marketplace (read-only)
- Audit logs completos
