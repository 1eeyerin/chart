"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Dropdown from "../ui/Dropdown";

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

  const handleSignOut = () => {
    setIsDropdownOpen(false);
    signOut({ callbackUrl: "/" });
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

  const trigger = (
    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
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
        <div className="text-left w-[calc(100%-72px)]">
          <p className="text-sm font-medium text-gray-900 leading-tight text-ellipsis overflow-hidden whitespace-nowrap break-all">
            {session.user?.name || "사용자"}
          </p>
        </div>
      )}

      {/* 드롭다운 화살표 */}
      <ChevronDownIcon isOpen={isDropdownOpen} />
    </div>
  );

  return (
    <Dropdown
      trigger={trigger}
      items={defaultMenuItems}
      className={className}
      align="right"
      width="md"
      onOpenChange={setIsDropdownOpen}
    />
  );
}
