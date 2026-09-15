# ADR-0013 — Modelo comercial híbrido: venta + instalación + postventa + mantenimiento recurrente

- **Estado:** PROPUESTO · **Fecha:** 2026-09-15 (segunda pasada)
- **Propone:** Agente A · **Convergencia con:** Agente B · **Decide:** Marlon
- **Relacionado:** ADR-0004, ADR-0014

## Contexto

El Playbook v1.0 diseña un negocio **transaccional**: vender equipos con instalación, y fidelizar mediante una escalera de descuentos. La auditoría v1 (§K.6) encontró que la evidencia de la industria apunta en otra dirección: Verisure reporta que los servicios de portafolio —suscripción de monitoreo y soporte— representan cerca del **87% de sus ingresos**, mientras los ingresos iniciales vienen de instalación y equipo ([Verisure, presentación corporativa julio 2025](https://www.verisure.com/system/files/private_pdf/2025-08/verisure-company-presentation-july-2025.pdf), consultado 15-sep-2026). ADT describe inversión inicial significativa por suscriptor con equilibrio en ~2 años ([ADT 10-K FY2025](https://www.sec.gov/Archives/edgar/data/1703056/000170305626000022/adt-20251231.htm), consultado 15-sep-2026).

El Agente B eleva esto de hipótesis (experimento E9) a **modelo comercial**. Hay convergencia total entre ambos agentes.

## Decisión

El modelo comercial de Atheron es **híbrido**, con cuatro componentes:

```
VENTA  →  INSTALACIÓN  →  POSTVENTA  →  [PRUEBA] MANTENIMIENTO RECURRENTE
```

**La cuarta pata se prueba antes de construirse.** La prueba no requiere software: requiere una conversación estructurada y un registro.

**Qué se ofrece** (contenido costeado, no genérico):
revisión anual en sitio · limpieza y reajuste de cámaras · verificación de grabación y almacenamiento · actualización de firmware · prioridad de agenda ante incidente · ampliación de garantía sobre lo instalado.

**Cómo se prueba:** a los primeros 30 clientes instalados, en la conversación de cierre de instalación. Sin landing, sin pasarela de suscripción, sin automatización.

**Qué se mide:** tasa de aceptación · precio que el cliente acepta sin fricción · motivo de rechazo (lista cerrada).

**Criterio de decisión:**
- adopción **> 20 %** → es la prioridad post-MVP, **por encima del Atheron Loop**
- adopción **10–20 %** → iterar paquete y precio antes de decidir
- adopción **< 10 %** → o el precio está mal o el paquete no resuelve un problema percibido; iterar antes de abandonar la hipótesis

## Advertencia jurídica — el nombre del servicio importa

**Mantenimiento ≠ monitoreo.** El mantenimiento programado sobre equipo propio no parece cruzar hacia las modalidades de vigilancia del art. 6 del Decreto 356/1994; **el monitoreo y la respuesta sí.** Antes de nombrar el servicio en cualquier pieza comercial debe resolverse la pregunta 2 del ADR-0014. `REQUIERE FUENTE (concepto jurídico)`.

## Alternativas consideradas

- **Solo transaccional** (Playbook v1.0). Rechazada: deja sobre la mesa la parte del negocio donde la evidencia de la industria dice que está el valor, y no crea razones legítimas de contacto recurrente.
- **Suscripción desde el día 1 con pasarela y automatización.** Rechazada: construye antes de validar. La prueba conversacional cuesta cero y responde la misma pregunta.
- **Monitoreo profesional.** Rechazada por ahora: cruza a la figura jurídica (a) del ADR-0014, con trámite y costo mayores. Reevaluar tras M1.

## Consecuencias

**Positivas:** ingreso recurrente; razones legítimas de contacto sin costo de WhatsApp de marketing; alimenta el moat #1 (base instalada con historial) y el #3; mejora el LTV sin erosionar margen, a diferencia de la escalera de descuentos.

**Negativas:** exige capacidad técnica sostenida para cumplir las visitas; un plan vendido y no cumplido daña más que no venderlo; obliga a costear el margen del servicio, no solo del equipo.

## Cómo se revierte

No renovar los planes vendidos. Barato mientras la base sea pequeña — otra razón para probar temprano.
