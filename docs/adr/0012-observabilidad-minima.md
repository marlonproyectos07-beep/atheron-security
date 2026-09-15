# ADR-0012 — Observabilidad mínima y trazabilidad del dinero

- **Estado:** PROPUESTO · **Fecha:** 2026-09-15
- **Propone:** Agente A · **Decide:** Marlon · **Revisa:** Agente B
- **Relacionado:** ADR-0003, ADR-0005

## Contexto

El Playbook tiene KPI de negocio excelentes (§16) y **cero observabilidad técnica**. No se puede replicar en 10 ciudades lo que no se puede ver fallar en una. Sin trazabilidad, "se perdió un lead" es indepurable, y un lead perdido es dinero perdido sin rastro.

La tentación en esta etapa es instalar una plataforma completa de monitoreo. Es la tentación equivocada: **poca observabilidad bien elegida vale más que mucha ignorada.**

## Decisión

**Cuatro cosas, y ninguna más, en los primeros 30 días:**

1. **Logs estructurados con `correlation_id`** que atraviese landing → Core → Odoo → WhatsApp → venta. Es lo que hace depurable el embudo completo.
2. **Trazabilidad del dinero:** todo cambio de estado en un pedido, pago o beneficio deja rastro con actor, timestamp y motivo. Sin excepción.
3. **Tres alertas, no treinta:**
   - fallo de webhook de pago
   - lead recibido en Core y no creado en Odoo
   - error de integración con proveedor

   Más de tres alertas al inicio garantiza que se ignoren todas.
4. **Un tablero de una página:** leads del día · leads sin contactar > 2 h · ventas · errores de integración.

**Además:** backups de Core y de Odoo **con una restauración real probada** antes del gate G5 (ADR-0006). Un backup nunca restaurado no es un backup.

## Alternativas consideradas

- **Plataforma completa de observabilidad (APM, trazas distribuidas, métricas).** Rechazada por ahora: costo y ruido desproporcionados para un sistema con un servicio y un ERP.
- **Sin observabilidad hasta que haya problemas.** Rechazada: el primer problema serio será una fuga de dinero silenciosa, y sin logs no habrá forma de saber qué pasó.

## Consecuencias

**Positivas:** los problemas se detectan antes que el cliente los reporte; el embudo es depurable; base para medir el MVP.

**Negativas:** disciplina de propagar `correlation_id` en todas las llamadas.

## Cómo se revierte

No conviene. Es el piso mínimo para operar con dinero de clientes.
