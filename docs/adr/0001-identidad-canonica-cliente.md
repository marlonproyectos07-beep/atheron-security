# ADR-0001 — Identidad canónica del cliente y deduplicación

- **Estado:** PROPUESTO · **Fecha:** 2026-09-15
- **Propone:** Agente A · **Decide:** Marlon · **Revisa:** Agente B
- **Relacionado:** ADR-0002, ADR-0004, ADR-0007

## Contexto

El Playbook (§7) declara que toda persona o empresa debe tener ficha maestra y enumera campos, pero **no define clave canónica ni regla de deduplicación**. La tesis central del proyecto es que "la relación con el cliente es el activo" — y esa relación es, técnicamente, esta decisión.

Riesgo específico de este negocio: fusionar por error dos personas **expone la configuración del sistema de seguridad de una casa a otra persona**. El costo de un falso positivo es mucho mayor que el de un falso negativo (riesgo R09).

## Decisión

1. **`Party`** es la entidad raíz, con `id` **UUID opaco e inmutable**. Nunca el teléfono, el documento ni el email como clave primaria.
2. **`Identifier`** es una tabla aparte: `(party_id, kind, value_normalized, verified_at)` con unicidad sobre `(kind, value_normalized)`. Un Party tiene N identificadores.
3. **Normalización obligatoria:** teléfono en E.164, email en minúsculas y recortado, documento sin puntos ni espacios. Se persisten la forma normalizada y la original.
4. **Solo coincidencia determinística en la fase 1.** Nada probabilístico.
5. **Jerarquía de confianza:** documento verificado > teléfono verificado por OTP > email verificado > teléfono sin verificar.
6. **La fusión nunca es destructiva.** `merge` marca `merged_into` en el Party absorbido y conserva ambos registros. **`unmerge` debe existir desde el primer día.**
7. **Cola de revisión humana** para candidatos ambiguos. La fusión dudosa no se automatiza.

## Alternativas consideradas

- **Teléfono como clave primaria.** Rechazada: los números se reciclan y se comparten en familias. Sería la decisión más barata hoy y la más cara en dos años.
- **Contactos de Odoo como maestro.** Rechazada: sin merge/unmerge propio, sin verificación por identificador, y ata el activo al ERP (ADR-0002).
- **Matching híbrido determinístico + probabilístico desde el inicio.** Rechazada por ahora: el estándar de industria es híbrido ([Amperity](https://amperity.com/blog/identity-resolution-techniques-probabilistic-deterministic-hybrid), consultado 15-sep-2026), pero en esta categoría el costo de un falso positivo es desproporcionado. Se reconsidera con volumen.

## Consecuencias

**Positivas:** identidad portable y exportable; deduplicación auditable y explicable; fusiones reversibles; base sobre la que el Loop puede construirse o comprarse después.

**Negativas:** más tablas y más código que "un contacto en Odoo"; los duplicados no se resuelven solos y requieren revisión humana al principio.

## Cómo se revierte

Difícil, y esa es la razón de decidirlo ahora. Cambiar la clave canónica después exige reescribir la historia de eventos y de beneficios.
