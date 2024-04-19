/*
https://next-auth.js.org/getting-started/example
> yarn add next-auth

https://next-auth.js.org/v3/adapters/prisma
> yarn add @prisma/client @next-auth/prisma-adapter@canary
*/

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Google from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  adapter: PrismaAdapter(prisma),
};

export default NextAuth(authOptions);
