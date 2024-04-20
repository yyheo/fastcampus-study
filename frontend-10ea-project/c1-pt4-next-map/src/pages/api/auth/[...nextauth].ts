/*
https://next-auth.js.org/getting-started/example
> yarn add next-auth

https://next-auth.js.org/v3/adapters/prisma
> yarn add @prisma/client @next-auth/prisma-adapter@canary
*/

import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/db";
import Google from "next-auth/providers/google";
import { randomBytes, randomUUID } from "crypto";

export const authOptions = {
  // session : https://next-auth.js.org/configuration/options 참고
  session: {
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 2 * 60 * 60, // 2 hours
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },

  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/users/login",
  },
};

export default NextAuth(authOptions);
