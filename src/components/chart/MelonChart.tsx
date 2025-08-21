import ChartContainer from "./ui/ChartContainer";
import ChartCard from "./ui/ChartCard";
import ChartError from "./ui/ChartError";
import { CHART_NAMES } from "@/lib/constants/chartNames";
import { MelonChartProps } from "./types";

const MelonChart = ({ session, chartData }: MelonChartProps) => {
  if (!session) {
    return null;
  }

  if (!chartData) {
    return (
      <ChartContainer title={`${CHART_NAMES.MELON} 차트 현황`}>
        <ChartError
          title={`${CHART_NAMES.MELON} 차트`}
          error={new Error("차트 데이터를 불러올 수 없습니다.")}
        />
      </ChartContainer>
    );
  }

  const { melonTop, melonHot } = chartData.chartSummary;

  return (
    <ChartContainer title={`${CHART_NAMES.MELON} 차트 현황`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {melonTop && (
          <ChartCard
            title="TOP 차트"
            data={melonTop}
            bgColor="bg-blue-50"
            textColor="text-blue-800"
          />
        )}
        {melonHot && (
          <ChartCard
            title="HOT 차트"
            data={melonHot}
            bgColor="bg-red-50"
            textColor="text-red-800"
          />
        )}
      </div>
    </ChartContainer>
  );
};

export default MelonChart;
