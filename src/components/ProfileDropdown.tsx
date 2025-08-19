"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

// 간단한 화살표 아이콘 컴포넌트
const ChevronDownIcon = ({ isOpen = false }: { isOpen?: boolean }) => (
  <svg
    className={`w-4 h-4 text-gray-400 transition-transform ${
      isOpen ? "rotate-180" : ""
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

type ProfileDropdownProps = {
  className?: string;
  showProfileInfo?: boolean;
  menuItems?: Array<{
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    variant?: "default" | "danger";
  }>;
};

export default function ProfileDropdown({
  className = "",
  showProfileInfo = true,
  menuItems = [],
}: ProfileDropdownProps) {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignIn = () => {
    signIn("twitter", { callbackUrl: "/" });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    setIsDropdownOpen(false);
    signOut({ callbackUrl: "/" });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 기본 메뉴 아이템
  const defaultMenuItems = [
    ...menuItems,
    {
      label: "로그아웃",
      onClick: handleSignOut,
      variant: "danger" as const,
    },
  ];

  if (!session) {
    return null;
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {/* 프로필 이미지 */}
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt="Profile"
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
        )}

        {/* 프로필 정보 */}
        {showProfileInfo && (
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900 leading-tight">
              {session.user?.name || "사용자"}
            </p>
          </div>
        )}

        {/* 드롭다운 화살표 */}
        <ChevronDownIcon isOpen={isDropdownOpen} />
      </button>

      {/* 드롭다운 메뉴 */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {defaultMenuItems.map((item, index) => (
              <button
                type="button"
                key={index}
                onClick={item.onClick}
                className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center space-x-2 ${
                  item.variant === "danger"
                    ? "text-red-600 hover:bg-red-50"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
