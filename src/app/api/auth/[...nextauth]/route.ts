import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.DATABASE_URL}/admin/signIn`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });
          const user = await res.json();

          if (res.ok && user) {
            return user.user;
          }
          return user;
        } catch (error) {
          const errorMessage = (error as any)?.response?.data || null;
          throw new Error(
            errorMessage ? JSON.stringify(errorMessage) : String(error)
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (!user) {
        return token;
      }
      return {
        role: user.role,
        email: user.email,
        name: user.name,
        id: user.id,
        token: user.token,
      };
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.token = token.token;
      }
      return session;
    },
  },
  // pages: {
  //   signIn: "/signin",
  //   newUser: "/signup",
  // },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
