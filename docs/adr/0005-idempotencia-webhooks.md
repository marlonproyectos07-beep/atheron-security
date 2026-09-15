# ADR-0005 — Idempotencia, webhooks y reintentos

- **Estado:** PROPUESTO · **Fecha:** 2026-09-15
- **Propone:** Agente A · **Decide:** Marlon · **Revisa:** Agente B
- **Relacionado:** ADR-0003, ADR-0012

## Contexto

El Playbook no menciona idempotencia. En cuanto existan pasarela de pagos, WhatsApp y SYSCOM habrá tres fuentes de webhooks que **reintentan por diseño**. Sin idempotencia: leads duplicados, beneficios otorgados dos veces y, en el peor caso, cobros duplicados. El daño es silencioso y aparece en la conciliación (riesgo R07).

## Decisión

1. **Clave de idempotencia obligatoria.** Todo endpoint que reciba un webhook persiste `(provider, provider_event_id)` con índice único. La segunda llegada del mismo evento responde `200 OK` **sin efecto**.
2. **Verificación de firma antes de procesar.** Un endpoint de webhook sin verificación de firma es un endpoint público de escritura.
3. **Recepción ≠ procesamiento.** El endpoint persiste el evento crudo y responde rápido. El procesamiento ocurre después, con reintentos y backoff exponencial.
4. **Cola de fallidos (DLQ) visible por humanos.** Un webhook que falla en silencio es dinero perdido sin rastro.
5. **Nunca confiar en el orden de llegada.** Toda transición de estado debe ser conmutativa o llevar versión.
6. **Las operaciones salientes también son idempotentes.** Enviar la misma orden a un proveedor dos veces no debe crear dos órdenes.

## Alternativas consideradas

- **Confiar en que los proveedores no reintentan.** Rechazada: reintentan por diseño, está en sus contratos de API.
- **Deduplicar por contenido (hash del payload).** Rechazada: dos eventos legítimos pueden tener contenido idéntico (dos pagos iguales del mismo cliente).

## Consecuencias

**Positivas:** integraciones seguras ante reintentos; depuración posible (el evento crudo queda); base para reprocesar tras un fallo.

**Negativas:** una tabla más; los endpoints son algo más complejos que "recibir y procesar".

## Cómo se revierte

No conviene. Es una de las decisiones más baratas de tomar ahora y más caras de retrofitear.
