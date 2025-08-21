import { CHART_TYPES, CHART_DIRECTIONS } from "../constants";

export interface BaseChartParams {
  limit?: number;
  title: string;
}

export interface MelonChartParams extends BaseChartParams {
  type?: typeof CHART_TYPES.TOP | typeof CHART_TYPES.HOT;
}

export type GenieChartParams = BaseChartParams;
export type BugsChartParams = BaseChartParams;

export interface BaseResult {
  timestamp: string;
  found: boolean;
  rank?: number;
  direction?:
    | typeof CHART_DIRECTIONS.UP
    | typeof CHART_DIRECTIONS.DOWN
    | typeof CHART_DIRECTIONS.MAINTAIN;
  change?: number;
  arrow?: string;
  title?: string;
  artist?: string;
}

export interface MelonResult extends BaseResult {
  type: typeof CHART_TYPES.TOP | typeof CHART_TYPES.HOT;
  direction:
    | typeof CHART_DIRECTIONS.UP
    | typeof CHART_DIRECTIONS.DOWN
    | typeof CHART_DIRECTIONS.MAINTAIN;
  change: number;
  arrow: string;
}

export type GenieResult = BaseResult;

export type BugsResult = BaseResult;

export type FloResult = BaseResult;
