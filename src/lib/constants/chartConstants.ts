/**
 * 차트 관련 상수
 */

/**
 * UserAgent 타입
 */
export const USER_AGENT_TYPES = {
  PC: "PC",
  MOBILE: "MOBILE",
} as const;

export type UserAgentType =
  (typeof USER_AGENT_TYPES)[keyof typeof USER_AGENT_TYPES];

/**
 * 차트 순위 변화 방향
 */
export const CHART_DIRECTIONS = {
  UP: "상승",
  DOWN: "하락",
  MAINTAIN: "유지",
} as const;

export type ChartDirection =
  (typeof CHART_DIRECTIONS)[keyof typeof CHART_DIRECTIONS];

/**
 * 화살표 이모지 매핑
 */
export const ARROW_MAP = {
  [CHART_DIRECTIONS.UP]: "🔺",
  [CHART_DIRECTIONS.DOWN]: "🔻",
  [CHART_DIRECTIONS.MAINTAIN]: "-",
} as const;

/**
 * 차트 타입
 */
export const CHART_TYPES = {
  TOP: "TOP",
  HOT: "HOT",
} as const;

export type ChartType = (typeof CHART_TYPES)[keyof typeof CHART_TYPES];
