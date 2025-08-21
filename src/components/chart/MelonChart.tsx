import { findMelon } from "@/lib/company/melon";
import ChartContainer from "./ui/ChartContainer";
import ChartCard from "./ui/ChartCard";
import ChartError from "./ui/ChartError";
import { CHART_NAMES } from "@/lib/constants/chartNames";
import { MelonChartProps } from "./types";

const MelonChart = async ({ session, artistName }: MelonChartProps) => {
  if (!session) {
    return null;
  }

  try {
    const [top, hot] = await Promise.all([
      findMelon({ type: "TOP", artistName }),
      findMelon({ type: "HOT", artistName }),
    ]);

    return (
      <ChartContainer title={`${CHART_NAMES.MELON} 차트 현황`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard
            title="TOP 차트"
            data={top}
            bgColor="bg-blue-50"
            textColor="text-blue-800"
          />
          <ChartCard
            title="HOT 차트"
            data={hot}
            bgColor="bg-red-50"
            textColor="text-red-800"
          />
        </div>
      </ChartContainer>
    );
  } catch (error) {
    console.error("데이터 로딩 실패:", error);
    return (
      <ChartContainer title={`${CHART_NAMES.MELON} 차트 현황`}>
        <ChartError title={`${CHART_NAMES.MELON} 차트`} error={error} />
      </ChartContainer>
    );
  }
};

export default MelonChart;
