export const SUPPORTED_LOCALES = ["es", "en"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";
export const LOCALE_COOKIE_NAME = "jv_locale";
export const SITE_URL = "https://www.jennyveraspa.com";

export function isValidLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const [, maybeLocale] = pathname.split("/");
  if (maybeLocale && isValidLocale(maybeLocale)) {
    return maybeLocale;
  }

  return null;
}

export function withLocalePath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (normalized === "/") {
    return `/${locale}`;
  }

  return `/${locale}${normalized}`;
}

export function stripLocaleFromPath(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  if (!locale) {
    return pathname;
  }

  const stripped = pathname.replace(new RegExp(`^/${locale}`), "");
  return stripped === "" ? "/" : stripped;
}

export const localeNames: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};

export function toAbsoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function getLocaleAlternates(locale: Locale, path: string) {
  const canonicalPath = withLocalePath(locale, path);

  return {
    canonical: toAbsoluteUrl(canonicalPath),
    languages: {
      es: toAbsoluteUrl(withLocalePath("es", path)),
      en: toAbsoluteUrl(withLocalePath("en", path)),
      "x-default": toAbsoluteUrl(withLocalePath(DEFAULT_LOCALE, path)),
    },
  };
}

export type HeaderCopy = {
  home: string;
  treatments: string;
  journal: string;
  contact: string;
  bookNow: string;
  scheduleNow: string;
  facials: string;
  facialsDesc: string;
  body: string;
  bodyDesc: string;
  technology: string;
  technologyDesc: string;
  viewAll: string;
  facialCategory: string;
  facialCategoryDesc: string;
  recovery: string;
  recoveryDesc: string;
  wellness: string;
  wellnessDesc: string;
  openMenu: string;
  closeMenu: string;
};

export const headerCopy: Record<Locale, HeaderCopy> = {
  es: {
    home: "Inicio",
    treatments: "Tratamientos",
    journal: "Journal",
    contact: "Contacto",
    bookNow: "Reserva Cita",
    scheduleNow: "Agendar Cita",
    facials: "Faciales",
    facialsDesc: "Rejuvenecimiento y cuidado de la piel",
    body: "Corporales",
    bodyDesc: "Remodelacion y reduccion de medidas",
    technology: "Tecnologia",
    technologyDesc: "Aparatologia de ultima generacion",
    viewAll: "Ver Todo",
    facialCategory: "Estetica Facial",
    facialCategoryDesc: "Guias para el cuidado del rostro",
    recovery: "Recuperacion",
    recoveryDesc: "Tips post-operatorios y drenajes",
    wellness: "Bienestar",
    wellnessDesc: "Relajacion y equilibrio corporal",
    openMenu: "Abrir menu de navegacion",
    closeMenu: "Cerrar menu de navegacion",
  },
  en: {
    home: "Home",
    treatments: "Treatments",
    journal: "Journal",
    contact: "Contact",
    bookNow: "Book Appointment",
    scheduleNow: "Schedule Appointment",
    facials: "Facial",
    facialsDesc: "Rejuvenation and skin care",
    body: "Body",
    bodyDesc: "Body contouring and reduction",
    technology: "Technology",
    technologyDesc: "Advanced aesthetic devices",
    viewAll: "View All",
    facialCategory: "Facial Aesthetics",
    facialCategoryDesc: "Guides for facial care",
    recovery: "Recovery",
    recoveryDesc: "Post-op tips and lymphatic drainage",
    wellness: "Wellness",
    wellnessDesc: "Relaxation and body balance",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
  },
};

export type FooterCopy = {
  tagline: string;
  treatmentsTitle: string;
  facialRejuvenation: string;
  bodyRemodeling: string;
  postOp: string;
  locationTitle: string;
  connectTitle: string;
  visitUs: string;
  callUs: string;
  hours: string;
  hoursValue: string;
};

export const footerCopy: Record<Locale, FooterCopy> = {
  es: {
    tagline: "Santuario de belleza y bienestar en Cuenca. Elevando la estetica con ciencia, lujo y arte.",
    treatmentsTitle: "Tratamientos",
    facialRejuvenation: "Rejuvenecimiento Facial",
    bodyRemodeling: "Remodelacion Corporal",
    postOp: "Post-Operatorios Especializados",
    locationTitle: "Ubicacion",
    connectTitle: "Conecta",
    visitUs: "Visitanos",
    callUs: "Llamanos",
    hours: "Horarios",
    hoursValue: "Lunes a Viernes: 09:00 - 18:00 | Sabados: 09:00 - 13:00",
  },
  en: {
    tagline: "A beauty and wellness sanctuary in Cuenca. Elevating aesthetics with science, luxury, and artistry.",
    treatmentsTitle: "Treatments",
    facialRejuvenation: "Facial Rejuvenation",
    bodyRemodeling: "Body Contouring",
    postOp: "Specialized Post-Op Care",
    locationTitle: "Location",
    connectTitle: "Connect",
    visitUs: "Visit Us",
    callUs: "Call Us",
    hours: "Hours",
    hoursValue: "Monday to Friday: 09:00 - 18:00 | Saturday: 09:00 - 13:00",
  },
};
