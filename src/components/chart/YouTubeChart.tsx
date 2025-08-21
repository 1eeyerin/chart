import { getYouTubeViewCount } from "@/lib/company/youtube";
import ChartContainer from "./ui/ChartContainer";
import YouTubeCard from "./ui/YouTubeCard";
import ChartError from "./ui/ChartError";
import { CHART_NAMES } from "@/lib/constants/chartNames";
import { YouTubeServerProps } from "./types";

const YouTubeChart = async ({ session, videoId }: YouTubeServerProps) => {
  if (!session) {
    return null;
  }

  try {
    const youtubeData = await getYouTubeViewCount(videoId);

    return (
      <ChartContainer title={`${CHART_NAMES.YOUTUBE} 조회수 현황`}>
        <YouTubeCard
          title={`${CHART_NAMES.YOUTUBE} 조회수`}
          data={youtubeData}
        />
      </ChartContainer>
    );
  } catch (error) {
    console.error("데이터 로딩 실패:", error);

    return (
      <ChartContainer title={`${CHART_NAMES.YOUTUBE} 조회수 현황`}>
        <ChartError title={`${CHART_NAMES.YOUTUBE} 조회수`} error={error} />
      </ChartContainer>
    );
  }
};

export default YouTubeChart;
