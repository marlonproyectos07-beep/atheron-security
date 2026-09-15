# AUDITORÍA — SEGUNDA PASADA (v2)
## Confrontación Agente A ↔ Agente B · Atheron Ecosystem

**Autor:** Agente A (Claude Code) · **Fecha:** 15 de septiembre de 2026
**Antecede:** `docs/AUDIT-CLAUDE-v1.md` (primera pasada)
**Rama:** `claude/audit-atheron-ecosystem-v1` · PR #1 en DRAFT · **NO MERGE**

> ⚠️ **CIERRE v3 — 15-sep-2026. La conclusión del §1 de este documento fue CORREGIDA por el Agente B y es errónea.**
>
> El §1 concluyó que G0 debía bloquear *solo la instalación*, infiriendo que la comercialización sin instalación podría quedar fuera del requisito. **El artículo 52 del Decreto 356 de 1994 incluye expresamente la comercialización**, junto con fabricación, importación, instalación y arrendamiento. La conclusión correcta y vigente está en **ADR-0014 rev. v3**: la activación comercial de cualquier modalidad queda condicionada al permiso/registro ante Supervigilancia.
>
> Los tres desacuerdos residuales (§10) quedan **cerrados**: D-R1 a favor del Agente A (nombres no numéricos), D-R2 sin desacuerdo (Core Thin = party+identifier+consent+event), D-R3 resuelto por el gate regulatorio (el ancla se congela después). **No queda ningún desacuerdo abierto entre A y B.**
>
> El resto de este documento (§2 a §8, §11–§14) sigue vigente.

---

## 0. NOTA DE ALCANCE — LEER ANTES QUE NADA

**No pude leer el documento de revisión del Agente B.** El archivo *"03 — REVISIÓN AGENTE B — Auditoría Claude v1 y decisiones de arquitectura"* vive en Google Drive y esta sesión no tiene conector de Drive ni acceso de red a `docs.google.com` (verificado de nuevo hoy).

**Lo que sí tengo:** los 8 puntos de resolución que Marlon transmitió, que contienen posiciones sustantivas y direccionales del Agente B. Son suficientes para una segunda pasada honesta.

**Lo que no tengo:** el razonamiento del Agente B. Eso importa, porque el encargo me pide *defender mi posición con evidencia cuando discrepe* — y no se puede rebatir bien un argumento que no se leyó. **Donde el razonamiento de B es determinante, lo marco `REQUIERE FUENTE (razonamiento B)` en lugar de suponerlo.**

Consecuencia práctica: esta v2 resuelve los 8 puntos y reduce los desacuerdos a 3. Si alguno de esos 3 ya estaba resuelto en el documento que no leí, se cierra en la siguiente ronda sin costo.

---

## 1. SUPERVIGILANCIA Y FIGURA JURÍDICA EXACTA

### Posición v1 (Agente A)
Señalé que el Playbook no menciona a Supervigilancia ni una vez, y planteé un gate **bloqueante para toda venta con instalación** con 4 preguntas amplias.

### Posición B (según los 8 puntos)
Pide la **figura jurídica exacta aplicable**, no la alerta genérica.

### Veredicto: **B TIENE RAZÓN, y mi gate v1 era romo.**

Mi formulación bloqueaba el MVP completo cuando lo que corresponde es **bloquear un alcance específico**. Esa diferencia vale semanas de calendario. Corrijo.

### Resolución — tres figuras distintas, no una

La evidencia consultada (15-sep-2026) distingue al menos tres situaciones jurídicas que el Playbook y mi v1 trataban como una sola:

| Figura | Qué cubre | ¿Aplica al MVP de Atheron? |
|---|---|---|
| **(a) Licencia de funcionamiento de empresa de vigilancia y seguridad privada** — incluida la prestación con **medios tecnológicos** | Las modalidades del art. 6 del Decreto 356/1994: vigilancia fija, móvil, escolta y transporte de valores ([Decreto 356/1994](http://www.secretariasenado.gov.co/senado/basedoc/decreto_0356_1994.html); [Función Pública](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=1341)) | **NO**, si Atheron no presta vigilancia ni monitoreo. **SÍ**, en el momento en que ofrezca monitoreo o respuesta |
| **(b) Licencia de empresa asesora, consultora e investigadora en seguridad** | Asesoría y consultoría en seguridad. Se expide a nivel nacional por 10 años ([Colombia Ágil](https://www.colombiaagil.gov.co/tramites/intervenciones/licencias-para-empresas-del-sector-de-vigilancia-y)) | **Depende.** Si Atheron vende "diagnóstico de seguridad" como servicio, puede cruzar este umbral |
| **(c) Inscripción en el registro de fabricantes, importadores, comercializadores, instaladores y arrendadores de equipos de vigilancia y seguridad privada** | Quienes fabrican, importan, **comercializan, instalan** o arriendan equipos de vigilancia y seguridad privada | **SÍ — es la figura más probable para el MVP** |

**`REQUIERE FUENTE` (y es la tarea concreta del abogado):** las fuentes que sustentan (c) son **secundarias** — prensa sectorial y gremio, no la norma ni la resolución de Supervigilancia ([Con Toda Propiedad](https://contodapropiedad.com/venta-arrendamiento-e-instalacion-de-camaras-de-seguridad-requiere-licencia-de-superintendencia-de-vigilancia/); [ASOSEC](https://asosec.co/15755-2/), consultados 15-sep-2026). **No afirmo que (c) sea la figura aplicable. Afirmo que es la hipótesis principal y que hay que confirmarla contra la norma exacta.**

### Hallazgo nuevo que cambia una decisión de proveedor

Las mismas fuentes indican que **quien contrata a un proveedor no inscrito puede ser sancionado** (se citan multas de 20 a 40 SMMLV). Si es correcto, no basta con que Atheron se inscriba: **Atheron debe exigir a sus proveedores la prueba de su propia inscripción.** Esto conecta directamente con el punto 4 y añade una pregunta al POC de SYSCOM Colombia.

### Gate G0 corregido — de romo a quirúrgico

| | v1 (romo) | **v2 (corregido)** |
|---|---|---|
| Alcance del bloqueo | Toda venta con instalación | Solo la **instalación** y solo hasta confirmar la figura (c) |
| Preguntas al abogado | 4, amplias | **3, precisas** (abajo) |
| Qué puede avanzar mientras tanto | Nada | Landing, CRM, costeo, Core, contenido, **y venta de equipo sin instalación si la figura lo permite** |

**Las 3 preguntas precisas:**
1. ¿La comercialización e instalación de CCTV/alarmas a hogares, **sin monitoreo ni respuesta**, se encuadra en el registro de comercializadores/instaladores (figura c), o exige licencia de funcionamiento (figura a)? Citar norma y resolución.
2. ¿A partir de qué servicio concreto se cruza hacia la figura (a)? Específicamente: monitoreo, respuesta, custodia de video, y "diagnóstico de seguridad" como servicio facturado.
3. ¿Contratar proveedores no inscritos genera responsabilidad para Atheron? ¿Qué prueba debe exigirse y conservarse?

**Restricción contractual inmediata, sin esperar al abogado:** Atheron **no ofrece, no menciona y no insinúa monitoreo ni respuesta** en ninguna pieza comercial hasta tener la figura (a), si decide buscarla. Es gratis y elimina el riesgo mayor hoy.

**Etiqueta:** figura (c) = `HIPÓTESIS PRINCIPAL` · norma exacta = `REQUIERE FUENTE` · umbral hacia (a) = `REQUIERE FUENTE`.

---

## 2. ODOO + ATHERON CORE **THIN**

### Posición v1 (A) / Posición B
Propuse "Atheron Core" fuera de Odoo con 6 tablas. B acepta el Core pero lo quiere **thin**.

### Veredicto: **CONVERGENCIA. Y B mejora mi propuesta.**

Mi Core v1 ya incluía catálogo (`atheron_product`, `supplier_offer`) que **no hace falta el día 1**. B tiene razón: eso no es thin, es el principio de una plataforma.

### Resolución — definición operativa de "thin"

"Thin" es una palabra que se erosiona sola. La fijo con una definición y una prueba:

> **Atheron Core Thin es un registrador, no un procesador.**
>
> **Prueba de delgadez:** si Core contiene un `if` que codifica una regla comercial, ya no es thin. Las reglas viven en Odoo o en la cabeza de una persona hasta que haya datos para automatizarlas.

**Core Thin v2 — 4 tablas (bajé de 6) y 3 endpoints (bajé de 4):**

```
party        (id uuid, type, display_name, city, created_at, merged_into)
identifier   (id, party_id, kind, value_normalized, verified_at, UNIQUE(kind,value))
consent      (id, party_id, purpose, granted, policy_version, evidence, occurred_at)
event        (id, event_type, event_version, party_id, correlation_id,
              idempotency_key UNIQUE, source, payload jsonb, occurred_at, recorded_at)

POST /leads      POST /events      POST /webhooks/{provider}
```

**Concesiones a B (bajan de Core al futuro):** `atheron_product` y `supplier_offer` salen del día 1; entran cuando se integre SYSCOM Colombia (punto 4). `inbound_webhook` se fusiona en `event` con la clave de idempotencia. El ledger de beneficios ya estaba diferido en v1; sigue diferido.

### Dónde NO cedo

`party`, `identifier`, `consent` y `event` son **no negociables incluso en la versión thin**, porque son los únicos cuatro objetos irrecuperables: el consentimiento no se pide retroactivamente y los eventos no ocurridos no se registran después. Todo lo demás de Core puede esperar o comprarse.

**`REQUIERE FUENTE (razonamiento B)`:** si el "thin" del Agente B significa que la identidad y el consentimiento viven en Odoo y Core es solo un relé, **discrepo** — ver desacuerdo residual #2. Si significa lo que describo arriba, estamos de acuerdo y el desacuerdo desaparece.

---

## 3. MEDICIÓN CORRECTA DE LA TESIS CROSS-VERTICAL

### Posición v1 (A)
Experimento E1: tres campos en el formulario, 90 días, umbrales <5% / 5–15% / >15%.

### Posición B
La medición no es correcta.

### Veredicto: **B TIENE RAZÓN. Mi E1 tenía tres defectos y uno es grave.**

Lo concedo sin matices, porque es un error de método y no de criterio:

1. **Los umbrales eran falsa precisión.** Inventé 5% y 15% sin ninguna tasa base. No salieron de datos; salieron de que suenan razonables.
2. **No había potencia estadística.** Con ~100 leads en 90 días, si la tasa real fuera 8%, se observarían 8 casos con un intervalo de confianza que atraviesa de lado a lado las tres bandas que definí. **El experimento no podía distinguir entre sus propias respuestas.**
3. **Medía lo que no era.** El porcentaje bruto de solapamiento no dice nada por sí solo. Lo que importa es el **lift**: si haber sido huésped cambia la probabilidad de comprar seguridad.

### Resolución — E1 rediseñado en tres partes

**E1-A · Techo aritmético (se calcula HOY, con datos que ya existen).**
Antes de recoger un solo lead nuevo: contar los **huéspedes distintos históricos** de las 7 casas. Ese número es el tamaño máximo del pozo de solapamiento posible. Si son 300 personas, ninguna estrategia de venta cruzada sobre esa base mueve un negocio — y se sabe hoy, gratis, sin esperar 90 días. **Este cálculo es el que faltaba en v1 y es el más valioso de los tres.**

**E1-B · Prueba activa (semanas, no trimestres).**
No observar pasivamente: **provocar**. Ofrecer a los huéspedes históricos con consentimiento válido una oferta concreta de seguridad para el hogar. Medir tasa de respuesta.
Una prueba activa sobre 300 personas da señal en dos semanas; la observación pasiva sobre leads entrantes necesita trimestres. **Y la señal es de mejor calidad**, porque mide intención provocada, no coincidencia.

**E1-C · Lift, no porcentaje.**
En los leads entrantes, medir las dos condicionales y compararlas:

```
lift = P(compra | fue huésped) ÷ P(compra | no fue huésped)
```

Criterio de decisión sobre el lift, con la honestidad de declarar la incertidumbre:
- **lift < 1,5** → la hospitalidad no predice compra de seguridad. **No construir el Loop.**
- **lift 1,5 – 3** → hay señal. Registrar, no automatizar.
- **lift > 3** → la tesis tiene sustrato. Invertir.
- **Si el intervalo de confianza cruza 1,5** → el dato aún no decide. Seguir midiendo, **y decirlo en lugar de fingir conclusión.**

**Lo que se mantiene de v1:** los tres campos en el formulario. Siguen costando cero y siguen siendo necesarios. Lo que cambia es que ya no pretenden ser un test por sí solos.

**Etiqueta:** E1-A = `REQUIERE PRUEBA (datos internos, disponibles hoy)` · E1-B y E1-C = `REQUIERE PRUEBA`.

---

## 4. SYSCOM COLOMBIA COMO API / PROVEEDOR OBJETIVO

### Posición v1 (A) / Posición B
Señalé que existen dos entidades SYSCOM con portales separados y que el Playbook no decía cuál. B resuelve: **el objetivo es SYSCOM Colombia.**

### Veredicto: **CONVERGENCIA. B cierra una ambigüedad que yo solo pude señalar.**

Es la resolución correcta: entidad colombiana, factura colombiana, stock colombiano, garantía bajo el Estatuto del Consumidor colombiano. Elimina de raíz el problema de importación, aranceles y garantía transfronteriza que mi v1 tenía que dejar abierto.

### Resolución — POC recortado a 6 preguntas, y una nueva

Con el objetivo fijado en [developers.syscomcolombia.com](https://developers.syscomcolombia.com/) (consultado 15-sep-2026), dos de mis 7 preguntas originales quedan resueltas por decisión y no por investigación. Quedan:

| # | Pregunta al POC (SYSCOM Colombia) | Decide |
|---|---|---|
| 1 | ¿El stock que devuelve la API es stock **físico en Colombia** y disponible? | Si se puede publicar disponibilidad sin violar §4.3 |
| 2 | ¿Factura como entidad colombiana con NIT y factura electrónica DIAN? | Si es compra nacional pura |
| 3 | ¿Existe despacho directo a cliente final con guía rastreable? | Si el modelo de venta nacional (punto 5) es viable |
| 4 | ¿Quién responde la garantía ante el consumidor final y en qué plazo? | Exposición de Atheron como vendedor |
| 5 | ¿Cuáles son los límites de tasa y el SLA de la API? | Stock en tiempo real vs caché |
| 6 | ¿Los términos permiten republicar imágenes y fichas técnicas? | Contenido de las landings |
| **7 (NUEVA)** | **¿SYSCOM Colombia está inscrito ante Supervigilancia como comercializador de equipos de vigilancia?** | **Exposición sancionatoria de Atheron** (punto 1) |

La pregunta 7 es consecuencia directa del punto 1 y no existía en v1. **Si contratar proveedores no inscritos genera responsabilidad, la elección de proveedor deja de ser solo comercial.**

**Sin cambio de fondo:** la capa anticorrupción (`AtheronProduct → N SupplierOffer`) sigue siendo necesaria aunque hoy haya un solo proveedor objetivo. Cuesta lo mismo ahora y evita reescribir el catálogo después. Lo que sí cambia: **se construye cuando se integre SYSCOM CO, no el día 1** (coherente con Core Thin, punto 2).

---

## 5. VENTA NACIONAL vs APERTURA OPERATIVA DE CIUDAD

### Posición v1 (A)
Decisión D10 y ADR-0008: *"no abrir la ciudad 2 hasta dominar Zipaquirá"*.

### Posición B
Son cosas distintas.

### Veredicto: **B TIENE RAZÓN. Es el error más útil que me señalan.**

Mezclé dos cosas que no tienen nada que ver, y mi recomendación bloqueaba innecesariamente la vía de crecimiento más barata. Vender un equipo despachado a Medellín no tiene ninguna de las implicaciones de abrir operación en Medellín. Concedo por completo.

### Resolución — tres modos operativos, no dos

| Modo | Qué es | Requiere | ICA / presencia | Gate |
|---|---|---|---|---|
| **M-1 · Venta nacional con despacho** | Solo equipo, sin instalación, a cualquier ciudad | Logística, garantía, logística inversa | Territorialidad **`REQUIERE FUENTE`** (concepto tributario) | Bajo |
| **M-2 · Venta con instalación en ciudad cubierta** | Equipo + instalación | Técnico certificado, agenda, inventario local | Sí en esa ciudad | Medio |
| **M-3 · Apertura operativa de ciudad** | Presencia real | Técnicos, aliados, responsable, P&L, registro ICA, plan 90 días | Sí, completo | Alto — checklist §17 |

**Mi D10 corregida:** el freno aplica **solo a M-3**. M-1 puede escalar temprano y es, de hecho, **la forma más barata de medir demanda nacional antes de comprometer capital en una ciudad.** Que es exactamente lo que el Playbook quiere.

### Dos advertencias que acompañan la concesión

1. **M-1 tiene una trampa específica en seguridad.** Un equipo vendido sin instalar que el cliente monta mal genera soporte, garantía y una reseña negativa — y la reseña dice "Atheron", no "mi instalación". **Recomendación:** M-1 se restringe a productos genuinamente autoinstalables, etiquetados como tales de forma explícita, con guía y video. No todo el catálogo va a M-1.
2. **M-1 cambia la pregunta jurídica del punto 1.** Comercializar sin instalar puede tener un tratamiento distinto a comercializar e instalar. Debe ir en la pregunta 1 al abogado.

---

## 6. LOOP 5/10/15/20 COMO NIVELES DE PRIVILEGIO SUJETOS A MARGEN

### Posición v1 (A)
*"Congelar la escalera."* Calculé que apilada con referido y pasarela deja el margen de contribución en ~15,4%.

### Posición B
No son descuentos automáticos: son **niveles de privilegio sujetos a margen**.

### Veredicto: **B TIENE RAZÓN EN EL FONDO, y su reformulación es mejor que mi "congelar".**

Mi crítica atacaba una interpretación —descuento porcentual automático y acumulable— que el Playbook nunca declaró explícitamente. El cálculo de v1 sigue siendo válido **como escenario de riesgo**, no como descripción de lo que B proponía. Lo reconozco.

Y la reformulación de B es superior a la mía porque **preserva la intención del Playbook** (una escalera de relación que reconoce al cliente) **mientras elimina el riesgo de margen**. "Congelar" habría matado una buena idea para resolver un problema de implementación.

### Resolución — qué hace falta para que la reformulación sea real

Un privilegio "sujeto a margen" solo es distinto de un descuento si **existe el mecanismo que lo sujeta**. Tres piezas:

1. **Verificación de piso de margen en el momento de cotizar.** No es política: es una comprobación que rechaza la combinación si el margen de contribución cae bajo el umbral. Sin esa comprobación, "sujeto a margen" es una intención, y las intenciones no sobreviven al cierre de mes.
2. **Catálogo de privilegios ordenado por costo marginal, de menor a mayor.** El nivel desbloquea primero lo barato:

| Nivel | Privilegios (costo marginal bajo → alto) |
|---|---|
| 1 | Prioridad de agenda · revisión anual · canal directo de soporte |
| 2 | + Ampliación de garantía · asesoría de configuración |
| 3 | + Upgrade en instalación · beneficio de aliado con sponsor |
| 4 | + Condición comercial preferente **verificada contra el piso de margen** |

3. **Sponsor, vencimiento y costo tope en todos**, como ya establece ADR-0004.

### El número que justifica la reformulación

Con privilegios en lugar de descuentos apilados, la aritmética cambia por completo:

| Escenario | Margen de contribución |
|---|---|
| v1 — escalera 20% + referido 5% + pasarela | **15,4 %** |
| **v2 — privilegios de bajo costo marginal + pasarela** | **≈ 35,7 %** |

**Veinte puntos de margen.** Ese es el valor de la corrección de B, y merece quedar escrito.

### Donde sí mantengo una objeción (pequeña y concreta)

**Si son privilegios, no deben llamarse 5/10/15/20.** Esos números son porcentajes, y todo el que los lea —vendedor, cliente, aliado— los leerá como descuentos, por mucho que el documento interno diga otra cosa. La nomenclatura arrastra el comportamiento.

**Propuesta:** nombres no numéricos para los niveles, y que los porcentajes desaparezcan del vocabulario de la escalera. Ver desacuerdo residual #1.

---

## 7. MODELO HÍBRIDO: VENTA + INSTALACIÓN + POSTVENTA + PRUEBA DE MANTENIMIENTO RECURRENTE

### Veredicto: **CONVERGENCIA TOTAL.** Era mi recomendación de v1 (experimento E9, referente K.6) y B la eleva a modelo. Sin objeciones.

### Resolución — cómo se prueba sin construir nada

La prueba no requiere software. Requiere una conversación estructurada y un registro:

**Qué se ofrece** (contenido costeado, no genérico): revisión anual en sitio · limpieza y reajuste de cámaras · verificación de grabación y almacenamiento · actualización de firmware · prioridad de agenda ante incidente · ampliación de garantía sobre lo instalado.

**Cómo se prueba:** a los primeros 30 clientes instalados, en la conversación de cierre de instalación. Sin landing, sin pasarela de suscripción, sin automatización.

**Qué se mide:** tasa de aceptación · precio que el cliente acepta sin fricción · motivo de rechazo (lista cerrada).

**Criterio:** adopción > 20% → es la prioridad post-MVP, por encima del Loop. Adopción < 10% → o el precio está mal, o el paquete no resuelve un problema percibido; iterar el paquete antes de abandonar la hipótesis.

**Advertencia que conecta con el punto 1:** mantenimiento ≠ monitoreo. El mantenimiento programado sobre equipo propio no parece cruzar hacia la modalidad de vigilancia; **el monitoreo y la respuesta sí.** Debe ir en la pregunta 2 al abogado antes de nombrar el servicio en cualquier pieza comercial. **El nombre del plan importa jurídicamente.**

---

## 8. UN PRODUCTO ANCLA Y UNA PLANTILLA MAESTRA DE LANDING

### Veredicto: **CONVERGENCIA.** Era M3 y D6 de v1. B lo confirma.

### Resolución — criterio de selección del ancla

El Playbook no dice cómo elegirlo. Propongo un criterio explícito, para que la elección no sea una preferencia:

```
puntaje = margen_contribución × demanda_búsqueda × (1 ÷ complejidad_instalación)
```

Con tres restricciones duras que eliminan candidatos antes de puntuar:
- Costo verificado con cotización de respaldo.
- Instalable por un técnico en menos de medio día.
- Sin dependencia de stock volátil.

**Qué parametriza la plantilla maestra** (fijo vs variable):

| Fijo en la plantilla | Variable por producto |
|---|---|
| Estructura, jerarquía, formulario, consentimiento | Nombre, ficha, imágenes |
| Captura de UTM, `correlation_id`, ciudad | Precio contado / crédito / inicial |
| Bloque WhatsApp contextual | Alcance de instalación |
| Bloque de garantía y alcance | FAQ específica |
| Rendimiento y SEO técnico | Productos relacionados |

**Regla:** los otros cuatro productos se publican con la misma plantilla **solo si el ancla convierte**. Si no convierte, el problema es la oferta o el precio, y replicar la plantilla multiplica el error por cinco.

### Mi única objeción de secuencia

**El ancla debe elegirse después de conocer el alcance jurídico** (punto 1). Si la instalación queda restringida mientras se resuelve la figura (c), el ancla correcta es un producto **autoinstalable** vendible en modo M-1 — que es un producto distinto al que se elegiría con instalación disponible. Elegir el ancla antes de saberlo arriesga elegir mal. Ver desacuerdo residual #3.

---

## 9. DONDE A Y B YA COINCIDEN

Sin matices pendientes en ninguno:

| # | Punto de acuerdo |
|---|---|
| 1 | **Existe un riesgo regulatorio real de Supervigilancia** y debe resolverse con figura jurídica precisa antes de instalar |
| 2 | **Odoo para el dinero, Atheron Core para la relación** — la frontera de ADR-0002 se mantiene |
| 3 | **El Core debe ser thin**: registrador, no plataforma. 4 tablas, 3 endpoints, sin lógica de negocio |
| 4 | **Catálogo y ledger salen del día 1** y entran cuando los justifique un hecho, no un calendario |
| 5 | **La tesis cross-vertical debe medirse antes de invertir**, no asumirse |
| 6 | **SYSCOM Colombia es el proveedor objetivo** — entidad colombiana, factura colombiana, garantía colombiana |
| 7 | **Venta nacional ≠ apertura de ciudad.** Son gates distintos |
| 8 | **Los niveles del Loop no son descuentos automáticos** y están sujetos a margen |
| 9 | **El modelo es híbrido**: venta + instalación + postventa + prueba de mantenimiento recurrente |
| 10 | **Un producto ancla, una plantilla maestra**, replicada solo tras validar |
| 11 | **Identidad, eventos y consentimiento se capturan desde el día 1** — son irrecuperables |
| 12 | **Contratos de eventos sí, bus de mensajes no** (ADR-0003, sin objeción de B) |
| 13 | **Vender mientras se construye**, sin hipotecar la arquitectura |

**Trece coincidencias sobre catorce temas estructurales.** La segunda pasada confirma que A y B no tienen un desacuerdo de arquitectura: tienen tres diferencias de precisión.

---

## 10. DESACUERDOS RESIDUALES — SOLO 3

Reducidos deliberadamente. No abro frentes nuevos.

### ⚠️ D-R1 · Nomenclatura de los niveles del Loop
**B:** niveles 5/10/15/20 como privilegios sujetos a margen.
**A:** de acuerdo con la naturaleza; **en desacuerdo con conservar los números.**
**Argumento:** "5/10/15/20" son porcentajes. Un vendedor bajo presión de cierre, un cliente que negocia y un aliado que compara leerán descuentos, sin importar lo que diga el documento interno. La nomenclatura arrastra el comportamiento, y el riesgo de margen que B acaba de eliminar reentra por la puerta del lenguaje.
**Propuesta:** nombres no numéricos y porcentajes fuera del vocabulario de la escalera.
**Impacto si B tiene razón y yo no:** bajo. Es nomenclatura.
**Costo de resolverlo:** una decisión de Marlon, cero desarrollo. **→ Decisión M5.**

### ⚠️ D-R2 · Qué significa exactamente "thin"
**A:** thin = registrador sin lógica de negocio, **pero** `party`, `identifier`, `consent` y `event` viven en Core, no en Odoo.
**B:** `REQUIERE FUENTE (razonamiento B)`.
**Argumento si B quisiera identidad y consentimiento en Odoo:** discreparía, porque (a) el consentimiento es evidencia legal que debe ser append-only y exportable íntegra (ADR-0007), y (b) sin `merge/unmerge` propio no hay identidad real, y un falso positivo de deduplicación en este negocio expone la configuración de seguridad de una casa a otra persona (riesgo R09).
**Probabilidad de que sea desacuerdo real:** baja — las 4 tablas son compatibles con cualquier lectura razonable de "thin".
**Costo de resolverlo:** una frase del Agente B. **Se cierra en la próxima ronda sin decisión de Marlon.**

### ⚠️ D-R3 · Secuencia entre alcance jurídico y elección del ancla
**B (punto 8):** elegir producto ancla y plantilla maestra.
**A:** de acuerdo, **pero después** de conocer la figura jurídica del punto 1.
**Argumento:** si la instalación queda restringida mientras se confirma la figura (c), el ancla correcta es un producto autoinstalable en modo M-1 — un producto distinto del que se elegiría con instalación disponible. Elegir antes arriesga costear, fotografiar, escribir y posicionar el producto equivocado.
**Mitigación que hace el desacuerdo casi irrelevante:** el trabajo de plantilla maestra **no depende del producto** y puede avanzar en paralelo. Solo se retrasa la elección del ancla, no el desarrollo.
**Impacto:** medio si se ignora, bajo si se aplica la mitigación. **→ Decisión M3.**

---

## 11. LAS 5 DECISIONES QUE NECESITAN A MARLON

Reducidas de 10 a 5. Solo lo que bloquea y solo lo que nadie más puede decidir.

### M1 · ¿Cuál es el alcance regulado que Atheron quiere operar?
**Opciones:** (a) solo comercialización e instalación → figura de registro · (b) además monitoreo/respuesta → licencia de funcionamiento, trámite mayor · (c) además asesoría facturada → licencia de asesor/consultor.
**Por qué solo Marlon:** define el modelo de negocio, el trámite, el costo y el calendario. Todo lo demás cuelga de aquí.
**Mi recomendación:** **(a) ahora, con la puerta abierta a (b) después.** Y prohibición inmediata de mencionar monitoreo en cualquier pieza comercial hasta tenerlo resuelto.

### M2 · ¿Se habilita venta nacional sin instalación (modo M-1) en el MVP?
**Por qué ahora:** es la vía más barata de medir demanda nacional, y cambia la elección del ancla (M3).
**Mi recomendación:** **sí, restringida a productos genuinamente autoinstalables y explícitamente etiquetados**, y sujeta a la respuesta de M1.

### M3 · ¿Cuál es el producto ancla?
**Por qué solo Marlon:** requiere el costo real y el criterio comercial que no está en el repositorio.
**Mi recomendación:** aplicar el criterio de §8, **decidir después de M1 y M2**, y avanzar la plantilla maestra en paralelo para no perder calendario.

### M4 · ¿Se aprueba el modelo híbrido con prueba de mantenimiento recurrente?
**Por qué ahora:** si se aprueba, la conversación de cierre de instalación cambia desde la primera venta — y esa oportunidad no se recupera.
**Mi recomendación:** **sí.** Es la hipótesis más valiosa y más barata del proyecto (K.6: ~87% del ingreso de Verisure es recurrente). Cuidando el nombre del servicio por el punto 1.

### M5 · ¿Los niveles del Loop conservan los números 5/10/15/20?
**Por qué solo Marlon:** es lenguaje de marca y afecta cómo se comporta el equipo comercial.
**Mi recomendación:** **nombres no numéricos.** Único desacuerdo abierto con B que requiere arbitraje.

---

## 12. ARQUITECTURA CONJUNTA RECOMENDADA v1

Producto de la convergencia A+B. **Esta es la propuesta unificada, no la de ninguno de los dos por separado.**

```
        Landing (plantilla maestra, 1 producto ancla)
                          │
                          ▼
              ATHERON CORE THIN
        4 tablas · 3 endpoints · sin lógica de negocio
        party · identifier · consent · event
                          │
                 sincroniza (unidireccional por campo)
                          ▼
                 ODOO (casi estándar)
        CRM · ventas · inventario · facturación DIAN · cartera
                          │
                          ▼
              WhatsApp  ·  Pasarela  ·  [SYSCOM CO, después]
```

| Decisión | Resolución conjunta |
|---|---|
| Frontera | Odoo = dinero · Core = relación (ADR-0002) |
| Tamaño de Core | **Thin**: registrador, no procesador. 4 tablas |
| Eventos | Contratos sí, bus no (ADR-0003) |
| Identidad | `Party` UUID opaco, solo determinístico, merge no destructivo (ADR-0001) |
| Consentimiento | Granular por finalidad, append-only, desde el primer formulario (ADR-0007) |
| Beneficios | Privilegios por nivel con piso de margen verificado. Ledger diferido (ADR-0004) |
| Proveedor | SYSCOM Colombia. Capa anticorrupción al integrar, no antes (ADR-0009) |
| Territorio | 3 modos: M-1 nacional · M-2 instalación · M-3 apertura de ciudad (ADR-0008) |
| Modelo comercial | Híbrido: venta + instalación + postventa + prueba de mantenimiento (ADR-0013) |
| Alcance regulado | Comercialización e instalación; monitoreo prohibido hasta resolver (ADR-0014) |
| Frontend | Una plantilla maestra, un ancla, replicar solo tras validar (ADR-0010) |

**Lo que esta arquitectura conjunta cambia frente a mi v1:** Core más delgado (4 tablas en vez de 6), catálogo diferido, gate legal quirúrgico en vez de romo, venta nacional habilitada, escalera de privilegios en vez de congelada. **Todos esos cambios vienen de B y todos mejoran la propuesta.**

---

## 13. MVP DE 30 DÍAS CORREGIDO

Cambios sobre `docs/MVP-30-DAYS-v1.md`, que se actualiza en la misma rama.

| Bloque | v1 | **v2 corregido** |
|---|---|---|
| **G0 legal** | Bloquea toda venta con instalación | **Bloquea solo la instalación**, con 3 preguntas precisas. Todo lo demás avanza |
| **M2 Core** | 6 tablas, 4 endpoints | **4 tablas, 3 endpoints.** Catálogo fuera |
| **M1 productos** | 5 productos costeados | **1 ancla costeada + criterio de selección.** Los otros 4 tras validar |
| **M3 landing** | Una landing | **Plantilla maestra parametrizada**, avanza en paralelo a la elección del ancla |
| **M6 tesis** | E1 pasivo, 90 días, umbrales inventados | **E1-A techo (hoy) + E1-B prueba activa (semanas) + E1-C lift** |
| **Nuevo M11** | — | **Venta nacional M-1** si M1 y M2 lo permiten |
| **Nuevo M12** | — | **Prueba de mantenimiento recurrente** en la conversación de cierre de instalación |
| **DO NOT BUILD** | 16 elementos | Sin cambios, **salvo**: "segunda ciudad" se precisa a **"apertura operativa M-3"** — M-1 queda habilitado |

**Lo que no cambia y sigue siendo el corazón del MVP:** vender de verdad, medir de verdad, y capturar desde el día 1 lo único irrecuperable — identidad, eventos y consentimiento.

---

## 14. BALANCE HONESTO DE ESTA SEGUNDA PASADA

**Donde B me corrigió y acepté (4):** gate legal romo → quirúrgico · Core de 6 a 4 tablas · medición de la tesis sin potencia estadística ni tasa base · venta nacional confundida con apertura de ciudad.

**Donde mantengo mi posición (3, todas menores):** nomenclatura de niveles · las 4 tablas irrenunciables de Core · secuencia entre alcance jurídico y elección del ancla.

**Donde aporté algo nuevo en esta ronda (3):** la figura jurídica (c) como hipótesis principal en lugar de una alerta genérica · la exposición sancionatoria por contratar proveedores no inscritos, que añade la pregunta 7 al POC · E1-A, el techo aritmético calculable hoy con datos que ya existen.

**Mi error más útil fue el punto 5.** Bloqueé la vía de crecimiento más barata por confundir dos conceptos, y nadie lo habría notado hasta que alguien preguntara por qué no se podía vender a Medellín.

**Y la corrección más valiosa de B fue el punto 6**, que vale veinte puntos de margen y salva una buena idea que yo iba a congelar.

---

**Estado: PROPUESTO.** Segunda pasada cerrada. Esperando revisión del Agente B sobre los 3 desacuerdos residuales y decisión de Marlon sobre M1–M5. **NO MERGE.**
