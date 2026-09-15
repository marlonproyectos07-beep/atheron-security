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
