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
  artistName,
}: MelonChartParams): Promise<MelonResult> {
  const url = type === "TOP" ? TOP_URL : HOT_URL;

  // HTTP 요청 - PC User-Agent 사용
  const html = await fetchChartHTML({ url, userAgentType: "PC", referer: url });
  const $ = cheerio.load(html);

  // 시간 포맷팅
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
      const text = $(el).text().replace(/\s+/g, " ").trim();

      if (text.includes(artistName)) {
        const match = text.match(/(\d{1,3})위\s+단계\s+(상승|하락)\s+(\d+)/);
        if (match) {
          data = {
            timestamp: now,
            type,
            found: true,
            rank: parseInt(match[1], 10),
            direction: match[2] as "상승" | "하락",
            change: parseInt(match[3], 10),
            arrow: ARROW_MAP[match[2] as keyof typeof ARROW_MAP],
            artist: artistName,
          };
        } else {
          const rankOnly = text.match(/(\d{1,3})위/);
          data = {
            timestamp: now,
            type,
            found: true,
            rank: rankOnly ? parseInt(rankOnly[1], 10) : undefined,
            direction: "유지",
            change: 0,
            arrow: ARROW_MAP.유지,
            artist: artistName,
          };
        }
        return false;
      }
    });

  return data;
}
