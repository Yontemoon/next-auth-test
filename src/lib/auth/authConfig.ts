import NextAuth, { User } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { AdapterUser } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authConfig = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(credentials);
        const { email: emailCred, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          // Fetch user by email using Prisma
          const user = await prisma.user.findUnique({
            where: { email: emailCred },
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              password: true,
            },
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          // Validate the password
          const isValidPass = await compare(
            password as string,
            user.password as string
          );

          if (!isValidPass) {
            throw new Error("Invalid Credentials");
          }

          // Return user data (excluding password)
          const { id, name, email, role } = user;
          return { id, name, email, role };
        } catch (error) {
          console.error("Error in auth credentials authorization", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    //ACTS AS MIDDLEWARE
    authorized: async ({ request, auth }) => {
      const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
        cookieName: "__Secure-authjs.session-token",
      });

      // Protect all `/api` routes
      if (request.nextUrl.pathname.startsWith("/api") && !token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      // protects all "/api/admin" routes
      if (request.nextUrl.pathname.startsWith("api/admin") && !token) {
        return NextResponse.json(
          { message: "You do not an admin" },
          { status: 403 }
        );
      }

      NextResponse.next();

      return !!auth;
    },
    async session({ session, token }) {
      session.user = token.user as User & AdapterUser; // Added for type error
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});

export const { handlers, signIn, signOut, auth } = authConfig;
