// 회원 프로필 데이터
const profile = {
    name: "홍길동",
    nickname: "댄싱퀸",
    level: "초급",
    levelNum: 2,
    joinDate: "2025-09-01",
    profileEmoji: "💃",
    stats: {
        totalClasses: 42,
        totalSongs: 8,
        streakDays: 12,
        attendanceRate: 87
    },
    learnedSongs: [1, 2, 3, 5, 6, 7],
    badges: [
        { id: 1, name: "첫 수업 완료", emoji: "🎉", earnedDate: "2025-09-01" },
        { id: 2, name: "10회 출석", emoji: "🔥", earnedDate: "2025-10-15" },
        { id: 3, name: "5곡 마스터", emoji: "⭐", earnedDate: "2025-11-20" },
        { id: 4, name: "한 달 개근", emoji: "💎", earnedDate: "2025-12-01" },
        { id: 5, name: "30회 출석", emoji: "🏆", earnedDate: "2026-01-15" }
    ],
    settings: {
        darkMode: true,
        notifications: true
    }
};

export default profile;
