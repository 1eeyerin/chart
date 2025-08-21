import { getYouTubeViewCount } from "@/lib/company/youtube";
import { Session } from "next-auth";

interface YouTubeServerProps {
  session: Session | null;
}

const YouTubeChart = async ({ session }: YouTubeServerProps) => {
  if (!session) {
    return null;
  }

  try {
    const videoUrl = "QE4OtGS3ky4";
    const youtubeData = await getYouTubeViewCount(videoUrl);

    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          YouTube 조회수 현황
        </h2>
        <div className="bg-red-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-800 mb-3">
            YouTube 조회수
          </h3>
          {youtubeData.found ? (
            <div className="space-y-2">
              {youtubeData.title && (
                <p className="text-sm text-gray-600">
                  제목: <span className="font-medium">{youtubeData.title}</span>
                </p>
              )}
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-red-600">
                  {youtubeData.viewCount}회
                </span>
              </div>
              <p className="text-xs text-gray-500">
                업데이트: {youtubeData.timestamp}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">
              YouTube 조회수를 가져올 수 없습니다.
            </p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("YouTube 데이터 로딩 실패:", error);
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="text-center text-red-600">
          <p>YouTube 조회수 데이터를 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </div>
    );
  }
};

export default YouTubeChart;
