/**
 * 차트 관련 공통 타입 정의
 */

/**
 * 기본 차트 결과 인터페이스
 */
export interface BaseChartResult {
  found: boolean;
  rank?: number;
}

/**
 * 순위 변화 정보를 포함한 차트 결과 인터페이스
 */
export interface ChartResultWithChange extends BaseChartResult {
  direction: "상승" | "하락" | "유지";
  change: number;
  arrow: string;
}

/**
 * 곡 제목 정보를 포함한 차트 결과 인터페이스
 */
export interface ChartResultWithTitle extends BaseChartResult {
  title?: string;
}

/**
 * 차트 타입 정의
 */
export type ChartType = "TOP" | "HOT" | "GENIE";
