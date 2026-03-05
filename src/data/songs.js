// 라인댄스 안무곡 데이터
const songs = [
  {
    id: 10,
    title: "Everyone Needs a Hero",
    artist: "Various",
    choreographer: "Unknown",
    level: 2,
    bpm: 120,
    walls: 2,
    counts: 64,
    genre: "팝",
    youtubeId: "ooJ8nB37RnE",
    tutorialId: "4U53yRYtIUY",
    thumbnail: "https://img.youtube.com/vi/ooJ8nB37RnE/hqdefault.jpg",
    isThisWeek: true,
    steps: [
      { count: "1-16", move: "워크 & 턴 (Walk & Turn)", desc: "앞으로 워크 → 1/4 턴 → 사이드 스텝" },
      { count: "17-32", move: "셔플 & 록 스텝 (Shuffle & Rock Step)", desc: "오른쪽 셔플 → 앞 록 → 리커버" },
      { count: "33-48", move: "바인 & 크로스 (Vine & Cross)", desc: "오른쪽 그레이프바인 → 크로스 스텝" },
      { count: "49-64", move: "스웨이 & 턴 (Sway & Turn)", desc: "힙 스웨이 → 1/2 피봇 턴 → 터치" }
    ]
  },
  {
    id: 1,
    title: "Why",
    artist: "Tiggy",
    choreographer: "Jesus Pacheco",
    level: 2,
    bpm: 138,
    walls: 4,
    counts: 32,
    genre: "유로댄스",
    youtubeId: "cmJiGKTb6v4",
    tutorialId: "1-Pm_HFmz10",
    thumbnail: "https://img.youtube.com/vi/cmJiGKTb6v4/hqdefault.jpg",
    isThisWeek: false,
    steps: [
      { count: "1-8", move: "V 스텝 & 차차 (V Step & Cha Cha)", desc: "오른발 앞 대각선 → 왼발 앞 대각선 → 오른발 뒤 → 왼발 모아 → 차차차" },
      { count: "9-16", move: "셔플 & 록 스텝 (Shuffle & Rock Step)", desc: "오른쪽 셔플 → 앞 록 → 리커버" },
      { count: "17-24", move: "셔플 & 턴 (Shuffle & Turn)", desc: "왼쪽 셔플 → 1/2 피봇 턴" },
      { count: "25-32", move: "사이드 터치 & 크로스 (Side Touch & Cross)", desc: "오른발 사이드 터치 → 왼발 사이드 터치 → 크로스 스텝" }
    ]
  },
  {
    id: 2,
    title: "정말 잘해왔어 (You've Done Really Well)",
    artist: "헬로핑 (Helloping)",
    choreographer: "Heejoong (Judy) Kim",
    level: 2,
    bpm: 108,
    walls: 4,
    counts: 32,
    genre: "발라드",
    youtubeId: "XXr1fM_eWBM",
    tutorialId: "DtG5WTkFqV8",
    thumbnail: "https://img.youtube.com/vi/XXr1fM_eWBM/hqdefault.jpg",
    isThisWeek: false,
    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "바인 & 턴 (Vine & Turn)", desc: "오른쪽 그레이프바인 → 1/4 턴" },
      { count: "17-24", move: "워크 & 록 스텝 (Walk & Rock Step)", desc: "앞으로 워크 2보 → 앞 록 → 리커버" },
      { count: "25-32", move: "코스터 스텝 & 터치 (Coaster Step & Touch)", desc: "뒤 코스터 스텝 → 사이드 터치" }
    ]
  },
  {
    id: 3,
    title: "This Is My Life",
    artist: "Kim Larsen",
    choreographer: "김동숙 & 김지영",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "팝",
    youtubeId: "vdjI6kPFBYY",
    tutorialId: "b3hFioTmZJY",
    thumbnail: "https://img.youtube.com/vi/vdjI6kPFBYY/hqdefault.jpg",
    isThisWeek: false,
    steps: [
      { count: "1-8", move: "사이드 터치 (Side Touch)", desc: "오른발 사이드 터치 → 왼발 사이드 터치 2회" },
      { count: "9-16", move: "그레이프바인 (Grapevine Right)", desc: "오른발 옆 → 왼발 뒤 크로스 → 오른발 옆 → 왼발 터치" },
      { count: "17-24", move: "스텝 & 터치 (Step & Touch)", desc: "앞으로 스텝 → 터치 → 뒤로 스텝 → 터치" },
      { count: "25-32", move: "피봇 턴 & 터치 (Pivot Turn & Touch)", desc: "앞으로 스텝 → 1/4 피봇 턴 → 터치" }
    ]
  },
  {
    id: 4,
    title: "오늘밤에 만나요 (See You Tonight)",
    artist: "장혜리",
    choreographer: "이승희 (Seunghee Lee)",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "가요",
    youtubeId: "5H1cmZ9r1zw",
    thumbnail: "https://img.youtube.com/vi/5H1cmZ9r1zw/hqdefault.jpg",
    isThisWeek: false,
    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "바인 & 터치 (Vine & Touch)", desc: "오른쪽 그레이프바인 → 왼발 터치" },
      { count: "17-24", move: "앞 워크 & 턴 (Forward Walk & Turn)", desc: "앞으로 워크 2보 → 1/4 턴" },
      { count: "25-32", move: "힙 범프 & 스텝 (Hip Bump & Step)", desc: "힙 범프 오른쪽 → 왼쪽 → 뒤로 스텝" }
    ]
  },
  {
    id: 5,
    title: "Dangerous",
    artist: "Various",
    choreographer: "김미애",
    level: 2,
    bpm: 128,
    walls: 4,
    counts: 32,
    genre: "팝",
    youtubeId: "4P58kFsXb9U",
    thumbnail: "https://img.youtube.com/vi/4P58kFsXb9U/hqdefault.jpg",
    isThisWeek: false,
    steps: [
      { count: "1-8", move: "셔플 & 록 스텝 (Shuffle & Rock Step)", desc: "오른쪽 셔플 → 앞 록 → 리커버" },
      { count: "9-16", move: "셔플 & 턴 (Shuffle & Turn)", desc: "왼쪽 셔플 → 1/2 피봇 턴" },
      { count: "17-24", move: "크로스 & 사이드 (Cross & Side)", desc: "오른발 크로스 → 왼발 사이드 → 오른발 뒤" },
      { count: "25-32", move: "재즈 박스 & 턴 (Jazz Box & Turn)", desc: "오른발 크로스 → 왼발 뒤 → 1/4 턴 → 왼발 앞" }
    ]
  },
  {
    id: 6,
    title: "Love Potion 666",
    artist: "DJTEXX",
    choreographer: "Rob Fowler",
    level: 1,
    bpm: 130,
    walls: 2,
    counts: 32,
    genre: "팝",
    youtubeId: "gAxTZlRztRk",
    thumbnail: "https://img.youtube.com/vi/gAxTZlRztRk/hqdefault.jpg",
    isThisWeek: false,
    steps: [
      { count: "1-8", move: "사이드 터치 & 크로스 (Side Touch & Cross)", desc: "오른발 사이드 → 왼발 터치 → 왼발 크로스 → 오른발 사이드" },
      { count: "9-16", move: "바인 & 턴 (Vine & Turn)", desc: "오른쪽 그레이프바인 → 1/4 턴" },
      { count: "17-24", move: "워크 & 터치 (Walk & Touch)", desc: "앞으로 워크 2보 → 터치 → 뒤로 스텝" },
      { count: "25-32", move: "힙 범프 & 클랩 (Hip Bump & Clap)", desc: "힙 범프 오른쪽 → 왼쪽 → 박수 → 터치" }
    ]
  },
  {
    id: 7,
    title: "Havana Cha",
    artist: "Camila Cabello",
    choreographer: "Ria Vos",
    level: 2,
    bpm: 105,
    walls: 4,
    counts: 32,
    genre: "라틴팝",
    youtubeId: "oD1r1UAWObk",
    thumbnail: "https://img.youtube.com/vi/oD1r1UAWObk/hqdefault.jpg",
    isThisWeek: false,
    steps: [
      { count: "1-8", move: "사이드 스텝 & 차차 (Side Step & Cha Cha)", desc: "오른발 사이드 → 왼발 모아 → 차차차" },
      { count: "9-16", move: "록 스텝 & 차차 (Rock Step & Cha Cha)", desc: "앞 록 → 리커버 → 차차차" },
      { count: "17-24", move: "바인 & 턴 (Vine & Turn)", desc: "오른쪽 그레이프바인 → 1/4 턴" },
      { count: "25-32", move: "힙 스웨이 & 크로스 (Hip Sway & Cross)", desc: "힙 스웨이 오른쪽 → 왼쪽 → 크로스 스텝" }
    ]
  },
  {
    id: 8,
    title: "Rose Garden (우연히)",
    artist: "Scooter Lee",
    choreographer: "Jo Thompson Szymanski",
    level: 2,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "컨트리",
    youtubeId: "l6vjpsH1emg",
    thumbnail: "https://img.youtube.com/vi/l6vjpsH1emg/hqdefault.jpg",
    isThisWeek: false,
    steps: [
      { count: "1-8", move: "바인 & 터치 (Vine & Touch)", desc: "오른쪽 그레이프바인 → 왼발 터치" },
      { count: "9-16", move: "바인 & 턴 (Vine & Turn)", desc: "왼쪽 그레이프바인 → 1/4 턴" },
      { count: "17-24", move: "스텝 & 피봇 (Step & Pivot)", desc: "앞으로 스텝 → 1/2 피봇 턴 2회" },
      { count: "25-32", move: "셔플 & 록 스텝 (Shuffle & Rock Step)", desc: "오른쪽 셔플 → 앞 록 → 리커버" }
    ]
  },
  {
    id: 9,
    title: "Just a Kiss",
    artist: "Steve Holy",
    choreographer: "Robbie McGowan Hickie",
    level: 3,
    bpm: 108,
    walls: 4,
    counts: 64,
    genre: "컨트리",
    youtubeId: "Vz-KfQUKzdw",
    thumbnail: "https://img.youtube.com/vi/Vz-KfQUKzdw/hqdefault.jpg",
    isThisWeek: false,
    steps: [
      { count: "1-16", move: "워크 & 피봇 턴 (Walk & Pivot Turn)", desc: "앞으로 워크 → 1/2 피봇 턴 → 셔플 앞" },
      { count: "17-32", move: "사이드 & 크로스 (Side & Cross)", desc: "사이드 록 → 크로스 셔플 → 사이드 터치" },
      { count: "33-48", move: "위빙 & 턴 (Weave & Turn)", desc: "오른쪽 위빙 → 1/4 턴 → 왼쪽 위빙" },
      { count: "49-64", move: "스웨이 & 크로스 (Sway & Cross)", desc: "스웨이 오른쪽 → 왼쪽 → 크로스 록 → 리커버" }
    ]
  }
];

export default songs;
