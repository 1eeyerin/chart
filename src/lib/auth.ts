import { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID!,
      clientSecret: process.env.TWITTER_SECRET!,
      version: "2.0",
      authorization: {
        url: "https://twitter.com/i/oauth2/authorize",
        params: {
          scope: "tweet.read tweet.write users.read offline.access",
        },
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, token }: any) {
      // JWT 토큰에서 트위터 액세스 토큰을 세션에 추가
      if (token.twitterAccessToken) {
        session.twitterAccessToken = token.twitterAccessToken;
      }
      return session;
    },
    async jwt({ token, user, account }: any) {
      // 최초 로그인 시 트위터 액세스 토큰 저장
      if (account && account.provider === "twitter") {
        token.twitterAccessToken = account.access_token;
      }
      return token;
    },
    async redirect({ url, baseUrl }: any) {
      // 로그인 취소나 에러 시 메인 페이지로 리다이렉션
      if (url.startsWith("/auth/signin") || url.startsWith("/auth/error")) {
        return baseUrl;
      }
      // 외부 URL이 아닌 경우 baseUrl 기준으로 처리
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // 외부 URL인 경우 그대로 반환
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
