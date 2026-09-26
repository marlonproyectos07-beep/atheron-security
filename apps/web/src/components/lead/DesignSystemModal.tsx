"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";
import { captureAndPersistUtm, readPersistedUtm } from "@/lib/utm";

type Status = "idle" | "submitting" | "success" | "error";
type LeadMode = "demo" | "live";

interface ProductContext {
  slug: string;
  name: string;
}

export function DesignSystemModal({
  triggerLabel = "Diseñar mi sistema",
  triggerVariant = "primary",
  triggerSize = "md",
  triggerClassName,
  productContext,
}: {
  triggerLabel?: string;
  triggerVariant?: "primary" | "secondary" | "outline-on-dark";
  triggerSize?: "md" | "lg";
  triggerClassName?: string;
  productContext?: ProductContext;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstFieldRef = useRef<HTMLSelectElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [mode, setMode] = useState<LeadMode | null>(null);

  function open() {
    captureAndPersistUtm();
    setStatus("idle");
    dialogRef.current?.showModal();
    // El diálogo ya está siempre montado (solo oculto), así que el
    // autofocus nativo del navegador solo ocurriría una vez al montar —
    // enfocamos el primer campo a mano en cada apertura (auditoría 001B,
    // Accessibility, P2: sin esto el foco caía en el botón "Cerrar").
    firstFieldRef.current?.focus();
  }

  function close() {
    dialogRef.current?.close();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = new FormData(event.currentTarget);
    const utm = readPersistedUtm();

    const payload = {
      propertyType: form.get("propertyType"),
      city: form.get("city"),
      protect: form.get("protect"),
      zonesApprox: form.get("zonesApprox"),
      name: form.get("name"),
      whatsapp: form.get("whatsapp"),
      consent: {
        service: form.get("consentService") === "on",
        marketingOwn: form.get("consentMarketingOwn") === "on",
        marketingEcosystem: form.get("consentMarketingEcosystem") === "on",
      },
      productContext: productContext ?? null,
      utm,
      path: typeof window !== "undefined" ? window.location.pathname : null,
    };

    try {
      const response = await fetch("/api/design-my-system", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("request_failed");
      const data: { mode?: LeadMode } = await response.json();
      setMode(data.mode ?? "demo");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Button
        type="button"
        variant={triggerVariant}
        size={triggerSize}
        className={triggerClassName}
        onClick={open}
      >
        {triggerLabel}
      </Button>

      <dialog
        ref={dialogRef}
        aria-labelledby="design-system-modal-title"
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        onClose={() => setStatus("idle")}
        className={cn(
          "w-full max-w-lg rounded-2xl border border-border p-0 shadow-2xl backdrop:bg-slate-900/60",
          "[&[open]]:flex [&[open]]:flex-col",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 id="design-system-modal-title" className="text-lg font-bold text-text">
            Diseña tu sistema con Atheron
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="rounded-lg p-1 text-text-muted hover:bg-surface-muted hover:text-text"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto px-6 py-5">
          {status === "success" ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent-light text-brand-accent">
                <Icon name="check" className="h-6 w-6" />
              </div>
              {mode === "live" ? (
                <>
                  <p className="text-base font-semibold text-text">Recibimos tu solicitud</p>
                  <p className="mt-2 text-sm text-text-muted">
                    Un asesor Atheron se pondrá en contacto contigo para ayudarte a diseñar tu
                    sistema.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-base font-semibold text-text">Gracias por tu interés</p>
                  <p className="mt-2 text-sm text-text-muted">
                    Este sitio todavía está en fase de prueba, así que tu solicitud no llegó a
                    nuestro equipo comercial. Muy pronto podrás contactarnos directamente desde
                    aquí
                    {siteConfig.whatsappNumberVerified
                      ? " — mientras tanto, escríbenos por WhatsApp."
                      : "."}
                  </p>
                </>
              )}
              <Button type="button" variant="secondary" className="mt-6" onClick={close}>
                Cerrar
              </Button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <p className="text-sm text-text-muted">
                Cuéntanos un poco de tu espacio y un asesor Atheron te ayuda a diseñar el sistema
                que necesitas, hoy y a futuro.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Tipo de propiedad" htmlFor="propertyType">
                  <select
                    ref={firstFieldRef}
                    id="propertyType"
                    name="propertyType"
                    required
                    defaultValue=""
                    className={selectClasses}
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    <option value="casa">Casa</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="finca">Finca</option>
                    <option value="negocio">Negocio / local</option>
                    <option value="otro">Otro</option>
                  </select>
                </Field>

                <Field label="Ciudad" htmlFor="city">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    placeholder="Zipaquirá"
                    className={inputClasses}
                  />
                </Field>
              </div>

              <Field label="¿Qué quieres proteger?" htmlFor="protect">
                <select id="protect" name="protect" required defaultValue="" className={selectClasses}>
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  <option value="vivienda">Mi vivienda</option>
                  <option value="negocio">Mi negocio o local</option>
                  <option value="finca">Mi finca o predio</option>
                  <option value="otro">Otro</option>
                </select>
              </Field>

              <Field label="Cantidad aproximada de zonas a cubrir" htmlFor="zonesApprox">
                <select
                  id="zonesApprox"
                  name="zonesApprox"
                  required
                  defaultValue=""
                  className={selectClasses}
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  <option value="1">1 zona</option>
                  <option value="2-4">2 a 4 zonas</option>
                  <option value="5-8">5 a 8 zonas</option>
                  <option value="9-16">9 a 16 zonas</option>
                  <option value="16+">Más de 16 zonas</option>
                </select>
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nombre" htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={inputClasses}
                  />
                </Field>
                <Field label="WhatsApp" htmlFor="whatsapp">
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="300 000 0000"
                    className={inputClasses}
                  />
                </Field>
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <label className="flex items-start gap-3 text-sm text-text">
                  <input
                    type="checkbox"
                    name="consentService"
                    required
                    className="mt-1 h-4 w-4 rounded border-border text-brand-accent focus:ring-brand-accent"
                  />
                  <span>
                    Autorizo a Atheron Security a contactarme para dar seguimiento a esta
                    solicitud, conforme al{" "}
                    <a href={siteConfig.privacyPolicyPath} className="underline">
                      aviso de privacidad
                    </a>
                    . <span className="text-text-muted">(Obligatorio)</span>
                  </span>
                </label>

                <label className="flex items-start gap-3 text-sm text-text">
                  <input
                    type="checkbox"
                    name="consentMarketingOwn"
                    className="mt-1 h-4 w-4 rounded border-border text-brand-accent focus:ring-brand-accent"
                  />
                  <span>Quiero recibir comunicaciones comerciales de Atheron Security.</span>
                </label>

                <label className="flex items-start gap-3 text-sm text-text">
                  <input
                    type="checkbox"
                    name="consentMarketingEcosystem"
                    className="mt-1 h-4 w-4 rounded border-border text-brand-accent focus:ring-brand-accent"
                  />
                  <span>
                    Quiero conocer beneficios de otras líneas del ecosistema Atheron (hospedaje,
                    experiencias y aliados).
                  </span>
                </label>
              </div>

              {status === "error" ? (
                <p className="text-sm text-red-600">
                  No pudimos enviar tu solicitud. Intenta de nuevo
                  {siteConfig.whatsappNumberVerified ? " o escríbenos por WhatsApp." : " en unos minutos."}
                </p>
              ) : null}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Enviando..." : "Enviar solicitud"}
              </Button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}

const inputClasses =
  "w-full rounded-lg border border-border px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent";
const selectClasses = inputClasses;

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-text">
        {label}
      </label>
      {children}
    </div>
  );
}
