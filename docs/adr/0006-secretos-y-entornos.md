# ADR-0006 — Gestión de secretos y entornos

- **Estado:** PROPUESTO · **Fecha:** 2026-09-15
- **Propone:** Agente A · **Decide:** Marlon · **Revisa:** Agente B

## Contexto

El Playbook no menciona secretos, entornos ni respaldo. Atheron almacenará credenciales de proveedores y —más grave— **configuraciones de sistemas de seguridad de terceros** (Pasaporte del Equipo §12): ubicación de cámaras, topología, configuración. Su filtración es un incidente de seguridad física para los clientes, no solo de datos (riesgo R12).

## Decisión

1. **Ningún secreto en el repositorio. Nunca.** Variables de entorno del proveedor de despliegue o gestor de secretos. Rotación documentada y `.gitignore` desde el primer commit.
2. **Tres entornos separados** con credenciales distintas: desarrollo, staging, producción. **El POC de SYSCOM jamás se ejecuta contra producción.**
3. **Mínimo privilegio por rol en Odoo.** Un técnico no ve la cartera. Un vendedor no ve configuraciones de equipos de otros clientes.
4. **MFA obligatorio** en Odoo, dominio, pasarela, WhatsApp Business y proveedor de nube.
5. **Cifrado en reposo** para la base de datos de Core y para los datos del Pasaporte del Equipo.
6. **Backups con restauración probada.** Un backup nunca restaurado no es un backup. RPO y RTO explícitos y escritos. Prueba de restauración antes del gate G5.
7. **Plan de respuesta a incidentes** por escrito, con notificación — la Ley 1581 genera obligaciones ante incidentes con datos personales.
8. Si un secreto se expone, se **rota**, no se borra del historial y se olvida.

## Alternativas consideradas

- **`.env` en el repositorio con acceso restringido.** Rechazada: el historial de git es permanente y los repositorios cambian de visibilidad.
- **Un solo entorno.** Rechazada: probar integraciones contra producción es cómo se corrompen datos reales.

## Consecuencias

**Positivas:** reduce el riesgo de mayor severidad del proyecto; hace auditable el acceso; permite recuperarse de un desastre.

**Negativas:** fricción operativa; costo de infraestructura duplicado por entorno (moderado a esta escala).

## Cómo se revierte

No se revierte. Es piso mínimo.
