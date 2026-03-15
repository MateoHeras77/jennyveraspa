import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  getLocaleFromPathname,
  isValidLocale,
  LOCALE_COOKIE_NAME,
  type Locale,
  withLocalePath,
} from "@/lib/i18n";

const PUBLIC_FILE = /\.(.*)$/;
const ENGLISH_COUNTRIES = new Set(["us", "gb", "ca", "au", "nz", "ie"]);

function detectBrowserLocale(request: NextRequest): Locale | null {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) {
    return null;
  }

  const primary = acceptLanguage.split(",")[0]?.toLowerCase() ?? "";
  if (primary.startsWith("en")) {
    return "en";
  }

  if (primary.startsWith("es")) {
    return "es";
  }

  return null;
}

function detectGeoLocale(request: NextRequest): Locale | null {
  const country =
    request.headers.get("x-vercel-ip-country")?.toLowerCase() ??
    request.headers.get("cf-ipcountry")?.toLowerCase() ??
    null;

  if (!country) {
    return null;
  }

  if (country === "ec") {
    return "es";
  }

  if (ENGLISH_COUNTRIES.has(country)) {
    return "en";
  }

  return null;
}

function resolveLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  return detectGeoLocale(request) ?? detectBrowserLocale(request) ?? DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const pathnameLocale = getLocaleFromPathname(pathname);
  if (pathnameLocale) {
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE_NAME, pathnameLocale, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  const locale = resolveLocale(request);
  const redirectedPath = withLocalePath(locale, pathname);
  const url = request.nextUrl.clone();
  url.pathname = redirectedPath;

  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE_NAME, locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
