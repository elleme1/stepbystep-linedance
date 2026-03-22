# YouTubePlayer 근본 결함 수정 완료

## 수정된 파일 (3개)

### 1. [useYouTubePlayer.js](file:///Users/junghyunchoi/Downloads/라인댄스/src/components/YouTubePlayer/useYouTubePlayer.js)

**핵심 변경**: 플레이어 파괴/재생성 → 1회 생성 + 영상 swap

| 항목 | 이전 | 이후 |
|------|------|------|
| `createPlayer` 의존성 | `[videoId, autoplay]` | `[]` (빈 배열) |
| videoId 변경 시 | iframe 파괴 → 새로 생성 | `loadVideoById()` 호출 |
| `isReady` 상태 | 곡 전환마다 리셋 | 최초 1회만 `true` |
| 콜백/옵션 참조 | 직접 사용 | ref로 최신 유지 |

### 2. [YouTubePlayer.jsx](file:///Users/junghyunchoi/Downloads/라인댄스/src/components/YouTubePlayer/YouTubePlayer.jsx)

```diff
-  }));
+  }), [player, isCinema]);
```

`useImperativeHandle`에 의존성 배열 추가 → 외부 ref가 항상 최신 player 참조 유지

### 3. [PlaylistPage.jsx](file:///Users/junghyunchoi/Downloads/라인댄스/src/pages/PlaylistPage.jsx)

**`wantPlayRef` 플래그 패턴 도입**:
- ENDED → `wantPlayRef = true` → `setCurrentIndex(next)` → videoId 변경
- videoId 변경 effect에서 `wantPlayRef` 확인 → `player.play()` 호출

곡 선택/이전/다음 버튼에도 동일 패턴 적용

## 검증

- ✅ 빌드 성공 (vite build, 73 modules)
- ✅ GitHub 푸시 → Vercel 자동 배포
