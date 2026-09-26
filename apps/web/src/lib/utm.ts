/**
 * Captura de UTM en el cliente (ADR-0010, requisito 3: "UTM capturado y
 * persistido en el backend, no solo en la analítica").
 *
 * Este piloto NO tiene todavía Atheron Core (M2 del MVP-30-DAYS-v1), así
 * que la persistencia real queda pendiente. Lo que sí hace esta función es
 * capturar los parámetros al aterrizar y guardarlos en `sessionStorage`
 * para que viajen con el lead cuando el formulario se envíe, preparando el
 * contrato de datos que Core deberá aceptar.
 */

export interface UtmParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
}

const STORAGE_KEY = "atheron_utm_v1";
const UTM_KEYS: (keyof UtmParams)[] = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];

export function captureAndPersistUtm(): void {
  if (typeof window === "undefined") return;

  const searchParams = new URLSearchParams(window.location.search);
  const hasAnyUtm = UTM_KEYS.some((key) => searchParams.has(key));
  if (!hasAnyUtm) return;

  const captured: UtmParams = {
    utm_source: searchParams.get("utm_source"),
    utm_medium: searchParams.get("utm_medium"),
    utm_campaign: searchParams.get("utm_campaign"),
    utm_content: searchParams.get("utm_content"),
  };

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
  } catch {
    // sessionStorage puede fallar (modo privado, cuotas). No es crítico:
    // el lead se sigue capturando, solo sin atribución UTM.
  }
}

export function readPersistedUtm(): UtmParams {
  const empty: UtmParams = {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_content: null,
  };

  if (typeof window === "undefined") return empty;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    return { ...empty, ...(JSON.parse(raw) as Partial<UtmParams>) };
  } catch {
    return empty;
  }
}
