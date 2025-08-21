import { ARTIST_CONFIG } from "../constants/env";
import { CHART_DIRECTIONS, ARROW_MAP } from "../constants/chartConstants";
import type { BaseResult, YouTubeViewCountResult } from "../company/types";
import { findMelon } from "../company/melon";
import { findGenie } from "../company/genie";
import { findFlo } from "../company/flo";
import { findBugs } from "../company/bugs";
import { getYouTubeViewCount } from "../company/youtube";
import { getKoreanTime, parseNewlines } from "./index";

export interface ChartSummary {
  melonTop: BaseResult | null;
  melonHot: BaseResult | null;
  genie: BaseResult | null;
  flo: BaseResult | null;
  bugs: BaseResult | null;
  youtube: YouTubeViewCountResult | null;
}

export interface ChartSummaryWithStatus {
  melonTop: { status: "fulfilled" | "rejected"; value: BaseResult | null };
  melonHot: { status: "fulfilled" | "rejected"; value: BaseResult | null };
  genie: { status: "fulfilled" | "rejected"; value: BaseResult | null };
  flo: { status: "fulfilled" | "rejected"; value: BaseResult | null };
  bugs: { status: "fulfilled" | "rejected"; value: BaseResult | null };
  youtube: {
    status: "fulfilled" | "rejected";
    value: YouTubeViewCountResult | null;
  };
}

export interface TweetTemplateData {
  artistName: string;
  chartSummary: ChartSummary;
  chartSummaryWithStatus: ChartSummaryWithStatus;
  hashtags: string;
}

/**
 * 서버 사이드에서 차트 데이터를 수집하여 트윗 템플릿 데이터를 생성합니다.
 */
export const collectChartDataServer = async (
  title: string
): Promise<TweetTemplateData> => {
  // 각 차트 함수를 직접 호출하여 데이터 수집
  const [melonTop, melonHot, genie, flo, bugs, youtube] =
    await Promise.allSettled([
      findMelon({ type: "TOP", title }),
      findMelon({ type: "HOT", title }),
      findGenie({ title }),
      findFlo({ title }),
      findBugs({ title }),
      getYouTubeViewCount(ARTIST_CONFIG.YOUTUBE_ID || ""),
    ]);

  const chartSummary: ChartSummary = {
    melonTop: melonTop.status === "fulfilled" ? melonTop.value : null,
    melonHot: melonHot.status === "fulfilled" ? melonHot.value : null,
    genie: genie.status === "fulfilled" ? genie.value : null,
    flo: flo.status === "fulfilled" ? flo.value : null,
    bugs: bugs.status === "fulfilled" ? bugs.value : null,
    youtube: youtube.status === "fulfilled" ? youtube.value : null,
  };

  const chartSummaryWithStatus: ChartSummaryWithStatus = {
    melonTop: {
      status: melonTop.status,
      value: melonTop.status === "fulfilled" ? melonTop.value : null,
    },
    melonHot: {
      status: melonHot.status,
      value: melonHot.status === "fulfilled" ? melonHot.value : null,
    },
    genie: {
      status: genie.status,
      value: genie.status === "fulfilled" ? genie.value : null,
    },
    flo: {
      status: flo.status,
      value: flo.status === "fulfilled" ? flo.value : null,
    },
    bugs: {
      status: bugs.status,
      value: bugs.status === "fulfilled" ? bugs.value : null,
    },
    youtube: {
      status: youtube.status,
      value: youtube.status === "fulfilled" ? youtube.value : null,
    },
  };

  const result = {
    artistName: title,
    chartSummary,
    chartSummaryWithStatus,
    hashtags: parseNewlines(ARTIST_CONFIG.HASHTAGS),
  };

  return result;
};

/**
 * 차트 결과를 표시용 텍스트로 변환합니다.
 */
export const formatChartResult = (
  result: BaseResult | null,
  chartName: string,
  status?: "fulfilled" | "rejected"
): string => {
  // 유튜브의 경우 특별 처리 (status 체크보다 먼저)
  if (chartName === "MV 조회수") {
    // 크롤링 실패나 API 호출 실패인 경우
    if (!result || !result.found || status === "rejected") {
      const message = `- ${chartName} (데이터 불러오기에 실패했습니다)`;
      return message;
    }

    // 유튜브 데이터가 있으면 조회수 표시
    const viewCount = (result as YouTubeViewCountResult).viewCount || "0";
    return `- MV 조회수 🎬 ${viewCount}회`;
  }

  // 크롤링 실패나 API 호출 실패인 경우 (유튜브가 아닌 경우)
  if (status === "rejected") {
    const message = `- ${chartName} (데이터 불러오기에 실패했습니다)`;
    return message;
  }

  // 데이터는 있지만 곡을 찾지 못한 경우
  if (!result || !result.found) {
    const message = `- ${chartName} ❌`;
    return message;
  }

  if (result.direction === CHART_DIRECTIONS.MAINTAIN) {
    const message = `- ${chartName} ${result.rank}위 (-)`;
    return message;
  }

  const arrow = ARROW_MAP[result.direction as keyof typeof ARROW_MAP] || "";
  const change = result.change || 0;

  const message = `- ${chartName} ${result.rank}위 (${arrow}${change})`;
  return message;
};

/**
 * 트윗 템플릿을 생성합니다.
 */
export const generateTweetTemplate = (data: TweetTemplateData): string => {
  const { artistName, chartSummary, chartSummaryWithStatus, hashtags } = data;
  const currentTime = getKoreanTime();

  const header = `🏄‍♂️ ${artistName} | ${currentTime}`;

  const chartLines = [
    formatChartResult(
      chartSummary.melonTop,
      "멜론 TOP100",
      chartSummaryWithStatus.melonTop.status
    ),
    formatChartResult(
      chartSummary.melonHot,
      "멜론 HOT100",
      chartSummaryWithStatus.melonHot.status
    ),
    formatChartResult(
      chartSummary.genie,
      "지니",
      chartSummaryWithStatus.genie.status
    ),
    formatChartResult(
      chartSummary.flo,
      "플로",
      chartSummaryWithStatus.flo.status
    ),
    formatChartResult(
      chartSummary.bugs,
      "벅스",
      chartSummaryWithStatus.bugs.status
    ),
  ].join("\n");

  // 유튜브도 다른 차트들과 동일한 방식으로 처리
  const youtubeLine = formatChartResult(
    chartSummary.youtube,
    "MV 조회수",
    chartSummaryWithStatus.youtube.status
  );

  const result = `${header}\n \n${chartLines}\n${youtubeLine}\n \n${hashtags}`;

  return result;
};
