import { findGenie } from "@/lib/company/genie";
import { Session } from "next-auth";
import Card, { CardHeader, CardContent } from "../ui/Card";

interface GenieServerProps {
  session: Session | null;
}

const GenieChart = async ({ session }: GenieServerProps) => {
  if (!session) {
    return null;
  }

  try {
    const genieData = await findGenie({ artistName: "임영웅" });

    return (
      <Card className="mb-6" padding="lg">
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-800">지니 차트 현황</h2>
        </CardHeader>

        <CardContent>
          <Card
            className="bg-purple-50"
            padding="md"
            shadow="sm"
            border={false}
          >
            <CardHeader>
              <h3 className="text-lg font-semibold text-purple-800">
                지니 차트
              </h3>
            </CardHeader>
            <CardContent>
              {genieData.found ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{genieData.artist}</span>의
                    순위
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-purple-600">
                      {genieData.rank}위
                    </span>
                    {genieData.direction && genieData.direction !== "유지" && (
                      <>
                        <span className="text-lg">{genieData.arrow}</span>
                        <span className="text-sm text-gray-600">
                          {genieData.direction} {genieData.change}단계
                        </span>
                      </>
                    )}
                  </div>
                  {genieData.title && (
                    <p className="text-sm text-gray-600">
                      곡명:{" "}
                      <span className="font-medium">{genieData.title}</span>
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    업데이트: {genieData.timestamp}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">지니 차트에서 찾을 수 없습니다.</p>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error("지니 데이터 로딩 실패:", error);
    return (
      <Card className="mb-6" padding="lg">
        <CardContent>
          <div className="text-center text-red-600">
            <p>지니 차트 데이터를 불러오는 중 오류가 발생했습니다.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
};

export default GenieChart;
