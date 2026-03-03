import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import songs from '../data/songs';

const levelText = ['자유', '⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'];

export default function PlaylistPage() {
    const [searchParams] = useSearchParams();
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

    const playerRef = useRef(null);
    const containerRef = useRef(null);
    const progressInterval = useRef(null);
    const playlistRef = useRef(null);
    const loadedVideoId = useRef(null);

    // Ref to always have fresh state values inside YouTube callbacks (fixes stale closure bug)
    const stateRef = useRef({});
    stateRef.current = { isAutoPlay, isRepeat, isPlaying, currentIndex, speed, isShuffle, shuffledOrder };

    const speeds = [0.5, 0.75, 1, 1.25];
    const playlistSongs = useMemo(() => {
        if (mode === 'archive') return songs.filter(s => !s.isThisWeek);
        return songs.filter(s => s.isThisWeek);
    }, [mode]);
    const totalSongs = playlistSongs.length;

    // Shuffle helper
    const generateShuffleOrder = useCallback(() => {
        const order = playlistSongs.map((_, i) => i);
        for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]];
        }
        setShuffledOrder(order);
    }, [totalSongs]);

    const getActualIndex = useCallback((idx) => {
        if (isShuffle && shuffledOrder.length > 0) {
            return shuffledOrder[idx] ?? idx;
        }
        return idx;
    }, [isShuffle, shuffledOrder]);

    const currentSong = playlistSongs[getActualIndex(currentIndex)];

    // Progress tracking
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
            } catch (e) { /* player may be destroyed */ }
        }, 500);
    };

    const stopProgressTracking = () => {
        if (progressInterval.current) {
            clearInterval(progressInterval.current);
            progressInterval.current = null;
        }
    };

    // Initialize YouTube Player ONCE (reuse for all song changes)
    useEffect(() => {
        let mounted = true;

        const createPlayer = () => {
            if (!mounted || !window.YT || !window.YT.Player || !containerRef.current) return;

            const videoId = playlistSongs[0]?.youtubeId;
            if (!videoId) return;
            loadedVideoId.current = videoId;

            playerRef.current = new window.YT.Player(containerRef.current, {
                videoId,
                playerVars: {
                    rel: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    autoplay: 0,
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
                            // Always read from ref for latest values
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

    // When song index changes, load new video (reuse existing player instead of recreating)
    useEffect(() => {
        if (!playerReady || !playerRef.current || !currentSong) return;

        // Skip if same video already loaded
        if (currentSong.youtubeId === loadedVideoId.current) return;
        loadedVideoId.current = currentSong.youtubeId;

        try {
            if (stateRef.current.isPlaying) {
                playerRef.current.loadVideoById(currentSong.youtubeId);
            } else {
                playerRef.current.cueVideoById(currentSong.youtubeId);
            }
            playerRef.current.setPlaybackRate(speed);
        } catch (e) { }

        setProgress(0);
        setCurrentTime(0);
        setDuration(0);

        // Scroll to active item in playlist
        setTimeout(() => {
            const activeItem = document.querySelector('.playlist-item.active');
            if (activeItem && playlistRef.current) {
                activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 100);
    }, [currentIndex, playerReady, isShuffle, shuffledOrder]);

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
                if (playerRef.current && playerRef.current.seekTo) {
                    playerRef.current.seekTo(0);
                }
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
            if (isPlaying) {
                playerRef.current.pauseVideo();
            } else {
                playerRef.current.playVideo();
            }
        } catch (e) { }
    };

    const handleSpeedChange = (newSpeed) => {
        setSpeed(newSpeed);
        try {
            if (playerRef.current && playerRef.current.setPlaybackRate) {
                playerRef.current.setPlaybackRate(newSpeed);
            }
        } catch (e) { }
    };

    const handleProgressClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        try {
            if (playerRef.current && playerRef.current.seekTo && duration > 0) {
                playerRef.current.seekTo(pct * duration);
            }
        } catch (e2) { }
    };

    const handleShuffleToggle = () => {
        if (!isShuffle) {
            generateShuffleOrder();
        }
        setIsShuffle(!isShuffle);
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="playlist-page">
            {/* Now Playing Section */}
            <div className="playlist-now-playing">
                <div className="playlist-video-area">
                    <div className={`video-player-wrapper ${isMirror ? 'mirror' : ''}`}>
                        <div className="video-container">
                            <div ref={containerRef} />
                        </div>
                    </div>
                </div>

                {/* Song Info */}
                {currentSong && (
                    <div className="playlist-song-info">
                        <div className="playlist-song-title-row">
                            <h2>{currentSong.title}</h2>
                            <span className={`level-badge level-${currentSong.level}`}>
                                {levelText[currentSong.level]}
                            </span>
                        </div>
                        <p className="playlist-song-artist">
                            {currentSong.artist} · {currentSong.choreographer}
                        </p>
                    </div>
                )}

                {/* Progress Bar */}
                <div className="playlist-progress" onClick={handleProgressClick}>
                    <div className="playlist-progress-bar">
                        <div
                            className="playlist-progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                        <div
                            className="playlist-progress-thumb"
                            style={{ left: `${progress}%` }}
                        />
                    </div>
                    <div className="playlist-progress-time">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Playback Controls */}
                <div className="playlist-controls">
                    <button
                        className={`playlist-ctrl-btn ${isShuffle ? 'active' : ''}`}
                        onClick={handleShuffleToggle}
                        title="셔플"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 3 21 3 21 8" />
                            <line x1="4" y1="20" x2="21" y2="3" />
                            <polyline points="21 16 21 21 16 21" />
                            <line x1="15" y1="15" x2="21" y2="21" />
                            <line x1="4" y1="4" x2="9" y2="9" />
                        </svg>
                    </button>

                    <button className="playlist-ctrl-btn" onClick={handlePrev} title="이전">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                        </svg>
                    </button>

                    <button className="playlist-play-btn" onClick={handlePlayPause}>
                        {isPlaying ? (
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>

                    <button className="playlist-ctrl-btn" onClick={handleNext} title="다음">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                        </svg>
                    </button>

                    <button
                        className={`playlist-ctrl-btn ${isRepeat ? 'active' : ''}`}
                        onClick={() => setIsRepeat(!isRepeat)}
                        title="반복"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="17 1 21 5 17 9" />
                            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                            <polyline points="7 23 3 19 7 15" />
                            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                        </svg>
                    </button>
                </div>

                {/* Speed & Mirror Controls */}
                <div className="playlist-extra-controls">
                    <div className="playlist-speed-group">
                        {speeds.map((s) => (
                            <button
                                key={s}
                                className={`speed-btn ${speed === s ? 'active' : ''}`}
                                onClick={() => handleSpeedChange(s)}
                            >
                                {s}x
                            </button>
                        ))}
                    </div>
                    <button
                        className={`mirror-btn ${isMirror ? 'active' : ''}`}
                        onClick={() => setIsMirror(!isMirror)}
                    >
                        🪞 거울
                    </button>
                    <button
                        className={`playlist-autoplay-btn ${isAutoPlay ? 'active' : ''}`}
                        onClick={() => setIsAutoPlay(!isAutoPlay)}
                    >
                        {isAutoPlay ? '▶ 자동재생 ON' : '■ 자동재생 OFF'}
                    </button>
                </div>
            </div>

            {/* Playlist */}
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
                            <div
                                key={song.id}
                                className={`playlist-item ${isActive ? 'active' : ''}`}
                                onClick={() => handleSongSelect(idx)}
                            >
                                <div className="playlist-item-number">
                                    {isActive && isPlaying ? (
                                        <div className="playlist-equalizer">
                                            <span /><span /><span />
                                        </div>
                                    ) : (
                                        <span>{idx + 1}</span>
                                    )}
                                </div>
                                <div className="playlist-item-thumb">
                                    <img src={song.thumbnail} alt={song.title} loading="lazy" />
                                    {isActive && (
                                        <div className="playlist-item-playing-overlay">
                                            <svg viewBox="0 0 24 24" fill="white">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="playlist-item-info">
                                    <h4>{song.title}</h4>
                                    <p>{song.artist} · {song.genre}</p>
                                </div>
                                <span className={`level-badge level-${song.level}`}>
                                    {levelText[song.level]}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
