import type React from "react";
import { cn } from "@/lib/utils";

type InputProps = {
  type?: "text" | "email" | "password" | "number" | "search" | "tel" | "url";
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  required?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

const sizeVariants = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-4 py-3 text-base",
};

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  error = false,
  errorMessage,
  label,
  required = false,
  className = "",
  size = "md",
  fullWidth = false,
  icon,
  iconPosition = "left",
}: InputProps) {
  const inputClasses = cn(
    "border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0",
    sizeVariants[size],
    fullWidth && "w-full",
    error
      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
    disabled && "bg-gray-50 cursor-not-allowed",
    icon && iconPosition === "left" && "pl-10",
    icon && iconPosition === "right" && "pr-10",
    className
  );

  return (
    <div className={cn("space-y-1", fullWidth && "w-full")}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClasses}
        />

        {icon && iconPosition === "right" && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}
      </div>

      {error && errorMessage && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
