import ChartContainer from "./ui/ChartContainer";
import ChartCard from "./ui/ChartCard";
import ChartError from "./ui/ChartError";
import { CHART_NAMES } from "@/lib/constants/chartNames";
import { GenieChartProps } from "./types";

const GenieChart = ({ session, chartData }: GenieChartProps) => {
  if (!session) {
    return null;
  }

  if (!chartData) {
    return (
      <ChartContainer title={`${CHART_NAMES.GENIE} 차트 현황`}>
        <ChartError
          title={`${CHART_NAMES.GENIE} 차트`}
          error={new Error("차트 데이터를 불러올 수 없습니다.")}
        />
      </ChartContainer>
    );
  }

  const { genie } = chartData.chartSummary;

  if (!genie) {
    return (
      <ChartContainer title={`${CHART_NAMES.GENIE} 차트 현황`}>
        <ChartError
          title={`${CHART_NAMES.GENIE} 차트`}
          error={new Error("지니 차트 데이터를 불러올 수 없습니다.")}
        />
      </ChartContainer>
    );
  }

  return (
    <ChartContainer title={`${CHART_NAMES.GENIE} 차트 현황`}>
      <ChartCard
        title={`${CHART_NAMES.GENIE} 차트`}
        data={genie}
        bgColor="bg-purple-50"
        textColor="text-purple-800"
      />
    </ChartContainer>
  );
};

export default GenieChart;
