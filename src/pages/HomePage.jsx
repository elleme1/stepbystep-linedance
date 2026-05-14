import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './HomePage.css';
import { useData } from '../context/DataContext';
import { useLocation } from '../context/LocationContext';
import LocationBadge from '../components/LocationBadge';
import InstallBanner from '../components/InstallBanner';

export default function HomePage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [greetingOpen, setGreetingOpen] = useState(false);
    const [isVip, setIsVip] = useState(false);

    const { selectedLocation, locationInfo } = useLocation();
    const { getThisWeekSong } = useData();

    // 🔑 URL에 ?vip=true가 포함되어 있으면 로컬스토리지에 저장하여 나만의 비밀 모드 활성화
    useEffect(() => {
        if (searchParams.get('vip') === 'true') {
            localStorage.setItem('isVipUser', 'true');
        }
        if (localStorage.getItem('isVipUser') === 'true') {
            setIsVip(true);
        }
    }, [searchParams]);

    // 📍 선택된 장소의 이번 주 수업곡을 자동으로 불러옵니다.
    const thisWeekSong = getThisWeekSong(selectedLocation);
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
            <div className="hero-banner">
                <div className="hero-banner-glow" />
                <div className="hero-banner-emoji">💃</div>
                <h2 className="hero-banner-title">오늘도 한 걸음 더</h2>
                <p className="hero-banner-subtitle">Step by Step 🎶</p>

                {/* 📍 장소 뱃지 */}
                <div className="hero-banner-location">
                    <LocationBadge />
                </div>
            </div>

            {/* 📲 PWA 설치 유도 배너 */}
            <InstallBanner />

            {/* 1. 상단 환영 인사 및 공지 배너 */}
            <header className="home-header">
                <h1 className="greeting-title">
                    오늘도 신나게<br />스텝 밟아볼까요? 💃
                </h1>

                {/* ✨ 구향회 선생님 인사말 카드 */}
                <div className="greeting-card" onClick={() => setGreetingOpen(!greetingOpen)}>
                    <div className="greeting-card-header">
                        <div className="greeting-avatar">💖</div>
                        <div className="greeting-meta">
                            <h3 className="greeting-author">구향회 선생님의 인사말</h3>
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

                {/* 🌟 4주 자이브 마스터 챌린지 배너 (나만의 비밀 모드일 때만 렌더링) */}
                {isVip && (
                    <div className="challenge-banner" onClick={() => navigate('/challenge/jive')}>
                        <div className="challenge-banner-content">
                            <span className="challenge-badge" style={{background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)'}}>🔒 VIP 챌린지</span>
                            <h3 className="challenge-banner-title">4주 자이브 마스터 플랜</h3>
                            <p className="challenge-banner-desc">나만의 주 3회 맞춤형 오프라인 연계 연습 플랜!</p>
                        </div>
                        <div className="challenge-banner-icon">🎯</div>
                    </div>
                )}
            </header>

            {/* 2. 👑 VIP석 : 오늘 배운 안무 (초집중 구역) */}
            <section className="vip-section">
                <div className="vip-header">
                    <h2 className="vip-title">🔥 {locationInfo ? `${locationInfo.emoji} ${locationInfo.name}` : ''} 오늘 배운 안무</h2>
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

                        {/* ✨ 오프라인 수업의 감동을 이어주는 선생님 메모장 */}
                        <div className="director-tip">
                            <span className="tip-icon">💡</span>
                            <div className="tip-content">
                                <strong>선생님 꿀팁:</strong>
                                <span>{todayVideo.tip}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ⚙️ 관리자 버튼 (푸터) - 코오롱 & 중리 모두 표시 */}
            <footer className="home-footer">
                <button 
                    className="admin-access-btn" 
                    onClick={() => navigate(`/admin?loc=${selectedLocation}`)}
                >
                    <span className="admin-icon">⚙️</span>
                    <strong>{selectedLocation === 'kolon' ? '코오롱' : '중리'} 관리자 모드 접속</strong>
                </button>
            </footer>
        </div>
    );
}
