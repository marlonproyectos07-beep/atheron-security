# ADR-0011 — Gobernanza documental: Google Drive vs repositorio

- **Estado:** PROPUESTO · **Fecha:** 2026-09-15
- **Propone:** Agente A · **Decide:** Marlon · **Revisa:** Agente B
- **Relacionado:** ADR-0000

## Contexto

Este proyecto ya tuvo su primer incidente de gobernanza documental: el Playbook maestro vivía únicamente en Google Drive, inaccesible para el entorno que debía ejecutarlo, y la auditoría se detuvo tres veces por falta de acceso a la fuente de verdad.

Tras el commit `2803907`, el Playbook existe en dos lugares. **Sin regla explícita, divergirán en semanas** — y entonces habrá dos verdades contradictorias, que es exactamente lo que el encargo pide evitar.

## Decisión

**Criterio único:** *si un agente o un desarrollador debe obedecerlo para escribir código, vive en el repositorio. Si es material de negocio para humanos, vive en Drive.*

| Google Drive | GitHub `/docs` |
|---|---|
| Contratos y documentos legales firmados | Playbook **vigente** (el que obliga) |
| Material de marketing y piezas gráficas | Modelo de datos y contratos de eventos |
| Actas, presentaciones, discusión abierta | Reglas de precio y de beneficios |
| Cotizaciones y anexos de proveedores | Políticas técnicas (seguridad, secretos, backups) |
| Borradores y lluvia de ideas | ADRs |

**Reglas:**
1. **El repositorio gana siempre.** Ante conflicto, `/docs` es la versión vigente. Sin excepción.
2. **Drive apunta al repositorio, nunca lo duplica.** El documento en Drive se reduce a un enlace y una nota: *"versión vigente en `/docs/brief/ecosystem-v1.md`"*. Mantener dos copias completas garantiza divergencia.
3. **Un solo Playbook vigente**, versionado por commits. Las versiones anteriores están en el historial de git, no en archivos `v2`, `v3`, `_final`.
4. **Toda decisión estructural pasa por ADR.** Un cambio anunciado en un chat, en un Doc o en una reunión **no existe** hasta que hay ADR fusionado.
5. **El Playbook no se edita silenciosamente.** Cambiar una regla que afecta implementación exige ADR que lo justifique y referencia cruzada.

## Alternativas consideradas

- **Todo en Drive.** Rechazada: no es accesible para los agentes ejecutores, no es diffeable, no tiene historial de decisiones — y ya falló en la práctica.
- **Todo en el repositorio.** Rechazada: los documentos comerciales y legales no pertenecen a un repositorio de código, y su audiencia no usa git.
- **Duplicar y sincronizar manualmente.** Rechazada: es la que garantiza el problema que este ADR busca evitar.

## Consecuencias

**Positivas:** una sola fuente de verdad por tipo de documento; el Playbook se vuelve auditable y diffeable; los agentes pueden leer lo que deben obedecer.

**Negativas:** requiere que quienes trabajan en Drive acepten que el repositorio manda; fricción para quien no usa git (mitigable: GitHub permite editar Markdown desde el navegador).

## Cómo se revierte

Volver a Drive como fuente de verdad. Ya se probó y falló.
