# ADR — Architecture Decision Records de Atheron

Un ADR documenta **una decisión arquitectónica que restringe la implementación**, junto con su contexto, las alternativas que se descartaron y las consecuencias que se aceptan.

## Para qué existen aquí

En un proyecto dirigido por varios agentes (Marlon, Agente B, Agente A, Agente C), los ADR cumplen tres funciones que ningún chat ni documento de Drive puede cumplir:

1. **Fuente de verdad única** sobre decisiones estructurales, versionada y diffeable.
2. **Mecanismo de arbitraje** ante desacuerdos entre agentes. La decisión se toma en un ADR aprobado por Marlon, no en la última conversación.
3. **Memoria del "por qué"**. Dentro de un año, nadie recordará qué alternativas se consideraron. El ADR sí.

## Cuándo se requiere un ADR

**Sí:** si la decisión es cara de revertir, afecta a más de un componente, define dónde viven los datos, introduce una dependencia externa, o tiene implicaciones legales o financieras.

**No:** elección de librería, nombres, estilo de código, o cualquier decisión reversible en una tarde.

## Estados

`PROPUESTO` → `ACEPTADO` → (`SUPERSEDIDO por ADR-XXXX` | `RECHAZADO`)

Un ADR aceptado **nunca se edita**: se supersede con uno nuevo. El historial de decisiones es parte del valor.

## Reglas

- Un cambio de arquitectura anunciado en un chat, en un Doc o en una reunión **no existe** hasta que hay ADR fusionado.
- Si el Agente A y el Agente B discrepan, ambas posiciones se registran en la sección "Posición divergente". Marlon decide. La divergencia queda en el historial.
- Los ADR de este directorio están **todos en estado PROPUESTO**. Ninguna decisión está tomada.

## Segunda pasada (v2)

Tras la revisión del Agente B (15-sep-2026), cuatro ADR llevan una sección **REVISIÓN v2** al final y hay dos ADR nuevos. La sección de revisión no reescribe la decisión original: la enmienda dejando visible qué cambió y por qué. Contexto completo en `docs/AUDIT-CLAUDE-v2.md`.

## Cierre v3 — 15-sep-2026

El Agente B cerró los tres desacuerdos residuales e incorporó una **corrección regulatoria** que supersede la conclusión de la v2 sobre el alcance del gate G0. Ver ADR-0014 rev. v3 y `docs/AUDIT-CLAUDE-v2.md` (nota de cierre). **No queda ningún desacuerdo abierto entre agentes.**

## Índice

| ADR | Decisión | Estado |
|---|---|---|
| [0000](0000-proceso-adr.md) | Proceso y plantilla de ADR | PROPUESTO |
| [0001](0001-identidad-canonica-cliente.md) | Identidad canónica del cliente y deduplicación | PROPUESTO |
| [0002](0002-frontera-odoo-atheron-core.md) | Frontera entre Odoo y Atheron Core | PROPUESTO · CERRADO v3 |
| [0003](0003-contratos-eventos-sin-bus.md) | Contratos de eventos sin bus de mensajes | PROPUESTO |
| [0004](0004-ledger-beneficios.md) | Ledger de beneficios append-only fuera de Odoo | PROPUESTO · CERRADO v3 |
| [0005](0005-idempotencia-webhooks.md) | Idempotencia, webhooks y reintentos | PROPUESTO |
| [0006](0006-secretos-y-entornos.md) | Gestión de secretos y entornos | PROPUESTO |
| [0007](0007-consentimiento-datos-personales.md) | Consentimiento y tratamiento de datos (Ley 1581) | PROPUESTO |
| [0008](0008-multiciudad-multiempresa.md) | Multiciudad y multiempresa | PROPUESTO · rev. v3 |
| [0009](0009-capa-anticorrupcion-proveedores.md) | Capa anticorrupción de proveedores | PROPUESTO · rev. v2 |
| [0010](0010-stack-frontend-landings.md) | Stack de frontend y landings | PROPUESTO |
| [0011](0011-gobernanza-documental.md) | Gobernanza documental: Drive vs repositorio | PROPUESTO |
| [0012](0012-observabilidad-minima.md) | Observabilidad mínima y trazabilidad del dinero | PROPUESTO |
| [0013](0013-modelo-comercial-hibrido.md) | Modelo comercial híbrido + mantenimiento recurrente | PROPUESTO · v2 |
| [0014](0014-alcance-servicios-regulados.md) | Alcance de servicios regulados y figura jurídica | PROPUESTO · rev. v3 · CRÍTICO |
