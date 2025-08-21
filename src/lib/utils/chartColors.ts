import { ChartType } from "@/lib/types/chart";

/**
 * 차트 타입별 순위 색상 반환
 */
export const getRankColor = (type: ChartType): string => {
  switch (type) {
    case "TOP":
      return "text-blue-600";
    case "HOT":
      return "text-red-600";
    case "GENIE":
      return "text-purple-600";
    default:
      return "text-green-600";
  }
};
