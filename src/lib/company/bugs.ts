import * as cheerio from "cheerio";
import { getKoreanTime } from "../utils/time";
import { fetchChartHTML } from "../utils/http";
import { ChartResultWithTitle, ARROW_MAP } from "../types/chart";

const TOPGENIE_URL = "https://m.bugs.co.kr/chart";

export interface GenieResult extends ChartResultWithTitle {
  direction?: "상승" | "하락" | "유지";
  change?: number;
  arrow?: string;
}

export async function findBugs({
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
    referer: "https://m.bugs.co.kr/chart",
    origin: "https://m.bugs.co.kr",
    userAgentType: "MOBILE",
  });
  const $ = cheerio.load(html);

  // 시간 포맷팅
  const now = getKoreanTime();

  let data: GenieResult = { timestamp: now, found: false };

  $(".trackChartList li")
    .slice(0, limit)
    .each((i, el) => {
      const artist = $(el).find(".artistTitle").text().trim();

      // 먼저 아티스트 체크
      if (!artist.includes(artistName)) {
        return; // continue
      }

      const rank = Number($(el).find(".ranking strong").text().trim()); // 순위

      const changeEl = $(el).find(".ranking .change");
      const directionClass = changeEl.attr("class") || ""; // up, down, none
      const changeNum = changeEl.find("em").text().trim(); // 숫자 (없으면 빈 문자열)
      const change = changeNum ? Number(changeNum) : 0;

      let direction: "상승" | "하락" | "유지";
      let arrow: string;

      if (directionClass.includes("up")) {
        direction = "상승";
        arrow = "🔺";
      } else if (directionClass.includes("down")) {
        direction = "하락";
        arrow = "🔻";
      } else {
        direction = "유지";
        arrow = "⏺";
      }

      const title = $(el).find(".trackTitle").text().trim(); // 곡명

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
    });

  return data;
}
