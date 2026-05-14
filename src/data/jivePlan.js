export const jivePlanData = {
  id: "jive-4week-master",
  title: "4주 자이브 마스터 챌린지",
  description: "Moonbay Rumba부터 Future Jive까지! 입문부터 중급 자이브 스텝을 완벽하게 마스터하는 4주 완성 플랜입니다.",
  duration: "4주",
  totalSessions: 12, // 주 3회 * 4주
  weeks: [
    {
      week: 1,
      title: "기본기 다지기 & 바운스 훈련 (스트레칭 주간)",
      objective: "부상 방지와 자이브 특유의 바운스 리듬감 익히기",
      sessions: [
        {
          session: 1,
          title: "자이브 워밍업 & 기본 바운스",
          tasks: [
            { type: "theory", title: "자이브 바운스 & 샤세 기본기 영상 시청", videoId: "Es5cckqeYL8" },
            { type: "practice", title: "음악 없이 기본 바운스 스텝 5분 반복" },
            { type: "stretching", title: "발목 및 골반 집중 스트레칭 10분" }
          ]
        },
        {
          session: 2,
          title: "기본 스텝 (베이직 인 플레이스 & 폴어웨이 락)",
          tasks: [
            { type: "theory", title: "베이직 인 플레이스 (Basic in Place) 복습", videoId: "Es5cckqeYL8" },
            { type: "practice", title: "음악 없이 베이직 스텝 50회 반복" }
          ]
        },
        {
          session: 3,
          title: "1주차 총정리 및 체력 훈련",
          tasks: [
            { type: "practice", title: "바운스 유지하며 제자리 걷기 3분" },
            { type: "practice", title: "폴어웨이 락 (Fallaway Rock) 스텝 연습" }
          ]
        }
      ]
    },
    {
      week: 2,
      title: "느린 템포 적응 (Moonbay Rumba)",
      objective: "BPM 120의 느린 곡에 자이브 기본 스텝 맞춰보기",
      sessions: [
        {
          session: 4,
          title: "Moonbay Rumba 음악 적응",
          tasks: [
            { type: "song", songId: 60, title: "Moonbay Rumba (BPM 120) 2회 감상" },
            { type: "practice", title: "음악에 맞춰 기본 바운스만 타기" }
          ]
        },
        {
          session: 5,
          title: "기본 스텝 매칭",
          tasks: [
            { type: "song", songId: 60, title: "Moonbay Rumba 재생 (0.8배속)" },
            { type: "practice", title: "음악에 맞춰 베이직 인 플레이스 & 폴어웨이 락 적용" }
          ]
        },
        {
          session: 6,
          title: "2주차 원곡 템포 도전",
          tasks: [
            { type: "song", songId: 60, title: "Moonbay Rumba 원곡 템포(1.0배속) 연습" },
            { type: "practice", title: "틀려도 멈추지 않고 끝까지 바운스 유지하기" }
          ]
        }
      ]
    },
    {
      week: 3,
      title: "스텝 연결과 디테일 훈련",
      objective: "여러 스텝을 매끄럽게 연결하고 텐션 조절하기",
      sessions: [
        {
          session: 7,
          title: "링크 & 체인지 오브 플레이스",
          tasks: [
            { type: "theory", title: "체인지 오브 플레이스 영상 복습", videoId: "Es5cckqeYL8" },
            { type: "practice", title: "방향 전환 스텝 음악 없이 연습" }
          ]
        },
        {
          session: 8,
          title: "Moonbay Rumba 실전 적용",
          tasks: [
            { type: "song", songId: 60, title: "Moonbay Rumba 곡에 배운 스텝 모두 넣어서 연습" },
            { type: "practice", title: "스텝 간 연결(Transition) 부드럽게 만들기" }
          ]
        },
        {
          session: 9,
          title: "빠른 템포 예비 훈련",
          tasks: [
            { type: "song", songId: 60, title: "Moonbay Rumba 1.1배속으로 빠르게 연습" },
            { type: "song", songId: 66, title: "Future Jive (BPM 135) 1회 들어보기" }
          ]
        }
      ]
    },
    {
      week: 4,
      title: "Future Jive 마스터 & 최종 점검",
      objective: "BPM 135의 빠른 곡 소화 및 나만의 루틴 완성",
      sessions: [
        {
          session: 10,
          title: "Future Jive 스텝 쪼개기",
          tasks: [
            { type: "song", songId: 66, title: "Future Jive 0.7배속으로 연습 시작" },
            { type: "practice", title: "기본기(바운스, 샤세)가 빠른 템포에서 무너지지 않는지 점검" }
          ]
        },
        {
          session: 11,
          title: "속도 올리기",
          tasks: [
            { type: "song", songId: 66, title: "Future Jive 0.9배속 -> 1.0배속으로 순차적 연습" },
            { type: "practice", title: "체력 안배하며 처음부터 끝까지 루틴 이어가기" }
          ]
        },
        {
          session: 12,
          title: "최종 마스터 & 촬영",
          tasks: [
            { type: "song", songId: 66, title: "Future Jive (BPM 135) 원곡 템포 실전 연습" },
            { type: "practice", title: "스마트폰으로 연습 영상 촬영 후 본인 모습 모니터링" },
            { type: "practice", title: "Moonbay Rumba로 쿨다운" }
          ]
        }
      ]
    }
  ]
};
