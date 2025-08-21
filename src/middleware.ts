import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BLOCKED_BOTS, BOT_BLOCKING_CONFIG } from "@/lib/constants";

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const isBot = BLOCKED_BOTS.some((bot) =>
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );

  if (isBot) {
    return new NextResponse(BOT_BLOCKING_CONFIG.RESPONSE.MESSAGE, {
      status: BOT_BLOCKING_CONFIG.RESPONSE.STATUS,
      headers: BOT_BLOCKING_CONFIG.RESPONSE.HEADERS,
    });
  }

  // 일반 사용자는 정상적으로 처리
  const response = NextResponse.next();

  // 추가 보안 헤더 설정
  response.headers.set(
    "X-Robots-Tag",
    "noindex, nofollow, noarchive, nosnippet, noimageindex"
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "no-referrer");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
