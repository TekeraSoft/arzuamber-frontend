import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {jwtDecode} from "jwt-decode";


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
                        accessToken: data.accessToken,
                    };
                }
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
            };
        },
        secret: process.env.NEXTAUTH_SECRET,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user = {
                id: token.id,
                name: token.name,
                email: token.email,
                role: token.role,
            };
            return session;
        },
    },
    cookies: {
        sessionToken: {
            name: 'session-token',
            options: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            }
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };