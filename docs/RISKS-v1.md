# REGISTRO DE RIESGOS — ATHERON ECOSYSTEM v1

**Autor:** Agente A (Claude Code) · **Fecha:** 15 de septiembre de 2026
**Documento complementario de:** `docs/AUDIT-CLAUDE-v1.md`
**Estado:** PROPUESTO

---

## Método de puntuación

`Severidad (1–5) × Probabilidad (1–5) = Exposición (1–25)`

**Severidad:** 5 = amenaza la existencia del negocio · 4 = pérdida financiera o legal mayor · 3 = retrasa o encarece materialmente · 2 = molestia operativa · 1 = menor.

**Probabilidad:** 5 = ocurrirá salvo que se actúe · 4 = muy probable · 3 = probable · 2 = posible · 1 = improbable.

**Ventana:** cuándo hay que atenderlo, no cuándo ocurre.

---

## TOP 15 RIESGOS

### 🔴 R01 — Requisito de licencia de Supervigilancia no verificado
**Sev 5 × Prob 3 = 15** · Owner: **Marlon** · Ventana: **ANTES de la primera venta**

**Impacto.** El Decreto 356 de 1994 regula, entre otros, la comercialización, instalación y utilización de equipos para vigilancia y seguridad privada, y exige licencia para prestar servicios con medios tecnológicos ([Decreto 356/1994](http://www.secretariasenado.gov.co/senado/basedoc/decreto_0356_1994.html); [Supervigilancia](https://supervigilancia.gov.co/publicaciones/6338/preguntas-frecuentes-supervigilancia/) — consultados 15-sep-2026). Si el modelo de Atheron requiere licencia y opera sin ella: sanciones, cierre, contratos inválidos, y todo el trabajo de 30 días sobre una base no operable. **El Playbook no menciona a Supervigilancia ni una vez.**

**Mitigación.** Gate G0/M0. Concepto jurídico escrito antes de la primera venta con instalación, respondiendo las 4 preguntas de la auditoría §B.5. Si se requiere licencia, iniciar el trámite y ajustar el alcance comercial mientras tanto.

**Señal temprana.** Cualquier cliente o competidor preguntando por el registro ante Supervigilancia.

---

### 🔴 R02 — El apilamiento de beneficios destruye el margen
**Sev 5 × Prob 4 = 20** · Owner: **Marlon + Agente B** · Ventana: **antes de publicar cualquier beneficio**

**Impacto.** Cálculo reproducible (auditoría §B.2): partiendo de 38,8% de margen bruto de contado, el tope de la escalera Loop (20%) + referido (5%) + pasarela (~3,15%) deja el margen de contribución en **~15,4%**, antes de CAC, garantías, devoluciones y sobrecostos de instalación. A ese nivel, cada venta con beneficios apilados puede ser destructiva de valor sin que nadie lo note hasta el cierre contable.

**Mitigación.** (1) Piso de margen duro verificado en el motor de precios, no en la buena voluntad. (2) Prohibir apilar descuento porcentual con comisión de referido. (3) Migrar a beneficios de bajo costo marginal (Accor, K.5). (4) Congelar el 5/10/15/20 hasta tener modelo de contribución real. (5) Evaluar membresía pagada (Meli+, K.2) en lugar de escalera de descuentos.

**Señal temprana.** Margen realizado que se desvía > 5 puntos del estimado en las primeras ventas (experimento E2).

---

### 🔴 R03 — La tesis del ecosistema no tiene sustrato
**Sev 5 × Prob 3 = 15** · Owner: **Marlon** · Ventana: **medir desde el día 1, decidir al día 90**

**Impacto.** El origen del proyecto es turístico; el MVP es residencial. Si el solapamiento entre ambos segmentos es cercano a cero, la venta cruzada —corazón económico del ecosistema— no tiene sobre qué ocurrir, y toda inversión en identidad unificada, Loop y aliados se hace sobre una premisa falsa (auditoría §B.3).

**Mitigación.** Experimento E1: tres campos en el formulario desde el día 1. Decisión al día 90 con umbrales predefinidos (<5% no construir · 5–15% solo registro · >15% invertir). **Costo del experimento: prácticamente cero. Costo de omitirlo: la estrategia entera.**

**Señal temprana.** Primeros 30 leads sin un solo contacto previo con la capa de hospitalidad.

---

### 🔴 R04 — Consentimiento insuficiente bajo Ley 1581
**Sev 4 × Prob 4 = 16** · Owner: **Marlon** · Ventana: **antes del primer formulario en producción**

**Impacto.** La Ley 1581 de 2012 exige autorización previa, expresa e informada, y la SIC puede imponer multas de hasta 2.000 SMMLV ([Ley 1581](https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/ley_1581_2012.htm); [SoftGRC](https://softgrc.com/blog/que-es-habeas-data) — consultados 15-sep-2026). Agravante específico: **el ecosistema entero depende de un consentimiento de finalidad cruzada que el Playbook no diseñó.** El dato recogido para instalar una cámara no autoriza automáticamente ofrecer un restaurante aliado. **Y no es retrofiteable sobre la base histórica.**

**Mitigación.** ADR-0007. Consentimiento granular por finalidad, versionado, con evidencia (timestamp, IP, texto exacto de la política vigente). Casilla separada y no preseleccionada para fines comerciales. Política publicada antes del primer lead.

**Señal temprana.** Primera solicitud de supresión de datos que no se pueda atender.

---

### 🟠 R05 — Odoo se convierte en cárcel
**Sev 4 × Prob 4 = 16** · Owner: **Agente A + Agente B** · Ventana: **antes de escribir la primera customización**

**Impacto.** Contradicción X1 del Playbook. Si identidad, ledger y reglas viven como custom de Odoo, salir de Odoo es reconstruir Atheron, y el activo de datos queda no transferible. Las fuentes consultadas estiman actualizaciones de módulos custom entre USD 10.000 y 40.000 y señalan la personalización no gobernada como el principal riesgo de actualización ([Silent Infotech](https://silentinfotech.com/blog/odoo-1/odoo-community-vs-enterprise-true-cost-comparison-2026-461); [Carbon](https://carbon.ms/learn/why-odoo-implementations-fail) — consultados 15-sep-2026).

**Mitigación.** Opción B de arquitectura (ADR-0002, ADR-0004). Techo duro: si el custom de Odoo supera ~15% del esfuerzo, revisar la arquitectura antes de continuar.

**Señal temprana.** La segunda customización de Odoo en el mismo mes.

---

### 🟠 R06 — Calidad de instalación inconsistente
**Sev 4 × Prob 4 = 16** · Owner: **Marlon** · Ventana: **desde la primera instalación**

**Impacto.** En seguridad, el boca a boca negativo es asimétrico: el cliente con una cámara mal apuntada que sufre un robo habla durante años. Es **el límite real de escala** (§J.2) y destruye el moat #2 (densidad y prueba social local) justo cuando empieza a formarse.

**Mitigación.** M8: protocolo verificable —serial, foto por punto, prueba de grabación con el cliente, firma—. Certificación interna antes de la ciudad 2. Bono del técnico atado a **cero retrabajo a 90 días**, nunca a cantidad de instalaciones.

**Señal temprana.** Tasa de retrabajo > 10% en las primeras 20 instalaciones (experimento E10).

---

### 🟠 R07 — Fuga de dinero por webhooks no idempotentes
**Sev 4 × Prob 4 = 16** · Owner: **Agente A** · Ventana: **día 1 de integraciones**

**Impacto.** Pasarela, WhatsApp y SYSCOM reintentan por diseño. Sin idempotencia: leads duplicados, beneficios otorgados dos veces, órdenes o cobros duplicados. El daño es silencioso y se descubre en la conciliación.

**Mitigación.** ADR-0005: clave de idempotencia con índice único, verificación de firma, separación recepción/procesamiento, DLQ visible, ninguna suposición sobre el orden de llegada.

**Señal temprana.** El primer lead duplicado con el mismo teléfono en minutos.

---

### 🟠 R08 — Dependencia de un solo canal (WhatsApp/Meta)
**Sev 4 × Prob 3 = 12** · Owner: **Marlon** · Ventana: **antes de depender del canal**

**Impacto.** El Playbook hace de WhatsApp el canal de cierre. Si Meta restringe el número por calidad o política, se corta el canal de ventas de un día para otro. Añadido: desde julio de 2025 se cobra por mensaje de plantilla entregado, sin la cuota gratuita anterior, y las plantillas de marketing se cobran desde el primer envío sin descuento por volumen ([Blueticks](https://blueticks.co/blog/whatsapp-business-pricing-change-2026-per-message) — consultado 15-sep-2026).

**Mitigación.** Formulario web y teléfono siempre disponibles. Toda conversación registrada en Core (si se pierde el canal, no se pierde la historia). Diseñar el seguimiento dentro de la ventana de 24 h, que es gratuita. **REQUIERE FUENTE: tarifa de Colombia por categoría.**

**Señal temprana.** Caída de la calificación de calidad del número.

---

### 🟠 R09 — Identidad mal resuelta: fusión errónea de clientes
**Sev 4 × Prob 3 = 12** · Owner: **Agente A** · Ventana: **antes del segundo canal de captura**

**Impacto.** **En seguridad, un falso positivo de deduplicación expone la configuración del sistema de una casa a otra persona.** Es un incidente de seguridad física, no solo de datos. Y sin `merge/unmerge` no destructivo, es irreversible.

**Mitigación.** ADR-0001. Solo determinístico en fase 1. Jerarquía de claves. Fusión no destructiva con `unmerge`. Cola de revisión humana para casos ambiguos. Objetivo > 95% de precisión en coincidencias determinísticas ([Amperity](https://amperity.com/blog/identity-resolution-techniques-probabilistic-deterministic-hybrid) — consultado 15-sep-2026).

**Señal temprana.** El primer cliente que ve datos que no son suyos.

---

### 🟠 R10 — Fraude en referidos y beneficios
**Sev 3 × Prob 4 = 12** · Owner: **Agente B + Agente A** · Ventana: **antes de activar referidos pagados**

**Impacto.** El fraude en programas de referidos y lealtad se estima en torno a USD 1.000 millones anuales, con USD 3.100 millones en puntos redimidos clasificados como fraudulentos solo en EE. UU.; los vectores dominantes son auto-referido con cuentas falsas y granjas de referidos ([Voucherify](https://www.voucherify.io/blog/blowing-the-whistle-how-to-combat-referral-abuse-and-fraud); [Rivo](https://www.rivo.io/blog/fraud-prevention-referrals-statistics) — consultados 15-sep-2026). En Atheron se añade el vector interno: colusión de técnico o de aliado.

**Mitigación.** Regla de oro (§F.4): **solo eventos con contrapartida física o financiera verificada otorgan valor** — pago confirmado, equipo instalado con serial, estadía completada. Nunca un registro o una invitación. Más: comisión solo tras venta pagada, detección de ciclos, límites por household, redención con código de un solo uso.

**Señal temprana.** Referidos con direcciones o medios de pago coincidentes.

---

### 🟠 R11 — Pasivo por beneficios no medido
**Sev 3 × Prob 4 = 12** · Owner: **Marlon + contador** · Ventana: **antes del primer beneficio otorgado**

**Impacto.** Bajo IFRS 15 los beneficios otorgados son obligación de desempeño y se reconocen como pasivo diferido; la ruptura se reconoce conforme ocurre la redención ([IFRS Community](https://ifrscommunity.com/knowledge-base/customer-loyalty-programmes/) — consultado 15-sep-2026). Sin ledger, el pasivo no es calculable ni auditable, y sin vencimientos crece indefinidamente.

**Mitigación.** ADR-0004: ledger append-only con vencimiento obligatorio en **todo** beneficio, sin excepción. Reporte mensual de pasivo. Revisión con el contador antes de otorgar el primero.

**Señal temprana.** Cualquier beneficio creado sin fecha de vencimiento.

---

### 🟠 R12 — Filtración de datos de configuración de seguridad
**Sev 5 × Prob 2 = 10** · Owner: **Agente A** · Ventana: **día 1**

**Impacto.** El Pasaporte del Equipo contiene ubicación de cámaras, configuración y topología de sistemas de seguridad de terceros. Su filtración es un incidente de seguridad física para los clientes y, potencialmente, el fin de la confianza en la marca. En una categoría de miedo, no se recupera.

**Mitigación.** ADR-0006: cero secretos en el repositorio, entornos separados, mínimo privilegio por rol en Odoo (el técnico no ve cartera; el vendedor no ve configuraciones de otros clientes), MFA obligatorio, cifrado en reposo, plan de respuesta a incidentes, backups probados.

**Señal temprana.** Cualquier credencial encontrada en el historial de git.

---

### 🟡 R13 — SYSCOM no soporta el modelo asumido
**Sev 3 × Prob 3 = 9** · Owner: **Agente A** · Ventana: **antes de prometer catálogo nacional**

**Impacto.** El Playbook asume un proveedor; existen al menos dos operaciones con portales de desarrollador separados ([developers.syscom.mx](https://developers.syscom.mx/); [developers.syscomcolombia.com](https://developers.syscomcolombia.com/) — consultados 15-sep-2026). Si el despacho directo a cliente final no existe, o el stock reportado no es colombiano, el modelo de catálogo nacional cambia de raíz. Publicar disponibilidad basada en stock de otro país violaría el propio §4.3.

**Mitigación.** POC con las 7 preguntas de la auditoría §B.8, respondidas por escrito antes de cualquier promesa comercial. Capa anticorrupción y modelo `AtheronProduct → N SupplierOffer` desde el diseño (ADR-0009).

**Señal temprana.** Primera discrepancia entre stock publicado y stock real.

---

### 🟡 R14 — Cartera y crédito sin política
**Sev 3 × Prob 3 = 9** · Owner: **Marlon** · Ventana: **antes de la primera venta a crédito**

**Impacto.** Una inicial inferior al costo directo convierte a Atheron en financiador de inventario con su propia caja — exactamente lo que §4.2 prohíbe. Sin política de mora, la cartera se descubre cuando ya es incobrable.

**Mitigación.** `inicial_mínima ≥ costo_directo + costo_financiero + reserva_mora` (≈52% del precio de crédito con la regla actual). Política de mora escrita. **REQUIERE FUENTE jurídica** sobre otorgar crédito directo al consumidor y sobre límites de tasa. Decisión D4: evaluar aliado financiero.

**Señal temprana.** La primera excepción a la inicial mínima "por cerrar la venta".

---

### 🟡 R15 — Concentración en el fundador
**Sev 4 × Prob 3 = 12** · Owner: **Marlon** · Ventana: **continuo**

**Impacto.** El Playbook concentra en Marlon la visión, la aprobación final y el arbitraje entre agentes (§13, X6). No hay mecanismo de decisión si no está disponible, ni criterio escrito que permita a otro decidir igual. Es el riesgo de gobierno más subestimado del documento y el que más frena la replicabilidad que el propio Playbook exige.

**Mitigación.** Decisiones estructurales por ADR escrito, no por conversación — así el criterio queda documentado y es replicable. Delegación explícita por rango de monto. Segundo aprobador para decisiones financieras. Procedimientos escritos antes de la ciudad 2.

**Señal temprana.** Cualquier decisión operativa detenida esperando a Marlon más de 48 horas.

---

## RESUMEN ORDENADO POR EXPOSICIÓN

| # | Riesgo | Sev | Prob | **Exp** | Owner | Ventana |
|---|---|:---:|:---:|:---:|---|---|
| R02 | Apilamiento destruye margen | 5 | 4 | **20** | Marlon + B | Antes de publicar beneficios |
| R04 | Consentimiento insuficiente | 4 | 4 | **16** | Marlon | Antes del primer formulario |
| R05 | Odoo se vuelve cárcel | 4 | 4 | **16** | A + B | Antes del primer custom |
| R06 | Calidad de instalación | 4 | 4 | **16** | Marlon | Primera instalación |
| R07 | Webhooks no idempotentes | 4 | 4 | **16** | Agente A | Día 1 |
| R01 | Licencia Supervigilancia | 5 | 3 | **15** | Marlon | Antes de la primera venta |
| R03 | Tesis sin sustrato | 5 | 3 | **15** | Marlon | Medir día 1, decidir día 90 |
| R08 | Dependencia de WhatsApp | 4 | 3 | **12** | Marlon | Antes de depender |
| R09 | Fusión errónea de identidad | 4 | 3 | **12** | Agente A | Segundo canal |
| R10 | Fraude en referidos | 3 | 4 | **12** | B + A | Antes de referidos pagados |
| R11 | Pasivo por beneficios | 3 | 4 | **12** | Marlon + contador | Primer beneficio |
| R15 | Concentración en el fundador | 4 | 3 | **12** | Marlon | Continuo |
| R12 | Filtración de configuraciones | 5 | 2 | **10** | Agente A | Día 1 |
| R13 | SYSCOM no soporta el modelo | 3 | 3 | **9** | Agente A | Antes del catálogo nacional |
| R14 | Cartera sin política | 3 | 3 | **9** | Marlon | Primera venta a crédito |

---

## RIESGOS SECUNDARIOS (vigilar, no actuar aún)

| # | Riesgo | Exp | Ventana |
|---|---|:---:|---|
| R16 | ICA municipal multiplicado por ciudad (**REQUIERE FUENTE**) | 8 | Antes de la ciudad 2 |
| R17 | Promesas de participación generan expectativas exigibles | 8 | Antes de cualquier anuncio al equipo |
| R18 | Devolución no reversa beneficios ya otorgados | 6 | Con el primer beneficio |
| R19 | Garantía ante el consumidor la responde Atheron, no el fabricante | 6 | Primera venta |
| R20 | Retoma de equipo de procedencia dudosa | 6 | Primera retoma |
| R21 | Multiempresa prematura como impuesto contable | 6 | Al crear la segunda compañía |
| R22 | Beneficios B2B: ¿de la empresa o del empleado? | 6 | Primer cliente B2B |
| R23 | Aliados inactivos dañan la marca más que no tener programa | 6 | Al lanzar aliados |
| R24 | Backup nunca restaurado | 8 | Día 1 |
| R25 | Constantes financieras sin origen documentado (0,52 / 0,85) | 6 | Al revisar precios |

---

## LOS TRES RIESGOS QUE NO SE PUEDEN RECUPERAR DESPUÉS

Todos los demás admiten corrección. Estos tres, no:

1. **R04 — consentimiento.** No se puede pedir retroactivamente sobre la base histórica.
2. **R03 — instrumentación de la tesis.** Los eventos no ocurridos no se registran después.
3. **R01 — licencia.** Vender sin ella no se deshace con un trámite posterior.

**Los tres se mitigan en la semana 1, y los tres cuestan casi nada comparados con lo que evitan.**

---

**Estado: PROPUESTO.** Requiere revisión del Agente B y asignación formal de owners por Marlon.
