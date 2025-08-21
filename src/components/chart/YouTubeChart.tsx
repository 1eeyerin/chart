import { getYouTubeViewCount } from "@/lib/company/youtube";
import { Session } from "next-auth";
import Card, { CardHeader, CardContent } from "../ui/Card";

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
      <Card className="mb-6" padding="lg">
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-800">
            YouTube 조회수 현황
          </h2>
        </CardHeader>

        <CardContent>
          <Card className="bg-red-50" padding="md" shadow="sm" border={false}>
            <CardHeader>
              <h3 className="text-lg font-semibold text-red-800">
                YouTube 조회수
              </h3>
            </CardHeader>
            <CardContent>
              {youtubeData.found ? (
                <div className="space-y-2">
                  {youtubeData.title && (
                    <p className="text-sm text-gray-600">
                      제목:{" "}
                      <span className="font-medium">{youtubeData.title}</span>
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
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error("YouTube 데이터 로딩 실패:", error);
    return (
      <Card className="mb-6" padding="lg">
        <CardContent>
          <div className="text-center text-red-600">
            <p>YouTube 조회수 데이터를 불러오는 중 오류가 발생했습니다.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
};

export default YouTubeChart;
