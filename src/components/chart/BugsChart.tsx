import { findBugs } from "@/lib/company/bugs";
import { Session } from "next-auth";

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
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          벅스 차트 현황
        </h2>
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-800 mb-3">
            벅스 차트
          </h3>
          {bugsData.found ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">{bugsData.artist}</span>의 순위
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
                  곡명: <span className="font-medium">{bugsData.title}</span>
                </p>
              )}
              <p className="text-xs text-gray-500">
                업데이트: {bugsData.timestamp}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">벅스 차트에서 찾을 수 없습니다.</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("벅스 데이터 로딩 실패:", error);
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="text-center text-red-600">
          <p>벅스 차트 데이터를 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </div>
    );
  }
};

export default BugsChart;
