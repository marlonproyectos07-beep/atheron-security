# ADR-0008 — Multiciudad y multiempresa

- **Estado:** PROPUESTO · **Fecha:** 2026-09-15
- **Propone:** Agente A · **Decide:** Marlon (con contador) · **Revisa:** Agente B

## Contexto

El Playbook trata multiciudad y multiempresa como el mismo problema. **No lo son:**

| | Multiciudad | Multiempresa |
|---|---|---|
| Naturaleza | Atributo de datos | Frontera legal y contable |
| Costo de prepararlo | Bajo | Alto |
| Costo de no prepararlo | **Alto**: reescribir consultas, URLs, precios | Bajo si el modelo es limpio |

Hallazgo adicional no contemplado en el Playbook: el ICA es un impuesto **municipal**, con tarifa y declaración por municipio. Operar en 10 ciudades puede implicar 10 registros y 10 declaraciones, con reglas de territorialidad. **REQUIERE FUENTE (concepto tributario)** — riesgo R16.

## Decisión

1. **`city` es atributo obligatorio desde el día 1** en Party, Lead, Order, Event, Installation y precios. Cuesta cero ahora.
2. **`company_id` existe en el modelo desde el día 1**, pero **hay una sola compañía real** hasta que un contador indique lo contrario por razón legal o fiscal — nunca por orden mental.
3. **Precios por ciudad desde el diseño** (flete, mano de obra y competencia difieren), aunque inicialmente todas las ciudades compartan la misma lista.
4. **`country_code` en direcciones desde el día 1.**
5. **El checklist de apertura de ciudad (Playbook §17) debe incorporar el bloque fiscal**: registro ICA, retenciones aplicables y responsable tributario local.
6. **Criterio de apertura de ciudad:** no se abre la ciudad 2 hasta alcanzar la métrica de dominio de Zipaquirá (decisión D10). La densidad local es el único efecto de red disponible y expandirse antes lo diluye.

## Alternativas consideradas

- **Multiempresa en Odoo desde el inicio.** Rechazada: contabilidad multi-compañía prematura es un impuesto permanente sin beneficio actual (riesgo R21).
- **Ignorar `city` y añadirlo cuando haga falta.** Rechazada: obliga a reescribir consultas, reportes y URLs sobre datos históricos sin el campo.

## Consecuencias

**Positivas:** replicabilidad real por ciudad; reportes por ciudad desde la primera venta; sin impuesto contable prematuro.

**Negativas:** un campo más en muchas tablas; disciplina de poblarlo siempre.

## Cómo se revierte

Trivial en un sentido (ignorar el campo); costoso en el otro (añadirlo después).
