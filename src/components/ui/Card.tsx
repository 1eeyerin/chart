import type React from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
  border?: boolean;
  hover?: boolean;
};

type CardHeaderProps = {
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
};

type CardContentProps = {
  children: React.ReactNode;
  className?: string;
};

type CardFooterProps = {
  children: React.ReactNode;
  className?: string;
};

const paddingVariants = {
  none: "",
  sm: "p-3",
  md: "p-6",
  lg: "p-8",
};

const shadowVariants = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

export default function Card({
  children,
  className = "",
  padding = "md",
  shadow = "md",
  border = true,
  hover = false,
}: CardProps) {
  const classes = cn(
    "bg-white rounded-lg",
    paddingVariants[padding],
    shadowVariants[shadow],
    border && "border border-gray-200",
    hover && "hover:shadow-lg transition-shadow duration-200",
    className
  );

  return <div className={classes}>{children}</div>;
}

export function CardHeader({
  children,
  className = "",
  actions,
}: CardHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <div className="flex-1">{children}</div>
      {actions && <div className="flex-shrink-0">{actions}</div>}
    </div>
  );
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={cn("", className)}>{children}</div>;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between pt-4 mt-4 border-t border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
}
