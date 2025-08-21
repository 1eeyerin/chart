import { findBugs } from "@/lib/company/bugs";
import { Session } from "next-auth";
import ChartContainer from "./ui/ChartContainer";
import ChartCard from "./ui/ChartCard";
import ChartError from "./ui/ChartError";
import { CHART_NAMES } from "@/lib/constants/chartNames";

interface BugsServerProps {
  session: Session | null;
}

const BugsChart = async ({ session }: BugsServerProps) => {
  if (!session) {
    return null;
  }

  try {
    const bugsData = await findBugs({ artistName: "아일릿" });

    return (
      <ChartContainer title={`${CHART_NAMES.BUGS} 차트 현황`}>
        <ChartCard
          title={CHART_NAMES.BUGS}
          data={bugsData}
          bgColor="bg-green-50"
          textColor="text-green-800"
        />
      </ChartContainer>
    );
  } catch (error) {
    console.error("데이터 로딩 실패:", error);

    return (
      <ChartContainer title={`${CHART_NAMES.BUGS} 차트 현황`}>
        <ChartError title={`${CHART_NAMES.BUGS} 차트`} error={error} />
      </ChartContainer>
    );
  }
};

export default BugsChart;
