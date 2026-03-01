// 라인댄스 안무곡 데이터
const songs = [
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
    thumbnail: "https://img.youtube.com/vi/cmJiGKTb6v4/mqdefault.jpg",
    isThisWeek: true,
    steps: [
      { count: "1-8", move: "V 스텝 & 차차 (V Step & Cha Cha)", desc: "오른발 앞 대각선 → 왼발 앞 대각선 → 오른발 뒤 → 왼발 모아 → 차차차" },
      { count: "9-16", move: "셔플 & 록 스텝 (Shuffle & Rock Step)", desc: "오른쪽 셔플 → 앞 록 → 리커버" },
      { count: "17-24", move: "셔플 & 턴 (Shuffle & Turn)", desc: "왼쪽 셔플 → 1/2 피봇 턴" },
      { count: "25-32", move: "사이드 터치 & 크로스 (Side Touch & Cross)", desc: "오른발 사이드 터치 → 왼발 사이드 터치 → 크로스 스텝" }
    ]
  }
];

export default songs;
