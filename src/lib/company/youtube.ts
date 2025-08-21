import { API_KEYS, CHART_URLS } from "@/lib/constants";
import { YouTubeViewCountResult } from "./types";

export const getYouTubeViewCount = async (
  videoUrl: string
): Promise<YouTubeViewCountResult> => {
  try {
    const response = await fetch(
      `${CHART_URLS.YOUTUBE.BASE}?id=${videoUrl}&key=${API_KEYS.YOUTUBE}&part=statistics,snippet`
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("[YouTube API non-OK]", response.status, errText);
      console.log({ title: `YouTube API 실패 (${response.status})` });
      throw new Error("YouTube API 요청에 실패했습니다.");
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return {
        found: false,
        viewCount: "0",
        videoId: videoUrl,
      };
    }

    const video = data.items[0];
    const viewCount = video.statistics.viewCount;
    const title = video.snippet.title;

    return {
      found: true,
      viewCount: parseInt(viewCount).toLocaleString("ko-KR"),
      videoId: videoUrl,
      title,
    };
  } catch (error) {
    console.error("YouTube 조회수 가져오기 실패:", error);

    return {
      found: false,
      viewCount: "0",
      videoId: "",
    };
  }
};
