import { fetchChartJSON } from "@/lib/utils/http";
import { processFloChartData } from "@/lib/company/flo";
import { FloChartResponse } from "@/lib/types/flo";
import ChartContainer from "./ui/ChartContainer";
import ChartCard from "./ui/ChartCard";
import ChartError from "./ui/ChartError";
import { CHART_NAMES } from "@/lib/constants/chartNames";

const FloChart = async () => {
  try {
    const url =
      "https://www.music-flo.com/api/display/v1/browser/chart/1/track/list?size=100";

    const data = await fetchChartJSON({
      url,
      userAgentType: "PC",
      referer: "https://www.music-flo.com/browse?chartId=1",
    });

    const targetArtist = "아일릿";
    const floData = processFloChartData(
      (data?.data as FloChartResponse) || [],
      targetArtist
    );

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
