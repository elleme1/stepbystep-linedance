import { theoryData } from '../data/theory';

// theory.js에서 step 카테고리만 추출
const stepItems = theoryData.filter(
    item => item.category === 'step' && item.keywords && item.keywords.length > 0
);

// ──────────────────────────────────────────────
// 단어 경계 매칭 유틸
//   - 한글: 공백/기호로 둘러싸인 경우만 매칭 ("록" → "블록"·"록스타" 오매칭 방지)
//   - 영문: 접두 경계만 사용 — "walk" → "walking"·"walks"는 포용하되 "sidewalk"·"divine"은 차단
// ──────────────────────────────────────────────

// 한글/혼합 키워드의 좌우 경계로 허용하는 구분자
// (공백, & ＆, 괄호, /, 콤마, 마침표, 하이픈, 따옴표 등)
const SEP = '[\\s&＆·・()（）/,，.、\\-!?:：;；\\[\\]「」『』~〜|]';

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// ASCII 전용 키워드인지 (영어·숫자·기본 기호)
const isAscii = (s) => /^[\x00-\x7f]+$/.test(s);

// 키워드 → 정규식 캐시 (같은 키워드를 곡마다 반복 평가하므로)
const patternCache = new Map();
const getPattern = (keyword) => {
    const cached = patternCache.get(keyword);
    if (cached) return cached;
    const kw = keyword.trim();
    const escaped = escapeRegex(kw);
    const re = isAscii(kw)
        ? new RegExp(`\\b${escaped}`, 'i')  // 접두 경계만: walk → walking/walks 매칭, sidewalk 차단
        : new RegExp(`(?:^|${SEP})${escaped}(?=$|${SEP})`, 'i');
    patternCache.set(keyword, re);
    return re;
};

/**
 * 곡의 step.move 텍스트에서 매칭되는 기초 스텝들을 반환
 * @param {string} moveText - 예: "셔플 & 록 스텝 (Shuffle & Rock Step)"
 * @returns {Array} 매칭된 theoryData 항목들 (중복 제거)
 */
export function matchSteps(moveText) {
    if (!moveText) return [];
    const matched = [];
    const matchedIds = new Set();

    for (const step of stepItems) {
        for (const keyword of step.keywords) {
            if (!keyword || !keyword.trim()) continue;
            if (matchedIds.has(step.id)) break;
            if (getPattern(keyword).test(moveText)) {
                matched.push(step);
                matchedIds.add(step.id);
                break; // 같은 스텝의 다른 키워드로 중복 매칭 방지
            }
        }
    }

    return matched;
}

/**
 * 매칭된 스텝에서 영상이 있는 것만 필터
 */
export function matchStepsWithVideo(moveText) {
    return matchSteps(moveText).filter(step => !!step.videoUrl);
}
