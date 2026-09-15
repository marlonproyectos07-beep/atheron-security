# ADR-0003 — Contratos de eventos sin bus de mensajes

- **Estado:** PROPUESTO · **Fecha:** 2026-09-15
- **Propone:** Agente A · **Decide:** Marlon · **Revisa:** Agente B
- **Relacionado:** ADR-0002, ADR-0005

## Contexto

El encargo pregunta explícitamente si se necesita Event-Driven Architecture desde ya. Los eventos tienen dos propiedades separables que suelen confundirse:

| | Valor | Costo | ¿Retrofiteable? |
|---|---|---|---|
| **El contrato** | Altísimo | Casi cero | **NO** — los eventos no ocurridos no se recuperan |
| **La infraestructura** | Bajo sin volumen | Alto | **SÍ**, sin dolor si el contrato ya existe |

## Decisión

**Contratos de eventos: SÍ, desde el día 1. Bus de mensajes: NO, hasta que el volumen o el número de consumidores lo justifiquen.**

1. Todo evento usa el **envelope común** definido en `AUDIT-CLAUDE-v1.md` §F.2: `event_id`, `event_type`, `event_version`, `occurred_at`, `recorded_at`, `source`, `actor`, `party_id`, `correlation_id`, `idempotency_key`, `city`, `company_id`, `payload`.
2. Los eventos se persisten en una tabla **append-only** en Atheron Core.
3. `occurred_at` ≠ `recorded_at`. Confundirlos hace imposible auditar retrasos.
4. `event_version` desde la v1. Los contratos evolucionan; los eventos viejos **no se reescriben**.
5. `correlation_id` viaja desde la landing hasta la factura.
6. Los eventos son **inmutables**. Corregir = emitir un evento de corrección.
7. **Regla de oro:** solo los eventos con contrapartida física o financiera verificada otorgan valor — `PaymentReceived`, `EquipmentInstalled`, `StayCompleted`. Nunca `LeadCreated` ni `ReferralCreated`.

**Disparador para introducir el bus:** más de 3 consumidores independientes del mismo evento, o latencia de procesamiento que afecte la experiencia del cliente.

## Alternativas consideradas

- **Bus desde el día 1 (Kafka/RabbitMQ).** Rechazada: añade orden, entrega, particiones y depuración distribuida a un negocio con cero clientes.
- **Sin eventos, solo estado en tablas.** Rechazada: es la que hace imposible el Loop en la Fase 7, porque la historia no existiría.

## Consecuencias

**Positivas:** la historia queda desde la primera venta; la migración a bus es mecánica cuando llegue; el experimento E1 (tesis del ecosistema) es medible.

**Negativas:** disciplina de escribir contratos antes de codificar; la tabla de eventos crecerá y necesitará archivado eventual.

## Cómo se revierte

Dejar de emitir eventos. Se pierde la historia futura, no la pasada.
