/**
 * 차트 관련 URL 상수
 */

export const CHART_URLS = {
  // 멜론 차트
  MELON: {
    TOP: "https://www.melon.com/chart/index.htm",
    HOT: "https://www.melon.com/chart/hot100/index.htm",
  },

  // 지니 차트
  GENIE: {
    TOP: "https://www.genie.co.kr/chart/top200?rtm=Y",
  },

  // 벅스 차트
  BUGS: {
    CHART: "https://m.bugs.co.kr/chart",
  },

  // 플로 차트
  FLO: {
    CHART:
      "https://www.music-flo.com/api/display/v1/browser/chart/1/track/list?size=100",
  },

  // YouTube API
  YOUTUBE: {
    BASE: "https://www.googleapis.com/youtube/v3/videos",
  },
} as const;

export const CHART_REFERERS = {
  MELON: "https://www.melon.com/chart/index.htm",
  GENIE: "https://www.genie.co.kr/chart/top200",
  BUGS: "https://m.bugs.co.kr/chart",
  FLO: "https://www.music-flo.com/browse?chartId=1",
} as const;

export const CHART_ORIGINS = {
  BUGS: "https://m.bugs.co.kr",
} as const;
