import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import songs, { getSongsForLocation } from '../data/songs';
import { levelStars } from '../data/constants';
import { useLocation } from '../context/LocationContext';

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
    const [playerReady, setPlayerReady] = useState(false);

    // 🚀 [마법의 닻] 화면 최상단을 가리키는 레이더 장착
    const topRef = useRef(null);

    const playerRef = useRef(null);
    const containerRef = useRef(null);
    const progressInterval = useRef(null);
    const playlistRef = useRef(null);
    const loadedVideoId = useRef(null);

    // 유튜브 API 콜백에서 항상 최신 상태를 유지하기 위한 저장소
    const stateRef = useRef({});
    stateRef.current = { isAutoPlay, isRepeat, isPlaying, currentIndex, speed, isShuffle, shuffledOrder };

    const { selectedLocation } = useLocation();

    const speeds = [0.5, 0.75, 1, 1.25];

    // 📍 장소별 곡 필터링 + isThisWeek 장소별 판단
    const isThisWeekForLocation = (song) => {
        if (selectedLocation === 'kolon') return song.isThisWeekKolon;
        if (selectedLocation === 'sindun') return song.isThisWeekSindun;
        return song.isThisWeek;
    };

    const playlistSongs = useMemo(() => {
        const locationSongs = getSongsForLocation(selectedLocation);
        if (mode === 'archive') return locationSongs.filter(s => !isThisWeekForLocation(s));
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

    const startProgressTracking = () => {
        stopProgressTracking();
        progressInterval.current = setInterval(() => {
            try {
                if (playerRef.current && playerRef.current.getCurrentTime) {
                    const ct = playerRef.current.getCurrentTime();
                    const dur = playerRef.current.getDuration();
                    setCurrentTime(ct);
                    setDuration(dur);
                    setProgress(dur > 0 ? (ct / dur) * 100 : 0);
                }
            } catch (e) { }
        }, 500);
    };

    const stopProgressTracking = () => {
        if (progressInterval.current) {
            clearInterval(progressInterval.current);
            progressInterval.current = null;
        }
    };

    // 1️⃣ 최초 접속 시 유튜브 플레이어를 딱 1번만 만듭니다
    useEffect(() => {
        let mounted = true;

        const createPlayer = () => {
            if (!mounted || !window.YT || !window.YT.Player || !containerRef.current) return;

            // songs.js에 있는 mainVideoId도 완벽하게 지원하도록 수정!
            const videoId = playlistSongs[0]?.mainVideoId || playlistSongs[0]?.youtubeId;
            if (!videoId) return;
            loadedVideoId.current = videoId;

            playerRef.current = new window.YT.Player(containerRef.current, {
                videoId,
                playerVars: {
                    rel: 0, modestbranding: 1, playsinline: 1, autoplay: 0, cc_load_policy: 1, cc_lang_pref: 'ko',
                },
                events: {
                    onReady: () => {
                        if (!mounted) return;
                        setPlayerReady(true);
                        try {
                            playerRef.current.setPlaybackRate(stateRef.current.speed);
                            setDuration(playerRef.current.getDuration());
                        } catch (e) { }
                    },
                    onStateChange: (event) => {
                        if (!mounted) return;

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
                                if (s.currentIndex < totalSongs - 1) {
                                    setCurrentIndex(s.currentIndex + 1);
                                    setIsPlaying(true);
                                } else {
                                    setIsPlaying(false);
                                    setCurrentIndex(0);
                                }
                            } else {
                                setIsPlaying(false);
                            }
                        }
                    }
                }
            });
        };

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
            mounted = false;
            stopProgressTracking();
            try {
                if (playerRef.current && playerRef.current.destroy) {
                    playerRef.current.destroy();
                }
            } catch (e) { }
            playerRef.current = null;
        };
    }, []);

    // 2️⃣ 🚀 [버그 완벽 타파!] 곡이 다음 곡으로 넘어갈 때 발동하는 마법 코드!
    useEffect(() => {
        if (!playerReady || !playerRef.current || !currentSong) return;

        const targetVideoId = currentSong.mainVideoId || currentSong.youtubeId;
        if (targetVideoId === loadedVideoId.current) return;
        loadedVideoId.current = targetVideoId;

        // 🛠️ [해결 1] 무조건 화면 멱살을 잡고 맨 위(영상)로 스르륵! 즉시 끌어올립니다.
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        const pageContainer = document.querySelector('.playlist-page');
        if (pageContainer) {
            pageContainer.scrollTo({ top: 0, behavior: 'smooth' });
        }

        try {
            if (stateRef.current.isPlaying || stateRef.current.isAutoPlay) {
                playerRef.current.loadVideoById(targetVideoId);
            } else {
                playerRef.current.cueVideoById(targetVideoId);
            }
            playerRef.current.setPlaybackRate(speed);
        } catch (e) { }

        // 🛠️ [해결 2] 모바일 Safari 까만 먹통 화면 완벽 제거! (화면 흔들어 깨우기 기술)
        try {
            const iframe = containerRef.current?.querySelector('iframe') || document.querySelector('.video-container iframe');
            if (iframe) {
                // 영상을 0.01% 살짝 찌그러뜨렸다가 0.05초 만에 복구시켜 폰이 깜짝 놀라게 하여 화면을 강제로 렌더링시킵니다!
                iframe.style.transform = 'scale(0.99)';
                setTimeout(() => {
                    iframe.style.transform = 'scale(1)';
                }, 50);
            }
        } catch (e) { }

        setProgress(0);
        setCurrentTime(0);
        setDuration(0);

        // 🛠️ [해결 3] 화면 전체를 질질 끌어내리던 원흉(scrollIntoView) 전면 교체!
        // 화면 전체가 아니라, '재생목록 상자 안에서만' 얌전하게 휠을 굴리도록 똑똑하게 수학적으로 위치를 잡았습니다.
        setTimeout(() => {
            const listContainer = playlistRef.current;
            const activeItem = listContainer?.querySelector('.playlist-item.active');
            if (listContainer && activeItem) {
                const offset = activeItem.offsetTop - listContainer.offsetTop - (listContainer.clientHeight / 2) + (activeItem.clientHeight / 2);
                listContainer.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
            }
        }, 100);
    }, [currentIndex, playerReady, isShuffle, shuffledOrder, currentSong, speed]);

    const handleSongSelect = (idx) => {
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
            try {
                if (playerRef.current && playerRef.current.seekTo) playerRef.current.seekTo(0);
            } catch (e) { }
        } else {
            setCurrentIndex(prev => prev > 0 ? prev - 1 : totalSongs - 1);
            setIsPlaying(true);
        }
    };

    const handleNext = () => {
        setCurrentIndex(prev => prev < totalSongs - 1 ? prev + 1 : 0);
        setIsPlaying(true);
    };

    const handlePlayPause = () => {
        if (!playerRef.current) return;
        try {
            if (isPlaying) playerRef.current.pauseVideo();
            else playerRef.current.playVideo();
        } catch (e) { }
    };

    const handleSpeedChange = (newSpeed) => {
        setSpeed(newSpeed);
        try {
            if (playerRef.current && playerRef.current.setPlaybackRate) playerRef.current.setPlaybackRate(newSpeed);
        } catch (e) { }
    };

    const handleProgressClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        try {
            if (playerRef.current && playerRef.current.seekTo && duration > 0) playerRef.current.seekTo(pct * duration);
        } catch (e2) { }
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
        // 🌟 마법의 닻 장착 완료!
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
                        {speeds.map((s) => (
                            <button key={s} className={`speed-btn ${speed === s ? 'active' : ''}`} onClick={() => handleSpeedChange(s)}>
                                {s}x
                            </button>
                        ))}
                    </div>
                    <button className={`mirror-btn ${isMirror ? 'active' : ''}`} onClick={() => setIsMirror(!isMirror)}>
                        🪞 거울
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