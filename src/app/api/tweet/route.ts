import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function POST(request: NextRequest) {
  try {
    // 세션 확인
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }

    // 트위터 액세스 토큰 확인
    if (!session.twitterAccessToken) {
      return NextResponse.json(
        { error: "트위터 액세스 토큰이 없습니다. 다시 로그인해주세요." },
        { status: 401 }
      );
    }

    const { content } = await request.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "트윗 내용이 필요합니다." },
        { status: 400 }
      );
    }

    if (content.length > 280) {
      return NextResponse.json(
        { error: "트윗은 280자를 초과할 수 없습니다." },
        { status: 400 }
      );
    }

    // OAuth 2.0 User Context로 트위터 API 호출
    const response = await fetch("https://api.twitter.com/2/tweets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.twitterAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: content,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Twitter API Error:", errorData);
      return NextResponse.json(
        {
          error: "트위터 API 호출에 실패했습니다.",
          details: errorData,
        },
        { status: response.status }
      );
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      tweet: result.data,
      message: "트윗이 성공적으로 게시되었습니다.",
    });
  } catch (error) {
    console.error("Tweet API Error:", error);
    return NextResponse.json(
      {
        error: "서버 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
