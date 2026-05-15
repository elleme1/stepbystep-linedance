import React, { useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import songs from '../data/songs';
import { useLocation } from '../context/LocationContext';
import { useData } from '../context/DataContext';
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

export default function VideoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const playerRef = useRef(null);

    // ── 장소별 곡 데이터 ──
    const { selectedLocation } = useLocation();
    const { getSongsForLocation } = useData();
    const locationSongs = useMemo(() => getSongsForLocation(selectedLocation), [selectedLocation, getSongsForLocation]);

    const currentIndex = locationSongs.findIndex(song => String(song.id) === String(id));
    const videoData = currentIndex !== -1 ? locationSongs[currentIndex] : null;
    const prevSong = currentIndex > 0 ? locationSongs[currentIndex - 1] : null;
    const nextSong = currentIndex < locationSongs.length - 1 ? locationSongs[currentIndex + 1] : null;

    // ── 영상 ID 추출 ──
    const extractVideoId = (url) => {
        if (!url) return '';
        const str = String(url).trim();
        if (str.length === 11 && !str.includes('/')) return str;
        const match = str.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
        return match ? match[1] : str;
    };

    const safeVideoData = videoData || locationSongs[0] || songs[0];
    const rawMainId = safeVideoData.mainVideoId || safeVideoData.youtubeId || '';
    const rawTutorialId = safeVideoData.tutorialVideoId || safeVideoData.tutorialId || '';
    const mainVideoId = extractVideoId(rawMainId);
    const tutorialVideoId = extractVideoId(rawTutorialId);
    const hasTutorial = Boolean(tutorialVideoId && tutorialVideoId !== mainVideoId);

    // ── 커스텀 훅 ──
    const vd = useVideoDetail({
        playerRef,
        mainVideoId,
        tutorialVideoId,
        hasTutorial,
        id,
        videoData: safeVideoData,
    });

    // ── 영상 없음 ──
    if (!videoData) {
        return (
            <div className="video-detail" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <p style={{ fontSize: '18px', color: '#888' }}>영상을 찾을 수 없습니다</p>
                <button
                    onClick={() => navigate('/videos')}
                    style={{ marginTop: '16px', padding: '12px 24px', borderRadius: '12px', background: '#ff2d55', color: '#fff', border: 'none', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}
                >
                    영상 보관함으로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <div className="video-detail">
            {/* 📺 YouTube 플레이어 */}
            <YouTubePlayer
                ref={playerRef}
                videoId={vd.currentVideoId}
                title={safeVideoData.title}
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
                        onClick={() => prevSong && navigate(`/video/${prevSong.id}`)}
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
                        onClick={() => nextSong && navigate(`/video/${nextSong.id}`)}
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
                {vd.viewMode === 'tutorial' && !hasTutorial && (
                    <div className="tutorial-notice">
                        👣 스텝 설명 영상이 준비 중입니다
                    </div>
                )}

                {/* 태그 */}
                <div className="song-tags">
                    {safeVideoData.tags?.map((tag, idx) => (
                        <span key={idx} className="song-tag">{tag}</span>
                    ))}
                </div>

                {/* 곡 정보 */}
                <h1 className="song-title">{safeVideoData.title}</h1>
                <p className="song-choreographer">안무가: {safeVideoData.choreographer || '구향회 원장'}</p>

                <div className="song-note">
                    <h3 className="song-note__title">📝 원장님의 안무 노트</h3>
                    <p className="song-note__text">{safeVideoData.description || '신나게 스텝을 밟아보세요!'}</p>
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
