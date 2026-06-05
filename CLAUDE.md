# 스텝바이스텝 💃 라인댄스 — Claude 인수인계 메모

작성: 2026-05-18
이전 안티그래비티 → Claude 인계.

---

## 한 줄 요약

라인댄스 회원 대상 PWA — 수업 일정, 안무 영상, 공지, 챌린지(자이브 4주 마스터), 커뮤니티, 추천. 4-탭 + 관리자 페이지 구조. 댄스 큐앱(`~/Downloads/dance-instructor-player/`)과는 별개 앱이며 더 큰 규모.

## ✅ 인수 시점 미커밋 변경 — 처리 완료 (2026-05-18)

안티그래비티가 작업 중이던 미커밋 변경 7파일 + 미추적 1파일을 세 커밋으로 정리해 main에 올렸음(이후 푸시까지 완료):

- `c060bf1 feat: split Red Dress Rebel into kolon/sindun with separate videos` — songs.js 곡 분리 + 중리 수업곡 마스터 메모(`중리_수업영상곡_링크.txt`)
- `e51b970 feat: admin can hide/replace default songs` — DataContext에 `hiddenSongIds`/`songOverrides` 추가, AdminPage에 곡 교체/삭제 UI
- `1cffb1c feat: add 0.8x and 0.9x playback speed steps` — VideoPlayer/PlaylistPage/SpeedPanel/useVideoDetail에 라인댄스 연습용 미세 속도 추가
- `16bc204 revert: roll back kolon/sindun video split (c060bf1)` — 검증 결과 영상 분리가 의도와 달랐고, 곡 데이터는 직전 상태로 회귀(메모 .txt는 보존)

## 🔥 Firebase RTDB 운영 모델 도입 (2026-05-19)

관리자 2명(중리/코오롱 각 1명)이 매주 새 수업곡을 admin에서 올리는 운영 모델. 인수 시점까지는 localStorage 기반이라 **관리자 본인 폰에만 곡이 추가되고 회원에게는 안 보이는** 결함이 있었고, "잘 안 올라간다"는 보고의 정체였음.

`6e2bb8f feat: sync admin song management via Firebase RTDB` 커밋에서 해결:

- **Firebase 프로젝트**: `stepbystep-linedance` (asia-southeast1, 싱가포르)
- **데이터 경로**:
  - `/songs/{id}`: 관리자가 admin에서 추가한 곡 (구 `localSongs`)
  - `/hiddenSongs/{id}`: 기본곡 숨김 (구 `hiddenSongIds`)
  - `/songOverrides/{id}`: 기본곡 메타 덮어쓰기 (구 `songOverrides`)
- **클라이언트**: `DataContext`가 `onValue`로 세 노드 모두 실시간 구독 → 어느 디바이스에서 변경이 일어나도 모든 디바이스에 즉시 반영
- **환경변수** (Vercel + `.env.local`): `VITE_FIREBASE_*` 7개 + `VITE_ADMIN_PASSWORD`
- **보안 규칙** (`database.rules.json`): **2026-06-01 `auth != null`로 잠금 + 익명 인증(Anonymous) 활성화** → Firebase 1차 "insecure rules"(미인증 접근) 경고 해소. 단, 방문자 전원이 익명 토큰을 받으므로 **쓰기가 관리자에게 제한된 건 아님**(경고만 끈 수준). **2026-06-04 후속**: Firebase가 다시 "로그인한 모든 사용자가 읽기/쓰기 가능" 경고 메일 발송(= 익명 인증 + `auth != null`의 예고된 결과). 사용자에게 길 A(관리자 Firebase 로그인 + `/admins/{uid}` 화이트리스트) / B(`.write:false` + Vercel 서버함수 + 서비스계정) / C(현상 유지 + 경고 메일 음소거) 제시 → **사용자가 길 C 선택**. 데이터는 공개 곡 정보뿐, 실재 위험은 복구 가능한 '쓰기 반달리즘'뿐이라 현 수준을 의도적으로 수용. 진짜 강화(관리자 신분 → 쓰기 제한)는 Phase 6로 **보류**(긴급 버그 아님). 읽기 경고는 회원 비로그인 열람이 필요해 어느 길로 가도 잔존 가능.
- **검증 완료** (로컬 + prod): admin에서 곡 추가 → RTDB 즉시 반영 → 다른 디바이스(시크릿 창)에서도 즉시 노출 → 삭제 동기화까지 확인.

## ⚠️ 알려진 부수 결함 (우선순위순)

1. **🟡 보안 규칙 — 현 수준 의도적 수용(2026-06-04 사용자 결정, 길 C)** (`database.rules.json`) — 2026-06-01 `.read/.write: "auth != null"` + 익명 인증 활성화로 1차 경고 해소(gcloud Identity Toolkit Admin API로 적용·REST로 검증: 미인증 401 / 익명 토큰 200 / 콘솔 UI "사용 설정됨"). 익명 토큰을 누구나 받으므로 쓰기 제한은 없음 → 2026-06-04 Firebase가 "로그인한 모든 사용자 읽기/쓰기" 재경고. **사용자가 현상 유지 + 메일 음소거(길 C) 선택** — 데이터는 공개 곡 정보뿐, 실재 위험은 복구 가능한 '쓰기 반달리즘'뿐. **불러서 고치지 말 것(긴급 버그 아님).** 향후 강화 옵션 보존: 길 A(`/admins/{uid}: true` 화이트리스트 + AdminPage 평문 비번 1234 → Firebase Auth 로그인) 또는 길 B(`.write:false` + Vercel 서버함수 + 서비스계정 키). 이메일 음소거는 계정 알림 설정이라 사용자 본인이 처리(마담은 계정 설정 안 건드림).
2. **🟡 songSchedule 미반영** — 새 곡은 `addedDate`만 갖고 `songs.js`의 `songSchedule` 객체에는 들어가지 않아 "★ 이번주 수업곡" 자동 표시가 일관적이지 않음. `getThisWeekSong`이 첫 로컬곡을 반환하는 보정이 있긴 하지만 보강 필요.
3. **🟡 자동 추출 실패 UX** — admin에서 유튜브 URL 붙여넣었는데 noembed가 메타데이터를 못 가져오면 조용히 실패해 제목이 빈 채로 저장됨 (DataContext fallback이 "제목 없음"). 토스트 안내 + submit 시 제목 빈 검증 필요.
4. **🟢 데드 코드** — `AdminPage.songInfo.location`은 handleAddSong에서 `locParam`으로 어차피 덮어씌워짐.

## 🔍 운영 의도 vs 옛 데이터 잔상

- ✅ `songSchedule[68].location: 'both'` — Red Dress Rebel이 코오롱+중리 양쪽에 노출. **2026-05-19 사용자 확정: 의도된 운영. 양쪽 유지.** 잔상 아님. 손대지 말 것.
- localStorage `custom_songs` — 관리자/사용자 디바이스에 안티그래비티 시기 등록 시도한 잔상이 있을 수 있음. 이제는 RTDB로 옮겨졌으므로 더이상 노출 안 되지만, 브라우저 localStorage에는 남아 있음(무해).

## 스택

- React 19.2 + Vite 7.3 + react-router-dom 7 + **vite-plugin-pwa** (manifest + service worker)
- Context 기반 상태 관리 (zustand 없음, 라이브러리 의존성 최소)
- 빌드: `npm run build` (vite build) → `dist/` → Vercel

## 배포 / 운영

| 항목 | 값 |
|---|---|
| Vercel 프로젝트 | `stepbystep-linedance` |
| Vercel 팀 ID | `team_pJet1FwBUYNyx5MUoZnUOq2r` |
| `.vercel/project.json` | `prj_XossmIYaCNvAPHn7sP8esQORJxNA` |
| GitHub | `https://github.com/elleme1/stepbystep-linedance.git` |
| 현재 브랜치 | `main` |
| 프로덕션 URL | https://stepbystep-linedance.vercel.app/ |
| 로컬 dev | http://localhost:5173/ |

### Vercel rewrite

`vercel.json` — `/assets/`와 `/jive-guide.html` 제외 모든 경로를 `index.html`로 (SPA). `sw.js`와 `manifest.json`은 `Cache-Control: no-cache, no-store, must-revalidate`.

## 디렉토리 구조

```
src/
├─ App.jsx                       7-Provider 스택 + BrowserRouter + SplashScreen + LocationSelector
├─ ReloadPrompt.jsx              PWA 업데이트 안내
├─ pages/
│  ├─ HomePage.jsx               메인 탭 1
│  ├─ VideoPage.jsx              메인 탭 2 (영상)
│  ├─ TheoryPage.jsx             메인 탭 3 (이론)
│  ├─ RecommendPage.jsx          메인 탭 4 (추천)
│  ├─ CommunityPage.jsx          서브
│  ├─ SearchPage.jsx             서브
│  ├─ VideoDetail.jsx            서브 (영상 단일 페이지)
│  ├─ PlaylistPage.jsx           서브 (수업곡 플레이리스트)
│  ├─ ChallengePage.jsx          /challenge/jive — 자이브 4주 챌린지 (VIP 전용)
│  └─ AdminPage.jsx              /admin (Layout 외부, 관리자 전용)
├─ components/
│  ├─ Layout.jsx, BottomNav.jsx  공통 레이아웃
│  ├─ InstallBanner.jsx          PWA 설치 유도
│  ├─ SplashScreen.jsx
│  ├─ LocationSelector.jsx       장소(코오롱/중리/신둔 등) 선택
│  ├─ LocationBadge.jsx
│  ├─ RecommendWidget.jsx
│  ├─ VideoPlayer.jsx            mp4/일반 영상용
│  ├─ YouTubePlayer/             ⚠️ 결함 수정 이력 있음 — walkthrough 참조
│  │  ├─ YouTubePlayer.jsx
│  │  └─ useYouTubePlayer.js
│  └─ VideoTools/                속도/구간반복 등 영상 도구
│     └─ SpeedPanel.jsx
├─ context/
│  ├─ ThemeContext, FavoritesContext, PracticeContext,
│  ├─ LocationContext (장소 미선택 시 LocationSelector 강제 표시),
│  ├─ DeviceContext, DataContext (곡/이론/공지 등 데이터 진입점),
│  └─ ChallengeContext
├─ data/
│  ├─ songs.js                   장소별 곡 (코오롱/중리/신둔)
│  ├─ schedule.js                수업 일정
│  ├─ jivePlan.js                자이브 4주 계획
│  ├─ theory.js                  이론 콘텐츠
│  ├─ announcements.js           공지
│  ├─ community.js               커뮤니티 콘텐츠
│  └─ constants.js
├─ hooks/                        useVideoDetail.js 등
└─ utils/
```

## 핵심 동작 / 함정

### 1. App 버전 마이그레이션 (App.jsx line ~37)
- `APP_VERSION = 'v1.5'` 와 `localStorage.app_version`이 다르면 **localStorage 전체를 clear**.
- 단, **`custom_songs`, `favorites`, `practiceData`는 백업 후 복원** — 이 3개는 사용자 데이터이므로 절대 잃으면 안 됨.
- 새 사용자 데이터 키를 추가할 거면 이 보존 목록도 함께 업데이트할 것. 안 그러면 다음 버전 올릴 때 데이터 날아감.

### 2. YouTubePlayer 패턴 (`라인댄스앱-walkthrough.md` 참조)
- 곡 전환 시 iframe을 파괴/재생성하지 말고 `loadVideoById()`만 호출.
- `createPlayer`는 빈 의존성 배열로 1회 생성. 콜백/옵션은 ref로 최신화.
- `wantPlayRef` 플래그 패턴: ENDED → 플래그 set → 인덱스 변경 → videoId 변경 effect에서 `player.play()`.
- **이 패턴 깨면 곡 전환마다 isReady가 리셋되어 자동 재생이 안 됨.**

### 3. 장소(Location) 게이트
- LocationProvider/Selector가 첫 진입 때 장소를 강제로 선택시킴.
- 곡 데이터는 `getSongsForLocation(location)` 등 장소별로 분기 (DataContext) — 마지막 커밋이 정확히 이 흐름의 픽스였음.

### 4. VIP / 관리자
- 자이브 plan(`ChallengePage`)은 VIP 전용으로 가려져 있음 (최근 커밋 `3a4e4f0 hide Jive plan and enable vip-only access`).
- `/admin`은 Layout 외부 라우트 — 일반 메뉴바를 거치지 않음.

## PWA

- `vite-plugin-pwa` with `registerType: 'prompt'` — 새 SW는 사용자 액션으로 활성화.
- manifest: `public/manifest.json` (앱 이름 "스텝바이스텝 💃").
- icons: `public/logo-192.png`, `logo-512.png`, `favicon.png`.
- 별도 정적: `public/jive-guide.html` (SPA rewrite 예외 — 직접 접근).

## Chrome PWA 단축키 (안티그래비티가 설치)

| .app 번들 | 가리키는 URL | Bundle ID |
|---|---|---|
| `~/Applications/Chrome Apps.localized/구양희 STEP-BY-STEP.app` | https://stepbystep-linedance.vercel.app/ (프로덕션) | `com.google.Chrome.app.hmbdlinjjhodelkcjklbllgkcibfnmnp` |
| `~/Applications/Chrome Apps.localized/구양희 STEP-BY-STEP 1.app` | http://localhost:5173/ (로컬 dev) | `com.google.Chrome.app.idemibpphagihbobmgmaojhjfidlfpdl` |

- 두 .app 모두 **UserDataDir이 `~/.gemini/antigravity-browser-profile/`** — Google Antigravity IDE가 만든 PWA 프로필 사용.
- 일반 Chrome과 분리된 프로필이므로 로그인/저장 상태가 별도. 향후 Antigravity를 제거할 거면 이 .app 둘과 프로필 디렉토리도 같이 정리.
- **2026-05-18 결정**: 인계 시점에 정리하지 않고 그대로 보존하기로 함. 현재 잘 동작하고, 삭제 시 PWA 단축키 + 그 안의 저장 상태가 같이 날아가는 리스크가 있어 보수적으로 유지. 추후 정리 필요해지면 (.app 2개) + (프로필 디렉토리)를 한 세트로 함께 처리.

## 작업 시 주의

1. **인수 직후 첫 작업은 미커밋 변경 7개 처리** — 위 ⚠️ 섹션. 사용자에게 "안티그래비티가 작업하던 변경사항인데 살릴까요/버릴까요?" 물어보고 결정.
2. **APP_VERSION 올릴 때 사용자 데이터 보존 목록 점검** (App.jsx).
3. **YouTubePlayer 손대기 전 walkthrough 먼저 읽기** (`라인댄스앱-walkthrough.md`).
4. PWA SW 캐시 때문에 사용자가 옛 빌드에 갇히는 사례 잦음 — 의심되면 `manifest.json`/`sw.js`의 `no-cache` 헤더가 살아 있는지 (`vercel.json`) 먼저 확인.
5. PR/푸시 자동화는 현재 없음. Vercel은 main 푸시 시 자동 배포.

## 관련 파일

- `라인댄스앱-walkthrough.md` — YouTubePlayer 결함 수정 회고
- 빌드 로그: `build_error.log`
- 보조 스크립트: `check_*.mjs`, `process_jive.py`, `generate_kolon_order.js` 등 (대부분 일회성, 곡 데이터 검증/생성용)
- 자산: `public/mp3/`, `public/jive-guide.html`
