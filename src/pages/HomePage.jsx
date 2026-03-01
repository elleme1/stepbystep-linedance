import { Link } from 'react-router-dom';
import songs from '../data/songs';
import announcements from '../data/announcements';
import profile from '../data/profile';
import { challenges, weeklyGoals } from '../data/challenges';
import communityPosts from '../data/community';

const levelText = ['자유', '⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'];

export default function HomePage() {
    const thisWeekSongs = songs.filter(s => s.isThisWeek);
    const latestAnnouncements = announcements.slice(0, 2);
    const activeChallenges = challenges.filter(c => !c.isCompleted).slice(0, 2);
    const hotPosts = communityPosts.sort((a, b) => b.likes - a.likes).slice(0, 2);

    const getProgressPercent = (current, target) =>
        Math.min(Math.round((current / target) * 100), 100);

    return (
        <div>
            {/* Greeting Card */}
            <div className="greeting-card">
                <h2>{profile.name}님, 오늘도 신나게 춤춰요! 💃</h2>
                <p>현재 레벨: {profile.level} · 연속 {profile.stats.streakDays}일 출석 중 🔥</p>
                <div className="greeting-stats">
                    <div className="greeting-stat">
                        <span className="stat-num">{profile.stats.totalClasses}</span>
                        <span className="stat-text">총 출석</span>
                    </div>
                    <div className="greeting-stat">
                        <span className="stat-num">{profile.stats.totalSongs}</span>
                        <span className="stat-text">배운 곡</span>
                    </div>
                    <div className="greeting-stat">
                        <span className="stat-num">{profile.stats.attendanceRate}%</span>
                        <span className="stat-text">출석률</span>
                    </div>
                </div>
            </div>

            {/* Weekly Goals Mini */}
            <div className="section-title">
                <h2>📊 주간 목표</h2>
                <Link to="/challenge" className="see-all">전체보기 →</Link>
            </div>
            <div className="weekly-mini-row">
                {Object.entries(weeklyGoals).map(([key, goal]) => {
                    const pct = getProgressPercent(goal.current, goal.target);
                    return (
                        <Link to="/challenge" key={key} className="glass-card weekly-mini-card">
                            <div className="weekly-mini-bar">
                                <div className="weekly-mini-fill" style={{ width: `${pct}%` }} />
                            </div>
                            <div className="weekly-mini-info">
                                <span className="weekly-mini-label">{goal.label}</span>
                                <span className="weekly-mini-value">{goal.current}/{goal.target}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Challenge Progress */}
            {activeChallenges.length > 0 && (
                <>
                    <div className="section-title" style={{ marginTop: 'var(--space-lg)' }}>
                        <h2>🎯 진행 중인 도전</h2>
                        <Link to="/challenge" className="see-all">전체보기 →</Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
                        {activeChallenges.map(ch => {
                            const pct = getProgressPercent(ch.current, ch.target);
                            return (
                                <Link to="/challenge" key={ch.id}>
                                    <div className="glass-card challenge-mini-card">
                                        <div className="challenge-mini-left">
                                            <span className="challenge-mini-emoji">{ch.emoji}</span>
                                            <div>
                                                <h3 className="challenge-mini-title">{ch.title}</h3>
                                                <span className="challenge-mini-deadline">⏰ {ch.deadline}</span>
                                            </div>
                                        </div>
                                        <div className="challenge-mini-progress">
                                            <svg viewBox="0 0 36 36" className="challenge-mini-ring">
                                                <path
                                                    className="ring-bg"
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                />
                                                <path
                                                    className="ring-fill"
                                                    strokeDasharray={`${pct}, 100`}
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                />
                                                <text x="18" y="20.5" className="ring-text">{pct}%</text>
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </>
            )}

            {/* This Week's Songs */}
            <div className="section-title">
                <h2>🎵 이번 주 수업곡</h2>
                <Link to="/library" className="see-all">전체보기 →</Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
                {thisWeekSongs.map((song) => (
                    <Link to={`/video/${song.id}`} key={song.id}>
                        <div className="glass-card song-card">
                            <div className="song-thumbnail">
                                <img src={song.thumbnail} alt={song.title} loading="lazy" />
                                <div className="play-overlay">
                                    <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                </div>
                            </div>
                            <div className="song-info">
                                <h3>{song.title}</h3>
                                <div className="song-meta">
                                    <span>{song.artist}</span>
                                    <span className="dot" />
                                    <span>{levelText[song.level]}</span>
                                    <span className="dot" />
                                    <span>{song.genre}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Community Hot Posts */}
            <div className="section-title">
                <h2>💬 커뮤니티 인기글</h2>
                <Link to="/community" className="see-all">전체보기 →</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
                {hotPosts.map(post => (
                    <Link to="/community" key={post.id}>
                        <div className="glass-card community-mini-card">
                            <div className="community-mini-left">
                                <span className="community-mini-avatar">{post.authorEmoji}</span>
                                <div>
                                    <h3 className="community-mini-title">{post.title}</h3>
                                    <span className="community-mini-meta">
                                        {post.author} · ❤️ {post.likes} · 💬 {post.comments}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Latest Announcements */}
            <div className="section-title">
                <h2>📢 최신 공지</h2>
                <Link to="/announce" className="see-all">전체보기 →</Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {latestAnnouncements.map((a) => (
                    <Link to="/announce" key={a.id}>
                        <div className="glass-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: '4px' }}>
                                {a.isPinned && <span className="pinned-icon">📌</span>}
                                <span className={`category-badge ${a.category}`}>{a.category}</span>
                            </div>
                            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600 }}>{a.title}</h3>
                            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>{a.date}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
