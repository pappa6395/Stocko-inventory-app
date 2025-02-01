import NextAuth from "next-auth";
import { Role, UserId } from "@prisma/client";
import type { User } from "next-auth";
import "next-auth/jwt";
type UserId = string;
 
declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role: Role;
  }
}
 
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User & {
      id: UserId;
      role: UserRole;
    };
  }
}