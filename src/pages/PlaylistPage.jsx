import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import songs from '../data/songs';
import { levelStars } from '../data/constants';
import { useLocation } from '../context/LocationContext';
import { useData } from '../context/DataContext';
import useYouTubePlayer from '../components/YouTubePlayer/useYouTubePlayer';

export default function PlaylistPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const mode = searchParams.get('mode') || 'thisweek';
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [shuffledOrder, setShuffledOrder] = useState([]);
    const [speed, setSpeed] = useState(1);
    const [isMirror, setIsMirror] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // 🚀 화면 최상단 ref
    const topRef = useRef(null);
    const containerRef = useRef(null);
    const progressInterval = useRef(null);
    const playlistRef = useRef(null);

    // 유튜브 API 콜백에서 항상 최신 상태를 유지하기 위한 저장소
    const stateRef = useRef({});
    stateRef.current = { isAutoPlay, isRepeat, isPlaying, currentIndex, speed, isShuffle, shuffledOrder };

    // 🔑 곡 전환 후 재생을 원하는지 플래그 (ENDED → 다음 곡 전환 → 로드 완료 → play)
    const wantPlayRef = useRef(false);

    const { selectedLocation } = useLocation();
    const { getSongsForLocation } = useData();
    const speeds = [0.5, 0.75, 0.8, 0.9, 1, 1.25];

    // 📍 장소별 곡 필터링
    const isThisWeekForLocation = (song) => {
        if (selectedLocation === 'kolon') return song.isThisWeekKolon;
        if (selectedLocation === 'sindun') return song.isThisWeekSindun;
        return song.isThisWeek;
    };

    const playlistSongs = useMemo(() => {
        const locationSongs = getSongsForLocation(selectedLocation);
        if (mode === 'archive') return locationSongs; // 전체곡 재생이므로 필터링 없이 모두 반환
        const thisWeekSongs = locationSongs.filter(s => isThisWeekForLocation(s));
        return thisWeekSongs.length > 0 ? thisWeekSongs : [locationSongs[0] || songs[0]];
    }, [mode, selectedLocation]);
    const totalSongs = playlistSongs.length;

    const generateShuffleOrder = useCallback(() => {
        const order = playlistSongs.map((_, i) => i);
        for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]];
        }
        setShuffledOrder(order);
    }, [totalSongs, playlistSongs]);

    const getActualIndex = useCallback((idx) => {
        if (isShuffle && shuffledOrder.length > 0) {
            return shuffledOrder[idx] ?? idx;
        }
        return idx;
    }, [isShuffle, shuffledOrder]);

    const currentSong = playlistSongs[getActualIndex(currentIndex)];
    const currentVideoId = currentSong?.mainVideoId || currentSong?.youtubeId || '';

    // =============================
    // 프로그래스 트래킹
    // =============================
    const startProgressTracking = useCallback(() => {
        stopProgressTracking();
        progressInterval.current = setInterval(() => {
            try {
                const ct = player.getCurrentTime();
                const dur = player.getDuration();
                setCurrentTime(ct);
                setDuration(dur);
                setProgress(dur > 0 ? (ct / dur) * 100 : 0);
            } catch (e) { }
        }, 500);
    }, []);

    const stopProgressTracking = useCallback(() => {
        if (progressInterval.current) {
            clearInterval(progressInterval.current);
            progressInterval.current = null;
        }
    }, []);

    // =============================
    // 통합 YouTube Player 훅 사용
    // =============================
    const player = useYouTubePlayer({
        containerRef,
        videoId: currentVideoId,
        autoplay: false,
        onReady: (e) => {
            try {
                e.target.setPlaybackRate(stateRef.current.speed);
                setDuration(e.target.getDuration());
            } catch (err) { }
        },
        onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                try { setDuration(event.target.getDuration()); } catch (e) { }
                startProgressTracking();
            } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
                stopProgressTracking();
            } else if (event.data === window.YT.PlayerState.ENDED) {
                stopProgressTracking();
                const s = stateRef.current;

                if (s.isRepeat) {
                    try {
                        event.target.seekTo(0);
                        event.target.playVideo();
                    } catch (e) { }
                } else if (s.isAutoPlay) {
                    // 🔑 다음 곡 전환 시 wantPlay 플래그 설정
                    // → videoId 변경 effect에서 실제 play() 호출
                    wantPlayRef.current = true;
                    if (s.currentIndex < totalSongs - 1) {
                        setCurrentIndex(s.currentIndex + 1);
                    } else {
                        setIsPlaying(false);
                        setCurrentIndex(0);
                        wantPlayRef.current = false;
                    }
                } else {
                    setIsPlaying(false);
                }
            }
        },
    });

    // 곡 변경 시 스크롤 + 속도 적용 + 재생 보장
    useEffect(() => {
        if (!player.isReady || !currentSong) return;

        // 화면 스크롤
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        const pageContainer = document.querySelector('.playlist-page');
        if (pageContainer) {
            pageContainer.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // 속도 적용
        player.setSpeed(speed);

        // Safari 먹통 화면 방지
        try {
            const iframe = containerRef.current?.querySelector('iframe');
            if (iframe) {
                iframe.style.transform = 'scale(0.99)';
                setTimeout(() => { iframe.style.transform = 'scale(1)'; }, 50);
            }
        } catch (e) { }

        setProgress(0);
        setCurrentTime(0);
        setDuration(0);

        // 🔑 곡 전환 후 재생 보장
        // loadVideoById가 영상을 로드하면 자동 재생되지만, 안전장치로 play() 호출
        if (wantPlayRef.current) {
            wantPlayRef.current = false;
            // loadVideoById 후 약간의 딜레이를 두고 play 보장
            setTimeout(() => {
                player.play();
                setIsPlaying(true);
                startProgressTracking();
            }, 300);
        }

        // 재생목록 스크롤
        setTimeout(() => {
            const listContainer = playlistRef.current;
            const activeItem = listContainer?.querySelector('.playlist-item.active');
            if (listContainer && activeItem) {
                const offset = activeItem.offsetTop - listContainer.offsetTop - (listContainer.clientHeight / 2) + (activeItem.clientHeight / 2);
                listContainer.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
            }
        }, 100);
    }, [currentIndex, player.isReady, isShuffle, shuffledOrder, currentSong, speed]);

    // 언마운트 시 정리
    useEffect(() => {
        return () => stopProgressTracking();
    }, []);

    // =============================
    // 컨트롤 핸들러
    // =============================
    const handleSongSelect = (idx) => {
        wantPlayRef.current = true;
        if (isShuffle) {
            const shuffleIdx = shuffledOrder.indexOf(idx);
            setCurrentIndex(shuffleIdx !== -1 ? shuffleIdx : idx);
        } else {
            setCurrentIndex(idx);
        }
        setIsPlaying(true);
    };

    const handlePrev = () => {
        if (currentTime > 3) {
            player.seekTo(0);
        } else {
            wantPlayRef.current = true;
            setCurrentIndex(prev => prev > 0 ? prev - 1 : totalSongs - 1);
            setIsPlaying(true);
        }
    };

    const handleNext = () => {
        wantPlayRef.current = true;
        setCurrentIndex(prev => prev < totalSongs - 1 ? prev + 1 : 0);
        setIsPlaying(true);
    };

    const handlePlayPause = () => {
        if (isPlaying) player.pause();
        else player.play();
    };

    // 🎬 전체화면 — YouTube iframe을 직접 풀스크린 (iOS는 플레이어 내장 버튼 사용)
    const handleFullscreen = () => {
        try {
            const iframe = player.playerRef?.current?.getIframe?.();
            const target = iframe || containerRef.current;
            if (!target) return;
            if (target.requestFullscreen) target.requestFullscreen();
            else if (target.webkitRequestFullscreen) target.webkitRequestFullscreen();
            else if (target.webkitEnterFullscreen) target.webkitEnterFullscreen();
            else if (iframe?.webkitEnterFullscreen) iframe.webkitEnterFullscreen();
        } catch (e) {}
    };

    const handleSpeedChange = (newSpeed) => {
        setSpeed(newSpeed);
        player.setSpeed(newSpeed);
    };

    const handleProgressClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        if (duration > 0) player.seekTo(pct * duration);
    };

    const handleShuffleToggle = () => {
        if (!isShuffle) generateShuffleOrder();
        setIsShuffle(!isShuffle);
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="playlist-page" ref={topRef}>
            <div style={{
                padding: 'max(16px, env(safe-area-inset-top)) 16px 16px', display: 'flex', alignItems: 'center',
                position: 'sticky', top: 0, zIndex: 20,
                background: 'linear-gradient(180deg, rgba(10,10,15,1) 0%, rgba(10,10,15,0.9) 80%, rgba(10,10,15,0) 100%)'
            }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
                        fontSize: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', backdropFilter: 'blur(10px)'
                    }}
                >
                    <span style={{ fontSize: '22px', paddingBottom: '2px' }}>‹</span> 돌아가기
                </button>
                <h2 style={{ margin: '0 0 0 12px', fontSize: '16px', color: '#fff', fontWeight: '700' }}>
                    {mode === 'thisweek' ? '🎵 이번주 곡 연속재생' : '🎶 전체 곡 연속재생'}
                </h2>
            </div>

            <div className="playlist-now-playing">
                <div className="playlist-video-area">
                    <div className={`video-player-wrapper ${isMirror ? 'mirror' : ''}`}>
                        <div className="video-container">
                            <div ref={containerRef} />
                        </div>
                    </div>
                </div>

                {currentSong && (
                    <div className="playlist-song-info">
                        <div className="playlist-song-title-row">
                            <h2 style={{ color: '#fff', margin: 0 }}>{currentSong.title}</h2>
                            <span className={`level-badge level-${currentSong.level || 'beginner'}`}>
                                {levelStars[currentSong.level || 'beginner'] || '★★'}
                            </span>
                        </div>
                        <p className="playlist-song-artist" style={{ color: '#aaa', margin: '4px 0 0 0' }}>
                            {currentSong.artist || '구향회 라인댄스'} · {currentSong.choreographer || 'Various'}
                        </p>
                    </div>
                )}

                <div className="playlist-progress" onClick={handleProgressClick}>
                    <div className="playlist-progress-bar">
                        <div className="playlist-progress-fill" style={{ width: `${progress}%` }} />
                        <div className="playlist-progress-thumb" style={{ left: `${progress}%` }} />
                    </div>
                    <div className="playlist-progress-time">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="playlist-controls">
                    <button className={`playlist-ctrl-btn ${isShuffle ? 'active' : ''}`} onClick={handleShuffleToggle} title="셔플">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" />
                        </svg>
                    </button>

                    <button className="playlist-ctrl-btn" onClick={handlePrev} title="이전">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
                    </button>

                    <button className="playlist-play-btn" onClick={handlePlayPause}>
                        {isPlaying ? (
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                        )}
                    </button>

                    <button className="playlist-ctrl-btn" onClick={handleNext} title="다음">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
                    </button>

                    <button className={`playlist-ctrl-btn ${isRepeat ? 'active' : ''}`} onClick={() => setIsRepeat(!isRepeat)} title="반복">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
                        </svg>
                    </button>
                </div>

                <div className="playlist-extra-controls">
                    <div className="playlist-speed-group">
                        {speeds.map((s) => {
                            let label = `${s}x`;
                            if (s === 0.5) label = '½×';
                            if (s === 0.75) label = '¾×';
                            if (s === 0.8) label = '⅘×';
                            if (s === 0.9) label = '9/10×';
                            return (
                                <button key={s} className={`speed-btn ${speed === s ? 'active' : ''}`} onClick={() => handleSpeedChange(s)}>
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                    <button className={`mirror-btn ${isMirror ? 'active' : ''}`} onClick={() => setIsMirror(!isMirror)}>
                        🪞 거울
                    </button>
                    <button className="mirror-btn" onClick={handleFullscreen}>
                        🎬 전체화면
                    </button>
                    <button className={`playlist-autoplay-btn ${isAutoPlay ? 'active' : ''}`} onClick={() => setIsAutoPlay(!isAutoPlay)}>
                        {isAutoPlay ? '▶ 자동재생 ON' : '■ 자동재생 OFF'}
                    </button>
                </div>
            </div>

            <div className="playlist-list-section">
                <div className="playlist-list-header">
                    <h3>🎶 재생목록</h3>
                    <span className="playlist-count">
                        {currentIndex + 1} / {totalSongs}곡
                    </span>
                </div>
                <div className="playlist-list" ref={playlistRef}>
                    {playlistSongs.map((song, idx) => {
                        const actualCurrent = getActualIndex(currentIndex);
                        const isActive = idx === actualCurrent;
                        return (
                            <div key={song.id} className={`playlist-item ${isActive ? 'active' : ''}`} onClick={() => handleSongSelect(idx)}>
                                <div className="playlist-item-number">
                                    {isActive && isPlaying ? (
                                        <div className="playlist-equalizer"><span /><span /><span /></div>
                                    ) : (<span>{idx + 1}</span>)}
                                </div>
                                <div className="playlist-item-thumb">
                                    <img src={`https://img.youtube.com/vi/${song.mainVideoId || song.youtubeId}/mqdefault.jpg`} alt={song.title} loading="lazy" />
                                    {isActive && (
                                        <div className="playlist-item-playing-overlay">
                                            <svg viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                                        </div>
                                    )}
                                </div>
                                <div className="playlist-item-info">
                                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#fff' }}>{song.title}</h4>
                                    <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>{song.artist || '구향회 원장'} · {song.choreographer || 'Various'}</p>
                                </div>
                                <span className={`level-badge level-${song.level || 'beginner'}`}>
                                    {levelStars[song.level] || '★★'}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}