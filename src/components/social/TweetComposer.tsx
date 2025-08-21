"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, KeyboardEvent } from "react";
import Card, { CardHeader, CardContent } from "../ui/Card";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import {
  generateTweetTemplate,
  type TweetTemplateData,
} from "../../lib/utils/chartDataCollector";

interface TweetComposerProps {
  chartData: TweetTemplateData | null;
}

export default function TweetComposer({ chartData }: TweetComposerProps) {
  const { data: session } = useSession();
  const [tweetContent, setTweetContent] = useState("");

  useEffect(() => {
    if (chartData) {
      const template = generateTweetTemplate(chartData);
      setTweetContent(template);
    }
  }, [chartData]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // 한글 IME 입력 중일 때는 이벤트 처리하지 않음
    if (e.nativeEvent.isComposing) {
      return;
    }
  };

  const handleTweetSubmitDirectly = async () => {
    if (!tweetContent.trim()) {
      alert("트윗 내용을 입력해주세요.");
      return;
    }

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

      // 트윗 성공 후 새로운 템플릿 생성 (chartData가 있으면)
      if (chartData) {
        setTimeout(() => {
          const template = generateTweetTemplate(chartData);
          setTweetContent(template);
        }, 1000);
      }
    } catch (error) {
      console.error("트윗 작성 실패:", error);
      alert(
        error instanceof Error
          ? error.message
          : "트윗 작성에 실패했습니다. 다시 시도해주세요."
      );
    }
  };

  const handleTweetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleTweetSubmitDirectly();
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
            onKeyDown={handleKeyDown}
            placeholder={
              chartData
                ? "차트 데이터를 불러오는 중..."
                : "차트 데이터를 불러올 수 없습니다."
            }
            rows={12}
            maxLength={280}
            showCharacterCount
            fullWidth
            size="lg"
          />

          <Button
            type="submit"
            disabled={!tweetContent.trim()}
            fullWidth
            size="lg"
            variant="primary"
          >
            트윗하기
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
