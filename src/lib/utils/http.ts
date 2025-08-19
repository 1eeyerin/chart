/**
 * HTTP 요청을 위한 공통 설정과 유틸리티
 */

/**
 * User-Agent 타입 정의
 */
export type UserAgentType = "PC" | "MOBILE";

/**
 * 차트 크롤링을 위한 기본 fetch 옵션
 */
export const CHART_FETCH_OPTIONS = {
  headers: {
    // 필수적으로 많이 쓰는 헤더
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "keep-alive",
  },
  cache: "no-store" as const,
};

/**
 * User-Agent 환경변수에서 값 가져오기
 * @param type - PC 또는 MOBILE
 * @returns User-Agent 문자열
 */
function getUserAgent(type: UserAgentType): string {
  const envKey =
    type === "PC"
      ? "NEXT_PUBLIC_PC_USER_AGENT"
      : "NEXT_PUBLIC_MOBILE_USER_AGENT";
  const userAgent = process.env[envKey];

  if (!userAgent) {
    throw new Error(`${envKey} 환경변수가 설정되지 않았습니다.`);
  }

  return userAgent;
}

/**
 * 차트 크롤링을 위한 fetch 함수
 * @param url - 요청할 URL
 * @param userAgentType - PC 또는 MOBILE User-Agent 선택
 * @param options - 추가 fetch 옵션 (선택사항)
 * @param referer - Referer 헤더 값 (선택사항)
 * @param origin - Origin 헤더 값 (선택사항)
 * @returns Response 객체
 */
export async function fetchChart(
  url: string,
  userAgentType: UserAgentType = "PC",
  options?: RequestInit,
  referer?: string,
  origin?: string
) {
  const userAgent = getUserAgent(userAgentType);

  const headers = {
    ...CHART_FETCH_OPTIONS.headers,
    "User-Agent": userAgent,
    ...(referer && { Referer: referer }),
    ...(origin && { Origin: origin }),
    ...(options?.headers && options.headers),
  };

  return fetch(url, {
    ...CHART_FETCH_OPTIONS,
    ...options,
    headers,
  });
}

/**
 * 차트 크롤링을 위한 HTML 텍스트 추출
 * @param params - 요청 파라미터
 * @param params.url - 요청할 URL
 * @param params.userAgentType - PC 또는 MOBILE User-Agent 선택
 * @param params.options - 추가 fetch 옵션 (선택사항)
 * @param params.referer - Referer 헤더 값 (선택사항)
 * @param params.origin - Origin 헤더 값 (선택사항)
 * @returns HTML 문자열
 */
export async function fetchChartHTML({
  url,
  userAgentType = "PC",
  options,
  referer,
  origin,
}: {
  url: string;
  userAgentType?: UserAgentType;
  options?: RequestInit;
  referer?: string;
  origin?: string;
}): Promise<string> {
  const response = await fetchChart(
    url,
    userAgentType,
    options,
    referer,
    origin
  );
  return response.text();
}

/**
 * 차트 API 호출을 위한 JSON 응답 추출
 * @param params - 요청 파라미터
 * @param params.url - 요청할 URL
 * @param params.userAgentType - PC 또는 MOBILE User-Agent 선택
 * @param params.options - 추가 fetch 옵션 (선택사항)
 * @param params.referer - Referer 헤더 값 (선택사항)
 * @param params.origin - Origin 헤더 값 (선택사항)
 * @returns JSON 객체
 */
export async function fetchChartJSON<T = any>({
  url,
  userAgentType = "PC",
  options,
  referer,
  origin,
}: {
  url: string;
  userAgentType?: UserAgentType;
  options?: RequestInit;
  referer?: string;
  origin?: string;
}): Promise<T> {
  const response = await fetchChart(
    url,
    userAgentType,
    options,
    referer,
    origin
  );
  return response.json();
}
