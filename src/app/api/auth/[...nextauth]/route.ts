import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/utils/prisma";

async function refreshAccessToken(token: any) {
  try {
    const account = await prisma.account.findFirst({
      where: {
        userId: token.id,
        provider: token.provider,
      },
    });

    if (!account?.refresh_token) {
      return { ...token, error: "NoRefreshToken" };
    }

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: account.refresh_token!,
      }),
    });

    const refreshedTokens = await response.json();
    if (!response.ok) throw refreshedTokens;

    await prisma.account.update({
      where: { id: account.id },
      data: {
        access_token: refreshedTokens.access_token,
        expires_at: refreshedTokens.expires_in
          ? Math.floor(Date.now() / 1000 + refreshedTokens.expires_in)
          : null,
        refresh_token: refreshedTokens.refresh_token ?? account.refresh_token,
      },
    });

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? account.refresh_token,
    };
  } catch (error) {
    console.error("Refresh token error:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl || "",
          role: user.role as "ADMIN" | "USER",
          phone: user.phone || "",
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        const { email, name, image } = user;
        if (!email) return false;

        const userCount = await prisma.user.count();

        const dbUser = await prisma.user.upsert({
          where: { email },
          update: {},
          create: {
            name: name ?? "No Name",
            email,
            avatarUrl: image ?? "",
            role: userCount === 0 ? "ADMIN" : "USER",
            emailVerified: true,
            provider: account.provider.toUpperCase() as "GOOGLE" | "GITHUB",
          },
        });

        await prisma.account.upsert({
          where: {
            provider_providerAccountId: {
              provider: account.provider.toUpperCase() as "GOOGLE" | "GITHUB",
              providerAccountId: account.providerAccountId!,
            },
          },
          update: {
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at ?? null,
          },
          create: {
            provider: account.provider.toUpperCase() as "GOOGLE" | "GITHUB",
            providerAccountId: account.providerAccountId!,
            type: account.type as "oauth",
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at ?? null,
            userId: dbUser.id,
          },
        });

        user.id = dbUser.id;
        user.name = dbUser.name;
        user.phone = dbUser.phone || "";
        user.avatarUrl = dbUser.avatarUrl as string;
        user.role = dbUser.role;
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (user && account) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role as "ADMIN" | "USER";
        token.phone = user.phone || "";
        token.picture = user.avatarUrl;
        token.provider = account.provider;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at
          ? account.expires_at * 1000
          : null;
      }

      if (
        token.accessTokenExpires &&
        Date.now() < (token.accessTokenExpires as number)
      ) {
        return token;
      }

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role as "ADMIN" | "USER";
        session.user.avatarUrl = token.picture as string;
        session.user.phone = token.phone || "";
      }
      (session as any).accessToken = token.accessToken;
      (session as any).error = token.error;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
