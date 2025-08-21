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

export interface TweetTemplateData {
  artistName: string;
  chartSummary: ChartSummary;
  hashtags: string;
}

/**
 * 서버 사이드에서 차트 데이터를 수집하여 트윗 템플릿 데이터를 생성합니다.
 */
export const collectChartDataServer = async (
  title: string
): Promise<TweetTemplateData> => {
  try {
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

    return {
      artistName: title,
      chartSummary,
      hashtags: parseNewlines(ARTIST_CONFIG.HASHTAGS),
    };
  } catch (error) {
    console.error("차트 데이터 수집 실패:", error);
    throw new Error("차트 데이터를 수집할 수 없습니다.");
  }
};

/**
 * 차트 결과를 표시용 텍스트로 변환합니다.
 */
export const formatChartResult = (
  result: BaseResult | null,
  chartName: string
): string => {
  if (!result || !result.found) {
    return `- ${chartName} ❌`;
  }

  if (result.direction === CHART_DIRECTIONS.MAINTAIN) {
    return `- ${chartName} ${result.rank}`;
  }

  const arrow = ARROW_MAP[result.direction as keyof typeof ARROW_MAP] || "";
  const change = result.change || 0;

  return `- ${chartName} ${result.rank} (${arrow}${change})`;
};

/**
 * 트윗 템플릿을 생성합니다.
 */
export const generateTweetTemplate = (data: TweetTemplateData): string => {
  const { artistName, chartSummary, hashtags } = data;
  const currentTime = getKoreanTime();

  const header = `🏄‍♂️ ${artistName} | ${currentTime}`;

  const chartLines = [
    formatChartResult(chartSummary.melonTop, "멜론 TOP100"),
    formatChartResult(chartSummary.melonHot, "멜론 HOT100"),
    formatChartResult(chartSummary.genie, "지니"),
    formatChartResult(chartSummary.flo, "플로"),
    formatChartResult(chartSummary.bugs, "벅스"),
  ].join("\n");

  const youtubeLine = chartSummary.youtube
    ? `\n- MV 조회수 🎬 ${chartSummary.youtube.viewCount}회`
    : "";

  return `${header}\n \n${chartLines}${youtubeLine}\n \n${hashtags}`;
};
