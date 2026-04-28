import React, { useRef, useState } from 'react';
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

import './VideoDetail.css';

export default function RecommendPage() {
    const navigate = useNavigate();
    const playerRef = useRef(null);

    // ── 여러 추천곡을 담은 배열 ──
    const recommendSongs = [
        {
            id: 'recommend_havana',
            title: 'Havana Cha (하바나 차)',
            choreographer: 'Ria Vos',
            description: '음악의 리듬을 느끼며 경쾌하게 스텝을 밟아보세요! 전체적인 안무 흐름을 파악하기 좋은 본 영상입니다.',
            tags: ['⭐ 금주의 추천영상', '차차차'],
            mainVideoId: 'gTcqjNCsU64',
            tutorialVideoId: 'wixCZ2dY7gc',
            hasTutorial: true,
        },
        {
            id: 'recommend_lanochemia',
            title: 'La Noche Mia (라 노체미아)',
            choreographer: 'Unknown',
            description: '매혹적인 라틴 리듬에 맞춰 스텝을 밟아보세요!',
            tags: ['⭐ 금주의 추천영상', '라틴'],
            mainVideoId: 'dVW1chyRreE',
            tutorialVideoId: '68vA4Ir_Xh4',
            hasTutorial: true,
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentSong = recommendSongs[currentIndex];

    const prevSong = currentIndex > 0 ? recommendSongs[currentIndex - 1] : null;
    const nextSong = currentIndex < recommendSongs.length - 1 ? recommendSongs[currentIndex + 1] : null;

    // ── 커스텀 훅 ──
    const vd = useVideoDetail({
        playerRef,
        mainVideoId: currentSong.mainVideoId,
        tutorialVideoId: currentSong.tutorialVideoId,
        hasTutorial: currentSong.hasTutorial,
        id: currentSong.id,
        videoData: currentSong,
    });

    return (
        <div className="video-detail" style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom))' }}>
            {/* 상단 고정 네비바 */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 12px', background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255,255,255,.08)'
            }}>
                <button onClick={() => navigate(-1)} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '8px 14px', borderRadius: '10px',
                    fontSize: '.82rem', fontWeight: 700, border: '1px solid rgba(255,255,255,.12)', cursor: 'pointer',
                    background: 'rgba(255,255,255,.06)', color: '#e8e8f0', WebkitTapHighlightColor: 'transparent'
                }}>← 뒤로</button>
                <span style={{ flex: 1, textAlign: 'center', fontSize: '.85rem', fontWeight: 700, color: '#a0a0c0' }}>영상모음</span>
                <button onClick={() => navigate('/')} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '8px 14px', borderRadius: '10px',
                    fontSize: '.82rem', fontWeight: 700, border: '1px solid rgba(255,255,255,.12)', cursor: 'pointer',
                    background: 'rgba(255,255,255,.06)', color: '#e8e8f0', WebkitTapHighlightColor: 'transparent'
                }}>🏠 홈</button>
            </div>

            {/* 📺 YouTube 플레이어 */}
            <YouTubePlayer
                ref={playerRef}
                videoId={vd.currentVideoId}
                title={currentSong.title}
                mirror={vd.isMirror}
                brightness={vd.brightness}
                contrast={vd.contrast}
                onReady={vd.handlePlayerReady}
                onBack={() => navigate(-1)}
            >
                {/* 카운트 오버레이 */}
                {vd.showCount && (
                    <div className="count-overlay">
                        {[1,2,3,4,5,6,7,8].map(n => (
                            <div key={n} className={`count-beat ${vd.currentBeat === n ? 'count-beat--active' : ''}`}>
                                {n}
                            </div>
                        ))}
                    </div>
                )}

                {/* A-B 루프 배지 */}
                {vd.abLoopActive && (
                    <div className="ab-badge">
                        🔁 {vd.formatTime(vd.pointA)} → {vd.formatTime(vd.pointB)}
                    </div>
                )}
            </YouTubePlayer>

            {/* 도구 패널 영역 */}
            <div className="video-detail__content">
                {/* 🎛️ 도구 바 */}
                <ToolBar
                    activeTool={vd.activeTool}
                    setActiveTool={vd.setActiveTool}
                    isMirror={vd.isMirror}
                    onToggleMirror={vd.toggleMirror}
                    onTogglePip={vd.togglePip}
                    onShare={vd.handleShare}
                />

                {/* 패널 렌더링 */}
                {vd.activeTool === 'speed' && (
                    <SpeedPanel
                        speed={vd.speed} speeds={vd.speeds}
                        onSpeedChange={vd.handleSpeedChange}
                        quality={vd.quality} qualities={vd.qualities}
                        onQualityChange={vd.handleQualityChange}
                    />
                )}

                {vd.activeTool === 'ab' && (
                    <ABLoopPanel
                        pointA={vd.pointA} pointB={vd.pointB}
                        abLoopActive={vd.abLoopActive}
                        onSetA={vd.setAPoint} onSetB={vd.setBPoint}
                        onClear={vd.clearAB}
                        formatTime={vd.formatTime}
                    />
                )}

                {vd.activeTool === 'count' && (
                    <CountPanel
                        showCount={vd.showCount}
                        onToggle={() => vd.setShowCount(!vd.showCount)}
                        bpm={vd.bpm}
                        onBpmChange={vd.setBpm}
                    />
                )}

                {vd.activeTool === 'bookmark' && (
                    <BookmarkPanel
                        bookmarks={vd.bookmarks}
                        onAdd={vd.addBookmark}
                        onJump={vd.jumpToBookmark}
                        onDelete={vd.deleteBookmark}
                        formatTime={vd.formatTime}
                    />
                )}

                {vd.activeTool === 'filter' && (
                    <FilterPanel
                        brightness={vd.brightness} contrast={vd.contrast}
                        onBrightnessChange={vd.setBrightness}
                        onContrastChange={vd.setContrast}
                        onReset={vd.resetFilter}
                    />
                )}

                {/* 이전곡 / 전체화면 / 다음곡 */}
                <div className="nav-bar">
                    <button 
                        className={`nav-bar__btn ${!prevSong ? 'nav-bar__btn--disabled' : ''}`}
                        onClick={() => prevSong && setCurrentIndex(currentIndex - 1)}
                        disabled={!prevSong}
                    >
                        ⏮ 이전 곡
                    </button>
                    <div className="nav-bar__divider" />
                    <button
                        className="nav-bar__btn nav-bar__btn--cinema"
                        onClick={() => playerRef.current?.enterCinema()}
                    >
                        🎬 전체 화면
                    </button>
                    <div className="nav-bar__divider" />
                    <button 
                        className={`nav-bar__btn ${!nextSong ? 'nav-bar__btn--disabled' : ''}`}
                        onClick={() => nextSong && setCurrentIndex(currentIndex + 1)}
                        disabled={!nextSong}
                    >
                        다음 곡 ⏭
                    </button>
                </div>

                {/* 실전 / 스텝설명 토글 */}
                <div className="view-toggle">
                    <button
                        className={`view-toggle__btn ${vd.viewMode === 'main' ? 'view-toggle__btn--active' : ''}`}
                        onClick={() => vd.setViewMode('main')}
                    >
                        🎵 음악 맞춰 실전
                    </button>
                    <button
                        className={`view-toggle__btn ${vd.viewMode === 'tutorial' ? 'view-toggle__btn--active' : ''}`}
                        onClick={() => vd.setViewMode('tutorial')}
                    >
                        👣 친절한 스텝 설명
                    </button>
                </div>

                {/* 튜토리얼 없음 안내 */}
                {vd.viewMode === 'tutorial' && !currentSong.hasTutorial && (
                    <div className="tutorial-notice">
                        👣 스텝 설명 영상이 준비 중입니다
                    </div>
                )}

                {/* 태그 */}
                <div className="song-tags">
                    {currentSong.tags?.map((tag, idx) => (
                        <span key={idx} className="song-tag" style={{ background: '#ff2d55', color: '#fff', border: 'none' }}>{tag}</span>
                    ))}
                </div>

                {/* 곡 정보 */}
                <h1 className="song-title">{currentSong.title}</h1>
                <p className="song-choreographer">안무가: {currentSong.choreographer}</p>

                <div className="song-note">
                    <h3 className="song-note__title">📝 영상 노트</h3>
                    <p className="song-note__text">{currentSong.description}</p>
                </div>
            </div>

            {/* 북마크 모달 */}
            <BookmarkModal
                bookmark={vd.bookmarkModal}
                label={vd.bookmarkLabel}
                onLabelChange={vd.setBookmarkLabel}
                onConfirm={vd.confirmBookmark}
                onCancel={vd.cancelBookmark}
                formatTime={vd.formatTime}
                inputRef={vd.bookmarkInputRef}
            />

            {/* 공유 토스트 */}
            {vd.shareToast && (
                <div className="share-toast">{vd.shareToast}</div>
            )}
        </div>
    );
}
