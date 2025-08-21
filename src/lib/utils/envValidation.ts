/**
 * 환경변수 유효성 검사 유틸리티
 */

import {
  API_KEYS,
  AUTH_CONFIG,
  SITE_CONFIG,
  ARTIST_CONFIG,
  USER_AGENT_CONFIG,
} from "../constants/env";

/**
 * 필수 환경변수가 모두 설정되었는지 검사합니다.
 * @throws {Error} 필수 환경변수가 설정되지 않은 경우
 */
export function validateEnvironmentVariables(): void {
  const requiredEnvVars = [
    { key: "YOUTUBE_API_KEY", value: API_KEYS.YOUTUBE },
    { key: "TWITTER_ID", value: AUTH_CONFIG.TWITTER.CLIENT_ID },
    { key: "TWITTER_SECRET", value: AUTH_CONFIG.TWITTER.CLIENT_SECRET },
    { key: "NEXT_PUBLIC_SITE_NAME", value: SITE_CONFIG.NAME },
    { key: "TITLE", value: ARTIST_CONFIG.TITLE },
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
