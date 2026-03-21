import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import songs, { getSongsForLocation } from '../data/songs';
import { useLocation } from '../context/LocationContext';

export default function VideoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [viewMode, setViewMode] = useState('main');
    const [isCinema, setIsCinema] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [playerReady, setPlayerReady] = useState(false);
    const [isMirror, setIsMirror] = useState(false);

    // 📱 모바일 판별 (데스크톱에서는 시네마/가로 자동 전환 비활성화)
    const isMobile = useMemo(() => 
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        || ('ontouchstart' in window && window.innerWidth < 1024)
    , []);

    // 📱 모바일에서만 가로 모드 감지 (데스크톱은 항상 false)
    useEffect(() => {
        if (!isMobile) { setIsLandscape(false); return; }
        const checkOrientation = () => {
            setIsLandscape(window.innerWidth > window.innerHeight);
        };
        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', () => setTimeout(checkOrientation, 100));
        return () => {
            window.removeEventListener('resize', checkOrientation);
            window.removeEventListener('orientationchange', checkOrientation);
        };
    }, [isMobile]);

    // 🎬 HD 강제
    const [quality, setQuality] = useState('hd720');

    // 🔁 A-B 구간 반복
    const [pointA, setPointA] = useState(null);
    const [pointB, setPointB] = useState(null);
    const [abLoopActive, setAbLoopActive] = useState(false);
    const abIntervalRef = useRef(null);

    // 🖼️ PIP 모드
    const [isPip, setIsPip] = useState(false);

    // 🎵 카운트 오버레이
    const [showCount, setShowCount] = useState(false);
    const [bpm, setBpm] = useState(120);
    const [currentBeat, setCurrentBeat] = useState(0);
    const countIntervalRef = useRef(null);

    // 🔖 북마크
    const [bookmarks, setBookmarks] = useState([]);

    // 🔆 밝기/대비
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [showFilters, setShowFilters] = useState(false);

    // 🎛️ 도구 패널 토글
    const [activeTool, setActiveTool] = useState(null); // 'speed' | 'ab' | 'count' | 'bookmark' | 'filter' | null

    const playerRef = useRef(null);
    const containerRef = useRef(null);
    const loadedVideoId = useRef(null);
    const mountedRef = useRef(true);

    const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5];

    useEffect(() => {
        window.scrollTo(0, 0);
        setViewMode('main');
        setIsCinema(false);
        setPointA(null);
        setPointB(null);
        setAbLoopActive(false);
    }, [id]);

    const { selectedLocation } = useLocation();

    // 📍 장소별 곡 목록 — 이전/다음 네비게이션은 이 배열 기준
    const locationSongs = useMemo(() => getSongsForLocation(selectedLocation), [selectedLocation]);

    const currentIndex = locationSongs.findIndex(song => String(song.id) === String(id));
    const videoData = currentIndex !== -1 ? locationSongs[currentIndex] : (locationSongs[0] || songs[0]);
    const prevSong = currentIndex > 0 ? locationSongs[currentIndex - 1] : null;
    const nextSong = currentIndex < locationSongs.length - 1 ? locationSongs[currentIndex + 1] : null;

    const extractVideoId = (url) => {
        if (!url) return '';
        const str = String(url).trim();
        if (str.length === 11 && !str.includes('/')) return str;
        const match = str.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
        return match ? match[1] : str;
    };

    const rawMainId = videoData.mainVideoId || videoData.youtubeId || '';
    const rawTutorialId = videoData.tutorialVideoId || videoData.tutorialId || rawMainId;
    const currentRawId = viewMode === 'main' ? rawMainId : rawTutorialId;
    const currentVideoId = extractVideoId(currentRawId);

    // 🔖 북마크 로드
    useEffect(() => {
        if (currentVideoId) {
            const saved = localStorage.getItem(`bookmarks_${currentVideoId}`);
            if (saved) try { setBookmarks(JSON.parse(saved)); } catch (e) {}
            else setBookmarks([]);
        }
    }, [currentVideoId]);

    const saveBookmarks = (bms) => {
        setBookmarks(bms);
        if (currentVideoId) {
            localStorage.setItem(`bookmarks_${currentVideoId}`, JSON.stringify(bms));
        }
    };

    // YouTube Player 생성
    const createPlayer = useCallback(() => {
        if (!mountedRef.current || !window.YT || !window.YT.Player || !containerRef.current || !currentVideoId) return;
        if (playerRef.current) {
            try { playerRef.current.destroy(); } catch (e) {}
            playerRef.current = null;
        }
        loadedVideoId.current = currentVideoId;
        playerRef.current = new window.YT.Player(containerRef.current, {
            width: '100%',
            height: '100%',
            videoId: currentVideoId,
            playerVars: { rel: 0, modestbranding: 1, playsinline: 1, autoplay: 0, cc_load_policy: 3 },
            events: {
                onReady: () => {
                    if (!mountedRef.current) return;
                    setPlayerReady(true);
                    try {
                        playerRef.current.setPlaybackRate(speed);
                        playerRef.current.setPlaybackQuality(quality);
                    } catch (e) {}
                    // 📺 iframe에 allowfullscreen 속성 추가 → YouTube 내장 전체화면 버튼 활성화
                    try {
                        const iframe = document.querySelector('#yt-player-container iframe');
                        if (iframe) {
                            iframe.setAttribute('allowfullscreen', 'true');
                            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen');
                            iframe.setAttribute('webkitallowfullscreen', 'true');
                            iframe.setAttribute('mozallowfullscreen', 'true');
                        }
                    } catch (e) {}
                },
                onPlaybackQualityChange: (e) => {
                    // HD 강제 적용 확인
                },
            }
        });
    }, [currentVideoId]);

    useEffect(() => {
        mountedRef.current = true;
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScript = document.getElementsByTagName('script')[0];
            firstScript.parentNode.insertBefore(tag, firstScript);
            window.onYouTubeIframeAPIReady = createPlayer;
        } else if (window.YT.Player) {
            createPlayer();
        }
        return () => {
            mountedRef.current = false;
            clearInterval(abIntervalRef.current);
            clearInterval(countIntervalRef.current);
            try { if (playerRef.current?.destroy) playerRef.current.destroy(); } catch (e) {}
            playerRef.current = null;
            setPlayerReady(false);
        };
    }, []);

    useEffect(() => {
        if (!playerReady || !playerRef.current || !currentVideoId) return;
        if (currentVideoId === loadedVideoId.current) return;
        loadedVideoId.current = currentVideoId;
        try {
            playerRef.current.cueVideoById(currentVideoId);
            playerRef.current.setPlaybackRate(speed);
            playerRef.current.setPlaybackQuality(quality);
        } catch (e) {}
    }, [currentVideoId, playerReady]);

    // ⏩ 속도 변경
    const handleSpeedChange = (s) => {
        setSpeed(s);
        try { playerRef.current?.setPlaybackRate(s); } catch (e) {}
    };

    // 🎬 HD 강제
    const handleQualityChange = (q) => {
        setQuality(q);
        try { playerRef.current?.setPlaybackQuality(q); } catch (e) {}
    };

    // 🔁 A-B 구간 반복
    const getCurrentTime = () => {
        try { return playerRef.current?.getCurrentTime() || 0; } catch (e) { return 0; }
    };

    const formatTime = (sec) => {
        if (sec == null) return '--:--';
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${String(s).padStart(2, '0')}`;
    };

    const setAPoint = () => {
        const t = getCurrentTime();
        setPointA(t);
        if (pointB !== null && t >= pointB) setPointB(null);
    };

    const setBPoint = () => {
        const t = getCurrentTime();
        if (pointA !== null && t > pointA) {
            setPointB(t);
            setAbLoopActive(true);
        }
    };

    const clearAB = () => {
        setPointA(null);
        setPointB(null);
        setAbLoopActive(false);
        clearInterval(abIntervalRef.current);
    };

    // A-B 루프: 검은 화면 방지를 위해 allowSeekAhead=false 사용 + 중복 seek 억제
    const lastSeekTimeRef = useRef(0);
    useEffect(() => {
        clearInterval(abIntervalRef.current);
        if (abLoopActive && pointA !== null && pointB !== null) {
            abIntervalRef.current = setInterval(() => {
                const t = getCurrentTime();
                const now = Date.now();
                // B 지점을 넘었을 때만 seek (중복 seek 방지: 최소 500ms 간격)
                if (t >= pointB && now - lastSeekTimeRef.current > 500) {
                    lastSeekTimeRef.current = now;
                    try {
                        playerRef.current?.seekTo(pointA, false);
                    } catch (e) {}
                }
            }, 250);
        }
        return () => clearInterval(abIntervalRef.current);
    }, [abLoopActive, pointA, pointB]);

    // 🖼️ PIP 모드
    const togglePip = async () => {
        try {
            const iframe = document.querySelector('#yt-player-container iframe');
            if (!iframe) return;
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
                setIsPip(false);
            } else {
                // PIP는 video 요소에서만 가능 — iframe 내부 접근 불가하므로 대안 사용
                // YouTube 영상은 팝아웃 방식으로 처리
                window.open(`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0&playsinline=1`, '_blank',
                    'width=400,height=250,toolbar=0,menubar=0,location=0');
                setIsPip(true);
            }
        } catch (e) {}
    };

    // 🎵 카운트 오버레이
    useEffect(() => {
        clearInterval(countIntervalRef.current);
        if (showCount && bpm > 0) {
            const interval = (60 / bpm) * 1000;
            setCurrentBeat(0);
            countIntervalRef.current = setInterval(() => {
                setCurrentBeat(prev => (prev % 8) + 1);
            }, interval);
        }
        return () => clearInterval(countIntervalRef.current);
    }, [showCount, bpm]);

    // 🔖 북마크 추가
    const addBookmark = () => {
        const t = getCurrentTime();
        const label = prompt(`${formatTime(t)} 시점에 메모를 입력하세요:`, `스텝 포인트`);
        if (label) {
            saveBookmarks([...bookmarks, { time: t, label, id: Date.now() }].sort((a, b) => a.time - b.time));
        }
    };

    const jumpToBookmark = (time) => {
        try { playerRef.current?.seekTo(time, true); } catch (e) {}
    };

    const deleteBookmark = (bmId) => {
        saveBookmarks(bookmarks.filter(b => b.id !== bmId));
    };

    // 🔗 영상 공유
    const [shareToast, setShareToast] = useState('');
    const handleShare = async () => {
        const shareUrl = `https://stepbystep-linedance.vercel.app/video/${id}`;
        const youtubeUrl = `https://youtu.be/${currentVideoId}`;
        const shareText = `💃 ${videoData.title}\n\n구향회 스텝바이스텝 라인댄스에서 함께 춰봐요!\n\n🎬 영상: ${youtubeUrl}\n📱 앱: ${shareUrl}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `💃 ${videoData.title} - 스텝바이스텝`,
                    text: shareText,
                    url: shareUrl,
                });
            } catch (e) {
                // 사용자가 취소한 경우
            }
        } else {
            // Web Share API 미지원 (데스크톱) → 클립보드 복사
            try {
                await navigator.clipboard.writeText(shareText);
                setShareToast('📋 링크가 복사되었습니다! 카톡에 붙여넣기 하세요');
                setTimeout(() => setShareToast(''), 2500);
            } catch (e) {
                // prompt 폴백
                prompt('아래 링크를 복사하세요:', shareUrl);
            }
        }
    };

    // CSS 필터
    const filterStyle = {
        filter: `brightness(${brightness}%) contrast(${contrast}%)`,
        transition: 'filter 0.3s ease',
    };

    const toolBtnStyle = (isActive) => ({
        padding: '8px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 700,
        border: isActive ? '2px solid #ff2d55' : '1px solid rgba(255,255,255,0.1)',
        background: isActive ? 'rgba(255,45,85,0.15)' : 'rgba(255,255,255,0.05)',
        color: isActive ? '#ff6b8a' : '#a0a0c0',
        cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '4px',
    });

    // 📺 시네마 모드 (CSS 기반 전체화면)
    const playerContainerFullRef = useRef(null);

    const enterCinema = useCallback(() => {
        if (!isMobile) {
            // 데스크톱: 브라우저 Fullscreen API
            const container = document.querySelector('#yt-player-container');
            if (container && container.requestFullscreen) {
                container.requestFullscreen().catch(() => setIsCinema(true));
            } else {
                setIsCinema(true); // 폴백
            }
        } else {
            // 모바일: CSS 시네마 모드
            setIsCinema(true);
            setTimeout(() => {
                try {
                    const iframe = document.querySelector('#yt-player-container iframe');
                    if (iframe) { iframe.style.width = '100%'; iframe.style.height = '100%'; }
                } catch (e) {}
            }, 100);
        }
    }, [isMobile]);

    const manualExitRef = useRef(false);

    const exitCinema = useCallback(() => {
        setIsCinema(false);
        manualExitRef.current = true;
        // 데스크톱: Fullscreen API 종료
        if (!isMobile && document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        }
    }, [isMobile]);

    // 데스크톱: ESC 키 등으로 전체화면 종료 시 상태 동기화
    useEffect(() => {
        if (isMobile) return;
        const onFsChange = () => {
            if (!document.fullscreenElement) setIsCinema(false);
        };
        document.addEventListener('fullscreenchange', onFsChange);
        return () => document.removeEventListener('fullscreenchange', onFsChange);
    }, [isMobile]);

    // 모바일 가로 → 자동 시네마 (수동 종료 시 무시) / 세로 → 자동 해제 + 플래그 리셋
    useEffect(() => {
        if (isMobile && isLandscape && !manualExitRef.current) setIsCinema(true);
        if (isMobile && !isLandscape) {
            setIsCinema(false);
            manualExitRef.current = false; // 세로 복귀 시 리셋 → 다음 가로에서 자동 진입
        }
    }, [isMobile, isLandscape]);

    // 모바일 시네마 → 전체화면 (데스크톱은 항상 false)
    const isFullscreen = isMobile && isCinema;
    // 🎬 가로 시네마 모드 (모바일 + 시네마 + 가로)
    const isLandscapeCinema = isMobile && isCinema && isLandscape;

    return (
        <div ref={playerContainerFullRef} style={isFullscreen
            ? {
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
                zIndex: 9997, backgroundColor: '#000',
                display: 'flex', flexDirection: 'column',
                touchAction: 'manipulation',
                // 가로 시네마: padding/margin 완전 제거, overflow 숨김
                ...(isLandscapeCinema ? { padding: 0, margin: 0, overflow: 'hidden' } : {}),
              }
            : { backgroundColor: '#0a0a0f', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#fff' }
        }>

            {/* 🔙 시네마 모드일 때 버튼들 */}
            {isFullscreen && (
                <>
                    {/* 가로 시네마: 상단 반투명 그라데이션 오버레이 컨트롤 */}
                    {isLandscapeCinema ? (
                        <div style={{
                            position: 'fixed', top: 0, left: 0, right: 0,
                            height: '48px',
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
                            display: 'flex', alignItems: 'center',
                            padding: '0 12px',
                            gap: '12px',
                            zIndex: 10000,
                            pointerEvents: 'auto',
                        }}>
                            <button
                                onClick={() => navigate(-1)}
                                onTouchEnd={(e) => { e.preventDefault(); navigate(-1); }}
                                style={{
                                    background: 'rgba(0,0,0,0.4)', color: '#fff', border: 'none',
                                    borderRadius: '16px', padding: '6px 14px',
                                    fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                                    backdropFilter: 'blur(4px)', touchAction: 'manipulation',
                                }}
                            >‹ 돌아가기</button>
                            <div style={{ flex: 1 }} />
                            <button
                                onClick={exitCinema}
                                onTouchEnd={(e) => { e.preventDefault(); exitCinema(); }}
                                style={{
                                    background: 'rgba(0,0,0,0.4)', color: '#fff', border: 'none',
                                    borderRadius: '16px', padding: '6px 14px',
                                    fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                                    backdropFilter: 'blur(4px)', touchAction: 'manipulation',
                                }}
                            >✕ 화면작게</button>
                        </div>
                    ) : (
                        /* 세로 시네마: 기존 개별 fixed 버튼 */
                        <>
                            <button
                                onClick={() => navigate(-1)}
                                onTouchEnd={(e) => { e.preventDefault(); navigate(-1); }}
                                style={{
                                    position: 'fixed', top: 'max(8px, env(safe-area-inset-top))', left: '12px', zIndex: 10000,
                                    background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', fontSize: '18px',
                                    borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    backdropFilter: 'blur(4px)', pointerEvents: 'auto', touchAction: 'manipulation',
                                }}
                                aria-label="돌아가기"
                            >←</button>
                            <button
                                onClick={exitCinema}
                                onTouchEnd={(e) => { e.preventDefault(); exitCinema(); }}
                                style={{
                                    position: 'fixed', top: 'max(8px, env(safe-area-inset-top))', right: '12px', zIndex: 10000,
                                    background: 'rgba(255,45,85,0.9)', border: 'none', color: '#fff', fontSize: '14px', fontWeight: 'bold',
                                    borderRadius: '20px', padding: '10px 16px', cursor: 'pointer',
                                    pointerEvents: 'auto', touchAction: 'manipulation',
                                }}
                            >✕ 화면 작게</button>
                        </>
                    )}
                </>
            )}
            {/* 📺 영상 플레이어 — 모바일: 자동 크게 / 데스크톱: 16:9 */}
            <div id="yt-player-container" style={isLandscapeCinema ? {
                // 가로 시네마: 화면 꽉 채움
                position: 'absolute', top: 0, left: 0,
                width: '100%', height: '100%',
                backgroundColor: '#000',
            } : isFullscreen ? {
                flex: 1, width: '100%', position: 'relative', backgroundColor: '#000',
            } : isMobile ? {
                width: '100%', position: 'relative', backgroundColor: '#000',
                height: 'calc(100dvh - 140px)', minHeight: '250px',
            } : {
                width: '100%', position: 'relative', backgroundColor: '#000',
                aspectRatio: '16/9', maxHeight: '70vh',
                minHeight: '250px', borderRadius: '12px', overflow: 'hidden',
            }}>
                {/* 돌아가기 버튼 — 비시네마 모드에서만 (시네마일 때는 위 오버레이 사용) */}
                {!isFullscreen && (
                    <button onClick={() => navigate(-1)} style={{
                        position: 'absolute', top: 'max(12px, env(safe-area-inset-top))', left: '12px', zIndex: 10,
                        background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', fontSize: '14px', fontWeight: 'bold',
                        display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '20px',
                        cursor: 'pointer', backdropFilter: 'blur(10px)',
                    }}>
                        <span style={{ fontSize: '20px' }}>‹</span> 돌아가기
                    </button>
                )}
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0,
                    transform: isMirror ? 'scaleX(-1)' : 'none', ...filterStyle,
                }}>
                    <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
                </div>

                {/* 카운트 오버레이 */}
                {showCount && (
                    <div style={{
                        position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50)',
                        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
                        borderRadius: '20px', padding: '12px 24px', display: 'flex', gap: '8px', zIndex: 5,
                    }}>
                        {[1,2,3,4,5,6,7,8].map(n => (
                            <div key={n} style={{
                                width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '16px', fontWeight: 900,
                                background: currentBeat === n ? 'linear-gradient(135deg, #ff2d55, #ff6b8a)' : 'rgba(255,255,255,0.1)',
                                color: currentBeat === n ? '#fff' : '#666',
                                transform: currentBeat === n ? 'scale(1.3)' : 'scale(1)',
                                transition: 'all 0.15s ease',
                                boxShadow: currentBeat === n ? '0 0 20px rgba(255,45,85,0.5)' : 'none',
                            }}>{n}</div>
                        ))}
                    </div>
                )}

                {/* A-B 루프 상태 표시 */}
                {abLoopActive && (
                    <div style={{
                        position: 'absolute', top: '12px', left: '12px', background: 'rgba(255,45,85,0.9)',
                        borderRadius: '12px', padding: '6px 14px', fontSize: '13px', fontWeight: 700, color: '#fff', zIndex: 5,
                    }}>
                        🔁 {formatTime(pointA)} → {formatTime(pointB)}
                    </div>
                )}

                {/* 화면작게 버튼은 위 fixed 버튼으로 이동됨 */}
                {/* 📱 모바일 세로에서만 가로 전환 안내 */}
                {isMobile && !isFullscreen && !isLandscape && (
                    <div style={{
                        position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)',
                        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', borderRadius: '20px',
                        padding: '6px 16px', fontSize: '12px', color: 'rgba(255,255,255,0.7)', zIndex: 5,
                        whiteSpace: 'nowrap',
                    }}>📱 가로로 돌리면 더 크게 볼 수 있어요</div>
                )}
            </div>

            {!isFullscreen && (
                <div style={{ padding: '16px 16px', flex: 1, paddingBottom: 'calc(24px + env(safe-area-inset-bottom))' }}>

                    {/* 🎛️ 도구 아이콘 바 */}
                    <div style={{
                        display: 'flex', gap: '6px', marginBottom: '12px', overflowX: 'auto', padding: '4px 0',
                        scrollbarWidth: 'none',
                    }}>
                        <button style={toolBtnStyle(activeTool === 'speed')} onClick={() => setActiveTool(activeTool === 'speed' ? null : 'speed')}>🐢 속도</button>
                        <button style={toolBtnStyle(activeTool === 'ab')} onClick={() => setActiveTool(activeTool === 'ab' ? null : 'ab')}>🔁 구간</button>
                        <button style={toolBtnStyle(activeTool === 'count')} onClick={() => setActiveTool(activeTool === 'count' ? null : 'count')}>🥁 카운트</button>
                        <button style={toolBtnStyle(activeTool === 'bookmark')} onClick={() => setActiveTool(activeTool === 'bookmark' ? null : 'bookmark')}>🔖 북마크</button>
                        <button style={toolBtnStyle(activeTool === 'filter')} onClick={() => setActiveTool(activeTool === 'filter' ? null : 'filter')}>🔆 화면</button>
                        <button style={toolBtnStyle(isMirror)} onClick={() => setIsMirror(!isMirror)}>🪞 거울</button>
                        <button style={toolBtnStyle(false)} onClick={togglePip}>📌 팝업</button>
                        <button style={toolBtnStyle(false)} onClick={handleShare}>🔗 공유</button>
                    </div>

                    {/* 🐢 속도 조절 패널 */}
                    {activeTool === 'speed' && (
                        <div style={panelStyle}>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {speeds.map(s => (
                                    <button key={s} onClick={() => handleSpeedChange(s)} style={{
                                        padding: '10px 16px', borderRadius: '20px', fontSize: '15px', fontWeight: 700,
                                        border: speed === s ? '2px solid #ff2d55' : '1px solid rgba(255,255,255,0.12)',
                                        background: speed === s ? 'rgba(255,45,85,0.2)' : 'rgba(255,255,255,0.05)',
                                        color: speed === s ? '#ff6b8a' : '#a0a0c0', cursor: 'pointer', minWidth: '54px',
                                    }}>
                                        {s === 0.25 ? '¼×' : s === 0.5 ? '½×' : s === 0.75 ? '¾×' : `${s}×`}
                                    </button>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', justifyContent: 'center' }}>
                                {['small', 'default', 'medium', 'large', 'hd720', 'hd1080'].map(q => (
                                    <button key={q} onClick={() => handleQualityChange(q)} style={{
                                        padding: '6px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 600,
                                        border: quality === q ? '1px solid #4ecdc4' : '1px solid rgba(255,255,255,0.08)',
                                        background: quality === q ? 'rgba(78,205,196,0.15)' : 'transparent',
                                        color: quality === q ? '#4ecdc4' : '#666', cursor: 'pointer',
                                    }}>
                                        {q === 'small' ? '240p' : q === 'default' ? '360p' : q === 'medium' ? '480p' : q === 'large' ? '720p' : q === 'hd720' ? 'HD' : 'FHD'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 🔁 A-B 구간 반복 패널 */}
                    {activeTool === 'ab' && (
                        <div style={panelStyle}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                                <button onClick={setAPoint} style={abBtnStyle('#ff6b8a')}>
                                    A 지점 {pointA !== null ? `(${formatTime(pointA)})` : '설정'}
                                </button>
                                <span style={{ color: '#555', fontSize: '18px' }}>→</span>
                                <button onClick={setBPoint} style={abBtnStyle('#4ecdc4')}>
                                    B 지점 {pointB !== null ? `(${formatTime(pointB)})` : '설정'}
                                </button>
                                {abLoopActive && (
                                    <button onClick={clearAB} style={{ ...abBtnStyle('#ff4444'), background: 'rgba(255,68,68,0.15)' }}>
                                        ✕ 해제
                                    </button>
                                )}
                            </div>
                            <p style={{ textAlign: 'center', color: '#666', fontSize: '12px', margin: '8px 0 0' }}>
                                {!pointA ? '▶ 영상 재생 후 A 지점을 설정하세요' : !pointB ? '▶ B 지점을 설정하면 자동 반복됩니다' : '🔁 A-B 구간 반복 중'}
                            </p>
                        </div>
                    )}

                    {/* 🥁 카운트 오버레이 패널 */}
                    {activeTool === 'count' && (
                        <div style={panelStyle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
                                <button onClick={() => setShowCount(!showCount)} style={{
                                    padding: '10px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: 700,
                                    border: 'none', cursor: 'pointer',
                                    background: showCount ? 'linear-gradient(135deg, #ff2d55, #ff6b8a)' : 'rgba(255,255,255,0.1)',
                                    color: '#fff',
                                }}>
                                    {showCount ? '⏹ 카운트 끄기' : '▶ 카운트 켜기'}
                                </button>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginTop: '10px' }}>
                                <span style={{ color: '#999', fontSize: '13px' }}>BPM</span>
                                <button onClick={() => setBpm(Math.max(60, bpm - 5))} style={smallBtnStyle}>−</button>
                                <span style={{ color: '#fff', fontSize: '18px', fontWeight: 800, width: '50px', textAlign: 'center' }}>{bpm}</span>
                                <button onClick={() => setBpm(Math.min(200, bpm + 5))} style={smallBtnStyle}>+</button>
                            </div>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '8px' }}>
                                {[80, 100, 120, 140, 160].map(b => (
                                    <button key={b} onClick={() => setBpm(b)} style={{
                                        padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                                        border: bpm === b ? '1px solid #ff2d55' : '1px solid rgba(255,255,255,0.08)',
                                        background: bpm === b ? 'rgba(255,45,85,0.15)' : 'transparent',
                                        color: bpm === b ? '#ff6b8a' : '#666', cursor: 'pointer',
                                    }}>{b}</button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 🔖 북마크 패널 */}
                    {activeTool === 'bookmark' && (
                        <div style={panelStyle}>
                            <button onClick={addBookmark} style={{
                                width: '100%', padding: '12px', borderRadius: '12px', fontSize: '14px', fontWeight: 700,
                                border: '1px dashed rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.03)',
                                color: '#a0a0c0', cursor: 'pointer', marginBottom: bookmarks.length ? '10px' : 0,
                            }}>
                                ➕ 현재 시점 북마크 추가
                            </button>
                            {bookmarks.map(bm => (
                                <div key={bm.id} style={{
                                    display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px',
                                    background: 'rgba(255,255,255,0.03)', borderRadius: '10px', marginTop: '6px',
                                }}>
                                    <button onClick={() => jumpToBookmark(bm.time)} style={{
                                        background: 'rgba(255,45,85,0.15)', border: 'none', color: '#ff6b8a',
                                        padding: '4px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                                    }}>{formatTime(bm.time)}</button>
                                    <span style={{ flex: 1, color: '#bbb', fontSize: '13px' }}>{bm.label}</span>
                                    <button onClick={() => deleteBookmark(bm.id)} style={{
                                        background: 'transparent', border: 'none', color: '#555', fontSize: '14px', cursor: 'pointer',
                                    }}>✕</button>
                                </div>
                            ))}
                            {bookmarks.length === 0 && (
                                <p style={{ textAlign: 'center', color: '#555', fontSize: '12px', margin: '8px 0 0' }}>
                                    아직 북마크가 없어요
                                </p>
                            )}
                        </div>
                    )}

                    {/* 🔆 밝기/대비 패널 */}
                    {activeTool === 'filter' && (
                        <div style={panelStyle}>
                            <div style={{ marginBottom: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ color: '#999', fontSize: '13px' }}>☀️ 밝기</span>
                                    <span style={{ color: '#ff6b8a', fontSize: '13px', fontWeight: 700 }}>{brightness}%</span>
                                </div>
                                <input type="range" min={50} max={200} value={brightness} onChange={e => setBrightness(Number(e.target.value))}
                                    style={{ width: '100%', accentColor: '#ff2d55' }} />
                            </div>
                            <div style={{ marginBottom: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ color: '#999', fontSize: '13px' }}>🔲 대비</span>
                                    <span style={{ color: '#4ecdc4', fontSize: '13px', fontWeight: 700 }}>{contrast}%</span>
                                </div>
                                <input type="range" min={50} max={200} value={contrast} onChange={e => setContrast(Number(e.target.value))}
                                    style={{ width: '100%', accentColor: '#4ecdc4' }} />
                            </div>
                            <button onClick={() => { setBrightness(100); setContrast(100); }} style={{
                                width: '100%', padding: '8px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
                                border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#888', cursor: 'pointer',
                            }}>초기화</button>
                        </div>
                    )}

                    {/* 이전곡 / 전체화면 / 다음곡 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', background: '#1c1c26', padding: '8px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
                        <button onClick={() => prevSong && navigate(`/video/${prevSong.id}`)} disabled={!prevSong} style={{ flex: 1, padding: '12px 0', background: 'transparent', border: 'none', color: prevSong ? '#fff' : '#444', fontSize: '14px', fontWeight: 'bold', cursor: prevSong ? 'pointer' : 'default' }}>⏮ 이전 곡</button>
                        <div style={{ width: '1px', height: '24px', backgroundColor: '#3a3a45' }} />
                        <button onClick={enterCinema} style={{ flex: 1.2, padding: '12px 0', background: 'transparent', border: 'none', color: '#ff2d55', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>🎬 전체 화면</button>
                        <div style={{ width: '1px', height: '24px', backgroundColor: '#3a3a45' }} />
                        <button onClick={() => nextSong && navigate(`/video/${nextSong.id}`)} disabled={!nextSong} style={{ flex: 1, padding: '12px 0', background: 'transparent', border: 'none', color: nextSong ? '#fff' : '#444', fontSize: '14px', fontWeight: 'bold', cursor: nextSong ? 'pointer' : 'default' }}>다음 곡 ⏭</button>
                    </div>

                    {/* 실전 / 스텝설명 토글 */}
                    <div style={{ display: 'flex', background: '#1c1c26', borderRadius: '12px', padding: '4px', marginBottom: '16px' }}>
                        <button onClick={() => setViewMode('main')} style={{ flex: 1, padding: '14px 0', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'all 0.3s', backgroundColor: viewMode === 'main' ? '#ff2d55' : 'transparent', color: viewMode === 'main' ? '#fff' : '#888' }}>🎵 음악 맞춰 실전</button>
                        <button onClick={() => setViewMode('tutorial')} style={{ flex: 1, padding: '14px 0', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'all 0.3s', backgroundColor: viewMode === 'tutorial' ? '#ff2d55' : 'transparent', color: viewMode === 'tutorial' ? '#fff' : '#888' }}>👣 친절한 스텝 설명</button>
                    </div>

                    {/* 태그 + 곡 정보 */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                        {videoData.tags?.map((tag, idx) => (
                            <span key={idx} style={{ background: 'rgba(255,45,85,0.15)', color: '#ff2d55', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>{tag}</span>
                        ))}
                    </div>
                    <h1 style={{ fontSize: '22px', fontWeight: '800', lineHeight: '1.4', marginBottom: '8px', wordBreak: 'keep-all' }}>{videoData.title}</h1>
                    <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '16px' }}>안무가: {videoData.choreographer || '구향회 원장'}</p>

                    <div style={{ padding: '20px', backgroundColor: '#1a1a24', borderRadius: '12px', border: '1px solid #2a2a35' }}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#ff2d55' }}>📝 원장님의 안무 노트</h3>
                        <p style={{ color: '#ddd', fontSize: '15px', lineHeight: '1.6', margin: 0, wordBreak: 'keep-all', whiteSpace: 'pre-line' }}>{videoData.description || '신나게 스텝을 밟아보세요!'}</p>
                    </div>
                </div>
            )}

            {/* 공유 토스트 */}
            {shareToast && (
                <div style={{
                    position: 'fixed', bottom: '100px', left: '50%', transform: 'translateX(-50%)',
                    background: 'rgba(78,205,196,0.95)', color: '#fff', padding: '14px 24px',
                    borderRadius: '30px', fontSize: '14px', fontWeight: 700, zIndex: 9999,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)', whiteSpace: 'nowrap', pointerEvents: 'none',
                }}>{shareToast}</div>
            )}
        </div>
    );
}

// 공통 스타일
const panelStyle = {
    background: 'linear-gradient(135deg, #1a1a2e, #16213e)', borderRadius: '16px',
    padding: '16px', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.06)',
};

const abBtnStyle = (color) => ({
    padding: '10px 16px', borderRadius: '12px', fontSize: '13px', fontWeight: 700,
    border: `1px solid ${color}33`, background: `${color}15`, color, cursor: 'pointer',
});

const smallBtnStyle = {
    width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '18px', fontWeight: 700,
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
};