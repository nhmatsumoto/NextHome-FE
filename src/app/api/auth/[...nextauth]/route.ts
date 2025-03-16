import NextAuth, { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions: NextAuthOptions = {
    providers: [
      KeycloakProvider({
        clientId: process.env.KEYCLOAK_CLIENT_ID!,
        clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
        issuer: `${process.env.KEYCLOAK_ISSUER}`,
      }),
    ],
    pages: {
      signIn: "/login", // Página de login customizada
    },
    callbacks: {
      async jwt({ token, account }) {
        
        // login pela primeira vez
        if (account) {
            // Primeiro login: guardar tokens do Keycloak
            token.accessToken = account.access_token;
            token.refreshToken = account.refresh_token;
            token.accessTokenExpires = account.expires_at as number * 1000; // em ms
            return token;
        }

        // Se o token de acesso ainda for válido, retorná-lo
        if (Date.now() < (token.accessTokenExpires as number)) {
            return token;
        }
        return await refreshAccessToken(token);
      },
      async session({ session, token }) {
        session.accessToken = token.accessToken as string;
        return session;
      },
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60,
    },
  };
  
  async function refreshAccessToken(token: any) {
    try {
        const response = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
            client_id: process.env.KEYCLOAK_CLIENT_ID!,
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken,
            }),
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
        };
        } catch (error) {
        console.error("Erro ao renovar o token de acesso:", error);
        return { ...token, error: "RefreshAccessTokenError" };
    }
}
  
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

