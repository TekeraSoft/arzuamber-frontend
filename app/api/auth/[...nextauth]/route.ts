import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "@/utils/refreshToken"; // Refresh Token fonksiyonu

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Spring Boot",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/authenticate`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    }
                );

                const data = await response.json();
                if (response.ok && data.accessToken) {
                    const decoded = jwtDecode(data.accessToken);
                    return {
                        id: decoded.userId,
                        name: decoded.nameSurname,
                        email: decoded.email,
                        role: decoded.role,
                        address: decoded.address,
                        phoneNumber: decoded.phoneNumber,
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken, // Refresh Token
                    };
                }
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    jwt: {
        async encode({ token }) {
            return token.accessToken; // Sadece JWT olarak gelen accessToken'ı sakla
        },
        async decode({ token }) {
            const decoded = jwtDecode(token); // accessToken'ı çözüp bilgileri döndür
            return {
                accessToken: token,
                id: decoded.userId,
                name: decoded.nameSurname,
                email: decoded.email,
                role: decoded.role,
                address: decoded.address,
                phoneNumber: decoded.phoneNumber,
                exp: decoded.exp, // Expiration süresi
            };
        },
        secret: process.env.NEXTAUTH_SECRET,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                const decoded = jwtDecode(user.accessToken);
                token.exp = decoded.exp; // Expiration süresi
            }

            // Access Token süresi dolmuşsa Refresh Token kullanarak yenile
            const now = Math.floor(Date.now() / 1000);
            if (token.exp < now) {
                try {
                    const newTokens = await refreshToken(token.refreshToken);
                    const decoded = jwtDecode(newTokens.accessToken);
                    return {
                        ...token,
                        accessToken: newTokens.accessToken,
                        refreshToken: newTokens.refreshToken,
                        exp: decoded.exp, // Yeni Access Token süresi
                    };
                } catch (error) {
                    return { ...token, error: "RefreshTokenExpired" }; // Refresh Token da süresi dolmuşsa
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user = {
                id: token.id,
                name: token.name,
                email: token.email,
                address: token.address,
                phoneNumber: token.phoneNumber,
                role: token.role,
            };
            return session;
        },
    },
    cookies: {
        sessionToken: {
            name: "next-auth.session-token",
            options: {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                path: "/",
            },
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };