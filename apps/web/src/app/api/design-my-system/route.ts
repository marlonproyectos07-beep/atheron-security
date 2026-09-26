import { NextResponse } from "next/server";

/**
 * Endpoint de STAGING/DEMO para el formulario "Diseñar mi sistema".
 *
 * Este piloto NO conecta todavía a Odoo, Atheron Core, WhatsApp Cloud API
 * ni n8n (fuera de alcance de ATH-SECURITY-WEB-001, ver
 * docs/ATH-SECURITY-WEB-001.md). Este handler valida la forma del payload
 * y lo registra en el log del servidor, dejando el contrato de datos listo
 * para cuando exista un backend real que lo reciba (Atheron Core, M2 del
 * MVP-30-DAYS-v1). No persiste nada ni envía nada a un sistema productivo.
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

  // DEMO/STAGING: registrar en el log del servidor. Reemplazar por un
  // evento `LeadCreated` hacia Atheron Core cuando exista (ADR-0003).
  console.info("[design-my-system:staging-lead]", {
    receivedAt: new Date().toISOString(),
    ...body,
  });

  return NextResponse.json({ ok: true });
}
