import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { jwtDecode } from "jwt-decode";

export default async function middleware(req) {
  const intlMiddleware = createMiddleware(routing);
  const res = await intlMiddleware(req); // i18n middleware çağrısı

  const token = req.cookies.get("session-token")?.value;
  const locale = req.cookies.get("NEXT_LOCALE")?.value;

  if (!token) {
    return res; // Kullanıcı zaten giriş yapmamış
  }

  let decodedToken;
  try {
    decodedToken = jwtDecode(token);
  } catch (error) {
    console.error("JWT decode hatası:", error);
    return res;
  }

  const isAdminRoute = req.nextUrl.pathname.startsWith(`/${locale}/admin`);
  const isTokenExpired = decodedToken?.exp < Math.floor(Date.now() / 1000);

  if (isAdminRoute && (isTokenExpired || !decodedToken?.role.includes("ADMIN"))) {
    console.log("Oturum süresi doldu veya yetkisiz erişim!");

    const baseUrl = new URL("/", req.url);
    const response = NextResponse.redirect(baseUrl);

    // ✅ Kullanıcıyı sistemden çıkar ve token'ı temizle
    response.cookies.set("session-token", "", { expires: new Date(0) });

    return response;
  }

  return res;
}

export const config = {
  matcher: ["/", "/(tr|en)/:path*", "/(tr|en)/admin/:path*"],
};
