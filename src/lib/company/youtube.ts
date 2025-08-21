import { YouTubeViewCountResponse } from "@/lib/types/youtube";

export const getYouTubeViewCount = async (
  videoUrl: string
): Promise<YouTubeViewCountResponse> => {
  try {
    // YouTube Data API v3를 사용하여 조회수 가져오기
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoUrl}&key=${process.env.YOUTUBE_API_KEY}&part=statistics,snippet`
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
        timestamp: new Date().toLocaleString("ko-KR"),
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
      timestamp: new Date().toLocaleString("ko-KR"),
    };
  } catch (error) {
    console.error("YouTube 조회수 가져오기 실패:", error);

    return {
      found: false,
      viewCount: "0",
      videoId: "",
      timestamp: new Date().toLocaleString("ko-KR"),
    };
  }
};
