import ChartContainer from "./ui/ChartContainer";
import ChartCard from "./ui/ChartCard";
import ChartError from "./ui/ChartError";
import { CHART_NAMES } from "@/lib/constants/chartNames";
import { FloChartProps } from "./types";

const FloChart = ({ session, chartData }: FloChartProps) => {
  if (!session) {
    return null;
  }

  if (!chartData) {
    return (
      <ChartContainer title={`${CHART_NAMES.FLO} 차트 현황`}>
        <ChartError
          title={`${CHART_NAMES.FLO} 차트`}
          error={new Error("차트 데이터를 불러올 수 없습니다.")}
        />
      </ChartContainer>
    );
  }

  const { flo } = chartData.chartSummary;

  if (!flo) {
    return (
      <ChartContainer title={`${CHART_NAMES.FLO} 차트 현황`}>
        <ChartError
          title={`${CHART_NAMES.FLO} 차트`}
          error={new Error("플로 차트 데이터를 불러올 수 없습니다.")}
        />
      </ChartContainer>
    );
  }

  return (
    <ChartContainer title={`${CHART_NAMES.FLO} 차트 현황`}>
      <ChartCard
        title={`${CHART_NAMES.FLO} 차트`}
        data={flo}
        bgColor="bg-green-50"
        textColor="text-green-800"
      />
    </ChartContainer>
  );
};

export default FloChart;
