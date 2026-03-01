import { useState } from 'react';
import { challenges, weeklyGoals } from '../data/challenges';

const categories = ['전체', '출석', '곡 마스터', '커뮤니티'];

export default function ChallengePage() {
    const [filter, setFilter] = useState('전체');
    const [showCompleted, setShowCompleted] = useState(false);

    const activeChallenges = challenges.filter(c => !c.isCompleted);
    const completedChallenges = challenges.filter(c => c.isCompleted);

    const filteredActive = activeChallenges.filter(
        c => filter === '전체' || c.category === filter
    );

    const filteredCompleted = completedChallenges.filter(
        c => filter === '전체' || c.category === filter
    );

    const getProgressPercent = (current, target) =>
        Math.min(Math.round((current / target) * 100), 100);

    return (
        <div>
            {/* Weekly Goals */}
            <div className="weekly-goals-card">
                <div className="weekly-goals-header">
                    <h3>📊 이번 주 목표</h3>
                    <span className="weekly-goals-period">3월 1주차</span>
                </div>
                <div className="weekly-goals-grid">
                    {Object.entries(weeklyGoals).map(([key, goal]) => {
                        const pct = getProgressPercent(goal.current, goal.target);
                        return (
                            <div className="weekly-goal-item" key={key}>
                                <div className="weekly-goal-ring" style={{ '--progress': `${pct * 3.6}deg` }}>
                                    <span className="weekly-goal-value">{goal.current}/{goal.target}</span>
                                </div>
                                <span className="weekly-goal-label">{goal.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Category Filter */}
            <div className="challenge-filters">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn ${filter === cat ? 'active' : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Active Challenges */}
            <div className="section-title">
                <h2>🎯 진행 중 도전</h2>
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                    {filteredActive.length}개
                </span>
            </div>

            {filteredActive.length === 0 ? (
                <div className="empty-state" style={{ padding: 'var(--space-lg)' }}>
                    <div className="empty-emoji">🏖️</div>
                    <p>진행 중인 도전이 없습니다</p>
                </div>
            ) : (
                <div className="challenge-list">
                    {filteredActive.map(challenge => {
                        const pct = getProgressPercent(challenge.current, challenge.target);
                        return (
                            <div className="glass-card challenge-card" key={challenge.id}>
                                <div className="challenge-header">
                                    <div className="challenge-emoji">{challenge.emoji}</div>
                                    <div className="challenge-info">
                                        <h3>{challenge.title}</h3>
                                        <p className="challenge-desc">{challenge.description}</p>
                                    </div>
                                </div>
                                <div className="challenge-progress-area">
                                    <div className="challenge-progress-bar">
                                        <div
                                            className="challenge-progress-fill"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                    <div className="challenge-progress-info">
                                        <span className="challenge-progress-text">
                                            {challenge.current}/{challenge.target} ({pct}%)
                                        </span>
                                        <span className="challenge-deadline">⏰ {challenge.deadline}</span>
                                    </div>
                                </div>
                                <div className="challenge-reward">
                                    <span>{challenge.rewardEmoji} {challenge.reward}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Completed Toggle */}
            <div
                className="completed-toggle"
                onClick={() => setShowCompleted(!showCompleted)}
            >
                <span>✅ 완료한 도전 ({filteredCompleted.length}개)</span>
                <svg
                    className={`toggle-arrow ${showCompleted ? 'expanded' : ''}`}
                    width="16" height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </div>

            {showCompleted && (
                <div className="completed-challenge-list">
                    {filteredCompleted.map(challenge => (
                        <div className="glass-card challenge-card completed" key={challenge.id}>
                            <div className="challenge-header">
                                <div className="challenge-emoji completed-emoji">
                                    {challenge.rewardEmoji}
                                </div>
                                <div className="challenge-info">
                                    <h3>{challenge.title}</h3>
                                    <div className="challenge-completed-info">
                                        <span className="completed-badge">완료!</span>
                                        <span className="completed-date">{challenge.completedDate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
