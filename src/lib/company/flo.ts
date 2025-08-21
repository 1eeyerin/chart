import { FloChartResponse } from "@/lib/types/flo";
import { getKoreanTime } from "../utils/time";
import type { FloResult } from "./types";

//TODO!
export function processFloChartData(
  data: FloChartResponse,
  targetArtist: string
): FloResult {
  if (!data.trackList || !Array.isArray(data.trackList)) {
    return { timestamp: getKoreanTime(), found: false };
  }

  const normalizedTarget = targetArtist.toLowerCase().trim();
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

  // 순위 변화 정보 추출
  const rankBadge = foundTrack.rank?.rankBadge || 0;
  let direction: "상승" | "하락" | "유지";
  let change: number;
  let arrow: string;

  if (rankBadge > 0) {
    direction = "상승";
    change = rankBadge;
    arrow = "🔺";
  } else if (rankBadge < 0) {
    direction = "하락";
    change = Math.abs(rankBadge);
    arrow = "🔻";
  } else {
    direction = "유지";
    change = 0;
    arrow = "⏺";
  }

  // 대표 아티스트 이름
  const artistName =
    foundTrack.representationArtist?.name ||
    (foundTrack.artistList && foundTrack.artistList.length > 0
      ? foundTrack.artistList[0].name
      : "알 수 없음");

  // 새로 등장한 곡인지 확인
  const isNew = foundTrack.rank?.newYn === "Y";

  // 업데이트 시간 포맷팅
  const updateTime = formatDateTime(foundTrack.updateDateTime);

  return {
    timestamp: now,
    found: true,
    rank: data.trackList.indexOf(foundTrack) + 1,
    change,
    direction,
    arrow,
    title: foundTrack.name,
    artist: artistName,
  };
}

function formatDateTime(dateTimeString: string): string {
  try {
    const date = new Date(dateTimeString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateTimeString;
  }
}
