import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import songs from '../data/songs';

export default function HomePage() {
    const navigate = useNavigate();
    const [greetingOpen, setGreetingOpen] = useState(false);

    // songs.js에서 이번 주 수업곡(isThisWeek: true)을 자동으로 불러옵니다.
    const thisWeekSong = songs.find(s => s.isThisWeek) || songs[0];
    const levelLabels = { 1: '입문', 2: '초급', 3: '중급', 4: '고급', 5: '최상급' };
    const todayVideo = {
        titleEng: thisWeekSong.title,
        titleKor: `${thisWeekSong.artist} · ${thisWeekSong.genre}`,
        level: levelLabels[thisWeekSong.level] || '초급',
        tip: thisWeekSong.steps?.[0] ? `첫 구간(${thisWeekSong.steps[0].count}): ${thisWeekSong.steps[0].move} — ${thisWeekSong.steps[0].desc}` : '기본 스텝에 집중해 보세요!',
        thumbnail: thisWeekSong.thumbnail
    };

    return (
        <div className="home-container">

            {/* 🎯 히어로 배너 */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(212, 168, 83, 0.15) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(212, 168, 83, 0.1) 100%)',
                border: '1px solid rgba(212, 168, 83, 0.2)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-lg)',
                marginBottom: 'var(--space-md)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', top: '-20px', right: '-20px',
                    width: '100px', height: '100px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(212, 168, 83, 0.15) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                }} />
                <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>💃</div>
                <h2 style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 800,
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '4px',
                }}>
                    오늘도 한 걸음 더
                </h2>
                <p style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                }}>
                    Step by Step 🎶
                </p>
            </div>
            {/* 1. 상단 환영 인사 및 공지 배너 */}
            <header className="home-header">
                <h1 className="greeting-title">
                    오늘도 신나게<br />스텝 밟아볼까요? 💃
                </h1>

                {/* ✨ 구향회 원장님 인사말 카드 */}
                <div className="greeting-card" onClick={() => setGreetingOpen(!greetingOpen)}>
                    <div className="greeting-card-header">
                        <div className="greeting-avatar">💖</div>
                        <div className="greeting-meta">
                            <h3 className="greeting-author">구향회 원장님의 인사말</h3>
                            <span className="greeting-date">스텝바이스텝 라인댄스</span>
                        </div>
                        <span className={`greeting-toggle ${greetingOpen ? 'open' : ''}`}>▼</span>
                    </div>

                    <div className={`greeting-body ${greetingOpen ? 'expanded' : ''}`}>
                        <p>안녕하세요, 스텝바이스텝 라인댄스 가족 여러분! 구향회입니다. 💖</p>
                        <p>📱 회원님들이 원하실 때 언제 어디서든 연습하실 수 있도록 전용 앱을 드디어 오픈했어요! ✨</p>
                        <p>💃 평소 헷갈렸던 스텝이나 다시 보고 싶은 안무 영상이 있다면, 이제 앱을 통해 편하게 복습해 보세요. 🎶</p>
                        <p>🙋‍♀️ 앱 설치가 어렵거나 사용 방법이 궁금하시다면 다음 수업 시간에 제가 직접 친절하게 안내해 드릴 테니 걱정 마세요. 😊</p>
                        <p>🌟 앞으로도 저와 함께 건강하고 신나게 스텝을 밟아 보아요! 회원님들의 멋진 댄스 라이프를 항상 응원합니다. 화이팅! 💪</p>
                    </div>

                    {!greetingOpen && (
                        <p className="greeting-preview">안녕하세요, 스텝바이스텝 라인댄스 가족 여러분! 구향회입니다...</p>
                    )}
                </div>

                {/* 공지 배너 (누르면 커뮤니티로 이동) */}
                <div className="notice-banner" onClick={() => navigate('/community')}>
                    <span className="notice-badge">공지</span>
                    <p className="notice-text">오늘 배운 안무 영상이 <b>영상 보관함</b>에 업로드 되었습니다! 🎶</p>
                </div>
            </header>

            {/* 2. 👑 VIP석 : 오늘 배운 안무 (초집중 구역) */}
            <section className="vip-section">
                <div className="vip-header">
                    <h2 className="vip-title">🔥 오늘 배운 안무</h2>
                    <span className="level-badge">{todayVideo.level}</span>
                </div>

                {/* 영상 썸네일 카드 (누르면 비디오 페이지로 이동) */}
                <div className="vip-card" onClick={() => navigate(`/video/${thisWeekSong.id}`)}>
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
