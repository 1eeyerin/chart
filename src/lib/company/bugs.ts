import * as cheerio from "cheerio";
import { getKoreanTime } from "../utils/time";
import { fetchChartHTML } from "../utils/http";
import type { BugsChartParams, BugsResult } from "./types";

const BUGS_URL = "https://m.bugs.co.kr/chart";

export async function findBugs({
  limit = 100,
  title,
}: BugsChartParams): Promise<BugsResult> {
  const url = BUGS_URL;

  const html = await fetchChartHTML({
    url,
    referer: "https://m.bugs.co.kr/chart",
    origin: "https://m.bugs.co.kr",
    userAgentType: "MOBILE",
  });
  const $ = cheerio.load(html);

  // 시간 포맷팅
  const now = getKoreanTime();

  let data: BugsResult = { timestamp: now, found: false };

  $(".trackChartList li")
    .slice(0, limit)
    .each((i, el) => {
      const titleName = $(el).find(".trackTitle").text().trim();

      if (!title || !titleName.includes(title)) {
        return;
      }

      const rank = Number($(el).find(".ranking strong").text().trim());

      const changeEl = $(el).find(".ranking .change");
      const directionClass = changeEl.attr("class") || "";
      const changeNum = changeEl.find("em").text().trim();
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

      data = {
        timestamp: now,
        found: true,
        rank,
        change,
        direction,
        arrow,
        title: titleName,
      };

      return false;
    });

  return data;
}
