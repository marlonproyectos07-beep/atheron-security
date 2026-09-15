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

---

## REVISIÓN v2 — 15-sep-2026 (tras revisión del Agente B)

**Corrección aceptada sin reservas.** El Agente B señala que **venta nacional y apertura operativa de ciudad son cosas distintas**. Tenía razón: la versión original de este ADR y la decisión D10 las confundían, y con ello bloqueaban innecesariamente la vía de crecimiento más barata.

**Tres modos operativos, no dos:**

| Modo | Qué es | Requiere | ICA / presencia | Gate |
|---|---|---|---|---|
| **M-1 · Venta nacional con despacho** | Solo equipo, sin instalación, a cualquier ciudad | Logística, garantía, logística inversa | Territorialidad `REQUIERE FUENTE` (concepto tributario) | Bajo |
| **M-2 · Venta con instalación en ciudad cubierta** | Equipo + instalación | Técnico certificado, agenda, inventario local | Sí, en esa ciudad | Medio |
| **M-3 · Apertura operativa de ciudad** | Presencia real | Técnicos, aliados, responsable, P&L, registro ICA, plan 90 días | Sí, completo | Alto — checklist §17 del Playbook |

**D10 corregida:** el freno *"no abrir la ciudad 2 hasta dominar Zipaquirá"* aplica **solo a M-3**. M-1 puede escalar temprano y es la forma más barata de medir demanda nacional antes de comprometer capital en una ciudad.

**Dos advertencias que acompañan la concesión:**

1. **M-1 tiene una trampa específica en seguridad.** Un equipo vendido sin instalar que el cliente monta mal genera soporte, garantía y una reseña negativa que dice "Atheron", no "mi instalación". **M-1 se restringe a productos genuinamente autoinstalables, etiquetados como tales, con guía y video.** No todo el catálogo va a M-1.
2. **M-1 cambia la pregunta jurídica** del ADR-0014: comercializar sin instalar puede tener tratamiento distinto a comercializar e instalar.

---

## REVISIÓN v3 — 15-sep-2026 · CORRECCIÓN REGULATORIA

**El modo M-1 pierde su condición de "gate bajo".** La revisión v2 lo habilitó sobre la base de que vender sin instalar podría quedar fuera del ámbito de Supervigilancia. **Esa premisa era errónea:** el artículo 52 del Decreto 356 de 1994 nombra la **comercialización** de forma expresa e independiente de la instalación (ADR-0014 rev. v3).

**Tabla corregida:**

| Modo | Qué es | Gate regulatorio | Otros requisitos |
|---|---|---|---|
| **M-1 · Venta nacional con despacho** | Solo equipo, sin instalación | **Permiso/registro Supervigilancia — igual que los demás** | Logística, garantía, logística inversa. Territorialidad ICA `REQUIERE FUENTE` |
| **M-2 · Venta con instalación en ciudad cubierta** | Equipo + instalación | **Permiso/registro Supervigilancia** | Técnico certificado, agenda, inventario local |
| **M-3 · Apertura operativa de ciudad** | Presencia real | **Permiso/registro Supervigilancia** | Técnicos, aliados, responsable, P&L, ICA, plan 90 días |

**Lo que se mantiene de la revisión v2 y sigue siendo válido:** la distinción entre los tres modos es correcta y útil — son operaciones distintas con logística, costos y riesgos distintos. Lo que cambia es que **ninguno de los tres es una vía para eludir el gate regulatorio.** M-1 sigue siendo la vía más barata de medir demanda nacional, pero **después** del permiso, no antes.

**Se mantiene igualmente** la advertencia sobre M-1 en seguridad: restringido a productos genuinamente autoinstalables, etiquetados como tales, con guía y video.
