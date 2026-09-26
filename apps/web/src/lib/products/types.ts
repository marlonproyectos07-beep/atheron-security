/**
 * Modelo de producto reusable para las landings de Atheron Security.
 *
 * Principio rector (ver docs/adr/0010-stack-frontend-landings.md y
 * docs/RISKS-v1.md R01/R04): ningún dato comercial se muestra como hecho
 * verificado si no lo es. Todo campo que puede faltar evidencia trae su
 * propio `status` en vez de admitir `null` silencioso.
 */

import type { GrowthStageId } from "@/lib/growth/growth-path";

export type SourceStatus = "verified" | "requires_source" | "requires_test";

export interface Sourced<T> {
  value: T;
  status: SourceStatus;
  /** Nota interna para QA/CEO. No se muestra literalmente al usuario final. */
  internalNote?: string;
}

export type Segment = "hogar" | "finca" | "negocio";

export interface ProductImage {
  src: string;
  alt: string;
  /** true cuando la imagen es un placeholder ilustrativo, no la fotografía real del producto. */
  isPlaceholder: boolean;
}

export interface Benefit {
  title: string;
  description: string;
  icon: BenefitIcon;
}

export type BenefitIcon =
  | "resolution"
  | "storage"
  | "growth"
  | "support"
  | "install"
  | "trust";

export interface UseCase {
  segment: Segment;
  title: string;
  description: string;
}

export interface Specification {
  label: string;
  value: string;
  status: SourceStatus;
}

export interface SpecGroup {
  title: string;
  items: Specification[];
}

export interface InstallationInfo {
  /** ¿La UI debe ofrecer la opción de comprar solo el equipo? */
  offersEquipmentOnly: boolean;
  /** ¿La UI debe ofrecer la opción de solicitar instalación? */
  offersInstallationRequest: boolean;
  scopeIncluded: Sourced<string[]>;
  scopeExcluded: Sourced<string[]>;
}

export interface SupportInfo {
  before: string;
  during: string;
  after: string;
}

export interface WarrantyInfo {
  status: SourceStatus;
  durationMonths: number | null;
  coverageSummary: string | null;
  /** Copy neutral a mostrar cuando status !== 'verified'. */
  fallbackCopy: string;
}

export interface Money {
  amount: number;
  currency: "COP";
}

export interface PricingInfo {
  status: SourceStatus;
  cashPrice: Money | null;
  creditPrice: Money | null;
  downPayment: Money | null;
  installments: { count: number; amount: Money } | null;
}

export interface AvailabilityInfo {
  status: SourceStatus;
  state: "in_stock" | "on_request" | "unknown";
  leadTimeDays: number | null;
}

export interface SupplierInfo {
  name: string;
  sku: string;
  status: SourceStatus;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  /**
   * true = contenido de demostración para validar diseño, NO un testimonio
   * real. Debe renderizarse con una insignia visible y nunca publicarse en
   * producción con `isDemo: true`. Ver Testimonials.tsx.
   */
  isDemo: boolean;
  authorName: string;
  authorContext: string;
  productOrProject?: string;
  quote: string;
  /** Preparado para testimonios con foto; Testimonials.tsx todavía no lo consume. */
  photoSrc?: string;
  /** Preparado para video-testimonios; Testimonials.tsx ya reserva el marco de video. */
  videoUrl?: string;
  /** Procedencia del testimonio (para uno real) o nota de por qué es demo. */
  source: string;
}

export interface SeoInfo {
  title: string;
  description: string;
  canonicalPath: string;
  ogImageSrc: string;
}

export interface GrowthPathRef {
  /** id de la etapa en lib/growth/growth-path.ts donde vive este producto hoy. */
  currentStageId: GrowthStageId;
}

export interface Product {
  id: string;
  slug: string;
  atheronSku: string;
  supplier: SupplierInfo;
  brand: string;
  name: string;
  category: string;
  segment: Segment[];
  /**
   * Tupla no vacía (auditoría 001B, Frontend/Next.js, P1): antes era
   * `ProductImage[]`, y un futuro producto publicado con `images: []`
   * revienta en SSG/runtime en cualquier componente que asuma
   * `images[0]`. El tipo ahora obliga a declarar al menos una imagen.
   */
  images: [ProductImage, ...ProductImage[]];
  headline: string;
  shortDescription: string;
  benefits: Benefit[];
  specifications: SpecGroup[];
  includedItems: string[];
  excludedItems: string[];
  useCases: UseCase[];
  installation: InstallationInfo;
  support: SupportInfo;
  warranty: WarrantyInfo;
  pricing: PricingInfo;
  availability: AvailabilityInfo;
  growthPath: GrowthPathRef;
  relatedProducts: string[];
  faq: FaqItem[];
  testimonials: Testimonial[];
  seo: SeoInfo;
}
