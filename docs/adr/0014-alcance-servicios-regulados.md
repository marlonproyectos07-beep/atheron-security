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
