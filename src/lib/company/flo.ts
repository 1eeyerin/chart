import { FloChartResponse } from "@/lib/types/flo";
import { getKoreanTime } from "../utils/time";
import { fetchChartJSON } from "../utils/http";
import {
  CHART_URLS,
  CHART_REFERERS,
  USER_AGENT_TYPES,
  CHART_DIRECTIONS,
  ARROW_MAP,
} from "../constants";
import type { FloResult } from "./types";

export async function findFlo({
  title,
}: {
  title: string;
}): Promise<FloResult> {
  try {
    const data = await fetchChartJSON({
      url: CHART_URLS.FLO.CHART,
      userAgentType: USER_AGENT_TYPES.PC,
      referer: CHART_REFERERS.FLO,
    });

    return processFloChartData((data?.data as FloChartResponse) || [], title);
  } catch (error) {
    console.error("Flo 차트 데이터 가져오기 실패:", error);
    throw error;
  }
}

export function processFloChartData(
  data: FloChartResponse,
  title: string
): FloResult {
  if (!data.trackList || !Array.isArray(data.trackList)) {
    return { timestamp: getKoreanTime(), found: false };
  }

  const normalizedTarget = title.toLowerCase().trim();
  const now = getKoreanTime();

  const foundTrack = data.trackList.find(
    (track) =>
      track.representationArtist?.name
        .toLowerCase()
        .includes(normalizedTarget) ||
      track.name.toLowerCase().includes(normalizedTarget)
  );

  if (!foundTrack) {
    return { timestamp: now, found: false };
  }

  const rankBadge = foundTrack.rank?.rankBadge || 0;
  let direction: "상승" | "하락" | "유지";
  let change: number;
  let arrow: string;

  if (rankBadge > 0) {
    direction = CHART_DIRECTIONS.UP;
    change = rankBadge;
    arrow = ARROW_MAP[CHART_DIRECTIONS.UP];
  } else if (rankBadge < 0) {
    direction = CHART_DIRECTIONS.DOWN;
    change = Math.abs(rankBadge);
    arrow = ARROW_MAP[CHART_DIRECTIONS.DOWN];
  } else {
    direction = CHART_DIRECTIONS.MAINTAIN;
    change = 0;
    arrow = ARROW_MAP[CHART_DIRECTIONS.MAINTAIN];
  }

  return {
    timestamp: now,
    found: true,
    rank: data.trackList.indexOf(foundTrack) + 1,
    change,
    direction,
    arrow,
    title: foundTrack.name,
  };
}
