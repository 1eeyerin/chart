import { findFlo } from "@/lib/company/flo";
import ChartContainer from "./ui/ChartContainer";
import ChartCard from "./ui/ChartCard";
import ChartError from "./ui/ChartError";
import { CHART_NAMES } from "@/lib/constants/chartNames";
import { FloChartProps } from "./types";

const FloChart = async ({ session, title }: FloChartProps) => {
  if (!session) {
    return null;
  }

  try {
    const floData = await findFlo({ title });

    return (
      <ChartContainer title={`${CHART_NAMES.FLO} 차트 현황`}>
        <ChartCard
          title={`${CHART_NAMES.FLO} 차트`}
          data={floData}
          bgColor="bg-blue-50"
          textColor="text-blue-800"
        />
      </ChartContainer>
    );
  } catch (error) {
    console.error("데이터 로딩 실패:", error);

    return (
      <ChartContainer title={`${CHART_NAMES.FLO} 차트 현황`}>
        <ChartError title={`${CHART_NAMES.FLO} 차트`} error={error} />
      </ChartContainer>
    );
  }
};

export default FloChart;
