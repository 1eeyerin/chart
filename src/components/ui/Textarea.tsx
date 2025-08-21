import type React from "react";
import { cn } from "@/lib/utils";

type TextareaProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  required?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  rows?: number;
  maxLength?: number;
  showCharacterCount?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
};

const sizeVariants = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-sm",
  lg: "px-4 py-4 text-base",
};

const resizeVariants = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize",
};

export default function Textarea({
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
  rows = 4,
  maxLength,
  showCharacterCount = false,
  resize = "vertical",
}: TextareaProps) {
  const textareaClasses = cn(
    "border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0",
    sizeVariants[size],
    resizeVariants[resize],
    fullWidth && "w-full",
    error
      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
    disabled && "bg-gray-50 cursor-not-allowed",
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

      <textarea
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className={textareaClasses}
      />

      <div className="flex justify-between items-center">
        {error && errorMessage && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}

        {showCharacterCount && maxLength && (
          <span
            className={cn(
              "text-sm text-gray-500 ml-auto",
              value && value.length > maxLength * 0.9 && "text-orange-500",
              value && value.length >= maxLength && "text-red-500"
            )}
          >
            {value?.length || 0}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
