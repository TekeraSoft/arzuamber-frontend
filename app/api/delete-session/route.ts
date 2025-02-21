import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({ message: "Session deleted" }, { status: 200 });

    response.cookies.set("next-auth.session-token", "", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(0), // Cookie’yi silmek için geçmiş bir tarih
    });

    response.cookies.set("__Secure-next-auth.session-token", "", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(0),
    });

    return response;
}