import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import songs, { getSongsForLocation } from '../data/songs';
import { useLocation } from '../context/LocationContext';

import YouTubePlayer from '../components/YouTubePlayer/YouTubePlayer';

export default function VideoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const playerRef = useRef(null);

    const [viewMode, setViewMode] = useState('main');
    const [speed, setSpeed] = useState(1);
    const [playerReady, setPlayerReady] = useState(false);
    const [isMirror, setIsMirror] = useState(false);

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

    // 🎛️ 도구 패널 토글
    const [activeTool, setActiveTool] = useState(null);

    const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5];

    useEffect(() => {
        window.scrollTo(0, 0);
        setViewMode('main');
        setPointA(null);
        setPointB(null);
        setAbLoopActive(false);
    }, [id]);

    const { selectedLocation } = useLocation();
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

    // =============================
    // 플레이어 콜백
    // =============================
    const handlePlayerReady = useCallback((e) => {
        setPlayerReady(true);
        try {
            const player = e.target;
            player.setPlaybackRate(speed);
            player.setPlaybackQuality(quality);
        } catch (err) {}
    }, [speed, quality]);

    const handleSpeedChange = (s) => {
        setSpeed(s);
        playerRef.current?.setSpeed(s);
    };

    const handleQualityChange = (q) => {
        setQuality(q);
        playerRef.current?.setQuality(q);
    };

    const getCurrentTime = () => {
        return playerRef.current?.getCurrentTime() || 0;
    };

    const formatTime = (sec) => {
        if (sec == null) return '--:--';
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${String(s).padStart(2, '0')}`;
    };

    // =============================
    // A-B 구간 반복
    // =============================
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

    const lastSeekTimeRef = useRef(0);
    useEffect(() => {
        clearInterval(abIntervalRef.current);
        if (abLoopActive && pointA !== null && pointB !== null) {
            abIntervalRef.current = setInterval(() => {
                const t = getCurrentTime();
                const now = Date.now();
                if (t >= pointB && now - lastSeekTimeRef.current > 500) {
                    lastSeekTimeRef.current = now;
                    playerRef.current?.seekTo(pointA, true);
                }
            }, 250);
        }
        return () => clearInterval(abIntervalRef.current);
    }, [abLoopActive, pointA, pointB]);

    // =============================
    // PIP
    // =============================
    const togglePip = async () => {
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
                setIsPip(false);
            } else {
                window.open(`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0&playsinline=1`, '_blank',
                    'width=400,height=250,toolbar=0,menubar=0,location=0');
                setIsPip(true);
            }
        } catch (e) {}
    };

    // =============================
    // 카운트 오버레이
    // =============================
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

    // 언마운트 시 정리
    useEffect(() => {
        return () => {
            clearInterval(abIntervalRef.current);
            clearInterval(countIntervalRef.current);
            clearTimeout(shareToastTimerRef.current);
        };
    }, []);

    // =============================
    // 북마크
    // =============================
    const addBookmark = () => {
        const t = getCurrentTime();
        const label = prompt(`${formatTime(t)} 시점에 메모를 입력하세요:`, `스텝 포인트`);
        if (label) {
            saveBookmarks([...bookmarks, { time: t, label, id: Date.now() }].sort((a, b) => a.time - b.time));
        }
    };

    const jumpToBookmark = (time) => {
        playerRef.current?.seekTo(time, true);
    };

    const deleteBookmark = (bmId) => {
        saveBookmarks(bookmarks.filter(b => b.id !== bmId));
    };

    // =============================
    // 공유
    // =============================
    const [shareToast, setShareToast] = useState('');
    const shareToastTimerRef = useRef(null);
    const handleShare = async () => {
        const shareUrl = `https://stepbystep-linedance.vercel.app/video/${id}`;
        const youtubeUrl = `https://youtu.be/${currentVideoId}`;
        const shareText = `💃 ${videoData.title}\n\n구향회 스텝바이스텝 라인댄스에서 함께 춰봐요!\n\n🎬 영상: ${youtubeUrl}\n📱 앱: ${shareUrl}`;

        if (navigator.share) {
            try {
                await navigator.share({ title: `💃 ${videoData.title} - 스텝바이스텝`, text: shareText, url: shareUrl });
            } catch (e) {}
        } else {
            try {
                await navigator.clipboard.writeText(shareText);
                setShareToast('📋 링크가 복사되었습니다! 카톡에 붙여넣기 하세요');
                clearTimeout(shareToastTimerRef.current);
                shareToastTimerRef.current = setTimeout(() => setShareToast(''), 2500);
            } catch (e) {
                prompt('아래 링크를 복사하세요:', shareUrl);
            }
        }
    };

    const toolBtnStyle = (isActive) => ({
        padding: '8px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 700,
        border: isActive ? '2px solid #ff2d55' : '1px solid rgba(255,255,255,0.1)',
        background: isActive ? 'rgba(255,45,85,0.15)' : 'rgba(255,255,255,0.05)',
        color: isActive ? '#ff6b8a' : '#a0a0c0',
        cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '4px',
    });

    // =============================
    // 렌더
    // =============================
    return (
        <div style={{ backgroundColor: '#0a0a0f', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#fff' }}>

            {/* 📺 통합 YouTube 플레이어 */}
            <YouTubePlayer
                ref={playerRef}
                videoId={currentVideoId}
                title={videoData.title}
                mirror={isMirror}
                brightness={brightness}
                contrast={contrast}
                onReady={handlePlayerReady}
                onBack={() => navigate(-1)}
            >
                {/* 카운트 오버레이 */}
                {showCount && (
                    <div style={{
                        position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50%)',
                        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
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
            </YouTubePlayer>

            {/* 도구 패널 영역 (시네마 모드가 아닐 때 표시) */}
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
                    <button onClick={() => playerRef.current?.enterCinema()} style={{ flex: 1.2, padding: '12px 0', background: 'transparent', border: 'none', color: '#ff2d55', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>🎬 전체 화면</button>
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

const abBtnStyle = (color) => {
    // hex color를 rgba로 변환
    const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r},${g},${b}`;
    };
    const rgb = hexToRgb(color);
    return {
        padding: '10px 16px', borderRadius: '12px', fontSize: '13px', fontWeight: 700,
        border: `1px solid rgba(${rgb},0.2)`, background: `rgba(${rgb},0.08)`, color, cursor: 'pointer',
    };
};

const smallBtnStyle = {
    width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '18px', fontWeight: 700,
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
};