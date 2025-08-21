import type React from "react";
import { cn } from "@/lib/utils";

type LoadingProps = {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "spinner" | "dots" | "pulse" | "skeleton";
  text?: string;
  className?: string;
  fullScreen?: boolean;
};

type SkeletonProps = {
  className?: string;
  lines?: number;
};

const sizeVariants = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
};

export default function Loading({
  size = "md",
  variant = "spinner",
  text,
  className = "",
  fullScreen = false,
}: LoadingProps) {
  const renderSpinner = () => (
    <svg
      className={cn("animate-spin text-blue-600", sizeVariants[size])}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "bg-blue-600 rounded-full animate-pulse",
            size === "sm" && "w-2 h-2",
            size === "md" && "w-3 h-3",
            size === "lg" && "w-4 h-4",
            size === "xl" && "w-6 h-6"
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div className="flex items-center space-x-3">
      <div
        className={cn(
          "bg-gray-200 rounded-full animate-pulse",
          sizeVariants[size]
        )}
      />
      <div className="space-y-2">
        <div className="w-20 h-3 bg-gray-200 rounded animate-pulse" />
        <div className="w-16 h-2 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case "spinner":
        return renderSpinner();
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  const content = (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-3",
        className
      )}
    >
      {renderContent()}
      {text && <p className="text-sm text-gray-600 text-center">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}

export function Skeleton({ className = "", lines = 1 }: SkeletonProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 rounded animate-pulse"
          style={{
            width: `${Math.random() * 40 + 60}%`,
          }}
        />
      ))}
    </div>
  );
}
