import * as cheerio from "cheerio";
import { getKoreanTime } from "../utils/time";
import { fetchChartHTML } from "../utils/http";
import { ARROW_MAP } from "../types/chart";
import { MelonChartParams, MelonResult } from "./types";

const TOP_URL = "https://www.melon.com/chart/index.htm";
const HOT_URL = "https://www.melon.com/chart/hot100/index.htm";

export async function findMelon({
  type = "TOP",
  limit = 100,
  title,
}: MelonChartParams): Promise<MelonResult> {
  const url = type === "TOP" ? TOP_URL : HOT_URL;

  const html = await fetchChartHTML({ url, userAgentType: "PC", referer: url });
  const $ = cheerio.load(html);

  const now = getKoreanTime();

  let data: MelonResult = {
    timestamp: now,
    type,
    found: false,
    direction: "유지",
    change: 0,
    arrow: ARROW_MAP.유지,
  };

  $("#frm table tr")
    .slice(0, limit)
    .each((i, el) => {
      const titleName = $(el).find(".rank01 a").text().trim();

      if (!title || !titleName.includes(title)) return;

      const rank = Number($(el).find(".rank").first().text().trim());

      const rankWrap = $(el).find(".rank_wrap");
      let change = 0;
      let direction: "상승" | "하락" | "유지" = "유지";

      if (rankWrap.find(".rank_up").length > 0) {
        direction = "상승";
        change = Number(rankWrap.find(".up").text().trim() || 0);
      } else if (rankWrap.find(".rank_down").length > 0) {
        direction = "하락";
        change = Number(rankWrap.find(".down").text().trim() || 0);
      } else {
        direction = "유지";
        change = 0;
      }

      const arrow = ARROW_MAP[direction];

      data = {
        timestamp: now,
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
