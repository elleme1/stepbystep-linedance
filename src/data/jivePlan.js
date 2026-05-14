export const jivePlanData = {
  id: "jive-4week-master",
  title: "4주 자이브 마스터 챌린지 (실전 병행 플랜)",
  description: "라인댄스 9개월의 탄탄한 스텝을 바탕으로, 자이브 2개월차의 '바운스'와 '속도'를 완성합니다! 목/금 오프라인 수업과 완벽한 시너지를 내는 맞춤형 주 3회 플랜입니다.",
  duration: "4주",
  totalSessions: 12, // 주 3회 앱 연습 (화, 주말, 월/수 짜투리)
  weeks: [
    {
      week: 1,
      title: "기본기 리셋 & 바운스 적응",
      objective: "라인댄스의 플랫한 스텝과 다른 자이브 특유의 '바운스' 텐션 찾기",
      sessions: [
        {
          session: 1,
          title: "화요일: 목/금 수업 대비 웜업",
          tasks: [
            { type: "theory", title: "자이브 바운스 & 샤세 기본기 영상 시청", videoId: "Es5cckqeYL8" },
            { type: "practice", title: "거울 보며 라인댄스와 자이브 샤세의 중심 이동 차이 체크 (5분)" },
            { type: "stretching", title: "발목 및 종아리 집중 스트레칭 (자이브는 발목 스냅이 핵심!)" }
          ]
        },
        {
          session: 2,
          title: "주말: 목/금 오프라인 수업 복습",
          tasks: [
            { type: "practice", title: "목요일 단체반 & 금요일 개인레슨에서 지적받은 자세 복기" },
            { type: "practice", title: "음악 없이 베이직 인 플레이스 & 폴어웨이 락 50회 반복" }
          ]
        },
        {
          session: 3,
          title: "월/수: 라인댄스 후 리마인드",
          tasks: [
            { type: "practice", title: "라인댄스 수업 직후, 자이브 바운스만 타보며 감각 비교하기 3분" },
            { type: "practice", title: "이번 주 레슨에서 배운 스텝 중 가장 안 되는 1개 스텝만 집중 반복" }
          ]
        }
      ]
    },
    {
      week: 2,
      title: "느린 템포 적응 (Moonbay Rumba)",
      objective: "배운 스텝을 BPM 120의 느린 곡에 얹어보며 박자감 익히기",
      sessions: [
        {
          session: 4,
          title: "화요일: 곡에 스텝 얹어보기",
          tasks: [
            { type: "song", songId: 60, title: "Moonbay Rumba (BPM 120) 2회 감상하며 바운스만 타기" },
            { type: "practice", title: "개인레슨(금) 진도 스텝을 이 곡의 박자에 맞춰 천천히 밟아보기" }
          ]
        },
        {
          session: 5,
          title: "주말: 템포 훈련 & 수업 내용 적용",
          tasks: [
            { type: "song", songId: 60, title: "Moonbay Rumba 원곡 템포(1.0배속) 재생" },
            { type: "practice", title: "목/금 수업에서 배운 콤비네이션을 이 곡에 맞춰서 연습" }
          ]
        },
        {
          session: 6,
          title: "월/수: 스텝 매끄럽게 다듬기",
          tasks: [
            { type: "practice", title: "라인댄스의 부드러운 연결감을 살려 스텝 간 트랜지션 연습" },
            { type: "practice", title: "틀려도 멈추지 않고 끝까지 바운스 유지하는 멘탈 훈련" }
          ]
        }
      ]
    },
    {
      week: 3,
      title: "디테일 교정 & 빠른 템포 예비",
      objective: "스텝의 완성도를 높이고 BPM 135 적응 준비하기",
      sessions: [
        {
          session: 7,
          title: "화요일: 방향 전환 & 텐션 훈련",
          tasks: [
            { type: "theory", title: "체인지 오브 플레이스 영상 복습 (방향 전환 팁)", videoId: "Es5cckqeYL8" },
            { type: "practice", title: "개인레슨 때 배운 텐션/리드 팔 동작 거울 보며 연습" }
          ]
        },
        {
          session: 8,
          title: "주말: 빠른 곡 예비 훈련",
          tasks: [
            { type: "song", songId: 60, title: "Moonbay Rumba 1.1배속으로 빠르게 연습" },
            { type: "song", songId: 66, title: "Future Jive (BPM 135) 처음으로 들어보기" }
          ]
        },
        {
          session: 9,
          title: "월/수: 수업 피드백 반영 집중 연습",
          tasks: [
            { type: "practice", title: "라인댄스 9개월의 여유를 자이브 표정 연기에 담아보기" },
            { type: "practice", title: "가장 최근 개인레슨(금)에서 강사님이 강조한 1가지 집중 교정" }
          ]
        }
      ]
    },
    {
      week: 4,
      title: "Future Jive 실전 & 나만의 루틴",
      objective: "BPM 135의 빠른 곡 소화 및 2개월차 레벨업 달성!",
      sessions: [
        {
          session: 10,
          title: "화요일: 빠른 템포 쪼개기",
          tasks: [
            { type: "song", songId: 66, title: "Future Jive 0.8배속으로 연습 시작" },
            { type: "practice", title: "템포가 빨라져도 샤세 스텝이 뭉개지지 않도록(라인댄스와 구분) 점검" }
          ]
        },
        {
          session: 11,
          title: "주말: 최종 템포 도전 & 촬영",
          tasks: [
            { type: "song", songId: 66, title: "Future Jive 원곡 템포(1.0배속) 실전 연습" },
            { type: "practice", title: "스마트폰으로 본인 영상 촬영 후, 목/금 강사님께 피드백 요청하기" }
          ]
        },
        {
          session: 12,
          title: "월/수: 쿨다운 & 다음 목표 설정",
          tasks: [
            { type: "song", songId: 60, title: "Moonbay Rumba로 느리게 쿨다운" },
            { type: "practice", title: "2개월차 자이브의 약점 노트를 작성하고, 금요일 개인레슨 목표로 삼기" }
          ]
        }
      ]
    }
  ]
};
