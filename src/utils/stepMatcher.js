import { theoryData } from '../data/theory';

// theory.js에서 step 카테고리만 추출
const stepItems = theoryData.filter(item => item.category === 'step' && item.keywords && item.keywords.length > 0);

/**
 * 곡의 step.move 텍스트에서 매칭되는 기초 스텝들을 찾아 반환
 * @param {string} moveText - 예: "셔플 & 록 스텝 (Shuffle & Rock Step)"
 * @returns {Array} 매칭된 theoryData 항목들 (중복 제거)
 */
export function matchSteps(moveText) {
    if (!moveText) return [];

    const normalizedMove = moveText.toLowerCase();
    const matched = [];
    const matchedIds = new Set();

    for (const step of stepItems) {
        for (const keyword of step.keywords) {
            if (normalizedMove.includes(keyword.toLowerCase()) && !matchedIds.has(step.id)) {
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
