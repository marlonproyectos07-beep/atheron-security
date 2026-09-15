# MVP REAL DE 30 DÍAS — ATHERON SECURITY

**Autor:** Agente A (Claude Code) · **Fecha:** 15 de septiembre de 2026
**Documento complementario de:** `docs/AUDIT-CLAUDE-v1.md`
**Estado:** PROPUESTO. No ejecutado.

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

### 🔴 M0 · Gate legal habilitante — BLOQUEANTE DE TODO
**Owner: Marlon** · Días 1–10 (en paralelo con lo demás, pero bloquea la venta)

| Tarea | Evidencia de terminado |
|---|---|
| Concepto jurídico escrito sobre Supervigilancia (las 4 preguntas de la auditoría §B.5) | PDF del concepto, con fecha y firma |
| Política de Tratamiento de Datos Personales redactada y publicada | URL pública |
| Aviso de privacidad y texto de autorización para el formulario | Texto aprobado, versionado |
| Verificar estado real: Odoo, WhatsApp BSP, pasarela, proveedor DIAN, SYSCOM | Tabla §B.11 completa, con contratos o cotizaciones |

> **Ninguna venta ocurre antes de cerrar M0.** Es la recomendación más incómoda de esta auditoría y la que más riesgo elimina. Si M0 revela que se requiere licencia, el plan comercial cambia — y es infinitamente mejor descubrirlo en el día 10 que en el día 300 con clientes instalados.

### 🟠 M1 · Los 5 productos, costeados de verdad
**Owner: Marlon + comercial** · Días 1–7

Para **cada uno** de los 5 productos de Línea Hogar:

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

Las 6 tablas de `ARCHITECTURE-OPTIONS-v1.md` §7.2 y cuatro endpoints:
`POST /leads` · `POST /events` · `POST /webhooks/{provider}` · `GET /health`

Con: idempotencia, verificación de firma, `correlation_id`, y logs estructurados.

**Evidencia:** commit + prueba que envía el mismo webhook dos veces y demuestra un solo efecto.

> **Esto es lo único de "plataforma" que se construye este mes.** Son días de trabajo y es lo que hace posible todo lo demás.

### 🟠 M3 · Una landing (no cinco)
**Owner: Agente A** · Días 8–16

Una plantilla, un producto publicado. Los otros cuatro se publican con la misma plantilla si el primero convierte.

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

**Costo: tres campos. Valor: es la única forma de saber si el ecosistema existe** (§B.3). Sin esto, la decisión sobre el Loop en la Fase 7 será una corazonada.

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
| **Segunda ciudad** | Diluye el único efecto de red disponible (K.11) |
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
| **G0** | Concepto Supervigilancia recibido + política de datos publicada | **PARAR.** No hay venta |
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
