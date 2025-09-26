import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role: "ADMIN" | "USER";
    avatarUrl?: string;
    phone?: string | null;
  }

  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "USER";
      avatarUrl?: string;
      phone?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    phone?: string | null;
    role: "ADMIN" | "USER";
  }
}
