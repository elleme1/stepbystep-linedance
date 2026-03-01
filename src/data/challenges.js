// 도전 과제(챌린지) 데이터
const challenges = [
    // ===== 진행 중 =====
    {
        id: 1,
        title: "이번 주 3회 출석하기",
        category: "출석",
        emoji: "🔥",
        description: "이번 주 수업에 3회 이상 참석하세요",
        target: 3,
        current: 2,
        reward: "출석왕 배지",
        rewardEmoji: "👑",
        deadline: "이번 주",
        isCompleted: false
    },
    {
        id: 2,
        title: "Bomba 완벽 마스터",
        category: "곡 마스터",
        emoji: "💃",
        description: "Bomba 스텝시트를 5회 이상 연습하세요",
        target: 5,
        current: 3,
        reward: "라틴 마스터 배지",
        rewardEmoji: "🌟",
        deadline: "3월 15일까지",
        isCompleted: false
    },
    {
        id: 3,
        title: "새로운 곡 2곡 배우기",
        category: "곡 마스터",
        emoji: "🎵",
        description: "이번 달 새로운 곡 2곡을 배워보세요",
        target: 2,
        current: 1,
        reward: "도전자 배지",
        rewardEmoji: "🏅",
        deadline: "3월 말까지",
        isCompleted: false
    },
    {
        id: 4,
        title: "커뮤니티 첫 게시글 작성",
        category: "커뮤니티",
        emoji: "✍️",
        description: "커뮤니티에 첫 번째 게시글을 작성해보세요",
        target: 1,
        current: 0,
        reward: "소통왕 배지",
        rewardEmoji: "💬",
        deadline: "기한 없음",
        isCompleted: false
    },
    {
        id: 5,
        title: "연속 출석 7일 달성",
        category: "출석",
        emoji: "📆",
        description: "7일 연속으로 수업에 참석하세요",
        target: 7,
        current: 5,
        reward: "열정 댄서 배지",
        rewardEmoji: "🔥",
        deadline: "진행 중",
        isCompleted: false
    },

    // ===== 완료됨 =====
    {
        id: 101,
        title: "첫 수업 참석하기",
        category: "출석",
        emoji: "🎉",
        description: "라인댄스 첫 수업에 참석했어요!",
        target: 1,
        current: 1,
        reward: "첫 걸음 배지",
        rewardEmoji: "👣",
        deadline: "",
        isCompleted: true,
        completedDate: "2025-09-01"
    },
    {
        id: 102,
        title: "Cupid Shuffle 마스터",
        category: "곡 마스터",
        emoji: "🎶",
        description: "Cupid Shuffle 안무를 완벽히 익혔어요",
        target: 1,
        current: 1,
        reward: "입문 마스터",
        rewardEmoji: "⭐",
        deadline: "",
        isCompleted: true,
        completedDate: "2025-09-20"
    },
    {
        id: 103,
        title: "10회 출석 달성",
        category: "출석",
        emoji: "🏆",
        description: "누적 10회 수업 참석 달성!",
        target: 10,
        current: 10,
        reward: "꾸준한 댄서",
        rewardEmoji: "💪",
        deadline: "",
        isCompleted: true,
        completedDate: "2025-10-15"
    },
    {
        id: 104,
        title: "3가지 장르 경험하기",
        category: "곡 마스터",
        emoji: "🎭",
        description: "컨트리, 라틴, 팝 장르의 곡을 각각 1곡씩 배웠어요",
        target: 3,
        current: 3,
        reward: "장르 탐험가",
        rewardEmoji: "🗺️",
        deadline: "",
        isCompleted: true,
        completedDate: "2025-11-10"
    }
];

// 주간 목표
const weeklyGoals = {
    attendance: { target: 3, current: 2, label: "출석" },
    practice: { target: 5, current: 3, label: "연습" },
    songs: { target: 1, current: 0, label: "신곡" }
};

export { challenges, weeklyGoals };
export default challenges;
