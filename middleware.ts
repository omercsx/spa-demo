import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { i18n } from "./i18n.config"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  // If it's missing a locale, redirect to the default locale
  if (pathnameIsMissingLocale) {
    // Get the preferred locale from the cookie or headers
    const cookieLocale = request.cookies.get("locale")?.value
    const headerLocale = request.headers.get("accept-language")?.split(",")[0].split("-")[0]

    // Determine which locale to use
    let locale = i18n.defaultLocale
    if (cookieLocale && i18n.locales.includes(cookieLocale)) {
      locale = cookieLocale
    } else if (headerLocale && i18n.locales.includes(headerLocale)) {
      locale = headerLocale
    }

    // Redirect to the same pathname but with the locale prefix
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`, request.url),
    )
  }
}

export const config = {
  // Match all pathnames except for:
  // - /api routes
  // - /_next (Next.js internals)
  // - /icons, /images (static files)
  // - /favicon.ico, /manifest.json (static files)
  matcher: ["/((?!api|_next|icons|images|favicon.ico|manifest.json).*)"],
}
