# ADR-0014 — Alcance de servicios regulados y figura jurídica aplicable

- **Estado:** PROPUESTO · **Fecha:** 2026-09-15 (segunda pasada)
- **Propone:** Agente A · **Decide:** Marlon (con concepto jurídico) · **Revisa:** Agente B
- **Relacionado:** ADR-0009, ADR-0013

## Contexto

El Playbook v1.0 no menciona ni una vez a la Superintendencia de Vigilancia y Seguridad Privada. La auditoría v1 lo señaló como bloqueante, pero con un gate **romo**: bloqueaba toda venta con instalación. El Agente B pidió la **figura jurídica exacta aplicable**, y tenía razón — la precisión vale semanas de calendario, porque lo correcto es bloquear un alcance específico, no el MVP completo.

## Decisión

### 1. Se reconocen tres figuras distintas, no una

| Figura | Qué cubre | ¿Aplica al MVP? |
|---|---|---|
| **(a) Licencia de funcionamiento de empresa de vigilancia y seguridad privada**, incluida la prestación con medios tecnológicos | Modalidades del art. 6 del Decreto 356/1994: vigilancia fija, móvil, escolta, transporte de valores ([Decreto 356/1994](http://www.secretariasenado.gov.co/senado/basedoc/decreto_0356_1994.html); [Función Pública](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=1341)) | **NO** sin monitoreo. **SÍ** en cuanto se ofrezca monitoreo o respuesta |
| **(b) Licencia de empresa asesora, consultora e investigadora en seguridad** | Asesoría y consultoría; se expide a nivel nacional por 10 años ([Colombia Ágil](https://www.colombiaagil.gov.co/tramites/intervenciones/licencias-para-empresas-del-sector-de-vigilancia-y)) | **Depende.** Si el "diagnóstico de seguridad" se factura como servicio, puede cruzar el umbral |
| **(c) Inscripción en el registro de fabricantes, importadores, comercializadores, instaladores y arrendadores de equipos de vigilancia y seguridad privada** | Comercialización e instalación de equipos | **SÍ — hipótesis principal para el MVP** |

**`REQUIERE FUENTE`:** las fuentes que sustentan (c) son **secundarias** — prensa sectorial y gremio, no la norma ni la resolución ([Con Toda Propiedad](https://contodapropiedad.com/venta-arrendamiento-e-instalacion-de-camaras-de-seguridad-requiere-licencia-de-superintendencia-de-vigilancia/); [ASOSEC](https://asosec.co/15755-2/), consultados 15-sep-2026). **No se afirma que (c) sea la figura aplicable; se afirma que es la hipótesis principal a confirmar contra la norma.**

### 2. Gate G0 quirúrgico, no romo

**Bloquea:** únicamente la **instalación**, y solo hasta confirmar la figura (c).
**Avanza en paralelo:** landing, plantilla maestra, CRM, costeo, Atheron Core, contenido, y —si M1 y M2 lo permiten— la venta de equipo sin instalación (modo M-1 del ADR-0008).

### 3. Las tres preguntas precisas al abogado

1. ¿La comercialización e instalación de CCTV/alarmas a hogares, **sin monitoreo ni respuesta**, se encuadra en la figura (c) o exige la (a)? Citar norma y resolución. ¿Cambia si se vende **sin** instalar (modo M-1)?
2. ¿A partir de qué servicio concreto se cruza hacia (a)? Específicamente: monitoreo, respuesta, custodia de video y "diagnóstico de seguridad" facturado. ¿El **mantenimiento programado** (ADR-0013) cruza ese umbral?
3. ¿Contratar proveedores no inscritos genera responsabilidad para Atheron? ¿Qué prueba debe exigirse y conservarse?

### 4. Restricción contractual inmediata, sin esperar al concepto

**Atheron no ofrece, no menciona y no insinúa monitoreo ni respuesta** en ninguna pieza comercial, landing, plantilla de WhatsApp o conversación de venta, hasta obtener la figura (a) si decide buscarla. Cuesta cero y elimina hoy el riesgo mayor.

### 5. Debida diligencia de proveedores

Se exige y se conserva prueba de inscripción de todo proveedor de equipos de vigilancia (pregunta 7 del ADR-0009).

## Alternativas consideradas

- **Bloquear todo el MVP hasta el concepto** (posición v1 del Agente A). Rechazada: detiene trabajo que no depende de la respuesta. Corregida gracias a la observación del Agente B.
- **Proceder sin concepto y regularizar después.** Rechazada: vender sin la figura correcta no se deshace con un trámite posterior, y expone a sanción y a contratos discutibles.
- **Asumir que vender cámaras no está regulado.** Rechazada: la evidencia disponible apunta en contra, aunque no sea concluyente.

## Consecuencias

**Positivas:** el MVP avanza mientras se resuelve lo jurídico; el riesgo mayor queda acotado a un alcance concreto; la elección de proveedor incorpora el criterio regulatorio.

**Negativas:** la elección del producto ancla depende de la respuesta (desacuerdo residual D-R3); si la figura (c) exige trámite largo, el calendario de instalación se desplaza.

## Cómo se revierte

No se revierte. Es requisito regulatorio, no preferencia de diseño.

---

## REVISIÓN v3 — 15-sep-2026 · CORRECCIÓN REGULATORIA (cierre del Agente B)

> **⚠️ Esta revisión SUPERSEDE los puntos 1, 2 y 3 de la Decisión anterior.** La hipótesis de la v2 —que la comercialización sin instalación podría quedar fuera del requisito— **era errónea**. Se corrige.

### Lo que dice la fuente

El **artículo 52 del Decreto 356 de 1994** incluye expresamente las actividades de **fabricación, importación, instalación, comercialización o arrendamiento** de equipos para vigilancia y seguridad privada. Quienes las ejercen deben **inscribirse ante la Superintendencia de Vigilancia y Seguridad Privada** y quedan sujetos a su control, inspección y vigilancia permanente ([Decreto Ley 356 de 1994, Función Pública](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=1341); [texto completo, DIMAR](https://www.dimar.mil.co/sites/default/files/normatividad/DECRETO%20356%20DE%201994.pdf) — consultados 15-sep-2026).

Supervigilancia publica actualmente el trámite **"Permiso de Estado para el ejercicio de las actividades para equipos de vigilancia y seguridad privada"**, que **incluye instalación y comercialización**. La Resolución 20204000064817 oficializó los trámites que requieren permiso de Estado, con plazo de respuesta de hasta **30 días hábiles** desde la radicación ([Ámbito Jurídico](https://www.ambitojuridico.com/noticias/general/defensa-nacional-y-seguridad-privada/supervigilancia-oficializa-los-tramites-que); [Supervigilancia, trámites y requisitos](https://www.supervigilancia.gov.co/documentos/6457/tramites-y-requisitos/) — consultados 15-sep-2026).

**Etiqueta: `CONFIRMADO`** (norma citada + trámite publicado por la entidad). Deja de ser `HIPÓTESIS`.

### El error que se corrige, dicho con claridad

La v2 razonó que, si la figura aplicable era un registro de comercializadores/instaladores, entonces **vender sin instalar** podría quedar fuera del requisito, y sobre esa base habilitó el modo M-1 (venta nacional con despacho) con "gate bajo". **Eso es incorrecto: el artículo 52 nombra la comercialización de forma expresa e independiente de la instalación.** Vender equipo sin instalarlo está igualmente dentro del ámbito.

Fue un error de método: la v2 se apoyó en fuentes secundarias e infirió un límite que la norma no establece, en lugar de esperar al texto del artículo. La corrección del Agente B es correcta y se adopta íntegra.

### Decisión corregida

**1. G0 — Gate regulatorio (reemplaza la formulación v2).**

No se asume que ninguna modalidad de actividad comercial sobre equipos esté libre del requisito. **La activación comercial/transaccional —de cualquier modalidad, con o sin instalación, local o nacional— queda condicionada a verificar y cumplir el permiso/registro aplicable ante Supervigilancia.**

**2. Qué SÍ avanza mientras tanto** (sin activación comercial):

- selección y **preselección de 5–10 productos**
- costeo real con cotizaciones de respaldo
- fichas técnicas y contenido
- CRM (Odoo) y su configuración
- arquitectura y Atheron Core Thin
- POC de la API de SYSCOM Colombia (sandbox, nunca producción)
- plantilla maestra de landing
- pruebas internas de todo el recorrido

**3. Qué NO ocurre hasta cumplir el permiso/registro:** publicar oferta comercial al público, captar pedidos, cobrar, vender, despachar o instalar. **Ni en modalidad M-1, ni M-2, ni M-3** (ADR-0008).

**4. Alcance inicial deseado — se mantiene y se fija:**

> **Comercialización + instalación.**
> **Sin** monitoreo, **sin** respuesta, **sin** custodia de video y **sin** consultoría de seguridad facturada, hasta validar los permisos específicos que cada uno de esos servicios exija.

Esta restricción es **contractual y de lenguaje, efectiva desde hoy**: ninguna pieza comercial, landing, plantilla de WhatsApp o conversación de venta menciona ni insinúa esos cuatro servicios.

**5. Debida diligencia de proveedores:** se mantiene y se refuerza. El artículo 52 aplica también a quien comercializa: se exige y conserva prueba de inscripción de todo proveedor de equipos (pregunta 7 del ADR-0009).

### Consecuencia de calendario que debe verse

El trámite tiene un plazo de respuesta de hasta **30 días hábiles** desde la radicación, sin contar la preparación del expediente. **El MVP de 30 días no puede terminar en venta real.** Termina en *listo para vender*: todo construido, costeado, probado y esperando el permiso. El gate G5 ("venta real") se desplaza fuera de la ventana de 30 días y pasa a depender del trámite, no del desarrollo.

Es una mala noticia de calendario y una buena noticia de riesgo: el proyecto descubre esto en la semana 1 y no con clientes instalados.

**Acción inmediata para Marlon:** radicar el trámite cuanto antes. Cada día de demora en radicar es un día de demora en vender, y el trabajo técnico no lo compensa.
