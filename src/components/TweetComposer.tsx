"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function TweetComposer() {
  const { data: session } = useSession();
  const [tweetContent, setTweetContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handleTweetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tweetContent.trim()) {
      alert("트윗 내용을 입력해주세요.");
      return;
    }

    setIsPosting(true);

    try {
      const response = await fetch("/api/tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: tweetContent.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "트윗 작성에 실패했습니다.");
      }

      // 성공 메시지
      alert(result.message || "트윗이 성공적으로 작성되었습니다!");
      setTweetContent("");
    } catch (error) {
      console.error("트윗 작성 실패:", error);
      alert(
        error instanceof Error
          ? error.message
          : "트윗 작성에 실패했습니다. 다시 시도해주세요."
      );
    } finally {
      setIsPosting(false);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">새 트윗 작성</h2>
        <p className="text-gray-600">
          {session.user?.name}님, 무엇을 공유하고 싶으신가요?
        </p>
      </div>

      <form onSubmit={handleTweetSubmit} className="space-y-4">
        <div>
          <textarea
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
            placeholder="무슨 일이 일어나고 있나요?"
            className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={280}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {tweetContent.length}/280
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPosting || !tweetContent.trim()}
          className="w-full px-6 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isPosting ? "게시 중..." : "트윗하기"}
        </button>
      </form>
    </div>
  );
}
