import { useState } from 'react';
import { Link } from 'react-router-dom';
import profile from '../data/profile';
import songs from '../data/songs';
import { challenges } from '../data/challenges';

export default function ProfilePage() {
    const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '회원');
    const [darkMode, setDarkMode] = useState(profile.settings.darkMode);
    const [notifications, setNotifications] = useState(profile.settings.notifications);

    const learnedSongsList = songs.filter(s => profile.learnedSongs.includes(s.id));
    const completedCount = challenges.filter(c => c.isCompleted).length;
    const activeCount = challenges.filter(c => !c.isCompleted).length;

    return (
        <div>
            {/* Profile Hero */}
            <div className="profile-hero">
                <div className="profile-avatar">
                    {profile.profileEmoji}
                </div>
                <h2 className="profile-name">{userName}</h2>
                <p className="profile-nickname">@{profile.nickname}</p>
                <div className="profile-level">
                    🎯 {profile.level} · Lv.{profile.levelNum}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="glass-card stat-card">
                    <div className="stat-value">{profile.stats.totalClasses}</div>
                    <div className="stat-label">총 출석</div>
                </div>
                <div className="glass-card stat-card">
                    <div className="stat-value">{profile.stats.totalSongs}</div>
                    <div className="stat-label">배운 곡</div>
                </div>
                <div className="glass-card stat-card">
                    <div className="stat-value">{profile.stats.streakDays}</div>
                    <div className="stat-label">연속 출석 🔥</div>
                </div>
                <div className="glass-card stat-card">
                    <div className="stat-value">{profile.stats.attendanceRate}%</div>
                    <div className="stat-label">출석률</div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="section-title">
                <h2>🔗 바로가기</h2>
            </div>
            <div className="profile-quick-links">
                <Link to="/community" className="glass-card quick-link-card">
                    <span className="quick-link-emoji">💬</span>
                    <span className="quick-link-label">커뮤니티</span>
                </Link>
                <Link to="/announce" className="glass-card quick-link-card">
                    <span className="quick-link-emoji">📢</span>
                    <span className="quick-link-label">공지사항</span>
                </Link>
                <Link to="/search" className="glass-card quick-link-card">
                    <span className="quick-link-emoji">🔍</span>
                    <span className="quick-link-label">검색</span>
                </Link>
                <Link to="/challenge" className="glass-card quick-link-card">
                    <span className="quick-link-emoji">🎯</span>
                    <span className="quick-link-label">도전과제</span>
                    <span className="quick-link-badge">{activeCount}</span>
                </Link>
            </div>

            {/* Badges */}
            <div className="section-title">
                <h2>🏆 획득 배지</h2>
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                    {profile.badges.length + completedCount}개
                </span>
            </div>
            <div className="badges-row" style={{ marginBottom: 'var(--space-lg)' }}>
                {profile.badges.map((badge) => (
                    <div className="badge-item" key={badge.id}>
                        <span className="badge-emoji">{badge.emoji}</span>
                        <span className="badge-name">{badge.name}</span>
                    </div>
                ))}
            </div>

            {/* Learned Songs */}
            <div className="section-title">
                <h2>🎵 배운 곡 목록</h2>
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                    {learnedSongsList.length}곡
                </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', marginBottom: 'var(--space-lg)' }}>
                {learnedSongsList.map((song) => (
                    <Link to={`/video/${song.id}`} key={song.id}>
                        <div className="glass-card" style={{ padding: 'var(--space-sm) var(--space-md)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>{song.title}</h3>
                                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>{song.artist}</p>
                                </div>
                                <span className={`level-badge level-${song.level}`}>
                                    {'⭐'.repeat(song.level)}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Settings */}
            <div className="section-title">
                <h2>⚙️ 설정</h2>
            </div>
            <div className="settings-list">
                <div className="setting-item">
                    <span className="setting-label">
                        🌙 다크 모드
                    </span>
                    <div
                        className={`toggle ${darkMode ? 'active' : ''}`}
                        onClick={() => setDarkMode(!darkMode)}
                    />
                </div>
                <div className="setting-item">
                    <span className="setting-label">
                        🔔 알림
                    </span>
                    <div
                        className={`toggle ${notifications ? 'active' : ''}`}
                        onClick={() => setNotifications(!notifications)}
                    />
                </div>
                <div className="setting-item" onClick={() => {
                    const name = prompt('이름을 변경해주세요', userName);
                    if (name && name.trim()) {
                        setUserName(name.trim());
                        localStorage.setItem('userName', name.trim());
                    }
                }} style={{ cursor: 'pointer' }}>
                    <span className="setting-label">✏️ 이름 변경</span>
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>{userName}</span>
                </div>
                <div className="setting-item">
                    <span className="setting-label">
                        📅 가입일
                    </span>
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                        {profile.joinDate}
                    </span>
                </div>
            </div>
        </div>
    );
}
