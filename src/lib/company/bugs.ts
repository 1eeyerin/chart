import * as cheerio from "cheerio";
import { getKoreanTime } from "../utils/time";
import { fetchChartHTML } from "../utils/http";
import {
  CHART_URLS,
  CHART_REFERERS,
  CHART_ORIGINS,
  USER_AGENT_TYPES,
  CHART_DIRECTIONS,
  ARROW_MAP,
} from "../constants";
import type { BugsChartParams, BugsResult } from "./types";

export async function findBugs({
  limit = 100,
  title,
}: BugsChartParams): Promise<BugsResult> {
  const url = CHART_URLS.BUGS.CHART;

  const html = await fetchChartHTML({
    url,
    referer: CHART_REFERERS.BUGS,
    origin: CHART_ORIGINS.BUGS,
    userAgentType: USER_AGENT_TYPES.MOBILE,
  });
  const $ = cheerio.load(html);

  const now = getKoreanTime();

  let data: BugsResult = { timestamp: now, found: false };

  $(".trackChartList li")
    .slice(0, limit)
    .each((i, el) => {
      const titleName = $(el).find(".trackTitle").text().trim();

      if (!title || !titleName.includes(title)) return;

      const rank = Number($(el).find(".ranking strong").text().trim());

      const changeEl = $(el).find(".ranking .change");
      const directionClass = changeEl.attr("class") || "";
      const changeNum = changeEl.find("em").text().trim();
      const change = changeNum ? Number(changeNum) : 0;

      let direction: "상승" | "하락" | "유지";
      let arrow: string;

      if (directionClass.includes("up")) {
        direction = CHART_DIRECTIONS.UP;
        arrow = ARROW_MAP[CHART_DIRECTIONS.UP];
      } else if (directionClass.includes("down")) {
        direction = CHART_DIRECTIONS.DOWN;
        arrow = ARROW_MAP[CHART_DIRECTIONS.DOWN];
      } else {
        direction = CHART_DIRECTIONS.MAINTAIN;
        arrow = ARROW_MAP[CHART_DIRECTIONS.MAINTAIN];
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
