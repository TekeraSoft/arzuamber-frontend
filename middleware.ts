import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { jwtDecode } from "jwt-decode";

export default async function middleware(req) {
  const intlMiddleware = createMiddleware(routing);

  const res = await intlMiddleware(req); // i18n routing için mevcut middleware çağrısı

  const token = req.cookies.get("session-token")?.value || req.cookies.get("__Secure-next-auth.session-token");

  if (token) {
    req.cookies.set("Authorization", `Bearer ${token}`);
  }
  const locale = req.cookies.get("NEXT_LOCALE")?.value;

  const decodedToken = token ? jwtDecode(token) : undefined;

  // Admin route koruma
  const isAdminRoute = req.nextUrl.pathname.startsWith(`/${locale}/admin`);

  if (isAdminRoute && (!token || decodedToken?.role[0] !== "ADMIN" || decodedToken?.exp < new Date().getTime() / 1000)) {
    req.cookies.delete("session-token");
    req.cookies.delete("__Secure-next-auth.session-token");
    const baseUrl = new URL("/", req.url);
    return NextResponse.redirect(baseUrl);
  }

  return res;
}

export const config = {
  matcher: ["/", "/(tr|en)/:path*", `/(tr|en)/admin/:path*`],
};
