import * as cheerio from "cheerio";
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

    // 크롤링 실패 감지: 차트 리스트 데이터가 비어있는지 확인
    const chartListContent = $(".music-list-wrap .list-wrap tbody tr")
      .text()
      .trim();
    if (!chartListContent) {
      throw new Error(
        `지니 차트 ${page}페이지 데이터를 불러올 수 없습니다. 크롤링에 실패했습니다.`
      );
    }

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
    throw error; // 에러를 다시 던져서 상위에서 처리할 수 있도록 함
  }
}

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
  try {
    // 1,2페이지 먼저 시도
    const [result1, result2] = await Promise.allSettled([
      searchInPageForGenie(1, title, limit),
      searchInPageForGenie(2, title, limit),
    ]);

    // 1,2페이지에서 에러가 발생한 경우 즉시 에러를 던짐
    if (result1.status === "rejected") {
      throw result1.reason;
    }
    if (result2.status === "rejected") {
      throw result2.reason;
    }

    // 1,2페이지에서 곡을 찾은 경우
    const foundInFirstBatch = [result1.value, result2.value].find(
      (result) => result?.found
    );
    if (foundInFirstBatch) {
      return foundInFirstBatch;
    }

    // 1,2페이지에서 찾지 못한 경우 3,4페이지 시도
    const [result3, result4] = await Promise.allSettled([
      searchInPageForGenie(3, title, limit),
      searchInPageForGenie(4, title, limit),
    ]);

    // 3,4페이지에서 에러가 발생한 경우 즉시 에러를 던짐
    if (result3.status === "rejected") {
      throw result3.reason;
    }
    if (result4.status === "rejected") {
      throw result4.reason;
    }

    // 3,4페이지에서 곡을 찾은 경우
    const foundInSecondBatch = [result3.value, result4.value].find(
      (result) => result?.found
    );
    if (foundInSecondBatch) {
      return foundInSecondBatch;
    }

    // 모든 페이지를 확인했지만 곡을 찾지 못한 경우
    return { found: false };
  } catch (error) {
    throw error; // 에러를 위로 전파
  }
}
