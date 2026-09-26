/**
 * Modo del flujo "Diseñar mi sistema".
 *
 * "demo": valida y registra en el log del servidor, sin tocar ningún
 * sistema comercial real (Odoo, Atheron Core, WhatsApp Cloud API). El
 * cliente muestra un mensaje que deja claro que la solicitud no se envió.
 * "live": (futuro) el backend real procesa el lead y el cliente muestra el
 * mensaje de "un asesor te contactará".
 *
 * El modo lo decide el SERVIDOR (la respuesta de /api/design-my-system
 * incluye `mode`) para poder pasar de demo a live cambiando esta constante
 * y el handler, sin rediseñar el formulario ni el modal.
 */
export const LEAD_CAPTURE_MODE: "demo" | "live" = "demo";
