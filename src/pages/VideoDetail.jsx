import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import songs from '../data/songs';
import { levelText } from '../data/constants';

export default function VideoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('main');

    // 캡션 관련 상태
    const [captionEnabled, setCaptionEnabled] = useState(true);
    const [currentStepIdx, setCurrentStepIdx] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [captionOffset, setCaptionOffset] = useState(0); // 초 단위 오프셋 조정

    const playerRef = useRef(null);
    const containerRef = useRef(null);
    const progressInterval = useRef(null);
    const loadedVideoId = useRef(null);
    const [playerReady, setPlayerReady] = useState(false);

    const song = songs.find(s => s.id === Number(id)) || songs[0];
    const hasTutorial = !!song.tutorialId;
    const currentVideoId = viewMode === 'main' ? song.youtubeId : (song.tutorialId || null);

    // BPM 기반으로 카운트를 시간(초)으로 변환
    // 1비트 = 60/BPM 초
    const beatDuration = 60 / song.bpm;

    // steps의 count 범위를 시간 범위로 변환
    const stepTimings = song.steps.map(step => {
        const countRange = step.count.split('-').map(Number);
        const startCount = countRange[0];
        const endCount = countRange[1] || startCount;
        return {
            ...step,
            startTime: (startCount - 1) * beatDuration,
            endTime: endCount * beatDuration,
        };
    });

    // 현재 재생 시간에 맞는 스텝 인덱스 찾기
    const findCurrentStep = useCallback((time) => {
        const adjustedTime = time - captionOffset;
        if (adjustedTime < 0) return -1;

        // 전체 한 사이클 길이 (초)
        const cycleLength = song.counts * beatDuration;
        // 현재 사이클 내 위치
        const posInCycle = adjustedTime % cycleLength;

        for (let i = 0; i < stepTimings.length; i++) {
            if (posInCycle >= stepTimings[i].startTime && posInCycle < stepTimings[i].endTime) {
                return i;
            }
        }
        return -1;
    }, [captionOffset, beatDuration, song.counts, stepTimings]);

    // YouTube Player 초기화
    useEffect(() => {
        if (!currentVideoId) return;

        let mounted = true;

        const createPlayer = () => {
            if (!mounted || !containerRef.current) return;

            // 기존 플레이어 정리
            if (playerRef.current) {
                try { playerRef.current.destroy(); } catch (e) { }
                playerRef.current = null;
            }

            loadedVideoId.current = currentVideoId;

            playerRef.current = new window.YT.Player(containerRef.current, {
                videoId: currentVideoId,
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
                    },
                    onStateChange: (event) => {
                        if (!mounted) return;
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            setIsPlaying(true);
                        } else if (event.data === window.YT.PlayerState.PAUSED ||
                            event.data === window.YT.PlayerState.ENDED) {
                            setIsPlaying(false);
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

    // 캡션 추적 인터벌
    useEffect(() => {
        if (progressInterval.current) {
            clearInterval(progressInterval.current);
            progressInterval.current = null;
        }

        if (isPlaying && captionEnabled && playerRef.current) {
            progressInterval.current = setInterval(() => {
                try {
                    if (playerRef.current && playerRef.current.getCurrentTime) {
                        const time = playerRef.current.getCurrentTime();
                        const idx = findCurrentStep(time);
                        setCurrentStepIdx(idx);
                    }
                } catch (e) { /* player may be destroyed */ }
            }, 200); // 200ms마다 업데이트
        }

        return () => {
            if (progressInterval.current) {
                clearInterval(progressInterval.current);
                progressInterval.current = null;
            }
        };
    }, [isPlaying, captionEnabled, findCurrentStep]);

    // 캡션 오프셋 조절
    const adjustOffset = (delta) => {
        setCaptionOffset(prev => {
            const next = prev + delta;
            return Math.max(-10, Math.min(30, next));
        });
    };

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
            </div>

            {/* 🎯 실시간 스텝 캡션 바 */}
            {captionEnabled && currentVideoId && (
                <div style={{
                    background: 'linear-gradient(135deg, #1a1025, #0f1a2e)',
                    borderBottom: '1px solid #2a2a35',
                    padding: '0',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* 캡션 내용 */}
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '14px 20px', gap: '12px', minHeight: '56px'
                    }}>
                        {currentStepIdx >= 0 && isPlaying ? (
                            <>
                                <span style={{
                                    background: '#ff2d55', color: '#fff',
                                    padding: '4px 10px', borderRadius: '6px',
                                    fontSize: '13px', fontWeight: 'bold', flexShrink: 0,
                                    animation: 'pulse 1s ease-in-out infinite'
                                }}>
                                    {stepTimings[currentStepIdx].count}
                                </span>
                                <span style={{
                                    fontSize: '16px', fontWeight: '800', color: '#fff',
                                    textShadow: '0 0 10px rgba(255,45,85,0.5)',
                                    animation: 'fadeInCaption 0.3s ease'
                                }}>
                                    {stepTimings[currentStepIdx].move}
                                </span>
                            </>
                        ) : isPlaying ? (
                            <span style={{ fontSize: '15px', color: '#888', fontStyle: 'italic' }}>
                                🎵 인트로 / 전환 구간...
                            </span>
                        ) : (
                            <span style={{ fontSize: '15px', color: '#666' }}>
                                ▶ 영상을 재생하면 스텝 이름이 자동으로 표시됩니다
                            </span>
                        )}
                    </div>

                    {/* 타이밍 조절 바 */}
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: '8px', padding: '4px 20px 10px', fontSize: '13px', color: '#666'
                    }}>
                        <button onClick={() => adjustOffset(-0.5)} style={{
                            background: '#1a1a24', border: '1px solid #2a2a35', color: '#aaa',
                            padding: '4px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer'
                        }}>◀ -0.5초</button>
                        <span style={{ color: '#888', fontSize: '12px', minWidth: '80px', textAlign: 'center' }}>
                            타이밍 {captionOffset > 0 ? `+${captionOffset}` : captionOffset}초
                        </span>
                        <button onClick={() => adjustOffset(0.5)} style={{
                            background: '#1a1a24', border: '1px solid #2a2a35', color: '#aaa',
                            padding: '4px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer'
                        }}>+0.5초 ▶</button>
                        <button
                            onClick={() => setCaptionEnabled(false)}
                            style={{
                                background: 'transparent', border: '1px solid #3a3a45', color: '#666',
                                padding: '4px 8px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer',
                                marginLeft: '4px'
                            }}
                        >끄기</button>
                    </div>
                </div>
            )}

            {/* 캡션 끈 상태: 다시 켜기 버튼 */}
            {!captionEnabled && currentVideoId && (
                <div style={{ padding: '8px 20px', textAlign: 'center' }}>
                    <button
                        onClick={() => setCaptionEnabled(true)}
                        style={{
                            background: '#1a1a24', border: '1px solid #2a2a35', color: '#888',
                            padding: '6px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer'
                        }}
                    >📺 스텝 자막 켜기</button>
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

                {/* 📝 스텝시트 (캡션과 연동 하이라이트) */}
                <div style={{ padding: '20px', backgroundColor: '#1a1a24', borderRadius: '12px', border: '1px solid #2a2a35' }}>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#ff2d55' }}>📝 스텝시트</h3>
                    {song.steps.map((step, idx) => (
                        <div key={idx} style={{
                            display: 'flex', gap: '12px', marginBottom: idx < song.steps.length - 1 ? '14px' : 0,
                            paddingBottom: idx < song.steps.length - 1 ? '14px' : 0,
                            borderBottom: idx < song.steps.length - 1 ? '1px solid #2a2a35' : 'none',
                            padding: '10px',
                            borderRadius: '8px',
                            backgroundColor: currentStepIdx === idx && isPlaying ? 'rgba(255, 45, 85, 0.1)' : 'transparent',
                            borderLeft: currentStepIdx === idx && isPlaying ? '3px solid #ff2d55' : '3px solid transparent',
                            transition: 'all 0.3s ease'
                        }}>
                            <span style={{
                                flexShrink: 0, background: currentStepIdx === idx && isPlaying ? '#ff2d55' : '#2a2a35',
                                color: '#fff',
                                padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold',
                                height: 'fit-content',
                                transition: 'all 0.3s ease'
                            }}>
                                {step.count}
                            </span>
                            <div>
                                <p style={{
                                    margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700',
                                    color: currentStepIdx === idx && isPlaying ? '#ff2d55' : '#fff',
                                    transition: 'color 0.3s ease'
                                }}>{step.move}</p>
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
                    50% { opacity: 0.7; }
                }
                @keyframes fadeInCaption {
                    from { opacity: 0; transform: translateY(4px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}