/**
 * 공통 유틸리티 함수들을 export하는 인덱스 파일
 */

export * from "./cn";
export * from "./envValidation";
export * from "./http";
export * from "./time";
export * from "./chartDataCollector";

/**
 * env에서 \n을 실제 개행 문자로 변환합니다.
 */
export const parseNewlines = (text: string): string => {
  return text.replace(/\\n/g, "\n");
};
