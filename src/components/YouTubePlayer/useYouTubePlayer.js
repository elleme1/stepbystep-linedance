import { useRef, useEffect, useCallback, useState } from 'react';

/**
 * YouTube IFrame API 로딩, Player 생성/파괴, 영상 전환, 속도/화질 제어를 하나의 훅으로 통합.
 *
 * 🔑 핵심 원칙: 플레이어는 한 번만 생성하고, 영상만 교체한다.
 *    - createPlayer는 videoId에 의존하지 않고 최초 1회만 실행
 *    - videoId 변경 시 loadVideoById / cueVideoById로 영상만 swap
 *    - isReady가 불필요하게 리셋되지 않아 제어 함수 항상 유효
 *
 * @param {Object} options
 * @param {React.RefObject} options.containerRef - 플레이어를 렌더링할 DOM ref
 * @param {string} options.videoId - YouTube 영상 ID
 * @param {boolean} [options.autoplay=false] - 자동 재생 여부
 * @param {function} [options.onReady] - 플레이어 준비 콜백
 * @param {function} [options.onStateChange] - 플레이어 상태 변경 콜백
 */
export default function useYouTubePlayer({
  containerRef,
  videoId,
  autoplay = false,
  playerVars: externalPlayerVars,
  onReady,
  onStateChange,
}) {
  const playerRef = useRef(null);
  const loadedVideoId = useRef(null);
  const mountedRef = useRef(true);
  const [isReady, setIsReady] = useState(false);

  // 최신 콜백/옵션을 ref로 유지 → useEffect 의존성 배열에서 제거
  const onReadyRef = useRef(onReady);
  const onStateChangeRef = useRef(onStateChange);
  const autoplayRef = useRef(autoplay);
  const videoIdRef = useRef(videoId);
  const externalPlayerVarsRef = useRef(externalPlayerVars);
  onReadyRef.current = onReady;
  onStateChangeRef.current = onStateChange;
  autoplayRef.current = autoplay;
  videoIdRef.current = videoId;
  externalPlayerVarsRef.current = externalPlayerVars;

  // ============================
  // 플레이어 생성 (최초 1회만)
  // ============================
  const createPlayer = useCallback(() => {
    if (!mountedRef.current || !window.YT?.Player || !containerRef.current) return;

    // 기존 플레이어 정리
    if (playerRef.current) {
      try { playerRef.current.destroy(); } catch (e) {}
      playerRef.current = null;
    }

    const initialVideoId = videoIdRef.current || '';
    loadedVideoId.current = initialVideoId;

    // 컨테이너 안에 자식 div를 동적 생성 → YT.Player가 이것만 iframe으로 교체
    containerRef.current.innerHTML = '';
    const targetDiv = document.createElement('div');
    targetDiv.style.cssText = 'width:100%;height:100%';
    containerRef.current.appendChild(targetDiv);

    playerRef.current = new window.YT.Player(targetDiv, {
      width: '100%',
      height: '100%',
      videoId: initialVideoId,
      playerVars: {
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        cc_load_policy: 0,
        autoplay: autoplayRef.current ? 1 : 0,
        ...externalPlayerVarsRef.current,
      },
      events: {
        onReady: (e) => {
          if (!mountedRef.current) return;
          setIsReady(true);

          // iframe에 allowfullscreen 추가
          try {
            const iframe = e.target.getIframe();
            if (iframe) {
              iframe.setAttribute('allowfullscreen', 'true');
              iframe.setAttribute('webkit-playsinline', '1');
              iframe.setAttribute('allow',
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen');
            }
          } catch (err) {}

          // 자막(CC) 끄기 — 자막 트랙 모듈 제거 (영상에 박힌 자막은 해당 없음)
          try { e.target.unloadModule('captions'); } catch (err) {}
          try { e.target.unloadModule('cc'); } catch (err) {}

          onReadyRef.current?.(e);
        },
        onStateChange: (e) => {
          if (!mountedRef.current) return;
          // 자막(CC) 끄기 — captions 모듈은 '재생 시작' 때 비로소 로드되고
          // 곡 전환(loadVideoById)마다 새로 만들어지므로 PLAYING마다 언로드해야
          // 실제로 꺼진다. (onReady 시점 호출은 모듈이 아직 없어 공회전)
          if (e.data === window.YT?.PlayerState?.PLAYING) {
            try { e.target.unloadModule('captions'); } catch (err) {}
          }
          onStateChangeRef.current?.(e);
        },
      },
    });
  }, []); // ← 빈 의존성: videoId/autoplay에 의존하지 않음

  // ============================
  // YT API 로딩 + 플레이어 최초 생성
  // ============================
  useEffect(() => {
    mountedRef.current = true;

    if (window.YT?.Player) {
      // API 완전 로딩됨 → 바로 플레이어 생성
      createPlayer();
    } else {
      // API 미로딩 또는 로딩 중(YT 존재하지만 Player 미정의) → 콜백 등록
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        if (mountedRef.current) createPlayer();
      };
    }

    return () => {
      mountedRef.current = false;
      try { playerRef.current?.destroy(); } catch (e) {}
      playerRef.current = null;
      setIsReady(false);
    };
  }, [createPlayer]);

  // ============================
  // videoId 변경 시 영상만 교체 (플레이어 재생성 없음)
  // ============================
  useEffect(() => {
    if (!isReady || !playerRef.current || !videoId) return;
    if (videoId === loadedVideoId.current) return;

    loadedVideoId.current = videoId;
    try {
      // 항상 loadVideoById 사용 → 자동 재생 보장
      // 이전에는 cueVideoById(재생 안함)와 loadVideoById(재생함)를 autoplay prop으로 구분했으나,
      // 연속재생 등에서 prop이 false로 고정된 경우 재생이 안되는 문제 발생.
      // 곡 전환 시에는 항상 loadVideoById로 즉시 재생하고,
      // 재생을 원하지 않는 경우 호출부(PlaylistPage 등)에서 pause()를 사용.
      playerRef.current.loadVideoById(videoId);
    } catch (e) {}
  }, [videoId, isReady]);

  // ============================
  // 외부에서 사용할 제어 함수들
  // ============================
  const setSpeed = useCallback((speed) => {
    try { playerRef.current?.setPlaybackRate(speed); } catch (e) {}
  }, []);

  const setQuality = useCallback((quality) => {
    try { playerRef.current?.setPlaybackQuality(quality); } catch (e) {}
  }, []);

  const seekTo = useCallback((time, allowSeekAhead = true) => {
    try { playerRef.current?.seekTo(time, allowSeekAhead); } catch (e) {}
  }, []);

  const getCurrentTime = useCallback(() => {
    try { return playerRef.current?.getCurrentTime() || 0; } catch (e) { return 0; }
  }, []);

  const getDuration = useCallback(() => {
    try { return playerRef.current?.getDuration() || 0; } catch (e) { return 0; }
  }, []);

  const play = useCallback(() => {
    try { playerRef.current?.playVideo(); } catch (e) {}
  }, []);

  const pause = useCallback(() => {
    try { playerRef.current?.pauseVideo(); } catch (e) {}
  }, []);

  return {
    playerRef,
    isReady,
    setSpeed,
    setQuality,
    seekTo,
    getCurrentTime,
    getDuration,
    play,
    pause,
  };
}
