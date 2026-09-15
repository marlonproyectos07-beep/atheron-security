# ADR-0000 — Proceso y plantilla de ADR

- **Estado:** PROPUESTO
- **Fecha:** 2026-09-15
- **Propone:** Agente A (Claude Code)
- **Decide:** Marlon · **Revisa:** Agente B

## Contexto

El proyecto tiene tres agentes y un director. El Playbook (§13) asigna al Agente B la arquitectura, el QA y la auditoría; el propio Playbook (§22) establece que el Agente A debe intentar romper el diseño del Agente B, y el encargo cierra con que el Agente B auditará al Agente A. **Esto deja al autor del diseño como revisor de quien lo audita, sin mecanismo definido para resolver un desacuerdo real** (contradicción X6 de la auditoría).

Además, el proyecto ya sufrió un incidente de gobernanza: el documento maestro vivía solo en Google Drive, inaccesible para el entorno que debía ejecutarlo.

## Decisión

Toda decisión arquitectónica estructural se toma mediante ADR en `docs/adr/`, aprobado por Marlon.

**Plantilla obligatoria:** Contexto · Decisión · Alternativas consideradas · Consecuencias (positivas y negativas) · Posición divergente (si la hay) · Cómo se revierte.

**Regla de arbitraje:** si el Agente A y el Agente B discrepan, ambas posiciones se escriben en "Posición divergente" con su argumento. Marlon decide. La divergencia queda registrada; no se borra.

## Alternativas consideradas

- **Decidir en conversación.** Rechazada: no deja rastro, no es replicable, y hace que gane quien habla último.
- **Documento único de arquitectura.** Rechazada: se edita y se pierde el porqué de cada decisión.

## Consecuencias

**Positivas:** trazabilidad de decisiones; mecanismo de arbitraje explícito; onboarding más rápido; criterio replicable a nuevas ciudades y nuevos integrantes.

**Negativas:** fricción de proceso. Mitigación: los ADR son cortos (una página) y solo se exigen para decisiones caras de revertir.

## Cómo se revierte

Abandonar el proceso. Costo: se pierde el mecanismo de arbitraje y se vuelve a decidir por conversación.
