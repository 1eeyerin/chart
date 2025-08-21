import { fetchChartJSON } from "@/lib/utils/http";
import { processFloChartData } from "@/lib/company/flo";
import { FloChartResponse } from "@/lib/types/flo";
import Card, { CardHeader, CardContent } from "../ui/Card";

const FloChart = async () => {
  try {
    const url =
      "https://www.music-flo.com/api/display/v1/browser/chart/1/track/list?size=100";

    const data = await fetchChartJSON({
      url,
      userAgentType: "PC",
      referer: "https://www.music-flo.com/browse?chartId=1",
    });

    const targetArtist = "아일릿";
    const floData = processFloChartData(
      (data?.data as FloChartResponse) || [],
      targetArtist
    );

    return (
      <Card className="mb-6" padding="lg">
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-800">Flo 차트 현황</h2>
        </CardHeader>

        <CardContent>
          <Card className="bg-blue-50" padding="md" shadow="sm" border={false}>
            <CardHeader>
              <h3 className="text-lg font-semibold text-blue-800">Flo 차트</h3>
            </CardHeader>
            <CardContent>
              {floData.found ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{floData.artist}</span>의 순위
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-blue-600">
                      {floData.rank}위
                    </span>
                    {floData.direction && floData.direction !== "유지" && (
                      <>
                        <span className="text-lg">{floData.arrow}</span>
                        <span className="text-sm text-gray-600">
                          {floData.direction} {floData.change}단계
                        </span>
                      </>
                    )}
                    {floData.isNew && (
                      <span className="text-sm text-green-600 font-medium bg-green-100 px-2 py-1 rounded">
                        NEW
                      </span>
                    )}
                  </div>
                  {floData.title && (
                    <p className="text-sm text-gray-600">
                      곡명: <span className="font-medium">{floData.title}</span>
                    </p>
                  )}
                  {floData.albumTitle && (
                    <p className="text-sm text-gray-600">
                      앨범:{" "}
                      <span className="font-medium">{floData.albumTitle}</span>
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    업데이트: {floData.timestamp}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">Flo 차트에서 찾을 수 없습니다.</p>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error("에러 발생:", error);

    return (
      <Card className="mb-6" padding="lg">
        <CardContent>
          <div className="text-center text-red-600">
            <p>Flo 차트 데이터를 불러오는 중 오류가 발생했습니다.</p>
            <p className="text-sm mt-2">
              {error instanceof Error ? error.message : "알 수 없는 에러"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
};

export default FloChart;
