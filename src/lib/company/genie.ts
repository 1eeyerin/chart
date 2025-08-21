import * as cheerio from "cheerio";
import { getKoreanTime } from "../utils/time";
import { fetchChartHTML } from "../utils/http";
import { ARROW_MAP } from "../types/chart";
import type { GenieChartParams, GenieResult } from "./types";

const TOP_GENIE_URL = "https://www.genie.co.kr/chart/top200?rtm=Y&pg=1";

export async function findGenie({
  limit = 100,
  artistName,
}: GenieChartParams): Promise<GenieResult> {
  const url = TOP_GENIE_URL;

  const html = await fetchChartHTML({
    url,
    referer: "https://www.genie.co.kr/chart/top200",
    userAgentType: "PC",
  });
  const $ = cheerio.load(html);

  // 시간 포맷팅
  const now = getKoreanTime();

  let data: GenieResult = { timestamp: now, found: false };

  $(".music-list-wrap .list-wrap tbody tr")
    .slice(0, limit)
    .each((i, el) => {
      const artist = $(el).find(".info .artist").text().trim();

      if (artist.includes(artistName)) {
        const rank = Number($(el).find(".number").text().split("\n")[0]);

        const rankSpan = $(el).find("span[class^='rank-']");
        const change = Number(
          rankSpan.clone().children().remove().end().text().trim() || 0
        );

        const direction = rankSpan
          .find(".hide")
          .text()
          .trim()
          .replace("하강", "하락") as "상승" | "하락" | "유지";
        const arrow = ARROW_MAP[direction as keyof typeof ARROW_MAP] || "-";

        const title = $(el).find(".title").text();

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
