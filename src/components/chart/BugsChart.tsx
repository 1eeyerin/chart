import ChartContainer from "./ui/ChartContainer";
import ChartCard from "./ui/ChartCard";
import ChartError from "./ui/ChartError";
import { CHART_NAMES } from "@/lib/constants/chartNames";
import { BugsChartProps } from "./types";

const BugsChart = ({ session, chartData }: BugsChartProps) => {
  if (!session) {
    return null;
  }

  if (!chartData) {
    return (
      <ChartContainer title={`${CHART_NAMES.BUGS} 차트 현황`}>
        <ChartError
          title={`${CHART_NAMES.BUGS} 차트`}
          error={new Error("차트 데이터를 불러올 수 없습니다.")}
        />
      </ChartContainer>
    );
  }

  const { bugs } = chartData.chartSummary;

  if (!bugs) {
    return (
      <ChartContainer title={`${CHART_NAMES.BUGS} 차트 현황`}>
        <ChartError
          title={`${CHART_NAMES.BUGS} 차트`}
          error={new Error("벅스 차트 데이터를 불러올 수 없습니다.")}
        />
      </ChartContainer>
    );
  }

  return (
    <ChartContainer title={`${CHART_NAMES.BUGS} 차트 현황`}>
      <ChartCard
        title={`${CHART_NAMES.BUGS} 차트`}
        data={bugs}
        bgColor="bg-orange-50"
        textColor="text-orange-800"
      />
    </ChartContainer>
  );
};

export default BugsChart;
