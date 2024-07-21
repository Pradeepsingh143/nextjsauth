import "next-auth";
import "next-auth/jwt";
import { DefaultSession } from "next-auth";
import { Role } from "@/lib/types"

declare module "next-auth" {
  interface User {
    _id?: string;
    username?: string;
    email: string;
    isVerified?: boolean;
    role?: keyof typeof Role;
  }

  interface Session {
    user: {
      _id?: string;
      username?: string;
      email: string;
      isVerified?: boolean;
      role?: keyof typeof Role;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
    email: string;
    isVerified?: boolean;
    role?: keyof typeof Role;
  }
}
