import PostgresAdapter from "@auth/pg-adapter";
import NextAuth, { User } from "next-auth";
import { pool } from "../postgres";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { AdapterUser } from "next-auth/adapters";

export const authConfig = NextAuth({
  trustHost: true,
  adapter: PostgresAdapter(pool),
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
        const { email: emailCred, password } = credentials;
        try {
          const userQuery = await pool.query(
            `SELECT id, name, email, password, role FROM users WHERE email = $1`,
            [emailCred]
          );

          if (userQuery.rows.length === 0) {
            throw new Error("No user found with this email");
          }
          const user = userQuery.rows[0] as {
            name: string;
            email: string;
            id: string;
            role: string;
            password: string;
          };

          const isValidPass = await compare(password as string, user.password);

          if (!isValidPass) {
            throw new Error("Invalid Credentials");
          }

          const { email, id, name, role } = user;
          return {
            email,
            id,
            name,
            role,
          };
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
      console.log("passing middleware");
      console.log("request pathm", request.nextUrl.pathname);
      console.log("REQUEST", request);
      // Retrieve the token
      const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
        cookieName: "__Secure-authjs.session-token",
      });
      console.log("TOKEN", token);

      // Protect all `/api` routes
      if (request.nextUrl.pathname.startsWith("/api") && !token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      if (request.nextUrl.pathname.startsWith("api/admin") && !token) {
        return NextResponse.json(
          { message: "You do not an admin" },
          { status: 403 }
        );
      }

      // Allow the request to continue
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
