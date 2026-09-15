# ADR-0004 — Ledger de beneficios append-only fuera de Odoo

- **Estado:** PROPUESTO · **Fecha:** 2026-09-15
- **Propone:** Agente A · **Decide:** Marlon · **Revisa:** Agente B
- **Relacionado:** ADR-0002, ADR-0003

## Contexto

El Playbook (§6.4) exige correctamente que cada beneficio tenga costo máximo, sponsor económico, vencimiento, condición, responsable y redención registrada. Luego (§4.4) asume que Odoo lo hará.

Lo documentado del módulo de Odoo es un **motor de promociones**: cupones, programas de lealtad, descuentos automáticos, límites por compañía, fechas, límites de uso y reglas de acumulación por canal ([Odoo 18, *Discount and loyalty programs*](https://www.odoo.com/documentation/18.0/applications/sales/sales/products_prices/loyalty_discount.html), consultado 15-sep-2026). **No hay evidencia de que modele sponsor económico de un tercero ni un libro contable con reversa auditable.**

Bajo IFRS 15, los beneficios otorgados son obligación de desempeño y generan pasivo diferido; la ruptura se reconoce conforme ocurre la redención ([IFRS Community](https://ifrscommunity.com/knowledge-base/customer-loyalty-programmes/), consultado 15-sep-2026). Es decir: **cada beneficio prometido y no redimido es deuda en el balance.**

## Decisión

El ledger de beneficios vive en **Atheron Core**, no en Odoo, y es **append-only**.

```
benefit_entry (
  id, party_id, grant_id,
  entry_type   -- GRANT | REDEEM | EXPIRE | REVERSE
  amount, currency,
  sponsor_id,              -- quién paga: Atheron | aliado | compartido
  triggering_event_id,     -- por qué se otorgó (obligatorio)
  reverses_entry_id NULL,  -- para REVERSE
  occurred_at, recorded_at
)
```

**Reglas no negociables:**
1. **Nunca UPDATE, nunca DELETE.** El saldo es la suma de asientos, jamás un campo mutable.
2. Reversar = asiento `REVERSE` que referencia el original. La historia queda.
3. **Todo beneficio tiene vencimiento.** Sin excepción — es lo que evita el pasivo eterno.
4. **Ningún beneficio existe sin las cuatro:** sponsor identificado, costo máximo calculado, fecha de vencimiento y regla de no-acumulación. Si falta una, no se publica.
5. **Piso de margen duro:** ninguna combinación de beneficios puede dejar el margen de contribución bajo el umbral definido. Si lo viola, el beneficio se degrada a no-monetario (auditoría §B.2).
6. `BenefitGranted` exige `triggering_event_id`: **todo beneficio debe poder explicarse al cliente y auditarse.**
7. Solo eventos con contrapartida verificada otorgan beneficio (ADR-0003, regla de oro).

**Nada de esto se construye en los primeros 30 días.** Se construye cuando exista el primer beneficio real (ver `MVP-30-DAYS-v1.md`). Antes de eso, los beneficios se otorgan a mano a los primeros clientes, que es más barato y enseña qué reglas escribir.

## Alternativas consideradas

- **Módulo de fidelización de Odoo.** Rechazada salvo que la prueba E4 demuestre lo contrario: no hay evidencia de sponsor de terceros ni de reversa auditable, y ata el activo al ERP.
- **Comprar un motor comercial** (Talon.One, Open Loyalty, Voucherify — [comparativa](https://www.extole.com/blog/loyalty-engine-software/), consultada 15-sep-2026). **No rechazada: aplazada.** Cuando llegue el momento del Loop, evaluar comprar antes que construir. El diferencial de Atheron no está en el motor, está en los datos físicos que lo alimentan.
- **Campo de saldo mutable.** Rechazada: imposible de auditar e imposible de reversar correctamente ante una devolución.

## Consecuencias

**Positivas:** pasivo calculable y auditable; devoluciones que reversan beneficios correctamente; base para conciliar con sponsors; el activo es portable.

**Negativas:** más complejo que un campo de puntos; requiere disciplina contable; la tabla crece.

## Cómo se revierte

No hace falta revertirlo: un ledger append-only se puede proyectar a cualquier otro modelo. Lo irreversible es lo contrario.
