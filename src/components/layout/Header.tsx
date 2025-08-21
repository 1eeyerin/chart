"use client";

import { useSession } from "next-auth/react";
import ProfileDropdown from "../auth/ProfileDropdown";

type HeaderProps = {
  title?: string;
  className?: string;
};

export default function Header({ title = "", className = "" }: HeaderProps) {
  const { status } = useSession();

  // 추가 메뉴 아이템들
  const additionalMenuItems = [
    {
      label: "설정",
      onClick: () => {
        alert("준비중 입니다.");
        // 여기에 설정 페이지로 이동하는 로직 추가
      },
    },
  ];

  return (
    <header
      className={`bg-white shadow-sm border-b border-gray-200 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 왼쪽 제목 */}
          <div className="flex items-center">
            <h1 className="text-lg font-bold text-gray-900">{title}</h1>
          </div>

          {/* 오른쪽 프로필 영역 */}
          <div className="flex items-center">
            {status === "loading" ? (
              <div className="animate-pulse flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="space-y-1">
                  <div className="w-20 h-3 bg-gray-200 rounded"></div>
                  <div className="w-16 h-2 bg-gray-200 rounded"></div>
                </div>
              </div>
            ) : (
              <ProfileDropdown menuItems={additionalMenuItems} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
