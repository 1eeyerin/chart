/**
 * 봇 차단 목록
 * 검색엔진, 크롤러, 자동화 도구 등을 차단하는 User-Agent 목록
 */

/** 검색엔진 봇 */
export const SEARCH_ENGINE_BOTS = [
  "googlebot",
  "bingbot",
  "slurp",
  "duckduckbot",
  "baiduspider",
  "yandexbot",
  "seznambot",
  "ia_archiver",
  "archive.org_bot",
] as const;

/** 소셜미디어 봇 */
export const SOCIAL_MEDIA_BOTS = [
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "whatsapp",
  "telegrambot",
  "discordbot",
  "slackbot",
  "linebot",
] as const;

/** SEO 및 분석 도구 봇 */
export const SEO_ANALYTICS_BOTS = [
  "semrushbot",
  "ahrefsbot",
  "mj12bot",
  "dotbot",
  "rogerbot",
  "rogerbot",
  "seznambot",
  "ia_archiver",
  "archive.org_bot",
] as const;

/** 일반적인 봇 키워드 */
export const GENERAL_BOT_KEYWORDS = [
  "bot",
  "crawler",
  "spider",
  "scraper",
  "harvester",
  "collector",
] as const;

/** HTTP 클라이언트 도구 */
export const HTTP_CLIENT_TOOLS = [
  "wget",
  "curl",
  "python",
  "java",
  "php",
  "ruby",
  "perl",
  "go-http-client",
  "httpclient",
  "okhttp",
  "apache-httpclient",
  "axios",
  "fetch",
] as const;

/** 웹 자동화 도구 */
export const WEB_AUTOMATION_TOOLS = [
  "scrapy",
  "selenium",
  "puppeteer",
  "playwright",
  "headless",
  "phantomjs",
  "casperjs",
  "nightmare",
  "cypress",
  "testcafe",
] as const;

/** 모든 차단할 봇 목록 */
export const BLOCKED_BOTS = [
  ...GENERAL_BOT_KEYWORDS,
  ...SEARCH_ENGINE_BOTS,
  ...SOCIAL_MEDIA_BOTS,
  ...SEO_ANALYTICS_BOTS,
  ...HTTP_CLIENT_TOOLS,
  ...WEB_AUTOMATION_TOOLS,
] as const;

/** 봇 차단 설정 */
export const BOT_BLOCKING_CONFIG = {
  // 카테고리별 차단 설정
  BLOCK_SEARCH_ENGINES: true,
  BLOCK_SOCIAL_MEDIA: true,
  BLOCK_SEO_ANALYTICS: true,
  BLOCK_HTTP_CLIENTS: true,
  BLOCK_WEB_AUTOMATION: true,
  BLOCK_GENERAL_BOTS: true,

  /** 특정 봇 허용 (화이트리스트) */
  WHITELIST: [] as const,

  /** 차단 응답 설정 */
  RESPONSE: {
    STATUS: 403,
    MESSAGE: "Access Denied",
    HEADERS: {
      "Content-Type": "text/plain",
      "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noimageindex",
    },
  } as const,
} as const;
