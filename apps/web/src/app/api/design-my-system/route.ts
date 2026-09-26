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

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  let body: Partial<DesignSystemLeadPayload>;

  try {
    body = await request.json();
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

  const missing = requiredStrings.filter((key) => !isNonEmptyString(body[key]));
  if (missing.length > 0 || body.consent?.service !== true) {
    return NextResponse.json(
      { ok: false, error: "missing_required_fields", missing },
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
    hasName: isNonEmptyString(name),
    hasWhatsapp: isNonEmptyString(whatsapp),
    ...nonPiiFields,
  });

  return NextResponse.json({ ok: true, mode: LEAD_CAPTURE_MODE });
}
