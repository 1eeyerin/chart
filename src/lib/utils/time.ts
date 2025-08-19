/**
 * 한국 시간대 기준으로 현재 시간을 포맷팅하는 유틸리티
 */

/**
 * 한국 시간대 기준으로 현재 시간을 문자열로 반환
 * @returns "2024-01-15 14:30:25" 형식의 문자열
 */
export function getKoreanTime(): string {
  return new Date()
    .toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
    .replace(",", "");
}

/**
 * 한국 시간대 기준으로 현재 시간을 Date 객체로 반환
 * @returns 한국 시간대 기준 Date 객체
 */
export function getKoreanDate(): Date {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );
}

/**
 * 한국 시간대 기준으로 현재 시간을 ISO 문자열로 반환
 * @returns ISO 8601 형식의 문자열
 */
export function getKoreanTimeISO(): string {
  return getKoreanDate().toISOString();
}
