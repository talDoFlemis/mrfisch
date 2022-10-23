import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../utils/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // GoogleProvider({ clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
  ],
  // // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // // The routes shown here are the default URLs that will be used when a custom
  // // pages is not specified for that route.
  // // https://next-auth.js.org/configuration/pages
  // pages: {
  //   // signIn: '/auth/signin',  // Displays signin buttons
  //   // signOut: '/auth/signout', // Displays form with sign out button
  //   // error: '/auth/error', // Error code passed in query string as ?error=
  //   // verifyRequest: '/auth/verify-request', // Used for check email page
  //   // newUser: null // If set, new users will be directed here on first sign in
  // },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/codes`;
    },
    async session({ session, token, user }) {
      session.user.role = user.role;
      session.user.id = user.id;
      session.user.isNew = user.isNew;
      return session;
    },
  },

  // Enable debug messages in the console if you are having problems
  debug: true,
});
