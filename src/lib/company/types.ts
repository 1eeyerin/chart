export interface BaseChartParams {
  limit?: number;
  title: string;
}

export interface MelonChartParams extends BaseChartParams {
  type?: "TOP" | "HOT";
}

export type GenieChartParams = BaseChartParams;
export type BugsChartParams = BaseChartParams;

// 반환
export interface BaseResult {
  timestamp: string;
  found: boolean;
  rank?: number;
  direction?: "상승" | "하락" | "유지";
  change?: number;
  arrow?: string;
  title?: string;
  artist?: string;
}

export interface MelonResult extends BaseResult {
  type: "TOP" | "HOT";
  direction: "상승" | "하락" | "유지";
  change: number;
  arrow: string;
}

export type GenieResult = BaseResult;

export type BugsResult = BaseResult;

export type FloResult = BaseResult;
