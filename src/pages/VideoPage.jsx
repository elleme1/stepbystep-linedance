import React, { useState, useMemo } from 'react';
import './VideoPage.css';

export default function VideoPage() {
    const [activeTab, setActiveTab] = useState('전체');
    const [likedIds, setLikedIds] = useState(['v2']);

    const videos = [
        { id: 'v1', titleKor: '텍사스 타임', titleEng: 'Texas Time', level: '초급', category: '팝송', date: '24년 5월', thumb: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=400' },
        { id: 'v2', titleKor: '맘마미아', titleEng: 'Mamma Mia', level: '중급', category: '팝송', date: '24년 4월', thumb: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=400' },
        { id: 'v3', titleKor: '안동역에서', titleEng: 'At Andong Station', level: '초급', category: '트로트', date: '24년 3월', thumb: 'https://images.unsplash.com/photo-1504609774734-7389280d90db?auto=format&fit=crop&q=80&w=400' },
        { id: 'v4', titleKor: '차차 슬라이드', titleEng: 'Cha Cha Slide', level: '초급', category: '팝송', date: '24년 2월', thumb: 'https://images.unsplash.com/photo-1493225457224-eda0e6fdbe45?auto=format&fit=crop&q=80&w=400' },
        { id: 'v5', titleKor: '데스파시토', titleEng: 'Despacito', level: '고급', category: '팝송', date: '24년 1월', thumb: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=400' },
    ];

    const tabs = ['전체', '초급', '중급', '고급', '팝송', '트로트'];

    const toggleLike = (e, id) => {
        e.stopPropagation();
        if (likedIds.includes(id)) {
            setLikedIds(likedIds.filter(likedId => likedId !== id));
        } else {
            setLikedIds([...likedIds, id]);
        }
    };

    const displayVideos = useMemo(() => {
        return videos
            .filter(v => activeTab === '전체' || v.category === activeTab || v.level === activeTab)
            .sort((a, b) => {
                const aLiked = likedIds.includes(a.id);
                const bLiked = likedIds.includes(b.id);
                if (aLiked && !bLiked) return -1;
                if (!aLiked && bLiked) return 1;
                return 0;
            });
    }, [activeTab, likedIds]);

    return (
        <div className="video-container">

            {/* 상단 고정(Sticky) 헤더 및 필터 */}
            <div className="video-header-wrapper">
                <h1 className="video-page-title">📚 지난 안무 보관함</h1>
                <p className="video-page-subtitle">예전에 배운 명작들을 다시 복습해 보세요.</p>

                {/* 가로 스크롤 알약(Pill) 탭 */}
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
                                onClick={() => alert(`'${video.titleKor}' 재생 화면으로 이동합니다! ▶️`)}
                            >

                                {/* 썸네일 */}
                                <div className="list-thumbnail">
                                    <img src={video.thumb} alt={video.titleKor} />
                                    <div className="list-play-icon">▶</div>
                                </div>

                                {/* 곡 정보 */}
                                <div className="list-info">
                                    <div className="info-top">
                                        <span className="info-date">{video.date}</span>
                                        <span className={`info-level level-${video.level === '초급' ? 'easy' : video.level === '중급' ? 'medium' : 'hard'}`}>
                                            {video.level}
                                        </span>
                                    </div>

                                    <h3 className="info-title-eng">{video.titleEng}</h3>
                                    <p className="info-title-kor">{video.titleKor}</p>
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

        </div>
    );
}
