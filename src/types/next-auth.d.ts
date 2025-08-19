import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    twitterAccessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    twitterAccessToken?: string;
  }
}
