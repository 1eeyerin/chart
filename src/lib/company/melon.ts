import * as cheerio from "cheerio";
import { fetchChartHTML } from "../utils/http";
import {
  CHART_URLS,
  USER_AGENT_TYPES,
  CHART_DIRECTIONS,
  ARROW_MAP,
  CHART_TYPES,
} from "../constants";
import { MelonChartParams, MelonResult } from "./types";

export async function findMelon({
  type = CHART_TYPES.TOP,
  limit = 100,
  title,
}: MelonChartParams): Promise<MelonResult> {
  const url =
    type === CHART_TYPES.TOP ? CHART_URLS.MELON.TOP : CHART_URLS.MELON.HOT;

  const html = await fetchChartHTML({
    url,
    userAgentType: USER_AGENT_TYPES.PC,
    referer: url,
  });
  const $ = cheerio.load(html);

  let data: MelonResult = {
    type,
    found: false,
    direction: CHART_DIRECTIONS.MAINTAIN,
    change: 0,
    arrow: ARROW_MAP[CHART_DIRECTIONS.MAINTAIN],
  };

  $("#frm table tr")
    .slice(0, limit)
    .each((i, el) => {
      const titleName = $(el).find(".rank01 a").text().trim();

      if (!title || !titleName.includes(title)) return;

      const rank = Number($(el).find(".rank").first().text().trim());

      const rankWrap = $(el).find(".rank_wrap");
      let change = 0;
      let direction: "상승" | "하락" | "유지" = CHART_DIRECTIONS.MAINTAIN;

      if (rankWrap.find(".rank_up").length > 0) {
        direction = CHART_DIRECTIONS.UP;
        change = Number(rankWrap.find(".up").text().trim() || 0);
      } else if (rankWrap.find(".rank_down").length > 0) {
        direction = CHART_DIRECTIONS.DOWN;
        change = Number(rankWrap.find(".down").text().trim() || 0);
      } else {
        direction = CHART_DIRECTIONS.MAINTAIN;
        change = 0;
      }

      const arrow = ARROW_MAP[direction];

      data = {
        type,
        found: true,
        rank,
        direction,
        change,
        arrow,
      };

      return false;
    });

  return data;
}
