import { findGenie } from "@/lib/company/genie";
import { Session } from "next-auth";
import ChartContainer from "./ui/ChartContainer";
import ChartCard from "./ui/ChartCard";
import ChartError from "./ui/ChartError";
import { CHART_NAMES } from "@/lib/constants/chartNames";

interface GenieServerProps {
  session: Session | null;
}

const GenieChart = async ({ session }: GenieServerProps) => {
  if (!session) {
    return null;
  }

  try {
    const genieData = await findGenie({ artistName: "임영웅" });

    return (
      <ChartContainer title={`${CHART_NAMES.GENIE} 차트 현황`}>
        <ChartCard
          title={`${CHART_NAMES.GENIE} 차트`}
          data={genieData}
          bgColor="bg-purple-50"
          textColor="text-purple-800"
        />
      </ChartContainer>
    );
  } catch (error) {
    console.error("데이터 로딩 실패:", error);

    return (
      <ChartContainer title={`${CHART_NAMES.GENIE} 차트 현황`}>
        <ChartError title={`${CHART_NAMES.GENIE} 차트`} error={error} />
      </ChartContainer>
    );
  }
};

export default GenieChart;
