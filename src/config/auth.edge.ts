import { type JWT } from "next-auth/jwt";
import NextAuth, { NextAuthConfig, type Session, type User } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";

export const jwtAndSessionCallbacks = {
  async jwt({
    token,
    user,
    trigger,
    session,
  }: {
    token: JWT;
    user?: User | AdapterUser;
    trigger?: "signIn" | "signUp" | "update";
    session?: Session;
  }) {
    if (trigger === "update" && session) {
      token.isVerified = session.user.isVerified;
    }

    if (user) {
      (token.role = user.role ?? "SUBSCRIBER"),
        (token._id = user._id),
        (token.isVerified = user.isVerified),
        (token.name = user.name),
        (token.username = user.username);
    }
    return token;
  },
  async session({ session, token }: { session: Session; token: JWT }) {
    if (token) {
      (session.user._id = token._id),
        (session.user.username = token.username),
        (session.user.role = token.role),
        (session.user.isVerified = token.isVerified),
        (session.user.name = token.name);
    }
    return session;
  },
};

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 3600,
  },
  providers: [],
  callbacks: {
    ...jwtAndSessionCallbacks,
  },
  trustHost: true,
};

export const { auth } = NextAuth(authConfig);
