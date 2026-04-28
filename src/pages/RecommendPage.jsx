import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useVideoDetail from '../hooks/useVideoDetail';

import YouTubePlayer from '../components/YouTubePlayer/YouTubePlayer';
import ToolBar from '../components/VideoTools/ToolBar';
import SpeedPanel from '../components/VideoTools/SpeedPanel';
import ABLoopPanel from '../components/VideoTools/ABLoopPanel';
import CountPanel from '../components/VideoTools/CountPanel';
import BookmarkPanel from '../components/VideoTools/BookmarkPanel';
import FilterPanel from '../components/VideoTools/FilterPanel';
import BookmarkModal from '../components/VideoTools/BookmarkModal';

import './VideoPage.css';
import './VideoDetail.css';

// ── 여러 추천곡을 담은 배열 ──
const recommendSongs = [
    {
        id: 'recommend_mambo_italiano',
        title: 'Mambo Italiano (맘보 이탈리아노)',
        choreographer: 'Unknown',
        description: '매혹적인 맘보 리듬에 맞춰 스텝을 밟아보세요!',
        genre: '맘보',
        tags: ['⭐ 금주의 추천영상', '맘보'],
        mainVideoId: 'yvjRWSDLFlk',
        tutorialVideoId: '',
        hasTutorial: false,
        level: 2,
    },
    {
        id: 'recommend_cardio_jive',
        title: 'Cardio Jive (카디오 자이브)',
        choreographer: 'Carlene Carter',
        description: '경쾌한 자이브 리듬에 맞춰 스텝을 밟아보세요!',
        genre: '자이브',
        tags: ['⭐ 금주의 추천영상', '자이브'],
        mainVideoId: 'i05t5vJXvxo',
        tutorialVideoId: '',
        hasTutorial: false,
        level: 2,
    },
    {
        id: 'recommend_cant_take_my_eyes',
        title: "Can't Take My Eyes Off You",
        choreographer: 'Unknown',
        description: '감미로운 팝송 멜로디에 맞춰 스텝을 밟아보세요!',
        genre: '팝',
        tags: ['⭐ 금주의 추천영상', '팝'],
        mainVideoId: 'xlysbzpKAlo',
        tutorialVideoId: '',
        hasTutorial: false,
        level: 2,
    },
    {
        id: 'recommend_pinocchio',
        title: 'Pinocchio (피노키오)',
        choreographer: 'Unknown',
        description: '아름다운 샹송 멜로디에 맞춰 스텝을 밟아보세요!',
        genre: '팝',
        tags: ['⭐ 금주의 추천영상', '초급'],
        mainVideoId: 'J3JZydyYUFA',
        tutorialVideoId: '',
        hasTutorial: false,
        level: 1,
    },
    {
        id: 'recommend_cestlavie',
        title: "C'est La Vie (쎄라비)",
        choreographer: 'Ria Vos',
        description: '신나는 음악에 맞춰 경쾌한 스텝을 밟아보세요!',
        genre: '팝',
        tags: ['⭐ 금주의 추천영상', '팝'],
        mainVideoId: 'Y4-JZIlOpe8',
        tutorialVideoId: '',
        hasTutorial: false,
        level: 2,
    },
    {
        id: 'recommend_havana',
        title: 'Havana Cha (하바나 차)',
        choreographer: 'Ria Vos',
        description: '음악의 리듬을 느끼며 경쾌하게 스텝을 밟아보세요! 전체적인 안무 흐름을 파악하기 좋은 본 영상입니다.',
        genre: '차차차',
        tags: ['⭐ 금주의 추천영상', '차차차'],
        mainVideoId: 'gTcqjNCsU64',
        tutorialVideoId: 'wixCZ2dY7gc',
        hasTutorial: true,
        level: 1,
    },
    {
        id: 'recommend_lanochemia',
        title: 'La Noche Mia (라 노체미아)',
        choreographer: 'Unknown',
        description: '매혹적인 라틴 리듬에 맞춰 스텝을 밟아보세요!',
        genre: '라틴',
        tags: ['⭐ 금주의 추천영상', '라틴'],
        mainVideoId: 'dVW1chyRreE',
        tutorialVideoId: '68vA4Ir_Xh4',
        hasTutorial: true,
        level: 2,
    },
    {
        id: 'recommend_new_3',
        title: '신규 추천 영상',
        choreographer: 'Unknown',
        description: '신나는 라인댄스 스텝을 즐겨보세요!',
        genre: '팝',
        tags: ['⭐ 금주의 추천영상'],
        mainVideoId: 'KtJ7QJ9evJU',
        tutorialVideoId: '',
        hasTutorial: false,
        level: 2,
    }
];

export default function RecommendPage() {
    const navigate = useNavigate();
    const [selectedVideoId, setSelectedVideoId] = useState(null);

    // --- 연속 재생 상태 ---
    const [autoPlayNext, setAutoPlayNext] = useState(true);

    // --- 리스트 화면 상태 ---
    const [activeTab, setActiveTab] = useState('전체');
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showScrollBottom, setShowScrollBottom] = useState(true);

    const handleScroll = useCallback(() => {
        if (selectedVideoId) return;
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        setShowScrollTop(scrollTop > 300);
        setShowScrollBottom(scrollTop + clientHeight < scrollHeight - 200);
    }, [selectedVideoId]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const scrollToBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

    const genres = useMemo(() => {
        const g = [...new Set(recommendSongs.map(s => s.genre))];
        return g;
    }, []);
    const tabs = ['전체', ...genres];

    const displayVideos = useMemo(() => {
        return recommendSongs.filter(v => {
            if (activeTab === '전체') return true;
            if (v.genre === activeTab) return true;
            return false;
        });
    }, [activeTab]);

    // --- 플레이어 화면 용 ---
    const playerRef = useRef(null);
    const currentIndex = selectedVideoId ? recommendSongs.findIndex(s => s.id === selectedVideoId) : -1;
    const currentSong = currentIndex !== -1 ? recommendSongs[currentIndex] : null;

    const prevSong = currentIndex > 0 ? recommendSongs[currentIndex - 1] : null;
    const nextSong = currentIndex < recommendSongs.length - 1 ? recommendSongs[currentIndex + 1] : null;

    const vd = useVideoDetail({
        playerRef,
        mainVideoId: currentSong?.mainVideoId || '',
        tutorialVideoId: currentSong?.tutorialVideoId || '',
        hasTutorial: currentSong?.hasTutorial || false,
        id: currentSong?.id || '',
        videoData: currentSong || {},
    });

    const handleStateChange = useCallback((e) => {
        // e.data === 0 은 영상 종료(YT.PlayerState.ENDED)
        if (e.data === 0 && autoPlayNext && nextSong) {
            setSelectedVideoId(nextSong.id);
        }
    }, [autoPlayNext, nextSong]);

    // --- 렌더링: 리스트 화면 ---
    if (!selectedVideoId) {
        return (
            <div className="video-container">
                <div className="video-header-wrapper">
                    <h1 className="video-page-title">🎬 영상 모음</h1>
                    <p className="video-page-subtitle">추천하는 멋진 안무들을 감상해보세요.</p>

                    {/* 가로 스크롤 필터 탭 */}
                    <div className="tab-scroll-container" style={{ marginTop: '16px' }}>
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                className={`tab-pill ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 영상 리스트 */}
                <div className="video-list">
                    {displayVideos.length === 0 ? (
                        <div className="empty-message">해당하는 영상이 없습니다. 🥲</div>
                    ) : (
                        displayVideos.map(video => {
                            return (
                                <div
                                    key={video.id}
                                    className="video-list-item"
                                    onClick={() => {
                                        setSelectedVideoId(video.id);
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    {/* 썸네일 */}
                                    <div className="list-thumbnail">
                                        <img src={`https://img.youtube.com/vi/${video.mainVideoId}/mqdefault.jpg`} alt={video.title} />
                                        <div className="list-play-icon">▶</div>
                                    </div>

                                    {/* 곡 정보 */}
                                    <div className="list-info">
                                        <div className="info-top">
                                            <span className="info-date">{video.genre}</span>
                                        </div>
                                        <h3 className="info-title-eng">{video.title}</h3>
                                        <p className="info-title-kor">{video.choreographer}</p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* 🔼🔽 스크롤 화살표 플로팅 버튼 */}
                <div style={{ position: 'fixed', right: '16px', bottom: 'calc(80px + env(safe-area-inset-bottom))', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 20 }}>
                    {showScrollTop && (
                        <button onClick={scrollToTop} style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255, 51, 102, 0.85)', color: '#fff', border: 'none', fontSize: '22px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>▲</button>
                    )}
                    {showScrollBottom && (
                        <button onClick={scrollToBottom} style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255, 51, 102, 0.85)', color: '#fff', border: 'none', fontSize: '22px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>▼</button>
                    )}
                </div>
            </div>
        );
    }

    // --- 렌더링: 플레이어 화면 ---
    return (
        <div className="video-detail" style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom))' }}>
            <div style={{ position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                <button onClick={() => setSelectedVideoId(null)} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '8px 14px', borderRadius: '10px', fontSize: '.82rem', fontWeight: 700, border: '1px solid rgba(255,255,255,.12)', cursor: 'pointer', background: 'rgba(255,255,255,.06)', color: '#e8e8f0', WebkitTapHighlightColor: 'transparent' }}>← 목록</button>
                <span style={{ flex: 1, textAlign: 'center', fontSize: '.85rem', fontWeight: 700, color: '#a0a0c0' }}>영상 재생</span>
            </div>

            <YouTubePlayer
                ref={playerRef}
                videoId={vd.currentVideoId}
                title={currentSong.title}
                mirror={vd.isMirror}
                brightness={vd.brightness}
                contrast={vd.contrast}
                autoplay={true}
                onReady={vd.handlePlayerReady}
                onStateChange={handleStateChange}
                onBack={() => setSelectedVideoId(null)}
            >
                {vd.showCount && (
                    <div className="count-overlay">
                        {[1,2,3,4,5,6,7,8].map(n => (
                            <div key={n} className={`count-beat ${vd.currentBeat === n ? 'count-beat--active' : ''}`}>{n}</div>
                        ))}
                    </div>
                )}
                {vd.abLoopActive && (
                    <div className="ab-badge">🔁 {vd.formatTime(vd.pointA)} → {vd.formatTime(vd.pointB)}</div>
                )}
            </YouTubePlayer>

            <div className="video-detail__content">
                <ToolBar activeTool={vd.activeTool} setActiveTool={vd.setActiveTool} isMirror={vd.isMirror} onToggleMirror={vd.toggleMirror} onTogglePip={vd.togglePip} onShare={vd.handleShare} />

                {vd.activeTool === 'speed' && <SpeedPanel speed={vd.speed} speeds={vd.speeds} onSpeedChange={vd.handleSpeedChange} quality={vd.quality} qualities={vd.qualities} onQualityChange={vd.handleQualityChange} />}
                {vd.activeTool === 'ab' && <ABLoopPanel pointA={vd.pointA} pointB={vd.pointB} abLoopActive={vd.abLoopActive} onSetA={vd.setAPoint} onSetB={vd.setBPoint} onClear={vd.clearAB} formatTime={vd.formatTime} />}
                {vd.activeTool === 'count' && <CountPanel showCount={vd.showCount} onToggle={() => vd.setShowCount(!vd.showCount)} bpm={vd.bpm} onBpmChange={vd.setBpm} />}
                {vd.activeTool === 'bookmark' && <BookmarkPanel bookmarks={vd.bookmarks} onAdd={vd.addBookmark} onJump={vd.jumpToBookmark} onDelete={vd.deleteBookmark} formatTime={vd.formatTime} />}
                {vd.activeTool === 'filter' && <FilterPanel brightness={vd.brightness} contrast={vd.contrast} onBrightnessChange={vd.setBrightness} onContrastChange={vd.setContrast} onReset={vd.resetFilter} />}

                <div className="nav-bar">
                    <button className={`nav-bar__btn ${!prevSong ? 'nav-bar__btn--disabled' : ''}`} onClick={() => prevSong && setSelectedVideoId(prevSong.id)} disabled={!prevSong}>⏮ 이전 곡</button>
                    <div className="nav-bar__divider" />
                    <button className="nav-bar__btn nav-bar__btn--cinema" onClick={() => playerRef.current?.enterCinema()}>🎬 전체 화면</button>
                    <div className="nav-bar__divider" />
                    <button className={`nav-bar__btn ${!nextSong ? 'nav-bar__btn--disabled' : ''}`} onClick={() => nextSong && setSelectedVideoId(nextSong.id)} disabled={!nextSong}>다음 곡 ⏭</button>
                </div>

                <div className="view-toggle">
                    <button className={`view-toggle__btn ${vd.viewMode === 'main' ? 'view-toggle__btn--active' : ''}`} onClick={() => vd.setViewMode('main')}>🎵 음악 맞춰 실전</button>
                    <button className={`view-toggle__btn ${vd.viewMode === 'tutorial' ? 'view-toggle__btn--active' : ''}`} onClick={() => vd.setViewMode('tutorial')}>👣 친절한 스텝 설명</button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '20px' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#fff' }}>▶️ 연속 재생 (끝나면 다음 곡으로)</span>
                    <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '28px' }}>
                        <input type="checkbox" checked={autoPlayNext} onChange={(e) => setAutoPlayNext(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{
                            position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: autoPlayNext ? '#ff2d55' : 'rgba(255,255,255,0.2)', borderRadius: '34px', transition: '.4s'
                        }}>
                            <span style={{
                                position: 'absolute', height: '20px', width: '20px', left: '4px', bottom: '4px',
                                backgroundColor: 'white', borderRadius: '50%', transition: '.4s',
                                transform: autoPlayNext ? 'translateX(22px)' : 'none'
                            }} />
                        </span>
                    </label>
                </div>

                {vd.viewMode === 'tutorial' && !currentSong.hasTutorial && (
                    <div className="tutorial-notice">👣 스텝 설명 영상이 준비 중입니다</div>
                )}

                <div className="song-tags">
                    {currentSong.tags?.map((tag, idx) => (
                        <span key={idx} className="song-tag" style={{ background: '#ff2d55', color: '#fff', border: 'none' }}>{tag}</span>
                    ))}
                </div>

                <h1 className="song-title">{currentSong.title}</h1>
                <p className="song-choreographer">안무가: {currentSong.choreographer}</p>

                <div className="song-note">
                    <h3 className="song-note__title">📝 영상 노트</h3>
                    <p className="song-note__text">{currentSong.description}</p>
                </div>
            </div>

            <BookmarkModal bookmark={vd.bookmarkModal} label={vd.bookmarkLabel} onLabelChange={vd.setBookmarkLabel} onConfirm={vd.confirmBookmark} onCancel={vd.cancelBookmark} formatTime={vd.formatTime} inputRef={vd.bookmarkInputRef} />
            {vd.shareToast && <div className="share-toast">{vd.shareToast}</div>}
        </div>
    );
}
