# AUDITORÍA DE ARQUITECTURA — ATHERON ECOSYSTEM v1

**Autor:** Agente A (Claude Code) — rol CTO fundador escéptico
**Fecha de auditoría:** 15 de septiembre de 2026
**Insumos auditados:**
- `docs/brief/ecosystem-v1.md` — Atheron Playbook v1.0 (Agente B)
- `docs/brief/encargo-auditoria.md` — Encargo de auditoría (Agente B)
**Rama:** `claude/audit-atheron-ecosystem-v1`
**Estado:** propuesta de auditoría. NO implementada. NO fusionada.

> ⚠️ **Documento superado en parte.** Tras la revisión del Agente B existe una segunda pasada: **`docs/AUDIT-CLAUDE-v2.md`**, que corrige cuatro puntos de este documento (gate legal romo, tamaño de Atheron Core, diseño del experimento E1, y confusión entre venta nacional y apertura de ciudad) y reduce los desacuerdos a tres. **Ante discrepancia, v2 es la versión vigente.** Este documento se conserva íntegro como registro del razonamiento original.

---

## CÓMO LEER ESTE DOCUMENTO

Toda afirmación lleva una etiqueta de veracidad:

| Etiqueta | Significado |
|---|---|
| **CONFIRMADO** | Verificado contra el texto de los briefs, contra aritmética reproducible, o contra una fuente externa citada con fecha. |
| **HIPÓTESIS** | Afirmación del Playbook o mía que es razonable pero no está probada. Se puede actuar sobre ella asumiendo el riesgo, marcándola como tal. |
| **REQUIERE FUENTE** | No pude verificarlo con las herramientas disponibles. Necesita documento, cotización, contrato o concepto profesional antes de decidir. |
| **REQUIERE PRUEBA** | Solo se resuelve ejecutando un experimento técnico o comercial concreto. Incluye el experimento propuesto. |

Donde el Playbook afirma algo sin evidencia, lo digo. Donde yo afirmo algo sin evidencia, también lo digo.

**Nota de honestidad sobre el alcance de mi verificación:** no tengo acceso al catálogo de Atheron, a las cotizaciones de proveedor, a los contratos de las siete casas, a la contabilidad, ni a ninguna instancia de Odoo. Todo lo referido a costos, márgenes reales y capacidades contratadas es, para mí, no verificable. Lo trato como tal.

---

## RESUMEN EJECUTIVO — LO QUE IMPORTA SI SOLO LEE UNA PÁGINA

El Playbook es **muy bueno como documento de disciplina y muy débil como documento de arquitectura.** Sus principios (liquidez antes que crecimiento, no inventar, gates con evidencia, replicabilidad) son mejores que los de la mayoría de proyectos en esta etapa. Su modelo de datos, su modelo de dinero y su modelo legal no existen todavía.

Los cinco hallazgos que cambian decisiones:

1. **Riesgo legal no mencionado, potencialmente existencial.** El Playbook no menciona ni una vez a la Superintendencia de Vigilancia y Seguridad Privada. El Decreto 356 de 1994 regula, entre otros, la *comercialización, instalación y utilización de equipos para vigilancia y seguridad privada*. Si esa actividad requiere licencia para el modelo que Atheron quiere operar, **todo el plan comercial está construido sobre una base que puede ser ilegal de operar.** Esto debe resolverse con concepto jurídico ANTES de la primera venta, no después. Es un bloqueante, no un riesgo.

2. **La aritmética de márgenes no sobrevive al apilamiento de beneficios.** La regla financiera del Playbook produce 38,8% de margen bruto de contado — la verifiqué y es correcta. Pero si sobre ese precio se aplica el tope de la escalera Loop (20%), más referido (5%), más pasarela de pagos (~3%), el margen de contribución cae a aproximadamente **15%**, antes de CAC, garantías, devoluciones y sobrecostos de instalación. El Playbook diseña la escalera 5/10/15/20 sin haber calculado esto. Lo calculo abajo, en detalle.

3. **La historia fundadora y el MVP son dos negocios distintos con dos clientes distintos.** El origen es 1.000 turistas chinos saliendo de la Mina de Sal. El MVP son 5 productos de Línea Hogar para residentes. Un turista chino en tránsito no compra una cámara instalada en Zipaquirá, y un residente de Zipaquirá no necesita hospedaje en Zipaquirá. **La tesis de identidad única asume un solapamiento entre segmentos que nadie ha medido.** Si ese solapamiento es pequeño, el Atheron Loop no tiene sustrato y el ecosistema es una colección de negocios que comparten logo.

4. **El Atheron Loop está en la Fase 7, pero la identidad del cliente debe capturarse desde la Fase 1.** Los eventos no son recuperables retroactivamente. Si no se registra desde la primera venta quién compró, de dónde vino y con qué consentimiento, en la Fase 7 no habrá historia sobre la cual construir el Loop. **La separación correcta no es "Loop ahora vs Loop después", sino "capturar ahora, decidir después".** Capturar es barato. El motor de beneficios es caro. Son dos decisiones distintas que el Playbook trata como una.

5. **El moat que el Playbook cree tener no es el que realmente tiene.** El programa de fidelización cross-vertical es la parte *más copiable y más cara* del plan: ya existe, a escala, en Rakuten (desde 2002), Grab, Accor ALL y, en Colombia, Puntos Colombia (13 millones de clientes, más de 100 marcas). El moat real y defendible de Atheron es aburrido y físico: **la base instalada con seriales, el historial de mantenimiento, y la densidad de técnicos en una ciudad secundaria.** Nadie más sabe qué hay instalado en esa casa. Eso no se copia con una app.

**Veredicto:** no construir el ecosistema. Construir un negocio de seguridad rentable con instrumentación desde el día uno, y dejar que los datos decidan si el ecosistema existe.

---

# A. QUÉ ESTÁ FUERTE

No es cortesía. Estas decisiones son correctas y deben protegerse de futuras "mejoras".

## A.1 El principio 4.2 (liquidez antes que crecimiento) — CONFIRMADO como correcto

Un negocio de hardware con instalación tiene capital de trabajo negativo si se financia al cliente sin disciplina. El Playbook lo ve. La frase *"la inicial del crédito no debe dejar a Atheron financiando el capital invertido"* es la restricción financiera más importante del documento y está bien planteada. **Recomendación: convertirla en fórmula dura, no en intención** (ver §C.6).

## A.2 El principio 4.3 (no inventar) — la mejor decisión del documento

Prohibir publicar precios, alianzas, garantías, certificaciones y disponibilidad no verificadas es, en el sector de seguridad, protección legal además de higiene comercial. En Colombia la publicidad engañosa es sancionable por la SIC. Este principio debe elevarse a gate bloqueante automatizado, no quedarse como cultura.

## A.3 Los estados de producto (DESCUBIERTO → EN REVISIÓN → APROBADO → PUBLICADO → PAUSADO → AGOTADO)

Es una máquina de estados real, correcta, y resuelve el problema más común de las integraciones con mayoristas: publicar catálogo ajeno sin curaduría. **Es la mejor pieza de diseño del Playbook.** La adopto sin cambios en mi arquitectura propuesta (§ARCHITECTURE-OPTIONS, Opción B).

## A.4 "No publicar todo el catálogo mayorista" y "no prometer dropshipping automático hasta verificar"

Correcto y poco común. La mayoría de proyectos hace exactamente lo contrario y descubre el problema cuando el cliente reclama. El Playbook ya trata el dropshipping como HIPÓTESIS explícita. Mantener.

## A.5 El "Pasaporte del Equipo" (§12)

**Subvalorado por su propio autor.** El Playbook lo presenta como un registro operativo. Es, en realidad, el activo defendible más fuerte del plan completo (ver §L). Serial + instalación + técnico + configuración + garantía + mantenimiento + incidentes es información que ningún competidor puede reconstruir y que hace que reemplazar a Atheron sea costoso para el cliente por razones legítimas, no por captura.

## A.6 Los gates con evidencia (§H del encargo)

*"Nunca decir terminado sin URL, commit, test, captura, dato, evidencia."* Esto es disciplina de ingeniería seria. Lo formalizo en §H con una plantilla verificable.

## A.7 La separación explícita HOGAR / COMERCIAL / INDUSTRIAL

Tres motores comerciales distintos (compra rápida / venta consultiva / proyecto de ingeniería) con ciclos, márgenes y riesgos distintos. Reconocerlo temprano evita el error clásico de tratar todo con el mismo pipeline. Correcto.

## A.8 Reconocer que "no todo beneficio es descuento" (§6.3)

Upgrades, check-in preferente, asesoría y servicios de bajo costo marginal son beneficios con costo real muy inferior a su valor percibido. Es la única forma de que una escalera de beneficios no destruya margen. El Playbook lo ve; su propia escalera 5/10/15/20 lo contradice (ver §B.2).

## A.9 La estructura de auditoría multiagente (§22) — buena intención, gobernanza rota

La idea de que un agente diseñe y otro intente romper el diseño es correcta. La implementación tiene un defecto de gobierno que documento en §B.9.

---

# B. QUÉ ESTÁ DÉBIL

## B.1 CONTRADICCIÓN ESTRUCTURAL #1 — "Una sola fuente de verdad en Odoo" vs "Odoo no debe ser una cárcel"

**CONFIRMADO (contradicción textual).**

- §4.4: *"Odoo debe centralizar: clientes, oportunidades, ventas, compras, cartera, seguimiento, **beneficios**, trazabilidad."*
- §4.5: *"Debe ser posible cambiar proveedor, frontend, herramienta, canal, sin reconstruir toda Atheron."*

Ambas no pueden ser verdad al mismo tiempo para el mismo conjunto de datos. Si el ledger de beneficios, la identidad del cliente y la lógica del Loop viven como customizaciones dentro de Odoo, entonces **migrar de Odoo equivale a reconstruir Atheron** — que es exactamente lo que §4.5 prohíbe.

**Impacto:** alto y diferido. No duele en el año 1. Duele en el año 3, cuando Odoo Enterprise sube de precio, cuando una versión mayor rompe los módulos custom, o cuando un socio quiere comprar la empresa y descubre que el activo de datos está atrapado en customizaciones de un ERP.

Evidencia externa de que esta deuda es real: *"Mantener y actualizar un entorno Odoo fuertemente personalizado puede volverse extremadamente costoso y operativamente riesgoso"*; las actualizaciones de módulos custom se estiman entre USD 10.000 y 40.000 ([Silent Infotech, Odoo Community vs Enterprise 2026](https://silentinfotech.com/blog/odoo-1/odoo-community-vs-enterprise-true-cost-comparison-2026-461); [Carbon, *Why Odoo implementations fail*](https://carbon.ms/learn/why-odoo-implementations-fail), consultados 15-sep-2026). Nótese que el propio Odoo comercializa el argumento contrario ([Odoo Blog, *Vendor Lock-In*](https://www.odoo.com/blog/business-hacks-1/vendor-lock-in-break-free-from-operational-bottlenecks-with-odoo-2177)); es marketing del vendedor y debe leerse como tal.

**RESOLUCIÓN PROPUESTA — distinguir dos "verdades" distintas, que el Playbook confunde:**

| Dominio | Sistema de registro | Razón |
|---|---|---|
| Dinero, impuestos, inventario, cartera, facturación DIAN | **Odoo** | Es lo que un ERP hace bien, es auditable, y es lo que un contador y la DIAN esperan. |
| Identidad del cliente, log de eventos, ledger de beneficios, consentimiento | **Atheron Core (fuera de Odoo)** | Es el activo estratégico. Debe ser portable, exportable y sobrevivir a cualquier cambio de ERP. |

Odoo sigue siendo la única fuente de verdad **comercial y financiera**. Atheron Core es la única fuente de verdad **relacional**. Se sincronizan; no compiten. Esto satisface §4.4 y §4.5 simultáneamente. Ver ADR-0002 y ADR-0004.

---

## B.2 CONTRADICCIÓN ESTRUCTURAL #2 — La escalera 5/10/15/20 contra la aritmética del propio Playbook

**CONFIRMADO (aritmética reproducible).**

Primero verifico la regla financiera del Playbook. Sea el costo directo = 1,00.

```
Precio crédito  = 1,00 ÷ 0,52          = 1,9231
Precio contado  = 1,9231 × 0,85        = 1,6346
Margen bruto contado = (1,6346 − 1,00) ÷ 1,6346 = 38,82 %
```

**El 38,8% del Playbook es aritméticamente correcto.** Confirmado.

Ahora aplico lo que el mismo Playbook propone encima de ese precio:

| Escenario | Precio | Costo | Comisiones | Contribución | Margen |
|---|---|---|---|---|---|
| Contado, cliente nuevo, sin pasarela | 1,6346 | 1,0000 | 0 | 0,6346 | **38,8 %** |
| Contado + pasarela (2,65% + IVA ≈ 3,15%) | 1,6346 | 1,0000 | 0,0515 | 0,5831 | **35,7 %** |
| + Loop nivel 1 (5 %) | 1,5529 | 1,0000 | 0,0489 | 0,5040 | **32,5 %** |
| + Loop nivel 2 (10 %) | 1,4711 | 1,0000 | 0,0463 | 0,4248 | **28,9 %** |
| + Loop nivel 3 (15 %) | 1,3894 | 1,0000 | 0,0438 | 0,3456 | **24,9 %** |
| + Loop nivel 4 (20 %) | 1,3077 | 1,0000 | 0,0412 | 0,2665 | **20,4 %** |
| + Loop 20 % **y** referido 5 % | 1,3077 | 1,0000 | 0,1066 | 0,2011 | **15,4 %** |

*(Tarifa de pasarela tomada de Wompi: 2,65% + $700 + IVA — [Mentora Colombia, comparativa 2026](https://mentoracolombia.com/pasarelas-de-pago-colombia-2026-comisiones-wompi-bold-mercadopago/), consultado 15-sep-2026. El componente fijo de $700 no está modelado aquí porque depende del ticket; en tickets bajos empeora el resultado.)*

**Lectura dura: la escalera de beneficios completa, combinada con el referido, consume el 60% del margen bruto.** Y ese 15,4% aún no paga: CAC, sobrecostos de instalación, garantías, devoluciones, transporte, soporte postventa, ni un solo peso de estructura.

El Playbook dice *"Nunca deben acumularse descuentos que destruyan rentabilidad"*, pero **no define la regla de no-acumulación**, no define piso de margen, y coloca la escalera como progresión automática por nivel. Una regla de negocio sin implementación es una intención.

**RESOLUCIÓN PROPUESTA:**

1. **Piso de margen duro, verificado en el motor de precios, no en la buena voluntad.** Ninguna combinación de beneficios puede dejar el margen de contribución por debajo de un umbral X (propongo 25% como punto de partida, a validar con la contabilidad real). Si la combinación viola el piso, el beneficio no se otorga: se degrada a un beneficio no-monetario.
2. **Prohibir apilar descuento porcentual con comisión de referido sobre la misma transacción.** Uno u otro.
3. **Migrar la escalera de descuento a escalera de valor.** Nivel 1–2 = beneficios de bajo costo marginal (upgrade, prioridad de agenda, asesoría, revisión anual). Nivel 3–4 = beneficios con costo real, pero financiados por *sponsor* (el aliado que quiere el tráfico), no por el margen de Atheron.
4. **Sunset y tope por cliente/año.** Sin vencimiento y sin tope, el pasivo por beneficios crece sin control (ver §C.9).

**Estado del 5/10/15/20: HIPÓTESIS NO VALIDADA. Recomiendo NO publicarla, ni siquiera internamente como promesa, hasta que exista el modelo de contribución con datos reales.**

---

## B.3 CONTRADICCIÓN ESTRUCTURAL #3 — La historia fundadora no describe al cliente del MVP

**CONFIRMADO (contradicción textual entre §1 y §15).**

- §1: el origen es la observación de ~1.000 turistas chinos sin oferta articulada de restaurante, hotel y experiencias.
- §15 FASE 1: el MVP son **5 productos de Línea Hogar** — cámaras instaladas para residentes.

Son dos empresas distintas:

| | Turista de la Mina de Sal | Residente de Zipaquirá |
|---|---|---|
| Frecuencia | Una vez en la vida | Recurrente |
| Ticket | Bajo, inmediato | Alto, considerado |
| Decisión | Impulso, minutos | Evaluada, días/semanas |
| Necesita seguridad para su hogar en Zipaquirá | No | Sí |
| Necesita hospedaje en Zipaquirá | Sí | No |
| Vuelve a comprar | Casi nunca | Sí |
| Le sirve una identidad única Atheron | Marginalmente | Sí |

**El Atheron Loop conecta clientes que, en su mayoría, no son la misma persona.** La tesis "el que se hospedó en Zipaquirá compra una cámara desde Medellín" (§7) es un caso de uso elegante que puede tener una frecuencia cercana a cero. El Playbook lo presenta como "ejemplo objetivo" sin dato alguno.

**Impacto:** si el solapamiento entre segmentos es bajo, la venta cruzada — que es el corazón económico del ecosistema — no tiene sustrato, y Atheron es un holding de PyMEs con marca común. Eso puede ser un buen negocio, pero es un negocio **distinto** al descrito, y no justifica invertir en una plataforma de identidad unificada.

**RESOLUCIÓN PROPUESTA — esta es la prueba más barata y más importante del proyecto:**

> **EXPERIMENTO E1 (REQUIERE PRUEBA):** durante los primeros 90 días, registrar en cada lead y cada venta: ciudad de residencia, si ha sido huésped de alguna de las 7 casas, y cómo llegó. Al día 90, calcular: *¿qué porcentaje de compradores de Línea Hogar tuvo contacto previo con la capa de hospitalidad, y viceversa?*
>
> - Si es **< 5 %**: el ecosistema cross-vertical no está justificado. Atheron es dos negocios. NO construir el Loop.
> - Si es **5–15 %**: hay señal. Construir solo el registro, no el motor.
> - Si es **> 15 %**: la tesis tiene sustrato real. Invertir.
>
> Costo del experimento: tres campos en un formulario. Costo de no hacerlo: construir una plataforma de identidad unificada para un solapamiento que no existe.

Esta prueba no requiere tecnología. Requiere disciplina de registro desde la primera venta. **Es la razón por la cual la captura debe existir en el día 1 aunque el Loop esté en la Fase 7.**

---

## B.4 CONTRADICCIÓN ESTRUCTURAL #4 — "No inventar" vs los números del propio Playbook

**CONFIRMADO.** §4.3 prohíbe publicar precios, garantías y beneficios no verificados. El propio Playbook contiene, sin fuente:

| Afirmación del Playbook | Estado real |
|---|---|
| Escalera 5/10/15/20 | El Playbook la marca como hipótesis. **Correcto.** |
| Referidos 5% por cierre | *"base conceptual actual, pendiente formalización"*. Marcado. **Correcto.** |
| Margen 38,8% | Presentado como resultado. Aritméticamente correcto, pero es **margen bruto sobre costo directo**, no margen de contribución. La palabra "margen" sin calificar, en un documento que va a guiar decisiones de precio, es peligrosa. **Corregir la redacción.** |
| Divisor 0,52 y factor 0,85 | **REQUIERE FUENTE.** No hay justificación documentada de por qué 0,52. ¿De dónde sale? ¿Es margen objetivo de la industria, de un competidor, de un cálculo previo? Una constante mágica en la fórmula de precios de toda la empresa debe tener origen documentado. |
| ~1.000 turistas chinos | **REQUIERE FUENTE.** Es una observación personal, no un dato. No sirve para dimensionar un mercado. |
| "7 casas para hospedaje" | **REQUIERE FUENTE** (ocupación, tarifa media, estacionalidad, propias vs administradas). Es el único activo con historia real y no hay un solo número sobre él en el Playbook. |

**El riesgo no es la mentira, es la erosión.** Un documento que exige rigor y contiene constantes sin origen enseña al equipo que el rigor es retórico.

**RESOLUCIÓN:** cada constante financiera del Playbook debe tener una nota al pie con su origen y su fecha de última revisión. Si no la tiene, se marca `[ORIGEN PENDIENTE]` explícitamente en el documento.

---

## B.5 AUSENCIA CRÍTICA — Regulación de vigilancia y seguridad privada

**CONFIRMADO: el Playbook no menciona a la Superintendencia de Vigilancia y Seguridad Privada ni una sola vez.** Ni en los 22 capítulos, ni en riesgos, ni en decisiones pendientes.

Evidencia externa: el Decreto 356 de 1994 (Estatuto de Vigilancia y Seguridad Privada) establece que los servicios de vigilancia y seguridad privada solo pueden prestarse mediante licencia o credencial expedida por la Superintendencia; el marco cubre *"la fabricación, instalación, comercialización y utilización de equipos para vigilancia y seguridad privada"*, y las empresas que prestan servicios **con medios tecnológicos** deben contar con licencia de funcionamiento que las autorice a operar con esos medios ([Decreto 356 de 1994, Secretaría del Senado](http://www.secretariasenado.gov.co/senado/basedoc/decreto_0356_1994.html); [Supervigilancia, preguntas frecuentes](https://supervigilancia.gov.co/publicaciones/6338/preguntas-frecuentes-supervigilancia/); [Colombia Ágil, licencias del sector](https://www.colombiaagil.gov.co/tramites/intervenciones/licencias-para-empresas-del-sector-de-vigilancia-y) — todos consultados 15-sep-2026).

**Lo que NO afirmo:** no afirmo que vender e instalar cámaras a hogares requiera licencia de Supervigilancia. La distinción entre *comercializar equipos* y *prestar servicios de vigilancia con medios tecnológicos* es precisamente la pregunta jurídica, y no la puedo responder yo.

**Lo que SÍ afirmo:** que un plan de negocio de seguridad en Colombia que no ha formulado esa pregunta tiene un agujero en su base. Y que el riesgo crece con cada capa que el Playbook quiere añadir — monitoreo, alarmas, control de acceso, y sobre todo cualquier servicio recurrente de vigilancia.

**RESOLUCIÓN — BLOQUEANTE:**

> **GATE LEGAL L1 (REQUIERE FUENTE — concepto jurídico):** antes de la primera venta con instalación, obtener concepto de abogado colombiano especializado en el sector que responda por escrito:
> 1. ¿La comercialización e instalación de CCTV/alarmas a hogares, sin servicio de monitoreo, requiere licencia de Supervigilancia?
> 2. ¿A partir de qué servicio adicional (monitoreo, respuesta, asesoría en seguridad) se cruza el umbral que sí la requiere?
> 3. ¿Qué exige la licencia de asesoría/consultoría y cuánto tarda?
> 4. ¿Qué responsabilidad asume Atheron por la custodia de video de terceros (Habeas Data + posible régimen sectorial)?
>
> **Owner: Marlon. Antes de: primera venta. Sin esto, no hay MVP.**

---

## B.6 AUSENCIA CRÍTICA — El video es dato personal sensible y el Playbook no lo trata

**CONFIRMADO: el Playbook menciona "consentimiento" como un campo de la ficha de cliente (§7) y nada más.** No hay política de tratamiento, no hay finalidades, no hay responsable, no hay procedimiento ARCO, no hay retención.

Marco aplicable: la Ley Estatutaria 1581 de 2012 desarrolla el habeas data del artículo 15 de la Constitución; exige **autorización previa, expresa e informada**; otorga derechos de conocer, actualizar, rectificar, suprimir y revocar; y la SIC puede imponer multas de hasta **2.000 SMMLV** ([Ley 1581 de 2012, Cancillería](https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/ley_1581_2012.htm); [SoftGRC, Habeas Data explicado](https://softgrc.com/blog/que-es-habeas-data) — consultados 15-sep-2026).

Tres problemas específicos que el Playbook no ve:

1. **Marketing por WhatsApp requiere autorización previa y expresa.** El Playbook quiere "seguimiento automatizado" y "ningún lead debería quedar por fuera". Sin casilla de consentimiento separada para fines comerciales, ese seguimiento es infracción. Y las plantillas de marketing de WhatsApp **se cobran desde el primer mensaje entregado** (ver §B.7), así que además se paga por infringir.

2. **Un ecosistema multiempresa multiplica el problema de finalidad.** El dato recogido para "instalar una cámara" no está autorizado automáticamente para "ofrecerle un restaurante aliado". La Ley 1581 es explícita en el principio de finalidad. **El ecosistema entero depende de un consentimiento que el Playbook no diseñó.** Si el consentimiento de cross-selling no se captura correctamente desde el día 1, el Loop nace inutilizable.

3. **El "Pasaporte del Equipo" guarda configuración de sistemas de seguridad de terceros.** Ubicación de cámaras, credenciales, topología. Esa base de datos es un objetivo de ataque de altísimo valor y su filtración es un incidente de seguridad física, no solo digital.

**RESOLUCIÓN:** ver ADR-0007. Consentimiento granular por finalidad, versionado, con evidencia de captura (timestamp, IP, texto exacto de la política vigente en ese momento), desde el primer formulario. Esto es MUST NOW, cuesta poco y no se puede retrofitear.

---

## B.7 SUPUESTO NO VERIFICADO — "WhatsApp integrado" como si fuera gratis y trivial

**El Playbook trata WhatsApp como un canal.** Es un canal con economía propia, y esa economía cambió.

Evidencia: desde el **1 de julio de 2025** WhatsApp cobra **por mensaje de plantilla entregado** (no por conversación), según categoría — marketing, utilidad, autenticación, servicio — país y volumen; **desapareció la cuota de 1.000 conversaciones gratis**; las plantillas de *marketing* se cobran desde el primer mensaje entregado y **no tienen descuento por volumen**; los mensajes de *servicio* dentro de la ventana de 24 h iniciada por el cliente son gratuitos ([Blueticks, cambio de modelo por mensaje](https://blueticks.co/blog/whatsapp-business-pricing-change-2026-per-message); [Blueticks, categorías 2026](https://blueticks.co/blog/whatsapp-business-pricing-categories-2026-utility-marketing-authentication) — consultados 15-sep-2026).

**REQUIERE FUENTE: las tarifas específicas para Colombia.** Las fuentes que encontré citan EE. UU., India, Reino Unido y Alemania. No vi tarifa de Colombia y **no la voy a inventar.** Antes de diseñar cualquier flujo de seguimiento automatizado hay que obtener la tarifa colombiana por categoría de la documentación oficial de Meta.

Tres consecuencias de diseño que el Playbook no contempla:

1. **La ventana de servicio de 24 h es un activo económico.** Un flujo diseñado para responder dentro de la ventana es gratis; el mismo flujo un día después cuesta. Esto debe estar en el diseño del CRM, no descubrirse en la factura.
2. **"Seguimiento automatizado" a toda la base es un costo variable proporcional a la base.** A 10 ciudades, un recordatorio mensual a toda la base es una línea de costo real y creciente.
3. **Marketing por plantilla + Ley 1581 = doble restricción.** Se paga por cada mensaje y se requiere autorización para enviarlo.

---

## B.8 SUPUESTO NO VERIFICADO — SYSCOM tratado como una sola entidad

**CONFIRMADO: existen al menos dos operaciones distintas bajo el nombre SYSCOM, con portales de desarrollador separados.**

- SYSCOM México: [syscom.mx](https://www.syscom.mx/), portal de desarrolladores en [developers.syscom.mx](https://developers.syscom.mx/). API REST v1 con OAuth 2.0 (`client_credentials`); expone productos, categorías, marcas, existencias y precios, consulta de facturas y guías, cotización, cálculo de envío y generación de órdenes de venta ([SYSCOM Developers](https://developers.syscom.mx/), consultado 15-sep-2026).
- SYSCOM Colombia: [syscomcolombia.com](https://www.syscomcolombia.com/principal/acerca_de), con portal propio en [developers.syscomcolombia.com](https://developers.syscomcolombia.com/) (consultado 15-sep-2026).
- SYSCOM declara 18 centros de distribución en Estados Unidos, México y Colombia ([SYSCOM, Acerca de](https://www.syscom.mx/principal/acerca_de), consultado 15-sep-2026).

**Lo que esto significa para el Playbook:** la Fase 4 ("POC SYSCOM: OAuth, SKU, costo, stock") está subespecificada porque **no dice cuál SYSCOM.** Y las preguntas que deciden si el modelo de dropshipping funciona no están formuladas:

**REQUIERE PRUEBA — POC SYSCOM, preguntas obligatorias:**

| # | Pregunta | Por qué decide la arquitectura |
|---|---|---|
| 1 | ¿El catálogo, el stock y el precio de la API Colombia son los mismos que los de México? | Si son distintos, hay dos integraciones, no una. |
| 2 | ¿El stock que devuelve la API es el stock **en Colombia** o el consolidado? | Publicar disponibilidad basada en stock de otro país es exactamente lo que §4.3 prohíbe. |
| 3 | ¿SYSCOM Colombia factura como entidad colombiana con NIT y factura electrónica DIAN? | Determina si es compra nacional o importación. Cambia IVA, aranceles, tiempos y garantía. |
| 4 | ¿Existe despacho directo a cliente final con guía rastreable, o solo a la bodega del integrador? | Es la diferencia entre dropshipping y "comprar y reenviar". El Playbook asume lo primero como hipótesis. |
| 5 | ¿Quién responde la garantía ante el consumidor final y en qué plazo? | En Colombia la garantía legal la responde el vendedor frente al consumidor (Estatuto del Consumidor). Atheron es el vendedor. |
| 6 | ¿Cuáles son los límites de tasa (rate limits) de la API y su SLA? | Determina si se puede consultar stock en tiempo real en la landing o hay que cachear. |
| 7 | ¿Los términos de uso permiten republicar imágenes y fichas técnicas? | El Playbook ya lo marca ("cuando su uso lo permita"). Hay que confirmarlo por escrito. |

**Ninguna de estas siete respuestas puede inventarse. Todas se obtienen con una cuenta de desarrollador y un correo al canal de distribuidores.** El POC no es "conectar OAuth"; es responder estas siete preguntas.

---

## B.9 GOBERNANZA ROTA — el diseñador audita al auditor

**CONFIRMADO (contradicción textual entre §13 y §22 del Playbook).**

- §13 asigna al Agente B: *arquitectura, estrategia, producto, **QA, auditoría**, priorización, gates.*
- §22 establece: *"Ronda 1: Agente B diseña. Ronda 2: Claude Code intenta romper el diseño."*
- El encargo cierra: *"El Agente B auditará tu auditoría y Marlon decidirá."*

Es decir: **el autor del diseño es también el dueño del proceso de auditoría del diseño y el revisor del auditor.** Ese es un conflicto de interés estructural. No implica mala fe; implica que el sistema no tiene un mecanismo para resolver un desacuerdo genuino entre A y B, salvo que Marlon —único humano, no técnico en la disputa— arbitre cada vez.

Además §22 menciona una Ronda 3 con "otro auditor independiente" **que no existe en §13.** No está nombrado, no tiene rol asignado, no tiene acceso.

**Impacto:** en el corto plazo, ninguno. En el momento en que A y B discrepen sobre algo caro (por ejemplo: esta auditoría), el proceso no tiene salida definida y el resultado dependerá de quién escriba el último documento.

**RESOLUCIÓN PROPUESTA:**

1. **Separar autoría de arbitraje.** Quien diseña no cierra la auditoría de su propio diseño.
2. **Decisiones estructurales se resuelven por ADR, no por documento de agente.** El ADR obliga a escribir alternativas consideradas y consecuencias aceptadas. Marlon aprueba el ADR. Ese es el mecanismo de arbitraje. (Ver §Gobernanza documental y ADR-0011.)
3. **Registrar los desacuerdos, no resolverlos silenciosamente.** Si A y B discrepan, el ADR lleva una sección "Posición divergente" firmada. El historial queda.
4. **La Ronda 3 o se nombra, o se elimina del Playbook.** Un control que no existe es peor que no tener control, porque genera falsa confianza.

---

## B.10 Conceptos vagos que hoy son inofensivos y a escala son caros

| Concepto del Playbook | Por qué es vago | Qué decisión obliga |
|---|---|---|
| "Identidad única del cliente" | No define **clave canónica** ni regla de deduplicación. ¿Teléfono? ¿Documento? ¿Email? Los tres cambian, se comparten y se escriben mal. | ADR-0001. Sin esto no hay ecosistema, solo listas. |
| "Nivel 5 — Aliado / oportunidad estratégica" | Coloca en la escalera pública del cliente algo que insinúa participación societaria. | Riesgo legal (§M.6). Sacarlo de la escalera visible. |
| "Beneficio familiar" | ¿Qué es una familia? ¿Cuántas personas? ¿Cómo se verifica? Es el vector de abuso más obvio del programa. | ADR-0001 (concepto `Household`). |
| "Red de aliados... conciliación, comisiones" | Conciliar comisiones con terceros es contabilidad de tercero, no marketing. Requiere corte, disputa, nota crédito y soporte fiscal. | NO CONSTRUIR TODAVÍA (§G). |
| "Ownership operativo" | No definido. Puede leerse como autonomía o como participación. La ambigüedad es el riesgo. | §M. |
| "IA... vende asistidamente" | Un asistente que cotiza mal en seguridad genera responsabilidad. | Definir qué puede afirmar la IA sin revisión humana. |
| "Atheron City Launch" (Fase 9) | Nombre de fase sin contenido. | Convertir en playbook con checklist o eliminar. |

## B.11 Dependencias que el Playbook asume resueltas

| Dependencia | Estado real |
|---|---|
| Odoo Enterprise contratado, versión, número de usuarios, partner implementador | **REQUIERE FUENTE.** El Playbook lo nombra 20 veces y no dice si existe. |
| Cuenta de desarrollador SYSCOM (MX y/o CO) | **REQUIERE FUENTE.** |
| WhatsApp Business Platform: BSP elegido, número verificado, plantillas aprobadas | **REQUIERE FUENTE.** El proceso de verificación de negocio de Meta toma tiempo y puede rechazarse. |
| Pasarela de pagos: cuenta, contrato, tarifa negociada | **REQUIERE FUENTE.** |
| Proveedor tecnológico de factura electrónica DIAN | **REQUIERE FUENTE.** No mencionado en el Playbook, es obligatorio. Ver §C.7. |
| Licencia Supervigilancia (si aplica) | **BLOQUEANTE, §B.5.** |
| Las 7 casas: ocupación, tarifa, propias/administradas, contratos | **REQUIERE FUENTE.** |
| Técnicos instaladores: ¿empleados o contratistas? ¿cuántos? | **REQUIERE FUENTE.** Define el modelo laboral (§M). |

**Ninguna arquitectura es evaluable hasta que esta tabla esté llena.** Es la primera tarea de Marlon tras esta auditoría.

---

# C. QUÉ FALTA ANTES DE CONSTRUIR

Ordenado por costo de omitirlo. Lo que está arriba no se puede retrofitear.

## C.1 Modelo de datos canónico — NO EXISTE

El Playbook tiene una lista de campos (§7). Una lista de campos no es un modelo de datos. Faltan: entidades, claves, cardinalidades, y —lo crítico— **qué es inmutable**.

**Entidades mínimas para el día 1:**

```
Party            (persona natural o jurídica — raíz de identidad)
 ├─ Identifier   (documento | teléfono | email | whatsapp_id) [n por Party, con verificación]
 ├─ Consent      (finalidad, versión de política, timestamp, evidencia) [append-only]
 ├─ Household    (agrupación declarada, con límite y verificación)   [FASE POSTERIOR]
 └─ Company      (relación Party↔Party de tipo empresa-empleado)     [FASE POSTERIOR]

Lead             (intención comercial) → Quote → Order → Invoice     [Odoo]
Installation     (evento físico: fecha, técnico, dirección)
Equipment        (serial — el "Pasaporte") ─ pertenece a Party, instalado en Address
Event            (log append-only de todo lo anterior)               [Atheron Core]
BenefitEntry     (ledger append-only)                                [FASE POSTERIOR]
```

**La decisión que no puede posponerse:** `Party.id` es un identificador **interno, opaco e inmutable** (UUID), y nunca el teléfono, el documento o el email. Los teléfonos se reciclan, los documentos se corrigen, los emails se abandonan. Si la clave de negocio es la clave técnica, la deduplicación futura es imposible sin reescribir historia.

## C.2 Identidad única y deduplicación — la decisión más importante del proyecto

El Playbook dice que debe existir; no dice cómo. Esta es la pieza que, mal resuelta, hace que todo lo demás sea inútil.

Evidencia externa sobre el método: el enfoque estándar es **híbrido** — reglas determinísticas de alta confianza (email, teléfono, ID de fidelización, documento) como base, y capas probabilísticas encima para cubrir lo que las reglas no alcanzan; las buenas prácticas incluyen designar qué sistema es autoritativo para cada atributo y **documentar cada regla para que el registro maestro sea explicable y auditable**; se citan objetivos de precisión por encima de 95% para coincidencias determinísticas y 85% para probabilísticas ([Amperity, técnicas de identity resolution](https://amperity.com/blog/identity-resolution-techniques-probabilistic-deterministic-hybrid); [BlueConic, matching probabilístico y determinístico](https://www.blueconic.com/resources/probabilistic-and-deterministic-matching-explained) — consultados 15-sep-2026).

**Mi recomendación para Atheron, deliberadamente conservadora:**

1. **Solo determinístico en la fase 1.** Nada de probabilístico. En un negocio de seguridad, fusionar por error dos personas significa exponer la configuración del sistema de seguridad de una casa a otra persona. **El costo de un falso positivo es mucho mayor que el de un falso negativo.**
2. **Jerarquía de claves:** documento verificado > teléfono verificado (OTP) > email verificado > teléfono sin verificar.
3. **Fusión (merge) nunca destructiva.** Fusionar crea un vínculo `Party → Party` y marca el sobreviviente; **no borra**. Debe existir `unmerge`. Esto es el `Rollback` del encargo aplicado a identidad, y casi nadie lo construye hasta que lo necesita y ya no puede.
4. **Cola de revisión humana** para candidatos ambiguos. No automatizar la fusión dudosa.

Ver ADR-0001.

## C.3 Ledger de beneficios — falta por completo, y es donde muere el dinero

El Playbook (§6.4) enumera correctamente los atributos que un beneficio debe tener (costo máximo, sponsor, vencimiento, condición, responsable, redención registrada) y luego asume que Odoo lo hará. **No hay evidencia de que el módulo de fidelización de Odoo modele sponsor económico ni ledger contable de doble partida por beneficio.**

Lo que sí está documentado del módulo de Odoo: soporta cupones, programas de lealtad, descuentos automáticos y "compre uno lleve otro"; permite limitar por compañía (si se deja en blanco aplica a todas), fechas de inicio/fin, límites de uso, y restringir el canal (Ventas, PdV, Sitio web); en PdV admite varios programas sobre un mismo pedido con reglas para evitar acumulación o fijar prioridad ([Odoo 18, *Discount and loyalty programs*](https://www.odoo.com/documentation/18.0/applications/sales/sales/products_prices/loyalty_discount.html), consultado 15-sep-2026).

**Eso es un motor de promociones. No es un ledger.** La diferencia importa:

| Motor de promociones | Ledger de beneficios |
|---|---|
| Aplica un descuento a una transacción | Registra un asiento inmutable con contrapartida |
| Estado actual | Historia completa y reconstruible |
| No sabe quién paga | Tiene `sponsor_id` y permite cobrarle al aliado |
| Reversar = editar | Reversar = asiento inverso, la historia queda |
| No produce pasivo contable | Produce el pasivo que el contador necesita |

**REQUIERE PRUEBA — P1:** montar una instancia de Odoo y verificar si el modelo de lealtad permite (a) atribuir el costo del beneficio a un tercero sponsor, (b) producir un reporte de pasivo por beneficios no redimidos, (c) reversar sin perder historia. **No asumir ninguna de las tres.**

**Por qué el pasivo importa aunque parezca contabilidad aburrida:** bajo IFRS 15 los puntos/beneficios otorgados son una obligación de desempeño distinta y se reconocen como pasivo diferido; la ruptura (*breakage*, lo que nunca se redime) se reconoce proporcionalmente conforme ocurre la redención, no de golpe al emitir ([IFRS Community, *Customer Loyalty Programmes*](https://ifrscommunity.com/knowledge-base/customer-loyalty-programmes/); [Brandmovers, *Loyalty Program Liability 2026*](https://blog.brandmovers.com/what-cfos-need-to-know-about-loyalty-program-liability-in-2026) — consultados 15-sep-2026).

Traducido a Atheron: **cada beneficio prometido y no redimido es una deuda en el balance.** Un programa de fidelización mal instrumentado genera un pasivo que nadie está midiendo. Si además hay vencimientos mal aplicados o reversas sin trazabilidad, no hay forma de auditar la cifra. Ver ADR-0004.

## C.4 Idempotencia y webhooks — falta, y es la causa #1 de doble cobro

El Playbook no menciona idempotencia. En el momento en que existan pasarela de pagos, WhatsApp y SYSCOM, habrá tres fuentes de webhooks que **reintentan por diseño**. Sin idempotencia: leads duplicados, beneficios otorgados dos veces, y en el peor caso órdenes o cobros duplicados.

Reglas mínimas, no negociables (ADR-0005):

1. Todo endpoint que reciba webhook exige y persiste una **clave de idempotencia** (`provider` + `event_id`), con índice único. Segunda llegada del mismo evento = `200 OK` sin efecto.
2. Todo webhook se **verifica criptográficamente** (firma del proveedor) antes de procesarse. Un endpoint de webhook sin verificación de firma es un endpoint público de escritura.
3. **Recepción y procesamiento se separan.** El endpoint solo persiste el evento crudo y responde. El procesamiento ocurre después, con reintentos y backoff.
4. **Cola de fallidos (DLQ)** visible por humanos. Un webhook que falla en silencio es dinero perdido sin rastro.
5. **Nunca confiar en el orden de llegada.** Los webhooks llegan desordenados. Toda transición de estado debe ser conmutativa o llevar versión.

Esto cuesta poco días 1–30 y es carísimo de retrofitear.

## C.5 Multiempresa y multiciudad — el Playbook los trata como el mismo problema. No lo son.

| | Multiciudad | Multiempresa |
|---|---|---|
| Naturaleza | Atributo de datos | Frontera legal y contable |
| Implica | Cobertura, técnicos, logística, SEO local | NIT distinto, contabilidad separada, facturación separada, consolidación |
| Momento correcto | **Modelar el campo `city` desde el día 1** | **NO crear la segunda compañía hasta que haya razón legal o fiscal** |
| Costo de no prepararlo | Alto: reescribir consultas y URLs | Bajo si el modelo es limpio |
| Costo de prepararlo de más | Bajo | **Muy alto**: contabilidad multi-compañía prematura es un impuesto permanente |

**Hallazgo específico de Colombia que el Playbook no contempla:** el ICA (Industria y Comercio) es un impuesto **municipal**, con tarifa y declaración por municipio. Operar en 10 ciudades no es "el mismo negocio con más direcciones": es potencialmente 10 registros y 10 declaraciones, con reglas de territorialidad sobre dónde se entiende realizada la venta. **REQUIERE FUENTE (concepto tributario).** Esto pertenece al checklist de apertura de ciudad (§17), que hoy no lo incluye.

**Recomendación:** `city` y `company_id` como atributos desde el inicio; **una sola compañía real** hasta que un contador diga lo contrario.

## C.6 Cartera y crédito — hay una intención, falta la regla

El Playbook dice: *"la inicial del crédito no debe dejar a Atheron financiando el capital invertido."* Correcto como principio, inejecutable como está.

**Fórmula propuesta (a validar con la contabilidad real):**

```
inicial_mínima ≥ costo_directo + costo_financiero_estimado + reserva_mora
```

Con la regla actual, `costo_directo` = 52% del precio crédito. Por lo tanto **la inicial no debería bajar del 52% del precio de crédito**, más un colchón. Cualquier inicial inferior significa que Atheron financia inventario ajeno con su propia caja.

Lo que además falta y es obligatorio antes de vender a crédito:

- **REQUIERE FUENTE (jurídica):** ¿Atheron puede otorgar crédito directo al consumidor sin ser vigilada? ¿Hay tope de tasa por usura aplicable? ¿Se requiere contrato específico y revelación de costo del crédito?
- Política de mora: días, recargos, suspensión de servicio, recuperación del equipo (¿con qué respaldo legal?).
- Provisión de cartera y su registro contable.
- **Decisión estratégica:** ¿crédito propio o aliado financiero? El crédito propio consume la caja que §4.2 quiere proteger. **Esta es una de las 10 decisiones de Marlon.**

## C.7 Facturación electrónica DIAN — ausente del Playbook, obligatoria en la realidad

**CONFIRMADO: el Playbook no la menciona.** La facturación electrónica ante la DIAN es obligatoria y está desplegada por fases desde 2020, con el formato UBL 2.1 colombiano; las empresas pueden facturar con software propio o a través de un **proveedor tecnológico** autorizado por la DIAN, y la Resolución 000165 de noviembre de 2023 regula la operación de esos proveedores y adopta nuevas versiones técnicas ([DIAN, Proveedores Tecnológicos](https://micrositios.dian.gov.co/sistema-de-facturacion-electronica/proveedores-tecnologicos/); [Siempre al Día, guía 2026](https://siemprealdia.co/colombia/impuestos/sistema-de-facturacion-electronica-en-colombia/) — consultados 15-sep-2026).

Implicaciones que afectan la arquitectura, no solo la contabilidad:

1. Una venta no está completa cuando se cobra; está completa cuando tiene **CUFE**. El modelo de estados debe reflejarlo.
2. Las **notas crédito** son el mecanismo de devolución. Todo el flujo de devoluciones y garantías (§C.8) cuelga de aquí.
3. La elección de proveedor tecnológico es una decisión de integración, y **debe verificarse su compatibilidad con Odoo antes de comprometerse con Odoo.**

## C.8 Devoluciones, garantías y retoma — tres flujos distintos que el Playbook trata como uno

| Flujo | Disparador | Complejidad real |
|---|---|---|
| **Devolución** (retracto/insatisfacción) | Cliente, dentro de plazo legal | Nota crédito DIAN + reversa de beneficios otorgados + logística inversa + ¿reversa de comisión de referido? |
| **Garantía** | Falla del producto | Garantía legal ante el consumidor la responde el vendedor (Atheron), aunque el fabricante sea otro. Requiere RMA con el proveedor, y el cliente no debe esperar al proveedor. |
| **Retoma** | Upgrade | Valoración del usado, **verificación de procedencia**, IVA sobre bienes usados, destino del equipo retomado |

**Lo que el Playbook no ve:** la devolución **reversa beneficios ya otorgados**. Si el cliente compró, subió de nivel Loop, redimió un beneficio en un restaurante aliado, y después devuelve el producto — ¿quién paga el almuerzo? Ese es el caso `Rollback` del encargo y **es la razón por la cual el ledger debe ser append-only con asientos de reversa**, no un campo editable. Sin eso, la devolución corrompe el estado de fidelización silenciosamente.

Sobre retoma: el Playbook la limita correctamente a equipos vendidos e instalados por Atheron, previa inspección. **Buena decisión** — reduce fraude y responsabilidad por equipo de procedencia desconocida. Mantener esa restricción aunque presione comercialmente.

## C.9 Fraude, abuso y expiraciones — el Playbook no los menciona; la industria los cuantifica

**CONFIRMADO: ninguna de las palabras "fraude" o "abuso" aparece en el Playbook.** Aparecen en el encargo de auditoría, lo cual indica que el Agente B sabe que faltan.

Evidencia externa de magnitud y vectores: el fraude en programas de referidos y lealtad se estima en torno a **USD 1.000 millones anuales**, con **USD 3.100 millones en puntos redimidos clasificados como fraudulentos solo en EE. UU.**; los vectores dominantes son el **auto-referido** con cuentas falsas, la publicación de códigos en sitios públicos, y las granjas de referidos; entre las mitigaciones se citan seguimiento de IP, límites de uso por código, detección de patrones de correo similares, y —la más importante de diseño— **premiar compras verificadas, no invitaciones** ([Voucherify, *combatir el abuso de referidos*](https://www.voucherify.io/blog/blowing-the-whistle-how-to-combat-referral-abuse-and-fraud); [Rivo, estadísticas de fraude en referidos 2026](https://www.rivo.io/blog/fraud-prevention-referrals-statistics) — consultados 15-sep-2026).

**Aplicado a Atheron, los vectores concretos son:**

| Vector | Cómo se explota aquí | Mitigación mínima |
|---|---|---|
| Auto-referido | El cliente se refiere a sí mismo con otro teléfono | Comisión solo tras **venta cerrada y pagada**, nunca por lead. Bloquear coincidencia de dirección/documento/medio de pago. |
| Referido circular | A refiere a B, B refiere a A | Detección de ciclos en el grafo de referidos. |
| Abuso de "beneficio familiar" | Un `Household` de 40 personas | Límite duro de miembros, verificación, y tope de beneficio por household/año. |
| Colusión con técnico | Técnico marca instalación falsa para disparar beneficio | Instalación verificada por serial + foto + firma del cliente. El serial es el ancla. |
| Colusión con aliado | Aliado reporta redenciones que no ocurrieron | Redención con código de un solo uso, ventana temporal, conciliación contra ticket. |
| Stacking | Combinar beneficios hasta borrar el margen | Piso de margen en el motor (§B.2). |
| Beneficios sin vencimiento | Pasivo creciente indefinido | Vencimiento obligatorio en todo beneficio. Sin excepción. |

**Regla de diseño que resuelve la mayoría de una vez: el evento que otorga valor debe ser un evento físico verificable** (pago confirmado, equipo instalado con serial, estadía completada), **nunca una declaración** (un registro, un clic, una invitación).

## C.10 Observabilidad — no mencionada; sin ella no hay operación replicable

El Playbook tiene KPI de negocio excelentes (§16) y **cero observabilidad técnica**. No se puede replicar en 10 ciudades lo que no se puede ver fallar en una.

Mínimo para el día 1 (barato):

1. **Logs estructurados con `correlation_id`** que atraviese landing → lead → CRM → WhatsApp → venta. Sin esto, "se perdió un lead" es indepurable.
2. **Trazabilidad del dinero:** todo cambio de estado en un pedido/pago/beneficio deja rastro con actor, timestamp y motivo.
3. **Tres alertas, no treinta:** (a) fallo de webhook de pago, (b) lead recibido y no creado en CRM, (c) error de integración con proveedor.
4. **Un tablero de una página** con: leads del día, leads sin contactar > X horas, ventas, errores de integración.

Ver ADR-0012.

## C.11 Secretos, seguridad y recuperación — ausentes

Ausentes del Playbook. En un negocio que almacena configuraciones de sistemas de seguridad de terceros, esto no es opcional.

**Mínimo (ADR-0006):**
- Ningún secreto en el repositorio. Nunca. Gestor de secretos o variables de entorno del proveedor, con rotación documentada.
- Entornos separados: desarrollo / staging / producción, con credenciales distintas. **El POC de SYSCOM jamás contra producción.**
- Principio de mínimo privilegio en Odoo por rol. Un técnico no ve la cartera; un vendedor no ve las configuraciones de equipos de otros clientes.
- MFA obligatorio en Odoo, dominio, pasarela y WhatsApp Business.
- **Backups probados con restauración real.** Un backup nunca restaurado no es un backup. Definir RPO y RTO explícitos.
- Plan de respuesta a incidentes con notificación, porque la Ley 1581 genera obligaciones ante incidentes de datos personales.

## C.12 Límites de API y vendor lock-in

**REQUIERE FUENTE en todos los casos** — ninguna de estas cifras debe asumirse:

| Proveedor | Qué hay que averiguar | Riesgo de lock-in | Mitigación |
|---|---|---|---|
| SYSCOM | Rate limits, SLA, latencia, TTL de caché permitido | **Alto** (catálogo y precio) | Capa anticorrupción: SKU Atheron ≠ SKU proveedor. Ver ADR-0009. |
| WhatsApp/Meta | Límites de envío, calidad del número, tarifas Colombia | **Muy alto**: si Meta bloquea el número, se corta el canal de ventas | Nunca depender de un solo canal. Formulario web + teléfono como respaldo. |
| Odoo | Costo por usuario, política de versiones | **Alto si se customiza** | Mantener la lógica propietaria fuera. ADR-0002. |
| Pasarela | Límites, tiempos de desembolso | Medio | Abstraer el cobro detrás de una interfaz propia. |
| Proveedor DIAN | Formato de salida, portabilidad | Medio | Exigir exportación de documentos emitidos. |

**Principio rector:** *el dato que define la relación con el cliente es de Atheron; el dato de operación puede vivir en el proveedor.*

---

# D. ODOO — DENTRO VS FUERA

Esta es la respuesta a §D del encargo y la decisión arquitectónica central.

## D.1 Criterio de decisión (no lista de módulos)

Un dominio va **dentro de Odoo** si cumple las cuatro:
1. Es un proceso de negocio estándar que miles de empresas hacen igual.
2. El regulador o el contador esperan verlo ahí.
3. Cambiarlo de sistema no destruye valor estratégico.
4. Odoo lo hace bien **sin customización de código**.

Un dominio va **fuera** si cumple alguna:
1. Es el activo estratégico diferencial de Atheron.
2. Necesita evolucionar más rápido que el ciclo de versiones del ERP.
3. Requiere garantías (inmutabilidad, auditabilidad, idempotencia) que el ERP no da nativamente.
4. Mantenerlo dentro implicaría customización pesada — la deuda de §B.1.

## D.2 Asignación propuesta

### 1. Odoo estándar — SIN código custom
- CRM: leads, etapas, actividades, pipeline
- Ventas: cotizaciones, órdenes
- Compras y proveedores
- Inventario
- Facturación, impuestos, cartera, conciliación bancaria
- Contabilidad
- Contactos (**réplica** de Party, no el maestro)

> Regla: **si requiere código, no es "Odoo estándar" y sube al nivel 2 con justificación escrita.**

### 2. Odoo custom — mínimo, presupuestado, con ADR obligatorio
Solo se acepta lo que no puede vivir fuera:
- Campos de trazabilidad en el lead: `utm_source/medium/campaign`, `city`, `atheron_party_id`, `origin_landing`
- Localización colombiana + conector del proveedor DIAN
- Reportes de margen por línea

> **Techo duro:** si el custom de Odoo supera ~15% del esfuerzo de implementación, la arquitectura está fallando. Revisar antes de continuar.

### 3. Atheron Core (middleware + datos propios) — FUERA de Odoo
Aquí vive el activo:
- **Party / Identifier / Consent** — identidad canónica y deduplicación
- **Event log append-only** — la historia completa e inmutable
- **Benefit ledger** — asientos de beneficios con sponsor, vencimiento y reversa
- **Referral graph** — referidos y detección de ciclos
- **Anti-corruption layer de proveedores** — SYSCOM y futuros
- **Idempotencia y recepción de webhooks**
- **Motor de reglas de elegibilidad y piso de margen**
- **Next Best Action** (mucho después)

### 4. Base de datos externa
**Sí**, pero una sola y modesta: **PostgreSQL gestionado**, separado de la base de Odoo. Razones: aislar el activo estratégico del ciclo de vida del ERP, y poder exportarlo íntegro cualquier día. No hace falta nada más exótico en los primeros 12–24 meses.

### 5. Frontend
Fuera de Odoo. Landings estáticas o renderizadas, rápidas, orientadas a SEO/CRO, que **solo escriben** hacia Atheron Core. El frontend nunca es fuente de verdad (el Playbook ya lo dice; mantenerlo).

### 6. Proveedores
Siempre detrás de la capa anticorrupción. **Nunca** un SKU de proveedor expuesto como SKU de Atheron; **nunca** un precio de proveedor mostrado sin pasar por las reglas de Atheron.

## D.3 Lo que explícitamente NO debe entrar en Odoo

| Dominio | Por qué no |
|---|---|
| Ledger de beneficios | Necesita inmutabilidad, sponsor y reversa auditable. Es el activo. §C.3 |
| Identidad canónica y merge/unmerge | Necesita reglas propias y capacidad de deshacer. §C.2 |
| Event log | Debe sobrevivir a cualquier migración de ERP |
| Consentimiento granular versionado | Es evidencia legal; debe ser exportable e íntegra |
| Motor de Next Best Action | Evoluciona semanalmente; el ERP no |
| Grafo de referidos y antifraude | Requiere consultas de grafo y reglas cambiantes |

**Odoo es el libro mayor del dinero. Atheron Core es la memoria de la relación.** Confundirlos es el error caro.

---

# E. ATHERON LOOP — DISEÑO CONCEPTUAL

Respuesta a §E del encargo. **Diseño conceptual, NO construcción** (ver §E.5 sobre qué no construir).

## E.1 Modelo conceptual

```
Party ──< Membership >── Tier            (nivel, vigente desde/hasta, calculado, nunca editado a mano)
  │
  ├──< BenefitGrant     (otorgamiento: qué, por qué evento, sponsor, costo tope, vence)
  │        │
  │        └──< BenefitEntry            (LEDGER append-only: GRANT | REDEEM | EXPIRE | REVERSE)
  │
  ├──< Referral         (referrer → referred, estado, evento que la convirtió)
  └──< Equipment        (serial — ancla física de la relación)
```

## E.2 Definición de cada concepto exigido por el encargo

| Concepto | Definición operativa | Cuándo construirlo |
|---|---|---|
| **Benefit** | Plantilla: tipo (descuento / upgrade / servicio / acceso), valor, **costo máximo para Atheron**, sponsor, condiciones, vigencia | Diseñar ahora, construir en Fase Loop |
| **Eligibility** | Función pura `(Party, Benefit, Contexto) → bool + razón`. **Debe devolver la razón**, para poder explicársela al cliente y auditarla | Fase Loop |
| **Tier** | **Derivado**, nunca asignado a mano. Calculado desde eventos verificados. Con periodo de gracia al bajar de nivel | Fase Loop |
| **Validity** | Todo beneficio tiene `valid_from` y `valid_until`. **Sin excepción**, para no crear pasivo eterno (§C.3) | Regla desde el día 1 |
| **EconomicCost** | Costo real para Atheron si se redime. Obligatorio al crear el beneficio. Si no se puede calcular, el beneficio no existe | Regla desde el día 1 |
| **Sponsor** | Quién paga: Atheron, un aliado, o compartido. **Sin sponsor definido, el beneficio no se publica** | Regla desde el día 1 |
| **Redemption** | Evento con código de un solo uso, ventana, lugar y actor. Genera asiento `REDEEM` | Fase Loop |
| **Stacking** | Reglas de combinación + **piso de margen duro**. Por defecto: NO acumulable | Regla desde el día 1 (§B.2) |
| **CustomerIdentity** | `Party` + identificadores verificados (§C.2) | **DÍA 1** |
| **Household** | Grupo declarado con límite duro de miembros y verificación. Vector de fraude #1 | Fase Loop, NO antes |
| **Company** | Relación Party↔Party. Los beneficios B2B **no se transfieren al empleado** salvo política explícita | Fase posterior |
| **Referral** | Arista `referrer → referred`. Se paga **solo tras venta pagada** | Fase Loop |
| **Repurchase** | Segunda orden pagada del mismo `Party`. Métrica derivada, no entidad | Medible desde día 1 |
| **CrossSell** | Compra en línea de negocio distinta a la de entrada. **Es la métrica que valida o mata la tesis** (§B.3) | Medible desde día 1 |
| **Expiration** | Proceso programado que emite asientos `EXPIRE`. Idempotente y reejecutable | Fase Loop |
| **Fraud / Abuse** | Reglas de §C.9 + cola de revisión humana | Fase Loop |
| **Rollback** | Asiento `REVERSE` que referencia el asiento original. **Nunca borrado, nunca edición** | Desde el primer asiento |
| **Ledger** | Append-only. Saldo = suma de asientos, nunca un campo mutable | Cuando exista el primer beneficio |
| **AuditTrail** | Quién, qué, cuándo, por qué, con qué versión de regla | Desde el día 1 |

## E.3 La regla que hace que el Loop no quiebre a la empresa

> **Ningún beneficio existe hasta que tenga: sponsor identificado, costo máximo calculado, fecha de vencimiento y regla de no-acumulación.**
>
> Si falta uno de los cuatro, no se publica. Sin excepciones comerciales, sin "por esta vez".

Esta sola regla previene la mayoría de los desastres de programas de fidelización.

## E.4 Qué del Loop SÍ debe existir en el día 1

Casi nada — pero lo que existe es crítico e irrecuperable:

1. **`Party` con identificador verificado** — sin esto no hay nada.
2. **Event log append-only** — aunque sea una tabla con `(id, type, party_id, payload_json, occurred_at, source)`. Los eventos no se recuperan retroactivamente.
3. **Consentimiento granular capturado** — sin esto el Loop nace ilegal (§B.6).
4. **`city` y UTM en cada lead** — para el experimento E1 (§B.3).

Costo estimado: horas, no semanas. **Valor: es la diferencia entre poder construir el Loop en la Fase 7 y no poder.**

## E.5 Qué del Loop NO se debe construir todavía — y por qué

| No construir | Razón |
|---|---|
| Motor de reglas de elegibilidad | Sin volumen de clientes no hay reglas que optimizar. Se configura a mano. |
| Tiers automáticos | No hay datos para calibrar los umbrales. Definirlos hoy es adivinar. |
| Household | Vector de fraude sin contramedidas maduras. |
| Redención en aliados | Requiere conciliación con terceros = contabilidad de tercero (§C.5). |
| Referidos pagados | Requiere antifraude y tratamiento tributario de la comisión. |
| Next Best Action | Requiere historia que aún no existe. Un modelo entrenado con 50 clientes es superstición. |
| App móvil | El canal es WhatsApp. Una app sin uso diario es un costo fijo. |

**Es más barato otorgar beneficios a mano a los primeros 200 clientes que construir el motor antes de saber qué beneficios funcionan.** Un Google Sheet operado con disciplina supera a un motor mal calibrado, y enseña qué reglas escribir.

---

# F. EVENTOS — ¿EDA DESDE YA?

Respuesta directa a §F del encargo:

> ## **NO a Event-Driven Architecture. SÍ a contratos de eventos desde el día 1.**

## F.1 Argumento

Los eventos tienen dos propiedades separables que el encargo (y la industria) suelen confundir:

| Propiedad | Valor | Costo | ¿Retrofiteable? |
|---|---|---|---|
| **El contrato** (qué significa cada evento, qué campos lleva, qué lo dispara) | Altísimo | Casi cero | **NO.** Los eventos no ocurridos no se recuperan. |
| **La infraestructura** (bus, brokers, consumidores, particiones, orden, entrega) | Bajo con poco volumen | Alto: operación, depuración, observabilidad distribuida | **SÍ**, y sin dolor si el contrato ya existe. |

Con un puñado de ventas al día, un broker de mensajes añade modos de fallo distribuidos a un problema que no los tiene. Pero **si no se define hoy qué es `SaleConfirmed`, dentro de un año habrá tres definiciones distintas** en la landing, en Odoo y en el CRM, y reconciliarlas será arqueología.

**Conclusión:** escribir los contratos, persistir los eventos en una tabla append-only, y publicar el bus el día que el volumen o la cantidad de consumidores lo justifique. La migración de "tabla de eventos" a "bus de eventos" es mecánica si el contrato ya está bien definido. Ver ADR-0003.

## F.2 Envelope común (obligatorio para todos los eventos)

```json
{
  "event_id":      "uuid-v4",
  "event_type":    "SaleConfirmed",
  "event_version": 1,
  "occurred_at":   "2026-09-15T14:32:00-05:00",
  "recorded_at":   "2026-09-15T14:32:01-05:00",
  "source":        "odoo | landing | whatsapp | manual | syscom",
  "actor":         { "type": "user|system|customer", "id": "..." },
  "party_id":      "uuid | null",
  "correlation_id":"uuid",
  "idempotency_key":"source:native_id",
  "city":          "zipaquira",
  "company_id":    "atheron_security",
  "payload":       { }
}
```

Reglas del envelope:
1. `occurred_at` ≠ `recorded_at`. Confundirlos hace imposible auditar retrasos.
2. `event_version` desde la v1. Los contratos cambian; los eventos viejos no se reescriben.
3. `correlation_id` viaja de la landing hasta la factura. Es lo que hace depurable el embudo.
4. `idempotency_key` único. Es la defensa contra el reintento (§C.4).
5. **Los eventos son inmutables.** Corregir = emitir un evento de corrección.

## F.3 Contratos mínimos — payload por evento

| Evento | Payload mínimo | Emisor | Notas críticas |
|---|---|---|---|
| `LeadCreated` | `utm{source,medium,campaign,content}`, `city`, `product_interest`, `channel`, `consent{marketing,version,ts}` | landing / WhatsApp | El consentimiento viaja **dentro del evento**, no aparte |
| `LeadQualified` | `lead_id`, `qualification`, `reason`, `qualified_by` | CRM | La razón es obligatoria — entrena el criterio |
| `QuoteSent` | `quote_id`, `lines[]`, `total`, `payment_mode(contado\|credito)`, `valid_until` | Odoo | `valid_until` obliga a pensar vigencia |
| `QuoteAccepted` | `quote_id`, `accepted_at`, `channel` | Odoo | |
| `SaleConfirmed` | `order_id`, `party_id`, `total`, `margin_estimated`, `benefits_applied[]`, `city` | Odoo | **`margin_estimated` obligatorio**: sin él no hay piso de margen (§B.2) |
| `PaymentReceived` | `payment_id`, `order_id`, `amount`, `method`, `provider_ref` | Pasarela | **El evento que otorga valor.** Nunca otorgar beneficio antes de este. |
| `PaymentMissed` | `installment_id`, `due_date`, `days_late`, `balance` | Odoo | Dispara cartera, y **suspensión de beneficios** |
| `EquipmentInstalled` | `serial`, `party_id`, `address_id`, `technician_id`, `photos[]`, `customer_signature` | App/form técnico | **El serial es el ancla antifraude** (§C.9) |
| `StayBooked` / `StayCompleted` | `booking_id`, `party_id`, `property_id`, `nights`, `channel` | Hospitalidad | `StayCompleted`, no `Booked`, es el que otorga valor |
| `BenefitGranted` | `grant_id`, `benefit_code`, `party_id`, `triggering_event_id`, `sponsor`, `max_cost`, `expires_at` | Core | `triggering_event_id` obligatorio: todo beneficio debe poder explicarse |
| `BenefitRedeemed` | `grant_id`, `redeemed_at`, `location`, `actual_cost`, `verification_code` | Core | `actual_cost` alimenta la conciliación con el sponsor |
| `BenefitExpired` | `grant_id`, `expired_at`, `residual_value` | Core (job) | Debe ser idempotente y reejecutable |
| `ReferralCreated` | `referrer_party_id`, `referred_identifier_hash`, `code`, `channel` | Core | **Hash del identificador**, no el dato en claro |
| `ReferralConverted` | `referral_id`, `order_id`, `commission`, `fraud_score` | Core | Solo tras `PaymentReceived` |
| `WarrantyOpened` | `serial`, `party_id`, `symptom`, `opened_at`, `sla_due` | Soporte | Cuelga del Pasaporte del Equipo |
| `ReturnCreated` | `order_id`, `reason`, `credit_note_ref`, `benefits_to_reverse[]` | Odoo + Core | **`benefits_to_reverse` es obligatorio** — es el rollback de §C.8 |

## F.4 Regla de oro de eventos

> **Solo los eventos con contrapartida física o financiera verificada otorgan valor:** `PaymentReceived`, `EquipmentInstalled`, `StayCompleted`.
>
> `LeadCreated`, `ReferralCreated` y similares **nunca** otorgan beneficio. Son declaraciones, y las declaraciones son gratis de falsificar.

Esta regla, sola, elimina la mayor parte de la superficie de fraude descrita en §C.9.

---

# H. GATES VERIFICABLES

El Playbook exige evidencia pero no define su formato. Sin formato, "evidencia" degrada a captura de pantalla de algo que parecía funcionar.

## H.1 Definición de "terminado"

Un entregable está terminado **solo si** existen las seis:

| # | Evidencia | Formato |
|---|---|---|
| 1 | **URL** | Enlace vivo y accesible por Marlon |
| 2 | **Commit** | SHA en la rama, revisable |
| 3 | **Prueba** | Comando ejecutable con salida, o guion de prueba manual reproducible |
| 4 | **Captura** | Móvil **y** escritorio para cualquier cosa visual |
| 5 | **Dato** | Un número medido, no estimado |
| 6 | **Reversión** | Cómo se deshace si falla |

El punto 6 no está en el Playbook y es el que más falta: sin plan de reversión, cada despliegue es apuesta.

## H.2 Gates del MVP (detalle completo en `docs/MVP-30-DAYS-v1.md`)

| Gate | Nombre | Criterio de aprobación (binario) | Bloquea a |
|---|---|---|---|
| **G0** | Legal habilitante | Concepto escrito sobre Supervigilancia + política de tratamiento de datos publicada | **TODO** |
| **G1** | Producto costeado | 5 productos con costo verificado, precio contado/crédito, margen calculado, garantía y alcance de instalación escritos | G2 |
| **G2** | Landing convierte | 1 landing en producción, móvil < 3 s, formulario con consentimiento, UTM capturado end-to-end | G3 |
| **G3** | Lead trazable | Un lead de prueba recorre landing → Core → Odoo con el mismo `correlation_id`, verificable en los tres sistemas | G4 |
| **G4** | WhatsApp operativo | Número verificado, plantilla aprobada, conversación registrada contra el lead correcto | G5 |
| **G5** | Venta real | Una venta cobrada, facturada con CUFE, instalada con serial registrado | G6 |
| **G6** | Ciclo medido | 30 días de datos: leads, costo por lead, conversión, margen real vs estimado | Decisión de escalar |
| **P-SYSCOM** | POC proveedor | Las 7 preguntas de §B.8 respondidas por escrito | Decisión de catálogo |

**Regla:** un gate no se aprueba parcialmente. Es binario. "Casi" es "no".

---

# J. ESCALABILIDAD — 1, 10 Y 100 CIUDADES

## J.1 Qué se rompe primero en cada escalón

| Dimensión | 1 ciudad | 10 ciudades | 100 ciudades |
|---|---|---|---|
| **Cuello de botella real** | Atención comercial (personas) | **Técnicos y calidad de instalación** | Gobierno de datos y cumplimiento |
| Tecnología | Cualquier cosa funciona | Odoo aguanta; el problema es el proceso | Problema de datos, no de servidores |
| Identidad | Deduplicación manual viable | **Imposible sin reglas** | Requiere gobierno formal + ciclo de calidad |
| Fiscal | 1 ICA, 1 régimen | **10 ICA municipales** (REQUIERE FUENTE) | Inviable sin automatización tributaria |
| Precios | Uno | **Por ciudad** (flete, mano de obra, competencia) | Motor de precios con reglas territoriales |
| Inventario | Una bodega | Bodega central + consignación | Red logística real |
| Técnicos | Conocidos personalmente | **Certificación y auditoría de calidad obligatorias** | Franquicia o red de partners certificados |
| Beneficios | Manual | Ledger indispensable | Pasivo material auditado |
| Soporte | WhatsApp personal | Turnos y SLA | Centro de contacto |
| **Lo que realmente falla** | Nada técnico | **Consistencia de servicio** | **Confianza de marca** |

## J.2 El hallazgo incómodo sobre la escala

**El límite de Atheron no será la tecnología. Será la calidad de instalación.**

Un sistema de seguridad mal instalado en Zipaquirá daña la marca en Bogotá, porque la seguridad es una categoría donde el boca a boca negativo es desproporcionado: el cliente que sufre un robo con una cámara mal apuntada no escribe una reseña, habla durante años.

**Implicación estratégica que el Playbook no extrae:** el activo replicable no es el software; es el **procedimiento de instalación verificable** — checklist, foto obligatoria por punto, prueba de grabación, firma del cliente, registro del serial. Eso es lo que debe estar listo antes de la ciudad 2, y el Playbook lo trata como detalle operativo (§12) en lugar de como el núcleo del producto replicable.

## J.3 Múltiples proveedores

Hoy hay uno (SYSCOM, y en realidad dos entidades — §B.8). El día que haya tres, sin capa anticorrupción, habrá tres esquemas de SKU, tres formatos de stock, tres políticas de garantía y tres integraciones acopladas al catálogo.

**Modelo correcto desde el día 1** (barato ahora, carísimo después):

```
AtheronProduct (SKU Atheron, ficha aprobada, precio Atheron, estado de publicación)
      │
      └──< SupplierOffer (supplier_id, supplier_sku, costo, stock, lead_time, moneda)
```

Un producto Atheron, N ofertas de proveedor. Cambiar de proveedor = añadir una oferta, no reescribir el catálogo. **Esta única decisión de modelado es la diferencia entre poder negociar con proveedores y estar capturado por uno.**

## J.4 Monedas e impuestos futuros

El Playbook no los menciona. No hay que construirlo, pero sí hay que **no bloquearlo**:

- Todo importe se persiste con **moneda explícita** (`amount` + `currency`), jamás un número suelto.
- Los importes monetarios en **enteros de unidad mínima** (o decimal exacto), nunca coma flotante.
- El impuesto se persiste **desglosado** (base, tasa, valor, tipo), no incluido en un total.
- `country_code` en direcciones desde el día 1.

Costo de hacerlo ahora: cero. Costo de no hacerlo: migración de datos financieros históricos.

## J.5 B2C, B2B, familias y grupos empresariales

El modelo `Party` (persona **o** empresa) con relaciones `Party↔Party` resuelve los cuatro casos sin rediseño:

| Caso | Modelado |
|---|---|
| B2C individual | `Party(person)` |
| Familia | `Party(person)` ──`member_of`──> `Household` |
| B2B | `Party(company)` ──`employs`──> `Party(person)` |
| Grupo empresarial | `Party(company)` ──`subsidiary_of`──> `Party(company)` |

**Riesgo específico B2B que el Playbook no ve:** si un empleado compra para su empresa, **¿los beneficios son de la empresa o de la persona?** Responderlo mal genera un conflicto real con clientes corporativos (el empleado acumulando beneficios personales con presupuesto de la compañía). Debe ser política explícita antes del primer cliente B2B.

---

# K. REFERENTES INTERNACIONALES

**Metodología y límites.** Consulté fuentes públicas el **15 de septiembre de 2026**. Reporto lo que la fuente dice, con enlace y fecha. **No verifiqué de forma independiente las cifras** que publican las propias compañías o los medios; deben leerse como "lo reportado", no como auditado. Donde la información no apareció, lo digo en lugar de rellenar.

**Sobre "esto no existe en Colombia":** el encargo prohíbe esa frase sin evidencia, con razón. La evidencia que encontré apunta a lo contrario — **sí existe** una coalición de lealtad multimarca a gran escala en Colombia (Puntos Colombia, K.1), y sí existe un modelo de suscripción cross-vertical operando en el país (Meli+, K.2). La novedad de Atheron no está en el concepto.

---

### K.1 — Puntos Colombia · coalición lealtad (Colombia)

**Fuentes:** [Grupo Éxito, comunicado de nacimiento](https://www.grupoexito.com.co/en/node/898) · [Xataka Colombia](https://www.xataka.com.co/otros/puntos-colombia-asi-funcionara-el-programa-de-lealtad-mas-grande-del-pais) · [Bancolombia](https://www.grupobancolombia.com/personas/necesidades/mas-beneficios/puntos-colombia) — consultados 15-sep-2026.

**Qué es, según las fuentes:** coalición entre Bancolombia y Grupo Éxito que reemplazó a Puntos Bancolombia, Puntos Éxito y Puntos Carulla. Se describe como la primera coalición de lealtad entre un *retailer* y un banco en Latinoamérica. Nació con ~13 millones de clientes potenciales y permite acumular y redimir en más de 100 marcas (Cine Colombia, Frisby, Carulla, entre otras).

- **Qué estudiar:** cómo se gobierna una moneda de lealtad compartida entre dos dueños con intereses distintos, y cómo se liquida el costo entre emisor y redentor.
- **Qué adaptar:** la figura del **sponsor económico por beneficio** (§E.2) es exactamente el problema que una coalición debe resolver desde el contrato, no desde el software.
- **Qué NO copiar:** la moneda universal de puntos. Atheron no tiene ni el volumen ni el balance para sostener un pasivo de puntos, y una moneda genérica contradice el propio Playbook (*"no queremos un programa genérico de puntos"*, §6).
- **Aprendizaje directo:** **el mercado colombiano de lealtad multimarca ya está ocupado por un actor con 13 millones de clientes.** Atheron no puede competir en amplitud. Solo puede competir en **profundidad vertical** — saber qué hay instalado en la casa del cliente, que es algo que Puntos Colombia jamás sabrá.
- **Ventaja defendible para Atheron:** profundidad de contexto sobre pocos clientes, frente a amplitud superficial sobre millones.

---

### K.2 — Meli+ (Mercado Libre) · suscripción cross-vertical (Colombia/LatAm)

**Fuentes:** [ENTER.CO](https://www.enter.co/empresas/meli-asi-funciona-la-nueva-suscripcion-de-mercado-libre-en-colombia-con-planes-desde-9-900-envios-gratis-y-beneficios-en-streaming/) · [Mercado Libre Colombia](https://www.mercadolibre.com.co/blog/meli-la-suscripcion-del-mercado-libre-con-mas-beneficios-para-ti) — consultados 15-sep-2026.

**Qué es, según las fuentes:** desde el 26 de agosto de 2025 Meli+ reemplazó el esquema de niveles en Colombia, con dos planes (Esencial ~$9.900/mes y Total ~$24.900/mes) que combinan envíos gratis, cuotas sin interés, cashback (3% reportado en el plan Esencial) y beneficios de streaming. Colombia fue el quinto país de la región en adoptarlo.

- **Qué estudiar:** la migración de "niveles por comportamiento" a "suscripción pagada". Es la decisión que Atheron enfrentará con el Loop.
- **Qué adaptar:** una **membresía pagada es un mejor negocio que una escalera de descuentos**, porque genera ingreso recurrente en lugar de erosionar margen. Es la alternativa directa al 5/10/15/20 de §B.2.
- **Qué NO copiar:** el bundling de streaming. Es subsidio cruzado que requiere el balance de Mercado Libre.
- **Aprendizaje directo:** ya existe en Colombia una suscripción que agrupa beneficios de categorías distintas. El concepto de "ecosistema con beneficios" no es novedad para el consumidor colombiano; **la ejecución local y física sí puede serlo.**
- **Ventaja defendible:** Meli+ no instala nada en tu casa ni conoce a tu técnico.

---

### K.3 — Rakuten · ecosistema de puntos multiservicio (Japón)

**Fuentes:** [Rakuten Group, nota de prensa 2020](https://global.rakuten.com/corp/news/press/2020/0924_01.html) · [Think Insights, modelo de ecosistema](https://thinkinsights.net/commercial-excellence/rakutens-ecosystem-business-model) · [Loyalty & Reward Co](https://loyaltyrewardco.com/rakuten/) — consultados 15-sep-2026.

**Qué es, según las fuentes:** más de 70 servicios (comercio, banca, seguros, tarjeta, viajes, móvil) unidos por Rakuten Points desde 2002. Las fuentes reportan que el porcentaje de uso cruzado subió a 72,3% (junio 2020) desde 64,9% (junio 2017), y más de 111 millones de miembros, de los cuales alrededor del 70% usa más de dos servicios.

- **Qué estudiar:** **este es literalmente el Atheron Loop, ejecutado durante 24 años.** El "punto de presente" (puntos por probar un servicio nuevo del grupo) es el mecanismo explícito de venta cruzada.
- **Qué adaptar:** incentivar la **primera transacción en una línea nueva**, no la recompra en la línea conocida. La recompra ocurre sola si el servicio es bueno; el salto de vertical no.
- **Qué NO copiar:** la escala, la moneda universal y los 70 servicios. Rakuten llegó ahí en dos décadas, no en un roadmap de 9 fases.
- **Aprendizaje directo:** el uso cruzado tardó **tres años en subir 7 puntos porcentuales** en una empresa con decenas de millones de usuarios y capital ilimitado. **La expectativa de Atheron sobre la velocidad de la venta cruzada debe recalibrarse drásticamente hacia abajo.**
- **Ventaja defendible:** ninguna frente a Rakuten. La lección es de humildad y de horizonte temporal.

---

### K.4 — Grab · super app y red de partners (Sudeste Asiático)

**Fuentes:** [Grab, expansión de GrabRewards](https://www.grab.com/my/press/tech-product/grab-expands-partners-for-grabrewards/) · [Grab, Partner Apps](https://www.grab.com/sg/press/others/grab-launches-third-party-partner-apps-within-grab-app-offering-more-everyday-services-for-everyday-needs/) — consultados 15-sep-2026.

**Qué es, según las fuentes:** GrabRewards se describe como el mayor programa de lealtad del Sudeste Asiático, con más de 150 comercios en su ecosistema de recompensas. Grab abrió su app a *Partner Apps* de terceros (bicicletas compartidas, tiquetes de bus, car-sharing, eSIM) accesibles sin descarga ni login adicional, y reporta acceso a ~46 millones de usuarios transaccionales mensuales.

- **Qué estudiar:** el modelo de partner como **inquilino** dentro de la experiencia propia, no como enlace externo.
- **Qué adaptar:** para Atheron, el equivalente local y realista es que el aliado no necesite ningún software: **un código de redención de un solo uso, verificable por WhatsApp**. Cero fricción de adopción para el aliado.
- **Qué NO copiar:** exigirle a un restaurante de Zipaquirá que integre una API o instale una app. Morirá en la adopción.
- **Aprendizaje directo:** la red de aliados se gana con **tráfico entregado**, no con contratos firmados. Un aliado que no ve clientes nuevos abandona el programa en semanas, y un programa con aliados inactivos daña la marca más que no tener programa.
- **Ventaja defendible:** en una ciudad secundaria, la relación personal con los comercios es una barrera real que ningún super app replica a distancia.

---

### K.5 — Accor ALL · ecosistema de lealtad en hospitalidad (global)

**Fuentes:** [Accor Group, ALL](https://group.accor.com/en/brands-and-experiences/all-accor) · [Accor, alianzas de lealtad](https://group.accor.com/en/news-stories/all-loyalty-partnerships) — consultados 15-sep-2026.

**Qué es, según las fuentes:** ALL reúne 45+ marcas en 110 países, más de 100 socios internacionales, ~100 millones de miembros, y una operación de F&B con más de 10.000 restaurantes y bares.

- **Qué estudiar:** cómo se conecta hospedaje con gastronomía y experiencias bajo una identidad única — **el mismo problema que Atheron quiere resolver, con 100 millones de miembros.**
- **Qué adaptar:** el principio de que los beneficios de hospitalidad con **bajo costo marginal** (upgrade, late check-out, mesa preferente) son los que sostienen un programa. Coincide con §6.3 del Playbook y refuerza la recomendación de §B.2.
- **Qué NO copiar:** la arquitectura de niveles globales y la complejidad de reciprocidad entre socios.
- **Aprendizaje directo:** la unión hotel + restaurante + experiencia bajo una identidad **es un modelo maduro con líderes establecidos**. Atheron no está inventando la categoría; está intentando una versión hiperlocal de ella.
- **Ventaja defendible:** Accor no vende ni instala seguridad para el hogar del huésped. **La combinación seguridad + hospitalidad sí es inusual** (ver §L).

---

### K.6 — Verisure / Securitas Direct · seguridad por suscripción (Europa y LatAm)

**Fuentes:** [Verisure, presentación corporativa julio 2025 (PDF)](https://www.verisure.com/system/files/private_pdf/2025-08/verisure-company-presentation-july-2025.pdf) · [Quartr, análisis](https://quartr.com/insights/company-research/verisure-security-leader-ready-for-a-comeback-ipo) — consultados 15-sep-2026.

**Qué es, según las fuentes:** alarmas monitoreadas por suscripción mensual para hogar y pequeño negocio en 16–17 mercados europeos y latinoamericanos, con más de 5 millones de clientes. Los servicios de portafolio (suscripción de monitoreo y soporte) representan cerca del **87% de los ingresos**; los ingresos iniciales vienen de instalación y equipo. Salió a bolsa en Nasdaq Estocolmo el 8 de octubre de 2025.

- **Qué estudiar:** **el número más importante de toda esta sección para Atheron: 87% del ingreso es recurrente, no de venta de equipo.**
- **Qué adaptar:** la pregunta estratégica que Atheron no se ha hecho. El Playbook diseña un negocio de **venta transaccional** de equipos, con fidelización basada en descuentos. Verisure demuestra que en esta industria el valor está en el **servicio recurrente** — monitoreo, mantenimiento, garantía extendida, revisión anual.
- **Qué NO copiar:** contratos largos con permanencia agresiva; generan mala reputación y en Colombia tienen restricciones de protección al consumidor.
- **Aprendizaje directo — y es una crítica de fondo al Playbook:** **un plan de mantenimiento mensual modesto genera más LTV, más recompra y más razones legítimas de contacto que toda la escalera 5/10/15/20, y en lugar de destruir margen, lo crea.** Si hay que elegir una sola cosa para construir después del MVP, es esto, no el Loop.
- **Ventaja defendible:** ingreso recurrente + base instalada conocida. Es el moat real de la industria.

---

### K.7 — ADT · base instalada y economía del suscriptor (EE. UU.)

**Fuentes:** [ADT Inc., Formulario 10-K FY2025 (SEC)](https://www.sec.gov/Archives/edgar/data/1703056/000170305626000022/adt-20251231.htm) · [Security.org, comparativos](https://www.security.org/home-security-systems/best/) — consultados 15-sep-2026.

**Qué es, según las fuentes:** a 31 de diciembre de 2025, ~6,1 millones de suscriptores de monitoreo. El 10-K describe inversión inicial significativa para adquirir cada suscriptor, con ingreso recurrente posterior y **punto de equilibrio en aproximadamente dos años**. Monitoreo profesional reportado entre USD 24,99 y 49,99 mensuales.

- **Qué estudiar:** la economía cruda del suscriptor: se paga por adelantado para adquirirlo y se recupera en ~24 meses.
- **Qué adaptar:** la disciplina de medir **CAC y periodo de recuperación**, no solo margen por venta. El Playbook mide CAC (§16) pero no lo conecta con el subsidio implícito de los beneficios del Loop.
- **Qué NO copiar:** subsidiar equipo agresivamente para ganar suscripción. Requiere balance que Atheron no tiene, y contradice §4.2.
- **Aprendizaje directo:** si Atheron llegara a ofrecer monitoreo o mantenimiento recurrente, **cada descuento del Loop es capital invertido que debe recuperarse en un plazo conocido.** Un descuento sin plazo de recuperación calculado es una pérdida diferida.
- **Ventaja defendible:** ninguna frente a ADT en escala. La lección es de método financiero.

---

### K.8 — Nubank · venta cruzada como motor (LatAm)

**Fuentes:** [Monexa, análisis financiero ARPAC](https://www.monexa.ai/blog/nubank-financial-analysis-arpac-growth-and-strateg-NU-2025-08-06) · [The Wolf of Harcourt Street](https://www.thewolfofharcourtstreet.com/p/nu-holdings-investment-thesis) — consultados 15-sep-2026.

**Qué es, según las fuentes:** promedio reportado de ~4,1 productos por cliente; ARPAC reportado en torno a USD 11,2 (Q1 2025) y cifras posteriores cercanas a USD 13, con crecimiento atribuido a venta cruzada de préstamos y seguros. La estrategia descrita: adquirir con un producto simple y monetizar después con productos adyacentes.

- **Qué estudiar:** "producto ancla simple → productos adyacentes" es exactamente el patrón que Atheron necesita, ejecutado en el mismo continente y con clientes de perfil comparable.
- **Qué adaptar:** **definir el producto ancla y no negociarlo.** Para Atheron debería ser un producto de Línea Hogar, no el ecosistema. El ecosistema es la consecuencia, no la entrada.
- **Qué NO copiar:** la velocidad. Nubank tuvo capital para subsidiar la adquisición durante años.
- **Aprendizaje directo:** **ARPAC (ingreso por cliente activo) es mejor KPI para Atheron que "clientes con 2+ unidades" (§16).** Un cliente con dos productos baratos vale menos que uno con un contrato de mantenimiento. Recomiendo cambiar ese KPI.
- **Ventaja defendible:** el patrón es replicable a escala pequeña; no requiere capital, requiere secuencia.

---

### K.9 — Sephora Beauty Insider · niveles y datos de cero parte (global)

**Fuentes:** [Loyalty Juggernaut, perfil del programa](https://lji.io/directory/retail/sephora-beauty-insider) · [Joy, desglose](https://joy.so/blog/sephora-loyalty-program/) — consultados 15-sep-2026.

**Qué es, según las fuentes:** tres niveles (Insider gratis, VIB desde ~USD 350 de gasto anual, Rouge desde ~USD 1.000), ~34 millones de miembros, y se reporta que alrededor del 80% de los ingresos provienen de miembros del programa. Recolecta *zero-party data* mediante cuestionarios, listas de deseos y Color IQ, que alimenta recomendaciones personalizadas.

- **Qué estudiar:** los niveles se ganan por **gasto anual verificable**, no por antigüedad ni por comportamiento difuso. Simple, auditable, difícil de falsificar.
- **Qué adaptar:** el dato de cero parte. Atheron tiene una versión superior y natural: **el diagnóstico de seguridad del hogar**. El cliente declara puertas, accesos, horarios, preocupaciones — información valiosísima, dada voluntariamente, que alimenta la siguiente mejor acción con fundamento real.
- **Qué NO copiar:** la rotación de recompensas y la gamificación. Requiere frecuencia de compra que la seguridad del hogar no tiene (se compra cada varios años).
- **Aprendizaje directo — corrección importante al Playbook:** en categorías de **baja frecuencia**, los niveles por gasto acumulado casi no producen comportamiento. **El nivel debe basarse en la relación (equipos activos, contrato de mantenimiento vigente, referidos convertidos), no en gasto acumulado.** El 5/10/15/20 del Playbook está calcado de retail de alta frecuencia y no aplica a esta categoría.
- **Ventaja defendible:** el diagnóstico de seguridad como activo de datos propietario y consentido.

---

### K.10 — Starbucks Rewards · lealtad de alta frecuencia (global)

**Fuente:** [Emarsys/SAP, mejores programas de lealtad en retail](https://emarsys.com/learn/blog/best-retail-customer-loyalty-programs/) — consultado 15-sep-2026.

**Qué es, según la fuente:** programa basado en estrellas por cada dólar gastado en compras elegibles, con reconocimiento por su utilidad real y experiencia móvil.

- **Qué estudiar:** funciona porque la compra es **diaria**. La economía del programa depende de la frecuencia.
- **Qué adaptar:** poco, directamente.
- **Qué NO copiar:** **el modelo de puntos por peso gastado.** Es el error por defecto al que todo programa gravita, y para Atheron sería el peor de los mundos: pasivo contable creciente, sin cambio de comportamiento, en una categoría de baja frecuencia.
- **Aprendizaje directo:** **contraejemplo deliberado.** Lo incluyo para dejar por escrito qué NO debe hacer Atheron. La frecuencia de compra determina si un programa de puntos tiene sentido; la seguridad del hogar tiene la frecuencia opuesta a un café.
- **Ventaja defendible:** ninguna. Sirve como advertencia.

---

### K.11 — Toast · SaaS vertical con densidad local (EE. UU.)

**Fuentes:** [Toast, Formulario S-1 (SEC)](https://www.sec.gov/Archives/edgar/data/1650164/000119312521258447/d166297ds1.htm) · [SaaStr, ventas SMB verticales con el CRO de Toast](https://www.saastr.com/10-things-that-are-different-in-vertical-smb-sales-with-toasts-cro/) — consultados 15-sep-2026.

**Qué es, según las fuentes:** plataforma todo-en-uno para restaurantes (software, pagos, hardware) con un ecosistema de terceros que incluye proveedores nacionales, socios tecnológicos y **socios locales — contadores, abogados, consultores**. Las fuentes describen efectos de red por **densidad de restaurantes en un mercado**: al alcanzar cierta penetración local, las tasas de cierre suben por prueba social y por el ecosistema local.

- **Qué estudiar:** **la densidad local como efecto de red.** Es el concepto más transferible a Atheron de toda esta lista.
- **Qué adaptar:** **dominar Zipaquirá completamente antes de abrir una segunda ciudad.** La prueba social en una ciudad secundaria es un activo compuesto: cada instalación visible genera la siguiente. Expandirse antes de saturar destruye ese efecto y convierte a Atheron en un competidor genérico en 10 mercados.
- **Qué NO copiar:** la amplitud de plataforma. Toast tardó años y capital.
- **Aprendizaje directo — esto valida la tesis "Zipaquirá es el laboratorio", pero con una corrección:** Zipaquirá no debe ser un laboratorio del que se sale rápido. Debe ser el mercado donde se alcanza **densidad dominante**, y esa densidad es el activo que después se replica. **La métrica de graduación de ciudad no es "el sistema funciona", es "somos el proveedor por defecto en esta ciudad".**
- **Ventaja defendible:** **este es el moat más real y más alcanzable de Atheron** (ver §L).

---

### K.12 — Shopify · ecosistema de socios (global)

**Fuente:** [Webstacks, efectos de red de programas de socios](https://www.webstacks.com/blog/how-the-network-effects-of-partner-programs-help-startups-scale-faster) — consultado 15-sep-2026.

**Qué es, según la fuente:** el ecosistema de socios se describe como fuente clave de ventaja competitiva y catalizador de efectos de red multilaterales, con ingresos del ecosistema reportados en USD 6.900 millones en 2019.

- **Qué estudiar:** los socios venden porque **ganan dinero**, no porque exista un contrato de alianza.
- **Qué adaptar:** cualquier aliado de Atheron debe tener una razón económica medible y visible para participar.
- **Qué NO copiar:** un programa formal de partners con niveles y certificaciones. Prematuro en órdenes de magnitud.
- **Aprendizaje directo:** **si el aliado no puede ver cuánto ganó este mes con Atheron, el programa muere.** Eso exige conciliación — que es contabilidad con terceros (§C.5) y por eso está en DO NOT BUILD YET.
- **Ventaja defendible:** ninguna a esta escala.

---

### K.13 — Talon.One / Open Loyalty / Voucherify · motores de incentivos (global, B2B)

**Fuentes:** [Talon.One, software de gestión de lealtad](https://www.talon.one/blog/loyalty-management-software) · [Extole, comparativa de motores](https://www.extole.com/blog/loyalty-engine-software/) · [Voucherify vs Talon.One](https://www.voucherify.io/talon-alternative) — consultados 15-sep-2026.

**Qué son, según las fuentes:** plataformas *API-first* / headless que combinan promociones, lealtad, referidos y gamificación con motores de reglas configurables sin código. Talon.One se describe con decisiones en tiempo real y acceso a un *ledger* de lealtad; Open Loyalty reporta 250+ endpoints (REST y GraphQL) y cientos de millones de operaciones de acumulación/redención mensuales.

- **Qué estudiar:** **la existencia misma de esta categoría es la evidencia de que el Loop es un producto comprable, no un diferenciador.** Si tres empresas venden motores de lealtad configurables, construir uno propio no es ventaja competitiva; es costo.
- **Qué adaptar:** **el patrón arquitectónico**, aunque no se compre el producto: motor headless, separado del ERP, con ledger propio y reglas configurables. Es exactamente la Opción B de `ARCHITECTURE-OPTIONS-v1.md`, y coincide con §D.
- **Qué NO copiar:** el alcance. Latencias de decenas de milisegundos y millones de decisiones por minuto son irrelevantes para Atheron por muchos años.
- **Aprendizaje directo — decisión concreta:** cuando llegue el momento del Loop, **evaluar comprar antes que construir.** Si un motor comercial resuelve reglas, ledger y expiraciones por una mensualidad, construirlo internamente solo se justifica si el diferencial está en las reglas propias — y ahí el diferencial de Atheron no está en el motor, está en los **datos físicos** que lo alimentan.
- **Ventaja defendible:** ninguna en el motor. Toda en los datos de entrada.

---

### K.14 — SYSCOM · integración de proveedor (México / Colombia)

**Fuentes:** [SYSCOM Developers (MX)](https://developers.syscom.mx/) · [SYSCOM Colombia Dev](https://developers.syscomcolombia.com/) · [SYSCOM, acerca de](https://www.syscom.mx/principal/acerca_de) — consultados 15-sep-2026.

**Qué es, según las fuentes:** mayorista de tecnología y seguridad con más de 75.000 productos y 18 centros de distribución en Estados Unidos, México y Colombia. API REST v1 con OAuth 2.0 (`client_credentials`) que expone productos, categorías, marcas, existencias y precios, consulta de facturas y guías, cotización, cálculo de envío y generación de órdenes. Portales de desarrollador **separados** para México y Colombia.

- **Qué estudiar:** que la API cubra cotización, envío y órdenes es materialmente más de lo que el Playbook asume. Puede acortar la Fase 4 — **si se confirma para la entidad colombiana.**
- **Qué adaptar:** nada directamente; es un proveedor, no un modelo de negocio.
- **Qué NO copiar / NO asumir:** **no asumir que la API de Colombia es igual a la de México.** Portales separados sugieren catálogos, existencias y condiciones separados.
- **Aprendizaje directo:** las 7 preguntas de §B.8 son el POC completo. Responderlas cuesta días y decide si el modelo de catálogo nacional es viable.
- **Ventaja defendible:** **ninguna.** Cualquier integrador colombiano puede pedir las mismas credenciales. Integrar SYSCOM **no es un moat**, es una tabla de apuestas. Es importante decirlo porque el Playbook le dedica una fase entera del roadmap.

---

## K.15 Síntesis de la investigación — las cinco lecciones que cambian el plan

1. **El concepto no es nuevo.** Rakuten lo hace desde 2002; Puntos Colombia tiene 13 millones de clientes en este país. La frase "esto no existe en Colombia" sería falsa.
2. **El dinero de esta industria está en el ingreso recurrente, no en la venta.** Verisure: ~87% del ingreso es suscripción. El Playbook diseña un negocio transaccional.
3. **La baja frecuencia mata los programas de puntos.** Sephora y Starbucks funcionan por frecuencia. Atheron debe basar sus niveles en relación (equipos activos, mantenimiento vigente), no en gasto acumulado.
4. **La densidad local es un efecto de red real y alcanzable.** Toast lo demuestra. Es lo que convierte "Zipaquirá es el laboratorio" en estrategia en lugar de eslogan — siempre que se busque dominio, no validación rápida.
5. **El motor de lealtad es un producto que se compra.** Los datos que lo alimentan no. Invertir donde está la diferencia.

---

# L. DIFERENCIACIÓN DEFENDIBLE — SIN CORTESÍAS

El encargo pide dureza. La aplico.

## L.1 Clasificación honesta de cada componente

### YA EXISTE (sin ninguna novedad)

| Componente del Playbook | Quién ya lo hace |
|---|---|
| Programa de fidelización por niveles | Sephora, Accor, miles más |
| Coalición multimarca con beneficios | **Puntos Colombia, en este país, 13M de clientes** (K.1) |
| Identidad única cross-vertical | Rakuten desde 2002, 111M de miembros (K.3) |
| Venta cruzada entre líneas de negocio | Nubank, Grab, Mercado Libre (K.2, K.4, K.8) |
| Referidos con comisión | Categoría entera de software |
| Suscripción con beneficios agrupados | **Meli+, en Colombia, desde agosto 2025** (K.2) |
| Integración con mayorista vía API | Cualquier integrador con credenciales SYSCOM (K.14) |
| Next Best Action | Función estándar de CRM |
| Seguridad para el hogar con instalación | Cientos de integradores en Colombia |

**Esto es la mayor parte del Playbook.** Dicho sin rodeos: **el Atheron Loop, tal como está descrito, no tiene ningún elemento que no exista en el mercado**, y sus referentes lo hacen con más capital, más clientes y más años.

### COMBINACIÓN INTERESANTE (no novedosa, pero inusual)

- **Seguridad + hospitalidad bajo un mismo operador con activos propios.** Accor no vende cámaras; Verisure no opera hoteles. Que el mismo dueño tenga 7 casas operando y una línea de seguridad es genuinamente inusual.
- **Ciudad secundaria como mercado primario.** La mayoría de los ecosistemas se construyen en capitales y bajan. Empezar en Zipaquirá invierte el orden.
- **Operación física + datos.** La mayoría de los programas de lealtad son puramente digitales; no tocan la casa del cliente.

**Advertencia honesta:** "interesante" no es "defendible". Una combinación inusual es copiable por cualquiera que vea que funciona.

### POTENCIALMENTE NOVEDOSO (requiere validación)

- **El Pasaporte del Equipo como eje de la relación.** Vincular serial + instalación + técnico + configuración + garantía + mantenimiento + retoma **al perfil de identidad del cliente**, y usar ese historial físico para decidir la siguiente acción comercial. No encontré un referente que lo haga así en el segmento hogar de LatAm. **REQUIERE FUENTE** — ausencia de evidencia no es evidencia de ausencia; no lo afirmo como hecho.
- **Retoma verificada como mecanismo de fidelización.** El upgrade con trade-in de equipo propio, restringido a lo que Atheron instaló, crea un ciclo de renovación que un programa de puntos no puede imitar porque requiere presencia física.

### MOAT DEFENDIBLE (lo que realmente protege)

Ordenado por fuerza real, y en desacuerdo explícito con lo que el Playbook prioriza:

| # | Moat | Por qué defiende | Fuerza | ¿El Playbook lo prioriza? |
|---|---|---|---|---|
| 1 | **Base instalada con seriales e historial** | Nadie más sabe qué hay en esa casa, cómo está configurado ni cuándo toca mantenimiento. Reemplazar a Atheron cuesta re-diagnosticar. Es *switching cost* legítimo. | **Alta y creciente** | No — es §12, tratado como registro operativo |
| 2 | **Densidad de técnicos y prueba social local** | En una ciudad secundaria, ser el proveedor por defecto es una barrera real (efecto Toast, K.11). Crece con cada instalación visible. | **Alta, pero local** | Parcialmente (§17) |
| 3 | **Ingreso recurrente por mantenimiento/monitoreo** | Convierte clientes en suscriptores. Es el moat de Verisure (K.6, ~87% del ingreso). | **Alta** | **NO — no existe en el Playbook** |
| 4 | **Confianza en categoría de miedo** | La seguridad se compra por confianza. La marca local con reputación verificable es difícil de desplazar con publicidad. | Media-alta, lenta | Implícita |
| 5 | **Diagnóstico de seguridad como dato de cero parte** | El cliente entrega voluntariamente información sobre su hogar que ningún competidor tiene (K.9). | Media, alto potencial | No |
| 6 | **Acuerdos exclusivos con aliados locales** | Copiable: cualquiera ofrece mejores condiciones. | **Baja** | Sí — Capa D |
| 7 | **El programa de fidelización** | Es software configurable que se compra (K.13). | **Muy baja** | **Sí — es el "motor diferenciador" §6** |
| 8 | **La integración con SYSCOM** | Cualquiera pide las mismas credenciales. | **Nula** | Sí — Fase 4 completa |

## L.2 La inversión estratégica que recomiendo

> **El Playbook invierte su esfuerzo en los moats 6, 7 y 8 — los tres más débiles — y trata los moats 1, 2 y 3 como detalles operativos o no los menciona.**

Esto no es un matiz. Es la recomendación central de esta auditoría:

| El Playbook dice | Yo recomiendo |
|---|---|
| El motor diferenciador es el Atheron Loop (§6) | El motor diferenciador es la **base instalada con historial verificable** |
| La Fase 7 construye el Loop | La fase siguiente al MVP construye **mantenimiento recurrente** |
| Las alianzas son la Capa D del ecosistema | Las alianzas son **marketing**, no infraestructura. Trátense como campaña, no como plataforma |
| SYSCOM merece una fase del roadmap | SYSCOM es una tarea de aprovisionamiento de una semana |
| La venta cruzada valida el ecosistema | **Mídase primero si existe** (experimento E1, §B.3) |

**El moat real de Atheron es aburrido: saber qué hay instalado en cada casa de la ciudad, y ser quien lo mantiene.** Eso no se copia con software, no se compra a un proveedor y se acumula con cada instalación. Es lento, físico, y por eso mismo defendible.

## L.3 Lo que destruiría el moat

1. **Crecer a otra ciudad antes de dominar Zipaquirá** — diluye el único efecto de red disponible.
2. **Una instalación deficiente visible** — en seguridad, la reputación negativa es asimétrica.
3. **Publicar beneficios no acordados con aliados** — el Playbook ya lo prohíbe; es la regla correcta.
4. **Construir el Loop antes que la base instalada** — invertir el activo diferencial en el componente comprable.

---

# M. IMPACTO HUMANO Y GOBIERNO

El Playbook (§18) tiene la intención correcta y cero estructura. En materia laboral y societaria colombiana, la intención sin estructura genera riesgo real.

## M.1 El riesgo central: promesas que crean expectativas exigibles

El Playbook contiene, dirigido a colaboradores:

> *"puedan llegar a dirección; puedan liderar unidades; y, donde exista mérito, estructura y viabilidad, puedan evolucionar hacia **participación estratégica**"* (§2)

Y en la escalera del **cliente** (§6.1):

> *"Nivel 5 — Aliado / oportunidad estratégica"*

**Dos problemas distintos:**

1. **Con colaboradores:** insinuar participación societaria sin instrumento jurídico genera expectativa. En Colombia, beneficios reiterados y promesas pueden discutirse después como parte de la remuneración. **REQUIERE FUENTE (concepto laboral).** El Playbook ya condiciona correctamente (*"solo después de validación legal y financiera"*, §18), pero §2 lo dice sin ese condicionamiento. **Inconsistencia interna que debe corregirse en el texto.**

2. **Con clientes:** poner "oportunidad estratégica" como nivel alcanzable de la escalera es peor: sugiere al mercado que comprar mucho abre la puerta a ser socio. **Recomiendo eliminar el Nivel 5 de la escalera pública.** Las alianzas estratégicas se negocian caso por caso, no se ganan por volumen de compra.

## M.2 Carrera — rutas explícitas en lugar de aspiraciones

Propongo cuatro rutas con niveles verificables. Lo que importa no son los nombres, sino que **cada nivel tenga criterio objetivo y consecuencia salarial conocida.**

| Ruta | Niveles | Criterio de ascenso (objetivo, no discrecional) |
|---|---|---|
| **Técnica** | Auxiliar → Técnico → Técnico Sr → Especialista → Líder Técnico | Instalaciones sin retrabajo, certificaciones, calificación del cliente, cero incidentes de seguridad |
| **Comercial** | Asesor → Asesor Sr → Líder Comercial → Gerente de Ciudad | Conversión, **margen realizado** (no solo volumen), recompra de su cartera, cero reclamos por información falsa |
| **Operaciones** | Aux. → Coordinador → Jefe de Operaciones | Cumplimiento de SLA, rotación de inventario, exactitud de inventario |
| **Ciudad** | — → Líder de Ciudad | P&L de ciudad, no solo ventas |

**Regla que hace honesto el sistema:** cada nivel se publica con su rango salarial y sus criterios. Un ascenso que depende de la simpatía del jefe no es una ruta de carrera; es una lotería con nombre corporativo.

## M.3 Formación — lo que la operación exige, no cursos genéricos

Tres programas, con evaluación y consecuencia:

1. **Certificación técnica interna Atheron** — protocolo de instalación, prueba de grabación, documentación del Pasaporte del Equipo, trato con el cliente. **Solo técnicos certificados instalan.** Esto no es RR. HH.: es el mecanismo que protege el moat #1 y #2 (§L.1) y lo que hace replicable la ciudad 2.
2. **Certificación de producto** con los fabricantes cuando exista (Hikvision, Dahua y similares suelen ofrecer programas; **REQUIERE FUENTE** sobre disponibilidad en Colombia y costo).
3. **Formación en protección de datos** — obligatoria para todo el que toque datos de clientes o video. Es exigencia práctica de la Ley 1581, no un detalle.

**Métrica de formación que sí importa:** tasa de retrabajo por técnico antes y después de certificar. Si no baja, el programa no sirve.

## M.4 Incentivos — atados a lo verificable, no a lo declarado

| Rol | Incentivo correcto | Incentivo peligroso (y por qué) |
|---|---|---|
| Asesor comercial | % sobre **margen realizado y cobrado** | % sobre venta facturada → incentiva vender a crédito a quien no paga y regalar descuento |
| Técnico | Bono por instalación **sin retrabajo a 90 días** + calificación del cliente | Bono por cantidad de instalaciones → incentiva velocidad sobre calidad, que es el riesgo #1 de §J.2 |
| Líder de ciudad | % sobre **contribución de la ciudad** | % sobre ingresos → incentiva crecer con margen negativo |
| Todos | Componente por **cero incidentes de datos/seguridad** | — |

**Principios no negociables:**
1. Ningún incentivo se paga sobre dinero no cobrado.
2. Todo incentivo tiene *clawback* si la venta se reversa o el cliente cae en mora temprana. **Debe estar en el contrato desde el inicio**, no anunciarse después.
3. Ningún incentivo puede hacer rentable para la persona algo que es no rentable para la empresa.

## M.5 Ownership operativo — definirlo antes de usar la palabra

"Ownership" en el Playbook es ambiguo entre autonomía y propiedad. Propongo restringirlo explícitamente a **autonomía con rendición de cuentas**:

- Un dueño de proceso decide **cómo** se hace, dentro de límites escritos.
- Tiene un número que le pertenece y que se publica semanalmente.
- Tiene presupuesto acotado que puede ejecutar sin pedir permiso.
- **No implica participación societaria.** Debe decirse así, por escrito, para que nadie construya una expectativa distinta.

## M.6 Profit-sharing y participación — los riesgos reales

El Playbook condiciona correctamente a validación legal y financiera. Añado los riesgos concretos que deben resolverse con asesor colombiano, porque son los que suelen sorprender:

| Esquema | Riesgo principal | Estado |
|---|---|---|
| **Bono por resultados** (participación en utilidades, discrecional y anual) | En Colombia, pagos habituales pueden discutirse como **factor salarial**, con efecto en prestaciones sociales y aportes. Debe pactarse expresamente su naturaleza | **REQUIERE FUENTE (laboral)** — es el camino más simple, y aun así requiere redacción cuidadosa |
| **Phantom equity / derechos sobre valorización** | Tratamiento tributario del pago al momento de ejercerse; naturaleza salarial | **REQUIERE FUENTE (laboral + tributario)** |
| **Participación real en SAS** | Un socio minoritario tiene derechos de información y voto; complica futuras rondas y la venta. Salida de un socio empleado = conflicto | **REQUIERE FUENTE (societario)** |
| **Participación por unidad de negocio** | Requiere P&L separado creíble por unidad y reglas de precios de transferencia internas | **NO HACER hasta que exista contabilidad por unidad** |

**Mi recomendación como CTO, sin rodeos:**

> **No prometer nada hoy. Construir primero la contabilidad que haría posible cualquier esquema.**
>
> Un esquema de participación sin P&L confiable por unidad y por ciudad es una promesa que no se puede cumplir ni medir — y las promesas incumplidas de participación destruyen equipos con más eficacia que los salarios bajos.
>
> **Secuencia correcta:** (1) contabilidad por unidad y por ciudad → (2) bono por resultados con reglas escritas y auditables → (3) si la empresa alcanza escala y hay concepto legal, considerar participación.
>
> **Lo que sí se puede prometer hoy, porque cuesta poco y vale mucho:** rutas de carrera publicadas, rangos salariales transparentes, certificación pagada por la empresa, y criterios de ascenso objetivos. Eso retiene gente de verdad, es verificable, y no crea pasivos ocultos.

## M.7 Aliados y futuros socios estratégicos

- **Aliado comercial ≠ socio.** Usar palabras distintas, siempre, en todo documento.
- Todo aliado necesita: acuerdo escrito, condiciones económicas, vigencia, causales de terminación, y tratamiento de datos de clientes compartidos (Ley 1581 — **la transferencia de datos a un aliado requiere fundamento legal propio**).
- **Ningún beneficio se publica sin acuerdo firmado.** El Playbook ya lo dice (§5, Capa C). Es correcto y debe ser gate bloqueante.

---

# GOBERNANZA DOCUMENTAL

## El problema, en una frase

**Este proyecto ya tuvo su primer incidente de gobernanza documental, y es la razón por la cual esta auditoría se retrasó tres intentos:** el documento maestro vivía en Google Drive, inaccesible para el entorno que debía ejecutarlo. Hoy, tras el commit `2803907`, existe en dos lugares. **Sin una regla explícita, en dos semanas divergirán.**

## Regla de asignación

| Vive en **Google Drive** | Vive en **GitHub `/docs`** |
|---|---|
| Documentos comerciales y contratos | **Toda decisión que restrinja la implementación** |
| Material de marketing, piezas gráficas | Modelo de datos y contratos de eventos |
| Actas, presentaciones, discusión abierta | Reglas de precio y de beneficios |
| Cotizaciones y anexos de proveedores | Políticas técnicas (seguridad, secretos, backups) |
| Documentos legales firmados | ADRs |
| Borradores y lluvia de ideas | Playbook **vigente** (el que obliga) |

**Criterio único y simple:** *si un agente o un desarrollador debe obedecerlo para escribir código, está en el repositorio. Si es material de negocio para humanos, está en Drive.*

## Cómo se evita la doble fuente de verdad

1. **El repositorio gana siempre.** Ante conflicto, `/docs` es la versión vigente. Sin excepción.
2. **Drive apunta al repositorio, nunca lo duplica.** El documento en Drive queda reducido a un enlace y una nota: *"versión vigente en `/docs/brief/ecosystem-v1.md`"*. Mantener dos copias completas garantiza divergencia.
3. **Un solo Playbook vigente en el repositorio**, versionado por commits. Las versiones anteriores están en el historial de git, no en archivos `v2`, `v3`, `_final`.
4. **Toda decisión estructural pasa por ADR.** Un cambio de arquitectura anunciado en un chat, en un Doc o en una reunión **no existe** hasta que hay ADR fusionado.
5. **El Playbook no se edita silenciosamente.** Cambiar una regla que afecta implementación (precios, beneficios, identidad) exige ADR que lo justifique y referencia cruzada.

## ADRs propuestos

Creados en `docs/adr/`, todos en estado **PROPUESTO** — ninguno decidido. Requieren aprobación de Marlon, con revisión del Agente B.

| ADR | Decisión | Bloquea |
|---|---|---|
| 0000 | Proceso y plantilla de ADR | Todos |
| 0001 | Identidad canónica del cliente y deduplicación | Modelo de datos, Loop |
| 0002 | Frontera Odoo / Atheron Core | Toda la arquitectura |
| 0003 | Contratos de eventos sin bus de mensajes | Integraciones |
| 0004 | Ledger de beneficios append-only fuera de Odoo | Loop, contabilidad |
| 0005 | Idempotencia, webhooks y reintentos | Pagos, WhatsApp, proveedores |
| 0006 | Gestión de secretos y entornos | Seguridad, POC SYSCOM |
| 0007 | Consentimiento y tratamiento de datos (Ley 1581) | Formularios, WhatsApp, Loop |
| 0008 | Multiciudad y multiempresa (tenancy) | Modelo de datos, contabilidad |
| 0009 | Capa anticorrupción de proveedores | Catálogo, SYSCOM |
| 0010 | Stack de frontend y landings | MVP |
| 0011 | Gobernanza documental | Proceso |
| 0012 | Observabilidad mínima y trazabilidad del dinero | Operación |

---

# CONTRADICCIONES ENTRE EL PLAYBOOK Y EL ENCARGO

El encargo pidió no ocultarlas. Estas son, con impacto y resolución.

| # | Contradicción | Impacto | Resolución propuesta |
|---|---|---|---|
| **X1** | Playbook §4.4 "Odoo centraliza todo, incluidos beneficios" **vs** §4.5 "Odoo no debe ser una cárcel" | **Alto, diferido.** Hace imposible salir de Odoo sin reconstruir | Separar sistema de registro del dinero (Odoo) del de la relación (Atheron Core). ADR-0002, ADR-0004 |
| **X2** | Playbook §6.2 escalera 5/10/15/20 **vs** §4.2 "liquidez antes que crecimiento" y §4.7 "cada producto debe ser rentable" | **Alto, inmediato.** Margen de contribución cae a ~15% (§B.2) | Piso de margen duro + migrar a beneficios de bajo costo marginal + membresía pagada (K.2, K.6) |
| **X3** | Playbook §1 origen turístico **vs** §15 MVP de Línea Hogar residencial | **Alto, estratégico.** La venta cruzada puede no tener sustrato | Experimento E1 (§B.3) antes de invertir en el Loop |
| **X4** | Playbook §15 Loop en Fase 7 **vs** necesidad de capturar identidad y eventos desde la Fase 1 | **Alto, irreversible.** Los eventos no se recuperan | Separar **captura** (día 1, barata) de **motor** (después, cara). §E.4 |
| **X5** | Playbook §4.3 "no inventar" **vs** constantes sin origen (0,52; 0,85; 5/10/15/20; ~1.000 turistas) | **Medio, cultural.** Erosiona el propio principio | Nota de origen y fecha para cada constante, o marca `[ORIGEN PENDIENTE]` |
| **X6** | Playbook §13 (Agente B hace QA y auditoría) **vs** §22 (Claude audita a B, B audita a Claude) | **Medio.** Sin mecanismo de arbitraje ante desacuerdo real | ADRs como instrumento de decisión; Marlon aprueba; divergencias se registran, no se borran |
| **X7** | Playbook §22 menciona "Ronda 3, auditor independiente" **vs** §13 no lo define | **Bajo.** Control inexistente que genera falsa confianza | Nombrarlo o eliminarlo del Playbook |
| **X8** | Playbook §2 insinúa "participación estratégica" **vs** §18 la condiciona a validación legal | **Medio, legal.** Expectativas exigibles | Unificar el lenguaje bajo el condicionamiento de §18. Eliminar Nivel 5 de la escalera pública |
| **X9** | Encargo §E pide diseñar Household, Tier, NBA **vs** encargo §G pide MVP para vender ya | **Medio.** Riesgo de construir el Loop en lugar de vender | Diseñar en papel (esta auditoría), construir después. §E.5 |
| **X10** | Encargo prohíbe asumir capacidades de proveedores **vs** Playbook §8 ya afirma qué "podría aportar" SYSCOM | **Bajo.** El Playbook usa condicional — correcto | Convertir cada "podría" en las 7 preguntas verificables de §B.8 |
| **X11** | Playbook §4.1 "cliente primero" **vs** §6.2 escalera que premia al cliente que más gasta | **Bajo, filosófico.** Gasto ≠ valor de la relación | Basar niveles en relación (equipos activos, mantenimiento), no en gasto (K.9) |

---

# HIPÓTESIS QUE REQUIEREN PRUEBA

Cada una con su experimento y su criterio de decisión. **Ninguna debe darse por cierta al construir.**

| # | Hipótesis (del Playbook o implícita) | Experimento | Criterio de decisión | Costo |
|---|---|---|---|---|
| **E1** | Existe solapamiento real entre clientes de hospitalidad y de seguridad | Registrar ciudad + contacto previo con las 7 casas en cada lead, 90 días | <5% → no construir Loop · 5–15% → solo registro · >15% → invertir | ~0 (3 campos) |
| **E2** | El margen de 38,8% sobrevive a la operación real | Comparar margen estimado vs realizado en las primeras 20 ventas, incluyendo sobrecostos de instalación | Desviación >5 pts → recalcular el divisor 0,52 antes de escalar | ~0 (disciplina) |
| **E3** | La API de SYSCOM Colombia permite el modelo de catálogo nacional | Las 7 preguntas de §B.8, por escrito | Si el despacho directo a cliente final no existe → el modelo nacional cambia | Días |
| **E4** | Odoo puede soportar el ledger de beneficios con sponsor y reversa | Prueba P1 (§C.3) en instancia de evaluación | Si no puede → ledger fuera de Odoo (ya es mi recomendación) | Días |
| **E5** | WhatsApp es económicamente viable como canal de seguimiento masivo | Obtener tarifa Colombia por categoría + modelar costo a 100/1.000 leads/mes | Si el costo por lead nutrido > X% del margen → rediseñar hacia la ventana de 24 h | Horas |
| **E6** | La comercialización e instalación no requiere licencia de Supervigilancia | Concepto jurídico escrito (§B.5) | **BLOQUEANTE.** Si la requiere, todo el plan comercial cambia | Honorarios |
| **E7** | Los 5 productos de Línea Hogar tienen demanda a este precio en esta ciudad | Landing + inversión publicitaria controlada, 30 días | Costo por lead calificado y conversión vs modelo | Presupuesto de pauta |
| **E8** | Los clientes quieren beneficios cross-vertical | Ofrecer un beneficio de aliado a los primeros 50 clientes, medir redención | Redención <10% → el Loop no resuelve un problema real del cliente | Bajo |
| **E9** | Existe disposición a pagar por mantenimiento recurrente | Ofrecer plan de mantenimiento a los primeros 30 clientes instalados | Tasa de adopción >20% → **es la prioridad post-MVP, por encima del Loop** (K.6) | ~0 |
| **E10** | Los técnicos disponibles alcanzan la calidad requerida | Medir retrabajo a 90 días en las primeras 20 instalaciones | Retrabajo >10% → la restricción es capacidad técnica, no demanda | ~0 |

**E9 es la hipótesis más valiosa y la más barata de toda la lista, y no está en el Playbook.** Si se valida, cambia el modelo de negocio de transaccional a recurrente — que es donde la evidencia de la industria dice que está el valor (K.6, K.7).

---

# LAS 10 DECISIONES QUE MARLON Y EL AGENTE B DEBEN TOMAR

Ninguna es técnica. Todas bloquean código. Ordenadas por urgencia.

### D1 — ¿Atheron es un negocio de venta o un negocio de servicio recurrente?
**Por qué ahora:** determina el modelo de datos, el modelo de precios y el propósito del Loop. La evidencia externa (Verisure ~87% de ingreso recurrente, K.6) sugiere fuertemente la segunda opción, y el Playbook asume la primera sin discutirlo.
**Opciones:** (a) venta transaccional con fidelización por descuentos · (b) venta + mantenimiento recurrente · (c) híbrido con membresía pagada (K.2).
**Mi recomendación: (b), con (c) a evaluar tras el experimento E9.**

### D2 — ¿Se procede antes de tener el concepto jurídico de Supervigilancia?
**Por qué ahora:** es el único bloqueante potencialmente existencial (§B.5).
**Mi recomendación: NO. Obtener el concepto antes de la primera venta con instalación.** Es la decisión más incómoda de esta auditoría y la que más riesgo elimina.

### D3 — ¿La escalera 5/10/15/20 se mantiene, se sustituye o se congela?
**Por qué ahora:** el margen de contribución cae a ~15% en el peor caso (§B.2), y si se anuncia es difícil retirarla.
**Mi recomendación: congelarla.** No publicar ninguna escalera hasta tener el modelo de contribución con datos reales. Sustituir por beneficios de bajo costo marginal.

### D4 — ¿Crédito propio o aliado financiero?
**Por qué ahora:** el crédito propio consume la caja que §4.2 quiere proteger, y puede tener implicaciones regulatorias (§C.6).
**Mi recomendación: aliado financiero, o crédito propio con inicial ≥ costo directo, sin excepciones.**

### D5 — ¿El ledger de beneficios y la identidad viven dentro o fuera de Odoo?
**Por qué ahora:** define si Atheron podrá salir de Odoo algún día. Resuelve la contradicción X1.
**Mi recomendación: fuera.** ADR-0002, ADR-0004.

### D6 — ¿Cuál es el producto ancla, y se acepta no construir el ecosistema hasta validarlo?
**Por qué ahora:** determina si los próximos 30 días se dedican a vender o a construir plataforma.
**Mi recomendación: un producto de Línea Hogar. El ecosistema espera al experimento E1.**

### D7 — ¿Cuántas compañías legales existen y cuándo se crea la segunda?
**Por qué ahora:** multiempresa prematura es un impuesto contable permanente (§C.5).
**Mi recomendación: una sola, hasta que un contador diga lo contrario por razón fiscal o legal, no por orden mental.**

### D8 — ¿Qué se promete hoy al equipo en materia de participación?
**Por qué ahora:** las expectativas creadas son difíciles de retirar y pueden ser exigibles (§M.1, §M.6).
**Mi recomendación: nada sobre participación. Sí rutas de carrera publicadas, rangos salariales y certificación pagada.** Construir primero la contabilidad por unidad.

### D9 — ¿Quién arbitra un desacuerdo entre el Agente A y el Agente B?
**Por qué ahora:** esta auditoría es el primer caso de prueba (contradicción X6).
**Mi recomendación: Marlon, mediante aprobación de ADR, con las posiciones divergentes registradas por escrito.**

### D10 — ¿Se abre una segunda ciudad antes de dominar Zipaquirá?
**Por qué ahora:** el único efecto de red disponible es la densidad local (K.11, §L.1).
**Mi recomendación: no. Definir "dominar" con un número (participación estimada, instalaciones visibles, recompra) y no abrir hasta alcanzarlo.**

---

# RESPUESTAS DIRECTAS A LAS PREGUNTAS DE CIERRE

### 6. Arquitectura recomendada
**Opción B — "Odoo para el dinero, Atheron Core para la relación".** Un Odoo casi estándar como ERP; un servicio propio pequeño con PostgreSQL para identidad, log de eventos, consentimiento y (después) ledger de beneficios; landings estáticas; capa anticorrupción para proveedores; contratos de eventos sin bus. Detalle y comparación en `docs/ARCHITECTURE-OPTIONS-v1.md`.

### 7. Qué cambiaría del diseño actual
1. Sacar identidad, eventos, consentimiento y ledger de beneficios fuera de Odoo (X1).
2. Congelar la escalera 5/10/15/20 y sustituirla por beneficios de bajo costo marginal con piso de margen duro (X2).
3. Adelantar a la Fase 1 la **captura** de identidad y eventos; dejar el **motor** del Loop para después (X4).
4. Añadir un gate legal bloqueante de Supervigilancia y una política de datos personales (§B.5, §B.6).
5. Degradar SYSCOM de "fase del roadmap" a "tarea de aprovisionamiento con 7 preguntas".
6. Añadir mantenimiento recurrente como línea de negocio prioritaria post-MVP (K.6).
7. Cambiar el KPI "clientes con 2+ unidades" por ARPAC y por tasa de mantenimiento activo (K.8).
8. Eliminar el "Nivel 5 — Aliado / oportunidad estratégica" de la escalera pública del cliente (§M.1).
9. Reconocer explícitamente que el moat es la base instalada, no el Loop (§L.2).
10. Nombrar o eliminar la "Ronda 3" de auditoría independiente (X7).

### 8. Qué NO construiría todavía
Motor de reglas del Loop · tiers automáticos · Household · redención en aliados · referidos pagados · Next Best Action · app móvil · ecommerce nacional · catálogo sincronizado completo · dropshipping automático · segunda compañía legal · segunda ciudad · bus de eventos · multimoneda. Detalle en `docs/MVP-30-DAYS-v1.md`.

### 9. Qué parte puede convertirse en moat real
En orden de fuerza: **(1)** base instalada con seriales e historial de mantenimiento; **(2)** densidad de técnicos y prueba social en ciudad secundaria; **(3)** ingreso recurrente por mantenimiento; **(4)** confianza en una categoría de miedo; **(5)** diagnóstico de seguridad como dato de cero parte. **No** son moat: el programa de fidelización, las alianzas locales, ni la integración con SYSCOM (§L.1).

### 10. Qué podría impedir que esto llegue a ser multinacional
1. **Regulación de seguridad privada país por país** — cada mercado tiene su régimen; no es replicable por copia.
2. **Calidad de instalación** — el límite real es humano, no tecnológico (§J.2).
3. **Datos atrapados en customizaciones de Odoo** — si ocurre, el activo no es transferible ni vendible (X1).
4. **Un incidente de datos con video de clientes** — en seguridad, la confianza no se recupera.
5. **Régimen de datos personales distinto por país** — un consentimiento mal diseñado no se puede retrofitear sobre la base histórica.
6. **Dependencia de un solo canal (WhatsApp/Meta)** — un bloqueo de número corta las ventas.
7. **Concentración en el fundador** — el Playbook depende de Marlon para visión, aprobación y arbitraje. Es el riesgo de gobierno más subestimado del documento.
8. **Moneda, impuestos y precios de transferencia** — evitable hoy con decisiones baratas de modelado (§J.4).

### 11. Decisiones necesarias antes de escribir código
D1, D2, D3, D5, D6, D7 (arriba) + los ADR 0001, 0002, 0003, 0005, 0007 aprobados + la tabla de dependencias de §B.11 completa.

### 12. Pruebas y fuentes que faltan
Los 10 experimentos de §"Hipótesis que requieren prueba" + las fuentes marcadas **REQUIERE FUENTE** a lo largo del documento: concepto de Supervigilancia, concepto laboral/societario/tributario, tarifas de WhatsApp para Colombia, tarifa negociada de pasarela, estado real de Odoo, credenciales SYSCOM, régimen de ICA municipal, datos de ocupación de las 7 casas, y el origen documentado de las constantes 0,52 y 0,85.

---

## CIERRE

El Playbook es un buen documento de intención empresarial y un documento de arquitectura incompleto. Sus principios son mejores que los de la mayoría de proyectos en esta etapa; su modelo de datos, su modelo de dinero y su modelo legal todavía no existen.

La recomendación se resume en una frase: **construir un negocio de seguridad rentable con instrumentación desde el día uno, y dejar que los datos decidan si el ecosistema existe.** La captura es barata e irreversible si se omite. El motor es caro y siempre se puede comprar después.

Esta auditoría no reemplaza la ejecución. Aprobadas las decisiones, el siguiente paso es el gate G0 y las tareas MUST NOW de `docs/MVP-30-DAYS-v1.md` — nada más.

**Documento en estado PROPUESTO. Ninguna decisión está tomada. Pendiente de revisión del Agente B y aprobación de Marlon.**
