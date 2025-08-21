import { findBugs } from "@/lib/company/bugs";
import { Session } from "next-auth";
import Card, { CardHeader, CardContent } from "../ui/Card";

interface BugsServerProps {
  session: Session | null;
}

const BugsChart = async ({ session }: BugsServerProps) => {
  if (!session) {
    return null;
  }

  try {
    const bugsData = await findBugs({ artistName: "아일릿" });

    return (
      <Card className="mb-6" padding="lg">
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-800">벅스 차트 현황</h2>
        </CardHeader>

        <CardContent>
          <Card className="bg-green-50" padding="md" shadow="sm" border={false}>
            <CardHeader>
              <h3 className="text-lg font-semibold text-green-800">
                벅스 차트
              </h3>
            </CardHeader>
            <CardContent>
              {bugsData.found ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{bugsData.artist}</span>의
                    순위
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">
                      {bugsData.rank}위
                    </span>
                    {bugsData.direction && bugsData.direction !== "유지" && (
                      <>
                        <span className="text-lg">{bugsData.arrow}</span>
                        <span className="text-sm text-gray-600">
                          {bugsData.direction} {bugsData.change}단계
                        </span>
                      </>
                    )}
                  </div>
                  {bugsData.title && (
                    <p className="text-sm text-gray-600">
                      곡명:{" "}
                      <span className="font-medium">{bugsData.title}</span>
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    업데이트: {bugsData.timestamp}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">벅스 차트에서 찾을 수 없습니다.</p>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error("벅스 데이터 로딩 실패:", error);
    return (
      <Card className="mb-6" padding="lg">
        <CardContent>
          <div className="text-center text-red-600">
            <p>벅스 차트 데이터를 불러오는 중 오류가 발생했습니다.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
};

export default BugsChart;
