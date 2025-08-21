import type React from "react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type DropdownItem = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: "default" | "danger" | "success" | "warning";
  disabled?: boolean;
  divider?: boolean;
};

type DropdownProps = {
  trigger: React.ReactNode;
  items: DropdownItem[];
  className?: string;
  align?: "left" | "right" | "center";
  width?: "auto" | "sm" | "md" | "lg" | "xl";
  onOpenChange?: (isOpen: boolean) => void;
};

const alignVariants = {
  left: "left-0",
  right: "right-0",
  center: "left-1/2 transform -translate-x-1/2",
};

const widthVariants = {
  auto: "w-auto",
  sm: "w-32",
  md: "w-48",
  lg: "w-64",
  xl: "w-80",
};

export default function Dropdown({
  trigger,
  items,
  className = "",
  align = "right",
  width = "auto",
  onOpenChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onOpenChange]);

  const toggleDropdown = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return;

    item.onClick();
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const getItemClasses = (item: DropdownItem) => {
    const baseClasses =
      "w-full text-left px-4 py-2 text-sm transition-colors flex items-center space-x-2";

    if (item.divider) {
      return "border-t border-gray-200 my-1 py-1";
    }

    if (item.disabled) {
      return cn(baseClasses, "text-gray-400 cursor-not-allowed");
    }

    switch (item.variant) {
      case "danger":
        return cn(baseClasses, "text-red-600 hover:bg-red-50");
      case "success":
        return cn(baseClasses, "text-green-600 hover:bg-green-50");
      case "warning":
        return cn(baseClasses, "text-yellow-600 hover:bg-yellow-50");
      default:
        return cn(baseClasses, "text-gray-700 hover:bg-gray-100");
    }
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute top-full mt-2 z-50 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5",
            alignVariants[align],
            widthVariants[width]
          )}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <div key={index}>
                {item.divider ? (
                  <div className="border-t border-gray-200 my-1" />
                ) : (
                  <button
                    type="button"
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    className={getItemClasses(item)}
                  >
                    {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                    <span>{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
