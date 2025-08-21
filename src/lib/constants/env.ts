// API 키
export const API_KEYS = {
  YOUTUBE: process.env.YOUTUBE_API_KEY!,
} as const;

// 인증 관련
export const AUTH_CONFIG = {
  TWITTER: {
    CLIENT_ID: process.env.TWITTER_ID!,
    CLIENT_SECRET: process.env.TWITTER_SECRET!,
  },
} as const;

// 사이트 설정
export const SITE_CONFIG = {
  NAME: process.env.NEXT_PUBLIC_SITE_NAME!,
} as const;

// 아티스트 정보
export const ARTIST_CONFIG = {
  NAME: process.env.ARTIST_NAME!,
  YOUTUBE_ID: process.env.YOUTUBE_ID!,
} as const;

// User-Agent 설정
export const USER_AGENT_CONFIG = {
  PC: process.env.NEXT_PUBLIC_PC_USER_AGENT!,
  MOBILE: process.env.NEXT_PUBLIC_MOBILE_USER_AGENT!,
} as const;

// 환경변수 유효성 검사
export function validateEnvironmentVariables(): void {
  const requiredEnvVars = [
    { key: "YOUTUBE_API_KEY", value: API_KEYS.YOUTUBE },
    { key: "TWITTER_ID", value: AUTH_CONFIG.TWITTER.CLIENT_ID },
    { key: "TWITTER_SECRET", value: AUTH_CONFIG.TWITTER.CLIENT_SECRET },
    { key: "NEXT_PUBLIC_SITE_NAME", value: SITE_CONFIG.NAME },
    { key: "ARTIST_NAME", value: ARTIST_CONFIG.NAME },
    { key: "YOUTUBE_ID", value: ARTIST_CONFIG.YOUTUBE_ID },
    { key: "NEXT_PUBLIC_PC_USER_AGENT", value: USER_AGENT_CONFIG.PC },
    { key: "NEXT_PUBLIC_MOBILE_USER_AGENT", value: USER_AGENT_CONFIG.MOBILE },
  ];

  const missingEnvVars = requiredEnvVars.filter(({ value }) => !value);

  if (missingEnvVars.length > 0) {
    const missingKeys = missingEnvVars.map(({ key }) => key).join(", ");
    throw new Error(`필수 환경변수가 설정되지 않았습니다: ${missingKeys}`);
  }
}
