"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Card, { CardHeader, CardContent } from "../ui/Card";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

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
    <Card className="w-full max-w-2xl mx-auto" padding="lg">
      <CardHeader>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            새 트윗 작성
          </h2>
          <p className="text-gray-600">
            {session.user?.name}님, 무엇을 공유하고 싶으신가요?
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleTweetSubmit} className="space-y-4">
          <Textarea
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
            placeholder="무슨 일이 일어나고 있나요?"
            rows={10}
            maxLength={280}
            showCharacterCount
            fullWidth
            size="lg"
          />

          <Button
            type="submit"
            disabled={isPosting || !tweetContent.trim()}
            fullWidth
            size="lg"
            variant="primary"
            loading={isPosting}
          >
            {isPosting ? "게시 중..." : "트윗하기"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
