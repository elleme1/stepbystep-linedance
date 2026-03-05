import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import songs from '../data/songs';
import { levelText } from '../data/constants';

export default function VideoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('main');

    // 🎬 클립(구간 반복) 상태
    const [clipStart, setClipStart] = useState(null);
    const [clipEnd, setClipEnd] = useState(null);
    const [clipActive, setClipActive] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);

    const playerRef = useRef(null);
    const containerRef = useRef(null);
    const progressInterval = useRef(null);
    const [playerReady, setPlayerReady] = useState(false);

    const song = songs.find(s => s.id === Number(id)) || songs[0];
    const hasTutorial = !!song.tutorialId;
    const currentVideoId = viewMode === 'main' ? song.youtubeId : (song.tutorialId || null);

    // YouTube Player 초기화
    useEffect(() => {
        if (!currentVideoId) return;

        let mounted = true;

        const createPlayer = () => {
            if (!mounted || !containerRef.current) return;

            if (playerRef.current) {
                try { playerRef.current.destroy(); } catch (e) { }
                playerRef.current = null;
            }

            // 클립 상태 초기화
            setClipStart(null);
            setClipEnd(null);
            setClipActive(false);

            playerRef.current = new window.YT.Player(containerRef.current, {
                videoId: currentVideoId,
                playerVars: {
                    rel: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    autoplay: 0,
                    cc_load_policy: 1,
                    cc_lang_pref: 'ko',
                },
                events: {
                    onReady: () => {
                        if (!mounted) return;
                        setPlayerReady(true);
                    },
                    onStateChange: (event) => {
                        if (!mounted) return;
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            setIsPlaying(true);
                            setVideoEnded(false);
                        } else if (event.data === window.YT.PlayerState.PAUSED) {
                            setIsPlaying(false);
                        } else if (event.data === window.YT.PlayerState.ENDED) {
                            setIsPlaying(false);
                            setVideoEnded(true);
                        }
                    }
                }
            });
        };

        if (!window.YT || !window.YT.Player) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScript = document.getElementsByTagName('script')[0];
            firstScript.parentNode.insertBefore(tag, firstScript);
            window.onYouTubeIframeAPIReady = createPlayer;
        } else {
            createPlayer();
        }

        return () => {
            mounted = false;
            if (progressInterval.current) clearInterval(progressInterval.current);
            try {
                if (playerRef.current && playerRef.current.destroy) {
                    playerRef.current.destroy();
                }
            } catch (e) { }
            playerRef.current = null;
            setPlayerReady(false);
        };
    }, [currentVideoId]);

    // 클립 반복 + 시간 추적 인터벌
    useEffect(() => {
        if (progressInterval.current) {
            clearInterval(progressInterval.current);
            progressInterval.current = null;
        }

        if (isPlaying && playerRef.current) {
            progressInterval.current = setInterval(() => {
                try {
                    if (playerRef.current && playerRef.current.getCurrentTime) {
                        const time = playerRef.current.getCurrentTime();
                        setCurrentTime(time);

                        const dur = playerRef.current.getDuration ? playerRef.current.getDuration() : 0;
                        if (dur > 0) setDuration(dur);

                        // 🚫 유튜브 추천 화면 차단: 끝나기 3초 전에 오버레이 표시
                        if (dur > 0 && time >= dur - 3 && !clipActive) {
                            setVideoEnded(true);
                            playerRef.current.pauseVideo();
                            setIsPlaying(false);
                            return;
                        }

                        // 클립 반복: 끝점 넘으면 시작점으로 되돌림
                        if (clipActive && clipStart !== null && clipEnd !== null) {
                            if (time >= clipEnd) {
                                playerRef.current.seekTo(clipStart, true);
                            }
                        }
                    }
                } catch (e) { }
            }, 200);
        }

        return () => {
            if (progressInterval.current) {
                clearInterval(progressInterval.current);
                progressInterval.current = null;
            }
        };
    }, [isPlaying, clipActive, clipStart, clipEnd]);

    // 🎬 클립 제어 함수
    const formatTime = (sec) => {
        if (sec === null || isNaN(sec)) return '--:--';
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${String(s).padStart(2, '0')}`;
    };

    const setClipPoint = (type) => {
        try {
            const time = playerRef.current?.getCurrentTime?.() || 0;
            if (type === 'start') {
                setClipStart(time);
                if (clipEnd !== null && time >= clipEnd) setClipEnd(null);
                setClipActive(false);
            } else {
                if (clipStart !== null && time > clipStart) {
                    setClipEnd(time);
                    setClipActive(true);
                }
            }
        } catch (e) { }
    };

    const clearClip = () => {
        setClipStart(null);
        setClipEnd(null);
        setClipActive(false);
    };

    // 클립 구간 비율 (프로그레스 바용)
    const clipStartPct = (clipStart !== null && duration > 0) ? (clipStart / duration * 100) : 0;
    const clipEndPct = (clipEnd !== null && duration > 0) ? (clipEnd / duration * 100) : 0;
    const currentPct = (duration > 0) ? (currentTime / duration * 100) : 0;

    return (
        <div style={{ backgroundColor: '#0a0a0f', minHeight: '100%', display: 'flex', flexDirection: 'column', color: '#fff' }}>

            <div style={{ padding: '16px', display: 'flex', alignItems: 'center', zIndex: 10 }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#fff',
                        fontSize: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', backdropFilter: 'blur(10px)'
                    }}
                >
                    <span style={{ fontSize: '22px', paddingBottom: '2px' }}>‹</span> 돌아가기
                </button>
            </div>

            {/* 📺 유튜브 영상 플레이어 */}
            <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#000', position: 'relative' }}>
                {currentVideoId ? (
                    <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
                ) : (
                    <div style={{
                        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a1a2e, #16213e)'
                    }}>
                        <span style={{ fontSize: '48px', marginBottom: '16px' }}>👣</span>
                        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: '0 0 8px 0' }}>스텝 설명 영상 준비 중</p>
                        <p style={{ fontSize: '14px', color: '#888', margin: 0, textAlign: 'center', padding: '0 20px' }}>
                            원장님이 곧 친절한 스텝 설명 영상을 올려주실 거예요! 🎬
                        </p>
                    </div>
                )}

                {/* 🚫 영상 종료 오버레이 - 유튜브 추천 화면 차단 */}
                {videoEnded && (
                    <div style={{
                        position: 'absolute', inset: 0, zIndex: 10,
                        background: 'rgba(10, 10, 15, 0.95)',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: '16px'
                    }}>
                        <span style={{ fontSize: '48px' }}>🎬</span>
                        <p style={{ fontSize: '18px', fontWeight: '800', color: '#fff', margin: 0 }}>
                            영상이 끝났습니다
                        </p>
                        <button
                            onClick={() => {
                                setVideoEnded(false);
                                try {
                                    playerRef.current.seekTo(0, true);
                                    playerRef.current.playVideo();
                                } catch (e) { }
                            }}
                            style={{
                                background: 'linear-gradient(135deg, #ff2d55, #ff6699)',
                                border: 'none', color: '#fff', fontSize: '16px', fontWeight: '800',
                                padding: '14px 32px', borderRadius: '12px', cursor: 'pointer',
                                boxShadow: '0 4px 16px rgba(255, 45, 85, 0.4)',
                                marginTop: '8px'
                            }}
                        >🔄 다시 보기</button>
                    </div>
                )}
            </div>

            {/* 🎬 구간 반복(클립) 패널 */}
            {currentVideoId && (
                <div style={{
                    background: '#12121a', borderBottom: '1px solid #2a2a35',
                    padding: '14px 20px 16px'
                }}>
                    {/* 프로그레스 바 */}
                    <div style={{
                        position: 'relative', height: '6px', background: '#2a2a35',
                        borderRadius: '3px', marginBottom: '12px', overflow: 'visible'
                    }}>
                        {/* 클립 구간 하이라이트 */}
                        {clipStart !== null && clipEnd !== null && (
                            <div style={{
                                position: 'absolute', top: 0, left: `${clipStartPct}%`,
                                width: `${clipEndPct - clipStartPct}%`, height: '100%',
                                background: 'rgba(255, 45, 85, 0.4)', borderRadius: '3px'
                            }} />
                        )}
                        {/* 현재 재생 위치 */}
                        <div style={{
                            position: 'absolute', top: '-3px', left: `${currentPct}%`,
                            width: '12px', height: '12px', background: '#fff',
                            borderRadius: '50%', transform: 'translateX(-6px)',
                            boxShadow: '0 0 8px rgba(255,255,255,0.5)',
                            transition: 'left 0.2s linear'
                        }} />
                        {/* 시작 마커 */}
                        {clipStart !== null && (
                            <div style={{
                                position: 'absolute', top: '-5px', left: `${clipStartPct}%`,
                                width: '3px', height: '16px', background: '#00cc66',
                                borderRadius: '2px', transform: 'translateX(-1.5px)'
                            }} />
                        )}
                        {/* 끝 마커 */}
                        {clipEnd !== null && (
                            <div style={{
                                position: 'absolute', top: '-5px', left: `${clipEndPct}%`,
                                width: '3px', height: '16px', background: '#ff2d55',
                                borderRadius: '2px', transform: 'translateX(-1.5px)'
                            }} />
                        )}
                    </div>

                    {/* 클립 상태 표시 */}
                    {clipActive && (
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            gap: '8px', marginBottom: '10px', padding: '8px 12px',
                            background: 'rgba(255, 45, 85, 0.1)', borderRadius: '8px',
                            border: '1px solid rgba(255, 45, 85, 0.3)'
                        }}>
                            <span style={{ animation: 'pulse 1s infinite', fontSize: '14px' }}>🔁</span>
                            <span style={{ fontSize: '14px', fontWeight: '700', color: '#ff6688' }}>
                                구간 반복 중: {formatTime(clipStart)} → {formatTime(clipEnd)}
                                ({Math.round(clipEnd - clipStart)}초)
                            </span>
                        </div>
                    )}

                    {/* 클립 버튼들 */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button
                            onClick={() => setClipPoint('start')}
                            style={{
                                flex: 1, padding: '12px 8px', borderRadius: '10px', border: 'none',
                                fontSize: '14px', fontWeight: '700', cursor: 'pointer',
                                background: clipStart !== null ? '#00cc66' : '#1c1c28',
                                color: clipStart !== null ? '#fff' : '#aaa',
                                transition: 'all 0.2s'
                            }}
                        >
                            {clipStart !== null ? `▶ ${formatTime(clipStart)}` : '▶ 시작점'}
                        </button>
                        <button
                            onClick={() => setClipPoint('end')}
                            disabled={clipStart === null}
                            style={{
                                flex: 1, padding: '12px 8px', borderRadius: '10px', border: 'none',
                                fontSize: '14px', fontWeight: '700', cursor: clipStart !== null ? 'pointer' : 'default',
                                background: clipEnd !== null ? '#ff2d55' : '#1c1c28',
                                color: clipEnd !== null ? '#fff' : (clipStart !== null ? '#aaa' : '#555'),
                                opacity: clipStart === null ? 0.5 : 1,
                                transition: 'all 0.2s'
                            }}
                        >
                            {clipEnd !== null ? `⏹ ${formatTime(clipEnd)}` : '⏹ 끝점'}
                        </button>
                        {(clipStart !== null || clipEnd !== null) && (
                            <button
                                onClick={clearClip}
                                style={{
                                    padding: '12px 14px', borderRadius: '10px', border: '1px solid #3a3a45',
                                    background: 'transparent', color: '#888', fontSize: '14px',
                                    fontWeight: '700', cursor: 'pointer'
                                }}
                            >✕</button>
                        )}
                    </div>

                    {!clipActive && (
                        <p style={{ fontSize: '12px', color: '#555', textAlign: 'center', margin: '8px 0 0', lineHeight: '1.5' }}>
                            💡 영상 재생 중 어려운 구간의 시작점과 끝점을 찍으면 그 부분만 반복됩니다
                        </p>
                    )}
                </div>
            )}

            <div style={{ padding: '24px 20px', flex: 1, paddingBottom: 'calc(24px + env(safe-area-inset-bottom))' }}>

                {/* ✨ 듀얼 스위치 버튼 */}
                <div style={{ display: 'flex', background: '#1c1c26', borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
                    <button
                        onClick={() => setViewMode('main')}
                        style={{
                            flex: 1, padding: '14px 0', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backgroundColor: viewMode === 'main' ? '#ff2d55' : 'transparent',
                            color: viewMode === 'main' ? '#fff' : '#888'
                        }}
                    >
                        🎵 음악 맞춰 실전
                    </button>

                    <button
                        onClick={() => setViewMode('tutorial')}
                        style={{
                            flex: 1, padding: '14px 0', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backgroundColor: viewMode === 'tutorial' ? '#ff2d55' : 'transparent',
                            color: viewMode === 'tutorial' ? '#fff' : '#888'
                        }}
                    >
                        👣 친절한 스텝 설명
                    </button>
                </div>

                {/* 🏷️ 태그 */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span style={{ background: 'rgba(255,45,85,0.15)', color: '#ff2d55', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                        {song.genre}
                    </span>
                    <span style={{ background: 'rgba(255,45,85,0.15)', color: '#ff2d55', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                        {levelText[song.level]}
                    </span>
                    {song.isThisWeek && (
                        <span style={{ background: 'rgba(255,45,85,0.15)', color: '#ff2d55', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                            이번주 수업곡
                        </span>
                    )}
                </div>

                <h1 style={{ fontSize: '22px', fontWeight: '800', lineHeight: '1.4', marginBottom: '8px', wordBreak: 'keep-all' }}>
                    {song.title}
                </h1>
                <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '24px' }}>
                    🎵 {song.artist} · 💃 {song.choreographer}
                </p>

                {/* 📊 안무 정보 */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                    <span style={{ background: '#1a1a24', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', color: '#ccc' }}>
                        🎼 BPM {song.bpm}
                    </span>
                    <span style={{ background: '#1a1a24', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', color: '#ccc' }}>
                        🧱 {song.walls === 0 ? '무한벽' : `${song.walls}벽`}
                    </span>
                    <span style={{ background: '#1a1a24', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', color: '#ccc' }}>
                        🔢 {song.counts} 카운트
                    </span>
                </div>

                {/* 📝 스텝시트 */}
                <div style={{ padding: '20px', backgroundColor: '#1a1a24', borderRadius: '12px', border: '1px solid #2a2a35' }}>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#ff2d55' }}>📝 스텝시트</h3>
                    {song.steps.map((step, idx) => (
                        <div key={idx} style={{
                            display: 'flex', gap: '12px', marginBottom: idx < song.steps.length - 1 ? '14px' : 0,
                            paddingBottom: idx < song.steps.length - 1 ? '14px' : 0,
                            borderBottom: idx < song.steps.length - 1 ? '1px solid #2a2a35' : 'none'
                        }}>
                            <span style={{
                                flexShrink: 0, background: '#ff2d55', color: '#fff',
                                padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold',
                                height: 'fit-content'
                            }}>
                                {step.count}
                            </span>
                            <div>
                                <p style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700', color: '#fff' }}>{step.move}</p>
                                <p style={{ margin: 0, fontSize: '14px', color: '#aaa', lineHeight: '1.5' }}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* CSS 애니메이션 */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
            `}</style>
        </div>
    );
}