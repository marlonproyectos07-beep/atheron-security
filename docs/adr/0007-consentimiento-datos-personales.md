# ADR-0007 — Consentimiento y tratamiento de datos personales (Ley 1581)

- **Estado:** PROPUESTO · **Fecha:** 2026-09-15
- **Propone:** Agente A · **Decide:** Marlon (con asesor jurídico) · **Revisa:** Agente B
- **Relacionado:** ADR-0001, ADR-0003

## Contexto

El Playbook menciona "consentimiento" como un campo de la ficha (§7) y nada más. No hay política, finalidades, responsable, procedimiento ARCO ni retención.

La Ley Estatutaria 1581 de 2012 desarrolla el habeas data del artículo 15 constitucional, exige **autorización previa, expresa e informada**, otorga derechos de conocer, actualizar, rectificar, suprimir y revocar, y la SIC puede imponer multas de hasta **2.000 SMMLV** ([Ley 1581](https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/ley_1581_2012.htm); [SoftGRC](https://softgrc.com/blog/que-es-habeas-data) — consultados 15-sep-2026).

**Lo crítico para este proyecto:** el ecosistema depende de un **consentimiento de finalidad cruzada** (usar el dato de una compra de seguridad para ofrecer un aliado gastronómico) que el Playbook nunca diseñó. Y no es retrofiteable sobre la base histórica (riesgo R04).

## Decisión

1. **Consentimiento granular por finalidad**, no un único "acepto todo". Finalidades mínimas separadas:
   - `SERVICE` — gestionar la compra, instalación y soporte (base del contrato)
   - `MARKETING_OWN` — comunicaciones comerciales de Atheron
   - `MARKETING_ECOSYSTEM` — ofertas de líneas de negocio distintas y aliados
   - `DATA_SHARING_PARTNER` — transferencia a un aliado identificado
2. **Casilla separada y no preseleccionada** para cada finalidad comercial, con enlace a la política vigente.
3. **`Consent` es append-only** (ADR-0003). Revocar = nuevo registro con `granted=false`, nunca borrar el anterior. Es evidencia legal.
4. **Se persiste la evidencia:** timestamp, IP, user-agent, **versión de la política** y el texto exacto mostrado en ese momento.
5. **El consentimiento viaja dentro del evento `LeadCreated`**, no se captura después.
6. **Ningún envío de marketing sin `MARKETING_*` vigente.** Aplica a WhatsApp, correo y SMS. Verificación en el código, no en el criterio de quien envía.
7. **Procedimiento ARCO operativo** antes del primer lead: canal de contacto, responsable y plazo de respuesta.
8. **Política de retención** por tipo de dato. El video y las configuraciones del Pasaporte del Equipo requieren tratamiento reforzado.
9. **REQUIERE FUENTE:** validación de los textos y del registro de bases de datos ante la SIC con asesor jurídico colombiano.

## Alternativas consideradas

- **Consentimiento único global.** Rechazada: no cumple el principio de finalidad y hace inutilizable el dato para el ecosistema.
- **Pedir consentimiento cuando se lance el Loop.** Rechazada: no se puede pedir retroactivamente sobre la base ya construida. **Este es el punto entero de este ADR.**

## Consecuencias

**Positivas:** el ecosistema nace legalmente viable; evidencia defendible ante la SIC; el cliente entiende a qué accede.

**Negativas:** formulario más largo; tasa de aceptación de marketing menor que un "acepto todo" (y esa es precisamente la diferencia entre una base utilizable y una base contaminada).

## Cómo se revierte

No se revierte. Es requisito legal.
