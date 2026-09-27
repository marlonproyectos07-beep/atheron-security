import { NextResponse } from "next/server";
import { LEAD_CAPTURE_MODE } from "@/lib/lead-mode";

/**
 * Endpoint de STAGING/DEMO para el formulario "Diseñar mi sistema".
 *
 * Este piloto NO conecta todavía a Odoo, Atheron Core, WhatsApp Cloud API
 * ni n8n (fuera de alcance de ATH-SECURITY-WEB-001, ver
 * docs/ATH-SECURITY-WEB-001.md). Este handler valida la forma del payload
 * y registra en el log del servidor SOLO lo no personal (para verificar que
 * el flujo funciona), dejando el contrato de datos listo para cuando exista
 * un backend real (Atheron Core, M2 del MVP-30-DAYS-v1). No persiste PII,
 * no la registra en el log, y no envía nada a un sistema productivo.
 *
 * La respuesta incluye `mode` (ver lib/lead-mode.ts) para que el cliente
 * decida qué mensaje de éxito mostrar sin que el formulario necesite saber
 * si el backend real ya existe.
 */

interface DesignSystemLeadPayload {
  propertyType: unknown;
  city: unknown;
  protect: unknown;
  zonesApprox: unknown;
  name: unknown;
  whatsapp: unknown;
  consent: {
    service: unknown;
    marketingOwn: unknown;
    marketingEcosystem: unknown;
  };
  productContext: unknown;
  utm: unknown;
  path: unknown;
}

// Límites defensivos (auditoría 001B, Security/Privacy, P1): sin esto,
// un payload con strings enormes o un `utm`/`productContext` anidado
// arbitrariamente pasaba la validación y terminaba completo en el log.
const MAX_BODY_BYTES = 10_000;
const MAX_STRING_LEN = 300;

function isValidString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= MAX_STRING_LEN;
}

/** Objeto plano de un solo nivel, valores string cortos — nunca array ni anidado. */
function isShallowStringRecord(value: unknown): boolean {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  return Object.values(value).every(
    (v) => v === null || (typeof v === "string" && v.length <= MAX_STRING_LEN),
  );
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
  }

  let body: Partial<DesignSystemLeadPayload>;

  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const requiredStrings: (keyof DesignSystemLeadPayload)[] = [
    "propertyType",
    "city",
    "protect",
    "zonesApprox",
    "name",
    "whatsapp",
  ];

  const missing = requiredStrings.filter((key) => !isValidString(body[key]));
  const utmValid = body.utm === undefined || body.utm === null || isShallowStringRecord(body.utm);
  const productContextValid =
    body.productContext === undefined || body.productContext === null || isShallowStringRecord(body.productContext);
  const pathValid = body.path === undefined || body.path === null || isValidString(body.path);

  if (
    missing.length > 0 ||
    body.consent?.service !== true ||
    !utmValid ||
    !productContextValid ||
    !pathValid
  ) {
    return NextResponse.json(
      { ok: false, error: "invalid_payload", missing },
      { status: 422 },
    );
  }

  // DEMO/STAGING: registrar en el log del servidor SIN PII. `name` y
  // `whatsapp` nunca se escriben en el log completos — solo si llegaron.
  // Reemplazar por un evento `LeadCreated` hacia Atheron Core cuando exista
  // (ADR-0003); ese evento sí necesitará la PII, pero viajará al Core, no
  // al log de la aplicación.
  const { name, whatsapp, ...nonPiiFields } = body;
  console.info("[design-my-system:staging-lead]", {
    receivedAt: new Date().toISOString(),
    mode: LEAD_CAPTURE_MODE,
    hasName: isValidString(name),
    hasWhatsapp: isValidString(whatsapp),
    ...nonPiiFields,
  });

  return NextResponse.json({ ok: true, mode: LEAD_CAPTURE_MODE });
}
