import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
    const navigate = useNavigate();

    // 💡 [데모 데이터] 나중에는 서버나 DB에서 '오늘 진도 나간 곡'을 자동으로 불러옵니다.
    const todayVideo = {
        titleKor: '와이',
        titleEng: 'WHY',
        level: '초급',
        tip: '이번 주 신곡! 기본 스텝에 집중하시고, 방향 전환할 때 중심 잡기 연습해 보세요! 🎵',
        thumbnail: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&q=80&w=800'
    };

    return (
        <div className="home-container">

            {/* 1. 상단 환영 인사 및 공지 배너 */}
            <header className="home-header">
                <h1 className="greeting-title">
                    오늘도 신나게<br />스텝 밟아볼까요? 💃
                </h1>

                {/* 공지 배너 (누르면 커뮤니티로 1초 만에 이동합니다) */}
                <div className="notice-banner" onClick={() => navigate('/community')}>
                    <span className="notice-badge">공지</span>
                    <p className="notice-text">이번 주 금요일 오전반은 <b>휴강</b>입니다.</p>
                </div>
            </header>

            {/* 2. 👑 VIP석 : 오늘 배운 안무 (초집중 구역) */}
            <section className="vip-section">
                <div className="vip-header">
                    <h2 className="vip-title">🔥 오늘 배운 안무</h2>
                    <span className="level-badge">{todayVideo.level}</span>
                </div>

                {/* 영상 썸네일 카드 (누르면 비디오 페이지로 이동) */}
                <div className="vip-card" onClick={() => navigate('/video')}>
                    <div className="thumbnail-wrapper">
                        <img src={todayVideo.thumbnail} alt={todayVideo.titleKor} className="thumbnail-img" />

                        {/* 🔴 어르신들이 본능적으로 누르게 되는 거대한 핑크색 재생 버튼 */}
                        <div className="play-overlay">
                            <div className="play-button">▶</div>
                        </div>
                    </div>

                    <div className="vip-info">
                        <h3 className="video-title-eng">{todayVideo.titleEng}</h3>
                        <p className="video-title-kor">{todayVideo.titleKor}</p>

                        {/* ✨ 오프라인 수업의 감동을 이어주는 원장님 메모장 */}
                        <div className="director-tip">
                            <span className="tip-icon">💡</span>
                            <div className="tip-content">
                                <strong>원장님 꿀팁:</strong>
                                <span>{todayVideo.tip}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. 🚀 하단 퀵 메뉴 (도전/프로필 빈자리를 채우는 큰 네모 버튼 2개) */}
            <section className="quick-actions">
                <h2 className="quick-title">무엇을 찾으시나요?</h2>
                <div className="action-grid">

                    <button className="action-btn" onClick={() => navigate('/community')}>
                        <span className="btn-icon">💬</span>
                        <div className="btn-text">
                            <strong>회원 소통방</strong>
                            <span>질문하고 수다떨기</span>
                        </div>
                    </button>

                    <button className="action-btn" onClick={() => navigate('/search')}>
                        <span className="btn-icon">🔍</span>
                        <div className="btn-text">
                            <strong>지난 안무 검색</strong>
                            <span>안무·음악 찾기</span>
                        </div>
                    </button>

                </div>
            </section>

        </div>
    );
}
