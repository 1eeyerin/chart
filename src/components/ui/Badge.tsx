import type React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "outline";

type BadgeSize = "sm" | "md" | "lg";

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  rounded?: "full" | "lg" | "md" | "sm";
};

const badgeVariants = {
  default: "bg-gray-100 text-gray-800 border-gray-200",
  primary: "bg-blue-100 text-blue-800 border-blue-200",
  secondary: "bg-purple-100 text-purple-800 border-purple-200",
  success: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  error: "bg-red-100 text-red-800 border-red-200",
  outline: "bg-transparent border-gray-300 text-gray-700",
};

const badgeSizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-sm",
};

const roundedVariants = {
  full: "rounded-full",
  lg: "rounded-lg",
  md: "rounded-md",
  sm: "rounded-sm",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
  icon,
  iconPosition = "left",
  rounded = "full",
}: BadgeProps) {
  const classes = cn(
    "inline-flex items-center font-medium border",
    badgeVariants[variant],
    badgeSizes[size],
    roundedVariants[rounded],
    className
  );

  return (
    <span className={classes}>
      {icon && iconPosition === "left" && (
        <span className="mr-1.5 w-3 h-3">{icon}</span>
      )}

      {children}

      {icon && iconPosition === "right" && (
        <span className="ml-1.5 w-3 h-3">{icon}</span>
      )}
    </span>
  );
}

// 순위 표시를 위한 특별한 Badge
export function RankBadge({
  rank,
  className = "",
  showTrend = false,
  trend = "up" as const,
  change = 0,
}: {
  rank: number;
  className?: string;
  showTrend?: boolean;
  trend?: "up" | "down" | "stable";
  change?: number;
}) {
  const getRankColor = (rank: number) => {
    if (rank <= 3) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (rank <= 10) return "bg-orange-100 text-orange-800 border-orange-200";
    if (rank <= 50) return "bg-blue-100 text-blue-800 border-blue-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return "↗";
      case "down":
        return "↘";
      case "stable":
        return "→";
      default:
        return "";
    }
  };

  const getTrendColor = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      case "stable":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Badge variant="outline" className={cn("font-bold", getRankColor(rank))}>
        {rank}위
      </Badge>

      {showTrend && change > 0 && (
        <div className={cn("flex items-center text-sm", getTrendColor(trend))}>
          <span className="mr-1">{getTrendIcon(trend)}</span>
          <span>{change}단계</span>
        </div>
      )}
    </div>
  );
}
