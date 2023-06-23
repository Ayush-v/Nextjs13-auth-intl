import NextAuth, { DefaultSession } from "next-auth";
import "next-auth/jwt";

type UserId = string;

type UserRole = "ADMIN" | "USER";

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role: UserRole;
    token: string;
  }
}

declare module "next-auth" {
  interface User {
    id: UserId;
    name: string;
    email: string;
    role: UserRole;
    token: string;
  }

  interface Session {
    user: {
      id: UserId;
      role: UserRole;
      token: string;
    } & DefaultSession["user"];
  }
}
