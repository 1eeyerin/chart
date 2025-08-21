import * as cheerio from "cheerio";
import { getKoreanTime } from "../utils/time";
import { fetchChartHTML } from "../utils/http";
import {
  CHART_URLS,
  CHART_REFERERS,
  USER_AGENT_TYPES,
  ARROW_MAP,
} from "../constants";
import type { GenieChartParams, GenieResult } from "./types";

export async function findGenie({
  limit = 100,
  title,
}: GenieChartParams): Promise<GenieResult> {
  const url = CHART_URLS.GENIE.TOP;

  const html = await fetchChartHTML({
    url,
    referer: CHART_REFERERS.GENIE,
    userAgentType: USER_AGENT_TYPES.PC,
  });
  const $ = cheerio.load(html);

  // 시간 포맷팅
  const now = getKoreanTime();

  let data: GenieResult = { timestamp: now, found: false };

  $(".music-list-wrap .list-wrap tbody tr")
    .slice(0, limit)
    .each((i, el) => {
      const titleName = $(el).find(".title").text();

      if (!title || !titleName.includes(title)) return;

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
