import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { cookies } from "next/headers";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/Login/patient",
  },

  providers: [
    CredentialsProvider({
      id: "doctor-login",
      name: "Doctor Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch("http://127.0.0.1:5000/api/auth/login-doctor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });
          const user = await res.json();
          if (res.ok && user) {
            return {
              id: user.id,
              email: user.email,
              role: user.role,
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),

    CredentialsProvider({
      id: "patient-login",
      name: "Patient Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch("http://127.0.0.1:5000/api/auth/login-patient", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });
          const user = await res.json();
          if (res.ok && user) {
            return {
              id: user.id,
              email: user.email,
              role: user.role,
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
      }

      if (account?.provider === "google") {
        const cookieStore = await cookies();
        const roleCookie = cookieStore.get("vd_role")?.value;

        token.role = roleCookie === "doctor" ? "doctor" : "patient";
      }

      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider !== "google") return true;

      const cookieStore = await cookies();
      const roleCookie = cookieStore.get("vd_role")?.value;
      const role = roleCookie === "doctor" ? "doctor" : "patient";

      try {
        await fetch("http://127.0.0.1:5000/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            image: user.image,
            role,
          }),
        });
      } catch (error) {
        console.error("Google Auth Backend Sync Error", error);
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
