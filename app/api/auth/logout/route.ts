import { NextResponse } from "next/server";

export async function GET(req) {
    const response = NextResponse.json();

    // ✅ NextAuth tarafından oluşturulan session-token cookie’sini temizle
    response.cookies.set("session-token", "", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(0), // Süreyi geçmişe ayarla (Cookie’yi siler)
    });

    response.cookies.set("__Secure-next-auth.session-token", "", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(0),
    });

    return response;
}