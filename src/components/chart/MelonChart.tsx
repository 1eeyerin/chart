import { findMelon } from "@/lib/company/melon";
import { Session } from "next-auth";
import Card, { CardHeader, CardContent } from "../ui/Card";

interface MelonServerProps {
  session: Session | null;
}

const MelonChart = async ({ session }: MelonServerProps) => {
  if (!session) {
    return null;
  }

  try {
    const [top, hot] = await Promise.all([
      findMelon({ type: "TOP" }),
      findMelon({ type: "HOT" }),
    ]);

    return (
      <Card className="mb-6" padding="lg">
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-800">멜론 차트 현황</h2>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* TOP 차트 */}
            <Card
              className="bg-blue-50"
              padding="md"
              shadow="sm"
              border={false}
            >
              <CardHeader>
                <h3 className="text-lg font-semibold text-blue-800">
                  TOP 차트
                </h3>
              </CardHeader>
              <CardContent>
                {top.found ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{top.artist}</span>의 순위
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">
                        {top.rank}위
                      </span>
                      {top.direction && (
                        <>
                          <span className="text-lg">{top.arrow}</span>
                          <span className="text-sm text-gray-600">
                            {top.direction} {top.change}단계
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      업데이트: {top.timestamp}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    TOP 차트에서 찾을 수 없습니다.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* HOT 차트 */}
            <Card className="bg-red-50" padding="md" shadow="sm" border={false}>
              <CardHeader>
                <h3 className="text-lg font-semibold text-red-800">HOT 차트</h3>
              </CardHeader>
              <CardContent>
                {hot.found ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{hot.artist}</span>의 순위
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-red-600">
                        {hot.rank}위
                      </span>
                      {hot.direction && (
                        <>
                          <span className="text-lg">{hot.arrow}</span>
                          <span className="text-sm text-gray-600">
                            {hot.direction} {hot.change}단계
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      업데이트: {hot.timestamp}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    HOT 차트에서 찾을 수 없습니다.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error("멜론 데이터 로딩 실패:", error);
    return (
      <Card className="mb-6" padding="lg">
        <CardContent>
          <div className="text-center text-red-600">
            <p>멜론 차트 데이터를 불러오는 중 오류가 발생했습니다.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
};

export default MelonChart;
