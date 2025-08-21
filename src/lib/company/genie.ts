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

async function searchInPageForGenie(
  page: number,
  title: string,
  limit: number
): Promise<GenieResult | null> {
  const url =
    page === 1 ? CHART_URLS.GENIE.TOP : `${CHART_URLS.GENIE.TOP}&pg=${page}`;

  try {
    const html = await fetchChartHTML({
      url,
      referer: CHART_REFERERS.GENIE,
      userAgentType: USER_AGENT_TYPES.PC,
    });
    const $ = cheerio.load(html);

    let foundData: GenieResult | null = null;

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

        foundData = {
          timestamp: getKoreanTime(),
          found: true,
          rank,
          change,
          direction,
          arrow,
          title: titleName,
        };

        return false;
      });

    return foundData;
  } catch (error) {
    console.error(`페이지 ${page} 로딩 실패:`, error);
    return null;
  }
}

const PAGE_BATCHES = [
  [1, 2],
  [3, 4],
] as const;

/**
 * 지니 차트 (TOP 200) 에서 곡을 검색하는 함수
 *
 * @description
 * 1. 1,2페이지를 병렬로 조회하여 곡 검색 (페이지 당 50곡)
 * 2. 1,2페이지에서 찾지 못한 경우 3,4페이지를 병렬로 조회
 * 3. 찾은 즉시 검색 중단하여 불필요한 요청 방지
 *
 * @param limit - 검색할 최대 곡 수 (기본값: 100)
 * @param title - 검색할 곡 제목
 * @returns Promise<GenieResult> - 검색 결과 (찾지 못한 경우 found: false)
 */
export async function findGenie({
  limit = 100,
  title,
}: GenieChartParams): Promise<GenieResult> {
  const now = getKoreanTime();

  const foundResult = await PAGE_BATCHES.reduce<Promise<GenieResult | null>>(
    async (acc, [page1, page2]) => {
      const previousResult = await acc;
      if (previousResult) return previousResult; // 이미 찾았으면 스킵

      try {
        const [result1, result2] = await Promise.all([
          searchInPageForGenie(page1, title, limit),
          searchInPageForGenie(page2, title, limit),
        ]);
        return [result1, result2].find((result) => result?.found) || null;
      } catch (error) {
        console.error(`페이지 ${page1}, ${page2} 로딩 실패:`, error);
        return null;
      }
    },
    Promise.resolve<GenieResult | null>(null)
  );

  return foundResult || { timestamp: now, found: false };
}
