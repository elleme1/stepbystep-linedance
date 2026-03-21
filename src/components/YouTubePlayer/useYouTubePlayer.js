import { useRef, useEffect, useCallback, useState } from 'react';

/**
 * YouTube IFrame API 로딩, Player 생성/파괴, 영상 전환, 속도/화질 제어를 하나의 훅으로 통합.
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
  onReady,
  onStateChange,
}) {
  const playerRef = useRef(null);
  const loadedVideoId = useRef(null);
  const mountedRef = useRef(true);
  const [isReady, setIsReady] = useState(false);

  // 콜백 refs: 최신 콜백 참조를 유지하면서 useEffect 의존성 배열에서 제거
  const onReadyRef = useRef(onReady);
  const onStateChangeRef = useRef(onStateChange);
  onReadyRef.current = onReady;
  onStateChangeRef.current = onStateChange;

  const createPlayer = useCallback(() => {
    if (!mountedRef.current || !window.YT?.Player || !containerRef.current || !videoId) return;

    // 기존 플레이어 정리
    if (playerRef.current) {
      try { playerRef.current.destroy(); } catch (e) {}
      playerRef.current = null;
    }

    loadedVideoId.current = videoId;

    // 컨테이너 안에 자식 div를 동적 생성 → YT.Player가 이것만 iframe으로 교체
    containerRef.current.innerHTML = '';
    const targetDiv = document.createElement('div');
    targetDiv.style.cssText = 'width:100%;height:100%';
    containerRef.current.appendChild(targetDiv);

    playerRef.current = new window.YT.Player(targetDiv, {
      width: '100%',
      height: '100%',
      videoId,
      playerVars: {
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        autoplay: autoplay ? 1 : 0,
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

          onReadyRef.current?.(e);
        },
        onStateChange: (e) => {
          if (!mountedRef.current) return;
          onStateChangeRef.current?.(e);
        },
      },
    });
  }, [videoId, autoplay]);

  // YT API 로딩 + 플레이어 생성
  useEffect(() => {
    mountedRef.current = true;

    const initWhenReady = () => {
      if (window.YT?.Player) {
        createPlayer();
      }
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        if (mountedRef.current) createPlayer();
      };
    } else {
      initWhenReady();
    }

    return () => {
      mountedRef.current = false;
      try { playerRef.current?.destroy(); } catch (e) {}
      playerRef.current = null;
      setIsReady(false);
    };
  }, [createPlayer]);

  // videoId 변경 시 영상 전환
  useEffect(() => {
    if (!isReady || !playerRef.current || !videoId) return;
    if (videoId === loadedVideoId.current) return;
    loadedVideoId.current = videoId;
    try {
      if (autoplay) {
        playerRef.current.loadVideoById(videoId);
      } else {
        playerRef.current.cueVideoById(videoId);
      }
    } catch (e) {}
  }, [videoId, isReady, autoplay]);

  // 외부에서 사용할 제어 함수들
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
