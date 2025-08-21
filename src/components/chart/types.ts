import type { Session } from "next-auth";
import type { TweetTemplateData } from "../../lib/utils/chartDataCollector";

export interface BaseChartProps {
  chartData: TweetTemplateData | null;
}

export interface BaseChartWithSessionProps extends BaseChartProps {
  session: Session | null;
}

export type MelonChartProps = BaseChartWithSessionProps;
export type GenieChartProps = BaseChartWithSessionProps;
export type BugsChartProps = BaseChartWithSessionProps;
export type FloChartProps = BaseChartWithSessionProps;
export type YouTubeServerProps = BaseChartWithSessionProps;
