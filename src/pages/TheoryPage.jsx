import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue, set, remove, push } from 'firebase/database';
import { db, authReady } from '../lib/firebase';
import { todayLocal } from '../context/DataContext';
import './VideoPage.css';

const jive375Data = [
  {
    id: '375_1',
    title: 'International Jive Technique',
    choreographer: '',
    genre: '자이브',
    mainVideoId: 'NYS5m4T9jw0',
  },
  {
    id: '375_2',
    title: 'Jive Tutorial: Kicks and Flicks',
    choreographer: '',
    genre: '자이브',
    mainVideoId: '0S-yMpfzurY',
  },
  {
    id: '375_3',
    title: 'Beginner International Jive Solo Practice Routine',
    choreographer: '',
    genre: '자이브',
    mainVideoId: 'CkGNQOWZRBo',
  },
  {
    id: '375_4',
    title: 'Advanced Jive Kick Combo | International Jive Practice Routine',
    choreographer: '',
    genre: '자이브',
    mainVideoId: 'shyvzAnA-yc',
  },
  {
    id: '375_5',
    title: 'Advanced International Jive Solo Practice Routine | 375 Dance Studio Tutorial',
    choreographer: '',
    genre: '자이브',
    mainVideoId: 'bBf0W_sLWog',
  },
  {
    id: '375_6',
    title: 'Jive Technique - Basic Dance Steps - Body Action in Jive',
    choreographer: 'Oleg Astakhov',
    genre: '자이브',
    mainVideoId: 'qI018B3Uyug',
  }
];

// 📚 자이브 57개 동작 데이터 + 유튜브 영상 매핑
const jiveData = [
  // ===== 초급 (크루즈) =====
  {n:1,t:"팔러웨이 락",e:"Fallaway Rock",d:"파트너와 V자로 물러나며 락 스텝",lv:"beginner",feel:"파트너와 함께 V자로 살짝 벌어지며 뒤로 물러나는 동작",count:"QQ QaQ QaQ",steps:["1-2: 왼발 뒤로 락 → 오른발 리커버","3&4: 샤세 (왼쪽)","5&6: 샤세 (오른쪽)"],tip:"뒤로 물러날 때 파트너와의 텐션(연결감)을 유지하세요"},
  {n:2,t:"팔러웨이 쓰로우웨이",e:"Fallaway Throwaway",d:"여성을 밖으로 밀어 오픈 포지션 전환",lv:"beginner",feel:"여성을 '툭 던지듯' 밖으로 밀어내어 오픈을 만드는 동작",count:"QQ QaQ QaQ",steps:["1-2: 폴어웨이 락 스텝","3&4: 남성 샤세 + 여성을 밖으로","5&6: 오픈 포지션 샤세"],tip:"팔이 아닌 몸 전체의 리드를 사용하세요"},
  {n:3,t:"링크 & 링크 락",e:"Link",d:"오픈→클로즈드 포지션으로 다시 연결",lv:"beginner",feel:"떨어져 있던 두 사람이 서로 당기며 다시 연결",count:"QQ QaQ QaQ",steps:["1-2: 오픈 포지션 락 스텝","3&4: 샤세하며 서로 당겨옴","5&6: 클로즈드 포지션 완성"],tip:"락 스텝의 탄력을 이용해 자연스럽게 당기세요"},
  {n:4,t:"체인지 오브 플레이스 R to L",e:"Change of Places R→L",d:"우→좌 언더암 턴 자리바꿈",lv:"beginner",feel:"남성이 왼손을 올려 여성을 팔 아래로 통과시키는 자리바꿈",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3&4: 왼손 올려 여성 팔 아래 통과","5&6: 샤세로 자리바꿈 완성"],tip:"여성의 턴 경로를 방해하지 마세요"},
  {n:5,t:"체인지 오브 플레이스 L to R",e:"Change of Places L→R",d:"좌→우 리드 턴 자리바꿈",lv:"beginner",feel:"4번의 반대 방향 — 좌→우로 턴",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3&4: 여성을 좌에서 우로 리드","5&6: 샤세로 자리바꿈 완성"],tip:"4번→5번 연속 연습하면 감각이 빨리 잡힙니다"},
  {n:6,t:"아메리칸 스핀 ×2",e:"American Spin",d:"여성 제자리 스핀 2회",lv:"beginner",feel:"여성이 팽이처럼 제자리 스핀을 2회 도는 화려한 동작",count:"QQ QaQ QaQ (×2)",steps:["1-2: 락 스텝","3&4: 여성 우회전 스핀 리드","5&6: 샤세로 안정","위를 2회 반복"],tip:"스핀 시 머리(스팟팅)를 먼저 돌리면 어지럽지 않습니다"},
  {n:7,t:"비하인드 백",e:"Change of Hands Behind Back",d:"등 뒤로 손 바꿔 잡으며 자리 교차",lv:"beginner",feel:"등 뒤로 손을 바꿔 잡으며 세련되게 자리를 교차",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3&4: 등 뒤에서 손 바꿔 잡기","5&6: 샤세로 자리바꿈"],tip:"허리를 살짝 틀면 더 자연스럽습니다"},
  {n:8,t:"워크",e:"The Walks",d:"나란히 바운스하며 경쾌하게 걷기",lv:"beginner",feel:"나란히 서서 무릎 바운스를 주며 경쾌하게 걷기",count:"S S S S",steps:["1~4: 오→왼→오→왼 차례로 앞으로"],tip:"무릎을 살짝 구부려 바운스감을 주세요"},
  // ===== 중급 (매니아파티) =====
  {n:9,t:"휩",e:"Whip",d:"채찍처럼 여성을 당겨 1회전",lv:"silver",feel:"여성을 깊게 당겨 채찍처럼 빠르게 1회전 우회전",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3&4: 여성 1회전 우회전","5&6: 샤세 마무리"],tip:"중심을 낮추고 프레임을 단단하게!",memo:"(2번) 반복"},
  {n:10,t:"휩 쓰로우웨이",e:"Whip Throwaway",d:"휩 후 여성을 밖으로 밀어냄",lv:"silver",feel:"휩 1바퀴 후 여성을 밖으로 밀어보내기",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3&4: 휩 회전","5&6: 밖으로 밀어냄"],tip:"회전 모멘텀을 이용해 자연스럽게 밀어내세요"},
  {n:11,t:"스탑 & 고",e:"Stop and Go",d:"보냈다 멈추고 다시 당기는 밀당",lv:"silver",feel:"여성을 보냈다 멈춰 세운 후, 다시 당기는 밀당",count:"QQ QaQ QaQ × 2",steps:["Stop: 여성을 앞으로 보내 멈춤","Go: 다시 당겨서 원래 자리로"],tip:"프레임을 단단하게 유지해야 정확히 멈춥니다"},
  {n:12,t:"윈드밀",e:"Windmill",d:"풍차처럼 양팔 펴고 회전",lv:"silver",feel:"풍차처럼 양팔을 팽팽하게 펴고 마주 보며 회전",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3&4: 양팔 펴고 풍차 회전","5&6: 회전 완료 및 샤세"],tip:"양팔의 텐션을 일정하게 유지하세요"},
  {n:13,t:"스페니쉬 암",e:"Spanish Arms",d:"투우사처럼 팔 감싸며 회전",lv:"silver",feel:"투우사처럼 팔을 둥글게 감싸 안았다가 풀며 회전",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3&4: 팔을 머리 위로 감싸기","5&6: 풀며 여성 회전"],tip:"어깨를 내리고 우아하게 표현하세요"},
  {n:14,t:"롤링 오프 디 암",e:"Rolling off the Arm",d:"여성이 팔에 감기듯 스핀",lv:"silver",feel:"여성이 남성 팔에 감기듯 돌았다가 풀려나오며 스핀",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3&4: 팔에 감기며 회전","5&6: 풀려나오며 스핀"],tip:"무리하게 힘을 주지 마세요"},
  {n:15,t:"심플 스핀",e:"Simple Spin",d:"손 놓고 여성 프리 스핀",lv:"silver",feel:"두 손을 놓고 빠르게 제자리 프리 스핀",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3&4: 손 놓고 프리 스핀","5&6: 다시 연결"],tip:"축 발을 확실하게 세우세요"},
  {n:16,t:"컬리 휩",e:"Curly Whip",d:"나선형 턴 후 휩 연결",lv:"silver",feel:"나선형(Curly)으로 턴 후 휩으로 연결",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3&4: 컬리 턴","5&6: 휩으로 연결"],tip:"끊기지 않게 매끄럽게 연결하세요"},
  {n:17,t:"치킨 워크",e:"Chicken Walks",d:"닭처럼 톡톡 튀며 걷기",lv:"silver",feel:"닭처럼 무릎을 굽히고 발끝으로 톡톡 튀며 걷기",count:"S S S S",steps:["1~4: 오→왼→오→왼 닭 걸음"],tip:"발끝으로 톡톡 찍듯이!"},
  {n:18,t:"토 힐 스위블",e:"Toe Heel Swivels",d:"발끝·뒤꿈치 번갈아 비틀기",lv:"silver",feel:"발끝과 뒤꿈치를 번갈아 비틀어 추는 리드미컬한 발동작",count:"Q Q Q Q",steps:["1: 오른발 토","2: 오른발 힐","3: 왼발 토","4: 왼발 힐"],tip:"골반이 자연스럽게 따라가게!"},
  {n:19,t:"플릭 인투 브레이크",e:"Flicks into Break",d:"발차기 후 급정지",lv:"silver",feel:"맹수처럼 걷다가 강한 발차기 후 급정지",count:"S S S S + QQ",steps:["1-2: 스토킹 워크","3: 플릭 (발차기)","4: 브레이크 (급정지)"],tip:"스토킹은 느리게, 플릭은 폭발적으로!"},
  {n:20,t:"스윗하트",e:"Sweetheart",d:"나란히 감싸 안은 포지션에서 추는 스텝",lv:"silver",feel:"남녀가 같은 방향으로 나란히 서서 하트 모양으로 감싸 안는 포지션",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3&4: 스윗하트 포지션 진입","5&6: 포지션 유지하며 샤세"],tip:"팔이 꼬이지 않게 자연스럽게 포지션 전환하세요"},
  {n:"20'",t:"쉐도우 스토킹 워크",e:"Shadow Stalking Walk",d:"그림자처럼 앞뒤로 나란히 걷기",lv:"silver",feel:"파트너의 그림자처럼 같은 방향으로 살금살금 걷기",count:"S S S S",steps:["1~4: 파트너와 같은 방향으로 스토킹 워크"],tip:"파트너와 보폭을 맞추세요"},
  {n:21,t:"무치",e:"Mooch",d:"발을 뻗거나 차며 지그재그 이동",lv:"silver",feel:"마주 보고 발을 뻗거나 차며 지그재그로 움직이기",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3&4: 샤세 + 플릭","5&6: 반대쪽 샤세 + 플릭"],tip:"플릭은 무릎 아래에서 가볍게!"},
  // ===== 상급 A =====
  {n:22,t:"플리아 홉스",e:"Flea Hops",d:"벼룩처럼 가볍게 뛰어오르는 스텝",lv:"goldA",feel:"벼룩이 뛰듯 가볍고 빠르게 양발을 번갈아 뛰어오르기",count:"QaQ QaQ",steps:["1&2: 오른발 홉","3&4: 왼발 홉"],tip:"높이 뛰지 말고 가볍게! 볼(앞꿈치)로 착지하세요"},
  {n:23,t:"엔딩 투 스탑 & 고",e:"Ending to Stop & Go",d:"스탑 앤 고의 마무리 변형",lv:"goldA",feel:"스탑 앤 고를 끝내며 포지션 전환하는 마무리 동작",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3&4: 스탑 앤 고 피니시","5&6: 포지션 전환"],tip:"자연스러운 마무리를 위해 타이밍에 집중"},
  {n:24,t:"카타풀트",e:"Catapult",d:"투석기처럼 텐션으로 강하게 튕겨 스핀",lv:"goldA",feel:"여성을 당겼다가 투석기처럼 강하게 튕겨내어 스핀",count:"QQ QaQ QaQ",steps:["1-2: 락 (텐션 축적)","3&4: 텐션 해제, 강하게 튕겨냄","5&6: 여성 스핀 및 샤세"],tip:"당기는 힘을 점진적으로 축적 후 폭발적으로 해제"},
  {n:25,t:"숄더 스핀",e:"Shoulder Spin",d:"어깨를 밀어 연속 스핀",lv:"goldA",feel:"여성의 어깨를 살짝 밀어 연속 스핀하게 하는 고난도 동작",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3&4: 어깨 밀어 스핀","5&6: 샤세로 안정"],tip:"손바닥을 펴고 가볍게, 세게 밀지 마세요"},
  {n:26,t:"처깅",e:"Chugging",d:"기차처럼 발 끌며 뒤로 물러남",lv:"goldA",feel:"기차가 움직이듯 발을 끌며 뒤로 물러나는 코믹한 스텝",count:"QaQ QaQ",steps:["1&2: 오른발 처깅 (뒤로 끌며)","3&4: 왼발 처깅"],tip:"무릎 충분히 구부리고 기차 흉내를 내듯!"},
  {n:27,t:"로타리 지그재그",e:"Rotary Zigzag",d:"지그재그로 회전하며 이동",lv:"goldA",feel:"지그재그 패턴으로 회전하며 이동하는 역동적 스텝",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3&4: 지그재그 방향으로 회전","5&6: 반대 방향 회전"],tip:"방향 전환 시 코어를 활용하세요"},
  {n:28,t:"휩 스핀 보타포고스",e:"Whip Spin Botafogos",d:"휩과 보타포고를 결합한 스텝",lv:"goldA",feel:"삼바의 보타포고 스텝을 자이브 휩에 접목시킨 동작",count:"QQ QaQ QaQ",steps:["1-2: 휩 스핀","3&4: 보타포고 스텝","5&6: 연결 샤세"],tip:"보타포고의 힙 모션을 살려주세요"},
  {n:29,t:"플릭 크로스",e:"Flick Cross",d:"발차기 후 교차하는 스텝",lv:"goldA",feel:"강하게 플릭(발차기) 후 발을 교차시키는 동작",count:"Q Q Q Q",steps:["1: 플릭 (강한 발차기)","2: 크로스 (교차)","3: 플릭","4: 크로스"],tip:"플릭의 높이를 일정하게 유지하세요",memo:"(1번) 표시"},
  {n:30,t:"뉴욕 스프링",e:"New York Spring",d:"뉴욕 포즈에서 스프링하듯 튕기기",lv:"goldA",feel:"뉴욕 체크 포지션에서 스프링처럼 탄력 있게 튕기기",count:"QQ QaQ QaQ",steps:["1-2: 뉴욕 체크","3&4: 스프링 리커버","5&6: 샤세"],tip:"체크 포지션에서 프리한 팔 라인을 살리세요"},
  // ===== 상급 B =====
  {n:31,t:"코카콜라 1",e:"Coca Cola 1",d:"코카콜라 시리즈 첫번째 패턴",lv:"goldB",feel:"자이브의 대표적 응용 루틴 '코카콜라'의 첫 번째 패턴",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3~6: 코카콜라 패턴 1번"],tip:"코카콜라 시리즈는 순서대로 마스터하세요"},
  {n:32,t:"스위블 킥 & 브레이크",e:"Swivel Kick & Break",d:"스위블 후 킥하고 급정지",lv:"goldB",feel:"스위블로 비틀며 킥 후 브레이크(급정지)하는 강렬한 동작",count:"Q Q QQ",steps:["1: 스위블","2: 킥","3-4: 브레이크"],tip:"브레이크 시 무게를 확실히 멈추세요",memo:"(1번) 표시"},
  {n:"32'",t:"크로스 오버 백 투 킥",e:"Cross Over Back to Kick",d:"교차 후 뒤로 갔다 킥",lv:"goldB",feel:"앞으로 교차한 후 뒤로 물러나 킥하는 복합 동작",count:"QQ QaQ QaQ",steps:["1-2: 크로스 오버","3&4: 백 스텝","5&6: 킥"],tip:"교차와 킥의 연결을 부드럽게"},
  {n:33,t:"커들 워크 & 스핀",e:"Cuddle Walk & Spin",d:"안아 감고 걸으며 스핀",lv:"goldB",feel:"커들(안아 감은) 포지션에서 함께 걸은 후 스핀으로 풀기",count:"S S QQ QaQ",steps:["1-2: 커들 포지션 워크","3-4: 스핀으로 풀기"],tip:"커들 포지션에서 팔이 꼬이지 않게 주의"},
  {n:34,t:"스프링 포인트 킥 & 스위블",e:"Spring Point Kick & Swivel",d:"스프링 후 포인트, 킥, 스위블 연결",lv:"goldB",feel:"탄력 있는 스프링 동작 후 포인트→킥→스위블 연속 기술",count:"Q Q Q Q",steps:["1: 스프링 포인트","2: 킥","3-4: 스위블"],tip:"각 동작의 포인트를 명확하게 표현하세요"},
  {n:35,t:"코카콜라 2",e:"Coca Cola 2",d:"코카콜라 시리즈 두번째 패턴",lv:"goldB",feel:"코카콜라 시리즈의 두 번째 패턴 — 더 복잡한 변형",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3~6: 코카콜라 패턴 2번"],tip:"1번 패턴을 완전히 익힌 뒤 도전하세요",memo:"콕콕 1번 표시"},
  {n:36,t:"서클링 샤세",e:"Circling Chasse",d:"원을 그리며 샤세",lv:"goldB",feel:"직선이 아닌 원형 궤적으로 샤세를 돌며 추기",count:"QaQ QaQ",steps:["1&2: 원형 궤적 샤세 (우)","3&4: 원형 궤적 샤세 (좌)"],tip:"원의 크기를 일정하게 유지하세요"},
  {n:37,t:"포킥 바레이션",e:"Fork Kick Variation",d:"포크 킥의 변형 동작",lv:"goldB",feel:"양발을 포크(갈래)처럼 벌리며 차는 변형 킥 동작",count:"Q Q Q Q",steps:["1: 포크 킥 (벌리며 차기)","2: 리커버","3-4: 바레이션 동작"],tip:"킥의 각도와 높이를 맞추세요"},
  {n:"37'",t:"백 투 킥 무치 바리에이션",e:"Back to Kick Mooch Variation",d:"뒤로 갔다 킥하는 무치 변형",lv:"goldB",feel:"뒤로 물러났다 킥하며 무치의 변형 패턴을 추기",count:"QQ QaQ QaQ",steps:["1-2: 백 스텝","3&4: 킥","5&6: 무치 바레이션"],tip:"무치의 플릭과 킥을 구분하세요"},
  {n:38,t:"사이드 패스",e:"Side Pass",d:"옆으로 스쳐 지나가는 스텝",lv:"goldB",feel:"파트너 옆을 스쳐 지나가며 자리를 바꾸는 동작",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3&4: 옆으로 패스","5&6: 새 위치에서 샤세"],tip:"스쳐 지나갈 때 리드의 텐션을 유지하세요"},
  {n:39,t:"리프 넛",e:"Rif Nut",d:"리프 넛 동작",lv:"goldB",feel:"경쾌하고 장난스러운 리프 넛 동작",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3~6: 리프 넛 패턴"],tip:"장난스러운 느낌을 살려 표현하세요",memo:"(+1번)"},
  // ===== 상급 C =====
  {n:40,t:"코카콜라 3",e:"Coca Cola 3",d:"코카콜라 시리즈 세번째 패턴",lv:"goldC",feel:"코카콜라 시리즈의 세 번째 패턴 — 고급 변형",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3~6: 코카콜라 패턴 3번"],tip:"1, 2번 패턴과의 차이점에 집중하세요",memo:"(+1번)"},
  {n:41,t:"스톡 워크 인 P.P & C.P.P",e:"Stalk Walk in PP & CPP",d:"프롬나드/카운터 포지션에서 스토킹 워크",lv:"goldC",feel:"프롬나드(PP)와 카운터 프롬나드(CPP) 포지션에서 스토킹 워크",count:"S S S S",steps:["1-2: PP 포지션 스토킹 워크","3-4: CPP 포지션 스토킹 워크"],tip:"포지션 전환 시 상체의 방향을 확실히!"},
  {n:"41'",t:"팔러웨이 드롭 포인트 메랭게 워크",e:"Fallaway Drop Point Merengue Walk",d:"폴어웨이 드롭 후 메랭게 워크",lv:"goldC",feel:"폴어웨이로 떨어지며 포인트 후 메랭게 스타일로 걷기",count:"QQ S S S S",steps:["1-2: 폴어웨이 드롭 + 포인트","3~6: 메랭게 워크"],tip:"메랭게 워크의 힙 모션을 살려주세요",memo:"(+1번)"},
  {n:42,t:"서클 워크 스톰프",e:"Circle Walk Stomp",d:"원을 그리며 걷다 발 구르기",lv:"goldC",feel:"원형으로 힘차게 걸으며 발을 쿵 구르는 동작",count:"S S S QQ",steps:["1-3: 서클 워크","4: 스톰프 (발 구르기)"],tip:"스톰프는 힘차게! 바닥을 '쿵'",memo:"(+1번)"},
  {n:43,t:"스페니쉬 암스 변형",e:"Spanish Arms Variation",d:"스페니쉬 암의 고급 변형",lv:"goldC",feel:"기본 스페니쉬 암에 추가 동작을 넣은 심화 변형",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3&4: 스페니쉬 암 변형","5&6: 마무리 샤세"],tip:"원본 스페니쉬 암을 완벽히 익힌 뒤 도전",memo:"(+1번)"},
  {n:44,t:"암링크 마이애미 스페셜",e:"Armlink Miami Special",d:"팔 걸기 후 마이애미 스페셜",lv:"goldC",feel:"팔을 걸어 연결한 후 마이애미 스페셜로 화려하게 전환",count:"QQ QaQ QaQ",steps:["1-2: 암링크 연결","3&4: 마이애미 스페셜 동작","5&6: 자리바꿈 완성"],tip:"팔을 넘길 때 여성 머리와 충분한 간격을"},
  {n:45,t:"쿼턴 스위블 & 브레이크",e:"Quarter Swivel & Break",d:"1/4 스위블 후 급정지",lv:"goldC",feel:"1/4 회전으로 스위블 후 브레이크(급정지)하는 동작",count:"Q Q QQ",steps:["1: 1/4 스위블","2: 브레이크"],tip:"스위블에서 브레이크로 즉각 전환하세요"},
  {n:46,t:"코카콜라 4",e:"Coca Cola 4",d:"코카콜라 시리즈 네번째 (동서남북)",lv:"goldC",feel:"동서남북 4방향으로 전개하는 코카콜라 시리즈의 최고봉",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝","3~6: 코카콜라 4방향 패턴"],tip:"방향 감각이 중요! 월(Wall) 개념을 확실히"},
  {n:47,t:"찰스톤 플릭",e:"Charleston Flick",d:"찰스톤 스타일의 레트로 발차기",lv:"goldC",feel:"1920년대 찰스톤 댄스의 레트로한 플릭 동작",count:"Q Q Q Q",steps:["1: 킥 포워드","2: 스텝 백","3: 킥 백","4: 스텝 포워드"],tip:"레트로 느낌을 살려 경쾌하게!"},
  // ===== 상급 D =====
  {n:48,t:"더블 치킨 워크",e:"Double Chicken Walk",d:"치킨 워크의 2배속 변형",lv:"goldD",feel:"기본 치킨 워크를 2배 빠르게 추는 고속 변형",count:"Q Q Q Q Q Q Q Q",steps:["1~8: 빠른 치킨 워크 연속"],tip:"빠르지만 동작은 선명하게 유지하세요"},
  {n:49,t:"자이브 워크 바레이션",e:"Jive Walk Variation",d:"자이브 워크의 고급 응용",lv:"goldD",feel:"기본 워크에 다양한 변형(턴, 플릭 등)을 추가한 응용",count:"S S S S",steps:["1~4: 워크 + 바레이션 동작"],tip:"기본 워크를 완벽히 한 뒤 변형을 추가하세요"},
  {n:50,t:"암 펌프",e:"Arm Pump",d:"팔을 위아래로 펌핑하는 동작",lv:"goldD",feel:"팔을 위아래로 힘차게 펌핑하며 에너지를 표현",count:"Q Q Q Q",steps:["1-2: 팔 펌프 업","3-4: 팔 펌프 다운"],tip:"팔과 다리가 함께 움직이도록 코디네이션!"},
  {n:51,t:"토 힐 스위블 바레이션",e:"Toe Heel Swivel Variation",d:"토 힐 스위블의 고급 변형",lv:"goldD",feel:"기본 토 힐 스위블에 회전이나 이동을 추가한 심화",count:"Q Q Q Q",steps:["1~4: 토힐 스위블 + 추가 동작"],tip:"기본 스위블의 무릎 유연성을 유지하면서 변형 추가"},
  {n:52,t:"인사이드 리듬 브레이크",e:"Inside Rhythm Break",d:"안쪽으로 리듬을 타며 급정지",lv:"goldD",feel:"파트너 안쪽으로 리듬을 타다 갑자기 브레이크",count:"QQ QaQ QQ",steps:["1-2: 인사이드 리듬","3&4: 샤세","5-6: 브레이크"],tip:"브레이크 전 리듬의 흐름을 충분히 살리세요"},
  {n:53,t:"코카콜라 5",e:"Coca Cola 5",d:"코카콜라 시리즈 최종 완결편",lv:"goldD",feel:"코카콜라 시리즈의 최종 완결편 — 모든 패턴의 집대성",count:"QQ QaQ QaQ",steps:["1~6: 코카콜라 최종 패턴"],tip:"1~4번 코카콜라를 모두 마스터한 뒤 도전!"},
  {n:54,t:"행글라이더",e:"Hang Glider",d:"행글라이더처럼 팔 벌려 활공하는 피니시",lv:"goldD",feel:"행글라이더가 하늘을 나는 듯 팔을 활짝 벌려 활공하는 피니시",count:"QQ QaQ QaQ",steps:["1-2: 락 스텝 + 도움닫기","3~6: 행글라이더 포즈"],tip:"피니시 포즈를 확실하게! 자신감 있는 표정으로 마무리"}
];

// 🎬 유튜브 영상 매핑 (와이트리댄스스쿨 한국어 영상)
const YT = {
  beginner_detail: 'NEJ_4j6nMk8',
  beginner_explain: '4HBAcjqElSQ',
  range_1_30: 'H8yWHnGuIYw',
  range_1_60: 'ZtuX-WU8Bog',
  range_31_60: 'Rpgc6xgYSoY',
  range_31_60_cont: 'ZvaJBL1x4Vw',
  slow_11_30: 'Gcs0qUsC2CI',
  full_73: 'boddIegv5wE',
  full_73_slow: 'FVKnAdqoMjo',
};

function getVideos(n) {
  const num = typeof n === 'string' ? parseInt(n) : n;
  if (num <= 8) return {
    main: { id: YT.beginner_detail, label: '▶ 초급 시범' },
    detail: { id: YT.beginner_explain, label: '📖 상세설명' },
    range: { id: YT.range_1_30, label: '📋 1~30번' }
  };
  if (num <= 21) return {
    main: { id: YT.range_1_30, label: '▶ 1~30번' },
    detail: { id: YT.slow_11_30, label: '🐢 슬로모션' },
    range: { id: YT.range_1_60, label: '📋 1~60번' }
  };
  if (num <= 30) return {
    main: { id: YT.range_1_30, label: '▶ 1~30번' },
    detail: { id: YT.full_73_slow, label: '🐢 슬로모션' },
    range: { id: YT.range_1_60, label: '📋 1~60번' }
  };
  if (num <= 47) return {
    main: { id: YT.range_31_60, label: '▶ 31~60번' },
    detail: { id: YT.range_31_60_cont, label: '🔄 연속동작' },
    range: { id: YT.range_1_60, label: '📋 1~60번' }
  };
  return {
    main: { id: YT.range_31_60, label: '▶ 31~60번' },
    detail: { id: YT.full_73_slow, label: '🐢 슬로모션' },
    range: { id: YT.full_73, label: '📋 전체 연속' }
  };
}

// ================================================
// 🎬 독립 YouTube 플레이어 컴포넌트
//    — useYouTubePlayer 훅으로 통합 관리
// ================================================
import useYouTubePlayer from '../components/YouTubePlayer/useYouTubePlayer';

const JiveYouTubePlayer = memo(function JiveYouTubePlayer({ videoId, onPlayerReady }) {
  const wrapperRef = useRef(null);

  const player = useYouTubePlayer({
    containerRef: wrapperRef,
    videoId,
    autoplay: true,
    playerVars: { playsinline: 1 },
    onReady: (event) => {
      if (onPlayerReady) onPlayerReady(event.target);
    },
  });

  return (
    <div className="jive-video-embed" style={{ borderRadius: '12px', maxHeight: '70vh' }}>
      <div ref={wrapperRef} />
    </div>
  );
});

// 레벨 카테고리 정보
const levelSections = [
  { id: 'beginner', title: '초급 (크루즈과정)', emoji: '🟢', count: 8, cls: 'lv-beginner' },
  { id: 'silver', title: '중급 (매니아파티 과정)', emoji: '🔵', count: 13, cls: 'lv-silver' },
  { id: 'goldA', title: '상급 A', emoji: '🟡', count: 9, cls: 'lv-goldA' },
  { id: 'goldB', title: '상급 B', emoji: '🟠', count: 11, cls: 'lv-goldB' },
  { id: 'goldC', title: '상급 C', emoji: '🟣', count: 9, cls: 'lv-goldC' },
  { id: 'goldD', title: '상급 D', emoji: '💎', count: 7, cls: 'lv-goldD' }
];

export default function TheoryPage() {
  const navigate = useNavigate();

  // 🔒 자이브 코너 입장 게이트 — 자이브 단체(카톡) 회원용 비밀번호(0402).
  //    한 번 통과하면 그 기기에서는 다시 묻지 않음(localStorage —
  //    App.jsx PRESERVE_KEYS에 등록돼 버전 인상에도 보존됨).
  const JIVE_GATE_PASSWORD = import.meta.env.VITE_JIVE_GATE_PASSWORD || '0402';
  const [jiveUnlocked, setJiveUnlocked] = useState(() => localStorage.getItem('jive-gate-ok') === '1');
  const [jiveGatePw, setJiveGatePw] = useState('');
  const [jiveGateError, setJiveGateError] = useState(false);
  const handleJiveGate = (e) => {
    e.preventDefault();
    if (jiveGatePw === JIVE_GATE_PASSWORD) {
      localStorage.setItem('jive-gate-ok', '1');
      setJiveUnlocked(true);
      setJiveGateError(false);
    } else {
      setJiveGateError(true);
    }
  };

  const [openCardId, setOpenCardId] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  // 딥링크 지원: /theory?tab=classlog 처럼 특정 서브탭으로 바로 진입
  // (카톡 등에 수업기록 링크를 공유하는 용도 — 유효하지 않은 값은 기본 탭)
  const [activeTab, setActiveTab] = useState(() => {
    const t = new URLSearchParams(window.location.search).get('tab');
    return ['sequence', '375', 'education', 'classlog'].includes(t) ? t : 'sequence';
  });

  // 🎥 자이브 단체수업 기록 — Firebase /jiveClassVideos 실시간 구독 (모든 기기 동기화)
  //    올리기/삭제는 관리자 비밀번호 게이트(등록 탭과 동일 모델), 열람은 자유.
  const [classVideos, setClassVideos] = useState([]);
  const [classUnlocked, setClassUnlocked] = useState(false);
  const [showClassForm, setShowClassForm] = useState(false);
  const [classPw, setClassPw] = useState('');
  const [classUrl, setClassUrl] = useState('');
  const [classDriveUrl, setClassDriveUrl] = useState('');
  const [classTitle, setClassTitle] = useState('');
  const [classDate, setClassDate] = useState(todayLocal());
  const [classSaving, setClassSaving] = useState(false);
  const CLASS_ADMIN_PW = import.meta.env.VITE_ADMIN_PASSWORD;

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};
    authReady.then(() => {
      if (cancelled) return;
      cleanup = onValue(ref(db, 'jiveClassVideos'), (snap) => {
        const data = snap.val() || {};
        const arr = Object.entries(data)
          .map(([key, v]) => ({ key, ...v }))
          // 수업 날짜 내림차순, 같은 날이면 나중에 올린 것 먼저
          .sort((a, b) => {
            const dc = (b.date || '').localeCompare(a.date || '');
            if (dc !== 0) return dc;
            return (b.createdAt || 0) - (a.createdAt || 0);
          });
        setClassVideos(arr);
      });
    });
    return () => { cancelled = true; cleanup(); };
  }, []);

  const getClassYoutubeId = (url) => {
    const m = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{11})/i.exec(url || '');
    return m ? m[1] : null;
  };

  // 구글 드라이브 공유 링크에서 파일 ID 추출
  // 지원: drive.google.com/file/d/{ID}/view..., drive.google.com/open?id={ID}
  const getClassDriveId = (url) => {
    const u = url || '';
    if (!/drive\.google\.com/i.test(u)) return null;
    const m = /\/file\/d\/([\w-]{20,})/.exec(u) || /[?&]id=([\w-]{20,})/.exec(u);
    return m ? m[1] : null;
  };

  const handleClassUnlock = () => {
    if (CLASS_ADMIN_PW && classPw === CLASS_ADMIN_PW) {
      setClassUnlocked(true);
      setClassPw('');
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  const handleAddClassVideo = async () => {
    const vid = getClassYoutubeId(classUrl);
    const driveId = getClassDriveId(classDriveUrl);
    if (classUrl.trim() && !vid) { alert('유튜브 링크가 올바르지 않습니다. 다시 확인해주세요.'); return; }
    if (classDriveUrl.trim() && !driveId) { alert('구글 드라이브 링크가 올바르지 않습니다.\n드라이브에서 [공유 → 링크 복사]한 주소를 붙여넣어주세요.'); return; }
    if (!vid && !driveId) { alert('유튜브 또는 구글 드라이브 링크 중 하나를 붙여넣어주세요.'); return; }
    if (vid && driveId) { alert('링크는 하나만 넣어주세요. (유튜브 또는 구글 드라이브 중 하나)'); return; }
    if (!classDate) { alert('수업 날짜를 선택해주세요.'); return; }
    setClassSaving(true);
    try {
      await set(push(ref(db, 'jiveClassVideos')), {
        ...(vid ? { videoId: vid } : { driveId }),
        title: classTitle.trim() || `자이브 단체수업 (${classDate})`,
        date: classDate,
        createdAt: Date.now(),
      });
      setClassUrl(''); setClassDriveUrl(''); setClassTitle(''); setClassDate(todayLocal());
      setShowClassForm(false);
    } catch (e) {
      console.error('수업 영상 저장 실패:', e);
      alert('저장 중 오류가 발생했습니다. 네트워크를 확인해주세요.');
    } finally {
      setClassSaving(false);
    }
  };

  const handleDeleteClassVideo = async (v) => {
    if (!confirm(`"${v.title}" 영상을 삭제하시겠습니까?`)) return;
    try {
      await remove(ref(db, `jiveClassVideos/${v.key}`));
    } catch (e) {
      console.error('수업 영상 삭제 실패:', e);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  // (댄스 큐 연결은 하단 메뉴의 독립 화면으로 이식됨 — src/pages/DanceCuePage.jsx)

  // 🔁 A-B 반복구간 상태
  const [pointA, setPointA] = useState(null);
  const [pointB, setPointB] = useState(null);
  const [abLoopActive, setAbLoopActive] = useState(false);

  // 🎮 플레이어 관리 — 독립 컴포넌트에서 올려주는 인스턴스를 여기서 받음
  const activePlayerRef = useRef(null);     // 현재 활성 YT.Player 인스턴스
  const abIntervalRef = useRef(null);       // A-B 루프 타이머 ID
  const lastSeekTimeRef = useRef(0);        // 중복 seek 방지용
  const playerScrollRef = useRef(null);     // 영상 켜질 때 정중앙으로 스크롤할 대상

  // ====================================
  // 🧹 A-B 루프 타이머 정리 (언마운트 시)
  // ====================================
  useEffect(() => {
    return () => {
      if (abIntervalRef.current) { clearInterval(abIntervalRef.current); abIntervalRef.current = null; }
    };
  }, []);

  // ====================================
  // 🎬 activeVideo 변경 → A-B 초기화
  // ====================================
  useEffect(() => {
    setPointA(null); setPointB(null); setAbLoopActive(false);
    // 주의: activePlayerRef는 여기서 null로 지우지 않는다.
    // 같은 위치에서 영상만 바뀌면 loadVideoById로 교체되어 onReady가 다시
    // 발화하지 않으므로, 지우면 A/B 버튼이 복구 불가능하게 죽는다.
    // 플레이어가 새로 마운트되면 handlePlayerReady가 알아서 갱신한다.
  }, [activeVideo?.videoId, activeVideo?.driveId, activeVideo?.cardN]);

  // ====================================
  // 🎯 영상 켜지면 화면 정중앙으로 스크롤
  //    (이전: 영상이 카드 아래/페이지 끝에 렌더돼 안 보이던 문제)
  // ====================================
  useEffect(() => {
    if (!activeVideo) return;
    const raf = requestAnimationFrame(() => {
      playerScrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    return () => cancelAnimationFrame(raf);
  }, [activeVideo?.videoId, activeVideo?.driveId, activeVideo?.cardN]);

  // ✅ 독립 컴포넌트에서 플레이어 인스턴스를 받는 콜백
  const handlePlayerReady = useCallback((player) => {
    activePlayerRef.current = player;
  }, []);

  // ====================================
  // 🔁 A-B 루프 인터벌 — seekTo(true) + 중복 seek 방지
  // ====================================
  useEffect(() => {
    if (abIntervalRef.current) {
      clearInterval(abIntervalRef.current);
      abIntervalRef.current = null;
    }
    if (abLoopActive && pointA !== null && pointB !== null) {
      abIntervalRef.current = setInterval(() => {
        try {
          const t = activePlayerRef.current?.getCurrentTime?.() || 0;
          const now = Date.now();
          if (t >= pointB && now - lastSeekTimeRef.current > 500) {
            lastSeekTimeRef.current = now;
            activePlayerRef.current?.seekTo?.(pointA, true);
          }
        } catch(e){}
      }, 250);
    }
    return () => {
      if (abIntervalRef.current) {
        clearInterval(abIntervalRef.current);
        abIntervalRef.current = null;
      }
    };
  }, [abLoopActive, pointA, pointB]);

  // ====================================
  // 🛠 A-B 유틸 함수들
  // ====================================
  const getCurrentTime = () => {
    try { return activePlayerRef.current?.getCurrentTime?.() || 0; } catch(e) { return 0; }
  };
  const formatTime = (sec) => {
    if (sec == null) return '--:--';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };
  const handleSetA = () => {
    const t = getCurrentTime();
    setPointA(t);
    // B점이 무효화되면 루프 활성 표시(배지)도 함께 꺼야 상태가 일치한다
    if (pointB !== null && t >= pointB) { setPointB(null); setAbLoopActive(false); }
  };
  const handleSetB = () => {
    const t = getCurrentTime();
    if (pointA !== null && t > pointA) {
      setPointB(t);
      setAbLoopActive(true);
    }
  };
  const handleClearAB = () => {
    setPointA(null); setPointB(null); setAbLoopActive(false);
    if (abIntervalRef.current) {
      clearInterval(abIntervalRef.current);
      abIntervalRef.current = null;
    }
  };

  const toggleCard = (n) => {
    setOpenCardId(openCardId === n ? null : n);
    setActiveVideo(null);
  };

  const playVideo = (cardN, videoId, e) => {
    e.stopPropagation();
    if (activeVideo && activeVideo.cardN === cardN && activeVideo.videoId === videoId) {
      setActiveVideo(null);
    } else {
      setActiveVideo({ cardN, videoId });
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  // 🔒 비밀번호를 아직 통과하지 못했으면 게이트 화면만 표시
  if (!jiveUnlocked) {
    return (
      <div style={{ fontFamily: "'Noto Sans KR', sans-serif", color: '#e8e8f0', padding: '40px 16px', maxWidth: '440px', margin: '0 auto' }}>
        <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: '16px', padding: '28px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>🔒</div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 6px' }}>자이브 방</h2>
          <p style={{ fontSize: '.85rem', color: '#a0a0c0', margin: '0 0 18px', lineHeight: 1.6 }}>
            자이브 회원 전용 공간입니다.<br />비밀번호를 입력해 주세요.
          </p>
          <form onSubmit={handleJiveGate} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="password"
              inputMode="numeric"
              placeholder="비밀번호 입력"
              value={jiveGatePw}
              onChange={(e) => { setJiveGatePw(e.target.value); setJiveGateError(false); }}
              autoFocus
              style={{
                width: '100%', padding: '14px', borderRadius: '12px',
                border: `1px solid ${jiveGateError ? '#ef4444' : 'rgba(255,255,255,0.15)'}`,
                background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '1.1rem',
                textAlign: 'center', letterSpacing: '0.3em', outline: 'none', boxSizing: 'border-box',
              }}
            />
            {jiveGateError && (
              <div style={{ fontSize: '.8rem', color: '#ef4444' }}>비밀번호가 올바르지 않습니다.</div>
            )}
            <button
              type="submit"
              style={{
                width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
                background: 'var(--primary-color, #ef4444)', color: '#fff',
                fontSize: '1rem', fontWeight: 800, cursor: 'pointer',
              }}
            >들어가기</button>
          </form>
          <p style={{ fontSize: '.75rem', color: '#777', margin: '14px 0 0' }}>
            한 번 입력하면 이 기기에서는 다시 묻지 않습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="jive-container">
      <style>{`
        .jive-container { font-family: 'Noto Sans KR', sans-serif; color: #e8e8f0; padding: 0 16px calc(120px + env(safe-area-inset-bottom)); box-sizing: border-box; position: relative; z-index: 0; isolation: isolate; max-width: 800px; margin: 0 auto; }
        .jive-container * { box-sizing: border-box; }
        /* 🔙 상단 고정 네비바 */
        .jive-topnav { position: sticky; top: 0; z-index: 50; display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: rgba(10,10,15,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,.08); margin: -16px -16px 16px -16px; }
        .jive-topnav-btn { display: inline-flex; align-items: center; gap: 4px; padding: 8px 14px; border-radius: 10px; font-size: .82rem; font-weight: 700; border: 1px solid rgba(255,255,255,.12); cursor: pointer; transition: all .2s; background: rgba(255,255,255,.06); color: #e8e8f0; -webkit-tap-highlight-color: transparent; }
        .jive-topnav-btn:active { transform: scale(.93); background: rgba(255,255,255,.12); }
        .jive-topnav-title { flex: 1; text-align: center; font-size: .85rem; font-weight: 700; color: #a0a0c0; }
        /* 🎬 플로팅 영상 닫기 버튼 */
        .jive-float-close { position: fixed; bottom: calc(80px + env(safe-area-inset-bottom)); right: 16px; z-index: 200; width: 56px; height: 56px; border-radius: 50%; background: rgba(239,68,68,0.9); color: #fff; border: 2px solid rgba(255,255,255,.3); font-size: 1.4rem; font-weight: 900; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 20px rgba(239,68,68,0.4); -webkit-tap-highlight-color: transparent; animation: jive-pulse 2s infinite; }
        .jive-float-close:active { transform: scale(.9); }
        @keyframes jive-pulse { 0%,100% { box-shadow: 0 4px 20px rgba(239,68,68,0.4); } 50% { box-shadow: 0 4px 30px rgba(239,68,68,0.7); } }
        .jive-header { text-align: center; padding: 32px 16px; background: linear-gradient(135deg, #1a1a2e, #16213e); border-radius: 20px; margin-bottom: 24px; border: 1px solid rgba(255,255,255,.08); }
        .jive-header h1 { font-size: 1.6rem; font-weight: 900; background: linear-gradient(135deg, #f7d794, #f19066); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 8px; margin-top: 0; }
        .jive-subtitle { font-size: .85rem; color: #a0a0c0; line-height: 1.6; }
        .jive-count-badge { display: inline-block; background: rgba(247,215,148,.15); color: #f7d794; padding: 4px 14px; border-radius: 20px; font-size: .8rem; font-weight: 600; margin-top: 10px; }
        .jive-global-btns { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 16px; }
        .jive-global-btn { display: inline-flex; align-items: center; justify-content: center; gap: 4px; padding: 10px 6px; border-radius: 12px; font-size: .75rem; font-weight: 700; border: 1px solid rgba(255,255,255,.1); cursor: pointer; transition: all .3s; background: none; text-align: center; white-space: nowrap; }
        .jive-global-btn:active { transform: scale(.95); }
        .jive-global-btn.red { background: rgba(239,68,68,.12); color: #f87171; border-color: rgba(239,68,68,.2); }
        .jive-global-btn.blue { background: rgba(99,102,241,.12); color: #818cf8; border-color: rgba(99,102,241,.2); }
        .jive-global-btn.green { background: rgba(16,185,129,.12); color: #6ee7b7; border-color: rgba(16,185,129,.2); }
        .jive-global-btn.orange { background: rgba(249,115,22,.12); color: #fb923c; border-color: rgba(249,115,22,.2); }
        .jive-section { margin-bottom: 28px; }
        .jive-section-title { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 14px; margin-bottom: 14px; border: 1px solid rgba(255,255,255,.1); }
        .jive-emoji { font-size: 1.3rem; }
        .jive-section-title h2 { font-size: 1.1rem; font-weight: 700; color: #e8e8f0; margin: 0; }
        .jive-badge { font-size: .75rem; color: #a0a0c0; background: rgba(255,255,255,.06); padding: 2px 10px; border-radius: 20px; margin-left: auto; }
        .lv-beginner { background: linear-gradient(135deg, rgba(16,185,129,.1), rgba(16,185,129,.03)); border-color: rgba(16,185,129,.15) !important; }
        .lv-silver { background: linear-gradient(135deg, rgba(99,102,241,.1), rgba(99,102,241,.03)); border-color: rgba(99,102,241,.15) !important; }
        .lv-goldA { background: linear-gradient(135deg, rgba(245,158,11,.1), rgba(245,158,11,.03)); border-color: rgba(245,158,11,.15) !important; }
        .lv-goldB { background: linear-gradient(135deg, rgba(239,68,68,.08), rgba(239,68,68,.02)); border-color: rgba(239,68,68,.12) !important; }
        .lv-goldC { background: linear-gradient(135deg, rgba(168,85,247,.08), rgba(168,85,247,.02)); border-color: rgba(168,85,247,.12) !important; }
        .lv-goldD { background: linear-gradient(135deg, rgba(236,72,153,.08), rgba(236,72,153,.02)); border-color: rgba(236,72,153,.12) !important; }
        .jive-card { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 16px; margin-bottom: 10px; overflow: hidden; transition: all .3s; position: relative; z-index: 0; }
        .jive-card-header { padding: 14px 16px; cursor: pointer; display: flex; align-items: center; gap: 12px; }
        .jive-card-num { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: .75rem; font-weight: 700; flex-shrink: 0; }
        .beginner .jive-card-num { background: rgba(16,185,129,.15); color: #10b981; }
        .silver .jive-card-num { background: rgba(99,102,241,.15); color: #818cf8; }
        .goldA .jive-card-num { background: rgba(245,158,11,.15); color: #f59e0b; }
        .goldB .jive-card-num { background: rgba(239,68,68,.12); color: #f87171; }
        .goldC .jive-card-num { background: rgba(168,85,247,.12); color: #a855f7; }
        .goldD .jive-card-num { background: rgba(236,72,153,.12); color: #ec4899; }
        .jive-card-info { flex: 1; min-width: 0; }
        .jive-card-info h3 { font-size: .95rem; font-weight: 700; margin: 0 0 2px 0; color: #fff; }
        .jive-card-info p { font-size: .76rem; color: #a0a0c0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0; }
        .jive-arrow { width: 20px; height: 20px; color: #666; transition: transform .3s; flex-shrink: 0; }
        .jive-card.open .jive-arrow { transform: rotate(180deg); color: #fff; }
        .jive-card-body { max-height: 0; overflow: hidden; transition: max-height .5s ease; }
        .jive-card.open .jive-card-body { max-height: 1200px; }
        .jive-card-body-inner { padding: 0 16px 16px; border-top: 1px solid rgba(255,255,255,.06); }
        .jive-feel { margin-top: 12px; padding: 10px 14px; background: rgba(247,215,148,.06); border-left: 3px solid #f7d794; border-radius: 0 10px 10px 0; font-size: .83rem; color: #f0e0b0; line-height: 1.6; }
        .jive-count-info { margin-top: 10px; padding: 8px 12px; background: rgba(255,255,255,.03); border-radius: 10px; font-size: .82rem; color: #c0c0d8; }
        .jive-count-info strong { color: #818cf8; }
        .jive-steps { margin-top: 10px; padding: 10px 14px; background: rgba(255,255,255,.03); border-radius: 10px; }
        .jive-steps div { font-size: .82rem; line-height: 1.9; color: #d0d0e8; }
        .jive-steps .num { color: #f19066; font-weight: 700; margin-right: 6px; }
        .jive-tip { margin-top: 10px; padding: 10px 14px; background: rgba(16,185,129,.06); border-radius: 10px; font-size: .82rem; color: #6ee7b7; line-height: 1.6; }
        .jive-tip::before { content: '💡 '; }
        .jive-memo { margin-top: 6px; padding: 6px 12px; background: rgba(99,102,241,.08); border-radius: 8px; font-size: .78rem; color: #a5b4fc; }
        .jive-memo::before { content: '📝 '; }
        .jive-video-btns { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
        .jive-vbtn { display: inline-flex; align-items: center; gap: 4px; padding: 7px 12px; border-radius: 10px; font-size: .78rem; font-weight: 600; cursor: pointer; transition: all .3s; border: none; touch-action: manipulation; }
        .jive-vbtn:active { transform: scale(.95); }
        .jive-vbtn.primary { background: rgba(239,68,68,.15); color: #f87171; }
        .jive-vbtn.secondary { background: rgba(99,102,241,.12); color: #a5b4fc; }
        .jive-vbtn.tertiary { background: rgba(16,185,129,.1); color: #6ee7b7; }
        .jive-video-embed { margin-top: 10px; border-radius: 12px; overflow: hidden; position: relative; z-index: 0; isolation: isolate; width: 100%; aspect-ratio: 16/9; padding-bottom: 56.25%; background: #000; }
        @supports (aspect-ratio: 16/9) { .jive-video-embed { padding-bottom: unset; } }
        .jive-video-embed iframe { position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; border: none !important; z-index: 0; }
        .jive-video-close-inline { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 8px; padding: 10px 0; background: rgba(239,68,68,.12); border: 1px solid rgba(239,68,68,.25); border-radius: 10px; color: #f87171; font-size: .85rem; font-weight: 700; cursor: pointer; width: 100%; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
        .jive-video-close-inline:active { background: rgba(239,68,68,.25); transform: scale(.97); }
        /* 🔁 A-B 반복구간 컨트롤 */
        .jive-ab-panel { margin-top: 8px; padding: 12px; background: linear-gradient(135deg, #1a1a2e, #16213e); border-radius: 12px; border: 1px solid rgba(255,255,255,.08); }
        .jive-ab-row { display: flex; gap: 8px; align-items: center; justify-content: center; flex-wrap: wrap; }
        .jive-ab-btn { padding: 9px 14px; border-radius: 10px; font-size: .8rem; font-weight: 700; cursor: pointer; border: none; transition: all .2s; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
        .jive-ab-btn:active { transform: scale(.93); }
        .jive-ab-btn.a-btn { background: rgba(255,107,138,.15); color: #ff6b8a; border: 1px solid rgba(255,107,138,.25); }
        .jive-ab-btn.b-btn { background: rgba(78,205,196,.15); color: #4ecdc4; border: 1px solid rgba(78,205,196,.25); }
        .jive-ab-btn.clear-btn { background: rgba(255,68,68,.15); color: #ff4444; border: 1px solid rgba(255,68,68,.25); }
        .jive-ab-hint { text-align: center; color: #666; font-size: .75rem; margin-top: 6px; }
        .jive-ab-badge { position: absolute; top: 10px; left: 10px; background: rgba(255,45,85,.9); border-radius: 10px; padding: 5px 12px; font-size: .78rem; font-weight: 700; color: #fff; z-index: 5; pointer-events: none; }
        .jive-expand-btn { display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; padding: 12px 0; margin-top: 6px; border-radius: 12px; background: rgba(255,255,255,.04); border: 1px dashed rgba(255,255,255,.12); color: #a0a0c0; font-size: .82rem; font-weight: 600; cursor: pointer; transition: all .2s; -webkit-tap-highlight-color: transparent; }
        .jive-expand-btn:active { background: rgba(255,255,255,.08); transform: scale(.98); }
        .jive-footer { text-align: center; margin-top: 32px; padding: 16px; color: #555; font-size: .75rem; border-top: 1px solid rgba(255,255,255,.05); }
        /* 📱 모바일 가로모드 대응 */
        @media (orientation: landscape) and (max-height: 500px) {
          .jive-container { max-width: 100%; padding: 0 12px 80px; }
          .jive-topnav { display: none !important; }
          .jive-header { padding: 16px 12px; margin-bottom: 12px; }
          .jive-header h1 { font-size: 1.2rem; margin-bottom: 4px; }
          .jive-subtitle { font-size: .75rem; }
          .jive-count-badge { margin-top: 6px; font-size: .72rem; }
          .jive-global-btns { gap: 6px; margin-top: 10px; }
          .jive-float-close { bottom: 16px; width: 44px; height: 44px; font-size: 1.1rem; }
          .jive-section { margin-bottom: 16px; }
          .jive-card-body.open { max-height: 800px; }
        }
      `}</style>

      {/* 🔙 상단 고정 네비바 */}
      <div className="jive-topnav">
        <button className="jive-topnav-btn" onClick={() => navigate(-1)}>← 뒤로</button>
        <span className="jive-topnav-title">자이브 교본</span>
        <button className="jive-topnav-btn" onClick={() => navigate('/')}>🏠 홈</button>
      </div>

      {/* 🎬 영상 재생 중이면 플로팅 닫기 버튼 표시 */}
      {activeVideo && (
        <button className="jive-float-close" onClick={() => setActiveVideo(null)} aria-label="영상 닫기">
          ✕
        </button>
      )}

      {/* 탭 네비게이션 */}
      <div className="jive-header" style={{ paddingBottom: '0' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px' }}>
          <button
              onClick={() => { setActiveTab('classlog'); setActiveVideo(null); }}
              style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: activeTab === 'classlog' ? 'var(--primary-color, #ef4444)' : 'var(--bg-secondary, rgba(0,0,0,0.05))', color: activeTab === 'classlog' ? '#fff' : 'var(--text-secondary, #888)', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >🎥 수업기록</button>
          <button
              onClick={() => { setActiveTab('sequence'); setActiveVideo(null); }}
              style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: activeTab === 'sequence' ? 'var(--primary-color, #ef4444)' : 'var(--bg-secondary, rgba(0,0,0,0.05))', color: activeTab === 'sequence' ? '#fff' : 'var(--text-secondary, #888)', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >자이브 순서</button>
          <button
              onClick={() => { setActiveTab('375'); setActiveVideo(null); }}
              style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: activeTab === '375' ? 'var(--primary-color, #ef4444)' : 'var(--bg-secondary, rgba(0,0,0,0.05))', color: activeTab === '375' ? '#fff' : 'var(--text-secondary, #888)', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >자이브 375</button>
          <button
              onClick={() => { setActiveTab('education'); setActiveVideo(null); }}
              style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: activeTab === 'education' ? 'var(--primary-color, #ef4444)' : 'var(--bg-secondary, rgba(0,0,0,0.05))', color: activeTab === 'education' ? '#fff' : 'var(--text-secondary, #888)', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >자이브 교육영상</button>
        </div>
      </div>

      {activeTab === 'sequence' && (
        <div className="jive-header" style={{ paddingTop: '0', borderTop: 'none', marginTop: '-16px' }}>
          <div className="jive-subtitle">기본 카운트: 1-2, QaQ, QaQ<br/>(Slow-Slow, Quick·and·Quick, Quick·and·Quick)</div>
          <div className="jive-count-badge">총 57개 동작 · 초급 8 · 중급 13 · 상급A~D 36</div>
        </div>
      )}

      {activeTab === 'education' && (
        <>
          {/* 섹션 1: 스탭 범위별 영상 */}
          <div className="jive-header" style={{ paddingTop: '0', borderTop: 'none', marginTop: '-16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.1rem' }}>📋</span>
              <span style={{ fontSize: '.9rem', fontWeight: 700, color: '#f7d794' }}>스탭 범위별 영상</span>
              <span style={{ fontSize: '.7rem', color: '#888', marginLeft: 'auto' }}>와이트리댄스스쿨</span>
            </div>
            <div className="jive-global-btns">
              <button className="jive-global-btn red" onClick={() => setActiveVideo({cardN:'global',videoId:YT.full_73})}>▶ 전체 연속동작</button>
              <button className="jive-global-btn blue" onClick={() => setActiveVideo({cardN:'global',videoId:YT.full_73_slow})}>🐢 전체 슬로모션</button>
              <button className="jive-global-btn green" onClick={() => setActiveVideo({cardN:'global',videoId:YT.beginner_explain})}>📖 초급 상세설명</button>
              <button className="jive-global-btn orange" onClick={() => setActiveVideo({cardN:'global',videoId:'RrRl_FMgvrI'})}>▶ 1-50번 스탭</button>
              <button className="jive-global-btn orange" onClick={() => setActiveVideo({cardN:'global',videoId:'F8ZoZSDZUY4'})}>▶ 1-2번 스탭</button>
              <button className="jive-global-btn orange" onClick={() => setActiveVideo({cardN:'global',videoId:'bmgscBOBWQ0'})}>▶ 3-5번 스탭</button>
              <button className="jive-global-btn orange" onClick={() => setActiveVideo({cardN:'global',videoId:'873NOf9d8z4'})}>▶ 6-11번 스탭</button>
              <button className="jive-global-btn orange" onClick={() => setActiveVideo({cardN:'global',videoId:'eOsPZUWs0Ek'})}>▶ 12-16번 스탭</button>
              <button className="jive-global-btn orange" onClick={() => setActiveVideo({cardN:'global',videoId:'99PUY1gfBWk'})}>▶ 12-20번 스탭</button>
              <button className="jive-global-btn orange" onClick={() => setActiveVideo({cardN:'global',videoId:'wDA1osI5sKs'})}>▶ 20-25번 스탭</button>
            </div>
          </div>

          {/* 섹션 2: 개별 스탭 교육영상 */}
          <div className="jive-section" style={{ marginTop: '8px' }}>
            <div className="jive-section-title lv-silver" style={{ marginBottom: '12px' }}>
              <span className="jive-emoji">🎓</span>
              <h2 style={{ fontSize: '1rem' }}>개별 스탭 교육영상</h2>
              <span className="jive-badge">은선생의 댄스클리닉</span>
            </div>
            {(() => {
              const eduVideos = [
                { id: '6or6en0im6c', num: '기초', title: '댄스스포츠 홀드법', eng: 'Hold Method', desc: '파트너와 올바른 자세·손 잡는 법 (전상우·강민지)' },
                { id: 'MxhVqxirA20', num: '강의', title: '바디 스피드 & 파트너십', eng: 'Body Speed & Partnering', desc: '여성 파트너의 중요성과 몸의 스피드 (도미니코 강의 번역)' },
                { id: 'j1u5dECISR0', num: 9, title: '윕', eng: 'The Whip', desc: '채찍처럼 여성을 당겨 1회전' },
                { id: 'cDgoTb_q5y0', num: 10, title: '윕 쓰루웨이', eng: 'Whip Throwaway', desc: '휩 후 여성을 밖으로 밀어냄' },
                { id: '_8Or-ODndKw', num: 17, title: '치킨웍 & 더블 치킨웍', eng: 'Chicken Walk', desc: '닭처럼 톡톡 튀며 걷기 + 손동작·치마 활용' },
                { id: '7q6HtVIjra8', num: 18, title: '토 힐 스위블', eng: 'Toe Heel Swivel', desc: '발끝·뒤꿈치 번갈아 비틀기 (현우·현아쌤)' },
                { id: 'VsI7jjuI8Is', num: 19, title: '플릭 인투 브레이크', eng: 'Flick Into Break', desc: '발차기 후 급정지 (현우·현아쌤)' },
                { id: 'e19bTTO04fg', num: 20, title: '쉐도우 스토킹 웍', eng: 'Shadow Stalking Walk', desc: '그림자처럼 따라 걷기 (현우·현아쌤)' },
                { id: 'qiFhBwNl7lY', num: 21, title: '무치', eng: 'Mooch', desc: '느릿한 리듬의 제자리 스텝 (현우·현아쌤)' },
                { id: '8Hs1ve0xjaY', num: 22, title: '프레아 홉스', eng: 'Flea Hops', desc: '벼룩처럼 가볍게 뛰기 (현우·현아쌤)' },
                { id: '-BB6bBYh96I', num: 23, title: '스탑 앤 고', eng: 'Stop And Go', desc: '엔딩 투 스탑 앤 고 (현우·현아쌤)' },
                { id: 'u8MwDb0TfCo', num: 24, title: '카터펄트', eng: 'Catapult', desc: '투석기처럼 여성을 밀어 올리기 (현우·현아쌤)' },
                { id: '_Lcp0zPBhxY', num: 25, title: '숄더 스핀', eng: 'Shoulder Spin', desc: '어깨를 잡고 회전 (현우·현아쌤)' },
                { id: 'ak-oVgZmsck', num: 26, title: '처깅', eng: 'Chugging', desc: '기차처럼 씩씩하게 전진 (현우·현아쌤)' },
                { id: 'R4Qf406MK8Y', num: 27, title: '로타리 지그재그', eng: 'Rotary Zigzag', desc: '회전하며 지그재그 이동 (현우·현아쌤)' },
                { id: 'HGta7wGPljs', num: 28, title: '윕 스핀 & 보타포고스', eng: 'Whip Spin & Bota Fogos', desc: '휩 회전 + 삼바 스텝 결합 (현우·현아쌤)' },
                { id: 'NfoNqkqDDlI', num: 29, title: '사이드 패스', eng: 'Side Pass', desc: '옆으로 지나가며 자리 교대 (현우·현아쌤)' },
                { id: 'CWnXipKICaw', num: 30, title: '뉴욕 위드 스프링스', eng: 'New York with Springs', desc: '스프링처럼 탄력 있는 뉴욕 (현우·현아쌤)' },
              ];
              const CHUNK = 7;
              const groups = [];
              for (let i = 0; i < eduVideos.length; i += CHUNK) groups.push(eduVideos.slice(i, i + CHUNK));

              return groups.map((group, gi) => {
                const sectionId = `edu-group-${gi}`;
                // 첫 그룹은 기본 펼침, 나머지는 접힘
                const isExpanded = expandedSections[sectionId] ?? (gi === 0);
                return (
                  <div key={sectionId} style={{ marginBottom: '10px' }}>
                    {/* 그룹 헤더 (클릭 시 접기/펼치기) */}
                    <div
                      onClick={() => toggleSection(sectionId)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '12px 14px', borderRadius: '12px', cursor: 'pointer',
                        background: 'rgba(99,102,241,.10)', border: '1px solid rgba(99,102,241,.25)',
                        userSelect: 'none', transition: 'all .2s',
                      }}
                    >
                      <span style={{ fontSize: '1rem' }}>📺</span>
                      <span style={{ fontSize: '.9rem', fontWeight: 700, color: '#c7d2fe' }}>
                        그룹 {gi + 1}
                      </span>
                      <span style={{ fontSize: '.72rem', color: '#818cf8', background: 'rgba(99,102,241,.15)', borderRadius: '10px', padding: '2px 8px' }}>
                        영상 {group.length}개
                      </span>
                      <span style={{ marginLeft: 'auto', fontSize: '.8rem', color: '#a0a0c0', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }}>▼</span>
                    </div>

                    {/* 그룹 본문 */}
                    {isExpanded && (
                      <div style={{ marginTop: '8px' }}>
                        {group.map(v => (
                          <div
                            key={v.id}
                            onClick={() => { setActiveVideo({cardN:'global', videoId: v.id}); }}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '12px',
                              padding: '12px 14px', marginBottom: '8px',
                              background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)',
                              borderRadius: '14px', cursor: 'pointer', transition: 'all .2s',
                            }}
                          >
                            {/* 썸네일 */}
                            <div style={{ position: 'relative', flexShrink: 0, width: '100px', aspectRatio: '16/9', borderRadius: '10px', overflow: 'hidden', background: '#111' }}>
                              <img
                                src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                                alt={v.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                              <div style={{
                                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: 'rgba(0,0,0,.3)', color: '#fff', fontSize: '1.2rem'
                              }}>▶</div>
                            </div>
                            {/* 정보 */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                <span style={{
                                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                  width: '26px', height: '26px', borderRadius: '50%',
                                  background: 'rgba(99,102,241,.15)', color: '#818cf8',
                                  fontSize: '.75rem', fontWeight: 700, flexShrink: 0
                                }}>{v.num}</span>
                                <span style={{ fontSize: '.95rem', fontWeight: 700, color: '#fff' }}>{v.title}</span>
                              </div>
                              <div style={{ fontSize: '.76rem', color: '#a0a0c0' }}>{v.eng}</div>
                              <div style={{ fontSize: '.73rem', color: '#777', marginTop: '2px' }}>{v.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </>
      )}

      {activeTab === '375' && (
        <div className="jive-header" style={{ paddingTop: '0', borderTop: 'none', marginTop: '-16px' }}>
          <div className="video-list" style={{ marginTop: '16px' }}>
            {jive375Data.map(video => (
              <div
                key={video.id}
                className="video-list-item"
                onClick={() => {
                  setActiveVideo({ cardN: 'global', videoId: video.mainVideoId });
                }}
              >
                <div className="list-thumbnail">
                  <img src={`https://img.youtube.com/vi/${video.mainVideoId}/mqdefault.jpg`} alt={video.title} />
                  <div className="list-play-icon">▶</div>
                </div>
                <div className="list-info">
                  <div className="info-top">
                    <span className="info-date">{video.genre}</span>
                  </div>
                  <h3 className="info-title-eng">{video.title}</h3>
                  <p className="info-title-kor">{video.choreographer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🎥 수업기록 — 자이브 단체수업 촬영 영상 (날짜 내림차순) */}
      {activeTab === 'classlog' && (
        <div className="jive-header" style={{ paddingTop: '0', borderTop: 'none', marginTop: '-16px' }}>
          <div className="jive-subtitle" style={{ marginBottom: '14px' }}>
            자이브 단체수업 촬영 영상 — 최근 수업이 맨 위에 옵니다.<br/>
            영상을 누르면 재생되고, A-B 구간반복으로 복습할 수 있어요. 🔁
          </div>

          {/* 올리기 단추 + 비밀번호 게이트 + 등록 폼 */}
          {!showClassForm && (
            <button
              onClick={() => setShowClassForm(true)}
              style={{ width: '100%', padding: '14px', borderRadius: '14px', border: 'none', background: 'var(--primary-color, #ef4444)', color: '#fff', fontSize: '16px', fontWeight: 800, cursor: 'pointer' }}
            >📹 수업 영상 올리기</button>
          )}

          {showClassForm && !classUnlocked && (
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '14px', color: '#aaa' }}>올리기는 관리자 전용입니다. 비밀번호를 입력해주세요.</div>
              <input
                type="password"
                value={classPw}
                onChange={(e) => setClassPw(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleClassUnlock(); }}
                placeholder="관리자 비밀번호"
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '16px', textAlign: 'center' }}
                autoFocus
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => { setShowClassForm(false); setClassPw(''); }} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#aaa', fontWeight: 700, cursor: 'pointer' }}>취소</button>
                <button onClick={handleClassUnlock} style={{ flex: 2, padding: '12px', borderRadius: '10px', border: 'none', background: 'var(--primary-color, #ef4444)', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>확인</button>
              </div>
            </div>
          )}

          {showClassForm && classUnlocked && (
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '4px' }}>① 유튜브 링크</label>
                <input
                  type="text"
                  value={classUrl}
                  onChange={(e) => setClassUrl(e.target.value)}
                  placeholder="유튜브에 올린 영상 주소 붙여넣기"
                  style={{ width: '100%', boxSizing: 'border-box', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '15px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '4px' }}>② 또는 구글 드라이브 링크</label>
                <input
                  type="text"
                  value={classDriveUrl}
                  onChange={(e) => setClassDriveUrl(e.target.value)}
                  placeholder="드라이브 [공유 → 링크 복사] 주소 붙여넣기"
                  style={{ width: '100%', boxSizing: 'border-box', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '15px' }}
                />
                <div style={{ fontSize: '12px', color: '#888', marginTop: '4px', lineHeight: 1.5 }}>
                  드라이브 파일은 공유 설정을 <b>"링크가 있는 모든 사용자"</b>로 해야 재생됩니다.<br/>
                  (드라이브 영상은 재생·전체화면만 — A-B 반복은 유튜브만 지원)
                </div>
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '4px' }}>수업 날짜</label>
                <input
                  type="date"
                  value={classDate}
                  onChange={(e) => setClassDate(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '15px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '4px' }}>메모/제목 (선택 — 비우면 "자이브 단체수업 (날짜)")</label>
                <input
                  type="text"
                  value={classTitle}
                  onChange={(e) => setClassTitle(e.target.value)}
                  placeholder="예: 링크 턴 + 아메리칸 스핀 복습"
                  style={{ width: '100%', boxSizing: 'border-box', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '15px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <button onClick={() => setShowClassForm(false)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#aaa', fontWeight: 700, cursor: 'pointer' }}>닫기</button>
                <button onClick={handleAddClassVideo} disabled={classSaving} style={{ flex: 2, padding: '12px', borderRadius: '10px', border: 'none', background: classSaving ? '#555' : 'var(--primary-color, #ef4444)', color: '#fff', fontWeight: 800, cursor: classSaving ? 'not-allowed' : 'pointer' }}>
                  {classSaving ? '저장 중…' : '올리기'}
                </button>
              </div>
            </div>
          )}

          {/* 영상 목록 — 수업 날짜 내림차순 */}
          <div className="video-list" style={{ marginTop: '16px' }}>
            {classVideos.length === 0 && (
              <div style={{ textAlign: 'center', color: '#888', padding: '28px 0', fontSize: '15px' }}>
                아직 올린 수업 영상이 없습니다.<br/>위의 📹 단추로 첫 영상을 올려보세요!
              </div>
            )}
            {classVideos.map(v => (
              <div
                key={v.key}
                className="video-list-item"
                onClick={() => setActiveVideo(v.driveId
                  ? { cardN: 'global', driveId: v.driveId }
                  : { cardN: 'global', videoId: v.videoId })}
              >
                <div className="list-thumbnail">
                  <img
                    src={v.driveId
                      ? `https://drive.google.com/thumbnail?id=${v.driveId}&sz=w320`
                      : `https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg`}
                    alt={v.title}
                    onError={(e) => { e.target.style.background = '#222'; e.target.style.opacity = '0'; }}
                  />
                  <div className="list-play-icon">▶</div>
                </div>
                <div className="list-info">
                  <div className="info-top">
                    <span className="info-date">📅 {v.date}</span>
                    {v.driveId && <span className="info-date" style={{ opacity: .7 }}>드라이브</span>}
                  </div>
                  <h3 className="info-title-eng">{v.title}</h3>
                </div>
                {classUnlocked && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteClassVideo(v); }}
                    aria-label="삭제"
                    style={{ background: 'transparent', border: '1px solid rgba(239,68,68,0.4)', color: '#ef4444', borderRadius: '8px', padding: '8px 10px', cursor: 'pointer', flexShrink: 0 }}
                  >🗑</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 글로벌 플레이어 */}
      {activeVideo && activeVideo.cardN === 'global' && (
        <div ref={playerScrollRef} style={{marginBottom:24}}>
          {activeVideo.driveId ? (
            /* 구글 드라이브 영상 — 드라이브 내장 플레이어 iframe.
               ⚠️ A-B 구간반복은 기술적으로 불가: 드라이브가 외부 앱의 직접
               스트리밍(<video> 핫링크)을 서버에서 403으로 차단하고(2026-07 실측),
               내장 플레이어는 외부 제어 API가 없다. 구간반복이 필요한 영상은
               유튜브(일부 공개)로 올리는 것이 정답. */
            <div>
              <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', borderRadius: '12px', overflow: 'hidden', background: '#000' }}>
                <iframe
                  src={`https://drive.google.com/file/d/${activeVideo.driveId}/preview`}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title="구글 드라이브 수업 영상"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                />
              </div>
              <div style={{ fontSize: '.75rem', color: '#888', textAlign: 'center', marginTop: '6px' }}>
                드라이브 영상은 재생·전체화면만 지원됩니다 (구간반복은 유튜브 영상만)
              </div>
              {/* 휴대폰 일부 브라우저는 쿠키 차단으로 드라이브 임베드가 검게 나옴 — 비상구 */}
              <button
                onClick={() => window.open(`https://drive.google.com/file/d/${activeVideo.driveId}/view`, '_blank', 'noopener,noreferrer')}
                style={{ width: '100%', marginTop: '8px', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)', color: '#e8e8f0', fontSize: '.9rem', fontWeight: 700, cursor: 'pointer' }}
              >📂 화면이 검게 나오면 여기를 눌러 드라이브에서 열기</button>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button className="jive-ab-btn clear-btn" onClick={() => setActiveVideo(null)}>✕ 닫기</button>
              </div>
            </div>
          ) : (
            <div style={{ position: 'relative' }}>
              {abLoopActive && <div className="jive-ab-badge">🔁 {formatTime(pointA)} → {formatTime(pointB)}</div>}
              <JiveYouTubePlayer videoId={activeVideo.videoId} onPlayerReady={handlePlayerReady} />
              {/* 🔁 A-B 구간 + 닫기 — 영상 하단 오버레이 */}
              <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'linear-gradient(transparent, rgba(0,0,0,0.85))', padding:'24px 10px 8px', borderRadius:'0 0 12px 12px', zIndex:5 }}>
                <div style={{ display:'flex', gap:'6px', alignItems:'center', justifyContent:'center', flexWrap:'wrap' }}>
                  <button className="jive-ab-btn a-btn" onClick={handleSetA}>A {pointA !== null ? formatTime(pointA) : '설정'}</button>
                  <span style={{color:'#888',fontSize:'14px'}}>→</span>
                  <button className="jive-ab-btn b-btn" onClick={handleSetB}>B {pointB !== null ? formatTime(pointB) : '설정'}</button>
                  {abLoopActive && <button className="jive-ab-btn clear-btn" onClick={handleClearAB}>✕</button>}
                  <button className="jive-ab-btn clear-btn" onClick={()=>setActiveVideo(null)} style={{marginLeft:'auto'}}>✕ 닫기</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 레벨별 섹션 */}
      {activeTab === 'sequence' && levelSections.map(sec => (
        <div className="jive-section" key={sec.id}>
          <div className={`jive-section-title ${sec.cls}`}>
            <span className="jive-emoji">{sec.emoji}</span>
            <h2>{sec.title}</h2>
            <span className="jive-badge">{sec.count}개</span>
          </div>

          {(() => {
            const allItems = jiveData.filter(item => item.lv === sec.id);
            const isExpanded = expandedSections[sec.id];
            const visibleItems = isExpanded ? allItems : allItems.slice(0, 3);
            const hiddenCount = allItems.length - 3;
            return (
              <>
              {visibleItems.map(x => {
            const vids = getVideos(x.n);
            const isOpen = openCardId === x.n;
            const showingVideo = activeVideo && activeVideo.cardN === x.n;
            return (
              <div key={x.n} className={`jive-card ${x.lv} ${isOpen ? 'open' : ''}`}>
                <div className="jive-card-header" onClick={() => toggleCard(x.n)}>
                  <div className="jive-card-num">{x.n}</div>
                  <div className="jive-card-info">
                    <h3>{x.t}</h3>
                    <p>{x.d}</p>
                  </div>
                  <svg className="jive-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                <div className="jive-card-body">
                  <div className="jive-card-body-inner">
                    {/* 🎬 유튜브 영상 버튼 */}
                    <div className="jive-video-btns">
                      <button className="jive-vbtn primary" onClick={(e) => playVideo(x.n, vids.main.id, e)}>{vids.main.label}</button>
                      {vids.detail && <button className="jive-vbtn secondary" onClick={(e) => playVideo(x.n, vids.detail.id, e)}>{vids.detail.label}</button>}
                      {vids.range && <button className="jive-vbtn tertiary" onClick={(e) => playVideo(x.n, vids.range.id, e)}>{vids.range.label}</button>}
                    </div>

                    {/* 인라인 영상 플레이어 */}
                    {showingVideo && (
                      <div ref={playerScrollRef} style={{position:'relative', zIndex: 0}} onClick={(e) => e.stopPropagation()}>
                        <div style={{ position: 'relative' }}>
                          {abLoopActive && <div className="jive-ab-badge">🔁 {formatTime(pointA)} → {formatTime(pointB)}</div>}
                          <JiveYouTubePlayer videoId={activeVideo.videoId} onPlayerReady={handlePlayerReady} />
                          {/* 🔁 A-B 구간 + 닫기 — 영상 하단 오버레이 */}
                          <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'linear-gradient(transparent, rgba(0,0,0,0.85))', padding:'24px 10px 8px', borderRadius:'0 0 12px 12px', zIndex:5 }}>
                            <div style={{ display:'flex', gap:'6px', alignItems:'center', justifyContent:'center', flexWrap:'wrap' }}>
                              <button className="jive-ab-btn a-btn" onClick={handleSetA}>A {pointA !== null ? formatTime(pointA) : '설정'}</button>
                              <span style={{color:'#888',fontSize:'14px'}}>→</span>
                              <button className="jive-ab-btn b-btn" onClick={handleSetB}>B {pointB !== null ? formatTime(pointB) : '설정'}</button>
                              {abLoopActive && <button className="jive-ab-btn clear-btn" onClick={handleClearAB}>✕</button>}
                              <button className="jive-ab-btn clear-btn" onClick={(e) => { e.stopPropagation(); setActiveVideo(null); }} style={{marginLeft:'auto'}}>✕ 닫기</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
              {hiddenCount > 0 && (
                <button className="jive-expand-btn" onClick={() => toggleSection(sec.id)}>
                  {isExpanded ? '▲ 접기' : `▼ ${hiddenCount}개 더보기`}
                </button>
              )}
              </>
            );
          })()}
        </div>
      ))}

      <div className="jive-footer">
        구향회 스텝바이스텝 · 자이브<br/>
        영상 출처: 와이트리댄스스쿨 YouTube
      </div>
    </div>
  );
}
