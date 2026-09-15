# ADR-0002 — Frontera entre Odoo y Atheron Core

- **Estado:** PROPUESTO · **Fecha:** 2026-09-15
- **Propone:** Agente A · **Decide:** Marlon · **Revisa:** Agente B
- **Relacionado:** ADR-0001, ADR-0003, ADR-0004

## Contexto

El Playbook se contradice (auditoría X1):

- §4.4: *"Odoo debe centralizar: clientes... beneficios, trazabilidad."*
- §4.5: *"Debe ser posible cambiar proveedor, frontend, herramienta, canal, sin reconstruir toda Atheron."*

Ambas no pueden ser verdad para el mismo conjunto de datos. Si identidad y ledger viven como customizaciones de Odoo, salir de Odoo **es** reconstruir Atheron. Evidencia de que la deuda es real: actualizaciones de módulos custom estimadas entre USD 10.000 y 40.000, con la personalización no gobernada señalada como principal riesgo de actualización ([Silent Infotech](https://silentinfotech.com/blog/odoo-1/odoo-community-vs-enterprise-true-cost-comparison-2026-461); [Carbon](https://carbon.ms/learn/why-odoo-implementations-fail) — consultados 15-sep-2026).

## Decisión

**Odoo es el libro mayor del dinero. Atheron Core es la memoria de la relación.**

| Vive en **Odoo** (fuente de verdad comercial y financiera) | Vive en **Atheron Core** (fuente de verdad relacional) |
|---|---|
| CRM, cotizaciones, órdenes | `Party`, `Identifier` |
| Inventario, compras | `Consent` (append-only) |
| Facturación, impuestos, DIAN | `Event` log (append-only) |
| Cartera, contabilidad | `BenefitEntry` ledger (fase posterior) |
| Contactos (**réplica**, no maestro) | Grafo de referidos, capa anticorrupción |

**Reglas de frontera:**
1. Un solo sistema escribe cada campo. **Nunca escritura bidireccional del mismo dato.**
2. `atheron_party_id` viaja a Odoo como referencia, no como copia autoritativa.
3. **Techo duro de customización:** si el custom de Odoo supera ~15% del esfuerzo de implementación, se revisa la arquitectura antes de continuar.
4. Reconciliación diaria que reporta discrepancias a un humano.

Esto satisface §4.4 y §4.5 simultáneamente, porque distingue dos verdades distintas que el Playbook trataba como una.

## Alternativas consideradas

- **Todo en Odoo (Opción A).** Rechazada: viola §4.5 y atrapa el activo estratégico en el sistema más difícil de migrar. Aceptable como puente de 30 días, inaceptable como destino.
- **EDA completa con CDP (Opción C).** Rechazada para 2026–2027: meses antes de la primera venta, con problemas de sistemas distribuidos que el negocio no tiene.

Comparación completa en `docs/ARCHITECTURE-OPTIONS-v1.md`.

## Consecuencias

**Positivas:** el activo es portable desde el primer registro; Odoo se mantiene casi estándar y barato de actualizar; permite **comprar** un motor de lealtad más adelante en lugar de construirlo.

**Negativas:** dos sistemas que sincronizar; riesgo de divergencia (mitigado por las reglas de frontera); un componente propio que mantener; días adicionales antes de la primera venta.

## Cómo se revierte

Consolidar todo en Odoo. Posible mientras el Core siga siendo pequeño; cada mes que pasa lo encarece.
