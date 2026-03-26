import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDevice } from '../../context/DeviceContext';
import useYouTubePlayer from './useYouTubePlayer';
import CinemaOverlay from './CinemaOverlay';

/**
 * 통합 YouTube 플레이어 컴포넌트
 *
 * 모든 페이지에서 사용하는 YouTube 플레이어 + 레이아웃 + 시네마 모드 통합.
 *
 * Props:
 * @param {string}    videoId           - YouTube 영상 ID
 * @param {string}    [title='']        - 영상 제목 (시네마 오버레이에 표시)
 * @param {boolean}   [autoplay=false]  - 자동 재생
 * @param {boolean}   [showBackButton=true] - 돌아가기 버튼 표시
 * @param {function}  [onBack]          - 돌아가기 콜백 (미지정 시 navigate(-1))
 * @param {boolean}   [mirror=false]    - 좌우 반전
 * @param {number}    [brightness=100]  - 밝기 %
 * @param {number}    [contrast=100]    - 대비 %
 * @param {boolean}   [compact=false]   - TheoryPage 등 작은 임베드용
 * @param {ReactNode} [children]        - 영상 위 오버레이 UI (카운트, A-B 등)
 * @param {function}  [onReady]         - 플레이어 준비 콜백
 * @param {function}  [onStateChange]   - 상태 변경 콜백
 * @param {React.Ref} ref               - 외부에서 제어 함수 접근용
 */
const YouTubePlayer = React.forwardRef(function YouTubePlayer({
  videoId,
  title = '',
  autoplay = false,
  showBackButton = true,
  onBack,
  mirror = false,
  brightness = 100,
  contrast = 100,
  compact = false,
  children,
  onReady,
  onStateChange,
}, ref) {
  const navigate = useNavigate();
  const { isMobile, isLandscape } = useDevice();
  const containerRef = useRef(null);

  // 시네마 모드 상태
  const [isCinema, setIsCinema] = useState(false);
  const manualExitRef = useRef(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const overlayTimerRef = useRef(null);

  // YouTube Player 훅
  const player = useYouTubePlayer({
    containerRef,
    videoId,
    autoplay,
    onReady,
    onStateChange,
  });

  // ref를 통해 외부에서 제어 함수 접근
  React.useImperativeHandle(ref, () => ({
    ...player,
    enterCinema,
    exitCinema,
    isCinema,
  }), [player, isCinema]);

  // ============================
  // 시네마 모드 진입/종료
  // ============================
  const enterCinema = useCallback(() => {
    if (!isMobile) {
      // 데스크톱: Fullscreen API 사용
      const container = document.getElementById('yt-player-fullscreen-container');
      if (container?.requestFullscreen) {
        container.requestFullscreen().catch(() => setIsCinema(true));
      } else {
        setIsCinema(true);
      }
    } else {
      setIsCinema(true);
      setShowOverlay(true);
      clearTimeout(overlayTimerRef.current);
      overlayTimerRef.current = setTimeout(() => setShowOverlay(false), 3000);
    }
  }, [isMobile]);

  const exitCinema = useCallback(() => {
    setIsCinema(false);
    manualExitRef.current = true;
    if (!isMobile && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, [isMobile]);

  // 돌아가기
  const handleBack = useCallback(() => {
    if (isCinema) {
      exitCinema();
      return;
    }
    if (onBack) onBack();
    else navigate(-1);
  }, [onBack, navigate, isCinema, exitCinema]);

  // 데스크톱: fullscreenchange 동기화
  useEffect(() => {
    if (isMobile) return;
    const onFsChange = () => {
      if (!document.fullscreenElement) setIsCinema(false);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, [isMobile]);

  // 🔄 모바일 가로 ↔ 세로 자동 시네마 전환
  useEffect(() => {
    if (isMobile && isLandscape && !manualExitRef.current) {
      setIsCinema(true);
      setShowOverlay(true);
      clearTimeout(overlayTimerRef.current);
      overlayTimerRef.current = setTimeout(() => setShowOverlay(false), 3000);
    }
    if (isMobile && !isLandscape) {
      setIsCinema(false);
      manualExitRef.current = false;
    }
  }, [isMobile, isLandscape]);

  // 오버레이 터치 토글 (가로 시네마에서 영상 터치 시)
  const handleOverlayToggle = useCallback(() => {
    if (!(isMobile && isCinema && isLandscape)) return;
    setShowOverlay(prev => {
      const next = !prev;
      clearTimeout(overlayTimerRef.current);
      if (next) overlayTimerRef.current = setTimeout(() => setShowOverlay(false), 3000);
      return next;
    });
  }, [isMobile, isCinema, isLandscape]);

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => clearTimeout(overlayTimerRef.current);
  }, []);

  // 파생 상태
  const isFullscreen = isMobile && isCinema;
  const isLandscapeCinema = isMobile && isCinema && isLandscape;

  // ============================
  // compact 모드 (TheoryPage 임베드)
  // ============================
  if (compact) {
    return (
      <div style={{
        width: '100%', aspectRatio: '16/9', position: 'relative',
        backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden',
        isolation: 'isolate', zIndex: 0,
        transform: mirror ? 'scaleX(-1)' : 'none',
        filter: `brightness(${brightness}%) contrast(${contrast}%)`,
      }}>
        <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
        {children}
      </div>
    );
  }

  // ============================
  // 컨테이너 스타일 결정
  // ============================
  const getContainerStyle = () => {
    if (isLandscapeCinema) {
      return {
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
        zIndex: 9997, backgroundColor: '#000', padding: 0, margin: 0, overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      };
    }
    if (isFullscreen) {
      return {
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
        zIndex: 9997, backgroundColor: '#000',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        touchAction: 'manipulation', padding: 0, margin: 0, overflow: 'hidden',
      };
    }
    if (isMobile) {
      return {
        width: '100%', position: 'relative', backgroundColor: '#000',
        aspectRatio: '16/9',
      };
    }
    // 데스크톱
    return {
      width: '100%', position: 'relative', backgroundColor: '#000',
      aspectRatio: '16/9', maxHeight: '70vh',
      minHeight: '250px', borderRadius: '12px', overflow: 'hidden',
    };
  };

  // 영상 래퍼 스타일
  const getPlayerWrapperStyle = () => {
    if (isLandscapeCinema) {
      // 가로 시네마: 화면 전체 안에서 16:9 비율 유지, 중앙 정렬
      return {
        width: '100%', height: '100%', position: 'relative',
        maxWidth: 'calc(100dvh * 16 / 9)',  // 높이 기준 최대 너비
        aspectRatio: '16/9',
      };
    }
    if (isFullscreen) {
      // 세로 시네마: 가로에 맞춰 16:9 비율 유지
      return {
        width: '100%', position: 'relative',
        aspectRatio: '16/9',
      };
    }
    return { width: '100%', height: '100%', position: 'relative' };
  };

  // 필터 스타일 (밝기/대비/미러)
  const filterStyle = {
    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
    transition: 'filter 0.3s ease',
    transform: mirror ? 'scaleX(-1)' : 'none',
  };

  return (
    <div
      id="yt-player-fullscreen-container"
      onClick={handleOverlayToggle}
      style={getContainerStyle()}
    >
      {/* 시네마 오버레이 (모바일 시네마 모드에서만 표시) */}
      {isFullscreen && (
        <CinemaOverlay
          isLandscape={isLandscapeCinema}
          showOverlay={showOverlay}
          title={title}
          onBack={() => { if (onBack) onBack(); else navigate(-1); }}
          onExit={exitCinema}
        />
      )}

      {/* 비시네마: 돌아가기 버튼 */}
      {!isFullscreen && showBackButton && (
        <button onClick={handleBack} style={{
          position: 'absolute', top: 'max(12px, env(safe-area-inset-top))', left: '12px', zIndex: 10,
          background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', fontSize: '14px', fontWeight: 'bold',
          display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '20px',
          cursor: 'pointer', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        }}>
          <span style={{ fontSize: '20px' }}>‹</span> 돌아가기
        </button>
      )}

      {/* 비시네마 + 모바일: 시네마 진입 버튼 */}
      {!isFullscreen && isMobile && (
        <button onClick={enterCinema} style={{
          position: 'absolute', top: 'max(12px, env(safe-area-inset-top))', right: '12px', zIndex: 10,
          background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', fontSize: '14px', fontWeight: 'bold',
          display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '20px',
          cursor: 'pointer', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        }}>
          🔲 크게
        </button>
      )}

      {/* 영상 플레이어 */}
      <div style={getPlayerWrapperStyle()}>
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          zIndex: 0, ...filterStyle,
        }}>
          <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>

      {/* children: 카운트 오버레이, A-B 표시 등 영상 위 커스텀 UI */}
      {children}

      {/* 모바일 세로 + 비시네마: 가로 전환 안내 */}
      {isMobile && !isFullscreen && !isLandscape && (
        <div style={{
          position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          borderRadius: '20px', padding: '6px 16px', fontSize: '12px', color: 'rgba(255,255,255,0.7)',
          zIndex: 5, whiteSpace: 'nowrap',
        }}>📱 가로로 돌리면 더 크게 볼 수 있어요</div>
      )}
    </div>
  );
});

export default YouTubePlayer;
