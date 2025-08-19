import * as cheerio from "cheerio";
import { getKoreanTime } from "../utils/time";
import { fetchChartHTML } from "../utils/http";
import { ChartResultWithTitle, ARROW_MAP } from "../types/chart";

const TOPGENIE_URL = "https://mw.genie.co.kr/chart";

export interface GenieResult extends ChartResultWithTitle {
  direction?: "상승" | "하락" | "유지";
  change?: number;
  arrow?: string;
}

export async function findGenie({
  limit = 100,
  artistName = "NCT WISH",
}: {
  limit?: number;
  artistName?: string;
} = {}): Promise<GenieResult> {
  const url = TOPGENIE_URL;

  // HTTP 요청
  const html = await fetchChartHTML({
    url,
    referer: "https://mw.genie.co.kr",
    origin: "https://mw.genie.co.kr",
    userAgentType: "MOBILE",
  });
  const $ = cheerio.load(html);

  // 시간 포맷팅
  const now = getKoreanTime();

  let data: GenieResult = { timestamp: now, found: false };

  $(".list-music li")
    .slice(0, limit)
    .each((i, el) => {
      const text = $(el).text().replace(/\s+/g, " ").trim();

      if (text.includes(artistName)) {
        // 공백 단위로 분리
        const parts = text.split(/\s+/);

        // parts 예시: ["2","3","상승","사랑은","늘","도망가","임영웅","재생"]
        const rank = Number(parts[0]); // 2
        const change = Number(parts[1]); // 3
        const direction = parts[2] as "상승" | "하락" | "유지"; // 상승 | 하락 | 유지
        const arrow = ARROW_MAP[direction as keyof typeof ARROW_MAP] || "⏺";

        // 마지막에서 두 번째는 가수, 그 앞까지는 곡명
        const artist = parts[parts.length - 2]; // 임영웅
        const title = parts.slice(3, parts.length - 2).join(" "); // "사랑은 늘 도망가"

        data = {
          timestamp: now,
          found: true,
          rank,
          change,
          direction,
          arrow,
          title,
          artist,
        };

        return false;
      }
    });

  return data;
}
