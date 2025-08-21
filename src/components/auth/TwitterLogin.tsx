"use client";

import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Card, { CardContent, CardHeader } from "../ui/Card";
import Button from "../ui/Button";

export default function TwitterLogin() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // URL에서 에러 파라미터 확인
    const errorParam = searchParams.get("error");
    if (errorParam === "Callback") {
      setError("로그인이 취소되었습니다.");
    } else if (errorParam) {
      setError("로그인 중 오류가 발생했습니다.");
    }
  }, [searchParams]);

  const handleSignIn = () => {
    setError(null); // 에러 메시지 초기화
    signIn("twitter", { callbackUrl: "/" });
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (session) return null;

  return (
    <Card className="flex flex-col items-center space-y-4" padding="lg">
      <CardHeader>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            트위터로 로그인
          </h2>
          <p className="text-gray-600 mb-4">
            간편하게 트위터 계정으로 로그인하세요
          </p>
        </div>
      </CardHeader>

      <CardContent className="w-full">
        {/* 에러 메시지 표시 */}
        {error && (
          <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        <Button onClick={handleSignIn} variant="secondary" size="lg" fullWidth>
          트위터로 로그인
        </Button>
      </CardContent>
    </Card>
  );
}
