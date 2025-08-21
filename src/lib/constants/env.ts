/**
 * API 키 상수
 */
export const API_KEYS = {
  YOUTUBE: process.env.YOUTUBE_API_KEY!,
} as const;

/**
 * 인증 관련 설정 상수
 */
export const AUTH_CONFIG = {
  TWITTER: {
    CLIENT_ID: process.env.TWITTER_ID!,
    CLIENT_SECRET: process.env.TWITTER_SECRET!,
  },
} as const;

/**
 * 사이트 설정 상수
 */
export const SITE_CONFIG = {
  NAME: process.env.NEXT_PUBLIC_SITE_NAME!,
} as const;

/**
 * 아티스트 정보 상수
 */
export const ARTIST_CONFIG = {
  NAME: process.env.ARTIST_NAME!,
  YOUTUBE_ID: process.env.YOUTUBE_ID!,
} as const;

/**
 * User-Agent 설정 상수
 */
export const USER_AGENT_CONFIG = {
  PC: process.env.NEXT_PUBLIC_PC_USER_AGENT!,
  MOBILE: process.env.NEXT_PUBLIC_MOBILE_USER_AGENT!,
} as const;
