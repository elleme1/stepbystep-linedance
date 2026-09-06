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
- **환경변수** (Vercel + `.env.local`): `VITE_FIREBASE_*` 7개 + `VITE_DANCE_CUE_API/TOKEN` + `VITE_DANCE_CUE_PAGE_PASSWORD`(댄스큐 게이트, 기본 0402) + `VITE_JIVE_GATE_PASSWORD`(자이브 방 게이트, 기본 0402). `VITE_ADMIN_PASSWORD`는 **2026-08-21 이후 코드에서 참조 없음(죽은 키)** — 관리자 입장은 아래 Firebase 이메일 로그인.
- **보안 규칙 — 현재 = 길 A 채택 (2026-08-21, `1bc0184`)**: 관리자 입장이 화면 비밀번호 비교 → **Firebase 이메일 로그인**(`src/lib/firebase.js`의 `adminSignIn`, `ADMIN_EMAIL` 코드 고정 — 이메일은 비밀 아님, 비밀번호만 비밀)으로 바뀌었고, 실서버 규칙은 **읽기 `auth != null`(익명 포함) / 쓰기 관리자 이메일만**. `authReady`는 브라우저에 남은 관리자 세션이 있으면 그것을 쓰고 없을 때만 익명 세션 발급(무조건 익명 로그인하면 관리자 세션을 덮어씀). **2026-09-06 REST 검침**: 미인증 읽기 401 / 익명 읽기 200 / 익명 쓰기 401(Permission denied) — 규칙 원문의 원천은 Firebase 콘솔이며, 저장소 `database.rules.json`은 그 동작을 거울처럼 옮긴 것. 앱 안의 RTDB 쓰기 6곳(곡 등록·수정·삭제, 수업기록 등록·삭제)은 전부 관리자 로그인 뒤에만 도달 — 회원 쪽 익명 쓰기 없음(전수 확인).
  - 이력: 2026-06-01 `auth != null` + 익명 인증 → 1차 경고 해소 / 2026-06-04 "모든 로그인 사용자 쓰기" 재경고 → 당시 사용자 길 C(현상 유지) 선택 / 2026-08-21 길 A로 격상.
- **검증 완료** (로컬 + prod): admin에서 곡 추가 → RTDB 즉시 반영 → 다른 디바이스(시크릿 창)에서도 즉시 노출 → 삭제 동기화까지 확인.

## ⚠️ 알려진 부수 결함 (우선순위순)

1. ~~🟡 보안 규칙 길 C~~ — **해소(2026-08-21 길 A 채택)**: 쓰기는 관리자 Firebase 이메일 로그인 세션만 가능(위 🔥 절 참조). 남은 것: 읽기는 회원 비로그인 열람을 위해 익명 허용이 의도(Firebase "읽기 경고" 메일은 잔존 가능 — 계정 알림 설정은 사용자 영역). 관리자 비밀번호 분실 시 Firebase 콘솔 Authentication에서 재설정.
2. ~~🟡 songSchedule 미반영~~ — **해소(2026-06-10, `2a6f4e9`)**: DataContext.allSongs가 병합곡 전체의 지점별 최신 `addedDate` 기준으로 `isThisWeek*` 플래그를 동적 재계산. songSchedule은 이제 기본곡의 날짜/장소 원천일 뿐 "이번주" 판정에 단독 권위가 없음.
3. ~~🟡 자동 추출 실패 UX~~ — **해소(2026-06-10 전반 점검)**: noembed 실패 시 토스트 안내 + 제출 시 빈 제목 차단(AdminPage).
4. **🟢 데드 코드** — `AdminPage.songInfo.location`은 handleAddSong에서 `locParam`으로 어차피 덮어씌워짐(동작 영향 없음). `songs.js`의 `getSongsForLocation`/`kolonOrder`/`sindunOrder`도 어디서도 import되지 않는 죽은 코드 — 단 두 order 배열은 "수업 순서" 큐레이션 기록이라 **운영 의도 확인 전 삭제 보류**(화면 순서에 적용할지 / 지울지는 사용자 결정 필요).

## 🔧 2026-06-10 전반 점검(87-에이전트 감사) 수리 내역

6개 차원 병렬 감사 + 발견 건별 3-렌즈 교차 검증으로 23건 확정 → 일괄 수리:

- **App.jsx 보존 키 전면 교체(최중요)** — 기존 백업 목록 3개(`custom_songs`/`favorites`/`practiceData`)는 코드 어디서도 안 쓰는 죽은 키였음. 실사용 키 11종 + `bookmarks_` 접두 키로 교체. **이 수리 전에 APP_VERSION을 올렸다면 전 회원 찜·챌린지·게시글·VIP가 전부 소실됐을 것.**
- **stale 구독 해소** — DataContext의 `getSongsForLocation`/`getThisWeekSong`을 `useCallback([allSongs])`로 안정화하고 VideoPage/PlaylistPage useMemo 의존성에 포함. Firebase 데이터 도착/실시간 변경이 화면에 즉시 반영됨.
- **SearchPage** — songs.js 직접 import → DataContext 기반으로 교체(Firebase 업로드곡 검색 가능, 숨김/덮어쓰기 반영, 현재 장소 필터).
- **VideoDetail 딥링크** — DataContext에 `isLoaded` 플래그 추가, 첫 스냅샷 전엔 '불러오는 중' 표시(이전엔 즉시 '찾을 수 없습니다').
- **addSong 원자화** — 서버 `/songs` 실측 max+1 + `runTransaction`(빈 슬롯만 생성, 충돌 시 +1 재시도). 관리자 2명 동시 등록 덮어쓰기 방지. 날짜는 KST(`todayLocal`) — 기존 UTC는 0~9시 업로드가 전날로 찍혔음.
- **A-B 구간반복(자이브 탭)** — 영상 전환 시 `activePlayerRef`를 null로 지우던 코드 제거(loadVideoById는 onReady를 재발화하지 않아 A/B가 복구 불가로 죽었음). A점 재설정으로 B 무효화 시 유령 배지 제거(TheoryPage + useVideoDetail 동일 수정).
- **PlaylistPage** — 곡 전환 effect를 `currentVideoId` 키로 분리(속도/셔플 토글 시 화면 최상단 튐 + 진행바 0:00 리셋 방지), 300ms 재생 타임아웃 언마운트 정리(인터벌 누수 차단).
- **AdminPage** — `addSong`/`removeSong` await(실패 시 가짜 성공 토스트 차단), 곡 '수정' 시 큐앱 동기화에 삭제 경로와 같은 가드 추가(`updateCueAppIfCurrentMain`: 큐앱 현재 메인이 이 곡일 때만, 일치 role에만 POST — 옛 곡 오타 수정이 큐앱 메인을 덮어쓰던 결함), 삭제 시 큐앱 정리 실패를 토스트에 구분 표시.
- **PWA** — `public/logo-512.png` 실파일 생성(manifest.json이 참조하는데 파일이 없어 안드로이드 스플래시가 저해상 폴백이었음; rewrite 탓에 200 text/html로 조용히 실패), vite.config manifest에도 512 등록, ReloadPrompt의 도달 불가 '업데이트' 버튼 분기 제거(autoUpdate 체제에선 needRefresh가 발화하지 않음).
- 검증: 빌드 통과 + 로컬 프리뷰에서 곡 순서/뱃지/이번주 연속재생/검색/마이그레이션 보존 실측 확인. 콘솔 오류 0.

수리 보류(사용자 결정 대기): `kolonOrder`/`sindunOrder` 큐레이션 순서를 화면에 적용할지 vs 삭제할지.

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

### 1. App 버전 마이그레이션 (App.jsx 상단)
- `APP_VERSION = 'v1.5'` 와 `localStorage.app_version`이 다르면 **localStorage 전체를 clear**.
- 단, **`PRESERVE_KEYS` 배열(찜·연습·챌린지·테마·장소·VIP·커뮤니티·좋아요·설치배너) + `bookmarks_` 접두 키는 백업 후 복원** — 사용자 데이터이므로 절대 잃으면 안 됨. (2026-06-10 수리: 그 전엔 죽은 키 3개만 백업해서 사실상 전부 날아가는 상태였음.)
- **새 사용자 데이터 localStorage 키를 추가하면 반드시 App.jsx의 `PRESERVE_KEYS`에도 등록할 것.** 안 그러면 다음 버전 올릴 때 그 데이터만 날아감.

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

- `vite-plugin-pwa` with `registerType: 'autoUpdate'` + skipWaiting/clientsClaim — 새 SW는 다음 로드 시 자동 활성화·자동 reload (2026-05-26 `7cfd5b2`에서 'prompt'→전환: 옛 번들 갇힘 해소 목적. ReloadPrompt는 오프라인 준비 안내만 표시).
- manifest: `public/manifest.json` (앱 이름 "스텝바이스텝 💃") — index.html이 직접 링크. vite-plugin-pwa가 생성하는 `manifest.webmanifest`도 공존(내용은 vite.config.js manifest 블록).
- icons: `public/logo-192.png`, `logo-512.png`(2026-06-10 생성 — 그 전엔 manifest가 참조만 하고 파일이 없었음), `favicon.png`.
- 별도 정적: `public/jive-guide.html` (SPA rewrite 예외 — 직접 접근).
- ⚠️ vercel.json rewrite는 존재하지 않는 파일 경로도 index.html(200)로 돌리므로, 자산 누락이 404 대신 조용한 text/html 응답으로 가려짐 — 자산 추가 시 prod에서 `curl -I`로 Content-Type 확인 권장.

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
