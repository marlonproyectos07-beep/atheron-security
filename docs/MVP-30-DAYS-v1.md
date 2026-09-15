# MVP REAL DE 30 DÍAS — ATHERON SECURITY

**Autor:** Agente A (Claude Code) · **Fecha:** 15 de septiembre de 2026
**Documento complementario de:** `docs/AUDIT-CLAUDE-v1.md`
**Estado:** PROPUESTO. No ejecutado.
**Revisión 2 — 15-sep-2026**, tras la revisión del Agente B. Los cambios frente a la versión original están marcados con **`[v2]`** y explicados en `docs/AUDIT-CLAUDE-v2.md` §13.

---

## 0. LA REGLA QUE GOBIERNA ESTOS 30 DÍAS

> **El objetivo NO es tener una plataforma. Es tener una venta real, medida, con margen conocido y trazabilidad completa — y haber aprendido si la tesis del ecosistema tiene sustrato.**

Todo lo que no sirva a ese objetivo se aplaza, aunque esté en el Playbook, aunque sea interesante, aunque sea rápido de hacer.

**Criterio de corte que resuelve el 90% de las discusiones de alcance:**

| Pregunta | Si la respuesta es NO |
|---|---|
| ¿Esto acerca la primera venta? | Solo se hace si es irrecuperable después |
| ¿Es irrecuperable si no lo hago ahora? | Se aplaza |

Solo dos cosas son irrecuperables: **los eventos que no se registran** y **el consentimiento que no se captura**. Todo lo demás se puede construir después.

---

## 1. MUST NOW — DÍAS 1 A 30

Lo que sí o sí debe existir. Ordenado por dependencia.

### 🔴 M0 · Gate legal habilitante — **`[v2]` BLOQUEA LA INSTALACIÓN, NO TODO EL MVP**
**Owner: Marlon** · Días 1–10

> **`[v2]` Corrección aceptada del Agente B.** La versión original bloqueaba toda venta con instalación; era un gate romo. Lo correcto es bloquear **un alcance específico**: la instalación, y solo hasta confirmar la figura jurídica aplicable. Todo lo demás avanza en paralelo. Ver ADR-0014.

| Tarea | Evidencia de terminado |
|---|---|
| **`[v2]`** Concepto jurídico con las **3 preguntas precisas** del ADR-0014 (figura (a) vs (b) vs (c); umbral hacia monitoreo; responsabilidad por proveedor no inscrito) | PDF del concepto, con fecha y firma |
| **`[v2]`** Restricción inmediata: **prohibido mencionar monitoreo o respuesta** en toda pieza comercial hasta resolver | Revisión de textos, sin esperar al abogado |
| Política de Tratamiento de Datos Personales redactada y publicada | URL pública |
| Aviso de privacidad y texto de autorización para el formulario | Texto aprobado, versionado |
| Verificar estado real: Odoo, WhatsApp BSP, pasarela, proveedor DIAN, SYSCOM | Tabla §B.11 completa, con contratos o cotizaciones |

> **Ninguna venta ocurre antes de cerrar M0.** Es la recomendación más incómoda de esta auditoría y la que más riesgo elimina. Si M0 revela que se requiere licencia, el plan comercial cambia — y es infinitamente mejor descubrirlo en el día 10 que en el día 300 con clientes instalados.

### 🟠 M1 · **`[v2]`** El producto ancla, costeado de verdad
**Owner: Marlon + comercial** · Días 1–7

> **`[v2]`** Se costea **un producto ancla**, no cinco. Los otros cuatro se costean y publican solo si el ancla convierte. Criterio de selección:
> `puntaje = margen_contribución × demanda_búsqueda × (1 ÷ complejidad_instalación)`
> con tres restricciones duras: costo verificado con cotización, instalable en menos de medio día, sin dependencia de stock volátil.
>
> **Secuencia (desacuerdo residual D-R3):** el Agente A recomienda elegir el ancla **después** de M0 y de la decisión sobre venta nacional — si la instalación queda restringida, el ancla correcta es un producto autoinstalable, que es un producto distinto. La plantilla maestra (M3) **no depende del producto** y avanza en paralelo, así que esto no cuesta calendario.

Para el producto ancla (y después para cada uno de los restantes):

| Campo | Regla |
|---|---|
| SKU Atheron | Propio, **nunca** el SKU del proveedor |
| Costo directo verificado | Equipo + memoria + mano de obra + materiales. Con cotización de respaldo |
| Precio crédito / contado | Según la regla, **con el origen de 0,52 documentado** (§B.4) |
| Inicial mínima | ≥ costo directo (§C.6) |
| Margen de contribución | Calculado, no estimado |
| Alcance de instalación | Qué incluye y **qué NO incluye** — escrito |
| Garantía | Plazo, qué cubre, quién responde |
| Tiempo de entrega e instalación | Real, no aspiracional |

**Evidencia:** una hoja por producto, aprobada por Marlon. **Sin esto no se publica nada** (Playbook §4.7 y §4.3).

### 🟠 M2 · Atheron Core mínimo
**Owner: Agente A** · Días 5–12

> **`[v2]` Corrección aceptada del Agente B: Core **thin**.** De 6 tablas a 4, de 4 endpoints a 3. Definición operativa: *Core es un registrador, no un procesador; si contiene un `if` que codifica una regla comercial, ya no es thin.* Ver ADR-0002 rev. v2.

**4 tablas:** `party` · `identifier` · `consent` · `event`
**3 endpoints:** `POST /leads` · `POST /events` · `POST /webhooks/{provider}`

Sale del día 1: catálogo (`atheron_product`, `supplier_offer`) — entra al integrar SYSCOM Colombia.

Con: idempotencia, verificación de firma, `correlation_id`, y logs estructurados.

**Evidencia:** commit + prueba que envía el mismo webhook dos veces y demuestra un solo efecto.

> **Esto es lo único de "plataforma" que se construye este mes.** Son días de trabajo y es lo que hace posible todo lo demás.

### 🟠 M3 · **`[v2]`** Plantilla maestra de landing (no cinco landings)
**Owner: Agente A** · Días 8–16

Una **plantilla maestra parametrizada**, un producto publicado. Los otros cuatro se publican con la misma plantilla **solo si el ancla convierte** — si no convierte, el problema es la oferta o el precio, y replicar multiplica el error por cinco.

**`[v2]` Qué es fijo y qué es variable:**

| Fijo en la plantilla | Variable por producto |
|---|---|
| Estructura, jerarquía, formulario, consentimiento | Nombre, ficha, imágenes |
| Captura de UTM, `correlation_id`, ciudad | Precio contado / crédito / inicial |
| Bloque WhatsApp contextual | Alcance de instalación |
| Bloque de garantía y alcance | FAQ específica |
| Rendimiento y SEO técnico | Productos relacionados |

La plantilla **no depende del producto ancla** y puede construirse antes de elegirlo.

Requisitos duros:
- Móvil primero. **Objetivo de carga < 3 s en 4G**, medido con herramienta, no percibido.
- Formulario con: nombre, teléfono/WhatsApp, ciudad, producto de interés, **casilla de consentimiento separada para fines comerciales** (no preseleccionada, con enlace a la política).
- Captura de UTM completa (`source`, `medium`, `campaign`, `content`) persistida, no solo en la analítica.
- Botón de WhatsApp con mensaje contextual por producto.
- Precio contado y crédito visibles. Alcance de instalación visible. **Nada inventado.**
- FAQ que responda las objeciones reales.

**Evidencia:** URL + capturas móvil/escritorio + medición de velocidad + un lead de prueba con UTM verificado extremo a extremo.

### 🟠 M4 · Odoo CRM mínimo
**Owner: Agente A + Marlon** · Días 10–18

- Un solo pipeline, 5 etapas: Nuevo → Contactado → Cotizado → Ganado → Perdido.
- Motivos de pérdida obligatorios y cerrados (lista fija). **Es la fuente de aprendizaje más barata del mes.**
- Campos: `utm_*`, `city`, `atheron_party_id`, `correlation_id`, `origin_landing`.
- Plantilla de cotización con contado/crédito.
- **Odoo lo más estándar posible.** Cada customización requiere justificación escrita.

**Evidencia:** lead de prueba recorriendo landing → Core → Odoo con el mismo `correlation_id`, verificable en los tres.

### 🟠 M5 · WhatsApp operativo y registrado
**Owner: Marlon + Agente A** · Días 12–22

- Número verificado con BSP.
- **Máximo 3 plantillas** aprobadas: confirmación de contacto, envío de cotización, recordatorio de seguimiento.
- Toda conversación queda asociada al lead correcto en Odoo.
- SLA humano definido: primer contacto en < X minutos en horario hábil.
- **Diseñar el seguimiento para caer dentro de la ventana de 24 h siempre que sea posible** — es gratis (§B.7).

**Evidencia:** conversación de prueba registrada + tarifa de Colombia por categoría documentada (experimento E5).

### 🟠 M6 · Instrumentación de la tesis — el experimento E1
**Owner: Agente A** · Días 8–16 (va dentro de M3 y M4)

Tres campos adicionales en cada lead y cada venta:
1. Ciudad de residencia.
2. ¿Ha sido huésped de alguna de las 7 casas? (sí / no / no sabe)
3. ¿Cómo conoció a Atheron? (lista cerrada)

**`[v2]` Corrección aceptada del Agente B: la medición de v1 era defectuosa.** Los umbrales (<5% / 5–15% / >15%) eran falsa precisión sin tasa base; con ~100 leads en 90 días el intervalo de confianza atravesaba las tres bandas, así que el experimento no podía distinguir entre sus propias respuestas; y medía porcentaje bruto en lugar de **lift**.

**E1 rediseñado en tres partes:**

- **E1-A · Techo aritmético — se calcula HOY.** Contar los huéspedes distintos históricos de las 7 casas. Ese número acota el pozo máximo de solapamiento posible. Si son 300 personas, ninguna estrategia de venta cruzada sobre esa base mueve un negocio — y se sabe hoy, gratis, con datos que ya existen. **Es la pieza que faltaba y la más valiosa.**
- **E1-B · Prueba activa — semanas, no trimestres.** Ofrecer a los huéspedes históricos con consentimiento válido una oferta concreta de seguridad. Mide intención provocada, no coincidencia pasiva.
- **E1-C · Lift, no porcentaje.** `lift = P(compra | fue huésped) ÷ P(compra | no fue huésped)`. Decisión: **< 1,5** no construir el Loop · **1,5–3** registrar sin automatizar · **> 3** invertir · **si el intervalo cruza 1,5**, el dato aún no decide — y se dice, en lugar de fingir conclusión.

**Los tres campos del formulario se mantienen.** Siguen costando cero y siguen siendo necesarios; lo que cambia es que ya no pretenden ser un test por sí solos.

### 🟠 M7 · Cobro y facturación
**Owner: Marlon** · Días 15–25

- Pasarela integrada detrás de interfaz propia, con webhook idempotente.
- Facturación electrónica DIAN operativa (proveedor tecnológico conectado).
- Política escrita de crédito: inicial, cuotas, mora, y qué pasa si no paga.

**Evidencia:** una transacción de prueba cobrada y facturada con CUFE.

### 🟠 M8 · Protocolo de instalación verificable
**Owner: Marlon** · Días 15–25

**El Playbook lo trata como detalle operativo. Es el producto replicable** (§J.2, §L.1).

Checklist obligatorio por instalación:
- Serial de cada equipo registrado.
- Foto por punto instalado.
- Prueba de grabación verificada con el cliente presente.
- Firma o confirmación del cliente.
- Registro en el Pasaporte del Equipo.

**Evidencia:** checklist en papel o formulario + primera instalación documentada completa.

### 🟠 M9 · Observabilidad mínima
**Owner: Agente A** · Días 18–26

- Tres alertas: fallo de webhook de pago · lead recibido sin crear en CRM · error de integración.
- Un tablero de una página: leads del día, leads sin contactar > 2 h, ventas, errores.
- Backup de Core y de Odoo, **con una restauración real probada**.

**Evidencia:** captura del tablero + registro de la restauración de prueba.

### 🟠 **`[v2]`** M11 · Venta nacional sin instalación (modo M-1) — opcional
**Owner: Marlon** · Días 20–30 · **Solo si M0 y la decisión M2 lo permiten**

> **`[v2]` Corrección aceptada del Agente B:** venta nacional y apertura de ciudad son cosas distintas. La versión original las confundía y bloqueaba la vía de crecimiento más barata. Ver ADR-0008 rev. v2.

Vender equipo despachado a cualquier ciudad, **sin instalación**. Restringido a productos genuinamente autoinstalables, etiquetados como tales, con guía y video. Es la forma más barata de medir demanda nacional antes de comprometer capital en una ciudad.

**Trampa a evitar:** un equipo mal montado por el cliente genera una reseña que dice "Atheron", no "mi instalación". Por eso la restricción de catálogo no es opcional.

### 🟠 **`[v2]`** M12 · Prueba de mantenimiento recurrente
**Owner: Marlon** · Desde la primera instalación

Sin software, sin landing, sin pasarela. En la conversación de cierre de instalación se ofrece el plan (revisión anual, limpieza y reajuste, verificación de grabación, firmware, prioridad de agenda, garantía ampliada) y se registra: aceptación, precio aceptado sin fricción, motivo de rechazo.

**Criterio:** adopción > 20% → prioridad post-MVP por encima del Loop. Ver ADR-0013.

**Cuidado con el nombre:** mantenimiento ≠ monitoreo. El nombre del plan tiene consecuencias jurídicas (ADR-0014).

### 🟠 M10 · Venta real y medición
**Owner: todos** · Días 20–30

- **Al menos una venta real completa:** cobrada, facturada, instalada, con serial registrado.
- Margen realizado comparado con el estimado (experimento E2).
- Al día 30: leads, costo por lead, conversión por etapa, motivos de pérdida, margen real.

**Evidencia:** el dato. No el reporte de que existe el dato.

---

## 2. NEXT — DÍAS 31 A 60

Solo si el MVP cerró con datos.

| # | Qué | Por qué en NEXT y no ahora |
|---|---|---|
| N1 | **Oferta de mantenimiento recurrente a los primeros clientes** (experimento E9) | **La prueba más valiosa después del MVP.** Verisure: ~87% de ingreso recurrente (K.6). Puede cambiar el modelo de negocio |
| N2 | POC SYSCOM: las 7 preguntas de §B.8, por escrito | No bloquea la venta de los 5 productos. Contra sandbox, **nunca producción** |
| N3 | Publicar los 4 productos restantes | Solo si el primero convirtió |
| N4 | Seguimiento automatizado dentro de la ventana de 24 h | Requiere entender el costo real (E5) |
| N5 | Contenido SEO educativo | Es acumulativo y lento; empezar pronto, no urgente |
| N6 | Segunda plantilla de landing según lo aprendido | Requiere datos del primero |
| N7 | Certificación técnica interna | Requiere 10–20 instalaciones para escribir el protocolo real |
| N8 | Reporte de margen por producto en Odoo | Requiere ventas |

---

## 3. LATER — MESES 3 A 12

| Qué | Condición de entrada (no fecha) |
|---|---|
| Ledger de beneficios | Decisión D3 tomada + modelo de contribución con datos reales |
| Motor del Atheron Loop (o **compra** de uno — K.13) | Experimento E1 con solapamiento > 15% |
| Catálogo sincronizado con proveedor | POC SYSCOM respondido favorablemente |
| Ecommerce nacional | Fulfillment y garantías resueltos, no antes |
| Programa formal de aliados | > 200 clientes activos con recompra demostrada |
| Referidos con comisión | Antifraude operativo + tratamiento tributario resuelto |
| Segunda ciudad | Métrica de dominio de Zipaquirá alcanzada (D10) |
| Tiers automáticos | ≥ 12 meses de historia de eventos |
| Panel de cliente | Cuando el cliente lo pida más de una vez |

---

## 4. DO NOT BUILD YET — Y POR QUÉ

Esta lista es un compromiso. Si algo de aquí aparece en un sprint, es señal de que el foco se perdió.

| ❌ No construir | Razón concreta |
|---|---|
| **Motor de reglas del Loop** | Sin clientes no hay reglas que calibrar. Otorgar beneficios a mano a los primeros 200 clientes es más barato y enseña qué reglas escribir |
| **Tiers automáticos** | Los umbrales serían inventados. Y en categoría de baja frecuencia, los tiers por gasto casi no producen comportamiento (K.9) |
| **Household / beneficio familiar** | Vector de fraude #1 sin contramedidas maduras (§C.9) |
| **Redención en aliados** | Es conciliación contable con terceros, no marketing |
| **Referidos pagados** | Sin antifraude es una fuga de dinero. Auto-referido y referidos circulares son los vectores dominantes (§C.9) |
| **Next Best Action** | Un modelo entrenado con 50 clientes es superstición estadística |
| **App móvil** | El canal es WhatsApp. Una app sin uso diario es costo fijo y una tienda más que mantener |
| **Ecommerce nacional** | Sin fulfillment, devoluciones y garantías resueltos, cada venta remota es un problema futuro |
| **Dropshipping automático** | El propio Playbook lo marca como hipótesis. Requiere las 7 respuestas de §B.8 |
| **Segunda compañía legal** | Impuesto contable permanente sin beneficio actual (§C.5) |
| **`[v2]` Apertura operativa de ciudad (modo M-3)** | Diluye el único efecto de red disponible (K.11). **Precisión v2: el freno aplica solo a M-3. La venta nacional M-1 queda habilitada** (ADR-0008 rev. v2) |
| **Bus de eventos** | Los contratos sí; la infraestructura no. Sin volumen añade modos de fallo, no capacidad (ADR-0003) |
| **Multimoneda** | Basta con persistir moneda explícita. Construir conversión hoy es ficción |
| **Microservicios** | Un servicio pequeño. Dividirlo ahora multiplica la operación sin dividir la complejidad |
| **Data warehouse / BI** | PostgreSQL responde todas las preguntas de los primeros 12 meses |
| **Portal de aliados** | Antes de tener aliados activos, es una interfaz para nadie |

---

## 5. CRONOGRAMA

```
SEMANA 1  ████ M0 legal · M1 productos costeados · arranque M2
SEMANA 2  ████ M2 Core · M3 landing · M6 instrumentación
SEMANA 3  ████ M4 Odoo CRM · M5 WhatsApp · M7 cobro
SEMANA 4  ████ M8 instalación · M9 observabilidad · M10 VENTA REAL
```

Zona de riesgo conocida: **M0 no depende de Atheron.** Un concepto jurídico puede tardar más de 10 días. Por eso arranca el día 1 y todo lo demás avanza en paralelo — pero **la venta no ocurre hasta que M0 cierre.**

---

## 6. GATES CON CRITERIO BINARIO

| Gate | Criterio | Si falla |
|---|---|---|
| **G0** | **`[v2]`** Concepto con las 3 preguntas del ADR-0014 + política de datos publicada | **PARAR la instalación.** El resto del MVP avanza |
| **G1** | 5 productos con costo verificado y margen calculado | No publicar nada |
| **G2** | Landing en producción, < 3 s en móvil, consentimiento capturado | No invertir en pauta |
| **G3** | Un lead recorre landing → Core → Odoo con mismo `correlation_id` | No invertir en pauta |
| **G4** | WhatsApp con plantilla aprobada y conversación registrada | Seguimiento manual, sin automatizar |
| **G5** | Una venta cobrada, facturada con CUFE, instalada con serial | No escalar |
| **G6** | 30 días de datos: CPL, conversión, margen real, motivos de pérdida | No decidir la fase 2 a ciegas |

**Formato de evidencia obligatorio para cada gate:** URL · commit · prueba · captura (móvil y escritorio) · dato medido · **plan de reversión**.

---

## 7. LO QUE SE APRENDE EN 30 DÍAS

Al día 30 deben existir estas respuestas. Si no existen, el mes se gastó construyendo en lugar de aprendiendo:

1. ¿Se requiere licencia de Supervigilancia? **(bloqueante)**
2. ¿Cuál es el costo real por lead calificado?
3. ¿El margen realizado coincide con el 38,8% estimado?
4. ¿Qué porcentaje de compradores tuvo contacto previo con la capa de hospitalidad? **(la tesis del ecosistema)**
5. ¿Cuál es el motivo de pérdida más frecuente?
6. ¿Cuánto cuesta realmente WhatsApp en Colombia por lead nutrido?
7. ¿La capacidad técnica alcanza la calidad requerida?
8. ¿Alguien pagaría por mantenimiento recurrente?

**Las respuestas 4 y 8 son las que deciden si Atheron es un ecosistema o una empresa de seguridad muy bien operada.** Ambas son buenos negocios. Son negocios distintos, y solo los datos pueden decir cuál es este.

---

**Estado: PROPUESTO.** Requiere aprobación de Marlon y revisión del Agente B antes de ejecutar.
