# ENCARGO AUDITORÍA CLAUDE CODE
## ATHERON ECOSYSTEM v1

## ROL

Claude Code actúa como AGENTE A:

- CTO auditor;
- arquitecto técnico;
- futuro ejecutor.

EN ESTA TAREA NO IMPLEMENTA PRODUCTO.

Debe realizar una auditoría de:

- arquitectura;
- viabilidad;
- riesgos;
- escalabilidad;
- oportunidades;
- deuda futura.

Debe actuar como CTO fundador ESCÉPTICO.

No como asistente complaciente.

## MISIÓN

Revisar críticamente el Atheron Playbook y determinar qué debemos
corregir AHORA para no pagar esa deuda cuando existan:

- 10 ciudades;
- 100 ciudades;
- múltiples proveedores;
- múltiples aliados;
- múltiples unidades de negocio.

## A. QUÉ ESTÁ FUERTE

Identifica:

- decisiones correctas;
- ventajas estructurales;
- elementos defendibles;
- buenas separaciones;
- oportunidades reales.

## B. QUÉ ESTÁ DÉBIL

Señala:

- huecos;
- contradicciones;
- conceptos vagos;
- deuda;
- dependencias;
- suposiciones;
- riesgos de escala.

## C. QUÉ FALTA ANTES DE CONSTRUIR

Analiza especialmente:

- modelo de datos;
- identidad única;
- deduplicación;
- multiempresa;
- multiciudad;
- permisos;
- consentimiento;
- Habeas Data / privacidad;
- pagos;
- cartera;
- fidelización;
- ledger de beneficios;
- conciliación;
- aliados;
- devoluciones;
- garantías;
- fulfillment;
- observabilidad;
- recuperación;
- auditoría financiera;
- idempotencia;
- colas;
- webhooks;
- secretos;
- disaster recovery;
- ownership de datos;
- límites API;
- vendor lock-in.

## D. ODOO: DENTRO VS FUERA

Propón boundaries claros:

1. Odoo estándar.
2. Odoo custom.
3. Middleware Atheron.
4. Base externa si aplica.
5. Frontend.
6. Proveedores.

Evitar:

- sobrearquitectura;
- encerrarlo todo en Odoo.

## E. ATHERON LOOP

Diseña conceptualmente:

- Benefit;
- Eligibility;
- Tier;
- Validity;
- EconomicCost;
- Sponsor;
- Redemption;
- Stacking;
- CustomerIdentity;
- Household;
- Company;
- Referral;
- Repurchase;
- CrossSell;
- Expiration;
- Fraud;
- Abuse;
- Rollback;
- Ledger;
- AuditTrail.

Indica qué NO debemos construir todavía.

## F. EVENTOS

Propón contratos mínimos para eventos como:

LeadCreated
LeadQualified
QuoteSent
QuoteAccepted
SaleConfirmed
PaymentReceived
PaymentMissed
EquipmentInstalled
StayBooked
StayCompleted
BenefitGranted
BenefitRedeemed
BenefitExpired
ReferralCreated
ReferralConverted
WarrantyOpened
ReturnCreated

Decide:

¿Necesitamos Event Driven Architecture desde ya?

o

¿solo contratos de eventos inicialmente?

Argumenta.

## G. MVP REAL DE 30 DÍAS

Separar:

MUST NOW
NEXT
LATER
DO NOT BUILD YET

La prioridad es:

VENDER + APRENDER

sin hipotecar arquitectura futura.

MVP debe considerar:

- 5 productos Línea Hogar;
- landing;
- CRM;
- WhatsApp;
- origen;
- UTM;
- ciudad;
- contado/crédito;
- seguimiento;
- preview;
- pruebas;
- venta real;
- POC SYSCOM paralelo.

## H. GATES

Definir gates verificables.

Nunca decir:

"terminado"

sin:

- URL;
- commit;
- test;
- captura;
- dato;
- evidencia.

## I. TOP 15 RIESGOS

Ordenar por:

- severidad;
- probabilidad.

Para cada uno:

- impacto;
- mitigación;
- owner;
- cuándo atenderlo.

## J. ESCALABILIDAD

Auditar:

1 ciudad.
10 ciudades.
100 ciudades.

Y además:

- múltiples proveedores;
- múltiples aliados;
- monedas futuras;
- impuestos futuros;
- B2C;
- B2B;
- familias;
- grupos empresariales.

## K. REFERENTES MUNDIALES

Investiga 8–15 referentes REALES.

Categorías:

- loyalty;
- marketplaces;
- hospitality ecosystems;
- omnichannel;
- CRM;
- partner networks;
- cross-sell;
- logistics;
- memberships;
- referrals.

Para cada referente:

- empresa/programa;
- fuente;
- fecha de revisión;
- qué estudiar;
- qué podríamos adaptar;
- qué NO copiar;
- aprendizaje para Atheron.

No afirmar cosas sin fuente.

## L. DIFERENCIACIÓN DEFENDIBLE

Sé duro.

Separar:

YA EXISTE
COMBINACIÓN INTERESANTE
POTENCIALMENTE NOVEDOSO
MOAT DEFENDIBLE

Analizar moat mediante:

- datos;
- operación;
- partners;
- UX;
- automatización;
- switching cost sano;
- identidad;
- confianza;
- red local;
- aprendizaje.

NO usar:

"esto no existe en Colombia"

sin evidencia.

## M. IMPACTO HUMANO Y GOBIERNO

Diseñar crecimiento real para:

- empleados;
- técnicos;
- líderes;
- aliados.

Analizar:

- carrera;
- formación;
- incentivos;
- ownership operativo;
- métricas;
- profit-sharing;
- participación;
- riesgos laborales;
- riesgos tributarios;
- riesgos societarios.

No crear promesas vagas.

## N. ARQUITECTURA ALTERNATIVA

Si fueras CTO fundador:

propón tu propia arquitectura.

Compara:

PROPUESTA AGENTE B
vs
PROPUESTA CLAUDE

Evaluar:

- complejidad;
- costo;
- time-to-market;
- resiliencia;
- mantenimiento;
- escala;
- dependencia Odoo;
- dependencia proveedor;
- observabilidad;
- seguridad.

## GOBERNANZA DOCUMENTAL

Audita también esto.

Proponer:

GOOGLE DRIVE:
qué vive allí.

GITHUB /docs:
qué vive allí.

ADRs:
qué decisiones requieren ADR.

Evitar dos fuentes de verdad contradictorias.

## REGLAS DE VERACIDAD

Siempre separar:

CONFIRMADO
HIPÓTESIS
REQUIERE FUENTE
REQUIERE PRUEBA

No inventar capacidades de:

- SYSCOM;
- Odoo;
- WhatsApp;
- pagos;
- logística.

Para investigación externa:
fuente + fecha.

No modificar producción.

No implementar funcionalidades todavía.

No hacer merge.

## ENTREGABLES

Trabajar en:

claude/audit-atheron-ecosystem-v1

Crear:

docs/AUDIT-CLAUDE-v1.md
docs/ARCHITECTURE-OPTIONS-v1.md
docs/MVP-30-DAYS-v1.md
docs/RISKS-v1.md

Crear además:

docs/adr/

si concluyes que corresponde.

Como mínimo deja ADRs propuestos para decisiones arquitectónicas
estructurales.

## AL FINAL

Entregar:

1. SHA.
2. PR Draft.
3. Archivos.
4. Top 15 riesgos.
5. 10 decisiones para Marlon + Agente B.
6. Arquitectura recomendada.
7. Cambios al diseño.
8. Qué NO construir.
9. Moat potencial.
10. Qué impediría ser multinacional.
11. Decisiones necesarias antes de código.
12. Hipótesis que requieren prueba.

NO MERGE.

Después:

DETENTE.

No comiences implementación.

El Agente B auditará tu auditoría y Marlon decidirá.

## CRITERIO DE ÉXITO

La auditoría debe ayudar a construir:

- empresa automatizada;
- empresa rentable;
- empresa verificable;
- empresa replicable;

no solamente una web bonita.

La misión NO es validar lo que ya pensamos.

La misión es encontrar qué debemos corregir AHORA.
