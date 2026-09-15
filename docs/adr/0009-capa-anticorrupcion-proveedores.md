# ADR-0009 — Capa anticorrupción de proveedores

- **Estado:** PROPUESTO · **Fecha:** 2026-09-15
- **Propone:** Agente A · **Decide:** Marlon · **Revisa:** Agente B

## Contexto

El Playbook trata a SYSCOM como un proveedor único. La realidad verificada es que existen al menos dos operaciones con portales de desarrollador **separados**: [developers.syscom.mx](https://developers.syscom.mx/) y [developers.syscomcolombia.com](https://developers.syscomcolombia.com/), con centros de distribución en Estados Unidos, México y Colombia ([SYSCOM, Acerca de](https://www.syscom.mx/principal/acerca_de) — consultados 15-sep-2026).

El Playbook ya define correctamente una máquina de estados de producto (DESCUBIERTO → EN REVISIÓN → APROBADO ATHERON → PUBLICADO → PAUSADO → AGOTADO). **Es la mejor pieza de diseño del documento y se adopta sin cambios.** Lo que falta es el modelo multiproveedor.

## Decisión

1. **Modelo de catálogo desacoplado:**
   ```
   AtheronProduct (sku_atheron, nombre, ficha aprobada, precio Atheron, estado)
         │
         └──< SupplierOffer (supplier_id, supplier_sku, costo, moneda,
                             stock, lead_time, fetched_at)
   ```
   Un producto Atheron, N ofertas de proveedor. **Cambiar de proveedor = añadir una oferta, no reescribir el catálogo.**
2. **SKU Atheron ≠ SKU del proveedor, siempre.** Nunca exponer un SKU de proveedor como propio.
3. **Ningún precio de proveedor se muestra sin pasar por las reglas de precio de Atheron.**
4. **Se adopta la máquina de estados del Playbook tal cual.** Nada se publica sin pasar por APROBADO ATHERON.
5. **El stock publicado debe ser stock disponible para el cliente**, no stock consolidado de otro país. Publicar disponibilidad que no existe viola §4.3 del propio Playbook.
6. **El POC de SYSCOM debe responder por escrito las 7 preguntas** de `AUDIT-CLAUDE-v1.md` §B.8 antes de cualquier promesa comercial: paridad CO/MX, origen del stock, entidad facturadora, despacho directo a cliente final, responsable de garantía, límites de tasa y derechos sobre imágenes.
7. **Ninguna capacidad del proveedor se asume.** Todo lo no confirmado por escrito se trata como HIPÓTESIS.

## Alternativas consideradas

- **Integración directa del catálogo del proveedor.** Rechazada: acopla el catálogo de Atheron al esquema del proveedor y hace imposible negociar o cambiar.
- **Un proveedor, sin abstracción.** Rechazada: ya hay dos entidades SYSCOM; el problema existe hoy, no en el futuro.

## Consecuencias

**Positivas:** poder de negociación con proveedores; catálogo estable ante cambios del proveedor; base para comparar costos entre proveedores.

**Negativas:** una tabla de mapeo que mantener; el alta de producto tiene un paso más.

## Cómo se revierte

Posible, pero implica volver a acoplarse a un proveedor. No recomendado.

---

## REVISIÓN v2 — 15-sep-2026 (tras revisión del Agente B)

**Ambigüedad resuelta por decisión.** El Agente A solo pudo señalar que existen dos entidades SYSCOM con portales de desarrollador separados. El Agente B decide: **el proveedor objetivo es SYSCOM Colombia** ([developers.syscomcolombia.com](https://developers.syscomcolombia.com/), consultado 15-sep-2026).

Es la resolución correcta: entidad colombiana, factura colombiana, stock colombiano y garantía bajo el régimen colombiano de protección al consumidor. Elimina de raíz el problema de importación, aranceles, tiempos y garantía transfronteriza.

**POC recortado a 7 preguntas** (dos de las siete originales quedan resueltas por esta decisión; se añade una nueva):

| # | Pregunta | Decide |
|---|---|---|
| 1 | ¿El stock de la API es stock físico en Colombia y disponible? | Si se puede publicar disponibilidad sin violar §4.3 del Playbook |
| 2 | ¿Factura como entidad colombiana con NIT y factura electrónica DIAN? | Si es compra nacional pura |
| 3 | ¿Existe despacho directo a cliente final con guía rastreable? | Viabilidad del modo M-1 (ADR-0008) |
| 4 | ¿Quién responde la garantía ante el consumidor final y en qué plazo? | Exposición de Atheron como vendedor |
| 5 | ¿Límites de tasa y SLA de la API? | Stock en tiempo real vs caché |
| 6 | ¿Los términos permiten republicar imágenes y fichas técnicas? | Contenido de las landings |
| **7** | **¿SYSCOM Colombia está inscrito ante Supervigilancia como comercializador de equipos de vigilancia y seguridad privada?** | **Exposición sancionatoria de Atheron** (ADR-0014) |

**La pregunta 7 es nueva en v2** y proviene del hallazgo del ADR-0014: fuentes secundarias indican que contratar proveedores no inscritos puede generar sanción para quien contrata. Si se confirma, **la elección de proveedor deja de ser solo una decisión comercial.**

**Cambio de calendario:** la capa anticorrupción (`AtheronProduct → N SupplierOffer`) sigue siendo necesaria, pero **se construye al integrar SYSCOM Colombia, no el día 1** — coherente con Core Thin (ADR-0002 rev. v2).
