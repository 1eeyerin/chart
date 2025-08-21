import Card, { CardHeader, CardContent } from "../../ui/Card";
import { ChartResultWithChange, ChartResultWithTitle } from "@/lib/types/chart";
import { getRankColor } from "@/lib/utils/chartColors";

interface ChartCardProps {
  title: string;
  data: ChartResultWithChange | ChartResultWithTitle;
  bgColor: string;
  textColor: string;
  className?: string;
}

const ChartCard = ({
  title,
  data,
  bgColor,
  textColor,
  className = "",
}: ChartCardProps) => {
  if (!data.found) {
    return (
      <Card
        className={`${bgColor} ${className}`}
        padding="md"
        shadow="sm"
        border={false}
      >
        <CardHeader>
          <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{title}에서 찾을 수 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`${bgColor} ${className}`}
      padding="md"
      shadow="sm"
      border={false}
    >
      <CardHeader>
        <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">{data.artist}</span>의 순위
          </p>
          <div className="flex items-center space-x-2">
            <span className={`text-2xl font-bold ${getRankColor("GENIE")}`}>
              {data.rank}위
            </span>
            {"direction" in data &&
              data.direction &&
              data.direction !== "유지" && (
                <>
                  <span className="text-lg">{data.arrow}</span>
                  <span className="text-sm text-gray-600">
                    {data.direction} {data.change}단계
                  </span>
                </>
              )}
          </div>
          {"title" in data && data.title && (
            <p className="text-sm text-gray-600">
              곡명: <span className="font-medium">{data.title}</span>
            </p>
          )}
          <p className="text-xs text-gray-500">업데이트: {data.timestamp}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
