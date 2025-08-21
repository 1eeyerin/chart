import type { Session } from "next-auth";

export interface BaseChartProps {
  title: string;
}

export interface BaseChartWithSessionProps extends BaseChartProps {
  session: Session | null;
}

export type MelonChartProps = BaseChartWithSessionProps;

export type GenieChartProps = BaseChartWithSessionProps;

export type BugsChartProps = BaseChartWithSessionProps;

export type FloChartProps = BaseChartWithSessionProps;

export interface YouTubeServerProps {
  session: Session | null;
  videoId: string;
}
