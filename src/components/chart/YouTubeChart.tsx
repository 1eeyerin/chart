import ChartContainer from "./ui/ChartContainer";
import YouTubeCard from "./ui/YouTubeCard";
import ChartError from "./ui/ChartError";
import { CHART_NAMES } from "@/lib/constants/chartNames";
import { YouTubeServerProps } from "./types";

const YouTubeChart = ({ session, chartData }: YouTubeServerProps) => {
  if (!session) {
    return null;
  }

  if (!chartData) {
    return (
      <ChartContainer title={`${CHART_NAMES.YOUTUBE} 조회수 현황`}>
        <ChartError
          title={`${CHART_NAMES.YOUTUBE} 조회수`}
          error={new Error("차트 데이터를 불러올 수 없습니다.")}
        />
      </ChartContainer>
    );
  }

  const { youtube } = chartData.chartSummary;

  if (!youtube) {
    return (
      <ChartContainer title={`${CHART_NAMES.YOUTUBE} 조회수 현황`}>
        <ChartError
          title={`${CHART_NAMES.YOUTUBE} 조회수`}
          error={new Error("유튜브 데이터를 불러올 수 없습니다.")}
        />
      </ChartContainer>
    );
  }

  return (
    <ChartContainer title={`${CHART_NAMES.YOUTUBE} 조회수 현황`}>
      <YouTubeCard title={`${CHART_NAMES.YOUTUBE} 조회수`} data={youtube} />
    </ChartContainer>
  );
};

export default YouTubeChart;
