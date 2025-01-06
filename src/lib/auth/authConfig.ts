import PostgresAdapter from "@auth/pg-adapter";
import NextAuth from "next-auth";
import { pool } from "../postgres";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
    authorized: async ({ auth }) => {
      console.log("PASSING AUTHORIZE", auth);
      return !!auth;
    },
    async session({ session, token }) {
      // console.log("SESSION TRIGGER");
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      // console.log("JWT TRIGGER");
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});
