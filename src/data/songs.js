// 라인댄스 안무곡 데이터
const rawSongs = [
  {
    id: 62,
    title: "한잔해 (Han Jan Hae)",
    artist: "박군",
    choreographer: "Unknown",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "트로트",
    youtubeId: "oIv0xmzSJuA",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/oIv0xmzSJuA/hqdefault.jpg",
    mp3Url: "/mp3/oIv0xmzSJuA.mp3",
    steps: []
  },
  {
    id: 61,
    title: "Violet Life (부초같은 인생) Remix",
    artist: "Unknown",
    choreographer: "Unknown",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "트로트",
    youtubeId: "NedFc7LvHE8",
    tutorialId: "",
    thumbnail: "https://img.youtube.com/vi/NedFc7LvHE8/hqdefault.jpg",
    mp3Url: "/mp3/NedFc7LvHE8.mp3",
    steps: []
  },
  {
    id: 58,
    title: "Delight (환희)",
    artist: "정수라",
    choreographer: "Unknown",
    level: 1,
    bpm: 130,
    walls: 4,
    counts: 32,
    genre: "가요",
    youtubeId: "A6DFS5eGAKQ",
    tutorialId: "a9ir8ZWKCVQ",
    thumbnail: "https://img.youtube.com/vi/A6DFS5eGAKQ/hqdefault.jpg",
    steps: [
      { count: "1-8", move: "기본 스텝 (Basic Step)", desc: "음악에 맞춰 기본 스텝 진행" }
    ]
  },
  {
    id: 57,
    title: "Accept (체념)",
    artist: "Unknown",
    choreographer: "Heejin K., Misun Y. & Daha P",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "가요",
    youtubeId: "Hx5-NyEki-Q",
    tutorialId: "08QxXkpCza8",
    thumbnail: "https://img.youtube.com/vi/Hx5-NyEki-Q/hqdefault.jpg",
    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "바인 & 턴 (Vine & Turn)", desc: "오른쪽 그레이프바인 → 1/4 턴" },
      { count: "17-24", move: "워크 & 록 스텝 (Walk & Rock Step)", desc: "앞으로 워크 2보 → 앞 록 → 리커버" },
      { count: "25-32", move: "힙 범프 & 터치 (Hip Bump & Touch)", desc: "힙 범프 좌우 → 사이드 터치" }
    ]
  },
  {
    id: 60,
    title: "Moonbay Rumba (문베이 룸바)",
    artist: "Paselhits",
    choreographer: "Junghye Yoon & Solbi Jeong",
    level: 3,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "자이브",
    youtubeId: "2lO2Cb3OUgI",
    tutorialId: "ClBKWZm8J0k",
    thumbnail: "https://img.youtube.com/vi/2lO2Cb3OUgI/hqdefault.jpg",
    mp3Url: "/mp3/2lO2Cb3OUgI.mp3",

    steps: [
      { count: "1-8", move: "기본 룸바 스텝", desc: "사이드 → 모아 → 앞 → 사이드 → 모아 → 뒤" },
      { count: "9-16", move: "힙 스웨이 & 터치", desc: "힙 스웨이 좌우 → 사이드 터치" },
      { count: "17-24", move: "워크 & 록 스텝", desc: "앞으로 워크 2보 → 앞 록 → 리커버" },
      { count: "25-32", move: "턴 & 터치", desc: "1/4 턴하며 사이드 → 모아 → 터치" }
    ]
  },
  {
    id: 56,
    title: "Love at First Sight (첫눈에 반해버린 사람아)",
    artist: "박서진 (Park Seo Jin)",
    choreographer: "윤은희 (Eunhee Yoon)",
    level: 2,
    bpm: 128,
    walls: 4,
    counts: 32,
    genre: "트로트",
    youtubeId: "H_88xkq8XPQ",
    tutorialId: "yHL9zB5kPb0",
    thumbnail: "https://img.youtube.com/vi/H_88xkq8XPQ/hqdefault.jpg",
    mp3Url: "/mp3/H_88xkq8XPQ.mp3",
    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "그레이프바인 & 턴 (Vine & Turn)", desc: "오른쪽 그레이프바인 → 1/4 턴 → 왼쪽 그레이프바인" },
      { count: "17-24", move: "록 스텝 & 셔플 (Rock Step & Shuffle)", desc: "앞 록 → 리커버 → 셔플 백" },
      { count: "25-32", move: "코스터 스텝 & 피벗 턴 (Coaster Step & Pivot Turn)", desc: "코스터 스텝 → 워크 2보 → 1/2 피벗 턴" }
    ]
  },
  {
    id: 55,
    title: "Electro Shake (일렉트로 쉐이크)",
    artist: "Loredana Errore",
    choreographer: "Jamie Barnfield (제이미 반필드)",
    level: 3,
    bpm: 130,
    walls: 4,
    counts: 32,
    genre: "팝",
    youtubeId: "Qrb59Gt_5PM",
    tutorialId: "Jlnn6nBA10E",
    thumbnail: "https://img.youtube.com/vi/Qrb59Gt_5PM/hqdefault.jpg",
    steps: [
      { count: "1-8", move: "사이드 록 & 셔플 (Side Rock & Shuffle)", desc: "사이드 록 → 리커버 → 크로스 셔플" },
      { count: "9-16", move: "록 스텝 & 1/2 턴 (Rock Step & 1/2 Turn)", desc: "앞 록 → 리커버 → 1/2 턴 셔플" },
      { count: "17-24", move: "재즈 박스 & 크로스 (Jazz Box & Cross)", desc: "재즈 박스 → 크로스 → 사이드 → 비하인드" },
      { count: "25-32", move: "몽크 워크 & 힙 범프 (Monterey Turn & Hip Bump)", desc: "몬테레이 1/4 턴 → 힙 범프 좌우" }
    ]
  },
  {
    id: 54,
    title: "돌아와요 부산항에 (Return To Busan Port)",
    artist: "미스미스터 (Miss Mister)",
    choreographer: "김덕화 (Kim Duck Hwa)",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "가요",
    youtubeId: "6nDUAT73JpI",
    tutorialId: "Bkjuti6BcBc",
    thumbnail: "https://img.youtube.com/vi/6nDUAT73JpI/hqdefault.jpg",
    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "그레이프바인 & 터치 (Grapevine & Touch)", desc: "오른쪽 그레이프바인 → 터치 → 왼쪽 그레이프바인 → 터치" },
      { count: "17-24", move: "워크 & 피벗 턴 (Walk & Pivot Turn)", desc: "앞으로 워크 2보 → 1/2 피벗 턴 → 워크 2보" },
      { count: "25-32", move: "코스터 스텝 & 터치 (Coaster Step & Touch)", desc: "뒤 코스터 스텝 → 사이드 터치" }
    ]
  },
  {
    id: 53,
    title: "Funky Groove (펑키 그루브)",
    artist: "Unknown",
    choreographer: "Anny AP, Ria Lolong & Eric Rinaldi",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "팝",
    youtubeId: "kk0JeDPB7po",
    tutorialId: "br6cqoQUwCE",
    thumbnail: "https://img.youtube.com/vi/kk0JeDPB7po/hqdefault.jpg",
    steps: [
      { count: "1-8", move: "스텝 터치 & 사이드 (Step Touch & Side)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "그레이프바인 & 터치 (Grapevine & Touch)", desc: "오른쪽 그레이프바인 → 터치 → 왼쪽 그레이프바인 → 터치" },
      { count: "17-24", move: "워크 & 피벗 턴 (Walk & Pivot Turn)", desc: "앞으로 워크 2보 → 1/2 피벗 턴 → 워크 2보" },
      { count: "25-32", move: "힙 범프 & 스텝 (Hip Bump & Step)", desc: "힙 범프 오른쪽 2회 → 힙 범프 왼쪽 2회" }
    ]
  },
  {
    id: 52,
    title: "Disco Pizza (디스코 피자)",
    artist: "The Kolors",
    choreographer: "Aurora de Jong",
    level: 1,
    bpm: 128,
    walls: 4,
    counts: 32,
    genre: "팝",
    youtubeId: "hOw7QwJNI4M",
    tutorialId: "ZjUGWLycNxc",
    thumbnail: "https://img.youtube.com/vi/hOw7QwJNI4M/hqdefault.jpg",
    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "셔플 & 턴 (Shuffle & Turn)", desc: "오른쪽 셔플 → 1/4 턴 → 왼쪽 셔플" },
      { count: "17-24", move: "록 스텝 & 리커버 (Rock Step & Recover)", desc: "앞 록 → 리커버 → 뒤 록 → 리커버" },
      { count: "25-32", move: "바인 & 크로스 (Vine & Cross)", desc: "오른쪽 그레이프바인 → 크로스 터치" }
    ]
  },
  {
    id: 51,
    title: "날보러와요 (Come and See Me)",
    artist: "캔 (Can)",
    choreographer: "Junghye Yoon (윤정혜)",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 64,
    genre: "가요",
    youtubeId: "A_toS48i9Bg",
    tutorialId: "80ZnYsrmamY",
    thumbnail: "https://img.youtube.com/vi/A_toS48i9Bg/hqdefault.jpg",
    steps: [
      { count: "1-16", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "17-32", move: "바인 & 턴 (Vine & Turn)", desc: "오른쪽 그레이프바인 → 1/4 턴" },
      { count: "33-48", move: "워크 & 록 스텝 (Walk & Rock Step)", desc: "앞으로 워크 2보 → 앞 록 → 리커버" },
      { count: "49-64", move: "셔플 & 턴 (Shuffle & Turn)", desc: "오른쪽 셔플 → 1/4 턴 → 왼쪽 셔플" }
    ]
  },
  {
    id: 50,
    title: "Ghost Train (고스트 트레인)",
    artist: "Hank Williams III",
    choreographer: "Kathy Hunyadi",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "컨트리",
    youtubeId: "YmNhE-u96_o",
    tutorialId: "2CfJic2PPm8",
    thumbnail: "https://img.youtube.com/vi/YmNhE-u96_o/hqdefault.jpg",
    steps: [
      { count: "1-8", move: "트위스트 (Twist)", desc: "양발 트위스트 좌우 → 트위스트" },
      { count: "9-16", move: "바인 & 터치 (Vine & Touch)", desc: "오른쪽 그레이프바인 → 터치" },
      { count: "17-24", move: "워크 & 턴 (Walk & Turn)", desc: "앞으로 워크 → 1/4 턴" },
      { count: "25-32", move: "트위스트 & 스템프 (Twist & Stomp)", desc: "트위스트 좌우 → 스템프" }
    ]
  },
  {
    id: 49,
    title: "하늘땅 별땅 (Heaven's Land Star Land)",
    artist: "비비 (B.B)",
    choreographer: "정유경",
    level: 2,
    bpm: 118,
    walls: 4,
    counts: 48,
    genre: "가요",
    youtubeId: "moQlYmBoIwk",
    tutorialId: "b8kHeSMVTFY",
    thumbnail: "https://img.youtube.com/vi/moQlYmBoIwk/hqdefault.jpg",
    steps: [
      { count: "1-16", move: "사이드 스텝 & 록 (Side Step & Rock)", desc: "오른발 사이드 → 록 → 리커버 → 터치" },
      { count: "17-32", move: "셔플 & 턴 (Shuffle & Turn)", desc: "오른쪽 셔플 → 1/4 턴 → 왼쪽 셔플" },
      { count: "33-48", move: "바인 & 피봇 (Vine & Pivot)", desc: "오른쪽 그레이프바인 → 1/2 피봇 턴" }
    ]
  },
  {
    id: 48,
    title: "Hillbilly Disco (힐빌리 디스코)",
    artist: "알 수 없음",
    choreographer: "민트라인댄스",
    level: 1,
    bpm: 125,
    walls: 4,
    counts: 32,
    genre: "컨트리",
    youtubeId: "iuVFCaBLsbc",
    tutorialId: "1GuYuFKD5OQ",
    thumbnail: "https://img.youtube.com/vi/iuVFCaBLsbc/hqdefault.jpg",
    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "바인 & 턴 (Vine & Turn)", desc: "오른쪽 그레이프바인 → 1/4 턴" },
      { count: "17-24", move: "워크 & 록 스텝 (Walk & Rock Step)", desc: "앞으로 워크 2보 → 앞 록 → 리커버" },
      { count: "25-32", move: "셔플 & 터치 (Shuffle & Touch)", desc: "오른쪽 셔플 → 터치" }
    ]
  },
  {
    id: 47,
    title: "Rhythm (리듬)",
    artist: "Rick Vito",
    choreographer: "Ria Vos",
    level: 1,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "팝",
    youtubeId: "Vsz9hXOCNkk",
    tutorialId: "vz5LNavVxlU",
    thumbnail: "https://img.youtube.com/vi/Vsz9hXOCNkk/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "바인 & 턴 (Vine & Turn)", desc: "오른쪽 그레이프바인 → 1/4 턴" },
      { count: "17-24", move: "워크 & 록 스텝 (Walk & Rock Step)", desc: "앞으로 워크 2보 → 앞 록 → 리커버" },
      { count: "25-32", move: "코스터 스텝 & 터치 (Coaster Step & Touch)", desc: "뒤 코스터 스텝 → 사이드 터치" }
    ]
  },
  {
    id: 46,
    title: "Jazz It Up (재즈 잇 업)",
    artist: "2341studios AI",
    choreographer: "Rob Fowler",
    level: 2,
    bpm: 128,
    walls: 4,
    counts: 32,
    genre: "팝",
    youtubeId: "OIGYQRofv0o",
    tutorialId: "DL41tOLjV0M",
    thumbnail: "https://img.youtube.com/vi/OIGYQRofv0o/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "셔플 & 턴 (Shuffle & Turn)", desc: "오른쪽 셔플 → 1/4 턴 → 왼쪽 셔플" },
      { count: "17-24", move: "록 스텝 & 리커버 (Rock Step & Recover)", desc: "앞 록 → 리커버 → 뒤 록 → 리커버" },
      { count: "25-32", move: "바인 & 크로스 (Vine & Cross)", desc: "오른쪽 그레이프바인 → 크로스 터치" }
    ]
  },
  {
    id: 45,
    title: "녹아버려요 (It's Melts)",
    artist: "박지현",
    choreographer: "Monica Choi, Rosa Lee & Chloe Cha",
    level: 1,
    bpm: 110,
    walls: 4,
    counts: 32,
    genre: "가요",
    youtubeId: "20uxLxU0PX0",
    tutorialId: "Y7csERIFY5w",
    thumbnail: "https://img.youtube.com/vi/20uxLxU0PX0/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "바인 & 턴 (Vine & Turn)", desc: "오른쪽 그레이프바인 → 1/4 턴" },
      { count: "17-24", move: "워크 & 록 스텝 (Walk & Rock Step)", desc: "앞으로 워크 2보 → 앞 록 → 리커버" },
      { count: "25-32", move: "힙 범프 & 터치 (Hip Bump & Touch)", desc: "힙 범프 좌우 → 사이드 터치" }
    ]
  },
  {
    id: 44,
    title: "Drink Champagne (드링크 샴페인)",
    artist: "Runaway June",
    choreographer: "Maddison Glover",
    level: 2,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "컨트리",
    youtubeId: "SiTqVYD5Ock",
    tutorialId: "OgomamOmZqo",
    thumbnail: "https://img.youtube.com/vi/SiTqVYD5Ock/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "셔플 & 록 스텝 (Shuffle & Rock Step)", desc: "오른쪽 셔플 → 앞 록 → 리커버" },
      { count: "17-24", move: "바인 & 턴 (Vine & Turn)", desc: "오른쪽 그레이프바인 → 1/4 턴" },
      { count: "25-32", move: "피봇 턴 & 터치 (Pivot Turn & Touch)", desc: "앞 스텝 → 1/2 피봇 턴 → 터치" }
    ]
  },
  {
    id: 43,
    title: "Don't Look Back (돈룩백)",
    artist: "진미령",
    choreographer: "Solbi Jeong (정솔비)",
    level: 2,
    bpm: 120,
    walls: 4,
    counts: 48,
    genre: "가요",
    youtubeId: "9OgNt6jgcB8",
    tutorialId: "tBgTbJLKoY4",
    thumbnail: "https://img.youtube.com/vi/9OgNt6jgcB8/hqdefault.jpg",

    steps: [
      { count: "1-16", move: "워크 & 턴 (Walk & Turn)", desc: "앞으로 워크 → 1/4 턴 → 사이드 스텝 → 터치" },
      { count: "17-32", move: "셔플 & 록 스텝 (Shuffle & Rock Step)", desc: "오른쪽 셔플 → 앞 록 → 리커버 → 왼쪽 셔플" },
      { count: "33-48", move: "바인 & 피봇 턴 (Vine & Pivot Turn)", desc: "오른쪽 그레이프바인 → 1/2 피봇 턴 → 터치" }
    ]
  },
  {
    id: 42,
    title: "No.9 (넘버나인)",
    artist: "티아라 (T-ara)",
    choreographer: "김덕화 (Kim Duck Hwa)",
    level: 2,
    bpm: 120,
    walls: 4,
    counts: 32,
    genre: "팝",
    youtubeId: "4BVmHK_2JKA",
    tutorialId: "ld9uTsF2FTw",
    thumbnail: "https://img.youtube.com/vi/4BVmHK_2JKA/hqdefault.jpg",

    steps: [
      { count: "1-8", move: "사이드 스텝 & 터치 (Side Step & Touch)", desc: "오른발 사이드 → 왼발 터치 → 왼발 사이드 → 오른발 터치" },
      { count: "9-16", move: "셔플 & 턴 (Shuffle & Turn)", desc: "오른쪽 셔플 → 1/4 턴 → 왼쪽 셔플" },
      { count: "17-24", move: "록 스텝 & 리커버 (Rock Step & Recover)", desc: "앞 록 → 리커버 → 뒤 록 → 리커버" },
      { count: "25-32", move: "바인 & 터치 (Vine & Touch)", desc: "오른쪽 그레이프바인 → 터치" }
    ]
  },
  {
    id: 41,
    title: "Wild West & Wicked (와일드 웨스트 앤 위키드)",
    artist: "DJTEXX",
    choreographer: "Rob Fowler",
    level: 2,
    bpm: 128,
    walls: 2,
    counts: 64,
    genre: "팝",
    youtubeId: "exKKMmWIEZM",
    tutorialId: "ku6dH33Sbe8",
    thumbnail: "https://img.youtube.com/vi/exKKMmWIEZM/hqdefault.jpg",

    steps: [
      { count: "1-16", move: "워크 & 턴 (Walk & Turn)", desc: "앞으로 워크 → 1/4 턴 → 사이드 스텝 → 터치" },
      { count: "17-32", move: "셔플 & 록 스텝 (Shuffle & Rock Step)", desc: "오른쪽 셔플 → 앞 록 → 리커버 → 왼쪽 셔플" },
      { count: "33-48", move: "바인 & 크로스 (Vine & Cross)", desc: "오른쪽 그레이프바인 → 크로스 터치 → 왼쪽 바인" },
      { count: "49-64", move: "스웨이 & 피봇 턴 (Sway & Pivot Turn)", desc: "힙 스웨이 좌우 → 1/2 피봇 턴 → 터치" }
    ]
  },
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
    tutorialId: "vO9WPd40PtU",
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
    tutorialId: "re_lgW4CSNs",
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
    tutorialId: "7t8qe1b01LE",
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
    tutorialId: "e5oSrMXFdE0",
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
    tutorialId: "W908j4tvkEI",
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
    tutorialId: "zLgXSQdHDrk",
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
    tutorialId: "5k4bA9q7siY",
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
    tutorialId: "kVYaRg6F4zY",
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
    tutorialId: "PGHjivYsjXY",
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
    tutorialId: "BhTZodwkgtk",
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
    tutorialId: "5YI_TIcQPiY",
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
    tutorialId: "SOKBumxA4HA",
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
    tutorialId: "lr-cVXCTLv0",
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
    tutorialId: "KUmv0UTBDCs",
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
    tutorialId: "Kjsw0GICbjs",
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
    tutorialId: "UnAz5RlO8mk",
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
    tutorialId: "WcRHocnjpj0",
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
    tutorialId: "1ABEA6IDdp0",
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
    tutorialId: "mOfxU8C0E7Q",
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
    tutorialId: "eeM4yYceUAI",
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
    tutorialId: "wmZ86mefHPY",
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
    tutorialId: "f1fkdOUzKxg",
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
    tutorialId: "zFksgxdFXrw",
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
    tutorialId: "mm2KpMXEzFg",
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
    tutorialId: "8jgnB06dPgY",
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
    tutorialId: "rN1ZRLwdyWE",
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
// 📅 곡별 등록일 & 수업장소 매핑
// location: 'kolon' = 코오롱 스포렉스, 'sindun' = 중리 행정복지센터, 'both' = 양쪽 모두
// 각 장소별로 가장 최근 날짜의 곡이 자동으로 "이번주 수업곡"이 됩니다.
// ============================================================
const songSchedule = {
  // === 코오롱 전용 ===
  60: { date: '2026-04-20', location: 'kolon' },  // Moonbay Rumba (문베이 룸바)
  55: { date: '2026-04-17', location: 'kolon' },  // Electro Shake
  54: { date: '2026-04-07', location: 'kolon' },  // 돌아와요 부산항에
  53: { date: '2026-04-02', location: 'kolon' },  // Funky Groove
  42: { date: '2026-04-02', location: 'both' },   // No.9
  10: { date: '2026-03-10', location: 'kolon' },   // Everyone Needs a Hero

  // === 중리 행정복지센터 전용 (밴드 게시물 기반) ===
  58: { date: '2026-04-23', location: 'sindun' },    // Delight (★ 이번주 수업곡 - 중리)
  57: { date: '2026-04-23', location: 'both' },      // Accept (★ 이번주 수업곡 - 코오롱 / 중리 재학습)
  56: { date: '2026-04-09', location: 'sindun' },    // Love at First Sight (★ 이번주 수업곡 - 중리)
  52: { date: '2026-03-26', location: 'sindun' },    // Disco Pizza
  43: { date: '2026-03-26', location: 'both' },       // Don't Look Back (★ 이번주 수업곡 - 코오롱 / 중리 수업곡)
  44: { date: '2026-03-05', location: 'sindun' },   // Drink Champagne
  45: { date: '2026-02-03', location: 'sindun' },   // 녹아버려요 (It's Melts)
  46: { date: '2026-01-20', location: 'sindun' },   // Jazz It Up
  47: { date: '2026-01-06', location: 'sindun' },   // Rhythm
  48: { date: '2025-12-13', location: 'sindun' },   // Hillbilly Disco
  49: { date: '2025-11-28', location: 'sindun' },   // 하늘땅 별땅
  50: { date: '2025-10-11', location: 'sindun' },   // Ghost Train
  51: { date: '2025-10-04', location: 'sindun' },   // 날보러와요

  // === 양쪽 모두 (코오롱 + 중리) ===
  41: { date: '2026-03-12', location: 'both' },     // Wild West & Wicked
  1: { date: '2026-03-02', location: 'both' },      // Why
  6: { date: '2026-01-27', location: 'both' },      // Love Potion 666
  2: { date: '2026-02-24', location: 'both' },      // 정말 잘해왔어
  4: { date: '2026-02-10', location: 'both' },      // 오늘밤에 만나요
  3: { date: '2026-02-17', location: 'both' },      // This Is My Life
  8: { date: '2026-01-13', location: 'both' },      // Rose Garden (우연히)
  11: { date: '2025-12-30', location: 'both' },     // Samba Do Brasil
  12: { date: '2025-12-23', location: 'both' },     // Turn It Up
  13: { date: '2025-12-16', location: 'both' },     // Like an Indian Doll
  14: { date: '2025-12-09', location: 'both' },     // 복세편살
  15: { date: '2025-12-02', location: 'both' },     // Save Me
  16: { date: '2025-11-25', location: 'both' },     // News
  18: { date: '2025-11-11', location: 'both' },     // Let's Dance With the Music
  21: { date: '2025-10-21', location: 'both' },     // Cha Cha Tango
  22: { date: '2025-10-14', location: 'both' },     // Dreams of Rio

  // === 코오롱 전용 ===
  5: { date: '2026-02-03', location: 'kolon' },     // Dangerous
  7: { date: '2026-01-20', location: 'kolon' },     // Havana Cha
  9: { date: '2026-01-06', location: 'kolon' },     // Just a Kiss
  17: { date: '2025-11-18', location: 'kolon' },    // 후회없는 춤
  19: { date: '2025-11-04', location: 'kolon' },    // Love Rumba
  20: { date: '2025-10-28', location: 'kolon' },    // Casablanca 2025
  23: { date: '2025-10-07', location: 'kolon' },    // La Noche Mia
  24: { date: '2025-09-30', location: 'kolon' },    // 푸른시절
  25: { date: '2025-09-23', location: 'kolon' },    // 주시고
  26: { date: '2025-09-16', location: 'kolon' },    // 사랑찾아 인생찾아
  27: { date: '2025-09-09', location: 'kolon' },    // DA Bomb
  28: { date: '2025-09-02', location: 'kolon' },    // Woman in Love 2025
  29: { date: '2025-08-26', location: 'kolon' },    // 보고싶다 내사랑
  30: { date: '2025-08-19', location: 'kolon' },    // 썸머타임
  31: { date: '2025-08-12', location: 'kolon' },    // Zumma Dance
  32: { date: '2025-08-05', location: 'kolon' },    // 아직도 어두운 밤인가봐
  33: { date: '2025-07-29', location: 'kolon' },    // 편지
  34: { date: '2025-07-22', location: 'kolon' },    // Womanizer
  35: { date: '2025-07-15', location: 'kolon' },    // Let's Get Loud
  36: { date: '2025-07-08', location: 'kolon' },    // 가로세로
  37: { date: '2025-07-01', location: 'kolon' },    // Pick Me Up
  38: { date: '2025-06-24', location: 'kolon' },    // Love Disco Remix
  39: { date: '2025-06-17', location: 'kolon' },    // 송인
  40: { date: '2025-06-10', location: 'kolon' },    // Dance Jockey Remix
};

// 📋 코오롱 스포렉스 영상 순서 (수업 순서대로)
const kolonOrder = [
  57,  // Accept (체념) (이번주 수업곡)
  60,  // Moonbay Rumba (문베이 룸바)
  55,  // Electro Shake
  54,  // 돌아와요 부산항에
  53,  // Funky Groove
  42,  // No.9
  43,  // Don't Look Back
  41,  // Wild West & Wicked
  10,  // Everyone Needs a Hero
  1,   // Why
  6,   // Love Potion 666
  2,   // 정말 잘해왔어
  4,   // 오늘밤에 만나요
  3,   // This Is My Life
  5,   // Dangerous
  7,   // Havana Cha
  8,   // Rose Garden (우연히)
  9,   // Just a Kiss
  11,  // Samba Do Brasil
  12,  // Turn It Up
  13,  // Like an Indian Doll
  14,  // 복세편살
  15,  // Save Me
  16,  // News
  17,  // 후회없는 춤
  18,  // Let's Dance With the Music
  19,  // Love Rumba
  20,  // Casablanca 2025
  21,  // Cha Cha Tango
  22,  // Dreams of Rio
  23,  // La Noche Mia
  24,  // 푸른시절
  25,  // 주시고
  26,  // 사랑찾아 인생찾아
  27,  // DA Bomb
  28,  // Woman in Love 2025
  29,  // 보고싶다 내사랑
  30,  // 썸머타임
  31,  // Zumma Dance
  32,  // 아직도 어두운 밤인가봐
  33,  // 편지
  34,  // Womanizer
  35,  // Let's Get Loud
  36,  // 가로세로
  37,  // Pick Me Up
  38,  // Love Disco Remix
  39,  // 송인
  40,  // Dance Jockey Remix
];

// 📋 중리 행정복지센터 영상 순서 (수업 순서대로)
const sindunOrder = [
  58,  // Delight (환희) (이번주 수업곡)
  57,  // 0. Accept (체념) (이번주 수업곡)
  56,  // 1. Love at First Sight (이번주 수업곡)
  42,  // 2. No.9 넘버나인
  52,  // 3. 디스코 피자
  43,  // 2. 돈 룩 백
  41,  // 3. 와일드 웨스트 앤
  44,  // 4. 드링크 샴페인
  1,   // 4. 와이
  45,  // 5. 녹여버려요
  6,   // 6. 러브 포션 666
  2,   // 7. 정말잘해왔어
  4,   // 8. 오늘밤에 만나요
  3,   // 9. 디스 이즈 마이 라이프
  46,  // 10. 재즈 잇 업 라인댄스
  47,  // 11. 리듬 라인댄스
  8,   // 12. 우연히
  16,  // 13. 뉴스
  11,  // 14. 삼바 드 브라질
  12,  // 15. 턴 잇 업
  13,  // 16. 라이크 언 인디안 인형
  14,  // 17. 복세편살
  15,  // 18. 세이브 미
  18,  // 19. 음악과 함께 춤을 추자
  48,  // 20. 힐 빌리 디스코 라인댄스
  49,  // 21. 하늘땅 별땅
  22,  // 22. 드림오브리오
  50,  // 23. 고스트 트레인
  51,  // 24. 날보러와요
  21,  // 25. 차차 탱고
];

// 🔄 장소별 최신 곡 자동 계산
function getLatestDateForLocation(loc) {
  const dates = Object.entries(songSchedule)
    .filter(([, info]) => info.location === loc || info.location === 'both')
    .map(([, info]) => info.date);
  return dates.sort().reverse()[0] || '';
}

const latestByLocation = {
  kolon: getLatestDateForLocation('kolon'),
  sindun: getLatestDateForLocation('sindun'),
};

// ⚠️ [안전장치 1] 스케줄 누락 데이터 경고 (개발자 콘솔)
rawSongs.forEach(s => {
  if (!songSchedule[s.id]) {
    console.warn(`[주의] 곡 ID ${s.id} ('${s.title}')의 스케줄 데이터가 songSchedule에 누락되었습니다. 화면에 노출되지 않도록 unassigned 처리됩니다.`);
  }
});

const processedSongs = rawSongs.map(s => {
  // 🛡️ [안전장치 2] 누락 데이터 발생 시 'both' 대신 'unassigned'로 자동 격리 처리
  const schedule = songSchedule[s.id] || { date: '2025-01-01', location: 'unassigned' };
  const isThisWeekKolonFlag = (schedule.location === 'kolon' || schedule.location === 'both') && schedule.date === latestByLocation.kolon;
  const isThisWeekSindunFlag = (schedule.location === 'sindun' || schedule.location === 'both') && schedule.date === latestByLocation.sindun;

  return {
    ...s,
    addedDate: schedule.date,
    location: schedule.location,
    youtubeId: s.youtubeId,
    thumbnail: s.thumbnail,
    tutorialId: s.tutorialId,
    isThisWeekKolon: isThisWeekKolonFlag,
    isThisWeekSindun: isThisWeekSindunFlag,
    // 하위 호환: 전체 기준 최신
    isThisWeek: schedule.date === Math.max(latestByLocation.kolon, latestByLocation.sindun) ? true : false,
  };

});

// 유틸 함수: 장소별 이번주 곡 가져오기
export function getThisWeekSong(locationId) {
  if (locationId === 'kolon') {
    return processedSongs.find(s => s.isThisWeekKolon) || processedSongs[0];
  }
  if (locationId === 'sindun') {
    return processedSongs.find(s => s.isThisWeekSindun) || processedSongs[0];
  }
  // 기본값: 전체에서 가장 최신
  return processedSongs.find(s => s.isThisWeek) || processedSongs[0];
}

// 유틸 함수: 장소별 곡 필터
export function getSongsForLocation(locationId) {
  if (!locationId) return processedSongs;
  const filtered = processedSongs.filter(s =>
    s.location === locationId || s.location === 'both'
  );
  
  // 코오롱 스포렉스: kolonOrder 순서대로 정렬
  if (locationId === 'kolon') {
    const orderMap = new Map(kolonOrder.map((id, idx) => [id, idx]));
    return [...filtered].sort((a, b) => {
      const aIdx = orderMap.has(a.id) ? orderMap.get(a.id) : 9999;
      const bIdx = orderMap.has(b.id) ? orderMap.get(b.id) : 9999;
      return aIdx - bIdx;
    });
  }

  // 중리 행정복지센터: sindunOrder 순서대로 정렬
  if (locationId === 'sindun') {
    const orderMap = new Map(sindunOrder.map((id, idx) => [id, idx]));
    return [...filtered].sort((a, b) => {
      const aIdx = orderMap.has(a.id) ? orderMap.get(a.id) : 9999;
      const bIdx = orderMap.has(b.id) ? orderMap.get(b.id) : 9999;
      return aIdx - bIdx;
    });
  }
  return filtered;
}

export default processedSongs;
