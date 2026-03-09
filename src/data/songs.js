// 라인댄스 안무곡 데이터
const rawSongs = [
  {
    id: 10,
    title: "Everyone Needs a Hero",
    artist: "Adam Lambert",
    choreographer: "Roy Verdonk, Grace David & Jef Camps",
    level: 3,
    bpm: 120,
    walls: 2,
    counts: 64,
    genre: "팝",
    youtubeId: "ooJ8nB37RnE",
    tutorialId: "4U53yRYtIUY",
    thumbnail: "https://img.youtube.com/vi/ooJ8nB37RnE/hqdefault.jpg",

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
    tutorialId: "bTedOVhtdSA",
    thumbnail: "https://img.youtube.com/vi/5H1cmZ9r1zw/hqdefault.jpg",

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
    tutorialId: "ZwkcYVuyBlw",
    thumbnail: "https://img.youtube.com/vi/4P58kFsXb9U/hqdefault.jpg",

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
    tutorialId: "sGWrAVYZYE0",
    thumbnail: "https://img.youtube.com/vi/gAxTZlRztRk/hqdefault.jpg",

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
    tutorialId: "wixCZ2dY7gc",
    thumbnail: "https://img.youtube.com/vi/oD1r1UAWObk/hqdefault.jpg",

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
    tutorialId: "6zz5NOfWsJA",
    thumbnail: "https://img.youtube.com/vi/l6vjpsH1emg/hqdefault.jpg",

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
    tutorialId: "GRMkkKLjjXk",
    thumbnail: "https://img.youtube.com/vi/Vz-KfQUKzdw/hqdefault.jpg",

    steps: [
      { count: "1-16", move: "워크 & 피봇 턴 (Walk & Pivot Turn)", desc: "앞으로 워크 → 1/2 피봇 턴 → 셔플 앞" },
      { count: "17-32", move: "사이드 & 크로스 (Side & Cross)", desc: "사이드 록 → 크로스 셔플 → 사이드 터치" },
      { count: "33-48", move: "위빙 & 턴 (Weave & Turn)", desc: "오른쪽 위빙 → 1/4 턴 → 왼쪽 위빙" },
      { count: "49-64", move: "스웨이 & 크로스 (Sway & Cross)", desc: "스웨이 오른쪽 → 왼쪽 → 크로스 록 → 리커버" }
    ]
  },
  {
    id: 11,
    title: "Samba Do Brasil",
    artist: "Bellini",
    choreographer: "Ling Suli & Emilia Lie",
    level: 2,
    bpm: 130,
    walls: 4,
    counts: 32,
    genre: "라틴",
    youtubeId: "Hn7_zmxPCOU",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/Hn7_zmxPCOU/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "셔플 & 턴 (Shuffle & Turn)", desc: "오른쪽 셔플 → 1/4 턴 → 왼쪽 셔플" },
      { count: "9-16", move: "삼바 스텝 & 힙 범프 (Samba Step & Hip Bump)", desc: "삼바 리듬 스텝 → 힙 범프 좌우" },
      { count: "17-24", move: "바인 & 크로스 (Vine & Cross)", desc: "오른쪽 그레이프바인 → 크로스 터치" },
      { count: "25-32", move: "록 스텝 & 턴 (Rock Step & Turn)", desc: "앞 록 → 리커버 → 1/2 피봇 턴" }
    ]
  },
  {
    id: 12,
    title: "Turn It Up",
    artist: "Bruno Mars",
    choreographer: "Youngjin Jung",
    level: 2,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "팝",
    youtubeId: "Qf2GKKZgeqQ",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/Qf2GKKZgeqQ/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "스텝 & 턴 (Step & Turn)", desc: "오른발 앞 → 왼발 앞 → 1/4 턴 → 터치" },
      { count: "9-16", move: "셔플 & 록 스텝 (Shuffle & Rock Step)", desc: "오른쪽 셔플 → 앞 록 → 리커버" },
      { count: "17-24", move: "바인 & 크로스 (Vine & Cross)", desc: "왼쪽 그레이프바인 → 크로스 터치" },
      { count: "25-32", move: "힙 범프 & 턴 (Hip Bump & Turn)", desc: "힙 범프 좌우 → 1/2 피봇 턴" }
    ]
  },
  {
    id: 13,
    title: "Like an Indian Doll",
    artist: "Various",
    choreographer: "Heejin Kim, Youngeun S. & Eunjeong J.",
    level: 2,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "팝",
    youtubeId: "lrMLT6oi2KY",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/lrMLT6oi2KY/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "셔플 & 턴 (Shuffle & Turn)", desc: "오른쪽 셔플 → 1/4 턴 → 왼쪽 셔플" },
      { count: "17-24", move: "록 스텝 & 리커버 (Rock Step & Recover)", desc: "앞 록 → 리커버 → 뒤 록 → 리커버" },
      { count: "25-32", move: "바인 & 크로스 (Vine & Cross)", desc: "오른쪽 그레이프바인 → 크로스 터치" }
    ]
  },
  {
    id: 14,
    title: "복세편살 (Boksepyeonsal)",
    artist: "Various",
    choreographer: "jeslinedance & BHKim",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "가요",
    youtubeId: "G8Utlws4LME",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/G8Utlws4LME/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "바인 & 턴 (Vine & Turn)", desc: "오른쪽 그레이프바인 → 1/4 턴" },
      { count: "17-24", move: "워크 & 록 스텝 (Walk & Rock Step)", desc: "앞으로 워크 2보 → 앞 록 → 리커버" },
      { count: "25-32", move: "코스터 스텝 & 터치 (Coaster Step & Touch)", desc: "뒤 코스터 스텝 → 사이드 터치" }
    ]
  },
  {
    id: 15,
    title: "Save Me",
    artist: "Olly Murs",
    choreographer: "Nathan Gardiner",
    level: 2,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "팝",
    youtubeId: "fNha3NJ5oG8",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/fNha3NJ5oG8/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "워크 & 턴 (Walk & Turn)", desc: "앞으로 워크 → 1/4 턴 → 사이드 스텝" },
      { count: "9-16", move: "셔플 & 록 스텝 (Shuffle & Rock Step)", desc: "오른쪽 셔플 → 앞 록 → 리커버" },
      { count: "17-24", move: "바인 & 크로스 (Vine & Cross)", desc: "오른쪽 그레이프바인 → 크로스 터치" },
      { count: "25-32", move: "피봇 턴 & 터치 (Pivot Turn & Touch)", desc: "앞 스텝 → 1/2 피봇 턴 → 터치" }
    ]
  },
  {
    id: 16,
    title: "News",
    artist: "Loi",
    choreographer: "RaeJ Lee",
    level: 2,
    bpm: 120,
    walls: 2,
    counts: 48,
    genre: "팝",
    youtubeId: "Xry9UgpcRQ4",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/Xry9UgpcRQ4/hqdefault.jpg",

    steps: [
      { count: "1-16", move: "워크 & 턴 (Walk & Turn)", desc: "앞으로 워크 → 1/4 턴 → 사이드 스텝 → 터치" },
      { count: "17-32", move: "셔플 & 록 스텝 (Shuffle & Rock Step)", desc: "오른쪽 셔플 → 앞 록 → 리커버 → 왼쪽 셔플" },
      { count: "33-48", move: "바인 & 피봇 턴 (Vine & Pivot Turn)", desc: "오른쪽 그레이프바인 → 1/2 피봇 턴 → 터치" }
    ]
  },
  {
    id: 17,
    title: "후회없는 춤 (Dance Without Regret)",
    artist: "Bizzkpro",
    choreographer: "Lee Eun Hee",
    level: 2,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "가요",
    youtubeId: "NOLUMWYgYzE",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/NOLUMWYgYzE/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "셔플 & 턴 (Shuffle & Turn)", desc: "오른쪽 셔플 → 1/4 턴 → 왼쪽 셔플" },
      { count: "17-24", move: "록 스텝 & 리커버 (Rock Step & Recover)", desc: "앞 록 → 리커버 → 뒤 록 → 리커버" },
      { count: "25-32", move: "바인 & 크로스 (Vine & Cross)", desc: "오른쪽 그레이프바인 → 크로스 터치" }
    ]
  },
  {
    id: 18,
    title: "Let's Dance With the Music",
    artist: "Various",
    choreographer: "Janet (Zhen Zhen) Ge",
    level: 2,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "팝",
    youtubeId: "Xf3w_drsXro",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/Xf3w_drsXro/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "셔플 & 록 스텝 (Shuffle & Rock Step)", desc: "오른쪽 셔플 → 앞 록 → 리커버" },
      { count: "17-24", move: "바인 & 턴 (Vine & Turn)", desc: "오른쪽 그레이프바인 → 1/4 턴" },
      { count: "25-32", move: "힙 범프 & 터치 (Hip Bump & Touch)", desc: "힙 범프 좌우 → 사이드 터치" }
    ]
  },
  {
    id: 19,
    title: "Love Rumba",
    artist: "Various",
    choreographer: "Mayee Lee",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 40,
    genre: "라틴",
    youtubeId: "brWH2NTUYOQ",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/brWH2NTUYOQ/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "룸바 박스 (Rumba Box)", desc: "사이드 → 모아 → 앞 → 사이드 → 모아 → 뒤" },
      { count: "9-16", move: "쿠카라차 & 턴 (Cucaracha & Turn)", desc: "오른쪽 쿠카라차 → 왼쪽 쿠카라차 → 1/4 턴" },
      { count: "17-24", move: "워크 & 록 스텝 (Walk & Rock Step)", desc: "앞으로 워크 2보 → 앞 록 → 리커버" },
      { count: "25-32", move: "셔플 & 턴 (Shuffle & Turn)", desc: "오른쪽 셔플 → 1/4 턴 → 왼쪽 셔플" },
      { count: "33-40", move: "힙 스웨이 & 터치 (Hip Sway & Touch)", desc: "힙 스웨이 좌우 → 사이드 터치" }
    ]
  },
  {
    id: 20,
    title: "Casablanca 2025",
    artist: "Various",
    choreographer: "Penny Tan",
    level: 2,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "팝",
    youtubeId: "vO34JO_YeqA",
    tutorialId: "4MPjN0RtTHw",
    thumbnail: "https://img.youtube.com/vi/vO34JO_YeqA/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "바인 & 턴 (Vine & Turn)", desc: "오른쪽 그레이프바인 → 1/4 턴" },
      { count: "17-24", move: "워크 & 피봇 턴 (Walk & Pivot Turn)", desc: "앞으로 워크 → 1/2 피봇 턴 → 스텝" },
      { count: "25-32", move: "셔플 & 록 스텝 (Shuffle & Rock Step)", desc: "오른쪽 셔플 → 앞 록 → 리커버" }
    ]
  },
  {
    id: 21,
    title: "Cha Cha Tango (차차 탱고)",
    artist: "Hantos Djay",
    choreographer: "Heru Tian",
    level: 2,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "라틴",
    youtubeId: "FIqkmGALYvA",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/FIqkmGALYvA/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "차차 스텝 & 턴 (Cha Cha Step & Turn)", desc: "차차차 → 1/4 턴 → 차차차" },
      { count: "9-16", move: "탱고 워크 & 록 (Tango Walk & Rock)", desc: "탱고 워크 앞 → 록 스텝 → 리커버" },
      { count: "17-24", move: "바인 & 크로스 (Vine & Cross)", desc: "오른쪽 그레이프바인 → 크로스 터치" },
      { count: "25-32", move: "힙 스웨이 & 턴 (Hip Sway & Turn)", desc: "힙 스웨이 좌우 → 1/2 피봇 턴" }
    ]
  },
  {
    id: 22,
    title: "Dreams of Rio (드림 오브 리오)",
    artist: "Les Monters",
    choreographer: "Yoonhyoung Jin",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "라틴",
    youtubeId: "gxMFVESV0W0",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/gxMFVESV0W0/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "바인 & 턴 (Vine & Turn)", desc: "오른쪽 그레이프바인 → 1/4 턴" },
      { count: "17-24", move: "워크 & 록 스텝 (Walk & Rock Step)", desc: "앞으로 워크 2보 → 앞 록 → 리커버" },
      { count: "25-32", move: "힙 범프 & 클랩 (Hip Bump & Clap)", desc: "힙 범프 좌우 → 박수 → 터치" }
    ]
  },
  {
    id: 23,
    title: "La Noche Mia (라 노체 미아)",
    artist: "Various",
    choreographer: "JLDK",
    level: 3,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "라틴",
    youtubeId: "BNJbWP_zL0c",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/BNJbWP_zL0c/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "차차 스텝 & 턴 (Cha Cha Step & Turn)", desc: "차차차 → 1/4 턴 → 차차차" },
      { count: "9-16", move: "쿠카라차 & 록 (Cucaracha & Rock)", desc: "쿠카라차 좌우 → 앞 록 → 리커버" },
      { count: "17-24", move: "바인 & 크로스 (Vine & Cross)", desc: "오른쪽 그레이프바인 → 크로스 터치" },
      { count: "25-32", move: "스웨이 & 턴 (Sway & Turn)", desc: "힙 스웨이 좌우 → 1/2 피봇 턴" }
    ]
  },
  {
    id: 24,
    title: "푸른시절 (Blue Season)",
    artist: "김만수 (Kim Mansu)",
    choreographer: "Eun Hee Yoon",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "가요",
    youtubeId: "Jng8rwjnY24",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/Jng8rwjnY24/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "바인 & 턴 (Vine & Turn)", desc: "오른쪽 그레이프바인 → 1/4 턴" },
      { count: "17-24", move: "워크 & 록 스텝 (Walk & Rock Step)", desc: "앞으로 워크 2보 → 앞 록 → 리커버" },
      { count: "25-32", move: "코스터 스텝 & 터치 (Coaster Step & Touch)", desc: "뒤 코스터 스텝 → 사이드 터치" }
    ]
  },
  {
    id: 25,
    title: "주시고 (Juicy Go)",
    artist: "영탁",
    choreographer: "Youngjin Jung",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "가요",
    youtubeId: "vMZq-Ia1Crw",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/vMZq-Ia1Crw/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 클랩 (Side Step & Clap)", desc: "오른발 사이드 → 박수 → 왼발 사이드 → 박수" },
      { count: "9-16", move: "셔플 & 턴 (Shuffle & Turn)", desc: "오른쪽 셔플 → 1/4 턴 → 왼쪽 셔플" },
      { count: "17-24", move: "록 스텝 & 리커버 (Rock Step & Recover)", desc: "앞 록 → 리커버 → 뒤 록 → 리커버" },
      { count: "25-32", move: "바인 & 터치 (Vine & Touch)", desc: "오른쪽 그레이프바인 → 터치" }
    ]
  },
  {
    id: 26,
    title: "사랑찾아 인생찾아 (Love & Life)",
    artist: "Mr. Pang",
    choreographer: "Monica Choi, Rosa Lee & Chloe Cha",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "가요",
    youtubeId: "dhoVoR7PbZ8",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/dhoVoR7PbZ8/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "바인 & 턴 (Vine & Turn)", desc: "오른쪽 그레이프바인 → 1/4 턴" },
      { count: "17-24", move: "워크 & 록 스텝 (Walk & Rock Step)", desc: "앞으로 워크 2보 → 앞 록 → 리커버" },
      { count: "25-32", move: "힙 범프 & 터치 (Hip Bump & Touch)", desc: "힙 범프 좌우 → 사이드 터치" }
    ]
  },
  {
    id: 27,
    title: "DA Bomb (섹시밤)",
    artist: "Various",
    choreographer: "윤은희",
    level: 2,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "라틴",
    youtubeId: "fmpl-GbrX4k",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/fmpl-GbrX4k/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "바차타 스텝 & 터치 (Bachata Step & Touch)", desc: "사이드 스텝 → 터치 → 사이드 스텝 → 터치" },
      { count: "9-16", move: "쿠카라차 & 턴 (Cucaracha & Turn)", desc: "쿠카라차 좌우 → 1/4 턴" },
      { count: "17-24", move: "바인 & 크로스 (Vine & Cross)", desc: "오른쪽 그레이프바인 → 크로스 터치" },
      { count: "25-32", move: "힙 롤 & 스웨이 (Hip Roll & Sway)", desc: "힙 롤 → 스웨이 좌우 → 터치" }
    ]
  },
  {
    id: 28,
    title: "Woman in Love 2025 (우먼 인 러브)",
    artist: "Various",
    choreographer: "챔프라인댄스",
    level: 3,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "팝",
    youtubeId: "_zsCOw1Vcu8",
    tutorialId: "DkahotfIWUI",
    thumbnail: "https://img.youtube.com/vi/_zsCOw1Vcu8/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "워크 & 턴 (Walk & Turn)", desc: "앞으로 워크 → 1/4 턴 → 사이드 스텝" },
      { count: "9-16", move: "셔플 & 록 스텝 (Shuffle & Rock Step)", desc: "오른쪽 셔플 → 앞 록 → 리커버" },
      { count: "17-24", move: "바인 & 크로스 (Vine & Cross)", desc: "오른쪽 그레이프바인 → 크로스 터치" },
      { count: "25-32", move: "스웨이 & 턴 (Sway & Turn)", desc: "힙 스웨이 좌우 → 1/2 피봇 턴" }
    ]
  },
  {
    id: 29,
    title: "보고싶다 내사랑",
    artist: "설운도",
    choreographer: "강효진",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "가요",
    youtubeId: "FlKoo2oVjwk",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/FlKoo2oVjwk/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "바인 & 턴 (Vine & Turn)", desc: "오른쪽 그레이프바인 → 1/4 턴" },
      { count: "17-24", move: "워크 & 록 스텝 (Walk & Rock Step)", desc: "앞으로 워크 2보 → 앞 록 → 리커버" },
      { count: "25-32", move: "힙 범프 & 터치 (Hip Bump & Touch)", desc: "힙 범프 좌우 → 사이드 터치" }
    ]
  },
  {
    id: 30,
    title: "썸머타임 (Summer Time)",
    artist: "Various",
    choreographer: "EunA Kim, Na SoonYoung, Noh SoonDeok & Jinny",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "팝",
    youtubeId: "6_Ee-xh0KNk",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/6_Ee-xh0KNk/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 클랩 (Side Step & Clap)", desc: "오른발 사이드 → 박수 → 왼발 사이드 → 박수" },
      { count: "9-16", move: "셔플 & 턴 (Shuffle & Turn)", desc: "오른쪽 셔플 → 1/4 턴 → 왼쪽 셔플" },
      { count: "17-24", move: "워크 & 록 스텝 (Walk & Rock Step)", desc: "앞으로 워크 2보 → 앞 록 → 리커버" },
      { count: "25-32", move: "바인 & 터치 (Vine & Touch)", desc: "오른쪽 그레이프바인 → 터치" }
    ]
  },
  {
    id: 31,
    title: "Zumma Dance (줌마 댄스)",
    artist: "Various",
    choreographer: "이도진",
    level: 2,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "팝",
    youtubeId: "n1ITcteZ2Ac",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/n1ITcteZ2Ac/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 클랩 (Side Step & Clap)", desc: "오른발 사이드 → 박수 → 왼발 사이드 → 박수" },
      { count: "9-16", move: "셔플 & 턴 (Shuffle & Turn)", desc: "오른쪽 셔플 → 1/4 턴 → 왼쪽 셔플" },
      { count: "17-24", move: "록 스텝 & 리커버 (Rock Step & Recover)", desc: "앞 록 → 리커버 → 뒤 록 → 리커버" },
      { count: "25-32", move: "바인 & 터치 (Vine & Touch)", desc: "오른쪽 그레이프바인 → 터치" }
    ]
  },
  {
    id: 32,
    title: "아직도 어두운 밤인가봐 (It's Still Dark Out)",
    artist: "Various",
    choreographer: "챔프라인댄스",
    level: 1,
    bpm: 120,
    walls: 2,
    counts: 64,
    genre: "가요",
    youtubeId: "fkAXbdAfUfE",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/fkAXbdAfUfE/hqdefault.jpg",

    steps: [
      { count: "1-16", move: "워크 & 턴 (Walk & Turn)", desc: "앞으로 워크 → 1/4 턴 → 사이드 스텝 → 터치" },
      { count: "17-32", move: "셔플 & 록 스텝 (Shuffle & Rock Step)", desc: "오른쪽 셔플 → 앞 록 → 리커버 → 왼쪽 셔플" },
      { count: "33-48", move: "바인 & 크로스 (Vine & Cross)", desc: "오른쪽 그레이프바인 → 크로스 터치 → 왼쪽 바인" },
      { count: "49-64", move: "스웨이 & 피봇 턴 (Sway & Pivot Turn)", desc: "힙 스웨이 좌우 → 1/2 피봇 턴 → 터치" }
    ]
  },
  {
    id: 33,
    title: "편지",
    artist: "미스터 팡 (Mr. Pang)",
    choreographer: "Various",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "가요",
    youtubeId: "nde5MdZQZdM",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/nde5MdZQZdM/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "바인 & 턴 (Vine & Turn)", desc: "오른쪽 그레이프바인 → 1/4 턴" },
      { count: "17-24", move: "워크 & 록 스텝 (Walk & Rock Step)", desc: "앞으로 워크 2보 → 앞 록 → 리커버" },
      { count: "25-32", move: "코스터 스텝 & 터치 (Coaster Step & Touch)", desc: "뒤 코스터 스텝 → 사이드 터치" }
    ]
  },
  {
    id: 34,
    title: "Womanizer (우먼나이져)",
    artist: "Britney Spears",
    choreographer: "챔프라인댄스",
    level: 2,
    bpm: 120,
    walls: 4,
    counts: 64,
    genre: "팝",
    youtubeId: "9tScjjwqsRw",
    tutorialId: "wlg36Moqcdk",
    thumbnail: "https://img.youtube.com/vi/9tScjjwqsRw/hqdefault.jpg",

    steps: [
      { count: "1-16", move: "워크 & 턴 (Walk & Turn)", desc: "앞으로 워크 → 1/4 턴 → 사이드 스텝 → 터치" },
      { count: "17-32", move: "셔플 & 록 스텝 (Shuffle & Rock Step)", desc: "오른쪽 셔플 → 앞 록 → 리커버 → 왼쪽 셔플" },
      { count: "33-48", move: "바인 & 크로스 (Vine & Cross)", desc: "오른쪽 그레이프바인 → 크로스 터치 → 왼쪽 바인" },
      { count: "49-64", move: "힙 스웨이 & 턴 (Hip Sway & Turn)", desc: "힙 스웨이 좌우 → 1/2 피봇 턴 → 터치" }
    ]
  },
  {
    id: 35,
    title: "Let's Get Loud (렛츠 겟 라우드)",
    artist: "Jennifer Lopez",
    choreographer: "Lena Jo & Chocola Lee",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "라틴팝",
    youtubeId: "HMUNZGWs8nw",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/HMUNZGWs8nw/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 클랩 (Side Step & Clap)", desc: "오른발 사이드 → 박수 → 왼발 사이드 → 박수" },
      { count: "9-16", move: "셔플 & 턴 (Shuffle & Turn)", desc: "오른쪽 셔플 → 1/4 턴 → 왼쪽 셔플" },
      { count: "17-24", move: "록 스텝 & 리커버 (Rock Step & Recover)", desc: "앞 록 → 리커버 → 뒤 록 → 리커버" },
      { count: "25-32", move: "바인 & 터치 (Vine & Touch)", desc: "오른쪽 그레이프바인 → 터치" }
    ]
  },
  {
    id: 36,
    title: "가로세로 (Garo Sero)",
    artist: "Various",
    choreographer: "Ahyoung Kim (김아영)",
    level: 2,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "가요",
    youtubeId: "pHP5ezqVJPc",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/pHP5ezqVJPc/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "셔플 & 록 스텝 (Shuffle & Rock Step)", desc: "오른쪽 셔플 → 앞 록 → 리커버" },
      { count: "17-24", move: "바인 & 크로스 (Vine & Cross)", desc: "오른쪽 그레이프바인 → 크로스 터치" },
      { count: "25-32", move: "피봇 턴 & 터치 (Pivot Turn & Touch)", desc: "앞 스텝 → 1/2 피봇 턴 → 터치" }
    ]
  },
  {
    id: 37,
    title: "Pick Me Up (픽 미 업)",
    artist: "Various",
    choreographer: "챔프라인댄스",
    level: 3,
    bpm: 120,
    walls: 4,
    counts: 48,
    genre: "팝",
    youtubeId: "OCEwJavZtjo",
    tutorialId: "UnVtjL_lykg",
    thumbnail: "https://img.youtube.com/vi/OCEwJavZtjo/hqdefault.jpg",

    steps: [
      { count: "1-16", move: "워크 & 턴 (Walk & Turn)", desc: "앞으로 워크 → 1/4 턴 → 사이드 스텝 → 터치" },
      { count: "17-32", move: "셔플 & 록 스텝 (Shuffle & Rock Step)", desc: "오른쪽 셔플 → 앞 록 → 리커버 → 왼쪽 셔플" },
      { count: "33-48", move: "바인 & 피봇 턴 (Vine & Pivot Turn)", desc: "오른쪽 그레이프바인 → 1/2 피봇 턴 → 터치" }
    ]
  },
  {
    id: 38,
    title: "Love Disco Remix",
    artist: "Various",
    choreographer: "Jung Mi Young",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "팝",
    youtubeId: "5R7kYj3sKbs",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/5R7kYj3sKbs/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "바인 & 턴 (Vine & Turn)", desc: "오른쪽 그레이프바인 → 1/4 턴" },
      { count: "17-24", move: "워크 & 록 스텝 (Walk & Rock Step)", desc: "앞으로 워크 2보 → 앞 록 → 리커버" },
      { count: "25-32", move: "힙 범프 & 클랩 (Hip Bump & Clap)", desc: "힙 범프 좌우 → 박수 → 터치" }
    ]
  },
  {
    id: 39,
    title: "송인 (Good bye, My love)",
    artist: "장윤정",
    choreographer: "Ahyoung Kim (김아영)",
    level: 1,
    bpm: 100,
    walls: 4,
    counts: 24,
    genre: "가요",
    youtubeId: "GyNwEy7S6u4",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/GyNwEy7S6u4/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "왈츠 스텝 & 턴 (Waltz Step & Turn)", desc: "왈츠 앞 스텝 → 1/4 턴 → 사이드 스텝" },
      { count: "9-16", move: "바인 & 스웨이 (Vine & Sway)", desc: "오른쪽 그레이프바인 → 스웨이" },
      { count: "17-24", move: "밸런스 & 턴 (Balance & Turn)", desc: "왈츠 밸런스 좌우 → 1/4 턴" }
    ]
  },
  {
    id: 40,
    title: "Dance Jockey Remix (댄스쟈키)",
    artist: "PSY (싸이)",
    choreographer: "김민진",
    level: 2,
    bpm: 130,
    walls: 4,
    counts: 32,
    genre: "가요",
    youtubeId: "0eKiC6aTjAA",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/0eKiC6aTjAA/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 클랩 (Side Step & Clap)", desc: "오른발 사이드 → 박수 → 왼발 사이드 → 박수" },
      { count: "9-16", move: "셔플 & 턴 (Shuffle & Turn)", desc: "오른쪽 셔플 → 1/4 턴 → 왼쪽 셔플" },
      { count: "17-24", move: "록 스텝 & 리커버 (Rock Step & Recover)", desc: "앞 록 → 리커버 → 뒤 록 → 리커버" },
      { count: "25-32", move: "힙 범프 & 터치 (Hip Bump & Touch)", desc: "힙 범프 좌우 → 사이드 터치" }
    ]
  }
];

// ============================================================
// 📅 곡별 등록일 매핑 — 새 곡 추가 시 여기에 한 줄만 추가하면 됩니다!
// 가장 최근 날짜의 곡이 자동으로 "이번주 수업곡"이 됩니다.
// ============================================================
const songDates = {
  10: '2026-03-10',  // Everyone Needs a Hero
  1: '2026-03-03',  // Why
  2: '2026-02-24',  // 정말 잘해왔어
  3: '2026-02-17',  // This Is My Life
  4: '2026-02-10',  // 오늘밤에 만나요
  5: '2026-02-03',  // Dangerous
  6: '2026-01-27',  // Love Potion 666
  7: '2026-01-20',  // Havana Cha
  8: '2026-01-13',  // Rose Garden
  9: '2026-01-06',  // Just a Kiss
  11: '2025-12-30',  // Samba Do Brasil
  12: '2025-12-23',  // Turn It Up
  13: '2025-12-16',  // Like an Indian Doll
  14: '2025-12-09',  // 복세편살
  15: '2025-12-02',  // Save Me
  16: '2025-11-25',  // News
  17: '2025-11-18',  // 후회없는 춤
  18: '2025-11-11',  // Let's Dance With the Music
  19: '2025-11-04',  // Love Rumba
  20: '2025-10-28',  // Casablanca 2025
  21: '2025-10-21',  // Cha Cha Tango
  22: '2025-10-14',  // Dreams of Rio
  23: '2025-10-07',  // La Noche Mia
  24: '2025-09-30',  // 푸른시절
  25: '2025-09-23',  // 주시고
  26: '2025-09-16',  // 사랑찾아 인생찾아
  27: '2025-09-09',  // DA Bomb
  28: '2025-09-02',  // Woman in Love 2025
  29: '2025-08-26',  // 보고싶다 내사랑
  30: '2025-08-19',  // 썸머타임
  31: '2025-08-12',  // Zumma Dance
  32: '2025-08-05',  // 아직도 어두운 밤인가봐
  33: '2025-07-29',  // 편지
  34: '2025-07-22',  // Womanizer
  35: '2025-07-15',  // Let's Get Loud
  36: '2025-07-08',  // 가로세로
  37: '2025-07-01',  // Pick Me Up
  38: '2025-06-24',  // Love Disco Remix
  39: '2025-06-17',  // 송인
  40: '2025-06-10',  // Dance Jockey Remix
};

// 🔄 자동 계산: 가장 최근 등록된 곡 = 이번주 수업곡
const latestDate = Object.values(songDates).sort().reverse()[0];

const processedSongs = rawSongs.map(s => ({
  ...s,
  addedDate: songDates[s.id] || '2025-01-01',
  isThisWeek: songDates[s.id] === latestDate,
}));

export default processedSongs;
