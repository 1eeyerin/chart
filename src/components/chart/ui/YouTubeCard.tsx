import { YouTubeViewCountResult } from "@/lib/company/types";
import Card, { CardHeader, CardContent } from "../../ui/Card";

interface YouTubeCardProps {
  title: string;
  data: YouTubeViewCountResult;
  className?: string;
}

const YouTubeCard = ({ title, data, className = "" }: YouTubeCardProps) => {
  if (!data.found) {
    return (
      <Card
        className={`bg-red-50 ${className}`}
        padding="md"
        shadow="sm"
        border={false}
      >
        <CardHeader>
          <h3 className="text-lg font-semibold text-red-800">{title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">YouTube 조회수를 가져올 수 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`bg-red-50 ${className}`}
      padding="md"
      shadow="sm"
      border={false}
    >
      <CardHeader>
        <h3 className="text-lg font-semibold text-red-800">{title}</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.title && (
            <p className="text-sm text-gray-600">
              제목: <span className="font-medium">{data.title}</span>
            </p>
          )}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-red-600">
              {data.viewCount}회
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default YouTubeCard;
