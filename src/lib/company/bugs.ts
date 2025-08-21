import * as cheerio from "cheerio";
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

  // HTML에 에러 메시지가 포함되어 있는지 확인
  if (
    html.includes("오류") ||
    html.includes("에러") ||
    html.includes("Error") ||
    html.includes("error")
  ) {
    throw new Error("벅스 차트에서 에러가 발생했습니다.");
  }

  const $ = cheerio.load(html);

  // 크롤링 실패 감지: 차트 리스트 데이터가 비어있는지 확인
  const chartListContent = $(".trackChartList li").text().trim();
  if (!chartListContent) {
    throw new Error(
      "벅스 차트 데이터를 불러올 수 없습니다. 크롤링에 실패했습니다."
    );
  }

  let data: BugsResult = { found: false };

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
