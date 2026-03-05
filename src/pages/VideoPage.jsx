import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import songs from '../data/songs';
import { levelText } from '../data/constants';
import './VideoPage.css';

export default function VideoPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('전체');
    const [likedIds, setLikedIds] = useState([]);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showScrollBottom, setShowScrollBottom] = useState(true);

    // 스크롤 위치에 따라 화살표 버튼 보이기/숨기기
    const handleScroll = useCallback(() => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        setShowScrollTop(scrollTop > 300);
        setShowScrollBottom(scrollTop + clientHeight < scrollHeight - 200);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const scrollToBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

    // 장르와 레벨 목록을 데이터에서 자동 추출
    const genres = useMemo(() => {
        const g = [...new Set(songs.map(s => s.genre))];
        return g;
    }, []);

    const levels = useMemo(() => {
        const l = [...new Set(songs.map(s => s.level))].sort();
        return l.map(lv => ({ value: lv, label: levelText[lv] }));
    }, []);

    const tabs = ['전체', '이번주', ...levels.map(l => l.label), ...genres];

    const toggleLike = (e, id) => {
        e.stopPropagation();
        if (likedIds.includes(id)) {
            setLikedIds(likedIds.filter(likedId => likedId !== id));
        } else {
            setLikedIds([...likedIds, id]);
        }
    };

    const displayVideos = useMemo(() => {
        return songs
            .filter(v => {
                if (activeTab === '전체') return true;
                if (activeTab === '이번주') return v.isThisWeek;
                if (v.genre === activeTab) return true;
                if (levelText[v.level] === activeTab) return true;
                return false;
            })
            .sort((a, b) => {
                const aLiked = likedIds.includes(a.id);
                const bLiked = likedIds.includes(b.id);
                if (aLiked && !bLiked) return -1;
                if (!aLiked && bLiked) return 1;
                // 이번주 곡 우선
                if (a.isThisWeek && !b.isThisWeek) return -1;
                if (!a.isThisWeek && b.isThisWeek) return 1;
                return 0;
            });
    }, [activeTab, likedIds]);

    return (
        <div className="video-container">

            {/* 상단 헤더 및 필터 */}
            <div className="video-header-wrapper">
                <h1 className="video-page-title">📚 안무 보관함</h1>
                <p className="video-page-subtitle">배운 안무들을 복습하고 연속 재생해 보세요.</p>

                {/* 연속 재생 버튼 */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <button
                        className="tab-pill active"
                        style={{ flex: 1, padding: '12px', fontSize: '15px' }}
                        onClick={() => navigate('/playlist?mode=thisweek')}
                    >
                        ▶️ 이번주 곡 연속 재생
                    </button>
                    <button
                        className="tab-pill"
                        style={{ flex: 1, padding: '12px', fontSize: '15px' }}
                        onClick={() => navigate('/playlist?mode=archive')}
                    >
                        🔄 전체 곡 연속 재생
                    </button>
                </div>

                {/* 가로 스크롤 필터 탭 */}
                <div className="tab-scroll-container">
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
                        const isLiked = likedIds.includes(video.id);

                        return (
                            <div
                                key={video.id}
                                className={`video-list-item ${isLiked ? 'liked-item' : ''}`}
                                onClick={() => navigate(`/video/${video.id}`)}
                            >

                                {/* 썸네일 */}
                                <div className="list-thumbnail">
                                    <img src={video.thumbnail} alt={video.title} />
                                    <div className="list-play-icon">▶</div>
                                    {video.isThisWeek && (
                                        <span style={{
                                            position: 'absolute', top: '4px', left: '4px',
                                            background: '#ff3366', color: '#fff',
                                            fontSize: '10px', fontWeight: '700',
                                            padding: '1px 6px', borderRadius: '4px'
                                        }}>이번주</span>
                                    )}
                                </div>

                                {/* 곡 정보 */}
                                <div className="list-info">
                                    <div className="info-top">
                                        <span className="info-date">{video.genre}</span>
                                        <span className={`info-level level-${video.level <= 1 ? 'easy' : video.level <= 2 ? 'medium' : 'hard'}`}>
                                            {levelText[video.level]}
                                        </span>
                                    </div>

                                    <h3 className="info-title-eng">{video.title}</h3>
                                    <p className="info-title-kor">{video.artist} · {video.choreographer}</p>
                                </div>

                                {/* 찜하기 버튼 */}
                                <button
                                    className="heart-btn"
                                    onClick={(e) => toggleLike(e, video.id)}
                                    aria-label="찜하기"
                                >
                                    {isLiked ? '❤️' : '🤍'}
                                </button>
                            </div>
                        );
                    })
                )}
            </div>

            {/* 🔼🔽 스크롤 화살표 플로팅 버튼 */}
            <div style={{
                position: 'fixed',
                right: '16px',
                bottom: 'calc(80px + env(safe-area-inset-bottom))',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                zIndex: 20
            }}>
                {showScrollTop && (
                    <button
                        onClick={scrollToTop}
                        style={{
                            width: '48px', height: '48px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 51, 102, 0.85)',
                            color: '#fff',
                            border: 'none',
                            fontSize: '22px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backdropFilter: 'blur(8px)',
                            transition: 'transform 0.2s, opacity 0.3s'
                        }}
                        aria-label="맨 위로"
                    >
                        ▲
                    </button>
                )}
                {showScrollBottom && (
                    <button
                        onClick={scrollToBottom}
                        style={{
                            width: '48px', height: '48px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 51, 102, 0.85)',
                            color: '#fff',
                            border: 'none',
                            fontSize: '22px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backdropFilter: 'blur(8px)',
                            transition: 'transform 0.2s, opacity 0.3s'
                        }}
                        aria-label="맨 아래로"
                    >
                        ▼
                    </button>
                )}
            </div>

        </div>
    );
}
