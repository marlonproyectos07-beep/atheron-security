# ADR-0010 — Stack de frontend y landings

- **Estado:** PROPUESTO · **Fecha:** 2026-09-15
- **Propone:** Agente A · **Decide:** Marlon · **Revisa:** Agente B

## Contexto

El Playbook menciona Next.js en el rol del Agente A (§13) pero no lo decide en ninguna parte, y el objetivo del MVP es vender en 30 días con SEO y conversión en móvil.

**Este ADR existe principalmente para dejar constancia de qué NO merece decidirse todavía.** Elegir herramientas antes de tiempo es la forma más común de confundir actividad con progreso.

## Decisión

**Requisitos, que son lo que realmente importa:**

1. **Móvil primero.** Objetivo: carga < 3 s en 4G, **medido con herramienta**, no percibido.
2. **SEO real:** HTML renderizado en servidor o estático, metadatos correctos, datos estructurados, URLs limpias por producto y ciudad.
3. **UTM capturado y persistido** en el backend, no solo en la analítica.
4. **Formulario con consentimiento granular** (ADR-0007) y `correlation_id`.
5. **El frontend no es fuente de verdad.** Solo escribe hacia Atheron Core (el Playbook ya lo establece; se mantiene).
6. **Una plantilla de landing, parametrizada por producto.** No cinco landings distintas.
7. **Despliegue con vista previa** por rama, para poder aprobar antes de publicar.

**Sobre la tecnología concreta:** se elige lo que el equipo ya sabe operar, prefiriendo **aburrido sobre nuevo**. Next.js cumple los requisitos; también los cumple un generador estático. **Es una decisión reversible y no debe bloquear el MVP.**

**Lo que explícitamente NO se decide aquí:** proveedor de nube, herramienta de despliegue, framework de CSS, gestor de estado. Todas reversibles en una tarde.

## Alternativas consideradas

- **Odoo Website para las landings.** Rechazada: menor control sobre rendimiento y SEO, y acopla la capa de adquisición al ERP — contra ADR-0002.
- **Constructor visual de terceros.** Aceptable para validar rápido, pero dificulta la captura de UTM y consentimiento en el backend propio, que es requisito no negociable.

## Consecuencias

**Positivas:** foco en requisitos verificables, no en preferencias de herramienta; libertad de cambiar sin ADR nuevo.

**Negativas:** la ausencia de una elección explícita puede generar discusión. Se resuelve con la regla "lo que el equipo ya sabe operar".

## Cómo se revierte

Reescribir landings es barato. Es justamente por eso que esta decisión es de bajo riesgo.
