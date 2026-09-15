# OPCIONES DE ARQUITECTURA — ATHERON ECOSYSTEM v1

**Autor:** Agente A (Claude Code) · **Fecha:** 15 de septiembre de 2026
**Documento complementario de:** `docs/AUDIT-CLAUDE-v1.md`
**Estado:** PROPUESTO. Ninguna opción está aprobada.

> ⚠️ **Actualización v2 (15-sep-2026).** El Agente B aceptó la Opción B y pidió que Atheron Core sea **thin**. Se acepta: Core pasa de 6 tablas y 4 endpoints a **4 tablas (`party`, `identifier`, `consent`, `event`) y 3 endpoints**, sin lógica de negocio; el catálogo (`atheron_product`, `supplier_offer`) sale del día 1 y entra al integrar SYSCOM Colombia. La arquitectura conjunta recomendada está en **`docs/AUDIT-CLAUDE-v2.md` §12** y en ADR-0002 rev. v2. El §7.2 de este documento queda superado por esa revisión.

---

## 0. QUÉ DECIDE ESTE DOCUMENTO

Una sola pregunta, y todo lo demás se deriva de ella:

> **¿Dónde vive la relación con el cliente?**

El Playbook responde "en Odoo" (§4.4) y simultáneamente exige poder salir de Odoo (§4.5). Esas dos respuestas no son compatibles. Este documento presenta tres arquitecturas que responden distinto, y recomienda una.

La tesis del proyecto es *"la relación con el cliente es el activo"*. Si eso es cierto, **la decisión sobre dónde vive ese activo es la decisión arquitectónica más importante que se tomará**, y es mucho más difícil de revertir que la elección de framework, de nube o de lenguaje.

---

## 1. RESTRICCIONES QUE CUALQUIER OPCIÓN DEBE RESPETAR

Derivadas del Playbook y de la auditoría. No son preferencias.

| # | Restricción | Origen |
|---|---|---|
| R1 | Vender en 30 días. La arquitectura no puede retrasar la primera venta | Encargo §G |
| R2 | Poder cambiar de proveedor, frontend, canal o herramienta sin reconstruir | Playbook §4.5 |
| R3 | Odoo es la fuente de verdad **comercial y financiera** | Playbook §4.4 |
| R4 | Capturar identidad, eventos y consentimiento desde el día 1 (no retrofiteable) | Auditoría §E.4, §B.6 |
| R5 | Presupuesto y equipo pequeños. Nada que requiera un equipo de plataforma | Realidad del proyecto |
| R6 | Cumplir Ley 1581 y facturación electrónica DIAN | Auditoría §B.6, §C.7 |
| R7 | Ser replicable por ciudad sin reescribir | Playbook §4.8 |
| R8 | Todo dato del cliente debe poder exportarse íntegro cualquier día | Auditoría §C.12 |

**R4 y R8 son las que eliminan la opción A.**

---

## 2. OPCIÓN A — ODOO-CÉNTRICA (la propuesta implícita del Agente B)

### Forma

```
Landings ──────────► Odoo (CRM, ventas, inventario, facturación,
WhatsApp ──────────►        cartera, fidelización, beneficios,
SYSCOM   ──────────►        identidad, automatizaciones)
                              │
                              └──► Base de datos de Odoo
```

Todo vive en Odoo. Lo que Odoo no hace de fábrica se resuelve con módulos custom.

### A favor
- **Time-to-market mínimo.** Es la opción más rápida para vender.
- Una sola herramienta que aprender, un solo backup, un solo proveedor.
- Contabilidad, inventario y facturación resueltos por diseño.
- Costo inicial más bajo.

### En contra
- **Viola R2 y R8.** Cuando identidad, ledger y reglas viven como custom de Odoo, salir de Odoo es reconstruir Atheron.
- **La deuda es diferida y creciente.** Cada versión mayor de Odoo pone en riesgo los módulos custom. Las fuentes consultadas estiman actualizaciones de módulos custom entre USD 10.000 y 40.000, y describen la personalización no gobernada como el principal factor de riesgo de actualización ([Silent Infotech](https://silentinfotech.com/blog/odoo-1/odoo-community-vs-enterprise-true-cost-comparison-2026-461); [Carbon](https://carbon.ms/learn/why-odoo-implementations-fail) — consultados 15-sep-2026).
- **El ledger de beneficios no encaja.** El módulo de lealtad de Odoo es un motor de promociones, no un libro contable con sponsor y reversa auditable (auditoría §C.3). **REQUIERE PRUEBA E4.**
- **El activo estratégico queda dentro del sistema más difícil de migrar.** Si un día se vende la empresa o entra un socio, el due diligence encuentra el activo de datos atrapado en customizaciones.

### Veredicto
**Aceptable para los primeros 30 días. Inaceptable como destino.** El problema es que las arquitecturas provisionales se vuelven permanentes cuando funcionan, y esta funcionará lo suficiente como para que nadie quiera cambiarla hasta que sea carísimo.

---

## 3. OPCIÓN B — ODOO PARA EL DINERO + ATHERON CORE PARA LA RELACIÓN ✅ RECOMENDADA

### Forma

```
   Landings ─┐
   WhatsApp ─┼──► ATHERON CORE ──sincroniza──► ODOO
   Webhooks ─┘    (servicio propio)            (casi estándar)
                        │                           │
                        ▼                           ▼
                 PostgreSQL Atheron           BD de Odoo
                 · Party / Identifier         · Leads, cotizaciones
                 · Consent (append-only)      · Órdenes, facturas
                 · Event log (append-only)    · Inventario, compras
                 · Benefit ledger [después]   · Cartera, contabilidad
                 · Referral graph [después]
                        │
                        └──► Capa anticorrupción ──► SYSCOM CO / MX / futuros
```

### Principio rector

> **Odoo es el libro mayor del dinero. Atheron Core es la memoria de la relación.**
>
> Odoo sigue siendo la única fuente de verdad comercial y financiera (satisface R3 y el §4.4 del Playbook). Atheron Core es la única fuente de verdad relacional, y es portable (satisface R2, R4, R8 y el §4.5).

### Qué es realmente "Atheron Core" en el día 1

**No es una plataforma.** Es deliberadamente pequeño:

- Un servicio pequeño con unos pocos endpoints: recibir lead, recibir webhook, registrar evento, registrar consentimiento.
- Una base PostgreSQL gestionada con ~6 tablas.
- Un trabajo programado que empuja a Odoo.

Eso es todo. **Se puede construir en días, no en meses.** Lo que lo hace valioso no es su complejidad, sino que el `Party`, el `Event` y el `Consent` quedan en un lugar del que se pueden sacar íntegros cualquier día.

### A favor
- Satisface **todas** las restricciones R1–R8.
- El activo estratégico es portable desde el primer registro.
- El ledger de beneficios puede ser append-only de verdad (inmutable, con reversa auditable).
- La capa anticorrupción permite N proveedores sin reescribir el catálogo (auditoría §J.3).
- Odoo se mantiene casi estándar → actualizaciones baratas, menos deuda.
- Coincide con el patrón de la industria de motores de incentivos *headless* separados del ERP (K.13 de la auditoría).
- **Permite comprar el motor de lealtad más adelante en lugar de construirlo**, porque los datos ya están fuera y son propios.

### En contra
- Dos sistemas que sincronizar → riesgo de divergencia de datos.
- Requiere disciplina de idempotencia desde el inicio (ADR-0005).
- Ligeramente más lento que la Opción A para la primera venta (días, no semanas).
- Un componente propio que mantener y monitorear.

### Mitigación de su principal defecto
La divergencia entre Core y Odoo se controla con tres reglas simples:
1. **Dirección única de escritura por campo.** Cada campo tiene un dueño; el otro sistema solo lee. Nunca escritura bidireccional del mismo dato.
2. **Odoo es el dueño del dinero; Core es el dueño de la identidad.** El `atheron_party_id` viaja a Odoo como referencia, no como copia autoritativa.
3. **Reconciliación diaria** que reporta discrepancias a un humano. Barata, y detecta problemas antes de que se acumulen.

### Veredicto
**Recomendada.** Cuesta días más que la Opción A y elimina la deuda estructural que esos días ahorrarían.

---

## 4. OPCIÓN C — EVENT-DRIVEN COMPLETA CON CDP Y MICROSERVICIOS

### Forma

```
Fuentes ──► Bus de eventos (Kafka/RabbitMQ) ──► Consumidores
                     │
     ┌───────────────┼────────────────┬─────────────────┐
     ▼               ▼                ▼                 ▼
Servicio de     Servicio de      Servicio de        CDP / motor
 identidad       beneficios       catálogo         de lealtad
                                                   comercial
```

### A favor
- Es a donde se llega si el negocio alcanza 100 ciudades.
- Desacoplamiento real; consumidores independientes.
- Es lo que usan los referentes de la categoría (K.13).

### En contra
- **Viola R1 y R5 de forma flagrante.** Meses de trabajo antes de la primera venta.
- Introduce todos los problemas de sistemas distribuidos —orden, entrega, particiones, consistencia eventual, depuración distribuida— en un negocio que hoy tiene cero clientes.
- Costo de operación y de observabilidad desproporcionado.
- **Optimiza para un problema que Atheron no tiene y puede que nunca tenga.**

### Veredicto
**Rechazada para 2026–2027.** Es el destino posible, no el punto de partida. Y la Opción B migra a esta sin reescribir el modelo de datos — ese es precisamente el argumento a favor de la B.

---

## 5. COMPARACIÓN DIRECTA

Escala 1 (malo) a 5 (bueno) para Atheron **hoy**, con su realidad de equipo y presupuesto.

| Criterio | A · Odoo-céntrica | **B · Core + Odoo** | C · EDA completa |
|---|:---:|:---:|:---:|
| Time-to-market | **5** | 4 | 1 |
| Costo inicial | **5** | 4 | 1 |
| Costo de mantenimiento a 3 años | 2 | **4** | 2 |
| Complejidad operativa | **5** | 4 | 1 |
| Resiliencia | 3 | **4** | 4 |
| Escala a 10 ciudades | 3 | **5** | 5 |
| Escala a 100 ciudades | 1 | 4 | **5** |
| Independencia de Odoo (R2) | 1 | **5** | 5 |
| Propiedad y portabilidad de datos (R8) | 1 | **5** | 5 |
| Independencia de proveedores | 2 | **5** | 5 |
| Observabilidad | 2 | **4** | 3 |
| Seguridad y control de acceso | 3 | **4** | 3 |
| Encaje con el equipo actual | **5** | 4 | 1 |
| Reversibilidad de la decisión | 1 | **4** | 2 |
| **TOTAL** | **39** | **56** | **39** |

*A y C empatan por razones opuestas: A es demasiado poco para el destino, C demasiado para el presente.*

---

## 6. PROPUESTA AGENTE B vs PROPUESTA CLAUDE

Comparación honesta, incluyendo dónde el Agente B tiene razón.

| Dimensión | Propuesta Agente B (Playbook §8) | Propuesta Claude (Opción B) | ¿Quién tiene razón? |
|---|---|---|---|
| Fuente de verdad | Todo Odoo | Odoo = dinero · Core = relación | **Claude.** El Playbook se contradice a sí mismo (X1) |
| Identidad del cliente | Contactos de Odoo | `Party` canónico en Core | **Claude.** Sin merge/unmerge propio no hay identidad real (§C.2) |
| Beneficios | Módulo de fidelización de Odoo | Ledger append-only en Core | **Claude**, sujeto a la prueba E4 |
| Eventos | No especificado | Contratos + tabla append-only, sin bus | **Claude.** El Playbook no lo aborda |
| Frontend | Fuera de Odoo, no es fuente de verdad | Idéntico | **Empate.** El Playbook acierta |
| Proveedores | Estados de producto DESCUBIERTO→PUBLICADO | Los mismos + capa anticorrupción y modelo N ofertas | **Agente B en el diseño de estados** (es excelente). Claude añade el modelo multiproveedor |
| WhatsApp | "Canal integrado al CRM" | Igual, con economía de la ventana de 24 h y consentimiento | **Claude** añade lo que faltaba (§B.7) |
| Momento del Loop | Fase 7 | Captura en Fase 1, motor después | **Claude.** Los eventos no se recuperan (X4) |
| Multiempresa | Implícita | Una compañía hasta que haya razón legal | **Claude.** Multiempresa prematura es impuesto permanente |
| Roadmap de 9 fases | Secuencial | Colapsado: G0 legal → MVP → aprender | **Claude.** 9 fases antes de la primera venta es planificar en lugar de vender |
| Disciplina de gates | Con evidencia | Igual, + plan de reversión | **Agente B**, con una adición menor |
| Principios de negocio | Liquidez, no inventar, rentabilidad | Sin cambios | **Agente B.** Son mejores que los de la mayoría de proyectos |

**Resumen justo:** el Agente B acertó en los principios, en la disciplina de gates y en el diseño de estados de producto — que son cosas difíciles de acertar. Falló en dónde vive el dato, en cuándo se captura, y en la economía de los beneficios. **La diferencia entre ambas propuestas no es de estilo técnico: es sobre quién es dueño del activo que el propio Playbook declara como central.**

---

## 7. ARQUITECTURA RECOMENDADA — DETALLE DE IMPLEMENTACIÓN

### 7.1 Componentes del día 1 (mínimos)

| Componente | Responsabilidad | Nota |
|---|---|---|
| **Landing** | Captar, educar, convertir. SEO/CRO | Estática o renderizada. Rápida en móvil. No es fuente de verdad |
| **Atheron Core** | Party, Identifier, Consent, Event log, recepción de webhooks, idempotencia | Un servicio pequeño. Días de trabajo |
| **PostgreSQL** | Persistencia de Core | Gestionado. Backups automáticos **probados** |
| **Odoo** | CRM, ventas, inventario, facturación, cartera | Lo más estándar posible |
| **WhatsApp** | Conversación y cierre | Toda conversación deja evento |
| **Pasarela** | Cobro | Detrás de interfaz propia |

### 7.2 Esquema mínimo de Atheron Core

```sql
-- Identidad. La clave es opaca e inmutable: NUNCA teléfono ni documento.
party            (id uuid PK, type, display_name, city, created_at, merged_into uuid NULL)
identifier       (id, party_id FK, kind, value_normalized, verified_at,
                  UNIQUE(kind, value_normalized))

-- Evidencia legal. Append-only: nunca UPDATE, nunca DELETE.
consent          (id, party_id FK, purpose, granted bool, policy_version,
                  evidence jsonb, occurred_at)

-- La historia. Append-only. Es lo irrecuperable si no se captura hoy.
event            (id uuid PK, event_type, event_version, party_id NULL,
                  correlation_id, idempotency_key UNIQUE,
                  source, payload jsonb, occurred_at, recorded_at)

-- Defensa contra reintentos de webhook.
inbound_webhook  (id, provider, provider_event_id, signature_valid bool,
                  raw jsonb, processed_at NULL,
                  UNIQUE(provider, provider_event_id))

-- Catálogo desacoplado del proveedor: 1 producto Atheron, N ofertas.
atheron_product  (sku_atheron PK, name, status, published_at)
supplier_offer   (id, sku_atheron FK, supplier_id, supplier_sku,
                  cost, currency, stock, fetched_at)

-- FASE POSTERIOR — no construir todavía:
-- benefit_entry (id, party_id, grant_id, entry_type GRANT|REDEEM|EXPIRE|REVERSE,
--                amount, currency, sponsor_id, reverses_entry_id NULL, occurred_at)
```

**Seis tablas y dos en espera.** Eso es todo lo que se necesita para no hipotecar el futuro.

### 7.3 Reglas de integración no negociables

1. `Party.id` es UUID opaco. **Nunca** el teléfono, el documento o el email. Sin excepción.
2. Todos los identificadores se persisten **normalizados** (teléfono en E.164, email en minúsculas, documento sin puntos) y en su forma original.
3. Todo endpoint que reciba webhook exige clave de idempotencia y verifica firma.
4. Recepción ≠ procesamiento. El endpoint persiste y responde; el trabajo ocurre después.
5. `correlation_id` viaja desde la landing hasta la factura.
6. Un solo sistema escribe cada campo. Nunca escritura bidireccional del mismo dato.
7. Los eventos son inmutables. Corregir = emitir evento de corrección.
8. El consentimiento se captura **con** el lead, en el mismo evento, nunca después.
9. Todo importe lleva moneda explícita y el impuesto va desglosado.
10. Ningún secreto en el repositorio. Nunca.

### 7.4 Camino de evolución (y por qué la Opción B no encierra)

| Momento | Qué se añade | Qué NO cambia |
|---|---|---|
| Día 1–30 | Core mínimo + Odoo estándar + landing | — |
| Mes 2–3 | Ledger de beneficios; mantenimiento recurrente | El modelo de datos |
| Mes 4–6 | Capa anticorrupción de proveedores completa; catálogo | El modelo de datos |
| Mes 6–12 | Motor de reglas (o **compra** de un motor comercial — K.13) | El modelo de datos |
| Ciudad 2–10 | Particionado por ciudad; precios territoriales | El modelo de datos |
| Ciudad 10+ | **Bus de eventos** — los contratos ya existen (ADR-0003) | El modelo de datos |

> **El punto entero de la Opción B es que el modelo de datos nunca cambia.** Todo lo demás es reemplazable. Esa es la definición práctica de "plataforma, no cárcel" que el Playbook pide en §4.5 y que la Opción A no puede cumplir.

---

## 8. QUÉ SE DECIDE Y QUÉ NO SE DECIDE AQUÍ

**Se decide (sujeto a aprobación):** dónde vive la identidad, dónde vive el ledger, si hay bus de eventos, cómo se integran los proveedores, qué hace Odoo.

**NO se decide aquí, deliberadamente:** lenguaje de programación, framework del frontend, proveedor de nube, herramienta de despliegue. **Son decisiones reversibles y por eso no merecen un ADR ahora.** Elegirlas antes de tiempo es la forma más común de confundir actividad con progreso.

La única recomendación al respecto: elegir lo que el equipo ya sabe operar, y preferir aburrido sobre nuevo.

---

**Estado: PROPUESTO.** Requiere decisión D5 de Marlon y revisión del Agente B. Formalizado en ADR-0002.
